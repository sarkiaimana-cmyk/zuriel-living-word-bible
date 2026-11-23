/* Zuriel Expanded Offline Study Library — structured, searchable study aids. */
(function () {
  "use strict";

  const SOURCES = [
    ["Theological Comparisons", "./data/zuriel-theological-comparisons.json", "entries", "theology"],
    ["Commentary & Exegesis", "./data/zuriel-passage-commentary-expansion.json", "entries", "commentary"],
    ["Topical Studies", "./data/zuriel-topical-bible-study-library-batch-2.json", "entries", "topic"],
    ["Topical Studies", "./data/zuriel-topical-bible-study-library-batch-3.json", "entries", "topic"],
    ["Bible Dictionary", "./data/zuriel-biblical-dictionary-expansion.json", "entries", "dictionary"],
    ["Hebrew & Greek Word Studies", "./data/zuriel-original-language-word-studies-batch-1.json", "entries", "word"],
    ["Hebrew & Greek Word Studies", "./data/zuriel-original-language-word-studies-batch-2.json", "entries", "word"],
    ["Names & Titles of God", "./data/zuriel-names-and-titles-of-god-library.json", "entries", "name"],
    ["Connected Scripture Trails", "./data/zuriel-connected-scripture-trails-batch-1.json", "trails", "trail"],
    ["Connected Scripture Trails", "./data/zuriel-connected-scripture-trails-batch-2.json", "trails", "trail"],
    ["Book Introductions", "./data/zuriel-book-introductions-and-study-pathways.json", "bookIntroductions", "introduction"],
    ["Book Study Pathways", "./data/zuriel-book-introductions-and-study-pathways.json", "bookStudyPathways", "book-pathway"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-genesis-01-10.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-exodus-01-10.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-exodus-11-20.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-exodus-21-30.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-exodus-31-40.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-leviticus-01-10.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-leviticus-11-27.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-numbers-01-10.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-numbers-11-18.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-numbers-19-36.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-deuteronomy-01-17.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-deuteronomy-18-34.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-joshua-01-12.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-joshua-13-24.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-judges-01-10.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-judges-11-21.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-ruth-01-04.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-1-samuel-01-16.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-1-samuel-17-31.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-2-samuel-01-12.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-2-samuel-13-24.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-1-kings-01-11.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-1-kings-12-22.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-2-kings-01-13.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-2-kings-14-25.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-1-chronicles-01-15.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-1-chronicles-16-29.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-2-chronicles-01-18.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-2-chronicles-19-36.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-ezra-01-10.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-nehemiah-01-13.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-esther-01-10.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-job-01-21.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-job-22-42.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-psalms-01-30.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-psalms-31-60.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-psalms-61-90.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-psalms-91-120.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-psalms-121-150.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-proverbs-01-31.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-ecclesiastes-01-12.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-song-of-solomon-01-08.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-isaiah-01-22.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-isaiah-23-44.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-isaiah-45-66.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-jeremiah-01-26.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-jeremiah-27-52.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-lamentations-01-05.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-ezekiel-01-24.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-ezekiel-25-48.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-daniel-01-12.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-hosea-01-14.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-joel-01-03.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-amos-01-09.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-obadiah-01.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-jonah-01-04.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-micah-01-07.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-nahum-01-03.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-habakkuk-01-03.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-zephaniah-01-03.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-haggai-01-02.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-zechariah-01-14.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-matthew-01-14.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-matthew-15-28.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-mark-01-08.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-mark-09-16.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-malachi-01-04.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-john-01-10.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-john-11-21.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-luke-01-12.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-luke-13-24.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-john-11-12.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-john-13-21.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-acts-01-14.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-acts-15-28.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-romans-01-08.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-romans-09-16.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-1-corinthians-01-16.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-2-corinthians-01-13.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-galatians-01-06.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-ephesians-01-06.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-philippians-01-04.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-colossians-01-04.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-1-thessalonians-01-05.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-1-timothy-01-06.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-2-timothy-01-04.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-titus-01-03.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-philemon-01.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-hebrews-01-13.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-james-01-05.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-1-peter-01-05.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-2-peter-01-03.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-1-john-01-05.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-2-john-01.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-3-john-01.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-jude-01.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-revelation-01-22.json", "chapters", "chapter-introduction"],
    ["Chapter Introductions", "./data/zuriel-chapter-introductions-2-thessalonians-01-03.json", "chapters", "chapter-introduction"],

    ["Deep Study Guides", "./data/zuriel-deep-study-guides.json", "guides", "guide"],
    ["Bible Geography", "./data/zuriel-bible-geography-atlas.json", "places", "place"],
    ["Bible Geography", "./data/zuriel-bible-geography-atlas.json", "journeys", "journey"],
    ["Songs, Hymns & Worship Studies", "./data/zuriel-worship-study-pathways.json", "pathways", "worship"]
  ];

  const state = { items: [], ready: false, error: null, loading: null };
  const text = value => Array.isArray(value) ? value.map(text).filter(Boolean).join(" • ")
    : value && typeof value === "object" ? Object.values(value).map(text).filter(Boolean).join(" • ")
    : value === undefined || value === null ? "" : String(value);

  function titleFor(item, kind) {
    return text(item.title || item.name || item.term || item.passage || item.book ||
      item.theme || item.id || kind);
  }
  function summaryFor(item) {
    return text(item.contextAndMeaning || item.overview || item.definition ||
      item.significance || item.focus || item.summary || item.description ||
      item.meaning || item.contextualGloss || item.context || item.theme || item.subtitle || item.question || item.sharedGround);
  }
  function refsFor(item) {
    const values = item.references || item.scriptureReferences || item.keyPassages ||
      item.passages || item.passageReferences || item.relatedReferences ||
      (Array.isArray(item.pathway) ? item.pathway.map(step => step.reference) : []);
    const refs = Array.isArray(values) ? values : [values];
    const output = refs.map(value => {
      if (typeof value === "string") return value;
      if (value && typeof value === "object") return text(value.label || value.reference || value.passage);
      return "";
    }).filter(Boolean);
    if (item.passage) output.unshift(text(item.passage));
    return Array.from(new Set(output));
  }

  function normalizeSearchText(value) {
    return String(value || "").normalize("NFKC").toLocaleLowerCase()
      .normalize("NFD").replace(/\p{M}/gu, "")
      .replace(/[^\p{L}\p{N}\s:.-]/gu, " ")
      .replace(/\s+/g, " ").trim();
  }

  function rankSearchResults(items, query, category) {
    const normalized = normalizeSearchText(query);
    if (!normalized) return items.filter(item => !category || category === "all" || item.category === category);
    const tokens = normalized.split(" ").filter(Boolean);
    return items.map((item, index) => {
      if (category && category !== "all" && item.category !== category) return null;
      const searchable = item.searchText || normalizeSearchText(
        item.title + " " + item.summary + " " + (item.references || []).join(" ") + " " + JSON.stringify(item.source || {})
      );
      if (!tokens.every(token => searchable.includes(token))) return null;
      const title = normalizeSearchText(item.title);
      const summary = normalizeSearchText(item.summary);
      const refs = normalizeSearchText((item.references || []).join(" "));
      let score = 0;
      if (title === normalized) score += 1200;
      else if (title.startsWith(normalized)) score += 700;
      else if (title.includes(normalized)) score += 450;
      if (summary.includes(normalized)) score += 220;
      if (refs.includes(normalized)) score += 180;
      if (searchable.includes(normalized)) score += 100;
      tokens.forEach(token => {
        if (title.includes(token)) score += 45;
        if (summary.includes(token)) score += 20;
        if (refs.includes(token)) score += 25;
      });
      return { item, index, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.index - b.index)
      .map(result => result.item);
  }

  async function loadAll() {
    if (state.loading) return state.loading;
    state.loading = Promise.all(SOURCES.map(async source => {
      const response = await fetch(source[1]);
      if (!response.ok) throw new Error("Could not load " + source[1] + " (" + response.status + ").");
      const data = await response.json();
      if (!data || data.schemaVersion !== 1 || !Array.isArray(data[source[2]])) {
        throw new Error("Study resource format is invalid: " + source[1]);
      }
      return data[source[2]].map(item => {
        const title = titleFor(item, source[3]);
        const summary = summaryFor(item);
        const references = refsFor(item);
        const searchText = normalizeSearchText(
          title + " " + summary + " " + references.join(" ") + " " + JSON.stringify(item)
        );
        return {
          category: source[0], kind: source[3], title,
          summary, references, source: item, searchText
        };
      });
    })).then(groups => {
      state.items = groups.flat();
      state.ready = true;
      return state.items;
    }).catch(error => {
      state.error = error;
      throw error;
    });
    return state.loading;
  }

  function make(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  }

  function parseReference(value) {
    const match = String(value || "").trim().match(/^(.+?)\s+(\d+)(?::(\d+))?/);
    if (!match) return null;
    const book = match[1].trim().replace(/^Psalm$/i, "Psalms").replace(/^Song of Songs$/i, "Song of Solomon");
    return { book: book, chapter: Number(match[2]), verse: Number(match[3] || 1) };
  }

  async function openReference(reference, button, status) {
    const parsed = parseReference(reference);
    if (!parsed) {
      status.textContent = "This reference needs checking before it can be opened: " + reference;
      return;
    }
    if (typeof window.openChapter !== "function" || typeof window.selectBibleVerse !== "function") {
      status.textContent = "The Scripture reader is not ready. Please return to the Bible and try again.";
      return;
    }
    button.disabled = true;
    try {
      await window.openChapter(parsed.book, parsed.chapter);
      if (!window.selectBibleVerse(parsed.verse)) throw new Error("The verse could not be selected.");
      status.textContent = "Opened " + reference + " in the Bible reader.";
      const reader = document.getElementById("bibleReader") || document.getElementById("message");
      if (reader) reader.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      status.textContent = error.message || "This passage could not be opened.";
    } finally {
      button.disabled = false;
    }
  }

  function renderDetail(item, target, status) {
    target.replaceChildren();
    target.appendChild(make("h3", "zsl-detail-title", item.title));
    target.appendChild(make("p", "zsl-detail-summary", item.summary || "Open the linked passages and study the source notes."));
    const fields = [
      ["Bible book", ["book"]],
      ["Chapter number", ["chapter"]],
      ["Question being compared", ["question"]],
      ["Shared Christian ground", ["sharedGround"]],
      ["Historical and literary context", ["historicalSetting", "historicalContext", "background", "literaryContext", "context"]],
      ["Passage meaning", ["contextAndMeaning", "overview", "definition", "meaning", "explanation", "significance", "focus"]],
      ["Original-language form", ["originalForm"]],
      ["Language", ["language"]],
      ["Morphology note", ["morphologyStatus"]],
      ["Contextual word use", ["contextualWordUse", "contextualNotes", "wordUsage", "contextualGloss"]],
      ["Transliteration and lexical identifier", ["transliteration", "strongsNumber", "strongsId", "lexiconId"]],
      ["Study observation", ["studyObservation", "observation", "interpretation", "studyNote"]],
      ["Connected passage explanation", ["connectionNotes", "connections", "relationship", "whyItConnects"]],
      ["Passage-by-passage pathway", ["pathway"]],
      ["Study questions", ["studyQuestions", "questions", "reflectionPrompt"]],
      ["Practical application", ["lifeApplication", "practicalApplication", "application"]],
      ["Interpretive caution", ["interpretiveCaution", "editorialCaution", "contextCaution", "studyCaution", "caution"]],
      ["Areas of disagreement", ["areasOfDisagreement"]],
      ["Reading caution", ["readingCaution"]],
      ["Source and reading note", ["sourceNote", "readingNote", "editorialNote", "provenance"]]
    ];
    fields.forEach(([label, keys]) => {
      const value = keys.map(key => item.source[key]).find(value => value !== undefined && value !== null && text(value).trim());
      if (value === undefined) return;
      const section = make("section", "zsl-detail-section");
      section.appendChild(make("h4", "", label));
      section.appendChild(make("p", "", text(value)));
      target.appendChild(section);
    });
    if (Array.isArray(item.source.positions)) {
      const section = make("section", "zsl-detail-section");
      section.appendChild(make("h4", "", "Representative Christian interpretations"));
      item.source.positions.forEach(position => {
        const block = make("div", "zsl-position");
        block.appendChild(make("h4", "", text(position.view)));
        block.appendChild(make("p", "", text(position.summary)));
        if (position.traditions) block.appendChild(make("p", "", "Often associated with: " + text(position.traditions)));
        section.appendChild(block);
      });
      target.appendChild(section);
    }
    const refs = item.references.length ? item.references : refsFor(item.source);
    if (refs.length) {
      const section = make("section", "zsl-detail-section");
      section.appendChild(make("h4", "", "Open the related Scriptures"));
      refs.forEach(reference => {
        const action = make("button", "zsl-reference", reference);
        action.type = "button";
        action.addEventListener("click", () => openReference(reference, action, status));
        section.appendChild(action);
      });
      target.appendChild(section);
    }
    if (!target.querySelector(".zsl-detail-section")) {
      target.appendChild(make("p", "", "This entry is a study aid. Use its Scripture references to read the passage in context."));
    }
  }

  function installStyles() {
    if (document.getElementById("zurielStudyLibraryStyles")) return;
    const style = make("style");
    style.id = "zurielStudyLibraryStyles";
    style.textContent = `
      #zurielExpandedStudyLibrary{margin:18px 0;padding:15px;border:1px solid #c9b77e;border-radius:15px;background:#f8f6ef;color:#20364b}
      #zurielExpandedStudyLibrary h3{margin:0 0 8px;color:#193c56;font:700 21px Georgia,serif}
      #zurielExpandedStudyLibrary .zsl-intro{font:14px/1.6 Arial,sans-serif;color:#566577}
      #zurielExpandedStudyLibrary .zsl-controls{display:grid;grid-template-columns:minmax(0,1fr);gap:8px;margin:12px 0}
      #zurielExpandedStudyLibrary input,#zurielExpandedStudyLibrary select{width:100%;min-height:44px;padding:10px;border:1px solid #cbd3d5;border-radius:9px;background:#fff;color:#20364b;font:14px Arial,sans-serif}
      #zurielExpandedStudyLibrary .zsl-results{display:grid;gap:8px;margin:12px 0}
      #zurielExpandedStudyLibrary .zsl-result{display:block;width:100%;padding:11px;border:1px solid #d9d2c1;border-radius:10px;background:#fff;text-align:left;color:#20364b}
      #zurielExpandedStudyLibrary .zsl-result strong{display:block;color:#183653;font-size:14px}
      #zurielExpandedStudyLibrary .zsl-result span{display:block;margin-top:4px;color:#5b6874;font-size:12px;line-height:1.5}
      #zurielExpandedStudyLibrary .zsl-detail{margin-top:14px;padding:13px;border:1px solid #d8d4c9;border-radius:11px;background:#fff}
      #zurielExpandedStudyLibrary .zsl-detail-title{margin:0 0 7px}
      #zurielExpandedStudyLibrary .zsl-detail-summary{line-height:1.65}
      #zurielExpandedStudyLibrary .zsl-detail-section{padding-top:9px;margin-top:9px;border-top:1px solid #ece7dc}
      #zurielExpandedStudyLibrary .zsl-detail-section h4{margin:0 0 5px;color:#24445b;font-size:14px}
      #zurielExpandedStudyLibrary .zsl-detail-section p{margin:0;line-height:1.6;font-size:13px;white-space:pre-wrap}
      #zurielExpandedStudyLibrary .zsl-position{padding:8px 0;border-top:1px solid #eee7d9}\n      #zurielExpandedStudyLibrary .zsl-reference{display:inline-block;margin:6px 6px 0 0;padding:8px 10px;min-height:38px;border:1px solid #b9c8d0;border-radius:8px;background:#f4f7f8;color:#183653;font-weight:700}
      #zurielExpandedStudyLibrary .zsl-status{min-height:22px;margin:8px 0;color:#42634f;font-size:12px}
      @media(min-width:620px){#zurielExpandedStudyLibrary .zsl-controls{grid-template-columns:1fr 220px}}
    `;
    document.head.appendChild(style);
  }

  function attach() {
    const content = document.getElementById("zurielLibraryContent");
    if (!content || document.getElementById("zurielExpandedStudyLibrary")) return;
    const heading = content.querySelector("h3");
    if (!heading || !heading.textContent.includes("Deep Bible Study")) return;
    installStyles();

    const root = make("section");
    root.id = "zurielExpandedStudyLibrary";
    root.innerHTML = "";
    root.appendChild(make("h3", "", "Explore the Expanded Study Library"));
    root.appendChild(make("p", "zsl-intro", "Search passage commentary, topical studies, Bible dictionary entries, Hebrew and Greek word studies, Names of God, connected Scripture trails, book and chapter introductions, geography and worship studies. These are study aids, not replacement Scripture."));

    const controls = make("div", "zsl-controls");
    const search = make("input");
    search.type = "search";
    search.placeholder = "Search a passage, doctrine, word, place or theme…";
    search.setAttribute("aria-label", "Search expanded Bible study resources");
    const category = make("select");
    category.setAttribute("aria-label", "Filter study resource category");
    [["all","All study resources"], ...Array.from(new Set(SOURCES.map(x=>x[0]))).map(x=>[x,x])].forEach(([value,label])=>{
      const option=make("option","",label);option.value=value;category.appendChild(option);
    });
    controls.append(search,category);
    root.appendChild(controls);
    const results=make("div","zsl-results");
    const detail=make("article","zsl-detail");
    const status=make("p","zsl-status","Loading offline study resources…");
    root.append(results,detail,status);
    content.appendChild(root);

    function showResults() {
      const query=search.value.trim();
      const selected=category.value;
      const filtered=rankSearchResults(state.items, query, selected);
      results.replaceChildren();
      filtered.slice(0,30).forEach(item=>{
        const action=make("button","zsl-result");
        action.type="button";
        action.appendChild(make("strong","",item.title+" • "+item.category));
        action.appendChild(make("span","",item.summary.slice(0,220)));
        action.addEventListener("click",()=>renderDetail(item,detail,status));
        results.appendChild(action);
      });
      status.textContent=filtered.length+" matching study resources"+(filtered.length>30?"; showing the first 30. Refine your search to see more.":".");
      if(!filtered.length) results.appendChild(make("p","","No matching entry. Try another word or category."));
    }
    search.addEventListener("input",showResults);
    category.addEventListener("change",showResults);
    loadAll().then(()=>{
      showResults();
      if(state.items.length) renderDetail(state.items[0],detail,status);
      status.textContent=state.items.length+" study resources loaded. Search or choose a category to explore.";
    }).catch(error=>{
      status.textContent="Some study resources could not load. Connect once to refresh this section; your Bible and saved records are unchanged.";
      console.error("Zuriel study library:",error);
    });
  }

  function observe() {
    const content=document.getElementById("zurielLibraryContent");
    if(!content) return;
    const observer=new MutationObserver(attach);
    observer.observe(content,{childList:true,subtree:true});
    attach();
  }

  window.ZurielStudyLibrary = {
    load: loadAll,
    search: function(query, options) {
      const settings = options && typeof options === "object" ? options : {};
      const category = typeof settings.category === "string" ? settings.category : "all";
      const limit = Number.isInteger(settings.limit) ? Math.max(1, Math.min(settings.limit, 200)) : 200;
      return loadAll().then(items => rankSearchResults(items, query, category).slice(0, limit));
    },
    openReference: openReference,
    renderDetail: renderDetail
  };

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",observe);
  else observe();
})();
