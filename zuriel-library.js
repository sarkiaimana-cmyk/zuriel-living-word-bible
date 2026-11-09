
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
      {
        title: "Hope in God",
        verse: "Romans 15:13",
        message: "Let your heart remain anchored in God. His faithfulness is greater than every circumstance.",
        prayer: "Father, fill my heart with hope, peace and joy."
      },
      {
        title: "Power of the Holy Spirit",
        verse: "Acts 1:8",
        message: "The Holy Spirit empowers believers to live boldly and bear witness to Christ.",
        prayer: "Holy Spirit, guide me and strengthen me today."
      },
      {
        title: "Walking in Victory",
        verse: "1 Corinthians 15:57",
        message: "Give thanks to God, who gives us victory through Jesus Christ.",
        prayer: "Thank You, Father, for victory through Christ."
      }
    ],

    affirmations: [
      "I am born of God. His Word lives in me.",
      "I am strengthened with might through the Spirit of God.",
      "I walk in the wisdom, love and victory of Christ.",
      "God's grace is sufficient for me.",
      "I am a new creation in Christ Jesus."
    ],

    namesOfGod: [
      {
        name: "Jehovah Jireh",
        meaning: "The Lord will provide.",
        reference: "Genesis 22:14"
      },
      {
        name: "Jehovah Rapha",
        meaning: "The Lord who heals.",
        reference: "Exodus 15:26"
      },
      {
        name: "Jehovah Shalom",
        meaning: "The Lord is peace.",
        reference: "Judges 6:24"
      },
      {
        name: "El Shaddai",
        meaning: "God Almighty.",
        reference: "Genesis 17:1"
      },
      {
        name: "Jehovah Nissi",
        meaning: "The Lord is my banner.",
        reference: "Exodus 17:15"
      }
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
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      ) || { prayers: [], notes: [], bookmarks: [] };
    } catch (error) {
      return { prayers: [], notes: [], bookmarks: [] };
    }
  }

  let saved = loadSaved();

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
          "Short, meaningful devotionals for daily spiritual growth."
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

        originalLibrary.affirmations.forEach((item, index) => {
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
          "Discover the meaning and biblical references of God's names."
        ));

        originalLibrary.namesOfGod.forEach(item => {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("h4", item.name));
          box.appendChild(element("p", item.meaning));
          box.appendChild(element("strong", item.reference));
          content.appendChild(box);
        });
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
            alert("Your prayer has been saved.");
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
            title.value = "";
            area.value = "";
            alert("Study note saved.");
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
        content.appendChild(card(
          "My Saved Library",
          "Your saved declarations and personal discoveries."
        ));

        saved.bookmarks.forEach(item => {
          const box = element("div", undefined, "library-entry");
          box.appendChild(element("h4", item.title));
          box.appendChild(element("p", item.text));
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
    openPage("study");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addLibrary);
  } else {
    addLibrary();
  }

})();
      
