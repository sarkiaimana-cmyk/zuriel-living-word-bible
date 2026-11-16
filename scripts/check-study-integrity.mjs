import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import vm from "node:vm";

const [study, home, faith, linking, reader, navigator, bookIndex, kjvSource] = await Promise.all([
  readFile(new URL("../zuriel-study.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-home.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-faith-content.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-word-linking.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-grid-navigation.js", import.meta.url), "utf8"),
  readFile(new URL("../bible-data.js", import.meta.url), "utf8"),
  readFile(new URL("../kjv.72bec70fcd.json", import.meta.url), "utf8")
]);

const failures = [];

// Validate the actual KJV data against the reader's book-code map. A single
// mismatched code blocks loadKJV() for the entire Bible, not just that book.
let bibleBooks = [];
let kjv = {};
let bookCodes = {};
try {
  const mapping = reader.match(/const bookCodes = (\{[\s\S]*?\n\};)/);
  if (!mapping) throw new Error("The reader's book-code map could not be found.");
  bookCodes = JSON.parse(mapping[1].replace(/;\s*$/, ""));
  bibleBooks = [...bookIndex.matchAll(/\{\s*name:\s*"([^"]+)",\s*chapters:\s*(\d+)\s*\}/g)]
    .map(match => ({ name: match[1], chapters: Number(match[2]) }));
  kjv = JSON.parse(kjvSource);
  if (bibleBooks.length !== 66) failures.push(["66-book Bible index", "expected 66 books, found " + bibleBooks.length]);
  if (Object.keys(kjv).length !== 66) failures.push(["66-book KJV database", "expected 66 books, found " + Object.keys(kjv).length]);
  for (const book of bibleBooks) {
    const code = bookCodes[book.name];
    const chapters = code ? kjv[code] : null;
    if (!Array.isArray(chapters) || chapters.length !== book.chapters) {
      failures.push(["KJV book mapping: " + book.name, "code " + String(code) + " is missing or has the wrong chapter count"]);
      continue;
    }
    for (let chapter = 0; chapter < chapters.length; chapter++) {
      const verses = chapters[chapter];
      if (!Array.isArray(verses) || !verses.length || verses.some(verse => typeof verse !== "string" || !verse.trim())) {
        failures.push(["KJV chapter integrity: " + book.name + " " + (chapter + 1), "chapter contains missing or invalid verse text"]);
      }
    }
  }
} catch (error) {
  failures.push(["KJV database integrity", error.message]);
}

const checks = [
  ["KJV word-annotation source", 'const KJV_API = "https://bible.helloao.org/api/eng_kjv/"'],
  ["KJV simplified chapter is loaded", '.simple.json'],
  ["KJV simplified word annotations are loaded", '.words.simple.json'],
  ["selected KJV annotation is matched", "matchSelectedKJVWord("],
  ["Strong's annotations are joined to interlinear records", "strongsIds.has(normalizeStrongs(word.strongs))"],
  ["source alignment mismatch is not guessed", "Zuriel will not guess which Hebrew or Greek word belongs to this English word."],
  ["BSB gloss is distinguished from KJV wording", "The interlinear gloss is the Berean Standard Bible's English phrase, not a KJV definition."],
  ["source parsing fallback", '"Source parsing tag: " + word.parsing'],
  ["per-word source language label", "languageLabel.textContent = languageName"],
  ["normalized Hebrew/Aramaic script direction", 'original.dir = languageCode === "hebrew" || languageCode === "aramaic" ? "rtl" : "ltr"'],
  ["unknown source language is not guessed", "Source language not identified"],
  ["unknown lexicon language is not guessed", "source language not identified"],
  ["lexicon morphology is source-attributed", "Morphology supplied by source:"],
  ["lexicon does not infer missing morphology", "Detailed morphology: not supplied by this lexicon record."],
  ["Strong's identifier normalization", 'padStart(4, "0")'],
  ["lexicon sense validation", "!entry || !Array.isArray(entry.senses)"],
  ["lexicon retry action", "Retry lexicon entry"],
  ["offline-specific lexicon guidance", "not saved on this device yet"],
  ["same Strong's occurrence matching", "normalizeStrongs(word.strongs) === id"],
  ["contextual word-use caution", "an indexed word can carry different shades of meaning in different contexts."],
  ["KJV verse excerpt for related occurrences", "KJV context: "]
];
for (const [label, fragment] of checks) {
  if (!study.includes(fragment)) failures.push([label, "missing from zuriel-study.js"]);
}
if (study.includes("glossTokens.includes")) {
  failures.push(["no gloss-based word guessing", "legacy gloss matching remains in zuriel-study.js"]);
}

const linkerChecks = [
  ["token positions are mapped to source offsets", "function getWordSpans(value)"],
  ["reader and source token sequences are compared", "tokenKey(readerTokens[index].text) !== tokenKey(sourceSpans[index].text)"],
  ["source annotation offsets are validated", "Number(annotation && annotation.start)"],
  ["selected token overlaps its annotation range", "start < selected.end && end > selected.start"],
  ["legacy WebView-compatible token scanning", "while ((match = pattern.exec(text)) !== null)"],
  ["Strong's identifiers come from annotation arrays", "Array.isArray(annotation.strongs)"],
  ["missing word positions are rejected", "No selected word position was supplied."]
];
for (const [label, fragment] of linkerChecks) {
  if (!linking.includes(fragment)) failures.push([label, "missing from zuriel-word-linking.js"]);
}

const requiredReaderPanels = ["zurielOriginalWordResults", "zurielLexiconDetails"];
for (const id of requiredReaderPanels) {
  if (!study.includes('id="' + id + '"')) failures.push(["reader panel: " + id, "missing from zuriel-study.js"]);
}
if (!(reader.indexOf('src="zuriel-word-linking.js"') < reader.indexOf('src="zuriel-study.js"'))) {
  failures.push(["word-linking helper load order", "helper must load before zuriel-study.js"]);
}
if (!reader.includes('paragraph.dataset.verseNumber = String(index + 1)')) {
  failures.push(["stable verse identity", "missing from index.html"]);
}
if (!navigator.includes('data-verse-number="')) failures.push(["exact verse target", "missing from navigator"]);
if (!navigator.includes("window.selectBibleVerse(selectedVerse)")) {
  failures.push(["navigator verse activation", "selected verses must use the shared reader selection action"]);
}
if (!reader.includes("window.selectBibleVerse = function (verseNumber)")) {
  failures.push(["shared verse selection", "reader must expose one validated verse activation path"]);
}

const homeChecks = [
  ["open-book Scripture reference binding", 'setText("zurielOpenBookReference", verse.reference.toUpperCase())'],
  ["open-book declaration binding", 'setText("zurielOpenBookDeclaration", response.declaration)'],
  ["open-book affirmation binding", 'setText("zurielOpenBookAffirmation", response.affirmation)'],
  ["open-book prayer binding", 'setText("zurielOpenBookPrayer", response.prayer)'],
  ["open-book confession binding", 'setText("zurielOpenBookConfession", response.confession)'],
  ["open-book inspiration binding", 'setText("zurielOpenBookInspiration", response.inspiration)'],
  ["open-book passage navigation", 'window.openChapter(bookName, Number(match[2]))'],
  ["exact reference lookup", "window.ZurielFaithContent.find(item.reference)"]
];
for (const [label, fragment] of homeChecks) {
  if (!home.includes(fragment)) failures.push([label, "missing from zuriel-home.js"]);
}
const requiredFaithFields = ["prayer:", "declaration:", "affirmation:", "confession:", "inspiration:"];
for (const field of requiredFaithFields) {
  if (!faith.includes(field)) failures.push(["faith content field: " + field, "missing from zuriel-faith-content.js"]);
}
if (!home.includes('id="zurielOpenBookLight"')) failures.push(["Light panel", "missing from home card"]);
if (!study.includes("openWordInContext: async function")) failures.push(["contextual word study", "the reader needs a contextual word explanation that does not force navigation"]);
if (!reader.includes("window.ZurielStudy.openWordInContext")) failures.push(["contextual word-study reader wiring", "word taps must use the inline study action"]);
if (!study.includes('(reader || main || document.body).appendChild(panel)')) failures.push(["reader-local Study Centre placement", "the full Study Centre must be mounted with the Bible reader"]);
if (!study.includes('layout.id = "zurielReaderStudyLayout"') || !study.includes("grid-template-columns:minmax(0,1fr) minmax(280px,360px)")) failures.push(["responsive side-by-side Study Centre", "the desktop reader and study panel must use a two-column layout"]);
if (study.includes("verseElement.parentNode.insertBefore(contextCard")) failures.push(["no inserted word card between verses", "word context must stay in the study panel, not interrupt Scripture"]);

const homeReferences = [...home.matchAll(/reference:\s*"([^"]+)"/g)].map(match => match[1].toLowerCase());
const faithReferences = new Set([...faith.matchAll(/["']?reference["']?\s*:\s*["']([^"']+)["']/g)].map(match => match[1].toLowerCase()));
const identityBlock = home.match(/const identityScriptures = \[([\s\S]*?)\n    \];/);
const identityReferences = new Set(identityBlock
  ? [...identityBlock[1].matchAll(/reference:\s*"([^"]+)"/g)].map(match => match[1].toLowerCase())
  : []);
for (const reference of homeReferences) {
  // Identity-hero entries are Scripture-only rotating slides, not Open Book
  // devotional records; validate their exact offline KJV references below,
  // while requiring faith responses only for other home-card references.
  if (!identityReferences.has(reference) && !faithReferences.has(reference)) {
    failures.push(["home faith coverage: " + reference, "no exact Scripture-linked response"]);
  }
  const match = reference.match(/^(.+?)\s+(\d+):(\d+)$/);
  if (match) {
    const requestedName = match[1].toLowerCase() === "psalm" ? "Psalms" : match[1];
    const book = bibleBooks.find(item => item.name.toLowerCase() === requestedName.toLowerCase());
    const verse = book && kjv[bookCodes[book.name]]?.[Number(match[2]) - 1]?.[Number(match[3]) - 1];
    if (typeof verse !== "string" || !verse.trim()) {
      failures.push(["Open Book KJV lookup: " + reference, "the exact verse is not available from the offline database"]);
    }
  } else {
    failures.push(["Open Book reference format: " + reference, "expected Book chapter:verse"]);
  }
}

// Exercise the offline artwork generator: each study section gets a distinct,
 // accessible illustration without a network dependency.
try {
  const start = study.indexOf("function createStudySectionArtwork(index, heading)");
  const end = study.indexOf("function createStudyPanel()", start);
  if (start < 0 || end <= start) throw new Error("Study artwork generator could not be isolated.");
  const source = study.slice(start, end) + "\nwindow.__createStudyArt = createStudySectionArtwork;";
  const sandbox = { window: {}, String, encodeURIComponent };
  vm.runInNewContext(source, sandbox, { timeout: 1000 });
  const render = sandbox.window.__createStudyArt;
  const images = Array.from({ length: 10 }, (_, index) => render(index, "Section " + index));
  assert.ok(images.every(value => value.startsWith("data:image/svg+xml;charset=utf-8,")));
  assert.equal(new Set(images).size, 10, "Each Study Centre section must receive distinct artwork.");
  assert.ok(images.every(value => value.length < 6000),
    "Each generated illustration must remain lightweight for mobile devices.");
  assert.ok(!study.slice(start, end).includes("fetch("),
    "Study illustrations must not require a network request.");
  const svg = decodeURIComponent(render(0, "Meaning & Context").split(",")[1]);
  assert.ok(svg.includes("Meaning &amp; Context"), "Study artwork labels must be safely escaped.");
  assert.ok(svg.includes("ZURIEL STUDY CENTRE"));
} catch (error) {
  failures.push(["offline Study Centre artwork runtime", error.message]);
}
if (!study.includes('illustration.alt = "Illustration for " + summary.textContent.trim()')) {
  failures.push(["Study Centre illustration accessibility", "each section image must have descriptive alt text"]);
}
if (!study.includes('illustration.loading = "lazy"') || !study.includes('illustration.decoding = "async"')) {
  failures.push(["Study Centre mobile performance", "illustrations must be lazy-loaded and asynchronously decoded"]);
}
if (!study.includes('body.prepend(illustration)')) {
  failures.push(["Study Centre illustration placement", "each section illustration must appear before its study content"]);
}
if (failures.length) {
  console.error("Original-language study integrity checks failed:");
  for (const [label, detail] of failures) console.error(" - " + label + ": " + detail);
  process.exitCode = 1;
} else {
  console.log("Zuriel study and open-book integrity checks passed (" +
    (checks.length + linkerChecks.length + requiredReaderPanels.length + homeChecks.length + requiredFaithFields.length + 4) +
    " safeguards).");
}
