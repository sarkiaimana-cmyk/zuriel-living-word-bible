import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
async function json(path) {
  return JSON.parse(await readFile(new URL(path, root), "utf8"));
}
const [
  geography, dictionary, books, trail1, trail2, deep, names, words,
  commentary, topical, worship, theology, loader, index, worker, bookDataSource, kjv
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
  json("data/zuriel-theological-comparisons.json"),
  readFile(new URL("../zuriel-study-library-data.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("../bible-data.js", import.meta.url), "utf8"),
  json("kjv.72bec70fcd.json")
]);


const readerMapMatch = index.match(/const bookCodes = (\{[\s\S]*?\n\};)/);
assert.ok(readerMapMatch,"Reader book-code map must be present.");
const readerMap = JSON.parse(readerMapMatch[1].replace(/;\s*$/, ""));
const bookEntries = [...bookDataSource.matchAll(/\{\s*name:\s*"([^"]+)",\s*chapters:\s*(\d+)\s*\}/g)]
  .map(match => ({ name: match[1], chapters: Number(match[2]) }));
assert.equal(bookEntries.length,66,"Offline Bible index must contain all 66 books.");
const bookLookup = new Map(bookEntries.map(book => [book.name.toLowerCase(),book]));
bookLookup.set("psalm",bookLookup.get("psalms"));
bookLookup.set("song of songs",bookLookup.get("song of solomon"));
let checkedPassages=0;
function checkReference(reference,label) {
  const match=String(reference||"").trim().match(/^(.+?)\s+(\d+):(\d+)/);
  if(!match) return; // Some book pathways intentionally use chapter-relative references.
  const book=bookLookup.get(match[1].toLowerCase().replace(/\s+/g," ").trim());
  assert.ok(book,label+" has an unknown Bible book in "+reference);
  const chapter=Number(match[2]), verse=Number(match[3]);
  assert.ok(chapter>=1 && chapter<=book.chapters,label+" has an invalid chapter in "+reference);
  const code=readerMap[book.name], chapters=code && kjv[code];
  assert.ok(Array.isArray(chapters),label+" has no bundled KJV mapping for "+book.name);
  const verses=chapters[chapter-1];
  assert.ok(Array.isArray(verses) && verse>=1 && verse<=verses.length,label+" has a missing KJV verse in "+reference);
  const range=String(reference).match(/:(\d+)\s*[-–—]\s*(\d+)$/);
  if(range) assert.ok(Number(range[2])<=verses.length,label+" has an out-of-range KJV reference in "+reference);
  checkedPassages++;
}
function walkReferences(value,label) {
  if(Array.isArray(value)) { value.forEach(item=>walkReferences(item,label)); return; }
  if(typeof value==="string") { checkReference(value,label); return; }
  if(value && typeof value==="object") {
    if(typeof value.reference==="string") checkReference(value.reference,label);
    if(typeof value.label==="string") checkReference(value.label,label);
    for(const [key,item] of Object.entries(value)) {
      if(key==="reference"||key==="label") continue;
      if(["references","scriptureReferences","keyPassages","pathway","passages","journeys","places","entries","trails","guides","bookIntroductions","bookStudyPathways","journeyReferences"].includes(key) || Array.isArray(item)) walkReferences(item,label);
    }
  }
}
for(const [label,data] of [
  ["geography",geography],["dictionary",dictionary],["book guides",books],["connected trails batch 1",trail1],
  ["connected trails batch 2",trail2],["deep guides",deep],["Names of God",names],["word studies",words],
  ["commentary",commentary],["topical studies",topical],["worship",worship],["theology",theology]
]) walkReferences(data,label);

const expected = [
  [geography.places,25,"biblical places"], [geography.journeys,8,"biblical journeys"],
  [dictionary.entries,86,"dictionary entries"],
  [books.bookIntroductions,66,"book introductions"], [books.bookStudyPathways,66,"book study pathways"],
  [trail1.trails,41,"connected Scripture trails batch 1"], [trail2.trails,33,"connected Scripture trails batch 2"],
  [deep.guides,20,"deep study guides"], [names.entries,52,"Names and Titles of God"],
  [words.entries,65,"original-language word studies"], [commentary.entries,103,"passage commentary"],
  [topical.entries,100,"topical study guides"], [worship.pathways,20,"worship study pathways"], [theology.entries,10,"theological comparisons"]
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
for (const entry of theology.entries) {
  assert.ok(entry.positions.length >= 2,"Each theological comparison needs multiple interpretations");
  assert.ok(entry.sharedGround && entry.historicalContext && entry.areasOfDisagreement && entry.readingCaution,"Each theological comparison needs balance and context");
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
  "zuriel-deep-study-guides.json","zuriel-bible-geography-atlas.json","zuriel-worship-study-pathways.json","zuriel-theological-comparisons.json"
]) assert.ok(loader.includes(path),"Study loader must include "+path);
assert.ok(index.includes('src="zuriel-study-library-data.js"'),"Study library integration script must load");
assert.ok(worker.includes('zuriel-bible-offline-v178'),"Offline cache must be version 178");
assert.ok(worker.includes("./zuriel-study-library-data.js"),"Study loader must be precached");
for (const path of [
  "zuriel-passage-commentary-expansion.json","zuriel-topical-bible-study-library-batch-2.json",
  "zuriel-biblical-dictionary-expansion.json","zuriel-original-language-word-studies-batch-1.json",
  "zuriel-names-and-titles-of-god-library.json","zuriel-connected-scripture-trails-batch-1.json",
  "zuriel-connected-scripture-trails-batch-2.json","zuriel-book-introductions-and-study-pathways.json",
  "zuriel-deep-study-guides.json","zuriel-bible-geography-atlas.json","zuriel-worship-study-pathways.json","zuriel-theological-comparisons.json"
]) assert.ok(worker.includes("./data/"+path),"Offline cache must include "+path);
assert.ok(loader.includes("window.ZurielStudyLibrary"),"Study library API must be exposed");
assert.ok(loader.includes("openReference"),"Study references must open through the Bible reader");
console.log("Expanded study library passed: 74 Scripture trails; 66 book introductions and pathways; 12 offline datasets; searchable reader-linked UI, offline precache and "+checkedPassages+" Scripture references checked against the bundled KJV.");
