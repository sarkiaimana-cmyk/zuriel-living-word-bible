import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

// Exercise the real search function against the complete bundled 66-book KJV,
// not a miniature mock corpus. This guards search accuracy and corpus traversal.
const [index, bookSource, kjvSource] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../bible-data.js", import.meta.url), "utf8"),
  readFile(new URL("../kjv.72bec70fcd.json", import.meta.url), "utf8")
]);
const bookContext = {};
vm.runInNewContext(bookSource + "\nglobalThis.__bibleBooks = bibleBooks;", bookContext, { timeout: 1000 });
const bibleBooks = bookContext.__bibleBooks;
assert.equal(bibleBooks.length, 66, "Search must use the complete 66-book index.");

const codeMatch = index.match(/const bookCodes = (\{[\s\S]*?\n\};)/);
assert.ok(codeMatch, "Reader book-code map must be present.");
const bookCodes = JSON.parse(codeMatch[1].replace(/;\s*$/, ""));
const kjv = JSON.parse(kjvSource);
assert.equal(Object.keys(kjv).length, 66, "The bundled KJV must contain all 66 books.");

const start = index.indexOf("window.ZurielBibleSearch = {");
const end = index.indexOf("\n};", start);
assert.ok(start >= 0 && end > start, "The production offline search API must be present.");
const apiSource = index.slice(start, end + 3);
const sandbox = {
  window: {},
  bibleBooks,
  bookCodes,
  loadKJV: async () => kjv
};
vm.runInNewContext(apiSource, sandbox, { timeout: 1000 });
const search = sandbox.window.ZurielBibleSearch;

for (const sample of [
  { query: "In the beginning", book: "Genesis", chapter: 1, verse: 1 },
  { query: "God so loved the world", book: "John", chapter: 3, verse: 16 },
  { query: "Jesus wept", book: "John", chapter: 11, verse: 35 }
]) {
  const results = await search.search(sample.query, 200, "phrase");
  assert.ok(results.some(item =>
    item.book === sample.book &&
    item.chapter === sample.chapter &&
    item.verse === sample.verse
  ), "Full-corpus search missed " + sample.book + " " + sample.chapter + ":" + sample.verse);
}

const exactLove = await search.search("love", 200, "word");
assert.ok(exactLove.length > 0, "Exact-word search should find occurrences of love.");
assert.ok(exactLove.every(item => /(^|[^a-z0-9])love([^a-z0-9]|$)/i.test(item.text)),
  "Exact-word results must not include longer words such as lovely or beloved.");

const limited = await search.search("love", 5, "phrase");
assert.equal(limited.length, 5, "Result limits must apply to the full KJV corpus.");
assert.ok(limited.totalMatches > limited.length, "Limited results must preserve the total full-corpus match count.");

console.log("Full KJV search checks passed: 66-book corpus traversal, known Genesis and Gospel references, phrase matching, exact-word boundaries and result limits.");
