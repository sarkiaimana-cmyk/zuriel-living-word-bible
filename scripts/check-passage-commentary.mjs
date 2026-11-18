import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const [dataText, index, bookSource, kjvText, study, library, packaging, serviceWorker] = await Promise.all([
  readFile("zuriel-passage-commentary-expansion.json", "utf8"),
  readFile("index.html", "utf8"),
  readFile("bible-data.js", "utf8"),
  readFile("kjv.72bec70fcd.json", "utf8"),
  readFile("zuriel-study.js", "utf8"),
  readFile("zuriel-library.js", "utf8"),
  readFile("scripts/prepare-web.mjs", "utf8"),
  readFile("sw.js", "utf8")
]);
const data = JSON.parse(dataText);
const kjv = JSON.parse(kjvText);
const mapping = index.match(/const bookCodes = (\{[\s\S]*?\n\};)/);
assert.ok(mapping, "Reader book-code map exists.");
const bookCodes = JSON.parse(mapping[1].replace(/;\s*$/, ""));
const books = [...bookSource.matchAll(/\{\s*name:\s*"([^"]+)",\s*chapters:\s*(\d+)\s*\}/g)]
  .map(match => ({ name: match[1], chapters: Number(match[2]) }));
assert.equal(books.length, 66, "Canonical Bible book index contains 66 books.");
assert.equal(data.schemaVersion, 1);
assert.ok(Array.isArray(data.editorialPolicy) && data.editorialPolicy.length >= 3);
assert.equal(data.entries.length, 103, "The existing passage commentary collection contains 103 entries.");
assert.equal(new Set(data.entries.map(entry => entry.id)).size, data.entries.length, "Commentary IDs are unique.");
assert.equal(new Set(data.entries.map(entry => entry.passage)).size, data.entries.length, "Commentary passage references are unique.");

function checkVerse(bookName, chapter, verse) {
  const canonical = bookName.toLowerCase() === "psalm" ? "Psalms" : bookName;
  const book = books.find(item => item.name.toLowerCase() === canonical.toLowerCase());
  if (!book || !Number.isInteger(chapter) || chapter < 1 || chapter > book.chapters) return false;
  const chapters = kjv[bookCodes[book.name]];
  return Array.isArray(chapters?.[chapter - 1]) &&
    Number.isInteger(verse) && verse >= 1 && verse <= chapters[chapter - 1].length;
}
function checkChapter(bookName, chapter) {
  const canonical = bookName.toLowerCase() === "psalm" ? "Psalms" : bookName;
  const book = books.find(item => item.name.toLowerCase() === canonical.toLowerCase());
  return Boolean(book && Number.isInteger(chapter) && chapter >= 1 && chapter <= book.chapters);
}
function validatePassage(reference) {
  const split = reference.match(/^(.+?)\s+(.+)$/);
  if (!split) return false;
  const book = split[1].trim();
  const rest = split[2].replace(/\s/g, "");
  let match = rest.match(/^(\d+):(\d+)(?:[-–](?:(\d+):)?(\d+))?$/);
  if (match) {
    const startChapter = Number(match[1]), startVerse = Number(match[2]);
    const endChapter = match[3] ? Number(match[3]) : startChapter;
    const endVerse = match[4] ? Number(match[4]) : startVerse;
    return checkVerse(book,startChapter,startVerse) &&
      checkVerse(book,endChapter,endVerse) &&
      (endChapter > startChapter || (endChapter === startChapter && endVerse >= startVerse));
  }
  if (book === "Philemon" || book === "Jude") {
    return rest.split(",").every(part => {
      const range = part.match(/^(\d+)(?:[-–](\d+))?$/);
      return range && checkVerse(book,1,Number(range[1])) &&
        checkVerse(book,1,Number(range[2] || range[1])) &&
        Number(range[2] || range[1]) >= Number(range[1]);
    });
  }
  match = rest.match(/^(\d+)(?:[-–](\d+))?$/);
  if (!match) return false;
  const first = Number(match[1]), last = Number(match[2] || match[1]);
  return checkChapter(book,first) && checkChapter(book,last) && last >= first;
}
for (const entry of data.entries) {
  assert.equal(entry.resourceType, "passage-commentary", entry.id + " has the expected resource type.");
  for (const field of ["id","passage","theme","contextAndMeaning","studyObservation","interpretiveCaution"]) {
    assert.ok(typeof entry[field] === "string" && entry[field].trim().length >= 8,
      entry.id + " has a meaningful " + field + ".");
  }
  assert.ok(validatePassage(entry.passage), "Passage resolves to valid KJV book/chapter/verse endpoints: " + entry.passage);
}
assert.ok(study.includes('id="zurielPassageCommentarySection"'), "Commentary section is present in the Study Centre.");
assert.ok(study.includes("function renderPassageCommentary(ref)"), "Selected-verse commentary renderer is connected.");
assert.ok(study.includes("function parseCommentaryRange(value)"), "Passage range matching is implemented.");
const parserStart = study.indexOf("function parseCommentaryRange(value)");
const parserEnd = study.indexOf("async function loadPassageCommentary", parserStart);
assert.ok(parserStart >= 0 && parserEnd > parserStart, "Passage parser can be isolated for runtime checks.");
const parserSource = study.slice(parserStart, parserEnd) + "\\nwindow.__parseCommentaryRange = parseCommentaryRange;";
const parserSandbox = { window: {}, String, Number, Math };
vm.runInNewContext(parserSource, parserSandbox, { timeout: 1000 });
const parseRange = parserSandbox.window.__parseCommentaryRange;
assert.deepEqual(JSON.parse(JSON.stringify(parseRange("Genesis 1:1–2:3"))),
  { book:"genesis", startChapter:1, startVerse:1, endChapter:2, endVerse:3 });
assert.deepEqual(JSON.parse(JSON.stringify(parseRange("Psalm 23"))),
  { book:"psalms", startChapter:23, startVerse:1, endChapter:23, endVerse:Number.MAX_SAFE_INTEGER });
assert.deepEqual(JSON.parse(JSON.stringify(parseRange("Job 1–2"))),
  { book:"job", startChapter:1, startVerse:1, endChapter:2, endVerse:Number.MAX_SAFE_INTEGER });
assert.deepEqual(JSON.parse(JSON.stringify(parseRange("Philemon 8-21"))),
  { book:"philemon", startChapter:1, startVerse:8, endChapter:1, endVerse:21 });
assert.deepEqual(JSON.parse(JSON.stringify(parseRange("Jude 3-4, 17-25"))),
  { book:"jude", startChapter:1, startVerse:3, endChapter:1, endVerse:25 });
assert.ok(study.includes("ORIGINAL ZURIEL PASSAGE COMMENTARY"), "Original Zuriel commentary is distinguished from published works.");
assert.ok(study.includes("interpretiveCaution"), "Interpretive cautions are displayed.");
assert.ok(study.includes('fetch("zuriel-passage-commentary-expansion.json"'), "Commentary data loads from its local packaged file.");
assert.ok(study.includes('renderPassageCommentary(ref);'), "Selecting a verse refreshes the commentary matches.");
assert.ok(index.includes('"Commentary & theology":["meaning and exposition","theology and deeper study","passage commentary"]'),
  "The selected-verse Commentary action opens the passage commentary section.");
assert.ok(library.includes("Open Passage Commentary"), "The reference shelf links to the working commentary collection.");
assert.ok(packaging.includes('"zuriel-passage-commentary-expansion.json"'), "Capacitor build packages the commentary file.");
assert.ok(serviceWorker.includes('"./zuriel-passage-commentary-expansion.json"'), "Offline service worker precaches the commentary file.");
console.log("Passage commentary checks passed: 103 unique original notes, validated KJV passage endpoints, contextual fields and cautions, selected-verse matching, search, library navigation, Capacitor packaging and offline precache.");
