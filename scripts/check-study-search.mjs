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
