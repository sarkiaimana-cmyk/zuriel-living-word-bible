import { readFile } from "node:fs/promises";

const [library, worker, packaging, index, prWorkflow, androidWorkflow] = await Promise.all([
  readFile(new URL("../zuriel-library.js", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("./prepare-web.mjs", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/validate-pr.yml", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/android-apk.yml", import.meta.url), "utf8")
]);
const failures = [];
const checks = [
  ["exact Scripture reference and text inputs", "zgsScripture"],
  ["separate faith response inputs", "zgsDeclaration"],
  ["live preview", "function updatePreview()"],
  ["Scripture typography control", "zgsScriptureSize"],
  ["faith response typography control", "zgsFaithSize"],
  ["typeface control", "zgsTypeface"],
  ["adaptive long-content layout", "studio.dataset.layout = stacked ? \"stacked\" : \"spread\""],
  ["stacked long-content CSS", 'data-layout="stacked"'],
  ["image export action", "zgsSaveImage"],
  ["canvas PNG rendering", 'canvas.toBlob(value => value ? resolve(value)'],
  ["native file sharing where supported", "navigator.canShare({files:[file]})"],
  ["download fallback", "link.download = fileName"],
  ["saved card metadata", "zuriel_glory_verse_cards_v1"],
  ["the Light identity", "The Light 🕯️"],
  ["brand footer", "Zuriel Living Word"]
];
for (const [label, fragment] of checks) {
  if (!library.includes(fragment)) failures.push(label + " is missing.");
}
if (!worker.includes("zuriel-bible-offline-v92")) failures.push("Offline cache version was not refreshed.");
if (!worker.includes('"./zuriel-library.js"')) failures.push("Service worker does not precache the studio module.");
if (!packaging.includes('"zuriel-library.js"')) failures.push("Android web packaging omits the studio module.");
if (!index.includes("zuriel-library.js")) failures.push("App entry point does not load the studio module.");
if (!prWorkflow.includes("node scripts/check-open-book-studio.mjs")) failures.push("PR validation does not run the studio checker.");
if (!androidWorkflow.includes("node scripts/check-open-book-studio.mjs")) failures.push("Android validation does not run the studio checker.");
if (failures.length) {
  console.error("Open Book Card Studio checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Open Book Card Studio checks passed: live preview, typography controls, adaptive long-content layout, PNG export, native share/download fallback, offline and Android validation.");
}
