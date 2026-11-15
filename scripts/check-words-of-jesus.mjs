import { readFile } from "node:fs/promises";

const [library, worker, packaging, index, workflow] = await Promise.all([
  readFile(new URL("../zuriel-library.js", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("./prepare-web.mjs", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/validate-pr.yml", import.meta.url), "utf8")
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
  ["search control", "Search a teaching, theme or Scripture reference"],
  ["theme filter", "Filter teachings by theme"],
  ["open reference in Bible reader", "window.openChapter(book, chapter)"],
  ["highlight selected Gospel verse", "zuriel-selected-verse"],
  ["connect to contextual study", "window.ZurielStudy.openForReference"],
  ["save teaching to personal library", "Words of Jesus — "],
  ["context reminder", "Read the surrounding passage"]
];
for (const [label, fragment] of required) {
  if (!library.includes(fragment)) failures.push(label + " is missing.");
}
const sectionStart = library.indexOf('if (page === "jesus")');
const sectionEnd = library.indexOf('if (page === "saved")', sectionStart);
const section = sectionStart >= 0 && sectionEnd > sectionStart ? library.slice(sectionStart, sectionEnd) : "";
const topicCount = (section.match(/category:/g) || []).length;
const referenceCount = (section.match(/refs:\[/g) || []).length;
if (topicCount < 20) failures.push("Expected at least 20 curated Jesus teaching themes; found " + topicCount + ".");
if (referenceCount < 20) failures.push("Expected Scripture reference collections for the teaching themes.");
if (!worker.includes("zuriel-bible-offline-v105")) failures.push("Offline cache version was not refreshed.");
if (!worker.includes('"./zuriel-library.js"')) failures.push("Service worker does not precache the library module.");
if (!packaging.includes('"zuriel-library.js"')) failures.push("Android web packaging omits the library module.");
if (!index.includes("zuriel-library.js")) failures.push("App entry point does not load the library module.");
if (!workflow.includes("node scripts/check-words-of-jesus.mjs")) failures.push("Pull-request workflow does not run this checker.");
if (failures.length) {
  console.error("Words of Jesus study-centre checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Words of Jesus study-centre checks passed (" + topicCount + " themes, " + referenceCount + " reference collections, searchable and filterable, reader navigation, contextual study, personal saving, offline and Android packaging).");
}
