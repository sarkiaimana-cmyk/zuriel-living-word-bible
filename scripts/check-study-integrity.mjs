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
  ["dictionary search normalizes Unicode accents", '.normalize("NFD")'],
  ["dictionary search collapses whitespace", '.replace(/\\s+/g, " ")'],
  ["dictionary exact-title matches rank first", "title === term) score = 100"],
  ["dictionary title-prefix matches rank highly", "title.startsWith(term)"],
  ["dictionary supports multi-word searches", "tokens.every(token => combined.includes(token))"],
  ["dictionary result ranking is stable (original order breaks score ties)", "a.index - b.index"],
  ["dictionary results support progressive browsing", "dictionaryVisibleLimit += 12"],
  ["dictionary browse is alphabetical", "!term ? a.entry[0].localeCompare(b.entry[0])"],
  ["dictionary result count is reported", '+ " matching entries."'],
  ["concordance interface is part of the Study Centre", 'id="zurielConcordanceQuery"'],
  ["concordance results open the selected verse", "window.selectBibleVerse(item.verse)"],
  ["cross-reference relationships are not invented", "relationship not classified by source."],
  ["original-language notes distinguish Strong's index from definition", "A Strong's number is an index, not a complete definition."],
  ["highlight storage rejects malformed top-level data", "!Array.isArray(saved)"],
  ["word highlights retain selected token identity", "record.wordTokens = record.wordTokens || {}"],
  ["word highlights compare saved token text", "savedToken.normalize(\"NFC\").toLowerCase()"],
  ["highlight storage failures are reported", "Device storage may be full or unavailable."],
  ["KJV word-annotation source", 'const KJV_API = "https://bible.helloao.org/api/eng_kjv/"'],
  ["KJV simplified chapter is loaded", '.simple.json'],
  ["KJV simplified word annotations are loaded", '.words.simple.json'],
  ["selected KJV annotation is matched", "matchSelectedKJVWord("],
  ["Strong's annotations are joined to interlinear records", "strongsIds.has(normalizeStrongs(word.strongs))"],
  ["source alignment mismatch is not guessed", "Zuriel will not guess which Hebrew or Greek word belongs to this English word."],
  ["BSB gloss is distinguished from KJV wording", "The interlinear gloss is the Berean Standard Bible's English phrase, not a KJV definition; a lemma identifies a dictionary headword"],
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
const readerChecks = [
  ["concordance supports exact whole-word searches", 'new RegExp("(^|[^a-z0-9])" + escaped + "([^a-z0-9]|$)", "i")'],
  ["concordance supports exact phrase searches", "searchable.toLowerCase().includes(term)"],
  ["concordance supports up to 200 matches", "Math.min(limit, mode ? 200 : 50)"]
];
for (const [label, fragment] of readerChecks) {
  if (!reader.includes(fragment)) failures.push([label, "missing from index.html Bible search engine"]);
}

if (study.includes("glossTokens.includes")) {
  failures.push(["no gloss-based word guessing", "legacy gloss matching remains in zuriel-study.js"]);
}

const linkerChecks = [
  ["token positions are mapped to source offsets", "function getWordSpans(value)"],
  ["reader and source token sequences are compared", "tokenKey(readerTokens[index].text) !== tokenKey(sourceSpans[index].text)"],
  ["source annotation offsets are validated", "Number(annotation && annotation.start)"],
  ["annotation range is fully contained in the selected token", "start >= selected.start && end <= selected.end"],
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
if (!study.includes("Related Scripture references") ||
    !study.includes("CROSS_REFERENCE_API + code + \"/\" + chapter + \".json\"") ||
    !study.includes("references.slice(0, 8)")) {
  failures.push(["word-study related Scripture links", "the compact word panel must show grounded cross-references for the selected verse"]);
}
if (!study.includes("window.ZurielStudyArtwork = function(index, heading)")) {
  failures.push(["offline study artwork export", "the library needs access to the same local SVG artwork used by the Study Centre"]);
}
if (!study.includes("openWordInContext: async function")) failures.push(["contextual word study", "the reader needs a contextual word explanation that does not force navigation"]);
if (!reader.includes("window.ZurielStudy.openWordInContext")) failures.push(["contextual word-study reader wiring", "word taps must use the inline study action"]);
if (!study.includes('(reader || main || document.body).appendChild(panel)')) failures.push(["reader-local Study Centre placement", "the full Study Centre must be mounted with the Bible reader"]);
if (!study.includes('layout.id = "zurielReaderStudyLayout"') ||
    !study.includes("grid-template-columns:minmax(0,1fr);") ||
    !study.includes("#zurielReaderStudyLayout > #message .verse") ||
    !study.includes("text-align:left") ||
    study.includes("grid-template-columns:minmax(0,1fr) minmax(280px,360px)")) {
  failures.push(["full-width Scripture reading layout", "the Bible text must occupy the full available width, align left and wrap naturally without a side-by-side study column"]);
}
if (study.includes("verseElement.parentNode.insertBefore(contextCard")) failures.push(["no inserted word card between verses", "word context must stay in the study panel, not interrupt Scripture"]);
if (!study.includes('@media (max-width:640px)') || !study.includes('position:fixed;') || !study.includes('max-height:min(62dvh,560px)')) failures.push(["mobile word-study bottom sheet", "the focused word panel must be reachable on small screens without narrowing the Scripture reader"]);
if (!study.includes('event.key === "Escape"') || !study.includes('document.removeEventListener("keydown", handleContextKeydown)')) failures.push(["word-study Escape dismissal", "the contextual panel must close cleanly from the keyboard and release its listener"]);
if (!study.includes("let wordContextRequest = 0;") ||
    !study.includes("const contextRequestId = ++wordContextRequest;") ||
    !study.includes("contextRequestId !== wordContextRequest || !contextCard.isConnected")) {
  failures.push(["rapid word-tap response isolation", "a slower earlier word lookup must never populate a newer selected word's panel"]);
}
if (!study.includes("let activeWordContextCleanup = null;") ||
    !study.includes("if (activeWordContextCleanup) activeWordContextCleanup();") ||
    !study.includes("activeWordContextCleanup = cleanupContextListener;")) {
  failures.push(["word-study listener lifecycle", "replacing a contextual panel must release the previous keyboard listener"]);
}


if (home.includes('document.getElementById("zurielHomeOpenBible")')) {
  failures.push(["retired Home control binding", "the removed zurielHomeOpenBible element must not be bound"]);
}
if (home.includes("setInterval(")) {
  failures.push(["stable Home Scripture display", "Home revelations and daily Scripture must not rotate automatically"]);
}
for (const id of ["zurielIdentityTitle","zurielIdentityVerse","zurielNextVerse","zurielHomeVerse","zurielOpenBookScripture","zurielOpenBookPrayer","zurielOpenBookConfession","zurielOpenBookInspiration"]) {
  if (!home.includes('id="' + id + '"')) failures.push(["Home dashboard control: " + id, "missing from Home dashboard markup"]);
}

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
// Exercise concordance matching independently of the interface.
try {
  const escapeConcordanceTerm = term =>
    term.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const wholeWord = term => new RegExp(
    "(^|[^a-z0-9])" + escapeConcordanceTerm(term) + "([^a-z0-9]|$)", "i"
  );
  assert.equal(wholeWord("grace").test("God gives grace freely."), true);
  assert.equal(wholeWord("grace").test("graceful"), false);
  assert.equal(wholeWord("a.b").test("an a.b example"), true);
  assert.equal(wholeWord("a.b").test("an axb example"), false);
  assert.equal("in the beginning God".toLowerCase().includes("in the beginning"), true);
  assert.equal("in a beginning God".toLowerCase().includes("in the beginning"), false);
} catch (error) {
  failures.push(["concordance matching runtime", error.message]);
}


// Verify the offline dictionary has broad, unique coverage and can reveal
// further results without hiding entries behind a permanent 12-item limit.
const dictionaryBlock = study.match(/const bibleDictionary = \[([\s\S]*?)\n  \];/);
assert.ok(dictionaryBlock, "offline biblical dictionary array exists");
const dictionaryTitles = [...dictionaryBlock[1].matchAll(/\["([^"]+)"/g)].map(match => match[1].toLowerCase());
assert.ok(dictionaryTitles.length >= 150, "dictionary contains at least 200 curated entries");
assert.equal(new Set(dictionaryTitles).size, dictionaryTitles.length, "dictionary entry titles are unique");
for (const requiredTerm of ["atonement", "covenant", "grace", "kingdom of god", "messiah", "new covenant", "resurrection", "salvation", "holy spirit", "justification by faith"]) {
  assert.ok(dictionaryTitles.includes(requiredTerm), "dictionary includes " + requiredTerm);
}

 
// Validate every curated cross-reference against the actual offline 66-book
// KJV corpus. This prevents an attractive label from shipping with a broken
// target, misspelled book name, or invalid chapter/verse.
try {
  const start = study.indexOf("const curatedCrossReferences = {");
  const end = study.indexOf("\n  };", start);
  if (start < 0 || end <= start) throw new Error("Curated cross-reference data could not be isolated.");
  const declaration = study.slice(start, end + "\n  };".length)
    .replace(/^const curatedCrossReferences = /, "")
    .replace(/;\s*$/, "");
  const curated = vm.runInNewContext("(" + declaration + ")", {}, { timeout: 1000 });
  const entries = Object.entries(curated);
  assert.ok(entries.length >= 70, "at least 70 curated Scripture source passages are maintained");
  let checkedTargets = 0;
  for (const [sourceReference, targets] of entries) {
    const sourceMatch = sourceReference.match(/^(.+?)\s+(\d+):(\d+)$/);
    assert.ok(sourceMatch, "curated source reference has a valid format: " + sourceReference);
    const sourceBook = bibleBooks.find(book => book.name === sourceMatch[1]);
    assert.ok(sourceBook, "curated source book exists: " + sourceReference);
    const sourceVerse = kjv[bookCodes[sourceBook.name]]?.[Number(sourceMatch[2]) - 1]?.[Number(sourceMatch[3]) - 1];
    assert.ok(typeof sourceVerse === "string" && sourceVerse.trim(), "curated source verse exists: " + sourceReference);
    assert.ok(Array.isArray(targets) && targets.length, "curated source has at least one target: " + sourceReference);
    for (const target of targets) {
      const targetBookName = target.book === "Psalm" ? "Psalms" : target.book;
      const targetBook = bibleBooks.find(book => book.name === targetBookName);
      assert.ok(targetBook, "curated target book exists: " + target.book);
      assert.ok(Number.isInteger(target.chapter) && target.chapter >= 1 && target.chapter <= targetBook.chapters,
        "curated target chapter is valid: " + target.book);
      const targetVerse = kjv[bookCodes[targetBook.name]]?.[target.chapter - 1]?.[target.verse - 1];
      assert.ok(Number.isInteger(target.verse) && target.verse >= 1 &&
        typeof targetVerse === "string" && targetVerse.trim(),
        "curated target verse exists: " + target.book + " " + target.chapter + ":" + target.verse);
      const relationshipTypes = [
        "Direct quotation", "Prophecy / fulfilment", "Scriptural pattern",
        "Parallel passage", "Scriptural promise"
      ];
      assert.ok(relationshipTypes.includes(target.relationship),
        "curated target uses a recognised relationship label: " + target.relationship);
      assert.ok(typeof target.note === "string" && target.note.trim().length >= 24,
        "curated target explanation is present and meaningful");
      checkedTargets++;
    }
  }
  console.log("Curated cross-reference integrity passed: " + entries.length +
    " source passages and " + checkedTargets + " valid offline KJV targets.");
} catch (error) {
  failures.push(["curated cross-reference integrity", error.message]);
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
