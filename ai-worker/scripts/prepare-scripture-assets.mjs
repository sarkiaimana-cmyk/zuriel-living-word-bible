import { readFile, mkdir, writeFile, rm, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const sourcePath = path.join(root, "bible-data.js");
const biblePath = path.join(root, "kjv.72bec70fcd.json");
const outputRoot = path.resolve(here, "../public");
const temporaryRoot = path.resolve(here, "../.public-build");
const checkOnly = process.argv.includes("--check");

const bookCodes = {
  "Genesis":"GEN","Exodus":"EXO","Leviticus":"LEV","Numbers":"NUM","Deuteronomy":"DEU",
  "Joshua":"JOS","Judges":"JDG","Ruth":"RUT","1 Samuel":"1SA","2 Samuel":"2SA",
  "1 Kings":"1KI","2 Kings":"2KI","1 Chronicles":"1CH","2 Chronicles":"2CH","Ezra":"EZR",
  "Nehemiah":"NEH","Esther":"EST","Job":"JOB","Psalms":"PSA","Proverbs":"PRO",
  "Ecclesiastes":"ECC","Song of Solomon":"SOL","Isaiah":"ISA","Jeremiah":"JER",
  "Lamentations":"LAM","Ezekiel":"EZE","Daniel":"DAN","Hosea":"HOS","Joel":"JOE",
  "Amos":"AMO","Obadiah":"OBA","Jonah":"JON","Micah":"MIC","Nahum":"NAH",
  "Habakkuk":"HAB","Zephaniah":"ZEP","Haggai":"HAG","Zechariah":"ZEC","Malachi":"MAL",
  "Matthew":"MAT","Mark":"MAR","Luke":"LUK","John":"JOH","Acts":"ACT","Romans":"ROM",
  "1 Corinthians":"1CO","2 Corinthians":"2CO","Galatians":"GAL","Ephesians":"EPH",
  "Philippians":"PHI","Colossians":"COL","1 Thessalonians":"1TH","2 Thessalonians":"2TH",
  "1 Timothy":"1TI","2 Timothy":"2TI","Titus":"TIT","Philemon":"PHM","Hebrews":"HEB",
  "James":"JAM","1 Peter":"1PE","2 Peter":"2PE","1 John":"1JO","2 John":"2JO",
  "3 John":"3JO","Jude":"JUD","Revelation":"REV"
};

const sandbox = { module: { exports: {} } };
vm.runInNewContext(await readFile(sourcePath, "utf8"), sandbox, { timeout: 1000 });
const books = sandbox.module.exports;
const bible = JSON.parse(await readFile(biblePath, "utf8"));
if (!Array.isArray(books) || books.length !== 66) throw new Error("Bible book index must contain exactly 66 books.");
if (!bible || typeof bible !== "object" || Array.isArray(bible)) throw new Error("KJV data must be a book-code object.");

let chapterCount = 0;
let verseCount = 0;
const index = [];
for (const book of books) {
  const code = bookCodes[book.name];
  const chapters = code && bible[code];
  if (!code || !Array.isArray(chapters) || chapters.length !== book.chapters) {
    throw new Error("Missing or incomplete KJV book: " + book.name);
  }
  index.push({ name: book.name, code, chapters: book.chapters });
  for (let i = 0; i < chapters.length; i++) {
    const verses = chapters[i];
    if (!Array.isArray(verses) || !verses.length ||
        verses.some(verse => typeof verse !== "string" || !verse.trim())) {
      throw new Error("Missing or invalid verses in " + book.name + " " + (i + 1));
    }
    chapterCount++;
    verseCount += verses.length;
    if (!checkOnly) {
      const folder = path.join(temporaryRoot, "scripture", code);
      await mkdir(folder, { recursive: true });
      await writeFile(path.join(folder, (i + 1) + ".json"), JSON.stringify(verses), "utf8");
    }
  }
}
if (Object.keys(bookCodes).length !== 66) throw new Error("Book-code map must contain exactly 66 entries.");
if (chapterCount !== 1189 || verseCount !== 31102) {
  throw new Error("KJV source totals do not match the expected 66-book, 1,189-chapter, 31,102-verse edition.");
}
if (!checkOnly) {
  await mkdir(temporaryRoot, { recursive: true });
  await writeFile(path.join(temporaryRoot, "scripture-index.json"), JSON.stringify(index), "utf8");
  await rm(outputRoot, { recursive: true, force: true });
  await rename(temporaryRoot, outputRoot);
}
console.log("KJV source verified: " + books.length + " books, " + chapterCount + " chapters, " + verseCount + " verses." + (checkOnly ? " No files written." : " Chapter assets generated."));
