import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-topical-index.js", import.meta.url), "utf8");
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
    const book = String(ref.book || "").toLowerCase().replace(/\\s+/g, " ").trim();
    assert.ok(books.has(book), topic.title + " has an unknown Bible book: " + ref.book);
    assert.ok(Number.isInteger(ref.chapter) && ref.chapter >= 1, topic.title + " has an invalid chapter.");
    assert.ok(Number.isInteger(ref.verse) && ref.verse >= 1, topic.title + " has an invalid verse.");
    assert.ok(ref.endVerse == null || (Number.isInteger(ref.endVerse) && ref.endVerse >= ref.verse), topic.title + " has an invalid verse range.");
    referenceCount += 1;
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
console.log("Advanced topical study checks passed: " + topics.length + " topics, " + referenceCount + " Scripture links, required study fields, valid Bible book names, reflection prompts, topical search and Psalm/Psalms alias navigation.");
