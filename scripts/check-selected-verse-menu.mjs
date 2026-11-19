import { readFile } from "node:fs/promises";

const [source, reader, home] = await Promise.all([
  readFile(new URL("../zuriel-study.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-home.js", import.meta.url), "utf8")
]);
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
  "safe-area-inset-bottom",
  "zurielStudyLibraryDrawer",
  "Explore the Study Library",
  "study-library-intro",
  "studyLibraryDrawer.open=true"
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
const readerRequirements = [
  'Tap a verse to open its study panel.',
  'id = "zurielVerseActions"',
  'verseActions.hidden = false',
  'function selectVerseForGloryCard',
  'paragraph.addEventListener("click"',
  'selectVerseForGloryCard(index + 1, displayVerseText)',
  'positionVerseOverlay()',
  'items:[["Prayer","🙏"],["Declaration","📣"],["Affirmation","✨"],["Faith","🛡️"],["Inspiration","💡"]]',
  'items:[["Compare translations","⇄"],["Share card","🖼️"],["Highlight","🖍️"],',
  '✕ Close'
];
const missingReader = readerRequirements.filter(value => !reader.includes(value));
if (missingReader.length) {
  throw new Error("Reader's selected-verse overlay is missing required behaviour: " + missingReader.join(", "));
}
const verseClickStart = reader.indexOf('paragraph.addEventListener("click"');
const verseClickEnd = reader.indexOf('message.appendChild(paragraph)', verseClickStart);
const verseClickHandler = reader.slice(verseClickStart, verseClickEnd);
if (!verseClickHandler.includes("selectVerseForGloryCard(")) {
  throw new Error("Tapping a Scripture verse must open its contextual action menu.");
}
if (!source.includes("grid-template-columns:repeat(2,minmax(0,1fr))") || !source.includes("details[open]")) {
  throw new Error("Study Centre must provide responsive topic tiles that expand the selected topic.");
}
if (!source.includes('section.addEventListener("toggle"') || !source.includes('if(other!==section)other.open=false')) {
  throw new Error("Only one Study Library topic may remain expanded at a time.");
}
const studyRoute = home.slice(home.indexOf('if (section === "study")'), home.indexOf('if (section === "kingdom")'));
if (!studyRoute.includes('panel.dataset.mode = "verse"')) {
  throw new Error("Opening Study navigation must restore the full Study Centre after verse or word context.");
}
if (!reader.includes("studyDrawer.open = true")) {
  throw new Error("Verse-selected study actions must open the Study Library drawer.");
}
console.log("Selected-verse safeguards passed: compact Study Library drawer, responsive topic tiles, one-topic-at-a-time expansion, contextual verse actions and separate word study.");