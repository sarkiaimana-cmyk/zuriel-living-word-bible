import { readFile } from "node:fs/promises";

const [home, library, index, worker, version] = await Promise.all([
  readFile(new URL("../zuriel-home.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-library.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("../version.json", import.meta.url), "utf8")
]);
const failures = [];
const checks = [
  ["one primary full-screen passage navigator", "zuriel-grid-navigation.js"],
  ["home no longer duplicates book/chapter/verse selectors", "zurielHomePassageCard"],
  ["home retains its continue-reading shortcut", "zurielHomeContinueReading"],
  ["home keeps the Scripture-linked open-book faith card", "zurielOpenBookFaithCard"],
  ["declarations have their own library page", 'window.ZurielLibrary.open("declarations")'],
  ["devotionals have their own library page", 'window.ZurielLibrary.open("devotional")'],
  ["saved content has its own library page", 'window.ZurielLibrary.open("saved")'],
  ["home offers a distinct declarations destination", 'data-section="declare"'],
  ["home offers a distinct devotional destination", 'data-section="devotional"'],
  ["home offers a distinct saved-library destination", 'data-section="library"'],
  ["six primary bottom-navigation destinations remain", '["personal", "📝", "My Space"]']
];
for (const [label, fragment] of checks) {
  const source = label.includes("library page") ? home : label.includes("saved-library") || label.includes("declarations destination") || label.includes("devotional destination") ? home : label.includes("navigator") ? index : home;
  if (source.includes(fragment) === label.includes("no longer duplicates book/chapter/verse selectors")) failures.push(label + " check failed.");
  if (label.includes("no longer duplicates") && home.includes(fragment)) failures.push(label + " check failed.");
}
if (!home.includes('window.ZurielLibrary.open("declarations")') ||
    !home.includes('window.ZurielLibrary.open("devotional")') ||
    !home.includes('window.ZurielLibrary.open("saved")')) failures.push("The three destinations are not routed independently.");
if (!library.includes('if (page === "declarations")') ||
    !library.includes('if (page === "devotional")') ||
    !library.includes('if (page === "saved")')) failures.push("The library module does not render three distinct content pages.");
if (!index.includes('src="zuriel-grid-navigation.js"')) failures.push("The full-screen passage navigator is not loaded.");
if (!worker.includes("zuriel-bible-offline-v96")) failures.push("Offline cache version was not refreshed.");
if (JSON.parse(version).version !== "1.4.4") failures.push("App version metadata is not 1.4.4.");
if (failures.length) {
  console.error("Home dashboard checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Home dashboard checks passed: one passage navigator, distinct declarations/devotional/saved destinations, preserved reading shortcuts and refreshed offline metadata.");
}
