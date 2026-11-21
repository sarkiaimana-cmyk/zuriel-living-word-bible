import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
const start = index.indexOf("window.ZurielBibleSearch = {");
const end = index.indexOf("\n};", start);
assert.ok(start >= 0 && end > start, "The offline Bible search API must be present.");
const source = index.slice(start, end + 3);
const bibleBooks = [{ name: "Genesis" }, { name: "John" }];
const bookCodes = { Genesis: "GEN", John: "JHN" };
const corpus = {
  GEN: [["In the beginning God created the heavens and the earth.", "The word of the Lord is true."]],
  JHN: [["For God so loved the world.", "Love one another as I have loved you.", "A lovely day is not the same as love."]]
};
const sandbox = {
  window: {},
  bibleBooks,
  bookCodes,
  loadKJV: async () => corpus
};
vm.runInNewContext(source, sandbox, { timeout: 1000 });
const search = sandbox.window.ZurielBibleSearch;
assert.ok(search && typeof search.search === "function", "Offline search API must expose search().");
assert.ok(index.includes(".verse[data-verse-number=\"'+item.verse+'\"]"), "Search-result navigation must locate the exact rendered verse number, not an array position.");

const phrase = await search.search("God so loved", 30);
assert.equal(phrase.length, 1, "Phrase search should find the complete phrase.");
assert.equal(phrase[0].book, "John");
assert.equal(phrase[0].chapter, 1);
assert.equal(phrase[0].verse, 1);

const mixedCase = await search.search("gOd So LoVeD", 30, "phrase");
assert.equal(mixedCase.length, 1, "Phrase search must normalize mixed-case input.");
assert.equal(mixedCase[0].book, "John");

const exact = await search.search("love", 30, "word");
assert.equal(exact.length, 2, "Exact-word search must exclude inflected and longer words while retaining both standalone occurrences.");
assert.ok(exact.every(item => /(^|[^a-z0-9])love([^a-z0-9]|$)/i.test(item.text)));

const contains = await search.search("love", 30, "phrase");
assert.equal(contains.length, 3, "Contains/phrase search should also find inflected and longer words.");

const limited = await search.search("love", 1, "phrase");
assert.equal(limited.length, 1);
assert.equal(limited.totalMatches, 3, "Limited results must retain the full match count.");

await assert.rejects(() => search.search("hi"), /at least 3 characters/);
await assert.rejects(() => search.search("love", 10, "fuzzy"), /exact word or phrase/);

console.log("Offline Bible search checks passed: phrase and exact-word matching, case-insensitive lookup, verse coordinates, result limits, total counts and invalid-query handling.");
