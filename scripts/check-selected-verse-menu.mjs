import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../zuriel-study.js", import.meta.url), "utf8");
const required = [
  "zurielVerseActionMenu",
  "Selected verse study actions",
  "Prayer and faith",
  "Meaning and commentary",
  "Hebrew and Greek words",
  "Biblical dictionary",
  "Connected Scriptures",
  "Concordance",
  "Theology and deeper study",
  "Topical Scripture connections",
  "Personal study notes",
  "Open Full Study Centre",
  "Back to verse actions",
  'panel.dataset.mode = "verse-menu"',
  'panel.dataset.mode="verse-detail"',
  "safe-area-inset-bottom"
];
const missing = required.filter(value => !source.includes(value));
if (missing.length) {
  throw new Error("Selected-verse menu is missing required behaviour: " + missing.join(", "));
}
const verseSelection = source.indexOf('panel.dataset.mode = "verse-menu";');
const wordSelection = source.indexOf('panel.dataset.mode = "word";');
if (verseSelection < 0 || wordSelection < 0 || verseSelection === wordSelection) {
  throw new Error("Verse selection and word selection must retain separate contextual modes.");
}
if (!source.includes('selected.setAttribute("data-zuriel-active","true")')) {
  throw new Error("A chosen action must reveal only its selected study section.");
}
console.log("Selected-verse action menu safeguards passed.");