
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

  // Offline biblical dictionary. Entries are concise study summaries;
  // readers should check each term in its passage and language context.
  const bibleDictionary = [
    ["Atonement","God's provision for dealing with sin and restoring relationship; in the Old Testament it is closely associated with sacrifice and cleansing. See Leviticus 16; Romans 3:23–26.",["expiation","reconciliation offering","covering for sin"], {"languageNote":"Hebrew kipper/kaphar (H3722) is used in the language of covering, cleansing and making atonement. In the New Testament, hilastērion (G2435) appears in Romans 3:25 and hilasmos (G2434) in 1 John 2:2. These are related study terms, not interchangeable dictionary equivalents.","theology":"Leviticus 16 presents atonement within the Day of Atonement rites, including cleansing of the sanctuary and the people's sins. Romans 3:21–26 connects God's saving righteousness with Christ's sacrificial work. Read the Old and New Testament passages together without erasing their distinct settings.","caution":"Avoid reducing atonement to one English gloss such as 'covering'. Christian traditions explain the relation between sacrifice, substitution, cleansing, victory and reconciliation with different emphases.","passages":"Leviticus 16; Isaiah 53:4–12; Romans 3:21–26; Hebrews 9:11–14; 1 John 2:1–2"}],
    ["Covenant","A solemn relationship established by promise and obligation. Biblical covenants reveal God's purposes and faithfulness. See Genesis 15; Exodus 19–24; Luke 22:20.",["berith","berit","testament"], {"languageNote":"Hebrew berit (H1285) and Greek diathēkē (G1242) are major covenant terms. The Greek word can also mean a testament or disposition; context determines the sense.","theology":"Trace the covenant with Noah, Abraham, Israel at Sinai, David and the promised New Covenant. Scripture presents continuity in God's faithfulness while also distinguishing the promises, signs, obligations and audiences of particular covenants.","caution":"Do not treat every biblical covenant as identical or assume that every command given to Israel is addressed in the same way to the church. Read each covenant in its historical and canonical setting.","passages":"Genesis 9:8–17; Genesis 15; Exodus 19–24; 2 Samuel 7:8–16; Jeremiah 31:31–34; Luke 22:20; Hebrews 8"}],
    ["Disciple","A learner and follower who receives a teacher's instruction and seeks to live by it. Christian discipleship centres on following Jesus. See Luke 9:23; John 8:31.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Jesus calls disciples to follow Him, remain in His teaching, learn His way and make other disciples. The Gospels show discipleship as a continuing relationship of trust, instruction and obedience; Luke 9:23 places self-denial and daily cross-bearing within that call. See Matthew 28:18–20; Luke 9:23–26; John 8:31–32; Acts 11:26.","caution":"A disciple is more than an admirer or a person who attends religious meetings. Do not confuse the general calling to follow Jesus with the distinct office or role of an apostle. Discipleship is grounded in Christ's teaching, not loyalty to a human leader.","passages":"Matthew 4:18–22; Matthew 28:18–20; Luke 9:23–26; John 8:31–32; Acts 11:26"}],
    ["Faith","Trust and reliance upon God; biblical faith includes confidence, loyalty and faithful response. See Genesis 15:6; Hebrews 11:1–6.",["trust","belief","faithfulness"], {"languageNote":"Greek pistis (G4102) can express faith, trust or faithfulness. Hebrew emunah (H530) can express firmness, reliability or faithfulness. Neither word has only one English equivalent in every passage.","theology":"Biblical faith is a trusting response to God's character and promise. Hebrews 11 highlights trust that acts; Romans 4 connects faith with God's promise; James 2 challenges empty profession without obedient action.","caution":"Do not define faith as a force that obliges God to grant a desired outcome. Read each promise with its audience, conditions, covenant setting and the wider teaching of Scripture.","passages":"Genesis 15:6; Habakkuk 2:4; Romans 4; Hebrews 11:1–16; James 2:14–26"}],
    ["Forgiveness","The release of a debt or offence; Scripture calls believers to receive God's mercy and forgive others without denying truth or justice. See Matthew 6:12–15; Ephesians 4:32.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Scripture presents forgiveness as God's merciful release of sin through His saving work and as the grace believers are commanded to extend to others. Jesus' prayer and teaching connect receiving mercy with forgiving others; Paul grounds Christian forgiveness in God's forgiveness in Christ. See Matthew 6:12–15; Matthew 18:21–35; Ephesians 4:31–32; Colossians 3:12–13.","caution":"Forgiveness does not require calling evil good, concealing abuse, abandoning lawful protection or pretending trust has already been restored. Reconciliation and restored trust involve truth, repentance, safety and time; they should not be treated as identical to the act of forgiving.","passages":"Psalm 32:1–5; Matthew 6:12–15; Matthew 18:21–35; Luke 17:3–4; Ephesians 4:31–32; Colossians 3:12–13"}],
    ["Grace","God's generous favour and action toward people, not earned as a wage. Grace saves and trains believers for godly living. See Ephesians 2:8–10; Titus 2:11–14.",["charis","unmerited favour","unmerited favor"], {"languageNote":"Greek charis (G5485) commonly describes grace or favour. Hebrew chen (H2580) can describe favour. Hebrew chesed (H2617), often translated steadfast love or lovingkindness, is related thematically but is not simply the same word.","theology":"Grace is God's generous favour and active goodness, not a wage earned by human achievement. In Paul it is central to salvation in Christ; Titus 2 also describes grace as training believers for godly living.","caution":"Grace is neither a reward for merit nor permission to ignore holiness. Keep Ephesians 2:8–10 together: salvation is by grace through faith, and believers are created for good works.","passages":"Exodus 34:6–7; Psalm 103:8–14; Romans 3:21–26; Ephesians 2:1–10; Titus 2:11–14"}],
    ["Holiness","Being set apart for God and living in a way that reflects His character. It includes worship, moral integrity and love. See Leviticus 19:2; 1 Peter 1:15–16.",["sanctification","consecration","set apart"], {"languageNote":"Hebrew qodesh/qadosh (H6944/H6918) and Greek hagios/hagiasmos (G40/G38) describe holiness, being holy or sanctification in related but grammatically distinct forms.","theology":"Holiness begins with God's own character and shapes the worship and conduct of His people. Scripture joins consecration to justice, mercy, love and obedience, not merely outward ritual separation.","caution":"Do not reduce holiness to a list of external rules or to private moral purity alone. Read the concrete commands and the community responsibilities in their passage.","passages":"Leviticus 19:1–18; Isaiah 6:1–8; Romans 6:19–23; 1 Peter 1:13–16"}],
    ["Justification","God's righteous declaration concerning those who trust in Christ; Paul connects it with grace, faith and Christ's saving work. See Romans 3:21–28; 5:1.",["justified","righteous declaration","justification by faith"], {"languageNote":"Greek dikaioō (G1344) is a verb often rendered justify or declare righteous; dikaiosynē (G1343) is a related noun, righteousness. They are related forms, not identical grammatical entries.","theology":"In Romans and Galatians, Paul uses justification language to explain how people are put right with God through Christ and received by faith, apart from boasting in works of the law. The argument must be read across the whole letter.","caution":"Do not collapse justification into sanctification, though the New Testament relates them. Also read James 2 in its own argument about living faith and the public evidence of a genuine profession.","passages":"Romans 3:21–31; Romans 4; Romans 5:1–11; Galatians 2:15–21; James 2:14–26"}],
    ["Kingdom of God","God's reign and saving rule. Jesus announces the kingdom and teaches its values, present work and future fullness. See Mark 1:14–15; Matthew 6:10, 33.",["kingdom of heaven","reign of God","God's reign"], {"languageNote":"Greek basileia (G932) can mean kingdom, reign or royal rule. Hebrew malkut (H4438) also carries the idea of kingship or reign. Context helps determine whether rule, realm or both are in view.","theology":"Jesus announces God's kingdom as good news and teaches people to seek God's rule. The Gospels present the kingdom as already breaking in through Jesus' ministry and still awaited in its fullness.","caution":"The kingdom is not merely a place people go after death, nor should every kingdom text be turned into a prediction about a modern nation or political movement.","passages":"Daniel 7:13–14; Mark 1:14–15; Matthew 6:9–10, 33; Luke 17:20–21; 1 Corinthians 15:20–28"}],
    ["Mercy","Compassion shown toward those in need or distress, often with practical help. God's mercy is a pattern for His people. See Psalm 103:8–14; Luke 10:30–37.",["compassion","lovingkindness","steadfast love"], {"languageNote":"Hebrew chesed (H2617) often conveys steadfast covenant love; racham/rachamim (H7356) expresses compassion or tender mercy. Greek eleos (G1656) is a common New Testament mercy term. These words overlap in meaning but are not exact equivalents.","theology":"God's mercy is shown in compassion, forgiveness and help for the vulnerable. Scripture joins mercy with truth and justice; those who receive mercy are called to show mercy to others.","caution":"Mercy does not mean pretending evil has not happened or removing the need for repentance, protection and justice. Consider the needs and setting of the people receiving mercy.","passages":"Exodus 34:6–7; Psalm 103:8–14; Micah 6:8; Matthew 5:7; Luke 10:25–37; James 2:12–13"}],
    ["Redemption","Deliverance or release, often pictured as rescue from slavery or debt. The New Testament speaks of redemption through Christ. See Exodus 6:6; Ephesians 1:7.",["redeem","ransom","deliverance"], {"languageNote":"Greek apolutrōsis (G629) describes release or redemption. Hebrew ga'al (H1350) and padah (H6299) are different Old Testament verbs used in redemption contexts, including family and liberation imagery.","theology":"The Bible uses redemption language for release from bondage, restoration of what was lost and rescue at a cost. The Exodus provides a major pattern; the New Testament applies redemption language to Christ's saving work.","caution":"Redemption, ransom, forgiveness and atonement are closely related biblical themes but should not be treated as identical technical terms in every passage.","passages":"Exodus 6:6; Ruth 4:1–10; Psalm 130:7–8; Mark 10:45; Ephesians 1:7; Colossians 1:13–14"}],
    ["Repentance","A turning from sin toward God, involving a changed mind, direction and conduct. See Joel 2:12–13; Mark 1:15; Acts 3:19.",["turning","metanoia","turn back"], {"languageNote":"Greek metanoia (G3341) is the noun commonly translated repentance; metanoeō (G3340) is the related verb. Hebrew shuv (H7725) means turn or return and often describes turning back to God, but it is not a one-word equivalent in every text.","theology":"Repentance is a response to God's call involving a changed direction toward Him. The prophets call Israel to return; Jesus announces repentance alongside the kingdom; Acts connects repentance with turning to God.","caution":"Repentance is more than regret or a moment of emotion, but it is also not a payment that earns forgiveness. Look for the passage's call, God's mercy and the fruit of a changed life.","passages":"Joel 2:12–13; Isaiah 55:6–7; Mark 1:14–15; Luke 15:11–32; Acts 3:19; 2 Corinthians 7:9–11"}],
    ["Righteousness","What is right according to God's character and standards; it can describe just conduct and God's saving action. See Psalm 15; Matthew 5:6; Romans 1:16–17.",["justice","right standing","dikaiosyne"], {"languageNote":"Greek dikaiosynē (G1343) and Hebrew tsedaqah (H6666), from related word families, can refer to what is right, justice, right standing or faithful action. Their precise force depends on the sentence and book.","theology":"Righteousness in Scripture includes God's own right character and action, just conduct among people, and the right standing discussed in Paul's letters. Do not assume every occurrence is using the term in the same theological sense.","caution":"Avoid reducing righteousness either to personal moral performance alone or to an abstract status detached from just and faithful living. Follow the argument of the specific passage.","passages":"Psalm 15; Isaiah 45:21–25; Matthew 5:6, 20; Romans 1:16–17; Romans 3:21–26; James 3:17–18"}],
    ["Sanctification","Being made holy and increasingly shaped toward faithful life with God. The New Testament connects this with the Spirit, truth and obedience. See John 17:17; 1 Thessalonians 4:3.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Sanctification concerns being set apart as God's own and being formed in holiness. The New Testament speaks of God's sanctifying work through Christ and the Spirit, and also calls believers to pursue holy conduct. John 17:17 links sanctification with God's truth; 1 Thessalonians 4:3–8 applies it to daily life. See also 1 Corinthians 6:11; Hebrews 10:10–14; 1 Peter 1:14–16.","caution":"Do not reduce sanctification either to self-improvement or to a claim that believers never struggle after conversion. Read the New Testament's completed and ongoing dimensions together, and do not use holiness language to shame people or excuse coercive control.","passages":"John 17:17–19; Romans 6:19–22; 1 Corinthians 6:11; 1 Thessalonians 4:3–8; Hebrews 10:10–14; 1 Peter 1:14–16"}],
    ["Salvation","God's rescue from sin and its consequences, bringing people into life and reconciliation through Jesus Christ. See Luke 19:10; Ephesians 2:8–10.",["deliverance","rescue","soteria"], {"languageNote":"Greek sōtēria (G4991) and Hebrew yeshuah (H3444) are common salvation or deliverance terms. Both can describe rescue in concrete danger as well as God's wider saving work.","theology":"Salvation in Scripture is God's rescue. Depending on context it may concern enemies, illness, danger, sin, death or final restoration. The New Testament centres salvation on Jesus and includes forgiveness, new life and future hope.","caution":"Do not assume every occurrence refers only to forgiveness of sins or only to a future destination. Read what the people are being saved from and what the passage says salvation brings.","passages":"Exodus 14:13–14; Psalm 27:1; Luke 19:9–10; Acts 4:10–12; Ephesians 2:1–10; 1 Peter 1:3–9"}],
    ["Shalom","Hebrew term often translated peace; it can include wholeness, well-being, safety and right relationship. See Numbers 6:24–26; Isaiah 9:6.",["peace","wholeness","well-being"], {"languageNote":"Hebrew shalom (H7965) can describe peace, well-being, completeness or welfare. Its sense depends on context; it is richer than simply the absence of conflict.","theology":"Biblical peace includes safety, wholeness and right relationships under God's blessing. The prophets connect peace with justice and restoration; the New Testament speaks of peace through Christ and peace within the community.","caution":"Do not use 'shalom' as a slogan that denies grief, injustice or conflict. The Bible can speak honestly about trouble while calling people to seek God's peace and justice.","passages":"Numbers 6:24–26; Psalm 34:14; Isaiah 9:6–7; Isaiah 32:16–18; John 14:27; Ephesians 2:13–18"}],
    ["Sin","Human rebellion, wrongdoing or failure to live in faithfulness to God; Scripture describes both acts and the deeper condition. See Genesis 3; Romans 3:23; 1 John 1:8–9.",["transgression","iniquity","trespass"], {"languageNote":"Hebrew chattā't (H2403) and Greek hamartia (G266) are common sin terms. Scripture also uses other words for transgression, guilt, rebellion and crookedness; no single term exhausts the Bible's teaching.","theology":"Sin includes wrongful acts and a deeper human condition of rebellion and alienation from God. Biblical texts also address communal injustice and destructive patterns, not only private mistakes.","caution":"Do not use the language of sin to shame people indiscriminately or to excuse harm. Name what the passage names, distinguish guilt from suffering, and keep confession, forgiveness, justice and restoration together.","passages":"Genesis 3; Psalm 51; Isaiah 1:16–18; Romans 3:9–26; Romans 6:1–14; 1 John 1:5–2:2"}],
    ["Stewardship","Responsible care of what has been entrusted by God, including resources, gifts, creation and relationships. See Genesis 2:15; Luke 16:10–13.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Stewardship describes accountable care of what has been entrusted to a person. Genesis presents human responsibility toward creation; Jesus' parables call servants to faithful use of entrusted resources; Paul describes ministers as stewards of God's mysteries. See Genesis 1:26–28; 2:15; Luke 12:42–48; 1 Corinthians 4:1–2; 1 Peter 4:10.","caution":"Stewardship is not a formula promising financial increase in exchange for giving. Biblical accountability includes generosity, honesty, care for people and responsible use of resources; it must not be used to pressure people into unsafe or unaffordable giving.","passages":"Genesis 1:26–28; Genesis 2:15; Deuteronomy 8:11–18; Luke 12:42–48; Luke 16:1–13; 1 Corinthians 4:1–2; 1 Peter 4:10"}],
    ["Wisdom","Skill in living rightly before God, joining understanding with just and faithful action. See Proverbs 1:7; James 1:5; 3:13–18.",["hokmah","sophia","understanding"], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Biblical wisdom begins with reverence for the Lord and becomes visible in truthful, just and peaceable living. Proverbs personifies wisdom as calling people away from folly; James describes wisdom from above as pure, peaceable, gentle and full of mercy. The New Testament also presents Christ as God's wisdom. See Proverbs 1:7; 8:1–36; 1 Corinthians 1:24; 1 Corinthians 1:30; James 3:13–18.","caution":"Wisdom is not merely intelligence, prediction or secret spiritual information. Proverbs expresses general patterns of wise living, not a guarantee that every faithful person will avoid suffering. Interpret individual sayings with their literary form and the whole counsel of Scripture.","passages":"Proverbs 1:7; Proverbs 3:13–18; Proverbs 8:1–36; Ecclesiastes 12:9–14; 1 Corinthians 1:24–30; James 1:5–8; James 3:13–18"}],
    ["Worship","Honouring God with reverence, love, trust and obedient life, not merely singing or ceremony. See Deuteronomy 6:4–5; John 4:23–24; Romans 12:1.",["adoration","praise","service"], {"languageNote":"Hebrew shachah (H7812) often means bow down or prostrate; Greek proskyneō (G4352) often describes reverent homage. Greek latreuō (G3000) can refer to service or worship. These terms highlight different aspects of worship.","theology":"Worship includes reverence, praise, allegiance and obedient service to God. Scripture includes gathered praise and the whole-life response of God's people; music is one expression, not the whole meaning.","caution":"Do not equate worship only with singing, nor assume that outward ceremony guarantees faithful worship. Read prophetic critiques alongside the call to justice, mercy and covenant faithfulness.","passages":"Deuteronomy 6:4–5; Psalm 95; Isaiah 1:11–17; John 4:19–24; Romans 12:1–2"}],
    ["Adoption","A gracious act by which God brings believers into His family with the status and privileges of children. See Romans 8:15-17; Galatians 4:4-7; Ephesians 1:5.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Paul uses adoption to describe God's gracious welcome of believers into His family and their status as children and heirs. Romans 8 connects adoption with the Spirit's witness and the hope of redemption; Galatians 4 connects it with God's sending of His Son and the Spirit. See also Ephesians 1:4–6.","caution":"The image of adoption communicates belonging, inheritance and intimacy with God; it should not be turned into a claim that believers are divine by nature or that every earthly family experience is safe or uncomplicated. Keep the metaphor within Paul's teaching about grace in Christ.","passages":"Romans 8:14–25; Galatians 4:4–7; Ephesians 1:3–6; 1 John 3:1–3"}],
    ["Anointing","The act of applying oil as a sign of consecration, appointment or honour; Scripture also uses anointing language for the Spirit's empowering work. Read the context carefully. See 1 Samuel 16:13; Luke 4:18; 1 John 2:20,27.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"In the Old Testament, anointing with oil is associated with consecration and appointment, including priests and kings. The Spirit empowers particular servants for God's purposes. Jesus applies Isaiah's Spirit-anointing language to His mission in Luke 4:16–21. First John also speaks of an anointing received by believers in the context of abiding in the truth. See Exodus 29:7; 1 Samuel 16:13; Isaiah 61:1; Luke 4:18; 1 John 2:20,27.","caution":"Do not assume every biblical use of anointing refers to the same ritual or role. The term does not automatically validate a leader's authority, guarantee physical healing or exempt a person from correction. Test claims by Scripture and their context.","passages":"Exodus 29:7; 1 Samuel 16:1–13; Isaiah 61:1–3; Luke 4:16–21; Acts 10:38; 1 John 2:18–27"}],
    ["Apostle","A person sent with a commission. The New Testament especially uses the title for Jesus' commissioned witnesses, including the Twelve and Paul. See Luke 6:13; Acts 1:21-26; 1 Corinthians 15:7-9.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"The New Testament word-picture is one of being sent with a commission. Jesus appoints the Twelve; Paul identifies his calling as an apostle of Jesus Christ; Acts also names Barnabas as an apostle. Their authority and witness must be read in relation to Christ and the foundational Gospel testimony. See Mark 3:13–19; Acts 14:4; Acts 14:14; 1 Corinthians 9:1–2; Ephesians 2:19–20.","caution":"The New Testament uses the term in more than one setting, and Christian traditions differ about later apostolic offices. Do not treat every travelling preacher, church founder or self-appointed leader as having the same authority as the Twelve or Paul. Evaluate teaching by the apostolic Gospel preserved in Scripture.","passages":"Mark 3:13–19; Luke 6:12–16; Acts 1:21–26; Acts 14:4; Acts 14:14; 1 Corinthians 9:1–2; 1 Corinthians 15:3–9; Ephesians 2:19–20"}],
    ["Blessing","God's favour and provision, and the good spoken or sought for another. Biblical blessing is not a guarantee of wealth or a trouble-free life. See Genesis 12:2-3; Numbers 6:24-26; Ephesians 1:3.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Biblical blessing may describe God's favour, provision, protection, covenant promise or the good spoken over another. Numbers 6 gives Israel a priestly blessing; Ephesians 1 describes spiritual blessings in Christ. Genesis 12 connects Abraham's blessing with a wider purpose for the families of the earth. See Genesis 12:1–3; Numbers 6:22–27; Psalm 67; Ephesians 1:3–14.","caution":"Blessing is not a guarantee of wealth, perfect health or a trouble-free life. Scripture also describes faithful people who suffer, and it calls God's people to bless others through generosity, justice and peace rather than using blessing language to manipulate.","passages":"Genesis 12:1–3; Numbers 6:22–27; Deuteronomy 28:1–14; Psalm 67; Matthew 5:3–12; Luke 6:20–23; Ephesians 1:3–14"}],
    ["Discernment","The ability to distinguish what is true, wise and pleasing to God through Scripture-shaped understanding and mature practice. See 1 Kings 3:9; Romans 12:2; Hebrews 5:14; Philippians 1:9-10.",["testing","distinguishing","spiritual discernment"], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Biblical discernment is the practiced ability to distinguish good from evil and to recognise what is excellent and faithful. It grows through renewed understanding, engagement with Scripture and mature practice. Philippians 1:9–10 connects discernment with love; Hebrews 5:14 describes trained perception; 1 John 4:1 calls believers to test spiritual claims.","caution":"Discernment is not suspicion, gossip or a licence to judge another person's hidden motives. It should be humble, evidence-aware and governed by love, truth and Scripture. A strong impression is not automatically a message from God.","passages":"1 Kings 3:9–12; Romans 12:1–2; Philippians 1:9–10; Hebrews 5:11–14; 1 John 4:1–6"}],
    ["Exile","The forced removal of a people from their homeland, especially Judah's deportation to Babylon. Exile becomes a major biblical setting for judgment, faithfulness and hope of restoration. See 2 Kings 25; Jeremiah 29; Daniel 1."],
    ["Gospel","Good news: in the New Testament, the announcement of God's saving reign and the death and resurrection of Jesus Christ. See Mark 1:14-15; Romans 1:1-4; 1 Corinthians 15:1-5.",["good news","euangelion","evangel"], {"languageNote":"Greek euangelion (G2098) means good news or good announcement. The related verb euangelizomai (G2097) means to announce good news.","theology":"The New Testament's gospel announces God's saving action in Jesus: His life, death and resurrection, and the arrival of God's kingdom. The apostolic message includes both what God has done and the call to respond in faith.","caution":"Do not shrink the gospel to personal success or to a formula detached from Jesus' death and resurrection. Read the message in the context of the kingdom, the cross and the apostolic witness.","passages":"Mark 1:14–15; Romans 1:1–4; 1 Corinthians 15:1–8; Galatians 1:6–9"}],
    ["Intercession","Prayer made on behalf of another person or community. Scripture presents intercession as loving dependence on God, not control over Him. See Exodus 32:11-14; Romans 8:26-27,34; 1 Timothy 2:1.",["intercessory prayer","praying for others"], {"languageNote":"Greek entynchanō (G1793) can mean appeal, petition or intercede. Hebrew paga (H6293) has a range including meet or encounter and can carry an intercessory sense in some contexts; it is not a one-to-one equivalent.","theology":"Intercession is prayer or appeal on behalf of others. Scripture presents believers praying for people and leaders, the Spirit helping in weakness, and Christ's continuing priestly intercession.","caution":"Intercession is not a way to control God or guarantee a preferred outcome. Keep the request, the people being prayed for and the passage's teaching about God's will in view.","passages":"Exodus 32:11–14; Isaiah 53:12; Romans 8:26–27, 34; Hebrews 7:23–27; 1 Timothy 2:1–4"}],
    ["Justice","What is right and fair according to God's character, including impartial judgment and protection of the vulnerable. Biblical justice is joined to mercy and faithfulness. See Deuteronomy 10:17-19; Micah 6:8; Luke 11:42.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Biblical justice reflects God's righteous character through impartial judgment, honest measures and protection of those vulnerable to exploitation. Israel's law and prophets repeatedly condemn bribery, oppression and partiality. Micah 6:8 joins justice with mercy and humble walking with God; Jesus rebukes neglect of justice and love. See Deuteronomy 10:17–19; Isaiah 1:16–17; Micah 6:8; Luke 11:42.","caution":"Do not reduce biblical justice to a modern political slogan or detach it from God's character, mercy and truth. Nor should calls for mercy be used to silence victims or excuse oppression. Read the concrete practices condemned and commanded in each passage.","passages":"Deuteronomy 10:17–19; Psalm 82:1–4; Isaiah 1:16–17; Amos 5:21–24; Micah 6:8; Matthew 23:23; Luke 11:42"}],
    ["Lament","A truthful prayer that brings grief, confusion or protest before God while continuing to address Him. Lament is a faithful biblical response to suffering, not the opposite of faith. See Psalms 13; 42; Lamentations 3.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Lament is prayer that speaks honestly to God about grief, fear, injustice or apparent absence while continuing to address Him. Many Psalms move between complaint, petition and renewed trust; Lamentations gives language to communal devastation. Biblical lament shows that faith can include tears and unanswered questions. See Psalms 13; 42; 88; Lamentations 3:19–33; Habakkuk 1–3.","caution":"Do not rebuke grief as unbelief or force every lament to end with an immediate emotional resolution. At the same time, lament is directed toward God and may hold pain together with hope; it is not a command to deny reality or to remain in unsafe circumstances.","passages":"Psalm 13; Psalm 42–43; Psalm 88; Lamentations 3:19–33; Habakkuk 1:2–4; Habakkuk 3:17–19; Matthew 27:46"}],
    ["Sabbath","The seventh-day rest given in the creation pattern and commanded to Israel as a sign of trust, worship and liberation. Christians differ on its covenant application, so read Exodus 20:8-11; Deuteronomy 5:12-15; Mark 2:27-28.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Sabbath is rooted in the creation pattern of rest and in Israel's covenant command to cease from ordinary labour. Deuteronomy also connects Sabbath with remembering liberation from slavery. Jesus teaches that the Sabbath was made for humanity and identifies the Son of Man as Lord of the Sabbath. Christian traditions differ on how the command applies under the New Covenant; see the passages together.","caution":"Do not flatten the Sabbath's creation, Israelite covenant and Gospel settings into one unqualified rule. Romans 14:5–6 and Colossians 2:16–17 are important to Christian discussions, while Hebrews 4 develops the theme of God's rest. Avoid judging another believer's conscience without careful biblical reasoning.","passages":"Genesis 2:1–3; Exodus 20:8–11; Deuteronomy 5:12–15; Mark 2:23–28; Romans 14:5–6; Colossians 2:16–17; Hebrews 4:1–11"}],
    ["Tabernacle","The portable sanctuary where Israel worshipped during the wilderness journey; it represented God's presence among His covenant people. See Exodus 25:8-9; 40:34-38; Hebrews 9:1-12.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"The tabernacle was Israel's portable sanctuary in the wilderness, built according to the pattern given in Exodus and associated with God's presence among His covenant people. Its furnishings and priestly service shaped Israel's worship. Hebrews 8–10 reflects on the earthly sanctuary in relation to Christ's priestly work, while preserving the distinct historical setting of the tabernacle.","caution":"Typological readings should be anchored in the biblical text, especially where Hebrews explicitly draws connections. Avoid assigning a hidden symbolic meaning to every measurement or object without textual support, and do not confuse the tabernacle with the later Jerusalem Temple.","passages":"Exodus 25:1–9; Exodus 26; Exodus 40:34–38; Leviticus 16; Numbers 9:15–23; Hebrews 8:1–6; Hebrews 9:1–14"}],
    ["Testimony","A witness or truthful account of what someone has seen, heard or experienced. Biblical testimony points beyond the speaker to God's acts and truth. See Psalm 66:16; John 4:39; Acts 1:8.",["witness","martyria","martyrion"], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Testimony is witness to what is true or to what God has done. Scripture includes personal accounts, public witness and the testimony borne by the apostles concerning Jesus' life, death and resurrection. John 4 shows a personal account leading others to investigate Jesus; Acts 1:8 describes Spirit-empowered witness. Testimony serves the truth rather than the reputation of the speaker.","caution":"A personal testimony can encourage others but does not carry the same authority as Scripture and should not be used to establish doctrine by itself. Distinguish what a person directly experienced from interpretation, hearsay or claims that cannot be verified.","passages":"Psalm 66:16; John 4:28–42; John 21:24; Acts 1:8; Acts 4:19–20; 1 John 1:1–4"}],
    ["Zion","A name associated with Jerusalem, especially the city as the place of God's dwelling and kingship; later Scripture also uses Zion imagery for God's people and promised hope. See Psalm 2:6; 48:1-2; Hebrews 12:22.", [], {"languageNote":"This English topic heading is not itself one original-language lemma. Hebrew and Greek forms vary by passage and cannot be inferred from the English label alone. For word-level claims, open a specific verse and use the source-linked word-study panel.","theology":"Zion first refers to a specific stronghold associated with Jerusalem and develops into a major biblical image for the city of David, the place of God's reign and worship, and the hope of God's restored people. The prophets use Zion imagery for both judgment and future restoration. Hebrews 12:22 uses heavenly Zion imagery for the gathered people of the new covenant.","caution":"Zion has different meanings in different passages: a geographical location, Jerusalem, poetic personification, or a theological image. Do not automatically equate every biblical use with a modern political claim; read the historical and literary context.","passages":"2 Samuel 5:6–10; Psalm 2:6; Psalm 48:1–2; Isaiah 2:2–4; Isaiah 52:1–10; Zechariah 9:9–10; Hebrews 12:22–24"}],
    ["Abide","To remain, dwell or continue in a relationship. Jesus uses abiding to describe continuing in Him and receiving life from Him. See John 15:1-10; 1 John 2:24-28.",["remain","dwell","meno"], {"languageNote":"Greek menō (G3306) means remain, stay or continue. In John 15 it is used repeatedly for the relationship between Jesus, His disciples and the fruit they bear.","theology":"Jesus' vine-and-branches image describes continuing dependence on Him. Fruitfulness is connected to remaining in His word and love; the image is relational and communal, not a technique for controlling outcomes.","caution":"Do not detach 'abide' from the surrounding teaching about Jesus' words, love, obedience and the disciples' shared life. Not every occurrence of menō carries the full imagery of John 15.","passages":"John 8:31–32; John 15:1–17; 1 John 2:24–28; 1 John 4:13–16"}],
    ["Abba","An Aramaic family address meaning Father. The New Testament uses it in prayer to express the Spirit-enabled relationship believers have with God. See Mark 14:36; Romans 8:15; Galatians 4:6."],
    ["Advocate","One who speaks in support of another. First John calls Jesus the advocate with the Father, and also describes the Holy Spirit as helper in John's Gospel. See John 14:16-17; 1 John 2:1.",["paraclete","parakletos","helper"], {"languageNote":"Greek paraklētos (G3875) is used in John's writings for an advocate, helper or one called alongside. English translations vary with context; it is not simply a technical legal title in every occurrence.","theology":"First John 2:1 presents Jesus Christ as advocate with the Father. John 14–16 uses the same Greek term for the Holy Spirit, the helper who teaches and bears witness to Jesus.","caution":"Keep the distinct contexts in view: Jesus' advocacy in 1 John and the Spirit's promised presence in the Farewell Discourse. Avoid building a complete doctrine from the English word alone.","passages":"John 14:16–17, 26; John 15:26; John 16:7–15; 1 John 2:1–2"}],
    ["Amen","A Hebrew expression affirming what is trustworthy or true, often translated truly or so be it. It can close prayer and affirm God's faithfulness. See Numbers 5:22; 1 Corinthians 14:16; Revelation 3:14."],
    ["Angel","A messenger, often a heavenly servant who carries out God's purposes. Scripture also warns readers not to worship angels. See Psalm 103:20; Luke 1:26-38; Hebrews 1:14; Revelation 22:8-9."],
    ["Apostasy","A turning away from a previously professed faith or allegiance. Biblical warnings call communities to endurance, truth and faithful worship. See Deuteronomy 13:1-5; 2 Thessalonians 2:3; Hebrews 3:12."],
    ["Baptism","A ritual washing or immersion associated in the New Testament with repentance, faith, identification with Christ and the community of believers. Christian traditions differ on some details. See Matthew 28:19; Acts 2:38-41; Romans 6:3-4."],
    ["Blasphemy","Speech or conduct that dishonours God or treats what is holy with contempt. Read each passage carefully because biblical contexts distinguish different offences and warnings. See Leviticus 24:10-16; Mark 3:28-30; James 2:7."],
    ["Church","The gathered people who belong to Christ; the New Testament uses the word for local congregations and the wider people of God. It is not merely a building. See Matthew 16:18; Acts 2:42-47; Ephesians 1:22-23.",["ekklesia","assembly","congregation"], {"languageNote":"Greek ekklēsia (G1577) commonly means assembly or congregation. In the New Testament it can refer to a local gathering or the wider people who belong to Christ.","theology":"The church is a people called into shared worship, teaching, fellowship, service and witness. New Testament images include Christ's body, God's household and a holy temple made of people.","caution":"The word does not mean a church building by itself. Also avoid assuming every local congregation has the same structure or circumstances; read each letter's audience and situation.","passages":"Matthew 16:18; Acts 2:42–47; 1 Corinthians 12:12–27; Ephesians 1:22–23; 1 Peter 2:4–10"}],
    ["Christ","The Greek title meaning Anointed One, corresponding to Messiah. Christians confess Jesus as God's promised King and Saviour. See Matthew 16:16; John 1:41; Acts 2:36.",["messiah","mashiach","anointed one"], {"languageNote":"Greek Christos (G5547) means anointed one and translates the title Messiah; Hebrew mashiach (H4899) also means anointed one. In the New Testament 'Christ' functions as a title confessed of Jesus, not merely a surname.","theology":"The title connects Jesus with Israel's hopes for God's anointed king and deliverer. The New Testament identifies Him as the crucified and risen Messiah and develops the meaning of His kingship through His teaching and work.","caution":"Do not import every Old Testament anointed-person passage directly into a prediction about Jesus. Follow the specific text and the way the New Testament cites or echoes it.","passages":"Psalm 2; Isaiah 11:1–10; Daniel 7:13–14; Matthew 16:13–20; Acts 2:22–36; 1 Corinthians 15:1–8"}],
    ["Conscience","A person's moral awareness that can accuse, excuse or require formation. Scripture calls for a conscience shaped by truth and kept clear before God and others. See Romans 2:14-16; 1 Corinthians 8:7-12; 1 Timothy 1:5."],
    ["Doxology","Words of praise that give glory to God. Doxologies appear throughout Scripture and direct worship toward God's character and saving work. See Romans 11:33-36; Ephesians 3:20-21; Jude 24-25."],
    ["Election","God's choosing, described in Scripture in relation to Israel, Christ and the people who belong to Him. Christian traditions explain aspects of election differently; interpret each text in its context. See Deuteronomy 7:6-8; Ephesians 1:3-6; Romans 9."],
    ["Eternal Life","Life belonging to the age to come and given through relationship with God in Jesus Christ. In John's Gospel it begins now and has a future fullness. See John 3:16; 5:24; 17:3; 1 John 5:11-13.",["everlasting life","life of the age","zoe"], {"languageNote":"Greek zōē (G2222) means life and aiōnios (G166) means eternal or belonging to an age. The phrase zōē aiōnios is more than the idea of endless duration in John's Gospel.","theology":"Eternal life is life from God through Jesus Christ. John describes it as a present gift known in relationship with the Father and the Son, while the wider New Testament also points to resurrection and the age to come.","caution":"Do not reduce eternal life to living forever without considering its relational and resurrection dimensions. Keep present assurance and future hope together.","passages":"John 3:16–17; John 5:24–29; John 17:1–3; Romans 6:22–23; 1 John 5:11–13"}],
    ["Flesh","A biblical term that can refer to the human body, mortal life, human weakness or life governed by sinful desires, depending on context. It does not mean the physical body is inherently evil. See Genesis 6:3; John 1:14; Galatians 5:16-24."],
    ["Glory","The weight, splendour and honour associated with God's presence and character; Scripture also speaks of giving God glory and sharing in the glory He promises. See Exodus 33:18-23; John 1:14; Romans 8:18."],
    ["Incarnation","The Christian teaching that the eternal Word truly became human in Jesus Christ. The New Testament presents this as central to God's saving work. See John 1:1-18; Philippians 2:5-11; Hebrews 2:14-17.",["word became flesh","God with us"], {"languageNote":"'Incarnation' is a later theological term, not a single Greek word in John 1. John says the Logos became flesh (sarx egeneto, John 1:14); the wording should be read in the passage rather than treated as a dictionary lemma.","theology":"The doctrine confesses that the eternal Word truly became human in Jesus Christ. The New Testament connects this with God's self-revelation, solidarity with humanity and saving work.","caution":"Avoid describing Jesus as merely appearing human or as a human person later adopted by God. Also distinguish the biblical text from later technical explanations used by Christian traditions.","passages":"John 1:1–18; Philippians 2:5–11; Colossians 1:15–20; Hebrews 2:14–18"}],
    ["Inspiration","The work of God by which Scripture is described as God-breathed and useful for teaching, correction and training. This does not remove the need to attend to each book's genre and human authorship. See 2 Timothy 3:14-17; 2 Peter 1:20-21."],
    ["Messiah","A Hebrew title meaning Anointed One, used for an appointed king or deliverer and developed in biblical hope. The New Testament identifies Jesus as the Messiah. See Psalm 2:1-12; Daniel 9:25-26; John 4:25-26."],
    ["Parable","A short story, comparison or image that communicates a teaching and invites response. Jesus' parables must be read with attention to their setting, audience and central point. See Matthew 13; Luke 15; 18:1-14."],
    ["Pentecost","The Jewish festival of Weeks, and in Acts the day the Holy Spirit came upon Jesus' followers and the gospel was proclaimed publicly. See Leviticus 23:15-22; Acts 2:1-41."],
    ["Perseverance","Continuing in faith and obedience through difficulty. Scripture encourages endurance while grounding hope in God's faithfulness, not human self-confidence alone. See Matthew 24:13; Romans 5:1-5; Hebrews 10:35-39; James 1:2-4."],
    ["Prophecy","A message spoken on God's behalf in a particular biblical setting. Prophecy may address present injustice, call people to covenant faithfulness or announce future hope. See Deuteronomy 18:18-22; 1 Corinthians 14:1-5; 2 Peter 1:19-21."],
    ["Propitiation","A theological term used in some Bible translations for Christ's atoning work in relation to sin and God's righteous judgment. Other translations use sacrifice of atonement or expiation; compare the wording and context. See Romans 3:25; 1 John 2:2; 4:10."],
    ["Resurrection","The raising of the dead to life by God's power. The New Testament centres Christian hope on Jesus' bodily resurrection and the promised resurrection of His people. See John 11:25-26; 1 Corinthians 15; 1 Peter 1:3.",["raised from the dead","anastasis"], {"languageNote":"Greek anastasis (G386) means rising or resurrection. The New Testament uses it for the raising of Jesus and the promised resurrection of the dead.","theology":"Christian hope centres on Jesus' bodily resurrection, not merely the survival of a disembodied soul. Paul connects Christ's resurrection with the future resurrection of those who belong to Him.","caution":"Do not treat resurrection as only a metaphor for feeling renewed. Biblical passages may use resurrection imagery figuratively, but 1 Corinthians 15 argues for a real future raising of the dead.","passages":"Daniel 12:1–3; John 11:23–27; Luke 24:1–12, 36–43; 1 Corinthians 15; 1 Peter 1:3–5"}],
    ["Sacrifice","An offering presented to God in worship, thanksgiving, covenant practice or atonement. The New Testament interprets Jesus' death as decisive and calls believers to lives of worship and service. See Leviticus 1-7; Hebrews 9-10; Romans 12:1."],
    ["Sanctuary","A holy place set apart for worship and associated with God's presence. Biblical sanctuary language includes the tabernacle, temple and later theological imagery. See Exodus 25:8; Psalm 73:17; Hebrews 8:1-2."],
    ["Immanuel","A Hebrew name meaning God with us, used in Isaiah's sign and applied to Jesus in Matthew's account of His birth. Read the original prophecy and its Gospel use in context. See Isaiah 7:14; 8:8-10; Matthew 1:22-23."],
    ["Jubilee","The fiftieth-year release described in Israel's law, involving liberty, return of family land and rest for the land. It expresses justice, restoration and God's ownership. See Leviticus 25:8-55; Luke 4:16-21."],
    ["Law","A broad biblical term that can refer to God's instruction, the Torah, a particular command or a principle at work. Its meaning depends on context; distinguish the Mosaic covenant from other uses in Scripture. See Deuteronomy 6:1-9; Psalm 19:7-11; Romans 7:12; Galatians 3."],
    ["Manna","The food God provided for Israel in the wilderness, teaching dependence and daily trust. Jesus later uses manna imagery in teaching about the bread of life. See Exodus 16; Deuteronomy 8:2-3; John 6:30-35."],
    ["New Covenant","The promised covenant associated with forgiveness, transformed hearts and renewed relationship with God, announced by the prophets and connected by Jesus with His death. See Jeremiah 31:31-34; Luke 22:20; Hebrews 8:6-13.",["new testament","covenant in Christ"], {"languageNote":"Jeremiah 31:31 uses Hebrew berit (covenant) with chadash (new). The New Testament uses Greek diathēkē (G1242) for covenant. The phrase is interpreted through the prophetic promise and its New Testament use.","theology":"Jeremiah's promise includes God's instruction written on the heart, knowledge of God and forgiveness. Jesus connects the cup with the New Covenant in His blood; Hebrews develops the promise in relation to Christ's priestly work.","caution":"Christian traditions differ on how the New Covenant relates to Israel, the church and the Mosaic covenant. Read Jeremiah 31, Luke 22 and Hebrews 8–10 before drawing conclusions.","passages":"Jeremiah 31:31–34; Ezekiel 36:24–28; Luke 22:19–20; 2 Corinthians 3:4–18; Hebrews 8–10"}],
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
    ["Logos","A Greek word meaning word, message or reason, whose meaning depends on context. John's Gospel uses Logos as a title for the eternal Word who was with God and became flesh in Jesus Christ. See John 1:1-18; 1 John 1:1-3.",["word","the Word","rhema"], {"languageNote":"Greek logos (G3056) can mean word, message, account or reason. Greek rhēma (G4487) is a related but distinct word often meaning a spoken word or utterance; do not treat them as interchangeable synonyms.","theology":"John 1 uses Logos for the Word who was with God, was God and became flesh in Jesus Christ. Read the title through the prologue's claims about creation, life, light, revelation and the incarnation.","caution":"Do not assume every occurrence of logos refers to Jesus as a title; many passages use it for an ordinary word, message or account. Context is decisive.","passages":"John 1:1–18; John 1:14; 1 John 1:1–3; Revelation 19:11–16"}],
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
    ["Covenant faithfulness","Steadfast loyalty to a covenant relationship, expressed through dependable love and action. Scripture repeatedly describes God as faithful to His promises while also calling His people to faithful response. See Deuteronomy 7:9; Psalm 89:1-4; Lamentations 3:22-24."],
    ["Eschatology","The study of the last things and the fulfilment of God’s purposes, including resurrection, judgment, the return of Christ and the new creation. Interpret prophetic passages in their literary and historical contexts. See Daniel 12:1-3; 1 Corinthians 15; Revelation 21-22."],
    ["Exegesis","The careful interpretation of a passage by attending to its wording, grammar, literary setting, historical background and place in Scripture. Good exegesis seeks what the text communicates before drawing present-day application. See Nehemiah 8:8; Luke 24:27; 2 Timothy 2:15."],
    ["Koinonia","A Greek term commonly translated fellowship, sharing or participation. In the New Testament it describes shared life in Christ, including mutual care and participation in the gospel. See Acts 2:42; 1 Corinthians 10:16; Philippians 1:5."],
    ["Parakletos","A Greek term translated Advocate, Helper or Comforter depending on context. John uses it for the Holy Spirit and for Jesus Christ as advocate; the specific meaning should be read in each passage. See John 14:16-17; 15:26; 1 John 2:1."],
    ["Torah","A Hebrew word meaning instruction or teaching, often referring to the first five books of the Bible and, in wider contexts, God’s instruction. Read references to the Law in their covenant and literary setting. See Deuteronomy 6:4-9; Psalm 1:1-2; Matthew 5:17-20.",["law","instruction","teaching"], {"languageNote":"Hebrew torah (H8451) means instruction or teaching and is often used for God's instruction. It commonly refers to the first five books, but its range in a passage may be wider or narrower.","theology":"Torah is not merely a list of rules: it includes instruction that shapes Israel's covenant life, worship, justice and wisdom. The New Testament discusses Torah within its own arguments about Jesus, covenant and life in the Spirit.","caution":"Avoid flattening all uses of 'law' into one meaning. Identify whether a passage refers to the Pentateuch, a particular command, Scripture as a whole or a legal principle.","passages":"Deuteronomy 6:4–9; Psalm 1:1–2; Psalm 119; Matthew 5:17–20; Romans 7:7–12; Galatians 3"}],
    ["Typology","A way later Scripture presents earlier people, events or institutions as patterns that point toward a greater fulfilment. Typological readings should be grounded in the biblical text rather than imaginative resemblance. See Romans 5:14; 1 Corinthians 10:1-11; Hebrews 8:5."],
    ["New creation","The renewed life God brings through Christ and the promised renewal of all things. The New Testament uses the language both for present transformation and future hope. See Isaiah 65:17; 2 Corinthians 5:17; Galatians 6:15; Revelation 21:1-5."],,
    ["Altar","A structure or designated place for presenting offerings and worship. Altars mark sacrifice, remembrance and covenant encounters in Scripture; their meaning depends on the passage. See Genesis 8:20; 12:7-8; Exodus 20:24; Hebrews 13:10."],
    ["Ark of the Covenant","The sacred chest associated with God's covenant with Israel, containing covenant testimony and kept in the sanctuary. It signified God's covenant presence but was never an object to manipulate as a guarantee of victory. See Exodus 25:10-22; 1 Samuel 4; Hebrews 9:4."],
    ["Atoning sacrifice","An offering associated with dealing with sin and restoring covenant relationship. The New Testament presents Jesus' self-offering as decisive; read it alongside the Old Testament sacrificial system. See Leviticus 16; Hebrews 9:11-14; 10:1-14."],
    ["Bema","A Greek term for a raised platform or judgment seat. In the New Testament it can refer to an official tribunal and is used in teaching about accountability before Christ. See John 19:13; Acts 18:12-17; 2 Corinthians 5:10."],
    ["Boaz","A man in Ruth who acts with generosity and fulfils the role of family redeemer within Israel's customs. His story highlights loyalty, provision and God's care in ordinary life. See Ruth 2-4."],
    ["Cherubim","Heavenly beings associated in Scripture with God's throne and the guarded holiness of His presence. They are not ordinary human angels; descriptions vary by biblical context. See Genesis 3:24; Exodus 25:18-22; Ezekiel 10; Revelation 4:6-8."],
    ["Circumcision","The covenant sign given to Abraham's household and later required of male Israelites. The New Testament discusses its covenant significance and distinguishes outward sign from inward faithfulness. See Genesis 17; Romans 2:28-29; Galatians 5:6."],
    ["Clean and unclean","Categories in Israel's law concerning ritual status, food, bodily conditions and worship. Ritual uncleanness was not always the same as moral sin; Jesus and the apostles address these categories in their covenant settings. See Leviticus 11-15; Mark 7:14-23; Acts 10."],
    ["Confession","Acknowledging truth before God or others. Scripture includes confession of sin, confession of faith and public testimony; each use should be read in its setting. See Leviticus 5:5; Psalm 32:5; Romans 10:9-10; 1 John 1:9."],
    ["Covenant mediator","A person who serves between parties in establishing or representing a covenant. Moses mediates the Sinai covenant, while the New Testament describes Jesus as mediator of the new covenant. See Exodus 20:18-21; Galatians 3:19-20; Hebrews 8:6; 9:15."],
    ["Day of Atonement","The annual day described in Leviticus 16 when Israel's high priest performed rites for cleansing and atonement. Hebrews uses this ritual background to explain Christ's once-for-all priestly work. See Leviticus 16; Hebrews 9:6-14."],
    ["Deacon","A servant or minister entrusted with practical service in the church. The New Testament describes qualifications for recognised service; traditions differ on the precise structure of the office. See Acts 6:1-6; Philippians 1:1; 1 Timothy 3:8-13."],
    ["Elder","A recognised leader in a local community, associated with oversight, teaching and care. New Testament descriptions emphasise character and faithful service rather than status. See Acts 14:23; 1 Timothy 3:1-7; Titus 1:5-9; 1 Peter 5:1-4."],
    ["Epiphany","A term used in Christian tradition for the manifestation or appearing of Christ. In the New Testament related Greek words describe Christ's appearing and the revealing of God's grace. See Luke 2:29-32; Titus 2:11-13; 2 Timothy 1:10."],
    ["Firstfruits","The first portion of a harvest presented to God, expressing gratitude and trust. The New Testament uses firstfruits imagery for the Spirit's work and Christ's resurrection as the beginning of the coming harvest. See Exodus 23:19; Leviticus 23:9-14; 1 Corinthians 15:20-23; Romans 8:23."],
    ["Fellowship","Shared participation and mutual life among people joined in Christ. Biblical fellowship includes truth, prayer, generosity and practical care, not simply social contact. See Acts 2:42-47; 1 John 1:3-7; Philippians 2:1-4."],
    ["Firstborn","A term for the first child born, carrying family and inheritance significance. Scripture also uses it figuratively for rank, inheritance or supremacy; it does not always mean the first created being. See Exodus 4:22; Psalm 89:27; Colossians 1:15-18; Hebrews 1:6."],
    ["Gentleness","Strength expressed with humility, patience and restraint rather than harshness. It is named among the fruit of the Spirit and expected in Christian relationships. See Matthew 11:29; Galatians 5:22-23; 6:1; Ephesians 4:2."],
    ["Glorification","The final completion of salvation when believers share in the resurrection glory promised by God. Christian hope looks toward bodily renewal and conformity to Christ. See Romans 8:17, 29-30; Philippians 3:20-21; 1 John 3:2."],
    ["Holy Spirit","The personal Spirit of God, fully involved in God's work of creation, revelation, new birth, empowerment, sanctification and the life of the church. The New Testament speaks of the Spirit as divine and personal; read each passage in its own setting. See Genesis 1:2; John 14:16-17; Acts 1:8; Romans 8:1-17; 1 Corinthians 12."],
    ["High priest","The chief priest in Israel's sanctuary system, responsible for particular duties including the Day of Atonement. Hebrews presents Jesus as the great high priest whose ministry surpasses the earlier priesthood. See Leviticus 16; Hebrews 4:14-16; 7:23-28."],
    ["Inheritance","A possession or share received, often through family descent or covenant promise. Scripture also uses inheritance for the future life and hope God gives His people. See Genesis 15:7-8; Numbers 26:52-56; Ephesians 1:11-14; 1 Peter 1:3-5."],
    ["Intertestamental period","A historical label for the centuries between the Old and New Testaments in many Christian Bible arrangements. The period includes major political, cultural and religious developments that help explain the New Testament setting; it is not a single biblical book."],
    ["Justification by faith","Paul's teaching that people are put right with God through faith in Jesus Christ, not by earning status through works of the law. The relationship between faith, works and obedience must be read across Paul's argument. See Romans 3-5; Galatians 2-3; James 2:14-26."],
    ["Kingdom of heaven","Matthew's frequent expression for the reign of God. It does not simply mean the place people go after death; it describes God's rule and its promised fulfilment. See Matthew 4:17; 5:3; 13:1-52."],
    ["Kinsman-redeemer","A close family member who could act to protect a relative's interests, including redeeming land or preserving a family line under Israel's law. Ruth uses this custom in its account of Boaz. See Leviticus 25:25; Ruth 3-4."],
    ["Leprosy","A Bible translation term used for several skin conditions and related ritual classifications; it should not automatically be equated with modern Hansen's disease. The law describes examination and purification procedures. See Leviticus 13-14; Luke 5:12-14."],
    ["Laying on of hands","A physical act used in Scripture in blessing, commissioning, identification and prayer for healing. Its significance depends on the occasion and should not be treated as a magical technique. See Genesis 48:14-20; Numbers 27:18-23; Acts 13:1-3; 1 Timothy 4:14."],
    ["Mediation","Acting between parties or representing one party to another. Biblical mediation may involve covenant, priestly service or reconciliation; the New Testament calls Jesus the one mediator between God and humanity. See Exodus 32:30-32; 1 Timothy 2:5; Hebrews 9:15."],
    ["Mercy seat","The cover of the ark of the covenant, associated with the place where atonement was made on the Day of Atonement. Some translations render the related term as atonement cover. See Exodus 25:17-22; Leviticus 16:14-15; Hebrews 9:5."],
    ["New birth","The spiritual life and transformation described by Jesus as being born from above or born again. John connects this with the work of the Spirit and faith in Christ. See John 3:1-8; Titus 3:4-7; 1 Peter 1:3, 23."],
    ["Offering","A gift or sacrifice presented to God. Scripture describes different offerings with distinct purposes; they should not be collapsed into one general ritual. See Leviticus 1-7; Hebrews 13:15-16."],
    ["Ordination","The setting apart or public recognition of people for particular ministry responsibilities. Biblical examples include prayer and laying on of hands, but traditions differ in how ordination is practised. See Numbers 27:18-23; Acts 6:1-6; 1 Timothy 4:14."],
    ["Parousia","A Greek term meaning presence or arrival, used in the New Testament for the coming of Christ. Interpret teaching about the Parousia alongside its pastoral purpose of hope, readiness and faithfulness. See Matthew 24:3, 27; 1 Thessalonians 4:15-18; 2 Peter 3:4."],
    ["Passover lamb","The lamb whose blood marked Israelite homes during the Exodus deliverance. The New Testament uses Passover imagery in speaking about Jesus' death; read the connection with Exodus 12 in view. See Exodus 12:1-28; John 19:14-37; 1 Corinthians 5:7."],
    ["Pentateuch","A name for the first five books of the Bible: Genesis, Exodus, Leviticus, Numbers and Deuteronomy. These books establish creation, covenant, law, worship and Israel's wilderness story."],
    ["Priesthood","The office and service of priests who represented the people in sanctuary worship and handled offerings under Israel's covenant law. Hebrews compares this priesthood with Christ's unique and enduring priestly ministry. See Exodus 28-29; Leviticus 8-9; Hebrews 5-10."],
    ["Redemption of creation","The promised renewal of the created order, which Scripture connects with the liberation of creation from decay and the new heavens and new earth. See Romans 8:18-25; 2 Peter 3:13; Revelation 21:1-5."],
    ["Remnant","A surviving group preserved through judgment or crisis. Prophets use remnant language to speak of judgment, hope and God's continuing faithfulness; read it in its historical setting. See Isaiah 10:20-22; Jeremiah 23:3; Romans 11:1-5."],
    ["Repentance and faith","The paired response of turning toward God and trusting the good news. The New Testament presents both as central to receiving and living in response to the gospel. See Mark 1:14-15; Acts 20:21; Hebrews 6:1."],
    ["Samaritan","A person from Samaria, a region and people with a complex history of relationship with Judeans. Jesus' encounters with Samaritans challenge social hostility and reveal the reach of God's mercy. See Luke 10:25-37; John 4:1-42."],
    ["Sanctification by the Spirit","The work of the Holy Spirit in setting people apart for God and shaping them in holiness. Scripture connects this work with faith, truth and obedient life. See Romans 15:16; 1 Corinthians 6:11; 2 Thessalonians 2:13; 1 Peter 1:2."],
    ["Shekinah","A later Jewish term often used to describe God's dwelling or manifest presence. The word itself does not occur in the Hebrew Bible; discuss the concept through biblical passages about God's glory and presence. See Exodus 40:34-38; 1 Kings 8:10-11."],
    ["Shepherd","A person who cares for sheep; Scripture uses shepherd imagery for leaders and for God Himself. Jesus identifies Himself as the good shepherd who lays down His life for the sheep. See Psalm 23; Ezekiel 34; John 10:1-18; 1 Peter 5:2-4."],
    ["Sin offering","An offering in Israel's law associated with purification and atonement for particular sins and impurity. Translations and scholarly descriptions vary; read the ritual instructions in Leviticus carefully. See Leviticus 4-5; 6:24-30."],
    ["Sovereignty of God","A theological expression for God's supreme authority and rule over creation and history. Scripture also affirms human responsibility; passages should be read without flattening either theme. See Psalm 103:19; Daniel 4:34-35; Acts 17:24-28."],
    ["Spiritual gifts","Abilities or services given by the Holy Spirit for the good of the church and its mission. New Testament lists are not identical and should be read as examples rather than one exhaustive catalogue. See Romans 12:3-8; 1 Corinthians 12-14; Ephesians 4:7-16; 1 Peter 4:10-11."],
    ["Synagogue","A Jewish gathering place for prayer, Scripture reading and teaching. Synagogues appear frequently in the Gospels and Acts as settings for Jesus' ministry and the early Christian mission. See Luke 4:16-21; Acts 13:14-16."],
    ["The Lord's Supper","The meal Jesus instituted with His disciples before His death, remembered by Christians as proclamation of His death and participation in the new covenant. Christian traditions differ on aspects of its practice and theology. See Luke 22:14-20; 1 Corinthians 10:16-17; 11:23-29."],
    ["The Word of God","An expression that can refer to God's spoken message, Scripture, the gospel proclamation or, in John's Gospel, Jesus the eternal Word. Identify the referent from the passage rather than assuming every occurrence means the same thing. See Psalm 119:105; Mark 7:13; John 1:1-18; Hebrews 4:12."],
    ["Unleavened bread","Bread made without yeast, especially associated with Israel's hurried departure from Egypt and the Feast of Unleavened Bread. Paul also uses leaven as an image in teaching about corrupting influence. See Exodus 12:14-20; Deuteronomy 16:3-8; 1 Corinthians 5:6-8."],
    ["Vine and branches","Jesus' image for the relationship between Himself and His disciples: life and fruitfulness depend on remaining in Him. The passage calls for enduring love and obedience, not a technique for guaranteed success. See John 15:1-17."],
    ["Widow and orphan","People especially vulnerable in the social world of the Bible and repeatedly named as those whom God's people must protect. Care for them is a test of justice and sincere worship. See Deuteronomy 10:18; Isaiah 1:17; James 1:27."],
    ["Yom Kippur","The Hebrew name for the Day of Atonement, the annual day of fasting and sanctuary purification described in Leviticus 16 and 23:26-32. The Hebrew name means Day of Atonement."],
    ["Zeal of the Lord","A biblical expression for God's passionate commitment to His purposes and promises. It appears in prophetic hope and should be distinguished from human anger or religious aggression. See 2 Kings 19:31; Isaiah 9:7; 37:32."],
    ["Abomination","Something regarded as detestable or deeply offensive, often in relation to idolatry, injustice or prohibited worship. The precise offence depends on the passage. See Leviticus 18; Proverbs 6:16-19; Ezekiel 8."],
    ["Abundance","A word for plentiful provision or fullness. Scripture speaks of God's generosity while warning against greed and teaching contentment and generosity. See Psalm 65:9-13; John 10:10; 2 Corinthians 9:8."],
    ["Accuser","One who brings a charge against another. Biblical passages use this role in human settings and in descriptions of Satan; distinguish the speaker and setting in each text. See Job 1-2; Zechariah 3:1-5; Revelation 12:10."],
    ["Agape","A Greek noun often translated love. In the New Testament it describes love expressed in self-giving action and is central to Jesus' command and Paul's teaching; no single English gloss captures every use. See John 13:34-35; 1 Corinthians 13; 1 John 4:7-12."],
    ["Alleluia","A Greek form of a Hebrew praise expression meaning 'Praise the LORD'. It appears especially in the Psalms and in Revelation's heavenly praise. See Psalms 104-106; Revelation 19:1-6."],
    ["Anathema","A Greek term used for something devoted to destruction or placed under a curse, and in some New Testament contexts for a solemn rejection. Interpret its force carefully in context. See Deuteronomy 7:26; Romans 9:3; 1 Corinthians 16:22; Galatians 1:8-9."],
    ["Antichrist","A term in John's letters for one who denies the Father and the Son and opposes the truth about Jesus. Scripture also speaks of other opponents and deceivers; avoid treating every image as an identical figure. See 1 John 2:18-23; 4:1-3; 2 John 7."],
    ["Armageddon","The name associated in Revelation with the gathering for the final conflict in its apocalyptic vision. Interpret the image within Revelation's symbolism and message of God's victory rather than assuming details beyond the text. See Revelation 16:12-16; 19:11-21."],
    ["Baptism in the Holy Spirit","A New Testament expression connected with the promised gift and empowering presence of the Spirit. Christian traditions differ on how particular passages relate this to conversion and later experience; compare the Gospel promises and Acts narratives. See Matthew 3:11; Acts 1:4-8; 2:1-4; 10:44-48."],
    ["Beloved","A term of affection used for people loved by God or by one another. It can express covenant love, family relationship and the identity of believers in Christ. See Deuteronomy 33:12; Romans 1:7; Colossians 3:12; 1 John 3:1."],
    ["Bethel","A place name meaning 'house of God', associated with Jacob's dream and later Israelite worship. Its history includes both sacred memory and warnings against corrupted worship. See Genesis 28:10-22; 35:1-15; 1 Kings 12:28-33."],
    ["Bethlehem","A town in Judah associated with David's family and the birth of Jesus in the Gospels. The New Testament connects Jesus' birth with prophetic expectation while preserving the story's historical setting. See Ruth 1:1-2; 1 Samuel 16:1-13; Micah 5:2; Matthew 2:1-6; Luke 2:1-20."],
    ["Bride of Christ","A biblical image for the covenant relationship between Christ and His people, especially in imagery of marriage and faithful love. It is a metaphor and should be interpreted with its scriptural context. See Ephesians 5:25-32; Revelation 19:6-9; 21:2."],
    ["Canon of Scripture","The collection of writings received as authoritative Scripture by a faith community. Jewish and Christian traditions differ in the arrangement and extent of some biblical collections; the term concerns recognition and collection, not a verse within the Bible."],
    ["Captivity","The state of being taken or held under another power. Biblical narratives include Israel's and Judah's captivities, while other passages use captivity as an image for oppression or spiritual bondage. See 2 Kings 17; 25; Psalm 137; Luke 4:18."],
    ["Christology","The study of the identity, nature and work of Jesus Christ. Biblical Christology draws together the Gospels, apostolic teaching and the wider scriptural witness; it should begin with the passages themselves."],
    ["Crucifixion","A Roman execution by suspension on a cross, used in Jesus' death. The New Testament interprets the crucifixion as central to God's saving work, while also describing its shame and historical violence. See Mark 15; John 19; 1 Corinthians 1:18-25; Galatians 3:13."],
    ["Deliverance","Rescue from danger, oppression, sin or hostile power. Scripture describes God delivering individuals and communities, and calls readers to identify the specific danger and saving action in each passage. See Exodus 14; Psalm 34:4-7; Colossians 1:13-14."],
    ["Deity of Christ","The Christian confession that Jesus truly shares the divine identity, grounded in the New Testament's portrayal of His relationship with the Father, worship, authority and divine titles. See John 1:1-18; 20:28; Colossians 2:9; Hebrews 1:1-12."],
    ["Ecclesia","A Greek word commonly translated assembly or church. In the New Testament it refers to the gathered community, not inherently to a building or a modern denomination. See Matthew 16:18; Acts 5:11; 1 Corinthians 1:2."],
    ["Expiation","A term used in some theological explanations for the removal or cleansing of sin. English translations differ in how they render the underlying biblical language; compare the passage and translation notes. See Leviticus 16; Psalm 51:7; Hebrews 9:22-28."],
    ["Faithfulness","Reliability, loyalty and steadfast commitment. Scripture describes God's faithfulness to His promises and calls His people to dependable loyalty in relationships and obedience. See Deuteronomy 7:9; Psalm 36:5; Lamentations 3:22-23; Galatians 5:22."],
    ["Fear of the Lord","Reverent awe, trust and submission before God. It is described as the beginning of wisdom and is not merely terror; its expression depends on knowing God's holiness and mercy. See Proverbs 1:7; 9:10; Ecclesiastes 12:13; Acts 9:31."],
    ["Fruit of the Spirit","The qualities named in Galatians 5:22-23 as the fruit of the Spirit's work: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness and self-control. The passage contrasts Spirit-led life with the works of the flesh."],
    ["Gehenna","A Greek term used in the Gospels for a place or image of final judgment, based on the Valley of Hinnom near Jerusalem and its prophetic associations. Interpret Jesus' warnings within their literary and theological context. See Matthew 5:22, 29-30; Mark 9:43-48."],
    ["Hades","A Greek term used in the New Testament for the realm or state of the dead. It is not automatically identical to every biblical term translated hell; compare each passage and its imagery. See Matthew 11:23; Luke 16:23; Acts 2:27, 31; Revelation 20:13-14."],
    ["Hallelujah","An English rendering of a Hebrew praise expression meaning 'Praise the LORD'. It calls worshippers to praise God for His character and deeds. See Psalms 146-150; Revelation 19:1-6."],
    ["Heaven","A biblical term that can refer to the sky, the heavens or God's dwelling and rule. Christian hope includes resurrection and renewed creation, not merely an abstract escape from earth. See Genesis 1:1; Matthew 6:9-10; 1 Thessalonians 4:16-17; Revelation 21-22."],
    ["Hell","An English term used by Bible translations for several distinct biblical images or terms concerning judgment. Gehenna, Hades, the lake of fire and other expressions should not be treated as interchangeable without examining each passage. See Matthew 10:28; Luke 16:23; Revelation 20:14-15."],
    ["Heresy","A term for teaching judged to depart from essential Christian truth. The New Testament warns against destructive teaching, but the label should not replace careful examination of Scripture and the actual claim being discussed. See Acts 20:28-30; Galatians 1:6-9; 2 Peter 2:1."],
    ["Hypostatic union","A later theological expression describing the Christian confession that Jesus Christ is one person truly divine and truly human. The phrase is not a Bible quotation; it summarises passages about the Word made flesh and Christ's full humanity and deity. See John 1:1-18; Philippians 2:5-11; Hebrews 2:14-18."],
    ["Idolatry","Worship or ultimate trust directed toward an image, created thing or rival power instead of God. Scripture also warns that greed can function as idolatry. See Exodus 20:3-6; Isaiah 44:9-20; Romans 1:21-25; Colossians 3:5."],
    ["Kenosis","A Greek-derived theological term from the language of Philippians 2:7, often discussed as Christ's self-emptying. Interpret the passage through its full movement of humility, incarnation and exaltation; do not assume it means Jesus ceased to be divine. See Philippians 2:5-11."],
    ["Living water","An image used for fresh flowing water and, in Jesus' teaching, the life He gives through the Spirit. Its meaning develops through the conversation and scriptural background. See Jeremiah 2:13; John 4:10-14; 7:37-39."],
    ["Mammon","An Aramaic term for wealth or possessions, personified in Jesus' teaching as a rival master. The warning concerns divided loyalty and the spiritual danger of serving wealth. See Matthew 6:19-24; Luke 16:9-13."],
    ["Marriage","A covenantal and social union described in Scripture through creation, family law, prophetic imagery and Jesus' teaching. Read passages in their historical setting and distinguish description from command. See Genesis 2:18-25; Matthew 19:3-9; Ephesians 5:21-33."],
    ["New Jerusalem","The city imagery in Revelation for God's final dwelling with His people in renewed creation. The vision emphasises God's presence, healing and the end of death and sorrow. See Revelation 21:1-27; 22:1-5."],
    ["Predestination","A theological term for God's purpose and prior determination, discussed in passages about calling, adoption and salvation. Christian traditions interpret some details differently; begin with each passage's argument and avoid treating one verse as the whole doctrine. See Romans 8:28-30; Ephesians 1:3-14."],
    ["Prayer","Addressing God in praise, confession, thanksgiving, lament, petition and intercession. Scripture presents prayer as relationship and dependence, shaped by God's character and purposes rather than a formula for controlling outcomes. See Matthew 6:5-13; Philippians 4:6-7; 1 Thessalonians 5:16-18."],
    ["Prophet","A person called to speak God's message. Biblical prophets may confront injustice, call for covenant faithfulness, announce judgment or proclaim hope; their words must be read in historical and literary context. See Deuteronomy 18:15-22; Jeremiah 1:4-10; Acts 3:22-24."],
    ["Satan","A biblical title meaning adversary or accuser, used for the spiritual opponent of God's purposes. Scripture presents his activity as real but limited under God's authority; do not build speculative details beyond the texts. See Job 1-2; Matthew 4:1-11; Revelation 12:9-11."],
    ["Sheol","A Hebrew term for the realm or state of the dead in the Old Testament. Its usage varies across poetic and narrative contexts and should not be automatically equated with later descriptions of final judgment. See Genesis 37:35; Psalm 16:10; Ecclesiastes 9:10."],
    ["Spiritual warfare","A biblical way of describing conflict against evil, deception and spiritual opposition. The New Testament emphasises truth, righteousness, faith, prayer and perseverance rather than human aggression or superstition. See Ephesians 6:10-18; 2 Corinthians 10:3-5; 1 Peter 5:8-9."],
    ["Temptation","A testing or enticement toward unfaithfulness or sin. Scripture distinguishes trials that test faith from enticement to evil and teaches believers to seek God's help and remain steadfast. See Genesis 22:1; Matthew 4:1-11; James 1:2-15; 1 Corinthians 10:13."],
    ["The lake of fire","The final judgment image in Revelation, associated with the defeat of evil, death and Hades. It belongs to the book's apocalyptic vision and should be interpreted in that literary context. See Revelation 19:20; 20:10-15; 21:8."],
    ["The Lord's Prayer","The model prayer Jesus teaches His disciples, addressing the Father and including God's name, kingdom, provision, forgiveness and deliverance from evil. Compare Matthew's and Luke's accounts. See Matthew 6:9-13; Luke 11:1-4."],
    ["Tribulation","A word for distress, pressure or suffering. Scripture uses it for present hardship and for periods of intense distress; identify the setting rather than assuming every occurrence refers to one end-time timetable. See John 16:33; Romans 5:3; Matthew 24:21; Revelation 7:14."],
    ["Witness","A person who testifies to what is known or experienced. In Acts, believers are commissioned to bear witness to Jesus; the word can also refer to legal testimony and the witness of Scripture. See Deuteronomy 19:15; Acts 1:8; 4:20; Hebrews 12:1."]
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
      methodNote.textContent = "The selected KJV word is matched by its source character range, then joined to the Berean interlinear records by Strong's number. A Strong's number is an index, not a complete definition. The interlinear gloss is the Berean Standard Bible's English phrase, not a KJV definition; a lemma identifies a dictionary headword, while its listed senses show a range of use. The best sense depends on the verse and wider context. Grammar details are shown only when supplied by the source, and no missing link or meaning is guessed.";
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

  const curatedCrossReferences = {
    "Matthew 1:22": [{ book:"Isaiah", chapter:7, verse:14, relationship:"Prophecy / fulfilment", note:"Matthew identifies Jesus' birth as fulfilling Isaiah's sign." }],
    "Matthew 2:5": [{ book:"Micah", chapter:5, verse:2, relationship:"Prophecy / fulfilment", note:"The promised ruler is associated with Bethlehem." }],
    "Matthew 4:4": [{ book:"Deuteronomy", chapter:8, verse:3, relationship:"Direct quotation", note:"Jesus quotes Moses on living by God's word." }],
    "Matthew 4:7": [{ book:"Deuteronomy", chapter:6, verse:16, relationship:"Direct quotation", note:"Jesus answers temptation with Israel's wilderness instruction." }],
    "Matthew 4:10": [{ book:"Deuteronomy", chapter:6, verse:13, relationship:"Direct quotation", note:"Jesus cites the command to worship and serve God alone." }],
    "Matthew 12:17": [{ book:"Isaiah", chapter:42, verse:1, relationship:"Prophecy / fulfilment", note:"Matthew applies Isaiah's servant passage to Jesus." }],
    "Matthew 21:4": [{ book:"Zechariah", chapter:9, verse:9, relationship:"Prophecy / fulfilment", note:"The king's humble arrival is linked to Zechariah's prophecy." }],
    "Mark 1:2": [{ book:"Malachi", chapter:3, verse:1, relationship:"Prophecy / fulfilment", note:"The messenger preparing the way is drawn from Malachi." }],
    "Mark 1:3": [{ book:"Isaiah", chapter:40, verse:3, relationship:"Prophecy / fulfilment", note:"The voice preparing the Lord's way is drawn from Isaiah." }],
    "Luke 4:18": [{ book:"Isaiah", chapter:61, verse:1, relationship:"Direct quotation", note:"Jesus reads and applies Isaiah's good-news and liberation passage." }],
    "John 12:38": [{ book:"Isaiah", chapter:53, verse:1, relationship:"Prophecy / fulfilment", note:"John connects unbelief to Isaiah's servant prophecy." }],
    "Acts 2:16": [{ book:"Joel", chapter:2, verse:28, relationship:"Prophecy / fulfilment", note:"Peter explains Pentecost through Joel's promise of the Spirit." }],
    "Acts 2:25": [{ book:"Psalm", chapter:16, verse:8, relationship:"Direct quotation", note:"Peter quotes David's words about the Lord's presence." }],
    "Acts 2:34": [{ book:"Psalm", chapter:110, verse:1, relationship:"Direct quotation", note:"Peter quotes the enthronement psalm in his message about Jesus." }],
    "Romans 10:13": [{ book:"Joel", chapter:2, verse:32, relationship:"Direct quotation", note:"Paul applies Joel's promise about calling on the Lord." }],
    "Hebrews 1:5": [{ book:"Psalm", chapter:2, verse:7, relationship:"Direct quotation", note:"The writer quotes the royal sonship psalm." }],
    "John 19:36": [{ book:"Exodus", chapter:12, verse:46, relationship:"Scriptural pattern", note:"The unbroken bones echo the Passover instructions." }],
    "John 19:37": [{ book:"Zechariah", chapter:12, verse:10, relationship:"Prophecy / fulfilment", note:"John connects the piercing of Jesus with Zechariah's prophecy." }],
    "Matthew 8:24": [
      { book:"Mark", chapter:4, verse:37, relationship:"Parallel passage", note:"Mark's account of the same storm on the lake." },
      { book:"Luke", chapter:8, verse:23, relationship:"Parallel passage", note:"Luke's account of the same storm on the lake." }
    ],

    "Matthew 5:21": [{ book:"Exodus", chapter:20, verse:13, relationship:"Direct quotation", note:"Jesus refers to the commandment against murder." }],
    "Matthew 5:27": [{ book:"Exodus", chapter:20, verse:14, relationship:"Direct quotation", note:"Jesus refers to the commandment against adultery." }],
    "Matthew 9:13": [{ book:"Hosea", chapter:6, verse:6, relationship:"Direct quotation", note:"Jesus quotes Hosea to teach the priority of mercy over empty ritual." }],
    "Matthew 11:10": [{ book:"Malachi", chapter:3, verse:1, relationship:"Prophecy / fulfilment", note:"Jesus identifies the promised messenger who prepares the way." }],
    "Matthew 13:14": [{ book:"Isaiah", chapter:6, verse:9, relationship:"Direct quotation", note:"Jesus applies Isaiah's words about hearing without understanding." }],
    "Matthew 15:4": [{ book:"Exodus", chapter:20, verse:12, relationship:"Direct quotation", note:"Jesus cites the command to honour father and mother." }],
    "Matthew 15:8": [{ book:"Isaiah", chapter:29, verse:13, relationship:"Direct quotation", note:"Jesus quotes Isaiah's rebuke of honour expressed only with the lips." }],
    "Matthew 22:37": [{ book:"Deuteronomy", chapter:6, verse:5, relationship:"Direct quotation", note:"Jesus gives the great command to love God with the whole being." }],
    "Matthew 22:39": [{ book:"Leviticus", chapter:19, verse:18, relationship:"Direct quotation", note:"Jesus quotes the command to love one's neighbour." }],
    "Matthew 22:44": [{ book:"Psalm", chapter:110, verse:1, relationship:"Direct quotation", note:"Jesus quotes David's enthronement psalm." }],
    "Mark 7:6": [{ book:"Isaiah", chapter:29, verse:13, relationship:"Direct quotation", note:"Mark records Jesus applying Isaiah's words about heart and worship." }],
    "Mark 12:10": [{ book:"Psalm", chapter:118, verse:22, relationship:"Direct quotation", note:"Jesus quotes the rejected stone that becomes the cornerstone." }],
    "Luke 20:17": [{ book:"Psalm", chapter:118, verse:22, relationship:"Direct quotation", note:"Jesus quotes the rejected stone that becomes the cornerstone." }],
    "John 1:23": [{ book:"Isaiah", chapter:40, verse:3, relationship:"Direct quotation", note:"John the Baptist identifies his mission with Isaiah's voice in the wilderness." }],
    "John 2:17": [{ book:"Psalm", chapter:69, verse:9, relationship:"Direct quotation", note:"The disciples remember the psalm about zeal for God's house." }],
    "John 10:34": [{ book:"Psalm", chapter:82, verse:6, relationship:"Direct quotation", note:"Jesus quotes the wording of Psalm 82 in His response." }],
    "John 13:18": [{ book:"Psalm", chapter:41, verse:9, relationship:"Direct quotation", note:"Jesus connects the betrayal with the psalm's words about a trusted companion." }],
    "John 19:24": [{ book:"Psalm", chapter:22, verse:18, relationship:"Prophecy / fulfilment", note:"John connects the soldiers' casting lots with the psalm." }],
    "Acts 3:22": [{ book:"Deuteronomy", chapter:18, verse:15, relationship:"Direct quotation", note:"Peter identifies Jesus with the prophet Moses said God would raise up." }],
    "Acts 4:11": [{ book:"Psalm", chapter:118, verse:22, relationship:"Direct quotation", note:"Peter applies the rejected-stone psalm to Jesus." }],
    "Acts 13:33": [{ book:"Psalm", chapter:2, verse:7, relationship:"Direct quotation", note:"Paul quotes the royal sonship psalm in his message about Jesus." }],
    "Romans 8:36": [{ book:"Psalm", chapter:44, verse:22, relationship:"Direct quotation", note:"Paul quotes the psalm while describing suffering for God's sake." }],
    "Romans 9:25": [{ book:"Hosea", chapter:2, verse:23, relationship:"Direct quotation", note:"Paul applies Hosea's promise concerning those called God's people." }],
    "Romans 12:19": [{ book:"Deuteronomy", chapter:32, verse:35, relationship:"Direct quotation", note:"Paul quotes the Lord's declaration that vengeance belongs to Him." }],
    "Romans 15:3": [{ book:"Psalm", chapter:69, verse:9, relationship:"Direct quotation", note:"Paul uses the psalm to describe Christ's self-giving endurance." }],
    "Galatians 3:11": [{ book:"Habakkuk", chapter:2, verse:4, relationship:"Direct quotation", note:"Paul quotes the prophet on the righteous living by faith." }],
    "Hebrews 10:37": [{ book:"Habakkuk", chapter:2, verse:3, relationship:"Direct quotation", note:"The writer draws on Habakkuk's vision and its appointed time." }],
    "1 Peter 2:6": [{ book:"Isaiah", chapter:28, verse:16, relationship:"Direct quotation", note:"Peter quotes the chosen cornerstone laid in Zion." }],
    "1 Peter 2:7": [{ book:"Psalm", chapter:118, verse:22, relationship:"Direct quotation", note:"Peter quotes the stone rejected by builders and made the cornerstone." }],
    "Revelation 1:7": [{ book:"Zechariah", chapter:12, verse:10, relationship:"Prophecy / fulfilment", note:"Revelation echoes Zechariah's vision of the one who is pierced." }],

    "Matthew 13:35": [{ book:"Psalm", chapter:78, verse:2, relationship:"Direct quotation", note:"Matthew identifies Jesus' use of parables with the psalm's words about speaking in parables." }],
    "Matthew 21:13": [
      { book:"Isaiah", chapter:56, verse:7, relationship:"Direct quotation", note:"Jesus quotes the promise that God's house is to be called a house of prayer." },
      { book:"Jeremiah", chapter:7, verse:11, relationship:"Direct quotation", note:"Jesus also invokes Jeremiah's rebuke of treating the temple as a den of robbers." }
    ],
    "Mark 4:12": [{ book:"Isaiah", chapter:6, verse:9, relationship:"Direct quotation", note:"Mark's account uses Isaiah's words about hearing without perceiving." }],
    "Luke 3:4": [{ book:"Isaiah", chapter:40, verse:3, relationship:"Direct quotation", note:"Luke quotes Isaiah's voice calling for the Lord's way to be prepared." }],
    "Luke 22:37": [{ book:"Isaiah", chapter:53, verse:12, relationship:"Prophecy / fulfilment", note:"Jesus applies the servant passage's words about being numbered with transgressors to His coming suffering." }],
    "John 6:31": [{ book:"Psalm", chapter:78, verse:24, relationship:"Scriptural pattern", note:"The crowd recalls the wilderness manna tradition, which Psalm 78 recounts." }],
    "John 15:25": [
      { book:"Psalm", chapter:35, verse:19, relationship:"Direct quotation", note:"John's wording echoes the psalm's complaint about being hated without cause." },
      { book:"Psalm", chapter:69, verse:4, relationship:"Direct quotation", note:"The same statement also echoes the righteous sufferer's words in Psalm 69." }
    ],
    "John 19:28": [{ book:"Psalm", chapter:69, verse:21, relationship:"Prophecy / fulfilment", note:"John connects Jesus' thirst and the offered drink with the suffering described in the psalm." }],
    "Acts 7:49": [{ book:"Isaiah", chapter:66, verse:1, relationship:"Direct quotation", note:"Stephen quotes Isaiah's declaration that heaven is God's throne and earth His footstool." }],
    "Acts 13:34": [{ book:"Isaiah", chapter:55, verse:3, relationship:"Scriptural promise", note:"Paul connects the resurrection promise with the sure mercies promised to David." }],
    "Acts 13:35": [{ book:"Psalm", chapter:16, verse:10, relationship:"Direct quotation", note:"Paul quotes the psalm's statement that God's Holy One will not see corruption." }],
    "Acts 15:16": [{ book:"Amos", chapter:9, verse:11, relationship:"Direct quotation", note:"James cites Amos's promise concerning the restoration of David's fallen tent." }],
    "Romans 9:27": [{ book:"Isaiah", chapter:10, verse:22, relationship:"Direct quotation", note:"Paul quotes Isaiah's remnant theme concerning Israel." }],
    "Romans 10:15": [{ book:"Isaiah", chapter:52, verse:7, relationship:"Direct quotation", note:"Paul draws on Isaiah's picture of the beautiful feet of the one bringing good news." }],
    "Romans 11:26": [{ book:"Isaiah", chapter:59, verse:20, relationship:"Scriptural promise", note:"Paul's description of the Deliverer from Zion draws on Isaiah's promised Redeemer." }],
    "Romans 15:12": [{ book:"Isaiah", chapter:11, verse:10, relationship:"Direct quotation", note:"Paul quotes Isaiah's promise of the root of Jesse who will rule the nations." }],
    "1 Corinthians 1:19": [{ book:"Isaiah", chapter:29, verse:14, relationship:"Direct quotation", note:"Paul quotes God's promise to overturn the wisdom of the wise." }],
    "Hebrews 2:6": [{ book:"Psalm", chapter:8, verse:4, relationship:"Direct quotation", note:"The writer begins a quotation from Psalm 8 about humanity and the Son of Man." }],
    "Hebrews 3:7": [{ book:"Psalm", chapter:95, verse:7, relationship:"Direct quotation", note:"The warning begins by quoting the invitation to hear God's voice today." }],
    "Hebrews 8:8": [{ book:"Jeremiah", chapter:31, verse:31, relationship:"Direct quotation", note:"The writer quotes Jeremiah's promise of a new covenant with the house of Israel and Judah." }],
    "1 Peter 1:24": [{ book:"Isaiah", chapter:40, verse:6, relationship:"Direct quotation", note:"Peter quotes Isaiah's contrast between fading human life and the enduring word of the Lord." }],
    "1 Peter 2:22": [{ book:"Isaiah", chapter:53, verse:9, relationship:"Prophecy / fulfilment", note:"Peter describes Christ's sinlessness using the servant passage's language." }],
    "2 Peter 3:8": [{ book:"Psalm", chapter:90, verse:4, relationship:"Direct quotation", note:"Peter recalls the psalm's comparison of God's timescale with a thousand years." }]
  };

  async function loadRelatedScriptures(ref) {
    const requestId = ++crossReferencesRequest;
    const list = document.getElementById("zurielCrossReferenceList");
    if (!list || !ref) return;
    list.textContent = "Finding related Scriptures...";

    const referenceKey = String(ref.book) + " " + ref.chapter + ":" + ref.verse;
    const curated = curatedCrossReferences[referenceKey] || [];
    let remoteReferences = [];
    let remoteError = null;

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
      remoteReferences = selected && Array.isArray(selected.references)
        ? selected.references.slice(0, 12) : [];
    } catch (error) {
      remoteError = error;
    }
    if (requestId !== crossReferencesRequest) return;

    const seen = new Set();
    const references = [];
    curated.forEach(function (item) {
      const key = item.book + "|" + item.chapter + "|" + item.verse;
      if (!seen.has(key)) {
        seen.add(key);
        references.push(Object.assign({ curated: true }, item));
      }
    });
    remoteReferences.forEach(function (item) {
      const name = englishBookName(item.book);
      const verse = Number(item.verse);
      const chapter = Number(item.chapter);
      if (!name || !Number.isInteger(verse) || verse < 1 ||
          !Number.isInteger(chapter) || chapter < 1) return;
      const key = name + "|" + chapter + "|" + verse;
      if (seen.has(key)) return;
      seen.add(key);
      references.push(Object.assign({}, item, { book: name, curated: false }));
    });

    list.replaceChildren();
    if (!references.length) {
      const empty = document.createElement("p");
      empty.textContent = remoteError
        ? "No locally curated connection is available for this verse, and the online reference service could not be reached. Connect and try again."
        : "No connected Scripture references are listed for this verse.";
      list.appendChild(empty);
    }

    references.slice(0, 12).forEach(function (item) {
      const name = item.book;
      const referenceCard = document.createElement("div");
      referenceCard.className = "study-word";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "study-link";
      button.textContent = name + " " + item.chapter + ":" + item.verse +
        (item.endVerse ? "–" + item.endVerse : "");
      const relationshipValue = String(
        item.relationship || item.type || item.category || item.kind || ""
      ).toLowerCase().replace(/[ _-]+/g, " ").trim();
      const relationshipLabels = {
        quotation: "Direct quotation",
        quote: "Direct quotation",
        "direct quotation": "Direct quotation",
        parallel: "Parallel passage",
        "parallel passage": "Parallel passage",
        prophecy: "Prophecy",
        fulfilment: "Fulfilment",
        fulfillment: "Fulfilment",
        "prophecy fulfilment": "Prophecy / fulfilment",
        "prophecy fulfillment": "Prophecy / fulfilment",
        "prophecy / fulfilment": "Prophecy / fulfilment",
        "scriptural promise": "Scriptural promise",
        theme: "Thematic connection",
        thematic: "Thematic connection",
        "thematic connection": "Thematic connection",
        "scriptural pattern": "Scriptural pattern"
      };
      const relationship = document.createElement("p");
      relationship.className = "study-small";
      relationship.textContent = (item.curated ? "Curated • " : "") +
        (relationshipLabels[relationshipValue] ||
          "Related Scripture — relationship not classified by source.") +
        (item.note ? " — " + item.note : "");
      referenceCard.append(button, relationship);
      list.appendChild(referenceCard);
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
          const targetVerse = findVerseElement(verseNumber);
          if (!targetVerse) {
            throw new Error("The connected verse text is not present in the reader.");
          }
          const targetText = targetVerse.textContent
            .replace(/^\s*\d+\.?\s*/, "").trim();
          targetVerse.scrollIntoView({ behavior: "smooth", block: "center" });
          targetVerse.classList.add("zuriel-selected-verse");
          if (window.ZurielStudy &&
              typeof window.ZurielStudy.openForReference === "function") {
            window.ZurielStudy.openForReference(
              name, chapterNumber, verseNumber, targetText, "", -1
            );
          }
        } catch (error) {
          button.disabled = false;
          const status = document.createElement("p");
          status.setAttribute("role", "status");
          status.textContent = error.message || "This connected passage could not be opened. Please try again.";
          list.appendChild(status);
        }
      });
    });

    if (remoteError && references.length) {
      const offlineNote = document.createElement("p");
      offlineNote.className = "study-small";
      offlineNote.textContent = "Showing locally curated connections. Online references are unavailable until you reconnect.";
      list.appendChild(offlineNote);
    } else if (!remoteError && !references.length) {
      list.textContent = "No connected Scripture references are listed for this verse.";
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
      #zurielStudyPanel .dictionary-deep-study {
        margin-top:10px;
        padding:10px 12px;
        border:1px solid #9fb3c9;
        border-radius:10px;
        background:#f4f7fb;
        color:#1b3048;
      }
      #zurielStudyPanel .dictionary-deep-study summary {
        min-height:40px;
        cursor:pointer;
        color:#174c78;
        font-weight:700;
      }
      #zurielStudyPanel .dictionary-deep-study h4 {
        margin:12px 0 4px;
        color:#174c78;
        font-size:14px;
      }
      #zurielStudyPanel .dictionary-deep-study p {
        margin:4px 0 8px;
        color:#263c52;
        font-size:13px;
        line-height:1.6;
      }
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
    const verseMenuStyle=document.createElement("style");
    verseMenuStyle.id="zurielSelectedVerseMenuStyles";
    verseMenuStyle.textContent=[
      "#zurielStudyPanel[data-mode=verse-menu] #zurielStudySections,#zurielStudyPanel[data-mode=verse-menu] .highlight-tools,#zurielStudyPanel[data-mode=verse-menu] #zurielSaveVerseBookmark,#zurielStudyPanel[data-mode=verse-menu] #zurielBookmarkStatus{display:none!important}",
      "#zurielStudyPanel[data-mode=verse-detail] .highlight-tools,#zurielStudyPanel[data-mode=verse-detail] #zurielSaveVerseBookmark,#zurielStudyPanel[data-mode=verse-detail] #zurielBookmarkStatus{display:none!important}",
      "#zurielVerseActionMenu{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}",
      "#zurielStudyPanel:not([data-mode=verse-menu]):not([data-mode=verse-detail]) #zurielVerseActionMenu{display:none}",
      "#zurielVerseActionMenu button{min-width:0;min-height:44px;margin:0;padding:10px;border:1px solid #c6ad70;border-radius:10px;background:#fff;color:#18304d;font:600 13px/1.35 Arial,sans-serif;text-align:left;white-space:normal}",
      "#zurielStudyPanel[data-mode=verse-detail] #zurielStudySections>details:not([data-zuriel-active=true]){display:none!important}",
      "@media(max-width:640px){#zurielStudyPanel[data-mode=verse-menu],#zurielStudyPanel[data-mode=verse-detail]{position:fixed;left:10px;right:10px;bottom:calc(72px + env(safe-area-inset-bottom));top:auto;z-index:1200;width:auto;max-width:none;max-height:min(62dvh,560px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;margin:0;padding:12px;border:1px solid #b99b58;border-radius:18px;background:#10213d;box-shadow:0 12px 32px #0006}}",
      "@media(max-width:360px){#zurielVerseActionMenu{grid-template-columns:minmax(0,1fr)}}"
    ].join("");
    document.head.appendChild(verseMenuStyle);

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

        <details>
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
          <summary>🔗 6. Connected Scriptures</summary>
          <div class="study-body">
            <p>Related Scriptures for the selected verse. Tap a reference to open it and compare the full passage.</p>
            <p class="study-small">A connection may be a quotation, shared theme, parallel account, prophecy or fulfilment, or another textual link. The source does not classify every link. Zuriel labels a relationship only when the source supplies that information; otherwise it is shown as an unclassified related Scripture. Read both passages in context.</p>
            <div id="zurielCrossReferenceList" aria-live="polite">
              <p>Select a verse to find connected Scriptures.</p>
            </div>
          </div>
        </details>

        <details>
          <summary>📚 7. Bible Concordance — Find Words and Phrases</summary>
          <div class="study-body">
            <p>Search the offline King James Version for an exact English word or a phrase. Word searches match whole words, not partial spellings. Phrase searches find the exact phrase within a verse.</p>
            <label for="zurielConcordanceQuery">Word or phrase</label>
            <input id="zurielConcordanceQuery" type="search" minlength="3" placeholder="For example: grace, covenant, in the beginning" autocomplete="off">
            <label for="zurielConcordanceMode">Search type</label>
            <select id="zurielConcordanceMode">
              <option value="word">Exact word</option>
              <option value="phrase">Exact phrase</option>
            </select>
            <button type="button" class="study-action" id="zurielConcordanceSearch">Search Concordance</button>
            <p class="study-small">Results are from the complete offline KJV text. The concordance counts all matching verses and displays up to 200 results per search. It searches English words and phrases; it does not yet claim Hebrew or Greek lemma concordance coverage.</p>
            <div id="zurielConcordanceResults" aria-live="polite">
              <p>Enter at least three characters to search the KJV concordance.</p>
            </div>
          </div>
        </details>

        <details>
          <summary>📚 8. Theology and Deeper Study</summary>
          <div class="study-body" id="zurielDeeperStudy">
            <p>Explore biblical themes, teachings and connections.
            Distinguish the meaning of Scripture from personal interpretation.</p>
          </div>
        </details>

        <details>
          <summary>🧭 9. Topical Scripture Connections</summary>
          <div class="study-body" id="zurielTopicalConnections" aria-live="polite">
            <p>Select a verse to discover its mapped biblical themes and related passages.</p>
          </div>
        </details>

        <details>
          <summary>📝 10. My Personal Study Journal</summary>
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

    const verseActionMenu=document.createElement("nav");
    verseActionMenu.id="zurielVerseActionMenu";
    verseActionMenu.setAttribute("aria-label","Selected verse study actions");
    const verseActions=[["Prayer and faith",2],["Meaning and commentary",1],["Hebrew and Greek words",3],["Biblical dictionary",4],["Connected Scriptures",5],["Concordance",6],["Theology and deeper study",7],["Topical Scripture connections",8],["Personal study notes",9]];
    verseActions.forEach(function(action){const button=document.createElement("button");button.type="button";button.textContent=action[0];button.addEventListener("click",function(){const sections=Array.from(panel.querySelectorAll("#zurielStudySections > details"));const selected=sections[action[1]];if(!selected)return;sections.forEach(function(section){section.open=section===selected;section.removeAttribute("data-zuriel-active");});selected.setAttribute("data-zuriel-active","true");panel.dataset.mode="verse-detail";selected.scrollIntoView({behavior:"smooth",block:"nearest"});});verseActionMenu.appendChild(button);});
    const fullStudyAction=document.createElement("button");fullStudyAction.type="button";fullStudyAction.textContent="Open Full Study Centre";fullStudyAction.addEventListener("click",function(){panel.dataset.mode="verse";panel.querySelectorAll("#zurielStudySections > details").forEach(function(section){section.removeAttribute("data-zuriel-active");});panel.querySelector("#zurielStudySections").scrollIntoView({behavior:"smooth",block:"start"});});verseActionMenu.appendChild(fullStudyAction);
    const actionBack=document.createElement("button");actionBack.type="button";actionBack.id="zurielVerseActionBack";actionBack.textContent="Back to verse actions";actionBack.addEventListener("click",function(){panel.dataset.mode="verse-menu";panel.querySelectorAll("#zurielStudySections > details").forEach(function(section){section.open=false;section.removeAttribute("data-zuriel-active");});panel.scrollTop=0;});verseActionMenu.appendChild(actionBack);
    const studySectionsHost=panel.querySelector("#zurielStudySections");if(studySectionsHost)panel.insertBefore(verseActionMenu,studySectionsHost);
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
    let dictionaryVisibleLimit = 12;
    function renderDictionary(query) {
      if (!dictionaryResults) return;
      dictionaryResults.replaceChildren();

      // Normalize accents and whitespace so searches behave consistently
      // across devices and keyboard layouts.
      const normalize = value => String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
      const term = normalize(query);
      const tokens = term.split(" ").filter(Boolean);

      const rankedMatches = bibleDictionary.map((entry, index) => {
        const title = normalize(entry[0]);
        const definition = normalize(entry[1]);
        const aliases = Array.isArray(entry[2]) ? entry[2].map(normalize) : [];
        const aliasText = aliases.join(" ");
        const combined = title + " " + definition + " " + aliasText;
        const allTokensMatch = tokens.every(token => combined.includes(token));
        const aliasMatch = aliases.some(alias => alias === term || alias.includes(term) ||
          (tokens.length && tokens.every(token => alias.includes(token))));
        let score = 0;
        if (!term) score = 1;
        else if (title === term) score = 100;
        else if (title.startsWith(term)) score = 80;
        else if (tokens.length && tokens.every(token => title.split(" ").some(word => word.startsWith(token)))) score = 65;
        else if (title.includes(term)) score = 50;
        else if (aliasMatch) score = 45;
        else if (allTokensMatch) score = 30;
        else if (definition.includes(term)) score = 20;
        return { entry, index, score };
      }).filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score || (!term ? a.entry[0].localeCompare(b.entry[0]) : a.index - b.index));
      const totalMatches = rankedMatches.length;
      const matches = rankedMatches.slice(0, dictionaryVisibleLimit);

      if (!matches.length) {
        const empty = document.createElement("p");
        empty.textContent = "No matching entry. Try a shorter phrase or another biblical term.";
        dictionaryResults.appendChild(empty);
        return;
      }

      const count = document.createElement("p");
      count.className = "study-small";
      count.textContent = term
        ? "Showing " + matches.length + " of " + totalMatches + " matching entries."
        : "Browse " + bibleDictionary.length + " entries. Search to narrow the dictionary.";
      dictionaryResults.appendChild(count);

      matches.forEach(({ entry }) => {
        const item = document.createElement("article");
        item.className = "study-word";
        const heading = document.createElement("h3");
        heading.textContent = entry[0];
        const meaning = document.createElement("p");
        meaning.textContent = entry[1];
        item.append(heading, meaning);
        if (Array.isArray(entry[2]) && entry[2].length) {
          const aliases = document.createElement("p");
          aliases.className = "study-small";
          aliases.textContent = "Also searchable as: " + entry[2].join(" • ");
          item.appendChild(aliases);
        }
        const advanced = entry[3];
        if (advanced && typeof advanced === "object") {
          const details = document.createElement("details");
          details.className = "dictionary-deep-study";
          const summary = document.createElement("summary");
          summary.textContent = "Open deeper language and theology study";
          details.appendChild(summary);
          [
            ["Language and word use", advanced.languageNote],
            ["Theological significance", advanced.theology],
            ["Interpretive caution", advanced.caution],
            ["Related Scripture passages", advanced.passages]
          ].forEach(function (field) {
            if (!field[1]) return;
            const subheading = document.createElement("h4");
            subheading.textContent = field[0];
            const paragraph = document.createElement("p");
            paragraph.textContent = field[1];
            details.append(subheading, paragraph);
          });
          const sourceNote = document.createElement("p");
          sourceNote.className = "study-small";
          sourceNote.textContent = "Study note: this is a concise contextual study, not a substitute for a full lexicon. A topic heading does not establish a Hebrew or Greek lemma; verify word-level claims against the selected verse and its source-linked records.";
          details.appendChild(sourceNote);
          item.appendChild(details);
        }
        dictionaryResults.appendChild(item);
      });
      if (matches.length < totalMatches) {
        const more = document.createElement("button");
        more.type = "button";
        more.className = "study-action-button";
        more.textContent = "Show more entries";
        more.addEventListener("click", function () {
          dictionaryVisibleLimit += 12;
          renderDictionary(dictionarySearch ? dictionarySearch.value : query);
        });
        dictionaryResults.appendChild(more);
      }
    }
    if (dictionarySearch) {
      dictionarySearch.addEventListener("input", () => {
        dictionaryVisibleLimit = 12;
        renderDictionary(dictionarySearch.value);
      });
      renderDictionary("");
    }

    // Offline KJV concordance: whole-word and exact-phrase search use the
    // same validated 66-book Bible data as the reader.
    const concordanceQuery = panel.querySelector("#zurielConcordanceQuery");
    const concordanceMode = panel.querySelector("#zurielConcordanceMode");
    const concordanceButton = panel.querySelector("#zurielConcordanceSearch");
    const concordanceResults = panel.querySelector("#zurielConcordanceResults");
    let concordanceRequest = 0;
    async function runConcordanceSearch() {
      if (!concordanceQuery || !concordanceMode || !concordanceResults || !concordanceButton) return;
      const query = concordanceQuery.value.trim();
      const mode = concordanceMode.value;
      const requestId = ++concordanceRequest;
      concordanceResults.replaceChildren();
      if (query.length < 3) {
        concordanceResults.textContent = "Please enter at least three characters.";
        return;
      }
      if (!window.ZurielBibleSearch || typeof window.ZurielBibleSearch.search !== "function") {
        concordanceResults.textContent = "The offline Bible search engine is not available yet.";
        return;
      }
      concordanceButton.disabled = true;
      concordanceResults.textContent = "Searching the complete offline KJV...";
      try {
        const matches = await window.ZurielBibleSearch.search(query, 100, mode);
        if (requestId !== concordanceRequest) return;
        concordanceResults.replaceChildren();
        if (!matches.length) {
          concordanceResults.textContent = "No matching KJV verses found. Check the spelling or try a different search type.";
          return;
        }
        const summary = document.createElement("p");
        summary.className = "study-small";
        const totalMatches = Number.isInteger(matches.totalMatches)
          ? matches.totalMatches : matches.length;
        summary.textContent = "Found " + totalMatches +
          " matching KJV verses; showing " + matches.length +
          (totalMatches > matches.length ? " (display limit reached)" : "") +
          ". Tap a result to open that verse.";
        concordanceResults.appendChild(summary);
        matches.forEach(function (item) {
          const result = document.createElement("button");
          result.type = "button";
          result.className = "study-link";
          result.textContent = item.book + " " + item.chapter + ":" + item.verse + " — " + item.text;
          result.addEventListener("click", async function () {
            try {
              await window.openChapter(item.book, item.chapter);
              if (typeof window.selectBibleVerse !== "function" ||
                  !window.selectBibleVerse(item.verse)) {
                throw new Error("The selected concordance verse could not be opened.");
              }
            } catch (error) {
              concordanceResults.textContent = "Unable to open this concordance result: " +
                (error && error.message ? error.message : "Please try again.");
            }
          });
          concordanceResults.appendChild(result);
        });
      } catch (error) {
        if (requestId === concordanceRequest) {
          concordanceResults.textContent = error && error.message
            ? error.message : "The concordance search could not be completed.";
        }
      } finally {
        if (requestId === concordanceRequest) concordanceButton.disabled = false;
      }
    }
    if (concordanceButton) concordanceButton.addEventListener("click", runConcordanceSearch);
    if (concordanceQuery) {
      concordanceQuery.addEventListener("keydown", function (event) {
        if (event.key === "Enter") runConcordanceSearch();
      });
    }

    function readHighlights() {
      try {
        const saved = JSON.parse(localStorage.getItem(HIGHLIGHTS_KEY) || "{}");
        return saved && typeof saved === "object" && !Array.isArray(saved)
          ? saved : {};
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

      verseElement.style.backgroundColor =
        typeof record.verseColor === "string" ? record.verseColor : "";
      verseElement.querySelectorAll(".verse-word").forEach(function (word) {
        const index = word.dataset.wordIndex;
        const savedColor = record.words && record.words[index];
        const savedToken = record.wordTokens && record.wordTokens[index];
        const currentToken = String(word.textContent || "").trim();
        // If a token identity was saved, never paint a different word merely
        // because it occupies the same position in another text rendering.
        const tokenMatches = !savedToken ||
          savedToken.normalize("NFC").toLowerCase() === currentToken.normalize("NFC").toLowerCase();
        word.style.backgroundColor =
          tokenMatches && typeof savedColor === "string" ? savedColor : "";
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
      try {
        localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(all));
      } catch (error) {
        const status = document.getElementById("zurielHighlightStatus");
        if (status) status.textContent =
          "The highlight could not be saved. Device storage may be full or unavailable.";
        return false;
      }
      paintSavedHighlights(ref);
      return true;
    }

    function getCurrentHighlightRecord() {
      return readHighlights()[highlightKey(selectedReference)] || { words: {} };
    }

    function applyWordHighlight() {
      if (!selectedReference || selectedEnglishWordIndex < 0) return;
      const record = getCurrentHighlightRecord();
      record.words = record.words || {};
      record.words[String(selectedEnglishWordIndex)] = activeHighlightColor;
      record.wordTokens = record.wordTokens || {};
      record.wordTokens[String(selectedEnglishWordIndex)] = String(selectedEnglishWord || "").trim();
      if (saveHighlightRecord(selectedReference, record)) {
        document.getElementById("zurielHighlightStatus").textContent =
          "Word highlighted. Its text identity is saved with the highlight on this device.";
      }
    }

    function applyVerseHighlight() {
      if (!selectedReference) return;
      const record = getCurrentHighlightRecord();
      record.verseColor = activeHighlightColor;
      if (saveHighlightRecord(selectedReference, record)) {
        document.getElementById("zurielHighlightStatus").textContent =
          "The whole verse is highlighted and saved on this device.";
      }
    }

    function clearVerseHighlights() {
      if (!selectedReference) return;
      if (saveHighlightRecord(selectedReference, { words: {} })) {
        document.getElementById("zurielHighlightStatus").textContent =
          "Highlights cleared for this verse.";
      }
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
      addLine(meaning, "Commentary and source transparency",
        "This section is a context-led study framework built from the selected KJV chapter and the book's literary setting. It is not a quotation from a published commentary, and it does not yet provide a complete source-attributed verse-by-verse commentary library. Zuriel will distinguish its own study guidance from commentary material whose source and permissions have been verified.");

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
          panel.dataset.mode = "verse-menu";
          panel.querySelectorAll("#zurielStudySections > details").forEach(function(section){section.open=false;section.removeAttribute("data-zuriel-active");});
          const results = document.getElementById("zurielOriginalWordResults");
          const lexicon = document.getElementById("zurielLexiconDetails");
          if (results) results.textContent = "Tap a word in the selected verse to study that word here.";
          if (lexicon) lexicon.replaceChildren();
        }

        loadRelatedScriptures(selectedReference);
        panel.scrollTop = 0;
        // The reader owns the selected-verse overlay; do not scroll away from Scripture.
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
          window.dispatchEvent(new CustomEvent("zuriel:word-context-closed"));
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

