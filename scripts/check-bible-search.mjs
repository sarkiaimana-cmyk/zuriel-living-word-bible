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

 
// Reader-width regression guard for narrow Android screens.
assert.match(index, /#bibleSearch,\\s*#bibleSearch \\*\\s*\\{\\s*box-sizing:border-box;/,
  "Search panel descendants must use border-box sizing.");
assert.match(index, /#bibleSearch \\.search-row > \\* \\{\\s*min-width:0;\\s*max-width:100%;/,
  "Search row children must shrink inside the reader.");
assert.match(index, /#bibleSearch input \\{[\\s\\S]*?flex:1 1 12rem;[\\s\\S]*?min-width:0;/,
  "Search input must flex without imposing a minimum page width.");
assert.match(index, /#bibleSearchResults \\.search-result \\{[\\s\\S]*?max-width:100%;[\\s\\S]*?overflow-wrap:anywhere;/,
  "Long search-result text must wrap inside its card.");
assert.match(index, /@media\\(max-width:420px\\) \\{\\s*#bibleSearch \\.search-row \\{ flex-direction:column; \\}/,
  "Search controls must stack on narrow phone screens.");

const phrase = await search.search("God so loved", 30);
assert.equal(phrase.length, 1, "Phrase search should find the complete phrase.");
assert.equal(phrase[0].book, "John");
assert.equal(phrase[0].chapter, 1);
assert.equal(phrase[0].verse, 1);

const exact = await search.search("love", 30, "word");
assert.equal(exact.length, 1, "Exact-word search must exclude inflected and longer words.");
assert.ok(exact.every(item => item.text.toLowerCase().includes("love")));

const contains = await search.search("love", 30, "phrase");
assert.equal(contains.length, 3, "Contains/phrase search should also find inflected and longer words.");

const limited = await search.search("love", 1, "phrase");
assert.equal(limited.length, 1);
assert.equal(limited.totalMatches, 3, "Limited results must retain the full match count.");

await assert.rejects(() => search.search("hi"), /at least 3 characters/);
await assert.rejects(() => search.search("love", 10, "fuzzy"), /exact word or phrase/);

console.log("Offline Bible search checks passed: phrase and exact-word matching, case-insensitive lookup, verse coordinates, result limits, total counts and invalid-query handling.");
