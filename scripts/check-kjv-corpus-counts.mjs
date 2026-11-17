import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [index, bookSource, kjvSource] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("bible-data.js", "utf8"),
  readFile("kjv.72bec70fcd.json", "utf8")
]);

const mapMatch = index.match(/const bookCodes = (\{[\s\S]*?\n\};)/);
assert.ok(mapMatch, "The Bible reader's KJV book-code map must be present.");
const bookCodes = JSON.parse(mapMatch[1].replace(/;\s*$/, ""));
const books = [...bookSource.matchAll(/\{\s*name:\s*"([^"]+)",\s*chapters:\s*(\d+)\s*\}/g)]
  .map(match => ({ name: match[1], chapters: Number(match[2]) }));
const kjv = JSON.parse(kjvSource);

assert.equal(books.length, 66, "The Bible index must contain exactly 66 books.");
assert.equal(new Set(books.map(book => book.name)).size, 66, "Bible book names must be unique.");
assert.equal(Object.keys(kjv).length, 66, "The offline KJV database must contain exactly 66 books.");
assert.equal(new Set(Object.values(bookCodes)).size, 66, "Every Bible book must map to a unique KJV data key.");

let chapterCount = 0;
let verseCount = 0;
const usedCodes = new Set();

for (const book of books) {
  const code = bookCodes[book.name];
  assert.ok(typeof code === "string" && code, "Missing KJV data key for " + book.name + ".");
  usedCodes.add(code);
  const chapters = kjv[code];
  assert.ok(Array.isArray(chapters), "Missing KJV chapter array for " + book.name + ".");
  assert.equal(chapters.length, book.chapters, "Incorrect chapter count for " + book.name + ".");
  chapterCount += chapters.length;

  for (let index = 0; index < chapters.length; index++) {
    const verses = chapters[index];
    assert.ok(Array.isArray(verses) && verses.length > 0,
      "Missing verses in " + book.name + " chapter " + (index + 1) + ".");
    for (let verse = 0; verse < verses.length; verse++) {
      assert.equal(typeof verses[verse], "string",
        "Invalid verse value at " + book.name + " " + (index + 1) + ":" + (verse + 1) + ".");
      assert.ok(verses[verse].trim(),
        "Empty verse text at " + book.name + " " + (index + 1) + ":" + (verse + 1) + ".");
    }
    verseCount += verses.length;
  }
}

assert.equal(usedCodes.size, 66, "Every KJV book key must be used exactly once.");
assert.equal(chapterCount, 1189, "The complete Bible must contain 1,189 chapters.");
assert.equal(verseCount, 31102, "The bundled KJV corpus must contain 31,102 verse records.");

console.log("Complete offline KJV corpus verified: 66 books, 1,189 chapters, 31,102 non-empty verse records, and unique reader mappings.");
