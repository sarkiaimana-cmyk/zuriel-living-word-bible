
/* =====================================================
   ZURIEL LIVING WORD BIBLE
   COMPLETE STUDY & SPIRITUAL GROWTH LIBRARY
   His Words... My Life... My Victory.
   ===================================================== */

(function () {
  "use strict";

  const STORAGE_KEY = "zuriel_personal_library_v1";

  // Audio is playable only when both the composition and the actual recording
  // have documented rights for the requested use. A song title alone is never
  // treated as permission to stream or download a recording.
  function canPlayWorshipAudio(song) {
    if (!song || song.rightsStatus !== "verified" ||
        song.compositionRights !== "cleared" ||
        song.recordingRights !== "cleared" ||
        song.streamingAllowed !== true ||
        typeof song.audioUrl !== "string" ||
        typeof song.rightsSource !== "string" || !song.rightsSource.trim()) return false;
    try {
      const url = new URL(song.audioUrl);
      return url.protocol === "https:";
    } catch (error) {
      return false;
    }
  }


  const originalLibrary = {
    devotionals: [
      { title: "Hope in God", verse: "Romans 15:13", message: "Let your heart remain anchored in God. His faithfulness is greater than every circumstance.", prayer: "Father, fill my heart with hope, peace and joy through the Holy Spirit." },
      { title: "Power of the Holy Spirit", verse: "Acts 1:8", message: "The Holy Spirit empowers believers to live boldly and bear witness to Christ.", prayer: "Holy Spirit, guide me, strengthen me and help me honour Jesus today." },
      { title: "Walking in Victory", verse: "1 Corinthians 15:57", message: "Give thanks to God, who gives believers victory through Jesus Christ.", prayer: "Thank You, Father, for the victory You give through our Lord Jesus Christ." },
      { title: "A Heart of Peace", verse: "John 14:27", message: "Christ gives a peace deeper than changing circumstances. Let His words steady your heart.", prayer: "Lord Jesus, quiet my fears and teach me to rest in Your peace." },
      { title: "Strength for Today", verse: "Isaiah 40:31", message: "Waiting on the Lord is active trust. He renews strength for the path ahead.", prayer: "Father, renew my strength and help me depend on You today." },
      { title: "Wisdom from Above", verse: "James 1:5", message: "God invites us to ask Him for wisdom. Bring decisions to Him with a willing heart.", prayer: "God of wisdom, guide my choices and help me walk in understanding." },
      { title: "Abiding in Christ", verse: "John 15:5", message: "Fruitful living grows from continuing in Christ, not from self-reliance.", prayer: "Jesus, keep me close to You and let my life bear lasting fruit." },
      { title: "Grace That Sustains", verse: "2 Corinthians 12:9", message: "God's grace is sufficient. His strength meets us in our weakness.", prayer: "Lord, help me receive Your grace and rely on Your strength." },
      { title: "A Renewed Mind", verse: "Romans 12:2", message: "God's Word reshapes our thinking so that our lives reflect His good will.", prayer: "Father, renew my mind and help me recognise what pleases You." },
      { title: "Courage to Trust", verse: "Proverbs 3:5–6", message: "Trust God beyond the limits of your own understanding and acknowledge Him in every path.", prayer: "Lord, direct my steps and teach me to trust You wholeheartedly." },
      { title: "Love in Action", verse: "1 Corinthians 13:4–7", message: "Biblical love is patient, kind and faithful. Let love shape your words and actions.", prayer: "Father, make Your love evident in the way I treat others." },
      { title: "The Lord Is My Shepherd", verse: "Psalm 23:1–3", message: "The Shepherd cares for His people and leads them in paths of righteousness.", prayer: "Good Shepherd, lead me, restore my soul and keep my steps in Your ways.", study: "Psalm 23 portrays the Lord as shepherd, guide and host. His care includes provision, restoration, direction and presence even in the darkest valley." },
      { title: "Confidence in Prayer", verse: "1 John 5:14", message: "Prayer is shaped by confidence in God's character and by seeking His will.", prayer: "Father, teach me to pray with faith, humility and a heart aligned with Your will." },
      { title: "The Gift of Forgiveness", verse: "Ephesians 4:32", message: "Those who have received God's kindness are called to show compassion and forgiveness.", prayer: "Lord, soften my heart and help me forgive as You have forgiven me." },
      { title: "Light for the Journey", verse: "Psalm 119:105", message: "Scripture gives light for the next faithful step. Keep returning to God's Word.", prayer: "Father, let Your Word guide my decisions and direct my path." },
      { title: "Fearfully and Wonderfully Made", verse: "Psalm 139:14", message: "The psalmist responds to God's wonderful works with praise. Let gratitude replace comparison.", prayer: "Creator God, teach me to honour Your workmanship and live with gratitude." },
      { title: "Faith That Endures", verse: "Hebrews 12:1–2", message: "Keep your eyes on Jesus and continue faithfully, laying aside what hinders your walk.", prayer: "Jesus, help me run with endurance and keep my eyes fixed on You." },
      { title: "God's Faithfulness", verse: "Lamentations 3:22–23", message: "God's mercies are new every morning. His faithfulness remains through changing seasons.", prayer: "Faithful Father, thank You for fresh mercy. Help me respond with trust today." },
      { title: "Peace in Every Concern", verse: "Philippians 4:6–7", message: "Bring every concern to God in prayer, with thanksgiving, and receive His guarding peace.", prayer: "Father, I bring my concerns to You. Guard my heart and mind in Christ." },
      { title: "Created for Good Works", verse: "Ephesians 2:10", message: "Good works are the fruit of God's grace, not the price of earning it.", prayer: "Lord, show me the good You have prepared and help me walk in it." },
      { title: "The Joy of the Lord", verse: "Nehemiah 8:10", message: "God's joy gives strength. Let His truth sustain you even in demanding seasons.", prayer: "Father, restore my joy and strengthen me in Your presence." },
      { title: "A Life of Thanksgiving", verse: "1 Thessalonians 5:18", message: "Gratitude turns our attention toward God's goodness in every circumstance.", prayer: "Lord, open my eyes to Your gifts and form a thankful heart in me." },
      { title: "Rooted and Built Up", verse: "Colossians 2:6–7", message: "Continue in Christ, rooted in Him and established in the faith you have received.", prayer: "Jesus, root me deeply in Your truth and make my faith steadfast." },
      { title: "God Is Our Refuge", verse: "Psalm 46:1", message: "God is a present help in trouble. Turn to Him rather than facing fear alone.", prayer: "Father, be my refuge and strength. Help me trust Your nearness." },
      { title: "Serving with Excellence", verse: "Colossians 3:23–24", message: "Work wholeheartedly as service to the Lord, with integrity and faithfulness.", prayer: "Lord, guide my work and help me serve You with diligence and honesty." },
      { title: "Growing in Love", verse: "Philippians 1:9–10", message: "Paul prays for love to grow with knowledge and discernment. Love and truth belong together.", prayer: "Father, deepen my love and give me discernment to choose what is best." },
      { title: "The New Life in Christ", verse: "2 Corinthians 5:17", message: "In Christ, a new creation has come. Let your identity be shaped by His redeeming work.", prayer: "Thank You, Jesus, for new life. Help me live from the identity You give." },
      { title: "Persevering in Doing Good", verse: "Galatians 6:9", message: "Do not grow weary in doing good. Remain faithful and trust God with the harvest.", prayer: "Lord, renew my strength to do good with patience and a willing heart." },
      { title: "The Lord Gives Direction", verse: "Psalm 32:8", message: "God promises instruction and guidance. Stay attentive to His counsel.", prayer: "Father, teach me Your way and make me attentive to Your guidance." },
      { title: "More Like Christ", verse: "2 Peter 1:5–8", message: "Faith grows into visible character through diligence, self-control, perseverance and love.", prayer: "Holy Spirit, form Christlike character in me and help me grow in grace." }
    ],

    worshipSongs: [
      { title: "Amazing Grace", collection: "Traditional Hymn", theme: "Grace, redemption and the transforming mercy of God", reference: "Ephesians 2:8–9", note: "A classic hymn reflecting on salvation as God's gracious gift.", study: "Ephesians 2:8–9 teaches that salvation is God's gift, not a human achievement. Grace forgives, restores and trains us to live differently. Reflect on where mercy has met your weakness, then extend that same patience to someone else." },
      { title: "Holy, Holy, Holy", collection: "Traditional Hymn", theme: "The holiness and majesty of the Triune God", reference: "Isaiah 6:3; Revelation 4:8", note: "A reverent hymn of adoration centred on God's holiness.", study: "Isaiah 6:3 and Revelation 4:8 place God's holiness at the centre of heavenly worship. Consider how reverence, purity and awe belong in everyday life, not only in a church gathering." },
      { title: "It Is Well with My Soul", collection: "Traditional Hymn", theme: "Peace and trust in Christ through every trial", reference: "Philippians 4:7", note: "A testimony of faith and peace in the midst of hardship.", study: "Philippians 4:6–7 describes peace that guards the heart through prayer and thanksgiving. Biblical peace does not deny grief; it anchors us in God's presence during real trouble." },
      { title: "Blessed Assurance", collection: "Traditional Hymn", theme: "Confidence in belonging to Jesus", reference: "1 John 5:11–13", note: "A joyful declaration of assurance and hope in Christ.", study: "1 John 5:11–13 grounds assurance in God's testimony concerning His Son. Confidence rests on Christ and God's promise, not on changing feelings or personal achievement." },
      { title: "What a Friend We Have in Jesus", collection: "Traditional Hymn", theme: "Prayer, friendship with Christ and casting cares on God", reference: "1 Peter 5:7", note: "An invitation to bring every burden to the Lord in prayer.", study: "1 Peter 5:7 invites us to cast anxieties on God because He cares. Name one burden you have carried alone and bring it honestly to the Lord in prayer." },
      { title: "Great Is Thy Faithfulness", collection: "Traditional Hymn", theme: "God's steadfast mercy and faithfulness", reference: "Lamentations 3:22–23", note: "A hymn of gratitude for God's unfailing compassion.", study: "Lamentations 3:22–23 speaks hope in devastation: God's steadfast love has not failed. Remembering mercy does not erase sorrow; it gives us reason to hope again." },
      { title: "To God Be the Glory", collection: "Traditional Hymn", theme: "Praise for God's saving work", reference: "Psalm 115:1", note: "A celebration that gives honour to God for His mighty works.", study: "Psalm 115:1 redirects honour away from human achievement and toward God's steadfast love. Celebrate blessings without taking the glory that belongs to the Giver." },
      { title: "Rock of Ages", collection: "Traditional Hymn", theme: "Christ as refuge and the sufficiency of His grace", reference: "1 Corinthians 10:4", note: "A prayerful confession of dependence on the Lord.", study: "The biblical image of God as rock speaks of refuge, stability and dependable strength. Consider where self-reliance has replaced trust and return to the sufficiency of God's grace." },
      { title: "Be Thou My Vision", collection: "Traditional Hymn", theme: "Wholehearted devotion and God's guidance", reference: "Colossians 3:1–2", note: "A prayer for God to shape our vision, desires and daily life.", study: "Colossians 3:1–2 calls believers to set their minds on things above. Devotion reorders priorities: identify one distraction and choose a practical way to give Christ first place." },
      { title: "Guide Me, O Thou Great Jehovah", collection: "Traditional Hymn", theme: "God's guidance and sustaining provision", reference: "Exodus 13:21–22", note: "A pilgrimage hymn about trusting God through the wilderness.", study: "Exodus 13:21–22 portrays God guiding Israel through unfamiliar wilderness. Ask for the next faithful step rather than demanding to see the entire road." },
      { title: "All Hail the Power of Jesus' Name", collection: "Traditional Hymn", theme: "The lordship and honour of Jesus", reference: "Philippians 2:9–11", note: "A triumphant call to honour the name of Jesus.", study: "Philippians 2:9–11 proclaims the exaltation and lordship of Jesus. Consider which area of life needs to come under His loving authority." },
      { title: "How Great Thou Art", collection: "Traditional Hymn", theme: "Wonder at God's creation and redemption", reference: "Psalm 8:1–4", note: "A song of awe at the greatness of God.", study: "Psalm 8 moves from the vast heavens to God's care for humanity. Wonder at creation should lead to humility, gratitude and praise for the Creator." },
      { title: "Because He Lives", collection: "Gospel Hymn", theme: "Resurrection hope and courage for tomorrow", reference: "1 Corinthians 15:20–22", note: "A declaration of hope grounded in the resurrection of Jesus.", study: "1 Corinthians 15:20–22 presents Christ's resurrection as the foundation of Christian hope. Let resurrection hope shape the way you face fear, loss and tomorrow's decisions." },
      { title: "Trust and Obey", collection: "Gospel Hymn", theme: "Faith expressed through obedience", reference: "John 14:23", note: "A reminder that trusting Christ shapes the way we live.", study: "John 14:23 connects love for Jesus with keeping His words. Obedience does not purchase God's love; it is the response of a heart that trusts Him. Name one teaching to practise today." },
      { title: "There Is Power in the Blood", collection: "Gospel Hymn", theme: "Redemption through the blood of Jesus", reference: "Ephesians 1:7", note: "A joyful celebration of the redemption found in Christ.", study: "Ephesians 1:7 describes redemption and forgiveness through Christ. Grace does not excuse wrongdoing; it frees us to turn from sin and extend forgiveness to others." },
      { title: "Victory in Jesus", collection: "Gospel Hymn", theme: "The victory and salvation Christ gives", reference: "1 Corinthians 15:57", note: "A testimony of the victory believers receive through Jesus.", study: "1 Corinthians 15:57 gives thanks for victory through Jesus in light of His resurrection. Christian victory is confidence in Christ, not a promise of an effortless life." },
      { title: "I Know Whom I Have Believed", collection: "Gospel Hymn", theme: "Confidence in Christ and His keeping power", reference: "2 Timothy 1:12", note: "A confession of trust in the One who is faithful.", study: "2 Timothy 1:12 expresses confidence in the One Paul has trusted. Faith looks beyond personal control and rests in God's ability to keep what is entrusted to Him." },
      { title: "When We All Get to Heaven", collection: "Gospel Hymn", theme: "The hope of Christ's coming and eternal joy", reference: "1 Thessalonians 4:16–18", note: "A song that looks toward the promised gathering with the Lord.", study: "1 Thessalonians 4:16–18 offers comfort through the promised return of Christ. Future hope strengthens faithful living and encourages us to comfort one another now." },
      { title: "10,000 Reasons (Bless the Lord)", collection: "Contemporary Worship", theme: "Thanksgiving and wholehearted praise", reference: "Psalm 103:1–5", note: "A modern worship song inspired by the call to bless the Lord.", study: "Psalm 103 calls the whole person to remember God's benefits: forgiveness, healing, steadfast love and compassion. List three specific reasons to thank God today." },
      { title: "What a Beautiful Name", collection: "Contemporary Worship", theme: "The name, victory and supremacy of Jesus", reference: "Philippians 2:9–11", note: "A Christ-centred song celebrating the name above every name.", study: "Philippians 2:9–11 honours the name of Jesus, whose humility and obedience lead to exaltation. His name is inseparable from His saving work and lordship." },
      { title: "Way Maker", collection: "Contemporary Worship", theme: "God's faithfulness, presence and power", reference: "Isaiah 43:19", note: "A declaration of trust in God's ability to lead and act.", study: "Isaiah 43 speaks to people facing exile and promises God's presence and a new work. Remember God's faithfulness while staying attentive to the next wise step." },
      { title: "Goodness of God", collection: "Contemporary Worship", theme: "Remembering God's goodness and faithfulness", reference: "Psalm 23:6", note: "A personal response of gratitude for God's enduring goodness.", study: "Psalm 23:6 concludes with confidence in God's goodness and faithful love. Consider how the Shepherd's steady care can shape the way you care for your family and community." },
      { title: "Great Are You Lord", collection: "Contemporary Worship", theme: "Worship, breath and the glory of God", reference: "Psalm 150:6", note: "A call for all creation to praise the Lord.", study: "Psalm 150 calls everything that has breath to praise the Lord. Worship involves every part of life, not merely a musical moment. Let your actions become praise." },
      { title: "How Great Is Our God", collection: "Contemporary Worship", theme: "The greatness and splendour of God", reference: "Psalm 145:3", note: "A simple, congregational celebration of God's greatness.", study: "Psalm 145 celebrates God's greatness, mighty works and compassion across generations. Praise grows as believers tell one another what God has done." },
      { title: "Build My Life", collection: "Contemporary Worship", theme: "Christ the firm foundation and a life of devotion", reference: "Matthew 7:24–25", note: "A prayer to build life on the trustworthy words of Jesus.", study: "Matthew 7:24–27 contrasts hearing Jesus' words with putting them into practice. A stable life is built through obedience, especially when storms test what has been built." },
      { title: "In Christ Alone", collection: "Modern Hymn", theme: "The person, cross and resurrection of Jesus", reference: "Colossians 1:15–20", note: "A doctrinally rich modern hymn tracing the hope believers have in Christ.", study: "Colossians 1:15–20 presents Christ as supreme in creation and reconciliation. Let Jesus remain central rather than human strength, status or achievement." },
      { title: "Crown Him with Many Crowns", collection: "Traditional Hymn", theme: "The majesty and reign of Christ", reference: "Revelation 19:12–16", note: "A hymn celebrating Jesus as the reigning King.", study: "Revelation 19:11–16 portrays Christ as the victorious King. Consider competing loyalties and choose a practical way to honour His reign today." },
      { title: "O Worship the King", collection: "Traditional Hymn", theme: "God's power, majesty and goodness", reference: "Psalm 104:1", note: "A call to worship the Creator for His greatness and care.", study: "Psalm 104 praises God as Creator and sustainer. Worship grows from recognising both God's majesty and His generous provision; gratitude should shape responsible stewardship." },
      { title: "Jesus Paid It All", collection: "Traditional Hymn", theme: "Christ's atoning work and cleansing grace", reference: "1 Peter 2:24", note: "A confession of the sufficiency of Jesus' saving work.", study: "Christ's self-giving work is the basis of forgiveness and new life. Grace frees believers to turn from sin and live for righteousness, not to excuse wrongdoing." },
      { title: "Nearer, My God, to Thee", collection: "Traditional Hymn", theme: "Drawing near to God in every season", reference: "James 4:8", note: "A prayerful expression of longing for God's presence.", study: "James 4:8 calls us to draw near to God with sincere hearts. Nearness involves repentance, trust and a life increasingly aligned with God's ways." },
      { title: "Give Thanks", collection: "Praise & Chorus", theme: "Gratitude for God's goodness and salvation", reference: "Psalm 107:1", note: "A simple song of thanksgiving to the Lord.", study: "Psalm 107:1 calls God's people to give thanks because He is good and His steadfast love endures. Name one kindness you have received and pass kindness to another person." },
      { title: "I Will Enter His Gates", collection: "Praise & Chorus", theme: "Entering God's presence with thanksgiving", reference: "Psalm 100:4", note: "A joyful praise chorus rooted in the language of Psalm 100.", study: "Psalm 100 connects entering God's presence with thanksgiving and praise. Remember that the Lord made us and remains faithful before bringing your requests to Him." },
      { title: "This Is the Day", collection: "Praise & Chorus", theme: "Rejoicing in the day God has made", reference: "Psalm 118:24", note: "A short congregational chorus of rejoicing and gratitude.", study: "Psalm 118:24 invites God's people to rejoice in the day He has made. Rejoicing is a deliberate response to God's goodness, even when the day contains challenges." },
      { title: "Bless the Lord, O My Soul", collection: "Praise & Chorus", theme: "Remembering God's benefits and mercy", reference: "Psalm 103:1–5", note: "A Scripture-shaped call to praise the Lord with the whole heart.", study: "Psalm 103 calls the soul to remember God's forgiveness, compassion and steadfast love. Write down one truth about God's character to revisit when discouraged." },
      { title: "The Lord Is My Shepherd", collection: "Scripture Song", theme: "God's care, guidance and provision", reference: "Psalm 23:1–6", note: "A Scripture-song theme drawn directly from the words and images of Psalm 23." },
      { title: "The Lord's Prayer", collection: "Scripture Song", theme: "Worship, surrender and daily dependence", reference: "Matthew 6:9–13", note: "A Scripture-song setting of the prayer Jesus taught His disciples.", study: "Matthew 6:9–13 gives a pattern of prayer beginning with God's name and kingdom, then daily needs, forgiveness and deliverance. It balances worship, dependence and reconciliation." },
      { title: "The Blessing", collection: "Contemporary Worship", theme: "God's presence and covenant blessing", reference: "Numbers 6:24–26", note: "A contemporary worship song shaped around the priestly blessing in Numbers." }
    ],

    affirmations: [
      "I am born of God. His Word lives in me.",
      "I am strengthened with might through the Spirit of God.",
      "I walk in the wisdom, love and victory of Christ.",
      "God's grace is sufficient for me.",
      "I am a new creation in Christ Jesus.",
      "I am accepted in Christ and strengthened by His grace.",
      "The Holy Spirit teaches me and helps me walk in truth.",
      "I have the mind of Christ and choose what honours Him.",
      "The Lord is my refuge; I will not be ruled by fear.",
      "I grow in love, patience, wisdom and spiritual maturity.",
      "I can approach God's throne of grace with confidence.",
      "My life will bear fruit as I remain in Christ."
    ],

    namesOfGod: [
      { name: "YHWH — The LORD", meaning: "God's covenant name, commonly represented as LORD in many English Bible translations.", reference: "Exodus 3:15", study: "Read Exodus 3:13–15. God identifies Himself to Moses and connects His name with the promise to be with His people. Notice that the name is given in the setting of God's response to Israel's suffering and His call to deliver them." },
      { name: "I AM WHO I AM", meaning: "God reveals Himself as the self-existent One who sends Moses.", reference: "Exodus 3:14", study: "Read Exodus 3:1–15. Moses asks how to answer Israel when they ask who sent him. The answer points to God's own identity and presence; do not reduce this profound statement to a slogan detached from the deliverance story." },
      { name: "El Shaddai", meaning: "God Almighty; the title is used when God confirms His covenant promise to Abram.", reference: "Genesis 17:1", study: "Read Genesis 17:1–8. God speaks to Abram about walking before Him and confirms the covenant, including the promise of descendants and nations. The passage highlights God's power and faithfulness to His promise." },
      { name: "El Elyon", meaning: "God Most High; the title declares God's supreme authority.", reference: "Genesis 14:18–20", study: "Read Genesis 14:17–24. Melchizedek blesses Abram in the name of God Most High, possessor of heaven and earth. Notice Abram's response and his refusal to make the king of Sodom the source of his prosperity." },
      { name: "El Roi", meaning: "The God who sees me; Hagar uses this title after God meets her in the wilderness.", reference: "Genesis 16:13", study: "Read Genesis 16:1–16. Hagar is vulnerable and mistreated, and God meets her in the wilderness. Keep her circumstances central: this account shows that God sees her distress and speaks to her, without excusing the human mistreatment in the story." },
      { name: "Jehovah Jireh", meaning: "The LORD will provide; the name is connected with God's provision on the mountain.", reference: "Genesis 22:14", study: "Read Genesis 22:1–19. Abraham names the place after God provides a ram. The narrative concerns Abraham's test and God's provision; it should not be turned into a guarantee that God will grant every desired outcome." },
      { name: "Jehovah Rapha", meaning: "The LORD who heals; revealed in the covenant setting at Marah.", reference: "Exodus 15:26", study: "Read Exodus 15:22–27. Israel encounters bitter water, and God provides for the people while teaching them to heed His voice. Read the healing statement within this covenant setting and alongside the Bible's wider teaching about suffering and healing." },
      { name: "Jehovah Nissi", meaning: "The LORD is my banner; Moses names the altar after God's help in battle.", reference: "Exodus 17:15", study: "Read Exodus 17:8–16. Israel faces Amalek, Moses' hands are supported by Aaron and Hur, and Joshua leads the people. The altar name remembers the LORD's help; notice the shared responsibility and dependence on God." },
      { name: "Jehovah Shalom", meaning: "The LORD is peace; Gideon builds an altar with this name after receiving God's reassurance.", reference: "Judges 6:24", study: "Read Judges 6:11–24. Gideon is afraid amid oppression, and God calls him while assuring him of peace. The name belongs to this encounter and calling, not to a promise that believers will never face conflict or distress." },
      { name: "The LORD Our Righteousness", meaning: "A prophetic title pointing to the righteous King God promises to raise up.", reference: "Jeremiah 23:6", study: "Read Jeremiah 23:1–8. The prophet condemns shepherds who scatter the flock and promises a righteous Branch from David's line. The title is tied to just rule, salvation and the restoration God promises." },
      { name: "The LORD Is There", meaning: "The closing name in Ezekiel's vision of the restored city.", reference: "Ezekiel 48:35", study: "Read Ezekiel 40–48, especially 48:30–35. The name closes a vision of a reordered land and city after judgment and exile. Its hope is God's presence among His restored people." },
      { name: "The LORD My Shepherd", meaning: "David describes the LORD's care, guidance and protection through the picture of a shepherd.", reference: "Psalm 23:1", study: "Read all of Psalm 23. The shepherd image includes provision, guidance, protection through danger and the confidence of God's presence. Notice that the psalm does not deny the valley; it describes the Shepherd's care within it." },
      { name: "Abba, Father", meaning: "A relational title used in the New Testament to express the believer's adopted relationship with God.", reference: "Romans 8:15", study: "Read Romans 8:12–17 and Galatians 4:4–7. Paul connects calling God Father with adoption through the Spirit and belonging to God's family. The intimate address is joined to the assurance and responsibility of life as God's children." },
      { name: "Ancient of Days", meaning: "Daniel's vision uses this title to portray God's eternal rule and righteous judgement.", reference: "Daniel 7:9–10", study: "Read Daniel 7:1–14. The Ancient of Days sits in judgment over arrogant kingdoms, and the vision presents God's enduring authority. Read the imagery as apocalyptic vision rather than as a literal description of God's physical appearance." },
      { name: "King of Kings and Lord of Lords", meaning: "A royal title declaring the supreme authority of Christ.", reference: "Revelation 19:16", study: "Read Revelation 19:11–16 in the context of Revelation's vision of Christ's victory and just judgment. The title identifies Jesus' supreme kingship; interpret the symbolic imagery with the book's wider witness and do not use it to justify human domination." },
      { name: "El Olam", meaning: "The everlasting God; Abraham uses this title while calling on the LORD at Beersheba.", reference: "Genesis 21:33", study: "Read Genesis 21:22–34. Abraham makes an agreement with Abimelech, addresses a dispute over a well, and plants a tamarisk tree at Beersheba. The title appears in a narrative of God's enduring faithfulness through changing circumstances." },
      { name: "The Lamb of God", meaning: "John the Baptist identifies Jesus as the Lamb of God who takes away the sin of the world.", reference: "John 1:29", study: "Read John 1:19–34. John identifies Jesus publicly and bears witness to the Spirit descending on Him. Read this title alongside the Gospel's wider testimony to Jesus and the biblical themes of sacrifice and redemption." },
      { name: "The Good Shepherd", meaning: "Jesus describes Himself as the Good Shepherd who lays down His life for the sheep.", reference: "John 10:11", study: "Read John 10:1–18. Jesus contrasts the Good Shepherd with the hired hand and speaks of knowing His sheep and laying down His life for them. The passage joins loving care with His willing self-giving." },
      { name: "The Light of the World", meaning: "Jesus declares that whoever follows Him will not walk in darkness but have the light of life.", reference: "John 8:12", study: "Read John 8:12–20 in its setting during Jesus' teaching in the temple. His claim concerns His identity and the life-giving light He brings. Keep the surrounding dialogue and witness about His relationship with the Father in view." },
      { name: "The Bread of Life", meaning: "Jesus presents Himself as the bread of life and the source of enduring life.", reference: "John 6:35", study: "Read John 6:25–40. After the feeding of the multitude, Jesus redirects the crowd from temporary food to the life God gives through Him. The image points to trusting and coming to Jesus, not merely receiving material provision." }
    ],

    studyTopics: [
      "Understanding Scripture",
      "Hebrew Word Studies",
      "Greek Word Studies",
      "Bible Dictionaries",
      "Bible Concordance",
      "Cross References",
      "Bible Commentaries",
      "Bible Introductions",
      "Bible Outlines",
      "Bible History",
      "Bible Geography",
      "Biblical Theology"
    ],

    spiritualWarfare: [
      "Understanding spiritual warfare",
      "The believer's authority in Christ",
      "The whole armour of God",
      "Prayer and intercession",
      "Standing firm in faith",
      "Recognising temptation and choosing the way of escape",
      "Resisting accusation through the truth of Scripture",
      "Forgiveness, reconciliation and freedom from bitterness",
      "Persevering in prayer with humility and discernment",
      "The victory of Christ and the believer's hope"
    ],

    declarationGuides: [
      { category: "Protection", items: [
        { text: "The Lord is my refuge and strength, my present help in trouble.", reference: "Psalm 46:1" },
        { text: "God guards my going out and my coming in.", reference: "Psalm 121:7–8" }
      ]},
      { category: "Family and Children", items: [
        { text: "As for my household, we will serve the Lord.", reference: "Joshua 24:15" },
        { text: "I will teach God's words diligently and lead by faithful example.", reference: "Deuteronomy 6:6–7" }
      ]},
      { category: "Marriage", items: [
        { text: "I choose patience, kindness and love that does not seek its own way.", reference: "1 Corinthians 13:4–5" },
        { text: "May our home be marked by forgiveness, peace and mutual honour.", reference: "Ephesians 4:32; Romans 12:10" }
      ]},
      { category: "Blessing and Provision", items: [
        { text: "My Father knows what I need, and I seek His kingdom first.", reference: "Matthew 6:31–33" },
        { text: "I will work honestly and trust God to provide what is good.", reference: "Philippians 4:19" }
      ]},
      { category: "Work and Purpose", items: [
        { text: "I will work wholeheartedly, as serving the Lord.", reference: "Colossians 3:23" },
        { text: "God guides me to walk in the good works He has prepared.", reference: "Ephesians 2:10" }
      ]},
      { category: "Healing and Strength", items: [
        { text: "The Lord renews my strength as I wait upon Him.", reference: "Isaiah 40:31" },
        { text: "God's grace is sufficient, and His strength is made perfect in weakness.", reference: "2 Corinthians 12:9" }
      ]},
      { category: "Faith and Victory", items: [
        { text: "I fix my eyes on Jesus and run with endurance.", reference: "Hebrews 12:1–2" },
        { text: "Thanks be to God, who gives us victory through Jesus Christ.", reference: "1 Corinthians 15:57" }
      ]},
      { category: "Wisdom and Guidance", items: [
        { text: "I ask God for wisdom and trust Him to guide my steps.", reference: "James 1:5; Proverbs 3:5–6" },
        { text: "God's Word is a lamp to my feet and a light to my path.", reference: "Psalm 119:105" }
      ]},
      { category: "Peace and Hope", items: [
        { text: "I bring my concerns to God in prayer, and His peace guards my heart.", reference: "Philippians 4:6–7" },
        { text: "The God of hope fills me with joy and peace as I trust in Him.", reference: "Romans 15:13" }
      ]},
      { category: "Spiritual Growth", items: [
        { text: "I continue to grow in the grace and knowledge of Jesus Christ.", reference: "2 Peter 3:18" },
        { text: "I abide in Christ, and my life bears fruit that honours God.", reference: "John 15:5, 8" }
      ]}
    ],

    declarations: [
      "Protection",
      "Family and Children",
      "Marriage",
      "Blessing",
      "Work and Purpose",
      "Healing and Strength",
      "Faith and Victory",
      "Wisdom and Guidance"
    ]
  };

  function loadSaved() {
    try {
      const data = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      );

      return {
        prayers: Array.isArray(data?.prayers) ? data.prayers : [],
        notes: Array.isArray(data?.notes) ? data.notes : [],
        bookmarks: Array.isArray(data?.bookmarks) ? data.bookmarks : []
      };
    } catch (error) {
      return { prayers: [], notes: [], bookmarks: [] };
    }
  }

  let saved = loadSaved();

  function readLocalRecords(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && typeof value === "object" ? value : {};
    } catch (error) {
      return {};
    }
  }

  function persist() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(saved)
      );
      return true;
    } catch (error) {
      alert("Storage is unavailable. Please check device storage.");
      return false;
    }
  }

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function button(label, action) {
    const btn = element("button", label);
    btn.type = "button";
    btn.addEventListener("click", action);
    return btn;
  }

  function card(title, description) {
    const box = element("section", undefined, "card");
    box.appendChild(element("h3", title));

    if (description) {
      box.appendChild(element("p", description));
    }

    return box;
  }

  function addLibrary() {
    const main = document.querySelector("main");

    if (!main || document.getElementById("zurielLibrary")) {
      return;
    }

    const root = element("section");
    root.id = "zurielLibrary";

    const style = element("style");

    style.textContent = `
      #zurielLibrary {
        margin-top: 25px;
        color: #18352b;
      }

      #zurielLibrary .library-nav {
        display: grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        gap: 8px;
        margin: 15px 0;
      }

      #zurielLibrary button {
        cursor: pointer;
        min-height: 44px;
      }

      #zurielLibrary textarea {
        width: 100%;
        min-height: 120px;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 9px;
        font: inherit;
      }

      #zurielLibrary .library-entry {
        padding: 13px;
        margin: 10px 0;
        border-bottom: 1px solid #e8e5dc;
        line-height: 1.7;
      }

      #zurielLibrary .library-entry h4 {
        margin-bottom: 5px;
        color: #24634a;
      }

      #zurielLibrary .zlib-name-study {
        margin-top: 9px;
        padding: 10px 12px;
        border: 1px solid #d9e2e9;
        border-radius: 10px;
        background: #fbfcfa;
      }

      #zurielLibrary .zlib-name-study summary {
        cursor: pointer;
        color: #24634a;
        font-weight: 700;
        min-height: 32px;
      }

      #zurielLibrary .zlib-name-study p {
        margin: 9px 0 2px;
        line-height: 1.7;
      }
      #zurielLibrary .zlib-study-topic {border:1px solid #d9e2e9;border-radius:13px;background:#fff;padding:13px;margin:12px 0;}
      #zurielLibrary .zlib-study-art {display:block;width:100%;height:auto;max-height:145px;object-fit:cover;border-radius:9px;margin:0 0 10px;background:#172b49;}
      #zurielLibrary .zlib-study-topic .zrl-open {width:100%;margin-top:8px;}

      #zurielLibrary .library-status {
        font-weight: bold;
        color: #24634a;
      }

      #zurielLibrary .zuriel-reference-library { display:block; }
      #zurielLibrary .zrl-intro { padding:16px; margin:12px 0; border-radius:16px; color:#f8f2e6; background:linear-gradient(135deg,#35245c,#5d477d); line-height:1.65; }
      #zurielLibrary .zrl-intro p { margin:6px 0; }
      #zurielLibrary #zrlSearch { min-height:48px; margin:12px 0; background:#fffdf8; border:1px solid #d8cdb9; }
      #zurielLibrary .zrl-filters { display:flex; flex-wrap:wrap; gap:7px; margin:10px 0 14px; }
      #zurielLibrary .zrl-chip { min-height:38px; margin:0; padding:8px 12px; border:1px solid #d8cbb6; border-radius:22px; background:#f5f0e7; color:#45375b; font:600 13px Arial,sans-serif; }
      #zurielLibrary .zrl-chip.is-active { background:#493665; color:#fff; border-color:#493665; }
      #zurielLibrary .zrl-count { color:#71677b; font:600 12px Arial,sans-serif; }
      #zurielLibrary .zrl-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
      #zurielLibrary .zrl-resource-card { min-width:0; padding:15px; border:1px solid #e5dccd; border-radius:15px; background:linear-gradient(160deg,#fffefa,#f7f1e7); box-shadow:0 5px 16px #3023440d; }
      #zurielLibrary .zrl-card-top { display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px; }
      #zurielLibrary .zrl-kind { color:#5b4777; font:700 11px Arial,sans-serif; text-transform:uppercase; letter-spacing:.06em; }
      #zurielLibrary .zrl-age { color:#8a806f; font:11px Arial,sans-serif; }
      #zurielLibrary .zrl-resource-card h3 { color:#302445; font-size:17px; line-height:1.3; margin:12px 0 7px; }
      #zurielLibrary .zrl-resource-card p { color:#625c62; font-size:13px; line-height:1.55; }
      #zurielLibrary .zrl-resource-card .zrl-byline { color:#81768a; font-size:11px; }
      #zurielLibrary .zrl-open,#zurielLibrary .zrl-close { width:100%; margin:8px 0 0; background:#493665; color:#fff; border-radius:9px; }
      #zurielLibrary .zrl-detail { margin:16px 0; padding:18px; border:1px solid #d8cbb6; border-left:4px solid #b39355; border-radius:14px; background:#fbf7ee; }
      #zurielLibrary .zrl-detail h3 { color:#302445; }
      #zurielLibrary .zrl-detail h4 { color:#5b4777; }
      #zurielLibrary .zrl-eyebrow { color:#8b7547; font:700 11px Arial,sans-serif; letter-spacing:.1em; } 
      #zurielLibrary .zlw-lesson{margin:10px 0;border:1px solid #d9dfe5;border-radius:12px;background:#fff;overflow:hidden}
      #zurielLibrary .zlw-lesson>summary{padding:15px 42px 15px 14px;position:relative;cursor:pointer;list-style:none;color:#173b58;font-weight:700;line-height:1.45}
      #zurielLibrary .zlw-lesson>summary::-webkit-details-marker{display:none}
      #zurielLibrary .zlw-lesson>summary:after{content:"＋";position:absolute;right:14px;top:13px;font-size:19px;color:#92764b}
      #zurielLibrary .zlw-lesson[open]>summary:after{content:"−"}
      #zurielLibrary .zlw-lesson-body{padding:0 15px 15px;border-top:1px solid #edf0f1}
      #zurielLibrary .zlw-lesson-body h4{margin:14px 0 5px;color:#31566c}
      #zurielLibrary .zlw-lesson-body p,#zurielLibrary .zlw-lesson-body li{font-size:14px;line-height:1.7;color:#344455}
      #zurielLibrary .zlw-lesson-references{display:flex;gap:7px;flex-wrap:wrap}
      #zurielLibrary .zlw-lesson-references button{background:#edf3f5;color:#173b58;border:1px solid #d0dce2;border-radius:8px;padding:8px 10px}

      @media(max-width:520px) { #zurielLibrary .zrl-grid { grid-template-columns:1fr; } }

      #zurielLibrary input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font: inherit;
      }
    `;

    root.appendChild(style);

    const heading = card(
      "📚 Zuriel Complete Study Library",
      "One place for Bible study, spiritual growth, prayer and personal discoveries."
    );

    const nav = element("div", undefined, "library-nav");
    const content = element("div");
    content.id = "zurielLibraryContent";

    const pages = [
      ["study", "📖 Deep Bible Study"],
      ["plans", "🗓️ Bible Reading Plans"],
      ["references", "📚 Dictionaries & Commentaries"],
      ["devotional", "🕊️ Devotionals"],
      ["worship", "🎶 SS&S • Hymns & Worship"],
      ["affirmation", "✨ Glory Verse Affirmation"],
      ["names", "👑 Names of God"],
      ["prayer", "🙏 Prayer Journal"],
      ["notes", "📝 Personal Notes"],
      ["declarations", "🔥 Declarations"],
      ["warfare", "🛡️ Spiritual Warfare"],
      ["jesus", "❤️ Words of Jesus"],
      ["saved", "📚 My Saved Library"]
    ];

    function openPage(page) {
      content.replaceChildren();

      if (page === "plans") {
        content.appendChild(card(
          "Bible Reading Plans",
          "Choose a guided Scripture journey. Your progress stays on this device and works offline."
        ));
        const planStatus = element("p", "Your reading plans are loading…", "zrp-status");
        const planContainer = element("div");
        planContainer.id = "zurielReadingPlans";
        content.append(planStatus, planContainer);
        if (window.ZurielReadingPlans && typeof window.ZurielReadingPlans.render === "function") {
          window.ZurielReadingPlans.render(planContainer, message => { planStatus.textContent = message; });
        } else {
          planStatus.textContent = "Reading plans are not available yet. Your saved progress has not been changed.";
        }
        return;
      }

      if (page === "study") {
        content.appendChild(card(
          "Deep Bible Study",
          "Explore Scripture through reliable study resources."
        ));

        const openPlans = element("button");
        openPlans.type = "button";
        openPlans.textContent = "Open Bible Reading Plans";
        openPlans.addEventListener("click", () => openPage("plans"));
        content.appendChild(openPlans);

        const openReferenceLibrary = element("button");
        openReferenceLibrary.type = "button";
        openReferenceLibrary.textContent = "Open Dictionaries & Commentaries";
        openReferenceLibrary.addEventListener("click", () => openPage("references"));
        content.appendChild(openReferenceLibrary);

        const topicDescriptions = {
          "Understanding Scripture":"Read each passage in its literary, historical and whole-Bible context.",
          "Hebrew Word Studies":"Explore Hebrew words, source labels, morphology and lexicon records where verified data is available.",
          "Greek Word Studies":"Explore Greek words, source labels, morphology and lexicon records where verified data is available.",
          "Bible Dictionaries":"Open the reference shelf and review dictionary entries and source notes.",
          "Bible Concordance":"Follow connected words and Scripture occurrences without treating an index as a complete definition.",
          "Cross References":"Compare related passages and open their exact references in the KJV reader.",
          "Bible Commentaries":"Browse the commentary catalogue and its edition and provenance notes.",
          "Bible Introductions":"Open book introductions, background, key themes, images and chapter outlines.",
          "Bible Outlines":"Explore the book outline and chapter-by-chapter guide in the introduction centre.",
          "Bible History":"Study historical and literary context alongside the selected Scripture.",
          "Bible Geography":"Explore offline Bible regions, places and journeys linked to Scripture.",
          "Biblical Theology":"Study the meaning of a passage within the wider teaching of Scripture."
        };
        function openStudyTopic(topic) {
          if (topic === "Bible Dictionaries" || topic === "Bible Commentaries") {
            openPage("references");
            return;
          }
          if (topic === "Bible Introductions" || topic === "Bible Outlines") {
            if (window.ZurielHomeNavigate) window.ZurielHomeNavigate("read");
            const introduction = document.getElementById("zurielIntroduction");
            if (introduction) {
              const toggle = introduction.querySelector("button.intro-button");
              const body = toggle && toggle.nextElementSibling;
              if (body && body.hidden && toggle) toggle.click();
              introduction.scrollIntoView({behavior:"smooth",block:"start"});
            }
            return;
          }
          if (window.ZurielHomeNavigate) window.ZurielHomeNavigate("study");
          const panel = document.getElementById("zurielStudyPanel");
          if (!panel) return;
          const terms = {
            "Understanding Scripture":"Historical Context",
            "Hebrew Word Studies":"Hebrew and Greek Word Study",
            "Greek Word Studies":"Hebrew and Greek Word Study",
            "Bible Concordance":"Cross References",
            "Cross References":"Cross References",
            "Bible History":"Historical Context",
            "Bible Geography":"Geography",
            "Biblical Theology":"Meaning and Exposition"
          };
          const target = terms[topic] || "Meaning and Exposition";
          const section = Array.from(panel.querySelectorAll("details")).find(function(item) {
            const summary = item.querySelector("summary");
            return summary && summary.textContent.toLowerCase().includes(target.toLowerCase());
          });
          if (section) {
            section.open = true;
            section.scrollIntoView({behavior:"smooth",block:"start"});
          }
        }
        originalLibrary.studyTopics.forEach((topic, index) => {
          const box = element("article", undefined, "library-entry zlib-study-topic");
          if (typeof window.ZurielStudyArtwork === "function") {
            const image = element("img", undefined, "zlib-study-art");
            image.src = window.ZurielStudyArtwork(index, topic);
            image.alt = topic + " illustration";
            image.loading = "lazy";
            image.decoding = "async";
            image.width = 960;
            image.height = 240;
            box.appendChild(image);
          }
          box.appendChild(element("h4", topic));
          box.appendChild(element("p", topicDescriptions[topic] || "Open this Scripture study pathway."));
          const action = button("Open study area", function(){ openStudyTopic(topic); });
          action.className = "zrl-open";
          box.appendChild(action);
          content.appendChild(box);
        });
      }

      if (page === "references") {
        const resources = [
          { title: "Easton's Bible Dictionary", kind: "Dictionaries", author: "Matthew George Easton", date: "1897", scope: "A concise reference work explaining biblical people, places, customs and terms.", provenance: "Historical public-domain reference work; edition and source text must be verified before full text is bundled.", tags: "dictionary people places customs terms" },
          { title: "Smith's Bible Dictionary", kind: "Dictionaries", author: "William Smith", date: "1863", scope: "A historical Bible dictionary covering names, geography, objects and cultural background.", provenance: "Historical public-domain reference work; verify the selected digitised edition and transcription.", tags: "dictionary geography history people places" },
          { title: "Strong's Exhaustive Concordance", kind: "Language", author: "James Strong and contributors", date: "1890", scope: "A concordance and numbering system commonly used to locate Hebrew and Greek word entries.", provenance: "Historical public-domain work. Numbering aids identification; it is not a substitute for grammatical or contextual study.", tags: "strong concordance hebrew greek original language" },
          { title: "Matthew Henry's Commentary", kind: "Commentaries", author: "Matthew Henry", date: "1706–1721", scope: "A classic devotional and explanatory commentary covering the books of the Bible.", provenance: "Historical public-domain commentary; verify edition, completeness and book coverage before bundling.", tags: "commentary exposition devotional verse chapter" },
          { title: "Treasury of Scripture Knowledge", kind: "Cross References", author: "R. A. Torrey (editorial tradition)", date: "19th century", scope: "A large collection of cross-references designed to compare Scripture with Scripture.", provenance: "Historical reference work. Confirm the exact edition and rights status of any digitised transcription.", tags: "cross references topical parallel scripture" },
          { title: "John Gill's Exposition of the Bible", kind: "Commentaries", author: "John Gill", date: "1746–1763", scope: "A verse-by-verse exposition with historical, theological and language observations.", provenance: "Historical public-domain work; edition and transcription quality require verification.", tags: "commentary exposition hebrew greek theology" }
        ];
        const categories = ["All Resources", "Commentaries", "Dictionaries", "Language", "Cross References"];
        let activeCategory = "All Resources";
        let activeResource = null;
        const panel = element("section", undefined, "zuriel-reference-library");
        const intro = element("div", undefined, "zrl-intro");
        intro.appendChild(element("p", "A carefully organised reference shelf for deeper, Scripture-centred study."));
        intro.appendChild(element("p", "Resource records identify historic works and their provenance. Full texts are not represented as installed unless a verified, rights-cleared edition is actually supplied."));
        panel.appendChild(intro);

        const search = element("input");
        search.type = "search";
        search.id = "zrlSearch";
        search.placeholder = "Search title, author, subject or keyword";
        search.setAttribute("aria-label", "Search dictionaries and commentaries");
        panel.appendChild(search);

        const filters = element("div", undefined, "zrl-filters");
        categories.forEach(category => {
          const chip = button(category, () => {
            activeCategory = category;
            renderResources();
          });
          chip.className = "zrl-chip" + (category === activeCategory ? " is-active" : "");
          chip.setAttribute("aria-pressed", category === activeCategory ? "true" : "false");
          filters.appendChild(chip);
        });
        panel.appendChild(filters);

        const count = element("p", undefined, "zrl-count");
        count.setAttribute("aria-live", "polite");
        panel.appendChild(count);
        const list = element("div", undefined, "zrl-grid");
        panel.appendChild(list);
        const detail = element("section", undefined, "zrl-detail");
        detail.hidden = true;
        panel.appendChild(detail);
        content.appendChild(panel);

        function renderResources() {
          const query = search.value.trim().toLowerCase();
          const filtered = resources.filter(item => {
            const categoryMatch = activeCategory === "All Resources" || item.kind === activeCategory;
            const text = [item.title, item.author, item.scope, item.tags, item.kind].join(" ").toLowerCase();
            return categoryMatch && (!query || text.includes(query));
          });
          filters.replaceChildren();
          categories.forEach(category => {
            const chip = button(category, () => {
              activeCategory = category;
              renderResources();
            });
            chip.className = "zrl-chip" + (category === activeCategory ? " is-active" : "");
            chip.setAttribute("aria-pressed", category === activeCategory ? "true" : "false");
            filters.appendChild(chip);
          });
          list.replaceChildren();
          count.textContent = filtered.length + " reference " + (filtered.length === 1 ? "resource" : "resources");
          if (!filtered.length) {
            list.appendChild(element("p", "No resources match that search. Try another title, author or subject."));
          }
          filtered.forEach(item => {
            const cardNode = element("article", undefined, "zrl-resource-card");
            const top = element("div", undefined, "zrl-card-top");
            top.appendChild(element("span", item.kind, "zrl-kind"));
            top.appendChild(element("span", "Historic reference", "zrl-age"));
            cardNode.appendChild(top);
            cardNode.appendChild(element("h3", item.title));
            cardNode.appendChild(element("p", item.scope));
            cardNode.appendChild(element("p", item.author + " • " + item.date, "zrl-byline"));
            const open = button("View resource details", () => showDetails(item));
            open.className = "zrl-open";
            cardNode.appendChild(open);
            list.appendChild(cardNode);
          });
          if (activeResource && filtered.includes(activeResource)) showDetails(activeResource);
          else { detail.hidden = true; detail.replaceChildren(); }
        }

        function showDetails(item) {
          activeResource = item;
          detail.hidden = false;
          detail.replaceChildren();
          detail.appendChild(element("p", "RESOURCE DETAILS", "zrl-eyebrow"));
          detail.appendChild(element("h3", item.title));
          detail.appendChild(element("p", item.scope));
          detail.appendChild(element("p", "Author: " + item.author + " • First published: " + item.date));
          detail.appendChild(element("h4", "Source and rights notes"));
          detail.appendChild(element("p", item.provenance));
          detail.appendChild(element("p", "Availability: Catalogue record only. The complete text is not currently bundled in Zuriel through this entry."));
          const close = button("Close details", () => { activeResource = null; detail.hidden = true; detail.replaceChildren(); });
          close.className = "zrl-close";
          detail.appendChild(close);
        }

        search.addEventListener("input", renderResources);
        renderResources();

        // Integrate the installed offline study datasets into this same shelf.
        const offlineShelf = element("section", undefined, "zrl-offline-shelf");
        offlineShelf.appendChild(element("h3", "Zuriel Offline Commentary & Dictionary", "zrl-offline-heading"));
        offlineShelf.appendChild(element("p", "Search and open the installed passage commentary, biblical dictionary, Hebrew and Greek word studies, and theological comparisons. These are curated study aids with context notes and Scripture links where supplied.", "zrl-offline-intro"));
        const offlineSearch = element("input");
        offlineSearch.type = "search";
        offlineSearch.placeholder = "Search commentary, biblical terms or passage references…";
        offlineSearch.setAttribute("aria-label", "Search installed commentary and dictionary entries");
        const offlineCategory = element("select");
        offlineCategory.setAttribute("aria-label", "Filter installed study resources");
        [["all","All offline studies"],["Commentary & Exegesis","Passage commentary"],["Bible Dictionary","Bible dictionary"],["Hebrew & Greek Word Studies","Hebrew & Greek word studies"],["Theological Comparisons","Theological comparisons"]].forEach(([value,label]) => {
          const option = element("option", label);
          option.value = value;
          offlineCategory.appendChild(option);
        });
        const offlineCount = element("p", "Loading installed study entries…", "zrl-count");
        const offlineResults = element("div", undefined, "zrl-offline-results");
        const offlineDetail = element("section", undefined, "zrl-detail");
        offlineDetail.hidden = true;
        const offlineStatus = element("p", "", "zrl-count");
        offlineStatus.setAttribute("role","status");
        offlineShelf.append(offlineSearch,offlineCategory,offlineCount,offlineResults,offlineDetail,offlineStatus);
        // Show installed Zuriel study entries before the historic catalogue notes.
        panel.insertBefore(offlineShelf,list);
        offlineShelf.style.cssText = "margin-top:22px;padding-top:16px;border-top:2px solid #e5dccd";
        offlineShelf.querySelector(".zrl-offline-heading").style.cssText = "color:#302445;font:700 20px Georgia,serif;margin:0 0 7px";
        offlineShelf.querySelector(".zrl-offline-intro").style.cssText = "font:14px/1.65 Arial,sans-serif;color:#625c62";
        offlineSearch.style.cssText = "width:100%;min-height:46px;padding:11px;border:1px solid #d8cdb9;border-radius:9px;background:#fff";
        offlineCategory.style.cssText = "width:100%;min-height:44px;margin:8px 0;padding:9px;border:1px solid #d8cdb9;border-radius:9px;background:#fff";
        offlineResults.style.cssText = "display:grid;gap:7px;margin:10px 0";
        let offlineItems = [];
        let selectedOfflineItem = null;
        function renderOfflineEntries() {
          const term = offlineSearch.value.trim().toLowerCase();
          const category = offlineCategory.value;
          const filtered = offlineItems.filter(item =>
            (category === "all" || item.category === category) &&
            (!term || (item.title+" "+item.summary+" "+item.references.join(" ")).toLowerCase().includes(term) ||
              JSON.stringify(item.source).toLowerCase().includes(term))
          );
          offlineResults.replaceChildren();
          offlineCount.textContent = filtered.length + " installed study entries";
          filtered.slice(0,35).forEach(item => {
            const action = button(item.title + "  ·  " + item.category, () => {
              selectedOfflineItem = item;
              if (window.ZurielStudyLibrary && typeof window.ZurielStudyLibrary.renderDetail === "function") {
                window.ZurielStudyLibrary.renderDetail(item,offlineDetail,offlineStatus);
                offlineDetail.hidden = false;
                offlineDetail.scrollIntoView({behavior:"smooth",block:"nearest"});
              }
            });
            action.className = "zrl-open";
            action.style.cssText = "width:100%;min-height:46px;padding:10px 12px;text-align:left;background:#fff;color:#302445;border:1px solid #e1d9cb;border-radius:9px";
            offlineResults.appendChild(action);
          });
          if (filtered.length > 35) offlineCount.textContent += " · showing first 35; refine your search";
          if (!filtered.length) offlineResults.appendChild(element("p", "No installed entries match this search."));
          if (selectedOfflineItem && filtered.includes(selectedOfflineItem) &&
              window.ZurielStudyLibrary && typeof window.ZurielStudyLibrary.renderDetail === "function") {
            window.ZurielStudyLibrary.renderDetail(selectedOfflineItem,offlineDetail,offlineStatus);
          } else if (!filtered.includes(selectedOfflineItem)) {
            selectedOfflineItem = null; offlineDetail.hidden = true; offlineDetail.replaceChildren();
          }
        }
        offlineSearch.addEventListener("input",renderOfflineEntries);
        offlineCategory.addEventListener("change",renderOfflineEntries);
        if (window.ZurielStudyLibrary && typeof window.ZurielStudyLibrary.load === "function") {
          window.ZurielStudyLibrary.load().then(items => {
            offlineItems = items.filter(item => ["Commentary & Exegesis","Bible Dictionary","Hebrew & Greek Word Studies","Theological Comparisons"].includes(item.category));
            renderOfflineEntries();
            offlineStatus.textContent = offlineItems.length + " offline commentary, dictionary and related study entries are ready.";
          }).catch(error => {
            offlineCount.textContent = "Installed study entries could not be loaded.";
            offlineStatus.textContent = error.message || "Check the offline study package and try again.";
          });
        } else {
          offlineCount.textContent = "The offline study library is not available in this app build.";
        }
      }

      if (page === "devotional") {
        content.appendChild(card(
          "The Light Glory Devotional",
          "A collection of 30 Scripture-led reflections, each with a short message and prayer."
        ));

        const devotionalCount = originalLibrary.devotionals.length;
        content.appendChild(element(
          "p",
          devotionalCount + " Scripture-led reflections. Open one at a time for a quieter reading experience.",
          "library-status"
        ));

        originalLibrary.devotionals.forEach(item => {
          // Keep the monthly collection compact; each reflection opens on demand.
          const box = element("details", undefined, "library-entry zuriel-devotional-entry");
          const summary = element("summary", item.title);
          summary.setAttribute("aria-label", "Open devotional: " + item.title);
          box.appendChild(summary);
          box.appendChild(element("strong", item.verse));
          box.appendChild(element("p", item.message));
          box.appendChild(element("p", "Prayer: " + item.prayer));
          content.appendChild(box);
        });
      }

      if (page === "affirmation") {
        content.appendChild(card(
          "Glory Verse Affirmation Studio",
          "Create a Scripture-centred open-book card. Add the exact passage and write each faith response in its own voice."
        ));

        if (!document.getElementById("zurielGloryStudioStyles")) {
          const studioStyle = element("style");
          studioStyle.id = "zurielGloryStudioStyles";
          studioStyle.textContent = `
            #zurielGloryStudio { display:grid;gap:12px;margin:14px 0; }
            #zurielGloryStudio .zgs-field { display:grid;gap:5px; }
            #zurielGloryStudio label { font-size:13px;font-weight:700;color:#c9b47d; }
            #zurielGloryStudio input,#zurielGloryStudio textarea {
              width:100%;box-sizing:border-box;padding:11px;border:1px solid #c8b98e;
              border-radius:9px;background:#fffdf7;color:#203047;font:inherit;
            }
            #zurielGloryStudio textarea { min-height:65px;resize:vertical; }
            #zurielGloryStudio .zgs-actions { display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px; }
            #zurielGloryStudio button { min-height:43px;border-radius:9px;padding:9px;font-weight:700; }
            /* A single continuous, realistic open Bible: restrained paper, curved gutter, visible cover and page edges. */
            #zurielGloryPreview {
              --zgs-paper:#fffdf6;--zgs-ink:#263342;--zgs-accent:#526d60;
              position:relative;isolation:isolate;overflow:hidden;padding:23px 19px 20px;margin:8px 0;
              border-radius:12px;color:var(--zgs-ink);
              background:linear-gradient(145deg,#253b34 0%,#172a25 100%);
              border:1px solid #263b32;box-shadow:0 10px 25px #101d3030;
            }
            #zurielGloryPreview:before {
              content:"";position:absolute;z-index:-1;left:3.5%;right:3.5%;top:42%;bottom:7%;
              border-radius:8px 8px 18px 18px;background:#e8dfc9;
              box-shadow:0 5px 0 #c9bda2,0 9px 0 #a99c82,0 14px 18px #0008;
            }
            #zurielGloryStudio[data-finish="navy"] #zurielGloryPreview {--zgs-paper:#172b49;--zgs-ink:#f6f0df;--zgs-accent:#e7c77d;--zgs-page-bg:linear-gradient(145deg,#203a60,#122541);--zgs-page-border:#d7b96d88;background:linear-gradient(90deg,#0c1a30,#1b3151 48%,#0d1d35 50%,#1b3151);}
            #zurielGloryStudio[data-finish="ivory"] #zurielGloryPreview {--zgs-page-bg:linear-gradient(145deg,#fffdf5,#eee3ca);--zgs-page-border:#b79a5b99;}
            #zurielGloryStudio[data-finish="forest"] #zurielGloryPreview {--zgs-paper:#e9f0e5;--zgs-ink:#183a30;--zgs-accent:#39765b;--zgs-page-bg:linear-gradient(145deg,#f8fff5,#dce9da);--zgs-page-border:#6f947b;background:linear-gradient(90deg,#d4e1d5,#f2f6ec 48%,#d7e3d8 50%,#f2f6ec);}
            #zurielGloryStudio[data-finish="parchment"] #zurielGloryPreview {--zgs-paper:#f0dfbd;--zgs-ink:#4a3520;--zgs-accent:#9a682b;--zgs-page-bg:repeating-linear-gradient(0deg,#f7e9cb,#f7e9cb 3px,#eddfc2 4px);--zgs-page-border:#b28a4e;background:repeating-linear-gradient(0deg,#f2e5ca,#f2e5ca 3px,#eddfc2 4px);}
            #zurielGloryPreview {background-image:linear-gradient(180deg,#10243a35,#10243a55),var(--zgs-wallpaper-image,none);background-size:cover;background-position:center;background-repeat:no-repeat;}
            #zurielGloryPreview:after {content:"";position:absolute;top:0;bottom:0;left:50%;width:1px;background:#9a835333;box-shadow:0 0 15px #5b472333;pointer-events:none;}
            #zurielGloryPreview .zgs-brand {font-size:13px;letter-spacing:.4px;text-align:center;color:#e9e3d5;font-weight:700;font-family:Georgia,serif;position:relative;z-index:1;}
            #zurielGloryPreview h3 {text-align:center;color:#fffdf5;font-family:Georgia,serif;font-size:20px;margin:9px 0 12px;position:relative;z-index:1;}
            #zurielGloryPreview .zgs-book-spread {
              display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0;
              position:relative;z-index:1;margin:20px 2px 0;padding:18px 12px 20px;
              border-radius:7px 7px 13px 13px;
              background:linear-gradient(90deg,#e7ddc7 0%,#fffdf5 3%,#fffdf7 47%,#d6cbb5 49.5%,#b7aa91 50%,#fffdf7 52%,#fffdf5 97%,#e7ddc7 100%);
              box-shadow:0 4px 0 #c5b99f,0 8px 0 #a99c82,0 13px 18px #0006;
            }
            #zurielGloryPreview .zgs-page {
              position:relative;min-width:0;min-height:260px;padding:18px 15px;
              background:transparent;border:0;border-radius:0;box-shadow:none;overflow:hidden;
            }
            #zurielGloryPreview .zgs-left-page {
              border-right:1px solid #d7ceb9;
              box-shadow:inset -13px 0 16px -17px #594d39;
              transform:perspective(900px) rotateY(2deg);transform-origin:right center;
            }
            #zurielGloryPreview .zgs-right-page {
              box-shadow:inset 13px 0 16px -17px #594d39;
              transform:perspective(900px) rotateY(-2deg);transform-origin:left center;
            }
            #zurielGloryPreview .zgs-page-title {font:700 10px/1.4 Arial,sans-serif;letter-spacing:1px;text-align:center;color:var(--zgs-accent);margin:3px 0 12px;}
            #zurielGloryPreview .zgs-ref {text-align:center;font-weight:800;color:var(--zgs-accent);font-size:13px;}
            #zurielGloryPreview .zgs-copy {white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.48;margin:9px 0;font-family:Georgia,serif;font-size:14px;}
            #zurielGloryPreview .zgs-active-copy {min-height:105px;font-weight:700;}
            #zurielGloryPreview .zgs-footer {text-align:center;font-size:10px;letter-spacing:.5px;margin-top:18px;color:#e9e3d5;font-weight:700;position:relative;z-index:1;}
            #zurielGloryStudio .zgs-tabs {display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:5px;}
            #zurielGloryStudio .zgs-tabs button {font-size:11px;line-height:1.25;padding:7px 3px;background:#19324f;color:#fff;}
            #zurielGloryStudio .zgs-tabs button[aria-pressed="true"] {background:#b28b45;color:#172b49;outline:2px solid #e5d2a6;}
            #zurielGloryStudio .zgs-typography-controls {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:10px;border:1px solid #d7c79f;border-radius:10px;background:#f5f1e7;}
            #zurielGloryStudio .zgs-typography-controls label {display:grid;gap:5px;color:#19324f;font-size:11px;}
            #zurielGloryStudio .zgs-typography-controls select {width:100%;min-width:0;padding:8px;border:1px solid #c8b98e;border-radius:7px;background:#fff;color:#203047;font:inherit;}
            #zurielGloryStudio[data-layout="stacked"] #zurielGloryPreview .zgs-book-spread {grid-template-columns:minmax(0,1fr);gap:0;}
            #zurielGloryStudio[data-layout="stacked"] #zurielGloryPreview .zgs-left-page {border-right:0;border-bottom:1px solid #d7ceb9;transform:none;}
            #zurielGloryStudio[data-layout="stacked"] #zurielGloryPreview .zgs-right-page {transform:none;}
            #zurielGloryStudio[data-layout="stacked"] #zurielGloryPreview:after {display:none;}
            #zurielGloryStudio[data-layout="stacked"] #zurielGloryPreview .zgs-page {padding:12px 10px;}
            #zurielGloryStudio[data-layout="stacked"] #zurielGloryPreview .zgs-copy {font-size:15px;line-height:1.65;}
            #zurielGloryStudio #zgsSaveImage {background:#19324f;color:#fff7e6;border:1px solid #b99b58;}
            #zurielGloryStudio .zgs-actions button {min-height:48px;padding:10px 12px;font-size:13px;touch-action:manipulation;}
            #zurielGloryStudio .zgs-saved-library {margin-top:18px;padding:14px;border:1px solid #d8ceb8;border-radius:12px;background:rgba(255,255,255,.72);}
            #zurielGloryStudio .zgs-saved-library h3 {margin:0 0 6px;color:#19324f;font-size:14px;letter-spacing:.04em;}
            #zurielGloryStudio .zgs-saved-library p {margin:5px 0 10px;font-size:13px;}
            #zurielGloryStudio .zgs-saved-card {display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:10px 0;border-top:1px solid #e2dac9;}
            #zurielGloryStudio .zgs-saved-card strong {color:#19324f;overflow-wrap:anywhere;}
            #zurielGloryStudio .zgs-saved-card p {margin:2px 0;flex:1 1 100%;}
            #zurielGloryStudio .zgs-saved-actions {display:flex;gap:8px;flex-wrap:wrap;}
            #zurielGloryStudio .zgs-saved-actions button {min-height:38px;padding:7px 12px;border:1px solid #b99b58;border-radius:8px;background:#19324f;color:#fff7e6;font:inherit;}
            @media(max-width:520px){#zurielGloryStudio .zgs-typography-controls{grid-template-columns:1fr 1fr}#zurielGloryStudio .zgs-typography-controls label:last-child{grid-column:1/-1}}
            @media(max-width:420px){#zurielGloryPreview{padding:16px 10px}#zurielGloryPreview h3{font-size:16px}#zurielGloryPreview .zgs-book-spread{padding:12px 7px 14px}#zurielGloryPreview .zgs-page{padding:9px 7px}#zurielGloryPreview .zgs-copy{font-size:12px}#zurielGloryPreview .zgs-page-title{font-size:9px}#zurielGloryStudio .zgs-tabs button{font-size:10px;min-height:42px}}
          `;
          root.appendChild(studioStyle);
        }

        const studio = element("section", undefined, "card");
        studio.id = "zurielGloryStudio";
        studio.dataset.finish = "navy";
        studio.dataset.wallpaper = "forest";
        studio.innerHTML = `
          <div class="zgs-field"><label for="zgsReference">SCRIPTURE REFERENCE</label><input id="zgsReference" placeholder="e.g. Romans 8:1"></div>
          <div class="zgs-field"><label for="zgsScripture">SCRIPTURE TEXT</label><textarea id="zgsScripture" placeholder="Load a KJV passage by reference or enter your licensed translation text"></textarea><button type="button" id="zgsLoadScripture">Load exact KJV passage from Bible</button><small>Enter a reference above, then load its exact KJV text. Other translations can be added when their licensed API access is ready.</small></div>
          <div class="zgs-field"><label for="zgsPrayer">PRAYER</label><textarea id="zgsPrayer" placeholder="Write a prayer shaped by this Scripture"></textarea></div>
          <div class="zgs-field"><label for="zgsDeclaration">DECLARATION</label><textarea id="zgsDeclaration" placeholder="Declare what this Scripture reveals"></textarea></div>
          <div class="zgs-field"><label for="zgsAffirmation">AFFIRMATION</label><textarea id="zgsAffirmation" placeholder="A personal response grounded in the verse"></textarea></div>
          <div class="zgs-field"><label for="zgsConfession">FAITH CONFESSION</label><textarea id="zgsConfession" placeholder="A first-person confession consistent with Scripture"></textarea></div>
          <div class="zgs-field"><label for="zgsInspiration">INSPIRATION / FAITH WORD</label><textarea id="zgsInspiration" placeholder="A short encouragement drawn from this passage"></textarea></div>
          <div class="zgs-field"><label>REALISTIC WALLPAPERS</label><div class="zgs-actions" id="zgsWallpapers" aria-label="Choose a photographic card wallpaper"><button type="button" data-wallpaper="forest">Forest river</button><button type="button" data-wallpaper="falls">Waterfall light</button><button type="button" data-wallpaper="stream">Forest stream</button><button type="button" data-wallpaper="valley">Mountain valley</button></div><small>Choose a background for your card. Selected wallpapers are cached on this device after loading for later offline use.</small></div>
          <div class="zgs-field"><label>OPEN-BOOK FINISH</label><div class="zgs-actions" id="zgsFinishes">
            <button type="button" data-finish="ivory">Warm ivory</button><button type="button" data-finish="navy">Kingdom navy</button>
          </div></div>
          <div class="zgs-tabs" id="zgsContentTabs" role="group" aria-label="Choose the right-page faith content">
            <button type="button" data-zgs-view="Prayer" aria-pressed="false">Prayer</button>
            <button type="button" data-zgs-view="Declaration" aria-pressed="true">Declaration</button>
            <button type="button" data-zgs-view="Affirmation" aria-pressed="false">Affirmation</button>
            <button type="button" data-zgs-view="Confession" aria-pressed="false">Faith</button>
            <button type="button" data-zgs-view="Inspiration" aria-pressed="false">Inspiration</button>
          </div>
          <div class="zgs-typography-controls" aria-label="Card typography controls">
            <label for="zgsScriptureSize">Scripture size
              <select id="zgsScriptureSize"><option value="12">Small</option><option value="14" selected>Medium</option><option value="17">Large</option><option value="20">Extra large</option></select>
            </label>
            <label for="zgsFaithSize">Faith text size
              <select id="zgsFaithSize"><option value="12">Small</option><option value="14" selected>Medium</option><option value="17">Large</option><option value="20">Extra large</option></select>
            </label>
            <label for="zgsTypeface">Typeface
              <select id="zgsTypeface"><option value="Georgia">Classic serif</option><option value="Arial">Clean sans serif</option></select>
            </label>
          </div>
          <article id="zurielGloryPreview" aria-label="Live open-book Glory Verse Affirmation preview">
            <div class="zgs-brand">The Light 🕯️</div>
            <h3 id="zgsPreviewTitle">His Words.. My life.. My Victory</h3>
            <div class="zgs-book-spread">
              <section class="zgs-page zgs-left-page">
                <div class="zgs-page-title">THE WORD</div>
                <div class="zgs-ref" id="zgsPreviewRef">Your Scripture reference</div>
                <p class="zgs-copy" id="zgsPreviewScripture">Your Scripture will appear here.</p>
              </section>
              <section class="zgs-page zgs-right-page">
                <div class="zgs-page-title">GLORY VERSE AFFIRMATION</div>
                <div class="zgs-page-title" id="zgsPreviewActiveTitle">DECLARATION</div>
                <p class="zgs-copy zgs-active-copy" id="zgsPreviewActiveContent">Your Scripture-led declaration will appear here.</p>
              </section>
            </div>
            <div class="zgs-footer">Zuriel Living Word Bible</div>
          </article>
          <div class="zgs-actions">
            <button type="button" id="zgsSave">Save to My Library</button>
            <button type="button" id="zgsShare">Share card text</button>
            <button type="button" id="zgsSaveImage">Save image</button><button type="button" id="zgsShareImage">Share image</button>
          </div>
          <p id="zgsStatus" class="library-status" aria-live="polite">Your draft stays on this device until you save it.</p>
          <section class="zgs-saved-library" aria-labelledby="zgsSavedHeading">
            <h3 id="zgsSavedHeading">MY SAVED GLORY VERSE CARDS</h3>
            <p>Saved cards stay on this device and can be reopened or deleted here.</p>
            <div id="zgsSavedCards" aria-live="polite"></div>
          </section>
        `;

        content.appendChild(studio);
        const wallpaperCatalog = {
          forest: { label: "Forest river", url: "https://images.unsplash.com/photo-1759182391264-73c1be282907?auto=format&fit=crop&fm=jpg&q=82&w=1800" },
          falls: { label: "Waterfall light", url: "https://images.unsplash.com/photo-1595132169434-097c5ae1a145?auto=format&fit=crop&fm=jpg&q=82&w=1800" },
          stream: { label: "Forest stream", url: "https://images.unsplash.com/photo-1765758693002-120e6ab36b87?auto=format&fit=crop&fm=jpg&q=82&w=1800" },
          valley: { label: "Mountain valley", url: "https://images.unsplash.com/photo-1768365423849-6f694d85cf33?auto=format&fit=crop&fm=jpg&q=82&w=1800" }
        };
        let activeWallpaperImage = null;
        let wallpaperRequestToken = 0;
        function loadStudioWallpaper(key) {
          const requestToken = ++wallpaperRequestToken;
          activeWallpaperImage = null;
          const choice = wallpaperCatalog[key];
          if (!choice) return;
          const status = studio.querySelector("#zgsStatus");
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.onload = function () {
            if (requestToken !== wallpaperRequestToken) return;
            activeWallpaperImage = image;
            studio.dataset.wallpaper = key;
            studio.querySelector("#zurielGloryPreview").style.setProperty("--zgs-wallpaper-image", 'url("' + choice.url + '")');
            studio.querySelectorAll("[data-wallpaper]").forEach(button => {
              button.setAttribute("aria-pressed", String(button.dataset.wallpaper === key));
            });
            status.textContent = choice.label + " wallpaper loaded. It will be available offline after this device caches it.";
          };
          image.onerror = function () {
            if (requestToken !== wallpaperRequestToken) return;
            status.textContent = "This wallpaper could not load. Connect to the internet once, then try again. Your other card content is safe.";
          };
          image.src = choice.url;
        }
        studio.querySelectorAll("[data-wallpaper]").forEach(choice => choice.addEventListener("click", function () {
          loadStudioWallpaper(this.dataset.wallpaper);
        }));
        loadStudioWallpaper("forest");
        const loadScriptureButton = studio.querySelector("#zgsLoadScripture");
        loadScriptureButton.addEventListener("click", async function () {
          const status = studio.querySelector("#zgsStatus");
          const referenceField = studio.querySelector("#zgsReference");
          const scriptureField = studio.querySelector("#zgsScripture");
          loadScriptureButton.disabled = true;
          status.textContent = "Loading the exact KJV passage from your offline Bible…";
          try {
            if (typeof window.getBibleVerseText !== "function") {
              throw new Error("The Bible text service is not ready. Return to the reader and try again.");
            }
            const result = await window.getBibleVerseText(referenceField.value);
            referenceField.value = result.reference;
            scriptureField.value = result.text;
            referenceField.dispatchEvent(new Event("input", { bubbles: true }));
            scriptureField.dispatchEvent(new Event("input", { bubbles: true }));
            updatePreview();
            status.textContent = result.reference + " loaded from the King James Version.";
          } catch (error) {
            status.textContent = error.message || "The passage could not be loaded.";
          } finally {
            loadScriptureButton.disabled = false;
          }
        });
        const fields = ["Reference","Scripture","Prayer","Declaration","Affirmation","Confession","Inspiration"];
        const ids = ["zgsReference","zgsScripture","zgsPrayer","zgsDeclaration","zgsAffirmation","zgsConfession","zgsInspiration"];
        const labels = ["SCRIPTURE","PRAYER","DECLARATION","AFFIRMATION","FAITH CONFESSION","INSPIRATION"];
        const previewIds = ["zgsPreviewScripture","zgsPreviewPrayer","zgsPreviewDeclaration","zgsPreviewAffirmation","zgsPreviewConfession","zgsPreviewInspiration"];
        let activeFaithView = "Declaration";
        function updatePreview() {
          const scriptureText = studio.querySelector("#zgsScripture").value.trim();
          const activeText = studio.querySelector("#zgs"+activeFaithView).value.trim();
          studio.querySelector("#zgsPreviewRef").textContent = studio.querySelector("#zgsReference").value.trim() || "Your Scripture reference";
          studio.querySelector("#zgsPreviewScripture").textContent = scriptureText || "Your Scripture will appear here.";
          studio.querySelector("#zgsPreviewActiveTitle").textContent = activeFaithView === "Confession" ? "FAITH CONFESSION" : activeFaithView.toUpperCase();
          studio.querySelector("#zgsPreviewActiveContent").textContent = activeText || "Add a Scripture-specific "+activeFaithView.toLowerCase()+" on the right page.";
          const stacked = scriptureText.length > 420 || activeText.length > 320;
          studio.dataset.layout = stacked ? "stacked" : "spread";
          const preview = studio.querySelector("#zurielGloryPreview");
          preview.style.setProperty("--zgs-scripture-size", studio.querySelector("#zgsScriptureSize").value + "px");
          preview.style.setProperty("--zgs-faith-size", studio.querySelector("#zgsFaithSize").value + "px");
          preview.style.setProperty("--zgs-typeface", studio.querySelector("#zgsTypeface").value);
          studio.querySelector("#zgsPreviewScripture").style.fontSize = studio.querySelector("#zgsScriptureSize").value + "px";
          studio.querySelector("#zgsPreviewActiveContent").style.fontSize = studio.querySelector("#zgsFaithSize").value + "px";
          [studio.querySelector("#zgsPreviewScripture"),studio.querySelector("#zgsPreviewActiveContent")].forEach(node => node.style.fontFamily = studio.querySelector("#zgsTypeface").value + ",serif");
        }
        studio.querySelectorAll("[data-zgs-view]").forEach(function(tab){
          tab.addEventListener("click",function(){
            activeFaithView = this.dataset.zgsView;
            studio.querySelectorAll("[data-zgs-view]").forEach(function(item){
              item.setAttribute("aria-pressed",String(item===tab));
            });
            updatePreview();
          });
        });
        ids.forEach(id => studio.querySelector("#"+id).addEventListener("input",updatePreview));
        ["zgsScriptureSize","zgsFaithSize","zgsTypeface"].forEach(id => studio.querySelector("#"+id).addEventListener("change",updatePreview));
        const curatedButton = button("Load verse-specific study example", function(){
          const reference=studio.querySelector("#zgsReference").value.trim();
          const entry=window.ZurielFaithContent&&window.ZurielFaithContent.find(reference);
          if(!entry){studio.querySelector("#zgsStatus").textContent="No curated example is available for this exact reference yet. You can still write your own Scripture-led content.";return;}
          ["Prayer","Declaration","Affirmation","Confession","Inspiration"].forEach(name=>{
            studio.querySelector("#zgs"+name).value=entry[name.toLowerCase()];
          });
          updatePreview();
          studio.querySelector("#zgsStatus").textContent="Loaded an individually written faith guide for "+entry.reference+". Add the exact verse text from your chosen translation.";
        });
        curatedButton.id="zgsLoadCurated";
        studio.querySelector("#zgsFinishes").parentElement.appendChild(curatedButton);
        studio.querySelectorAll("[data-finish]").forEach(choice => choice.addEventListener("click",function(){
          studio.dataset.finish=this.dataset.finish;
          studio.querySelectorAll("[data-finish]").forEach(item=>item.setAttribute("aria-pressed",String(item===this)));
        }));
        const savedCardsKey = "zuriel_glory_verse_cards_v1";
        function readSavedCards() {
          try {
            const value = JSON.parse(localStorage.getItem(savedCardsKey) || "[]");
            return Array.isArray(value) ? value.filter(item => item && typeof item === "object") : [];
          } catch (_) {
            return [];
          }
        }
        function renderSavedCards() {
          const list = studio.querySelector("#zgsSavedCards");
          list.replaceChildren();
          const records = readSavedCards();
          if (!records.length) {
            const empty = document.createElement("p");
            empty.textContent = "No saved cards yet. Save a Scripture card to see it here.";
            list.appendChild(empty);
            return;
          }
          records.slice().reverse().forEach((record, reverseIndex) => {
            const index = records.length - 1 - reverseIndex;
            const item = document.createElement("article");
            item.className = "zgs-saved-card";
            const heading = document.createElement("strong");
            heading.textContent = record.title || ("Glory Verse Affirmation — " + (record.reference || "Saved card"));
            const reference = document.createElement("p");
            reference.textContent = record.reference || "No reference";
            const actions = document.createElement("div");
            actions.className = "zgs-saved-actions";
            const load = document.createElement("button");
            load.type = "button";
            load.textContent = "Open card";
            load.addEventListener("click", function () {
              const current = readSavedCards()[index];
              if (!current) {
                studio.querySelector("#zgsStatus").textContent = "This saved card is no longer available.";
                renderSavedCards();
                return;
              }
              studio.querySelector("#zgsReference").value = current.reference || "";
              studio.querySelector("#zgsScripture").value = current.scripture || "";
              ["Prayer","Declaration","Affirmation","Confession","Inspiration"].forEach(name => {
                studio.querySelector("#zgs" + name).value = current[name.toLowerCase()] || "";
              });
              if (current.finish) {
                studio.dataset.finish = current.finish;
                studio.querySelectorAll("[data-finish]").forEach(choice => choice.setAttribute("aria-pressed", String(choice.dataset.finish === current.finish)));
              }
              updatePreview();
              if (current.wallpaper && wallpaperCatalog[current.wallpaper]) loadStudioWallpaper(current.wallpaper);
              studio.querySelector("#zgsStatus").textContent = "Reopened " + (current.reference || "your saved card") + ".";
              studio.querySelector("#zgsReference").scrollIntoView({ behavior: "smooth", block: "center" });
            });
            const remove = document.createElement("button");
            remove.type = "button";
            remove.textContent = "Delete";
            remove.addEventListener("click", function () {
              const latest = readSavedCards();
              if (!latest[index]) return;
              latest.splice(index, 1);
              try {
                localStorage.setItem(savedCardsKey, JSON.stringify(latest));
                studio.querySelector("#zgsStatus").textContent = "Saved card deleted from this device.";
                renderSavedCards();
              } catch (_) {
                studio.querySelector("#zgsStatus").textContent = "Unable to update saved cards. Please check device storage.";
              }
            });
            actions.append(load, remove);
            item.append(heading, reference, actions);
            list.appendChild(item);
          });
        }
        renderSavedCards();
        studio.querySelector("#zgsSave").addEventListener("click",function(){
          const record={title:"Glory Verse Affirmation — "+(studio.querySelector("#zgsReference").value.trim()||"Personal Scripture card"),reference:studio.querySelector("#zgsReference").value.trim(),scripture:studio.querySelector("#zgsScripture").value.trim(),prayer:studio.querySelector("#zgsPrayer").value.trim(),declaration:studio.querySelector("#zgsDeclaration").value.trim(),affirmation:studio.querySelector("#zgsAffirmation").value.trim(),confession:studio.querySelector("#zgsConfession").value.trim(),inspiration:studio.querySelector("#zgsInspiration").value.trim(),finish:studio.dataset.finish,wallpaper:studio.dataset.wallpaper,date:new Date().toISOString()};
          if(!record.reference||!record.scripture){studio.querySelector("#zgsStatus").textContent="Please enter the Scripture reference and exact verse text before saving.";return;}
          try{
            const records=readSavedCards();
            records.push(record);
            localStorage.setItem(savedCardsKey,JSON.stringify(records));
            renderSavedCards();
            studio.querySelector("#zgsStatus").textContent="Saved successfully. Your card is now listed in My Saved Glory Verse Cards.";
          }catch(error){studio.querySelector("#zgsStatus").textContent="Unable to save. Please check available device storage.";}
        });
        studio.querySelectorAll("#zgsSaveImage,#zgsShareImage").forEach(exportButton => exportButton.addEventListener("click", async function(){
          const status = studio.querySelector("#zgsStatus");
          const reference = studio.querySelector("#zgsReference").value.trim();
          const scripture = studio.querySelector("#zgsScripture").value.trim();
          const faithText = studio.querySelector("#zgs"+activeFaithView).value.trim();
          if (!reference || !scripture) {
            status.textContent = "Add the Scripture reference and exact verse text before saving an image.";
            return;
          }
          const exportButton = this;
          exportButton.disabled = true;
          status.textContent = "Preparing your open-book image…";
          try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Image export is not supported in this browser.");
            // A wallpaper is an enhancement, not a prerequisite: image export
            // must still work offline using the selected solid finish.
            const width = 1600, margin = 100, gap = 70, columnWidth = (width - margin * 2 - gap) / 2;
            const scriptureSize = Number(studio.querySelector("#zgsScriptureSize").value) * 2;
            const faithSize = Number(studio.querySelector("#zgsFaithSize").value) * 2;
            const typeface = studio.querySelector("#zgsTypeface").value;
            const lineHeight = size => Math.round(size * 1.55);
            function wrap(text, maxWidth, fontSize) {
              ctx.font = fontSize + "px " + typeface + ", serif";
              const lines = [];
              String(text || "").split(/\\n/).forEach(paragraph => {
                const words = paragraph.split(/\\s+/).filter(Boolean);
                if (!words.length) { lines.push(""); return; }
                let line = "";
                words.forEach(word => {
                  const candidate = line ? line + " " + word : word;
                  if (line && ctx.measureText(candidate).width > maxWidth) {
                    lines.push(line);
                    line = word;
                  } else line = candidate;
                });
                if (line) lines.push(line);
              });
              return lines;
            }
            const leftTitle = activeFaithView === "Confession" ? "FAITH CONFESSION" : activeFaithView.toUpperCase();
            const stacked = scripture.length > 420 || faithText.length > 320;
            const exportMargin = stacked ? 140 : margin;
            const exportColumnWidth = stacked ? width - exportMargin * 2 : columnWidth;
            const leftLines = wrap(scripture, exportColumnWidth, scriptureSize);
            const rightLines = wrap(faithText || "Add a Scripture-specific " + activeFaithView.toLowerCase() + ".", exportColumnWidth, faithSize);
            const top = 300, bottom = 150, sectionGap = stacked ? 95 : 0;
            const referenceHeadingHeight = 48 + 58;
            const faithHeadingHeight = 58;
            const contentHeight = stacked
              ? referenceHeadingHeight + leftLines.length * lineHeight(scriptureSize) +
                sectionGap + faithHeadingHeight + rightLines.length * lineHeight(faithSize)
              : referenceHeadingHeight + Math.max(
                leftLines.length * lineHeight(scriptureSize),
                rightLines.length * lineHeight(faithSize)
              );
            canvas.width = width;
            canvas.height = Math.max(1100, top + contentHeight + bottom);
            const palette = {
              ivory: ["#f8f0dc","#28354a","#b68a38"],
              navy: ["#172b49","#f6f0df","#e7c77d"],
              forest: ["#e9f0e5","#183a30","#39765b"],
              parchment: ["#f0dfbd","#4a3520","#9a682b"]
            };
            const colors = palette[studio.dataset.finish] || palette.ivory;
            ctx.fillStyle = colors[0]; ctx.fillRect(0,0,canvas.width,canvas.height);
            if (activeWallpaperImage) {
              const image = activeWallpaperImage;
              const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
              const drawWidth = image.width * scale, drawHeight = image.height * scale;
              ctx.drawImage(image,(canvas.width-drawWidth)/2,(canvas.height-drawHeight)/2,drawWidth,drawHeight);
              ctx.fillStyle = studio.dataset.finish === "navy" ? "rgba(10,24,43,.45)" : "rgba(248,244,232,.42)";
              ctx.fillRect(0,0,canvas.width,canvas.height);
            }
            else {
              ctx.fillStyle = studio.dataset.finish === "navy" ? "#172b49" :
                studio.dataset.finish === "forest" ? "#e9f0e5" :
                studio.dataset.finish === "parchment" ? "#f0dfbd" : "#f8f0dc";
              ctx.fillRect(0,0,canvas.width,canvas.height);
            }
            // Render real facing paper pages into the exported PNG, not only a
            // centre divider. This keeps the downloaded/shared image faithful
            // to the open-book preview in the Studio.
            const pageFill = studio.dataset.finish === "navy" ? "#203b60" :
              studio.dataset.finish === "forest" ? "#f7fbf4" :
              studio.dataset.finish === "parchment" ? "#fff0d4" : "#fffaf0";
            function roundedPanel(x, y, panelWidth, panelHeight, radius) {
              const r = Math.min(radius, panelWidth / 2, panelHeight / 2);
              ctx.beginPath();
              ctx.moveTo(x + r, y);
              ctx.lineTo(x + panelWidth - r, y);
              ctx.quadraticCurveTo(x + panelWidth, y, x + panelWidth, y + r);
              ctx.lineTo(x + panelWidth, y + panelHeight - r);
              ctx.quadraticCurveTo(x + panelWidth, y + panelHeight, x + panelWidth - r, y + panelHeight);
              ctx.lineTo(x + r, y + panelHeight);
              ctx.quadraticCurveTo(x, y + panelHeight, x, y + panelHeight - r);
              ctx.lineTo(x, y + r);
              ctx.quadraticCurveTo(x, y, x + r, y);
              ctx.closePath();
              ctx.fillStyle = pageFill;
              ctx.fill();
              ctx.strokeStyle = colors[2];
              ctx.lineWidth = 2;
              ctx.stroke();
            }
            ctx.save();
            ctx.shadowColor = "rgba(0,0,0,.24)";
            ctx.shadowBlur = 22;
            ctx.shadowOffsetY = 9;
            if (stacked) {
              const firstHeight = referenceHeadingHeight + leftLines.length * lineHeight(scriptureSize) + 44;
              const secondY = top + firstHeight + sectionGap - 55;
              const secondHeight = faithHeadingHeight + rightLines.length * lineHeight(faithSize) + 44;
              roundedPanel(exportMargin - 28, top - 55, exportColumnWidth + 56, firstHeight, 18);
              roundedPanel(exportMargin - 28, secondY, exportColumnWidth + 56, secondHeight, 18);
            } else {
              const spreadX = margin - 28, spreadY = top - 55;
              const spreadWidth = width - margin * 2 + 56;
              roundedPanel(spreadX, spreadY, spreadWidth, contentHeight + 88, 20);
              ctx.save();
              ctx.shadowColor = "rgba(35,28,18,.25)";
              ctx.shadowBlur = 12;
              ctx.beginPath(); ctx.moveTo(width/2,spreadY+12); ctx.lineTo(width/2,spreadY+contentHeight+20);
              ctx.strokeStyle = "rgba(105,91,66,.45)"; ctx.lineWidth = 5; ctx.stroke();
              ctx.restore();
            }
            ctx.restore();
            ctx.strokeStyle = colors[2]; ctx.lineWidth = 5;
            ctx.strokeRect(35,35,width-70,canvas.height-70);
            ctx.textAlign = "center"; ctx.fillStyle = colors[2];
            ctx.font = "bold 30px Georgia, serif"; ctx.fillText("THE LIGHT 🕯️",width/2,105);
            ctx.fillStyle = colors[1]; ctx.font = "bold 48px Georgia, serif";
            ctx.fillText("His Words.. My life.. My Victory",width/2,185);
            ctx.strokeStyle = colors[2]; ctx.lineWidth = 2;
            if (!stacked) {
              ctx.beginPath(); ctx.moveTo(width/2,235); ctx.lineTo(width/2,canvas.height-110); ctx.stroke();
            }
            function drawSection(title, referenceText, lines, x, y, maxWidth, size) {
              ctx.textAlign = "center"; ctx.fillStyle = colors[2];
              ctx.font = "bold 24px Arial, sans-serif";
              if (referenceText) {
                ctx.fillText(referenceText,x+maxWidth/2,y);
                y += 48;
              }
              ctx.fillText(title,x+maxWidth/2,y);
              y += 58;
              ctx.textAlign = "left"; ctx.fillStyle = colors[1];
              ctx.font = "bold " + size + "px " + typeface + ", serif";
              lines.forEach(line => { ctx.fillText(line,x,y); y += lineHeight(size); });
              return y;
            }
            if (stacked) {
              let y = top;
              y = drawSection("THE WORD",reference,leftLines,exportMargin,y,exportColumnWidth,scriptureSize);
              y += sectionGap;
              drawSection("GLORY VERSE AFFIRMATION — " + leftTitle,"",rightLines,exportMargin,y,exportColumnWidth,faithSize);
            } else {
              const leftX = margin, rightX = margin + columnWidth + gap;
              drawSection("THE WORD",reference,leftLines,leftX,top,columnWidth,scriptureSize);
              drawSection("GLORY VERSE AFFIRMATION — " + leftTitle,"",rightLines,rightX,top,columnWidth,faithSize);
            }
            ctx.textAlign = "center"; ctx.fillStyle = colors[2];
            ctx.font = "bold 24px Georgia, serif";
            ctx.fillText("Zuriel Living Word Bible",width/2,canvas.height-95);
            const blob = await new Promise((resolve,reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("The image could not be created.")),"image/png"));
            const safeReference = reference.replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,"").toLowerCase();
            const fileName = "Zuriel-Glory-Verse-" + (safeReference || "card") + ".png";
            const file = new File([blob],fileName,{type:"image/png"});
            if (exportButton.id === "zgsShareImage" &&
                window.ZurielMedia &&
                typeof window.ZurielMedia.canShareImage === "function" &&
                window.ZurielMedia.canShareImage()) {
              const dataUrl = await new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(String(reader.result || ""));
                reader.onerror = () => reject(reader.error || new Error("The PNG could not be prepared for Android sharing."));
                reader.readAsDataURL(blob);
              });
              await window.ZurielMedia.shareImage({dataUrl:dataUrl,fileName:fileName});
              status.textContent = "Android sharing options opened. Zuriel cannot confirm whether the receiving app completed delivery.";
            } else if (exportButton.id === "zgsSaveImage" &&
                window.ZurielMedia &&
                typeof window.ZurielMedia.isAvailable === "function" &&
                window.ZurielMedia.isAvailable()) {
              const dataUrl = await new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(String(reader.result || ""));
                reader.onerror = () => reject(reader.error || new Error("The PNG could not be prepared for your Gallery."));
                reader.readAsDataURL(blob);
              });
              const saved = await window.ZurielMedia.saveImage({dataUrl:dataUrl,fileName:fileName});
              status.textContent = "Saved to your phone's Gallery in the \"" + saved.albumName + "\" album.";
            } else if (exportButton.id === "zgsShareImage" && navigator.canShare && navigator.canShare({files:[file]}) && navigator.share) {
              await navigator.share({files:[file],title:"Glory Verse Affirmation"});
              status.textContent = "Your open-book image has been shared.";
            } else {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url; link.download = fileName; link.style.display = "none";
              document.body.appendChild(link); link.click(); link.remove();
              setTimeout(() => URL.revokeObjectURL(url),30000);
              status.textContent = exportButton.id === "zgsShareImage"
                ? "Direct image sharing is not supported here, so the PNG was saved to your Downloads folder."
                : "Your PNG image was saved to your Downloads folder. You can open it from your device files.";
            }
          } catch (error) {
            status.textContent = error && error.name === "AbortError" ? "Sharing was cancelled. Your card and saved-card library remain unchanged." : (error.message || "Image export could not be completed on this device.");
          } finally {
            exportButton.disabled = false;
          }
        }));
        studio.querySelector("#zgsShare").addEventListener("click",async function(){
          const textValue=["The Light 🕯️","His Words.. My life.. My Victory",studio.querySelector("#zgsReference").value,studio.querySelector("#zgsScripture").value,...["Prayer","Declaration","Affirmation","Confession","Inspiration"].map(name=>name.toUpperCase()+": "+studio.querySelector("#zgs"+name).value),"Zuriel Living Word Bible"].filter(Boolean).join("\n\n");
          if(!studio.querySelector("#zgsReference").value.trim()||!studio.querySelector("#zgsScripture").value.trim()){studio.querySelector("#zgsStatus").textContent="Add the Scripture reference and text before sharing.";return;}
          try {
            if (navigator.share) {
              await navigator.share({title:"Glory Verse Affirmation",text:textValue});
              studio.querySelector("#zgsStatus").textContent = "Your Scripture card text has been shared.";
            } else if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(textValue);
              studio.querySelector("#zgsStatus").textContent = "Card text copied. Paste it into your preferred sharing app.";
            } else {
              const fallback = document.createElement("textarea");
              fallback.value = textValue;
              fallback.setAttribute("readonly", "");
              fallback.style.cssText = "position:fixed;left:-9999px;top:0";
              document.body.appendChild(fallback);
              fallback.select();
              const copied = document.execCommand("copy");
              fallback.remove();
              studio.querySelector("#zgsStatus").textContent = copied
                ? "Card text copied. Paste it into your preferred sharing app."
                : "Please select the card text in the preview and copy it manually.";
            }
          } catch(error) {
            if (error.name !== "AbortError") {
              studio.querySelector("#zgsStatus").textContent = "Sharing could not be completed. You can still use Save image or copy the preview text.";
            }
          }
        });
        updatePreview();

        const affirmationReferences = [
          "1 John 5:1", "Ephesians 3:16", "1 Corinthians 1:30",
          "2 Corinthians 12:9", "2 Corinthians 5:17", "Ephesians 1:6",
          "John 14:26", "1 Corinthians 2:16", "Psalm 46:1",
          "2 Peter 1:5", "Hebrews 4:16", "John 15:5"
        ];
        originalLibrary.affirmations.forEach((item, index) => {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("p", item));
          box.appendChild(button("Save declaration", function () {
            saved.bookmarks.push({title:"Glory Verse Affirmation",text:item});
            persist();
            alert("Saved to your personal library.");
          }));
          const createCard = button("Create Open Book Share Card", async function () {
            const reference = affirmationReferences[index];
            createCard.disabled = true;
            try {
              if (typeof window.getBibleVerseText !== "function") {
                throw new Error("The offline Bible text service is not ready.");
              }
              const passage = await window.getBibleVerseText(reference);
              const response = window.ZurielFaithContent &&
                typeof window.ZurielFaithContent.find === "function"
                ? window.ZurielFaithContent.find(reference) : null;
              if (!response || !response.prayer || !response.declaration ||
                  !response.affirmation || !response.confession || !response.inspiration) {
                throw new Error("The complete Scripture-specific prayer, declaration, affirmation, confession and inspiration are not ready for this card.");
              }
              const opened = window.ZurielLibrary && window.ZurielLibrary.openGloryVerse(
                reference, passage.text, "KJV", response
              );
              if (!opened) throw new Error("The Open Book Card Studio could not be opened.");
            } catch (error) {
              createCard.textContent = error.message || "Unable to create card";
              createCard.disabled = false;
            }
          });
          createCard.className = "zgs-open-declaration-card";
          box.appendChild(createCard);
          box.appendChild(element("small", "Scripture: " + affirmationReferences[index]));
          content.appendChild(box);
        });
      }

      if (page === "names") {
        content.appendChild(card(
          "Names and Titles of God",
          "Explore biblical names and titles in their original passages. Translated forms and titles are explained in context."
        ));

        originalLibrary.namesOfGod.forEach(item => {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("h4", item.name));
          box.appendChild(element("p", item.meaning));
          box.appendChild(element("strong", item.reference));
          if (item.study) {
            const study = element("details", undefined, "zlib-name-study");
            study.appendChild(element("summary", "Explore the passage in context"));
            study.appendChild(element("p", item.study));
            box.appendChild(study);
          }
          content.appendChild(box);
        });
      }

      if (page === "worship") {
        content.appendChild(card(
          "🎶 SS&S — Songs, Hymns & Worship",
          "A complete worship-study library: every entry opens into its biblical foundation, explanation, reflection, prayer and practical worship response. Full lyrics are included only when they are verified as public domain or supplied under an appropriate licence.",
          "Worship study guides are available now. Audio playback is enabled only for recordings with verified composition rights, recording rights and streaming permission. No recording is streamed or downloaded without those checks."
        ));

        const collections = ["All Songs", "Traditional Hymn", "Gospel Hymn", "Modern Hymn", "Praise & Chorus", "Scripture Song", "Contemporary Worship"];
        const searchInput = element("input");
        searchInput.type = "search";
        searchInput.maxLength = 100;
        searchInput.placeholder = "Search songs, hymns, themes or Scriptures…";
        searchInput.setAttribute("aria-label", "Search worship songs and hymns");
        searchInput.autocomplete = "off";
        const searchStatus = element("p", undefined, "Browse the worship collection or search by title, theme or Scripture.");
        searchStatus.setAttribute("aria-live", "polite");
        const filterRow = element("div", undefined, "library-nav");
        const list = element("div");
        let activeCollection = "All Songs";

        function addGuideSection(parent, heading, text) {
          const section = element("section", undefined, "worship-guide-section");
          section.appendChild(element("h5", heading));
          section.appendChild(element("p", text));
          parent.appendChild(section);
        }

        function buildGuide(song) {
          const guide = element("details", undefined, "worship-guide");
          guide.appendChild(element("summary", "Open complete worship guide"));
          const body = element("div", undefined, "worship-guide-body");
          addGuideSection(body, "Biblical foundation", "Read " + song.reference + " slowly in its chapter context. Notice who is speaking, what the passage reveals about God, and how its message points to faithful worship. The song's theme is: " + song.theme + ".");
          addGuideSection(body, "Understanding the message", song.study || song.note);
          addGuideSection(body, "Personal reflection", "Consider how " + song.theme.toLowerCase() + " speaks to your present walk with God. What does this passage ask you to remember, trust, confess, celebrate or put into practice? Where might your thoughts or actions need to come into agreement with the truth of Scripture?");
          addGuideSection(body, "Worship response", "Begin by reading " + song.reference + " aloud. Spend a quiet moment thanking God for what the passage reveals. Sing or listen attentively to an authorised version of this song, then respond in your own words with praise, surrender and obedience. Let worship continue in the way you live.");
          addGuideSection(body, "Prayer", "Father, thank You for revealing Yourself through Your Word. As I reflect on " + song.theme.toLowerCase() + ", let this truth take root in my heart. Teach me to worship You sincerely, trust Your promises and live out what I have received from Scripture. May my words, choices and actions bring honour to Jesus. Amen.");
          addGuideSection(body, "For personal or group study", "1. What does " + song.reference + " teach about God?  2. Which phrase or truth from the passage stands out to you?  3. How does this song help you remember that truth?  4. What practical response can you make today?  5. Who could you encourage with this Scripture?");
          addGuideSection(body, "Lyrics and usage", "Lyrics are not reproduced here unless their public-domain status or permission for use has been verified. For copyrighted songs, use the authorised hymnal, publisher, church licence or rights-holder source. Zuriel can retain the song's study guide and Scripture references without reproducing protected lyrics.");
          guide.appendChild(body);
          return guide;
        }

        function renderSongs(collection) {
          activeCollection = collection || activeCollection;
          list.replaceChildren();
          const query = searchInput.value.trim().toLowerCase();
          const items = originalLibrary.worshipSongs.filter(function (song) {
            const inCollection = activeCollection === "All Songs" || song.collection === activeCollection;
            const searchable = [song.title, song.collection, song.theme, song.reference, song.note, song.study]
              .filter(Boolean).join(" ").toLowerCase();
            return inCollection && (!query || searchable.includes(query));
          });
          searchStatus.textContent = "Showing " + items.length + " of " +
            originalLibrary.worshipSongs.filter(song => activeCollection === "All Songs" || song.collection === activeCollection).length +
            " songs in " + activeCollection + (query ? " matching “" + query + "”." : ".");
          items.forEach(function (song) {
            const box = element("article", undefined, "library-entry worship-song-entry");
            box.appendChild(element("small", song.collection));
            box.appendChild(element("h4", song.title));
            box.appendChild(element("p", song.theme));
            box.appendChild(element("strong", "Scripture: " + song.reference));
            if (canPlayWorshipAudio(song)) {
              const player = document.createElement("audio");
              player.controls = true;
              player.preload = "none";
              player.src = song.audioUrl;
              player.setAttribute("aria-label", "Authorised recording of " + song.title);
              if (song.downloadAllowed !== true) player.setAttribute("controlsList", "nodownload");
              box.appendChild(player);
            } else {
              box.appendChild(element("p",
                "Study guide available. Audio is not enabled for this song because verified recording and streaming permissions are not on file.",
                "worship-audio-unavailable"
              ));
            }
            box.appendChild(element("p", song.note));
            box.appendChild(buildGuide(song));
            box.appendChild(button("Save Complete Guide to My Library", function () {
              const fullText = [
                song.title,
                song.collection,
                song.theme,
                "Scripture: " + song.reference,
                song.note,
                "Reflection: Consider how " + song.theme.toLowerCase() + " speaks to your walk with God.",
                "Prayer: Father, let this Scripture take root in my heart. Teach me to worship You sincerely and live out Your truth. Amen.",
                "Study: What does this passage reveal about God, and how will I respond?"
              ].join("\n\n");
              saved.bookmarks.push({
                title: "Worship Song — " + song.title,
                text: fullText,
                reference: song.reference
              });
              if (persist()) alert("The complete worship study guide has been saved to your personal library.");
            }));
            list.appendChild(box);
          });
          if (!items.length) list.appendChild(element("p", query ? "No worship songs match this search. Try another word, theme or Scripture." : "No songs in this collection yet."));
        }
        searchInput.addEventListener("input", function () { renderSongs(activeCollection); });
        collections.forEach(function (collection) {
          filterRow.appendChild(button(collection, function () {
            renderSongs(collection);
          }));
        });
        content.appendChild(searchInput);
        content.appendChild(searchStatus);
        content.appendChild(filterRow);
        content.appendChild(list);
        renderSongs("All Songs");
      }

      if (page === "prayer") {
        // Refresh the journal when opened so responses saved from verse popups
        // and the Glory Verse studio appear alongside manually written entries.
        saved = loadSaved();
        content.appendChild(card(
          "My Prayer Journal",
          "Keep prayers, thanksgiving, answered prayers and personal testimonies together on this device."
        ));

        const titleField = element("input");
        titleField.type = "text";
        titleField.placeholder = "Entry title (optional)";
        titleField.setAttribute("aria-label", "Prayer journal entry title");

        const categoryField = element("select");
        categoryField.setAttribute("aria-label", "Prayer journal entry type");
        [
          ["prayer", "Prayer"],
          ["thanksgiving", "Thanksgiving"],
          ["answered-prayer", "Answered Prayer"],
          ["testimony", "Testimony"]
        ].forEach(([value, label]) => {
          const option = element("option", label);
          option.value = value;
          categoryField.appendChild(option);
        });

        const referenceField = element("input");
        referenceField.type = "text";
        referenceField.placeholder = "Scripture reference (optional, e.g. Psalm 23:1)";
        referenceField.setAttribute("aria-label", "Related Scripture reference");

        const area = element("textarea");
        area.placeholder = "Write your prayer, gratitude or testimony here...";
        area.setAttribute("aria-label", "Prayer journal entry");

        const status = element("p", "Entries are saved locally in this app on this device.", "library-status");
        content.append(titleField, categoryField, referenceField, area, status);
        content.appendChild(button("Save Journal Entry", function () {
          const text = area.value.trim();
          if (!text) {
            status.textContent = "Write something before saving your journal entry.";
            area.focus();
            return;
          }

          const category = categoryField.value;
          const labels = {
            prayer: "Prayer",
            thanksgiving: "Thanksgiving",
            "answered-prayer": "Answered Prayer",
            testimony: "Testimony"
          };
          saved.prayers.push({
            title: titleField.value.trim() || labels[category] + " entry",
            category: category,
            reference: referenceField.value.trim(),
            text: text,
            date: new Date().toLocaleDateString()
          });

          if (persist()) {
            titleField.value = "";
            categoryField.value = "prayer";
            referenceField.value = "";
            area.value = "";
            status.textContent = "Your journal entry has been saved on this device.";
            renderPrayerRecords();
          } else {
            status.textContent = "The entry could not be saved. Please try again.";
          }
        }));

        content.appendChild(element("h3", "My Prayer & Testimony Records"));
        const records = element("div");
        content.appendChild(records);

        function openPrayerReference(reference, action) {
          const match = String(reference || "").match(/^(.+?)\s+(\d+):(\d+)(?:[-–]\d+)?$/);
          if (!match || typeof window.openChapter !== "function") {
            status.textContent = "Enter a Scripture reference such as John 3:16 to open it in the Bible reader.";
            return;
          }
          action.disabled = true;
          window.openChapter(match[1], Number(match[2])).then(function () {
            if (typeof window.selectBibleVerse !== "function" ||
                !window.selectBibleVerse(Number(match[3]))) {
              throw new Error("The referenced verse could not be selected.");
            }
            action.disabled = false;
            status.textContent = "Opened " + reference + " in the Bible reader.";
          }).catch(function (error) {
            action.disabled = false;
            status.textContent = error && error.message
              ? error.message : "Could not open this Scripture reference. Please try again.";
          });
        }

        function renderPrayerRecords() {
          records.replaceChildren();
          if (!saved.prayers.length) {
            records.appendChild(element("p", "Your saved prayers and testimonies will appear here."));
            return;
          }
          saved.prayers.slice().reverse().forEach(item => {
            const box = element("div", undefined, "library-entry");
            if (item.title) box.appendChild(element("h4", item.title));
            if (item.category) box.appendChild(element("small", item.category.replace(/-/g, " ")));
            if (item.reference) {
              box.appendChild(element("strong", item.reference));
              const open = button("Open Scripture", function () {
                openPrayerReference(item.reference, open);
              });
              box.appendChild(open);
            }
            box.appendChild(element("small", item.date || "Saved entry"));
            box.appendChild(element("p", item.text || ""));
            records.appendChild(box);
          });
        }
        renderPrayerRecords();
      }

      if (page === "notes") {
        saved = loadSaved();
        content.appendChild(card(
          "Personal Bible Study Notes",
          "Keep discoveries connected to the Scripture that inspired them. Notes are stored locally on this device."
        ));

        const title = element("input");
        title.placeholder = "Note title (optional)";
        title.setAttribute("aria-label", "Study note title");

        const reference = element("input");
        reference.type = "text";
        reference.placeholder = "Scripture reference (optional, e.g. John 3:16)";
        reference.setAttribute("aria-label", "Related Scripture reference");

        const area = element("textarea");
        area.placeholder = "Write your understanding, discoveries and reflections...";
        area.setAttribute("aria-label", "Personal Bible study note");

        const status = element("p", "Add a Scripture reference when you want to return directly to its passage.", "library-status");
        content.append(title, reference, area, status);

        let editingNote = null;
        const saveNoteButton = button("Save Study Note", function () {
          const noteText = area.value.trim();
          if (!noteText) {
            status.textContent = "Write your study note before saving.";
            area.focus();
            return;
          }

          saved.notes = Array.isArray(saved.notes) ? saved.notes : [];
          const updated = {
            title: title.value.trim() || "Bible Study Note",
            reference: reference.value.trim(),
            text: noteText,
            date: new Date().toLocaleDateString()
          };
          if (editingNote) {
            Object.assign(editingNote, updated);
          } else {
            saved.notes.push(updated);
          }

          if (persist()) {
            editingNote = null;
            title.value = "";
            reference.value = "";
            area.value = "";
            saveNoteButton.textContent = "Save Study Note";
            status.textContent = "Your study note has been saved on this device.";
            renderPersonalNotes();
          } else {
            status.textContent = "The note could not be saved. Please try again.";
          }
        });
        content.appendChild(saveNoteButton);

        content.appendChild(button("Cancel Editing", function () {
          if (!editingNote) return;
          editingNote = null;
          title.value = "";
          reference.value = "";
          area.value = "";
          saveNoteButton.textContent = "Save Study Note";
          status.textContent = "Editing cancelled. Your saved note remains unchanged.";
        }));

        const noteList = element("div");
        content.appendChild(element("h3", "My Study Notes"));
        content.appendChild(noteList);

        function openNoteReference(referenceText, action) {
          const match = String(referenceText || "").trim().match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
          if (!match || typeof window.openChapter !== "function") {
            status.textContent = "Use a reference such as John 3:16 to open a passage from your note.";
            return;
          }
          action.disabled = true;
          const bookName = match[1] === "Psalm" ? "Psalms" : match[1];
          window.openChapter(bookName, Number(match[2])).then(function () {
            if (match[3] && (typeof window.selectBibleVerse !== "function" ||
                !window.selectBibleVerse(Number(match[3])))) {
              throw new Error("The referenced verse could not be selected.");
            }
            action.disabled = false;
            status.textContent = "Opened " + referenceText + " in the Bible reader.";
          }).catch(function (error) {
            action.disabled = false;
            status.textContent = error && error.message
              ? error.message : "Could not open this Scripture reference. Please try again.";
          });
        }

        function renderPersonalNotes() {
          noteList.replaceChildren();
          const entries = Array.isArray(saved.notes) ? saved.notes : [];
          if (!entries.length) {
            noteList.appendChild(element("p", "Your saved study notes will appear here."));
            return;
          }
          entries.slice().reverse().forEach(function (item) {
            const box = element("div", undefined, "library-entry");
            box.appendChild(element("h4", item.title || "Bible Study Note"));
            if (item.reference) {
              box.appendChild(element("strong", item.reference));
              const open = button("Open Scripture", function () {
                openNoteReference(item.reference, open);
              });
              box.appendChild(open);
            }
            box.appendChild(element("small", item.date || "Saved note"));
            box.appendChild(element("p", item.text || ""));
            box.appendChild(button("Edit Note", function () {
              editingNote = item;
              title.value = item.title || "";
              reference.value = item.reference || "";
              area.value = item.text || "";
              saveNoteButton.textContent = "Update Study Note";
              status.textContent = "Editing this saved note. Saving will update it rather than create a duplicate.";
              title.focus();
            }));
            noteList.appendChild(box);
          });
        }
        renderPersonalNotes();
      }

      if (page === "declarations") {
        content.appendChild(card(
          "Declarations of Faith",
          "Choose a subject for focused declarations and prayer."
        ));

        originalLibrary.declarationGuides.forEach(item => {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("h4", item.category));
          item.items.forEach(function (declaration) {
            const entry = element("div");
            entry.appendChild(element("p", declaration.text));
            entry.appendChild(element("strong", declaration.reference));
            entry.appendChild(button("Save declaration", function () {
              saved.bookmarks.push({
                title: item.category + " Declaration",
                text: declaration.text,
                reference: declaration.reference
              });
              if (persist()) alert("Saved to your personal library.");
            }));
            box.appendChild(entry);
          });
          content.appendChild(box);
        });
      }

      if (page === "warfare") {
        content.appendChild(card(
          "Spiritual Warfare Study Centre",
          "Grow in biblical understanding of faith, prayer and the believer's identity in Christ. Choose one subject to open its guided study, Scriptures, reflection and prayer."
        ));
        const lessons = [
          {
            title:"Understanding spiritual warfare",
            overview:"The New Testament describes spiritual opposition as real, but it keeps the believer's attention on God, truth, holiness, prayer and the finished victory of Jesus Christ. Spiritual warfare is not a search for hidden enemies in every difficulty; it is faithful resistance to evil while remaining grounded in the gospel.",
            context:"Ephesians 6:10–18 places the armour of God after Paul's teaching about life in Christ and relationships in the household. The command is to be strong in the Lord and in the power of His might. The struggle is not against flesh and blood, so people must not be treated as the enemy.",
            practice:"Begin with worship and Scripture. Identify the actual temptation, lie, fear or pressure you are facing. Answer it with the truth of God's Word, seek wise Christian support where needed, and choose a concrete act of obedience, love or reconciliation.",
            caution:"Do not use spiritual-warfare language to accuse people, excuse harmful behaviour, avoid medical or professional help, or claim certainty about the cause of every hardship. Test teaching by Scripture and keep Christ central.",
            questions:["What does Ephesians 6 say about the source of the believer's strength?","Which part of my thinking or conduct needs to be brought under the truth of Christ?","How can I resist evil without treating another person as my enemy?"],
            prayer:"Father, strengthen me in the Lord. Give me discernment to recognise temptation, humility to receive correction and courage to obey Your Word. Keep my attention on Jesus Christ and teach me to walk in truth, love and holiness. Amen.",
            refs:["Ephesians 6:10-18","2 Corinthians 10:3-5","James 4:7-8","1 Peter 5:8-10"]
          },
          {
            title:"The believer's authority in Christ",
            overview:"Believers belong to Jesus Christ and share in the life, grace and calling He gives. Their confidence rests in Christ's authority, resurrection and lordship—not in personal power, special formulas or control over other people.",
            context:"Matthew 28:18–20 declares the authority of the risen Jesus and connects it with the mission to make disciples. Colossians 2:13–15 celebrates Christ's triumph over hostile powers through the cross. Ephesians 2:4–10 describes salvation by grace and the new life God creates.",
            practice:"Approach prayer with confidence in Jesus, submit your choices to His teaching, resist sin, serve others and speak the gospel with gentleness. Use authority to stand in Christ's truth and to serve—not to dominate or intimidate.",
            caution:"A believer's authority must never be used to promise that Christians can control events, guarantee a particular outcome, or command other people. The New Testament joins confidence with dependence, humility and obedience.",
            questions:["What authority does Matthew 28:18 say belongs to Jesus?","How does the cross shape the believer's confidence?","Where should Christ's authority change my choices today?"],
            prayer:"Lord Jesus, You are Lord. Thank You for Your saving work and the life You give. Teach me to live under Your word, pray with confidence and serve others with humility. Amen.",
            refs:["Matthew 28:18-20","Colossians 2:13-15","Ephesians 1:19-23","Ephesians 2:4-10"]
          },
          {
            title:"The whole armour of God",
            overview:"God equips His people to stand firm through truth, righteousness, readiness from the gospel of peace, faith, salvation, the Word of God and prayer. The picture is a call to steady faithfulness rather than fear or aggression.",
            context:"Ephesians 6:10–18 uses the image of a soldier's equipment to explain spiritual readiness. Each piece is connected with a gospel-shaped reality: truth, righteous living, peace, faith, salvation and God's Word. The passage ends by emphasising prayer for all the saints.",
            practice:"Name one practical way to put on each piece: speak truth, pursue integrity, make peace where possible, trust God's promises, remember salvation, read and apply Scripture, and pray for others.",
            caution:"The armour is a teaching image, not a ritual object or a guarantee that believers will never suffer. Read it in the wider letter, which repeatedly calls Christians to unity, love, forgiveness and faithful conduct.",
            questions:["Which piece of the armour do I most need to practise today?","How does the gospel of peace affect the way I respond to conflict?","Who can I remember in prayer this week?"],
            prayer:"Father, help me stand in Your strength. Form truth and righteousness in me, make me ready to live the gospel of peace, strengthen my faith, remind me of salvation and teach me to use Your Word wisely. Keep me prayerful and watchful. Amen.",
            refs:["Ephesians 6:10-18","Isaiah 59:16-17","1 Thessalonians 5:8","Romans 13:12-14"]
          },
          {
            title:"Prayer and intercession",
            overview:"Prayer is communion with God through Jesus Christ. Intercession brings other people, communities and needs before God with love, humility and perseverance. It is not a technique for forcing God to act.",
            context:"Jesus teaches His disciples to pray to the Father with reverence, dependence, forgiveness and trust (Matthew 6:5–13). The early church prays together in Acts 4:23–31, asking for boldness to speak God's word amid opposition.",
            practice:"Pray through a short list: praise, confession, thanksgiving, personal needs and intercession. Include leaders, families, those who suffer, the church and people with whom you disagree. Listen, reflect on Scripture and take wise action when a need is within your reach.",
            caution:"Avoid manipulative claims that a particular phrase, length of prayer or public display guarantees an answer. Scripture encourages persistence while also teaching submission to God's wisdom and will.",
            questions:["What does the Lord's Prayer teach about priorities?","Who needs patient, practical intercession from me?","How can prayer lead me toward a loving action?"],
            prayer:"Our Father, hallowed be Your name. Let Your kingdom and will shape my desires. Give what is needed today, teach us forgiveness, guard us from temptation and help us care faithfully for those we bring before You. Amen.",
            refs:["Matthew 6:5-13","Acts 4:23-31","1 Timothy 2:1-4","Philippians 4:6-7"]
          },
          {
            title:"Standing firm in faith",
            overview:"Standing firm means continuing to trust and obey God when circumstances are difficult. Biblical faith is not denial of pain; it is confidence in God's character while taking faithful next steps.",
            context:"Ephesians 6:13–14 repeats the call to stand. 1 Corinthians 16:13–14 joins courage and steadfastness with love. Hebrews 10:35–39 encourages endurance and trust without pretending that perseverance is effortless.",
            practice:"Remember a specific promise in its context, stay connected to trustworthy believers, keep doing what is good, and ask for help when you are weary. Measure faithfulness by obedience and love, not by the absence of struggle.",
            caution:"Do not shame people who are grieving, anxious, ill or facing hardship by telling them they simply lack faith. The Bible gives room for lament, weakness, mutual care and patient endurance.",
            questions:["What helps me remain faithful when I cannot see an immediate answer?","Which community or trusted person can support me?","What does it mean to let all I do be done in love?"],
            prayer:"Faithful God, steady my heart when I feel weak. Help me trust You honestly, receive support without shame and continue in love, courage and obedience. Amen.",
            refs:["Ephesians 6:13-14","1 Corinthians 16:13-14","Hebrews 10:35-39","Psalm 46:1-3"]
          },
          {
            title:"Recognising temptation and choosing the way of escape",
            overview:"Temptation invites people toward desires or actions that pull them away from God's good way. Scripture calls believers to watchfulness, honest self-knowledge and practical choices that avoid feeding temptation.",
            context:"James 1:13–15 distinguishes God's goodness from the inward process by which desire can lead to sin. 1 Corinthians 10:13 assures believers that temptation is not unique and that God provides a way to endure it.",
            practice:"Notice triggers and patterns without self-deception. Leave situations that predictably lead to wrongdoing, establish healthy boundaries, seek accountability, and replace harmful habits with constructive actions. Ask for help early rather than waiting until a crisis.",
            caution:"The promise in 1 Corinthians 10:13 is not a claim that every hardship is easy or that a person should remain in an unsafe situation. Seek immediate help and protection where abuse, coercion or danger is present.",
            questions:["What pattern or situation makes obedience harder for me?","What practical boundary can I put in place today?","Who is a safe, wise person I can ask for support?"],
            prayer:"Father, give me honesty to recognise temptation and strength to choose what is good. Show me the wise way out, help me seek support and form in me desires that honour You. Amen.",
            refs:["James 1:13-15","1 Corinthians 10:12-13","Matthew 26:41","2 Timothy 2:22"]
          },
          {
            title:"Resisting accusation through the truth of Scripture",
            overview:"The gospel answers condemnation with the saving work of Christ. Scripture also calls believers to receive correction, confess sin and grow in holiness. Freedom from condemnation is not freedom from responsibility.",
            context:"Romans 8:1–4 announces that there is no condemnation for those in Christ Jesus and explains the work of God through His Son. Revelation 12:10–11 portrays the accuser's defeat in relation to the Lamb and faithful witness.",
            practice:"When accused, distinguish truthful correction from shame-filled falsehood. Confess what is genuinely wrong, make amends where possible, receive forgiveness in Christ and reject claims that your past makes repentance or growth impossible.",
            caution:"Do not label every criticism as spiritual attack. Some correction is necessary and loving. Test accusations honestly, seek wise counsel and never use this teaching to silence people reporting harm.",
            questions:["What is the difference between conviction that leads to repentance and destructive shame?","What does Romans 8:1 say about those who are in Christ?","Is there a wrong I need to confess or repair?"],
            prayer:"Merciful Father, help me receive Your truth. Give me courage to confess what is wrong, grace to accept forgiveness in Christ and wisdom to reject lies that keep me from faithful growth. Amen.",
            refs:["Romans 8:1-4","1 John 1:8-9","Revelation 12:10-11","Psalm 32:1-5"]
          },
          {
            title:"Forgiveness, reconciliation and freedom from bitterness",
            overview:"Forgiveness releases vengeance to God and refuses to let hatred rule the heart. Reconciliation, where safe and possible, involves truth, repentance and changed conduct; it does not require denying harm or restoring unsafe access.",
            context:"Ephesians 4:31–32 calls believers to put away bitterness and forgive as God forgave them in Christ. Romans 12:17–21 rejects revenge and calls Christians to overcome evil with good.",
            practice:"Name the hurt truthfully, pray for strength, set wise boundaries, seek pastoral or professional support when needed, and consider what repair or safe reconciliation could look like. Forgiveness can be a process rather than an instant feeling.",
            caution:"Forgiveness does not excuse abuse, remove legal accountability, or require a person to return to danger. Reconciliation requires safety and truth; boundaries can be appropriate and necessary.",
            questions:["What does forgiveness ask of me, and what does it not require?","What boundary would protect safety and dignity?","Is there a step toward truth, repair or support that I can take?"],
            prayer:"God of mercy, heal what has been wounded in me. Keep bitterness from ruling my heart, give me wisdom for healthy boundaries and lead me toward truth, justice and peace. Amen.",
            refs:["Ephesians 4:31-32","Colossians 3:12-15","Romans 12:17-21","Matthew 5:23-24"]
          },
          {
            title:"Persevering in prayer with humility and discernment",
            overview:"Persevering prayer is persistent dependence on God joined with humility, discernment and willingness to obey. It does not treat prayer as a way to control outcomes or judge another person's spirituality.",
            context:"Luke 18:1–8 teaches persistence through the parable of the persistent widow. Colossians 4:2 calls believers to continue in prayer with watchfulness and thanksgiving. Jesus' prayer in Gethsemane models honest desire joined with submission to the Father's will.",
            practice:"Keep a simple prayer record, revisit requests with gratitude, test impressions against Scripture and seek counsel from mature believers. Notice where prayer invites you to act, apologise, serve or wait.",
            caution:"Do not make promises about dates or guaranteed outcomes that Scripture does not make. Discernment is tested by Scripture, character, wise counsel and the fruit of love.",
            questions:["How does Jesus model honest yet humble prayer in Gethsemane?","What helps me remain thankful while waiting?","How can I test an impression rather than assume it is God's voice?"],
            prayer:"Father, teach me to pray faithfully without presumption. Give me patience, gratitude and discernment, and make me ready to obey what Your Word clearly teaches. Amen.",
            refs:["Luke 18:1-8","Colossians 4:2-4","Luke 22:39-46","1 John 4:1"]
          },
          {
            title:"The victory of Christ and the believer's hope",
            overview:"Christian hope rests on the death and resurrection of Jesus. The New Testament proclaims His victory over sin and death and calls believers to steadfast faith, compassionate living and hope in God's promised future.",
            context:"1 Corinthians 15:20–28 grounds resurrection hope in Christ as the firstfruits. Colossians 2:13–15 describes the triumph of the cross. Romans 8:31–39 assures believers that no created power can separate them from God's love in Christ.",
            practice:"Let resurrection hope shape courage, grief, service and perseverance. Encourage someone who is weary, continue in good work and remember that Christian victory is centred on Jesus rather than personal triumph over other people.",
            caution:"Do not promise that believers will avoid suffering or that every earthly circumstance will turn out as they wish. The New Testament hope is strong precisely because it looks beyond present suffering to God's faithfulness.",
            questions:["How does Christ's resurrection shape the meaning of victory?","What does Romans 8:31–39 say can separate believers from God's love?","How can hope change the way I serve someone today?"],
            prayer:"Risen Lord Jesus, anchor my hope in Your victory over sin and death. Keep me faithful in hardship, generous in love and confident in the future You have promised. Amen.",
            refs:["1 Corinthians 15:20-28","Colossians 2:13-15","Romans 8:31-39","1 Peter 1:3-9"]
          }
        ];
        const intro = element("p", "Choose one of the ten guided studies. Each topic opens a focused lesson with biblical context, practical application, reflection questions, a prayer and passages to read.");
        content.appendChild(intro);
        const lessonList = element("div", undefined, "zlw-lesson-list");
        lessons.forEach(lesson => {
          const details = element("details", undefined, "zlw-lesson");
          const summary = element("summary", lesson.title);
          details.appendChild(summary);
          const body = element("div", undefined, "zlw-lesson-body");
          [
            ["Study overview",lesson.overview],
            ["Biblical context",lesson.context],
            ["Put the Word into practice",lesson.practice],
            ["Read with discernment",lesson.caution]
          ].forEach(([heading,text]) => {
            body.appendChild(element("h4",heading));
            body.appendChild(element("p",text));
          });
          body.appendChild(element("h4","Reflect and respond"));
          const questions = element("ol");
          lesson.questions.forEach(question => questions.appendChild(element("li",question)));
          body.appendChild(questions);
          body.appendChild(element("h4","A prayerful response"));
          body.appendChild(element("p",lesson.prayer));
          body.appendChild(element("h4","Study the Scriptures"));
          const refs = element("div",undefined,"zlw-lesson-references");
          lesson.refs.forEach(reference => {
            const action = button("📖 " + reference, async () => {
              const match = reference.match(/^(.+?)\s+(\d+)(?::(\d+))?/);
              if (!match || typeof window.openChapter !== "function") return;
              const bookName = match[1] === "Psalm" ? "Psalms" : match[1];
              const chapter = Number(match[2]);
              const verse = Number(match[3] || 1);
              action.disabled = true;
              try {
                if (window.ZurielHomeNavigate) window.ZurielHomeNavigate("read");
                await window.openChapter(bookName,chapter);
                if (typeof window.selectBibleVerse === "function") window.selectBibleVerse(verse);
              } catch (error) {
                const status = content.querySelector(".zlw-status");
                if (status) status.textContent = "Could not open " + reference + ". Please find it in the Bible reader.";
              } finally { action.disabled = false; }
            });
            refs.appendChild(action);
          });
          body.appendChild(refs);
          details.appendChild(body);
          lessonList.appendChild(details);
        });
        content.appendChild(lessonList);
        const status = element("p","", "Every study is a guide for reading Scripture in context. Progress and personal notes remain separate from the Bible text.");
        status.className = "library-status zlw-status";
        content.appendChild(status);
      }

      if (page === "jesus") {
        content.appendChild(card(
          "❤️ The Words of Jesus",
          "A Scripture-led study centre for the recorded teachings of Jesus in the four Gospels. Choose a theme, compare Gospel passages, and open the actual Bible text."
        ));

        const teachings = [
          { category:"The Kingdom of God", title:"The good news of God's Kingdom", summary:"Jesus announces God's Kingdom and calls hearers to repent and believe the good news.", refs:["Mark 1:14","Matthew 4:17","Luke 4:43"] },
          { category:"Love and Relationships", title:"Love God and love your neighbour", summary:"Jesus places wholehearted love for God and practical love for neighbour at the centre of the commandments.", refs:["Matthew 22:37","Matthew 22:39","Mark 12:29"] },
          { category:"Love and Relationships", title:"Love one another", summary:"Jesus gives His disciples a new commandment to love one another in the pattern of His love.", refs:["John 13:34","John 15:12","John 15:17"] },
          { category:"Prayer and Trust", title:"How to pray", summary:"Jesus teaches sincerity before the Father and gives His disciples a pattern for prayer.", refs:["Matthew 6:6","Matthew 6:9","Luke 11:2"] },
          { category:"Prayer and Trust", title:"Ask, seek and knock", summary:"Jesus encourages persistent prayer and confidence in the Father's goodness.", refs:["Matthew 7:7","Luke 11:9","Luke 11:13"] },
          { category:"Prayer and Trust", title:"Do not be anxious", summary:"Jesus directs attention to the Father's care and calls His followers to seek God's Kingdom first.", refs:["Matthew 6:25","Matthew 6:33","Luke 12:22"] },
          { category:"Forgiveness and Mercy", title:"Forgive others", summary:"Jesus teaches His followers to forgive and warns against holding on to resentment.", refs:["Matthew 6:14","Matthew 18:21","Luke 6:37"] },
          { category:"Forgiveness and Mercy", title:"Mercy and compassion", summary:"Jesus calls His hearers to show mercy and compassion as they have received mercy.", refs:["Matthew 5:7","Luke 6:36","Matthew 9:13"] },
          { category:"Discipleship", title:"Count the cost of following Jesus", summary:"Jesus calls people to take up their cross, follow Him and value Him above every competing loyalty.", refs:["Luke 9:23","Luke 14:27","Matthew 16:24"] },
          { category:"Discipleship", title:"Continue in His word", summary:"Jesus describes true discipleship as remaining in His word and living in the freedom of truth.", refs:["John 8:31","John 8:32","John 15:7"] },
          { category:"Humility and Service", title:"The greatest becomes a servant", summary:"Jesus overturns worldly ideas of greatness and presents service as the pattern of His Kingdom.", refs:["Mark 10:43","Mark 10:45","Matthew 23:11"] },
          { category:"Humility and Service", title:"The example of washing feet", summary:"Jesus uses His act of service to teach His disciples humility and practical care for one another.", refs:["John 13:14","John 13:15","John 13:17"] },
          { category:"Faith and Courage", title:"Have faith in God", summary:"Jesus teaches His disciples to trust God and to pray with faith, humility and forgiveness.", refs:["Mark 11:22","Mark 11:24","Matthew 21:21"] },
          { category:"Faith and Courage", title:"Do not let your heart be troubled", summary:"Jesus comforts His disciples with a call to trust the Father and to trust Him.", refs:["John 14:1","John 14:2","John 14:27"] },
          { category:"The Holy Spirit", title:"The promised Helper", summary:"Jesus promises the Holy Spirit, who will remain with His disciples and teach them.", refs:["John 14:16","John 14:26","John 15:26"] },
          { category:"The Holy Spirit", title:"The Spirit of truth", summary:"Jesus explains the Spirit's work of guiding His followers into truth and glorifying Christ.", refs:["John 16:13","John 16:14","John 16:7"] },
          { category:"The Sermon on the Mount", title:"The Beatitudes", summary:"Jesus describes the character and hope of those who belong to the Kingdom of Heaven.", refs:["Matthew 5:3","Matthew 5:6","Matthew 5:9"] },
          { category:"The Sermon on the Mount", title:"Salt and light", summary:"Jesus calls His disciples to live visibly faithful lives that point others to the Father.", refs:["Matthew 5:13","Matthew 5:14","Matthew 5:16"] },
          { category:"The Sermon on the Mount", title:"Build on the rock", summary:"Jesus says that hearing His words must lead to putting them into practice.", refs:["Matthew 7:24","Matthew 7:25","Luke 6:47"] },
          { category:"The Cross and Resurrection", title:"The bread and the cup", summary:"At the Last Supper Jesus interprets the bread and cup in relation to His coming sacrifice and the new covenant.", refs:["Luke 22:19","Luke 22:20","Matthew 26:26"] },
          { category:"The Cross and Resurrection", title:"Jesus is the resurrection and the life", summary:"Jesus speaks of resurrection hope and identifies Himself as the source of life.", refs:["John 11:25","John 11:26","John 5:24"] },
          { category:"The Cross and Resurrection", title:"The promise of His return", summary:"Jesus comforts His disciples with the promise that He will receive them to Himself.", refs:["John 14:2","John 14:3","Matthew 24:30"] },
          { category:"Mission and Witness", title:"The Great Commission", summary:"The risen Jesus sends His disciples to make disciples among all nations and teach obedience to His commands.", refs:["Matthew 28:18","Matthew 28:19","Matthew 28:20"] },
          { category:"Mission and Witness", title:"You will be My witnesses", summary:"The risen Jesus commissions His followers to bear witness and promises the Father's power.", refs:["Luke 24:48","Luke 24:49","John 20:21"] },
          { category:"Prayer and Trust", title:"The Lord's Prayer", summary:"Jesus gives His disciples a pattern of prayer shaped by the Father's name, Kingdom, provision, forgiveness and deliverance.", refs:["Matthew 6:9","Matthew 6:11","Luke 11:2"] },
          { category:"Prayer and Trust", title:"The Father's good gifts", summary:"Jesus teaches that the Father gives good things to those who ask Him.", refs:["Matthew 7:11","Luke 11:13"] },
          { category:"Prayer and Trust", title:"Pray without losing heart", summary:"Jesus teaches persistence in prayer through the parable of the persistent widow.", refs:["Luke 18:1","Luke 18:7"] },
          { category:"The Sermon on the Mount", title:"The Golden Rule", summary:"Jesus calls His hearers to treat others as they would want to be treated.", refs:["Matthew 7:12","Luke 6:31"] },
          { category:"The Sermon on the Mount", title:"Do not judge hypocritically", summary:"Jesus warns against judging others while ignoring one's own faults.", refs:["Matthew 7:1","Matthew 7:3","Luke 6:37"] },
          { category:"The Sermon on the Mount", title:"Lay up treasure in heaven", summary:"Jesus teaches His followers to value heavenly treasure above earthly possessions.", refs:["Matthew 6:19","Matthew 6:20","Luke 12:33"] },
          { category:"The Sermon on the Mount", title:"The narrow way", summary:"Jesus describes the narrow gate and the difficult way that leads to life.", refs:["Matthew 7:13","Matthew 7:14"] },
          { category:"The Sermon on the Mount", title:"Let your light shine", summary:"Jesus calls His disciples to let their good works point others to the Father.", refs:["Matthew 5:14","Matthew 5:16"] },
          { category:"Forgiveness and Mercy", title:"Forgive from the heart", summary:"Jesus teaches generous forgiveness and warns against keeping account of another's debt.", refs:["Matthew 18:22","Matthew 18:35","Luke 17:4"] },
          { category:"Forgiveness and Mercy", title:"Be reconciled with your brother", summary:"Jesus teaches the urgency of seeking reconciliation rather than preserving resentment.", refs:["Matthew 5:23","Matthew 5:24"] },
          { category:"Humility and Service", title:"Welcome little children", summary:"Jesus welcomes children and teaches that the Kingdom must be received with childlike trust.", refs:["Matthew 19:14","Mark 10:14","Luke 18:16"] },
          { category:"Humility and Service", title:"The greatest commandment", summary:"Jesus identifies wholehearted love for God and love for neighbour as the heart of the commandments.", refs:["Matthew 22:37","Matthew 22:39","Mark 12:30"] },
          { category:"Discipleship", title:"Abide in the vine", summary:"Jesus teaches that lasting fruitfulness comes from remaining in Him.", refs:["John 15:4","John 15:5","John 15:7"] },
          { category:"Discipleship", title:"Take My yoke upon you", summary:"Jesus invites the weary to come to Him and learn His gentle and lowly way.", refs:["Matthew 11:28","Matthew 11:29","Matthew 11:30"] },
          { category:"Discipleship", title:"The cost of building and following", summary:"Jesus calls His followers to count the cost and make Him their highest loyalty.", refs:["Luke 14:28","Luke 14:33","Matthew 10:38"] },
          { category:"The Holy Spirit", title:"Born of the Spirit", summary:"Jesus explains the new birth and the work of the Spirit in bringing life.", refs:["John 3:3","John 3:5","John 3:6"] },
          { category:"The Holy Spirit", title:"Rivers of living water", summary:"Jesus promises living water to those who come to Him and believe.", refs:["John 7:37","John 7:38","John 7:39"] },
          { category:"The Cross and Resurrection", title:"The new commandment", summary:"Jesus commands His disciples to love one another as He has loved them.", refs:["John 13:34","John 13:35","John 15:12"] },
          { category:"The Cross and Resurrection", title:"Peace I leave with you", summary:"Jesus gives His disciples His peace and calls them not to be troubled or afraid.", refs:["John 14:27","John 16:33","John 20:21"] },
          { category:"The Cross and Resurrection", title:"The purpose of eternal life", summary:"Jesus describes eternal life as knowing the only true God and Jesus Christ whom He sent.", refs:["John 17:3","John 5:24"] },
          { category:"The Kingdom of God", title:"The parable of the sower", summary:"Jesus explains how people receive the word of the Kingdom in different ways.", refs:["Matthew 13:3","Matthew 13:18","Luke 8:11"] },
          { category:"The Kingdom of God", title:"The treasure hidden in a field", summary:"Jesus compares the Kingdom of Heaven to treasure worth giving everything to obtain.", refs:["Matthew 13:44","Matthew 13:45"] },
          { category:"The Kingdom of God", title:"The lost sheep", summary:"Jesus reveals the Father's concern for those who have wandered and need to be found.", refs:["Matthew 18:12","Matthew 18:13","Luke 15:4"] },
          { category:"The Kingdom of God", title:"The Good Samaritan", summary:"Jesus teaches neighbour-love through the compassion of a Samaritan toward a wounded man.", refs:["Luke 10:30","Luke 10:36","Luke 10:37"] },
          { category:"Mission and Witness", title:"Serve Christ by serving the least", summary:"Jesus identifies practical care for people in need with service rendered to Him.", refs:["Matthew 25:35","Matthew 25:40","Matthew 25:45"] },
          { category:"Mission and Witness", title:"Watch and be ready", summary:"Jesus calls His disciples to remain watchful and faithful as they await His return.", refs:["Matthew 24:42","Matthew 24:44","Mark 13:35"] },
          {category:"Love and Relationships",title:"Love your enemies",summary:"Jesus commands love for enemies, prayer for persecutors and generosity that reflects the Father's mercy.",refs:["Matthew 5:44","Luke 6:27","Luke 6:35"]},
          {category:"Prayer and Trust",title:"Give in secret",summary:"Jesus teaches that giving and prayer should be directed toward the Father rather than performed to win public praise.",refs:["Matthew 6:3","Matthew 6:4","Matthew 6:6"]},
          {category:"The Kingdom of God",title:"The rich fool",summary:"Jesus warns against storing up possessions while neglecting one's life before God.",refs:["Luke 12:16","Luke 12:20","Luke 12:21"]},
          {category:"Discipleship",title:"The rich young ruler",summary:"Jesus exposes the hold of wealth on a sincere questioner and calls him to follow with wholehearted trust.",refs:["Mark 10:21","Matthew 19:21","Luke 18:22"]},
          {category:"The Kingdom of God",title:"The Good Shepherd",summary:"Jesus identifies Himself as the Good Shepherd who knows His sheep and lays down His life for them.",refs:["John 10:11","John 10:14","John 10:27"]},
          {category:"Forgiveness and Mercy",title:"The lost son",summary:"Jesus portrays the Father's compassion toward the returning son and challenges resentment through the elder brother's response.",refs:["Luke 15:20","Luke 15:24","Luke 15:32"]},
          {category:"The Kingdom of God",title:"The mustard seed",summary:"Jesus compares the Kingdom to a small seed that grows into something unexpectedly large, illustrating its surprising growth.",refs:["Matthew 13:31","Matthew 13:32","Luke 13:18"]},
          {category:"The Kingdom of God",title:"The pearl of great price",summary:"Jesus teaches that the Kingdom is worth more than every lesser treasure and calls for wholehearted response.",refs:["Matthew 13:45","Matthew 13:46"]},
          {category:"Faith and Courage",title:"The wise and foolish virgins",summary:"Jesus calls His disciples to watchfulness and readiness because the timing of His return is not known.",refs:["Matthew 25:1","Matthew 25:10","Matthew 25:13"]},
          {category:"Mission and Witness",title:"The talents entrusted",summary:"Jesus teaches accountability and faithful stewardship through a parable about servants entrusted with their master's resources.",refs:["Matthew 25:14","Matthew 25:21","Matthew 25:29"]}
        ];

        const search = element("input");
        search.type = "search";
        search.placeholder = "Search a teaching, theme or Scripture reference…";
        search.setAttribute("aria-label", "Search the recorded teachings of Jesus");
        const filter = element("select");
        filter.setAttribute("aria-label", "Filter teachings by theme");
        const allOption = element("option", "All themes");
        allOption.value = "";
        filter.appendChild(allOption);
        [...new Set(teachings.map(item => item.category))].forEach(category => {
          const option = element("option", category);
          option.value = category;
          filter.appendChild(option);
        });
        const results = element("div");
        results.id = "zurielJesusTeachingResults";
        results.setAttribute("aria-live", "polite");
        const count = element("p", "", "library-status");
        const note = element("p", "References open in the Bible reader. Read the surrounding passage to understand each teaching in its original setting.", "study-hint");
        content.append(search, filter, count, note, results);

        function findJesusVerse(verseNumber) {
          const verses = document.querySelectorAll("#message .verse");
          for (const verse of verses) {
            const label = verse.querySelector("strong");
            if (label && label.textContent.trim().replace(/\.$/, "") === String(verseNumber)) {
              return verse;
            }
          }
          return null;
        }

        function openJesusReference(reference, actionButton) {
          const match = String(reference || "").match(/^(.+?)\s+(\d+):(\d+)$/);
          if (!match) {
            count.textContent = "This Scripture reference is not in a recognised format.";
            return;
          }
          if (typeof window.openChapter !== "function") {
            count.textContent = "The Bible reader is not ready yet. Please try again.";
            return;
          }
          const book = match[1], chapter = Number(match[2]), verseNumber = Number(match[3]);
          actionButton.disabled = true;
          count.textContent = "Opening " + reference + " in the Bible reader…";
          window.openChapter(book, chapter).then(function () {
            if (typeof window.selectBibleVerse !== "function" ||
                !window.selectBibleVerse(verseNumber)) {
              throw new Error("The referenced teaching verse could not be activated.");
            }
            actionButton.disabled = false;
            count.textContent = "Opened " + reference + " in the Bible reader.";
          }).catch(function (error) {
            actionButton.disabled = false;
            const detail = error && error.message ? error.message : "Please try again.";
            count.textContent = "Could not open " + reference + ": " + detail;
          });
        }

        function renderJesusTeachings() {
          results.replaceChildren();
          const query = search.value.trim().toLowerCase();
          const selectedCategory = filter.value;
          const matches = teachings.filter(item =>
            (!selectedCategory || item.category === selectedCategory) &&
            (!query || (item.category + " " + item.title + " " + item.summary + " " + item.refs.join(" ")).toLowerCase().includes(query))
          );
          count.textContent = matches.length + " teaching themes • " + matches.reduce((sum, item) => sum + item.refs.length, 0) + " Gospel reference links";
          if (!matches.length) {
            results.appendChild(element("p", "No matching teaching found. Try another word or choose All themes."));
            return;
          }
          matches.forEach(function (item) {
            const box = element("article", undefined, "library-entry");
            box.appendChild(element("small", item.category));
            const details = element("details", undefined, "zuriel-jesus-details");
            const summary = element("summary", item.title);
            summary.setAttribute("aria-label", "Expand teaching: " + item.title);
            details.appendChild(summary);
            details.appendChild(element("p", item.summary));
            const refs = element("div", undefined, "library-nav");
            item.refs.forEach(function (reference) {
              const open = button("Open " + reference, function () { openJesusReference(reference, open); });
              open.className = "study-secondary";
              refs.appendChild(open);
            });
            details.appendChild(refs);
            details.appendChild(button("Save teaching to My Library", function () {
              saved = loadSaved();
              const title = "Words of Jesus — " + item.title;
              const exists = saved.bookmarks.some(entry => entry && entry.title === title);
              if (!exists) {
                saved.bookmarks.push({
                  title: title,
                  text: item.summary + "\n\nGospel references: " + item.refs.join("; "),
                  reference: item.refs[0]
                });
              }
              if (persist()) count.textContent = exists
                ? "Already saved: " + item.title + ". " + matches.length + " teaching themes shown."
                : "Saved: " + item.title + ". " + matches.length + " teaching themes shown.";
            }));
            box.appendChild(details);
            results.appendChild(box);
          });
        }
        search.addEventListener("input", renderJesusTeachings);
        filter.addEventListener("change", renderJesusTeachings);
        renderJesusTeachings();
      }

      if (page === "saved") {
        // Refresh shared records whenever this page opens so verse-study
        // notes and bookmarks saved by the Study Centre appear immediately.
        saved = loadSaved();
        content.appendChild(card(
          "My Saved Library",
          "Your bookmarked Scriptures, verse notes, highlights and saved declarations."
        ));

        const verseNotes = readLocalRecords("zuriel-verse-study-notes-v1");
        const verseHighlights = readLocalRecords("zuriel-word-highlights-v1");
        const bookmarkCount = saved.bookmarks.length;
        const prayerCount = saved.prayers.length;
        const personalNotes = Array.isArray(saved.notes) ? saved.notes : [];
        const noteEntries = Object.entries(verseNotes).filter(function (entry) {
          const value = entry[1] || {};
          return value.title || value.note || value.application;
        });
        const highlightEntries = Object.entries(verseHighlights).filter(function (entry) {
          const value = entry[1] || {};
          return value.verseColor || Object.keys(value.words || {}).length;
        });

        const summary = element("p",
          bookmarkCount + " saved items • " + noteEntries.length +
          " verse studies • " + highlightEntries.length + " highlighted verses • " +
          prayerCount + " prayer records • " + personalNotes.length + " personal notes",
          "library-status");
        content.appendChild(summary);

        function openReference(reference) {
          const match = String(reference || "").trim().match(/^(.+?)\s+(\d+)(?::(\d+))?(?:[-–]\d+)?$/);
          if (!match || typeof window.openChapter !== "function") return;
          const bookName = match[1] === "Psalm" ? "Psalms" : match[1];
          window.openChapter(bookName, Number(match[2])).then(function () {
            if (match[3] && (typeof window.selectBibleVerse !== "function" ||
                !window.selectBibleVerse(Number(match[3])))) {
              throw new Error("The referenced verse could not be activated in the Bible reader.");
            }
          }).catch(function (error) {
            console.error("Zuriel saved Scripture:", error);
          });
        }

        content.appendChild(element("h3", "🔖 Bookmarked Scriptures and Declarations"));
        if (!saved.bookmarks.length) {
          content.appendChild(element("p", "No bookmarks yet. Save a verse or declaration to keep it here."));
        }
        saved.bookmarks.slice().reverse().forEach(function (item) {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("h4", item.title || "Saved item"));
          if (item.reference) {
            box.appendChild(element("strong", item.reference));
            box.appendChild(button("Open Scripture", () => openReference(item.reference)));
          }
          box.appendChild(element("p", item.text || ""));
          content.appendChild(box);
        });

        content.appendChild(element("h3", "📝 Verse Study Notes"));
        if (!noteEntries.length) content.appendChild(element("p", "Your verse-specific study notes will appear here after you save them in the Study Centre."));
        noteEntries.slice().reverse().forEach(function (entry) {
          const box = element("div", undefined, "library-entry");
          const parts = entry[0].split("|");
          const reference = parts[0] + " " + parts[1] + ":" + parts[2];
          const record = entry[1] || {};
          box.appendChild(element("h4", record.title || reference));
          box.appendChild(element("strong", reference));
          if (record.note) box.appendChild(element("p", record.note));
          if (record.application) box.appendChild(element("p", "Application: " + record.application));
          box.appendChild(button("Open This Verse", () => openReference(reference)));
          content.appendChild(box);
        });

        content.appendChild(element("h3", "🗒️ Personal Bible Study Notes"));
        if (!personalNotes.length) {
          content.appendChild(element("p", "Your saved personal study notes will appear here."));
        }
        personalNotes.slice().reverse().forEach(function (item) {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("h4", item.title || "Bible Study Note"));
          if (item.reference) {
            box.appendChild(element("strong", item.reference));
            box.appendChild(button("Open Scripture", () => openReference(item.reference)));
          }
          box.appendChild(element("small", item.date || "Saved note"));
          box.appendChild(element("p", item.text || ""));
          content.appendChild(box);
        });

        content.appendChild(element("h3", "🎨 Highlighted Scriptures"));
        if (!highlightEntries.length) content.appendChild(element("p", "Your highlighted verses will appear here."));
        highlightEntries.slice().reverse().forEach(function (entry) {
          const box = element("div", undefined, "library-entry");
          const parts = entry[0].split("|");
          const reference = parts[0] + " " + parts[1] + ":" + parts[2];
          const record = entry[1] || {};
          const wordCount = Object.keys(record.words || {}).length;
          box.appendChild(element("h4", reference));
          box.appendChild(element("p", record.verseColor ? "Whole verse highlighted" : wordCount + " word(s) highlighted"));
          box.appendChild(button("Read Highlighted Verse", () => openReference(reference)));
          content.appendChild(box);
        });
        content.appendChild(element("h3", "🙏 My Prayer Journal Records"));
        if (!saved.prayers.length) {
          content.appendChild(element("p", "Your saved prayers and testimonies will appear here."));
        }
        saved.prayers.slice().reverse().forEach(function (item) {
          const box = element("div", undefined, "library-entry");
          if (item.title) box.appendChild(element("h4", item.title));
          if (item.category) box.appendChild(element("small", item.category.replace(/-/g, " ")));
          if (item.reference) box.appendChild(element("strong", item.reference));
          box.appendChild(element("small", item.date || "Saved entry"));
          box.appendChild(element("p", item.text || ""));
          content.appendChild(box);
        });
      }

      content.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    const libraryGroups = [
      { title: "📖 Bible Study & Reference", pages: ["study","references","plans"] },
      { title: "🕊️ Devotion & Worship", pages: ["devotional","worship","prayer"] },
      { title: "✨ Faith & Spiritual Growth", pages: ["affirmation","declarations","warfare","jesus","names"] },
      { title: "🗂️ My Personal Library", pages: ["saved","notes"] }
    ];
    libraryGroups.forEach(function(group) {
      const drawer = element("details", undefined, "zuriel-library-drawer");
      const summary = element("summary", group.title);
      summary.setAttribute("aria-label", "Open " + group.title);
      drawer.appendChild(summary);
      const items = element("div", undefined, "zuriel-library-drawer-items");
      group.pages.forEach(function(page) {
        const pageInfo = pages.find(item => item[0] === page);
        if (!pageInfo) return;
        const open = button(pageInfo[1], function() {
          openPage(page);
          nav.querySelectorAll(".zuriel-library-drawer").forEach(function(other) {
            if (other !== drawer) other.open = false;
          });
        });
        open.className = "zuriel-library-drawer-link";
        items.appendChild(open);
      });
      drawer.appendChild(items);
      nav.appendChild(drawer);
    });

    heading.appendChild(nav);
    root.appendChild(heading);
    root.appendChild(content);

    main.appendChild(root);

    // Make library sections accessible to the Home dashboard.
    window.ZurielLibrary = {
      open: function (page) {
        const validPage = pages.some(item => item[0] === page);
        openPage(validPage ? page : "study");
      },

      openPersonal: function () {
        openPage("saved");
      },

      openPrayer: function () {
        openPage("prayer");
      },

      savePrayer: function (text, reference, title) {
        const prayerText = String(text || "").trim();
        if (!prayerText) return false;
        saved = loadSaved();
        saved.prayers.push({
          title: String(title || "The Light — Scripture response").trim(),
          category: "prayer",
          text: prayerText,
          reference: String(reference || "").trim(),
          date: new Date().toLocaleDateString()
        });
        return persist();
      },

      openGloryVerse: function (reference, scriptureText, translation, faithResponse) {
        // Reader actions can launch the studio while another primary section is active.
        // Reveal Library first, then render the requested Glory Verse page.
        if (window.ZurielHomeNavigate) window.ZurielHomeNavigate("library");
        openPage("affirmation");
        const studio = document.getElementById("zurielGloryStudio");
        if (!studio) return false;
        const referenceField = studio.querySelector("#zgsReference");
        const scriptureField = studio.querySelector("#zgsScripture");
        referenceField.value = String(reference || "").trim();
        scriptureField.value = String(scriptureText || "").trim();
        const responseFields = {
          prayer: "#zgsPrayer",
          declaration: "#zgsDeclaration",
          affirmation: "#zgsAffirmation",
          confession: "#zgsConfession",
          inspiration: "#zgsInspiration"
        };
        Object.keys(responseFields).forEach(function(key) {
          const field = studio.querySelector(responseFields[key]);
          if (field) field.value = faithResponse && faithResponse[key]
            ? String(faithResponse[key]).trim() : "";
        });
        [referenceField, scriptureField].concat(
          Object.values(responseFields).map(selector => studio.querySelector(selector)).filter(Boolean)
        ).forEach(function(field) {
          field.dispatchEvent(new Event("input", { bubbles: true }));
        });
        const status = studio.querySelector("#zgsStatus");
        if (status) {
          status.textContent = "Connected from your Bible reader: " +
            referenceField.value + (translation ? " • " + translation : "") +
            ". Your exact Scripture text has been carried into the open-book card.";
        }
        studio.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      },

      openSaved: function () {
        openPage("saved");
      }
    };

    openPage("study");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addLibrary);
  } else {
    addLibrary();
  }

})();

