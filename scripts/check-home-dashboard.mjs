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
forbidText(home, "zurielHomePassageCard", "The duplicate home passage selector");
forbidText(home, "setupHomePassageSelector", "The duplicate home passage selector logic");
requireText(home, "zurielHomeContinueReading", "The continue-reading shortcut");
requireText(home, "zurielOpenBookFaithCard", "The Scripture-linked open-book faith card");
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
requireText(worker, "zuriel-bible-offline-v101", "The refreshed offline cache");
if (JSON.parse(version).version !== "1.4.9") failures.push("App version metadata is not 1.4.9.");
requireText(updates, 'const APP_VERSION = "1.4.9";', "The in-app version display");

if (failures.length) {
  console.error("Home dashboard checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Home dashboard checks passed: one passage navigator, distinct declarations/devotional/saved destinations, preserved reading shortcuts and refreshed offline metadata.");
}
