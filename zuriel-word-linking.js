/* Exact KJV word-annotation to interlinear linker.
   Annotation offsets come from the KJV simplified chapter word file.
   We only link when the reader's token sequence aligns with that source text. */
(function (root) {
  "use strict";

  function tokenKey(value) {
    return String(value || "")
      .normalize("NFC")
      .replace(/[’]/g, "'")
      .toLocaleLowerCase()
      .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  }

  function matchSelectedKJVWord(readerText, sourceText, annotations, wordIndex) {
    if (!Number.isInteger(wordIndex) || wordIndex < 0) {
      return { ok: false, reason: "No selected word position was supplied." };
    }

    const readerTokens = String(readerText || "").match(/\S+/g) || [];
    const sourceSpans = [...String(sourceText || "").matchAll(/\S+/g)].map(function (match) {
      return {
        text: match[0],
        start: match.index,
        end: match.index + match[0].length
      };
    });

    if (readerTokens.length !== sourceSpans.length) {
      return { ok: false, reason: "The reader text and annotated KJV text do not have the same word count." };
    }

    for (let index = 0; index < readerTokens.length; index += 1) {
      if (tokenKey(readerTokens[index]) !== tokenKey(sourceSpans[index].text)) {
        return { ok: false, reason: "The reader text differs from the annotated KJV text; Zuriel will not guess a word link." };
      }
    }

    const selected = sourceSpans[wordIndex];
    if (!selected) {
      return { ok: false, reason: "The selected word position is outside this verse." };
    }

    const matchedAnnotations = (Array.isArray(annotations) ? annotations : []).filter(function (annotation) {
      const start = Number(annotation && annotation.start);
      const end = Number(annotation && annotation.end);
      if (!Number.isInteger(start) || !Number.isInteger(end) || end <= start) return false;
      if (start < selected.end && end > selected.start) {
        return /[\p{L}\p{N}]/u.test(String(sourceText).slice(start, end));
      }
      return false;
    });

    const strongs = [...new Set(matchedAnnotations.flatMap(function (annotation) {
      return Array.isArray(annotation.strongs) ? annotation.strongs : [];
    }).map(value => String(value || "").trim()).filter(Boolean))];

    return {
      ok: true,
      token: selected.text,
      annotations: matchedAnnotations,
      strongs: strongs
    };
  }

  root.ZurielWordLinking = { matchSelectedKJVWord: matchSelectedKJVWord };
})(typeof window !== "undefined" ? window : globalThis);
