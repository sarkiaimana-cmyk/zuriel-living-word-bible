
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
    ["Passover","The memorial of Israel's deliverance from slavery in Egypt, marked by the lamb and the meal commanded in Exodus. The New Testament connects Passover imagery with Jesus' death, while retaining the original story's meaning. See Exodus 12; Luke 22:7-20; 1 Corinthians 5:7-8."],
    ["Beatitudes","The name commonly given to Jesus' blessings at the beginning of the Sermon on the Mount. They describe the character and hope of those who belong to God's kingdom. See Matthew 5:1-12; Luke 6:20-23."],
    ["Diaspora","The scattering or residence of Jewish communities outside the land of Israel. Diaspora settings shape parts of the biblical story and the New Testament mission. See Esther 2:5-7; Acts 2:5-11; James 1:1."],
    ["Epistle","A letter, especially one written to instruct, encourage or correct a Christian community or individual. Read each epistle with attention to its sender, recipients, occasion and argument. See Romans 1:1-7; Philippians 1:1-11."],
    ["Fasting","Voluntarily abstaining from food for a time, often as an expression of seeking God, grief or repentance. Scripture rejects fasting used to display pride or neglect justice. See Isaiah 58:3-12; Matthew 6:16-18; Acts 13:2-3."],
    ["Hermeneutics","The principles and practice of interpreting texts. Responsible Bible interpretation considers literary context, historical setting, genre, language and the place of a passage in the whole biblical story."],
    ["Hosanna","An expression from Hebrew meaning 'save, please' that became a cry of praise and appeal. The crowds use it when welcoming Jesus in Jerusalem. See Psalm 118:25-26; Matthew 21:9; Mark 11:9-10."],
    ["Imputation","A theological term for crediting or reckoning something to someone's account. Paul uses accounting language when discussing faith and righteousness; compare translations and arguments in context. See Genesis 15:6; Romans 4:1-8; 2 Corinthians 5:19."],
    ["Liturgy","An ordered pattern of public worship. Biblical worship includes prayer, Scripture, praise, confession, thanksgiving and the gathered community; Christian traditions organise these elements in different ways. See Nehemiah 8:1-8; Acts 2:42; Colossians 3:16."],
    ["Messianic","Relating to the Messiah or the hope of God's anointed deliverer and king. Claims that a passage is messianic should be tested against its original context and how later Scripture uses it. See Psalm 2; Isaiah 11:1-10; Luke 24:25-27."],
    ["Theophany","A visible or otherwise perceptible manifestation of God's presence in a biblical narrative. Interpret each account according to its literary setting and the way the text describes God's presence. See Genesis 18:1-8; Exodus 3:1-6; 19:16-20."],
    ["Covenant Faithfulness","God's steadfast commitment to the promises He makes, and the call for His people to live faithfully in response. Trace the theme across the covenants rather than treating every promise as identical. See Genesis 15:1-6; Exodus 34:6-7; Deuteronomy 7:9; Luke 22:20; Hebrews 8:6-13."],
    ["The Fear of the Lord","Reverent awe that shapes worship, wisdom and obedience. Biblical fear of God is not simply panic; its meaning is clarified by each passage and by God's gracious character. See Proverbs 1:7; 9:10; Ecclesiastes 12:13; Acts 9:31."],
    ["The Presence of God","Scripture speaks of God's presence as universal and also as a special nearness with His people. Biblical accounts invite trust and reverence, not attempts to control God. See Exodus 33:12-17; Psalm 139:7-12; Matthew 28:20; Acts 17:24-28."],
    ["The Love of God","God's love is shown in His character, covenant mercy and saving action in Christ. Biblical love should be read alongside holiness, justice and truth. See Deuteronomy 7:7-9; Psalm 136; John 3:16; Romans 5:6-8; 1 John 4:7-12."],
    ["The Holiness of God","God's utter uniqueness and moral purity, which call His people to worship and holy conduct. The biblical theme includes both reverent approach and ethical responsibility. See Isaiah 6:1-8; Leviticus 19:1-2; 1 Peter 1:14-16; Revelation 4:8."],
    ["The Wisdom of God","God's perfect wisdom in creation, redemption and judgment. Scripture invites people to seek wisdom humbly and to recognise its fullness in Christ. See Proverbs 8; Romans 11:33-36; 1 Corinthians 1:18-25; Colossians 2:2-3."],
    ["The Grace of God in Christ","God's undeserved favour and saving action revealed through Jesus. Grace is not permission to persist in harm; it trains believers toward godliness and good works. See John 1:14-17; Romans 3:21-26; Ephesians 2:8-10; Titus 2:11-14."],
    ["Life in the Spirit","The pattern of life shaped by the Holy Spirit, including freedom from sin's rule, love, holiness and hope. Read Paul's teaching in its full argument, not as a promise of effortless living. See Romans 8:1-17; Galatians 5:16-26; Ephesians 5:8-21."],
    ["Prayer in Jesus' Name","Prayer offered in relationship with Jesus and in alignment with His character and purposes. The phrase is not a verbal formula guaranteeing every requested outcome. See John 14:12-14; 15:7-16; 16:23-27; 1 John 5:14-15."],
    ["The Peace of Christ","The peace Christ gives includes reconciliation with God and a new way of relating to others amid trouble. It does not mean believers never experience grief or anxiety. See John 14:27; 16:33; Romans 5:1; Colossians 3:12-15; Philippians 4:6-9."],
    ["Forgiving One Another","Christian forgiveness reflects the mercy received from God while allowing truthful boundaries, accountability and protection where needed. Forgiveness does not require pretending harm did not occur. See Matthew 6:12-15; 18:21-35; Luke 17:3-4; Ephesians 4:31-32."],
    ["Marriage and Covenant","Biblical teaching on marriage includes covenant faithfulness, mutual care and responsibility. Interpret individual passages in their historical and literary settings and read them alongside Christlike love. See Genesis 2:18-25; Matthew 19:3-9; Ephesians 5:21-33; 1 Peter 3:1-7."],
    ["Parenting and Formation","Scripture calls families to teach, nurture and model faith with patience and integrity. These texts should encourage care, never justify abuse or harshness. See Deuteronomy 6:4-9; Psalm 78:1-7; Proverbs 22:6; Ephesians 6:1-4; Colossians 3:21."],
    ["Justice for the Vulnerable","God's people are repeatedly commanded to act justly toward the poor, foreigner, widow and orphan. Worship and justice belong together in the prophetic witness. See Deuteronomy 10:17-19; Isaiah 1:16-17; Micah 6:8; James 1:27; 2:1-9."],
    ["Work and Vocation","Work can be a place of service, stewardship and honest provision. Scripture also warns against exploitation, greed and making work an idol. See Genesis 2:15; Proverbs 14:23; Colossians 3:22-24; 2 Thessalonians 3:6-12."],
    ["Suffering and Christian Hope","The Bible gives language for lament and teaches hope grounded in God's presence and the resurrection. It does not promise that every suffering will end immediately or that pain is evidence of weak faith. See Psalm 13; Romans 8:18-39; 2 Corinthians 1:3-7; 1 Peter 1:3-9."],
    ["Resurrection Hope","The resurrection of Jesus is central to Christian proclamation and the promised future resurrection of His people. Paul's argument in 1 Corinthians 15 should guide interpretation of related passages. See Luke 24:1-12; John 11:25-26; 1 Corinthians 15:12-28, 50-58; 1 Thessalonians 4:13-18."],
    ["The New Heavens and New Earth","The biblical hope of God's final renewal, where righteousness dwells and death and mourning are overcome. Read prophetic imagery with attention to genre and its New Testament fulfilment. See Isaiah 65:17-25; 66:22; 2 Peter 3:13; Revelation 21:1-5; 22:1-5."],
    ["The Kingdom of God","God's reign and saving rule announced by Jesus. The kingdom is both present in Jesus' ministry and awaited in its fullness; read each passage in its own setting. See Mark 1:14-15; Matthew 6:9-10; Luke 17:20-21; Romans 14:17."],
    ["Discipleship and Following Jesus","Following Jesus involves trust, learning, obedience, service and costly allegiance. Discipleship is shaped by the cross and by love for neighbour. See Mark 8:34-38; Luke 9:23-26; John 13:12-17; 1 Peter 2:21."],
    ["The Church as the Body of Christ","The church is described as Christ's body, a community with diverse members and gifts called to unity and mutual care. See Romans 12:3-8; 1 Corinthians 12:12-27; Ephesians 4:1-16; Colossians 1:18."],
    ["The Great Commission","Jesus sends His disciples to make disciples among all nations, baptising and teaching them to obey His commands. Mission includes witness, teaching and Christ's continuing presence. See Matthew 28:16-20; Luke 24:44-49; Acts 1:6-8."],
    ["The Gospel of Jesus Christ","The gospel announces God's saving action through Jesus' death and resurrection. Study the message in its apostolic context and distinguish its central claims from later summaries. See Mark 1:1; Romans 1:1-5; 1 Corinthians 15:1-8; Galatians 1:6-9."],
    ["Repentance and Renewal","Biblical repentance turns from sin toward God and is joined to renewed life. Its fruit is visible in changed conduct, but it is not a way to earn grace. See Joel 2:12-13; Mark 1:14-15; Acts 3:19; 2 Corinthians 7:9-11."],
    ["The Fruit of the Spirit in Daily Life","Paul describes Spirit-shaped character through love, joy, peace, patience, kindness, goodness, faithfulness, gentleness and self-control. These qualities belong together and grow in a life led by the Spirit. See Galatians 5:16-26; John 15:1-8."],
    ["Spiritual Gifts and Service","The Spirit gives gifts for the common good and the building up of the church. Gifts are to be exercised in love, order and humility, not as measures of personal worth. See Romans 12:3-8; 1 Corinthians 12-14; 1 Peter 4:10-11."],
    ["The Lord's Supper","Jesus gives the meal as a remembrance and proclamation of His death; the New Testament also connects it with communion and responsibility toward fellow believers. See Matthew 26:26-29; Luke 22:14-20; 1 Corinthians 10:16-17; 11:23-29."],
    ["Baptism and New Life","Baptism is closely associated in the New Testament with faith, repentance, union with Christ and entry into the believing community. Interpret passages with attention to their audience and argument. See Matthew 28:19; Acts 2:38-41; Romans 6:1-4; Colossians 2:12."],
    ["The Armor of God","Ephesians 6 uses the image of spiritual armor to call believers to stand firm in God's strength, truth, righteousness, faith, salvation, God's word and prayer. The passage is not a formula for fear or hostility toward people. See Ephesians 6:10-20."],
    ["Overcoming Temptation","Scripture recognises temptation and calls believers to watchfulness, prayer and reliance on God's faithfulness. Jesus' own testing and the wider biblical witness should shape application. See Matthew 4:1-11; 1 Corinthians 10:12-13; Hebrews 4:14-16; James 1:12-15."],
    ["Contentment and Generosity","Christian contentment rests in God's care and is expressed through freedom from greed and open-handed generosity. It does not excuse poverty or injustice. See Proverbs 30:7-9; Luke 12:13-21; Philippians 4:10-13; 1 Timothy 6:6-10, 17-19."],
    ["Wisdom in Speech","Scripture treats words as powerful for truth, encouragement, peace and harm. Wisdom calls for truthful, gracious speech and restraint. See Proverbs 15:1-4; Matthew 12:33-37; Ephesians 4:25-32; James 3:1-12."],
    ["Lament and Honest Prayer","Biblical lament brings grief, confusion and questions before God while often holding on to trust. Lament is a faithful form of prayer, not a failure of faith. See Psalms 13; 22; 42-43; Lamentations 3:19-26; Mark 15:33-39."],
    ["God's Guidance and Discernment","Scripture calls believers to seek wisdom, test teaching and make decisions shaped by God's revealed character and word. Not every inner impression should be treated as a divine command. See Proverbs 3:5-6; Romans 12:1-2; 1 Thessalonians 5:19-22; James 1:5."],
    ["Hospitality and Welcome","Biblical hospitality makes room for others with generosity and practical care. The New Testament connects welcome with service to Christ and the unity of the church. See Genesis 18:1-8; Luke 14:12-14; Romans 12:9-13; Hebrews 13:1-2."],
    ["The Return of Christ","The New Testament calls believers to hope, readiness and faithful living as they await Christ's appearing. Interpret prophetic imagery carefully and avoid setting dates. See Matthew 24:36-44; Acts 1:9-11; 1 Thessalonians 4:13-18; 2 Peter 3:8-14."],
    ["The Trinity","Study the Bible's witness to the Father, Son and Holy Spirit, holding together divine unity and personal distinction without forcing later terminology into individual verses. See Matthew 28:19; John 1:1-3; 2 Corinthians 13:14."],
    ["The Deity of Christ","Trace New Testament passages that speak of Jesus' divine identity, works, worship and relationship with the Father. Read each text in its literary setting. See John 1:1-18; John 20:28; Colossians 1:15-20; Hebrews 1:1-12."],
    ["The Humanity of Christ","The Gospels present Jesus as truly human: born, embodied, tempted, suffering and dependent in prayer, while remaining without sin. See Luke 2:1-20; John 4:6; Hebrews 2:14-18; Hebrews 4:15."],
    ["The Incarnation","The incarnation concerns the eternal Word taking human nature. Explore the Gospel and apostolic accounts without reducing the mystery to a slogan. See John 1:14; Romans 8:3; Philippians 2:5-11; 1 John 4:2."],
    ["The Virgin Birth","Matthew and Luke narrate Jesus' conception and birth, connecting it with God's initiative and the fulfilment of promise. Compare their distinct narrative emphases. See Matthew 1:18-25; Luke 1:26-38; Luke 2:1-20."],
    ["The Resurrection of Jesus","The resurrection is central to apostolic proclamation and Christian hope. Study the witnesses, the empty tomb, appearances and the meaning Paul draws from it. See Matthew 28; Luke 24; John 20-21; 1 Corinthians 15."],
    ["The Ascension of Jesus","The ascension marks Jesus' exaltation and continuing reign, and frames the church's witness and hope. See Luke 24:50-53; Acts 1:6-11; Ephesians 1:20-23; Hebrews 4:14."],
    ["The High Priestly Ministry of Christ","Hebrews portrays Jesus as the great high priest whose once-for-all offering and continuing intercession give believers confidence to approach God. See Hebrews 4:14-16; 7:23-28; 9:11-14; 10:19-25."],
    ["The Cross of Christ","The New Testament interprets Jesus' death through sacrifice, reconciliation, victory, example and covenant. Let each passage explain its own emphasis. See Mark 10:45; Romans 3:21-26; Colossians 2:13-15; 1 Peter 2:24."],
    ["The Blood of Christ","Biblical references to Christ's blood connect His death with covenant, forgiveness, redemption and access to God. Study the imagery in its sacrificial and covenant settings. See Matthew 26:28; Romans 5:9; Ephesians 1:7; Hebrews 9:11-22."],
    ["Reconciliation with God","The gospel announces restored relationship with God through Christ, and calls those reconciled to become agents of reconciliation. See Romans 5:1-11; 2 Corinthians 5:17-21; Colossians 1:19-23."],
    ["Propitiation and Atonement","Study how Scripture describes sin, sacrifice, God's holiness and the means of atonement. Translation choices differ; compare passages and avoid treating one English term as the whole doctrine. See Leviticus 16; Romans 3:23-26; Hebrews 2:17; 1 John 2:1-2."],
    ["Justification by Faith","Paul uses justification language to explain right standing before God through faith, not human boasting. Follow the argument in Romans and Galatians. See Romans 3:21-31; 4:1-8; Galatians 2:15-21; 3:6-14."],
    ["Adoption into God's Family","Adoption describes believers' received status and belonging as God's children, with the Spirit and future inheritance in view. See John 1:12-13; Romans 8:14-17; Galatians 4:4-7; Ephesians 1:3-6."],
    ["Glorification","Glorification points to the completion of salvation when believers share in resurrection life and are conformed to Christ. See Romans 8:17-30; 1 Corinthians 15:42-57; Philippians 3:20-21; 1 John 3:1-3."],
    ["Perseverance in Faith","Scripture encourages endurance and warns against turning away. Study assurance, warning passages and God's keeping power together rather than isolating one strand. See John 10:27-30; Hebrews 3:12-14; 6:9-12; 1 Peter 1:3-9."],
    ["Assurance of Salvation","Assurance is grounded in Christ's promise and work, the Spirit's witness and the fruit of faith. It is not presumption or a claim to sinless perfection. See John 5:24; Romans 8:15-16; 1 John 5:11-13."],
    ["The New Covenant","The prophets promise a covenant marked by God's law written on hearts and forgiveness; Jesus connects His death with this covenant. See Jeremiah 31:31-34; Ezekiel 36:25-27; Luke 22:20; Hebrews 8."],
    ["The Promises of God","Biblical promises must be read according to their recipients, covenant setting and fulfilment in the wider story. Distinguish enduring promises from specific instructions or historical assurances. See Genesis 12:1-3; Joshua 21:43-45; 2 Corinthians 1:20; Hebrews 10:23."],
    ["The Faithfulness of God in Trials","Scripture portrays God's faithfulness amid suffering without promising a trouble-free life. Explore lament, endurance and hope together. See Psalm 34:17-19; Isaiah 43:1-3; Romans 8:31-39; 2 Corinthians 4:7-18."],
    ["The Sovereignty of God and Human Responsibility","Biblical texts affirm God's rule while also addressing meaningful human choices and accountability. Read each passage in context and resist simplistic formulas. See Genesis 50:20; Proverbs 16:1-9; Acts 2:22-24; Philippians 2:12-13."],
    ["The Providence of God","Providence concerns God's sustaining and guiding care through ordinary and extraordinary events. Biblical narratives often reveal this retrospectively. See Genesis 45:4-8; Ruth 2:1-12; Matthew 6:25-34; Romans 8:28."],
    ["The Holiness of God's Name","God's name represents His revealed character and reputation. Scripture calls His people to honour that name in worship and conduct. See Exodus 3:13-15; Leviticus 22:31-33; Ezekiel 36:20-23; Matthew 6:9."],
    ["The Glory of God in Creation","Creation displays God's power and glory and invites gratitude and worship. The created world is witness, not a substitute for God's revealed word. See Psalm 19:1-6; Psalm 104; Romans 1:19-20; Revelation 4:11."],
    ["The Wisdom of Proverbs","Proverbs offers practical wisdom for life under God's fear, using sayings that generally describe wise patterns rather than unconditional guarantees. See Proverbs 1:1-7; 3:1-12; 10:1; 26:4-5."],
    ["The Fear of the Lord in Practice","The fear of the Lord combines reverence, humility and obedient trust. Study how it shapes worship, decisions, speech and justice. See Deuteronomy 10:12-13; Psalm 111:10; Proverbs 8:13; Ecclesiastes 12:13."],
    ["The Word of God as Nourishment","Scripture uses food imagery to describe receiving God's instruction and depending on His word. Read the images within their original settings. See Deuteronomy 8:3; Jeremiah 15:16; Matthew 4:4; 1 Peter 2:2."],
    ["Meditation on Scripture","Biblical meditation involves attentive reflection on God's instruction, not emptying the mind. It connects remembrance with obedience and worship. See Joshua 1:8; Psalm 1:1-3; Psalm 119:97-105."],
    ["Hearing and Doing the Word","Jesus and the apostles distinguish hearing God's word from merely listening; genuine reception bears fruit in practice. See Matthew 7:24-27; Luke 8:15; James 1:22-25."],
    ["Testing the Spirits","The New Testament calls believers to discern spiritual claims by their confession of Christ and faithfulness to apostolic teaching. See Matthew 7:15-20; 1 Corinthians 12:3; 1 John 4:1-6."],
    ["False Teaching and Discernment","Scripture warns that persuasive teaching can distort the gospel and exploit communities. Test claims carefully and respond with truth and humility. See Acts 20:28-31; Galatians 1:6-9; Colossians 2:8; 2 Peter 2:1-3."],
    ["Christian Freedom","Freedom in Christ is not permission for selfishness; it is freedom to serve through love and live by the Spirit. See John 8:31-36; Galatians 5:1, 13-15; 1 Peter 2:16."],
    ["Conscience and Christian Decisions","The New Testament teaches care for conscience and consideration of other believers in disputable matters. Apply principles without turning personal preference into universal law. See Romans 14:1-23; 1 Corinthians 8:1-13; 10:23-33."],
    ["Unity in the Church","Christian unity is rooted in one Lord, one faith and one Spirit, while allowing diversity of gifts and backgrounds. See John 17:20-23; Ephesians 4:1-6; Philippians 2:1-4."],
    ["Reconciliation Between Believers","Jesus and the apostles call believers to pursue peace, address wrong honestly and forgive as recipients of grace. See Matthew 5:23-24; 18:15-20; Ephesians 4:31-32; Colossians 3:12-15."],
    ["Church Leadership and Shepherding","New Testament leadership is marked by service, character, teaching and care rather than domination. Compare Jesus' model with apostolic instructions. See Mark 10:42-45; Acts 20:17-35; 1 Timothy 3:1-13; 1 Peter 5:1-4."],
    ["Servant Leadership","Jesus redefines greatness through humble service and self-giving love. Study how this shapes authority in the church, family and public life. See Mark 9:33-37; 10:35-45; John 13:1-17; Philippians 2:3-8."],
    ["Encouraging One Another","Believers are instructed to strengthen one another through truth, hope and practical care. Encouragement is communal discipleship, not empty praise. See 1 Thessalonians 5:11-14; Hebrews 3:12-13; 10:23-25."],
    ["Bearing One Another's Burdens","Christian community shares burdens while each person remains responsible for faithful living. See Romans 15:1-7; Galatians 6:1-5; James 5:13-16."],
    ["Church Discipline and Restoration","Biblical correction aims at truth, protection and restoration, and must be practised with humility and due care. See Matthew 18:15-20; 1 Corinthians 5:1-13; Galatians 6:1; 2 Corinthians 2:5-11."],
    ["The Priesthood of All Believers","The New Testament describes God's people as a priestly community offering spiritual sacrifices and proclaiming His works. See Exodus 19:5-6; 1 Peter 2:4-10; Revelation 1:5-6."],
    ["Worship in Spirit and Truth","Jesus teaches that worship is not confined to a location but is offered in Spirit and truth. Scripture also connects worship with whole-life obedience. See John 4:19-24; Romans 12:1-2; Philippians 3:3."],
    ["Praise in Every Season","Biblical praise can coexist with grief and difficulty; it remembers God's character and mighty acts. See Psalm 34:1-8; 42:5-11; Habakkuk 3:17-19; Acts 16:22-26."],
    ["Thanksgiving and Gratitude","Thanksgiving recognises God's gifts and grace and reshapes the believer's perspective. It should be sincere and compatible with honest lament. See Psalm 100; Luke 17:11-19; Colossians 3:15-17; 1 Thessalonians 5:16-18."],
    ["Prayer of Petition","Petition brings needs before God with trust and submission, following Jesus' teaching and example. See Matthew 6:9-13; Luke 11:1-13; Philippians 4:6-7; 1 John 5:14-15."],
    ["Prayer of Intercession","Intercession is prayer on behalf of others, including leaders, the church and those in need. See Exodus 32:11-14; John 17; Ephesians 6:18-20; 1 Timothy 2:1-4."],
    ["Persistence in Prayer","Jesus encourages persistent prayer and trust in God's justice and goodness. Persistence is not a technique for controlling God. See Luke 11:5-13; 18:1-8; Romans 12:12; Colossians 4:2."],
    ["Fasting and Spiritual Focus","Biblical fasting is associated with seeking God, repentance, grief and focused prayer. Jesus warns against using it for public display. See Isaiah 58:3-12; Matthew 6:16-18; Acts 13:1-3."],
    ["Silence and Solitude with God","Jesus sometimes withdrew to pray, showing the value of quiet communion amid active service. Solitude should support love and obedience, not become isolation from responsibility. See Mark 1:35; Luke 5:15-16; 6:12."],
    ["Waiting on the Lord","Waiting in Scripture involves hope, patience and faithful action while trusting God's timing. See Psalm 27:13-14; 40:1-3; Isaiah 40:28-31; James 5:7-11."],
    ["Forgiveness and Repentance","Forgiveness is central to the gospel and Christian relationships, while repentance names wrongdoing and turns toward changed life. See Matthew 6:12-15; Luke 17:3-4; Acts 2:37-38; Ephesians 4:32."],
    ["Loving Your Neighbour","Love of neighbour is a central command that includes practical mercy, fairness and concern beyond one's immediate circle. See Leviticus 19:18, 33-34; Luke 10:25-37; Romans 13:8-10; James 2:8."],
    ["Loving Your Enemies","Jesus calls disciples to love enemies and pray for persecutors, reflecting the Father's generosity. This does not require enabling abuse or abandoning justice. See Matthew 5:43-48; Luke 6:27-36; Romans 12:17-21."],
    ["Compassion for the Poor","The Bible repeatedly calls God's people to care for the poor and vulnerable through justice, generosity and practical provision. See Deuteronomy 15:7-11; Proverbs 19:17; Luke 4:18; James 2:14-17."],
    ["Care for Widows and Orphans","Scripture identifies care for widows and orphans as a test of covenant faithfulness and genuine religion. See Deuteronomy 10:17-19; Isaiah 1:16-17; James 1:27; 1 Timothy 5:3-16."],
    ["Justice and Righteous Judgment","Biblical justice requires truthful judgment, impartiality and protection of the vulnerable. See Deuteronomy 16:18-20; Micah 6:8; Amos 5:21-24; James 2:1-9."],
    ["Peacemaking","Peacemaking seeks reconciliation and justice rather than simply avoiding disagreement. Jesus calls peacemakers blessed. See Matthew 5:9; Romans 12:18; 14:19; James 3:17-18."],
    ["Truthfulness and Integrity","Scripture calls God's people to truthful speech, honest dealings and integrity in private and public life. See Leviticus 19:11-13; Proverbs 12:22; Ephesians 4:25; Colossians 3:9."],
    ["Humility Before God","Humility recognises dependence on God and values others without self-exaltation. See Micah 6:8; Luke 18:9-14; Philippians 2:3-8; James 4:6-10."],
    ["Patience with Others","Patience bears with others in love and reflects God's own patience. It does not mean ignoring serious harm or refusing needed boundaries. See 1 Corinthians 13:4-7; Ephesians 4:1-3; Colossians 3:12-13."],
    ["Kindness and Goodness","The biblical virtues of kindness and goodness express practical care shaped by God's character. See Romans 2:4; 11:22; Galatians 5:22; Ephesians 4:32."],
    ["Gentleness and Meekness","Gentleness is strength governed by humility and love, especially in correction and witness. See Matthew 11:28-30; Galatians 6:1; 2 Timothy 2:24-25; 1 Peter 3:15-16."],
    ["Self-Control","Self-control is part of Spirit-shaped character and wise discipline. Scripture applies it to speech, desires, leadership and perseverance. See Proverbs 25:28; 1 Corinthians 9:24-27; Galatians 5:22-23; 2 Peter 1:5-8."],
    ["Courage and Boldness","Biblical courage rests in God's presence and truth, not in denial of danger. See Joshua 1:6-9; Psalm 27:1; Acts 4:23-31; 2 Timothy 1:7-8."],
    ["Fear and Anxiety","Scripture acknowledges fear and invites people to bring concerns to God while taking wise action. Comfort passages should not be used to shame those who struggle. See Psalm 56:3-4; Matthew 6:25-34; Philippians 4:6-9; 1 Peter 5:6-7."],
    ["Grief and Mourning","The Bible makes room for tears and mourning while offering hope in God's presence and resurrection. See Psalms 6; 31; 42; 88; 130; John 11:17-44; Romans 12:15; 1 Thessalonians 4:13-18."],
    ["Suffering for Righteousness","The New Testament prepares believers for opposition and calls them to faithful witness without retaliation. See Matthew 5:10-12; John 15:18-21; 1 Peter 3:13-17; 4:12-19."],
    ["Persecution and Endurance","Biblical teaching on persecution combines sober realism, prayer for enemies, courage and hope in God's justice. See Matthew 10:16-25; Acts 5:40-42; 2 Timothy 3:10-12; Revelation 2:8-11."],
    ["Comfort in Affliction","God's comfort sustains people in suffering and equips them to comfort others. See Psalm 23; Isaiah 40:1-11; 2 Corinthians 1:3-7; 2 Thessalonians 2:16-17."],
    ["Hope in the Resurrection","Christian hope rests on Jesus' resurrection and anticipates the resurrection of the dead. See John 11:23-27; 1 Corinthians 15:12-28; 1 Thessalonians 4:13-18."],
    ["The Final Judgment","Scripture teaches that God will judge with justice and that human lives matter. Study judgment alongside grace, accountability and the work of Christ. See Matthew 25:31-46; John 5:24-29; Romans 2:5-16; Revelation 20:11-15."],
    ["The New Creation","The biblical story ends not with escape from creation but with God's renewed heavens and earth, where righteousness dwells. See Isaiah 65:17-25; Romans 8:18-25; 2 Peter 3:13; Revelation 21-22."],
    ["Heaven and Eternal Life","Eternal life is both present knowledge of God through Christ and future life in God's renewed creation. Read the different biblical images carefully. See John 17:3; 1 Corinthians 15:50-58; Revelation 21:1-4."],
    ["Hell and Final Separation","Jesus and the apostles give serious warnings about final judgment. Interpret the different images in their contexts and avoid speculative detail beyond Scripture. See Matthew 10:28; 25:31-46; Mark 9:42-48; Revelation 20:11-15."],
    ["Angels as God's Servants","Angels appear as messengers and servants in God's purposes; Scripture directs worship to God rather than angels. See Psalm 103:20-21; Luke 1:11-20; Hebrews 1:5-14; Revelation 22:8-9."],
    ["Spiritual Conflict and Christ's Victory","The New Testament describes spiritual opposition but centres confidence on Christ's victory. Believers are called to truth, prayer and steadfastness, not fear or obsession. See Colossians 2:13-15; Ephesians 6:10-18; 1 John 4:4; Revelation 12:10-11."],
    ["Resisting the Devil","Scripture calls believers to resist evil through submission to God, sober vigilance and faith. See Matthew 4:1-11; James 4:7-10; 1 Peter 5:8-9; Ephesians 6:11-13."],
    ["Freedom from Sin's Dominion","Paul teaches that union with Christ changes believers' relationship to sin's rule and calls them to offer themselves to God. See Romans 6:1-14; 8:1-4; Galatians 5:16-25."],
    ["Confession of Sin","Confession acknowledges sin truthfully before God and, where appropriate, seeks repair with others. See Psalm 32:1-5; 51; Proverbs 28:13; 1 John 1:5-10."],
    ["Healing and God's Compassion","The Gospels show Jesus healing with compassion, while the wider Bible includes prayer, suffering and patient care. Avoid promising that every illness will be healed immediately. See Psalm 103:1-5; Mark 1:29-34; James 5:13-16; 2 Corinthians 12:7-10."],
    ["Jesus the Great Physician","Jesus' healing ministry reveals compassion and points to the kingdom, while also addressing forgiveness and restoration. See Mark 2:1-12; 5:21-43; Luke 7:18-23."],
    ["Faith and Healing","The Bible records healing through God's power and calls for prayer, but faith should not be used to blame sick people. Read healing accounts alongside lament and the theology of suffering. See Mark 9:14-29; John 9:1-7; James 5:13-16; 2 Corinthians 12:7-10."],
    ["The Holy Spirit and New Birth","Jesus describes new birth as the Spirit's work, and the apostles connect renewal with God's mercy. See John 3:1-8; Titus 3:4-7; 1 Peter 1:3, 23."],
    ["The Holy Spirit and Prayer","The Spirit helps believers in weakness and prayer, and forms a community that cries to God as Father. See Romans 8:14-27; Galatians 4:6; Jude 20-21."],
    ["The Holy Spirit and Witness","The Spirit empowers witness to Jesus and gives courage to speak the gospel. See Luke 24:48-49; Acts 1:8; 4:29-31; 1 Corinthians 2:1-5."],
    ["The Holy Spirit and Unity","The Spirit creates and sustains the unity of Christ's body while distributing diverse gifts. See 1 Corinthians 12:4-13; Ephesians 2:18-22; 4:1-6."],
    ["Walking by the Spirit","Walking by the Spirit means a life shaped by the Spirit rather than ruled by sinful desires. Read Paul's contrasts and practical instructions. See Galatians 5:16-26; Romans 8:1-14."],
    ["Grieving the Holy Spirit","Ephesians warns believers not to grieve the Spirit, connecting this with speech, anger, forgiveness and community life. See Ephesians 4:25-32; Isaiah 63:10."],
    ["The Gifts of Teaching","Teaching serves the church by explaining and applying God's word faithfully. It requires care, humility and accountability. See Romans 12:6-8; 1 Corinthians 12:28; James 3:1."],
    ["The Gift of Service","Service is a Spirit-enabled contribution that meets practical needs and strengthens the community. See Romans 12:6-8; 1 Peter 4:10-11; Acts 6:1-7."],
    ["The Gift of Giving","The New Testament commends generous giving that is willing, proportionate and cheerful, not coerced or showy. See Romans 12:8; 2 Corinthians 8-9; Acts 4:32-37."],
    ["The Gift of Mercy","Mercy involves attentive compassion toward those in distress. It should be exercised with sincerity and wisdom. See Romans 12:8; Luke 10:30-37; James 2:13."],
    ["Prophecy in the Church","New Testament prophecy is to build up, encourage and comfort, and its exercise is to be weighed by the community. See 1 Corinthians 14:1-5, 26-33; 1 Thessalonians 5:19-22."],
    ["Tongues and Interpretation","Paul discusses tongues within ordered gathered worship, emphasising intelligibility, interpretation and the building up of the church. See Acts 2:1-13; 1 Corinthians 12-14."],
    ["Discernment of Gifts","Spiritual gifts are given for service and should be evaluated by their faithfulness to Christ and their benefit to the community. See 1 Corinthians 12:1-11; 13:1-13; 14:12, 26."],
    ["Marriage as Covenant","The Bible presents marriage as a covenantal union marked by faithfulness, mutual care and responsibility. Study creation, Jesus' teaching and apostolic counsel together. See Genesis 2:18-25; Matthew 19:3-9; Ephesians 5:21-33."],
    ["Love and Respect in Marriage","New Testament household teaching calls spouses to mutual honour and sacrificial love. Read the instructions in their historical context and never use them to justify abuse. See Ephesians 5:21-33; Colossians 3:18-19; 1 Peter 3:1-7."],
    ["Singleness and Faithfulness","The New Testament honours singleness as a meaningful vocation and calls all believers to devoted service. See Matthew 19:10-12; 1 Corinthians 7:7-9, 25-35."],
    ["Parenting with Wisdom","Scripture calls parents to teach, nurture and guide children without provoking or crushing them. See Deuteronomy 6:4-9; Proverbs 22:6; Ephesians 6:1-4; Colossians 3:21."],
    ["Children in the Kingdom","Jesus welcomes children and uses them to challenge status and self-importance. The church is called to protect and value them. See Mark 9:33-37; 10:13-16; Matthew 18:1-6."],
    ["Honouring Parents","The command to honour parents is part of covenant life and is repeated in New Testament instruction. Honour does not mean accepting abuse or abandoning wise boundaries. See Exodus 20:12; Deuteronomy 5:16; Ephesians 6:1-3."],
    ["Family Prayer and Worship","Biblical households are called to remember God's works and form children in faith through ordinary life. See Deuteronomy 6:4-9; Joshua 24:14-15; Acts 10:1-4; 16:31-34."],
    ["Friendship and Loyalty","Scripture values faithful friendship, wise counsel and mutual encouragement. See 1 Samuel 18:1-4; Proverbs 17:17; 27:5-10; John 15:12-15."],
    ["Choosing Wise Companions","The Bible warns that close associations shape character and encourages friendship with the wise. Apply the principle without contempt for people who need help. See Psalm 1:1-2; Proverbs 13:20; 1 Corinthians 15:33."],
    ["Work as Calling","Work is part of human vocation and can become service to God and neighbour. Scripture also condemns exploitation and idleness. See Genesis 2:15; Ecclesiastes 3:9-13; Colossians 3:23-24; 2 Thessalonians 3:6-12."],
    ["Diligence and Excellence","Proverbs commends diligence and the New Testament calls believers to wholehearted service. Excellence should be joined with integrity, not perfectionism. See Proverbs 10:4; 12:24; Daniel 6:3-5; Colossians 3:23."],
    ["Rest and Sabbath","The Sabbath pattern joins rest, worship and freedom, and Jesus teaches its purpose in relation to human need. Study the creation and covenant contexts. See Genesis 2:1-3; Exodus 20:8-11; Deuteronomy 5:12-15; Mark 2:23-28."],
    ["Stewardship of Resources","Biblical stewardship treats possessions and abilities as entrusted gifts, calling for faithfulness, generosity and accountability. See Matthew 25:14-30; Luke 16:10-13; 1 Peter 4:10."],
    ["Money and the Love of Money","Scripture warns against greed and teaches contentment, generosity and trust in God rather than wealth. See Matthew 6:19-24; Luke 12:13-21; 1 Timothy 6:6-10, 17-19."],
    ["Debt and Financial Wisdom","Biblical texts encourage careful obligations, honesty and freedom from the rule of money. Apply wisdom to modern lending contexts without treating every circumstance as identical. See Proverbs 22:7; Romans 13:7-8; Psalm 37:21."],
    ["Generosity to the Needy","Generosity reflects God's grace and meets real needs. The apostles organise giving with fairness, transparency and willingness. See Deuteronomy 15:7-11; Acts 11:27-30; 2 Corinthians 8:1-15; 9:6-11."],
    ["Honest Business and Fair Wages","Scripture condemns dishonest scales, withheld wages and exploitation. Work and trade should reflect justice and neighbour-love. See Leviticus 19:35-36; Deuteronomy 24:14-15; Proverbs 11:1; James 5:1-6."],
    ["Leadership in Public Life","Biblical leadership is accountable to justice, humility and service. Study both faithful and failed rulers in Scripture. See Deuteronomy 17:14-20; 2 Samuel 23:3-4; Micah 3:1-4; Romans 13:1-7."],
    ["Praying for Authorities","The New Testament instructs prayer for rulers so communities may live peaceably and the gospel may advance. See Jeremiah 29:4-7; 1 Timothy 2:1-4; 1 Peter 2:13-17."],
    ["Citizenship and Heavenly Allegiance","Christians live within earthly communities while their highest allegiance belongs to Christ. Scripture calls for responsible conduct and faithful witness. See Matthew 22:15-22; Acts 5:27-32; Philippians 3:20; 1 Peter 2:11-17."],
    ["The Image of God in Humanity","Genesis grounds human dignity in God's image, shaping the Bible's teaching on life, work and neighbour-love. See Genesis 1:26-28; 5:1-3; 9:6; James 3:8-10."],
    ["Human Dignity and Equality","The gospel challenges status divisions and calls the church to honour every person. See Acts 10:34-35; Galatians 3:26-29; James 2:1-9."],
    ["Creation Care","Human beings are entrusted with caring for God's creation. Biblical stewardship rejects both exploitation and worship of creation. See Genesis 1:26-28; 2:15; Psalm 24:1; Romans 8:19-23."],
    ["Wisdom for Conflict Resolution","Scripture encourages listening, truthful conversation, patience and seeking peace when conflict arises. See Proverbs 15:1; Matthew 18:15-20; Romans 12:18; James 1:19-20."],
    ["Anger and Righteousness","The Bible recognises anger but warns against sin, vengeance and prolonged resentment. See Psalm 4:4; Proverbs 14:29; Ephesians 4:26-27; James 1:19-20."],
    ["Guarding the Heart","Proverbs uses the heart as the centre of thought, desire and decision, calling for wise attention to what shapes life. See Proverbs 4:20-27; Matthew 12:34-35; Philippians 4:8."],
    ["Renewing the Mind","Paul calls believers to transformation through renewed thinking, shaped by God's will and the truth of Christ. See Romans 12:1-2; Ephesians 4:17-24; Philippians 4:8-9; Colossians 3:1-10."],
    ["Identity in Christ","The New Testament describes believers through union with Christ, adoption, new creation and belonging to His people. Let identity flow from the text rather than slogans detached from it. See Romans 8:1-17; 2 Corinthians 5:17; Ephesians 1:3-14."],
    ["New Life and Old Patterns","Following Christ involves putting off old patterns and putting on the character of the new life. See Romans 6:4-14; Ephesians 4:20-32; Colossians 3:5-17."],
    ["Spiritual Growth and Maturity","The New Testament calls believers to grow in knowledge, love, discernment and Christlike character. See Ephesians 4:11-16; Philippians 1:9-11; Hebrews 5:11-14; 2 Peter 3:18."],
    ["Abiding in Christ","Jesus' vine imagery teaches dependence on Him for fruitfulness, obedience and love. See John 15:1-17; 1 John 2:24-28."],
    ["Bearing Fruit for God","Fruitfulness in Scripture is seen in faithful character, good works, witness and love. It is rooted in God's grace rather than self-achievement. See John 15:1-8; Colossians 1:9-12; Hebrews 13:15-16."],
    ["Obedience from the Heart","Biblical obedience flows from trust and love, not merely outward performance. See Deuteronomy 6:4-9; John 14:15-24; Romans 6:16-18; 1 John 5:2-3."],
    ["Faith Working Through Love","Paul connects faith with love expressed in action, rejecting both legalistic boasting and loveless claims. See Galatians 5:6, 13-14; James 2:14-26; 1 Thessalonians 1:3."],
    ["The Beatitudes","Jesus' blessings describe the values and hope of God's kingdom, overturning common assumptions about status and success. See Matthew 5:1-12; Luke 6:20-26."],
    ["The Sermon on the Mount","Matthew 5-7 presents Jesus' authoritative teaching on kingdom character, prayer, trust, relationships and obedience. Read the sermon as a connected whole."],
    ["Parables of Jesus","Jesus' parables invite listeners to respond to God's kingdom and often challenge assumptions. Attend to each story's setting, audience and stated explanation. See Matthew 13; Luke 15; 18:1-14."],
    ["Miracles of Jesus","Jesus' signs reveal compassion and kingdom authority and invite faith. Consider what each Gospel writer highlights rather than treating miracles as spectacle. See Mark 1:21-45; John 2:1-11; 20:30-31."],
    ["The Teachings of Jesus on Money","Jesus addresses wealth, generosity, anxiety and loyalty to God. His teaching calls for practical trust and care for the poor. See Matthew 6:19-34; Luke 12:13-34; 16:1-13."],
    ["The Teachings of Jesus on Forgiveness","Jesus teaches forgiveness as a response to God's mercy and a practice within the community. See Matthew 6:12-15; 18:21-35; Luke 7:36-50."],
    ["The Teachings of Jesus on Prayer","Jesus teaches prayer through the Lord's Prayer, private devotion, persistence and confidence in the Father's goodness. See Matthew 6:5-13; 7:7-11; Luke 11:1-13; 18:1-8."],
    ["The Teachings of Jesus on the Holy Spirit","Jesus promises the Spirit as helper, teacher and witness who will glorify Him. See John 14:15-27; 15:26-27; 16:7-15; Luke 11:13."],
    ["The Teachings of Jesus on the Kingdom","Jesus announces God's kingdom through parables, healings, teaching and His own mission. See Matthew 4:17; 13; Mark 1:14-15; Luke 4:16-21."],
    ["The Teachings of Jesus on Humility","Jesus opposes status-seeking and models humble service. See Matthew 18:1-5; 23:1-12; Luke 14:7-11; John 13:1-17."],
    ["The Teachings of Jesus on Discipleship","Jesus calls people to follow Him with loyalty, self-denial, love and readiness to serve. See Mark 8:34-38; Luke 14:25-33; John 13:34-35."],
    ["The Teachings of Jesus on Watchfulness","Jesus calls disciples to readiness and faithfulness while awaiting the Master's return, without date-setting. See Matthew 24:36-51; 25:1-13; Mark 13:32-37."],
    ["The Lord's Prayer","Jesus' model prayer orders petitions around God's name, kingdom and will, then daily provision, forgiveness and deliverance. See Matthew 6:9-13; Luke 11:1-4."],
    ["The Names and Titles of Jesus","Titles such as Son of Man, Messiah, Lord, Lamb and Word reveal different aspects of Jesus' identity and mission. Study each title in its original context. See Mark 8:27-31; John 1:1-18; 1:29; Revelation 5."],
    ["Jesus as the Good Shepherd","Jesus uses shepherd imagery to describe His care, knowledge and self-giving for the flock. See Psalm 23; Ezekiel 34:11-16; John 10:1-18; Hebrews 13:20."],
    ["Jesus as the Bread of Life","In John 6 Jesus presents Himself as the bread of life and calls people to believe in Him for lasting life. Read the discourse in context. See John 6:25-59."],
    ["Jesus as the Light of the World","Jesus' light imagery concerns revelation, life and the exposure of darkness. His followers are also called to bear light. See John 1:4-9; 8:12; 9:5; Matthew 5:14-16."],
    ["Jesus as the Way, Truth and Life","Jesus' words in John 14 describe His unique relationship with the Father and the hope He gives His disciples. See John 14:1-11; Acts 4:12."],
    ["Jesus as the True Vine","The vine imagery in John 15 teaches dependence on Jesus, pruning, fruitfulness, love and obedience. See John 15:1-17."],
    ["Jesus as the Lamb of God","Lamb imagery connects Jesus with sacrifice, deliverance and victory. Trace its use across the Gospels and Revelation. See John 1:29, 36; 1 Corinthians 5:7; Revelation 5:6-14."],
    ["Jesus as the Son of Man","The title Son of Man appears in sayings about Jesus' authority, suffering and future glory. Study its varied contexts, including Daniel 7. See Daniel 7:13-14; Mark 2:10; 8:31; 14:62."],
    ["Jesus the Messiah","The Gospels present Jesus as Israel's promised Messiah, whose mission redefines expectations through suffering, resurrection and reign. See Matthew 16:13-20; Luke 24:25-27; Acts 2:29-36."],
    ["The Apostles and Their Witness","The apostles bear witness to Jesus' life, death and resurrection and establish the early church's teaching. See Acts 1:21-26; 2:32; 1 Corinthians 15:1-11; Ephesians 2:19-20."],
    ["The Early Church in Acts","Acts records the Spirit-empowered spread of the gospel, the formation of communities and the church's challenges. Read its narrative sequence and speeches in context."],
    ["The Mission of the Church","The church is sent to bear witness, make disciples, serve neighbours and proclaim reconciliation in Christ. See Matthew 28:18-20; Luke 24:46-49; Acts 1:8; 2 Corinthians 5:18-20."],
    ["Evangelism with Gentleness","Christian witness combines clear hope in Christ with gentleness, respect and integrity. See Matthew 5:13-16; Colossians 4:2-6; 1 Peter 3:15-16."],
    ["Hospitality to Strangers","Biblical hospitality welcomes strangers and makes practical room for others, reflecting God's welcome. See Genesis 18:1-8; Matthew 25:35-40; Romans 12:13; Hebrews 13:1-2."],
    ["The Nations in God's Plan","From Abraham's calling to the church's mission, Scripture shows God's purpose to bless people from every nation. See Genesis 12:1-3; Psalm 67; Isaiah 49:6; Revelation 7:9-10."],
    ["Israel and the Church in Biblical Context","Study Israel's covenants, the inclusion of Gentiles and the church's identity through the whole biblical narrative. Avoid flattening distinct passages into simplistic replacement claims. See Romans 9-11; Ephesians 2:11-22; 1 Peter 2:9-10."],
    ["The Exodus as Redemption","The Exodus is Israel's foundational story of deliverance and becomes a pattern for later biblical reflection on salvation. See Exodus 12-15; Deuteronomy 5:6; Luke 9:31; 1 Corinthians 10:1-4."],
    ["The Wilderness and Testing","Israel's wilderness journey exposes distrust and dependence, and becomes a warning and example for the church. See Exodus 16-17; Deuteronomy 8; Matthew 4:1-11; 1 Corinthians 10:1-13."],
    ["The Promised Land and God's Rest","The land promise and the theme of rest develop through Israel's story and are reflected on in Hebrews. See Joshua 21:43-45; Psalm 95:7-11; Hebrews 3-4."],
    ["The Davidic Covenant","God's promise to David shapes Israel's hope for a lasting kingdom and is applied to Jesus in the New Testament. See 2 Samuel 7:8-16; Psalm 89:19-37; Luke 1:32-33; Acts 13:22-23."],
    ["The Prophets and God's Justice","The prophets call Israel and Judah back to covenant faithfulness, condemning idolatry and injustice while announcing hope. See Isaiah 1:10-20; Jeremiah 7; Amos 5:18-24; Micah 6:6-8."],
    ["The Day of the Lord","The prophetic phrase can describe historical judgment and ultimate divine intervention. Interpret each occurrence in its historical and literary setting. See Joel 2:1-11; Amos 5:18-20; Zephaniah 1; 1 Thessalonians 5:1-11."],
    ["Wisdom Literature and Suffering","Job and other wisdom texts wrestle with suffering, justice and the limits of human understanding. They resist simplistic claims that suffering always results from personal sin. See Job 1-2; 38-42; Psalm 73; Ecclesiastes 7."],
    ["The Book of Psalms as Prayer","The Psalms give language for praise, lament, confession, thanksgiving and trust. Read each psalm according to its genre and movement."],
    ["The Book of Job and Innocent Suffering","Job challenges simplistic explanations of suffering and invites humility before God's wisdom. See Job 1-2; 19:23-27; 38-42."],
    ["Ecclesiastes and the Meaning of Life","Ecclesiastes examines mortality, work, pleasure and wisdom, calling readers to humility before God. See Ecclesiastes 1:1-11; 3:1-14; 12:9-14."],
    ["The Song of Songs and Covenant Love","The Song celebrates embodied love and desire through poetic imagery. Interpret its poetry carefully and respect its literary voice. See Song of Songs 2:8-17; 4:1-16; 8:6-7."],
    ["The Book of Ruth and Loyal Love","Ruth portrays covenant loyalty, providence and welcome to a foreigner within Israel's story. See Ruth 1:16-17; 2:8-12; 4:13-22."],
    ["Esther and Courageous Faithfulness","Esther explores providence, courage and the preservation of a threatened people, even where God's name is not explicitly mentioned. See Esther 4:12-17; 7:1-6; 9:20-28."],
    ["Daniel and Faithfulness in Exile","Daniel portrays faithfulness under foreign rule and visions of God's sovereignty over kingdoms. See Daniel 1; 3; 6; 7."],
    ["Nehemiah and Rebuilding","Nehemiah combines prayer, planning, courageous leadership and communal work in rebuilding Jerusalem's walls and renewing covenant life. See Nehemiah 1-2; 4; 8-10."],
    ["Ezra and Renewal through Scripture","Ezra connects return from exile with teaching, repentance and renewed commitment to God's law. See Ezra 7:6-10; Nehemiah 8:1-12."],
    ["The Book of Acts and the Holy Spirit","Acts narrates the Spirit's work in empowering witness, crossing cultural boundaries and forming communities. See Acts 2; 8; 10-11; 13."],
    ["Paul's Letter to the Romans","Romans develops the gospel's themes of sin, grace, justification, new life, Israel and practical discipleship. Read its argument as a connected letter."],
    ["Paul's Letter to the Galatians","Galatians defends the gospel of grace and explores freedom, faith, the Spirit and life in Christ. See Galatians 1:6-9; 2:15-21; 5:1-26."],
    ["Paul's Letter to the Ephesians","Ephesians celebrates God's saving purpose in Christ and applies it to unity, maturity, relationships and spiritual steadfastness."],
    ["Paul's Letter to the Philippians","Philippians explores joy, humility, partnership in the gospel, perseverance and contentment. See Philippians 1:3-11; 2:1-11; 3:7-14; 4:4-13."],
    ["Paul's Letters to the Thessalonians","These letters encourage a young church in holiness, hope, work and readiness for Christ's return. See 1 Thessalonians 4-5; 2 Thessalonians 2-3."],
    ["The Letter to the Hebrews","Hebrews presents Jesus as superior and sufficient, urging perseverance, faith and mutual encouragement. Follow its use of Israel's Scriptures."],
    ["The Letter of James","James joins practical wisdom, care for the poor, controlled speech, endurance and living faith. Read its examples and warnings carefully."],
    ["The Letters of Peter","Peter's letters encourage holiness, hope and faithful witness amid suffering, while teaching humility and care in community."],
    ["The Letters of John","John's letters connect truth about Jesus with love, obedience, discernment and assurance. See 1 John 1:1-4; 3:11-18; 4:1-21; 5:11-13."],
    ["The Book of Revelation","Revelation uses apocalyptic imagery, worship and prophetic encouragement to call churches to faithfulness and hope in God's final victory. Read its symbols with attention to its first-century audience and Old Testament echoes."],
    ["The New Testament Use of the Old Testament","The apostles interpret Israel's Scriptures in light of Jesus and the gospel. Trace quotations and allusions in their original and New Testament settings."],
    ["Biblical Covenants Across Scripture","Follow the covenant themes from creation and Noah through Abraham, Sinai, David and the new covenant in Christ. Compare each covenant's promises and obligations."],
    ["The Tabernacle and God's Presence","The tabernacle symbolises God's dwelling among Israel and provides background for later temple and Christological imagery. See Exodus 25-40; John 1:14; Hebrews 8-10."],
    ["The Temple and Worship","The temple is central to Israel's worship and later becomes a key image in New Testament teaching about Christ and the church. See 1 Kings 8; Psalm 84; John 2:18-22; 1 Corinthians 3:16-17."],
    ["Sacrifice and Biblical Worship","Sacrificial practices in the Old Testament address atonement, thanksgiving, dedication and communion. Study their variety and their fulfilment themes in Hebrews."],
    ["Clean and Unclean in the Bible","Purity laws shaped Israel's worship and community life; Jesus and the apostles address purity in light of the gospel. See Leviticus 11-15; Mark 7:14-23; Acts 10; Hebrews 9."],
    ["The Sabbath and God's Rest","The Sabbath recalls creation, liberation and covenant identity, and Hebrews develops a theme of God's rest. See Genesis 2:1-3; Exodus 20:8-11; Deuteronomy 5:12-15; Hebrews 4."],
    ["Feasts of Israel","Israel's festivals remember God's acts and shape worship through the year. Study Passover, Weeks, Booths and the Day of Atonement in their biblical settings. See Leviticus 23; Deuteronomy 16."],
    ["Passover and Deliverance","Passover remembers God's deliverance from Egypt and becomes a major background for New Testament reflection on Jesus. See Exodus 12; Luke 22:7-20; 1 Corinthians 5:7."],
    ["The Day of Atonement","Leviticus 16 describes the annual ritual of cleansing and atonement, later used in Hebrews to explain Christ's priestly work. See Leviticus 16; Hebrews 9:1-14."],
    ["The Kingdom Parables","Jesus' kingdom parables describe hidden beginnings, growth, value, response and final separation. Compare Matthew 13; Mark 4; Luke 13."],
    ["The Signs in John's Gospel","John selects signs to reveal Jesus' identity and invite belief. Study each sign alongside its discourse and narrative setting. See John 2:1-11; 4:46-54; 6:1-14; 11:1-44."],
    ["The I Am Sayings of Jesus","John's I Am sayings reveal Jesus through images of bread, light, shepherd, resurrection, way and vine. Study each in its surrounding dialogue and sign."],
    ["The Parables of the Lost","Luke 15 presents stories of lost sheep, coin and son to reveal God's joy in repentance and restoration. See Luke 15:1-32."],
    ["The Good Samaritan","Jesus' parable challenges boundaries of neighbour-love and defines mercy through concrete action. See Luke 10:25-37."],
    ["The Prodigal Son and the Father's Welcome","The parable in Luke 15 explores lostness, repentance, the father's compassion and the older brother's resentment. See Luke 15:11-32."],
    ["The Rich Man and Lazarus","Jesus' parable warns against indifference to the poor and challenges confidence in wealth. Read it in Luke's wider teaching about possessions. See Luke 16:19-31."],
    ["The Parable of the Sower","Jesus uses the soils to describe differing responses to God's word and calls listeners to hear with perseverance. See Matthew 13:1-23; Mark 4:1-20; Luke 8:4-15."],
    ["The Parable of the Talents and Minas","These parables address faithfulness and accountability while awaiting the master's return. Compare their distinct settings and details. See Matthew 25:14-30; Luke 19:11-27."],
    ["The Transfiguration","The transfiguration reveals Jesus' glory and confirms His identity, with Moses and Elijah pointing to Israel's Scriptures. See Matthew 17:1-8; Mark 9:2-8; Luke 9:28-36."],
    ["The Triumphal Entry","Jesus enters Jerusalem in a prophetic royal sign, while the crowd's expectations and the Gospel writers' emphasis deserve careful attention. See Zechariah 9:9; Matthew 21:1-11; John 12:12-19."],
    ["The Last Supper","Jesus' final meal with His disciples interprets His coming death and gives the church a pattern of remembrance and service. See Luke 22:14-27; John 13; 1 Corinthians 11:23-26."],
    ["Gethsemane and Surrender","Jesus' prayer in Gethsemane reveals anguish, obedience and trust in the Father before His arrest. See Matthew 26:36-46; Mark 14:32-42; Luke 22:39-46."],
    ["The Seven Sayings from the Cross","The Gospel accounts preserve different words of Jesus from the cross. Study each saying in its own Gospel context rather than assuming a single combined narrative."],
    ["The Empty Tomb","The resurrection narratives report the discovery of the empty tomb and the announcement that Jesus is risen. Compare the distinct accounts. See Matthew 28; Mark 16; Luke 24; John 20."],
    ["The Emmaus Road","The risen Jesus opens the Scriptures to two disciples, showing how the biblical story points to His suffering and glory. See Luke 24:13-35."],
    ["Peter's Restoration","John 21 depicts Jesus restoring Peter through a conversation about love and shepherding. See John 21:15-19; compare Luke 22:31-34, 54-62."],
    ["Pentecost and the Birth of the Church","Acts 2 describes the Spirit's coming, Peter's proclamation and the formation of a worshipping community. See Acts 2:1-47; Joel 2:28-32."],
    ["The Jerusalem Council","Acts 15 records the early church's discernment about Gentile inclusion and the requirements placed on new believers. See Acts 15:1-35; Galatians 2:1-10."],
    ["The Conversion of Paul","Acts narrates Paul's encounter with the risen Jesus and his calling as witness to the nations. Compare Acts 9; 22; 26; Galatians 1:11-24."],
    ["The Missionary Journeys of Paul","Acts traces Paul's missionary journeys, church planting, conflict and encouragement. Use maps and passage sequence to follow locations and communities."],
    ["Priscilla and Aquila","This couple models hospitality, partnership in ministry and careful instruction in the way of God. See Acts 18:1-28; Romans 16:3-5; 1 Corinthians 16:19."],
    ["Women in the Ministry of Jesus and the Early Church","The Gospels and Acts show women as disciples, witnesses, patrons and co-workers in the mission. Study named examples in their narrative settings."],
    ["Lydia and the Philippian Church","Lydia's conversion and hospitality help establish the Philippian community and illustrate the gospel's movement into Europe. See Acts 16:11-15, 40."],
    ["The Ethiopian Official","Acts 8 shows Philip explaining Isaiah's Scripture and the inclusion of a foreign seeker through the good news of Jesus. See Acts 8:26-40."],
    ["Cornelius and Gentile Inclusion","The encounter between Peter and Cornelius demonstrates God's welcome of Gentiles and the Spirit's confirmation. See Acts 10:1-48; 11:1-18."],
    ["Stephen's Witness and Martyrdom","Stephen's speech retells Israel's history and confronts resistance to God's messengers. His death echoes Jesus' forgiveness. See Acts 6:8-15; 7:1-60."],
    ["Barnabas the Encourager","Barnabas supports new believers, bridges communities and partners in mission. See Acts 4:36-37; 9:26-28; 11:22-26; 13:1-3."],
    ["Timothy and Faithful Ministry","Timothy's story and Paul's letters address mentoring, character, teaching and perseverance in ministry. See Acts 16:1-5; 1 Timothy 4:12-16; 2 Timothy 1:5-8."],
    ["The Fruit of Repentance","John the Baptist and the apostles call for conduct that demonstrates genuine repentance. See Matthew 3:7-10; Luke 3:7-14; Acts 26:19-20."],
    ["The Cost of Following Jesus","Jesus warns that discipleship may require surrendering possessions, status and even life itself. See Mark 8:34-38; Luke 14:25-33; Philippians 3:7-11."],
    ["The Narrow Gate","Jesus calls listeners to choose the demanding path of His teaching rather than assuming that religious words alone are enough. See Matthew 7:13-23; Luke 13:22-30."],
    ["Building on the Rock","Jesus concludes the Sermon on the Mount by comparing hearing and doing His words with building on rock. See Matthew 7:24-27; Luke 6:46-49."],
    ["Salt and Light","Jesus calls disciples to visible goodness that glorifies the Father, using salt and light as images of their public witness. See Matthew 5:13-16."],
    ["The New Commandment","Jesus commands His disciples to love one another as He has loved them, making this love a mark of their community. See John 13:34-35; 15:12-17; 1 John 3:16-18."],
    ["The Greatest Commandment","Jesus joins love for God with love for neighbour as the heart of the law and prophets. See Deuteronomy 6:4-5; Leviticus 19:18; Matthew 22:34-40."],
    ["The Golden Rule","Jesus' instruction to treat others as one would wish to be treated summarises a practical expression of the law and prophets. See Matthew 7:12; Luke 6:31."],
    ["The Ministry of Reconciliation","Those reconciled to God through Christ are entrusted with a message and practice of reconciliation. See 2 Corinthians 5:17-21; Ephesians 2:14-18."],
    ["The Peace of God in Christ","The peace God gives guards hearts and minds and shapes relationships within Christ's body. See John 14:27; Philippians 4:6-9; Colossians 3:15."],
    ["Joy in the Lord","Christian joy is rooted in the Lord and can coexist with grief, hardship and patient hope. See John 16:20-22; Romans 12:12; Philippians 4:4; 1 Peter 1:6-9."],
    ["Hope That Does Not Disappoint","Paul connects hope with God's love poured into hearts through the Spirit, even amid suffering. See Romans 5:1-5; 8:18-25; 15:13."],
    ["The Love of Christ","The New Testament presents Christ's love as self-giving, sustaining and beyond full human comprehension. See John 13:1; Romans 8:35-39; Ephesians 3:14-21; 5:1-2."],
    ["The Love of the Father","Jesus reveals the Father's love and invites believers to live as His children. See John 3:16-17; 16:27; Romans 8:31-39; 1 John 3:1."],
    ["The Mercy of God","God's mercy is shown in compassion toward the helpless and forgiveness toward sinners. See Exodus 34:6-7; Psalm 103:8-14; Luke 1:50; Ephesians 2:4-7."],
    ["The Grace of God in Daily Living","Grace is God's generous action in Christ and the power for a transformed life. See Romans 5:1-2; 1 Corinthians 15:10; 2 Corinthians 12:9; Titus 2:11-14."],
    ["The Patience of God","Scripture describes God's patience as an opportunity for repentance and salvation, not indifference to evil. See Exodus 34:6; Romans 2:4; 2 Peter 3:9, 15."],
    ["The Wrath and Justice of God","Biblical teaching on God's wrath concerns His opposition to evil and injustice. Study it alongside His patience, mercy and saving work in Christ. See Nahum 1:2-8; Romans 1:18; 5:9; Ephesians 2:1-5."],
    ["The Wisdom of the Cross","Paul describes the cross as God's wisdom and power, overturning human boasting and status. See 1 Corinthians 1:18-31; 2:1-5."],
    ["The Power of the Gospel","The gospel is God's power for salvation and transforms communities through the Spirit. See Romans 1:16-17; 1 Corinthians 1:18-25; 1 Thessalonians 1:4-10."],
    ["The Righteousness of God","Paul's use of righteousness includes God's saving faithfulness and the right standing given through faith. Follow the phrase through Romans rather than relying on one gloss. See Romans 1:16-17; 3:21-26; 10:1-13."],
    ["Faith and Works in James and Paul","Paul rejects works as grounds for boasting, while James rejects claims to faith that produce no obedience. Read each author’s argument and audience carefully. See Romans 3:27-4:8; Galatians 2:15-21; James 2:14-26."],
    ["The Gift of Eternal Life","Eternal life is God's gift through Jesus Christ, experienced now and fulfilled in resurrection. See John 3:16; 5:24; Romans 6:23; 1 John 5:11-13."],
    ["The Inheritance of Believers","The New Testament describes believers as heirs with Christ, awaiting an imperishable inheritance. See Romans 8:16-17; Galatians 4:4-7; Ephesians 1:11-14; 1 Peter 1:3-5."],
    ["The Seal of the Holy Spirit","The Spirit is described as a seal and guarantee of God's promised inheritance. Study the imagery within Paul's argument. See 2 Corinthians 1:21-22; Ephesians 1:13-14; 4:30."],
    ["The Intercession of Christ","Jesus' priestly intercession assures believers of His continuing care and access to God. See Romans 8:34; Hebrews 7:23-28; 9:24; 1 John 2:1."],
    ["The Intercession of the Spirit","Romans 8 describes the Spirit helping believers in weakness and interceding according to God's will. See Romans 8:18-27."],
    ["The Adoption of Creation","Romans 8 portrays creation groaning as it awaits liberation alongside God's children. See Romans 8:18-25; compare Isaiah 11:6-9; Revelation 21:1-5."],
    ["The Groaning of Creation","The Bible recognises creation's frustration and suffering while pointing to God's promised renewal. See Romans 8:19-23; 2 Peter 3:10-13."],
    ["The Wedding Supper of the Lamb","Revelation uses wedding imagery for the joyful consummation of Christ's union with His people. See Matthew 22:1-14; 25:1-13; Revelation 19:6-9; 21:2."],
    ["The New Jerusalem","Revelation's city imagery portrays God's dwelling with His people, healing and the end of death and curse. See Revelation 21:1-27; 22:1-5."],
    ["The River and Tree of Life","The closing vision of Revelation echoes Eden and prophetic restoration, depicting life flowing from God's presence. See Genesis 2:8-14; Ezekiel 47:1-12; Revelation 22:1-5."],
    ["The Book of Life","Biblical references to the book of life concern belonging to God and final judgment. Interpret each occurrence in its apocalyptic or pastoral context. See Exodus 32:32-33; Philippians 4:3; Revelation 3:5; 20:12-15."],
    ["The Crown of Life","The crown imagery in the New Testament encourages endurance and faithfulness under trial. See James 1:12; Revelation 2:10; 1 Peter 5:4."],
    ["The Great White Throne","Revelation's great white throne vision portrays final judgment according to God's justice. Read it within the book's sequence and symbolic language. See Revelation 20:11-15."],
    ["The First Resurrection and Reign of Christ","Revelation 20's imagery has been interpreted in different ways across Christian traditions. Study the text carefully and distinguish the passage's claims from interpretive systems. See Revelation 20:1-10."],
    ["The Marriage Supper and Covenant Hope","Scripture uses wedding and feast imagery for God's covenant joy and the final gathering of His people. See Isaiah 25:6-9; Matthew 22:1-14; Revelation 19:6-9."],
    ["The Watchfulness of the Church","The church is called to remain awake, faithful and discerning as it awaits Christ. See Matthew 24:42-51; Romans 13:11-14; 1 Thessalonians 5:1-11."],
    ["The Hope of Christ's Appearing","The promised appearing of Christ motivates holiness, comfort and perseverance. See Titus 2:11-14; 1 John 2:28-3:3; 1 Thessalonians 4:13-18."],
    ["The Resurrection Body","Paul describes the resurrection body as transformed and imperishable, grounded in Christ's resurrection. See 1 Corinthians 15:35-58; Philippians 3:20-21."],
    ["The Mission of the Seventy-Two","Luke records Jesus sending disciples ahead to announce the kingdom and depend on God's provision. See Luke 10:1-24."],
    ["The Sending of the Twelve","Jesus appoints and sends the Twelve to proclaim the kingdom and minister in His authority. See Matthew 10:1-15; Mark 6:7-13; Luke 9:1-6."],
    ["The Authority of Jesus","The Gospels portray Jesus teaching, forgiving, healing and commanding with authority. Study how the narratives reveal His identity. See Mark 1:21-28; 2:1-12; Matthew 28:18."],
    ["The Compassion of Jesus","Jesus responds to crowds and individuals with compassion, often meeting physical and spiritual needs. See Matthew 9:35-38; 14:13-21; Mark 1:40-42; Luke 7:11-17."],
    ["The Tears of Jesus","The Gospels show Jesus weeping over Jerusalem and at Lazarus' tomb, revealing His compassion and grief. See Luke 19:41-44; John 11:32-36; Hebrews 5:7."],
    ["The Anger of Jesus","The Gospels portray Jesus' anger against hard-heartedness and exploitation, always in the service of God's purposes. See Mark 3:1-6; 10:13-16; John 2:13-17."],
    ["The Temptations of Jesus","Jesus' testing in the wilderness reveals His faithful obedience and reliance on Scripture. Compare Israel's wilderness testing. See Deuteronomy 6-8; Matthew 4:1-11; Luke 4:1-13."],
    ["The Obedience of Jesus","Jesus' obedience to the Father is central to His mission and the salvation story. See John 4:34; 5:19-30; Romans 5:18-19; Philippians 2:5-11; Hebrews 5:7-9."],
    ["The Prayer Life of Jesus","The Gospels repeatedly show Jesus praying at key moments of ministry and decision. Study the settings and content of His prayers. See Mark 1:35; Luke 6:12; 9:18; John 17."],
    ["The Authority of Scripture in Jesus' Teaching","Jesus appeals to Scripture as authoritative and interprets it in relation to God's purposes. See Matthew 4:1-11; 5:17-20; 22:29-40; Luke 24:25-27."],
    ["The Fulfilment of Prophecy in Jesus","The Gospels connect Jesus' life and mission with Israel's Scriptures. Examine each quotation in its original context and the Gospel writer's use. See Matthew 1:22-23; 2:5-6; Luke 4:16-21; Acts 13:32-39."],
    ["The Genealogies of Jesus","Matthew and Luke present genealogies with different structures and emphases, placing Jesus within Israel's story. Compare Matthew 1:1-17 and Luke 3:23-38."],
    ["The Birth Narratives of Jesus","Matthew and Luke narrate Jesus' birth with distinct details and theological emphases. Read each account on its own terms and compare shared themes."],
    ["The Childhood of Jesus","The Gospels provide limited but significant accounts of Jesus' early life, emphasising growth, identity and devotion to the Father. See Matthew 2; Luke 2:21-52."],
    ["The Baptism of Jesus","Jesus' baptism marks the beginning of His public ministry and includes the Father's affirmation and the Spirit's descent. See Matthew 3:13-17; Mark 1:9-11; Luke 3:21-22."],
    ["The Transfiguration and the Voice from Heaven","The heavenly voice identifies Jesus as the beloved Son and directs disciples to listen to Him. See Matthew 17:1-8; Mark 9:2-8; 2 Peter 1:16-18."],
    ["The Olivet Discourse","Jesus' teaching about Jerusalem's coming crisis and the end calls for discernment and watchfulness. Compare Matthew 24-25; Mark 13; Luke 21, noting each Gospel's context."],
    ["The Parable of the Ten Virgins","Jesus' parable urges readiness for the bridegroom's arrival and faithful watchfulness. See Matthew 25:1-13."],
    ["The Parable of the Sheep and Goats","Jesus' judgment scene connects treatment of the vulnerable with response to the King. Study its place in Matthew 25. See Matthew 25:31-46."],
    ["The Parable of the Unforgiving Servant","Jesus' parable warns that those who receive mercy must extend mercy. See Matthew 18:21-35."],
    ["The Parable of the Persistent Widow","Jesus encourages persistent prayer and confidence in God's justice. See Luke 18:1-8."],
    ["The Parable of the Pharisee and Tax Collector","Jesus contrasts self-righteousness with humble dependence on God's mercy. See Luke 18:9-14."],
    ["The Parable of the Workers in the Vineyard","Jesus challenges assumptions about status and reward through the landowner's generosity. See Matthew 20:1-16."],
    ["The Parable of the Two Sons","Jesus contrasts verbal agreement with actual obedience and applies the story to responses to God's call. See Matthew 21:28-32."],
    ["The Parable of the Wicked Tenants","Jesus uses the vineyard story to confront leaders rejecting God's messengers and Son. See Isaiah 5:1-7; Matthew 21:33-46."],
    ["The Parable of the Mustard Seed","Jesus describes the kingdom's surprising growth from small beginnings. See Matthew 13:31-32; Mark 4:30-32; Luke 13:18-19."],
    ["The Parable of the Yeast","Jesus uses yeast to picture the kingdom's pervasive influence. See Matthew 13:33; Luke 13:20-21."],
    ["The Parable of the Hidden Treasure and Pearl","Jesus describes the incomparable value of the kingdom and the wholehearted response it calls for. See Matthew 13:44-46."],
    ["The Parable of the Net","Jesus uses a fishing net to picture the final separation at the completion of the age. See Matthew 13:47-50."],
    ["The Parable of the Growing Seed","Mark records Jesus' image of seed growing beyond the farmer's control, illustrating the mysterious growth of the kingdom. See Mark 4:26-29."],
    ["The Parable of the Rich Fool","Jesus warns against storing wealth without being rich toward God. See Luke 12:13-21."],
    ["The Parable of the Shrewd Manager","Jesus uses a challenging story to teach wise stewardship and expose divided loyalty to God and money. See Luke 16:1-13."],
    ["The Parable of the Pharisee and the Tax Collector","The parable teaches that humble repentance, not self-congratulation, is the path to being made right with God. See Luke 18:9-14."],
    ["The Parable of the Barren Fig Tree","Jesus' parable warns of judgment while portraying patience and the opportunity to bear fruit. See Luke 13:1-9."],
    ["The Parable of the Great Banquet","Jesus depicts God's invitation and warns against excuses and exclusion. See Luke 14:15-24."],
    ["The Parable of the Lost Sheep","Jesus uses the shepherd's search to reveal heaven's joy over repentance and restoration. See Luke 15:1-7; Matthew 18:10-14."],
    ["The Parable of the Lost Coin","The woman's search and joy illustrate God's concern for the lost. See Luke 15:8-10."],
    ["The Parable of the Two Foundations","Jesus contrasts hearing without doing and hearing with obedience. See Matthew 7:24-27; Luke 6:46-49."],
    ["The Parable of the Unjust Judge","Jesus encourages persistence in prayer by contrasting an unjust judge with God's justice. See Luke 18:1-8."],
    ["The Parable of the Friend at Midnight","Jesus uses a midnight request to encourage bold persistence and trust in the Father's generosity. See Luke 11:5-13."],
    ["The Parable of the Sower's Soils","The soils represent varied responses to God's word, highlighting hearing, endurance and fruitfulness. See Mark 4:1-20; Luke 8:4-15."],
    ["The Parable of the Wedding Feast","Matthew's wedding feast parable explores invitation, response and readiness before the king. See Matthew 22:1-14."],
    ["The Parable of the Tenants and God's Vineyard","The vineyard imagery draws on Isaiah and confronts leaders who reject God's messengers. See Isaiah 5:1-7; Mark 12:1-12."],
    ["The Parable of the Good Shepherd","Jesus contrasts His self-giving care with the motives of thieves and hired hands. See John 10:1-18."],
    ["The Parable of the Sheepfold","John 10's imagery presents Jesus as the gate and shepherd who gives life and gathers one flock. See John 10:1-18."],
    ["The Parable of the Vine and Branches","Jesus teaches that fruitfulness depends on abiding in Him and keeping His commands. See John 15:1-17."],
    ["The Sign of Water into Wine","Jesus' first sign in John reveals His glory and points to the abundance of the new age. See John 2:1-11."],
    ["The Sign of the Healing at Bethesda","Jesus heals a man at the pool and engages questions about Sabbath and His authority. See John 5:1-18."],
    ["The Sign of Feeding the Five Thousand","Jesus feeds the crowd and leads into teaching about the bread of life. See John 6:1-15, 25-59."],
    ["The Sign of Walking on Water","The Gospel accounts portray Jesus' authority over the sea and call disciples to trust Him. See Matthew 14:22-33; Mark 6:45-52; John 6:16-21."],
    ["The Sign of Healing the Blind Man","John 9 explores physical sight, spiritual blindness and growing recognition of Jesus. See John 9:1-41."],
    ["The Sign of Raising Lazarus","Jesus raises Lazarus and declares Himself the resurrection and the life, revealing God's glory. See John 11:1-44."],
    ["The Sign of the Miraculous Catch","The miraculous catch in John 21 connects the risen Jesus with the disciples' mission and Peter's restoration. See Luke 5:1-11; John 21:1-14."],
    ["The Healing of the Centurion's Servant","Jesus responds to a Gentile centurion's remarkable trust, highlighting faith beyond expected boundaries. See Matthew 8:5-13; Luke 7:1-10."],
    ["The Healing of the Paralytic","Jesus heals a paralytic and declares authority to forgive sins, linking visible restoration with deeper authority. See Mark 2:1-12; Luke 5:17-26."],
    ["The Healing of the Woman with Bleeding","Jesus restores a woman who touches His garment and commends her faith, while also raising a synagogue leader's daughter. See Mark 5:21-43."],
    ["The Healing of Bartimaeus","A blind man calls Jesus Son of David and receives sight, then follows Him on the way. See Mark 10:46-52; Luke 18:35-43."],
    ["The Healing of the Ten Lepers","Jesus heals ten people, while one returns to give thanks. The story explores gratitude and faith. See Luke 17:11-19."],
    ["The Raising of Jairus' Daughter","Jesus responds to a father's plea and restores his daughter, calling the household to faith. See Mark 5:21-24, 35-43; Luke 8:40-56."],
    ["The Deliverance of the Gerasene Man","Jesus restores a man oppressed by demons and sends him to tell what God has done. See Mark 5:1-20; Luke 8:26-39."],
    ["The Calming of the Storm","Jesus calms the storm and challenges the disciples' fear, revealing His authority. See Mark 4:35-41; Matthew 8:23-27; Luke 8:22-25."],
    ["The Feeding of the Four Thousand","Jesus feeds a large crowd in a remote place, showing compassion and provision. See Matthew 15:32-39; Mark 8:1-10."],
    ["The Cursing of the Fig Tree","The fig tree sign in the Gospels is linked with judgment, faith and the temple controversy. See Matthew 21:18-22; Mark 11:12-25."],
    ["The Cleansing of the Temple","Jesus confronts the misuse of the temple and quotes Scripture about prayer and exploitation. See Isaiah 56:7; Jeremiah 7:11; Mark 11:15-19; John 2:13-22."],
    ["The Triumphal Entry and the King","Jesus enters Jerusalem in humility, fulfilling royal prophecy while exposing expectations about kingship. See Zechariah 9:9; Matthew 21:1-11; John 12:12-19."],
    ["The Arrest and Trial of Jesus","The Gospel narratives describe Jesus' arrest and trials amid injustice, fear and fulfilment of His mission. Compare Matthew 26-27; Mark 14-15; Luke 22-23; John 18-19."],
    ["The Crucifixion Narratives","Each Gospel presents Jesus' crucifixion with distinctive theological emphases. Compare the accounts and their Old Testament echoes."],
    ["The Burial of Jesus","The burial narratives establish Jesus' real death and prepare for the resurrection accounts. See Matthew 27:57-66; Mark 15:42-47; Luke 23:50-56; John 19:38-42."],
    ["The Resurrection Appearances","The risen Jesus appears to individuals and groups, commissions witnesses and strengthens faith. Compare Luke 24; John 20-21; 1 Corinthians 15:3-8."],
    ["The Great Commission in Matthew","Matthew concludes with the risen Jesus' universal authority, the making of disciples, baptism, teaching and His promised presence. See Matthew 28:16-20."],
    ["The Road to Emmaus and Scripture","The risen Jesus interprets Moses and the Prophets, showing the necessity of His suffering and glory. See Luke 24:13-35."],
    ["The Promise of the Father","Jesus tells His disciples to wait for the Father's promise, fulfilled in the coming of the Spirit. See Luke 24:49; Acts 1:4-8; 2:1-4."],
    ["The Early Church's Shared Life","Acts describes teaching, fellowship, breaking bread, prayer and generosity among believers. See Acts 2:42-47; 4:32-37."],
    ["The Church and the Breaking of Bread","The early church's shared meals and Lord's Supper express fellowship and remembrance, with Paul correcting divisions at Corinth. See Acts 2:42; 20:7; 1 Corinthians 10:16-17; 11:17-34."],
    ["The Church and Baptism","Baptism marks public identification with Christ and the community of believers in the New Testament narratives and letters. See Acts 2:38-41; 8:12-17; Romans 6:3-4; 1 Peter 3:21."],
    ["The Church and Prayer","Prayer is a defining practice of the early church, sustaining mission, unity and courage. See Acts 1:14; 4:23-31; 12:5-17; 13:1-3."],
    ["The Church and Generosity","Acts and Paul's letters show believers sharing resources to meet needs across communities. See Acts 4:32-37; 11:27-30; 2 Corinthians 8-9."],
    ["The Church and Persecution","The early church experiences opposition yet continues to witness with courage and prayer. See Acts 4-5; 8:1-4; 12; Philippians 1:12-14."],
    ["The Church and Cultural Differences","The New Testament addresses unity across ethnic and social boundaries, especially the inclusion of Gentiles. See Acts 10-11; 15; Galatians 2:11-21; Ephesians 2:11-22."],
    ["The Church and Spiritual Gifts","The church is strengthened when gifts are exercised in love and for the common good. See Romans 12:3-8; 1 Corinthians 12-14; Ephesians 4:7-16."],
    ["The Church and Missionary Sending","The church worships, discerns and sends workers for gospel mission. See Acts 13:1-4; 14:26-28; 15:36-41."],
    ["The Church and Mutual Accountability","Believers are called to encourage, correct and restore one another with humility. See Matthew 18:15-20; Galatians 6:1-2; Hebrews 10:24-25."],
    ["The Church and Holiness","The church is called to be a holy people whose conduct reflects God's character. See 1 Corinthians 5:6-8; 2 Corinthians 6:14-7:1; Ephesians 5:1-14; 1 Peter 1:13-16."],
    ["The Church and Love","Love is the defining mark of Christian community and the measure of spiritual gifts. See John 13:34-35; 1 Corinthians 13; Ephesians 4:15-16."],
    ["The Church and Hope","The church lives between Christ's resurrection and His return, encouraging one another with the promise of resurrection. See 1 Thessalonians 4:13-18; Titus 2:11-14; Hebrews 10:23-25."],
    ["The Church and Truth","The church is called to hold to apostolic teaching and speak truth in love. See Acts 2:42; Ephesians 4:11-16; 1 Timothy 3:14-15; 2 Timothy 4:1-5."],
    ["The Church and the Poor","The New Testament makes care for poor believers and neighbours a visible expression of gospel fellowship. See Acts 6:1-7; Galatians 2:10; James 2:1-17; 1 John 3:16-18."],
    ["The Church and Hospitality","Hospitality strengthens Christian fellowship and supports mission. See Romans 12:13; 1 Timothy 3:2; 5:10; 1 Peter 4:9."],
    ["The Church and Peacemaking","The church is to preserve unity through humility, patience and reconciliation. See Ephesians 4:1-6; Colossians 3:12-15; James 3:17-18."],
    ["The Church and Worship","The gathered church worships through prayer, teaching, singing, thanksgiving and mutual edification. See Acts 2:42; 1 Corinthians 14:26; Ephesians 5:18-20; Colossians 3:16."],
    ["The Church and Singing","New Testament singing teaches, encourages and expresses gratitude to God. See Acts 16:25; 1 Corinthians 14:15; Ephesians 5:19; Colossians 3:16."],
    ["Psalms, Hymns and Spiritual Songs","Paul encourages the church to sing psalms, hymns and spiritual songs as a means of teaching, gratitude and worship. See Ephesians 5:18-20; Colossians 3:16."],
    ["The Song of Moses","The song after the Exodus celebrates God's deliverance and kingship, and is echoed in later biblical worship. See Exodus 15:1-18; Revelation 15:3-4."],
    ["The Song of Hannah","Hannah's prayer celebrates God's reversal of human pride and His care for the lowly, themes echoed in Mary's song. See 1 Samuel 2:1-10; Luke 1:46-55."],
    ["The Magnificat of Mary","Mary's song praises God's mercy, faithfulness and reversal of unjust status. See Luke 1:46-55; compare 1 Samuel 2:1-10."],
    ["The Song of Zechariah","Zechariah's prophecy celebrates God's covenant faithfulness and the coming mission of John and Jesus. See Luke 1:67-79."],
    ["The Song of Simeon","Simeon praises God for seeing His salvation in the infant Jesus, a light for the nations. See Luke 2:25-35."],
    ["The Songs of Revelation","Revelation's songs proclaim God's holiness, the Lamb's worthiness and the victory of His kingdom. See Revelation 4:8-11; 5:8-14; 7:9-12; 15:2-4."],
    ["The Psalms of Ascent","Psalms 120-134 are associated with pilgrimage and explore trust, worship, community and blessing. Read them as a collection."],
    ["The Hallelujah Psalms","Psalms 146-150 close the Psalter with repeated calls to praise, grounding worship in God's character and works."],
    ["The Penitential Psalms","Several psalms give language to confession and repentance, showing honest sorrow and trust in God's mercy. See Psalms 6; 32; 38; 51; 102; 130; 143."],
    ["The Royal Psalms","Royal psalms celebrate the king and God's covenant rule, and later biblical texts connect them with messianic hope. See Psalms 2; 45; 72; 89; 110."],
    ["The Messianic Psalms","The New Testament applies selected psalms to Jesus, especially His kingship, suffering and priesthood. Study the original psalm and its apostolic use. See Psalms 2; 22; 69; 110."],
    ["The Psalms of Trust","Psalms of trust express confidence in God's protection and presence amid danger. See Psalms 16; 23; 27; 46; 91; 121."],
    ["The Psalms of Lament","Lament psalms give voice to distress and appeal to God's justice, often moving toward renewed trust. See Psalms 13; 22; 42; 77; 88."],
    ["The Psalms of Thanksgiving","Thanksgiving psalms remember deliverance and invite the community to praise God. See Psalms 30; 34; 40; 107; 116."],
    ["The Psalms of Creation","Creation psalms praise God's wisdom and sustaining care over the world. See Psalms 8; 19; 29; 104; 148."],
    ["The Psalms of God's Kingship","Enthronement psalms celebrate the Lord's reign over all nations and creation. See Psalms 47; 93; 96-99."],
    ["The Wisdom of Ecclesiastes on Time","Ecclesiastes 3 reflects on seasons and human limits, calling readers to receive life as God's gift. See Ecclesiastes 3:1-15."],
    ["The Fear of Death and the Hope of Life","Scripture faces mortality honestly and places hope in God's resurrection power. See Psalm 90; Ecclesiastes 12:1-7; John 11:25-26; 1 Corinthians 15."],
    ["The Value of Human Life","Biblical teaching on creation, neighbour-love and justice grounds the dignity and protection of human life. See Genesis 1:26-28; Psalm 139:13-16; Matthew 5:21-22; James 3:9-10."],
    ["The Ethics of the Tongue","James and Proverbs warn that speech can bless or destroy and call for disciplined, truthful words. See Proverbs 18:21; James 3:1-12; 1 Peter 3:10."],
    ["The Power of Encouraging Words","Scripture commends words that build up, comfort and give grace to hearers. See Proverbs 16:24; Ephesians 4:29; 1 Thessalonians 5:11, 14."],
    ["Gossip and Slander","The Bible warns against speech that damages trust and reputation, calling for truth and love. See Proverbs 11:13; 16:28; 2 Corinthians 12:20; James 4:11."],
    ["Wisdom in Listening","Listening before speaking is a mark of humility and wise judgment. See Proverbs 18:13; 19:20; James 1:19-20."],
    ["Promises and Vows","Scripture treats vows seriously and warns against careless promises. Jesus calls for truthful speech without manipulative oath-taking. See Numbers 30:1-2; Ecclesiastes 5:1-7; Matthew 5:33-37."],
    ["Integrity in Secret","Jesus teaches that devotion should be directed to the Father rather than performed for public recognition. See Matthew 6:1-18; Proverbs 10:9."],
    ["Giving in Secret","Jesus warns against using generosity for applause and calls for sincere giving before the Father. See Matthew 6:1-4; 2 Corinthians 9:7."],
    ["Fasting without Hypocrisy","Jesus teaches that fasting should be directed toward God rather than public display. See Matthew 6:16-18; Isaiah 58:3-12."],
    ["Serving without Recognition","Jesus calls disciples to serve humbly without seeking status or reward. See Matthew 6:1-4; 20:25-28; Luke 17:7-10."],
    ["The Danger of Hypocrisy","Jesus confronts outward religion that hides injustice and neglects the heart. See Matthew 6:1-18; 23:1-36; Luke 12:1-3."],
    ["Religious Pride and Humility","Scripture warns against boasting in religious achievement and commends humble dependence on God's mercy. See Luke 18:9-14; Romans 3:27; James 4:6-10."],
    ["Legalism and the Gospel","The New Testament rejects human rules as a basis for earning righteousness while affirming obedience flowing from faith. See Mark 7:1-13; Galatians 2:15-21; Colossians 2:16-23."],
    ["Tradition and Scripture","Jesus critiques traditions that nullify God's command, while Scripture also values faithful teaching handed down. Examine each context. See Mark 7:1-13; 1 Corinthians 11:2; 2 Thessalonians 2:15."],
    ["The Sabbath Controversies of Jesus","Jesus' Sabbath actions reveal the purpose of the Sabbath and His authority. See Mark 2:23-3:6; Luke 13:10-17; John 5:1-18."],
    ["The New Birth and the Kingdom","Jesus connects entering God's kingdom with birth from above by the Spirit. See John 3:1-21; Titus 3:4-7."],
    ["The Water of Life","Biblical water imagery can signify cleansing, life and the Spirit. Study its use in each passage. See Isaiah 55:1-3; John 4:7-14; 7:37-39; Revelation 22:17."],
    ["The Bread of Life and Daily Dependence","Jesus' bread teaching connects belief in Him with life, while the Lord's Prayer teaches daily dependence for provision. See Matthew 6:11; John 6:25-59."],
    ["The Light of God's Word","Scripture uses light imagery for guidance, truth and revelation. See Psalm 119:105, 130; Proverbs 6:23; 2 Peter 1:19."],
    ["The Lamp and the Eye","Jesus uses lamp imagery to teach about perception, generosity and the condition of the heart. Compare Matthew 6:22-23; Luke 11:33-36."],
    ["The Vineyards and Harvest in Scripture","Harvest imagery depicts judgment, provision, mission and the growth of God's kingdom. See Joel 3:13; Matthew 9:37-38; John 4:35-38; Revelation 14:14-20."],
    ["The Harvest and Mission","Jesus describes the fields as ready for harvest and calls disciples to pray for workers. See Matthew 9:35-38; Luke 10:1-2; John 4:34-38."],
    ["The Sower and the Seed in the Prophets","Seed imagery in the prophets and Jesus' teaching describes God's word, promise and kingdom growth. See Isaiah 55:10-11; Mark 4:1-20."],
    ["The Olive Tree in Scripture","Olive tree imagery appears in covenant, blessing and Paul's discussion of Israel and Gentile inclusion. See Psalm 52:8; Jeremiah 11:16; Romans 11:16-24."],
    ["The Fig Tree in Scripture","Fig tree imagery can signify fruitfulness, judgment and seasonal discernment. Interpret each occurrence within its context. See Jeremiah 8:13; Hosea 9:10; Mark 11:12-25; Luke 21:29-31."],
    ["The Shepherd Imagery of Scripture","Shepherd imagery describes God's care, Israel's leaders and Jesus' self-giving ministry. See Psalm 23; Ezekiel 34; John 10; 1 Peter 5:1-4."],
    ["The Rock as Biblical Image","Rock imagery describes God's stability, refuge and faithfulness, and is applied to Christ in the New Testament. See Deuteronomy 32:4; Psalm 18:2; 1 Corinthians 10:4; 1 Peter 2:4-8."],
    ["The Living Water in the Prophets","Prophetic water imagery portrays God as the source of life and cleansing. See Jeremiah 2:13; 17:13; Ezekiel 47:1-12; Zechariah 14:8."],
    ["The Wilderness as a Place of Encounter","The wilderness is a setting for testing, provision, calling and renewal throughout Scripture. See Exodus 3; 16-17; 1 Kings 19:1-18; Mark 1:12-13."],
    ["Mountains in Biblical Revelation","Mountains often serve as settings for covenant, prayer, revelation and encounter with God. See Exodus 19; 1 Kings 19; Matthew 5:1; 17:1-8."],
    ["The Sea in Biblical Imagery","The sea can represent danger, chaos and the reach of God's power. Trace the imagery from creation to Revelation. See Genesis 1:2; Psalm 89:9; Mark 4:35-41; Revelation 21:1."],
    ["The City of God","Jerusalem and the New Jerusalem represent worship, covenant identity and God's dwelling with His people. See Psalm 87; Isaiah 2:1-4; Hebrews 12:22-24; Revelation 21."],
    ["Exile and Return","Exile reveals the consequences of covenant unfaithfulness, while return expresses God's mercy and renewed hope. See Deuteronomy 30:1-10; Jeremiah 29; Ezra 1; Ezekiel 36:22-28."],
    ["The Remnant in Scripture","The remnant theme describes God's preservation of a people through judgment and exile. See Isaiah 10:20-23; Micah 5:7-8; Romans 9:27-29; 11:1-5."],
    ["The Nations Worship the Lord","The prophets anticipate nations coming to worship Israel's God, a hope echoed in the church's mission. See Psalm 67; Isaiah 2:1-4; Zechariah 8:20-23; Revelation 7:9-10."],
    ["The Blessing of Abraham","God's promise to Abraham includes descendants, land and blessing for the nations, and shapes the New Testament's account of faith. See Genesis 12:1-3; 15:1-6; Galatians 3:6-14."],
    ["The Faith of Abraham","Abraham trusts God's promise despite uncertainty, becoming a key example in Jewish and Christian reflection on faith. See Genesis 15:1-6; 22:1-18; Romans 4; Hebrews 11:8-19."],
    ["The Faith of Sarah","Sarah's story includes doubt, waiting and the fulfilment of God's promise. Hebrews remembers her in the story of faith. See Genesis 18:1-15; 21:1-7; Hebrews 11:11-12."],
    ["The Faith of Moses","Moses' life shows trust, reluctant calling, leadership and perseverance under pressure. See Exodus 3-4; 14; Hebrews 11:23-29."],
    ["The Faith of Joshua and Caleb","Joshua and Caleb model trust in God's promise amid fearful reports and difficult leadership. See Numbers 13-14; Joshua 14:6-14."],
    ["The Faith of David","David's story includes courage, worship, repentance and serious failure. Study the whole narrative rather than idealising the king. See 1 Samuel 17; 2 Samuel 7; 11-12; Psalm 51."],
    ["The Faith of Elijah","Elijah's ministry confronts idolatry and includes both public courage and personal exhaustion. See 1 Kings 17-19; 21; 2 Kings 2."],
    ["The Faith of Elisha","Elisha's ministry includes prophetic signs, compassion and witness to God's power among Israel and neighbouring peoples. See 2 Kings 2-8."],
    ["The Faith of Daniel's Friends","Shadrach, Meshach and Abednego refuse idolatrous worship and entrust themselves to God amid danger. See Daniel 3."],
    ["The Faith of Esther","Esther's courage and advocacy help preserve her people under threat. See Esther 4:12-17; 7:1-6."],
    ["The Faith of Mary Magdalene","The Gospels portray Mary Magdalene as a devoted follower and a witness to the risen Jesus. See Luke 8:1-3; John 19:25; 20:1-18."],
    ["The Faith of Mary of Bethany","Mary of Bethany listens to Jesus and later anoints Him, expressing devotion and insight. See Luke 10:38-42; John 11:1-2; 12:1-8."],
    ["The Faith of Martha","Martha's story includes service, confession of faith and grief met by Jesus' promise of resurrection. See Luke 10:38-42; John 11:17-27."],
    ["The Faith of the Samaritan Woman","Jesus' conversation with the Samaritan woman reveals His knowledge, living water and the widening reach of worship. See John 4:1-42."],
    ["The Faith of the Centurion","The centurion's trust in Jesus' authority crosses social and ethnic boundaries. See Matthew 8:5-13; Luke 7:1-10."],
    ["The Faith of the Canaanite Woman","Jesus' encounter with the Canaanite woman explores faith, persistence and the reach of His mission. See Matthew 15:21-28; Mark 7:24-30."],
    ["The Faith of the Thief on the Cross","Luke records a condemned man turning to Jesus and receiving a promise of hope. See Luke 23:39-43."],
    ["The Faith of the Early Martyrs","The New Testament portrays faithful witness under threat and calls the church to endure with hope. See Acts 7; 12; Revelation 2:8-11; 6:9-11."],
    ["The Witness of the Prophets","The prophets speak God's word to rulers and communities, calling for covenant faithfulness, justice and hope. See Hebrews 1:1-2; 2 Peter 1:19-21."],
    ["The Role of Prophets in Israel","Prophets call kings and people back to God's covenant, announce judgment and proclaim restoration. Study their historical settings and messages."],
    ["The Call of Isaiah","Isaiah's vision of God's holiness leads to confession, cleansing and a commission to speak. See Isaiah 6:1-13."],
    ["The Call of Jeremiah","Jeremiah's calling includes God's prior knowledge, prophetic responsibility and opposition. See Jeremiah 1:4-19."],
    ["The Call of Ezekiel","Ezekiel's vision and commission prepare him to speak to exiles and proclaim God's glory and restoration. See Ezekiel 1-3."],
    ["The Call of Amos","Amos is sent from his ordinary work to confront injustice and empty worship in Israel. See Amos 1-2; 5:10-24; 7:10-17."],
    ["The Call of Jonah","Jonah's story explores reluctant mission, God's compassion for outsiders and the prophet's resistance. See Jonah 1-4."],
    ["The Call of Samuel","Samuel's calling teaches attentiveness to God's word amid a period of spiritual decline. See 1 Samuel 3:1-21."],
    ["The Call of Gideon","Gideon's calling includes fear, signs and God's patient assurance, while the wider story warns against misplaced trust in power. See Judges 6-8."],
    ["The Call of Deborah","Deborah serves as prophet and judge, encouraging Barak and leading Israel toward deliverance. See Judges 4-5."],
    ["The Call of Nehemiah","Nehemiah responds to Jerusalem's distress with grief, prayer, planning and courageous leadership. See Nehemiah 1-2."],
    ["The Call of the Disciples","Jesus calls ordinary people to leave former priorities and join His mission. See Matthew 4:18-22; Mark 1:16-20; Luke 5:1-11."],
    ["The Call of Matthew","Jesus calls a tax collector and shares a meal with outsiders, revealing His mission to sinners. See Matthew 9:9-13; Mark 2:13-17; Luke 5:27-32."],
    ["The Call of Zacchaeus","Jesus seeks Zacchaeus, whose encounter leads to repentance, restitution and salvation in his household. See Luke 19:1-10."],
    ["The Call of the Rich Young Ruler","Jesus exposes the ruler's attachment to wealth and calls him to follow. See Mark 10:17-31; Matthew 19:16-30; Luke 18:18-30."],
    ["The Call of Nicodemus","Jesus teaches Nicodemus about new birth and God's saving love. Nicodemus later appears in the burial narrative. See John 3:1-21; 7:45-52; 19:38-42."],
    ["The Call of Philip","Philip follows Jesus and brings Nathanael, later serving as a witness in Samaria and to an Ethiopian official. See John 1:43-46; Acts 8:4-40."],
    ["The Call of Nathanael","Jesus meets Nathanael's scepticism with personal knowledge and reveals His identity as Son of God and King of Israel. See John 1:45-51."],
    ["The Call of Peter","Peter's calling moves from fishing to following Jesus and eventually shepherding His people. See Luke 5:1-11; John 21:15-19."],
    ["The Call of Paul","Paul's encounter with the risen Jesus redirects his life toward apostolic witness among the nations. See Acts 9:1-22; 22:1-21; 26:9-23."],
    ["Mentoring and Spiritual Formation","Scripture shows faith being passed on through teaching, example and shared life. See Deuteronomy 6:4-9; 2 Timothy 2:1-2; Titus 2:1-8."],
    ["Discipling New Believers","The church is called to teach new believers the way of Jesus and help them grow in faithful practice. See Matthew 28:19-20; Acts 2:41-42; Colossians 1:28-29."],
    ["Teaching Children the Scriptures","The Bible places responsibility on families and communities to teach God's works and commands to the next generation. See Deuteronomy 6:6-9; Psalm 78:1-8; 2 Timothy 3:14-15."],
    ["Remembering God's Works","Biblical remembrance strengthens faith by recalling God's acts and covenant faithfulness. See Deuteronomy 8:2-18; Psalm 77:11-15; Luke 22:19."],
    ["The Importance of Testimony","Witness tells what God has done and points hearers toward Christ, while remaining truthful and humble. See Psalm 66:16; John 9:24-25; Acts 22:1-21; Revelation 12:11."],
    ["The Power of Testimony in the Church","Personal testimony can encourage faith and proclaim God's mercy, but must remain accountable to Scripture and truth. See Acts 4:20; 1 John 1:1-3; Revelation 12:11."],
    ["The Call to Holiness in the Home","Christian faith is lived in household relationships through love, patience, truth and mutual responsibility. See Colossians 3:12-21; Ephesians 5:21-6:4."],
    ["Faithfulness in Small Things","Jesus teaches that faithfulness in small responsibilities reveals character and prepares for greater trust. See Luke 16:10-12; 19:17; Matthew 25:21."],
    ["Waiting without Idleness","Biblical waiting is active faithfulness, not passivity. Believers are called to work, serve and remain hopeful. See 1 Thessalonians 1:9-10; 2 Thessalonians 3:6-13; James 5:7-11."],
    ["Planning with Humility","Scripture encourages wise planning while recognising human limits and God's providence. See Proverbs 16:3, 9; 19:21; Luke 14:28-33; James 4:13-16."],
    ["Decision-Making with Wisdom","Biblical wisdom seeks counsel, considers consequences and honours God's instruction. See Proverbs 11:14; 15:22; James 1:5; 3:13-18."],
    ["Courage to Do What Is Right","God's people are called to choose faithfulness even when obedience carries cost. See Daniel 3; Esther 4:13-16; Acts 4:18-20."],
    ["Faithfulness under Pressure","Scripture encourages integrity when believers face pressure to compromise. See Daniel 1; 6; Acts 5:27-32; 1 Peter 4:12-16."],
    ["Contentment in Every Circumstance","Paul describes learning contentment through dependence on Christ in changing circumstances. See Philippians 4:10-13; 1 Timothy 6:6-8; Hebrews 13:5-6."],
    ["Hope for the Weary","God's word offers strength to the weary and calls them to rest in His care. See Isaiah 40:28-31; Matthew 11:28-30; Galatians 6:9."],
    ["Rest for the Soul","Jesus invites the burdened to come to Him and learn His gentle way. See Matthew 11:28-30; Psalm 62:1-8; Hebrews 4:9-11."],
    ["God's Presence in Trouble","Scripture assures God's people of His presence amid danger and sorrow, without promising exemption from hardship. See Psalm 46; Isaiah 43:1-3; Matthew 28:20."],
    ["The Refuge and Strength of God","The Psalms describe God as refuge and strength, inviting trust in times of upheaval. See Psalms 18:1-3; 46:1-11; 91:1-16."],
    ["The Lord as Provider","Biblical provision includes daily needs, covenant care and generosity through God's people. See Genesis 22:1-14; Psalm 23:1; Matthew 6:25-34; Philippians 4:19."],
    ["The Lord as Healer","Scripture names God as healer and records Jesus' healing ministry, while holding together prayer, suffering and hope. See Exodus 15:26; Psalm 103:1-5; Mark 1:29-34; James 5:13-16."],
    ["The Lord as Shepherd","God's shepherd care includes guidance, protection, provision and restoration. See Psalm 23; Isaiah 40:10-11; Ezekiel 34:11-16; John 10:11-16."],
    ["The Lord as Refuge","God is portrayed as a secure refuge for those who seek Him, especially in danger and distress. See Psalms 9:9-10; 18:2; 57:1; 62:7-8."],
    ["The Lord as Rock","The rock image conveys God's reliability and strength, contrasting Him with unstable human powers. See Deuteronomy 32:3-4; Psalm 18:2; 2 Samuel 22:2-3."],
    ["The Lord as Light","God's light guides, saves and reveals truth. See Psalm 27:1; 36:9; Isaiah 60:1-3; 1 John 1:5-7."],
    ["The Lord as King","The Bible proclaims God's kingship over Israel, the nations and all creation. See Psalm 47; 93; 96-99; Revelation 11:15."],
    ["The Lord as Judge","God judges with righteousness and impartiality, defending the vulnerable and confronting evil. See Genesis 18:25; Psalm 96:10-13; Acts 17:30-31; Romans 2:5-11."],
    ["The Lord as Father","Jesus reveals God as Father and teaches His disciples to approach Him with trust and reverence. See Matthew 6:9-13; Luke 15:11-32; John 20:17; Romans 8:15."],
    ["The Lord as Creator","Scripture presents God as the maker and sustainer of all things, grounding worship and human responsibility. See Genesis 1-2; Psalm 104; Acts 17:24-28; Colossians 1:16-17."],
    ["The Lord as Redeemer","God redeems His people from bondage and, in Christ, brings deliverance from sin. See Exodus 6:6; Psalm 130:7-8; Ephesians 1:7; Titus 2:13-14."],
    ["The Lord as Deliverer","Biblical deliverance includes rescue from enemies, oppression and sin, and calls for trust and gratitude. See Exodus 14; Psalm 34:17; Colossians 1:13-14."],
    ["The Lord as the God of Peace","God's peace is tied to His saving presence and the reconciliation accomplished through Christ. See Judges 6:22-24; Romans 15:33; 16:20; Hebrews 13:20."],
    ["The Lord as the God of Hope","God gives hope through Scripture, the Spirit and the resurrection of Jesus. See Romans 15:4, 13; 1 Peter 1:3-5."],
    ["The Lord as the God of All Comfort","Paul praises God as the source of comfort in affliction and connects received comfort with comforting others. See 2 Corinthians 1:3-7."],
    ["The Lord as the God Who Sees","Biblical narratives use the language of God seeing distress and responding with care. See Genesis 16:7-14; Exodus 3:7-10; Psalm 33:13-15."],
    ["The Lord Who Hears Prayer","Scripture encourages prayer because God hears His people, while also teaching humility and alignment with His will. See Psalm 34:15-18; Matthew 7:7-11; 1 John 5:14-15."],
    ["The Lord Who Keeps Covenant","God's covenant faithfulness is a recurring ground for worship, repentance and hope. See Deuteronomy 7:7-9; Nehemiah 9:32; Daniel 9:4; Luke 1:72-73."],
    ["The Lord Who Gives Wisdom","God gives wisdom generously to those who ask and seek His instruction. See 1 Kings 3:5-14; Proverbs 2:1-11; James 1:5-8."],
    ["The Lord Who Raises the Dead","The Bible's hope rests on God's power to give life, culminating in Jesus' resurrection and the future resurrection. See 1 Samuel 2:6; John 5:21-29; Romans 8:11; 1 Corinthians 15."],
    ["The Lord Who Makes All Things New","God promises renewal beyond sin, death and sorrow, fulfilled in the new creation. See Isaiah 43:18-19; 2 Corinthians 5:17; Revelation 21:1-5."],
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
  const KJV_API = "https://bible.helloao.org/api/eng_kjv/";
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
  // A fast second tap must invalidate the first contextual panel. Keep one
  // keyboard listener at a time so repeated word taps cannot leak handlers.
  let wordContextRequest = 0;
  let activeWordContextCleanup = null;

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

    target.textContent = selectedEnglishWord
      ? "Finding the original-language record for “" + selectedEnglishWord + "”…"
      : "Tap a word in the selected verse to open its focused word study.";
    if (!selectedEnglishWord) {
      lexiconBox.replaceChildren();
      return;
    }

    try {
      const code = apiBookCode(ref.book);
      if (!code) throw new Error("This Bible book is not mapped for original-language study.");

      const [data, kjvChapter, kjvWordData] = await Promise.all([
        fetchStudyJson(INTERLINEAR_API + code + "/" + ref.chapter + ".json"),
        fetchStudyJson(KJV_API + code + "/" + ref.chapter + ".simple.json"),
        fetchStudyJson(KJV_API + code + "/" + ref.chapter + ".words.simple.json")
      ]);
      if (requestId !== originalWordsRequest) return;

      const verses = data.chapter && Array.isArray(data.chapter.content)
        ? data.chapter.content : [];
      const verseData = verses.find(item => Number(item.verse) === Number(ref.verse));
      if (!verseData || !Array.isArray(verseData.words) || !verseData.words.length) {
        target.textContent = "No original-language word records were supplied for this verse.";
        return;
      }

      const kjvVerses = kjvChapter.chapter && Array.isArray(kjvChapter.chapter.content)
        ? kjvChapter.chapter.content : [];
      const kjvVerse = kjvVerses.find(item =>
        item.type === "verse" && Number(item.number) === Number(ref.verse)
      );
      const annotations = kjvWordData.verses &&
        Array.isArray(kjvWordData.verses[String(ref.verse)])
        ? kjvWordData.verses[String(ref.verse)] : [];
      const linker = window.ZurielWordLinking;
      const linkedWord = linker && typeof linker.matchSelectedKJVWord === "function"
        ? linker.matchSelectedKJVWord(
            ref.text || "",
            kjvVerse && kjvVerse.text || "",
            annotations,
            selectedEnglishWordIndex
          )
        : { ok: false, reason: "The exact KJV word-linking resource is not available." };

      target.replaceChildren();
      lexiconBox.replaceChildren();
      if (!linkedWord.ok) {
        const note = document.createElement("p");
        note.className = "study-small";
        note.textContent = linkedWord.reason +
          " Zuriel will not guess which Hebrew or Greek word belongs to this English word.";
        target.appendChild(note);
        return;
      }

      const strongsIds = new Set(linkedWord.strongs
        .map(normalizeStrongs).filter(Boolean));
      if (!strongsIds.size) {
        const note = document.createElement("p");
        note.className = "study-small";
        note.textContent = "No Strong's annotation is supplied for “" +
          selectedEnglishWord + "” in this KJV verse. The word remains readable, but Zuriel will not invent an original-language link.";
        target.appendChild(note);
        return;
      }

      const exactMatches = verseData.words.filter(function (word) {
        return strongsIds.has(normalizeStrongs(word.strongs));
      });
      if (!exactMatches.length) {
        const note = document.createElement("p");
        note.className = "study-small";
        note.textContent = "The KJV annotation supplies " + [...strongsIds].join(", ") +
          ", but no matching word record was found in the BSB interlinear verse. The source datasets do not align for every item, so Zuriel will not substitute a gloss-based guess.";
        target.appendChild(note);
        return;
      }

      const intro = document.createElement("p");
      intro.className = "study-small";
      intro.textContent = "Focused study for “" + selectedEnglishWord +
        "” — linked through the KJV word annotation and matching Strong's index.";
      target.appendChild(intro);

      const methodNote = document.createElement("p");
      methodNote.className = "study-small";
      methodNote.textContent = "The selected KJV word is matched by its source character range, then joined to the Berean interlinear records by Strong's number. The interlinear gloss is the Berean Standard Bible's English phrase, not a KJV definition. Read the verse and paragraph in context; source alignments can differ and no missing link is guessed. Grammar details are shown only when supplied by the source.";
      target.appendChild(methodNote);

      exactMatches.forEach(function (word) {
        const card = document.createElement("div");
        card.className = "original-word-card";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "original-word-button";

        const languageLabel = document.createElement("span");
        const languageNames = {
          hebrew: "Hebrew",
          greek: "Greek",
          aramaic: "Aramaic"
        };
        const languageCode = String(word.language || "").trim().toLowerCase();
        const languageName = languageNames[languageCode];
        languageLabel.className = "word-language";
        languageLabel.textContent = languageName
          ? languageName + " source"
          : "Source language not identified";
        card.appendChild(languageLabel);

        const original = document.createElement("span");
        original.className = "original-script";
        original.dir = languageCode === "hebrew" || languageCode === "aramaic" ? "rtl" : "ltr";
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
      target.replaceChildren();

      const message = document.createElement("p");
      message.className = "study-small";
      message.textContent = !navigator.onLine
        ? "You are offline and this word-study resource is not saved on this device yet. Connect once to load it and make it available for later offline study."
        : "The original-language resource could not be loaded right now. Your selected verse is safe; please try again in a moment.";
      target.appendChild(message);

      const retry = document.createElement("button");
      retry.type = "button";
      retry.className = "study-secondary";
      retry.textContent = "Try loading word study again";
      retry.addEventListener("click", function () {
        loadOriginalWords(ref);
      });
      target.appendChild(retry);
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
      if (!entry || !Array.isArray(entry.senses) || !entry.senses.length) {
        throw new Error("No verified lexicon senses were returned for " + id + ".");
      }

      box.replaceChildren();
      const heading = document.createElement("h3");
      const lexiconLanguage = String(entry.language || "").trim().toLowerCase();
      const lexiconLanguageNames = { hebrew: "Hebrew", greek: "Greek", aramaic: "Aramaic" };
      heading.textContent = "Strong's " + id + " — " +
        (lexiconLanguageNames[lexiconLanguage] || "source language not identified");
      box.appendChild(heading);

      const sourceNotice = document.createElement("p");
      sourceNotice.className = "study-small";
      sourceNotice.textContent = "Language and grammatical details below are shown only when supplied by the source. Interlinear tables: Berean Standard Bible (public domain). Lexicon: STEPBible.org / Tyndale House, Cambridge (CC BY 4.0), adapted by the Free Use Bible API. Zuriel does not infer missing morphology or language metadata.";
      box.appendChild(sourceNotice);

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

        const morphologyValue = sense.morphology || sense.parsingFull || sense.parsing;
        const morphology = document.createElement("p");
        morphology.textContent = morphologyValue
          ? "Morphology supplied by source: " + String(morphologyValue)
          : "Detailed morphology: not supplied by this lexicon record.";
        item.appendChild(morphology);

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
                if (typeof window.selectBibleVerse !== "function" ||
                    !window.selectBibleVerse(item.verse)) {
                  console.warn("Zuriel topical connection could not activate its referenced verse.");
                }
              }).catch(function (error) {
                console.error("Zuriel topical connection:", error);
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
        const method = document.createElement("p");
        method.className = "study-small";
        method.textContent = "These verses contain the same Strong's index in the supplied interlinear chapter data. Compare each sentence carefully: an indexed word can carry different shades of meaning in different contexts.";
        related.appendChild(method);

        uniqueVerses.forEach(function (item) {
          const occurrence = document.createElement("div");
          occurrence.className = "lexicon-entry";
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
              if (typeof window.selectBibleVerse !== "function" ||
                  !window.selectBibleVerse(item.verse)) {
                throw new Error("That verse could not be activated in the reader.");
              }
            } catch (error) {
              button.disabled = false;
              console.error("Zuriel related word occurrence:", error);
            }
          });
          occurrence.appendChild(button);

          const verseElement = Array.from(document.querySelectorAll("#message .verse"))
            .find(function (element) {
              const label = element.querySelector("strong");
              return label && Number(label.textContent.replace(/\D/g, "")) === item.verse;
            });
          if (verseElement) {
            const excerpt = document.createElement("p");
            excerpt.className = "study-small";
            excerpt.textContent = "KJV context: " +
              verseElement.textContent.replace(/^\s*\d+\.?\s*/, "").trim();
            occurrence.appendChild(excerpt);
          }
          related.appendChild(occurrence);
        });
      } else {
        const line = document.createElement("p");
        line.textContent = "No other occurrence of this Strong's number was found in this chapter.";
        related.appendChild(line);
      }
      box.appendChild(related);
    } catch (error) {
      if (requestId !== lexiconRequest) return;
      box.replaceChildren();

      const message = document.createElement("p");
      message.className = "study-small";
      message.textContent = !navigator.onLine
        ? "You are offline and this lexicon entry has not been saved on this device yet. Connect once to load it for later offline study."
        : "The lexicon entry could not be loaded right now. Your selected Scripture and original word remain available.";
      box.appendChild(message);

      const retry = document.createElement("button");
      retry.type = "button";
      retry.className = "study-secondary";
      retry.textContent = "Retry lexicon entry";
      retry.addEventListener("click", function () {
        loadLexiconEntry(strongs, card, chapterData, ref);
      });
      box.appendChild(retry);
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
            if (typeof window.selectBibleVerse !== "function" ||
                !window.selectBibleVerse(verseNumber)) {
              throw new Error("The connected verse could not be activated in the reader.");
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

  function createStudySectionArtwork(index, heading) {
    const themes = [
      { name:"Historical context", hue:211, mark:'<path d="M80 112Q145 72 210 112V184Q145 144 80 184Z M210 112Q275 72 340 112V184Q275 144 210 184Z" fill="none" stroke="#f4e6c5" stroke-width="9" stroke-linejoin="round"/><path d="M210 112V184" stroke="#d9bd79" stroke-width="6"/>' },
      { name:"Meaning and exposition", hue:228, mark:'<circle cx="210" cy="135" r="67" fill="none" stroke="#f4e6c5" stroke-width="8"/><path d="M210 52V91M210 179V218M127 135H166M254 135H293M165 90L191 116M229 154L255 180M255 90L229 116M191 154L165 180" stroke="#d9bd79" stroke-width="8" stroke-linecap="round"/>' },
      { name:"Prayer and faith", hue:33, mark:'<path d="M210 58V95M165 72L184 105M255 72L236 105M132 114L171 127M288 114L249 127" stroke="#f4e6c5" stroke-width="8" stroke-linecap="round"/><path d="M174 145Q210 117 246 145V193H174Z" fill="#d9bd79"/><path d="M190 145V130Q210 105 230 130V145" fill="none" stroke="#f4e6c5" stroke-width="8"/>' },
      { name:"Hebrew and Greek", hue:159, mark:'<text x="210" y="154" text-anchor="middle" font-family="serif" font-size="92" font-weight="bold" fill="#fff3d7">א Ω</text><path d="M130 182H290" stroke="#d9bd79" stroke-width="6" stroke-linecap="round"/>' },
      { name:"Biblical dictionary", hue:267, mark:'<path d="M145 62H260Q280 62 280 82V192H165Q145 192 145 172Z" fill="none" stroke="#f4e6c5" stroke-width="8"/><path d="M165 95H255M165 124H255M165 153H230" stroke="#d9bd79" stroke-width="7" stroke-linecap="round"/>' },
      { name:"Connected Scriptures", hue:190, mark:'<circle cx="145" cy="130" r="36" fill="none" stroke="#f4e6c5" stroke-width="8"/><circle cx="275" cy="130" r="36" fill="none" stroke="#f4e6c5" stroke-width="8"/><circle cx="210" cy="70" r="27" fill="none" stroke="#d9bd79" stroke-width="7"/><path d="M174 112L191 91M229 91L246 112M181 130H239" stroke="#d9bd79" stroke-width="8" stroke-linecap="round"/>' },
      { name:"Theology and deeper study", hue:244, mark:'<path d="M210 52L283 93V177L210 218L137 177V93Z" fill="none" stroke="#f4e6c5" stroke-width="8"/><path d="M210 83V145M210 174V178" stroke="#d9bd79" stroke-width="12" stroke-linecap="round"/>' },
      { name:"Topical connections", hue:145, mark:'<path d="M210 48L232 112L300 112L245 151L266 216L210 176L154 216L175 151L120 112L188 112Z" fill="none" stroke="#f4e6c5" stroke-width="8" stroke-linejoin="round"/>' },
      { name:"Personal study journal", hue:18, mark:'<path d="M150 55H265Q285 55 285 75V200H170Q150 200 150 180Z" fill="none" stroke="#f4e6c5" stroke-width="8"/><path d="M180 96H255M180 128H255M180 160H235" stroke="#d9bd79" stroke-width="7" stroke-linecap="round"/><path d="M135 75V200" stroke="#d9bd79" stroke-width="8"/>' },
      { name:"Prayer and declaration", hue:45, mark:'<path d="M210 55C175 96 145 126 145 160A65 65 0 0 0 275 160C275 126 245 96 210 55Z" fill="none" stroke="#f4e6c5" stroke-width="8"/><path d="M178 155L200 177L245 128" fill="none" stroke="#d9bd79" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>' }
    ];
    const theme = themes[index % themes.length];
    const words = String(heading || theme.name).split(/\s+/);
    const rows = [];
    let row = "";
    words.forEach(function (word) {
      const candidate = row ? row + " " + word : word;
      if (row && candidate.length > 29) {
        rows.push(row);
        row = word;
      } else row = candidate;
    });
    if (row) rows.push(row);
    if (rows.length > 2) rows.splice(2, rows.length - 2, rows[1].slice(0, 26) + "…");
    const safeRows = rows.map(function (value) {
      return value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    });
    const titleMarkup = safeRows.map(function (value, index) {
      return '<tspan x="410" dy="' + (index === 0 ? 0 : 38) + '">' + value + '</tspan>';
    }).join("");
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="240" viewBox="0 0 960 240">' +
      '<defs><linearGradient id="studyBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(' + theme.hue + ',48%,15%)"/><stop offset="1" stop-color="hsl(' + ((theme.hue + 36) % 360) + ',48%,34%)"/></linearGradient></defs>' +
      '<rect width="960" height="240" rx="18" fill="url(#studyBg)"/><circle cx="800" cy="35" r="160" fill="#fff" opacity=".05"/><circle cx="45" cy="235" r="120" fill="#fff" opacity=".04"/>' +
      '<g transform="translate(25 0)">' + theme.mark + '</g>' +
      '<path d="M365 45V195" stroke="#d9bd79" stroke-width="2" opacity=".65"/>' +
      '<text x="410" y="91" fill="#f4e6c5" font-family="Georgia,serif" font-size="17" letter-spacing="4">ZURIEL STUDY CENTRE</text>' +
      '<text x="410" y="139" fill="#fffaf0" font-family="Georgia,serif" font-size="27" font-weight="bold">' + titleMarkup + '</text>' +
      '<path d="M410 205H865" stroke="#d9bd79" stroke-width="3" opacity=".7"/></svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  // Reuse the same lightweight, offline SVG artwork in the Library's study cards.
  window.ZurielStudyArtwork = function(index, heading) {
    return createStudySectionArtwork(index, heading);
  };

  function createStudyPanel() {
    if (document.getElementById("zurielStudyPanel")) return;

    const style = document.createElement("style");
    style.textContent = `
      #zurielReaderStudyLayout {
        display:grid;
        grid-template-columns:minmax(0,1fr);
        gap:18px;
        align-items:start;
        width:100%;
        min-width:0;
      }
      #zurielReaderStudyLayout > #message { min-width:0; }
      #zurielStudyPanel {
        position:sticky;
        top:14px;
        z-index:2;
        box-sizing:border-box;
        width:100%;
        max-height:min(78vh,900px);
        overflow-y:auto;
        overscroll-behavior:contain;
        box-shadow:0 8px 28px #0003;
        background:#10213d;
        color:#f8f4e9;
        border:1px solid #b99b58;
        border-radius:16px;
        padding:16px;
        margin:0;
        line-height:1.7;
        scroll-margin-top:18px;
      }
      #zurielStudyPanel[data-mode="word-context"] > :not(#zurielInlineWordStudy) {
        display:none !important;
      }
      #zurielInlineWordStudy {
        margin:0;
        padding:14px;
        border:1px solid #b99b58;
        border-radius:12px;
        background:#1c3657;
        color:#f8f4e9;
      }
      #zurielInlineWordStudy h3 { margin:0 0 8px; color:#f0d99f; }
      #zurielInlineWordStudy p { line-height:1.55; overflow-wrap:anywhere; }
      #zurielInlineWordStudy .inline-word-result {
        background:#fff;
        color:#18304d;
        border-radius:9px;
        padding:11px;
        margin:9px 0;
      }
      #zurielInlineWordStudy .inline-word-original {
        display:block;
        font-size:25px;
        font-weight:700;
        line-height:1.7;
      }
      #zurielInlineWordStudy .inline-word-gloss,
      #zurielInlineWordStudy .inline-word-meta { display:block; margin-top:4px; }
      #zurielInlineWordStudy .inline-word-related {
        margin:12px 0;padding:12px;border:1px solid #c9d8e4;
        border-radius:10px;background:#f4f7fa;color:#18304d;
      }
      #zurielInlineWordStudy .inline-word-related h4 {margin:0 0 8px;color:#174c78;}
      #zurielInlineWordStudy .inline-word-related p {color:#344b60;font-size:13px;}
      #zurielInlineWordStudy .inline-word-related button {display:inline-block;width:auto;margin:5px 6px 0 0;padding:8px 10px;min-height:38px;}
      /* On narrow screens, keep the selected word study reachable without
         inserting content between Scripture verses or shrinking the reader. */
      @media (max-width:640px) {
        #zurielStudyPanel[data-mode="word-context"] {
          position:fixed;
          inset:auto 0 0 0;
          z-index:10000;
          box-sizing:border-box;
          width:100%;
          max-height:min(62dvh,560px);
          overflow-y:auto;
          overscroll-behavior:contain;
          -webkit-overflow-scrolling:touch;
          border-radius:18px 18px 0 0;
          padding:12px 14px calc(12px + env(safe-area-inset-bottom));
          margin:0;
          box-shadow:0 -12px 40px #0007;
          touch-action:pan-y;
        }
        #zurielStudyPanel[data-mode="word-context"] #zurielInlineWordStudy {
          border:0;
          border-radius:0;
          padding:0;
          background:transparent;
        }
      }

      #zurielStudyPanel h2,
      #zurielStudyPanel h3 { color:#e8cf91; }
      #zurielStudyPanel .study-section-art {
        display:block;
        width:100%;
        height:auto;
        max-height:126px;
        aspect-ratio:16 / 4;
        object-fit:cover;
        margin:0 0 13px;
        border:1px solid #d7c18a;
        border-radius:10px;
        background:#1c3657;
      }
      #zurielStudyPanel .study-section-art + p { margin-top:0; }
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
      #zurielStudyPanel .word-language {
        display:inline-block;
        color:#53677f;
        font-size:12px;
        font-weight:700;
        letter-spacing:.04em;
        text-transform:uppercase;
        margin:0 0 7px;
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

      #zurielInlineWordStudy {
        margin:10px 0 16px;
        padding:14px;
        border:1px solid #b99b58;
        border-radius:13px;
        background:#10213d;
        color:#f8f4e9;
        box-shadow:0 5px 18px #00000018;
        scroll-margin-top:90px;
      }
      #zurielInlineWordStudy h3 {
        margin:0 0 8px;
        color:#f0d99f;
        font-size:17px;
      }
      #zurielInlineWordStudy p {
        margin:7px 0;
        line-height:1.55;
        overflow-wrap:anywhere;
      }
      #zurielInlineWordStudy .inline-word-result {
        margin:9px 0;
        padding:10px;
        border-radius:9px;
        background:#1c3657;
        border:1px solid #ffffff24;
      }
      #zurielInlineWordStudy .inline-word-original {
        display:block;
        color:#f0d99f;
        font-size:20px;
        font-weight:700;
      }
      #zurielInlineWordStudy .inline-word-gloss {
        display:block;
        margin-top:4px;
        color:#ffffff;
        font-weight:700;
      }
      #zurielInlineWordStudy .inline-word-meta {
        display:block;
        margin-top:5px;
        color:#d9e3ef;
        font-size:12px;
      }
      #zurielInlineWordStudy button {
        min-height:42px;
        margin:7px 6px 0 0;
      }
      @media(max-width:760px) {
        #zurielReaderStudyLayout {
          grid-template-columns:minmax(0,1fr);
          gap:12px;
        }
        #zurielStudyPanel {
          position:relative;
          top:auto;
          max-height:min(55vh,480px);
          margin:0 0 12px;
          padding:14px;
          padding-bottom:calc(14px + env(safe-area-inset-bottom));
        }
        /* A tapped word opens a compact bottom sheet while the selected
           verse stays in place above it. Full Study Centre remains in-flow. */
        #zurielStudyPanel[data-mode="word-context"] {
          position:fixed;
          left:12px;
          right:12px;
          bottom:calc(68px + env(safe-area-inset-bottom));
          top:auto;
          z-index:1000;
          width:auto;
          max-height:min(42vh,360px);
          margin:0;
          box-shadow:0 12px 34px #0006;
        }
      }
      /* Scripture remains the primary full-width reading surface. */
      #bibleReader,
      #zurielReaderStudyLayout,
      #zurielReaderStudyLayout > #message {
        width:100%;
        max-width:100%;
        min-width:0;
      }
      #zurielReaderStudyLayout {
        grid-template-columns:minmax(0,1fr);
        align-items:stretch;
        gap:16px;
      }
      #zurielReaderStudyLayout > #message {
        display:block;
        grid-column:1 / -1;
        margin:0;
        padding:0;
        text-align:left;
        justify-self:stretch;
      }
      #zurielReaderStudyLayout > #message > *,
      #zurielReaderStudyLayout > #message .verse {
        width:100%;
        max-width:100%;
        min-width:0;
      }
      #zurielReaderStudyLayout > #message .verse {
        display:block;
        margin-left:0;
        margin-right:0;
        text-align:left;
        white-space:normal;
        overflow-wrap:anywhere;
        word-break:normal;
        hyphens:auto;
        font-size:clamp(16px, 1.8vw, 19px);
        line-height:1.8;
        padding:clamp(12px, 2vw, 17px) clamp(8px, 1.8vw, 15px);
      }
      #zurielStudyPanel {
        position:static;
        top:auto;
        width:100%;
        max-width:100%;
        max-height:none;
        overflow:visible;
        overscroll-behavior:auto;
        margin:0;
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
    const reader = document.getElementById("bibleReader");
    const studySections = panel.querySelectorAll("#zurielStudySections details");
    studySections.forEach(function (section, index) {
      const body = section.querySelector(".study-body");
      const summary = section.querySelector("summary");
      if (!body || !summary) return;
      const illustration = document.createElement("img");
      illustration.className = "study-section-art";
      illustration.src = createStudySectionArtwork(index, summary.textContent.trim());
      illustration.alt = "Illustration for " + summary.textContent.trim();
      illustration.loading = "lazy";
      illustration.decoding = "async";
      illustration.width = 960;
      illustration.height = 240;
      body.prepend(illustration);
    });

    (reader || main || document.body).appendChild(panel);

    // Keep the reading controls full-width, then place the verse and study
    // panel together. Desktop uses two columns; small screens stack naturally.
    const message = document.getElementById("message");
    if (reader && message && !document.getElementById("zurielReaderStudyLayout")) {
      const layout = document.createElement("div");
      layout.id = "zurielReaderStudyLayout";
      reader.insertBefore(layout, message);
      layout.appendChild(message);
      layout.appendChild(panel);
    }

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

      async function openReference(item, button) {
        if (!item || typeof window.openChapter !== "function") {
          intro.textContent = "The Bible reader is not ready. Please reopen the Study Centre and try again.";
          return;
        }
        if (button) button.disabled = true;
        intro.textContent = "Opening " + item.label + "…";
        try {
          await window.openChapter(item.book, item.chapter);
          if (typeof window.selectBibleVerse !== "function" ||
              !window.selectBibleVerse(item.verse)) {
            throw new Error("The exact verse could not be located in the loaded chapter.");
          }
          const selected = findVerseElement(item.verse);
          if (!selected) {
            throw new Error("The selected verse is not available in the reader.");
          }
          const verseText = selected.textContent.replace(/^\s*\d+\.?\s*/, "").trim();
          selected.scrollIntoView({ behavior: "smooth", block: "center" });
          selected.classList.add("zuriel-selected-verse");
          if (window.ZurielStudy && typeof window.ZurielStudy.openForReference === "function") {
            window.ZurielStudy.openForReference(item.book, item.chapter, item.verse, verseText, "", -1);
          }
          intro.textContent = "Opened " + item.label + " in the Bible reader.";
        } catch (error) {
          intro.textContent = "Could not open " + item.label + ": " +
            (error && error.message ? error.message : "Please try again.");
        } finally {
          if (button) button.disabled = false;
        }
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
          const section = document.createElement("details");
          section.className = "zuriel-topic-study-section";
          const heading = document.createElement("summary");
          heading.textContent = title;
          const p = document.createElement("p");
          p.textContent = body;
          section.append(heading, p);
          card.appendChild(section);
        }
        addSection("Biblical definition and explanation", topic.definition);
        addSection("Old Testament foundations", topic.oldTestament);
        addSection("New Testament fulfilment and development", topic.newTestament);
        if (Array.isArray(topic.languageWords) && topic.languageWords.length) {
          const section = document.createElement("details");
          section.className = "zuriel-topic-study-section";
          const heading = document.createElement("summary");
          heading.textContent = "Important Hebrew and Greek words";
          section.appendChild(heading);
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
          const section = document.createElement("details");
          section.className = "zuriel-topic-study-section";
          const heading = document.createElement("summary");
          heading.textContent = "Related passages and their connections";
          section.appendChild(heading);
          topic.relatedExplanations.forEach(function(text) {
            const p = document.createElement("p");
            p.textContent = text;
            section.appendChild(p);
          });
          card.appendChild(section);
        }
        addSection("Practical application", topic.application);
        if (Array.isArray(topic.questions) && topic.questions.length) {
          const section = document.createElement("details");
          section.className = "zuriel-topic-study-section";
          const heading = document.createElement("summary");
          heading.textContent = "Questions for personal study";
          section.appendChild(heading);
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
          button.addEventListener("click", function() { openReference(item, button); });
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
      intro.className = "study-small zuriel-faith-disclaimer";
      intro.style.cssText = "display:block;margin:0 0 14px;padding:11px 12px;border-left:4px solid #d9bd79;border-radius:7px;background:#fff4d6;color:#26384d;font-size:13px;font-weight:700;line-height:1.55;opacity:1";
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

      const studioButton = document.createElement("button");
      studioButton.type = "button";
      studioButton.textContent = "Create Glory Verse Affirmation from this Scripture";
      studioButton.addEventListener("click", function() {
        const personalLibrary = window.ZurielLibrary;
        if (!personalLibrary || typeof personalLibrary.openGloryVerse !== "function") {
          studioButton.textContent = "Glory Verse Affirmation is not ready yet";
          return;
        }
        const response = {
          prayer: entry.prayer || "",
          declaration: entry.declaration || "",
          affirmation: entry.affirmation || "",
          confession: entry.confession || "",
          inspiration: entry.inspiration || ""
        };
        const opened = personalLibrary.openGloryVerse(
          entry.reference,
          selectedReference && selectedReference.text || "",
          "KJV",
          response
        );
        if (!opened) studioButton.textContent = "Could not open the affirmation card";
      });
      target.appendChild(studioButton);
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

        const originalWordsSection = document.getElementById("zurielOriginalWords");
        const originalWordsDetails = originalWordsSection
          ? originalWordsSection.closest("details") : null;
        const crossReferenceList = document.getElementById("zurielCrossReferenceList");
        const crossReferenceDetails = crossReferenceList
          ? crossReferenceList.closest("details") : null;

        if (selectedEnglishWord) {
          if (originalWordsDetails) originalWordsDetails.open = true;
          loadOriginalWords(selectedReference);
          panel.dataset.mode = "word";
          document.getElementById("zurielSelectionNotice").textContent =
            "Focused word study: " + selectedEnglishWord +
            ". Your selected Scripture remains available in the reader.";
        } else {
          if (originalWordsDetails) originalWordsDetails.open = false;
          if (crossReferenceDetails) crossReferenceDetails.open = false;
          panel.dataset.mode = "verse";
          const results = document.getElementById("zurielOriginalWordResults");
          const lexicon = document.getElementById("zurielLexiconDetails");
          if (results) results.textContent = "Tap a word in the selected verse to study that word here.";
          if (lexicon) lexicon.replaceChildren();
        }

        loadRelatedScriptures(selectedReference);
        panel.scrollTop = 0;
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      },

      /* A word tap opens a compact contextual panel beside the passage.
         It never inserts content between verses or scrolls the reader away. */
      openWordInContext: async function (book, chapter, verse, verseText, englishWord, wordIndex) {
        const contextRequestId = ++wordContextRequest;
        if (activeWordContextCleanup) activeWordContextCleanup();
        selectedReference = {
          book: book,
          chapter: chapter,
          verse: verse,
          text: verseText
        };
        selectedEnglishWord = englishWord || "";
        selectedEnglishWordIndex = Number.isInteger(wordIndex) ? wordIndex : -1;
        if (!selectedEnglishWord) return false;

        const verseElement = document.querySelector(
          '#message .verse[data-verse-number="' + Number(verse) + '"]'
        );
        if (!verseElement) return false;

        const previousCard = document.getElementById("zurielInlineWordStudy");
        if (previousCard) previousCard.remove();

        const contextCard = document.createElement("section");
        contextCard.id = "zurielInlineWordStudy";
        contextCard.setAttribute("role", "region");
        contextCard.setAttribute("aria-live", "polite");
        contextCard.setAttribute("aria-label", "Word study for " + selectedEnglishWord);

        const heading = document.createElement("h3");
        heading.textContent = "Word study: " + selectedEnglishWord;
        contextCard.appendChild(heading);

        const status = document.createElement("p");
        status.textContent = "Checking the exact KJV word alignment and available original-language record…";
        contextCard.appendChild(status);

        const cleanupContextListener = function () {
          document.removeEventListener("keydown", handleContextKeydown);
          if (activeWordContextCleanup === cleanupContextListener) {
            activeWordContextCleanup = null;
          }
        };
        const closeContextPanel = function () {
          contextCard.remove();
          cleanupContextListener();
          if (contextRequestId === wordContextRequest) wordContextRequest++;
          panel.style.display = "none";
          panel.dataset.mode = "verse";
        };
        const handleContextKeydown = function (event) {
          if (event.key === "Escape" && contextCard.isConnected) {
            event.preventDefault();
            closeContextPanel();
          }
        };
        document.addEventListener("keydown", handleContextKeydown);
        activeWordContextCleanup = cleanupContextListener;

        const fullStudyButton = document.createElement("button");
        fullStudyButton.type = "button";
        fullStudyButton.textContent = "Open Full Study Centre";
        fullStudyButton.addEventListener("click", function () {
          cleanupContextListener();
          if (contextRequestId === wordContextRequest) wordContextRequest++;
          window.ZurielStudy.openForReference(
            book, chapter, verse, verseText, englishWord, wordIndex
          );
        });
        contextCard.appendChild(fullStudyButton);

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "study-secondary";
        closeButton.textContent = "Close word panel";
        closeButton.addEventListener("click", closeContextPanel);
        contextCard.appendChild(closeButton);

        panel.prepend(contextCard);
        panel.dataset.mode = "word-context";
        panel.style.display = "block";
        highlightVerse(verse);

        try {
          await loadOriginalWords(selectedReference);
        } catch (error) {
          // The source-specific message is rendered in the Study Centre.
        }

        // loadOriginalWords has its own request guard, but this second guard
        // protects the compact panel from reading another tap's newer results.
        if (contextRequestId !== wordContextRequest || !contextCard.isConnected) return true;
        const results = document.getElementById("zurielOriginalWordResults");
        const sourceCards = results
          ? results.querySelectorAll(".original-word-card")
          : [];

        if (sourceCards.length) {
          status.textContent = "Verified original-language records linked to this KJV word:";
          sourceCards.forEach(function (sourceCard) {
            const original = sourceCard.querySelector(".original-script");
            const gloss = sourceCard.querySelector(".original-gloss");
            const meta = sourceCard.querySelector(".word-meta");
            const result = document.createElement("div");
            result.className = "inline-word-result";

            if (original) {
              const originalText = document.createElement("span");
              originalText.className = "inline-word-original";
              originalText.textContent = original.textContent;
              result.appendChild(originalText);
            }
            if (gloss) {
              const glossText = document.createElement("span");
              glossText.className = "inline-word-gloss";
              glossText.textContent = gloss.textContent;
              result.appendChild(glossText);
            }
            if (meta) {
              const metaText = document.createElement("span");
              metaText.className = "inline-word-meta";
              metaText.textContent = meta.textContent;
              result.appendChild(metaText);
            }
            contextCard.insertBefore(result, fullStudyButton);
          });
        } else {
          status.textContent = results && results.textContent
            ? results.textContent
            : "No verified original-language record is available for this selected word. Zuriel will not guess a meaning.";
        }

        // Add verse-level cross-references directly to the compact word panel.
        // These are connected passages for the selected verse, not invented
        // lexical definitions or claims that every passage uses the same lemma.
        const relatedBox = document.createElement("section");
        relatedBox.className = "inline-word-related";
        const relatedHeading = document.createElement("h4");
        relatedHeading.textContent = "Related Scripture references";
        const relatedStatus = document.createElement("p");
        relatedStatus.textContent = "Finding connected Scriptures for " +
          book + " " + chapter + ":" + verse + "…";
        relatedBox.append(relatedHeading, relatedStatus);
        contextCard.appendChild(relatedBox);

        try {
          const code = apiBookCode(book);
          if (!code) throw new Error("This book is not mapped for cross-reference lookup.");
          const crossData = await fetchStudyJson(
            CROSS_REFERENCE_API + code + "/" + chapter + ".json"
          );
          if (contextRequestId !== wordContextRequest || !contextCard.isConnected) return true;
          const chapterVerses = crossData.chapter && Array.isArray(crossData.chapter.content)
            ? crossData.chapter.content : [];
          const selected = chapterVerses.find(item => Number(item.verse) === Number(verse));
          const references = selected && Array.isArray(selected.references)
            ? selected.references.slice(0, 8) : [];
          relatedStatus.textContent = "";
          if (!references.length) {
            relatedStatus.textContent = "No cross-reference entries are available for this verse yet.";
          }
          references.forEach(function(item) {
            const name = englishBookName(item.book);
            if (!name) return;
            const referenceButton = document.createElement("button");
            referenceButton.type = "button";
            referenceButton.className = "study-link";
            referenceButton.textContent = name + " " + item.chapter + ":" + item.verse +
              (item.endVerse ? "–" + item.endVerse : "");
            referenceButton.addEventListener("click", async function() {
              referenceButton.disabled = true;
              try {
                await window.openChapter(name, Number(item.chapter));
                if (typeof window.selectBibleVerse !== "function" ||
                    !window.selectBibleVerse(Number(item.verse))) {
                  throw new Error("The related verse could not be activated.");
                }
                relatedStatus.textContent = "Opened " + referenceButton.textContent + ".";
              } catch(error) {
                referenceButton.disabled = false;
                relatedStatus.textContent = error.message || "Could not open this related verse.";
              }
            });
            relatedBox.appendChild(referenceButton);
          });
        } catch(error) {
          if (contextRequestId !== wordContextRequest || !contextCard.isConnected) return true;
          relatedStatus.textContent = !navigator.onLine
            ? "Connect once to load these cross-references for later offline use."
            : "Related Scripture references could not be loaded right now.";
        }

        return true;
      }
    };
  }

  createStudyPanel();

})();

