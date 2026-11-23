import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";

const root = new URL("../", import.meta.url);
async function json(path) {
  return JSON.parse(await readFile(new URL(path, root), "utf8"));
}
const [
  geography, dictionary, books, trail1, trail2, deep, names, words, words2,
  commentary, topical, topical3, worship, theology, loader, index, worker, bookDataSource, kjv, chapterGuides, exodusChapterGuides, exodusChapterGuides2, exodusChapterGuides3, exodusChapterGuides4, leviticusChapterGuides, leviticusChapterGuides2, numbersChapterGuides, numbersChapterGuides2, numbersChapterGuides3, deuteronomyChapterGuides, deuteronomyChapterGuides2, joshuaChapterGuides, joshuaChapterGuides2, judgesChapterGuides, judgesChapterGuides2, ruthChapterGuides, samuelChapterGuides, samuelChapterGuides2, samuelChapterGuides3, samuelChapterGuides4, kingsChapterGuides, kingsChapterGuides2, kings2ChapterGuides, kings2ChapterGuides2, chroniclesChapterGuides, chroniclesChapterGuides2, chronicles2ChapterGuides, chronicles2ChapterGuides2, ezraChapterGuides, nehemiahChapterGuides, estherChapterGuides, jobChapterGuides, jobChapterGuides2, psalmsChapterGuides, psalmsChapterGuides2, psalmsChapterGuides3, psalmsChapterGuides4, psalmsChapterGuides5, proverbsChapterGuides, ecclesiastesChapterGuides, songChapterGuides, isaiahChapterGuides, isaiahChapterGuides2, isaiahChapterGuides3, jeremiahChapterGuides, jeremiahChapterGuides2, lamentationsChapterGuides, ezekielChapterGuides, ezekielChapterGuides2, danielChapterGuides, hoseaChapterGuides, joelChapterGuides, amosChapterGuides, obadiahChapterGuides, jonahChapterGuides, micahChapterGuides, nahumChapterGuides, habakkukChapterGuides, zephaniahChapterGuides, malachiChapterGuides, haggaiChapterGuides, zechariahChapterGuides, matthewChapterGuides, matthewChapterGuides2
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
  json("data/zuriel-chapter-introductions-numbers-01-10.json"),
  json("data/zuriel-chapter-introductions-numbers-11-18.json"),
  json("data/zuriel-chapter-introductions-numbers-19-36.json"),
  json("data/zuriel-chapter-introductions-deuteronomy-01-17.json"),
  json("data/zuriel-chapter-introductions-deuteronomy-18-34.json"),
  json("data/zuriel-chapter-introductions-joshua-01-12.json"),
  json("data/zuriel-chapter-introductions-joshua-13-24.json"),
  json("data/zuriel-chapter-introductions-judges-01-10.json"),
  json("data/zuriel-chapter-introductions-judges-11-21.json"),
  json("data/zuriel-chapter-introductions-ruth-01-04.json"),
  json("data/zuriel-chapter-introductions-1-samuel-01-16.json"),
  json("data/zuriel-chapter-introductions-1-samuel-17-31.json"),
  json("data/zuriel-chapter-introductions-2-samuel-01-12.json"),
  json("data/zuriel-chapter-introductions-2-samuel-13-24.json"),
  json("data/zuriel-chapter-introductions-1-kings-01-11.json"),
  json("data/zuriel-chapter-introductions-1-kings-12-22.json"),
  json("data/zuriel-chapter-introductions-2-kings-01-13.json"),
  json("data/zuriel-chapter-introductions-2-kings-14-25.json"),
  json("data/zuriel-chapter-introductions-1-chronicles-01-15.json"),
  json("data/zuriel-chapter-introductions-1-chronicles-16-29.json"),
  json("data/zuriel-chapter-introductions-2-chronicles-01-18.json"),
  json("data/zuriel-chapter-introductions-2-chronicles-19-36.json"),
  json("data/zuriel-chapter-introductions-ezra-01-10.json"),
  json("data/zuriel-chapter-introductions-nehemiah-01-13.json"),
  json("data/zuriel-chapter-introductions-esther-01-10.json"),
  json("data/zuriel-chapter-introductions-job-01-21.json"),
  json("data/zuriel-chapter-introductions-job-22-42.json"),
  json("data/zuriel-chapter-introductions-psalms-01-30.json"),
  json("data/zuriel-chapter-introductions-psalms-31-60.json"),
  json("data/zuriel-chapter-introductions-psalms-61-90.json"),
  json("data/zuriel-chapter-introductions-psalms-91-120.json"),
  json("data/zuriel-chapter-introductions-psalms-121-150.json"),
  json("data/zuriel-chapter-introductions-proverbs-01-31.json"),
  json("data/zuriel-chapter-introductions-ecclesiastes-01-12.json"),
  json("data/zuriel-chapter-introductions-song-of-solomon-01-08.json"),
  json("data/zuriel-chapter-introductions-isaiah-01-22.json"),
  json("data/zuriel-chapter-introductions-isaiah-23-44.json"),
  json("data/zuriel-chapter-introductions-isaiah-45-66.json"),
  json("data/zuriel-chapter-introductions-jeremiah-01-26.json"),
  json("data/zuriel-chapter-introductions-jeremiah-27-52.json"),
  json("data/zuriel-chapter-introductions-lamentations-01-05.json"),
  json("data/zuriel-chapter-introductions-ezekiel-01-24.json"),
  json("data/zuriel-chapter-introductions-ezekiel-25-48.json"),
  json("data/zuriel-chapter-introductions-daniel-01-12.json"),
  json("data/zuriel-chapter-introductions-hosea-01-14.json"),
  json("data/zuriel-chapter-introductions-joel-01-03.json"),
  json("data/zuriel-chapter-introductions-amos-01-09.json"),
  json("data/zuriel-chapter-introductions-obadiah-01.json"),
  json("data/zuriel-chapter-introductions-jonah-01-04.json"),
  json("data/zuriel-chapter-introductions-micah-01-07.json"),
  json("data/zuriel-chapter-introductions-nahum-01-03.json"),
  json("data/zuriel-chapter-introductions-habakkuk-01-03.json"),
  json("data/zuriel-chapter-introductions-zephaniah-01-03.json"),
  json("data/zuriel-chapter-introductions-malachi-01-04.json"),
  json("data/zuriel-chapter-introductions-haggai-01-02.json"),
  json("data/zuriel-chapter-introductions-zechariah-01-14.json"),
  json("data/zuriel-chapter-introductions-matthew-01-14.json"),
  json("data/zuriel-chapter-introductions-matthew-15-28.json")
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
  "zuriel-chapter-introductions-leviticus-01-10.json",
  "zuriel-chapter-introductions-deuteronomy-01-17.json",
  "zuriel-chapter-introductions-deuteronomy-18-34.json",
  "zuriel-chapter-introductions-joshua-01-12.json",
  "zuriel-chapter-introductions-joshua-13-24.json",
  "zuriel-chapter-introductions-judges-01-10.json",
  "zuriel-chapter-introductions-judges-11-21.json",
  "zuriel-chapter-introductions-ruth-01-04.json",
  "zuriel-chapter-introductions-1-samuel-01-16.json",
  "zuriel-chapter-introductions-1-samuel-17-31.json", "zuriel-chapter-introductions-2-samuel-01-12.json", "zuriel-chapter-introductions-2-samuel-13-24.json",
  "zuriel-chapter-introductions-1-kings-01-11.json",
  "zuriel-chapter-introductions-1-kings-12-22.json",
  "zuriel-chapter-introductions-2-kings-01-13.json",
  "zuriel-chapter-introductions-2-kings-14-25.json",
  "zuriel-chapter-introductions-1-chronicles-01-15.json",
  "zuriel-chapter-introductions-1-chronicles-16-29.json",
  "zuriel-chapter-introductions-2-chronicles-01-18.json",
  "zuriel-chapter-introductions-2-chronicles-19-36.json",
  "zuriel-chapter-introductions-ezra-01-10.json",
  "zuriel-chapter-introductions-nehemiah-01-13.json",
  "zuriel-chapter-introductions-esther-01-10.json",
  "zuriel-chapter-introductions-job-01-21.json",
  "zuriel-chapter-introductions-job-22-42.json",
  "zuriel-chapter-introductions-psalms-01-30.json",
  "zuriel-chapter-introductions-psalms-31-60.json",
  "zuriel-chapter-introductions-psalms-61-90.json",
  "zuriel-chapter-introductions-psalms-91-120.json",
  "zuriel-chapter-introductions-psalms-121-150.json",
  "zuriel-chapter-introductions-proverbs-01-31.json",
  "zuriel-chapter-introductions-ecclesiastes-01-12.json",
  "zuriel-chapter-introductions-song-of-solomon-01-08.json",
  "zuriel-chapter-introductions-isaiah-01-22.json"
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
  [numbersChapterGuides.chapters,10,"Numbers chapter introductions 1–10"],
  [numbersChapterGuides2.chapters,8,"Numbers chapter introductions 11–18"],
  [numbersChapterGuides3.chapters,18,"Numbers chapter introductions 19–36"]
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
for (const guide of [...numbersChapterGuides.chapters, ...numbersChapterGuides2.chapters, ...numbersChapterGuides3.chapters]) {
  assert.equal(guide.book, "Numbers", "Numbers guide batch must remain scoped to Numbers");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 1 && guide.chapter <= 36, "Numbers chapter number must be valid");
  assert.ok(guide.title.startsWith("Numbers " + guide.chapter + " —"), "Numbers title must identify its chapter");
  assert.ok(typeof guide.id === "string" && /^num-ch\d{2}$/.test(guide.id), "Numbers guide needs a stable chapter ID");
  for (const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field] === "string" && guide[field].trim().length >= 100, "Numbers guide needs substantive " + field + ": " + guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 4, "Numbers guide needs Scripture references");
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3, "Numbers guide needs three study questions");
  for (const reference of guide.keyPassages) checkReference(reference, "Numbers chapter " + guide.chapter);
}
const deuteronomyGuideIds = new Set();
assert.equal(deuteronomyChapterGuides.chapters.length, 17, "Deuteronomy part 1 must contain chapters 1–17");
for (const guide of deuteronomyChapterGuides.chapters) {
  assert.equal(guide.book, "Deuteronomy", "Deuteronomy guide batch must remain scoped to Deuteronomy");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 1 && guide.chapter <= 17, "Deuteronomy part 1 chapter number must be valid");
  assert.ok(guide.title.startsWith("Deuteronomy " + guide.chapter + " —"), "Deuteronomy title must identify its chapter");
  assert.ok(typeof guide.id === "string" && /^deut-ch\d{2}$/.test(guide.id), "Deuteronomy guide needs a stable chapter ID");
  assert.ok(!deuteronomyGuideIds.has(guide.id), "Deuteronomy guide IDs must be unique: " + guide.id); deuteronomyGuideIds.add(guide.id);
  for (const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field] === "string" && guide[field].trim().length >= 100, "Deuteronomy guide needs substantive " + field + ": " + guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 4, "Deuteronomy guide needs Scripture references");
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3, "Deuteronomy guide needs three study questions");
  for (const reference of guide.keyPassages) checkReference(reference, "Deuteronomy chapter " + guide.chapter);
}
for (const guide of deuteronomyChapterGuides2.chapters) {
  assert.equal(guide.book, "Deuteronomy", "Deuteronomy guide batch must remain scoped to Deuteronomy");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 18 && guide.chapter <= 34, "Deuteronomy part 2 chapter number must be valid");
  assert.ok(guide.title.startsWith("Deuteronomy " + guide.chapter + " —"), "Deuteronomy title must identify its chapter");
  assert.ok(typeof guide.id === "string" && /^deut-ch\d{2}$/.test(guide.id), "Deuteronomy guide needs a stable chapter ID");
  assert.ok(!deuteronomyGuideIds.has(guide.id), "Deuteronomy guide IDs must be unique: " + guide.id); deuteronomyGuideIds.add(guide.id);
  for (const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field] === "string" && guide[field].trim().length >= 100, "Deuteronomy guide needs substantive " + field + ": " + guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 4, "Deuteronomy guide needs Scripture references");
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3, "Deuteronomy guide needs three study questions");
  for (const reference of guide.keyPassages) checkReference(reference, "Deuteronomy chapter " + guide.chapter);
}
const joshuaGuideIds = new Set();
assert.equal(joshuaChapterGuides.chapters.length, 12, "Joshua part 1 must contain chapters 1–12");
for (const guide of joshuaChapterGuides.chapters) {
  assert.equal(guide.book, "Joshua", "Joshua guide batch must remain scoped to Joshua");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 1 && guide.chapter <= 12, "Joshua part 1 chapter number must be valid");
  assert.ok(guide.title.startsWith("Joshua " + guide.chapter + " —"), "Joshua title must identify its chapter");
  assert.ok(typeof guide.id === "string" && /^josh-ch\d{2}$/.test(guide.id), "Joshua guide needs a stable chapter ID");
  assert.ok(!joshuaGuideIds.has(guide.id), "Joshua guide IDs must be unique: " + guide.id); joshuaGuideIds.add(guide.id);
  for (const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field] === "string" && guide[field].trim().length >= 100, "Joshua guide needs substantive " + field + ": " + guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 4, "Joshua guide needs Scripture references");
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3, "Joshua guide needs three study questions");
  for (const reference of guide.keyPassages) checkReference(reference, "Joshua chapter " + guide.chapter);
}
const joshuaGuideIds2 = new Set(joshuaGuideIds);
assert.equal(joshuaChapterGuides2.chapters.length, 12, "Joshua part 2 must contain chapters 13–24");
for (const guide of joshuaChapterGuides2.chapters) {
  assert.equal(guide.book, "Joshua", "Joshua guide batch must remain scoped to Joshua");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 13 && guide.chapter <= 24, "Joshua part 2 chapter number must be valid");
  assert.ok(guide.title.startsWith("Joshua " + guide.chapter + " —"), "Joshua title must identify its chapter");
  assert.ok(typeof guide.id === "string" && /^josh-ch\d{2}$/.test(guide.id), "Joshua guide needs a stable chapter ID");
  assert.ok(!joshuaGuideIds2.has(guide.id), "Joshua guide IDs must be unique across both sections: " + guide.id); joshuaGuideIds2.add(guide.id);
  for (const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field] === "string" && guide[field].trim().length >= 100, "Joshua guide needs substantive " + field + ": " + guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 4, "Joshua guide needs Scripture references");
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3, "Joshua guide needs three study questions");
  for (const reference of guide.keyPassages) checkReference(reference, "Joshua chapter " + guide.chapter);
}
const judgesGuideIds = new Set();
assert.equal(judgesChapterGuides.chapters.length, 10, "Judges part 1 must contain chapters 1–10");
for (const guide of judgesChapterGuides.chapters) {
  assert.equal(guide.book, "Judges", "Judges guide batch must remain scoped to Judges");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 1 && guide.chapter <= 10, "Judges part 1 chapter number must be valid");
  assert.ok(guide.title.startsWith("Judges " + guide.chapter + " —"), "Judges title must identify its chapter");
  assert.ok(typeof guide.id === "string" && /^judg-ch\d{2}$/.test(guide.id), "Judges guide needs a stable chapter ID");
  assert.ok(!judgesGuideIds.has(guide.id), "Judges guide IDs must be unique: " + guide.id); judgesGuideIds.add(guide.id);
  for (const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field] === "string" && guide[field].trim().length >= 100, "Judges guide needs substantive " + field + ": " + guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 4, "Judges guide needs Scripture references");
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3, "Judges guide needs three study questions");
  for (const reference of guide.keyPassages) checkReference(reference, "Judges chapter " + guide.chapter);
}
const judgesGuideIds2 = new Set(judgesGuideIds);
assert.equal(judgesChapterGuides2.chapters.length, 11, "Judges part 2 must contain chapters 11–21");
for (const guide of judgesChapterGuides2.chapters) {
  assert.equal(guide.book, "Judges", "Judges guide batch must remain scoped to Judges");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 11 && guide.chapter <= 21, "Judges part 2 chapter number must be valid");
  assert.ok(guide.title.startsWith("Judges " + guide.chapter + " —"), "Judges title must identify its chapter");
  assert.ok(typeof guide.id === "string" && /^judg-ch\d{2}$/.test(guide.id), "Judges guide needs a stable chapter ID");
  assert.ok(!judgesGuideIds2.has(guide.id), "Judges guide IDs must be unique across both sections: " + guide.id); judgesGuideIds2.add(guide.id);
  for (const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field] === "string" && guide[field].trim().length >= 100, "Judges guide needs substantive " + field + ": " + guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 4, "Judges guide needs Scripture references");
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3, "Judges guide needs three study questions");
  for (const reference of guide.keyPassages) checkReference(reference, "Judges chapter " + guide.chapter);
}
const ruthGuideIds = new Set();
assert.equal(ruthChapterGuides.chapters.length, 4, "Ruth single part must contain all four chapters");
for (const guide of ruthChapterGuides.chapters) {
  assert.equal(guide.book, "Ruth", "Ruth guide batch must remain scoped to Ruth");
  assert.ok(Number.isInteger(guide.chapter) && guide.chapter >= 1 && guide.chapter <= 4, "Ruth chapter number must be valid");
  assert.ok(guide.title.startsWith("Ruth " + guide.chapter + " —"), "Ruth title must identify its chapter");
  assert.ok(typeof guide.id === "string" && /^ruth-ch\d{2}$/.test(guide.id), "Ruth guide needs a stable chapter ID");
  assert.ok(!ruthGuideIds.has(guide.id), "Ruth guide IDs must be unique: " + guide.id); ruthGuideIds.add(guide.id);
  for (const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field] === "string" && guide[field].trim().length >= 100, "Ruth guide needs substantive " + field + ": " + guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages) && guide.keyPassages.length >= 4, "Ruth guide needs Scripture references");
  assert.ok(Array.isArray(guide.studyQuestions) && guide.studyQuestions.length >= 3, "Ruth guide needs three study questions");
  for (const reference of guide.keyPassages) checkReference(reference, "Ruth chapter " + guide.chapter);
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
  "zuriel-chapter-introductions-genesis-01-10.json", "zuriel-chapter-introductions-leviticus-11-27.json", "zuriel-chapter-introductions-numbers-01-10.json", "zuriel-chapter-introductions-numbers-11-18.json", "zuriel-chapter-introductions-numbers-19-36.json"
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
const samuelGuides = [...samuelChapterGuides.chapters, ...samuelChapterGuides2.chapters];
assert.equal(samuelChapterGuides.chapters.length,16,"1 Samuel part 1 must contain chapters 1–16");
assert.equal(samuelChapterGuides2.chapters.length,15,"1 Samuel part 2 must contain chapters 17–31");
assert.equal(samuelGuides.length,31,"1 Samuel must cover all 31 chapters");
const samuelIds=new Set();
for(const guide of samuelGuides){
 assert.equal(guide.book,"1 Samuel","1 Samuel guide must remain scoped to 1 Samuel");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=31,"1 Samuel chapter number must be valid");
 assert.ok(guide.title.startsWith("1 Samuel "+guide.chapter+" —"),"1 Samuel title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^1sam-ch\d{2}$/.test(guide.id),"1 Samuel guide needs a stable ID");
 assert.ok(!samuelIds.has(guide.id),"1 Samuel IDs must be unique"); samuelIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"1 Samuel guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"1 Samuel guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"1 Samuel guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"1 Samuel chapter "+guide.chapter);
}
const secondSamuelGuides=[...samuelChapterGuides3.chapters,...samuelChapterGuides4.chapters];
assert.equal(samuelChapterGuides3.chapters.length,12,"2 Samuel part 1 must contain chapters 1–12");
assert.equal(samuelChapterGuides4.chapters.length,12,"2 Samuel part 2 must contain chapters 13–24");
assert.equal(secondSamuelGuides.length,24,"2 Samuel must cover all 24 chapters");
const kingsGuides=[...kingsChapterGuides.chapters,...kingsChapterGuides2.chapters];
assert.equal(kingsChapterGuides.chapters.length,11,"1 Kings part 1 must contain chapters 1–11");
assert.equal(kingsChapterGuides2.chapters.length,11,"1 Kings part 2 must contain chapters 12–22");
assert.equal(kingsGuides.length,22,"1 Kings must cover all 22 chapters");
const kingsIds=new Set();
for(const guide of kingsGuides){
 assert.equal(guide.book,"1 Kings","1 Kings guide must remain scoped to 1 Kings");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=22,"1 Kings chapter number must be valid");
 assert.ok(guide.title.startsWith("1 Kings "+guide.chapter+" —"),"1 Kings title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^1kgs-ch\d{2}$/.test(guide.id),"1 Kings guide needs a stable ID");
 assert.ok(!kingsIds.has(guide.id),"1 Kings IDs must be unique");kingsIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"1 Kings guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"1 Kings guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"1 Kings guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"1 Kings chapter "+guide.chapter);
}
const kings2Guides=[...kings2ChapterGuides.chapters,...kings2ChapterGuides2.chapters];
assert.equal(kings2ChapterGuides.chapters.length,13,"2 Kings part 1 must contain chapters 1–13");
assert.equal(kings2ChapterGuides2.chapters.length,12,"2 Kings part 2 must contain chapters 14–25");
assert.equal(kings2Guides.length,25,"2 Kings must cover all 25 chapters");
const kings2Ids=new Set();
for(const guide of kings2Guides){
 assert.equal(guide.book,"2 Kings","2 Kings guide must remain scoped to 2 Kings");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=25,"2 Kings chapter number must be valid");
 assert.ok(guide.title.startsWith("2 Kings "+guide.chapter+" —"),"2 Kings title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^2kgs-ch\d{2}$/.test(guide.id),"2 Kings guide needs a stable ID");
 assert.ok(!kings2Ids.has(guide.id),"2 Kings IDs must be unique");kings2Ids.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"2 Kings guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"2 Kings guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"2 Kings guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"2 Kings chapter "+guide.chapter);
}
const chroniclesGuides=[...chroniclesChapterGuides.chapters,...chroniclesChapterGuides2.chapters];
assert.equal(chroniclesChapterGuides.chapters.length,15,"1 Chronicles part 1 must contain chapters 1–15");
assert.equal(chroniclesChapterGuides2.chapters.length,14,"1 Chronicles part 2 must contain chapters 16–29");
assert.equal(chroniclesGuides.length,29,"1 Chronicles must cover all 29 chapters");
const chroniclesIds=new Set();
for(const guide of chroniclesGuides){
 assert.equal(guide.book,"1 Chronicles","1 Chronicles guide must remain scoped to 1 Chronicles");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=29,"1 Chronicles chapter number must be valid");
 assert.ok(guide.title.startsWith("1 Chronicles "+guide.chapter+" —"),"1 Chronicles title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^1chr-ch\d{2}$/.test(guide.id),"1 Chronicles guide needs a stable ID");
 assert.ok(!chroniclesIds.has(guide.id),"1 Chronicles IDs must be unique");chroniclesIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"1 Chronicles guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"1 Chronicles guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"1 Chronicles guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"1 Chronicles chapter "+guide.chapter);
}
const chronicles2Guides=[...chronicles2ChapterGuides.chapters,...chronicles2ChapterGuides2.chapters];
assert.equal(chronicles2ChapterGuides.chapters.length,18,"2 Chronicles part 1 must contain chapters 1–18");
assert.equal(chronicles2ChapterGuides2.chapters.length,18,"2 Chronicles part 2 must contain chapters 19–36");
assert.equal(chronicles2Guides.length,36,"2 Chronicles must cover all 36 chapters");
const chronicles2Ids=new Set();
for(const guide of chronicles2Guides){
 assert.equal(guide.book,"2 Chronicles","2 Chronicles guide must remain scoped to 2 Chronicles");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=36,"2 Chronicles chapter number must be valid");
 assert.ok(guide.title.startsWith("2 Chronicles "+guide.chapter+" —"),"2 Chronicles title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^2chr-ch\d{2}$/.test(guide.id),"2 Chronicles guide needs a stable ID");
 assert.ok(!chronicles2Ids.has(guide.id),"2 Chronicles IDs must be unique");chronicles2Ids.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"2 Chronicles guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"2 Chronicles guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"2 Chronicles guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"2 Chronicles chapter "+guide.chapter);
}
assert.equal(ezraChapterGuides.chapters.length,10,"Ezra must cover all 10 chapters");
const ezraIds=new Set();
for(const guide of ezraChapterGuides.chapters){
 assert.equal(guide.book,"Ezra","Ezra guide must remain scoped to Ezra");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=10,"Ezra chapter number must be valid");
 assert.ok(guide.title.startsWith("Ezra "+guide.chapter+" —"),"Ezra title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^ezra-ch\d{2}$/.test(guide.id),"Ezra guide needs a stable ID");
 assert.ok(!ezraIds.has(guide.id),"Ezra IDs must be unique");ezraIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Ezra guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Ezra guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Ezra guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Ezra chapter "+guide.chapter);
}
assert.equal(nehemiahChapterGuides.chapters.length,13,"Nehemiah must cover all 13 chapters");
const nehemiahIds=new Set();
for(const guide of nehemiahChapterGuides.chapters){
 assert.equal(guide.book,"Nehemiah","Nehemiah guide must remain scoped to Nehemiah");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=13,"Nehemiah chapter number must be valid");
 assert.ok(guide.title.startsWith("Nehemiah "+guide.chapter+" —"),"Nehemiah title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^neh-ch\d{2}$/.test(guide.id),"Nehemiah guide needs a stable ID");
 assert.ok(!nehemiahIds.has(guide.id),"Nehemiah IDs must be unique");nehemiahIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Nehemiah guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Nehemiah guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Nehemiah guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Nehemiah chapter "+guide.chapter);
}
assert.equal(estherChapterGuides.chapters.length,10,"Esther must cover all 10 chapters");
const estherIds=new Set();
for(const guide of estherChapterGuides.chapters){
 assert.equal(guide.book,"Esther","Esther guide must remain scoped to Esther");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=10,"Esther chapter number must be valid");
 assert.ok(guide.title.startsWith("Esther "+guide.chapter+" —"),"Esther title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^esth-ch\d{2}$/.test(guide.id),"Esther guide needs a stable ID");
 assert.ok(!estherIds.has(guide.id),"Esther IDs must be unique");estherIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Esther guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Esther guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Esther guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Esther chapter "+guide.chapter);
}
const jobGuides=[...jobChapterGuides.chapters,...jobChapterGuides2.chapters];
assert.equal(jobChapterGuides.chapters.length,21,"Job part 1 must contain chapters 1–21");
assert.equal(jobChapterGuides2.chapters.length,21,"Job part 2 must contain chapters 22–42");
assert.equal(jobGuides.length,42,"Job must cover all 42 chapters");
const jobIds=new Set();
for(const guide of jobGuides){
 assert.equal(guide.book,"Job","Job guide must remain scoped to Job");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=42,"Job chapter number must be valid");
 assert.ok(guide.title.startsWith("Job "+guide.chapter+" —"),"Job title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^job-ch\d{2}$/.test(guide.id),"Job guide needs a stable ID");
 assert.ok(!jobIds.has(guide.id),"Job IDs must be unique");jobIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Job guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Job guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Job guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Job chapter "+guide.chapter);
}
assert.equal(psalmsChapterGuides.chapters.length,30,"Psalms part 1 must contain chapters 1–30");
assert.equal(psalmsChapterGuides2.chapters.length,30,"Psalms part 2 must contain chapters 31–60");
assert.equal(psalmsChapterGuides3.chapters.length,30,"Psalms part 3 must contain chapters 61–90");
assert.equal(psalmsChapterGuides4.chapters.length,30,"Psalms part 4 must contain chapters 91–120");
assert.equal(psalmsChapterGuides5.chapters.length,30,"Psalms part 5 must contain chapters 121–150");
assert.equal(ecclesiastesChapterGuides.chapters.length,12,"Ecclesiastes must contain all 12 chapter guides");
const ecclesiastesIds=new Set();
for(const guide of ecclesiastesChapterGuides.chapters){
 assert.equal(guide.book,"Ecclesiastes","Ecclesiastes guide must remain scoped to Ecclesiastes");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=12,"Ecclesiastes chapter number must be valid");
 assert.ok(guide.title.startsWith("Ecclesiastes "+guide.chapter+" —"),"Ecclesiastes title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^eccl-ch\d{2}$/.test(guide.id),"Ecclesiastes guide needs a stable ID");
 assert.ok(!ecclesiastesIds.has(guide.id),"Ecclesiastes guide IDs must be unique");ecclesiastesIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Ecclesiastes guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Ecclesiastes guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Ecclesiastes guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Ecclesiastes chapter "+guide.chapter);
}
assert.equal(songChapterGuides.chapters.length,8,"Song of Solomon must contain all 8 chapter guides");
const songGuideIds=new Set();
for(const guide of songChapterGuides.chapters){
 assert.equal(guide.book,"Song of Solomon","Song guide must remain scoped to Song of Solomon");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=8,"Song chapter number must be valid");
 assert.ok(guide.title.startsWith("Song of Solomon "+guide.chapter+" —"),"Song title must identify its chapter");
 assert.ok(guide.id==="song-ch"+String(guide.chapter).padStart(2,"0"),"Song guide needs a stable ID");
 assert.ok(!songGuideIds.has(guide.id),"Song guide IDs must be unique");songGuideIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Song guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Song guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Song guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Song of Solomon chapter "+guide.chapter);
}
assert.equal(isaiahChapterGuides.chapters.length,22,"Isaiah batch 1 must contain chapters 1–22");
const isaiahIds=new Set();
for(const guide of isaiahChapterGuides.chapters){
 assert.equal(guide.book,"Isaiah","Isaiah guide must remain scoped to Isaiah");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=22,"Isaiah chapter number must be valid");
 assert.ok(guide.title.startsWith("Isaiah "+guide.chapter+" —"),"Isaiah title must identify its chapter");
 assert.ok(guide.id==="isa-ch"+String(guide.chapter).padStart(2,"0"),"Isaiah guide needs a stable chapter ID");
 assert.ok(!isaiahIds.has(guide.id),"Isaiah guide IDs must be unique");isaiahIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Isaiah guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Isaiah guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Isaiah guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Isaiah chapter "+guide.chapter);
}
assert.equal(isaiahChapterGuides2.chapters.length,22,"Isaiah batch 2 must contain chapters 23–44");
const isaiahBatchTwoIds=new Set();
for(const guide of isaiahChapterGuides2.chapters){
 assert.equal(guide.book,"Isaiah","Isaiah batch 2 guide must remain scoped to Isaiah");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=23&&guide.chapter<=44,"Isaiah batch 2 chapter number must be valid");
 assert.ok(guide.title.startsWith("Isaiah "+guide.chapter+" —"),"Isaiah batch 2 title must identify its chapter");
 assert.ok(guide.id==="isa-ch"+String(guide.chapter).padStart(2,"0"),"Isaiah batch 2 guide needs a stable ID");
 assert.ok(!isaiahBatchTwoIds.has(guide.id),"Isaiah batch 2 guide IDs must be unique");isaiahBatchTwoIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Isaiah batch 2 guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Isaiah batch 2 guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Isaiah batch 2 guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Isaiah chapter "+guide.chapter);
}
assert.equal(isaiahChapterGuides3.chapters.length,22,"Isaiah batch 3 must contain chapters 45–66");
const isaiahBatchThreeIds=new Set();
for(const guide of isaiahChapterGuides3.chapters){
 assert.equal(guide.book,"Isaiah","Isaiah batch 3 guide must remain scoped to Isaiah");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=45&&guide.chapter<=66,"Isaiah batch 3 chapter number must be valid");
 assert.ok(guide.title.startsWith("Isaiah "+guide.chapter+" —"),"Isaiah batch 3 title must identify its chapter");
 assert.ok(guide.id==="isa-ch"+String(guide.chapter).padStart(2,"0"),"Isaiah batch 3 guide needs a stable ID");
 assert.ok(!isaiahBatchThreeIds.has(guide.id),"Isaiah batch 3 guide IDs must be unique");isaiahBatchThreeIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Isaiah batch 3 guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Isaiah batch 3 guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Isaiah batch 3 guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Isaiah chapter "+guide.chapter);
}
for (const [batch, expectedStart, expectedEnd] of [[jeremiahChapterGuides,1,26],[jeremiahChapterGuides2,27,52]]) {
 assert.equal(batch.chapters.length,26,"Jeremiah batch must contain 26 chapter guides");
 const ids=new Set();
 for(const guide of batch.chapters){
  assert.equal(guide.book,"Jeremiah","Jeremiah guide must remain scoped to Jeremiah");
  assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=expectedStart&&guide.chapter<=expectedEnd,"Jeremiah chapter number must be valid");
  assert.ok(guide.title.startsWith("Jeremiah "+guide.chapter+" —"),"Jeremiah title must identify its chapter");
  assert.ok(guide.id==="jer-ch"+String(guide.chapter).padStart(2,"0"),"Jeremiah guide needs a stable ID");
  assert.ok(!ids.has(guide.id),"Jeremiah guide IDs must be unique");ids.add(guide.id);
  for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Jeremiah guide needs substantive "+field+": "+guide.chapter);
  assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Jeremiah guide needs key passages");
  assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Jeremiah guide needs study questions");
  for(const reference of guide.keyPassages) checkReference(reference,"Jeremiah chapter "+guide.chapter);
 }
}
assert.equal(lamentationsChapterGuides.chapters.length,5,"Lamentations must contain five chapter guides");
const lamentationsIds=new Set();
for(const guide of lamentationsChapterGuides.chapters){
 assert.equal(guide.book,"Lamentations","Lamentations guide must remain scoped to Lamentations");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=5,"Lamentations chapter number must be valid");
 assert.ok(guide.title.startsWith("Lamentations "+guide.chapter+" —"),"Lamentations title must identify its chapter");
 assert.ok(guide.id==="lam-ch"+String(guide.chapter).padStart(2,"0"),"Lamentations guide needs a stable ID");
 assert.ok(!lamentationsIds.has(guide.id),"Lamentations guide IDs must be unique");lamentationsIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Lamentations guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Lamentations guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Lamentations guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Lamentations chapter "+guide.chapter);
}
assert.equal(ezekielChapterGuides.chapters.length,24,"Ezekiel batch must contain 24 chapter guides");
const ezekielIds=new Set();
for(const guide of ezekielChapterGuides.chapters){
 assert.equal(guide.book,"Ezekiel","Ezekiel guide must remain scoped to Ezekiel");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=24,"Ezekiel chapter number must be valid");
 assert.ok(guide.title.startsWith("Ezekiel "+guide.chapter+" —"),"Ezekiel title must identify its chapter");
 assert.ok(guide.id==="eze-ch"+String(guide.chapter).padStart(2,"0"),"Ezekiel guide needs a stable ID");
 assert.ok(!ezekielIds.has(guide.id),"Ezekiel guide IDs must be unique"); ezekielIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Ezekiel guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Ezekiel guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Ezekiel guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Ezekiel chapter "+guide.chapter);
}
assert.equal(ezekielChapterGuides2.chapters.length,24,"Ezekiel second batch must contain 24 chapter guides");
const ezekielIds2=new Set();
for(const guide of ezekielChapterGuides2.chapters){
 assert.equal(guide.book,"Ezekiel","Ezekiel guide must remain scoped to Ezekiel");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=25&&guide.chapter<=48,"Ezekiel chapter number must be valid");
 assert.ok(guide.title.startsWith("Ezekiel "+guide.chapter+" —"),"Ezekiel title must identify its chapter");
 assert.ok(guide.id==="eze-ch"+String(guide.chapter).padStart(2,"0"),"Ezekiel guide needs a stable ID");
 assert.ok(!ezekielIds2.has(guide.id),"Ezekiel guide IDs must be unique"); ezekielIds2.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Ezekiel guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Ezekiel guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Ezekiel guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Ezekiel chapter "+guide.chapter);
}
assert.equal(danielChapterGuides.chapters.length,12,"Daniel must contain twelve chapter guides");
const danielIds=new Set();
for(const guide of danielChapterGuides.chapters){
 assert.equal(guide.book,"Daniel","Daniel guide must remain scoped to Daniel");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=12,"Daniel chapter number must be valid");
 assert.ok(guide.title.startsWith("Daniel "+guide.chapter+" —"),"Daniel title must identify its chapter");
 assert.ok(guide.id==="dan-ch"+String(guide.chapter).padStart(2,"0"),"Daniel guide needs a stable ID");
 assert.ok(!danielIds.has(guide.id),"Daniel guide IDs must be unique"); danielIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Daniel guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Daniel guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Daniel guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Daniel chapter "+guide.chapter);
}
assert.equal(hoseaChapterGuides.chapters.length,14,"Hosea must contain fourteen chapter guides");
const hoseaIds=new Set();
for(const guide of hoseaChapterGuides.chapters){
 assert.equal(guide.book,"Hosea","Hosea guide must remain scoped to Hosea");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=14,"Hosea chapter number must be valid");
 assert.ok(guide.title.startsWith("Hosea "+guide.chapter+" —"),"Hosea title must identify its chapter");
 assert.ok(guide.id==="hos-ch"+String(guide.chapter).padStart(2,"0"),"Hosea guide needs a stable ID");
 assert.ok(!hoseaIds.has(guide.id),"Hosea guide IDs must be unique"); hoseaIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Hosea guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Hosea guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Hosea guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Hosea chapter "+guide.chapter);
}
assert.equal(joelChapterGuides.chapters.length,3,"Joel must contain three chapter guides");
const joelIds=new Set();
for(const guide of joelChapterGuides.chapters){
 assert.equal(guide.book,"Joel","Joel guide must remain scoped to Joel");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=3,"Joel chapter number must be valid");
 assert.ok(guide.title.startsWith("Joel "+guide.chapter+" —"),"Joel title must identify its chapter");
 assert.ok(guide.id==="joe-ch"+String(guide.chapter).padStart(2,"0"),"Joel guide needs a stable ID");
 assert.ok(!joelIds.has(guide.id),"Joel guide IDs must be unique"); joelIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Joel guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Joel guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Joel guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Joel chapter "+guide.chapter);
}
assert.equal(amosChapterGuides.chapters.length,9,"Amos must contain nine chapter guides");
assert.equal(obadiahChapterGuides.chapters.length,1,"Obadiah must contain one chapter guide");
for(const [book,data,max,idPrefix] of [["Amos",amosChapterGuides,9,"amo-ch"],["Obadiah",obadiahChapterGuides,1,"oba-ch"]]){
 const ids=new Set();
 for(const guide of data.chapters){
  assert.equal(guide.book,book,book+" guides must remain scoped");
  assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=max,book+" chapter must be valid");
  assert.ok(guide.title.startsWith(book+" "+guide.chapter+" —"),book+" title must identify its chapter");
  assert.equal(guide.id,idPrefix+String(guide.chapter).padStart(2,"0"),book+" guide must use stable IDs");
  assert.ok(!ids.has(guide.id),book+" guide IDs must be unique");ids.add(guide.id);
  for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,book+" guide needs substantive "+field);
  assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,book+" guide needs key passages");
  assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,book+" guide needs questions");
  for(const reference of guide.keyPassages) checkReference(reference,book+" chapter "+guide.chapter);
 }
}
for(const [book,data,max,prefix] of [["Jonah",jonahChapterGuides,4,"jon"],["Micah",micahChapterGuides,7,"mic"],["Nahum",nahumChapterGuides,3,"nah"]]){
 assert.equal(data.chapters.length,max,book+" must include every chapter");
 const ids=new Set();
 for(const guide of data.chapters){
  assert.equal(guide.book,book);assert.ok(guide.chapter>=1&&guide.chapter<=max);
  assert.ok(guide.title.startsWith(book+" "+guide.chapter+" —"));
  assert.equal(guide.id,prefix+String(guide.chapter).padStart(2,"0"));
  assert.ok(!ids.has(guide.id));ids.add(guide.id);
  for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].length>=50,book+" missing "+field);
  assert.ok(guide.keyPassages.length>=2&&guide.studyQuestions.length>=3);
  for(const reference of guide.keyPassages) checkReference(reference,book+" "+guide.chapter);
 }
}
for(const [book,data,start,end] of [["Matthew",matthewChapterGuides2,15,28]]){
 assert.equal(data.chapters.length,14,book+" second batch must have fourteen chapters");
 const ids=new Set();
 for(const guide of data.chapters){
  assert.equal(guide.book,book);assert.ok(guide.chapter>=start&&guide.chapter<=end);
  assert.ok(guide.title.startsWith(book+" "+guide.chapter+" —"));assert.equal(guide.id,"mat"+String(guide.chapter).padStart(2,"0"));
  assert.ok(!ids.has(guide.id));ids.add(guide.id);
  for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,book+" missing "+field);
  assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2&&Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3);
  for(const ref of guide.keyPassages)checkReference(ref,book+" "+guide.chapter);
 }
}
for(const [book,data,prefix] of [["Matthew",matthewChapterGuides,"mat"]]){
 assert.equal(data.chapters.length,14,book+" first batch must have fourteen chapters");
 const ids=new Set();
 for(const guide of data.chapters){
  assert.equal(guide.book,book);assert.ok(guide.chapter>=1&&guide.chapter<=14);
  assert.ok(guide.title.startsWith(book+" "+guide.chapter+" —"));assert.equal(guide.id,prefix+String(guide.chapter).padStart(2,"0"));
  assert.ok(!ids.has(guide.id));ids.add(guide.id);
  for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,book+" missing "+field);
  assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2&&Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3);
  for(const ref of guide.keyPassages)checkReference(ref,book+" "+guide.chapter);
 }
}
for(const [book,data,prefix] of [["Zechariah",zechariahChapterGuides,"zec"]]){
 assert.equal(data.chapters.length,14,book+" must have fourteen chapters");
 const ids=new Set();
 for(const guide of data.chapters){
  assert.equal(guide.book,book);assert.ok(guide.chapter>=1&&guide.chapter<=14);
  assert.ok(guide.title.startsWith(book+" "+guide.chapter+" —"));assert.equal(guide.id,prefix+String(guide.chapter).padStart(2,"0"));
  assert.ok(!ids.has(guide.id));ids.add(guide.id);
  for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,book+" missing "+field);
  assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2&&Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3);
  for(const ref of guide.keyPassages)checkReference(ref,book+" "+guide.chapter);
 }
}
for(const [book,data,prefix] of [["Haggai",haggaiChapterGuides,"hag"]]){
 assert.equal(data.chapters.length,2,book+" must have two chapters");
 const ids=new Set();
 for(const guide of data.chapters){
  assert.equal(guide.book,book);assert.ok(guide.chapter>=1&&guide.chapter<=2);
  assert.ok(guide.title.startsWith(book+" "+guide.chapter+" —"));assert.equal(guide.id,prefix+String(guide.chapter).padStart(2,"0"));
  assert.ok(!ids.has(guide.id));ids.add(guide.id);
  for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,book+" missing "+field);
  assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2&&Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3);
  for(const ref of guide.keyPassages)checkReference(ref,book+" "+guide.chapter);
 }
}
for(const [book,data,prefix] of [["Malachi",malachiChapterGuides,"mal"]]){
 assert.equal(data.chapters.length,4,book+" must have four chapters");
 const ids=new Set();
 for(const guide of data.chapters){
  assert.equal(guide.book,book);assert.ok(guide.chapter>=1&&guide.chapter<=4);
  assert.ok(guide.title.startsWith(book+" "+guide.chapter+" —"));assert.equal(guide.id,prefix+String(guide.chapter).padStart(2,"0"));
  assert.ok(!ids.has(guide.id));ids.add(guide.id);
  for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].length>=50,book+" missing "+field);
  assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2&&guide.studyQuestions.length>=3);
  for(const ref of guide.keyPassages)checkReference(ref,book+" "+guide.chapter);
 }
}
for(const [book,data,prefix] of [["Habakkuk",habakkukChapterGuides,"hab"],["Zephaniah",zephaniahChapterGuides,"zep"]]){
 assert.equal(data.chapters.length,3,book+" must have three chapters");
 const ids=new Set();
 for(const guide of data.chapters){
  assert.equal(guide.book,book);assert.ok(guide.chapter>=1&&guide.chapter<=3);
  assert.ok(guide.title.startsWith(book+" "+guide.chapter+" —"));assert.equal(guide.id,prefix+String(guide.chapter).padStart(2,"0"));
  assert.ok(!ids.has(guide.id));ids.add(guide.id);
  for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].length>=50);
  assert.ok(guide.keyPassages.length>=2&&guide.studyQuestions.length>=3);for(const ref of guide.keyPassages)checkReference(ref,book+" "+guide.chapter);
 }
}
const psalmGuides=[...psalmsChapterGuides.chapters,...psalmsChapterGuides2.chapters,...psalmsChapterGuides3.chapters,...psalmsChapterGuides4.chapters,...psalmsChapterGuides5.chapters];
const psalmIds=new Set();
assert.equal(proverbsChapterGuides.chapters.length,31,"Proverbs must contain all 31 chapter guides");
const proverbsIds=new Set();
for(const guide of proverbsChapterGuides.chapters){
 assert.equal(guide.book,"Proverbs","Proverbs guide must remain scoped to Proverbs");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=31,"Proverbs chapter number must be valid");
 assert.ok(guide.title.startsWith("Proverbs "+guide.chapter+" —"),"Proverbs title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^prov-ch\d{2}$/.test(guide.id),"Proverbs guide needs a stable ID");
 assert.ok(!proverbsIds.has(guide.id),"Proverbs IDs must be unique");proverbsIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Proverbs guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Proverbs guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Proverbs guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Proverbs chapter "+guide.chapter);
}
for(const guide of psalmGuides){
 assert.equal(guide.book,"Psalms","Psalm guide must remain scoped to Psalms");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=150,"Psalm chapter number must be valid");
 assert.ok(guide.title.startsWith("Psalm "+guide.chapter+" —"),"Psalm title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^ps-ch\d{3}$/.test(guide.id),"Psalm guide needs a stable ID");
 assert.ok(!psalmIds.has(guide.id),"Psalm IDs must be unique");psalmIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Psalm guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"Psalm guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Psalm guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Psalm "+guide.chapter);
}
const secondSamuelIds=new Set();
for(const guide of secondSamuelGuides){
 assert.equal(guide.book,"2 Samuel","2 Samuel guide must remain scoped to 2 Samuel");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=24,"2 Samuel chapter number must be valid");
 assert.ok(guide.title.startsWith("2 Samuel "+guide.chapter+" —"),"2 Samuel title must identify its chapter");
 assert.ok(typeof guide.id==="string"&&/^2sam-ch\d{2}$/.test(guide.id),"2 Samuel guide needs a stable ID");
 assert.ok(!secondSamuelIds.has(guide.id),"2 Samuel IDs must be unique");secondSamuelIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"2 Samuel guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length>=2,"2 Samuel guide needs key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"2 Samuel guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"2 Samuel chapter "+guide.chapter);
}

const markChapterGuides = await json("data/zuriel-chapter-introductions-mark-01-08.json");
assert.equal(markChapterGuides.book,"Mark","Mark batch must identify its book");
assert.equal(markChapterGuides.chapters.length,8,"Mark 1–8 batch must contain eight chapters");
const markIds = new Set();
for(const guide of markChapterGuides.chapters){
 assert.equal(guide.book,"Mark","Mark guide must remain scoped to Mark");
 assert.ok(Number.isInteger(guide.chapter)&&guide.chapter>=1&&guide.chapter<=8,"Mark chapter must be within 1–8");
 assert.ok(guide.title.startsWith("Mark "+guide.chapter+" —"),"Mark title must identify its chapter");
 assert.equal(guide.id,"mark0"+guide.chapter,"Mark guide needs a stable chapter ID");
 assert.ok(!markIds.has(guide.id),"Mark guide IDs must be unique");markIds.add(guide.id);
 for(const field of ["historicalContext","overview","studyObservation","connectionNotes","lifeApplication","interpretiveCaution","readingNote"]) assert.ok(typeof guide[field]==="string"&&guide[field].trim().length>=50,"Mark guide needs substantive "+field+": "+guide.chapter);
 assert.ok(Array.isArray(guide.keyPassages)&&guide.keyPassages.length===2,"Mark guide needs two key passages");
 assert.ok(Array.isArray(guide.studyQuestions)&&guide.studyQuestions.length>=3,"Mark guide needs study questions");
 for(const reference of guide.keyPassages) checkReference(reference,"Mark chapter "+guide.chapter);
}

console.log("Expanded study library passed: 74 Scripture trails; 66 book introductions and pathways; 50 Genesis, 40 Exodus, 27 Leviticus, 36 Numbers, 34 Deuteronomy, 24 Joshua, 21 Judges, 4 Ruth and 31 1 Samuel, 24 2 Samuel 22 1 Kings, 25 2 Kings 29 1 Chronicles and 36 2 Chronicles 10 Ezra and 13 Nehemiah and 10 Esther and 42 Job and 150 Psalms and 31 Proverbs, 66 Isaiah, 52 Jeremiah, 5 Lamentations and 48 Ezekiel, 12 Daniel, 14 Hosea and 3 Joel, 9 Amos and 1 Obadiah, 4 Jonah, 7 Micah, 3 Nahum, 3 Habakkuk, 3 Zephaniah, 2 Haggai, 14 Zechariah, 28 Matthew, 8 Mark and 4 Malachi chapter introductions; 48 offline datasets copied and parity-checked in the Android package; searchable reader-linked UI, offline precache and "+checkedPassages+" Scripture references checked against the bundled KJV.");
