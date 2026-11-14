import { readFile } from "node:fs/promises";

const [study, home, faith] = await Promise.all([
  readFile(new URL("../zuriel-study.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-home.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-faith-content.js", import.meta.url), "utf8")
]);

const checks = [["exact single-token gloss matching","tappedTokens.length === 1 && glossTokens.includes(tappedTokens[0])"],["no-guess mismatch explanation","will not guess which Hebrew or Greek word it represents"],["source parsing fallback","\"Source parsing tag: \" + word.parsing"],["Strong\\'s identifier normalization","padStart(4, \"0\")"],["lexicon sense validation","!entry || !Array.isArray(entry.senses)"],["lexicon retry action","Retry lexicon entry"],["offline-specific lexicon guidance","not saved on this device yet"]];
const failures = checks.filter(([label, fragment]) => !study.includes(fragment));
const requiredReaderPanels = ["zurielOriginalWordResults", "zurielLexiconDetails"];
for (const id of requiredReaderPanels) {
  if (!study.includes(`id="${id}"`)) failures.push([`reader panel: ${id}`, "missing from zuriel-study.js"]);
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
  if (!faith.includes(field)) failures.push([ "faith content field: " + field, "missing from zuriel-faith-content.js"]);
}
if (!home.includes('id="zurielOpenBookLight"')) failures.push(["Light panel", "missing from home card"]);

const reader = await readFile(new URL("../index.html", import.meta.url), "utf8");
const navigator = await readFile(new URL("../zuriel-grid-navigation.js", import.meta.url), "utf8");
if (!reader.includes('paragraph.dataset.verseNumber = String(index + 1)')) failures.push(["stable verse identity", "missing from index.html"]);
if (!navigator.includes('data-verse-number="')) failures.push(["exact verse target", "missing from navigator"]);
if (!navigator.includes('replace(/^\s*\d+\.?\s*/, "")) failures.push(["verse text extraction", "invalid or missing verse-number cleanup"]);


const homeReferences = [...home.matchAll(/reference:\s*"([^"]+)"/g)].map(match => match[1].toLowerCase());
const faithReferences = new Set([...faith.matchAll(/reference:\s*"([^"]+)"/g)].map(match => match[1].toLowerCase()));
for (const reference of homeReferences) {
  if (!faithReferences.has(reference)) failures.push(["home faith coverage: " + reference, "no exact Scripture-linked response"]);
}

if (failures.length) {
  console.error("Original-language study integrity checks failed:");
  for (const [label] of failures) console.error(" - " + label);
  process.exitCode = 1;
} else {
  console.log(`Zuriel study and open-book integrity checks passed (${checks.length + requiredReaderPanels.length + homeChecks.length + requiredFaithFields.length + 1} safeguards).`);
}
