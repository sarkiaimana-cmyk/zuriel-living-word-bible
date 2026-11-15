import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const [source, readerHtml, bookDataSource, kjvSource] = await Promise.all([
  readFile(new URL("../zuriel-topical-index.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../bible-data.js", import.meta.url), "utf8"),
  readFile(new URL("../kjv.72bec70fcd.json", import.meta.url), "utf8")
]);
const bookData = bookDataSource;
const kjvData = JSON.parse(kjvSource);

const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { timeout: 1000 });
const index = sandbox.window.ZurielTopicalIndex;
assert.ok(index && typeof index.list === "function", "Topical index API must load.");

const books = new Set([
  "genesis","exodus","leviticus","numbers","deuteronomy","joshua","judges","ruth",
  "1 samuel","2 samuel","1 kings","2 kings","1 chronicles","2 chronicles","ezra","nehemiah","esther",
  "job","psalm","psalms","proverbs","ecclesiastes","song of solomon","isaiah","jeremiah","lamentations",
  "ezekiel","daniel","hosea","joel","amos","obadiah","jonah","micah","nahum","habakkuk","zephaniah",
  "haggai","zechariah","malachi","matthew","mark","luke","john","acts","romans","1 corinthians",
  "2 corinthians","galatians","ephesians","philippians","colossians","1 thessalonians","2 thessalonians",
  "1 timothy","2 timothy","titus","philemon","hebrews","james","1 peter","2 peter","1 john","2 john",
  "3 john","jude","revelation"
]);
const topics = index.list();
assert.ok(topics.length >= 100, "The curated topical library should retain at least 100 topics.");
const titles = new Set();
let referenceCount = 0;
for (const topic of topics) {
  assert.ok(topic.title && typeof topic.title === "string", "Every topic needs a title.");
  assert.ok(!titles.has(topic.title), "Duplicate topic title: " + topic.title);
  titles.add(topic.title);
  for (const field of ["summary","definition","oldTestament","newTestament","application"]) {
    assert.ok(typeof topic[field] === "string" && topic[field].trim(), topic.title + " is missing " + field + ".");
  }
  assert.ok(Array.isArray(topic.questions) && topic.questions.length >= 2, topic.title + " needs reflection questions.");
  assert.ok(Array.isArray(topic.languageWords), topic.title + " needs a languageWords array.");
  assert.ok(Array.isArray(topic.relatedExplanations) && topic.relatedExplanations.length > 0, topic.title + " needs related passage explanations.");
  assert.ok(Array.isArray(topic.references) && topic.references.length > 0, topic.title + " needs Scripture references.");
  for (const ref of topic.references) {
    const book = String(ref.book || "").toLowerCase().replace(/\s+/g, " ").trim();
    assert.ok(books.has(book), topic.title + " has an unknown Bible book: " + ref.book);
    assert.ok(Number.isInteger(ref.chapter) && ref.chapter >= 1, topic.title + " has an invalid chapter.");
    assert.ok(Number.isInteger(ref.verse) && ref.verse >= 1, topic.title + " has an invalid verse.");
    assert.ok(ref.endVerse == null || (Number.isInteger(ref.endVerse) && ref.endVerse >= ref.verse), topic.title + " has an invalid verse range.");
    const label = String(ref.label || "");
    const labelMatch = label.match(/^(.+?)\s+(\d+):(\d+)(?:[-–—](\d+))?$/);
    assert.ok(labelMatch, topic.title + " has a malformed reference label: " + label);
    const normalizeBookName = value => value.toLowerCase().replace(/\s+/g, " ").trim().replace(/^psalm$/, "psalms");
    assert.equal(normalizeBookName(labelMatch[1]), normalizeBookName(ref.book), topic.title + " label book does not match structured reference: " + label);
    assert.equal(Number(labelMatch[2]), ref.chapter, topic.title + " label chapter does not match structured reference: " + label);
    assert.equal(Number(labelMatch[3]), ref.verse, topic.title + " label starting verse does not match structured reference: " + label);
    assert.equal(labelMatch[4] == null ? null : Number(labelMatch[4]), ref.endVerse == null ? null : ref.endVerse, topic.title + " label verse range does not match structured reference: " + label);
    referenceCount += 1;
  }
}

// Validate every curated topical reference against the actual bundled KJV.
// Book-name and positive-number checks alone can miss non-existent chapters
// and verses, which would otherwise create dead navigation in the study UI.
const readerMap = filesReaderMap();
function filesReaderMap() {
  const match = readerHtml.match(/const bookCodes = (\{[\s\S]*?\n\};)/);
  assert.ok(match, "Reader book-code map must be available for reference integrity checks.");
  return JSON.parse(match[1].replace(/;\s*$/, ""));
}
const bookEntries = [...bookData.matchAll(/\{\s*name:\s*"([^"]+)",\s*chapters:\s*(\d+)\s*\}/g)]
  .map(match => ({ name: match[1], chapters: Number(match[2]) }));
assert.equal(bookEntries.length, 66, "Offline Bible index must contain all 66 books.");
assert.equal(Object.keys(kjvData).length, 66, "Offline KJV source must contain all 66 books.");
const bookLookup = new Map(bookEntries.map(book => [book.name.toLowerCase(), book]));
bookLookup.set("psalm", bookLookup.get("psalms"));
let validatedReferences = 0;
for (const topic of topics) {
  for (const ref of topic.references) {
    const book = bookLookup.get(String(ref.book || "").toLowerCase().replace(/\s+/g, " ").trim());
    assert.ok(book, topic.title + " refers to unknown offline Bible book " + ref.book + ".");
    assert.ok(ref.chapter <= book.chapters, topic.title + " refers to a chapter outside " + book.name + ": " + ref.chapter + ".");
    const code = readerMap[book.name];
    const chapters = code && kjvData[code];
    assert.ok(Array.isArray(chapters), topic.title + " has no KJV data mapping for " + book.name + ".");
    const verses = chapters[ref.chapter - 1];
    assert.ok(Array.isArray(verses), topic.title + " refers to a missing KJV chapter: " + book.name + " " + ref.chapter + ".");
    assert.ok(ref.verse <= verses.length, topic.title + " refers to a missing KJV verse: " + book.name + " " + ref.chapter + ":" + ref.verse + ".");
    if (ref.endVerse != null) {
      assert.ok(ref.endVerse <= verses.length, topic.title + " has a reference range beyond the KJV chapter: " + book.name + " " + ref.chapter + ".");
    }
    validatedReferences += 1;
  }
}

const singular = index.findForReference("Psalm 103:8");
const plural = index.findForReference("Psalms 103:8");
assert.ok(singular.length > 0, "Psalm 103:8 should resolve to curated topical studies.");
assert.deepEqual(
  Array.from(plural, topic => topic.title).sort(),
  Array.from(singular, topic => topic.title).sort(),
  "Psalm and Psalms must resolve to the same topical references."
);
assert.ok(index.search("prayer").length > 0, "Topical search should return relevant studies.");
console.log("Advanced topical study checks passed: " + topics.length + " topics, " + referenceCount + " Scripture links (" + validatedReferences + " verified against the bundled 66-book KJV), required study fields, valid Bible book names, reflection prompts, topical search and Psalm/Psalms alias navigation.");
