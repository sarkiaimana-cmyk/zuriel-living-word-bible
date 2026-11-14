
/* =========================================================
   ZURIEL LIVING WORD BIBLE
   SCRIPTURE STUDY CENTRE — COMPLETE WORKING VERSION
   ========================================================= */

(function () {
  "use strict";

  const NOTES_KEY = "zuriel-verse-study-notes-v1";
  const HIGHLIGHTS_KEY = "zuriel-word-highlights-v1";
  let selectedReference = null;
  let selectedEnglishWord = "";
  let selectedEnglishWordIndex = -1;
  let activeHighlightColor = "#f5d76e";

  const crossReferences = [
    ["Genesis", 1, 2, "The creation account"],
    ["Psalms", 33, 6, "Creation through God's Word"],
    ["Psalms", 90, 2, "God before creation"],
    ["Isaiah", 45, 18, "God the Creator"],
    ["John", 1, 1, "The Word in the beginning"],
    ["Acts", 17, 24, "God made the world"],
    ["Colossians", 1, 16, "All things created through Christ"],
    ["Hebrews", 11, 3, "Creation by God's Word"],
    ["Revelation", 4, 11, "The Creator is worthy"]
  ];

  // Concise offline starter dictionary. Entries are study summaries;
  // readers should check each term in its passage and language context.
  const bibleDictionary = [
    ["Atonement","God's provision for dealing with sin and restoring relationship; in the Old Testament it is closely associated with sacrifice and cleansing. See Leviticus 16; Romans 3:23–26."],
    ["Covenant","A solemn relationship established by promise and obligation. Biblical covenants reveal God's purposes and faithfulness. See Genesis 15; Exodus 19–24; Luke 22:20."],
    ["Disciple","A learner and follower who receives a teacher's instruction and seeks to live by it. Christian discipleship centres on following Jesus. See Luke 9:23; John 8:31."],
    ["Faith","Trust and reliance upon God; biblical faith includes confidence, loyalty and faithful response. See Genesis 15:6; Hebrews 11:1–6."],
    ["Forgiveness","The release of a debt or offence; Scripture calls believers to receive God's mercy and forgive others without denying truth or justice. See Matthew 6:12–15; Ephesians 4:32."],
    ["Grace","God's generous favour and action toward people, not earned as a wage. Grace saves and trains believers for godly living. See Ephesians 2:8–10; Titus 2:11–14."],
    ["Holiness","Being set apart for God and living in a way that reflects His character. It includes worship, moral integrity and love. See Leviticus 19:2; 1 Peter 1:15–16."],
    ["Justification","God's righteous declaration concerning those who trust in Christ; Paul connects it with grace, faith and Christ's saving work. See Romans 3:21–28; 5:1."],
    ["Kingdom of God","God's reign and saving rule. Jesus announces the kingdom and teaches its values, present work and future fullness. See Mark 1:14–15; Matthew 6:10, 33."],
    ["Mercy","Compassion shown toward those in need or distress, often with practical help. God's mercy is a pattern for His people. See Psalm 103:8–14; Luke 10:30–37."],
    ["Redemption","Deliverance or release, often pictured as rescue from slavery or debt. The New Testament speaks of redemption through Christ. See Exodus 6:6; Ephesians 1:7."],
    ["Repentance","A turning from sin toward God, involving a changed mind, direction and conduct. See Joel 2:12–13; Mark 1:15; Acts 3:19."],
    ["Righteousness","What is right according to God's character and standards; it can describe just conduct and God's saving action. See Psalm 15; Matthew 5:6; Romans 1:16–17."],
    ["Sanctification","Being made holy and increasingly shaped toward faithful life with God. The New Testament connects this with the Spirit, truth and obedience. See John 17:17; 1 Thessalonians 4:3."],
    ["Salvation","God's rescue from sin and its consequences, bringing people into life and reconciliation through Jesus Christ. See Luke 19:10; Ephesians 2:8–10."],
    ["Shalom","Hebrew term often translated peace; it can include wholeness, well-being, safety and right relationship. See Numbers 6:24–26; Isaiah 9:6."],
    ["Sin","Human rebellion, wrongdoing or failure to live in faithfulness to God; Scripture describes both acts and the deeper condition. See Genesis 3; Romans 3:23; 1 John 1:8–9."],
    ["Stewardship","Responsible care of what has been entrusted by God, including resources, gifts, creation and relationships. See Genesis 2:15; Luke 16:10–13."],
    ["Wisdom","Skill in living rightly before God, joining understanding with just and faithful action. See Proverbs 1:7; James 1:5; 3:13–18."],
    ["Worship","Honouring God with reverence, love, trust and obedient life, not merely singing or ceremony. See Deuteronomy 6:4–5; John 4:23–24; Romans 12:1."],
    ["Adoption","A gracious act by which God brings believers into His family with the status and privileges of children. See Romans 8:15-17; Galatians 4:4-7; Ephesians 1:5."],
    ["Anointing","The act of applying oil as a sign of consecration, appointment or honour; Scripture also uses anointing language for the Spirit's empowering work. Read the context carefully. See 1 Samuel 16:13; Luke 4:18; 1 John 2:20,27."],
    ["Apostle","A person sent with a commission. The New Testament especially uses the title for Jesus' commissioned witnesses, including the Twelve and Paul. See Luke 6:13; Acts 1:21-26; 1 Corinthians 15:7-9."],
    ["Blessing","God's favour and provision, and the good spoken or sought for another. Biblical blessing is not a guarantee of wealth or a trouble-free life. See Genesis 12:2-3; Numbers 6:24-26; Ephesians 1:3."],
    ["Discernment","The ability to distinguish what is true, wise and pleasing to God through Scripture-shaped understanding and mature practice. See 1 Kings 3:9; Romans 12:2; Hebrews 5:14; Philippians 1:9-10."],
    ["Exile","The forced removal of a people from their homeland, especially Judah's deportation to Babylon. Exile becomes a major biblical setting for judgment, faithfulness and hope of restoration. See 2 Kings 25; Jeremiah 29; Daniel 1."],
    ["Gospel","Good news: in the New Testament, the announcement of God's saving reign and the death and resurrection of Jesus Christ. See Mark 1:14-15; Romans 1:1-4; 1 Corinthians 15:1-5."],
    ["Intercession","Prayer made on behalf of another person or community. Scripture presents intercession as loving dependence on God, not control over Him. See Exodus 32:11-14; Romans 8:26-27,34; 1 Timothy 2:1."],
    ["Justice","What is right and fair according to God's character, including impartial judgment and protection of the vulnerable. Biblical justice is joined to mercy and faithfulness. See Deuteronomy 10:17-19; Micah 6:8; Luke 11:42."],
    ["Lament","A truthful prayer that brings grief, confusion or protest before God while continuing to address Him. Lament is a faithful biblical response to suffering, not the opposite of faith. See Psalms 13; 42; Lamentations 3."],
    ["Sabbath","The seventh-day rest given in the creation pattern and commanded to Israel as a sign of trust, worship and liberation. Christians differ on its covenant application, so read Exodus 20:8-11; Deuteronomy 5:12-15; Mark 2:27-28."],
    ["Tabernacle","The portable sanctuary where Israel worshipped during the wilderness journey; it represented God's presence among His covenant people. See Exodus 25:8-9; 40:34-38; Hebrews 9:1-12."],
    ["Testimony","A witness or truthful account of what someone has seen, heard or experienced. Biblical testimony points beyond the speaker to God's acts and truth. See Psalm 66:16; John 4:39; Acts 1:8."],
    ["Zion","A name associated with Jerusalem, especially the city as the place of God's dwelling and kingship; later Scripture also uses Zion imagery for God's people and promised hope. See Psalm 2:6; 48:1-2; Hebrews 12:22."],
    ["Abide","To remain, dwell or continue in a relationship. Jesus uses abiding to describe continuing in Him and receiving life from Him. See John 15:1-10; 1 John 2:24-28."],
    ["Abba","An Aramaic family address meaning Father. The New Testament uses it in prayer to express the Spirit-enabled relationship believers have with God. See Mark 14:36; Romans 8:15; Galatians 4:6."],
    ["Advocate","One who speaks in support of another. First John calls Jesus the advocate with the Father, and also describes the Holy Spirit as helper in John's Gospel. See John 14:16-17; 1 John 2:1."],
    ["Amen","A Hebrew expression affirming what is trustworthy or true, often translated truly or so be it. It can close prayer and affirm God's faithfulness. See Numbers 5:22; 1 Corinthians 14:16; Revelation 3:14."],
    ["Angel","A messenger, often a heavenly servant who carries out God's purposes. Scripture also warns readers not to worship angels. See Psalm 103:20; Luke 1:26-38; Hebrews 1:14; Revelation 22:8-9."],
    ["Apostasy","A turning away from a previously professed faith or allegiance. Biblical warnings call communities to endurance, truth and faithful worship. See Deuteronomy 13:1-5; 2 Thessalonians 2:3; Hebrews 3:12."],
    ["Baptism","A ritual washing or immersion associated in the New Testament with repentance, faith, identification with Christ and the community of believers. Christian traditions differ on some details. See Matthew 28:19; Acts 2:38-41; Romans 6:3-4."],
    ["Blasphemy","Speech or conduct that dishonours God or treats what is holy with contempt. Read each passage carefully because biblical contexts distinguish different offences and warnings. See Leviticus 24:10-16; Mark 3:28-30; James 2:7."],
    ["Church","The gathered people who belong to Christ; the New Testament uses the word for local congregations and the wider people of God. It is not merely a building. See Matthew 16:18; Acts 2:42-47; Ephesians 1:22-23."],
    ["Christ","The Greek title meaning Anointed One, corresponding to Messiah. Christians confess Jesus as God's promised King and Saviour. See Matthew 16:16; John 1:41; Acts 2:36."],
    ["Conscience","A person's moral awareness that can accuse, excuse or require formation. Scripture calls for a conscience shaped by truth and kept clear before God and others. See Romans 2:14-16; 1 Corinthians 8:7-12; 1 Timothy 1:5."],
    ["Doxology","Words of praise that give glory to God. Doxologies appear throughout Scripture and direct worship toward God's character and saving work. See Romans 11:33-36; Ephesians 3:20-21; Jude 24-25."],
    ["Election","God's choosing, described in Scripture in relation to Israel, Christ and the people who belong to Him. Christian traditions explain aspects of election differently; interpret each text in its context. See Deuteronomy 7:6-8; Ephesians 1:3-6; Romans 9."],
    ["Eternal Life","Life belonging to the age to come and given through relationship with God in Jesus Christ. In John's Gospel it begins now and has a future fullness. See John 3:16; 5:24; 17:3; 1 John 5:11-13."],
    ["Flesh","A biblical term that can refer to the human body, mortal life, human weakness or life governed by sinful desires, depending on context. It does not mean the physical body is inherently evil. See Genesis 6:3; John 1:14; Galatians 5:16-24."],
    ["Glory","The weight, splendour and honour associated with God's presence and character; Scripture also speaks of giving God glory and sharing in the glory He promises. See Exodus 33:18-23; John 1:14; Romans 8:18."],
    ["Incarnation","The Christian teaching that the eternal Word truly became human in Jesus Christ. The New Testament presents this as central to God's saving work. See John 1:1-18; Philippians 2:5-11; Hebrews 2:14-17."],
    ["Inspiration","The work of God by which Scripture is described as God-breathed and useful for teaching, correction and training. This does not remove the need to attend to each book's genre and human authorship. See 2 Timothy 3:14-17; 2 Peter 1:20-21."],
    ["Messiah","A Hebrew title meaning Anointed One, used for an appointed king or deliverer and developed in biblical hope. The New Testament identifies Jesus as the Messiah. See Psalm 2:1-12; Daniel 9:25-26; John 4:25-26."],
    ["Parable","A short story, comparison or image that communicates a teaching and invites response. Jesus' parables must be read with attention to their setting, audience and central point. See Matthew 13; Luke 15; 18:1-14."],
    ["Pentecost","The Jewish festival of Weeks, and in Acts the day the Holy Spirit came upon Jesus' followers and the gospel was proclaimed publicly. See Leviticus 23:15-22; Acts 2:1-41."],
    ["Perseverance","Continuing in faith and obedience through difficulty. Scripture encourages endurance while grounding hope in God's faithfulness, not human self-confidence alone. See Matthew 24:13; Romans 5:1-5; Hebrews 10:35-39; James 1:2-4."],
    ["Prophecy","A message spoken on God's behalf in a particular biblical setting. Prophecy may address present injustice, call people to covenant faithfulness or announce future hope. See Deuteronomy 18:18-22; 1 Corinthians 14:1-5; 2 Peter 1:19-21."],
    ["Propitiation","A theological term used in some Bible translations for Christ's atoning work in relation to sin and God's righteous judgment. Other translations use sacrifice of atonement or expiation; compare the wording and context. See Romans 3:25; 1 John 2:2; 4:10."],
    ["Resurrection","The raising of the dead to life by God's power. The New Testament centres Christian hope on Jesus' bodily resurrection and the promised resurrection of His people. See John 11:25-26; 1 Corinthians 15; 1 Peter 1:3."],
    ["Sacrifice","An offering presented to God in worship, thanksgiving, covenant practice or atonement. The New Testament interprets Jesus' death as decisive and calls believers to lives of worship and service. See Leviticus 1-7; Hebrews 9-10; Romans 12:1."],
    ["Sanctuary","A holy place set apart for worship and associated with God's presence. Biblical sanctuary language includes the tabernacle, temple and later theological imagery. See Exodus 25:8; Psalm 73:17; Hebrews 8:1-2."],
    ["Immanuel","A Hebrew name meaning God with us, used in Isaiah's sign and applied to Jesus in Matthew's account of His birth. Read the original prophecy and its Gospel use in context. See Isaiah 7:14; 8:8-10; Matthew 1:22-23."],
    ["Jubilee","The fiftieth-year release described in Israel's law, involving liberty, return of family land and rest for the land. It expresses justice, restoration and God's ownership. See Leviticus 25:8-55; Luke 4:16-21."],
    ["Law","A broad biblical term that can refer to God's instruction, the Torah, a particular command or a principle at work. Its meaning depends on context; distinguish the Mosaic covenant from other uses in Scripture. See Deuteronomy 6:1-9; Psalm 19:7-11; Romans 7:12; Galatians 3."],
    ["Manna","The food God provided for Israel in the wilderness, teaching dependence and daily trust. Jesus later uses manna imagery in teaching about the bread of life. See Exodus 16; Deuteronomy 8:2-3; John 6:30-35."],
    ["New Covenant","The promised covenant associated with forgiveness, transformed hearts and renewed relationship with God, announced by the prophets and connected by Jesus with His death. See Jeremiah 31:31-34; Luke 22:20; Hebrews 8:6-13."],
    ["Omnipotence","A theological term describing God's unlimited power to accomplish all that is consistent with His nature and purposes. Scripture portrays no rival as equal to Him. See Genesis 18:14; Jeremiah 32:17; Luke 1:37; Revelation 19:6."],
    ["Omniscience","A theological term describing God's complete knowledge, including the human heart and all creation. Biblical texts present His knowledge as perfect and beyond human measure. See Psalm 139:1-6; Isaiah 46:9-10; Hebrews 4:13."],
    ["Providence","God's sustaining and governing care of creation and history. Scripture presents divine purpose alongside meaningful human choices and responsibility. See Genesis 50:20; Proverbs 16:9; Acts 17:24-28; Romans 8:28."],
    ["Reconciliation","The restoration of relationship after hostility or separation. The New Testament describes God reconciling people to Himself through Christ and entrusting a ministry of reconciliation to believers. See Romans 5:10-11; 2 Corinthians 5:18-21; Colossians 1:19-22."],
    ["Temple","A place associated with worship and God's presence, especially Jerusalem's temple in Israel's history. The New Testament also uses temple imagery for Jesus and the gathered people of God. See 1 Kings 8; John 2:19-21; 1 Corinthians 3:16-17."],
    ["Transfiguration","The event in which Jesus' appearance was changed before selected disciples, accompanied by the voice from the cloud. The accounts reveal His glory and connect Him with the Law and Prophets. See Matthew 17:1-8; Mark 9:2-8; Luke 9:28-36."],
    ["Trinity","The Christian term for the one God confessed as Father, Son and Holy Spirit. The word itself is not a Bible quotation; the doctrine summarises the New Testament's witness to the Father, Son and Spirit. See Matthew 28:19; John 1:1-18; 2 Corinthians 13:14."],
    ["Unbelief","Lack of trust or refusal to believe, which Scripture treats in varied settings including doubt, resistance and hardened rejection. Read each passage carefully rather than treating every question or struggle as the same condition. See Mark 9:24; John 20:27-29; Hebrews 3:12-19."],
    ["Vocation","A calling or work entrusted to a person. Scripture speaks of God's call to belong to Christ and of varied gifts and responsibilities in serving others. See Romans 8:28-30; 1 Corinthians 7:17; Ephesians 4:1-16."],
    ["Zeal","Strong commitment or fervour. Scripture commends zeal when guided by knowledge, love and truth, and warns against misdirected religious passion. See Numbers 25:10-13; Romans 10:1-4; 12:11; Titus 2:14."],
    ["Ascension","The return of the risen Jesus to the Father's presence, witnessed by His disciples. The New Testament connects the ascension with Christ's exaltation, reign and continuing ministry. See Luke 24:50-53; Acts 1:6-11; Ephesians 1:20-23."],
    ["Compassion","Deep concern that moves toward the suffering or vulnerable with practical care. Scripture repeatedly presents God's compassion as a pattern for His people. See Exodus 34:6; Matthew 9:36; Luke 10:33-37; Colossians 3:12."],
    ["Consecration","The setting apart of a person, object or time for God's purposes. Biblical consecration involves belonging to God and responding with reverence and obedience. See Exodus 19:10-14; Leviticus 20:7-8; Romans 12:1."],
    ["Gentile","A person or people from the nations outside Israel. The New Testament describes the inclusion of Gentiles among God's people through the gospel, without erasing the historical setting of Israel's Scriptures. See Genesis 12:3; Acts 10:34-48; Ephesians 2:11-22."],
    ["Incense","A fragrant substance burned in worship, especially in Israel's sanctuary rituals. Scripture also uses incense as an image of prayer, while warning against empty ritual without faithfulness. See Exodus 30:1-10; Psalm 141:2; Revelation 5:8."],
    ["Logos","A Greek word meaning word, message or reason, whose meaning depends on context. John's Gospel uses Logos as a title for the eternal Word who was with God and became flesh in Jesus Christ. See John 1:1-18; 1 John 1:1-3."],
    ["Martyr","A witness who remains faithful under persecution, sometimes to the point of death. In the New Testament the word is connected with testimony to Jesus and the truth of the gospel. See Acts 7:54-60; Revelation 2:13; 6:9-11."],
    ["Passover","The memorial of Israel's deliverance from slavery in Egypt, marked by the lamb and the meal commanded in Exodus. The New Testament connects Passover imagery with Jesus' death, while retaining the original story's meaning. See Exodus 12; Luke 22:7-20; 1 Corinthians 5:7-8."]
  ];

  function readNotes() {
    try {
      return JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
    } catch (error) {
      return {};
    }
  }

  function noteKey(ref) {
    return ref.book + "|" + ref.chapter + "|" + ref.verse;
  }

  const INTERLINEAR_API = "https://bible.helloao.org/api/d/bsb-interlinear/";
  const LEXICON_API = "https://bible.helloao.org/api/d/stepbible-lexicon/lexicon/";
  const CROSS_REFERENCE_API = "https://bible.helloao.org/api/d/open-cross-ref/";
  const API_BOOK_CODES = [
    "GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA",
    "1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO",
    "ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO",
    "OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT",
    "MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP",
    "COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE",
    "2PE","1JN","2JN","3JN","JUD","REV"
  ];

  function apiBookCode(bookName) {
    const bookIndex = bibleBooks.findIndex(item => item.name === bookName);
    return bookIndex >= 0 ? API_BOOK_CODES[bookIndex] : null;
  }

  function englishBookName(apiCode) {
    const bookIndex = API_BOOK_CODES.indexOf(apiCode);
    return bookIndex >= 0 && bibleBooks[bookIndex]
      ? bibleBooks[bookIndex].name
      : null;
  }

  // Request counters prevent a slow response for an older verse from
  // replacing study results for the verse the reader selected most recently.
  let originalWordsRequest = 0;
  let crossReferencesRequest = 0;
  let lexiconRequest = 0;

  // Keep successfully downloaded interlinear, lexicon and cross-reference
  // records in Cache Storage so a verse studied once can be revisited offline.
  // Cache-first is appropriate here because these reference datasets are
  // versioned/static resources; a failed cache operation never blocks study.
  async function fetchStudyJson(url) {
    const cacheName = "zuriel-study-resources-v1";
    let studyCache = null;

    if ("caches" in window) {
      try {
        studyCache = await caches.open(cacheName);
        const cachedResponse = await studyCache.match(url);
        if (cachedResponse) {
          try {
            return await cachedResponse.clone().json();
          } catch (cacheError) {
            await studyCache.delete(url);
          }
        }
      } catch (cacheError) {
        studyCache = null;
      }
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Study resource is temporarily unavailable.");
    }

    const data = await response.json();
    if (studyCache) {
      try {
        await studyCache.put(url, response.clone());
      } catch (cacheError) {
        // Some browsers restrict cross-origin cache writes; online study
        // remains available and the app continues without persistent cache.
      }
    }
    return data;
  }

  async function loadOriginalWords(ref) {
    const requestId = ++originalWordsRequest;
    // A new verse selection also invalidates any lexicon lookup started
    // from the previously selected verse.
    ++lexiconRequest;
    const target = document.getElementById("zurielOriginalWordResults");
    const lexiconBox = document.getElementById("zurielLexiconDetails");
    if (!target || !ref) return;

    target.textContent = "Loading Hebrew or Greek words...";
    lexiconBox.replaceChildren();

    try {
      const code = apiBookCode(ref.book);
      if (!code) throw new Error("This Bible book is not mapped for original-language study.");

      const data = await fetchStudyJson(
        INTERLINEAR_API + code + "/" + ref.chapter + ".json"
      );
      if (requestId !== originalWordsRequest) return;

      const verses = data.chapter && Array.isArray(data.chapter.content)
        ? data.chapter.content : [];
      const verseData = verses.find(item => Number(item.verse) === Number(ref.verse));

      if (!verseData || !Array.isArray(verseData.words) || !verseData.words.length) {
        target.textContent = "No original-language word records were supplied for this verse.";
        return;
      }

      target.replaceChildren();

      const language = verseData.words.some(word => word.language === "aramaic")
        ? "Aramaic"
        : verseData.words.some(word => word.language === "greek")
          ? "Greek" : "Hebrew";

      const intro = document.createElement("p");
      intro.className = "study-small";
      intro.textContent = language + " original-language words, in source-text order. Tap a word to explore its lexicon, grammar information supplied by the source, and related study connections.";
      target.appendChild(intro);

      const methodNote = document.createElement("p");
      methodNote.className = "study-small";
      methodNote.textContent = "Study carefully: an English gloss is a brief guide, not the full meaning of a word in every passage. Read the surrounding verse and paragraph. Grammar details appear only when the source provides them; an undecoded source tag is shown as-is rather than guessed.";
      target.appendChild(methodNote);

      verseData.words.forEach(function (word) {
        const card = document.createElement("div");
        card.className = "original-word-card";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "original-word-button";

        const original = document.createElement("span");
        original.className = "original-script";
        original.dir = word.language === "hebrew" || word.language === "aramaic" ? "rtl" : "ltr";
        original.textContent = word.text || "Original word unavailable";
        button.appendChild(original);

        const gloss = document.createElement("span");
        gloss.className = "original-gloss";
        gloss.textContent = word.gloss || "No English gloss supplied";
        button.appendChild(gloss);

        const meta = document.createElement("span");
        meta.className = "word-meta";
        const grammarNote = word.parsingFull
          ? "Grammar: " + word.parsingFull
          : word.parsing
            ? "Source parsing tag: " + word.parsing
            : "Grammar detail not supplied";
        meta.textContent = [
          word.transliteration || "",
          word.strongs ? "Strong's " + word.strongs : "No Strong's number",
          grammarNote
        ].filter(Boolean).join(" • ");
        button.appendChild(meta);

        button.addEventListener("click", function () {
          if (word.strongs) {
            loadLexiconEntry(word.strongs, card, data, ref);
          } else {
            lexiconBox.textContent = "This original-language item has no Strong's number in the source data.";
          }
        });

        card.appendChild(button);
        target.appendChild(card);
      });
    } catch (error) {
      if (requestId !== originalWordsRequest) return;
      target.textContent = error.message + " Connect to the internet once to save this study for offline use.";
    }
  }

  function normalizeStrongs(value) {
    const match = String(value || "").match(/[HG]\d{1,5}/i);
    if (!match) return null;
    const prefix = match[0].charAt(0).toUpperCase();
    const number = match[0].slice(1);
    return prefix + number.padStart(4, "0");
  }

  async function loadLexiconEntry(strongs, card, chapterData, ref) {
    const box = document.getElementById("zurielLexiconDetails");
    const requestId = ++lexiconRequest;
    if (!box) return;
    const id = normalizeStrongs(strongs);
    if (!id) {
      box.textContent = "This Strong's reference could not be read.";
      return;
    }

    box.textContent = "Loading " + id + " lexicon...";
    try {
      const data = await fetchStudyJson(LEXICON_API + id + ".json");
      if (requestId !== lexiconRequest) return;
      const entry = data.entry;
      if (!entry || !Array.isArray(entry.senses)) {
        throw new Error("No lexicon definition was returned for " + id + ".");
      }

      box.replaceChildren();
      const heading = document.createElement("h3");
      heading.textContent = "Strong's " + id + " — " +
        (entry.language === "greek" ? "Greek" : entry.language === "aramaic" ? "Aramaic" : "Hebrew");
      box.appendChild(heading);

      const contextNote = document.createElement("p");
      contextNote.className = "study-small";
      contextNote.textContent = "Lexicon guide: the lemma and listed senses describe a word's range of use. The best sense for this verse must be judged from its sentence, paragraph, book and wider biblical context. Strong's numbers are indexing aids, not meanings by themselves.";
      box.appendChild(contextNote);

      entry.senses.forEach(function (sense) {
        const item = document.createElement("div");
        item.className = "lexicon-entry";

        const lemma = document.createElement("h4");
        lemma.textContent = sense.lemma || "Original-language lemma";
        item.appendChild(lemma);

        const transliteration = document.createElement("p");
        transliteration.textContent = "Transliteration: " + (sense.transliteration || "Not supplied");
        item.appendChild(transliteration);

        const gloss = document.createElement("p");
        gloss.textContent = "Meaning: " + (sense.gloss || "Not supplied");
        item.appendChild(gloss);

        const grammar = document.createElement("p");
        grammar.textContent = "Part of speech: " + (sense.partOfSpeech || "Not supplied");
        item.appendChild(grammar);

        const definition = document.createElement("p");
        definition.textContent = sense.definition || "No extended definition supplied.";
        item.appendChild(definition);

        box.appendChild(item);
      });

      const topicalIndex = window.ZurielTopicalIndex;
      if (topicalIndex && typeof topicalIndex.findByKeyword === "function") {
        const glossWords = entry.senses
          .map(sense => String(sense.gloss || "").toLowerCase())
          .join(" ").match(/[a-z]{4,}/g) || [];
        const topicalMatches = [];
        glossWords.forEach(function (word) {
          topicalIndex.findByKeyword(word).forEach(function (topic) {
            if (!topicalMatches.some(item => item.title === topic.title)) topicalMatches.push(topic);
          });
        });
        if (topicalMatches.length) {
          const topicalBox = document.createElement("div");
          topicalBox.className = "lexicon-entry";
          const topicalHeading = document.createElement("h4");
          topicalHeading.textContent = "Possible topical connections from this word's gloss";
          topicalBox.appendChild(topicalHeading);
          const note = document.createElement("p");
          note.textContent = "These pathways are suggested by the English gloss. Check each passage in its own context; they are not definitions of the original word.";
          topicalBox.appendChild(note);
          topicalMatches.slice(0, 5).forEach(function (topic) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "study-link";
            button.textContent = topic.title + " • " + topic.references[0].label;
            button.addEventListener("click", function () {
              const item = topic.references[0];
              if (typeof window.openChapter !== "function") return;
              window.openChapter(item.book, item.chapter).then(function () {
                const verseElements = document.querySelectorAll("#message .verse");
                const selectedVerse = verseElements[item.verse - 1];
                if (!selectedVerse) return;
                const text = selectedVerse.textContent.replace(/^\s*\d+\.?\s*/, "").trim();
                if (window.ZurielStudy && typeof window.ZurielStudy.openForReference === "function") {
                  window.ZurielStudy.openForReference(item.book, item.chapter, item.verse, text, "", -1);
                }
              });
            });
            topicalBox.appendChild(button);
          });
          box.appendChild(topicalBox);
        }
      }

      // Connect the original-language entry to the offline biblical dictionary.
      // The English gloss is only a search bridge, not a replacement for the
      // Hebrew or Greek definition or the word's context in this verse.
      const dictionaryMatches = bibleDictionary.filter(function (term) {
        const glossText = entry.senses.map(sense => String(sense.gloss || "")).join(" ").toLowerCase();
        const title = term[0].toLowerCase();
        return title.length > 3 && glossText.includes(title);
      }).slice(0, 4);
      if (dictionaryMatches.length) {
        const dictionaryBox = document.createElement("div");
        dictionaryBox.className = "lexicon-entry";
        const dictionaryHeading = document.createElement("h4");
        dictionaryHeading.textContent = "Connected biblical dictionary";
        dictionaryBox.appendChild(dictionaryHeading);
        const dictionaryNote = document.createElement("p");
        dictionaryNote.textContent = "These dictionary entries are suggested by the English gloss. They are related study pathways, not claims that the English term fully defines the original-language word.";
        dictionaryBox.appendChild(dictionaryNote);
        dictionaryMatches.forEach(function (term) {
          const entryBox = document.createElement("div");
          const termHeading = document.createElement("strong");
          termHeading.textContent = term[0];
          const definition = document.createElement("p");
          definition.textContent = term[1];
          entryBox.append(termHeading, definition);
          dictionaryBox.appendChild(entryBox);
        });
        box.appendChild(dictionaryBox);
      }

      const related = document.createElement("div");
      related.className = "lexicon-entry";
      const relatedHeading = document.createElement("h4");
      relatedHeading.textContent = "Other occurrences in this chapter";
      related.appendChild(relatedHeading);

      const matches = [];
      const verses = chapterData.chapter && Array.isArray(chapterData.chapter.content)
        ? chapterData.chapter.content : [];
      verses.forEach(function (verse) {
        (verse.words || []).forEach(function (word) {
          if (normalizeStrongs(word.strongs) === id) {
            matches.push({ verse: Number(verse.verse), gloss: word.gloss || "" });
          }
        });
      });

      const uniqueVerses = [...new Map(matches.map(item => [item.verse, item])).values()];
      if (uniqueVerses.length) {
        uniqueVerses.forEach(function (item) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "study-link";
          button.textContent = ref.book + " " + ref.chapter + ":" + item.verse +
            (item.gloss ? " — " + item.gloss : "");
          button.addEventListener("click", async function () {
            if (typeof window.openChapter !== "function") return;
            button.disabled = true;
            try {
              await window.openChapter(ref.book, ref.chapter);
              const targetVerse = document.querySelectorAll("#message .verse")[item.verse - 1];
              if (!targetVerse) throw new Error("That verse is not visible in the reader.");
              const verseText = targetVerse.textContent.replace(/^\\s*\\d+\\.?\\s*/, "").trim();
              targetVerse.scrollIntoView({ behavior: "smooth", block: "center" });
              if (window.ZurielStudy && typeof window.ZurielStudy.openForReference === "function") {
                window.ZurielStudy.openForReference(ref.book, ref.chapter, item.verse, verseText, "", -1);
              }
            } catch (error) {
              button.disabled = false;
              console.error("Zuriel related word occurrence:", error);
            }
          });
          related.appendChild(button);
        });
      } else {
        const line = document.createElement("p");
        line.textContent = "No other occurrence of this Strong's number was found in this chapter.";
        related.appendChild(line);
      }
      box.appendChild(related);
    } catch (error) {
      if (requestId !== lexiconRequest) return;
      box.textContent = error.message || "The lexicon entry could not be loaded.";
    }
  }

  async function loadRelatedScriptures(ref) {
    const requestId = ++crossReferencesRequest;
    const list = document.getElementById("zurielCrossReferenceList");
    if (!list || !ref) return;

    list.textContent = "Finding related Scriptures...";
    try {
      const code = apiBookCode(ref.book);
      if (!code) throw new Error("This Bible book is not mapped for cross-references.");

      const data = await fetchStudyJson(
        CROSS_REFERENCE_API + code + "/" + ref.chapter + ".json"
      );
      if (requestId !== crossReferencesRequest) return;
      const verses = data.chapter && Array.isArray(data.chapter.content)
        ? data.chapter.content : [];
      const selected = verses.find(item => Number(item.verse) === Number(ref.verse));
      const references = selected && Array.isArray(selected.references)
        ? selected.references.slice(0, 12) : [];

      list.replaceChildren();
      if (!references.length) {
        list.textContent = "No connected Scripture references are listed for this verse.";
        return;
      }

      references.forEach(function (item) {
        const name = englishBookName(item.book);
        if (!name) return;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "study-link";
        button.textContent = name + " " + item.chapter + ":" + item.verse +
          (item.endVerse ? "–" + item.endVerse : "");
        button.addEventListener("click", async function () {
          if (typeof window.openChapter !== "function") return;
          const verseNumber = Number(item.verse);
          const chapterNumber = Number(item.chapter);
          if (!Number.isInteger(verseNumber) || verseNumber < 1 ||
              !Number.isInteger(chapterNumber) || chapterNumber < 1) return;
          button.disabled = true;
          try {
            await window.openChapter(name, chapterNumber);
            const verseElements = document.querySelectorAll("#message .verse");
            const target = verseElements[verseNumber - 1];
            if (!target) throw new Error("The connected verse could not be located in the reader.");
            const verseText = target.textContent.replace(/^\\s*\\d+\\.?\\s*/, "").trim();
            target.scrollIntoView({ behavior: "smooth", block: "center" });
            target.classList.add("zuriel-selected-verse");
            if (window.ZurielStudy && typeof window.ZurielStudy.openForReference === "function") {
              window.ZurielStudy.openForReference(name, chapterNumber, verseNumber, verseText, "", -1);
            }
          } catch (error) {
            button.disabled = false;
            const status = document.createElement("p");
            status.textContent = error.message || "This connected passage could not be opened. Please try again.";
            list.appendChild(status);
          }
        });
        list.appendChild(button);
      });

      if (!list.children.length) {
        list.textContent = "Related references were returned, but their book labels could not be matched.";
      }
    } catch (error) {
      if (requestId !== crossReferencesRequest) return;
      list.textContent = error.message + " Connect to the internet once to save related references for offline use.";
    }
  }

  function createStudyPanel() {
    if (document.getElementById("zurielStudyPanel")) return;

    const style = document.createElement("style");
    style.textContent = `
      #zurielStudyPanel {
        position:fixed;
        z-index:10000;
        right:18px;
        top:86px;
        width:min(430px,calc(100vw - 36px));
        max-height:calc(100vh - 110px);
        overflow-y:auto;
        overscroll-behavior:contain;
        box-shadow:0 12px 40px #0005;
        background:#10213d;
        color:#f8f4e9;
        border:1px solid #b99b58;
        border-radius:18px;
        padding:18px;
        margin:22px 0;
        line-height:1.75;
        scroll-margin-top:18px;
      }
      #zurielStudyPanel h2,
      #zurielStudyPanel h3 { color:#e8cf91; }
      #zurielStudyPanel .study-verse {
        background:#1c3657;
        border:1px solid #b99b58;
        border-radius:12px;
        padding:15px;
        margin:15px 0;
        overflow-wrap:anywhere;
      }
      #zurielStudyPanel .study-small {
        color:#d9e3ef;
        font-size:13px;
      }
      #zurielStudyPanel details {
        background:#fff;
        color:#18304d;
        border-radius:12px;
        margin:12px 0;
        overflow:hidden;
      }
      #zurielStudyPanel summary {
        padding:15px;
        cursor:pointer;
        font-weight:bold;
      }
      #zurielStudyPanel .study-body {
        padding:0 15px 16px;
      }
      #zurielStudyPanel .study-word {
        background:#f2eee4;
        border-left:4px solid #b99b58;
        color:#18304d;
        padding:12px;
        margin:10px 0;
        border-radius:7px;
      }

      #zurielStudyPanel .original-word-card {
        background:#fff;
        color:#18304d;
        border:1px solid #d8cdaF;
        border-radius:11px;
        padding:12px;
        margin:10px 0;
      }
      #zurielStudyPanel .original-word-button {
        display:block;
        width:100%;
        text-align:left;
        color:#18304d;
        background:#f7f4eb;
        border:1px solid #d6c79e;
        border-radius:9px;
        padding:12px;
        margin:5px 0;
        min-height:48px;
        font:inherit;
      }
      #zurielStudyPanel .original-script {
        display:block;
        font-family:"Noto Sans Hebrew","Noto Sans Greek","Arial Unicode MS",serif;
        font-size:28px;
        font-weight:800;
        line-height:1.8;
        letter-spacing:0.02em;
        color:#111827;
        text-rendering:optimizeLegibility;
        margin-bottom:7px;
      }
      #zurielStudyPanel .original-gloss {
        display:block;
        color:#18304d;
        font-size:15px;
        font-weight:700;
        line-height:1.5;
      }
      #zurielStudyPanel .word-meta {
        display:block;
        color:#536477;
        font-size:12px;
        margin-top:4px;
      }
      #zurielStudyPanel .lexicon-entry {
        background:#f2eee4;
        color:#18304d;
        border-left:4px solid #b99b58;
        border-radius:8px;
        padding:12px;
        margin:10px 0;
        overflow-wrap:anywhere;
      }
      #zurielStudyPanel .study-source {
        color:#d9e3ef;
        font-size:12px;
        line-height:1.5;
        margin-top:12px;
      }
      #zurielStudyPanel button.study-link {
        display:block;
        width:100%;
        text-align:left;
        background:#fff;
        color:#18304d;
        border:1px solid #d6c79e;
        border-radius:9px;
        padding:12px;
        margin:8px 0;
        min-height:46px;
      }
      #zurielStudyPanel textarea,
      #zurielStudyPanel input {
        width:100%;
        box-sizing:border-box;
        padding:12px;
        border:1px solid #c8c8c8;
        border-radius:9px;
        font:inherit;
        margin:6px 0 12px;
      }
      #zurielStudyPanel textarea { min-height:100px; }
      #zurielStudyPanel .study-action {
        background:#e8cf91;
        color:#10213d;
        border:1px solid #b99b58;
        padding:12px 15px;
        min-height:46px;
        border-radius:9px;
        font-weight:bold;
        margin:5px 4px 5px 0;
      }
      #zurielStudyPanel .study-secondary {
        background:#fff;
        color:#18304d;
        border:1px solid #d6c79e;
        padding:12px 15px;
        min-height:46px;
        border-radius:9px;
        font-weight:bold;
        margin:5px 4px 5px 0;
      }
      .verse.zuriel-selected-verse {
        background:#fff0c9 !important;
        border-left:5px solid #b99b58;
        border-radius:8px;
        padding-left:12px;
      }
      #zurielStudySaveStatus {
        color:#e8cf91;
        font-weight:bold;
      }
      #zurielStudyPanel .highlight-tools {
        background:#1c3657;
        border:1px solid #b99b58;
        border-radius:12px;
        padding:12px;
        margin:12px 0;
      }
      #zurielStudyPanel .highlight-palette {
        display:flex;
        flex-wrap:wrap;
        gap:8px;
        margin:9px 0;
      }
      #zurielStudyPanel .highlight-color {
        width:38px;
        height:38px;
        min-height:38px;
        padding:0;
        border:2px solid #fff;
        border-radius:50%;
        margin:0;
      }
      #zurielStudyPanel .highlight-color[aria-pressed="true"] {
        outline:3px solid #e8cf91;
        outline-offset:2px;
      }
      #zurielStudyPanel .highlight-tools .study-small { margin-bottom:5px; }
      #zurielStudyPanel .word-selection-label {
        color:#f1d99e;
        font-weight:bold;
        overflow-wrap:anywhere;
      }
      @media(max-width:600px) {
        #zurielStudyPanel {
          top:auto;
          right:0;
          bottom:0;
          width:100%;
          max-height:72vh;
          border-radius:18px 18px 0 0;
          padding:14px;
          padding-bottom:calc(14px + env(safe-area-inset-bottom));
        }
      }
    `;
    document.head.appendChild(style);

    const panel = document.createElement("section");
    panel.id = "zurielStudyPanel";

    panel.innerHTML = `
      <h2>📖 Zuriel Scripture Study Centre</h2>
      <p>Explore God's Word deeply, carefully and prayerfully.</p>

      <div class="study-verse">
        <h3 id="zurielSelectedReference">
          Your selected Scripture will appear here.
        </h3>
        <p id="zurielSelectedText">
          Open a Bible chapter and tap any verse.
        </p>
        <p class="study-small" id="zurielSelectionNotice">
          Scripture text is kept separate from study explanations.
        </p>
      </div>

      <button class="study-action" id="zurielReturnToVerse">
        ← Return to Selected Verse
      </button>
      <button class="study-secondary" id="zurielCloseStudy">
        Close Study Panel
      </button>

      <div class="highlight-tools">
        <h3>🎨 Scripture Highlights</h3>
        <p class="study-small">Choose a colour, then tap a word in the verse. You can also colour the whole verse.</p>
        <div class="highlight-palette" role="group" aria-label="Highlight colours">
          <button type="button" class="highlight-color" data-highlight="#f5d76e" style="background:#f5d76e" aria-label="Yellow highlight" aria-pressed="true"></button>
          <button type="button" class="highlight-color" data-highlight="#a8ddb5" style="background:#a8ddb5" aria-label="Green highlight" aria-pressed="false"></button>
          <button type="button" class="highlight-color" data-highlight="#a9d6f5" style="background:#a9d6f5" aria-label="Blue highlight" aria-pressed="false"></button>
          <button type="button" class="highlight-color" data-highlight="#e7b5e8" style="background:#e7b5e8" aria-label="Purple highlight" aria-pressed="false"></button>
          <button type="button" class="highlight-color" data-highlight="#f4b6a6" style="background:#f4b6a6" aria-label="Pink highlight" aria-pressed="false"></button>
          <button type="button" class="highlight-color" data-highlight="#f2c58d" style="background:#f2c58d" aria-label="Orange highlight" aria-pressed="false"></button>
        </div>
        <button type="button" class="study-action" id="zurielHighlightWholeVerse">Highlight Whole Verse</button>
        <button type="button" class="study-secondary" id="zurielClearVerseHighlights">Clear This Verse</button>
        <p class="study-small" id="zurielHighlightStatus" aria-live="polite">Yellow selected. Tap a word to highlight it.</p>
        <p class="word-selection-label" id="zurielSelectedEnglishWord">Selected English word: none</p>
      </div>

      <button type="button" class="study-secondary" id="zurielSaveVerseBookmark">🔖 Save This Verse to My Library</button>
      <p class="study-small" id="zurielBookmarkStatus" aria-live="polite"></p>

      <div id="zurielStudySections">

        <details open>
          <summary>📜 1. Scripture and Historical Context</summary>
          <div class="study-body" id="zurielContext">
            <p>Select a passage to begin its study.</p>
            <p>Consider the author, original audience, historical setting,
            literary structure and surrounding chapter.</p>
          </div>
        </details>

        <details>
          <summary>💡 2. Meaning and Exposition</summary>
          <div class="study-body" id="zurielMeaning">
            <p>Understand each verse within its chapter, book and wider
            biblical context. Compare Scripture with Scripture.</p>
            <p>Detailed explanations will be developed passage by passage
            using checked study resources.</p>
          </div>
        </details>

        <details>
          <summary>🙏 3. The Light — Prayer, Declaration and Faith</summary>
          <div class="study-body" id="zurielFaithResponse" aria-live="polite">
            <p>Select a verse to see a connected prayer, declaration, affirmation, confession and inspiration where a curated entry is available.</p>
          </div>
        </details>

        <details>
          <summary>🔤 4. Hebrew and Greek Word Study</summary>
          <div class="study-body" id="zurielOriginalWords">
            <p>Original-language words for your selected verse. Tap any word to open its Strong's lexicon entry.</p>
            <div id="zurielOriginalWordResults" aria-live="polite">
              <p>Select a verse to load its Hebrew or Greek word study.</p>
            </div>
            <div id="zurielLexiconDetails" aria-live="polite"></div>
            <p class="study-source">Interlinear word data: Berean interlinear tables. Lexicon: STEPBible / Tyndale House, Cambridge (CC BY 4.0).</p>
          </div>
        </details>

        <details>
          <summary>📖 Biblical Dictionary — Search Key Terms</summary>
          <div class="study-body">
            <p>Search concise explanations of important biblical words and themes. These are introductory study summaries, not exhaustive lexical definitions; always read the linked passages in context.</p>
            <label for="zurielDictionarySearch">Search dictionary</label>
            <input id="zurielDictionarySearch" type="search" placeholder="Try grace, covenant, faith, holiness…" autocomplete="off">
            <div id="zurielDictionaryResults" aria-live="polite">
              <p>Type a word to explore its meaning and Scripture connections.</p>
            </div>
          </div>
        </details>

        <details>
          <summary>🔗 4. Connected Scriptures</summary>
          <div class="study-body">
            <p>Related Scriptures for the selected verse. Tap a reference to open it and compare the full passage.</p>
            <p class="study-small">A connection may be a quotation, shared theme, parallel account, prophecy or fulfilment, or another textual link. Read both passages in context; a reference by itself does not prove that two verses mean exactly the same thing.</p>
            <div id="zurielCrossReferenceList" aria-live="polite">
              <p>Select a verse to find connected Scriptures.</p>
            </div>
          </div>
        </details>

        <details>
          <summary>📚 5. Theology and Deeper Study</summary>
          <div class="study-body" id="zurielDeeperStudy">
            <p>Explore biblical themes, teachings and connections.
            Distinguish the meaning of Scripture from personal interpretation.</p>
          </div>
        </details>

        <details>
          <summary>🧭 6. Topical Scripture Connections</summary>
          <div class="study-body" id="zurielTopicalConnections" aria-live="polite">
            <p>Select a verse to discover its mapped biblical themes and related passages.</p>
          </div>
        </details>

        <details>
          <summary>📝 7. My Personal Study Journal</summary>
          <div class="study-body">
            <p>Your notes are saved separately for each verse on this device.</p>

            <label for="zurielStudyTitle">Study title</label>
            <input id="zurielStudyTitle" placeholder="Give this study a title">

            <label for="zurielStudyNote">What have I learned?</label>
            <textarea id="zurielStudyNote"
              placeholder="Write your observations and discoveries..."></textarea>

            <label for="zurielStudyApplication">How will I apply this Word?</label>
            <textarea id="zurielStudyApplication"
              placeholder="Write your personal application..."></textarea>

            <button class="study-action" id="zurielSaveStudyNote">
              Save My Study
            </button>
            <button class="study-secondary" id="zurielClearStudyNote">
              Clear Fields
            </button>
            <p id="zurielStudySaveStatus"></p>
          </div>
        </details>

        <details>
          <summary>🙏 7. Prayer and Declaration</summary>
          <div class="study-body" id="zurielPrayerDeclaration">
            <h3>Prayer</h3>
            <p>Heavenly Father, give me understanding as I study Your Word.
            Help me receive its truth and walk in wisdom. In Jesus' name, Amen.</p>
            <h3>Declaration</h3>
            <p>I receive God's Word with faith. I grow in understanding,
            walk in His wisdom and live according to His truth.</p>
          </div>
        </details>
      </div>

      <div id="zurielGenesisStudy" style="display:none">
        <h2>🌍 Genesis 1:1 — Expanded Study</h2>

        <details>
          <summary>📜 Historical and Literary Context</summary>
          <div class="study-body">
            <h3>Book introduction</h3>
            <p>Genesis is the opening book of the Bible and the first
            book of the Pentateuch. It introduces creation, humanity,
            sin, God's promises and the beginnings of Israel.</p>
            <h3>Authorship and setting</h3>
            <p>Jewish and Christian tradition associates Genesis with Moses.
            Its literary history has also been examined by modern scholarship.</p>
            <h3>Literary structure</h3>
            <p>Genesis 1:1 introduces creation. Genesis 1:2 describes
            the earth's initial condition. The following verses describe
            God's creative commands and the ordering of creation.</p>
          </div>
        </details>

        <details>
          <summary>💡 Meaning and Exposition</summary>
          <div class="study-body">
            <h3>In the beginning</h3>
            <p>The opening words establish the beginning of the created order.</p>
            <h3>God</h3>
            <p>God is the central subject of the sentence. The verse
            presents Him as distinct from the created order.</p>
            <h3>Created</h3>
            <p>The Hebrew verb describes God's creative action and authority.</p>
            <h3>The heaven and the earth</h3>
            <p>This expression presents the totality of the created realm.</p>
            <h3>Main teachings</h3>
            <ul>
              <li>God is the Creator.</li>
              <li>Creation belongs to God.</li>
              <li>All created things depend upon Him.</li>
              <li>Creation calls for humility, gratitude and worship.</li>
            </ul>
          </div>
        </details>

        <details>
          <summary>🔤 Hebrew Word Study</summary>
          <div class="study-body">
            <div class="study-word">
              <h3>בְּרֵאשִׁית — Bereshit</h3>
              <p>Meaning: In the beginning.</p>
            </div>
            <div class="study-word">
              <h3>בָּרָא — Bara</h3>
              <p>Meaning: Created. A verb describing the creative action.</p>
            </div>
            <div class="study-word">
              <h3>אֱלֹהִים — Elohim</h3>
              <p>Meaning: God. The subject of the sentence.</p>
            </div>
            <div class="study-word">
              <h3>הַשָּׁמַיִם — Hashamayim</h3>
              <p>Meaning: The heavens.</p>
            </div>
            <div class="study-word">
              <h3>הָאָרֶץ — Ha'aretz</h3>
              <p>Meaning: The earth or land.</p>
            </div>
            <p>Further verified study can add Strong's numbers,
            pronunciation, grammatical parsing and lexical references.</p>
          </div>
        </details>

        <details>
          <summary>📚 Theology and Deeper Study</summary>
          <div class="study-body">
            <h3>God as Creator</h3>
            <p>Everything that exists is dependent upon God.</p>
            <h3>Creation and Christ</h3>
            <p>John 1:1–3 and Colossians 1:16–17 connect creation
            with the Word and the person of Jesus Christ.</p>
            <h3>Creation and faith</h3>
            <p>Hebrews 11:3 connects creation with faith.</p>
            <h3>Questions for reflection</h3>
            <ol>
              <li>What does this verse reveal about God's identity?</li>
              <li>What does creation reveal about God's authority?</li>
              <li>How should belief in God as Creator shape our lives?</li>
              <li>How do John 1:1–3 and Genesis 1:1 connect?</li>
            </ol>
          </div>
        </details>
      </div>

      <p class="study-small">
        Zuriel Living Word Bible — His Words.. My Life.. My Victory.
      </p>
    `;

    const main = document.querySelector("main");
    (main || document.body).appendChild(panel);

    // Searchable offline biblical dictionary.
    const dictionarySearch = panel.querySelector("#zurielDictionarySearch");
    const dictionaryResults = panel.querySelector("#zurielDictionaryResults");
    function renderDictionary(query) {
      if (!dictionaryResults) return;
      dictionaryResults.replaceChildren();
      const term = String(query || "").trim().toLowerCase();
      const matches = bibleDictionary.filter(entry =>
        !term || (entry[0] + " " + entry[1]).toLowerCase().includes(term)
      ).slice(0, 12);
      if (!matches.length) {
        const empty = document.createElement("p");
        empty.textContent = "No matching starter entry. Try a broader biblical term.";
        dictionaryResults.appendChild(empty);
        return;
      }
      matches.forEach(entry => {
        const item = document.createElement("article");
        item.className = "study-word";
        const heading = document.createElement("h3");
        heading.textContent = entry[0];
        const meaning = document.createElement("p");
        meaning.textContent = entry[1];
        item.append(heading, meaning);
        dictionaryResults.appendChild(item);
      });
    }
    if (dictionarySearch) {
      dictionarySearch.addEventListener("input", () => renderDictionary(dictionarySearch.value));
      renderDictionary("");
    }

    function readHighlights() {
      try {
        return JSON.parse(localStorage.getItem(HIGHLIGHTS_KEY)) || {};
      } catch (error) {
        return {};
      }
    }

    function highlightKey(ref) {
      return ref.book + "|" + ref.chapter + "|" + ref.verse;
    }

    function paintSavedHighlights(ref) {
      const record = readHighlights()[highlightKey(ref)] || {};
      const verseElement = findVerseElement(ref.verse);
      if (!verseElement) return;

      verseElement.style.backgroundColor = record.verseColor || "";
      verseElement.querySelectorAll(".verse-word").forEach(function (word) {
        const index = word.dataset.wordIndex;
        word.style.backgroundColor =
          record.words && record.words[index] ? record.words[index] : "";
      });
    }

    function saveHighlightRecord(ref, record) {
      const all = readHighlights();
      const key = highlightKey(ref);
      if (record && (record.verseColor || Object.keys(record.words || {}).length)) {
        all[key] = record;
      } else {
        delete all[key];
      }
      localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(all));
      paintSavedHighlights(ref);
    }

    function getCurrentHighlightRecord() {
      return readHighlights()[highlightKey(selectedReference)] || { words: {} };
    }

    function applyWordHighlight() {
      if (!selectedReference || selectedEnglishWordIndex < 0) return;
      const record = getCurrentHighlightRecord();
      record.words = record.words || {};
      record.words[String(selectedEnglishWordIndex)] = activeHighlightColor;
      saveHighlightRecord(selectedReference, record);
      document.getElementById("zurielHighlightStatus").textContent =
        "Word highlighted. Your choice is saved on this device.";
    }

    function applyVerseHighlight() {
      if (!selectedReference) return;
      const record = getCurrentHighlightRecord();
      record.verseColor = activeHighlightColor;
      saveHighlightRecord(selectedReference, record);
      document.getElementById("zurielHighlightStatus").textContent =
        "The whole verse is highlighted and saved on this device.";
    }

    function clearVerseHighlights() {
      if (!selectedReference) return;
      saveHighlightRecord(selectedReference, { words: {} });
      document.getElementById("zurielHighlightStatus").textContent =
        "Highlights cleared for this verse.";
    }

    function findVerseElement(number) {
      const verses = document.querySelectorAll("#message .verse");
      for (const item of verses) {
        const label = item.querySelector("strong");
        if (label && label.textContent.trim().replace(".", "") === String(number)) {
          return item;
        }
      }
      return null;
    }

    function highlightVerse(number) {
      document.querySelectorAll(".verse.zuriel-selected-verse")
        .forEach(item => item.classList.remove("zuriel-selected-verse"));

      const target = findVerseElement(number);
      if (target) target.classList.add("zuriel-selected-verse");
    }

    function renderTopicalConnections(ref) {
      const target = document.getElementById("zurielTopicalConnections");
      if (!target) return;
      target.replaceChildren();
      const index = window.ZurielTopicalIndex;
      if (!index || typeof index.findForReference !== "function") {
        target.textContent = "The topical index is not available yet. Reload after the study resources update.";
        return;
      }
      const reference = ref.book + " " + ref.chapter + ":" + ref.verse;
      const matches = index.findForReference(reference);
      const intro = document.createElement("p");
      intro.textContent = matches.length
        ? "Themes mapped to " + reference + ". Open any passage below to continue studying its connection."
        : "No curated topic is mapped directly to " + reference + " yet. Browse the topic directory below to explore related biblical themes.";
      target.appendChild(intro);

      function openReference(item) {
        if (typeof window.openChapter !== "function") return;
        window.openChapter(item.book, item.chapter).then(function () {
          const verseElements = document.querySelectorAll("#message .verse");
          const selected = verseElements[item.verse - 1];
          if (!selected) return;
          const verseText = selected.textContent.replace(/^\s*\d+\.?\s*/, "").trim();
          selected.scrollIntoView({ behavior: "smooth", block: "center" });
          selected.classList.add("zuriel-selected-verse");
          if (window.ZurielStudy && typeof window.ZurielStudy.openForReference === "function") {
            window.ZurielStudy.openForReference(item.book, item.chapter, item.verse, verseText, "", -1);
          }
        });
      }

      function topicCard(topic) {
        const card = document.createElement("div");
        card.className = "study-word";
        const heading = document.createElement("h3");
        heading.textContent = topic.title;
        card.appendChild(heading);
        const summary = document.createElement("p");
        summary.textContent = topic.summary;
        card.appendChild(summary);
        function addSection(title, body) {
          if (!body) return;
          const section = document.createElement("section");
          section.className = "zuriel-topic-study-section";
          const h = document.createElement("h4");
          h.textContent = title;
          const p = document.createElement("p");
          p.textContent = body;
          section.append(h, p);
          card.appendChild(section);
        }
        addSection("Biblical definition and explanation", topic.definition);
        addSection("Old Testament foundations", topic.oldTestament);
        addSection("New Testament fulfilment and development", topic.newTestament);
        if (Array.isArray(topic.languageWords) && topic.languageWords.length) {
          const section = document.createElement("section");
          section.className = "zuriel-topic-study-section";
          const h = document.createElement("h4");
          h.textContent = "Important Hebrew and Greek words";
          section.appendChild(h);
          topic.languageWords.forEach(function(word) {
            const entry = document.createElement("div");
            entry.className = "zuriel-topic-language";
            const p = document.createElement("p");
            p.textContent = word.language + " • " + word.script + " • " + word.term;
            const meaning = document.createElement("p");
            meaning.textContent = "Meaning: " + word.meaning;
            const note = document.createElement("p");
            note.textContent = word.note;
            entry.append(p, meaning, note);
            section.appendChild(entry);
          });
          card.appendChild(section);
        }
        if (Array.isArray(topic.relatedExplanations) && topic.relatedExplanations.length) {
          const section = document.createElement("section");
          section.className = "zuriel-topic-study-section";
          const h = document.createElement("h4");
          h.textContent = "Related passages and their connections";
          section.appendChild(h);
          topic.relatedExplanations.forEach(function(text) {
            const p = document.createElement("p");
            p.textContent = text;
            section.appendChild(p);
          });
          card.appendChild(section);
        }
        addSection("Practical application", topic.application);
        if (Array.isArray(topic.questions) && topic.questions.length) {
          const section = document.createElement("section");
          section.className = "zuriel-topic-study-section";
          const h = document.createElement("h4");
          h.textContent = "Questions for personal study";
          section.appendChild(h);
          const list = document.createElement("ol");
          topic.questions.forEach(function(question) {
            const li = document.createElement("li");
            li.textContent = question;
            list.appendChild(li);
          });
          section.appendChild(list);
          card.appendChild(section);
        }
        const linksHeading = document.createElement("h4");
        linksHeading.textContent = "Open the Scripture passages";
        card.appendChild(linksHeading);
        const links = document.createElement("div");
        links.className = "study-topic-links";
        topic.references.forEach(function(item) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "study-link";
          button.textContent = item.label;
          button.addEventListener("click", function() { openReference(item); });
          links.appendChild(button);
        });
        card.appendChild(links);
        return card;
      }

      if (matches.length) {
        const matchedHeading = document.createElement("h3");
        matchedHeading.textContent = "Directly mapped themes";
        target.appendChild(matchedHeading);
        matches.forEach(function (topic) { target.appendChild(topicCard(topic)); });
      }

      const directoryHeading = document.createElement("h3");
      directoryHeading.textContent = "Explore the topical library";
      target.appendChild(directoryHeading);
      const count = document.createElement("p");
      count.textContent = index.list().length + " curated topics across the Bible's 66 books";
      target.appendChild(count);
      const search = document.createElement("input");
      search.type = "search";
      search.className = "study-topic-search";
      search.placeholder = "Search a topic, theme or keyword…";
      search.setAttribute("aria-label", "Search topical Bible studies");
      search.style.width = "100%";
      search.style.boxSizing = "border-box";
      search.style.padding = "12px";
      search.style.margin = "8px 0";
      search.style.borderRadius = "10px";
      search.style.border = "1px solid var(--border, #c9c2b4)";
      target.appendChild(search);

      const directory = document.createElement("div");
      directory.className = "study-topic-links";
      target.appendChild(directory);
      function showTopics(query) {
        directory.replaceChildren();
        const found = typeof index.search === "function"
          ? index.search(query).slice(0, 80)
          : index.list().filter(function (topic) {
              return (topic.title + " " + topic.summary).toLowerCase().includes(String(query).toLowerCase());
            }).slice(0, 80);
        if (!found.length) {
          const empty = document.createElement("p");
          empty.textContent = "No matching topic yet. Try a broader word such as faith, prayer, Jesus or hope.";
          directory.appendChild(empty);
          return;
        }
        found.forEach(function (topic) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "study-link";
          button.textContent = topic.title;
          button.addEventListener("click", function () {
            const old = target.querySelector(".zuriel-open-topic");
            if (old) old.remove();
            const card = topicCard(topic);
            card.classList.add("zuriel-open-topic");
            directory.insertBefore(card, directory.firstChild);
          });
          directory.appendChild(button);
        });
      }
      search.addEventListener("input", function () { showTopics(search.value); });
      showTopics("");
    }

    // Verse-linked devotional material is kept separate from Bible wording.
    // Range references match only when the selected verse falls inside that range.
    function renderFaithResponse(ref) {
      const target = document.getElementById("zurielFaithResponse");
      if (!target) return;
      target.replaceChildren();

      const library = window.ZurielFaithContent;
      const entry = library && typeof library.list === "function"
        ? library.list().map(function(item) {
            return library.find(item.reference);
          }).filter(Boolean).find(function(item) {
            const match = item.reference.match(/^(.*)\s+(\d+):(\d+)(?:-(\d+))?$/);
            if (!match) return false;
            const book = match[1].toLowerCase().replace(/\s+/g, " ").trim();
            const selectedBook = String(ref.book).toLowerCase().replace(/\s+/g, " ").trim();
            const chapter = Number(match[2]);
            const firstVerse = Number(match[3]);
            const lastVerse = Number(match[4] || match[3]);
            return book === selectedBook &&
              chapter === Number(ref.chapter) &&
              Number(ref.verse) >= firstVerse &&
              Number(ref.verse) <= lastVerse;
          })
        : null;

      if (!entry) {
        const note = document.createElement("p");
        note.textContent = "A verse-specific prayer and faith response has not yet been curated for this passage. You can still write your own prayer and reflection in My Personal Study Journal below.";
        target.appendChild(note);
        const journalButton = document.createElement("button");
        journalButton.type = "button";
        journalButton.textContent = "Open My Prayer Journal";
        journalButton.addEventListener("click", function() {
          if (window.ZurielLibrary && typeof window.ZurielLibrary.openPrayer === "function") {
            window.ZurielLibrary.openPrayer();
          }
        });
        target.appendChild(journalButton);
        return;
      }

      const intro = document.createElement("p");
      intro.className = "study-small";
      intro.textContent = "A Scripture-connected devotional response for " + entry.reference + ". These are original study reflections, not quotations from the Bible.";
      target.appendChild(intro);

      [
        ["Prayer", entry.prayer],
        ["Declaration", entry.declaration],
        ["Affirmation", entry.affirmation],
        ["Faith confession", entry.confession],
        ["Inspiration", entry.inspiration]
      ].forEach(function(section) {
        if (!section[1]) return;
        const heading = document.createElement("h3");
        heading.textContent = section[0];
        const paragraph = document.createElement("p");
        paragraph.textContent = section[1];
        target.append(heading, paragraph);
      });

      const saveButton = document.createElement("button");
      saveButton.type = "button";
      saveButton.textContent = "Save The Light response to My Prayer Journal";
      saveButton.addEventListener("click", function() {
        const responseText = [
          "Scripture: " + entry.reference,
          "Prayer: " + (entry.prayer || ""),
          "Declaration: " + (entry.declaration || ""),
          "Affirmation: " + (entry.affirmation || ""),
          "Faith confession: " + (entry.confession || ""),
          "Inspiration: " + (entry.inspiration || "")
        ].filter(function(line) { return !line.endsWith(": "); }).join("\n\n");
        const library = window.ZurielLibrary;
        if (!library || typeof library.savePrayer !== "function") {
          saveButton.textContent = "Prayer Journal is not ready yet";
          return;
        }
        const saved = library.savePrayer(responseText, entry.reference, "The Light — " + entry.reference);
        saveButton.textContent = saved ? "Saved to My Prayer Journal ✓" : "Could not save — check device storage";
        saveButton.disabled = !!saved;
      });
      target.appendChild(saveButton);
    }

    // Build an offline study framework from the actual KJV chapter currently
    // on screen. It gives the reader immediate literary context without
    // pretending that automated prompts are a scholarly commentary.
    function renderStudyFramework(ref) {
      const verses = Array.from(document.querySelectorAll("#message .verse"));
      const selected = findVerseElement(ref.verse);
      const context = document.getElementById("zurielContext");
      const meaning = document.getElementById("zurielMeaning");
      const deeper = document.getElementById("zurielDeeperStudy");
      if (!context || !meaning || !deeper) return;

      function verseRecord(element) {
        if (!element) return null;
        const label = element.querySelector("strong");
        const number = label
          ? label.textContent.trim().replace(/\.$/, "")
          : "";
        const text = element.textContent.replace(/^\s*\d+\.?\s*/, "").trim();
        return { number: number, text: text };
      }

      function addLine(parent, headingText, bodyText) {
        const heading = document.createElement("h3");
        heading.textContent = headingText;
        parent.appendChild(heading);
        const paragraph = document.createElement("p");
        paragraph.textContent = bodyText;
        parent.appendChild(paragraph);
      }

      // A book-level reading lens helps readers notice literary form without
      // pretending that every chapter or paragraph in a book has one genre.
      function literaryReadingLens(book) {
        const groups = [
          {
            books: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],
            label: "Torah, covenant and beginnings",
            guidance: "Follow the movement of creation, promise, deliverance, covenant, worship and Israel's formation. Read laws within their covenant setting and ask what they reveal about God's character, holiness, justice and care. Distinguish the original covenant audience from how later biblical books apply these texts."
          },
          {
            books: ["Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther"],
            label: "Historical narrative",
            guidance: "Notice the setting, people, decisions, consequences and the narrator's evaluation. A recorded action is not automatically an instruction to imitate it. Ask how the episode contributes to the larger story of Israel, covenant faithfulness, leadership, exile or restoration."
          },
          {
            books: ["Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Lamentations"],
            label: "Poetry and wisdom",
            guidance: "Watch for parallel lines, images, emotion, metaphor, repetition and poetic contrast. Wisdom sayings often express a general pattern for faithful living rather than an unconditional promise for every circumstance. In lament, notice both honest grief and the movement of trust."
          },
          {
            books: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"],
            label: "Prophetic literature",
            guidance: "Identify the prophet's original audience, historical crisis and covenant concerns. Distinguish warning, judgement, symbolic action, promise and hope. Consider how later Scripture uses the prophecy, while avoiding the assumption that every image refers directly to a modern event."
          },
          {
            books: ["Matthew", "Mark", "Luke", "John"],
            label: "Gospel narrative",
            guidance: "Read each episode in the flow of Jesus' identity, teaching, signs, kingdom announcement, death and resurrection. Notice the Gospel writer's emphasis and original audience. Parallel accounts can illuminate one another, while each Gospel retains its own structure and purpose."
          },
          {
            books: ["Acts"],
            label: "Early-church narrative",
            guidance: "Follow the Spirit-empowered witness of the early church, the spread of the gospel and the inclusion of the nations. Distinguish events the book reports from practices it explicitly commends or commands, and read each episode within Acts' larger mission narrative."
          },
          {
            books: ["Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude"],
            label: "Letters and theological instruction",
            guidance: "Trace the author's argument from paragraph to paragraph. Identify the audience, occasion, problem, commands, reasons and encouragements. Read a command alongside its stated purpose and the letter's wider teaching; do not detach a sentence from the issue it addresses."
          },
          {
            books: ["Revelation"],
            label: "Apocalyptic prophecy and letter",
            guidance: "Attend to the book's first-century churches, worship scenes, symbolic visions and Old Testament imagery. Ask what the message meant to its first hearers and how it calls the church to faithful witness. Christians differ on some details of its timeline and symbols, so distinguish clear themes from debated interpretations."
          }
        ];
        const match = groups.find(group => group.books.includes(book));
        return match || {
          label: "Literary context",
          guidance: "Identify whether this passage is narrative, poetry, law, prophecy, teaching or a letter. Its literary form affects how its images, commands, promises and arguments should be understood."
        };
      }

      context.replaceChildren();
      const index = verses.indexOf(selected);
      const previous = index > 0 ? verseRecord(verses[index - 1]) : null;
      const current = verseRecord(selected);
      const next = index >= 0 && index < verses.length - 1
        ? verseRecord(verses[index + 1]) : null;

      addLine(context, "Read the passage in context",
        "Begin with " + ref.book + " chapter " + ref.chapter +
        ". Read the whole chapter before drawing a conclusion from one verse.");
      const readingLens = literaryReadingLens(ref.book);
      addLine(context, "Literary reading lens — " + readingLens.label,
        readingLens.guidance + " This is a starting point for the book; check the actual form of the selected paragraph.");
      if (previous) {
        addLine(context, "Immediately before — verse " + previous.number,
          previous.text);
      } else {
        addLine(context, "Chapter opening",
          "This is the first displayed verse of the chapter. Read the chapter heading and opening paragraph in your wider Bible study.");
      }
      addLine(context, "Selected verse — " + ref.verse,
        current ? current.text : (ref.text || "Selected verse text is not currently visible."));
      if (next) {
        addLine(context, "Immediately after — verse " + next.number,
          next.text);
      } else {
        addLine(context, "Chapter ending",
          "This is the last displayed verse of the chapter. Continue into the next chapter to follow the argument or narrative.");
      }
      addLine(context, "Context questions",
        "Who is speaking? To whom? What is happening? What comes before and after? What kind of writing is this — narrative, poetry, prophecy, teaching or a letter?");
      
      meaning.replaceChildren();
      addLine(meaning, "1. Observe what the verse says",
        "List the people, actions, repeated words, commands, promises, reasons and contrasts that are actually present in the text.");
      addLine(meaning, "2. Understand what it meant",
        "Compare the verse with its immediate context, the purpose of the book and other clear Scriptures. Do not build a teaching on an isolated phrase.");
      addLine(meaning, "3. Distinguish text from interpretation",
        "Keep the exact Bible wording separate from your explanation. Where Christians understand a passage differently, note the alternatives fairly rather than presenting one inference as a direct quotation.");
      addLine(meaning, "4. Apply it faithfully",
        "Ask what the passage reveals about God, what response it calls for, and how that response fits the whole teaching of Scripture.");

      renderTopicalConnections(ref);

      deeper.replaceChildren();
      addLine(deeper, "Whole-Bible study",
        "Read connected passages in their own context. A cross-reference can illuminate a theme, but it does not automatically mean both passages make exactly the same point.");
      addLine(deeper, "Careful interpretation",
        "Notice the original audience, historical setting, literary form and the paragraph's main idea. Separate what the passage states from what you conclude from it.");
      addLine(deeper, "Personal reflection",
        "What truth should shape your thinking? Is there an instruction to obey, a promise to trust, an example to follow or a warning to heed? Record the reason from the text.");
    }

    function loadSavedNote() {
      if (!selectedReference) return;
      const record = readNotes()[noteKey(selectedReference)];

      document.getElementById("zurielStudyTitle").value =
        record ? record.title || "" : "";
      document.getElementById("zurielStudyNote").value =
        record ? record.note || "" : "";
      document.getElementById("zurielStudyApplication").value =
        record ? record.application || "" : "";
      document.getElementById("zurielStudySaveStatus").textContent =
        record ? "Saved study loaded for this verse." : "";
    }

    function openCrossReference(item) {
      if (typeof window.openChapter !== "function") {
        document.getElementById("zurielStudySaveStatus").textContent =
          "The Bible reader is not available.";
        return;
      }

      window.openChapter(item[0], item[1]).then(function () {
        const bookSelect = document.getElementById("book");
        if (bookSelect) bookSelect.value = item[0];

        const target = findVerseElement(item[2]);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          highlightVerse(item[2]);
        }
      });
    }

    document.querySelectorAll("#zurielStudyPanel .highlight-color")
      .forEach(function (button) {
        button.addEventListener("click", function () {
          activeHighlightColor = button.dataset.highlight;
          document.querySelectorAll("#zurielStudyPanel .highlight-color")
            .forEach(item => item.setAttribute("aria-pressed", String(item === button)));
          if (selectedReference && selectedEnglishWordIndex >= 0) {
            applyWordHighlight();
            document.getElementById("zurielHighlightStatus").textContent =
              "Selected word highlighted and saved. Choose another word to study it.";
          } else {
            document.getElementById("zurielHighlightStatus").textContent =
              "Colour selected. Tap a word in the verse or highlight the whole verse.";
          }
        });
      });

    document.getElementById("zurielHighlightWholeVerse")
      .addEventListener("click", applyVerseHighlight);

    document.getElementById("zurielSaveVerseBookmark")
      .addEventListener("click", function () {
        if (!selectedReference) {
          document.getElementById("zurielBookmarkStatus").textContent =
            "Select a Scripture verse first.";
          return;
        }

        try {
          const key = "zuriel_personal_library_v1";
          const data = JSON.parse(localStorage.getItem(key) || "{}");
          const bookmarks = Array.isArray(data.bookmarks) ? data.bookmarks : [];
          const reference = selectedReference.book + " " +
            selectedReference.chapter + ":" + selectedReference.verse;
          const exists = bookmarks.some(item => item.reference === reference);
          if (!exists) {
            bookmarks.push({
              title: reference,
              reference: reference,
              text: selectedReference.text || "",
              type: "scripture",
              savedAt: new Date().toISOString()
            });
            data.bookmarks = bookmarks;
            localStorage.setItem(key, JSON.stringify(data));
          }
          document.getElementById("zurielBookmarkStatus").textContent =
            exists ? reference + " is already in My Saved Library." :
              reference + " saved to My Saved Library on this device.";
        } catch (error) {
          document.getElementById("zurielBookmarkStatus").textContent =
            "Unable to save this bookmark. Please check device storage.";
        }
      });

    document.getElementById("zurielClearVerseHighlights")
      .addEventListener("click", clearVerseHighlights);

    document.getElementById("zurielSaveStudyNote")
      .addEventListener("click", function () {
        if (!selectedReference) {
          document.getElementById("zurielStudySaveStatus").textContent =
            "Select a Bible verse before saving your study.";
          return;
        }

        try {
          const notes = readNotes();
          notes[noteKey(selectedReference)] = {
            title: document.getElementById("zurielStudyTitle").value,
            note: document.getElementById("zurielStudyNote").value,
            application: document.getElementById("zurielStudyApplication").value,
            updated: new Date().toISOString()
          };
          localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
          document.getElementById("zurielStudySaveStatus").textContent =
            "Your study has been saved on this device.";
        } catch (error) {
          document.getElementById("zurielStudySaveStatus").textContent =
            "Unable to save. Please check device storage.";
        }
      });

    document.getElementById("zurielClearStudyNote")
      .addEventListener("click", function () {
        document.getElementById("zurielStudyTitle").value = "";
        document.getElementById("zurielStudyNote").value = "";
        document.getElementById("zurielStudyApplication").value = "";
        document.getElementById("zurielStudySaveStatus").textContent =
          "Fields cleared. Previously saved notes remain saved.";
      });

    document.getElementById("zurielReturnToVerse")
      .addEventListener("click", function () {
        if (!selectedReference || typeof window.openChapter !== "function") return;

        window.openChapter(
          selectedReference.book,
          selectedReference.chapter
        ).then(function () {
          setTimeout(function () {
            const target = findVerseElement(selectedReference.verse);
            if (target) {
              highlightVerse(selectedReference.verse);
              target.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 150);
        });
      });

    document.getElementById("zurielCloseStudy")
      .addEventListener("click", function () {
        panel.style.display = "none";
      });

    window.ZurielStudy = {
      openForReference: function (book, chapter, verse, verseText, englishWord, wordIndex) {
        selectedReference = {
          book: book,
          chapter: chapter,
          verse: verse,
          text: verseText
        };
        selectedEnglishWord = englishWord || "";
        selectedEnglishWordIndex = Number.isInteger(wordIndex) ? wordIndex : -1;

        document.getElementById("zurielSelectedReference").textContent =
          book + " " + chapter + ":" + verse + " — KJV";

        document.getElementById("zurielSelectedText").textContent =
          verseText;

        document.getElementById("zurielSelectionNotice").textContent =
          "Selected verse. Study the passage in its biblical context.";
        document.getElementById("zurielSelectedEnglishWord").textContent =
          "Selected English word: " + (selectedEnglishWord || "whole verse");

        document.getElementById("zurielGenesisStudy").style.display =
          book === "Genesis" && chapter === 1 && verse === 1
            ? "block" : "none";

        panel.style.display = "block";
        highlightVerse(verse);
        renderStudyFramework(selectedReference);
        renderFaithResponse(selectedReference);
        paintSavedHighlights(selectedReference);
        loadSavedNote();

        // Open the study sections automatically so the selected verse's
        // original-language words and connected Scriptures are immediately visible.
        const originalWordsSection = document.getElementById("zurielOriginalWords");
        const originalWordsDetails = originalWordsSection
          ? originalWordsSection.closest("details") : null;
        if (originalWordsDetails) originalWordsDetails.open = true;

        const crossReferenceList = document.getElementById("zurielCrossReferenceList");
        const crossReferenceDetails = crossReferenceList
          ? crossReferenceList.closest("details") : null;
        if (crossReferenceDetails) crossReferenceDetails.open = true;

        loadOriginalWords(selectedReference);
        loadRelatedScriptures(selectedReference);

        panel.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Bring the expanded word-study section into view inside the study panel.
        window.setTimeout(function () {
          if (originalWordsDetails) {
            originalWordsDetails.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });
          }
        }, 120);
      }
    };
  }

  createStudyPanel();

})();

