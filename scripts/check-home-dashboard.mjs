import { readFile } from "node:fs/promises";

const [home, library, index, worker, version, updates, faith] = await Promise.all([
  readFile(new URL("../zuriel-home.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-library.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("../version.json", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-updates.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-faith-content.js", import.meta.url), "utf8")
]);
const failures = [];
function requireText(source, fragment, label) {
  if (!source.includes(fragment)) failures.push(label + " is missing.");
}
function forbidText(source, fragment, label) {
  if (source.includes(fragment)) failures.push(label + " should not be present.");
}

requireText(index, 'src="zuriel-grid-navigation.js"', "The single full-screen passage navigator");
forbidText(home, "zurielHomePassageCard", "The duplicate home passage selector");
forbidText(home, "setupHomePassageSelector", "The duplicate home passage selector logic");
requireText(home, "zurielHomeContinueReading", "The continue-reading shortcut");
requireText(home, "zurielOpenBookFaithCard", "The Scripture-linked open-book faith card");
requireText(home, "--zuriel-home-wallpaper", "Rotating photographic home hero backgrounds");
requireText(home, "home-scripture-card", "The photographic Scripture card");
requireText(home, "background-image: linear-gradient(180deg,rgba(6,20,35,.20)", "The realistic photographic Open Book landscape");
requireText(home, "grid-template-columns: repeat(6,minmax(0,1fr))", "The six-destination compact mobile navigation");
requireText(home, "zurielMobileNavigationSafeguards", "Mobile navigation safe-area safeguards");
requireText(home, "grid-template-columns: repeat(7, minmax(0, 1fr)) !important", "Seven-destination mobile navigation layout");
requireText(home, "env(safe-area-inset-bottom, 0px)", "Android bottom safe-area support");
requireText(home, "--zuriel-bottom-navigation-space", "Bottom navigation content clearance");
requireText(index, "viewport-fit=cover", "Safe-area viewport configuration");
requireText(home, "linear-gradient(180deg,#f5f2e9 0%,#edf3f8 48%,#e8eff7 100%)", "The bright ivory and blue home background");
requireText(home, "His Words.. My life.. My Victory", "The approved Open Book card headline");
requireText(home, "window.getBibleVerseText(verse.reference)", "Open Book exact offline KJV passage retrieval");
const homeVerseBlock = home.match(/const verses = \[([\s\S]*?)\];/);
const homeVerseReferences = homeVerseBlock ? Array.from(homeVerseBlock[1].matchAll(/reference: "([^"]+)"/g), match => match[1].toLowerCase()) : [];
const faithReferences = new Set(Array.from(faith.matchAll(/["\']?reference["\']?\s*:\s*"([^"]+)"/g), match => match[1].toLowerCase()));
const missingFaithResponses = homeVerseReferences.filter(reference => !faithReferences.has(reference));
if (missingFaithResponses.length) failures.push("Every rotating home verse needs its own prayer, declaration, affirmation, confession and inspiration: " + missingFaithResponses.join(", "));
for (const id of ["zurielOpenBookPrayer","zurielOpenBookConfession","zurielOpenBookInspiration"]) requireText(home, id, "Working Open Book faith response panel " + id);

requireText(home, 'id="zurielHomeVerseCollection"', "Three simultaneously visible Home Scriptures");
requireText(home, 'data-reference="Psalm 23:1"', "First offline Home Scripture");
requireText(home, 'data-reference="Isaiah 41:10"', "Second offline Home Scripture");
requireText(home, 'data-reference="Philippians 4:13"', "Third offline Home Scripture");
requireText(home, 'window.getBibleVerseText(reference)', "Exact offline KJV text for every Home Scripture card");
requireText(home, 'data-home-read-reference', "Direct navigation from each Home Scripture card");

requireText(home, "faithCardRenderToken", "Protection against out-of-order Scripture loads");
requireText(home, "const HOME_VERSE_ROTATION_MS = 15000;", "Zite-matched 15-second home Scripture rotation");
requireText(home, 'document.visibilityState !== "visible" || currentSection !== "home"', "Pause Scripture rotation when the app is backgrounded or another section is open");
requireText(home, "renderOpenBookFaithCard();", "Synchronise the Open Book with each rotating home Scripture");
requireText(home, "window.setInterval(function ()", "Automatic home Scripture rotation timer");

requireText(home, 'identityNext.addEventListener("click"', "Manual identity revelation selection");
requireText(home, 'zurielNextVerse', "Manual daily Scripture selection");
requireText(home, 'id="zurielOpenBookCreateCard"', "Visible Open Book share-card action");
requireText(home, "window.ZurielLibrary.openGloryVerse(", "Exact Scripture handoff from the home card to the share-card studio");
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
requireText(library, "zlib-study-topic", "Illustrated Deep Bible Study pathways");
requireText(library, "openStudyTopic(topic)", "Actionable Deep Bible Study pathways");
requireText(library, "window.ZurielStudyArtwork(index, topic)", "Offline artwork in the Library study pathways");

requireText(library, "window.ZurielFaithContent.find(reference)", "Verse-specific content handoff from saved declarations");
for (const field of ["response.prayer","response.declaration","response.affirmation","response.confession","response.inspiration"]) {
  requireText(library, field, "Complete Open Book Studio field: " + field);
}

requireText(library, 'if (page === "declarations")', "The declarations content page");
requireText(library, 'if (page === "devotional")', "The devotional content page");
requireText(library, 'if (page === "saved")', "The saved-library content page");
const cacheVersionMatch = worker.match(/const CACHE_NAME = "zuriel-bible-offline-v(\d+)";/);
if (!cacheVersionMatch) failures.push("The offline cache name/version is missing.");
const appVersion = JSON.parse(version).version;
const updateVersionMatch = updates.match(/const APP_VERSION = "([^"]+)";/);
if (!appVersion || !updateVersionMatch || appVersion !== updateVersionMatch[1]) failures.push("App version metadata is inconsistent between version.json and the in-app update centre.");
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
