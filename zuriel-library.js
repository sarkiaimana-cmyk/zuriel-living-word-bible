
/* =====================================================
   ZURIEL LIVING WORD BIBLE
   COMPLETE STUDY & SPIRITUAL GROWTH LIBRARY
   His Words... My Life... My Victory.
   ===================================================== */

(function () {
  "use strict";

  const STORAGE_KEY = "zuriel_personal_library_v1";

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
      { name: "YHWH — The LORD", meaning: "God's covenant name, commonly represented as LORD in many English Bible translations.", reference: "Exodus 3:15", study: "Numbers 6:24–26 records a priestly blessing asking for God's protection, gracious presence and peace. Consider whom you can encourage with a Scripture-shaped blessing." },
      { name: "I AM WHO I AM", meaning: "God reveals Himself as the self-existent One who sends Moses.", reference: "Exodus 3:14" },
      { name: "El Shaddai", meaning: "God Almighty; the title is used when God confirms His covenant promise to Abram.", reference: "Genesis 17:1" },
      { name: "El Elyon", meaning: "God Most High; the title declares God's supreme authority.", reference: "Genesis 14:18–20" },
      { name: "El Roi", meaning: "The God who sees me; Hagar uses this title after God meets her in the wilderness.", reference: "Genesis 16:13" },
      { name: "Jehovah Jireh", meaning: "The LORD will provide; the name is connected with God's provision on the mountain.", reference: "Genesis 22:14" },
      { name: "Jehovah Rapha", meaning: "The LORD who heals; revealed in the covenant setting at Marah.", reference: "Exodus 15:26" },
      { name: "Jehovah Nissi", meaning: "The LORD is my banner; Moses names the altar after God's help in battle.", reference: "Exodus 17:15" },
      { name: "Jehovah Shalom", meaning: "The LORD is peace; Gideon builds an altar with this name after receiving God's reassurance.", reference: "Judges 6:24" },
      { name: "The LORD Our Righteousness", meaning: "A prophetic title pointing to the righteous King God promises to raise up.", reference: "Jeremiah 23:6" },
      { name: "The LORD Is There", meaning: "The closing name in Ezekiel's vision of the restored city.", reference: "Ezekiel 48:35" },
      { name: "The LORD My Shepherd", meaning: "David describes the LORD's care, guidance and protection through the picture of a shepherd.", reference: "Psalm 23:1" },
      { name: "Abba, Father", meaning: "A relational title used in the New Testament to express the believer's adopted relationship with God.", reference: "Romans 8:15" },
      { name: "Ancient of Days", meaning: "Daniel's vision uses this title to portray God's eternal rule and righteous judgement.", reference: "Daniel 7:9–10" },
      { name: "King of Kings and Lord of Lords", meaning: "A royal title declaring the supreme authority of Christ.", reference: "Revelation 19:16" }
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

      #zurielLibrary .library-status {
        font-weight: bold;
        color: #24634a;
      }

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

      if (page === "study") {
        content.appendChild(card(
          "Deep Bible Study",
          "Explore Scripture through reliable study resources."
        ));

        originalLibrary.studyTopics.forEach(topic => {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("h4", topic));
          box.appendChild(element(
            "p",
            "Study resource section. Verified source material and licensed content will be connected here."
          ));
          content.appendChild(box);
        });
      }

      if (page === "devotional") {
        content.appendChild(card(
          "The Light Glory Devotional",
          "A collection of 30 Scripture-led reflections, each with a short message and prayer."
        ));

        originalLibrary.devotionals.forEach(item => {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("h4", item.title));
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
            #zurielGloryPreview {
              --zgs-paper:#f8f0dc;--zgs-ink:#28354a;--zgs-accent:#b68a38;
              position:relative;overflow:hidden;padding:23px 19px;margin:8px 0;
              border-radius:15px;color:var(--zgs-ink);
              background:linear-gradient(90deg,#e8dcc2 0%,var(--zgs-paper) 8%,#fffaf0 48%,#e8dcc2 50%,#fffaf0 54%,var(--zgs-paper) 92%,#e8dcc2 100%);
              border:1px solid #c5b48d;box-shadow:0 8px 22px #101d3025;
            }
            #zurielGloryStudio[data-finish="navy"] #zurielGloryPreview {--zgs-paper:#172b49;--zgs-ink:#f6f0df;--zgs-accent:#e7c77d;background:linear-gradient(90deg,#0c1a30,#1b3151 48%,#0d1d35 50%,#1b3151);}
            #zurielGloryStudio[data-finish="forest"] #zurielGloryPreview {--zgs-paper:#e9f0e5;--zgs-ink:#183a30;--zgs-accent:#39765b;background:linear-gradient(90deg,#d4e1d5,#f2f6ec 48%,#d7e3d8 50%,#f2f6ec);}
            #zurielGloryStudio[data-finish="parchment"] #zurielGloryPreview {--zgs-paper:#f0dfbd;--zgs-ink:#4a3520;--zgs-accent:#9a682b;background:repeating-linear-gradient(0deg,#f2e5ca,#f2e5ca 3px,#eddfc2 4px);}
            #zurielGloryPreview {background-image:linear-gradient(180deg,#10243a35,#10243a55),var(--zgs-wallpaper-image,none);background-size:cover;background-position:center;background-repeat:no-repeat;}
            #zurielGloryPreview:after {content:"";position:absolute;top:0;bottom:0;left:50%;width:1px;background:#9a835333;box-shadow:0 0 15px #5b472333;pointer-events:none;}
            #zurielGloryPreview .zgs-brand {font-size:15px;letter-spacing:1px;text-align:center;color:var(--zgs-accent);font-weight:800;font-family:Georgia,serif;position:relative;z-index:1;}
            #zurielGloryPreview h3 {text-align:center;color:var(--zgs-ink);font-family:Georgia,serif;font-size:20px;margin:9px 0 15px;position:relative;z-index:1;}
            #zurielGloryPreview .zgs-book-spread {display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px;position:relative;z-index:1;}
            #zurielGloryPreview .zgs-page {min-width:0;padding:8px 5px;}
            #zurielGloryPreview .zgs-page-title {font:700 10px/1.4 Arial,sans-serif;letter-spacing:1px;text-align:center;color:var(--zgs-accent);margin:3px 0 12px;}
            #zurielGloryPreview .zgs-ref {text-align:center;font-weight:800;color:var(--zgs-accent);font-size:13px;}
            #zurielGloryPreview .zgs-copy {white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.48;margin:9px 0;font-family:Georgia,serif;font-size:14px;}
            #zurielGloryPreview .zgs-active-copy {min-height:105px;font-weight:700;}
            #zurielGloryPreview .zgs-footer {text-align:center;font-size:10px;letter-spacing:1px;margin-top:17px;color:var(--zgs-accent);font-weight:800;position:relative;z-index:1;}
            #zurielGloryStudio .zgs-tabs {display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:5px;}
            #zurielGloryStudio .zgs-tabs button {font-size:11px;line-height:1.25;padding:7px 3px;background:#19324f;color:#fff;}
            #zurielGloryStudio .zgs-tabs button[aria-pressed="true"] {background:#b28b45;color:#172b49;outline:2px solid #e5d2a6;}
            #zurielGloryStudio .zgs-typography-controls {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:10px;border:1px solid #d7c79f;border-radius:10px;background:#f5f1e7;}
            #zurielGloryStudio .zgs-typography-controls label {display:grid;gap:5px;color:#19324f;font-size:11px;}
            #zurielGloryStudio .zgs-typography-controls select {width:100%;min-width:0;padding:8px;border:1px solid #c8b98e;border-radius:7px;background:#fff;color:#203047;font:inherit;}
            #zurielGloryStudio[data-layout="stacked"] #zurielGloryPreview .zgs-book-spread {grid-template-columns:minmax(0,1fr);gap:8px;}
            #zurielGloryStudio[data-layout="stacked"] #zurielGloryPreview:after {display:none;}
            #zurielGloryStudio[data-layout="stacked"] #zurielGloryPreview .zgs-page {padding:8px 4px;border-bottom:1px solid color-mix(in srgb,var(--zgs-accent) 35%,transparent);}
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
            @media(max-width:420px){#zurielGloryPreview{padding:16px 10px}#zurielGloryPreview h3{font-size:16px}#zurielGloryPreview .zgs-book-spread{gap:12px}#zurielGloryPreview .zgs-page{padding:6px 2px}#zurielGloryPreview .zgs-copy{font-size:12px}#zurielGloryPreview .zgs-page-title{font-size:9px}#zurielGloryStudio .zgs-tabs button{font-size:10px;min-height:42px}}
          `;
          root.appendChild(studioStyle);
        }

        const studio = element("section", undefined, "card");
        studio.id = "zurielGloryStudio";
        studio.dataset.finish = "ivory";
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
            <button type="button" data-finish="ivory">Warm ivory</button><button type="button" data-finish="navy">Kingdom navy</button><button type="button" data-finish="forest">Living forest</button><button type="button" data-finish="parchment">Parchment</button>
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
            if (!activeWallpaperImage) throw new Error("Please wait for the selected wallpaper to finish loading before exporting your card.");
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
            if (exportButton.id === "zgsShareImage" && navigator.canShare && navigator.canShare({files:[file]}) && navigator.share) {
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
            if (error.name !== "AbortError") status.textContent = error.message || "Image export could not be completed on this device.";
          } finally {
            exportButton.disabled = false;
          }
        }));
        studio.querySelector("#zgsShare").addEventListener("click",async function(){
          const textValue=["The Light 🕯️","His Words.. My life.. My Victory",studio.querySelector("#zgsReference").value,studio.querySelector("#zgsScripture").value,...["Prayer","Declaration","Affirmation","Confession","Inspiration"].map(name=>name.toUpperCase()+": "+studio.querySelector("#zgs"+name).value),"Zuriel Living Word Bible"].filter(Boolean).join("\n\n");
          if(!studio.querySelector("#zgsReference").value.trim()||!studio.querySelector("#zgsScripture").value.trim()){studio.querySelector("#zgsStatus").textContent="Add the Scripture reference and text before sharing.";return;}
          try{
            if(navigator.share) await navigator.share({title:"Glory Verse Affirmation",text:textValue});
            else if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(textValue);studio.querySelector("#zgsStatus").textContent="Card text copied. You can paste it into your sharing app.";}
            else {studio.querySelector("#zgsStatus").textContent="Sharing is not available in this browser. You can select and copy the preview text.";}
          }catch(error){if(error.name!=="AbortError")studio.querySelector("#zgsStatus").textContent="Sharing could not be completed on this device.";}
        });
        updatePreview();

        originalLibrary.affirmations.forEach(item => {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("p", item));
          box.appendChild(button("Save declaration", function () {
            saved.bookmarks.push({title:"Glory Verse Affirmation",text:item});
            persist();
            alert("Saved to your personal library.");
          }));
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
          content.appendChild(box);
        });
      }

      if (page === "worship") {
        content.appendChild(card(
          "🎶 SS&S — Songs, Hymns & Worship",
          "A complete worship-study library: every entry opens into its biblical foundation, explanation, reflection, prayer and practical worship response. Full lyrics are included only when they are verified as public domain or supplied under an appropriate licence."
        ));

        const collections = ["All Songs", "Traditional Hymn", "Gospel Hymn", "Modern Hymn", "Praise & Chorus", "Scripture Song", "Contemporary Worship"];
        const filterRow = element("div", undefined, "library-nav");
        const list = element("div");

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
          list.replaceChildren();
          const items = originalLibrary.worshipSongs.filter(function (song) {
            return collection === "All Songs" || song.collection === collection;
          });
          items.forEach(function (song) {
            const box = element("article", undefined, "library-entry worship-song-entry");
            box.appendChild(element("small", song.collection));
            box.appendChild(element("h4", song.title));
            box.appendChild(element("p", song.theme));
            box.appendChild(element("strong", "Scripture: " + song.reference));
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
          if (!items.length) list.appendChild(element("p", "No songs in this collection yet."));
        }
        collections.forEach(function (collection) {
          filterRow.appendChild(button(collection, function () {
            renderSongs(collection);
          }));
        });
        content.appendChild(filterRow);
        content.appendChild(list);
        renderSongs("All Songs");
      }

      if (page === "prayer") {
        content.appendChild(card(
          "My Prayer Journal",
          "Write your prayers, thanksgiving and testimonies."
        ));

        const area = element("textarea");
        area.placeholder = "Write your prayer here...";

        content.appendChild(area);

        content.appendChild(button("Save Prayer", function () {
          if (!area.value.trim()) return;

          saved.prayers.push({
            text: area.value.trim(),
            date: new Date().toLocaleDateString()
          });

          if (persist()) {
            area.value = "";
            openPage("prayer");
          }
        }));

        content.appendChild(element("h3", "My Prayer Records"));

        saved.prayers.forEach(item => {
          const box = element("div", undefined, "library-entry");
          if (item.title) box.appendChild(element("h4", item.title));
          if (item.reference) box.appendChild(element("strong", item.reference));
          box.appendChild(element("small", item.date));
          box.appendChild(element("p", item.text));
          content.appendChild(box);
        });
      }

      if (page === "notes") {
        content.appendChild(card(
          "Personal Bible Study Notes",
          "Record your understanding, discoveries and reflections."
        ));

        const title = element("input");
        title.placeholder = "Note title";

        const area = element("textarea");
        area.placeholder = "Write your study notes...";

        content.appendChild(title);
        content.appendChild(area);

        content.appendChild(button("Save Study Note", function () {
          if (!area.value.trim()) return;

          saved.notes.push({
            title: title.value.trim() || "Bible Study Note",
            text: area.value.trim(),
            date: new Date().toLocaleDateString()
          });

          if (persist()) {
            openPage("notes");
          }
        }));

        saved.notes.forEach(item => {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("h4", item.title));
          box.appendChild(element("small", item.date));
          box.appendChild(element("p", item.text));
          content.appendChild(box);
        });
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
          "Grow in biblical understanding of faith, prayer and the believer's identity in Christ."
        ));

        originalLibrary.spiritualWarfare.forEach(item => {
          content.appendChild(element("p", "• " + item, "library-entry"));
        });
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
          { category:"Mission and Witness", title:"You will be My witnesses", summary:"Jesus prepares His followers to bear witness in the power of the Holy Spirit.", refs:["Acts 1:8","Luke 24:48","John 20:21"] }
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
          prayerCount + " prayer records",
          "library-status");
        content.appendChild(summary);

        function openReference(reference) {
          const match = String(reference || "").match(/^(.+?)\s+(\d+):(\d+)$/);
          if (!match || typeof window.openChapter !== "function") return;
          window.openChapter(match[1], Number(match[2])).then(function () {
            if (typeof window.selectBibleVerse !== "function" ||
                !window.selectBibleVerse(Number(match[3]))) {
              throw new Error("The bookmarked verse could not be activated in the Bible reader.");
            }
          }).catch(function (error) {
            console.error("Zuriel bookmarked Scripture:", error);
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
          box.appendChild(element("small", item.date || "Saved prayer"));
          box.appendChild(element("p", item.text || ""));
          content.appendChild(box);
        });
      }

      content.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    pages.forEach(([page, label]) => {
      nav.appendChild(button(label, () => openPage(page)));
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
          text: prayerText,
          reference: String(reference || "").trim(),
          date: new Date().toLocaleDateString()
        });
        return persist();
      },

      openGloryVerse: function (reference, scriptureText, translation, faithResponse) {
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
          if (field && faithResponse && faithResponse[key]) {
            field.value = String(faithResponse[key]).trim();
          }
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

