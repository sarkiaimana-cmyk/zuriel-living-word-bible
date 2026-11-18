import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
async function json(path) {
  return JSON.parse(await readFile(new URL(path, root), "utf8"));
}
const [
  geography, dictionary, books, trail1, trail2, deep, names, words,
  commentary, topical, worship, loader, index, worker
] = await Promise.all([
  json("data/zuriel-bible-geography-atlas.json"),
  json("data/zuriel-biblical-dictionary-expansion.json"),
  json("data/zuriel-book-introductions-and-study-pathways.json"),
  json("data/zuriel-connected-scripture-trails-batch-1.json"),
  json("data/zuriel-connected-scripture-trails-batch-2.json"),
  json("data/zuriel-deep-study-guides.json"),
  json("data/zuriel-names-and-titles-of-god-library.json"),
  json("data/zuriel-original-language-word-studies-batch-1.json"),
  json("data/zuriel-passage-commentary-expansion.json"),
  json("data/zuriel-topical-bible-study-library-batch-2.json"),
  json("data/zuriel-worship-study-pathways.json"),
  readFile(new URL("../zuriel-study-library-data.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8")
]);

const expected = [
  [geography.places,25,"biblical places"], [geography.journeys,8,"biblical journeys"],
  [dictionary.entries,86,"dictionary entries"],
  [books.bookIntroductions,66,"book introductions"], [books.bookStudyPathways,66,"book study pathways"],
  [trail1.trails,41,"connected Scripture trails batch 1"], [trail2.trails,33,"connected Scripture trails batch 2"],
  [deep.guides,20,"deep study guides"], [names.entries,52,"Names and Titles of God"],
  [words.entries,65,"original-language word studies"], [commentary.entries,103,"passage commentary"],
  [topical.entries,100,"topical study guides"], [worship.pathways,20,"worship study pathways"]
];
for (const [items,count,label] of expected) {
  assert.ok(Array.isArray(items), label + " must be an array");
  assert.equal(items.length,count,label + " count");
}
for (const collection of [books.bookIntroductions,books.bookStudyPathways]) {
  const unique = new Set(collection.map(item => item.book));
  assert.equal(unique.size,66,"Every canonical book appears once in book guides");
}
const trails=[...trail1.trails,...trail2.trails];
assert.equal(new Set(trails.map(item=>item.id)).size,74,"Connected Scripture trail IDs must be unique");
for (const trail of trails) {
  assert.equal(trail.pathway.length,5,"Each Scripture trail has five ordered passage steps");
  assert.ok(trail.pathway.every(step => step.reference && step.connectionNote),"Each trail step needs a reference and explanation");
  assert.ok(trail.overview && trail.contextCaution && trail.lifeApplication,"Each trail has contextual safeguards and application");
}
for (const [label,items] of [
  ["commentary",commentary.entries],["topical",topical.entries],["dictionary",dictionary.entries],
  ["word study",words.entries],["names",names.entries],["worship",worship.pathways]
]) {
  for (const item of items) assert.ok(item.id,label+" entries need stable IDs");
}
for (const path of [
  "zuriel-passage-commentary-expansion.json","zuriel-topical-bible-study-library-batch-2.json",
  "zuriel-biblical-dictionary-expansion.json","zuriel-original-language-word-studies-batch-1.json",
  "zuriel-names-and-titles-of-god-library.json","zuriel-connected-scripture-trails-batch-1.json",
  "zuriel-connected-scripture-trails-batch-2.json","zuriel-book-introductions-and-study-pathways.json",
  "zuriel-deep-study-guides.json","zuriel-bible-geography-atlas.json","zuriel-worship-study-pathways.json"
]) assert.ok(loader.includes(path),"Study loader must include "+path);
assert.ok(index.includes('src="zuriel-study-library-data.js"'),"Study library integration script must load");
assert.ok(worker.includes('zuriel-bible-offline-v173'),"Offline cache must be version 173");
assert.ok(worker.includes("./zuriel-study-library-data.js"),"Study loader must be precached");
for (const path of [
  "zuriel-passage-commentary-expansion.json","zuriel-topical-bible-study-library-batch-2.json",
  "zuriel-biblical-dictionary-expansion.json","zuriel-original-language-word-studies-batch-1.json",
  "zuriel-names-and-titles-of-god-library.json","zuriel-connected-scripture-trails-batch-1.json",
  "zuriel-connected-scripture-trails-batch-2.json","zuriel-book-introductions-and-study-pathways.json",
  "zuriel-deep-study-guides.json","zuriel-bible-geography-atlas.json","zuriel-worship-study-pathways.json"
]) assert.ok(worker.includes("./data/"+path),"Offline cache must include "+path);
assert.ok(loader.includes("window.ZurielStudyLibrary"),"Study library API must be exposed");
assert.ok(loader.includes("openReference"),"Study references must open through the Bible reader");
console.log("Expanded study library passed: 74 Scripture trails; 66 book introductions and pathways; 11 offline datasets; searchable reader-linked UI and service-worker precache.");
