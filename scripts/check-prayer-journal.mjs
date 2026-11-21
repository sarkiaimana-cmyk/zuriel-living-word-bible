import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../zuriel-library.js", import.meta.url), "utf8");
const start = source.indexOf('if (page === "prayer")');
const end = source.indexOf('if (page === "notes")', start);
assert.ok(start >= 0 && end > start, "The prayer journal page must be present.");
const page = source.slice(start, end);
for (const label of ["Prayer", "Thanksgiving", "Answered Prayer", "Testimony"]) {
  assert.ok(page.includes(label), "The journal must support " + label + " entries.");
}
assert.match(page, /Scripture reference \(optional/);
assert.match(page, /category: category/);
assert.match(page, /reference: referenceField\.value\.trim\(\)/);
assert.match(page, /renderPrayerRecords\(\)/);
assert.match(page, /function openPrayerReference\(reference, action\)/);
assert.match(page, /Open Scripture/);
assert.match(page, /window\.selectBibleVerse/);
assert.match(page, /saved\.prayers\.slice\(\)\.reverse\(\)/);
assert.match(page, /Entries are saved locally in this app on this device/);
assert.match(source, /category: "prayer"/, "Reader-generated prayer responses must remain compatible with the journal.");
assert.match(source, /item\.category\) box\.appendChild/, "Saved journal categories should be displayed when present.");


const savedStart = source.indexOf('saved.prayers.slice().reverse().forEach(function (item) {', source.indexOf('if (page === "saved")'));
assert.ok(savedStart >= 0, "Saved Library must display journal records.");
const savedBlock = source.slice(savedStart, source.indexOf('});', savedStart) + 3);
assert.match(savedBlock, /item\.title/);
assert.match(savedBlock, /item\.category/);
assert.match(savedBlock, /item\.reference/);
assert.match(savedBlock, /Open Scripture/);
assert.match(savedBlock, /openReference\(item\.reference\)/);
console.log("Prayer journal checks passed: prayer, thanksgiving, answered prayer and testimony entries retain optional Scripture references and display newest first.");
