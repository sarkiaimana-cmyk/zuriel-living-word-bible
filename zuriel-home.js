
/* =========================================================
   ZURIEL LIVING WORD BIBLE
   COMPACT PREMIUM HOME DASHBOARD
   FIXED NAVIGATION • CHANGING SCRIPTURE • SMOOTH EXPERIENCE
   ========================================================= */

(function () {
  "use strict";

  function buildZurielHome() {
    const main = document.querySelector("main");
    const reader = document.getElementById("bibleReader");

    if (!main || !reader || document.getElementById("zurielHomeDashboard")) {
      return;
    }

    const verses = [
      {
        reference: "Psalm 119:105",
        text: "Thy word is a lamp unto my feet, and a light unto my path."
      },
      {
        reference: "Proverbs 3:5",
        text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding."
      },
      {
        reference: "Isaiah 40:31",
        text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles."
      },
      {
        reference: "Romans 8:28",
        text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose."
      },
      {
        reference: "Philippians 4:13",
        text: "I can do all things through Christ which strengtheneth me."
      },
      {
        reference: "John 15:5",
        text: "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit."
      },
      {
        reference: "2 Corinthians 5:17",
        text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new."
      }
    ];

    let verseIndex = 0;
    let rotationTimer = null;

    const style = document.createElement("style");

    style.textContent = `
      body {
        padding-bottom: 88px;
      }

      #zurielHomeDashboard {
        margin: 0 0 20px;
        color: #f8f4e9;
      }

      #zurielHomeDashboard .home-hero {
        background: linear-gradient(145deg,#0d1c35,#203e68);
        border: 1px solid #b99b58;
        border-radius: 20px;
        padding: 23px 17px;
        text-align: center;
        box-shadow: 0 6px 20px #10213d20;
      }

      #zurielHomeDashboard .home-brand {
        color: #e8cf91;
        font-size: 23px;
        font-weight: bold;
        line-height: 1.3;
        margin: 5px 0 9px;
      }

      #zurielHomeDashboard .home-tagline {
        color: #f2dca5;
        font-weight: bold;
        font-size: 14px;
      }

      #zurielHomeDashboard .home-subtitle {
        color: #dce5f1;
        font-size: 14px;
        line-height: 1.6;
      }

      #zurielHomeDashboard .home-card {
        background: linear-gradient(145deg,#10213d,#203e68);
        border: 1px solid #b99b58;
        border-radius: 17px;
        padding: 17px;
        margin-top: 14px;
        box-shadow: 0 4px 14px #10213d15;
      }

      #zurielHomeDashboard h2 {
        color: #f0d99f;
        font-size: 19px;
        margin: 0 0 12px;
      }

      #zurielHomeDashboard p {
        line-height: 1.7;
      }

      #zurielHomeDashboard .home-verse {
        color: #fff9e9;
        font-size: 19px;
        line-height: 1.7;
        min-height: 90px;
        transition: opacity .35s ease;
      }

      #zurielHomeDashboard .home-reference {
        color: #f0d99f;
        font-weight: bold;
      }

      #zurielHomeDashboard .home-button {
        display: block;
        width: 100%;
        min-height: 47px;
        padding: 12px;
        margin: 9px 0 0;
        border: 1px solid #d8bd7c;
        border-radius: 10px;
        background: #e8cf91;
        color: #10213d;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
      }

      #zurielHomeDashboard .home-secondary {
        background: #ffffff;
        color: #18304d;
        border-color: #d8bd7c;
      }

      #zurielHomeDashboard .home-grid {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 9px;
        margin-top: 12px;
      }

      #zurielHomeDashboard .home-grid button {
        min-height: 58px;
        padding: 10px 6px;
        margin: 0;
        border: 1px solid #cbb47b;
        border-radius: 10px;
        background: #f8f4e9;
        color: #18304d;
        font-weight: bold;
        font-size: 14px;
      }

      #zurielHomeDashboard details {
        background: #fff;
        color: #18304d;
        border-left: 4px solid #b99b58;
        border-radius: 10px;
        padding: 13px;
        margin-top: 10px;
      }

      #zurielHomeDashboard summary {
        font-weight: bold;
        cursor: pointer;
        padding: 4px 0;
      }

      #zurielHomeDashboard details p {
        margin-bottom: 3px;
      }

      #zurielBottomNavigation {
        position: fixed;
        z-index: 9999;
        left: 0;
        right: 0;
        bottom: 0;
        display: grid;
        grid-template-columns: repeat(6,minmax(0,1fr));
        gap: 2px;
        padding: 7px 3px calc(7px + env(safe-area-inset-bottom));
        background: #10213d;
        border-top: 1px solid #b99b58;
        box-shadow: 0 -4px 15px #00000020;
      }

      #zurielBottomNavigation button {
        min-width: 0;
        min-height: 54px;
        padding: 5px 1px;
        margin: 0;
        border: 0;
        border-radius: 9px;
        background: transparent;
        color: #e5eaf2;
        font-size: 10px;
        font-weight: bold;
        cursor: pointer;
      }

      #zurielBottomNavigation button span {
        display: block;
        font-size: 19px;
        margin-bottom: 3px;
      }

      #zurielBottomNavigation button.active {
        background: #e8cf91;
        color: #10213d;
      }

      #bibleReader,
      #zurielLibrary,
      #zurielStudyPanel {
        scroll-margin-top: 12px;
      }

      @media (prefers-reduced-motion: reduce) {
        #zurielHomeDashboard .home-verse {
          transition: none;
        }

        html {
          scroll-behavior: auto;
        }
      }
    `;

    document.head.appendChild(style);

    /* HOME DASHBOARD */

    const dashboard = document.createElement("section");
    dashboard.id = "zurielHomeDashboard";

    dashboard.innerHTML = `
      <section class="home-hero">
        <p class="home-tagline">His Words.. My Life.. My Victory.</p>
        <h1 class="home-brand">Zuriel Living Word Bible</h1>
        <p class="home-subtitle">
          Read God's Word. Discover its meaning. Live in its truth.
        </p>
        <button class="home-button" id="zurielHomeOpenBible">
          📖 Open the Bible
        </button>
      </section>

      <section class="home-card">
        <h2>🌿 Scripture for Today</h2>
        <p class="home-verse" id="zurielHomeVerse"></p>
        <p class="home-reference" id="zurielHomeReference"></p>
        <button class="home-button" id="zurielNextVerse">
          ✨ Show Another Scripture
        </button>
        <button class="home-button home-secondary" id="zurielSaveVerse">
          📖 Read This Scripture
        </button>
        <p class="home-subtitle">
          Scripture quotations are from the King James Version.
        </p>
      </section>

      <section class="home-card">
        <h2>⚡ Quick Access</h2>
        <div class="home-grid">
          <button data-section="read">📖 Read Bible</button>
          <button data-section="study">🔍 Study Centre</button>
          <button data-section="declare">✨ Declarations</button>
          <button data-section="library">📚 Study Library</button>
        </div>
      </section>

      <section class="home-card">
        <h2>🌸 Daily Growth</h2>

        <details>
          <summary>🙏 Prayer</summary>
          <p>
            Father, thank You for Your Word. Give me understanding,
            wisdom and strength to walk in Your truth today. Amen.
          </p>
        </details>

        <details>
          <summary>✨ Glory Verse Affirmation</summary>
          <p>
            I am born of God. His Word lives in me.
            His wisdom guides me, and His grace empowers me.
          </p>
        </details>

        <details>
          <summary>🕯️ Light</summary>
          <p>
            Thy word is a lamp unto my feet,
            and a light unto my path. — Psalm 119:105
          </p>
        </details>

        <details>
          <summary>🕊️ Inspiration</summary>
          <p>
            Keep your heart established in God's faithfulness.
            Let His Word guide your thoughts and actions.
          </p>
        </details>
      </section>

      <section class="home-card">
        <h2>🌟 Grow Deeper in the Word</h2>
        <p>
          Explore original-language word studies, Bible introductions,
          cross-references, commentaries, prayer and personal notes.
        </p>
        <button class="home-button" id="zurielHomeOpenStudy">
          Explore Study Library
        </button>
      </section>
    `;

    main.prepend(dashboard);

    /* HIDE THE OLD DUPLICATE HOME SECTIONS */

    Array.from(main.children).forEach(function (section) {
      if (
        section !== dashboard &&
        section !== reader &&
        section.id !== "zurielLibrary" &&
        section.id !== "zurielStudyPanel"
      ) {
        section.hidden = true;
        section.setAttribute("data-zuriel-hidden", "true");
      }
    });

    /* SHOW ONLY THE REQUIRED APP SECTIONS */

    function showSections(names) {
      Array.from(main.children).forEach(function (section) {
        const show =
          names.includes(section.id) ||
          section.id === "zurielHomeDashboard";

        section.hidden = !show;
      });

      const footer = document.querySelector("footer");
      if (footer) footer.hidden = !names.includes("zurielHomeDashboard");
    }

    /* BOTTOM NAVIGATION */

    const nav = document.createElement("nav");
    nav.id = "zurielBottomNavigation";
    nav.setAttribute("aria-label", "Main navigation");

    const navItems = [
      ["home", "🏠", "Home"],
      ["read", "📖", "Read"],
      ["study", "🔍", "Study"],
      ["declare", "✨", "Declare"],
      ["me", "👤", "Me"],
      ["library", "📚", "Library"]
    ];

    navItems.forEach(function (item) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.section = item[0];
      button.innerHTML =
        "<span>" + item[1] + "</span>" + item[2];

      button.addEventListener("click", function () {
        navigate(item[0]);
      });

      nav.appendChild(button);
    });

    document.body.appendChild(nav);

    function setActiveNavigation(section) {
      nav.querySelectorAll("button").forEach(function (button) {
        button.classList.toggle(
          "active",
          button.dataset.section === section
        );
      });
    }

    function navigate(section) {
      if (section === "home") {
        showSections(["zurielHomeDashboard"]);
        setActiveNavigation("home");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (section === "read") {
        showSections(["bibleReader"]);
        setActiveNavigation("read");
        reader.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (section === "study") {
        showSections(["bibleReader", "zurielStudyPanel"]);
        setActiveNavigation("study");

        const panel = document.getElementById("zurielStudyPanel");
        if (panel) {
          panel.style.display = "block";
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          reader.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      if (section === "declare") {
        showSections(["zurielLibrary"]);
        setActiveNavigation("declare");

        if (window.ZurielLibrary) {
          window.ZurielLibrary.open("declarations");
        }

        const library = document.getElementById("zurielLibrary");
        if (library) {
          library.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      if (section === "me") {
        showSections(["zurielLibrary"]);
        setActiveNavigation("me");

        if (window.ZurielLibrary) {
          window.ZurielLibrary.openPersonal();
        }

        const library = document.getElementById("zurielLibrary");
        if (library) {
          library.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      if (section === "library") {
        showSections(["zurielLibrary"]);
        setActiveNavigation("library");

        if (window.ZurielLibrary) {
          window.ZurielLibrary.open("study");
        }

        const library = document.getElementById("zurielLibrary");
        if (library) {
          library.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }

    /* HOME BUTTONS */

    document.getElementById("zurielHomeOpenBible")
      .addEventListener("click", function () {
        navigate("read");
      });

    document.getElementById("zurielHomeOpenStudy")
      .addEventListener("click", function () {
        navigate("library");
      });

    dashboard.querySelectorAll("[data-section]").forEach(function (button) {
      button.addEventListener("click", function () {
        navigate(button.dataset.section);
      });
    });

    /* CHANGING SCRIPTURE */

    const verseText = document.getElementById("zurielHomeVerse");
    const verseReference = document.getElementById("zurielHomeReference");

    function displayVerse(index) {
      verseIndex = (index + verses.length) % verses.length;

      verseText.style.opacity = "0";

      window.setTimeout(function () {
        verseText.textContent = "“" + verses[verseIndex].text + "”";
        verseReference.textContent = verses[verseIndex].reference;
        verseText.style.opacity = "1";
      }, 180);
    }

    document.getElementById("zurielNextVerse")
      .addEventListener("click", function () {
        displayVerse(verseIndex + 1);
      });

    document.getElementById("zurielSaveVerse")
      .addEventListener("click", function () {
        const reference = verses[verseIndex].reference;
        const match = reference.match(/^(.+)\s+(\d+):(\d+)$/);

        if (match && typeof window.openChapter === "function") {
          navigate("read");

          const bookSelector = document.getElementById("book");
          if (bookSelector) bookSelector.value = match[1];

          window.openChapter(match[1], Number(match[2])).then(function () {
            const verseElements = document.querySelectorAll("#message .verse");
            const target = verseElements[Number(match[3]) - 1];

            if (target) {
              target.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
              target.click();
            }
          });
        }
      });

    displayVerse(0);

    /* AUTOMATIC ROTATION — LIGHTWEIGHT */

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rotationTimer = window.setInterval(function () {
        if (!document.hidden) {
          displayVerse(verseIndex + 1);
        }
      }, 45000);
    }

    /* START ON HOME */

    showSections(["zurielHomeDashboard"]);
    setActiveNavigation("home");

    console.log("Zuriel compact Home Dashboard loaded.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildZurielHome);
  } else {
    buildZurielHome();
  }

})();

