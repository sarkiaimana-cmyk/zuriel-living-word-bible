
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
      { title: "The Lord Is My Shepherd", verse: "Psalm 23:1–3", message: "The Shepherd cares for His people and leads them in paths of righteousness.", prayer: "Good Shepherd, lead me, restore my soul and keep my steps in Your ways." },
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
      { title: "Amazing Grace", collection: "Traditional Hymn", theme: "Grace, redemption and the transforming mercy of God", reference: "Ephesians 2:8–9", note: "A classic hymn reflecting on salvation as God's gracious gift." },
      { title: "Holy, Holy, Holy", collection: "Traditional Hymn", theme: "The holiness and majesty of the Triune God", reference: "Isaiah 6:3; Revelation 4:8", note: "A reverent hymn of adoration centred on God's holiness." },
      { title: "It Is Well with My Soul", collection: "Traditional Hymn", theme: "Peace and trust in Christ through every trial", reference: "Philippians 4:7", note: "A testimony of faith and peace in the midst of hardship." },
      { title: "Blessed Assurance", collection: "Traditional Hymn", theme: "Confidence in belonging to Jesus", reference: "1 John 5:11–13", note: "A joyful declaration of assurance and hope in Christ." },
      { title: "What a Friend We Have in Jesus", collection: "Traditional Hymn", theme: "Prayer, friendship with Christ and casting cares on God", reference: "1 Peter 5:7", note: "An invitation to bring every burden to the Lord in prayer." },
      { title: "Great Is Thy Faithfulness", collection: "Traditional Hymn", theme: "God's steadfast mercy and faithfulness", reference: "Lamentations 3:22–23", note: "A hymn of gratitude for God's unfailing compassion." },
      { title: "To God Be the Glory", collection: "Traditional Hymn", theme: "Praise for God's saving work", reference: "Psalm 115:1", note: "A celebration that gives honour to God for His mighty works." },
      { title: "Rock of Ages", collection: "Traditional Hymn", theme: "Christ as refuge and the sufficiency of His grace", reference: "1 Corinthians 10:4", note: "A prayerful confession of dependence on the Lord." },
      { title: "Be Thou My Vision", collection: "Traditional Hymn", theme: "Wholehearted devotion and God's guidance", reference: "Colossians 3:1–2", note: "A prayer for God to shape our vision, desires and daily life." },
      { title: "Guide Me, O Thou Great Jehovah", collection: "Traditional Hymn", theme: "God's guidance and sustaining provision", reference: "Exodus 13:21–22", note: "A pilgrimage hymn about trusting God through the wilderness." },
      { title: "All Hail the Power of Jesus' Name", collection: "Traditional Hymn", theme: "The lordship and honour of Jesus", reference: "Philippians 2:9–11", note: "A triumphant call to honour the name of Jesus." },
      { title: "How Great Thou Art", collection: "Traditional Hymn", theme: "Wonder at God's creation and redemption", reference: "Psalm 8:1–4", note: "A song of awe at the greatness of God." },
      { title: "Because He Lives", collection: "Gospel Hymn", theme: "Resurrection hope and courage for tomorrow", reference: "1 Corinthians 15:20–22", note: "A declaration of hope grounded in the resurrection of Jesus." },
      { title: "Trust and Obey", collection: "Gospel Hymn", theme: "Faith expressed through obedience", reference: "John 14:23", note: "A reminder that trusting Christ shapes the way we live." },
      { title: "There Is Power in the Blood", collection: "Gospel Hymn", theme: "Redemption through the blood of Jesus", reference: "Ephesians 1:7", note: "A joyful celebration of the redemption found in Christ." },
      { title: "Victory in Jesus", collection: "Gospel Hymn", theme: "The victory and salvation Christ gives", reference: "1 Corinthians 15:57", note: "A testimony of the victory believers receive through Jesus." },
      { title: "I Know Whom I Have Believed", collection: "Gospel Hymn", theme: "Confidence in Christ and His keeping power", reference: "2 Timothy 1:12", note: "A confession of trust in the One who is faithful." },
      { title: "When We All Get to Heaven", collection: "Gospel Hymn", theme: "The hope of Christ's coming and eternal joy", reference: "1 Thessalonians 4:16–18", note: "A song that looks toward the promised gathering with the Lord." },
      { title: "10,000 Reasons (Bless the Lord)", collection: "Contemporary Worship", theme: "Thanksgiving and wholehearted praise", reference: "Psalm 103:1–5", note: "A modern worship song inspired by the call to bless the Lord." },
      { title: "What a Beautiful Name", collection: "Contemporary Worship", theme: "The name, victory and supremacy of Jesus", reference: "Philippians 2:9–11", note: "A Christ-centred song celebrating the name above every name." },
      { title: "Way Maker", collection: "Contemporary Worship", theme: "God's faithfulness, presence and power", reference: "Isaiah 43:19", note: "A declaration of trust in God's ability to lead and act." },
      { title: "Goodness of God", collection: "Contemporary Worship", theme: "Remembering God's goodness and faithfulness", reference: "Psalm 23:6", note: "A personal response of gratitude for God's enduring goodness." },
      { title: "Great Are You Lord", collection: "Contemporary Worship", theme: "Worship, breath and the glory of God", reference: "Psalm 150:6", note: "A call for all creation to praise the Lord." },
      { title: "How Great Is Our God", collection: "Contemporary Worship", theme: "The greatness and splendour of God", reference: "Psalm 145:3", note: "A simple, congregational celebration of God's greatness." },
      { title: "Build My Life", collection: "Contemporary Worship", theme: "Christ the firm foundation and a life of devotion", reference: "Matthew 7:24–25", note: "A prayer to build life on the trustworthy words of Jesus." },
      { title: "In Christ Alone", collection: "Modern Hymn", theme: "The person, cross and resurrection of Jesus", reference: "Colossians 1:15–20", note: "A doctrinally rich modern hymn tracing the hope believers have in Christ." }
    ],

    affirmations: [
      "I am born of God. His Word lives in me.",
      "I am strengthened with might through the Spirit of God.",
      "I walk in the wisdom, love and victory of Christ.",
      "God's grace is sufficient for me.",
      "I am a new creation in Christ Jesus."
    ],

    namesOfGod: [
      { name: "YHWH — The LORD", meaning: "God's covenant name, commonly represented as LORD in many English Bible translations.", reference: "Exodus 3:15" },
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
      "Standing firm in faith"
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
          "Glory Verse Affirmation",
          "Speak God's Word and strengthen your faith."
        ));

        originalLibrary.affirmations.forEach(item => {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("p", item));

          box.appendChild(button("Save declaration", function () {
            saved.bookmarks.push({
              title: "Glory Verse Affirmation",
              text: item
            });

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
          "A growing worship library for hymns, gospel songs, praise and contemporary worship. Each entry includes a Scripture connection and a short reflection. Song lyrics are shown only when they are public domain or properly licensed."
        ));

        const collections = ["All Songs", "Traditional Hymn", "Gospel Hymn", "Modern Hymn", "Contemporary Worship"];
        const filterRow = element("div", undefined, "library-nav");
        const list = element("div");
        function renderSongs(collection) {
          list.replaceChildren();
          const items = originalLibrary.worshipSongs.filter(function (song) {
            return collection === "All Songs" || song.collection === collection;
          });
          items.forEach(function (song) {
            const box = element("div", undefined, "library-entry");
            box.appendChild(element("small", song.collection));
            box.appendChild(element("h4", song.title));
            box.appendChild(element("p", song.theme));
            box.appendChild(element("strong", "Scripture: " + song.reference));
            box.appendChild(element("p", song.note));
            box.appendChild(button("Save to My Library", function () {
              saved.bookmarks.push({
                title: "Worship Song — " + song.title,
                text: song.theme + " | " + song.note,
                reference: song.reference
              });
              if (persist()) alert("Saved to your personal library.");
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

        originalLibrary.declarations.forEach(item => {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("h4", item));
          box.appendChild(element(
            "p",
            "Your declaration collection for this category will be developed with verified Scripture references."
          ));
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
          "The Words of Jesus",
          "A dedicated collection for studying the teachings of Jesus Christ."
        ));

        content.appendChild(element(
          "p",
          "This section will connect to the approved Gospel Scripture database, with teachings organised by topic and reference."
        ));
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
            const verse = document.querySelectorAll("#message .verse")[Number(match[3]) - 1];
            if (verse) {
              verse.classList.add("zuriel-selected-verse");
              verse.scrollIntoView({ behavior: "smooth", block: "center" });
            }
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

