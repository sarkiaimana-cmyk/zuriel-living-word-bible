import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-study-library-data.js", import.meta.url), "utf8");
const datasets = {
  "zuriel-theological-comparisons.json": { entries: [] },
  "zuriel-passage-commentary-expansion.json": {
    entries: [{
      id: "commentary-john-316",
      passage: "John 3:16",
      theme: "God's love and the gift of the Son",
      contextAndMeaning: "The passage places God's love within the mission of the Son and the invitation to believe."
    }]
  },
  "zuriel-topical-bible-study-library-batch-2.json": { entries: [] },
  "zuriel-topical-bible-study-library-batch-3.json": { entries: [] },
  "zuriel-biblical-dictionary-expansion.json": {
    entries: [{
      id: "dictionary-agape",
      term: "Agape",
      definition: "A Greek term often used for love, whose meaning must be read in context.",
      scriptureReferences: ["John 3:16", "1 Corinthians 13"]
    }]
  },
  "zuriel-original-language-word-studies-batch-1.json": {
    entries: [{
      id: "greek-agape",
      term: "ἀγάπη (agapē)",
      language: "Greek",
      originalForm: "ἀγάπη",
      transliteration: "agapē",
      contextualWordUse: "A noun used for love in a range of contexts."
    }]
  },
  "zuriel-original-language-word-studies-batch-2.json": { entries: [] },
  "zuriel-names-and-titles-of-god-library.json": { entries: [] },
  "zuriel-connected-scripture-trails-batch-1.json": { trails: [] },
  "zuriel-connected-scripture-trails-batch-2.json": { trails: [] },
  "zuriel-book-introductions-and-study-pathways.json": { bookIntroductions: [], bookStudyPathways: [] },
  "zuriel-chapter-introductions-exodus-11-20.json": { chapters: [{ id: "exo-ch12", book: "Exodus", chapter: 12, title: "Exodus 12 — Passover and the departure", overview: "Passover memorial and Israel departure from Egypt.", keyPassages: ["Exodus 12:1–14"] }] },
  "zuriel-chapter-introductions-exodus-21-30.json": { chapters: [{ id: "exo-ch24", book: "Exodus", chapter: 24, title: "Exodus 24 — Covenant confirmed", overview: "Covenant ceremony and shared meal at Sinai.", keyPassages: ["Exodus 24:3–8"] }] },
  "zuriel-chapter-introductions-exodus-31-40.json": { chapters: [{ id: "exo-ch40", book: "Exodus", chapter: 40, title: "Exodus 40 — Tabernacle erected", overview: "The tabernacle is assembled and filled with divine glory.", keyPassages: ["Exodus 40:34–38"] }] },
  "zuriel-chapter-introductions-exodus-01-10.json": { chapters: [{ id: "exo-ch01", book: "Exodus", chapter: 1, title: "Exodus 1 — Israel oppression", overview: "Exodus 1 describes Israel growth and Pharaoh oppression.", keyPassages: ["Exodus 1:8–14"] }] },
  "zuriel-chapter-introductions-leviticus-01-10.json": { chapters: [{ id: "lev-ch01", book: "Leviticus", chapter: 1, title: "Leviticus 1 — The burnt offering", overview: "The burnt offering and approach to worship at the tent of meeting.", keyPassages: ["Leviticus 1:1–9"] }] },
  "zuriel-chapter-introductions-leviticus-11-27.json": { chapters: [{ id: "lev-ch23", book: "Leviticus", chapter: 23, title: "Leviticus 23 — The appointed feasts of the Lord", overview: "Israel appointed feasts, harvest calendar and sacred assemblies.", keyPassages: ["Leviticus 23:1–8"] }] },
  "zuriel-chapter-introductions-numbers-01-10.json": { chapters: [{ id: "num-ch06", book: "Numbers", chapter: 6, title: "Numbers 6 — The Nazirite vow and priestly blessing", overview: "The Nazirite vow and the blessing Aaron speaks over Israel.", keyPassages: ["Numbers 6:22–27"] }] },
  "zuriel-chapter-introductions-numbers-11-18.json": { chapters: [{ id: "num-ch14", book: "Numbers", chapter: 14, title: "Numbers 14 — Israel refuses to enter the land", overview: "The scouts report and Israel refuses to trust the promise.", keyPassages: ["Numbers 14:1–10"] }] },
  "zuriel-chapter-introductions-numbers-19-36.json": { chapters: [{ id: "num-ch35", book: "Numbers", chapter: 35, title: "Numbers 35 — Levitical towns and cities of refuge", overview: "The Levites receive towns and cities of refuge protect people awaiting a fair hearing.", keyPassages: ["Numbers 35:9–15"] }] },
  "zuriel-chapter-introductions-deuteronomy-01-17.json": { chapters: [{ id: "deut-ch06", book: "Deuteronomy", chapter: 6, title: "Deuteronomy 6 — Love the Lord with all your heart", overview: "The Shema calls Israel to wholehearted love, daily remembrance and teaching children.", keyPassages: ["Deuteronomy 6:4–9"] }] },
  "zuriel-chapter-introductions-deuteronomy-18-34.json": { chapters: [{ id: "deut-ch30", book: "Deuteronomy", chapter: 30, title: "Deuteronomy 30 — Return, mercy, and the choice of life", overview: "Moses offers hope of restoration, return and choosing life after exile.", keyPassages: ["Deuteronomy 30:15–20"] }] },
  "zuriel-chapter-introductions-joshua-01-12.json": { chapters: [{ id: "josh-ch04", book: "Joshua", chapter: 4, title: "Joshua 4 — Memorial stones and remembered faithfulness", overview: "Twelve stones preserve the Jordan crossing story for future generations.", keyPassages: ["Joshua 4:1–9"] }] },
  "zuriel-chapter-introductions-joshua-13-24.json": { chapters: [{ id: "josh-ch22", book: "Joshua", chapter: 22, title: "Joshua 22 — The eastern tribes return and build an altar", overview: "Inquiry and explanation prevent a misunderstanding from dividing Israel.", keyPassages: ["Joshua 22:21–29"] }] },
  "zuriel-chapter-introductions-judges-01-10.json": { chapters: [{ id: "judg-ch06", book: "Judges", chapter: 6, title: "Judges 6 — Gideon called from fear to service", overview: "Gideon is called to deliver Israel from Midian despite his uncertainty.", keyPassages: ["Judges 6:11–24"] }] },
  "zuriel-chapter-introductions-judges-11-21.json": { chapters: [{ id: "judg-ch21", book: "Judges", chapter: 21, title: "Judges 21 — The aftermath and the final refrain", overview: "The book closes by exposing the harm caused by disorder and self-rule.", keyPassages: ["Judges 21:24–25"] }] },
  "zuriel-chapter-introductions-1-samuel-01-16.json": { chapters: [{ id:"1sam-ch03",book:"1 Samuel",chapter:3,title:"1 Samuel 3 — Samuel hears God's call",overview:"Samuel learns to listen and faithfully deliver a difficult message.",keyPassages:["1 Samuel 3:11–18"] }] },
  "zuriel-chapter-introductions-1-samuel-17-31.json": { chapters: [{ id:"1sam-ch30",book:"1 Samuel",chapter:30,title:"1 Samuel 30 — Recovery at Ziklag",overview:"David seeks guidance and recovers the captives and goods.",keyPassages:["1 Samuel 30:18–25"] }] },
  "zuriel-chapter-introductions-2-samuel-01-12.json": { chapters: [{ id:"2sam-ch07",book:"2 Samuel",chapter:7,title:"2 Samuel 7 — God's covenant with David",overview:"God promises to establish David's house and kingdom.",keyPassages:["2 Samuel 7:8–17"] }] },
  "zuriel-chapter-introductions-job-01-21.json": { chapters: [{ id:"job-ch03",book:"Job",chapter:3,title:"Job 3 — Job laments his birth",overview:"Job voices anguish and wishes he had never been born, giving honest language to profound suffering.",keyPassages:["Job 3:1–10"] }] },
  "zuriel-chapter-introductions-job-22-42.json": { chapters: [{ id:"job-ch42",book:"Job",chapter:42,title:"Job 42 — Job is vindicated and the friends corrected",overview:"God rebukes the friends for speaking wrongly, receives Job's prayer for them, and restores Job while the book leaves the mystery of suffering intact.",keyPassages:["Job 42:7–17"] }] },
  "zuriel-chapter-introductions-psalms-01-30.json": { chapters: [{ id:"ps-ch023",book:"Psalms",chapter:23,title:"Psalm 23 — The Lord as shepherd",overview:"The speaker describes God's guidance, provision, protection and welcome through life's dangers. The shepherd image offers comfort, not a guarantee that believers never experience grief or danger.",keyPassages:["Psalm 23:1–3","Psalm 23:4–6"] }] },
  "zuriel-chapter-introductions-esther-01-10.json": { chapters: [{ id:"esth-ch04",book:"Esther",chapter:4,title:"Esther 4 — Mordecai calls Esther to act",overview:"Mordecai challenges Esther to consider her responsibility, and Esther asks the Jewish community to fast before she approaches the king.",keyPassages:["Esther 4:10–17"] }] },
  "zuriel-chapter-introductions-nehemiah-01-13.json": { chapters: [{ id:"neh-ch05",book:"Nehemiah",chapter:5,title:"Nehemiah 5 — Injustice among the returned community",overview:"Nehemiah confronts exploitation, debt, and the burden placed on poorer families, calling leaders to restore justice.",keyPassages:["Nehemiah 5:1–13"] }] },
  "zuriel-chapter-introductions-ezra-01-10.json": { chapters: [{ id:"ezra-ch07",book:"Ezra",chapter:7,title:"Ezra 7 — Ezra arrives in Jerusalem",overview:"Ezra, skilled in the law, travels to Jerusalem with royal support and a commitment to teach God's instruction.",keyPassages:["Ezra 7:6–10"] }] },
  "zuriel-chapter-introductions-2-chronicles-01-18.json": { chapters: [{ id:"2chr-ch07",book:"2 Chronicles",chapter:7,title:"2 Chronicles 7 — God answers Solomon",overview:"God responds to Solomon, affirming the temple prayer while warning that covenant unfaithfulness has consequences.",keyPassages:["2 Chronicles 7:11–22"] }] },
  "zuriel-chapter-introductions-2-chronicles-19-36.json": { chapters: [{ id:"2chr-ch36",book:"2 Chronicles",chapter:36,title:"2 Chronicles 36 — Jerusalem falls",overview:"The siege, exile, and destruction of Jerusalem close Judah's monarchy, while Cyrus's decree opens a way toward return.",keyPassages:["2 Chronicles 36:15–23"] }] },
  "zuriel-chapter-introductions-1-chronicles-01-15.json": { chapters: [{ id:"1chr-ch11",book:"1 Chronicles",chapter:11,title:"1 Chronicles 11 — David is made king",overview:"All Israel recognizes David as king and he takes Jerusalem as the royal centre.",keyPassages:["1 Chronicles 11:1–9"] }] },
  "zuriel-chapter-introductions-1-chronicles-16-29.json": { chapters: [{ id:"1chr-ch29",book:"1 Chronicles",chapter:29,title:"1 Chronicles 29 — Offerings and Solomon's succession",overview:"The people give willingly for the temple, David prays with humility, and Solomon is established as king.",keyPassages:["1 Chronicles 29:10–20"] }] },
  "zuriel-chapter-introductions-2-kings-01-13.json": { chapters: [{ id:"2kgs-ch05",book:"2 Kings",chapter:5,title:"2 Kings 5 — Naaman is healed",overview:"Naaman is healed after humbling himself; Gehazi's greed warns against exploiting spiritual authority.",keyPassages:["2 Kings 5:1–14"] }] },
  "zuriel-chapter-introductions-2-kings-14-25.json": { chapters: [{ id:"2kgs-ch25",book:"2 Kings",chapter:25,title:"2 Kings 25 — Jerusalem falls",overview:"The siege, exile, and destruction of Jerusalem end Judah's monarchy, while the closing notice leaves a small opening toward hope.",keyPassages:["2 Kings 25:1–7"] }] },
  "zuriel-chapter-introductions-1-kings-01-11.json": { chapters: [{ id:"1kgs-ch03",book:"1 Kings",chapter:3,title:"1 Kings 3 — Solomon asks for wisdom",overview:"Solomon asks God for discernment to govern the people wisely.",keyPassages:["1 Kings 3:5–14"] }] },
  "zuriel-chapter-introductions-1-kings-12-22.json": { chapters: [{ id:"1kgs-ch18",book:"1 Kings",chapter:18,title:"1 Kings 18 — Elijah confronts the prophets of Baal",overview:"Elijah challenges Baal worship and calls Israel to renewed allegiance.",keyPassages:["1 Kings 18:20–40"] }] },
  "zuriel-chapter-introductions-2-samuel-13-24.json": { chapters: [{ id:"2sam-ch22",book:"2 Samuel",chapter:22,title:"2 Samuel 22 — David's song of deliverance",overview:"David sings of God as rock and refuge and reflects on deliverance.",keyPassages:["2 Samuel 22:1–7"] }] },
  "zuriel-chapter-introductions-ruth-01-04.json": { chapters: [{ id: "ruth-ch02", book: "Ruth", chapter: 2, title: "Ruth 2 — Ruth gleans in Boaz’s field", overview: "Boaz protects Ruth and provides grain through generous gleaning.", keyPassages: ["Ruth 2:8–13"] }] },
  "zuriel-chapter-introductions-genesis-01-10.json": { chapters: [{ id: "gen-ch02", book: "Genesis", chapter: 2, title: "The garden, human vocation and covenant companionship", overview: "Genesis 2 describes the garden and the human vocation.", keyPassages: ["Genesis 2:15–17"] }] },
  "zuriel-deep-study-guides.json": { guides: [] },
  "zuriel-bible-geography-atlas.json": { places: [], journeys: [] },
  "zuriel-worship-study-pathways.json": { pathways: [] }
};
const sandbox = {
  window: {},
  document: { readyState: "loading", addEventListener() {} },
  fetch: async url => {
    const file = String(url).split("/").pop();
    const payload = datasets[file];
    if (!payload) throw new Error("Unexpected study data request: " + url);
    return { ok: true, json: async () => ({ schemaVersion: 1, ...payload }) };
  },
  console
};
vm.runInNewContext(source, sandbox, { timeout: 1000 });
const library = sandbox.window.ZurielStudyLibrary;
assert.ok(library && typeof library.search === "function", "Study library must expose search().");

const dictionary = await library.search("Agape", { category: "Bible Dictionary" });
assert.equal(dictionary.length, 1, "Exact dictionary-title search should return one matching entry.");
assert.equal(dictionary[0].title, "Agape");
assert.equal(dictionary[0].category, "Bible Dictionary");

const multiWord = await library.search("John 3:16");
assert.ok(multiWord.some(item => item.category === "Commentary & Exegesis"),
  "Multi-token Scripture-reference search should find the matching commentary.");
assert.ok((await library.search("love gift Son")).some(item => item.title === "John 3:16"),
  "All query tokens should be matched across the indexed study entry.");

const chapterGuide = await library.search("garden vocation Genesis 2", { category: "Chapter Introductions" });
assert.equal(chapterGuide.length, 1, "Chapter introductions must be included in the searchable offline library.");
assert.equal(chapterGuide[0].source.chapter, 2, "Chapter guide search must preserve the correct chapter identity.");

const exodusGuide = await library.search("Pharaoh oppression Exodus 1", { category: "Chapter Introductions" });
assert.equal(exodusGuide.length, 1, "Exodus chapter introductions must be searchable offline.");
assert.equal(exodusGuide[0].source.book, "Exodus");

const exodus12 = await library.search("Passover departure Exodus 12", { category: "Chapter Introductions" });
assert.equal(exodus12.length, 1, "Exodus chapter 12 must be searchable offline.");
assert.equal(exodus12[0].source.chapter, 12);
const exodus40 = await library.search("tabernacle glory Exodus 40", { category: "Chapter Introductions" });
assert.equal(exodus40.length, 1, "Exodus chapter 40 must be searchable offline.");
assert.equal(exodus40[0].source.chapter, 40);

const leviticusGuide = await library.search("burnt offering Leviticus 1", { category: "Chapter Introductions" });
assert.equal(leviticusGuide.length, 1, "Leviticus chapter introductions must be searchable offline.");
assert.equal(leviticusGuide[0].source.book, "Leviticus");
assert.equal(leviticusGuide[0].source.chapter, 1);

const leviticus23 = await library.search("appointed feasts harvest Leviticus 23", { category: "Chapter Introductions" });
assert.equal(leviticus23.length, 1, "Leviticus chapter 23 must be searchable offline.");
assert.equal(leviticus23[0].source.chapter, 23);

const numbers6 = await library.search("Nazirite vow priestly blessing Numbers 6", { category: "Chapter Introductions" });
assert.equal(numbers6.length, 1, "Numbers chapter 6 must be searchable offline.");
assert.equal(numbers6[0].source.book, "Numbers");
assert.equal(numbers6[0].source.chapter, 6);

const numbers14 = await library.search("scouts refuses enter land Numbers 14", { category: "Chapter Introductions" });
assert.equal(numbers14.length, 1, "Numbers chapter 14 must be searchable offline.");
assert.equal(numbers14[0].source.chapter, 14);

const numbers35 = await library.search("cities of refuge Numbers 35", { category: "Chapter Introductions" });
assert.equal(numbers35.length, 1, "Numbers chapter 35 must be searchable offline.");
assert.equal(numbers35[0].source.chapter, 35);

const deuteronomy6 = await library.search("Shema wholehearted love Deuteronomy 6", { category: "Chapter Introductions" });
assert.equal(deuteronomy6.length, 1, "Deuteronomy part 1 chapter introductions must be searchable offline.");
assert.equal(deuteronomy6[0].source.book, "Deuteronomy");
assert.equal(deuteronomy6[0].source.chapter, 6);

const deuteronomy30 = await library.search("restoration mercy choosing life Deuteronomy 30", { category: "Chapter Introductions" });
assert.equal(deuteronomy30.length, 1, "Deuteronomy part 2 chapter introductions must be searchable offline.");
assert.equal(deuteronomy30[0].source.book, "Deuteronomy");
assert.equal(deuteronomy30[0].source.chapter, 30);

const joshua4 = await library.search("memorial stones Jordan crossing Joshua 4", { category: "Chapter Introductions" });
assert.equal(joshua4.length, 1, "Joshua part 1 chapter introductions must be searchable offline.");
assert.equal(joshua4[0].source.book, "Joshua");
assert.equal(joshua4[0].source.chapter, 4);

const joshua22 = await library.search("eastern tribes altar inquiry explanation Joshua 22", { category: "Chapter Introductions" });
assert.equal(joshua22.length, 1, "Joshua part 2 chapter introductions must be searchable offline.");
assert.equal(joshua22[0].source.book, "Joshua");
assert.equal(joshua22[0].source.chapter, 22);

const judges6 = await library.search("Gideon fear Midian called Judges 6", { category: "Chapter Introductions" });
assert.equal(judges6.length, 1, "Judges part 1 chapter introductions must be searchable offline.");
assert.equal(judges6[0].source.book, "Judges");
assert.equal(judges6[0].source.chapter, 6);

const judges21 = await library.search("aftermath disorder self-rule Judges 21", { category: "Chapter Introductions" });
assert.equal(judges21.length, 1, "Judges part 2 chapter introductions must be searchable offline.");
assert.equal(judges21[0].source.book, "Judges");
assert.equal(judges21[0].source.chapter, 21);

const ruth2 = await library.search("Boaz protects Ruth gleaning field Ruth 2", { category: "Chapter Introductions" });
assert.equal(ruth2.length, 1, "Ruth single-part chapter introductions must be searchable offline.");
assert.equal(ruth2[0].source.book, "Ruth");
assert.equal(ruth2[0].source.chapter, 2);

const samuel3 = await library.search("Samuel call difficult message 1 Samuel 3", { category: "Chapter Introductions" });
assert.equal(samuel3.length,1,"1 Samuel part 1 guide should be searchable"); assert.equal(samuel3[0].source.chapter,3);
const samuel30 = await library.search("recovery Ziklag captives 1 Samuel 30", { category: "Chapter Introductions" });
assert.equal(samuel30.length,1,"1 Samuel part 2 guide should be searchable"); assert.equal(samuel30[0].source.chapter,30);

const secondSamuel7 = await library.search("covenant promise David house kingdom 2 Samuel 7", { category: "Chapter Introductions" });
assert.equal(secondSamuel7.length,1,"2 Samuel part 1 covenant guide should be searchable"); assert.equal(secondSamuel7[0].source.book,"2 Samuel"); assert.equal(secondSamuel7[0].source.chapter,7);
const secondSamuel22 = await library.search("David song deliverance rock refuge 2 Samuel 22", { category: "Chapter Introductions" });
assert.equal(secondSamuel22.length,1,"2 Samuel part 2 song guide should be searchable"); assert.equal(secondSamuel22[0].source.book,"2 Samuel"); assert.equal(secondSamuel22[0].source.chapter,22);

const kings3 = await library.search("Solomon asks for wisdom discernment 1 Kings 3", { category: "Chapter Introductions" });
assert.equal(kings3.length,1,"1 Kings chapter 3 wisdom guide should be searchable"); assert.equal(kings3[0].source.book,"1 Kings"); assert.equal(kings3[0].source.chapter,3);
const kings18 = await library.search("Elijah challenges Baal worship Israel renewed allegiance", { category: "Chapter Introductions" });
assert.equal(kings18.length,1,"1 Kings chapter 18 prophetic conflict guide should be searchable"); assert.equal(kings18[0].source.book,"1 Kings"); assert.equal(kings18[0].source.chapter,18);

const kings2Naaman = await library.search("Naaman healed Gehazi greed 2 Kings 5", { category: "Chapter Introductions" });
assert.equal(kings2Naaman.length,1,"2 Kings chapter 5 guide should be searchable"); assert.equal(kings2Naaman[0].source.book,"2 Kings"); assert.equal(kings2Naaman[0].source.chapter,5);
const kings2Fall = await library.search("closing notice small opening hope Judah monarchy", { category: "Chapter Introductions" });
assert.equal(kings2Fall.length,1,"2 Kings chapter 25 guide should be searchable"); assert.equal(kings2Fall[0].source.book,"2 Kings"); assert.equal(kings2Fall[0].source.chapter,25);

const chronicles11 = await library.search("David king Jerusalem 1 Chronicles 11", { category: "Chapter Introductions" });
assert.equal(chronicles11.length,1,"1 Chronicles chapter 11 guide should be searchable"); assert.equal(chronicles11[0].source.book,"1 Chronicles"); assert.equal(chronicles11[0].source.chapter,11);
const chronicles29 = await library.search("offerings Solomon succession David prayer 1 Chronicles 29", { category: "Chapter Introductions" });
assert.equal(chronicles29.length,1,"1 Chronicles chapter 29 guide should be searchable"); assert.equal(chronicles29[0].source.book,"1 Chronicles"); assert.equal(chronicles29[0].source.chapter,29);

const jobThree = await library.search("Job voices anguish wishes never born suffering", { category: "Chapter Introductions" });
assert.equal(jobThree.length,1,"Job chapter 3 guide should be searchable"); assert.equal(jobThree[0].source.book,"Job"); assert.equal(jobThree[0].source.chapter,3);
const jobFortyTwo = await library.search("God rebukes friends Job prayer restoration mystery suffering", { category: "Chapter Introductions" });
assert.equal(jobFortyTwo.length,1,"Job chapter 42 guide should be searchable"); assert.equal(jobFortyTwo[0].source.book,"Job"); assert.equal(jobFortyTwo[0].source.chapter,42);

const estherFour = await library.search("Mordecai challenges Esther responsibility Jewish community fast approach king", { category: "Chapter Introductions" });
assert.equal(estherFour.length,1,"Esther chapter 4 guide should be searchable"); assert.equal(estherFour[0].source.book,"Esther"); assert.equal(estherFour[0].source.chapter,4);

const nehemiahFive = await library.search("Nehemiah confronts exploitation debt poor families justice 5", { category: "Chapter Introductions" });
assert.equal(nehemiahFive.length,1,"Nehemiah chapter 5 guide should be searchable"); assert.equal(nehemiahFive[0].source.book,"Nehemiah"); assert.equal(nehemiahFive[0].source.chapter,5);

const ezraSeven = await library.search("Ezra arrives Jerusalem skilled law teach instruction Ezra 7", { category: "Chapter Introductions" });
assert.equal(ezraSeven.length,1,"Ezra chapter 7 guide should be searchable"); assert.equal(ezraSeven[0].source.book,"Ezra"); assert.equal(ezraSeven[0].source.chapter,7);

const chronicles2Seven = await library.search("God answers Solomon temple prayer covenant 2 Chronicles 7", { category: "Chapter Introductions" });
assert.equal(chronicles2Seven.length,1,"2 Chronicles chapter 7 guide should be searchable"); assert.equal(chronicles2Seven[0].source.book,"2 Chronicles"); assert.equal(chronicles2Seven[0].source.chapter,7);
const chronicles2ThirtySix = await library.search("Jerusalem falls exile Cyrus return 2 Chronicles 36", { category: "Chapter Introductions" });
assert.equal(chronicles2ThirtySix.length,1,"2 Chronicles chapter 36 guide should be searchable"); assert.equal(chronicles2ThirtySix[0].source.book,"2 Chronicles"); assert.equal(chronicles2ThirtySix[0].source.chapter,36);

const psalmTwentyThree = await library.search("shepherd guidance provision protection dangers Psalm 23", { category: "Chapter Introductions" });
assert.equal(psalmTwentyThree.length,1,"Psalm 23 guide should be searchable"); assert.equal(psalmTwentyThree[0].source.book,"Psalms"); assert.equal(psalmTwentyThree[0].source.chapter,23);

const greek = await library.search("ἀγάπη", { category: "Hebrew & Greek Word Studies" });
assert.equal(greek.length, 1, "Unicode Greek search should find the original-language entry.");
assert.equal(greek[0].source.language, "Greek");

const limited = await library.search("love", { limit: 1 });
assert.ok(limited.length <= 1, "Study search must respect a bounded result limit.");
const filtered = await library.search("John 3:16", { category: "Bible Dictionary" });
assert.ok(filtered.length > 0 && filtered.every(item => item.category === "Bible Dictionary"),
  "Category filters must retain matching entries only from the selected resource category.");
assert.ok(!filtered.some(item => item.category === "Commentary & Exegesis"),
  "Category filters must exclude matching entries from other categories.");

console.log("Study-library search checks passed: relevance ranking, all-token matching, Scripture references, Unicode Greek, category filters and bounded results.");
