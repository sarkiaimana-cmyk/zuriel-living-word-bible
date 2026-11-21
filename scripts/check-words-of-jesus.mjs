import { readFile } from "node:fs/promises";
import vm from "node:vm";

const [library, worker, packaging, index, workflow, bookDataSource, kjvSource] = await Promise.all([
  readFile(new URL("../zuriel-library.js", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("./prepare-web.mjs", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/validate-pr.yml", import.meta.url), "utf8"),
  readFile(new URL("../bible-data.js", import.meta.url), "utf8"),
  readFile(new URL("../kjv.72bec70fcd.json", import.meta.url), "utf8")
]);

const failures = [];
const required = [
  ["dedicated Words of Jesus page", 'if (page === "jesus")'],
  ["Kingdom teaching", "The good news of God's Kingdom"],
  ["love command", "Love God and love your neighbour"],
  ["prayer teaching", "How to pray"],
  ["forgiveness teaching", "Forgive others"],
  ["discipleship teaching", "Count the cost of following Jesus"],
  ["humility and service", "The greatest becomes a servant"],
  ["Holy Spirit teaching", "The promised Helper"],
  ["Sermon on the Mount", "The Beatitudes"],
  ["cross and resurrection", "Jesus is the resurrection and the life"],
  ["Great Commission", "The Great Commission"],
  ["Lord's Prayer", "The Lord's Prayer"],
  ["Golden Rule", "The Golden Rule"],
  ["treasure in heaven", "Lay up treasure in heaven"],
  ["abiding in Christ", "Abide in the vine"],
  ["new birth", "Born of the Spirit"],
  ["living water", "Rivers of living water"],
  ["parable of the sower", "The parable of the sower"],
  ["Good Samaritan", "The Good Samaritan"],
  ["service to people in need", "Serve Christ by serving the least"],
  ["watchfulness", "Watch and be ready"],
  ["search control", "Search a teaching, theme or Scripture reference"],
  ["theme filter", "Filter teachings by theme"],
  ["open reference in Bible reader", "window.openChapter(book, chapter)"],
  ["activate selected Gospel verse through the shared reader action", "window.selectBibleVerse(verseNumber)"],
  ["exact Jesus verse lookup helper", "function findJesusVerse(verseNumber)"],
  ["Jesus reference checks the visible verse label", "label.textContent.trim().replace("],
  ["Jesus reference compares the requested verse number", "String(verseNumber)"],
  ["connect to contextual study through shared verse activation", "window.selectBibleVerse(verseNumber)"],
  ["save teaching to personal library", "Words of Jesus — "],
  ["expandable teaching details", 'element("details", undefined, "zuriel-jesus-details")'],
  ["guided study panel", "Guided study"],
  ["observation prompt", "Observe: What does Jesus actually say or do"],
  ["context and understanding prompt", "Understand: What does this teaching reveal"],
  ["personal application prompt", "Respond: In light of"],
  ["prayer prompt", "Prayer prompt: Father, help me understand"],
  ["teaching title as an accessible expand control", 'summary.setAttribute("aria-label", "Expand teaching: " + item.title)'],
  ["duplicate-save protection", "saved.bookmarks.some(entry => entry && entry.title === title)"],
  ["context reminder", "Read the surrounding passage"],
  ["reference opening progress feedback", 'count.textContent = "Opening " + reference'],
  ["successful reference opening feedback", 'count.textContent = "Opened " + reference'],
  ["visible reference opening failure feedback", 'count.textContent = "Could not open " + reference'],
  ["love for enemies teaching", "Love your enemies"],
  ["giving without display", "Give in secret"],
  ["warning against greed", "The rich fool"],
  ["wholehearted discipleship challenge", "The rich young ruler"],
  ["Good Shepherd teaching", "The Good Shepherd"],
  ["Father's compassion in the lost son", "The lost son"],
  ["Kingdom growth parable", "The mustard seed"],
  ["Kingdom treasure parable", "The pearl of great price"],
  ["watchfulness parable", "The wise and foolish virgins"],
  ["faithful stewardship parable", "The talents entrusted"],
  ["unavailable reader feedback", "The Bible reader is not ready yet. Please try again."]
];
for (const [label, fragment] of required) {
  if (!library.includes(fragment)) failures.push(label + " is missing.");
}
const jesusStart = library.indexOf('if (page === "jesus")');
const jesusEnd = library.indexOf('if (page === "saved")', jesusStart);
const jesusSection = jesusStart >= 0 && jesusEnd > jesusStart ? library.slice(jesusStart, jesusEnd) : "";
if (jesusSection.includes('querySelectorAll("#message .verse")[verseNumber - 1]')) failures.push("Words of Jesus still selects verses by array position.");
const sectionStart = library.indexOf('if (page === "jesus")');
const sectionEnd = library.indexOf('if (page === "saved")', sectionStart);
const section = sectionStart >= 0 && sectionEnd > sectionStart ? library.slice(sectionStart, sectionEnd) : "";
const topicCount = (section.match(/category:/g) || []).length;
const referenceCount = (section.match(/refs:\[/g) || []).length;
if (topicCount < 60) failures.push("Expected at least 60 curated Jesus teaching themes; found " + topicCount + ".");
if (referenceCount < 20) failures.push("Expected Scripture reference collections for the teaching themes.");

// Resolve every curated Words of Jesus reference against the actual bundled KJV.
// This catches dead links caused by invalid books, chapters or verse numbers.
let verifiedReferenceCount = 0;
try {
  const readerMapMatch = index.match(/const bookCodes = (\{[\s\S]*?\n\};)/);
  if (!readerMapMatch) throw new Error("Reader book-code map is missing.");
  const readerMap = JSON.parse(readerMapMatch[1].replace(/;\s*$/, ""));
  const bookEntries = [...bookDataSource.matchAll(/\{\s*name:\s*"([^"]+)",\s*chapters:\s*(\d+)\s*\}/g)]
    .map(match => ({ name: match[1], chapters: Number(match[2]) }));
  if (bookEntries.length !== 66) throw new Error("Offline Bible index must contain all 66 books.");
  const kjvData = JSON.parse(kjvSource);
  if (Object.keys(kjvData).length !== 66) throw new Error("Offline KJV source must contain all 66 books.");
  const bookLookup = new Map(bookEntries.map(book => [book.name.toLowerCase(), book]));
  const teachingsStart = section.indexOf("const teachings = [");
  const teachingsEnd = section.indexOf("\n        ];", teachingsStart);
  if (teachingsStart < 0 || teachingsEnd < 0) throw new Error("Curated teaching data could not be isolated for validation.");
  const arrayStart = section.indexOf("[", teachingsStart);
  const teachings = vm.runInNewContext("(" + section.slice(arrayStart, teachingsEnd + 10).replace(/;?$/, "") + ")", {}, { timeout: 1000 });
  if (!Array.isArray(teachings) || teachings.length < 20) throw new Error("Curated teaching data did not load.");
  const gospelCoverage = new Set();
  for (const teaching of teachings) {
    if (!Array.isArray(teaching.refs) || teaching.refs.length === 0) {
      throw new Error(teaching.title + " has no Scripture references.");
    }
    for (const reference of teaching.refs) {
      const match = String(reference).match(/^(.+?)\s+(\d+):(\d+)$/);
      if (!match) throw new Error(teaching.title + " has a malformed reference: " + reference);
      if (["Matthew", "Mark", "Luke", "John"].includes(match[1])) gospelCoverage.add(match[1]);
      const book = bookLookup.get(match[1].toLowerCase().replace(/\s+/g, " ").trim());
      if (!book) throw new Error(teaching.title + " refers to an unknown Bible book: " + match[1]);
      const chapterNumber = Number(match[2]), verseNumber = Number(match[3]);
      if (chapterNumber < 1 || chapterNumber > book.chapters) throw new Error(teaching.title + " refers to a missing chapter: " + reference);
      const code = readerMap[book.name];
      const chapters = code && kjvData[code];
      const verses = Array.isArray(chapters) ? chapters[chapterNumber - 1] : null;
      if (!Array.isArray(verses) || verseNumber < 1 || verseNumber > verses.length) {
        throw new Error(teaching.title + " refers to a missing bundled KJV verse: " + reference);
      }
      verifiedReferenceCount += 1;
    }
  }
  if (gospelCoverage.size !== 4) throw new Error("Curated Words of Jesus teachings must cover all four Gospels.");
} catch (error) {
  failures.push("Offline KJV reference verification failed: " + error.message);
}
if (!/const CACHE_NAME = "zuriel-bible-offline-v\d+";/.test(worker)) failures.push("A versioned offline cache name is required.");
if (!worker.includes('"./zuriel-library.js"')) failures.push("Service worker does not precache the library module.");
if (!packaging.includes('"zuriel-library.js"')) failures.push("Android web packaging omits the library module.");
if (!index.includes("zuriel-library.js")) failures.push("App entry point does not load the library module.");
if (!workflow.includes("node scripts/check-words-of-jesus.mjs")) failures.push("Pull-request workflow does not run this checker.");
if (failures.length) {
  console.error("Words of Jesus study-centre checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Words of Jesus study-centre checks passed (" + topicCount + " themes, " + referenceCount + " reference collections, " + verifiedReferenceCount + " individual Scripture links across all four Gospels, verified against the bundled 66-book KJV, searchable and filterable, reader navigation, contextual study, personal saving, offline and Android packaging).");
}
