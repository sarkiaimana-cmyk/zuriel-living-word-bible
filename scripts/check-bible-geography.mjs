import { readFile } from "node:fs/promises";
import vm from "node:vm";

const [dataSource, atlas, moduleSource, index, worker, packaging, prWorkflow, androidWorkflow, version, updates] = await Promise.all([
  readFile(new URL("../zuriel-geography-data.js", import.meta.url), "utf8"),
  readFile(new URL("../data/zuriel-bible-geography-atlas.json", import.meta.url), "utf8").then(JSON.parse),
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
const galilee = data?.regions?.find(item => item.id === "galilee");
const judea = data?.regions?.find(item => item.id === "judea");
if (!galilee || galilee.places.length !== 4) failures.push("Galilee must contain four curated places.");
if (!judea || judea.places.length !== 8) failures.push("Jerusalem and Judea must contain eight curated places.");
if (data?.regions?.length !== 2) failures.push("The Geography Centre must contain exactly two reviewed regions.");
if (!atlas || atlas.places?.length !== 25 || atlas.journeys?.length !== 8) failures.push("The wider offline atlas must expose all 25 reviewed places and eight Scripture journeys.");
const atlasPlaceIds = new Set();
for (const place of atlas?.places || []) {
  if (!place.id || atlasPlaceIds.has(place.id)) failures.push("Atlas place IDs must be present and unique: " + place.name);
  atlasPlaceIds.add(place.id);
  if (!place.name || !place.region || !place.significance || !place.studyCaution) failures.push("Atlas place context is incomplete: " + (place.name || place.id));
  if (!Array.isArray(place.references) || !place.references.length) failures.push("Atlas place has no Scripture references: " + place.name);
  let inheritedBook = "";
  for (const reference of place.references || []) {
    const full = String(reference).match(/^(.+?)\\s+(\\d+):(\\d+)/);
    const short = String(reference).match(/^(\\d+):(\\d+)/);
    if (full) inheritedBook = full[1];
    const book = full ? full[1] : inheritedBook;
    const chapter = Number(full ? full[2] : short?.[1]);
    if (!book || !short && !full || !(bookChapters[book] || (book === "Psalm" && bookChapters.Psalms)) ||
        !Number.isInteger(chapter) || chapter < 1 || chapter > (bookChapters[book] || bookChapters.Psalms)) {
      failures.push("Atlas place has an invalid or unanchored Scripture reference: " + place.name + " — " + reference);
    }
  }
}
const journeyIds = new Set();
for (const journey of atlas?.journeys || []) {
  if (!journey.id || journeyIds.has(journey.id)) failures.push("Atlas journey IDs must be present and unique: " + journey.name);
  journeyIds.add(journey.id);
  if (!journey.name || !journey.sequence || !journey.studyCaution || !Array.isArray(journey.references) || !journey.references.length) failures.push("Atlas journey context is incomplete: " + (journey.name || journey.id));
}
for (const fragment of [
  'root.id = "zurielGeographyAtlasDirectory"',
  'Search 25 places by name, region or significance',
  'atlas.places.length + " places and "',
  'atlas.journeys.length + " journeys loaded.',
  'function parseAtlasReference(reference)',
  'Historical note: " + place.studyCaution'
]) if (!moduleSource.includes(fragment)) failures.push("Expanded offline atlas UI is missing: " + fragment);
const ids = new Set();
for (const region of data?.regions || []) {
  for (const place of region.places || []) {
    if (ids.has(place.id)) failures.push("Duplicate place id: " + place.id);
    ids.add(place.id);
    if (!Number.isFinite(place.longitude) || !Number.isFinite(place.latitude)) failures.push(place.name + ": coordinates are invalid.");
    if (place.longitude < region.bounds.west || place.longitude > region.bounds.east || place.latitude < region.bounds.south || place.latitude > region.bounds.north) failures.push(place.name + ": coordinates fall outside region bounds.");
    if (!Number.isInteger(place.score) || place.score < 0 || place.score > 1000) failures.push(place.name + ": source score is invalid.");
    if (!place.ancientId || !place.modernId || !place.resolutionName || !place.precision) failures.push(place.name + ": provenance/precision metadata is incomplete.");
    if (!Array.isArray(place.references) || !place.references.length) failures.push(place.name + ": Scripture links are missing.");
    for (const ref of place.references || []) {
      if (!bookChapters[ref.book] || !Number.isInteger(ref.chapter) || ref.chapter < 1 || ref.chapter > bookChapters[ref.book] || !Number.isInteger(ref.verse) || ref.verse < 1) failures.push(place.name + ": invalid Scripture reference.");
    }
  }
  for (const journey of region.journeys || []) {
    if (!journey.stops || journey.stops.length < 2) failures.push(journey.title + ": journey needs at least two stops.");
    for (const stop of journey.stops || []) {
      if (!region.places.some(place => place.id === stop.placeId)) failures.push(journey.title + ": stop points to an unknown place.");
      const ref = stop.reference || {};
      if (!bookChapters[ref.book] || ref.chapter < 1 || ref.chapter > bookChapters[ref.book] || ref.verse < 1) failures.push(journey.title + ": invalid Scripture reference.");
    }
  }
}
for (const fragment of ['data.regions.forEach(function (region)', 'root.id = "zurielGeographyCentre-" + region.id', "window.ZurielGeographyData", "window.openChapter", "window.selectBibleVerse(reference.verse)", "aria-label", "mapNotice"]) {
  if (!moduleSource.includes(fragment)) failures.push("Geography module integration is missing: " + fragment);
}
if (!moduleSource.includes('fetch("./data/zuriel-bible-geography-atlas.json")') || /fetch\s*\(\s*["\']https?:/i.test(moduleSource)) failures.push("The expanded atlas must load only its locally cached JSON dataset.");
if (!worker.includes('"./data/zuriel-bible-geography-atlas.json"')) failures.push("The expanded atlas JSON is missing from the offline service-worker cache.");
if (!index.includes('src="zuriel-geography-data.js"') || !index.includes('src="zuriel-geography.js"')) failures.push("Web entry point omits geography files.");
if (index.indexOf('src="zuriel-geography-data.js"') > index.indexOf('src="zuriel-geography.js"') || index.indexOf('src="zuriel-geography.js"') < index.indexOf('src="zuriel-study.js"')) failures.push("Geography scripts are not loaded after their dependencies.");
const cacheVersionMatch = worker.match(/const CACHE_NAME = "zuriel-bible-offline-v(\d+)";/);
if (!worker.includes('"./zuriel-geography-data.js"') || !worker.includes('"./zuriel-geography.js"') || !cacheVersionMatch) failures.push("Offline cache does not include geography data/module or a versioned cache.");
if (!packaging.includes('"zuriel-geography-data.js"') || !packaging.includes('"zuriel-geography.js"')) failures.push("Android web packaging omits geography files.");
if (!prWorkflow.includes("node scripts/check-bible-geography.mjs") || !androidWorkflow.includes("node scripts/check-bible-geography.mjs")) failures.push("Geography validation is not included in both workflows.");
const appVersionMatch = updates.match(/const APP_VERSION = "([^"]+)";/);
if (!appVersionMatch || JSON.parse(version).version !== appVersionMatch[1]) failures.push("App version metadata is inconsistent between version.json and the in-app update centre.");
if (failures.length) {
  console.error("Bible Geography checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Bible Geography checks passed: two coordinate-backed regional locators, twelve pinned places, 25 atlas place records, eight journeys, Scripture context, offline local loading and Android packaging.");
}
