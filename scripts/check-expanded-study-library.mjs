import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";

const root = new URL("../", import.meta.url);
async function json(path) {
  return JSON.parse(await readFile(new URL(path, root), "utf8"));
}
const [
  geography, dictionary, books, trail1, trail2, deep, names, words, words2,
  commentary, topical, topical3, worship, theology, loader, index, worker, bookDataSource, kjv, chapterGuides, exodusChapterGuides, exodusChapterGuides2, exodusChapterGuides3, exodusChapterGuides4, leviticusChapterGuides, leviticusChapterGuides2, numbersChapterGuides
] = await Promise.all([
  json("data/zuriel-bible-geography-atlas.json"),
  json("data/zuriel-biblical-dictionary-expansion.json"),
  json("data/zuriel-book-introductions-and-study-pathways.json"),
  json("data/zuriel-connected-scripture-trails-batch-1.json"),
  json("data/zuriel-connected-scripture-trails-batch-2.json"),
  json("data/zuriel-deep-study-guides.json"),
  json("data/zuriel-names-and-titles-of-god-library.json"),
  json("data/zuriel-original-language-word-studies-batch-1.json"),
  json("data/zuriel-original-language-word-studies-batch-2.json"),
  json("data/zuriel-passage-commentary-expansion.json"),
  json("data/zuriel-topical-bible-study-library-batch-2.json"),
  json("data/zuriel-topical-bible-study-library-batch-3.json"),
  json("data/zuriel-worship-study-pathways.json"),
  json("data/zuriel-theological-comparisons.json"),
  readFile(new URL("../zuriel-study-library-data.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("../bible-data.js", import.meta.url), "utf8"),
  json("kjv.72bec70fcd.json"),
  json("data/zuriel-chapter-introductions-genesis-01-10.json"),
  json("data/zuriel-chapter-introductions-exodus-01-10.json"),
  json("data/zuriel-chapter-introductions-exodus-11-20.json"),
  json("data/zuriel-chapter-introductions-exodus-21-30.json"),
  json("data/zuriel-chapter-introductions-exodus-31-40.json"),
  json("data/zuriel-chapter-introductions-leviticus-01-10.json"),
  json("data/zuriel-chapter-introductions-leviticus-11-27.json"),
  json("data/zuriel-chapter-introductions-numbers-01-10.json")
]);

const studyDatasetPaths = [
  "zuriel-passage-commentary-expansion.json", "zuriel-topical-bible-study-library-batch-2.json",
  "zuriel-topical-bible-study-library-batch-3.json",
  "zuriel-biblical-dictionary-expansion.json", "zuriel-original-language-word-studies-batch-1.json",
  "zuriel-original-language-word-studies-batch-2.json",
  "zuriel-names-and-titles-of-god-library.json", "zuriel-connected-scripture-trails-batch-1.json",
  "zuriel-connected-scripture-trails-batch-2.json", "zuriel-book-introductions-and-study-pathways.json",
  "zuriel-deep-study-guides.json", "zuriel-bible-geography-atlas.json",
  "zuriel-worship-study-pathways.json", "zuriel-theological-comparisons.json",
  "zuriel-chapter-introductions-genesis-01-10.json",
  "zuriel-chapter-introductions-exodus-01-10.json",
  "zuriel-chapter-introductions-exodus-11-20.json",
  "zuriel-chapter-introductions-exodus-21-30.json",
  "zuriel-chapter-introductions-exodus-31-40.json",
  "zuriel-chapter-introductions-leviticus-01-10.json"
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
  ["connected trails batch 2",trail2],["deep guides",deep],["Names of God",names],["word studies batch 1",words],["word studies batch 2",words2],
  ["commentary",commentary],["topical studies",topical],["topical studies batch 3",topical3],["worship",worship],["theology",theology]
]) walkReferences(data,label);

const expected = [
  [geography.places,25,"biblical places"], [geography.journeys,8,"biblical journeys"],
  [dictionary.entries,130,"dictionary entries"],
  [books.bookIntroductions,66,"book introductions"], [books.bookStudyPathways,66,"book study pathways"],
  [trail1.trails,41,"connected Scripture trails batch 1"], [trail2.trails,33,"connected Scripture trails batch 2"],
  [deep.guides,20,"deep study guides"], [names.entries,52,"Names and Titles of God"],
  [words.entries,110,"original-language word studies batch 1"], [words2.entries,20,"original-language word studies batch 2"], [commentary.entries,173,"passage commentary"],
  [topical.entries,100,"topical study guides batch 2"], [topical3.entries,20,"topical study guides batch 3"], [worship.pathways,30,"worship study pathways"], [theology.entries,35,"theological comparisons"],
  [chapterGuides.chapters,50,"Genesis chapter introductions"],
  [exodusChapterGuides.chapters,10,"Exodus chapter introductions 1–10"],
  [exodusChapterGuides2.chapters,10,"Exodus chapter introductions 11–20"],
  [exodusChapterGuides3.chapters,10,"Exodus chapter introductions 21–30"],
  [exodusChapterGuides4.chapters,10,"Exodus chapter introductions 31–40"],
  [leviticusChapterGuides.chapters,10,"Leviticus chapter introductions 1–10"],
  [leviticusChapterGuides2.chapters,17,"Leviticus chapter introductions 11–27"],
  [numbersChapterGuides.chapters,10,"Numbers chapter introductions 1–10"]
];
for (const [items,count,label] of expected) {
  assert.ok(Array.isArray(items), label + " must be an array");
  assert.equal(items.length,count,label + " count");
}
for (const collection of [books.bookIntroductions,books.bookStudyPathways]) {
  const unique = new Set(collection.map(item => item.book));
  assert.equal(unique.size,66,"Every canonical book appears once in book guides");
}
const introductionBooks = new Set(books.bookIntroductions.map(item => item.book));
assert.equal(introductionBooks.size,66,"Every canonical book needs one book introduction");
const readingNotes = books.bookIntroductions.map(item => item.readingNote.trim());
assert.ok(readingNotes.every(note => note.length >= 120), "Every book introduction needs a substantive contextual reading note");
assert.equal(new Set(readingNotes).size,66,"Book-specific reading notes must not be repeated across books");
for (const introduction of books.bookIntroductions) {
  assert.ok(typeof introduction.overview === "string" && introduction.overview.trim().length >= 90,
    "Every book introduction needs a meaningful overview: " + introduction.book);
  assert.ok(Array.isArray(introduction.studyQuestions) && introduction.studyQuestions.length >= 3,
    "Every book introduction needs at least three study questions: " + introduction.book);
}

const exodusGuideIds = new Set();
const allExodusGuides = [...exodusChapterGuides.chapters, ...exodusChapterGuides2.chapters, ...exodusChapterGuides3.chapters, ...exodusChapterGuides4.chapters];
assert.equal(allExodusGuides.length, 40, "All forty Exodus chapter guides must be present");
for (const guide of allExodusGuides) {
  assert.equal(guide.book, "Exodus", "Exodus guide batch must remain scoped to Exodus");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 1 && guide.chapter <= 40, "Exodus chapter number must be valid");
  assert.ok(guide.title.startsWith("Exodus " + guide.chapter + " —"), "Exodus title must identify its chapter");
  assert.ok(!exodusGuideIds.has(guide.id), "Exodus guide IDs must be unique: " + guide.id); exodusGuideIds.add(guide.id);
  for (const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field] === "string" && guide[field].trim().length >= 100, "Exodus guide needs substantive " + field + ": " + guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 4, "Exodus guide needs Scripture references");
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3, "Exodus guide needs three study questions");
  for (const reference of guide.keyPassages) checkReference(reference, "Exodus chapter " + guide.chapter);
}

const leviticusGuideIds = new Set();
const allLeviticusGuides = [...leviticusChapterGuides.chapters, ...leviticusChapterGuides2.chapters];
assert.equal(allLeviticusGuides.length, 27, "All twenty-seven Leviticus chapters must each have a guide");
for (const guide of numbersChapterGuides.chapters) {
  assert.equal(guide.book, "Numbers", "Numbers guide batch must remain scoped to Numbers");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 1 && guide.chapter <= 10, "Numbers chapter number must be valid");
  assert.ok(guide.title.startsWith("Numbers " + guide.chapter + " —"), "Numbers title must identify its chapter");
  assert.ok(typeof guide.id === "string" && /^num-ch\d{2}$/.test(guide.id), "Numbers guide needs a stable chapter ID");
  for (const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field] === "string" && guide[field].trim().length >= 100, "Numbers guide needs substantive " + field + ": " + guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 4, "Numbers guide needs Scripture references");
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3, "Numbers guide needs three study questions");
  for (const reference of guide.keyPassages) checkReference(reference, "Numbers chapter " + guide.chapter);
}
for (const guide of allLeviticusGuides) {
  assert.equal(guide.book, "Leviticus", "Leviticus guide batch must remain scoped to Leviticus");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 1 && guide.chapter <= 27, "Leviticus chapter number must be valid");
  assert.ok(guide.title.startsWith("Leviticus " + guide.chapter + " —"), "Leviticus title must identify its chapter");
  assert.ok(!leviticusGuideIds.has(guide.id), "Leviticus guide IDs must be unique: " + guide.id); leviticusGuideIds.add(guide.id);
  for (const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field] === "string" && guide[field].trim().length >= 100, "Leviticus guide needs substantive " + field + ": " + guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 4, "Leviticus guide needs Scripture references");
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3, "Leviticus guide needs three study questions");
  for (const reference of guide.keyPassages) checkReference(reference, "Leviticus chapter " + guide.chapter);
}

const chapterGuideIds = new Set();
for (const guide of chapterGuides.chapters) {
  assert.equal(guide.book, "Genesis", "This chapter-guide batch must remain scoped to Genesis");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 1 && guide.chapter <= 50,
    "Genesis chapter guide must have a valid chapter number");
  assert.ok(guide.title.startsWith("Genesis " + guide.chapter + " —"),
    "Chapter guide title must visibly identify its exact Bible chapter: " + guide.title);
  assert.ok(!chapterGuideIds.has(guide.id), "Chapter guide IDs must be unique: " + guide.id);
  assert.ok(typeof guide.historicalContext === "string" && guide.historicalContext.length >= 100,
    "Each chapter guide needs historical and literary context: " + guide.title);
  assert.ok(typeof guide.overview === "string" && guide.overview.length >= 120,
    "Each chapter guide needs a substantive overview: " + guide.title);
  assert.ok(typeof guide.studyObservation === "string" && guide.studyObservation.length >= 100,
    "Each chapter guide needs text-specific observation: " + guide.title);
  assert.ok(typeof guide.connectionNotes === "string" && guide.connectionNotes.length >= 100,
    "Each chapter guide needs explained cross-canonical connections: " + guide.title);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 3,
    "Each chapter guide needs multiple Scripture references: " + guide.title);
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3,
    "Each chapter guide needs distinct study questions: " + guide.title);
  assert.ok(typeof guide.lifeApplication === "string" && guide.lifeApplication.length >= 100,
    "Each chapter guide needs contextual life application: " + guide.title);
  assert.ok(typeof guide.interpretiveCaution === "string" && guide.interpretiveCaution.length >= 100,
    "Each chapter guide needs an interpretive caution: " + guide.title);
  assert.ok(typeof guide.readingNote === "string" && guide.readingNote.length >= 100,
    "Each chapter guide needs a chapter-specific reading note: " + guide.title);
  for (const reference of guide.keyPassages) checkReference(reference, "Genesis chapter guide " + guide.title);
  chapterGuideIds.add(guide.id);
}
assert.equal(chapterGuideIds.size, 50, "Genesis chapters 1–50 must each have exactly one guide");

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
  ["commentary",commentary.entries],["topical",topical.entries],["topical batch 3",topical3.entries],["dictionary",dictionary.entries],
  ["word study batch 1",words.entries],["word study batch 2",words2.entries],["names",names.entries],["worship",worship.pathways]
]) {
  for (const item of items) assert.ok(item.id,label+" entries need stable IDs");
}

const divineNameIds = new Set();
const divineNameLabels = new Set();
for (const entry of names.entries) {
  assert.ok(typeof entry.id === "string" && /^divine-title-\d{3}$/.test(entry.id),
    "Every divine name or title needs a stable ID");
  assert.ok(!divineNameIds.has(entry.id), "Divine name IDs must be unique: " + entry.id);
  assert.ok(typeof entry.name === "string" && entry.name.trim().length >= 1,
    "Every divine name needs a display label: " + entry.id);
  const normalizedName = entry.name.trim().toLocaleLowerCase("en");
  assert.ok(!divineNameLabels.has(normalizedName), "Divine name labels must be unique: " + entry.name);
  assert.ok(["Hebrew","Greek","Aramaic","Hebrew and Greek"].includes(entry.language),
    "Divine name needs an explicit source-language label: " + entry.name);
  assert.ok(typeof entry.originalForm === "string" && entry.originalForm.trim(),
    "Divine name needs its original or attested form: " + entry.name);
  if (entry.language === "Hebrew") assert.match(entry.originalForm, /\p{Script=Hebrew}/u,
    "Hebrew name must use Hebrew script: " + entry.name);
  if (entry.language === "Greek") assert.match(entry.originalForm, /\p{Script=Greek}/u,
    "Greek name must use Greek script: " + entry.name);
  assert.ok(typeof entry.senseAndContext === "string" && entry.senseAndContext.trim().length >= 25,
    "Divine name needs a contextual explanation: " + entry.name);
  assert.ok(Array.isArray(entry.scriptureReferences) && entry.scriptureReferences.length >= 1,
    "Divine name needs at least one Scripture reference: " + entry.name);
  assert.ok(typeof entry.studyNote === "string" && entry.studyNote.trim().length >= 20,
    "Divine name needs a responsible study note: " + entry.name);
  divineNameIds.add(entry.id);
  divineNameLabels.add(normalizedName);
}

const wordStudyIds = new Set();
const wordStudyTerms = new Set();
for (const entry of [...words.entries, ...words2.entries]) {
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
  "zuriel-topical-bible-study-library-batch-3.json",
  "zuriel-biblical-dictionary-expansion.json","zuriel-original-language-word-studies-batch-1.json",
  "zuriel-original-language-word-studies-batch-2.json","zuriel-names-and-titles-of-god-library.json","zuriel-connected-scripture-trails-batch-1.json",
  "zuriel-connected-scripture-trails-batch-2.json","zuriel-book-introductions-and-study-pathways.json",
  "zuriel-deep-study-guides.json","zuriel-bible-geography-atlas.json","zuriel-worship-study-pathways.json","zuriel-theological-comparisons.json",
  "zuriel-chapter-introductions-genesis-01-10.json", "zuriel-chapter-introductions-leviticus-11-27.json", "zuriel-chapter-introductions-numbers-01-10.json"
]) assert.ok(loader.includes(path),"Study loader must include "+path);
assert.ok(index.includes('src="zuriel-study-library-data.js"'),"Study library integration script must load");
assert.match(worker, /zuriel-bible-offline-v\d+/, "Offline cache must use a versioned cache name");
assert.ok(worker.includes("./zuriel-study-library-data.js"),"Study loader must be precached");
for (const path of [
  "zuriel-passage-commentary-expansion.json","zuriel-topical-bible-study-library-batch-2.json",
  "zuriel-topical-bible-study-library-batch-3.json",
  "zuriel-biblical-dictionary-expansion.json","zuriel-original-language-word-studies-batch-1.json",
  "zuriel-original-language-word-studies-batch-2.json","zuriel-names-and-titles-of-god-library.json","zuriel-connected-scripture-trails-batch-1.json",
  "zuriel-connected-scripture-trails-batch-2.json","zuriel-book-introductions-and-study-pathways.json",
  "zuriel-deep-study-guides.json","zuriel-bible-geography-atlas.json","zuriel-worship-study-pathways.json","zuriel-theological-comparisons.json",
  "zuriel-chapter-introductions-genesis-01-10.json", "zuriel-chapter-introductions-leviticus-11-27.json", "zuriel-chapter-introductions-numbers-01-10.json"
]) assert.ok(worker.includes("./data/"+path),"Offline cache must include "+path);
assert.ok(loader.includes("window.ZurielStudyLibrary"),"Study library API must be exposed");
assert.ok(loader.includes("openReference"),"Study references must open through the Bible reader");
assert.ok(loader.includes('["Chapter number", ["chapter"]]'), "Study details must display the chapter number");
assert.ok(loader.includes("Original-language form") && loader.includes("Morphology note") && loader.includes("Contextual word use"),"Word-study detail must expose original script, language, morphology status and contextual usage.");

const [lexiconIndex, packagedLexiconIndex, wordLinkerSource, lexiconLoaderSource] = await Promise.all([
  json("data/zuriel-lexicon-study-index.json"),
  json("www/data/zuriel-lexicon-study-index.json"),
  readFile(new URL("../zuriel-word-linking.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-lexicon-index.js", import.meta.url), "utf8")
]);
assert.deepEqual(packagedLexiconIndex, lexiconIndex, "Android package must include the exact Hebrew and Greek lexicon index");
assert.ok(index.includes('<script src="zuriel-word-linking.js"></script>'), "Exact KJV word linker must load in the reader");
assert.ok(index.includes('<script src="zuriel-lexicon-index.js"></script>'), "Hebrew and Greek lexicon loader must load in the reader");
assert.ok(worker.includes("./zuriel-word-linking.js"), "Offline cache must include the exact KJV word linker");
assert.ok(worker.includes("./zuriel-lexicon-index.js"), "Offline cache must include the lexicon loader");
assert.ok(worker.includes("./data/zuriel-lexicon-study-index.json"), "Offline cache must include the Hebrew and Greek lexicon index");
assert.ok(lexiconLoaderSource.includes("./data/zuriel-lexicon-study-index.json"), "Lexicon loader must request the bundled lexicon index");
assert.ok(lexiconLoaderSource.includes("Never infer a Strong's lemma from an English word alone"), "Lexicon loader must retain its no-guessing safeguard");
assert.ok(wordLinkerSource.includes("readerTokens.length !== sourceSpans.length") &&
  wordLinkerSource.includes("tokenKey(readerTokens[index].text) !== tokenKey(sourceSpans[index].text)") &&
  wordLinkerSource.includes("start >= selected.start && end <= selected.end"),
  "Word linker must verify full verse token alignment and keep source annotations within the selected word");

assert.equal(lexiconIndex.schemaVersion, 1, "Lexicon index schema must be versioned");
assert.ok(Array.isArray(lexiconIndex.entries) && lexiconIndex.entries.length > 0, "Lexicon index must contain entries");
const lexiconIds = new Set();
for (const entry of lexiconIndex.entries) {
  assert.ok(typeof entry.id === "string" && /^[HG]\d+$/.test(entry.id), "Lexicon entry needs a valid Strong's index: " + (entry && entry.id));
  assert.ok(!lexiconIds.has(entry.id), "Lexicon IDs must be unique: " + entry.id);
  assert.ok((entry.id.startsWith("H") && entry.language === "Hebrew") ||
    (entry.id.startsWith("G") && entry.language === "Greek"),
    "Lexicon language must agree with its Hebrew/Greek ID: " + entry.id);
  assert.ok(typeof entry.lemma === "string" && entry.lemma.trim(), "Lexicon entry needs an original-language lemma: " + entry.id);
  assert.ok(typeof entry.transliteration === "string" && entry.transliteration.trim(), "Lexicon entry needs transliteration: " + entry.id);
  assert.ok(typeof entry.studyLabel === "string" && entry.studyLabel.trim(), "Lexicon entry needs a contextual study label: " + entry.id);
  assert.ok(Array.isArray(entry.keyReferences) && entry.keyReferences.length >= 1, "Lexicon entry needs connected Scripture references: " + entry.id);
  if (entry.language === "Hebrew") assert.match(entry.lemma, /\p{Script=Hebrew}/u, "Hebrew lexicon lemma must use Hebrew script: " + entry.id);
  if (entry.language === "Greek") assert.match(entry.lemma, /\p{Script=Greek}/u, "Greek lexicon lemma must use Greek script: " + entry.id);
  for (const reference of entry.keyReferences) {
    const match = String(reference).trim().match(/^(.+?)\s+(\d+)(?::(\d+))?/);
    assert.ok(match, "Lexicon reference must identify a Bible book and chapter: " + entry.id + " — " + reference);
    const book = bookLookup.get(match[1].toLowerCase().replace(/\s+/g, " ").trim());
    assert.ok(book, "Lexicon reference uses an unknown Bible book: " + entry.id + " — " + reference);
    const chapter = Number(match[2]);
    assert.ok(chapter >= 1 && chapter <= book.chapters, "Lexicon reference uses an invalid chapter: " + entry.id + " — " + reference);
    if (match[3]) checkReference(reference, "Lexicon " + entry.id);
    else {
      const code = readerMap[book.name], chapters = code && kjv[code];
      assert.ok(Array.isArray(chapters) && Array.isArray(chapters[chapter - 1]),
        "Lexicon chapter reference is missing from the bundled KJV: " + entry.id + " — " + reference);
    }
  }
  lexiconIds.add(entry.id);
}


const homeSource = await readFile(new URL("../zuriel-home.js", import.meta.url), "utf8");
const homeVerseEntries = [...homeSource.matchAll(/\{\s*reference:\s*"([^"]+)",\s*text:\s*"([^"]+)"\s*\}/g)]
  .map(match => ({ reference: match[1], text: match[2] }));
assert.ok(homeVerseEntries.length >= 20, "Home dashboard must retain a meaningful set of featured Scripture verses");
function normalizeBibleWords(value) {
  return String(value || "").normalize("NFC").toLocaleLowerCase("en")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}
for (const item of homeVerseEntries) {
  const match = item.reference.match(/^(.+?)\s+(\d+):(\d+)$/);
  assert.ok(match, "Featured home Scripture must use a complete reference: " + item.reference);
  const book = bookLookup.get(match[1].toLowerCase().replace(/\s+/g, " ").trim());
  assert.ok(book, "Featured home Scripture uses an unknown Bible book: " + item.reference);
  const chapters = kjv[readerMap[book.name]];
  let verseText = chapters && chapters[Number(match[2]) - 1] && chapters[Number(match[2]) - 1][Number(match[3]) - 1];
  assert.ok(typeof verseText === "string", "Featured home Scripture is missing from the bundled KJV: " + item.reference);
  // Some KJV Psalm datasets place the Psalm superscription at the start of
  // verse 1. It is a heading, not part of the quoted verse wording on the card.
  if (book.name === "Psalms") {
    verseText = verseText.replace(/^(?:(?:A Psalm|A Song|To the chief Musician|Maschil|Michtam|Shiggaion|A Prayer|Praise|Higgaion)\b[^.]*\.\s*)+/i, "");
  }
  assert.equal(normalizeBibleWords(item.text), normalizeBibleWords(verseText),
    "Featured home Scripture wording must match the bundled KJV: " + item.reference);
}

const linkerSandbox = {};
runInNewContext(wordLinkerSource, linkerSandbox);
const linkWord = linkerSandbox.ZurielWordLinking.matchSelectedKJVWord;
const sampleVerse = "In the beginning God created the heaven and the earth.";
const godStart = sampleVerse.indexOf("God");
const validWordLink = linkWord(sampleVerse, sampleVerse, [{ start: godStart, end: godStart + 3, strongs: ["H430"] }], 3);
assert.equal(validWordLink.ok, true, "An exactly aligned selected KJV word should link");
assert.deepEqual(Array.from(validWordLink.strongs), ["H430"], "The selected word should retain its exact Strong's annotation");
assert.equal(linkWord(sampleVerse, sampleVerse.replace("God", "LORD"),
  [{ start: godStart, end: godStart + 3, strongs: ["H430"] }], 3).ok, false,
  "A changed reader word must not inherit another word's original-language link");
assert.equal(linkWord(sampleVerse, sampleVerse,
  [{ start: godStart, end: sampleVerse.indexOf("created"), strongs: ["H430"] }], 3).strongs.length, 0,
  "A source annotation spanning beyond the selected word must not be attached");
assert.equal(linkWord(sampleVerse, sampleVerse, [], 99).ok, false,
  "An out-of-range word selection must not produce a lexical link");
console.log("Expanded study library passed: 74 Scripture trails; 66 book introductions and pathways; 50 Genesis, 40 Exodus, 27 Leviticus and 10 Numbers chapter introductions; 19 offline datasets copied and parity-checked in the Android package; searchable reader-linked UI, offline precache and "+checkedPassages+" Scripture references checked against the bundled KJV.");
