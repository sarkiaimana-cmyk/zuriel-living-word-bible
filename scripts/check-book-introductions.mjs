import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-introductions.js", import.meta.url), "utf8");
const expected = {
  Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34,
  Joshua: 24, Judges: 21, Ruth: 4, "1 Samuel": 31, "2 Samuel": 24,
  "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36,
  Ezra: 10, Nehemiah: 13, Esther: 10, Job: 42, Psalms: 150, Proverbs: 31, Ecclesiastes: 12, "Song of Solomon": 8, Isaiah: 66, Jeremiah: 52, Lamentations: 5, Ezekiel: 48, Daniel: 12, Hosea: 14, Joel: 3, Amos: 9, Obadiah: 1, Jonah: 4, Micah: 7, Nahum: 3, Habakkuk: 3, Zephaniah: 3, Haggai: 2, Zechariah: 14, Malachi: 4, Matthew: 28, Mark: 16, Luke: 24, John: 21, Acts: 28, Romans: 16, "1 Corinthians": 16, "2 Corinthians": 13, "Galatians": 6, "Ephesians": 6, "Philippians": 4, "Colossians": 4, "1 Thessalonians": 5, "2 Thessalonians": 3, "1 Timothy": 6, "2 Timothy": 4, "Titus": 3, "Philemon": 1, "Hebrews": 13, "James": 5, "1 Peter": 5, "2 Peter": 3, "1 John": 5, "2 John": 1, "3 John": 1, "Jude": 1, "Revelation": 22
};
const failures = [];
const entryPattern = /^    (?:"([^"]+)"|([A-Za-z][A-Za-z ]*)): \{$/gm;
const entries = new Map();
let match;
while ((match = entryPattern.exec(source)) !== null) {
  entries.set(match[1] || match[2], match.index);
}
for (const [book, chapters] of Object.entries(expected)) {
  const start = entries.get(book);
  if (start === undefined) {
    failures.push(book + ": missing introduction");
    continue;
  }
  const next = [...entries.values()].filter(position => position > start).sort((a, b) => a - b)[0] ?? source.indexOf("\n  };", start);
  const block = source.slice(start, next);
  if (!new RegExp("chapters: " + chapters + "\\b").test(block)) failures.push(book + ": incorrect or missing chapter count");
  for (const field of ["subtitle:", "author:", "authorStudy:", "date:", "dateStudy:", "place:", "placeStudy:", "audience:", "purpose:", "background:", "themes:", "keyVerses:", "outline:"]) {
    if (!block.includes(field)) failures.push(book + ": missing " + field);
  }
  if (!/outline:\s*\[\s*"/.test(block)) failures.push(book + ": outline is missing or empty");
}
if (!source.includes('"Book outline and chapter guide"')) failures.push("introduction renderer: clear outline heading missing");
if (!source.includes('title.textContent = titleText')) failures.push("bold section heading renderer missing");
if (!source.includes("function createBookArtwork(bookName, book)")) failures.push("offline book artwork fallback generator is missing");
if (!source.includes("function createChapterArtwork(bookName, chapterNumber, description)")) failures.push("offline chapter artwork generator is missing");
if (!source.includes("for (let chapterNumber = 1; chapterNumber <= book.chapters; chapterNumber++)")) failures.push("every chapter must receive a chapter-guide image row");
if (!source.includes("image.src = createChapterArtwork(bookName, chapterNumber, description)")) failures.push("chapter-guide images are not assigned from offline artwork");
if (!source.includes('image.loading = "lazy"')) failures.push("chapter-guide artwork must load lazily to protect mobile performance");
if (!source.includes("intro-chapter-image")) failures.push("chapter-guide image styling is missing");
if (!source.includes('image.alt = bookName + " chapter " + chapterNumber + " illustration"')) failures.push("chapter-guide images must have descriptive alternative text");
if (!source.includes('return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg)')) failures.push("chapter-guide artwork must be generated locally as offline SVG");
if (/fetch\s*\(|XMLHttpRequest/.test(source)) failures.push("book and chapter artwork must not require a network request");
if (!source.includes("image.src = book.image || createBookArtwork(bookName, book)")) failures.push("every book introduction must render an image, even without a supplied photo");
if (!source.includes("image.onerror = function ()")) failures.push("a missing local image must fall back to offline artwork");
// Execute the small SVG generator to verify chapter art is unique and safely escaped.
try {
  const artworkStart = source.indexOf("function createChapterArtwork(bookName, chapterNumber, description)");
  const artworkEnd = source.indexOf("function renderBook(bookName)", artworkStart);
  if (artworkStart < 0 || artworkEnd <= artworkStart) throw new Error("Chapter artwork function could not be isolated.");
  const artworkSource = source.slice(artworkStart, artworkEnd) + "\\nwindow.__createChapterArtwork = createChapterArtwork;";
  const sandbox = { window: {}, Array, String, encodeURIComponent };
  vm.runInNewContext(artworkSource, sandbox, { timeout: 1000 });
  const first = sandbox.window.__createChapterArtwork("Song & Solomon", 1, "Love <joy> & grace");
  const second = sandbox.window.__createChapterArtwork("Song & Solomon", 2, "Another chapter");
  assert.ok(first.startsWith("data:image/svg+xml;charset=utf-8,"));
  assert.notEqual(first, second, "Each chapter must have its own generated artwork.");
  const svg = decodeURIComponent(first.split(",")[1]);
  assert.ok(svg.includes("Song &amp; Solomon"), "Book labels must be escaped for SVG.");
  assert.ok(svg.includes("Love &lt;joy&gt; &amp; grace"), "Chapter descriptions must be escaped for SVG.");
  assert.ok(svg.includes("CHAPTER 1"));
} catch (error) {
  failures.push("Chapter artwork runtime validation failed: " + error.message);
}
if (failures.length) {
  console.error("Book introduction checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Book introduction checks passed for " + Object.keys(expected).length + " books, including metadata, study context, key verses and chapter guides.");
}
