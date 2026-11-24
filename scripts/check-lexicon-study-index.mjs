import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [index, wordBatchOne, wordBatchTwo, studyLibrary, loader, worker, html, pkg, release, studyUi, bookDataSource, kjv] = await Promise.all([
  readFile(new URL("../data/zuriel-lexicon-study-index.json", import.meta.url), "utf8").then(JSON.parse),
  readFile(new URL("../data/zuriel-original-language-word-studies-batch-1.json", import.meta.url), "utf8").then(JSON.parse),
  readFile(new URL("../data/zuriel-original-language-word-studies-batch-2.json", import.meta.url), "utf8").then(JSON.parse),
  readFile(new URL("../zuriel-study-library-data.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-lexicon-index.js", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../package.json", import.meta.url), "utf8").then(JSON.parse),
  readFile(new URL("../version.json", import.meta.url), "utf8").then(JSON.parse),
  readFile(new URL("../zuriel-study.js", import.meta.url), "utf8"),
  readFile(new URL("../bible-data.js", import.meta.url), "utf8"),
  readFile(new URL("../kjv.72bec70fcd.json", import.meta.url), "utf8").then(JSON.parse)
]);
assert.equal(index.entries.length, 50, "Expected 50 curated Hebrew/Greek Strong's lookup entries.");
assert.equal(wordBatchOne.entries.length, 110, "Expected 110 contextual word-study cards in batch one.");
assert.equal(wordBatchTwo.entries.length, 20, "Expected 20 contextual word-study cards in batch two.");
for (const [batchName, batch] of [["batch one", wordBatchOne], ["batch two", wordBatchTwo]]) {
  const bookCodesMatch = html.match(/const bookCodes = (\\{[\\s\\S]*?\\n\\};)/);
assert.ok(bookCodesMatch, "Reader book-code map must be available for lexicon reference checks.");
const bookCodes = JSON.parse(bookCodesMatch[1].replace(/;\\s*$/, ""));
const books = [...bookDataSource.matchAll(/\\{\\s*name:\\s*"([^"]+)",\\s*chapters:\\s*(\\d+)\\s*\\}/g)]
  .map(match => ({ name: match[1], chapters: Number(match[2]) }));
const canonicalBooks = new Map(books.map(book => [book.name.toLowerCase(), book]));
const ids = new Set();
  for (const entry of batch.entries) {
    assert.ok(entry.id && !ids.has(entry.id), batchName + " word-study IDs must be present and unique.");
    ids.add(entry.id);
    assert.ok(entry.term && entry.originalForm && entry.contextualGloss && entry.interpretiveCaution,
      batchName + " entry needs its original form, contextual gloss and caution.");
    assert.ok(["Hebrew", "Greek", "Aramaic", "Aramaic-derived"].includes(entry.language), batchName + " entry language must be explicit.");
    assert.ok(Array.isArray(entry.scriptureReferences) && entry.scriptureReferences.length,
      batchName + " entry needs Scripture references.");
    assert.ok(entry.morphologyStatus && /not asserted|lexeme-level|root-level/i.test(entry.morphologyStatus),
      batchName + " must not imply verse-specific morphology without parsing.");
    assert.ok(!entry.strongs && !entry.morphology, batchName + " must not invent Strong's IDs or morphology.");
  }
}
for (const path of [
  "./data/zuriel-original-language-word-studies-batch-1.json",
  "./data/zuriel-original-language-word-studies-batch-2.json"
]) {
  assert.ok(studyLibrary.includes('["Hebrew & Greek Word Studies", "' + path + '"'),
    "The expanded Study Library must load " + path + ".");
  assert.ok(worker.includes('"' + path + '"'), "Offline cache must include " + path + ".");
}

const ids = new Set();
for (const entry of index.entries) {
  assert.ok(entry.id && /^(H|G)\d+$/.test(entry.id), "Every index entry needs a Hebrew/Greek Strong's identifier.");
  assert.ok(!ids.has(entry.id), "Lexicon IDs must be unique: " + entry.id);
  assert.ok(entry.lemma && entry.transliteration && entry.studyLabel, "Lexicon entry needs lemma, transliteration and study label.");
  assert.ok(Array.isArray(entry.keyReferences) && entry.keyReferences.length, "Lexicon entry needs contextual references.");
  for (const reference of entry.keyReferences) {
    const match = String(reference).trim().match(/^(.+?)\\s+(\\d+):(\\d+)(?:-(\\d+))?$/);
    assert.ok(match, "Lexicon reference must include a chapter and verse: " + reference);
    const rawBook = match[1].toLowerCase();
    const bookName = rawBook === "psalm" ? "psalms" : rawBook;
    const book = canonicalBooks.get(bookName);
    assert.ok(book, "Lexicon reference must use a canonical Bible book: " + reference);
    const chapter = Number(match[2]);
    const firstVerse = Number(match[3]);
    const lastVerse = Number(match[4] || match[3]);
    const chapterVerses = kjv[bookCodes[book.name]]?.[chapter - 1];
    assert.ok(Array.isArray(chapterVerses), "Lexicon reference chapter must exist: " + reference);
    assert.ok(firstVerse >= 1 && lastVerse >= firstVerse && lastVerse <= chapterVerses.length,
      "Lexicon reference verse range must exist in the offline KJV: " + reference);
  }
  assert.ok(entry.contextPrompt, "Lexicon entry needs a contextual study prompt.");
  assert.equal(entry.sourceLabel, "Strong's Concordance reference (BibleHub)", "Lexicon entry needs an explicit source label.");
  assert.match(entry.sourceUrl || "", /^https:\/\/biblehub\.com\/strongs\/(?:hebrew|greek)\/\d+\.htm$/, "Lexicon entry needs a safe source URL.");
  ids.add(entry.id);
}
assert.match(index.usageNote, /do not assign a lemma to an English word/i);
assert.ok(loader.includes("window.ZurielLexiconStudyIndex"));
assert.ok(studyUi.includes("Open full Strong's lexicon entry online"), "Offline lexicon fallback must link to the full online source.");
assert.ok(studyUi.includes("offlineEntry.sourceUrl"), "Online lexicon link must use the curated source URL.");
assert.match(loader, /findById/);
assert.match(loader, /Duplicate lexicon index ID/);
assert.ok(html.includes("zuriel-lexicon-index.js"));
assert.match(worker, /zuriel-bible-offline-v\d+/);
assert.ok(worker.includes("zuriel-lexicon-index.js"));
assert.ok(worker.includes("data/zuriel-lexicon-study-index.json"));
assert.equal(pkg.version, release.version, "Package and app release versions must match.");
assert.equal(release.version, pkg.version);
console.log("Original-language checks passed: 50 sourced Strong's lookup entries plus 130 contextual Hebrew/Greek study cards.");
