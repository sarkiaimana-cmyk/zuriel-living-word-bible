/* Exact KJV word-annotation to interlinear linker.
   Annotation offsets come from the KJV simplified chapter word file.
   We only link when the reader's token sequence aligns with that source text. */
(function (root) {
  "use strict";

  function tokenKey(value) {
    return String(value || "")
      .normalize("NFC")
      .replace(/[’]/g, "'")
      .toLowerCase()
      .replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, "");
  }

  function getWordSpans(value) {
    const text = String(value || "");
    const spans = [];
    const pattern = /\S+/g;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      spans.push({
        text: match[0],
        start: match.index,
        end: match.index + match[0].length
      });
    }
    return spans;
  }

  function matchSelectedKJVWord(readerText, sourceText, annotations, wordIndex) {
    if (!Number.isInteger(wordIndex) || wordIndex < 0) {
      return { ok: false, reason: "No selected word position was supplied." };
    }

    const readerTokens = getWordSpans(readerText);
    const sourceSpans = getWordSpans(sourceText);

    if (readerTokens.length !== sourceSpans.length) {
      return { ok: false, reason: "The reader text and annotated KJV text do not have the same word count." };
    }

    for (let index = 0; index < readerTokens.length; index += 1) {
      if (tokenKey(readerTokens[index].text) !== tokenKey(sourceSpans[index].text)) {
        return { ok: false, reason: "The reader text differs from the annotated KJV text; Zuriel will not guess a word link." };
      }
    }

    const selected = sourceSpans[wordIndex];
    if (!selected) {
      return { ok: false, reason: "The selected word position is outside this verse." };
    }

    const source = String(sourceText || "");
    const matchedAnnotations = (Array.isArray(annotations) ? annotations : []).filter(function (annotation) {
      const start = Number(annotation && annotation.start);
      const end = Number(annotation && annotation.end);
      if (!Number.isInteger(start) || !Number.isInteger(end) || end <= start) return false;
      // Require the complete annotation to belong to this one token.
      // Mere overlap can attach a malformed cross-word source range to two
      // English words and create a false original-language association.
      if (start >= selected.start && end <= selected.end) {
        return /[a-z0-9]/i.test(source.slice(start, end));
      }
      return false;
    });

    const strongs = [];
    matchedAnnotations.forEach(function (annotation) {
      if (!Array.isArray(annotation.strongs)) return;
      annotation.strongs.forEach(function (value) {
        const id = String(value || "").trim();
        if (id && !strongs.includes(id)) strongs.push(id);
      });
    });

    return {
      ok: true,
      token: selected.text,
      annotations: matchedAnnotations,
      strongs: strongs
    };
  }

  root.ZurielWordLinking = { matchSelectedKJVWord: matchSelectedKJVWord };
})(typeof window !== "undefined" ? window : globalThis);
