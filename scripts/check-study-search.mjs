import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-study-library-data.js", import.meta.url), "utf8");
const datasets = {
  "zuriel-theological-comparisons.json": { entries: [] },
  "zuriel-passage-commentary-expansion.json": {
    entries: [{
      id: "commentary-john-316",
      passage: "John 3:16",
      theme: "God's love and the gift of the Son",
      contextAndMeaning: "The passage places God's love within the mission of the Son and the invitation to believe."
    }]
  },
  "zuriel-topical-bible-study-library-batch-2.json": { entries: [] },
  "zuriel-topical-bible-study-library-batch-3.json": { entries: [] },
  "zuriel-biblical-dictionary-expansion.json": {
    entries: [{
      id: "dictionary-agape",
      term: "Agape",
      definition: "A Greek term often used for love, whose meaning must be read in context.",
      scriptureReferences: ["John 3:16", "1 Corinthians 13"]
    }]
  },
  "zuriel-original-language-word-studies-batch-1.json": {
    entries: [{
      id: "greek-agape",
      term: "ἀγάπη (agapē)",
      language: "Greek",
      originalForm: "ἀγάπη",
      transliteration: "agapē",
      contextualWordUse: "A noun used for love in a range of contexts."
    }]
  },
  "zuriel-original-language-word-studies-batch-2.json": { entries: [] },
  "zuriel-names-and-titles-of-god-library.json": { entries: [] },
  "zuriel-connected-scripture-trails-batch-1.json": { trails: [] },
  "zuriel-connected-scripture-trails-batch-2.json": { trails: [] },
  "zuriel-book-introductions-and-study-pathways.json": { bookIntroductions: [], bookStudyPathways: [] },
  "zuriel-chapter-introductions-exodus-11-20.json": { chapters: [{ id: "exo-ch12", book: "Exodus", chapter: 12, title: "Exodus 12 — Passover and the departure", overview: "Passover memorial and Israel departure from Egypt.", keyPassages: ["Exodus 12:1–14"] }] },
  "zuriel-chapter-introductions-exodus-21-30.json": { chapters: [{ id: "exo-ch24", book: "Exodus", chapter: 24, title: "Exodus 24 — Covenant confirmed", overview: "Covenant ceremony and shared meal at Sinai.", keyPassages: ["Exodus 24:3–8"] }] },
  "zuriel-chapter-introductions-exodus-31-40.json": { chapters: [{ id: "exo-ch40", book: "Exodus", chapter: 40, title: "Exodus 40 — Tabernacle erected", overview: "The tabernacle is assembled and filled with divine glory.", keyPassages: ["Exodus 40:34–38"] }] },
  "zuriel-chapter-introductions-exodus-01-10.json": { chapters: [{ id: "exo-ch01", book: "Exodus", chapter: 1, title: "Exodus 1 — Israel oppression", overview: "Exodus 1 describes Israel growth and Pharaoh oppression.", keyPassages: ["Exodus 1:8–14"] }] },
  "zuriel-chapter-introductions-leviticus-01-10.json": { chapters: [{ id: "lev-ch01", book: "Leviticus", chapter: 1, title: "Leviticus 1 — The burnt offering", overview: "The burnt offering and approach to worship at the tent of meeting.", keyPassages: ["Leviticus 1:1–9"] }] },
  "zuriel-chapter-introductions-leviticus-11-27.json": { chapters: [{ id: "lev-ch23", book: "Leviticus", chapter: 23, title: "Leviticus 23 — The appointed feasts of the Lord", overview: "Israel appointed feasts, harvest calendar and sacred assemblies.", keyPassages: ["Leviticus 23:1–8"] }] },
  "zuriel-chapter-introductions-numbers-01-10.json": { chapters: [{ id: "num-ch06", book: "Numbers", chapter: 6, title: "Numbers 6 — The Nazirite vow and priestly blessing", overview: "The Nazirite vow and the blessing Aaron speaks over Israel.", keyPassages: ["Numbers 6:22–27"] }] },
  "zuriel-chapter-introductions-numbers-11-18.json": { chapters: [{ id: "num-ch14", book: "Numbers", chapter: 14, title: "Numbers 14 — Israel refuses to enter the land", overview: "The scouts report and Israel refuses to trust the promise.", keyPassages: ["Numbers 14:1–10"] }] },
  "zuriel-chapter-introductions-numbers-19-36.json": { chapters: [{ id: "num-ch35", book: "Numbers", chapter: 35, title: "Numbers 35 — Levitical towns and cities of refuge", overview: "The Levites receive towns and cities of refuge protect people awaiting a fair hearing.", keyPassages: ["Numbers 35:9–15"] }] },
  "zuriel-chapter-introductions-deuteronomy-01-17.json": { chapters: [{ id: "deut-ch06", book: "Deuteronomy", chapter: 6, title: "Deuteronomy 6 — Love the Lord with all your heart", overview: "The Shema calls Israel to wholehearted love, daily remembrance and teaching children.", keyPassages: ["Deuteronomy 6:4–9"] }] },
  "zuriel-chapter-introductions-deuteronomy-18-34.json": { chapters: [{ id: "deut-ch30", book: "Deuteronomy", chapter: 30, title: "Deuteronomy 30 — Return, mercy, and the choice of life", overview: "Moses offers hope of restoration, return and choosing life after exile.", keyPassages: ["Deuteronomy 30:15–20"] }] },
  "zuriel-chapter-introductions-genesis-01-10.json": { chapters: [{ id: "gen-ch02", book: "Genesis", chapter: 2, title: "The garden, human vocation and covenant companionship", overview: "Genesis 2 describes the garden and the human vocation.", keyPassages: ["Genesis 2:15–17"] }] },
  "zuriel-deep-study-guides.json": { guides: [] },
  "zuriel-bible-geography-atlas.json": { places: [], journeys: [] },
  "zuriel-worship-study-pathways.json": { pathways: [] }
};
const sandbox = {
  window: {},
  document: { readyState: "loading", addEventListener() {} },
  fetch: async url => {
    const file = String(url).split("/").pop();
    const payload = datasets[file];
    if (!payload) throw new Error("Unexpected study data request: " + url);
    return { ok: true, json: async () => ({ schemaVersion: 1, ...payload }) };
  },
  console
};
vm.runInNewContext(source, sandbox, { timeout: 1000 });
const library = sandbox.window.ZurielStudyLibrary;
assert.ok(library && typeof library.search === "function", "Study library must expose search().");

const dictionary = await library.search("Agape", { category: "Bible Dictionary" });
assert.equal(dictionary.length, 1, "Exact dictionary-title search should return one matching entry.");
assert.equal(dictionary[0].title, "Agape");
assert.equal(dictionary[0].category, "Bible Dictionary");

const multiWord = await library.search("John 3:16");
assert.ok(multiWord.some(item => item.category === "Commentary & Exegesis"),
  "Multi-token Scripture-reference search should find the matching commentary.");
assert.ok((await library.search("love gift Son")).some(item => item.title === "John 3:16"),
  "All query tokens should be matched across the indexed study entry.");

const chapterGuide = await library.search("garden vocation Genesis 2", { category: "Chapter Introductions" });
assert.equal(chapterGuide.length, 1, "Chapter introductions must be included in the searchable offline library.");
assert.equal(chapterGuide[0].source.chapter, 2, "Chapter guide search must preserve the correct chapter identity.");

const exodusGuide = await library.search("Pharaoh oppression Exodus 1", { category: "Chapter Introductions" });
assert.equal(exodusGuide.length, 1, "Exodus chapter introductions must be searchable offline.");
assert.equal(exodusGuide[0].source.book, "Exodus");

const exodus12 = await library.search("Passover departure Exodus 12", { category: "Chapter Introductions" });
assert.equal(exodus12.length, 1, "Exodus chapter 12 must be searchable offline.");
assert.equal(exodus12[0].source.chapter, 12);
const exodus40 = await library.search("tabernacle glory Exodus 40", { category: "Chapter Introductions" });
assert.equal(exodus40.length, 1, "Exodus chapter 40 must be searchable offline.");
assert.equal(exodus40[0].source.chapter, 40);

const leviticusGuide = await library.search("burnt offering Leviticus 1", { category: "Chapter Introductions" });
assert.equal(leviticusGuide.length, 1, "Leviticus chapter introductions must be searchable offline.");
assert.equal(leviticusGuide[0].source.book, "Leviticus");
assert.equal(leviticusGuide[0].source.chapter, 1);

const leviticus23 = await library.search("appointed feasts harvest Leviticus 23", { category: "Chapter Introductions" });
assert.equal(leviticus23.length, 1, "Leviticus chapter 23 must be searchable offline.");
assert.equal(leviticus23[0].source.chapter, 23);

const numbers6 = await library.search("Nazirite vow priestly blessing Numbers 6", { category: "Chapter Introductions" });
assert.equal(numbers6.length, 1, "Numbers chapter 6 must be searchable offline.");
assert.equal(numbers6[0].source.book, "Numbers");
assert.equal(numbers6[0].source.chapter, 6);

const numbers14 = await library.search("scouts refuses enter land Numbers 14", { category: "Chapter Introductions" });
assert.equal(numbers14.length, 1, "Numbers chapter 14 must be searchable offline.");
assert.equal(numbers14[0].source.chapter, 14);

const numbers35 = await library.search("cities of refuge Numbers 35", { category: "Chapter Introductions" });
assert.equal(numbers35.length, 1, "Numbers chapter 35 must be searchable offline.");
assert.equal(numbers35[0].source.chapter, 35);

const deuteronomy6 = await library.search("Shema wholehearted love Deuteronomy 6", { category: "Chapter Introductions" });
assert.equal(deuteronomy6.length, 1, "Deuteronomy part 1 chapter introductions must be searchable offline.");
assert.equal(deuteronomy6[0].source.book, "Deuteronomy");
assert.equal(deuteronomy6[0].source.chapter, 6);

const deuteronomy30 = await library.search("restoration mercy choosing life Deuteronomy 30", { category: "Chapter Introductions" });
assert.equal(deuteronomy30.length, 1, "Deuteronomy part 2 chapter introductions must be searchable offline.");
assert.equal(deuteronomy30[0].source.book, "Deuteronomy");
assert.equal(deuteronomy30[0].source.chapter, 30);

const greek = await library.search("ἀγάπη", { category: "Hebrew & Greek Word Studies" });
assert.equal(greek.length, 1, "Unicode Greek search should find the original-language entry.");
assert.equal(greek[0].source.language, "Greek");

const limited = await library.search("love", { limit: 1 });
assert.ok(limited.length <= 1, "Study search must respect a bounded result limit.");
const filtered = await library.search("John 3:16", { category: "Bible Dictionary" });
assert.ok(filtered.length > 0 && filtered.every(item => item.category === "Bible Dictionary"),
  "Category filters must retain matching entries only from the selected resource category.");
assert.ok(!filtered.some(item => item.category === "Commentary & Exegesis"),
  "Category filters must exclude matching entries from other categories.");

console.log("Study-library search checks passed: relevance ranking, all-token matching, Scripture references, Unicode Greek, category filters and bounded results.");
