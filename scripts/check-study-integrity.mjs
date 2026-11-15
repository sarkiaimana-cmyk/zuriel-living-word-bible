import { readFile } from "node:fs/promises";

const [study, home, faith, linking, reader, navigator] = await Promise.all([
  readFile(new URL("../zuriel-study.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-home.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-faith-content.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-word-linking.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-grid-navigation.js", import.meta.url), "utf8")
]);

const failures = [];
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
  ["token positions are mapped to source offsets", "matchAll(/\\S+/g)"],
  ["reader and source token sequences are compared", "tokenKey(readerTokens[index]) !== tokenKey(sourceSpans[index].text)"],
  ["source annotation offsets are validated", "Number(annotation && annotation.start)"],
  ["selected token overlaps its annotation range", "start < selected.end && end > selected.start"],
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
if (!navigator.includes('replace(/^\\s*\\d+\\.?\\s*/')) {
  failures.push(["verse text extraction", "invalid or missing verse-number cleanup"]);
}

const homeChecks = [
  ["open-book Scripture reference binding", 'setText("zurielOpenBookReference", verse.reference.toUpperCase())'],
  ["open-book declaration binding", 'setText("zurielOpenBookDeclaration", response.declaration)'],
  ["open-book affirmation binding", 'setText("zurielOpenBookAffirmation", response.affirmation)'],
  ["open-book prayer binding", 'setText("zurielOpenBookPrayer", response.prayer)'],
  ["open-book confession binding", 'setText("zurielOpenBookConfession", response.confession)'],
  ["open-book inspiration binding", 'setText("zurielOpenBookInspiration", response.inspiration)'],
  ["open-book passage navigation", 'window.openChapter(match[1], Number(match[2]))'],
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

const homeReferences = [...home.matchAll(/reference:\s*"([^"]+)"/g)].map(match => match[1].toLowerCase());
const faithReferences = new Set([...faith.matchAll(/["']?reference["']?\s*:\s*["']([^"']+)["']/g)].map(match => match[1].toLowerCase()));
for (const reference of homeReferences) {
  if (!faithReferences.has(reference)) failures.push(["home faith coverage: " + reference, "no exact Scripture-linked response"]);
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
