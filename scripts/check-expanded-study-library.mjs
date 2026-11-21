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

const studyDatasetPaths = [
  "zuriel-passage-commentary-expansion.json", "zuriel-topical-bible-study-library-batch-2.json",
  "zuriel-biblical-dictionary-expansion.json", "zuriel-original-language-word-studies-batch-1.json",
  "zuriel-names-and-titles-of-god-library.json", "zuriel-connected-scripture-trails-batch-1.json",
  "zuriel-connected-scripture-trails-batch-2.json", "zuriel-book-introductions-and-study-pathways.json",
  "zuriel-deep-study-guides.json", "zuriel-bible-geography-atlas.json",
  "zuriel-worship-study-pathways.json", "zuriel-theological-comparisons.json"
];
const [packagingScript, packagedLoader] = await Promise.all([
  readFile(new URL("../scripts/prepare-web.mjs", import.meta.url), "utf8"),
  readFile(new URL("../www/zuriel-study-library-data.js", import.meta.url), "utf8")
]);
assert.ok(packagingScript.includes('"zuriel-study-library-data.js"'), "Android packaging must include the study-library loader");
assert.ok(packagingScript.includes('await cp("data", "www/data", { recursive: true });'), "Android packaging must copy the offline study data directory");
assert.equal(packagedLoader, loader, "Packaged study-library loader must match the source loader");
const libraryScriptPosition = index.indexOf('<script src="zuriel-study-library-data.js"></script>');
const studyScriptPosition = index.indexOf('<script src="zuriel-study.js"></script>');
assert.ok(libraryScriptPosition >= 0, "Reader page must load the offline study-library loader");
assert.ok(studyScriptPosition > libraryScriptPosition, "Offline study data must load before the study interaction module");
for (const path of studyDatasetPaths) {
  const [sourceData, packagedData] = await Promise.all([json("data/" + path), json("www/data/" + path)]);
  assert.deepEqual(packagedData, sourceData, "Android package must include an exact copy of " + path);
}

const readerMapMatch = index.match(/const bookCodes = (\{[\s\S]*?\n\};)/);
assert.ok(readerMapMatch,"Reader book-code map must be present.");
const readerMap = JSON.parse(readerMapMatch[1].replace(/;\s*$/, ""));
const bookEntries = [...bookDataSource.matchAll(/\{\s*name:\s*"([^"]+)",\s*chapters:\s*(\d+)\s*\}/g)]
  .map(match => ({ name: match[1], chapters: Number(match[2]) }));
assert.equal(bookEntries.length,66,"Offline Bible index must contain all 66 books.");
const bookLookup = new Map(bookEntries.map(book => [book.name.toLowerCase(),book]));
bookLookup.set("psalm",bookLookup.get("psalms"));
bookLookup.set("song of songs",bookLookup.get("song of solomon"));
const commentaryBookCoverage = new Set(commentary.entries.map(entry => {
  const match = String(entry.passage || "").match(/^(.+?)\s+\d+:/);
  const book = match && bookLookup.get(match[1].toLowerCase().replace(/\s+/g," ").trim());
  return book && book.name;
}).filter(Boolean));
assert.equal(commentaryBookCoverage.size,66,"Passage commentary must cover every canonical Bible book");
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
  [dictionary.entries,110,"dictionary entries"],
  [books.bookIntroductions,66,"book introductions"], [books.bookStudyPathways,66,"book study pathways"],
  [trail1.trails,41,"connected Scripture trails batch 1"], [trail2.trails,33,"connected Scripture trails batch 2"],
  [deep.guides,120,"deep study guides"], [names.entries,52,"Names and Titles of God"],
  [words.entries,110,"original-language word studies"], [commentary.entries,173,"passage commentary"],
  [topical.entries,100,"topical study guides"], [worship.pathways,30,"worship study pathways"], [theology.entries,35,"theological comparisons"]
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
const dictionaryIds = new Set();
const dictionaryTerms = new Set();
for (const entry of dictionary.entries) {
  assert.ok(typeof entry.term === "string" && entry.term.trim().length >= 2,
    "Every dictionary entry needs a meaningful display term");
  assert.ok(typeof entry.definition === "string" && entry.definition.trim().length >= 30,
    "Every dictionary entry needs a substantive definition: " + entry.term);
  assert.ok(Array.isArray(entry.scriptureReferences) && entry.scriptureReferences.length >= 1,
    "Every dictionary entry needs at least one Scripture reference: " + entry.term);
  assert.ok(typeof entry.editorialCaution === "string" && entry.editorialCaution.trim().length >= 25,
    "Every dictionary entry needs an interpretive caution: " + entry.term);
  const normalizedTerm = entry.term.trim().toLocaleLowerCase("en");
  assert.ok(!dictionaryTerms.has(normalizedTerm), "Dictionary terms must be unique: " + entry.term);
  assert.ok(!dictionaryIds.has(entry.id), "Dictionary IDs must be unique: " + entry.id);
  dictionaryTerms.add(normalizedTerm);
  dictionaryIds.add(entry.id);
}
const theologyIds = new Set();
const theologyTitles = new Set();
for (const entry of theology.entries) {
  assert.ok(typeof entry.id === "string" && /^doctrine-\d{3}$/.test(entry.id), "Each theological comparison needs a stable doctrine ID");
  assert.ok(!theologyIds.has(entry.id), "Theological comparison IDs must be unique: " + entry.id);
  assert.ok(typeof entry.title === "string" && entry.title.trim().length >= 12, "Each theological comparison needs a meaningful title");
  assert.ok(!theologyTitles.has(entry.title.trim().toLocaleLowerCase("en")), "Theological comparison titles must be unique: " + entry.title);
  assert.ok(typeof entry.question === "string" && entry.question.length >= 25, "Each comparison needs a guiding question: " + entry.title);
  assert.ok(Array.isArray(entry.scriptureReferences) && entry.scriptureReferences.length >= 4, "Each comparison needs multiple Scripture references: " + entry.title);
  assert.ok(Array.isArray(entry.positions) && entry.positions.length >= 2, "Each theological comparison needs multiple interpretations");
  for (const position of entry.positions) {
    assert.ok(position.view && position.summary && position.summary.length >= 100 && position.traditions, "Each position needs a fair, substantive description: " + entry.title);
  }
  assert.ok(entry.sharedGround && entry.sharedGround.length >= 80 && entry.historicalContext && entry.historicalContext.length >= 80 && entry.areasOfDisagreement && entry.areasOfDisagreement.length >= 80 && entry.readingCaution && entry.readingCaution.length >= 80, "Each theological comparison needs balance and context: " + entry.title);
  theologyIds.add(entry.id);
  theologyTitles.add(entry.title.trim().toLocaleLowerCase("en"));
}
for (const [label,items] of [
  ["commentary",commentary.entries],["topical",topical.entries],["dictionary",dictionary.entries],
  ["word study",words.entries],["names",names.entries],["worship",worship.pathways]
]) {
  for (const item of items) assert.ok(item.id,label+" entries need stable IDs");
}

const wordStudyIds = new Set();
const wordStudyTerms = new Set();
for (const entry of words.entries) {
  assert.ok(typeof entry.id === "string" && entry.id.trim(), "Every original-language study needs a stable ID");
  assert.ok(!wordStudyIds.has(entry.id), "Original-language study IDs must be unique: " + entry.id);
  assert.ok(typeof entry.term === "string" && entry.term.trim(), "Every original-language study needs a display term: " + entry.id);
  const normalizedTerm = entry.term.trim().toLocaleLowerCase("en");
  assert.ok(!wordStudyTerms.has(normalizedTerm), "Original-language study terms must be unique: " + entry.term);
  assert.ok(["Greek","Hebrew","Aramaic","Aramaic-derived"].includes(entry.language), "Original-language study needs an explicit language label: " + entry.term);
  assert.ok(typeof entry.originalForm === "string" && entry.originalForm.trim(), "Original-language study needs its original script form: " + entry.term);
  const scriptPattern = entry.language === "Greek" ? /[\u0370-\u03FF\u1F00-\u1FFF]/ : /[\u0590-\u05FF]/;
  assert.ok(scriptPattern.test(entry.originalForm), "Original form does not match the declared script/language: " + entry.term);
  assert.ok(typeof entry.contextualGloss === "string" && entry.contextualGloss.trim().length >= 30, "Word study needs a substantive contextual gloss: " + entry.term);
  assert.ok(Array.isArray(entry.scriptureReferences) && entry.scriptureReferences.length >= 1, "Word study needs Scripture references: " + entry.term);
  assert.ok(typeof entry.interpretiveCaution === "string" && entry.interpretiveCaution.trim().length >= 25, "Word study needs an interpretive caution: " + entry.term);
  assert.ok(typeof entry.morphologyStatus === "string" && entry.morphologyStatus.trim(), "Word study must state whether morphology is verified: " + entry.term);
  wordStudyIds.add(entry.id);
  wordStudyTerms.add(normalizedTerm);
}
for (const path of [
  "zuriel-passage-commentary-expansion.json","zuriel-topical-bible-study-library-batch-2.json",
  "zuriel-biblical-dictionary-expansion.json","zuriel-original-language-word-studies-batch-1.json",
  "zuriel-names-and-titles-of-god-library.json","zuriel-connected-scripture-trails-batch-1.json",
  "zuriel-connected-scripture-trails-batch-2.json","zuriel-book-introductions-and-study-pathways.json",
  "zuriel-deep-study-guides.json","zuriel-bible-geography-atlas.json","zuriel-worship-study-pathways.json","zuriel-theological-comparisons.json"
]) assert.ok(loader.includes(path),"Study loader must include "+path);
assert.ok(index.includes('src="zuriel-study-library-data.js"'),"Study library integration script must load");
assert.match(worker, /zuriel-bible-offline-v\d+/, "Offline cache must use a versioned cache name");
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
assert.ok(loader.includes("Original-language form") && loader.includes("Morphology note") && loader.includes("Contextual word use"),"Word-study detail must expose original script, language, morphology status and contextual usage.");
console.log("Expanded study library passed: 74 Scripture trails; 66 book introductions and pathways; 12 offline datasets copied and parity-checked in the Android package; searchable reader-linked UI, offline precache and "+checkedPassages+" Scripture references checked against the bundled KJV.");
