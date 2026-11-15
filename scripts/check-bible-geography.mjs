import { readFile } from "node:fs/promises";
import vm from "node:vm";

const [dataSource, moduleSource, index, worker, packaging, prWorkflow, androidWorkflow, version, updates] = await Promise.all([
  readFile(new URL("../zuriel-geography-data.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-geography.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("./prepare-web.mjs", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/validate-pr.yml", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/android-apk.yml", import.meta.url), "utf8"),
  readFile(new URL("../version.json", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-updates.js", import.meta.url), "utf8")
]);

const sandbox = { window: {} };
vm.runInNewContext(dataSource, sandbox);
const data = sandbox.window.ZurielGeographyData;
const failures = [];
const bookChapters = {
  Genesis:50, Exodus:40, Leviticus:27, Numbers:36, Deuteronomy:34, Joshua:24, Judges:21, Ruth:4,
  "1 Samuel":31, "2 Samuel":24, "1 Kings":22, "2 Kings":25, "1 Chronicles":29, "2 Chronicles":36,
  Ezra:10, Nehemiah:13, Esther:10, Job:42, Psalms:150, Proverbs:31, Ecclesiastes:12, "Song of Solomon":8,
  Isaiah:66, Jeremiah:52, Lamentations:5, Ezekiel:48, Daniel:12, Hosea:14, Joel:3, Amos:9, Obadiah:1,
  Jonah:4, Micah:7, Nahum:3, Habakkuk:3, Zephaniah:3, Haggai:2, Zechariah:14, Malachi:4,
  Matthew:28, Mark:16, Luke:24, John:21, Acts:28, Romans:16, "1 Corinthians":16, "2 Corinthians":13,
  Galatians:6, Ephesians:6, Philippians:4, Colossians:4, "1 Thessalonians":5, "2 Thessalonians":3,
  "1 Timothy":6, "2 Timothy":4, Titus:3, Philemon:1, Hebrews:13, James:5, "1 Peter":5, "2 Peter":3,
  "1 John":5, "2 John":1, "3 John":1, Jude:1, Revelation:22
};
if (!data || data.metadata?.sourceCommit !== "7eb18a5ee62f27b9b93bd6689ea272d76dd23b8f") failures.push("Pinned OpenBible source data is missing.");
if (!String(data?.metadata?.license).includes("CC BY 4.0")) failures.push("OpenBible attribution/license is missing.");
const region = data?.regions?.find(item => item.id === "galilee");
if (!region || region.places.length !== 4) failures.push("The first Galilee region must contain four curated places.");
const ids = new Set();
for (const place of region?.places || []) {
  if (ids.has(place.id)) failures.push("Duplicate place id: " + place.id);
  ids.add(place.id);
  if (!Number.isFinite(place.longitude) || !Number.isFinite(place.latitude)) failures.push(place.name + ": coordinates are invalid.");
  if (place.longitude < region.bounds.west || place.longitude > region.bounds.east || place.latitude < region.bounds.south || place.latitude > region.bounds.north) failures.push(place.name + ": coordinates fall outside the region bounds.");
  if (!Number.isInteger(place.score) || place.score < 0 || place.score > 1000) failures.push(place.name + ": source score is invalid.");
  if (!place.ancientId || !place.modernId || !place.resolutionName || !place.precision) failures.push(place.name + ": provenance/precision metadata is incomplete.");
  if (!Array.isArray(place.references) || !place.references.length) failures.push(place.name + ": Scripture links are missing.");
  for (const ref of place.references || []) {
    if (!bookChapters[ref.book] || !Number.isInteger(ref.chapter) || ref.chapter < 1 || ref.chapter > bookChapters[ref.book] || !Number.isInteger(ref.verse) || ref.verse < 1) failures.push(place.name + ": invalid Scripture reference.");
  }
}
for (const journey of region?.journeys || []) {
  if (journey.stops.length < 2) failures.push(journey.title + ": journey needs at least two stops.");
  for (const stop of journey.stops) {
    if (!ids.has(stop.placeId)) failures.push(journey.title + ": stop points to an unknown place.");
    if (!bookChapters[stop.reference.book] || stop.reference.chapter < 1 || stop.reference.chapter > bookChapters[stop.reference.book] || stop.reference.verse < 1) failures.push(journey.title + ": invalid Scripture reference.");
  }
}
for (const fragment of ['root.id = "zurielGeographyCentre"', "window.ZurielGeographyData", "window.openChapter", "window.ZurielStudy.openForReference", "aria-label", "mapNotice"]) {
  if (!moduleSource.includes(fragment)) failures.push("Geography module integration is missing: " + fragment);
}
if (/fetch\s*\(|XMLHttpRequest|WebSocket|https:\/\//.test(moduleSource)) failures.push("The geography UI must not require network access.");
if (!index.includes('src="zuriel-geography-data.js"') || !index.includes('src="zuriel-geography.js"')) failures.push("Web entry point omits geography files.");
if (index.indexOf('src="zuriel-geography-data.js"') > index.indexOf('src="zuriel-geography.js"') || index.indexOf('src="zuriel-geography.js"') < index.indexOf('src="zuriel-study.js"')) failures.push("Geography scripts are not loaded after their dependencies.");
if (!worker.includes('"./zuriel-geography-data.js"') || !worker.includes('"./zuriel-geography.js"') || !worker.includes("zuriel-bible-offline-v101")) failures.push("Offline cache does not include geography data and module.");
if (!packaging.includes('"zuriel-geography-data.js"') || !packaging.includes('"zuriel-geography.js"')) failures.push("Android web packaging omits geography files.");
if (!prWorkflow.includes("node scripts/check-bible-geography.mjs") || !androidWorkflow.includes("node scripts/check-bible-geography.mjs")) failures.push("Geography validation is not included in both workflows.");
if (JSON.parse(version).version !== "1.4.9" || !updates.includes('const APP_VERSION = "1.4.9";')) failures.push("App version metadata is inconsistent.");
if (failures.length) {
  console.error("Bible Geography checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Bible Geography checks passed: pinned source attribution, four in-bounds regional places, confidence/precision metadata, Scripture references, journey stops, offline-only UI, Android packaging and release metadata.");
}
