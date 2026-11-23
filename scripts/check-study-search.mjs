import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-study-library-data.js", import.meta.url), "utf8");
const datasets = {
  "zuriel-chapter-introductions-habakkuk-01-03.json": { chapters: [
 {id:"hab01",book:"Habakkuk",chapter:1,title:"Habakkuk 1 — Questions and God's answer",overview:"Habakkuk questions injustice and the delay of justice."},{id:"hab02",book:"Habakkuk",chapter:2,title:"Habakkuk 2 — Woe and faith",overview:"The vision calls for patience and the righteous living by faith."},{id:"hab03",book:"Habakkuk",chapter:3,title:"Habakkuk 3 — Prayer and rejoicing",overview:"Habakkuk prays and rejoices in God even amid loss."}] },
  "zuriel-chapter-introductions-zephaniah-01-03.json": { chapters: [
 {id:"zep01",book:"Zephaniah",chapter:1,title:"Zephaniah 1 — Day of the Lord",overview:"Zephaniah announces judgement and calls attention to the day of the Lord."},{id:"zep02",book:"Zephaniah",chapter:2,title:"Zephaniah 2 — Seek the Lord",overview:"The humble are called to seek the Lord and neighbouring nations are addressed."},{id:"zep03",book:"Zephaniah",chapter:3,title:"Zephaniah 3 — Joy and restoration",overview:"Zephaniah promises purification, restoration, and joy."}] },
  "zuriel-chapter-introductions-jonah-01-04.json": { chapters: [
 {id:"jon01",book:"Jonah",chapter:1,title:"Jonah 1 — Jonah's commission and flight",overview:"Jonah flees the commission and a storm endangers the ship."},{id:"jon02",book:"Jonah",chapter:2,title:"Jonah 2 — Prayer from the deep",overview:"Jonah prays from the deep and recalls deliverance."},{id:"jon03",book:"Jonah",chapter:3,title:"Jonah 3 — Nineveh repents",overview:"Nineveh repents and God relents from disaster."},{id:"jon04",book:"Jonah",chapter:4,title:"Jonah 4 — God's compassion",overview:"Jonah resents mercy and God's compassion is revealed."}] },
  "zuriel-chapter-introductions-micah-01-07.json": { chapters: [
 {id:"mic01",book:"Micah",chapter:1,title:"Micah 1 — Samaria and Jerusalem",overview:"Micah announces judgement against Samaria and Jerusalem."},{id:"mic02",book:"Micah",chapter:2,title:"Micah 2 — Woe to oppressors",overview:"Micah condemns those who seize fields and exploit people."},{id:"mic03",book:"Micah",chapter:3,title:"Micah 3 — Leaders and justice",overview:"Micah confronts leaders who distort justice."},{id:"mic04",book:"Micah",chapter:4,title:"Micah 4 — Mountain and peace",overview:"Nations learn peace and God's instruction."},{id:"mic05",book:"Micah",chapter:5,title:"Micah 5 — Bethlehem ruler",overview:"Micah speaks of a ruler from Bethlehem and restoration."},{id:"mic06",book:"Micah",chapter:6,title:"Micah 6 — Justice and kindness",overview:"Micah calls for justice, kindness and humble walking."},{id:"mic07",book:"Micah",chapter:7,title:"Micah 7 — Hope and mercy",overview:"Micah laments and waits for God and forgiveness."}] },
  "zuriel-chapter-introductions-nahum-01-03.json": { chapters: [
 {id:"nah01",book:"Nahum",chapter:1,title:"Nahum 1 — Nineveh's downfall",overview:"Nahum announces judgement and refuge from oppressive Nineveh."},{id:"nah02",book:"Nahum",chapter:2,title:"Nahum 2 — Siege and collapse",overview:"Nahum describes siege and the city's collapse."},{id:"nah03",book:"Nahum",chapter:3,title:"Nahum 3 — Violent city",overview:"Nahum condemns violence and exploitation."}] },
  "zuriel-chapter-introductions-amos-01-09.json": { chapters: [
 {id:"amo-ch01",book:"Amos",chapter:1,title:"Amos 1 — Judgement on Damascus and neighbouring nations",overview:"The oracle condemns violence and cruelty against peoples surrounding Israel, beginning a series of accountability speeches.",keyPassages:["Amos 1:3–5"]},
 {id:"amo-ch05",book:"Amos",chapter:5,title:"Amos 5 — Seek the Lord and live; justice like a river",overview:"Amos contrasts empty worship with justice, calling Israel to seek the Lord and live.",keyPassages:["Amos 5:4–15"]},
 {id:"amo-ch09",book:"Amos",chapter:9,title:"Amos 9 — Judgement, humility, and restoration",overview:"Amos closes with judgement imagery and a promise of restoration, rebuilding, and renewed abundance.",keyPassages:["Amos 9:11–15"]}
 ] },
 "zuriel-chapter-introductions-obadiah-01.json": { chapters: [
 {id:"oba-ch01",book:"Obadiah",chapter:1,title:"Obadiah — Edom's pride and the day of the Lord",overview:"Obadiah condemns Edom's pride, violence, and betrayal of Judah during a crisis, and announces the day of the Lord and the restoration of God's people.",keyPassages:["Obadiah 1–9","Obadiah 10–21"]}
 ] },
  "zuriel-chapter-introductions-matthew-15-28.json": { chapters: [
    {id:"mat15",book:"Matthew",chapter:15,title:"Matthew 15 — Tradition, faith, and the bread of life",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat16",book:"Matthew",chapter:16,title:"Matthew 16 — Peter's confession and the way of the cross",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat17",book:"Matthew",chapter:17,title:"Matthew 17 — The transfiguration, healing, and trust",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat18",book:"Matthew",chapter:18,title:"Matthew 18 — Greatness, humility, and restoring relationships",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat19",book:"Matthew",chapter:19,title:"Matthew 19 — Marriage, children, possessions, and the kingdom",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat20",book:"Matthew",chapter:20,title:"Matthew 20 — The generous vineyard owner and the servant King",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat21",book:"Matthew",chapter:21,title:"Matthew 21 — The King enters Jerusalem and confronts empty worship",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat22",book:"Matthew",chapter:22,title:"Matthew 22 — The wedding feast, greatest command, and Messiah",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat23",book:"Matthew",chapter:23,title:"Matthew 23 — Warnings against hypocrisy and lament over Jerusalem",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat24",book:"Matthew",chapter:24,title:"Matthew 24 — The temple's fall and the call to watchfulness",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat25",book:"Matthew",chapter:25,title:"Matthew 25 — Readiness, stewardship, and the final judgment",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat26",book:"Matthew",chapter:26,title:"Matthew 26 — The final meal, Gethsemane, and Jesus' arrest",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat27",book:"Matthew",chapter:27,title:"Matthew 27 — Jesus condemned, crucified, and buried",overview:"Matthew records Jesus teaching about the kingdom, showing mercy, preparing for the cross, and fulfilling his mission."},
    {id:"mat28",book:"Matthew",chapter:28,title:"Matthew 28 — The risen Jesus and the great commission",overview:"The risen Jesus claims all authority and sends disciples to make disciples of all nations through baptism and teaching, promising his presence."}
  ] },
  "zuriel-chapter-introductions-matthew-01-14.json": { chapters: [
    {id:"mat01",book:"Matthew",chapter:1,title:"Matthew 1 — Jesus the Messiah: genealogy and birth",overview:"Jesus the Messiah is traced through David and Abraham; the birth narrative names him Immanuel and announces his saving mission."},
    {id:"mat02",book:"Matthew",chapter:2,title:"Matthew 2 — The Magi, the flight to Egypt, and the return",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat03",book:"Matthew",chapter:3,title:"Matthew 3 — John the Baptist prepares the way",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat04",book:"Matthew",chapter:4,title:"Matthew 4 — Jesus tested and the kingdom proclaimed",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat05",book:"Matthew",chapter:5,title:"Matthew 5 — The kingdom life: blessings, witness, and righteousness",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat06",book:"Matthew",chapter:6,title:"Matthew 6 — Secret devotion, prayer, and trust in the Father",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat07",book:"Matthew",chapter:7,title:"Matthew 7 — Discernment, prayer, and the two foundations",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat08",book:"Matthew",chapter:8,title:"Matthew 8 — Jesus' authority over sickness, nature, and evil",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat09",book:"Matthew",chapter:9,title:"Matthew 9 — Forgiveness, calling, compassion, and healing",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat10",book:"Matthew",chapter:10,title:"Matthew 10 — The Twelve sent with the kingdom message",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat11",book:"Matthew",chapter:11,title:"Matthew 11 — John's question, Jesus' invitation, and true wisdom",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat12",book:"Matthew",chapter:12,title:"Matthew 12 — The Lord of the Sabbath and the servant of God",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat13",book:"Matthew",chapter:13,title:"Matthew 13 — Kingdom parables: the sower, treasure, and the net",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."},
    {id:"mat14",book:"Matthew",chapter:14,title:"Matthew 14 — John's death, the feeding of five thousand, and Jesus walking on water",overview:"Matthew presents Jesus as Messiah and King, revealing the kingdom through teaching, compassion, and mighty works."}
  ] },
  "zuriel-chapter-introductions-zechariah-01-14.json": { chapters: [
    {id:"zec01",book:"Zechariah",chapter:1,title:"Zechariah 1 — Return to the Lord and the night visions",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec02",book:"Zechariah",chapter:2,title:"Zechariah 2 — Four horns and four craftsmen",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec03",book:"Zechariah",chapter:3,title:"Zechariah 3 — Joshua cleansed and the Branch promised",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec04",book:"Zechariah",chapter:4,title:"Zechariah 4 — The lampstand and the Spirit",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec05",book:"Zechariah",chapter:5,title:"Zechariah 5 — The flying scroll and wickedness removed",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec06",book:"Zechariah",chapter:6,title:"Zechariah 6 — The four chariots and the Branch crowned",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec07",book:"Zechariah",chapter:7,title:"Zechariah 7 — Justice, mercy, and fasting",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec08",book:"Zechariah",chapter:8,title:"Zechariah 8 — Fasts turned to joy and the nations seek the Lord",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec09",book:"Zechariah",chapter:9,title:"Zechariah 9 — The coming King and the rejected shepherd",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec10",book:"Zechariah",chapter:10,title:"Zechariah 10 — The Lord strengthens Judah",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec11",book:"Zechariah",chapter:11,title:"Zechariah 11 — A fountain opened and the shepherd struck",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec12",book:"Zechariah",chapter:12,title:"Zechariah 12 — The Lord reigns and living waters flow",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec13",book:"Zechariah",chapter:13,title:"Zechariah 13 — Cleansing, truth, and the refined remnant",overview:"Zechariah’s vision calls the returned community to faithfulness, hope, cleansing, and trust in the Lord."},
    {id:"zec14",book:"Zechariah",chapter:14,title:"Zechariah 14 — The Lord reigns and living waters flow",overview:"The Lord reigns over all the earth, living waters flow from Jerusalem, and holiness shapes worship among the nations."}
  ] },
  "zuriel-chapter-introductions-haggai-01-02.json": { chapters: [
    {id:"hag01",book:"Haggai",chapter:1,title:"Haggai 1 — Rebuild the house and reorder priorities",overview:"The prophet calls the returned community to consider its ways, rebuild the temple, and trust the Lord’s presence."},
    {id:"hag02",book:"Haggai",chapter:2,title:"Haggai 2 — Courage, holiness, and the promised glory",overview:"Haggai encourages the builders, teaches about holiness, and announces future hope."}
  ] },
  "zuriel-chapter-introductions-malachi-01-04.json": { chapters: [
    {id:"mal01",book:"Malachi",chapter:1,title:"Malachi 1 — The Lord’s love and the priests’ dishonour",overview:"Malachi recalls the Lord’s covenant love and confronts careless offerings and dishonouring worship."},
    {id:"mal02",book:"Malachi",chapter:2,title:"Malachi 2 — Covenant faithfulness and corrupt worship",overview:"The prophet rebukes unfaithful priests and betrayal within covenant relationships."},
    {id:"mal03",book:"Malachi",chapter:3,title:"Malachi 3 — The messenger, refining, and faithful giving",overview:"A coming messenger, refining justice, repentance, and faithful generosity shape the chapter."},
    {id:"mal04",book:"Malachi",chapter:4,title:"Malachi 4 — The day of the Lord and the promise of Elijah",overview:"The day of the Lord brings both warning and hope, closing with a promise concerning Elijah."}
  ] },
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
  "zuriel-chapter-introductions-psalms-31-60.json": { chapters: [{ id:"ps-ch051",book:"Psalms",chapter:51,title:"Psalm 51 — A confession asking for cleansing",overview:"The speaker confesses wrongdoing and asks for mercy, renewal and a truthful heart. This penitential prayer should invite repentance without weaponizing guilt against victims.",keyPassages:["Psalm 51:1–7","Psalm 51:10–19"] }] },
  "zuriel-chapter-introductions-isaiah-01-22.json": { chapters: [
    { id:"isa-ch06",book:"Isaiah",chapter:6,title:"Isaiah 6 — Isaiah's vision and his commission",overview:"In the year King Uzziah died, Isaiah sees the Lord enthroned, hears the seraphim proclaim holiness, and becomes deeply aware of his uncleanness. A coal from the altar signifies cleansing, after which Isaiah answers the call to be sent.",keyPassages:["Isaiah 6:1–7","Isaiah 6:8–13"] },
    { id:"isa-ch09",book:"Isaiah",chapter:9,title:"Isaiah 9 — Light in Galilee and the promised child",overview:"Isaiah announces that people walking in darkness will see a great light. The promise of a child and a righteous Davidic reign is set against oppression, warfare, and the burdens of imperial domination.",keyPassages:["Isaiah 9:1–7","Isaiah 9:8–21"] },
    { id:"isa-ch11",book:"Isaiah",chapter:11,title:"Isaiah 11 — A shoot from Jesse and a peaceful creation",overview:"Isaiah pictures a shoot emerging from Jesse's cut-down line, with the Spirit resting on a ruler who judges with righteousness and protects the poor. The vision expands to a peaceable creation and the gathering of God's scattered people.",keyPassages:["Isaiah 11:1–9","Isaiah 11:10–16"] }
  ] },
  "zuriel-chapter-introductions-song-of-solomon-01-08.json": { chapters: [
    { id:"song-ch01",book:"Song of Solomon",chapter:1,title:"Song of Solomon 1 — The song's opening voices",overview:"The Song of Solomon opens with the desire and delight of two lovers, while the daughters of Jerusalem form a listening chorus. Fragrance, gardens, vineyards, and royal imagery establish a poetic world in which affection is expressed with vivid sensory language.",keyPassages:["Song of Solomon 1:1–8","Song of Solomon 1:9–17"] },
    { id:"song-ch04",book:"Song of Solomon",chapter:4,title:"Song of Solomon 4 — The garden and the invitation",overview:"The beloved is praised through an extended garden image, with plants, fragrance, water, and fruit portraying beauty and delight. The chapter ends with an invitation and response that express mutual desire through the garden metaphor.",keyPassages:["Song of Solomon 4:1–7","Song of Solomon 4:8–16"] },
    { id:"song-ch08",book:"Song of Solomon",chapter:8,title:"Song of Solomon 8 — The final invitation and enduring desire",overview:"The closing chapter returns to the woman's voice, the beloved's praise, and the desire to be together. The book ends with an invitation to come away, leaving readers with the movement of longing, affection, and mutual presence.",keyPassages:["Song of Solomon 8:6–7","Song of Solomon 8:8–14"] }
  ] },
  "zuriel-chapter-introductions-ecclesiastes-01-12.json": { chapters: [
    { id:"eccl-ch03",book:"Ecclesiastes",chapter:3,title:"Ecclesiastes 3 — A time for every purpose",overview:"A poem about seasons and appointed times is followed by reflections on eternity, human limitation, injustice, and the gift of rejoicing in one's work. The chapter holds beauty and sorrow together rather than promising that every event feels good.",keyPassages:["Ecclesiastes 3:1–15","Ecclesiastes 3:16–22"] },
    { id:"eccl-ch07",book:"Ecclesiastes",chapter:7,title:"Ecclesiastes 7 — Wisdom, patience, and moral complexity",overview:"The Teacher offers a collection of hard-won observations about reputation, grief, correction, patience, anger, self-righteousness, and the limits of human righteousness. Wisdom is valuable, yet the chapter warns against simplistic claims to understand every outcome.",keyPassages:["Ecclesiastes 7:1–14","Ecclesiastes 7:15–29"] },
    { id:"eccl-ch12",book:"Ecclesiastes",chapter:12,title:"Ecclesiastes 12 — Remember the Creator",overview:"The closing chapter uses poetic images of aging, returning dust, and approaching death to urge remembrance of the Creator before strength fades. The Teacher's reflections are gathered into a final conclusion: reverence and fear of God, keeping God's commandments, matter because human life is accountable.",keyPassages:["Ecclesiastes 12:1–7","Ecclesiastes 12:8–14"] }
  ] },
  "zuriel-chapter-introductions-proverbs-01-31.json": { chapters: [
    { id:"prov-ch01",book:"Proverbs",chapter:1,title:"Proverbs 1 — Wisdom's call and the two ways",overview:"The opening instruction introduces wisdom as teachable reverence for God and warns against joining violent schemes. Wisdom is personified as calling publicly at the crossroads.",keyPassages:["Proverbs 1:1–3","Proverbs 1:4–6"] },
    { id:"prov-ch08",book:"Proverbs",chapter:8,title:"Proverbs 8 — Wisdom calls openly to all",overview:"Wisdom speaks publicly, inviting people to learn prudence and describing the value of wisdom above riches. The poetic personification makes wisdom accessible and desirable; it is a literary portrayal, not a simple allegorical code.",keyPassages:["Proverbs 8:1–3","Proverbs 8:4–6"] },
    { id:"prov-ch22",book:"Proverbs",chapter:22,title:"Proverbs 22 — A good name, instruction and care for the vulnerable",overview:"The chapter values a good name, warns against exploitation of the poor, and opens a collection of sayings of the wise. The sayings call readers to teachable attention and to protect people who are vulnerable to powerful neighbours.",keyPassages:["Proverbs 22:1–3","Proverbs 22:4–6"] },
    { id:"prov-ch31",book:"Proverbs",chapter:31,title:"Proverbs 31 — Lemuel's instruction and the capable woman",overview:"The chapter preserves counsel from King Lemuel's mother about just leadership and warns against abusing power; it closes with an acrostic portrait of a capable woman. The final poem honours wisdom, work, generosity and strength; it is praise poetry, not a rigid checklist or a measure of every woman's worth.",keyPassages:["Proverbs 31:1–3","Proverbs 31:10–12"] }
  ] },
  "zuriel-chapter-introductions-psalms-121-150.json": { chapters: [
    { id:"ps-ch121",book:"Psalms",chapter:121,title:"Psalm 121 — Help from the Maker of heaven and earth",overview:"A pilgrim looks to the hills and confesses that help comes from the Lord, who guards the traveller day and night. The repeated language of keeping offers reassurance through life's journey without denying danger or fatigue.",keyPassages:["Psalm 121:1–2","Psalm 121:3–4"] },
    { id:"ps-ch130",book:"Psalms",chapter:130,title:"Psalm 130 — Out of the depths",overview:"A worshipper cries from deep distress, waits for the Lord and trusts in steadfast love and redemption. The psalm joins confession, waiting and hope without setting a timetable for relief.",keyPassages:["Psalm 130:1–2","Psalm 130:3–4"] },
    { id:"ps-ch139",book:"Psalms",chapter:139,title:"Psalm 139 — Known completely by God",overview:"The worshipper reflects on God's knowledge, presence and creative care, then asks for examination and guidance. The intimate language offers dignity and accountability; the difficult final verses require humility, not self-righteous targeting.",keyPassages:["Psalm 139:1–2","Psalm 139:3–4"] },
    { id:"ps-ch150",book:"Psalms",chapter:150,title:"Psalm 150 — Let everything that has breath praise the Lord",overview:"The Psalter closes with a call to praise God in the sanctuary and throughout creation, naming instruments and breath. The final chapter gathers the whole collection into praise, leaving the reader with a universal summons to worship.",keyPassages:["Psalm 150:1–2","Psalm 150:3–4"] }
  ] },
  "zuriel-chapter-introductions-psalms-91-120.json": { chapters: [
    { id:"ps-ch091",book:"Psalms",chapter:91,title:"Psalm 91 — Shelter under the Most High",overview:"A wisdom-shaped song pictures God as refuge amid danger and fear, using vivid images of shelter, protection and deliverance. The promises are poetic trust language, not a guarantee that faithful people never suffer or die.",keyPassages:["Psalm 91:1–2","Psalm 91:3–4"] },
    { id:"ps-ch103",book:"Psalms",chapter:103,title:"Psalm 103 — Remembering mercy and compassion",overview:"The worshipper calls the soul to bless God and remembers forgiveness, healing, compassion and steadfast love. The poem celebrates God's mercy while its poetic language should not be used to shame those who remain ill.",keyPassages:["Psalm 103:1–2","Psalm 103:3–4"] },
    { id:"ps-ch117",book:"Psalms",chapter:117,title:"Psalm 117 — All nations praise steadfast love",overview:"This very short psalm summons all peoples to praise God because steadfast love and faithfulness endure. Its two verses make a concise universal invitation; its brevity is part of its force.",keyPassages:["Psalm 117:1","Psalm 117:2"] },
    { id:"ps-ch119",book:"Psalms",chapter:119,title:"Psalm 119 — Delight in God's instruction",overview:"The longest psalm is an extended acrostic meditation on God's instruction, using many terms for the word and ways of God. Its repeated forms explore devotion from many angles; do not reduce Torah here to mere rule-keeping or confuse it with modern legalism.",keyPassages:["Psalm 119:1–4","Psalm 119:5–8"] }
  ] },
  "zuriel-chapter-introductions-psalms-61-90.json": { chapters: [
    { id:"ps-ch073",book:"Psalms",chapter:73,title:"Psalm 73 — When the wicked seem to prosper",overview:"The worshipper struggles with envy and injustice until entering the sanctuary and reconsidering the apparent success of the arrogant. The turning point reframes prosperity and suffering without denying the real pain of comparison.",keyPassages:["Psalm 73:1–2","Psalm 73:3–4"] },
    { id:"ps-ch088",book:"Psalms",chapter:88,title:"Psalm 88 — A lament without an easy resolution",overview:"The speaker cries from deep darkness and isolation; unlike many laments, the poem closes without a clear turn to relief. Its unresolved ending gives Scripture honest language for prolonged suffering and should never be dismissed or shamed.",keyPassages:["Psalm 88:1–2","Psalm 88:3–4"] }
  ] },
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
  "zuriel-chapter-introductions-isaiah-23-44.json": { chapters: [
    { id:"isa-ch35",book:"Isaiah",chapter:35,title:"Isaiah 35 — The wilderness blooms and the redeemed return",overview:"The wilderness and dry land rejoice as God comes to save. Weak hands are strengthened, the fearful are encouraged, healing is pictured, and a holy way leads the redeemed home.",keyPassages:["Isaiah 35:1–5","Isaiah 35:6–10"] },
    { id:"isa-ch37",book:"Isaiah",chapter:37,title:"Isaiah 37 — Hezekiah prays and Jerusalem is delivered",overview:"Hezekiah brings the Assyrian threat before the Lord, and Isaiah answers with a word of hope. The chapter recounts Sennacherib's renewed message, Hezekiah's prayer, and the sudden end of the siege threat.",keyPassages:["Isaiah 37:1–20","Isaiah 37:21–38"] },
    { id:"isa-ch40",book:"Isaiah",chapter:40,title:"Isaiah 40 — Comfort for God's people and the incomparable Creator",overview:"A new movement opens with comfort for Jerusalem. The prophet announces a prepared way, the enduring word of God, and the Lord's incomparable power, while comparing human life to grass that fades. The shepherd image gathers strength and tenderness.",keyPassages:["Isaiah 40:1–11","Isaiah 40:12–31"] }
  ] },
  "zuriel-chapter-introductions-isaiah-45-66.json": { chapters: [
    { id:"isa-ch52",book:"Isaiah",chapter:52,title:"Isaiah 52 — Good news, the Lord's return, and the servant exalted",overview:"Zion is called to awake and rejoice as the Lord's people are redeemed. A messenger announces peace and salvation, and the servant is introduced as one who will be exalted after shocking suffering.",keyPassages:["Isaiah 52:1–12","Isaiah 52:13–15"] },
    { id:"isa-ch53",book:"Isaiah",chapter:53,title:"Isaiah 53 — The suffering servant and the work of bearing grief",overview:"The servant is rejected, acquainted with grief, and described as bearing suffering and wounds. The poem moves through misunderstanding, injustice, silence, death, and vindication, using sacrificial and healing imagery.",keyPassages:["Isaiah 53:1–6","Isaiah 53:7–12"] },
    { id:"isa-ch58",book:"Isaiah",chapter:58,title:"Isaiah 58 — True fasting, justice, and the repair of community",overview:"The people ask why their fasting is unnoticed, and the prophet answers by exposing exploitation and quarrelling. True fasting is connected with loosening oppressive bonds, sharing food, sheltering the vulnerable, and honouring Sabbath.",keyPassages:["Isaiah 58:1–7","Isaiah 58:8–14"] },
    { id:"isa-ch65",book:"Isaiah",chapter:65,title:"Isaiah 65 — New heavens, new earth, and the servants who rejoice",overview:"The Lord answers a people who have not sought him, exposing idolatry and injustice while promising a renewed creation. The chapter contrasts the fate of rebellion with joy, long life, peace, and the new heavens and earth.",keyPassages:["Isaiah 65:1–16","Isaiah 65:17–25"] }
  ] },
  "zuriel-chapter-introductions-jeremiah-01-26.json": { chapters: [
    {id:"jer-ch01",book:"Jeremiah",chapter:1,title:"Jeremiah 1 — The prophet called before birth",overview:"Jeremiah is appointed as a prophet to nations before his birth. His youth and fear are met by God's promise of presence, a touched mouth, and visions of an almond branch and a boiling pot.",keyPassages:["Jeremiah 1:1–10","Jeremiah 1:11–19"]},
    {id:"jer-ch07",book:"Jeremiah",chapter:7,title:"Jeremiah 7 — The temple sermon and justice at the gate",overview:"Jeremiah stands at the temple gate and warns that trust in the building cannot protect people who steal, oppress, and practise injustice. Shiloh becomes a warning about false confidence in sacred places.",keyPassages:["Jeremiah 7:1–15","Jeremiah 7:16–34"]},
    {id:"jer-ch18",book:"Jeremiah",chapter:18,title:"Jeremiah 18 — The potter's house and the possibility of turning",overview:"Jeremiah watches a potter reshape a spoiled vessel and receives a message about God's freedom to relent or announce judgement in response to a nation's conduct.",keyPassages:["Jeremiah 18:1–12","Jeremiah 18:13–23"]}
  ]},
  "zuriel-chapter-introductions-jeremiah-27-52.json": { chapters: [
    {id:"jer-ch29",book:"Jeremiah",chapter:29,title:"Jeremiah 29 — A letter to the exiles: seek the city's peace",overview:"Jeremiah sends a letter to those deported to Babylon, telling them to build homes, plant gardens, form families, and seek the welfare of the city. He warns against false prophets and promises eventual return.",keyPassages:["Jeremiah 29:1–14","Jeremiah 29:15–32"]},
    {id:"jer-ch31",book:"Jeremiah",chapter:31,title:"Jeremiah 31 — Rachel weeps and the new covenant is promised",overview:"Jeremiah portrays Rachel weeping for her children, then announces comfort and a return from exile. The chapter promises a new covenant written on the heart and declares God's enduring love for Israel.",keyPassages:["Jeremiah 31:1–22","Jeremiah 31:23–40"]},
    {id:"jer-ch52",book:"Jeremiah",chapter:52,title:"Jeremiah 52 — Jerusalem's fall retold and the book's closing record",overview:"Jeremiah 52 recounts Jerusalem's final siege, the capture of Zedekiah, the destruction of the temple and city, deportations, and the later release of Jehoiachin in Babylon.",keyPassages:["Jeremiah 52:1–16","Jeremiah 52:17–34"]}
  ]},
  "zuriel-chapter-introductions-lamentations-01-05.json": { chapters: [
    {id:"lam-ch01",book:"Lamentations",chapter:1,title:"Lamentations 1 — The lonely city and the first lament",overview:"The first poem portrays Jerusalem as a lonely widow after devastation. It names betrayal, hunger, exile, and the loss of worship, while the city acknowledges that the Lord's judgement is connected to its rebellion.",keyPassages:["Lamentations 1:1–11","Lamentations 1:12–22"]},
    {id:"lam-ch03",book:"Lamentations",chapter:3,title:"Lamentations 3 — The afflicted speaker, steadfast mercy, and waiting hope",overview:"At the centre of the book, a speaker describes affliction in vivid bodily and emotional terms. The poem turns toward the Lord's mercies, calls for patient waiting, and insists that suffering should not be dismissed or treated lightly.",keyPassages:["Lamentations 3:1–33","Lamentations 3:34–66"]},
    {id:"lam-ch05",book:"Lamentations",chapter:5,title:"Lamentations 5 — A communal prayer asking God to remember",overview:"The final poem gathers the community's losses into a collective prayer: dispossession, forced labour, hunger, humiliation, and the collapse of ordinary life. It asks God to remember and restore the people.",keyPassages:["Lamentations 5:1–11","Lamentations 5:12–22"]}
  ]},
  "zuriel-chapter-introductions-ezekiel-01-24.json": { chapters: [
    {id:"eze-ch01",book:"Ezekiel",chapter:1,title:"Ezekiel 1 — The throne vision by the river",overview:"Among the exiles by the Chebar canal, Ezekiel sees a storm cloud, living creatures, wheels within wheels, and a radiant throne. The vision establishes God's overwhelming glory beyond Jerusalem and the temple.",keyPassages:["Ezekiel 1:1–14","Ezekiel 1:15–28"]},
    {id:"eze-ch11",book:"Ezekiel",chapter:11,title:"Ezekiel 11 — The leaders' false security and the promise of a new heart",overview:"Ezekiel sees leaders giving dangerous counsel in Jerusalem. The Lord promises to gather the scattered people and give them one heart and a new spirit, while the glory departs from the city.",keyPassages:["Ezekiel 11:1–13","Ezekiel 11:14–25"]},
    {id:"eze-ch16",book:"Ezekiel",chapter:16,title:"Ezekiel 16 — Jerusalem portrayed as an unfaithful wife",overview:"In an extended allegory, Jerusalem is portrayed as a child rescued and raised, then as a bride who betrays the covenant through idolatry and injustice. The chapter also recalls the city's origins and promises eventual remembrance of an everlasting covenant.",keyPassages:["Ezekiel 16:1–34","Ezekiel 16:35–63"]},
    {id:"eze-ch18",book:"Ezekiel",chapter:18,title:"Ezekiel 18 — The soul that sins and the way of life",overview:"Ezekiel challenges a proverb that treats children as inevitably bearing their parents' guilt. The chapter insists that each person is accountable for their own conduct and that the wicked can turn and live.",keyPassages:["Ezekiel 18:1–16","Ezekiel 18:17–32"]},
    {id:"eze-ch24",book:"Ezekiel",chapter:24,title:"Ezekiel 24 — The cooking pot and the death of Ezekiel's wife",overview:"As the siege begins, Ezekiel describes Jerusalem as a rusted cooking pot and is told that his wife's death will become a sign: he must not perform customary public mourning. The chapter closes with the promise that his speech will return when news arrives.",keyPassages:["Ezekiel 24:1–14","Ezekiel 24:15–27"]}
  ]},
  "zuriel-chapter-introductions-ezekiel-25-48.json": { chapters: [
    {id:"eze-ch26",book:"Ezekiel",chapter:26,title:"Ezekiel 26 — Tyre's pride and the fall of its trading power",overview:"Ezekiel announces judgement against Tyre for rejoicing over Jerusalem's fall and hoping to profit from its destruction. The chapter describes the coming siege and the collapse of the island city's security.",keyPassages:["Ezekiel 26:1–14","Ezekiel 26:15–21"]},
    {id:"eze-ch28",book:"Ezekiel",chapter:28,title:"Ezekiel 28 — The ruler of Tyre and the king of Sidon",overview:"Ezekiel addresses the ruler of Tyre, whose wisdom and wealth have become grounds for pride, and then announces judgement against Sidon. The chapter uses Eden and cherub imagery to portray the ruler's exalted status and fall.",keyPassages:["Ezekiel 28:1–19","Ezekiel 28:20–26"]},
    {id:"eze-ch33",book:"Ezekiel",chapter:33,title:"Ezekiel 33 — The watchman renewed and the call to turn",overview:"After news arrives of Jerusalem's fall, Ezekiel's speech is restored. He is again appointed as a watchman, and the people are challenged for claiming to be God's people while practising injustice.",keyPassages:["Ezekiel 33:1–20","Ezekiel 33:21–33"]},
    {id:"eze-ch34",book:"Ezekiel",chapter:34,title:"Ezekiel 34 — The false shepherds and the promised shepherd",overview:"Ezekiel condemns Israel's shepherds for feeding themselves rather than the flock. God promises to seek the scattered sheep and appoint one shepherd from David's line to care for them.",keyPassages:["Ezekiel 34:1–16","Ezekiel 34:17–31"]},
    {id:"eze-ch37",book:"Ezekiel",chapter:37,title:"Ezekiel 37 — The valley of dry bones and the breath of life",overview:"Ezekiel sees a valley filled with dry bones. At the prophetic word and the breath of God, the bones come together, receive sinews and flesh, and live; the vision is explained as the hope of Israel's restoration from exile.",keyPassages:["Ezekiel 37:1–14","Ezekiel 37:15–28"]},
    {id:"eze-ch40",book:"Ezekiel",chapter:40,title:"Ezekiel 40 — The visionary temple and the return of glory",overview:"In a vision dated to the exile, Ezekiel is brought to a high mountain and shown a measured temple complex. A heavenly guide measures its gates, courts, and structures with careful detail.",keyPassages:["Ezekiel 40:1–27","Ezekiel 40:28–49"]},
    {id:"eze-ch47",book:"Ezekiel",chapter:47,title:"Ezekiel 47 — The river from the temple and the healing land",overview:"Ezekiel sees water flowing from beneath the temple threshold, growing into a deep river that brings life to the Arabah and the Dead Sea. Trees along its banks provide food and healing leaves.",keyPassages:["Ezekiel 47:1–12","Ezekiel 47:13–23"]}
  ]},
  "zuriel-chapter-introductions-daniel-01-12.json": { chapters: [
    {id:"dan-ch01",book:"Daniel",chapter:1,title:"Daniel 1 — Daniel and his companions in Babylon",overview:"Daniel and other Judean youths are taken into Babylon's royal training programme. They resolve not to defile themselves with the royal food, receive favour, and are found to be wise and capable.",keyPassages:["Daniel 1:1–10","Daniel 1:11–21"]},
    {id:"dan-ch02",book:"Daniel",chapter:2,title:"Daniel 2 — Nebuchadnezzar's dream and the kingdom of God",overview:"The king demands that his wise men reveal and interpret his dream. Daniel seeks mercy from God, receives the mystery, and explains the great statue whose kingdoms are ultimately displaced by God's enduring kingdom.",keyPassages:["Daniel 2:1–23","Daniel 2:24–49"]},
    {id:"dan-ch03",book:"Daniel",chapter:3,title:"Daniel 3 — The fiery furnace and the refusal to worship the image",overview:"Shadrach, Meshach, and Abednego refuse to worship the golden image and are thrown into a furnace. They express trust in God's power while acknowledging that faithfulness does not depend on guaranteed rescue.",keyPassages:["Daniel 3:1–18","Daniel 3:19–30"]},
    {id:"dan-ch05",book:"Daniel",chapter:5,title:"Daniel 5 — The writing on the wall and Babylon's fall",overview:"Belshazzar's feast desecrates sacred vessels, and a mysterious hand writes a judgement on the wall. Daniel interprets the words, and Babylon falls that night.",keyPassages:["Daniel 5:1–16","Daniel 5:17–31"]},
    {id:"dan-ch06",book:"Daniel",chapter:6,title:"Daniel 6 — Daniel in the lions' den",overview:"Officials manipulate the king into issuing a decree that makes prayer to anyone but the king illegal. Daniel continues his regular prayer, is thrown into the lions' den, and is preserved.",keyPassages:["Daniel 6:1–15","Daniel 6:16–28"]},
    {id:"dan-ch07",book:"Daniel",chapter:7,title:"Daniel 7 — The four beasts and the Ancient of Days",overview:"Daniel dreams of four beasts rising from the sea, followed by the Ancient of Days and one like a son of man receiving dominion. The vision interprets successive oppressive kingdoms and the vindication of the holy ones.",keyPassages:["Daniel 7:1–14","Daniel 7:15–28"]},
    {id:"dan-ch09",book:"Daniel",chapter:9,title:"Daniel 9 — Daniel's prayer, the seventy weeks, and restoration",overview:"Daniel reads Jeremiah's prophecy about Jerusalem's desolation and responds with confession and appeal for mercy. Gabriel brings a vision of seventy weeks concerning transgression, restoration, and the holy city.",keyPassages:["Daniel 9:1–19","Daniel 9:20–27"]},
    {id:"dan-ch12",book:"Daniel",chapter:12,title:"Daniel 12 — The time of distress, resurrection, and final hope",overview:"Daniel hears of a time of unprecedented distress, the deliverance of those written in the book, and the awakening of many who sleep in the dust. The book closes with sealing, waiting, and Daniel's own promised rest and future portion.",keyPassages:["Daniel 12:1–7","Daniel 12:8–13"]}
  ]},
  "zuriel-chapter-introductions-hosea-01-14.json": { chapters: [
    {id:"hos-ch01",book:"Hosea",chapter:1,title:"Hosea 1 — Hosea's marriage as a sign to Israel",overview:"Hosea receives a difficult prophetic command involving marriage and children whose names become signs concerning Israel's unfaithfulness and coming judgement. The chapter ends with a promise of future gathering and renewed identity.",keyPassages:["Hosea 1:1–5","Hosea 1:6–11"]},
    {id:"hos-ch02",book:"Hosea",chapter:2,title:"Hosea 2 — The unfaithful wife and the promise of restoration",overview:"Hosea portrays Israel as an unfaithful spouse who pursues other lovers, while God exposes the emptiness of those alliances and promises to speak tenderly and restore the relationship.",keyPassages:["Hosea 2:1–13","Hosea 2:14–23"]},
    {id:"hos-ch04",book:"Hosea",chapter:4,title:"Hosea 4 — No knowledge of God and the corruption of leadership",overview:"Hosea indicts the land for violence, falsehood, adultery, and the failure of priests and people to know God. The priests are especially accountable for abandoning instruction and exploiting the people's sin.",keyPassages:["Hosea 4:1–10","Hosea 4:11–19"]},
    {id:"hos-ch06",book:"Hosea",chapter:6,title:"Hosea 6 — A call to return and the difference between love and ritual",overview:"The people are urged to return to the Lord, but their loyalty is described as fleeting like morning cloud. God desires steadfast love and knowledge rather than sacrifice without faithful conduct; the chapter recalls covenant-breaking.",keyPassages:["Hosea 6:1–6","Hosea 6:7–11"]},
    {id:"hos-ch11",book:"Hosea",chapter:11,title:"Hosea 11 — God's compassion and the memory of childhood",overview:"God recalls loving Israel as a child and calling the people out of Egypt, yet Israel turns to other powers. The chapter portrays divine compassion overcoming the impulse to abandon the people, while judgement and exile remain part of the warning.",keyPassages:["Hosea 11:1–7","Hosea 11:8–11"]},
    {id:"hos-ch14",book:"Hosea",chapter:14,title:"Hosea 14 — Return to the Lord and receive healing",overview:"Hosea closes with an invitation for Israel to return, confessing that political alliances and manufactured gods cannot save. God promises healing, freely given love, and renewed growth like a fruitful tree.",keyPassages:["Hosea 14:1–5","Hosea 14:6–9"]}
  ]},
  "zuriel-chapter-introductions-joel-01-03.json": { chapters: [
    {id:"joe-ch01",book:"Joel",chapter:1,title:"Joel 1 — The locust devastation and the call to lament",overview:"Joel describes a devastating locust invasion that strips the land and disrupts grain and drink offerings. The people are summoned to lament, priests are told to gather the community, and the day of the Lord is announced as a serious warning.",keyPassages:["Joel 1:1–12","Joel 1:13–20"]},
    {id:"joe-ch02",book:"Joel",chapter:2,title:"Joel 2 — Return with the heart and the promise of the Spirit",overview:"Joel calls the people to return with all their heart, with fasting, weeping, and mourning. The chapter promises compassion, restored harvest, and the outpouring of God's Spirit on sons and daughters, old and young, servants and free people.",keyPassages:["Joel 2:1–17","Joel 2:18–32"]},
    {id:"joe-ch03",book:"Joel",chapter:3,title:"Joel 3 — The nations judged and the Lord dwelling with his people",overview:"Joel describes the gathering of nations for judgement in the valley of Jehoshaphat, condemns violence and exploitation against Judah, and closes with a vision of refuge, abundance, and the Lord dwelling in Zion.",keyPassages:["Joel 3:1–10","Joel 3:11–21"]}
  ]},
  "zuriel-chapter-introductions-mark-01-08.json": { chapters: [
    {id:"mark01",book:"Mark",chapter:1,title:"Mark 1 — The opening of the good news",overview:"John prepares the way; Jesus is baptised, tested, calls disciples, and begins proclaiming God's kingdom."},
    {id:"mark02",book:"Mark",chapter:2,title:"Mark 2 — Authority to forgive and heal",overview:"Jesus forgives and heals a paralysed man, calls Levi, welcomes outsiders, and teaches Sabbath mercy."},
    {id:"mark03",book:"Mark",chapter:3,title:"Mark 3 — The twelve and the kingdom",overview:"Jesus appoints the twelve, answers opposition, defines true kinship, and teaches how God's word takes root."},
    {id:"mark04",book:"Mark",chapter:4,title:"Mark 4 — The storm and restoration",overview:"Jesus calms the storm and restores a tormented man, a suffering woman, and Jairus's daughter."},
    {id:"mark05",book:"Mark",chapter:5,title:"Mark 5 — Rejection, mission, and provision",overview:"Jesus is rejected at Nazareth, sends the twelve, John the Baptist is killed, and a crowd is fed."},
    {id:"mark06",book:"Mark",chapter:6,title:"Mark 6 — Tradition, compassion, and healing",overview:"Jesus teaches about the heart, welcomes a Gentile mother's appeal, heals a man, and feeds four thousand."},
    {id:"mark07",book:"Mark",chapter:7,title:"Mark 7 — Peter's confession and the cross",overview:"Peter confesses Jesus as Messiah, but Jesus teaches the necessity of suffering and the cost of discipleship."},
    {id:"mark08",book:"Mark",chapter:8,title:"Mark 8 — Glory, suffering, and service",overview:"Jesus is transfigured, heals a distressed child, and teaches that greatness is found in humble service."}
  ] },
  "zuriel-chapter-introductions-luke-01-12.json": { chapters: [
    {id:"luke1",book:"Luke",chapter:1,title:"Luke 1 — Promised births and songs of hope",overview:"Gabriel announces the births of John and Jesus; Mary visits Elizabeth and sings of mercy, justice, and the lifting of the lowly."},
    {id:"luke2",book:"Luke",chapter:2,title:"Luke 2 — Jesus is born and revealed to Israel",overview:"Shepherds hear the angelic announcement, while Simeon and Anna recognise salvation and consolation in the temple."},
    {id:"luke3",book:"Luke",chapter:3,title:"Luke 3 — John calls for repentance and Jesus is baptised",overview:"John calls for ethical repentance and justice; Jesus is baptised and the genealogy reaches Adam."},
    {id:"luke4",book:"Luke",chapter:4,title:"Luke 4 — Jesus announces good news in Galilee",overview:"Jesus resists temptation and reads Isaiah in Nazareth, announcing good news to the poor and freedom for the oppressed."},
    {id:"luke5",book:"Luke",chapter:5,title:"Luke 5 — Disciples called and lives restored",overview:"Fishermen follow Jesus, a paralysed man is forgiven and healed, and Levi welcomes Jesus to a meal with tax collectors."},
    {id:"luke6",book:"Luke",chapter:6,title:"Luke 6 — Sabbath mercy and kingdom life",overview:"Jesus teaches blessings and woes, enemy-love, generosity, mercy, and foundations built by hearing and doing his words."},
    {id:"luke7",book:"Luke",chapter:7,title:"Luke 7 — Faith, compassion, and forgiveness",overview:"Jesus responds to a centurion, raises a widow's son at Nain, answers John, and welcomes a forgiven woman."},
    {id:"luke8",book:"Luke",chapter:8,title:"Luke 8 — The word, the storm, and restored lives",overview:"Women support the ministry; the sower teaches receptive hearing; Jesus calms a storm and restores a woman and Jairus' daughter."},
    {id:"luke9",book:"Luke",chapter:9,title:"Luke 9 — Jesus revealed and the way of the cross",overview:"The Twelve are sent, a crowd is fed, Peter confesses Jesus, the transfiguration occurs, and humility is taught."},
    {id:"luke10",book:"Luke",chapter:10,title:"Luke 10 — The seventy-two and the Good Samaritan",overview:"Jesus sends seventy-two disciples, tells the Good Samaritan parable, and visits Martha and Mary."},
    {id:"luke11",book:"Luke",chapter:11,title:"Luke 11 — Prayer and integrity",overview:"Jesus teaches the Lord's Prayer, asking and seeking, and confronts hypocrisy and neglected justice among leaders."},
    {id:"luke12",book:"Luke",chapter:12,title:"Luke 12 — Trust, treasure, and readiness",overview:"Jesus warns against greed, tells of the rich fool, teaches trust instead of anxiety, and calls disciples to faithful readiness."}
  ] },
  "zuriel-chapter-introductions-luke-13-24.json": { chapters: [
    {id:"luke13",book:"Luke",chapter:13,title:"Luke 13 — Repentance, healing, and the narrow door",overview:"Jesus calls for repentance, heals a woman on the Sabbath, teaches kingdom growth, and laments over Jerusalem."},
    {id:"luke14",book:"Luke",chapter:14,title:"Luke 14 — Humility, hospitality, and discipleship",overview:"Jesus teaches humble places, generous hospitality, the great banquet, and counting the cost of discipleship."},
    {id:"luke15",book:"Luke",chapter:15,title:"Luke 15 — The lost sheep, coin, and two sons",overview:"Jesus tells stories of a lost sheep, a lost coin, and a father welcoming his returning son."},
    {id:"luke16",book:"Luke",chapter:16,title:"Luke 16 — Stewardship, wealth, and Lazarus",overview:"Jesus teaches faithfulness with possessions, warns against serving wealth, and tells of the rich man and Lazarus."},
    {id:"luke17",book:"Luke",chapter:17,title:"Luke 17 — Forgiveness, gratitude, and the kingdom",overview:"Jesus teaches forgiveness and faith, heals ten people, and warns against chasing claims about the kingdom."},
    {id:"luke18",book:"Luke",chapter:18,title:"Luke 18 — Persistent prayer and humble faith",overview:"Jesus tells parables about a persistent widow and a tax collector, welcomes children, speaks with a rich ruler, and heals a blind beggar."},
    {id:"luke19",book:"Luke",chapter:19,title:"Luke 19 — Zacchaeus and the King’s arrival",overview:"Zacchaeus responds with restitution, Jesus teaches stewardship through minas, enters Jerusalem, and weeps over the city."},
    {id:"luke20",book:"Luke",chapter:20,title:"Luke 20 — Jesus’ authority and the leaders",overview:"Jesus answers challenges about authority, taxes, and resurrection, and warns against leaders who exploit widows."},
    {id:"luke21",book:"Luke",chapter:21,title:"Luke 21 — The widow’s offering and endurance",overview:"Jesus observes a poor widow’s offering and teaches about temple destruction, upheaval, watchfulness, and endurance."},
    {id:"luke22",book:"Luke",chapter:22,title:"Luke 22 — The final meal and arrest",overview:"Jesus shares the Passover meal, teaches service, prays on the Mount of Olives, and is arrested."},
    {id:"luke23",book:"Luke",chapter:23,title:"Luke 23 — Jesus crucified and buried",overview:"Jesus faces Pilate and Herod, is crucified between criminals, dies, and is buried by Joseph."},
    {id:"luke24",book:"Luke",chapter:24,title:"Luke 24 — The resurrection and commission",overview:"Women find the empty tomb, Jesus meets disciples on the Emmaus road, appears in Jerusalem, and commissions witnesses."}
  ] },
  "zuriel-chapter-introductions-john-01-10.json": {"chapters":[{"id":"john1","book":"John","chapter":1,"title":"John 1 — The Word becomes flesh and calls the first disciples","overview":"The prologue joins creation language with the story of Jesus. Light, life, grace, truth, witness, and new birth frame the Gospel. The first disciples move from hearing testimony to personal encounter.","studyQuestions":["How does the prologue connect Jesus with creation and life?","What does John the Baptist mean by being a witness rather than the light?","How do the first disciples move from testimony to personal trust?"],"keyPassages":["John 1:1–18","John 1:35–51"]},{"id":"john2","book":"John","chapter":2,"title":"John 2 — The first sign, temple action, and Jesus' authority","overview":"The first sign reveals glory through abundance and care at a family celebration. The temple action points to Jesus' identity and to worship re-centred around his life, death, and resurrection.","studyQuestions":["Why does John call Cana the beginning of Jesus' signs?","What does the temple saying reveal after the resurrection?","How can worship avoid becoming a transaction?"],"keyPassages":["John 2:1–11","John 2:13–22"]},{"id":"john3","book":"John","chapter":3,"title":"John 3 — New birth, God's love, and the witness of John","overview":"The conversation moves from religious knowledge to transformation by the Spirit. The well-known declaration of God's love belongs within a wider invitation to trust the Son and receive life.","studyQuestions":["What does Jesus mean by being born of the Spirit?","How does John 3 place God's love within the call to believe?","What does John the Baptist's testimony teach about faithful witness?"],"keyPassages":["John 3:1–8","John 3:14–21"]},{"id":"john4","book":"John","chapter":4,"title":"John 4 — Living water and worship beyond boundaries","overview":"The encounter crosses social and religious boundaries. The woman becomes a witness, and the healing in Galilee shows that Jesus' life-giving word is not limited by distance.","studyQuestions":["How does Jesus cross boundaries in speaking with the Samaritan woman?","What does worship in Spirit and truth mean in this conversation?","How does the official's response show trust in Jesus' word?"],"keyPassages":["John 4:7–26","John 4:39–54"]},{"id":"john5","book":"John","chapter":5,"title":"John 5 — Healing at Bethesda and the authority of the Son","overview":"The chapter moves from a concrete act of restoration to a debate about life, judgment, and authority. Jesus presents his work as aligned with the Father's life-giving purpose.","studyQuestions":["What does the healing reveal about Jesus' concern for restoration?","How does Jesus describe his relationship with the Father?","What witnesses does Jesus name in support of his mission?"],"keyPassages":["John 5:1–9","John 5:19–29"]},{"id":"john6","book":"John","chapter":6,"title":"John 6 — Bread of life, abundance, and difficult teaching","overview":"The chapter moves from physical hunger to the deeper question of life with God. The sign recalls God's provision in the wilderness and points toward Jesus' self-giving mission.","studyQuestions":["What does the feeding sign recall from Israel's story?","How does Jesus describe himself as the bread of life?","What does Peter's response reveal about trust amid difficult teaching?"],"keyPassages":["John 6:1–15","John 6:35–40"]},{"id":"john7","book":"John","chapter":7,"title":"John 7 — Jesus at the festival and the promise of living water","overview":"The chapter portrays a public debate about Jesus' identity. Questions of origin, authority, and the Spirit converge as people listen, argue, and decide how to respond.","studyQuestions":["How does Jesus connect his teaching with the Father who sent him?","What does the festival setting add to the promise of living water?","Why do people respond differently to Jesus in this chapter?"],"keyPassages":["John 7:14–24","John 7:37–39"]},{"id":"john8","book":"John","chapter":8,"title":"John 8 — The light of the world and freedom through truth","overview":"The chapter asks whether people will remain in Jesus' word and receive the freedom he gives. Light exposes false confidence and offers a path into truth and life.","studyQuestions":["What does Jesus mean by being the light of the world?","How does continuing in Jesus' word relate to freedom?","Why is ancestry alone insufficient as a measure of faithfulness?"],"keyPassages":["John 8:12–20","John 8:31–36"]},{"id":"john9","book":"John","chapter":9,"title":"John 9 — A man born blind, restored sight, and spiritual perception","overview":"The sign exposes the danger of assuming suffering is caused by personal sin. The man's testimony develops as others resist the implications of what happened.","studyQuestions":["What assumption about suffering does Jesus reject?","How does the healed man's understanding develop through the chapter?","What is the difference between honest questioning and wilful refusal to see?"],"keyPassages":["John 9:1–12","John 9:24–41"]},{"id":"john10","book":"John","chapter":10,"title":"John 10 — The good shepherd, abundant life, and secure care","overview":"The shepherd imagery presents leadership as personal care, protection, and self-giving rather than exploitation. Jesus contrasts his mission with thieves and hired workers who abandon the flock.","studyQuestions":["What distinguishes the good shepherd from exploitative leadership?","How does Jesus connect knowing his sheep with laying down his life?","How can communities practise care without coercive control?"],"keyPassages":["John 10:1–18","John 10:27–30"]}]},
  "zuriel-chapter-introductions-john-11-12.json": { chapters: [
    {id:"john11",book:"John",chapter:11,title:"John 11 — Lazarus and resurrection life",overview:"Jesus weeps with Mary and Martha, calls Lazarus from the tomb, and reveals himself as resurrection and life."},
    {id:"john12",book:"John",chapter:12,title:"John 12 — Mary’s anointing and the King’s entry",overview:"Mary anoints Jesus, he enters Jerusalem, Greeks seek him, and he teaches about the grain of wheat and his hour of glory."}
  ] },
  "zuriel-chapter-introductions-john-13-21.json": { chapters: [
    {id:"john13",book:"John",chapter:13,title:"John 13 — Jesus washes the disciples’ feet",overview:"Jesus washes the disciples' feet, predicts betrayal, and commands love for one another."},
    {id:"john14",book:"John",chapter:14,title:"John 14 — The Father’s house and the Helper",overview:"Jesus promises the Father's house, the way, truth, life, the Helper Spirit, and peace."},
    {id:"john15",book:"John",chapter:15,title:"John 15 — The true vine and abiding love",overview:"Jesus describes the true vine, branches, abiding, fruitfulness, love, and friendship."},
    {id:"john16",book:"John",chapter:16,title:"John 16 — The Spirit, sorrow, and joy",overview:"Jesus promises the Spirit, speaks of sorrow becoming joy, and encourages prayer."},
    {id:"john17",book:"John",chapter:17,title:"John 17 — Jesus prays for his disciples",overview:"Jesus prays for glory, truth, protection, sanctification, and unity for future believers."},
    {id:"john18",book:"John",chapter:18,title:"John 18 — Jesus is arrested and questioned",overview:"Jesus is arrested, Peter denies him, and Pilate questions him about his kingdom."},
    {id:"john19",book:"John",chapter:19,title:"John 19 — Jesus is crucified and buried",overview:"Jesus is crucified, dies, and is buried with care by Joseph and Nicodemus."},
    {id:"john20",book:"John",chapter:20,title:"John 20 — The empty tomb and Thomas’ confession",overview:"Mary Magdalene finds the empty tomb, Jesus appears, gives peace and the Spirit, and meets Thomas."},
    {id:"john21",book:"John",chapter:21,title:"John 21 — Jesus restores Peter and calls disciples",overview:"Jesus shares breakfast after a great catch of fish, restores Peter, and calls disciples to follow."}
  ] },
  "zuriel-chapter-introductions-romans-09-16.json": {"chapters":[{"id":"romans9","book":"Romans","chapter":9,"title":"Romans 9 — Israel, God’s promises, and the mystery of mercy","overview":"The chapter wrestles with the relationship between Israel’s story and the inclusion of Gentiles. Paul’s argument is theological and pastoral, shaped by grief and reverence rather than contempt for his people."},{"id":"romans10","book":"Romans","chapter":10,"title":"Romans 10 — The word of faith and the message proclaimed to all","overview":"The chapter emphasises the accessibility of the message and the importance of hearing and responding. Paul continues to wrestle with Israel’s response while affirming that the invitation is open to all who call on the Lord."},{"id":"romans11","book":"Romans","chapter":11,"title":"Romans 11 — The remnant, the olive tree, and God’s enduring mercy","overview":"The chapter insists that Gentile inclusion must produce humility, not superiority. God’s gifts and calling are enduring, and Paul ends by praising the depth of divine wisdom and mercy."},{"id":"romans12","book":"Romans","chapter":12,"title":"Romans 12 — Living worship, spiritual gifts, and sincere love","overview":"The chapter moves from the theology of grace to the daily shape of community life. Worship is embodied in service, gifts are used for the common good, and love is expressed through practical care and non-retaliation."},{"id":"romans13","book":"Romans","chapter":13,"title":"Romans 13 — Public authority, neighbour-love, and living in the light","overview":"The chapter connects public responsibility with the deeper ethic of love. Paul calls for orderly conduct and respect, while making love the continuing obligation that fulfils the law."},{"id":"romans14","book":"Romans","chapter":14,"title":"Romans 14 — Welcoming one another and respecting conscience","overview":"The chapter calls the community to unity without demanding identical personal practices. Freedom is exercised responsibly, with concern for the conscience and wellbeing of others."},{"id":"romans15","book":"Romans","chapter":15,"title":"Romans 15 — Bearing with one another and the mission to the nations","overview":"The chapter gathers the letter’s themes of unity, hope, and mission. The community is called to glorify God together, while Paul describes his work as a ministry shaped by grace and service."},{"id":"romans16","book":"Romans","chapter":16,"title":"Romans 16 — Phoebe, women and co-workers, and the final greetings","overview":"The chapter reveals a broad network of house churches and ministry partners. Paul’s greetings show that the mission is sustained by many people, including women whose service and leadership are explicitly recognised."}]},
  "zuriel-chapter-introductions-romans-01-08.json": {"chapters":[{"id":"romans1","book":"Romans","chapter":1,"title":"Romans 1 — The gospel, God’s righteousness, and the need for grace","overview":"The chapter introduces the letter’s central theme: God’s righteousness is revealed through the gospel and received by faith. Paul then describes the disorder that follows when people exchange the Creator for created things."},{"id":"romans2","book":"Romans","chapter":2,"title":"Romans 2 — God’s impartial judgement and the danger of hypocrisy","overview":"The chapter turns the moral critique back on the reader. Possessing the law or a visible religious identity does not exempt anyone from judgement; God looks at truth and the reality of the heart."},{"id":"romans3","book":"Romans","chapter":3,"title":"Romans 3 — All are accountable and righteousness comes through faith","overview":"The chapter establishes universal need and the gift of justification. No group can boast, because all have sinned and are put right through God’s grace rather than through human achievement."},{"id":"romans4","book":"Romans","chapter":4,"title":"Romans 4 — Abraham, faith, and the promise that includes the nations","overview":"The chapter places faith at the heart of God’s promise and shows that Abraham can be the father of all who trust God, circumcised or uncircumcised. The promise depends on grace, not human achievement."},{"id":"romans5","book":"Romans","chapter":5,"title":"Romans 5 — Peace with God, hope in suffering, and Adam and Christ","overview":"The chapter moves from justification to its consequences in a transformed relationship with God. Suffering is not celebrated, but hope is sustained by God’s love; the Adam-Christ contrast shows grace overcoming the reach of sin and death."},{"id":"romans6","book":"Romans","chapter":6,"title":"Romans 6 — United with Christ and freed to live a new life","overview":"Grace does not make wrongdoing irrelevant; it opens a new way of life. Believers are no longer to treat sin as their master but to live from the new identity given through Christ."},{"id":"romans7","book":"Romans","chapter":7,"title":"Romans 7 — The law, the struggle with sin, and the need for deliverance","overview":"The chapter distinguishes the goodness of the law from sin’s power to distort human desire. The struggle reveals the need for deliverance beyond willpower and prepares for the Spirit-led life in chapter 8."},{"id":"romans8","book":"Romans","chapter":8,"title":"Romans 8 — Life in the Spirit, hope in suffering, and God’s enduring love","overview":"The chapter brings together freedom, adoption, hope, and assurance. The Spirit gives life and helps in weakness, while the whole creation waits for renewal and believers are held by God’s love."}]},
  "zuriel-chapter-introductions-acts-15-28.json": {"chapters":[{"id":"acts15","book":"Acts","chapter":15,"title":"Acts 15 — The Jerusalem council and the welcome of Gentile believers","overview":"The council addresses how Gentiles can belong to the people of God without first becoming Jews. The decision recognises the Spirit’s work and seeks a faithful, workable path for a diverse community."},{"id":"acts16","book":"Acts","chapter":16,"title":"Acts 16 — The mission enters Macedonia: Lydia, the jailer, and a new community","overview":"The Gospel crosses into a new region through guidance, hospitality, confrontation with exploitation, and unexpected deliverance. The chapter ends with the jailer and his household responding and the missionaries asserting their rights as Roman citizens."},{"id":"acts17","book":"Acts","chapter":17,"title":"Acts 17 — Paul in Thessalonica, Berea, and Athens","overview":"The chapter presents several forms of public witness: scriptural reasoning, careful examination, and engagement with a philosophical audience. Responses vary, and the message is adapted without abandoning its central claim."},{"id":"acts18","book":"Acts","chapter":18,"title":"Acts 18 — Corinth, Priscilla and Aquila, and the strengthening of the mission","overview":"The chapter highlights sustained ministry, shared work, hospitality, and collaborative teaching. The mission grows through relationships and the willingness to strengthen one another’s understanding."},{"id":"acts19","book":"Acts","chapter":19,"title":"Acts 19 — The Gospel in Ephesus and the challenge to the trade in idols","overview":"The chapter shows the Gospel challenging spiritual exploitation and economic interests. Public response is mixed, and the disturbance reveals how religious identity, livelihood, and civic pride can become entangled."},{"id":"acts20","book":"Acts","chapter":20,"title":"Acts 20 — Paul’s farewell to the Ephesian elders and the journey toward Jerusalem","overview":"The chapter combines pastoral memory, communal worship, warning, and farewell. Paul’s journey toward Jerusalem is marked by resolve and by the grief of communities who may not see him again."},{"id":"acts21","book":"Acts","chapter":21,"title":"Acts 21 — Paul returns to Jerusalem and faces a public accusation","overview":"The chapter shows Paul trying to maintain fellowship across Jewish and Gentile believers while navigating suspicion and public hostility. His arrest begins a new phase in which he will testify under Roman custody."},{"id":"acts22","book":"Acts","chapter":22,"title":"Acts 22 — Paul’s testimony to the Jerusalem crowd","overview":"Paul’s testimony connects his former life with his calling and demonstrates how personal witness can be offered within a tense public setting. His legal status becomes important in preventing unlawful punishment."},{"id":"acts23","book":"Acts","chapter":23,"title":"Acts 23 — Paul before the council and the plot against his life","overview":"The chapter shows the complexity of legal and religious conflict under Roman rule. Paul’s safety depends on intervention, careful procedure, and the courage of a family member who reports a threat."},{"id":"acts24","book":"Acts","chapter":24,"title":"Acts 24 — Paul’s hearing before Felix","overview":"The chapter contrasts a clear defence with a governor who delays justice for political and personal reasons. Paul’s faith remains focused on conscience and resurrection while the legal process stalls."},{"id":"acts25","book":"Acts","chapter":25,"title":"Acts 25 — Paul appeals to Caesar before Festus and King Agrippa","overview":"The chapter moves Paul’s testimony toward Rome through a formal appeal. Political calculations and legal procedure shape the path, while the central issue remains the proclamation of Jesus alive."},{"id":"acts26","book":"Acts","chapter":26,"title":"Acts 26 — Paul’s defence before Agrippa and the call to turn toward the light","overview":"The chapter is a carefully shaped testimony that links Paul’s calling with Israel’s hope and the resurrection. Paul presents his mission as obedience to a heavenly vision rather than a pursuit of personal power."},{"id":"acts27","book":"Acts","chapter":27,"title":"Acts 27 — The voyage to Rome and the shipwreck","overview":"The chapter portrays courage, practical leadership, and shared survival in a crisis. Paul’s confidence in God does not prevent the storm, but it strengthens him to encourage others and act wisely."},{"id":"acts28","book":"Acts","chapter":28,"title":"Acts 28 — Malta, Paul’s arrival in Rome, and the open-ended witness","overview":"The final chapter brings the journey to Rome but leaves the mission open. The word continues to be proclaimed despite restrictions, and the narrative closes without describing Paul’s later fate."}]},
  "zuriel-chapter-introductions-acts-15-28.json": {"chapters":[{"id":"acts15","book":"Acts","chapter":15,"title":"Acts 15 — The Jerusalem council and the welcome of Gentile believers","overview":"The council addresses how Gentiles can belong to the people of God without first becoming Jews. The decision recognises the Spirit’s work and seeks a faithful, workable path for a diverse community."},{"id":"acts16","book":"Acts","chapter":16,"title":"Acts 16 — The mission enters Macedonia: Lydia, the jailer, and a new community","overview":"The Gospel crosses into a new region through guidance, hospitality, confrontation with exploitation, and unexpected deliverance. The chapter ends with the jailer and his household responding and the missionaries asserting their rights as Roman citizens."},{"id":"acts17","book":"Acts","chapter":17,"title":"Acts 17 — Paul in Thessalonica, Berea, and Athens","overview":"The chapter presents several forms of public witness: scriptural reasoning, careful examination, and engagement with a philosophical audience. Responses vary, and the message is adapted without abandoning its central claim."},{"id":"acts18","book":"Acts","chapter":18,"title":"Acts 18 — Corinth, Priscilla and Aquila, and the strengthening of the mission","overview":"The chapter highlights sustained ministry, shared work, hospitality, and collaborative teaching. The mission grows through relationships and the willingness to strengthen one another’s understanding."},{"id":"acts19","book":"Acts","chapter":19,"title":"Acts 19 — The Gospel in Ephesus and the challenge to the trade in idols","overview":"The chapter shows the Gospel challenging spiritual exploitation and economic interests. Public response is mixed, and the disturbance reveals how religious identity, livelihood, and civic pride can become entangled."},{"id":"acts20","book":"Acts","chapter":20,"title":"Acts 20 — Paul’s farewell to the Ephesian elders and the journey toward Jerusalem","overview":"The chapter combines pastoral memory, communal worship, warning, and farewell. Paul’s journey toward Jerusalem is marked by resolve and by the grief of communities who may not see him again."},{"id":"acts21","book":"Acts","chapter":21,"title":"Acts 21 — Paul returns to Jerusalem and faces a public accusation","overview":"The chapter shows Paul trying to maintain fellowship across Jewish and Gentile believers while navigating suspicion and public hostility. His arrest begins a new phase in which he will testify under Roman custody."},{"id":"acts22","book":"Acts","chapter":22,"title":"Acts 22 — Paul’s testimony to the Jerusalem crowd","overview":"Paul’s testimony connects his former life with his calling and demonstrates how personal witness can be offered within a tense public setting. His legal status becomes important in preventing unlawful punishment."},{"id":"acts23","book":"Acts","chapter":23,"title":"Acts 23 — Paul before the council and the plot against his life","overview":"The chapter shows the complexity of legal and religious conflict under Roman rule. Paul’s safety depends on intervention, careful procedure, and the courage of a family member who reports a threat."},{"id":"acts24","book":"Acts","chapter":24,"title":"Acts 24 — Paul’s hearing before Felix","overview":"The chapter contrasts a clear defence with a governor who delays justice for political and personal reasons. Paul’s faith remains focused on conscience and resurrection while the legal process stalls."},{"id":"acts25","book":"Acts","chapter":25,"title":"Acts 25 — Paul appeals to Caesar before Festus and King Agrippa","overview":"The chapter moves Paul’s testimony toward Rome through a formal appeal. Political calculations and legal procedure shape the path, while the central issue remains the proclamation of Jesus alive."},{"id":"acts26","book":"Acts","chapter":26,"title":"Acts 26 — Paul’s defence before Agrippa and the call to turn toward the light","overview":"The chapter is a carefully shaped testimony that links Paul’s calling with Israel’s hope and the resurrection. Paul presents his mission as obedience to a heavenly vision rather than a pursuit of personal power."},{"id":"acts27","book":"Acts","chapter":27,"title":"Acts 27 — The voyage to Rome and the shipwreck","overview":"The chapter portrays courage, practical leadership, and shared survival in a crisis. Paul’s confidence in God does not prevent the storm, but it strengthens him to encourage others and act wisely."},{"id":"acts28","book":"Acts","chapter":28,"title":"Acts 28 — Malta, Paul’s arrival in Rome, and the open-ended witness","overview":"The final chapter brings the journey to Rome but leaves the mission open. The word continues to be proclaimed despite restrictions, and the narrative closes without describing Paul’s later fate."}]},
  "zuriel-chapter-introductions-acts-01-14.json": { chapters: [
    {id:"acts1",book:"Acts",chapter:1,title:"Acts 1 — The risen Jesus ascends and the disciples await the Spirit",overview:"Jesus ascends and promises the Spirit, sending the disciples as witnesses from Jerusalem outward; the community prays and chooses Matthias."},
    {id:"acts2",book:"Acts",chapter:2,title:"Acts 2 — Pentecost and the first community",overview:"The Spirit comes at Pentecost, people hear in their own languages, Peter explains Scripture, and a community forms in fellowship and care."},
    {id:"acts3",book:"Acts",chapter:3,title:"Acts 3 — A man is healed at the temple gate",overview:"Peter and John meet and heal a man at the temple gate, then Peter directs attention to Jesus and the promise of restoration."},
    {id:"acts4",book:"Acts",chapter:4,title:"Acts 4 — Opposition, prayer, and generous sharing",overview:"Peter and John face opposition, the believers pray for courage, and the community shares resources to support people in need."},
    {id:"acts5",book:"Acts",chapter:5,title:"Acts 5 — Ananias and Sapphira and the apostles’ witness",overview:"Ananias and Sapphira deceive the community, the apostles face the council, and Gamaliel urges restraint."},
    {id:"acts6",book:"Acts",chapter:6,title:"Acts 6 — Widows, shared service, and Stephen",overview:"The community corrects inequity in the widows' distribution, appoints trusted servants, and Stephen becomes a public witness."},
    {id:"acts7",book:"Acts",chapter:7,title:"Acts 7 — Stephen’s speech and death",overview:"Stephen retells Israel's history and prophetic witness, then is killed by stoning as Saul looks on."},
    {id:"acts8",book:"Acts",chapter:8,title:"Acts 8 — Samaria and the Ethiopian official",overview:"Philip proclaims the message in Samaria, meets Simon, and explains Isaiah to an Ethiopian official who responds in faith."},
    {id:"acts9",book:"Acts",chapter:9,title:"Acts 9 — Saul encounters Jesus",overview:"Saul meets Jesus on the Damascus road, Ananias helps him regain sight, and Saul begins to preach."},
    {id:"acts10",book:"Acts",chapter:10,title:"Acts 10 — Peter and Cornelius",overview:"Peter visits Cornelius, the Spirit comes upon Gentiles, and Peter learns that God shows no partiality."},
    {id:"acts11",book:"Acts",chapter:11,title:"Acts 11 — Gentile inclusion and Antioch",overview:"Peter explains the Spirit's work among Gentiles, and a diverse Antioch community grows with Barnabas and Saul."},
    {id:"acts12",book:"Acts",chapter:12,title:"Acts 12 — Peter is freed and the word spreads",overview:"James is executed, Peter escapes prison with angelic help, and Herod's power falls as the word continues to grow."},
    {id:"acts13",book:"Acts",chapter:13,title:"Acts 13 — The first missionary journey",overview:"The Antioch church sends Barnabas and Saul, who preach in Cyprus and Pisidian Antioch and proclaim Jesus' resurrection."},
    {id:"acts14",book:"Acts",chapter:14,title:"Acts 14 — Mission through opposition and encouragement",overview:"Paul and Barnabas preach in Iconium, Lystra, and Derbe, face opposition, appoint elders, and strengthen new communities."}
  ] },
  "zuriel-chapter-introductions-mark-09-16.json": { chapters: [
    {id:"mark9",book:"Mark",chapter:9,title:"Mark 9 — The cost of discipleship",overview:"Jesus teaches about protecting vulnerable people, costly faithfulness, reconciliation, and forgiveness."},
    {id:"mark10",book:"Mark",chapter:10,title:"Mark 10 — Marriage, children, wealth, and following",overview:"Jesus addresses marriage, welcomes children, challenges attachment to wealth, and teaches about following him."},
    {id:"mark11",book:"Mark",chapter:11,title:"Mark 11 — The servant King enters Jerusalem",overview:"Jesus predicts his suffering, corrects the desire for status, and heals Bartimaeus as he approaches Jerusalem."},
    {id:"mark12",book:"Mark",chapter:12,title:"Mark 12 — Authority and fruitful faith",overview:"Jesus enters Jerusalem, challenges unfruitful worship, and teaches about faith, prayer, and authority."},
    {id:"mark13",book:"Mark",chapter:13,title:"Mark 13 — The vineyard and greatest commandment",overview:"Jesus tells the vineyard parable and answers questions about Caesar, resurrection, and the greatest commandment."},
    {id:"mark14",book:"Mark",chapter:14,title:"Mark 14 — The widow and coming crisis",overview:"Jesus warns against exploitative religious status, honours a poor widow's gift, and teaches watchfulness amid crisis."},
    {id:"mark15",book:"Mark",chapter:15,title:"Mark 15 — Anointing, betrayal, and Passover",overview:"A woman anoints Jesus; Judas betrays him; Jesus shares the Passover meal and prepares the disciples for his death."},
    {id:"mark16",book:"Mark",chapter:16,title:"Mark 16 — The empty tomb",overview:"Jesus is arrested, crucified, and buried; women discover the empty tomb and hear the resurrection announcement."}
  ] },
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
const chronicles29 = await library.search("willingly temple David prays humility Solomon established king 1 Chronicles 29", { category: "Chapter Introductions" });
assert.equal(chronicles29.length,1,"1 Chronicles chapter 29 guide should be searchable"); assert.equal(chronicles29[0].source.book,"1 Chronicles"); assert.equal(chronicles29[0].source.chapter,29);

const jobThree = await library.search("Job voices anguish wishes never born suffering", { category: "Chapter Introductions" });
assert.equal(jobThree.length,1,"Job chapter 3 guide should be searchable"); assert.equal(jobThree[0].source.book,"Job"); assert.equal(jobThree[0].source.chapter,3);
const jobFortyTwo = await library.search("God rebukes friends receives Job prayer restores mystery suffering", { category: "Chapter Introductions" });
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

const psalmFiftyOne = await library.search("confesses wrongdoing mercy renewal truthful heart", { category: "Chapter Introductions" });
assert.equal(psalmFiftyOne.length,1,"Psalm 51 guide should be searchable"); assert.equal(psalmFiftyOne[0].source.book,"Psalms"); assert.equal(psalmFiftyOne[0].source.chapter,51);
const psalmSeventyThree = await library.search("envy injustice sanctuary wicked prosper", { category: "Chapter Introductions" });
assert.equal(psalmSeventyThree.length,1,"Psalm 73 guide should be searchable"); assert.equal(psalmSeventyThree[0].source.book,"Psalms"); assert.equal(psalmSeventyThree[0].source.chapter,73);
const psalmEightyEight = await library.search("darkness isolation lament suffering unresolved", { category: "Chapter Introductions" });
assert.equal(psalmEightyEight.length,1,"Psalm 88 guide should be searchable"); assert.equal(psalmEightyEight[0].source.book,"Psalms"); assert.equal(psalmEightyEight[0].source.chapter,88);
const psalmNinetyOne = await library.search("refuge danger fear shelter protection deliverance", { category: "Chapter Introductions" });
assert.equal(psalmNinetyOne.length,1,"Psalm 91 guide should be searchable"); assert.equal(psalmNinetyOne[0].source.chapter,91);
const psalmOneHundredThree = await library.search("forgiveness healing compassion steadfast love mercy", { category: "Chapter Introductions" });
assert.equal(psalmOneHundredThree.length,1,"Psalm 103 guide should be searchable"); assert.equal(psalmOneHundredThree[0].source.chapter,103);
const psalmOneHundredNineteen = await library.search("acrostic instruction Torah devotion legalism", { category: "Chapter Introductions" });
assert.equal(psalmOneHundredNineteen.length,1,"Psalm 119 guide should be searchable"); assert.equal(psalmOneHundredNineteen[0].source.chapter,119);
const psalmOneHundredTwentyOne = await library.search("pilgrim help Maker heaven earth guards traveller", { category: "Chapter Introductions" });
assert.equal(psalmOneHundredTwentyOne.length,1,"Psalm 121 guide should be searchable"); assert.equal(psalmOneHundredTwentyOne[0].source.chapter,121);
const psalmOneHundredThirtyNine = await library.search("known presence creative care examination guidance", { category: "Chapter Introductions" });
assert.equal(psalmOneHundredThirtyNine.length,1,"Psalm 139 guide should be searchable"); assert.equal(psalmOneHundredThirtyNine[0].source.chapter,139);
const psalmOneHundredFifty = await library.search("Psalter closes instruments breath praise worship", { category: "Chapter Introductions" });
assert.equal(psalmOneHundredFifty.length,1,"Psalm 150 guide should be searchable"); assert.equal(psalmOneHundredFifty[0].source.chapter,150);


const ecclesiastesThree = await library.search("appointed times eternity injustice seasons Ecclesiastes 3", { category: "Chapter Introductions" });
assert.equal(ecclesiastesThree.length,1,"Ecclesiastes chapter 3 guide should be searchable"); assert.equal(ecclesiastesThree[0].source.book,"Ecclesiastes"); assert.equal(ecclesiastesThree[0].source.chapter,3);
const ecclesiastesSeven = await library.search("patience anger wisdom self-righteousness Ecclesiastes 7", { category: "Chapter Introductions" });
assert.equal(ecclesiastesSeven.length,1,"Ecclesiastes chapter 7 guide should be searchable"); assert.equal(ecclesiastesSeven[0].source.book,"Ecclesiastes"); assert.equal(ecclesiastesSeven[0].source.chapter,7);
const ecclesiastesTwelve = await library.search("remember Creator aging dust fear God commandments Ecclesiastes 12", { category: "Chapter Introductions" });
assert.equal(ecclesiastesTwelve.length,1,"Ecclesiastes chapter 12 guide should be searchable"); assert.equal(ecclesiastesTwelve[0].source.book,"Ecclesiastes"); assert.equal(ecclesiastesTwelve[0].source.chapter,12);


const songOne = await library.search("opening voices fragrance gardens affection", { category: "Chapter Introductions" });
assert.equal(songOne.length,1,"Song of Solomon chapter 1 guide should be searchable"); assert.equal(songOne[0].source.book,"Song of Solomon"); assert.equal(songOne[0].source.chapter,1);
const songFour = await library.search("garden invitation fragrance water fruit delight", { category: "Chapter Introductions" });
assert.equal(songFour.length,1,"Song of Solomon chapter 4 guide should be searchable"); assert.equal(songFour[0].source.book,"Song of Solomon"); assert.equal(songFour[0].source.chapter,4);
const songEight = await library.search("final invitation enduring desire longing affection", { category: "Chapter Introductions" });
assert.equal(songEight.length,1,"Song of Solomon chapter 8 guide should be searchable"); assert.equal(songEight[0].source.book,"Song of Solomon"); assert.equal(songEight[0].source.chapter,8);


const isaiahSix = await library.search("Isaiah vision commission seraphim holiness cleansing", { category: "Chapter Introductions" });
assert.equal(isaiahSix.length,1,"Isaiah chapter 6 guide should be searchable"); assert.equal(isaiahSix[0].source.book,"Isaiah"); assert.equal(isaiahSix[0].source.chapter,6);
const isaiahNine = await library.search("light Galilee promised child righteous reign", { category: "Chapter Introductions" });
assert.equal(isaiahNine.length,1,"Isaiah chapter 9 guide should be searchable"); assert.equal(isaiahNine[0].source.book,"Isaiah"); assert.equal(isaiahNine[0].source.chapter,9);
const isaiahEleven = await library.search("shoot Jesse Spirit ruler righteousness peaceable creation", { category: "Chapter Introductions" });
assert.equal(isaiahEleven.length,1,"Isaiah chapter 11 guide should be searchable"); assert.equal(isaiahEleven[0].source.book,"Isaiah"); assert.equal(isaiahEleven[0].source.chapter,11);

const isaiahThirtyFive = await library.search("wilderness blooms redeemed return", { category: "Chapter Introductions" });
assert.equal(isaiahThirtyFive.length,1,"Isaiah chapter 35 guide should be searchable"); assert.equal(isaiahThirtyFive[0].source.chapter,35);
const isaiahThirtySeven = await library.search("Hezekiah prayer Assyrian threat", { category: "Chapter Introductions" });
assert.equal(isaiahThirtySeven.length,1,"Isaiah chapter 37 guide should be searchable"); assert.equal(isaiahThirtySeven[0].source.chapter,37);
const isaiahForty = await library.search("comfort Jerusalem shepherd grass", { category: "Chapter Introductions" });
assert.equal(isaiahForty.length,1,"Isaiah chapter 40 guide should be searchable"); assert.equal(isaiahForty[0].source.chapter,40);

const isaiahFiftyTwo = await library.search("good news servant exalted suffering", { category: "Chapter Introductions" });
assert.equal(isaiahFiftyTwo.length,1,"Isaiah chapter 52 guide should be searchable"); assert.equal(isaiahFiftyTwo[0].source.chapter,52);
const isaiahFiftyThree = await library.search("suffering servant grief rejected", { category: "Chapter Introductions" });
assert.equal(isaiahFiftyThree.length,1,"Isaiah chapter 53 guide should be searchable"); assert.equal(isaiahFiftyThree[0].source.chapter,53);
const isaiahFiftyEight = await library.search("true fasting justice repair community", { category: "Chapter Introductions" });
assert.equal(isaiahFiftyEight.length,1,"Isaiah chapter 58 guide should be searchable"); assert.equal(isaiahFiftyEight[0].source.chapter,58);
const isaiahSixtyFive = await library.search("new heavens earth servants rejoice", { category: "Chapter Introductions" });
assert.equal(isaiahSixtyFive.length,1,"Isaiah chapter 65 guide should be searchable"); assert.equal(isaiahSixtyFive[0].source.chapter,65);

const jeremiahOne = await library.search("prophet called almond branch boiling pot", { category: "Chapter Introductions" });
assert.equal(jeremiahOne.length,1,"Jeremiah chapter 1 guide should be searchable"); assert.equal(jeremiahOne[0].source.chapter,1);
const jeremiahSeven = await library.search("temple sermon justice gate Shiloh", { category: "Chapter Introductions" });
assert.equal(jeremiahSeven.length,1,"Jeremiah chapter 7 guide should be searchable"); assert.equal(jeremiahSeven[0].source.chapter,7);
const jeremiahTwentyNine = await library.search("letter exiles seek city's peace", { category: "Chapter Introductions" });
assert.equal(jeremiahTwentyNine.length,1,"Jeremiah chapter 29 guide should be searchable"); assert.equal(jeremiahTwentyNine[0].source.chapter,29);
const jeremiahThirtyOne = await library.search("Rachel weeps new covenant heart", { category: "Chapter Introductions" });
assert.equal(jeremiahThirtyOne.length,1,"Jeremiah chapter 31 guide should be searchable"); assert.equal(jeremiahThirtyOne[0].source.chapter,31);
const jeremiahFiftyTwo = await library.search("Jerusalem fall siege Jehoiachin", { category: "Chapter Introductions" });
assert.equal(jeremiahFiftyTwo.length,1,"Jeremiah chapter 52 guide should be searchable"); assert.equal(jeremiahFiftyTwo[0].source.chapter,52);

const lamentationsOne = await library.search("lonely city widow lament exile", { category: "Chapter Introductions" });
assert.equal(lamentationsOne.length,1,"Lamentations chapter 1 guide should be searchable"); assert.equal(lamentationsOne[0].source.chapter,1);
const lamentationsThree = await library.search("afflicted speaker mercy waiting hope", { category: "Chapter Introductions" });
assert.equal(lamentationsThree.length,1,"Lamentations chapter 3 guide should be searchable"); assert.equal(lamentationsThree[0].source.chapter,3);
const lamentationsFive = await library.search("communal prayer remember restore dispossession", { category: "Chapter Introductions" });
assert.equal(lamentationsFive.length,1,"Lamentations chapter 5 guide should be searchable"); assert.equal(lamentationsFive[0].source.chapter,5);

const ezekielOne = await library.search("throne vision river living creatures wheels", { category: "Chapter Introductions" });
assert.equal(ezekielOne.length,1,"Ezekiel chapter 1 guide should be searchable"); assert.equal(ezekielOne[0].source.chapter,1);
const ezekielEleven = await library.search("leaders false security new heart spirit", { category: "Chapter Introductions" });
assert.equal(ezekielEleven.length,1,"Ezekiel chapter 11 guide should be searchable"); assert.equal(ezekielEleven[0].source.chapter,11);
const ezekielSixteen = await library.search("Jerusalem unfaithful wife covenant everlasting", { category: "Chapter Introductions" });
assert.equal(ezekielSixteen.length,1,"Ezekiel chapter 16 guide should be searchable"); assert.equal(ezekielSixteen[0].source.chapter,16);
const ezekielEighteen = await library.search("parents guilt wicked turn live conduct", { category: "Chapter Introductions" });
assert.equal(ezekielEighteen.length,1,"Ezekiel chapter 18 guide should be searchable"); assert.equal(ezekielEighteen[0].source.chapter,18);
const ezekielTwentyFour = await library.search("cooking pot siege Ezekiel wife mourning", { category: "Chapter Introductions" });
assert.equal(ezekielTwentyFour.length,1,"Ezekiel chapter 24 guide should be searchable"); assert.equal(ezekielTwentyFour[0].source.chapter,24);

const ezekielTwentySix = await library.search("Tyre pride trading power fall", { category: "Chapter Introductions" });
assert.equal(ezekielTwentySix.length,1,"Ezekiel chapter 26 guide should be searchable"); assert.equal(ezekielTwentySix[0].source.chapter,26);
const ezekielTwentyEight = await library.search("ruler Tyre Sidon Eden cherub pride", { category: "Chapter Introductions" });
assert.equal(ezekielTwentyEight.length,1,"Ezekiel chapter 28 guide should be searchable"); assert.equal(ezekielTwentyEight[0].source.chapter,28);
const ezekielThirtyThree = await library.search("watchman renewed Jerusalem fall turn", { category: "Chapter Introductions" });
assert.equal(ezekielThirtyThree.length,1,"Ezekiel chapter 33 guide should be searchable"); assert.equal(ezekielThirtyThree[0].source.chapter,33);
const ezekielThirtyFour = await library.search("false shepherds promised shepherd flock", { category: "Chapter Introductions" });
assert.equal(ezekielThirtyFour.length,1,"Ezekiel chapter 34 guide should be searchable"); assert.equal(ezekielThirtyFour[0].source.chapter,34);
const ezekielThirtySeven = await library.search("valley dry bones breath life restoration", { category: "Chapter Introductions" });
assert.equal(ezekielThirtySeven.length,1,"Ezekiel chapter 37 guide should be searchable"); assert.equal(ezekielThirtySeven[0].source.chapter,37);
const ezekielForty = await library.search("measured temple complex heavenly guide gates courts", { category: "Chapter Introductions" });
assert.equal(ezekielForty.length,1,"Ezekiel chapter 40 guide should be searchable"); assert.equal(ezekielForty[0].source.chapter,40);
const ezekielFortySeven = await library.search("river temple healing land Arabah", { category: "Chapter Introductions" });
assert.equal(ezekielFortySeven.length,1,"Ezekiel chapter 47 guide should be searchable"); assert.equal(ezekielFortySeven[0].source.chapter,47);

const danielOne = await library.search("Daniel companions Babylon royal food", { category: "Chapter Introductions" });
assert.equal(danielOne.length,1,"Daniel chapter 1 guide should be searchable"); assert.equal(danielOne[0].source.chapter,1);
const danielTwo = await library.search("Nebuchadnezzar dream statue enduring kingdom", { category: "Chapter Introductions" });
assert.equal(danielTwo.length,1,"Daniel chapter 2 guide should be searchable"); assert.equal(danielTwo[0].source.chapter,2);
const danielThree = await library.search("fiery furnace refuse worship golden image", { category: "Chapter Introductions" });
assert.equal(danielThree.length,1,"Daniel chapter 3 guide should be searchable"); assert.equal(danielThree[0].source.chapter,3);
const danielFive = await library.search("writing wall Belshazzar Babylon fall", { category: "Chapter Introductions" });
assert.equal(danielFive.length,1,"Daniel chapter 5 guide should be searchable"); assert.equal(danielFive[0].source.chapter,5);
const danielSix = await library.search("Daniel lions den regular prayer", { category: "Chapter Introductions" });
assert.equal(danielSix.length,1,"Daniel chapter 6 guide should be searchable"); assert.equal(danielSix[0].source.chapter,6);
const danielSeven = await library.search("four beasts Ancient of Days son man", { category: "Chapter Introductions" });
assert.equal(danielSeven.length,1,"Daniel chapter 7 guide should be searchable"); assert.equal(danielSeven[0].source.chapter,7);
const danielNine = await library.search("Daniel prayer seventy weeks Jeremiah", { category: "Chapter Introductions" });
assert.equal(danielNine.length,1,"Daniel chapter 9 guide should be searchable"); assert.equal(danielNine[0].source.chapter,9);
const danielTwelve = await library.search("time distress resurrection final hope", { category: "Chapter Introductions" });
assert.equal(danielTwelve.length,1,"Daniel chapter 12 guide should be searchable"); assert.equal(danielTwelve[0].source.chapter,12);

const hoseaOne = await library.search("Hosea marriage sign children Israel", { category: "Chapter Introductions" });
assert.equal(hoseaOne.length,1,"Hosea chapter 1 guide should be searchable"); assert.equal(hoseaOne[0].source.chapter,1);
const hoseaTwo = await library.search("unfaithful wife tenderly restoration", { category: "Chapter Introductions" });
assert.equal(hoseaTwo.length,1,"Hosea chapter 2 guide should be searchable"); assert.equal(hoseaTwo[0].source.chapter,2);
const hoseaFour = await library.search("knowledge God priests leadership violence", { category: "Chapter Introductions" });
assert.equal(hoseaFour.length,1,"Hosea chapter 4 guide should be searchable"); assert.equal(hoseaFour[0].source.chapter,4);
const hoseaSix = await library.search("steadfast love sacrifice ritual return", { category: "Chapter Introductions" });
assert.equal(hoseaSix.length,1,"Hosea chapter 6 guide should be searchable"); assert.equal(hoseaSix[0].source.chapter,6);
const hoseaEleven = await library.search("compassion Israel child Egypt", { category: "Chapter Introductions" });
assert.equal(hoseaEleven.length,1,"Hosea chapter 11 guide should be searchable"); assert.equal(hoseaEleven[0].source.chapter,11);
const hoseaFourteen = await library.search("return Lord healing freely given love", { category: "Chapter Introductions" });
assert.equal(hoseaFourteen.length,1,"Hosea chapter 14 guide should be searchable"); assert.equal(hoseaFourteen[0].source.chapter,14);

const joelOne = await library.search("locust devastation lament grain offerings", { category: "Chapter Introductions" });
assert.equal(joelOne.length,1,"Joel chapter 1 guide should be searchable"); assert.equal(joelOne[0].source.chapter,1);
const joelTwo = await library.search("return heart fasting outpouring Spirit sons daughters", { category: "Chapter Introductions" });
assert.equal(joelTwo.length,1,"Joel chapter 2 guide should be searchable"); assert.equal(joelTwo[0].source.chapter,2);
const joelThree = await library.search("nations judged valley Jehoshaphat Lord dwelling", { category: "Chapter Introductions" });
assert.equal(joelThree.length,1,"Joel chapter 3 guide should be searchable"); assert.equal(joelThree[0].source.chapter,3);

const amosOne = await library.search("Damascus neighbouring nations violence", { category: "Chapter Introductions" });
assert.equal(amosOne.length,1,"Amos chapter 1 guide should be searchable"); assert.equal(amosOne[0].source.chapter,1);
const amosFive = await library.search("seek Lord live empty worship justice", { category: "Chapter Introductions" });
assert.equal(amosFive.length,1,"Amos chapter 5 guide should be searchable"); assert.equal(amosFive[0].source.chapter,5);
const amosNine = await library.search("restoration rebuilding abundance", { category: "Chapter Introductions" });
assert.equal(amosNine.length,1,"Amos chapter 9 guide should be searchable"); assert.equal(amosNine[0].source.chapter,9);
const obadiahOne = await library.search("Edom pride violence betrayal Judah", { category: "Chapter Introductions" });
assert.equal(obadiahOne.length,1,"Obadiah guide should be searchable"); assert.equal(obadiahOne[0].source.chapter,1);

const jonahThree = await library.search("Nineveh repents God relents", { category: "Chapter Introductions" });
assert.equal(jonahThree.length,1,"Jonah chapter 3 should be searchable");assert.equal(jonahThree[0].source.chapter,3);
const micahSix = await library.search("justice kindness humble walking", { category: "Chapter Introductions" });
assert.equal(micahSix.length,1,"Micah chapter 6 should be searchable");assert.equal(micahSix[0].source.chapter,6);
const nahumThree = await library.search("violent city exploitation", { category: "Chapter Introductions" });
assert.equal(nahumThree.length,1,"Nahum chapter 3 should be searchable");assert.equal(nahumThree[0].source.chapter,3);

const habakkukTwo = await library.search("vision patience righteous faith", { category: "Chapter Introductions" });
assert.equal(habakkukTwo.length,1,"Habakkuk chapter 2 should be searchable");assert.equal(habakkukTwo[0].source.chapter,2);
const zephaniahThree = await library.search("purification restoration joy", { category: "Chapter Introductions" });
assert.equal(zephaniahThree.length,1,"Zephaniah chapter 3 should be searchable");assert.equal(zephaniahThree[0].source.chapter,3);

const matthewTwentyEight = await library.search("risen Jesus all authority make disciples nations baptism presence", { category: "Chapter Introductions" });
assert.equal(matthewTwentyEight.length,1,"Matthew chapter 28 should be searchable");assert.equal(matthewTwentyEight[0].source.book,"Matthew");assert.equal(matthewTwentyEight[0].source.chapter,28);

const matthewOne = await library.search("Jesus Messiah genealogy David Abraham birth Immanuel", { category: "Chapter Introductions" });
assert.equal(matthewOne.length,1,"Matthew chapter 1 should be searchable");assert.equal(matthewOne[0].source.book,"Matthew");assert.equal(matthewOne[0].source.chapter,1);


const markOne = await library.search("John prepares way Jesus baptised tested disciples kingdom", { category: "Chapter Introductions" });
assert.equal(markOne.length,1,"Mark chapter 1 should be searchable");assert.equal(markOne[0].source.book,"Mark");assert.equal(markOne[0].source.chapter,1);
const markEight = await library.search("Jesus transfigured distressed child humble service greatness", { category: "Chapter Introductions" });
assert.equal(markEight.length,1,"Mark chapter 8 should be searchable");assert.equal(markEight[0].source.book,"Mark");assert.equal(markEight[0].source.chapter,8);


const markNine = await library.search("protect vulnerable people reconciliation forgiveness", { category: "Chapter Introductions" });
assert.equal(markNine.length,1,"Mark chapter 9 should be searchable");assert.equal(markNine[0].source.book,"Mark");assert.equal(markNine[0].source.chapter,9);
const markSixteen = await library.search("crucified buried women empty tomb resurrection announcement", { category: "Chapter Introductions" });
assert.equal(markSixteen.length,1,"Mark chapter 16 should be searchable");assert.equal(markSixteen[0].source.book,"Mark");assert.equal(markSixteen[0].source.chapter,16);


const lukeOne = await library.search("Gabriel Mary Elizabeth mercy justice lowly", { category: "Chapter Introductions" });
assert.equal(lukeOne.length,1,"Luke chapter 1 should be searchable");assert.equal(lukeOne[0].source.book,"Luke");assert.equal(lukeOne[0].source.chapter,1);
const lukeFour = await library.search("Isaiah Nazareth good news poor oppressed freedom", { category: "Chapter Introductions" });
assert.equal(lukeFour.length,1,"Luke chapter 4 should be searchable");assert.equal(lukeFour[0].source.book,"Luke");assert.equal(lukeFour[0].source.chapter,4);
const lukeSix = await library.search("enemy love generosity mercy blessings woes", { category: "Chapter Introductions" });
assert.equal(lukeSix.length,1,"Luke chapter 6 should be searchable");assert.equal(lukeSix[0].source.book,"Luke");assert.equal(lukeSix[0].source.chapter,6);
const lukeTen = await library.search("seventy two disciples Good Samaritan Martha Mary", { category: "Chapter Introductions" });
assert.equal(lukeTen.length,1,"Luke chapter 10 should be searchable");assert.equal(lukeTen[0].source.book,"Luke");assert.equal(lukeTen[0].source.chapter,10);
const lukeTwelve = await library.search("rich fool anxiety trust faithful readiness", { category: "Chapter Introductions" });
assert.equal(lukeTwelve.length,1,"Luke chapter 12 should be searchable");assert.equal(lukeTwelve[0].source.book,"Luke");assert.equal(lukeTwelve[0].source.chapter,12);


const lukeThirteen = await library.search("repentance Sabbath healing narrow door Jerusalem", { category: "Chapter Introductions" });
assert.equal(lukeThirteen.length,1,"Luke chapter 13 should be searchable");assert.equal(lukeThirteen[0].source.book,"Luke");assert.equal(lukeThirteen[0].source.chapter,13);
const lukeFifteen = await library.search("lost sheep coin father returning son", { category: "Chapter Introductions" });
assert.equal(lukeFifteen.length,1,"Luke chapter 15 should be searchable");assert.equal(lukeFifteen[0].source.book,"Luke");assert.equal(lukeFifteen[0].source.chapter,15);
const lukeEighteen = await library.search("persistent widow tax collector children rich ruler blind beggar", { category: "Chapter Introductions" });
assert.equal(lukeEighteen.length,1,"Luke chapter 18 should be searchable");assert.equal(lukeEighteen[0].source.book,"Luke");assert.equal(lukeEighteen[0].source.chapter,18);
const lukeTwentyOne = await library.search("widow offering temple upheaval watchfulness endurance", { category: "Chapter Introductions" });
assert.equal(lukeTwentyOne.length,1,"Luke chapter 21 should be searchable");assert.equal(lukeTwentyOne[0].source.book,"Luke");assert.equal(lukeTwentyOne[0].source.chapter,21);
const lukeTwentyFour = await library.search("women empty tomb Emmaus Jerusalem commissions witnesses", { category: "Chapter Introductions" });
assert.equal(lukeTwentyFour.length,1,"Luke chapter 24 should be searchable");assert.equal(lukeTwentyFour[0].source.book,"Luke");assert.equal(lukeTwentyFour[0].source.chapter,24);


const johnEleven = await library.search("Lazarus Mary Martha tomb resurrection life", { category: "Chapter Introductions" });
assert.equal(johnEleven.length,1,"John chapter 11 should be searchable");assert.equal(johnEleven[0].source.book,"John");assert.equal(johnEleven[0].source.chapter,11);
const johnTwelve = await library.search("Mary anoints Jesus Jerusalem Greeks grain wheat glory", { category: "Chapter Introductions" });
assert.equal(johnTwelve.length,1,"John chapter 12 should be searchable");assert.equal(johnTwelve[0].source.book,"John");assert.equal(johnTwelve[0].source.chapter,12);


const johnThirteen = await library.search("washes disciples feet betrayal love one another", { category: "Chapter Introductions" });
assert.equal(johnThirteen.length,1,"John chapter 13 should be searchable");assert.equal(johnThirteen[0].source.book,"John");assert.equal(johnThirteen[0].source.chapter,13);
const johnFourteen = await library.search("Father house way truth life Helper Spirit peace", { category: "Chapter Introductions" });
assert.equal(johnFourteen.length,1,"John chapter 14 should be searchable");assert.equal(johnFourteen[0].source.book,"John");assert.equal(johnFourteen[0].source.chapter,14);
const johnSixteen = await library.search("Spirit sorrow joy prayer", { category: "Chapter Introductions" });
assert.equal(johnSixteen.length,1,"John chapter 16 should be searchable");assert.equal(johnSixteen[0].source.book,"John");assert.equal(johnSixteen[0].source.chapter,16);
const johnFifteen = await library.search("true vine abiding fruitfulness love friendship", { category: "Chapter Introductions" });
assert.equal(johnFifteen.length,1,"John chapter 15 should be searchable");assert.equal(johnFifteen[0].source.book,"John");assert.equal(johnFifteen[0].source.chapter,15);
const johnSeventeen = await library.search("prays glory truth protection unity believers", { category: "Chapter Introductions" });
assert.equal(johnSeventeen.length,1,"John chapter 17 should be searchable");assert.equal(johnSeventeen[0].source.book,"John");assert.equal(johnSeventeen[0].source.chapter,17);
const johnEighteen = await library.search("arrested Peter denies Pilate kingdom", { category: "Chapter Introductions" });
assert.equal(johnEighteen.length,1,"John chapter 18 should be searchable");assert.equal(johnEighteen[0].source.book,"John");assert.equal(johnEighteen[0].source.chapter,18);
const johnNineteen = await library.search("crucified dies buried Joseph Nicodemus", { category: "Chapter Introductions" });
assert.equal(johnNineteen.length,1,"John chapter 19 should be searchable");assert.equal(johnNineteen[0].source.book,"John");assert.equal(johnNineteen[0].source.chapter,19);
const johnTwenty = await library.search("Mary Magdalene empty tomb peace Spirit Thomas", { category: "Chapter Introductions" });
assert.equal(johnTwenty.length,1,"John chapter 20 should be searchable");assert.equal(johnTwenty[0].source.book,"John");assert.equal(johnTwenty[0].source.chapter,20);
const johnTwentyOne = await library.search("breakfast fish Peter restores follow", { category: "Chapter Introductions" });
assert.equal(johnTwentyOne.length,1,"John chapter 21 should be searchable");assert.equal(johnTwentyOne[0].source.book,"John");assert.equal(johnTwentyOne[0].source.chapter,21);


const actsOne = await library.search("ascends Spirit witnesses Jerusalem Matthias prays", { category: "Chapter Introductions" });
assert.equal(actsOne.length,1,"Acts chapter 1 should be searchable");assert.equal(actsOne[0].source.book,"Acts");assert.equal(actsOne[0].source.chapter,1);
const actsTwo = await library.search("Pentecost languages Peter Scripture community fellowship", { category: "Chapter Introductions" });
assert.equal(actsTwo.length,1,"Acts chapter 2 should be searchable");assert.equal(actsTwo[0].source.book,"Acts");assert.equal(actsTwo[0].source.chapter,2);
const actsThree = await library.search("healed man temple gate Peter Jesus restoration", { category: "Chapter Introductions" });
assert.equal(actsThree.length,1,"Acts chapter 3 should be searchable");assert.equal(actsThree[0].source.book,"Acts");assert.equal(actsThree[0].source.chapter,3);
const actsFour = await library.search("Peter John opposition prayer courage shares resources", { category: "Chapter Introductions" });
assert.equal(actsFour.length,1,"Acts chapter 4 should be searchable");assert.equal(actsFour[0].source.book,"Acts");assert.equal(actsFour[0].source.chapter,4);
const actsFive = await library.search("Ananias Sapphira deceive apostles council Gamaliel", { category: "Chapter Introductions" });
assert.equal(actsFive.length,1,"Acts chapter 5 should be searchable");assert.equal(actsFive[0].source.book,"Acts");assert.equal(actsFive[0].source.chapter,5);
const actsSix = await library.search("widows distribution Stephen service inequity", { category: "Chapter Introductions" });
assert.equal(actsSix.length,1,"Acts chapter 6 should be searchable");assert.equal(actsSix[0].source.book,"Acts");assert.equal(actsSix[0].source.chapter,6);
const actsSeven = await library.search("Stephen Israel history prophetic stoning Saul", { category: "Chapter Introductions" });
assert.equal(actsSeven.length,1,"Acts chapter 7 should be searchable");assert.equal(actsSeven[0].source.book,"Acts");assert.equal(actsSeven[0].source.chapter,7);
const actsEight = await library.search("Samaria Simon Ethiopian official Isaiah Philip", { category: "Chapter Introductions" });
assert.equal(actsEight.length,1,"Acts chapter 8 should be searchable");assert.equal(actsEight[0].source.book,"Acts");assert.equal(actsEight[0].source.chapter,8);
const actsNine = await library.search("Saul Damascus Ananias sight Jesus", { category: "Chapter Introductions" });
assert.equal(actsNine.length,1,"Acts chapter 9 should be searchable");assert.equal(actsNine[0].source.book,"Acts");assert.equal(actsNine[0].source.chapter,9);
const actsTen = await library.search("Cornelius Peter Gentiles Spirit partiality", { category: "Chapter Introductions" });
assert.equal(actsTen.length,1,"Acts chapter 10 should be searchable");assert.equal(actsTen[0].source.book,"Acts");assert.equal(actsTen[0].source.chapter,10);
const actsEleven = await library.search("Peter Antioch Gentiles Barnabas Saul", { category: "Chapter Introductions" });
assert.equal(actsEleven.length,1,"Acts chapter 11 should be searchable");assert.equal(actsEleven[0].source.book,"Acts");assert.equal(actsEleven[0].source.chapter,11);
const actsTwelve = await library.search("James Peter prison angelic Herod", { category: "Chapter Introductions" });
assert.equal(actsTwelve.length,1,"Acts chapter 12 should be searchable");assert.equal(actsTwelve[0].source.book,"Acts");assert.equal(actsTwelve[0].source.chapter,12);
const actsThirteen = await library.search("Barnabas Saul Cyprus Pisidian Antioch resurrection", { category: "Chapter Introductions" });
assert.equal(actsThirteen.length,1,"Acts chapter 13 should be searchable");assert.equal(actsThirteen[0].source.book,"Acts");assert.equal(actsThirteen[0].source.chapter,13);
const actsFourteen = await library.search("Iconium Lystra Derbe elders opposition mission", { category: "Chapter Introductions" });
assert.equal(actsFourteen.length,1,"Acts chapter 14 should be searchable");assert.equal(actsFourteen[0].source.book,"Acts");assert.equal(actsFourteen[0].source.chapter,14);



const actsFifteen = await library.search("Jerusalem council Gentiles Spirit community", { category: "Chapter Introductions" });
assert.equal(actsFifteen.length,1,"Acts chapter 15 should be searchable");assert.equal(actsFifteen[0].source.book,"Acts");assert.equal(actsFifteen[0].source.chapter,15);
const actsSixteen = await library.search("Macedonia Lydia jailer hospitality exploitation", { category: "Chapter Introductions" });
assert.equal(actsSixteen.length,1,"Acts chapter 16 should be searchable");assert.equal(actsSixteen[0].source.book,"Acts");assert.equal(actsSixteen[0].source.chapter,16);
const actsSeventeen = await library.search("Thessalonica Berea Athens scriptural reasoning philosophical audience", { category: "Chapter Introductions" });
assert.equal(actsSeventeen.length,1,"Acts chapter 17 should be searchable");assert.equal(actsSeventeen[0].source.book,"Acts");assert.equal(actsSeventeen[0].source.chapter,17);
const actsEighteen = await library.search("Corinth Priscilla Aquila collaborative teaching relationships", { category: "Chapter Introductions" });
assert.equal(actsEighteen.length,1,"Acts chapter 18 should be searchable");assert.equal(actsEighteen[0].source.book,"Acts");assert.equal(actsEighteen[0].source.chapter,18);
const actsNineteen = await library.search("Ephesus idols economic interests spiritual exploitation", { category: "Chapter Introductions" });
assert.equal(actsNineteen.length,1,"Acts chapter 19 should be searchable");assert.equal(actsNineteen[0].source.book,"Acts");assert.equal(actsNineteen[0].source.chapter,19);
const actsTwenty = await library.search("Ephesian elders farewell pastoral memory warning", { category: "Chapter Introductions" });
assert.equal(actsTwenty.length,1,"Acts chapter 20 should be searchable");assert.equal(actsTwenty[0].source.book,"Acts");assert.equal(actsTwenty[0].source.chapter,20);
const actsTwentyOne = await library.search("Paul Jerusalem Jewish Gentile suspicion arrest", { category: "Chapter Introductions" });
assert.equal(actsTwentyOne.length,1,"Acts chapter 21 should be searchable");assert.equal(actsTwentyOne[0].source.book,"Acts");assert.equal(actsTwentyOne[0].source.chapter,21);
const actsTwentyTwo = await library.search("Paul testimony Jerusalem crowd calling legal status", { category: "Chapter Introductions" });
assert.equal(actsTwentyTwo.length,1,"Acts chapter 22 should be searchable");assert.equal(actsTwentyTwo[0].source.book,"Acts");assert.equal(actsTwentyTwo[0].source.chapter,22);
const actsTwentyThree = await library.search("Paul council plot Roman threat family", { category: "Chapter Introductions" });
assert.equal(actsTwentyThree.length,1,"Acts chapter 23 should be searchable");assert.equal(actsTwentyThree[0].source.book,"Acts");assert.equal(actsTwentyThree[0].source.chapter,23);
const actsTwentyFour = await library.search("Felix justice conscience resurrection delay", { category: "Chapter Introductions" });
assert.equal(actsTwentyFour.length,1,"Acts chapter 24 should be searchable");assert.equal(actsTwentyFour[0].source.book,"Acts");assert.equal(actsTwentyFour[0].source.chapter,24);
const actsTwentyFive = await library.search("Festus Agrippa Caesar appeal legal procedure", { category: "Chapter Introductions" });
assert.equal(actsTwentyFive.length,1,"Acts chapter 25 should be searchable");assert.equal(actsTwentyFive[0].source.book,"Acts");assert.equal(actsTwentyFive[0].source.chapter,25);
const actsTwentySix = await library.search("Agrippa Paul's calling Israel hope resurrection vision", { category: "Chapter Introductions" });
assert.equal(actsTwentySix.length,1,"Acts chapter 26 should be searchable");assert.equal(actsTwentySix[0].source.book,"Acts");assert.equal(actsTwentySix[0].source.chapter,26);
const actsTwentySeven = await library.search("voyage Rome shipwreck courage practical leadership survival", { category: "Chapter Introductions" });
assert.equal(actsTwentySeven.length,1,"Acts chapter 27 should be searchable");assert.equal(actsTwentySeven[0].source.book,"Acts");assert.equal(actsTwentySeven[0].source.chapter,27);
const actsTwentyEight = await library.search("Malta Rome word proclaimed restrictions mission", { category: "Chapter Introductions" });
assert.equal(actsTwentyEight.length,1,"Acts chapter 28 should be searchable");assert.equal(actsTwentyEight[0].source.book,"Acts");assert.equal(actsTwentyEight[0].source.chapter,28);


const romansOne = await library.search("gospel righteousness", { category: "Chapter Introductions" });
assert.equal(romansOne.length,1,"Romans chapter 1 should be searchable");assert.equal(romansOne[0].source.book,"Romans");assert.equal(romansOne[0].source.chapter,1);
const romansTwo = await library.search("impartial judgement hypocrisy law heart", { category: "Chapter Introductions" });
assert.equal(romansTwo.length,1,"Romans chapter 2 should be searchable");assert.equal(romansTwo[0].source.book,"Romans");assert.equal(romansTwo[0].source.chapter,2);
const romansThree = await library.search("universal need justification grace boasting", { category: "Chapter Introductions" });
assert.equal(romansThree.length,1,"Romans chapter 3 should be searchable");assert.equal(romansThree[0].source.book,"Romans");assert.equal(romansThree[0].source.chapter,3);
const romansFour = await library.search("Abraham faith promise grace nations", { category: "Chapter Introductions" });
assert.equal(romansFour.length,1,"Romans chapter 4 should be searchable");assert.equal(romansFour[0].source.book,"Romans");assert.equal(romansFour[0].source.chapter,4);
const romansFive = await library.search("peace hope suffering Adam Christ grace", { category: "Chapter Introductions" });
assert.equal(romansFive.length,1,"Romans chapter 5 should be searchable");assert.equal(romansFive[0].source.book,"Romans");assert.equal(romansFive[0].source.chapter,5);
const romansSix = await library.search("united Christ sin master life", { category: "Chapter Introductions" });
assert.equal(romansSix.length,1,"Romans chapter 6 should be searchable");assert.equal(romansSix[0].source.book,"Romans");assert.equal(romansSix[0].source.chapter,6);
const romansSeven = await library.search("law struggle sin deliverance", { category: "Chapter Introductions" });
assert.equal(romansSeven.length,1,"Romans chapter 7 should be searchable");assert.equal(romansSeven[0].source.book,"Romans");assert.equal(romansSeven[0].source.chapter,7);
const romansEight = await library.search("Spirit adoption creation groaning hope love", { category: "Chapter Introductions" });
assert.equal(romansEight.length,1,"Romans chapter 8 should be searchable");assert.equal(romansEight[0].source.book,"Romans");assert.equal(romansEight[0].source.chapter,8);


const romansNine = await library.search("Israel promises mercy grief", { category: "Chapter Introductions" });
assert.equal(romansNine.length,1,"Romans chapter 9 should be searchable");assert.equal(romansNine[0].source.book,"Romans");assert.equal(romansNine[0].source.chapter,9);
const romansTen = await library.search("Israel salvation faith message all", { category: "Chapter Introductions" });
assert.equal(romansTen.length,1,"Romans chapter 10 should be searchable");assert.equal(romansTen[0].source.book,"Romans");assert.equal(romansTen[0].source.chapter,10);
const romansEleven = await library.search("remnant olive tree Gentiles boast mercy", { category: "Chapter Introductions" });
assert.equal(romansEleven.length,1,"Romans chapter 11 should be searchable");assert.equal(romansEleven[0].source.book,"Romans");assert.equal(romansEleven[0].source.chapter,11);
const romansTwelve = await library.search("living worship gifts body sincere love practical care", { category: "Chapter Introductions" });
assert.equal(romansTwelve.length,1,"Romans chapter 12 should be searchable");assert.equal(romansTwelve[0].source.book,"Romans");assert.equal(romansTwelve[0].source.chapter,12);
const romansThirteen = await library.search("public authority neighbour love responsibility light", { category: "Chapter Introductions" });
assert.equal(romansThirteen.length,1,"Romans chapter 13 should be searchable");assert.equal(romansThirteen[0].source.book,"Romans");assert.equal(romansThirteen[0].source.chapter,13);
const romansFourteen = await library.search("food days conscience strong weak judge", { category: "Chapter Introductions" });
assert.equal(romansFourteen.length,1,"Romans chapter 14 should be searchable");assert.equal(romansFourteen[0].source.book,"Romans");assert.equal(romansFourteen[0].source.chapter,14);
const romansFifteen = await library.search("unity hope mission nations service grace", { category: "Chapter Introductions" });
assert.equal(romansFifteen.length,1,"Romans chapter 15 should be searchable");assert.equal(romansFifteen[0].source.book,"Romans");assert.equal(romansFifteen[0].source.chapter,15);
const romansSixteen = await library.search("Phoebe women co-workers house churches greetings", { category: "Chapter Introductions" });
assert.equal(romansSixteen.length,1,"Romans chapter 16 should be searchable");assert.equal(romansSixteen[0].source.book,"Romans");assert.equal(romansSixteen[0].source.chapter,16);

const zechariahFourteen = await library.search("Lord reigns living waters Jerusalem holiness nations worship", { category: "Chapter Introductions" });
assert.equal(zechariahFourteen.length,1,"Zechariah chapter 14 should be searchable");assert.equal(zechariahFourteen[0].source.book,"Zechariah");assert.equal(zechariahFourteen[0].source.chapter,14);

const haggaiOne = await library.search("rebuild temple consider ways priorities returned community", { category: "Chapter Introductions" });
assert.equal(haggaiOne.length,1,"Haggai chapter 1 should be searchable");assert.equal(haggaiOne[0].source.book,"Haggai");assert.equal(haggaiOne[0].source.chapter,1);

const malachiFour = await library.search("day Lord Elijah promise warning hope", { category: "Chapter Introductions" });
assert.equal(malachiFour.length,1,"Malachi chapter 4 should be searchable");assert.equal(malachiFour[0].source.book,"Malachi");assert.equal(malachiFour[0].source.chapter,4);


const johnOne = await library.search("Word creation light life grace witness disciples", { category: "Chapter Introductions" });
assert.equal(johnOne.length,1,"John chapter 1 should be searchable");assert.equal(johnOne[0].source.book,"John");assert.equal(johnOne[0].source.chapter,1);
const johnTwo = await library.search("first sign temple action glory worship resurrection", { category: "Chapter Introductions" });
assert.equal(johnTwo.length,1,"John chapter 2 should be searchable");assert.equal(johnTwo[0].source.book,"John");assert.equal(johnTwo[0].source.chapter,2);
const johnThree = await library.search("new birth Spirit God's love trust Son life", { category: "Chapter Introductions" });
assert.equal(johnThree.length,1,"John chapter 3 should be searchable");assert.equal(johnThree[0].source.book,"John");assert.equal(johnThree[0].source.chapter,3);
const johnFour = await library.search("living water worship boundaries woman witness", { category: "Chapter Introductions" });
assert.equal(johnFour.length,1,"John chapter 4 should be searchable");assert.equal(johnFour[0].source.book,"John");assert.equal(johnFour[0].source.chapter,4);
const johnFive = await library.search("Bethesda healing restoration life judgment authority Father", { category: "Chapter Introductions" });
assert.equal(johnFive.length,1,"John chapter 5 should be searchable");assert.equal(johnFive[0].source.book,"John");assert.equal(johnFive[0].source.chapter,5);
const johnSix = await library.search("physical hunger life God wilderness provision", { category: "Chapter Introductions" });
assert.equal(johnSix.length,1,"John chapter 6 should be searchable");assert.equal(johnSix[0].source.book,"John");assert.equal(johnSix[0].source.chapter,6);
const johnSeven = await library.search("festival origin authority Spirit public debate", { category: "Chapter Introductions" });
assert.equal(johnSeven.length,1,"John chapter 7 should be searchable");assert.equal(johnSeven[0].source.book,"John");assert.equal(johnSeven[0].source.chapter,7);
const johnEight = await library.search("light world freedom truth life", { category: "Chapter Introductions" });
assert.equal(johnEight.length,1,"John chapter 8 should be searchable");assert.equal(johnEight[0].source.book,"John");assert.equal(johnEight[0].source.chapter,8);
const johnNine = await library.search("man born blind restored sight spiritual perception personal sin testimony", { category: "Chapter Introductions" });
assert.equal(johnNine.length,1,"John chapter 9 should be searchable");assert.equal(johnNine[0].source.book,"John");assert.equal(johnNine[0].source.chapter,9);
const johnTen = await library.search("good shepherd abundant life secure care leadership protection self giving", { category: "Chapter Introductions" });
assert.equal(johnTen.length,1,"John chapter 10 should be searchable");assert.equal(johnTen[0].source.book,"John");assert.equal(johnTen[0].source.chapter,10);

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
