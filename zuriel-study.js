
/* =========================================================
   ZURIEL LIVING WORD BIBLE
   SCRIPTURE STUDY CENTRE — COMPLETE WORKING VERSION
   ========================================================= */

(function () {
  "use strict";

  const NOTES_KEY = "zuriel-verse-study-notes-v1";
  const HIGHLIGHTS_KEY = "zuriel-word-highlights-v1";
  let selectedReference = null;
  let selectedEnglishWord = "";
  let selectedEnglishWordIndex = -1;
  let activeHighlightColor = "#f5d76e";

  const crossReferences = [
    ["Genesis", 1, 2, "The creation account"],
    ["Psalms", 33, 6, "Creation through God's Word"],
    ["Psalms", 90, 2, "God before creation"],
    ["Isaiah", 45, 18, "God the Creator"],
    ["John", 1, 1, "The Word in the beginning"],
    ["Acts", 17, 24, "God made the world"],
    ["Colossians", 1, 16, "All things created through Christ"],
    ["Hebrews", 11, 3, "Creation by God's Word"],
    ["Revelation", 4, 11, "The Creator is worthy"]
  ];

  // Concise offline starter dictionary. Entries are study summaries;
  // readers should check each term in its passage and language context.
  const bibleDictionary = [
    ["Atonement","God's provision for dealing with sin and restoring relationship; in the Old Testament it is closely associated with sacrifice and cleansing. See Leviticus 16; Romans 3:23–26."],
    ["Covenant","A solemn relationship established by promise and obligation. Biblical covenants reveal God's purposes and faithfulness. See Genesis 15; Exodus 19–24; Luke 22:20."],
    ["Disciple","A learner and follower who receives a teacher's instruction and seeks to live by it. Christian discipleship centres on following Jesus. See Luke 9:23; John 8:31."],
    ["Faith","Trust and reliance upon God; biblical faith includes confidence, loyalty and faithful response. See Genesis 15:6; Hebrews 11:1–6."],
    ["Forgiveness","The release of a debt or offence; Scripture calls believers to receive God's mercy and forgive others without denying truth or justice. See Matthew 6:12–15; Ephesians 4:32."],
    ["Grace","God's generous favour and action toward people, not earned as a wage. Grace saves and trains believers for godly living. See Ephesians 2:8–10; Titus 2:11–14."],
    ["Holiness","Being set apart for God and living in a way that reflects His character. It includes worship, moral integrity and love. See Leviticus 19:2; 1 Peter 1:15–16."],
    ["Justification","God's righteous declaration concerning those who trust in Christ; Paul connects it with grace, faith and Christ's saving work. See Romans 3:21–28; 5:1."],
    ["Kingdom of God","God's reign and saving rule. Jesus announces the kingdom and teaches its values, present work and future fullness. See Mark 1:14–15; Matthew 6:10, 33."],
    ["Mercy","Compassion shown toward those in need or distress, often with practical help. God's mercy is a pattern for His people. See Psalm 103:8–14; Luke 10:30–37."],
    ["Redemption","Deliverance or release, often pictured as rescue from slavery or debt. The New Testament speaks of redemption through Christ. See Exodus 6:6; Ephesians 1:7."],
    ["Repentance","A turning from sin toward God, involving a changed mind, direction and conduct. See Joel 2:12–13; Mark 1:15; Acts 3:19."],
    ["Righteousness","What is right according to God's character and standards; it can describe just conduct and God's saving action. See Psalm  righteousness; Romans 1:16–17."],
    ["Sanctification","Being made holy and increasingly shaped toward faithful life with God. The New Testament connects this with the Spirit, truth and obedience. See John 17:17; 1 Thessalonians 4:3."],
    ["Salvation","God's rescue from sin and its consequences, bringing people into life and reconciliation through Jesus Christ. See Luke 19:10; Ephesians 2:8–10."],
    ["Shalom","Hebrew term often translated peace; it can include wholeness, well-being, safety and right relationship. See Numbers 6:24–26; Isaiah 9:6."],
    ["Sin","Human rebellion, wrongdoing or failure to live in faithfulness to God; Scripture describes both acts and the deeper condition. See Genesis 3; Romans 3:23; 1 John 1:8–9."],
    ["Stewardship","Responsible care of what has been entrusted by God, including resources, gifts, creation and relationships. See Genesis 2:15; Luke 16:10–13."],
    ["Wisdom","Skill in living rightly before God, joining understanding with just and faithful action. See Proverbs 1:7; James 1:5; 3:13–18."],
    ["Worship","Honouring God with reverence, love, trust and obedient life, not merely singing or ceremony. See Deuteronomy 6:4–5; John 4:23–24; Romans 12:1."]
  ];

  function readNotes() {
    try {
      return JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
    } catch (error) {
      return {};
    }
  }

  function noteKey(ref) {
    return ref.book + "|" + ref.chapter + "|" + ref.verse;
  }

  const INTERLINEAR_API = "https://bible.helloao.org/api/d/bsb-interlinear/";
  const LEXICON_API = "https://bible.helloao.org/api/d/stepbible-lexicon/lexicon/";
  const CROSS_REFERENCE_API = "https://bible.helloao.org/api/d/open-cross-ref/";
  const API_BOOK_CODES = [
    "GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA",
    "1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO",
    "ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO",
    "OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT",
    "MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP",
    "COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE",
    "2PE","1JN","2JN","3JN","JUD","REV"
  ];

  function apiBookCode(bookName) {
    const bookIndex = bibleBooks.findIndex(item => item.name === bookName);
    return bookIndex >= 0 ? API_BOOK_CODES[bookIndex] : null;
  }

  function englishBookName(apiCode) {
    const bookIndex = API_BOOK_CODES.indexOf(apiCode);
    return bookIndex >= 0 && bibleBooks[bookIndex]
      ? bibleBooks[bookIndex].name
      : null;
  }

  // Request counters prevent a slow response for an older verse from
  // replacing study results for the verse the reader selected most recently.
  let originalWordsRequest = 0;
  let crossReferencesRequest = 0;
  let lexiconRequest = 0;

  // Keep successfully downloaded interlinear, lexicon and cross-reference
  // records in Cache Storage so a verse studied once can be revisited offline.
  // Cache-first is appropriate here because these reference datasets are
  // versioned/static resources; a failed cache operation never blocks study.
  async function fetchStudyJson(url) {
    const cacheName = "zuriel-study-resources-v1";
    let studyCache = null;

    if ("caches" in window) {
      try {
        studyCache = await caches.open(cacheName);
        const cachedResponse = await studyCache.match(url);
        if (cachedResponse) {
          try {
            return await cachedResponse.clone().json();
          } catch (cacheError) {
            await studyCache.delete(url);
          }
        }
      } catch (cacheError) {
        studyCache = null;
      }
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Study resource is temporarily unavailable.");
    }

    const data = await response.json();
    if (studyCache) {
      try {
        await studyCache.put(url, response.clone());
      } catch (cacheError) {
        // Some browsers restrict cross-origin cache writes; online study
        // remains available and the app continues without persistent cache.
      }
    }
    return data;
  }

  async function loadOriginalWords(ref) {
    const requestId = ++originalWordsRequest;
    // A new verse selection also invalidates any lexicon lookup started
    // from the previously selected verse.
    ++lexiconRequest;
    const target = document.getElementById("zurielOriginalWordResults");
    const lexiconBox = document.getElementById("zurielLexiconDetails");
    if (!target || !ref) return;

    target.textContent = "Loading Hebrew or Greek words...";
    lexiconBox.replaceChildren();

    try {
      const code = apiBookCode(ref.book);
      if (!code) throw new Error("This Bible book is not mapped for original-language study.");

      const data = await fetchStudyJson(
        INTERLINEAR_API + code + "/" + ref.chapter + ".json"
      );
      if (requestId !== originalWordsRequest) return;

      const verses = data.chapter && Array.isArray(data.chapter.content)
        ? data.chapter.content : [];
      const verseData = verses.find(item => Number(item.verse) === Number(ref.verse));

      if (!verseData || !Array.isArray(verseData.words) || !verseData.words.length) {
        target.textContent = "No original-language word records were supplied for this verse.";
        return;
      }

      target.replaceChildren();

      const language = verseData.words.some(word => word.language === "aramaic")
        ? "Aramaic"
        : verseData.words.some(word => word.language === "greek")
          ? "Greek" : "Hebrew";

      const intro = document.createElement("p");
      intro.className = "study-small";
      intro.textContent = language + " original-language words, in source-text order. Tap a word for its lexicon.";
      target.appendChild(intro);

      verseData.words.forEach(function (word) {
        const card = document.createElement("div");
        card.className = "original-word-card";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "original-word-button";

        const original = document.createElement("span");
        original.className = "original-script";
        original.dir = word.language === "hebrew" || word.language === "aramaic" ? "rtl" : "ltr";
        original.textContent = word.text || "Original word unavailable";
        button.appendChild(original);

        const gloss = document.createElement("span");
        gloss.className = "original-gloss";
        gloss.textContent = word.gloss || "No English gloss supplied";
        button.appendChild(gloss);

        const meta = document.createElement("span");
        meta.className = "word-meta";
        meta.textContent = [
          word.transliteration || "",
          word.strongs ? "Strong's " + word.strongs : "No Strong's number",
          word.parsingFull || word.parsing || ""
        ].filter(Boolean).join(" • ");
        button.appendChild(meta);

        button.addEventListener("click", function () {
          if (word.strongs) {
            loadLexiconEntry(word.strongs, card, data, ref);
          } else {
            lexiconBox.textContent = "This original-language item has no Strong's number in the source data.";
          }
        });

        card.appendChild(button);
        target.appendChild(card);
      });
    } catch (error) {
      if (requestId !== originalWordsRequest) return;
      target.textContent = error.message + " Connect to the internet once to save this study for offline use.";
    }
  }

  function normalizeStrongs(value) {
    const match = String(value || "").match(/[HG]\d{1,5}/i);
    if (!match) return null;
    const prefix = match[0].charAt(0).toUpperCase();
    const number = match[0].slice(1);
    return prefix + number.padStart(4, "0");
  }

  async function loadLexiconEntry(strongs, card, chapterData, ref) {
    const box = document.getElementById("zurielLexiconDetails");
    const requestId = ++lexiconRequest;
    if (!box) return;
    const id = normalizeStrongs(strongs);
    if (!id) {
      box.textContent = "This Strong's reference could not be read.";
      return;
    }

    box.textContent = "Loading " + id + " lexicon...";
    try {
      const data = await fetchStudyJson(LEXICON_API + id + ".json");
      if (requestId !== lexiconRequest) return;
      const entry = data.entry;
      if (!entry || !Array.isArray(entry.senses)) {
        throw new Error("No lexicon definition was returned for " + id + ".");
      }

      box.replaceChildren();
      const heading = document.createElement("h3");
      heading.textContent = "Strong's " + id + " — " +
        (entry.language === "greek" ? "Greek" : entry.language === "aramaic" ? "Aramaic" : "Hebrew");
      box.appendChild(heading);

      entry.senses.forEach(function (sense) {
        const item = document.createElement("div");
        item.className = "lexicon-entry";

        const lemma = document.createElement("h4");
        lemma.textContent = sense.lemma || "Original-language lemma";
        item.appendChild(lemma);

        const transliteration = document.createElement("p");
        transliteration.textContent = "Transliteration: " + (sense.transliteration || "Not supplied");
        item.appendChild(transliteration);

        const gloss = document.createElement("p");
        gloss.textContent = "Meaning: " + (sense.gloss || "Not supplied");
        item.appendChild(gloss);

        const grammar = document.createElement("p");
        grammar.textContent = "Part of speech: " + (sense.partOfSpeech || "Not supplied");
        item.appendChild(grammar);

        const definition = document.createElement("p");
        definition.textContent = sense.definition || "No extended definition supplied.";
        item.appendChild(definition);

        box.appendChild(item);
      });

      const topicalIndex = window.ZurielTopicalIndex;
      if (topicalIndex && typeof topicalIndex.findByKeyword === "function") {
        const glossWords = entry.senses
          .map(sense => String(sense.gloss || "").toLowerCase())
          .join(" ").match(/[a-z]{4,}/g) || [];
        const topicalMatches = [];
        glossWords.forEach(function (word) {
          topicalIndex.findByKeyword(word).forEach(function (topic) {
            if (!topicalMatches.some(item => item.title === topic.title)) topicalMatches.push(topic);
          });
        });
        if (topicalMatches.length) {
          const topicalBox = document.createElement("div");
          topicalBox.className = "lexicon-entry";
          const topicalHeading = document.createElement("h4");
          topicalHeading.textContent = "Possible topical connections from this word's gloss";
          topicalBox.appendChild(topicalHeading);
          const note = document.createElement("p");
          note.textContent = "These pathways are suggested by the English gloss. Check each passage in its own context; they are not definitions of the original word.";
          topicalBox.appendChild(note);
          topicalMatches.slice(0, 5).forEach(function (topic) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "study-link";
            button.textContent = topic.title + " • " + topic.references[0].label;
            button.addEventListener("click", function () {
              const item = topic.references[0];
              if (typeof window.openChapter !== "function") return;
              window.openChapter(item.book, item.chapter).then(function () {
                const verseElements = document.querySelectorAll("#message .verse");
                const selectedVerse = verseElements[item.verse - 1];
                if (!selectedVerse) return;
                const text = selectedVerse.textContent.replace(/^\s*\d+\.?\s*/, "").trim();
                if (window.ZurielStudy && typeof window.ZurielStudy.openForReference === "function") {
                  window.ZurielStudy.openForReference(item.book, item.chapter, item.verse, text, "", -1);
                }
              });
            });
            topicalBox.appendChild(button);
          });
          box.appendChild(topicalBox);
        }
      }

      const related = document.createElement("div");
      related.className = "lexicon-entry";
      const relatedHeading = document.createElement("h4");
      relatedHeading.textContent = "Other occurrences in this chapter";
      related.appendChild(relatedHeading);

      const matches = [];
      const verses = chapterData.chapter && Array.isArray(chapterData.chapter.content)
        ? chapterData.chapter.content : [];
      verses.forEach(function (verse) {
        (verse.words || []).forEach(function (word) {
          if (normalizeStrongs(word.strongs) === id) {
            matches.push({ verse: verse.verse, gloss: word.gloss || "" });
          }
        });
      });

      const uniqueVerses = [...new Map(matches.map(item => [item.verse, item])).values()];
      if (uniqueVerses.length) {
        uniqueVerses.forEach(function (item) {
          const line = document.createElement("p");
          line.textContent = ref.book + " " + ref.chapter + ":" + item.verse +
            (item.gloss ? " — " + item.gloss : "");
          related.appendChild(line);
        });
      } else {
        const line = document.createElement("p");
        line.textContent = "No other occurrence of this Strong's number was found in this chapter.";
        related.appendChild(line);
      }
      box.appendChild(related);
    } catch (error) {
      if (requestId !== lexiconRequest) return;
      box.textContent = error.message || "The lexicon entry could not be loaded.";
    }
  }

  async function loadRelatedScriptures(ref) {
    const requestId = ++crossReferencesRequest;
    const list = document.getElementById("zurielCrossReferenceList");
    if (!list || !ref) return;

    list.textContent = "Finding related Scriptures...";
    try {
      const code = apiBookCode(ref.book);
      if (!code) throw new Error("This Bible book is not mapped for cross-references.");

      const data = await fetchStudyJson(
        CROSS_REFERENCE_API + code + "/" + ref.chapter + ".json"
      );
      if (requestId !== crossReferencesRequest) return;
      const verses = data.chapter && Array.isArray(data.chapter.content)
        ? data.chapter.content : [];
      const selected = verses.find(item => Number(item.verse) === Number(ref.verse));
      const references = selected && Array.isArray(selected.references)
        ? selected.references.slice(0, 12) : [];

      list.replaceChildren();
      if (!references.length) {
        list.textContent = "No connected Scripture references are listed for this verse.";
        return;
      }

      references.forEach(function (item) {
        const name = englishBookName(item.book);
        if (!name) return;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "study-link";
        button.textContent = name + " " + item.chapter + ":" + item.verse +
          (item.endVerse ? "–" + item.endVerse : "");
        button.addEventListener("click", function () {
          if (typeof window.openChapter !== "function") return;
          window.openChapter(name, item.chapter).then(function () {
            const verseElements = document.querySelectorAll("#message .verse");
            const target = verseElements[Number(item.verse) - 1];
            if (target) {
              const verseText = target.textContent.replace(/^\s*\d+\.?\s*/, "").trim();
              target.scrollIntoView({ behavior: "smooth", block: "center" });
              target.classList.add("zuriel-selected-verse");
              if (window.ZurielStudy && typeof window.ZurielStudy.openForReference === "function") {
                window.ZurielStudy.openForReference(name, item.chapter, Number(item.verse), verseText, "", -1);
              }
            }
          });
        });
        list.appendChild(button);
      });

      if (!list.children.length) {
        list.textContent = "Related references were returned, but their book labels could not be matched.";
      }
    } catch (error) {
      if (requestId !== crossReferencesRequest) return;
      list.textContent = error.message + " Connect to the internet once to save related references for offline use.";
    }
  }

  function createStudyPanel() {
    if (document.getElementById("zurielStudyPanel")) return;

    const style = document.createElement("style");
    style.textContent = `
      #zurielStudyPanel {
        position:fixed;
        z-index:10000;
        right:18px;
        top:86px;
        width:min(430px,calc(100vw - 36px));
        max-height:calc(100vh - 110px);
        overflow-y:auto;
        overscroll-behavior:contain;
        box-shadow:0 12px 40px #0005;
        background:#10213d;
        color:#f8f4e9;
        border:1px solid #b99b58;
        border-radius:18px;
        padding:18px;
        margin:22px 0;
        line-height:1.75;
        scroll-margin-top:18px;
      }
      #zurielStudyPanel h2,
      #zurielStudyPanel h3 { color:#e8cf91; }
      #zurielStudyPanel .study-verse {
        background:#1c3657;
        border:1px solid #b99b58;
        border-radius:12px;
        padding:15px;
        margin:15px 0;
        overflow-wrap:anywhere;
      }
      #zurielStudyPanel .study-small {
        color:#d9e3ef;
        font-size:13px;
      }
      #zurielStudyPanel details {
        background:#fff;
        color:#18304d;
        border-radius:12px;
        margin:12px 0;
        overflow:hidden;
      }
      #zurielStudyPanel summary {
        padding:15px;
        cursor:pointer;
        font-weight:bold;
      }
      #zurielStudyPanel .study-body {
        padding:0 15px 16px;
      }
      #zurielStudyPanel .study-word {
        background:#f2eee4;
        border-left:4px solid #b99b58;
        color:#18304d;
        padding:12px;
        margin:10px 0;
        border-radius:7px;
      }

      #zurielStudyPanel .original-word-card {
        background:#fff;
        color:#18304d;
        border:1px solid #d8cdaF;
        border-radius:11px;
        padding:12px;
        margin:10px 0;
      }
      #zurielStudyPanel .original-word-button {
        display:block;
        width:100%;
        text-align:left;
        color:#18304d;
        background:#f7f4eb;
        border:1px solid #d6c79e;
        border-radius:9px;
        padding:12px;
        margin:5px 0;
        min-height:48px;
        font:inherit;
      }
      #zurielStudyPanel .original-script {
        display:block;
        font-family:"Noto Sans Hebrew","Noto Sans Greek","Arial Unicode MS",serif;
        font-size:28px;
        font-weight:800;
        line-height:1.8;
        letter-spacing:0.02em;
        color:#111827;
        text-rendering:optimizeLegibility;
        margin-bottom:7px;
      }
      #zurielStudyPanel .original-gloss {
        display:block;
        color:#18304d;
        font-size:15px;
        font-weight:700;
        line-height:1.5;
      }
      #zurielStudyPanel .word-meta {
        display:block;
        color:#536477;
        font-size:12px;
        margin-top:4px;
      }
      #zurielStudyPanel .lexicon-entry {
        background:#f2eee4;
        color:#18304d;
        border-left:4px solid #b99b58;
        border-radius:8px;
        padding:12px;
        margin:10px 0;
        overflow-wrap:anywhere;
      }
      #zurielStudyPanel .study-source {
        color:#d9e3ef;
        font-size:12px;
        line-height:1.5;
        margin-top:12px;
      }
      #zurielStudyPanel button.study-link {
        display:block;
        width:100%;
        text-align:left;
        background:#fff;
        color:#18304d;
        border:1px solid #d6c79e;
        border-radius:9px;
        padding:12px;
        margin:8px 0;
        min-height:46px;
      }
      #zurielStudyPanel textarea,
      #zurielStudyPanel input {
        width:100%;
        box-sizing:border-box;
        padding:12px;
        border:1px solid #c8c8c8;
        border-radius:9px;
        font:inherit;
        margin:6px 0 12px;
      }
      #zurielStudyPanel textarea { min-height:100px; }
      #zurielStudyPanel .study-action {
        background:#e8cf91;
        color:#10213d;
        border:1px solid #b99b58;
        padding:12px 15px;
        min-height:46px;
        border-radius:9px;
        font-weight:bold;
        margin:5px 4px 5px 0;
      }
      #zurielStudyPanel .study-secondary {
        background:#fff;
        color:#18304d;
        border:1px solid #d6c79e;
        padding:12px 15px;
        min-height:46px;
        border-radius:9px;
        font-weight:bold;
        margin:5px 4px 5px 0;
      }
      .verse.zuriel-selected-verse {
        background:#fff0c9 !important;
        border-left:5px solid #b99b58;
        border-radius:8px;
        padding-left:12px;
      }
      #zurielStudySaveStatus {
        color:#e8cf91;
        font-weight:bold;
      }
      #zurielStudyPanel .highlight-tools {
        background:#1c3657;
        border:1px solid #b99b58;
        border-radius:12px;
        padding:12px;
        margin:12px 0;
      }
      #zurielStudyPanel .highlight-palette {
        display:flex;
        flex-wrap:wrap;
        gap:8px;
        margin:9px 0;
      }
      #zurielStudyPanel .highlight-color {
        width:38px;
        height:38px;
        min-height:38px;
        padding:0;
        border:2px solid #fff;
        border-radius:50%;
        margin:0;
      }
      #zurielStudyPanel .highlight-color[aria-pressed="true"] {
        outline:3px solid #e8cf91;
        outline-offset:2px;
      }
      #zurielStudyPanel .highlight-tools .study-small { margin-bottom:5px; }
      #zurielStudyPanel .word-selection-label {
        color:#f1d99e;
        font-weight:bold;
        overflow-wrap:anywhere;
      }
      @media(max-width:600px) {
        #zurielStudyPanel {
          top:auto;
          right:0;
          bottom:0;
          width:100%;
          max-height:72vh;
          border-radius:18px 18px 0 0;
          padding:14px;
          padding-bottom:calc(14px + env(safe-area-inset-bottom));
        }
      }
    `;
    document.head.appendChild(style);

    const panel = document.createElement("section");
    panel.id = "zurielStudyPanel";

    panel.innerHTML = `
      <h2>📖 Zuriel Scripture Study Centre</h2>
      <p>Explore God's Word deeply, carefully and prayerfully.</p>

      <div class="study-verse">
        <h3 id="zurielSelectedReference">
          Your selected Scripture will appear here.
        </h3>
        <p id="zurielSelectedText">
          Open a Bible chapter and tap any verse.
        </p>
        <p class="study-small" id="zurielSelectionNotice">
          Scripture text is kept separate from study explanations.
        </p>
      </div>

      <button class="study-action" id="zurielReturnToVerse">
        ← Return to Selected Verse
      </button>
      <button class="study-secondary" id="zurielCloseStudy">
        Close Study Panel
      </button>

      <div class="highlight-tools">
        <h3>🎨 Scripture Highlights</h3>
        <p class="study-small">Choose a colour, then tap a word in the verse. You can also colour the whole verse.</p>
        <div class="highlight-palette" role="group" aria-label="Highlight colours">
          <button type="button" class="highlight-color" data-highlight="#f5d76e" style="background:#f5d76e" aria-label="Yellow highlight" aria-pressed="true"></button>
          <button type="button" class="highlight-color" data-highlight="#a8ddb5" style="background:#a8ddb5" aria-label="Green highlight" aria-pressed="false"></button>
          <button type="button" class="highlight-color" data-highlight="#a9d6f5" style="background:#a9d6f5" aria-label="Blue highlight" aria-pressed="false"></button>
          <button type="button" class="highlight-color" data-highlight="#e7b5e8" style="background:#e7b5e8" aria-label="Purple highlight" aria-pressed="false"></button>
          <button type="button" class="highlight-color" data-highlight="#f4b6a6" style="background:#f4b6a6" aria-label="Pink highlight" aria-pressed="false"></button>
          <button type="button" class="highlight-color" data-highlight="#f2c58d" style="background:#f2c58d" aria-label="Orange highlight" aria-pressed="false"></button>
        </div>
        <button type="button" class="study-action" id="zurielHighlightWholeVerse">Highlight Whole Verse</button>
        <button type="button" class="study-secondary" id="zurielClearVerseHighlights">Clear This Verse</button>
        <p class="study-small" id="zurielHighlightStatus" aria-live="polite">Yellow selected. Tap a word to highlight it.</p>
        <p class="word-selection-label" id="zurielSelectedEnglishWord">Selected English word: none</p>
      </div>

      <button type="button" class="study-secondary" id="zurielSaveVerseBookmark">🔖 Save This Verse to My Library</button>
      <p class="study-small" id="zurielBookmarkStatus" aria-live="polite"></p>

      <div id="zurielStudySections">

        <details open>
          <summary>📜 1. Scripture and Historical Context</summary>
          <div class="study-body" id="zurielContext">
            <p>Select a passage to begin its study.</p>
            <p>Consider the author, original audience, historical setting,
            literary structure and surrounding chapter.</p>
          </div>
        </details>

        <details>
          <summary>💡 2. Meaning and Exposition</summary>
          <div class="study-body" id="zurielMeaning">
            <p>Understand each verse within its chapter, book and wider
            biblical context. Compare Scripture with Scripture.</p>
            <p>Detailed explanations will be developed passage by passage
            using checked study resources.</p>
          </div>
        </details>

        <details>
          <summary>🔤 3. Hebrew and Greek Word Study</summary>
          <div class="study-body" id="zurielOriginalWords">
            <p>Original-language words for your selected verse. Tap any word to open its Strong's lexicon entry.</p>
            <div id="zurielOriginalWordResults" aria-live="polite">
              <p>Select a verse to load its Hebrew or Greek word study.</p>
            </div>
            <div id="zurielLexiconDetails" aria-live="polite"></div>
            <p class="study-source">Interlinear word data: Berean interlinear tables. Lexicon: STEPBible / Tyndale House, Cambridge (CC BY 4.0).</p>
          </div>
        </details>

        <details>
          <summary>📖 Biblical Dictionary — Search Key Terms</summary>
          <div class="study-body">
            <p>Search concise explanations of important biblical words and themes. These are introductory study summaries, not exhaustive lexical definitions; always read the linked passages in context.</p>
            <label for="zurielDictionarySearch">Search dictionary</label>
            <input id="zurielDictionarySearch" type="search" placeholder="Try grace, covenant, faith, holiness…" autocomplete="off">
            <div id="zurielDictionaryResults" aria-live="polite">
              <p>Type a word to explore its meaning and Scripture connections.</p>
            </div>
          </div>
        </details>

        <details>
          <summary>🔗 4. Connected Scriptures</summary>
          <div class="study-body">
            <p>Related Scriptures for the selected verse. Tap a reference to open it.</p>
            <div id="zurielCrossReferenceList" aria-live="polite">
              <p>Select a verse to find connected Scriptures.</p>
            </div>
          </div>
        </details>

        <details>
          <summary>📚 5. Theology and Deeper Study</summary>
          <div class="study-body" id="zurielDeeperStudy">
            <p>Explore biblical themes, teachings and connections.
            Distinguish the meaning of Scripture from personal interpretation.</p>
          </div>
        </details>

        <details>
          <summary>🧭 6. Topical Scripture Connections</summary>
          <div class="study-body" id="zurielTopicalConnections" aria-live="polite">
            <p>Select a verse to discover its mapped biblical themes and related passages.</p>
          </div>
        </details>

        <details>
          <summary>📝 7. My Personal Study Journal</summary>
          <div class="study-body">
            <p>Your notes are saved separately for each verse on this device.</p>

            <label for="zurielStudyTitle">Study title</label>
            <input id="zurielStudyTitle" placeholder="Give this study a title">

            <label for="zurielStudyNote">What have I learned?</label>
            <textarea id="zurielStudyNote"
              placeholder="Write your observations and discoveries..."></textarea>

            <label for="zurielStudyApplication">How will I apply this Word?</label>
            <textarea id="zurielStudyApplication"
              placeholder="Write your personal application..."></textarea>

            <button class="study-action" id="zurielSaveStudyNote">
              Save My Study
            </button>
            <button class="study-secondary" id="zurielClearStudyNote">
              Clear Fields
            </button>
            <p id="zurielStudySaveStatus"></p>
          </div>
        </details>

        <details>
          <summary>🙏 7. Prayer and Declaration</summary>
          <div class="study-body" id="zurielPrayerDeclaration">
            <h3>Prayer</h3>
            <p>Heavenly Father, give me understanding as I study Your Word.
            Help me receive its truth and walk in wisdom. In Jesus' name, Amen.</p>
            <h3>Declaration</h3>
            <p>I receive God's Word with faith. I grow in understanding,
            walk in His wisdom and live according to His truth.</p>
          </div>
        </details>
      </div>

      <div id="zurielGenesisStudy" style="display:none">
        <h2>🌍 Genesis 1:1 — Expanded Study</h2>

        <details>
          <summary>📜 Historical and Literary Context</summary>
          <div class="study-body">
            <h3>Book introduction</h3>
            <p>Genesis is the opening book of the Bible and the first
            book of the Pentateuch. It introduces creation, humanity,
            sin, God's promises and the beginnings of Israel.</p>
            <h3>Authorship and setting</h3>
            <p>Jewish and Christian tradition associates Genesis with Moses.
            Its literary history has also been examined by modern scholarship.</p>
            <h3>Literary structure</h3>
            <p>Genesis 1:1 introduces creation. Genesis 1:2 describes
            the earth's initial condition. The following verses describe
            God's creative commands and the ordering of creation.</p>
          </div>
        </details>

        <details>
          <summary>💡 Meaning and Exposition</summary>
          <div class="study-body">
            <h3>In the beginning</h3>
            <p>The opening words establish the beginning of the created order.</p>
            <h3>God</h3>
            <p>God is the central subject of the sentence. The verse
            presents Him as distinct from the created order.</p>
            <h3>Created</h3>
            <p>The Hebrew verb describes God's creative action and authority.</p>
            <h3>The heaven and the earth</h3>
            <p>This expression presents the totality of the created realm.</p>
            <h3>Main teachings</h3>
            <ul>
              <li>God is the Creator.</li>
              <li>Creation belongs to God.</li>
              <li>All created things depend upon Him.</li>
              <li>Creation calls for humility, gratitude and worship.</li>
            </ul>
          </div>
        </details>

        <details>
          <summary>🔤 Hebrew Word Study</summary>
          <div class="study-body">
            <div class="study-word">
              <h3>בְּרֵאשִׁית — Bereshit</h3>
              <p>Meaning: In the beginning.</p>
            </div>
            <div class="study-word">
              <h3>בָּרָא — Bara</h3>
              <p>Meaning: Created. A verb describing the creative action.</p>
            </div>
            <div class="study-word">
              <h3>אֱלֹהִים — Elohim</h3>
              <p>Meaning: God. The subject of the sentence.</p>
            </div>
            <div class="study-word">
              <h3>הַשָּׁמַיִם — Hashamayim</h3>
              <p>Meaning: The heavens.</p>
            </div>
            <div class="study-word">
              <h3>הָאָרֶץ — Ha'aretz</h3>
              <p>Meaning: The earth or land.</p>
            </div>
            <p>Further verified study can add Strong's numbers,
            pronunciation, grammatical parsing and lexical references.</p>
          </div>
        </details>

        <details>
          <summary>📚 Theology and Deeper Study</summary>
          <div class="study-body">
            <h3>God as Creator</h3>
            <p>Everything that exists is dependent upon God.</p>
            <h3>Creation and Christ</h3>
            <p>John 1:1–3 and Colossians 1:16–17 connect creation
            with the Word and the person of Jesus Christ.</p>
            <h3>Creation and faith</h3>
            <p>Hebrews 11:3 connects creation with faith.</p>
            <h3>Questions for reflection</h3>
            <ol>
              <li>What does this verse reveal about God's identity?</li>
              <li>What does creation reveal about God's authority?</li>
              <li>How should belief in God as Creator shape our lives?</li>
              <li>How do John 1:1–3 and Genesis 1:1 connect?</li>
            </ol>
          </div>
        </details>
      </div>

      <p class="study-small">
        Zuriel Living Word Bible — His Words.. My Life.. My Victory.
      </p>
    `;

    const main = document.querySelector("main");
    (main || document.body).appendChild(panel);

    // Searchable offline biblical dictionary.
    const dictionarySearch = panel.querySelector("#zurielDictionarySearch");
    const dictionaryResults = panel.querySelector("#zurielDictionaryResults");
    function renderDictionary(query) {
      if (!dictionaryResults) return;
      dictionaryResults.replaceChildren();
      const term = String(query || "").trim().toLowerCase();
      const matches = bibleDictionary.filter(entry =>
        !term || (entry[0] + " " + entry[1]).toLowerCase().includes(term)
      ).slice(0, 12);
      if (!matches.length) {
        const empty = document.createElement("p");
        empty.textContent = "No matching starter entry. Try a broader biblical term.";
        dictionaryResults.appendChild(empty);
        return;
      }
      matches.forEach(entry => {
        const item = document.createElement("article");
        item.className = "study-word";
        const heading = document.createElement("h3");
        heading.textContent = entry[0];
        const meaning = document.createElement("p");
        meaning.textContent = entry[1];
        item.append(heading, meaning);
        dictionaryResults.appendChild(item);
      });
    }
    if (dictionarySearch) {
      dictionarySearch.addEventListener("input", () => renderDictionary(dictionarySearch.value));
      renderDictionary("");
    }

    function readHighlights() {
      try {
        return JSON.parse(localStorage.getItem(HIGHLIGHTS_KEY)) || {};
      } catch (error) {
        return {};
      }
    }

    function highlightKey(ref) {
      return ref.book + "|" + ref.chapter + "|" + ref.verse;
    }

    function paintSavedHighlights(ref) {
      const record = readHighlights()[highlightKey(ref)] || {};
      const verseElement = findVerseElement(ref.verse);
      if (!verseElement) return;

      verseElement.style.backgroundColor = record.verseColor || "";
      verseElement.querySelectorAll(".verse-word").forEach(function (word) {
        const index = word.dataset.wordIndex;
        word.style.backgroundColor =
          record.words && record.words[index] ? record.words[index] : "";
      });
    }

    function saveHighlightRecord(ref, record) {
      const all = readHighlights();
      const key = highlightKey(ref);
      if (record && (record.verseColor || Object.keys(record.words || {}).length)) {
        all[key] = record;
      } else {
        delete all[key];
      }
      localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(all));
      paintSavedHighlights(ref);
    }

    function getCurrentHighlightRecord() {
      return readHighlights()[highlightKey(selectedReference)] || { words: {} };
    }

    function applyWordHighlight() {
      if (!selectedReference || selectedEnglishWordIndex < 0) return;
      const record = getCurrentHighlightRecord();
      record.words = record.words || {};
      record.words[String(selectedEnglishWordIndex)] = activeHighlightColor;
      saveHighlightRecord(selectedReference, record);
      document.getElementById("zurielHighlightStatus").textContent =
        "Word highlighted. Your choice is saved on this device.";
    }

    function applyVerseHighlight() {
      if (!selectedReference) return;
      const record = getCurrentHighlightRecord();
      record.verseColor = activeHighlightColor;
      saveHighlightRecord(selectedReference, record);
      document.getElementById("zurielHighlightStatus").textContent =
        "The whole verse is highlighted and saved on this device.";
    }

    function clearVerseHighlights() {
      if (!selectedReference) return;
      saveHighlightRecord(selectedReference, { words: {} });
      document.getElementById("zurielHighlightStatus").textContent =
        "Highlights cleared for this verse.";
    }

    function findVerseElement(number) {
      const verses = document.querySelectorAll("#message .verse");
      for (const item of verses) {
        const label = item.querySelector("strong");
        if (label && label.textContent.trim().replace(".", "") === String(number)) {
          return item;
        }
      }
      return null;
    }

    function highlightVerse(number) {
      document.querySelectorAll(".verse.zuriel-selected-verse")
        .forEach(item => item.classList.remove("zuriel-selected-verse"));

      const target = findVerseElement(number);
      if (target) target.classList.add("zuriel-selected-verse");
    }

    function renderTopicalConnections(ref) {
      const target = document.getElementById("zurielTopicalConnections");
      if (!target) return;
      target.replaceChildren();
      const index = window.ZurielTopicalIndex;
      if (!index || typeof index.findForReference !== "function") {
        target.textContent = "The topical index is not available yet. Reload after the study resources update.";
        return;
      }
      const reference = ref.book + " " + ref.chapter + ":" + ref.verse;
      const matches = index.findForReference(reference);
      const intro = document.createElement("p");
      intro.textContent = matches.length
        ? "Themes mapped to " + reference + ". Open any passage below to continue studying its connection."
        : "No curated topic is mapped directly to " + reference + " yet. Browse the topic directory below to explore related biblical themes.";
      target.appendChild(intro);

      function openReference(item) {
        if (typeof window.openChapter !== "function") return;
        window.openChapter(item.book, item.chapter).then(function () {
          const verseElements = document.querySelectorAll("#message .verse");
          const selected = verseElements[item.verse - 1];
          if (!selected) return;
          const verseText = selected.textContent.replace(/^\s*\d+\.?\s*/, "").trim();
          selected.scrollIntoView({ behavior: "smooth", block: "center" });
          selected.classList.add("zuriel-selected-verse");
          if (window.ZurielStudy && typeof window.ZurielStudy.openForReference === "function") {
            window.ZurielStudy.openForReference(item.book, item.chapter, item.verse, verseText, "", -1);
          }
        });
      }

      function topicCard(topic) {
        const card = document.createElement("div");
        card.className = "study-word";
        const heading = document.createElement("h3");
        heading.textContent = topic.title;
        card.appendChild(heading);
        const summary = document.createElement("p");
        summary.textContent = topic.summary;
        card.appendChild(summary);
        function addSection(title, body) {
          if (!body) return;
          const section = document.createElement("section");
          section.className = "zuriel-topic-study-section";
          const h = document.createElement("h4");
          h.textContent = title;
          const p = document.createElement("p");
          p.textContent = body;
          section.append(h, p);
          card.appendChild(section);
        }
        addSection("Biblical definition and explanation", topic.definition);
        addSection("Old Testament foundations", topic.oldTestament);
        addSection("New Testament fulfilment and development", topic.newTestament);
        if (Array.isArray(topic.languageWords) && topic.languageWords.length) {
          const section = document.createElement("section");
          section.className = "zuriel-topic-study-section";
          const h = document.createElement("h4");
          h.textContent = "Important Hebrew and Greek words";
          section.appendChild(h);
          topic.languageWords.forEach(function(word) {
            const entry = document.createElement("div");
            entry.className = "zuriel-topic-language";
            const p = document.createElement("p");
            p.textContent = word.language + " • " + word.script + " • " + word.term;
            const meaning = document.createElement("p");
            meaning.textContent = "Meaning: " + word.meaning;
            const note = document.createElement("p");
            note.textContent = word.note;
            entry.append(p, meaning, note);
            section.appendChild(entry);
          });
          card.appendChild(section);
        }
        if (Array.isArray(topic.relatedExplanations) && topic.relatedExplanations.length) {
          const section = document.createElement("section");
          section.className = "zuriel-topic-study-section";
          const h = document.createElement("h4");
          h.textContent = "Related passages and their connections";
          section.appendChild(h);
          topic.relatedExplanations.forEach(function(text) {
            const p = document.createElement("p");
            p.textContent = text;
            section.appendChild(p);
          });
          card.appendChild(section);
        }
        addSection("Practical application", topic.application);
        if (Array.isArray(topic.questions) && topic.questions.length) {
          const section = document.createElement("section");
          section.className = "zuriel-topic-study-section";
          const h = document.createElement("h4");
          h.textContent = "Questions for personal study";
          section.appendChild(h);
          const list = document.createElement("ol");
          topic.questions.forEach(function(question) {
            const li = document.createElement("li");
            li.textContent = question;
            list.appendChild(li);
          });
          section.appendChild(list);
          card.appendChild(section);
        }
        const linksHeading = document.createElement("h4");
        linksHeading.textContent = "Open the Scripture passages";
        card.appendChild(linksHeading);
        const links = document.createElement("div");
        links.className = "study-topic-links";
        topic.references.forEach(function(item) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "study-link";
          button.textContent = item.label;
          button.addEventListener("click", function() { openReference(item); });
          links.appendChild(button);
        });
        card.appendChild(links);
        return card;
      }

      if (matches.length) {
        const matchedHeading = document.createElement("h3");
        matchedHeading.textContent = "Directly mapped themes";
        target.appendChild(matchedHeading);
        matches.forEach(function (topic) { target.appendChild(topicCard(topic)); });
      }

      const directoryHeading = document.createElement("h3");
      directoryHeading.textContent = "Explore the topical library";
      target.appendChild(directoryHeading);
      const count = document.createElement("p");
      count.textContent = index.list().length + " curated topics across the Bible's 66 books";
      target.appendChild(count);
      const search = document.createElement("input");
      search.type = "search";
      search.className = "study-topic-search";
      search.placeholder = "Search a topic, theme or keyword…";
      search.setAttribute("aria-label", "Search topical Bible studies");
      search.style.width = "100%";
      search.style.boxSizing = "border-box";
      search.style.padding = "12px";
      search.style.margin = "8px 0";
      search.style.borderRadius = "10px";
      search.style.border = "1px solid var(--border, #c9c2b4)";
      target.appendChild(search);

      const directory = document.createElement("div");
      directory.className = "study-topic-links";
      target.appendChild(directory);
      function showTopics(query) {
        directory.replaceChildren();
        const found = typeof index.search === "function"
          ? index.search(query).slice(0, 80)
          : index.list().filter(function (topic) {
              return (topic.title + " " + topic.summary).toLowerCase().includes(String(query).toLowerCase());
            }).slice(0, 80);
        if (!found.length) {
          const empty = document.createElement("p");
          empty.textContent = "No matching topic yet. Try a broader word such as faith, prayer, Jesus or hope.";
          directory.appendChild(empty);
          return;
        }
        found.forEach(function (topic) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "study-link";
          button.textContent = topic.title;
          button.addEventListener("click", function () {
            const old = target.querySelector(".zuriel-open-topic");
            if (old) old.remove();
            const card = topicCard(topic);
            card.classList.add("zuriel-open-topic");
            directory.insertBefore(card, directory.firstChild);
          });
          directory.appendChild(button);
        });
      }
      search.addEventListener("input", function () { showTopics(search.value); });
      showTopics("");
    }

    // Build an offline study framework from the actual KJV chapter currently
    // on screen. It gives the reader immediate literary context without
    // pretending that automated prompts are a scholarly commentary.
    function renderStudyFramework(ref) {
      const verses = Array.from(document.querySelectorAll("#message .verse"));
      const selected = findVerseElement(ref.verse);
      const context = document.getElementById("zurielContext");
      const meaning = document.getElementById("zurielMeaning");
      const deeper = document.getElementById("zurielDeeperStudy");
      if (!context || !meaning || !deeper) return;

      function verseRecord(element) {
        if (!element) return null;
        const label = element.querySelector("strong");
        const number = label
          ? label.textContent.trim().replace(/\.$/, "")
          : "";
        const text = element.textContent.replace(/^\s*\d+\.?\s*/, "").trim();
        return { number: number, text: text };
      }

      function addLine(parent, headingText, bodyText) {
        const heading = document.createElement("h3");
        heading.textContent = headingText;
        parent.appendChild(heading);
        const paragraph = document.createElement("p");
        paragraph.textContent = bodyText;
        parent.appendChild(paragraph);
      }

      context.replaceChildren();
      const index = verses.indexOf(selected);
      const previous = index > 0 ? verseRecord(verses[index - 1]) : null;
      const current = verseRecord(selected);
      const next = index >= 0 && index < verses.length - 1
        ? verseRecord(verses[index + 1]) : null;

      addLine(context, "Read the passage in context",
        "Begin with " + ref.book + " chapter " + ref.chapter +
        ". Read the whole chapter before drawing a conclusion from one verse.");
      if (previous) {
        addLine(context, "Immediately before — verse " + previous.number,
          previous.text);
      } else {
        addLine(context, "Chapter opening",
          "This is the first displayed verse of the chapter. Read the chapter heading and opening paragraph in your wider Bible study.");
      }
      addLine(context, "Selected verse — " + ref.verse,
        current ? current.text : (ref.text || "Selected verse text is not currently visible."));
      if (next) {
        addLine(context, "Immediately after — verse " + next.number,
          next.text);
      } else {
        addLine(context, "Chapter ending",
          "This is the last displayed verse of the chapter. Continue into the next chapter to follow the argument or narrative.");
      }
      addLine(context, "Context questions",
        "Who is speaking? To whom? What is happening? What comes before and after? What kind of writing is this — narrative, poetry, prophecy, teaching or a letter?");
      
      meaning.replaceChildren();
      addLine(meaning, "1. Observe what the verse says",
        "List the people, actions, repeated words, commands, promises, reasons and contrasts that are actually present in the text.");
      addLine(meaning, "2. Understand what it meant",
        "Compare the verse with its immediate context, the purpose of the book and other clear Scriptures. Do not build a teaching on an isolated phrase.");
      addLine(meaning, "3. Distinguish text from interpretation",
        "Keep the exact Bible wording separate from your explanation. Where Christians understand a passage differently, note the alternatives fairly rather than presenting one inference as a direct quotation.");
      addLine(meaning, "4. Apply it faithfully",
        "Ask what the passage reveals about God, what response it calls for, and how that response fits the whole teaching of Scripture.");

      renderTopicalConnections(ref);

      deeper.replaceChildren();
      addLine(deeper, "Whole-Bible study",
        "Read connected passages in their own context. A cross-reference can illuminate a theme, but it does not automatically mean both passages make exactly the same point.");
      addLine(deeper, "Careful interpretation",
        "Notice the original audience, historical setting, literary form and the paragraph's main idea. Separate what the passage states from what you conclude from it.");
      addLine(deeper, "Personal reflection",
        "What truth should shape your thinking? Is there an instruction to obey, a promise to trust, an example to follow or a warning to heed? Record the reason from the text.");
    }

    function loadSavedNote() {
      if (!selectedReference) return;
      const record = readNotes()[noteKey(selectedReference)];

      document.getElementById("zurielStudyTitle").value =
        record ? record.title || "" : "";
      document.getElementById("zurielStudyNote").value =
        record ? record.note || "" : "";
      document.getElementById("zurielStudyApplication").value =
        record ? record.application || "" : "";
      document.getElementById("zurielStudySaveStatus").textContent =
        record ? "Saved study loaded for this verse." : "";
    }

    function openCrossReference(item) {
      if (typeof window.openChapter !== "function") {
        document.getElementById("zurielStudySaveStatus").textContent =
          "The Bible reader is not available.";
        return;
      }

      window.openChapter(item[0], item[1]).then(function () {
        const bookSelect = document.getElementById("book");
        if (bookSelect) bookSelect.value = item[0];

        const target = findVerseElement(item[2]);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          highlightVerse(item[2]);
        }
      });
    }

    document.querySelectorAll("#zurielStudyPanel .highlight-color")
      .forEach(function (button) {
        button.addEventListener("click", function () {
          activeHighlightColor = button.dataset.highlight;
          document.querySelectorAll("#zurielStudyPanel .highlight-color")
            .forEach(item => item.setAttribute("aria-pressed", String(item === button)));
          if (selectedReference && selectedEnglishWordIndex >= 0) {
            applyWordHighlight();
            document.getElementById("zurielHighlightStatus").textContent =
              "Selected word highlighted and saved. Choose another word to study it.";
          } else {
            document.getElementById("zurielHighlightStatus").textContent =
              "Colour selected. Tap a word in the verse or highlight the whole verse.";
          }
        });
      });

    document.getElementById("zurielHighlightWholeVerse")
      .addEventListener("click", applyVerseHighlight);

    document.getElementById("zurielSaveVerseBookmark")
      .addEventListener("click", function () {
        if (!selectedReference) {
          document.getElementById("zurielBookmarkStatus").textContent =
            "Select a Scripture verse first.";
          return;
        }

        try {
          const key = "zuriel_personal_library_v1";
          const data = JSON.parse(localStorage.getItem(key) || "{}");
          const bookmarks = Array.isArray(data.bookmarks) ? data.bookmarks : [];
          const reference = selectedReference.book + " " +
            selectedReference.chapter + ":" + selectedReference.verse;
          const exists = bookmarks.some(item => item.reference === reference);
          if (!exists) {
            bookmarks.push({
              title: reference,
              reference: reference,
              text: selectedReference.text || "",
              type: "scripture",
              savedAt: new Date().toISOString()
            });
            data.bookmarks = bookmarks;
            localStorage.setItem(key, JSON.stringify(data));
          }
          document.getElementById("zurielBookmarkStatus").textContent =
            exists ? reference + " is already in My Saved Library." :
              reference + " saved to My Saved Library on this device.";
        } catch (error) {
          document.getElementById("zurielBookmarkStatus").textContent =
            "Unable to save this bookmark. Please check device storage.";
        }
      });

    document.getElementById("zurielClearVerseHighlights")
      .addEventListener("click", clearVerseHighlights);

    document.getElementById("zurielSaveStudyNote")
      .addEventListener("click", function () {
        if (!selectedReference) {
          document.getElementById("zurielStudySaveStatus").textContent =
            "Select a Bible verse before saving your study.";
          return;
        }

        try {
          const notes = readNotes();
          notes[noteKey(selectedReference)] = {
            title: document.getElementById("zurielStudyTitle").value,
            note: document.getElementById("zurielStudyNote").value,
            application: document.getElementById("zurielStudyApplication").value,
            updated: new Date().toISOString()
          };
          localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
          document.getElementById("zurielStudySaveStatus").textContent =
            "Your study has been saved on this device.";
        } catch (error) {
          document.getElementById("zurielStudySaveStatus").textContent =
            "Unable to save. Please check device storage.";
        }
      });

    document.getElementById("zurielClearStudyNote")
      .addEventListener("click", function () {
        document.getElementById("zurielStudyTitle").value = "";
        document.getElementById("zurielStudyNote").value = "";
        document.getElementById("zurielStudyApplication").value = "";
        document.getElementById("zurielStudySaveStatus").textContent =
          "Fields cleared. Previously saved notes remain saved.";
      });

    document.getElementById("zurielReturnToVerse")
      .addEventListener("click", function () {
        if (!selectedReference || typeof window.openChapter !== "function") return;

        window.openChapter(
          selectedReference.book,
          selectedReference.chapter
        ).then(function () {
          setTimeout(function () {
            const target = findVerseElement(selectedReference.verse);
            if (target) {
              highlightVerse(selectedReference.verse);
              target.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 150);
        });
      });

    document.getElementById("zurielCloseStudy")
      .addEventListener("click", function () {
        panel.style.display = "none";
      });

    window.ZurielStudy = {
      openForReference: function (book, chapter, verse, verseText, englishWord, wordIndex) {
        selectedReference = {
          book: book,
          chapter: chapter,
          verse: verse,
          text: verseText
        };
        selectedEnglishWord = englishWord || "";
        selectedEnglishWordIndex = Number.isInteger(wordIndex) ? wordIndex : -1;

        document.getElementById("zurielSelectedReference").textContent =
          book + " " + chapter + ":" + verse + " — KJV";

        document.getElementById("zurielSelectedText").textContent =
          verseText;

        document.getElementById("zurielSelectionNotice").textContent =
          "Selected verse. Study the passage in its biblical context.";
        document.getElementById("zurielSelectedEnglishWord").textContent =
          "Selected English word: " + (selectedEnglishWord || "whole verse");

        document.getElementById("zurielGenesisStudy").style.display =
          book === "Genesis" && chapter === 1 && verse === 1
            ? "block" : "none";

        panel.style.display = "block";
        highlightVerse(verse);
        renderStudyFramework(selectedReference);
        paintSavedHighlights(selectedReference);
        loadSavedNote();

        // Open the study sections automatically so the selected verse's
        // original-language words and connected Scriptures are immediately visible.
        const originalWordsSection = document.getElementById("zurielOriginalWords");
        const originalWordsDetails = originalWordsSection
          ? originalWordsSection.closest("details") : null;
        if (originalWordsDetails) originalWordsDetails.open = true;

        const crossReferenceList = document.getElementById("zurielCrossReferenceList");
        const crossReferenceDetails = crossReferenceList
          ? crossReferenceList.closest("details") : null;
        if (crossReferenceDetails) crossReferenceDetails.open = true;

        loadOriginalWords(selectedReference);
        loadRelatedScriptures(selectedReference);

        panel.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Bring the expanded word-study section into view inside the study panel.
        window.setTimeout(function () {
          if (originalWordsDetails) {
            originalWordsDetails.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });
          }
        }, 120);
      }
    };
  }

  createStudyPanel();

})();

