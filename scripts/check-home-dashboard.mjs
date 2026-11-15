import { readFile } from "node:fs/promises";

const [home, library, index, worker, version, updates] = await Promise.all([
  readFile(new URL("../zuriel-home.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-library.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("../version.json", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-updates.js", import.meta.url), "utf8")
]);
const failures = [];
function requireText(source, fragment, label) {
  if (!source.includes(fragment)) failures.push(label + " is missing.");
}
function forbidText(source, fragment, label) {
  if (source.includes(fragment)) failures.push(label + " should not be present.");
}

requireText(index, 'src="zuriel-grid-navigation.js"', "The single full-screen passage navigator");
requireText(index, "max-width: 1120px", "Responsive full-width main layout");
requireText(index, "#message .verse", "Responsive Scripture verse layout");
requireText(index, "text-align: left", "Left-aligned Scripture body");
requireText(index, "overflow-wrap: anywhere", "Safe Scripture wrapping on narrow screens");
forbidText(home, "zurielHomePassageCard", "The duplicate home passage selector");
forbidText(home, "setupHomePassageSelector", "The duplicate home passage selector logic");
requireText(home, "zurielHomeContinueReading", "The continue-reading shortcut");
requireText(home, "zurielOpenBookFaithCard", "The Scripture-linked open-book faith card");
requireText(home, "His Words.. My life.. My Victory", "The approved Open Book card headline");
requireText(home, "window.getBibleVerseText(verse.reference)", "Open Book exact offline KJV passage retrieval");
requireText(home, "faithCardRenderToken", "Protection against out-of-order Scripture loads");
requireText(home, "function canonicalBookName(value)", "Psalm/Psalms reader-name normalization");
requireText(home, "function findHomeVerseElement(verseNumber)", "Exact home-card verse navigation");
forbidText(home, 'document.querySelectorAll("#message .verse")[Number(match[3]) - 1]', "Position-based Open Book verse navigation");
forbidText(home, 'setText("zurielOpenBookScripture", verse.text)', "Hard-coded home verse text in the Open Book Scripture panel");
requireText(index, 'requestedBookName.toLowerCase() === "psalm" ? "Psalms" : requestedBookName', "KJV verse lookup Psalm alias normalization");
requireText(home, 'window.ZurielLibrary.open("declarations")', "The declarations route");
requireText(home, 'window.ZurielLibrary.open("devotional")', "The devotional route");
requireText(home, 'window.ZurielLibrary.open("saved")', "The bottom-navigation saved-library route");
requireText(home, '["library", "📚", "Library"]', "The dedicated Library navigation item");
requireText(home, 'data-section="declare"', "The declarations home shortcut");
requireText(home, 'data-section="devotional"', "The devotional home shortcut");
requireText(home, '["personal", "📝", "My Space"]', "The six-item primary navigation");
requireText(library, 'if (page === "declarations")', "The declarations content page");
requireText(library, 'if (page === "devotional")', "The devotional content page");
requireText(library, 'if (page === "saved")', "The saved-library content page");
requireText(worker, "zuriel-bible-offline-v113", "The refreshed offline cache");
if (JSON.parse(version).version !== "1.4.21") failures.push("App version metadata is not 1.4.20.");
requireText(updates, 'const APP_VERSION = "1.4.21";', "The in-app version display");
requireText(updates, "The release signing identity is configured for our verified build", "Accurate Android update readiness guidance");
forbidText(updates, "a stable signing identity must be configured first", "The obsolete Android signing warning");
requireText(updates, "in-app APK download and installation are not implemented yet", "Honest Android installation capability disclosure");

if (failures.length) {
  console.error("Home dashboard checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Home dashboard checks passed: one passage navigator, distinct declarations/devotional/saved destinations, preserved reading shortcuts and refreshed offline metadata.");
}
