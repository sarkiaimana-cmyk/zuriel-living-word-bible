import { readFile } from "node:fs/promises";
import vm from "node:vm";

const [faithSource, reader, bookIndex, kjvSource] = await Promise.all([
  readFile(new URL("../zuriel-faith-content.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../bible-data.js", import.meta.url), "utf8"),
  readFile(new URL("../kjv.72bec70fcd.json", import.meta.url), "utf8")
]);

const sandbox = { window: {} };
vm.runInNewContext(faithSource, sandbox, { timeout: 1000 });
const library = sandbox.window.ZurielFaithContent;
if (!library || typeof library.list !== "function" || typeof library.find !== "function") {
  throw new Error("ZurielFaithContent did not initialise with the expected public API.");
}

const mappingMatch = reader.match(/const bookCodes = (\{[\s\S]*?\n\};)/);
if (!mappingMatch) throw new Error("Could not read the Bible book-code map.");
const bookCodes = JSON.parse(mappingMatch[1].replace(/;\s*$/, ""));
const books = [...bookIndex.matchAll(/\{\s*name:\s*"([^"]+)",\s*chapters:\s*(\d+)\s*\}/g)]
  .map(match => ({ name: match[1], chapters: Number(match[2]) }));
const kjv = JSON.parse(kjvSource);
const canonicalBooks = new Map(books.map(book => [book.name.toLowerCase(), book]));
const totalVerses = books.reduce((total, book) => {
  const chapters = kjv[bookCodes[book.name]];
  if (!Array.isArray(chapters) || chapters.length !== book.chapters) {
    throw new Error("KJV integrity mismatch for " + book.name + ".");
  }
  return total + chapters.reduce((count, chapter) => count + (Array.isArray(chapter) ? chapter.length : 0), 0);
}, 0);

function parseReference(reference) {
  const match = String(reference || "").trim().match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) return null;
  const rawName = match[1].toLowerCase();
  const bookName = rawName === "psalm" ? "psalms" : rawName;
  const book = canonicalBooks.get(bookName);
  if (!book) return null;
  const chapter = Number(match[2]);
  const firstVerse = Number(match[3]);
  const lastVerse = Number(match[4] || match[3]);
  const chapterVerses = kjv[bookCodes[book.name]]?.[chapter - 1];
  if (!Number.isInteger(chapter) || chapter < 1 ||
      !Array.isArray(chapterVerses) || firstVerse < 1 ||
      lastVerse < firstVerse || lastVerse > chapterVerses.length) return null;
  return { book: book.name, chapter, firstVerse, lastVerse };
}

const requiredFields = ["prayer", "declaration", "affirmation", "confession", "inspiration"];
const visibleRecords = library.list();
if (visibleRecords.length < 278) {
  throw new Error("Expected at least 278 unique curated verse-specific faith-response references, including the latest 20 additions.");
}
const records = typeof library.auditList === "function"
  ? library.auditList()
  : visibleRecords.map(item => library.find(item.reference)).filter(Boolean);
if (new Set(visibleRecords.map(item => String(item.reference || "").trim().toLowerCase())).size !== visibleRecords.length) {
  throw new Error("The visible faith-response list must contain unique verse references.");
}
if (records.length !== visibleRecords.length) {
  throw new Error("The faith-response audit list must contain exactly one record per visible Scripture reference.");
}
if (new Set(records.map(item => String(item.reference || "").trim().toLowerCase())).size !== records.length) {
  throw new Error("The faith-response audit list must not contain duplicate Scripture references.");
}
const bookCoverage = new Set(records.map(record => {
  const parsed = parseReference(record.reference);
  return parsed && parsed.book;
}).filter(Boolean));
if (bookCoverage.size !== canonicalBooks.size) {
  const missingBooks = books.map(book => book.name).filter(name => !bookCoverage.has(name));
  throw new Error("Faith responses must cover all 66 Bible books. Missing: " + missingBooks.join(", "));
}
const exact = new Map();
const invalid = [];
const duplicates = [];
const rangeRecords = [];
const fieldText = new Map();

for (const record of records) {
  const parsed = parseReference(record.reference);
  if (!parsed) {
    invalid.push(record.reference + " (invalid or absent from offline KJV)");
    continue;
  }
  for (const field of requiredFields) {
    if (typeof record[field] !== "string" || !record[field].trim()) {
      invalid.push(record.reference + " (missing " + field + ")");
    }
  }
  if (parsed.firstVerse !== parsed.lastVerse) {
    rangeRecords.push({ reference: record.reference, verses: parsed.lastVerse - parsed.firstVerse + 1 });
    continue;
  }
  const key = parsed.book + "|" + parsed.chapter + "|" + parsed.firstVerse;
  if (exact.has(key)) duplicates.push(record.reference);
  else exact.set(key, record);
  for (const field of requiredFields) {
    const value = String(record[field] || "").trim().toLowerCase();
    if (!value) continue;
    const fieldKey = field + "|" + value;
    if (!fieldText.has(fieldKey)) fieldText.set(fieldKey, []);
    fieldText.get(fieldKey).push(record.reference);
  }
}

const duplicateWording = [...fieldText.entries()]
  .filter(([, refs]) => refs.length > 1)
  .map(([key, refs]) => ({ field: key.split("|")[0], references: refs }));

const missingExact = totalVerses - exact.size;
const percentage = totalVerses ? (exact.size / totalVerses * 100) : 0;
console.log("Zuriel verse-specific faith-response coverage");
console.log("Offline KJV verses checked: " + totalVerses.toLocaleString("en-US"));
console.log("Raw curated records checked: " + records.length.toLocaleString("en-US"));
console.log("Unique visible verse references: " + visibleRecords.length.toLocaleString("en-US"));
console.log("Bible books represented: " + bookCoverage.size + " of " + canonicalBooks.size);
console.log("Exact single-verse response records: " + exact.size.toLocaleString("en-US"));
console.log("Coverage: " + percentage.toFixed(3) + "%");
console.log("Verses still requiring their own unique record: " + missingExact.toLocaleString("en-US"));
console.log("Multi-verse range records (not counted as unique verse coverage): " + rangeRecords.length);
if (rangeRecords.length) {
  console.log("Range records: " + rangeRecords.map(item => item.reference + " (" + item.verses + " verses)").join("; "));
}
if (duplicateWording.length) {
  console.error("Repeated faith-response wording is not allowed:");
  for (const item of duplicateWording) console.error(" - " + item.field + ": " + item.references.join(", "));
  process.exitCode = 1;
}
if (invalid.length) {
  console.error("Invalid faith-response records:");
  for (const item of invalid) console.error(" - " + item);
  process.exitCode = 1;
}
if (duplicates.length) {
  console.error("Duplicate exact verse records are not allowed: " + duplicates.join(", "));
  process.exitCode = 1;
}
if (process.argv.includes("--require-complete") && missingExact > 0) {
  console.error("Strict coverage gate failed: every offline KJV verse needs its own curated response.");
  process.exitCode = 1;
}
