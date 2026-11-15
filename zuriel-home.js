
/* =========================================================
   ZURIEL LIVING WORD BIBLE
   COMPACT HOME DASHBOARD + TOP RETURN NAVIGATION
   ========================================================= */

(function () {
  "use strict";

  function buildZurielHome() {
    const main = document.querySelector("main");
    const reader = document.getElementById("bibleReader");

    if (!main || !reader ||
        document.getElementById("zurielHomeDashboard")) return;

    const verses = [
      { reference: "Psalm 119:105", text: "Thy word is a lamp unto my feet, and a light unto my path." },
      { reference: "Proverbs 3:5", text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding." },
      { reference: "Isaiah 40:31", text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles." },
      { reference: "Romans 8:28", text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
      { reference: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me." },
      { reference: "John 15:5", text: "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit." },
      { reference: "2 Corinthians 5:17", text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new." },
      { reference: "Genesis 1:1", text: "In the beginning God created the heaven and the earth." },
      { reference: "Deuteronomy 31:8", text: "And the LORD, he it is that doth go before thee; he will be with thee, he will not fail thee, neither forsake thee: fear not, neither be dismayed." },
      { reference: "Joshua 1:9", text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest." },
      { reference: "Psalm 23:1", text: "The LORD is my shepherd; I shall not want." },
      { reference: "Psalm 34:8", text: "O taste and see that the LORD is good: blessed is the man that trusteth in him." },
      { reference: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble." },
      { reference: "Psalm 91:1", text: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty." },
      { reference: "Proverbs 18:10", text: "The name of the LORD is a strong tower: the righteous runneth into it, and is safe." },
      { reference: "Isaiah 41:10", text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness." },
      { reference: "Matthew 5:16", text: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven." },
      { reference: "Matthew 6:33", text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you." },
      { reference: "John 1:1", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { reference: "John 14:27", text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid." },
      { reference: "Romans 12:2", text: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God." },
      { reference: "2 Timothy 1:7", text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." },
      { reference: "Hebrews 11:1", text: "Now faith is the substance of things hoped for, the evidence of things not seen." },
      { reference: "James 1:5", text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him." },
      { reference: "1 Peter 5:7", text: "Casting all your care upon him; for he careth for you." },
      { reference: "1 John 4:19", text: "We love him, because he first loved us." }
    ];

    let verseIndex = 0;
    let currentSection = "home";
    const sectionHistory = [];

    const sectionNames = {
      home: "Home",
      read: "Read Scripture",
      study: "Study Centre",
      declare: "Declarations",
      devotional: "Devotionals",
      library: "Study Library",
      kingdom: "Kingdom Life",
      personal: "My Study Space"
    };

    /* STYLING */

    const style = document.createElement("style");

    style.textContent = `
      body {
        padding-bottom: 90px;
      }

      #zurielTopReturnBar {
        position: sticky;
        top: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 10px 12px;
        margin: 0 0 14px;
        background: #10213d;
        color: #fff;
        border-bottom: 2px solid #b99b58;
        box-shadow: 0 3px 12px #00000020;
      }

      #zurielTopBack {
        flex: 0 0 auto;
        min-height: 43px;
        padding: 9px 14px;
        margin: 0;
        border: 1px solid #d8bd7c;
        border-radius: 9px;
        background: #e8cf91;
        color: #10213d;
        font-weight: bold;
        font-size: 14px;
      }

      #zurielTopSection {
        min-width: 0;
        overflow: hidden;
        color: #f0d99f;
        font-weight: bold;
        font-size: 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
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
      }

      #zurielHomeDashboard .home-brand {
        color: #e8cf91;
        font-size: 23px;
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
        background: #fff;
        color: #18304d;
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

      #zurielBottomNavigation {
        position: fixed;
        z-index: 9999;
        left: 0;
        right: 0;
        bottom: 0;
        display: grid;
        grid-template-columns: repeat(8,minmax(0,1fr));
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
      #zurielStudyPanel,
      #zurielKingdomLife {
        scroll-margin-top: 70px;
      }

      #zurielHomeDashboard .home-passage-grid {
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:9px;
      }
      #zurielHomeDashboard .home-passage-grid label {
        display:block;
        color:#f0d99f;
        font-size:13px;
        font-weight:700;
        margin:8px 0 5px;
      }
      #zurielHomeDashboard .home-passage-grid select {
        width:100%;
        min-width:0;
        min-height:47px;
        box-sizing:border-box;
        padding:10px;
        border:1px solid #cbb47b;
        border-radius:9px;
        background:#fff;
        color:#18304d;
        font-size:14px;
      }
      #zurielHomeDashboard .home-passage-status {
        color:#dce5f1;
        font-size:12px;
        min-height:18px;
        margin:8px 0 0;
      }
      @media(max-width:360px) {
        #zurielHomeDashboard .home-passage-grid { grid-template-columns:1fr; }
      }

      /* PREMIUM MOBILE HOME REFINEMENT */
      #zurielHomeDashboard {
        width: 100%; max-width: 760px; margin: 0 auto 24px;
        padding: 0 0 12px; color: #f8f4e9;
      }
      #zurielHomeDashboard .home-hero {
        position: relative; isolation: isolate; overflow: hidden;
        padding: 26px 18px 22px; border-radius: 22px;
        background: radial-gradient(ellipse at 92% 8%, #5479a044 0, transparent 42%),
          linear-gradient(145deg,#0b1830 0%,#142d50 55%,#244c66 100%);
        border: 1px solid #c7aa69; box-shadow: 0 12px 28px #10213d26;
      }
      #zurielHomeDashboard .home-hero::after {
        content: "✦"; position: absolute; z-index: -1; right: 18px; bottom: -38px;
        color: #e8cf91; opacity: .12; font-size: 150px; line-height: 1; pointer-events: none;
      }
      #zurielHomeDashboard .home-eyebrow {
        display: inline-flex; align-items: center; gap: 7px; margin: 0 auto 13px;
        padding: 6px 11px; border: 1px solid #e8cf9166; border-radius: 30px;
        background: #ffffff0c; color: #f4dfaa;
        font: 700 10px/1.3 Arial,sans-serif; letter-spacing: 1.15px;
      }
      #zurielHomeDashboard .home-brand {
        max-width: 520px; margin: 7px auto 10px; color: #fff9e9;
        font-size: clamp(25px,6vw,34px); line-height: 1.2;
        letter-spacing: -.45px; text-wrap: balance;
      }
      #zurielHomeDashboard .home-tagline {
        margin: 0; color: #f0d99f; font-size: 13px; letter-spacing: .25px;
      }
      #zurielHomeDashboard .home-subtitle {
        max-width: 440px; margin: 0 auto; color: #e0e8f1;
        font-size: 13px; line-height: 1.65;
      }
      #zurielHomeDashboard .home-hero .home-button {
        max-width: 360px; margin: 19px auto 0; min-height: 50px;
        border: 1px solid #f3dfac; border-radius: 12px;
        background: linear-gradient(110deg,#f0d99f,#d8bb75);
        box-shadow: 0 5px 14px #00000024;
      }
      #zurielHomeDashboard .home-card {
        padding: 17px; margin-top: 13px; border: 1px solid #d9d0bc;
        border-radius: 17px; background: linear-gradient(155deg,#172d4b,#10213d);
        box-shadow: 0 7px 20px #10213d12;
      }
      #zurielHomeDashboard .home-card h2 {
        display: flex; align-items: center; gap: 8px; margin: 0 0 10px;
        color: #f2dda9; font-size: 17px; line-height: 1.35;
      }
      #zurielHomeDashboard .home-card p { margin-top: 7px; margin-bottom: 9px; }
      #zurielHomeDashboard .home-continue-card {
        background: linear-gradient(120deg,#203d5c,#132844); border-color: #cbb47b;
      }
      #zurielHomeDashboard #zurielHomeReadingPosition { color: #f5f0e4; font-size: 14px; }
      #zurielHomeDashboard .home-button {
        min-height: 48px; border-radius: 11px; box-shadow: 0 3px 9px #00000016;
        transition: transform .16s ease, box-shadow .16s ease;
      }
      #zurielHomeDashboard .home-button:active,
      #zurielHomeDashboard .home-grid button:active { transform: scale(.985); }
      #zurielHomeDashboard button:focus-visible,
      #zurielHomeDashboard select:focus-visible,
      #zurielBottomNavigation button:focus-visible,
      #zurielTopBack:focus-visible { outline: 3px solid #f2d58d; outline-offset: 3px; }
      #zurielHomeDashboard .home-passage-grid { gap: 10px; }
      #zurielHomeDashboard .home-passage-grid select {
        min-height: 49px; border: 1px solid #c8c2b4; border-radius: 11px; font-size: 15px;
      }
      #zurielHomeDashboard .home-passage-grid label {
        color: #f2dda9; font-size: 12px; letter-spacing: .2px;
      }
      #zurielHomeDashboard .home-passage-status { color: #e1e9f3; }
      #zurielHomeDashboard .home-verse {
        min-height: 0; margin: 13px 0 8px; padding: 16px;
        border-left: 3px solid #d8bd7c; border-radius: 0 12px 12px 0;
        background: #ffffff0b; color: #fff9e9;
        font-size: clamp(17px,4.4vw,20px); line-height: 1.65;
      }
      #zurielHomeDashboard .home-reference { margin-left: 17px; font-size: 13px; }
      #zurielHomeDashboard .home-grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; }
      #zurielHomeDashboard .home-grid button {
        min-height: 64px; padding: 10px 8px; border: 1px solid #d8c99f;
        border-radius: 12px; background: #f7f3e8; color: #18304d;
        font-size: 13px; line-height: 1.35;
      }
      #zurielHomeDashboard details {
        margin-top: 9px; padding: 13px 14px; border: 1px solid #e0d8c7;
        border-left: 3px solid #c6a866; border-radius: 12px; background: #f8f5ed;
      }
      #zurielHomeDashboard details summary { color: #19324f; font-size: 14px; }
      #zurielHomeDashboard details p { color: #34465a; font-size: 14px; line-height: 1.7; }
      #zurielHomeDashboard .home-growth-highlight {
        border-color: #d8bd7c; background: linear-gradient(145deg,#233f5e,#142943);
      }
      #zurielHomeDashboard .home-growth-highlight p { color: #fff7e6; }
      #zurielHomeDashboard .home-section-note { color: #dce5f1; font-size: 12px; }
      #zurielBottomNavigation {
        padding-left: max(5px,env(safe-area-inset-left));
        padding-right: max(5px,env(safe-area-inset-right));
        background: #0d1c35; border-top-color: #c8ad70;
      }
      #zurielBottomNavigation button { min-height: 56px; font-size: 10px; letter-spacing: -.15px; }
      #zurielBottomNavigation button.active { background: linear-gradient(135deg,#f0d99f,#d8bd7c); }
      @media (min-width:600px) {
        #zurielHomeDashboard .home-hero { padding: 34px 28px 30px; }
        #zurielHomeDashboard .home-card { padding: 20px; }
        #zurielHomeDashboard .home-grid button { min-height: 68px; }
      }
      @media (max-width:380px) {
        #zurielHomeDashboard .home-hero { padding: 22px 13px 19px; }
        #zurielHomeDashboard .home-card { padding: 14px; }
        #zurielHomeDashboard .home-brand { font-size: 25px; }
        #zurielBottomNavigation button { font-size: 9px; }
        #zurielBottomNavigation button span { font-size: 18px; }
      }

      @media (prefers-reduced-motion: reduce) {
        #zurielHomeDashboard .home-verse {
          transition: none;
        }

        html {
          scroll-behavior: auto;
        }
      }
      /* OPEN-BOOK FAITH CARD — inspired by the supplied Zuriel artwork */
      #zurielHomeDashboard .zob-landscape {
        overflow:hidden;position:relative;padding:18px 12px 13px;border:2px solid #c9a958;
        border-radius:16px;background:
          radial-gradient(ellipse at 88% 19%,#fff6bd 0,transparent 22%),
          linear-gradient(180deg,#78c5e9 0%,#d5edee 29%,#8bb6a0 47%,#315c4a 70%,#172f36 100%);
        box-shadow:inset 0 0 0 2px #fff5d055,0 10px 24px #08172b55;
      }
      #zurielHomeDashboard .zob-brandline {
        max-width:440px;margin:0 auto 18px;padding:9px 8px;text-align:center;
        border:2px solid #d9b95f;border-radius:12px;background:linear-gradient(120deg,#071a3d,#12386a,#071a3d);
        color:#fff8e9;font:700 clamp(20px,5vw,29px)/1.12 Georgia,serif;
        text-shadow:0 2px 2px #0008;box-shadow:0 5px 12px #07172d55;
      }
      #zurielHomeDashboard .zob-brandline em {color:#ffda58;font-style:italic;}
      #zurielHomeDashboard .zob-book {
        display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0;
        position:relative;overflow:hidden;border:1px solid #8b6427;border-radius:48% 48% 12px 12px / 8% 8% 12px 12px;
        background:linear-gradient(90deg,#c8a66b,#fff7df 9%,#fffdf4 47%,#c8a66b 50%,#fffdf4 54%,#fff7e6 91%,#b48a4b);
        box-shadow:0 12px 18px #07172d77,inset 0 -8px 12px #98652d55;
        transform:perspective(700px) rotateX(1deg);
      }
      #zurielHomeDashboard .zob-book:after {
        content:"";position:absolute;top:0;bottom:0;left:50%;width:3px;
        background:linear-gradient(90deg,#8e6b3b66,#fff9e6,#8e6b3b66);pointer-events:none;
      }
      #zurielHomeDashboard .zob-page {min-width:0;padding:15px 10px 18px;text-align:center;color:#142b52;}
      #zurielHomeDashboard .zob-ribbon {
        display:block;margin:0 auto 12px;padding:5px 4px;max-width:100%;
        border:1px solid #d8bd7c;border-radius:5px;background:#10264e;color:#fff5db;
        font:700 10px/1.3 Georgia,serif;letter-spacing:.5px;
      }
      #zurielHomeDashboard .zob-scripture-copy {
        margin:0;color:#102b59;font:italic 700 clamp(16px,4vw,22px)/1.35 Georgia,serif;
        overflow-wrap:anywhere;
      }
      #zurielHomeDashboard .zob-declaration-copy {
        margin:0 0 12px;color:#17294a;font:700 clamp(13px,3.2vw,17px)/1.4 Georgia,serif;
        overflow-wrap:anywhere;
      }
      #zurielHomeDashboard .zob-affirmation-label {
        display:block;margin:9px auto 5px;padding:6px 4px;max-width:190px;
        border-radius:5px;background:#791d35;color:#ffe17c;
        font:italic 700 13px/1.15 Georgia,serif;
      }
      #zurielHomeDashboard .zob-affirmation-copy {
        margin:0;color:#17294a;font:italic 600 12px/1.4 Georgia,serif;overflow-wrap:anywhere;
      }
      #zurielHomeDashboard .zob-footer {
        margin:14px auto 0;padding:9px 6px;max-width:420px;text-align:center;
        border:2px solid #d9b95f;border-radius:9px;background:#0c2045;color:#f5d77e;
        font:700 14px/1.3 Georgia,serif;letter-spacing:.25px;
      }
      #zurielHomeDashboard .zob-faith-actions {display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;}
      #zurielHomeDashboard .zob-faith-actions .home-button {font-size:12px;padding:10px 6px;}
      @media(max-width:360px){
        #zurielHomeDashboard .zob-page{padding:11px 6px 14px}
        #zurielHomeDashboard .zob-ribbon{font-size:9px}
        #zurielHomeDashboard .zob-affirmation-label{font-size:11px}
        #zurielHomeDashboard .zob-affirmation-copy{font-size:11px}
      }
    `;

    document.head.appendChild(style);

    /* TOP RETURN BAR */

    const topBar = document.createElement("div");
    topBar.id = "zurielTopReturnBar";

    topBar.innerHTML = `
      <button type="button" id="zurielTopBack">
        ← Back
      </button>
      <div id="zurielTopSection">Home</div>
    `;

    /* HOME DASHBOARD */

    const dashboard = document.createElement("section");
    dashboard.id = "zurielHomeDashboard";

    dashboard.innerHTML = `
      <section class="home-hero">
        <p class="home-eyebrow">✦ OFFLINE-FIRST BIBLE • 66 BOOKS</p>
        <p class="home-tagline">
          His Words.. My Life.. My Victory.
        </p>

        <h1 class="home-brand">
          Zuriel Living Word Bible
        </h1>

        <p class="home-subtitle">
          Read God's Word. Discover its meaning. Live in its truth.
        </p>

        <button class="home-button" id="zurielHomeOpenBible">
          📖 Open the Bible
        </button>
      </section>

      <section class="home-card home-continue-card">
        <h2>↩️ Continue Reading</h2>
        <p id="zurielHomeReadingPosition">Your last Scripture will appear here.</p>
        <button class="home-button" id="zurielHomeContinueReading">
          Continue from Your Last Chapter
        </button>
      </section>

      <section class="home-card" id="zurielHomePassageCard">
        <h2>📖 Open Any Bible Passage</h2>
        <p class="home-subtitle">Choose a book and chapter. You can jump to a verse after it opens.</p>
        <div class="home-passage-grid">
          <div>
            <label for="zurielHomeBook">Bible Book</label>
            <select id="zurielHomeBook"><option value="">Choose a book</option></select>
          </div>
          <div>
            <label for="zurielHomeChapter">Chapter</label>
            <select id="zurielHomeChapter" disabled><option value="">Choose chapter</option></select>
          </div>
          <div>
            <label for="zurielHomeVerse">Verse (optional)</label>
            <select id="zurielHomeVerseSelect" disabled><option value="">Choose verse</option></select>
          </div>
        </div>
        <button type="button" class="home-button" id="zurielHomeOpenPassage" disabled>Open Selected Chapter</button>
        <p class="home-passage-status" id="zurielHomePassageStatus">All 66 books are available offline.</p>
      </section>

      <section class="home-card home-scripture-card">
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
        <h2>⚡ Your Bible Journey</h2>
        <p class="home-section-note">Go straight to the part of Zuriel you want to explore.</p>

        <div class="home-grid">
          <button data-section="read">📖 Read Bible</button>
          <button data-section="study">🔍 Study Centre</button>
          <button data-section="declare">✨ Declarations</button>
          <button data-section="library">📚 Study Library</button>
          <button data-section="devotional">🕊️ Devotionals</button>
          <button data-section="kingdom">🌱 Kingdom Life</button>
        </div>
      </section>

      <section class="home-card home-growth-highlight" id="zurielOpenBookFaithCard">
        <div class="zob-landscape">
          <p class="zob-brandline">His Word...<br><em>My Life... My Victory!</em></p>
          <div class="zob-book">
            <div class="zob-page zob-scripture-page">
              <span class="zob-ribbon" id="zurielOpenBookReference">SCRIPTURE</span>
              <p class="zob-scripture-copy" id="zurielOpenBookScripture">Your Scripture for today.</p>
            </div>
            <div class="zob-page zob-response-page">
              <span class="zob-ribbon">MY DECLARATION</span>
              <p class="zob-declaration-copy" id="zurielOpenBookDeclaration">Let God's Word shape your response.</p>
              <span class="zob-affirmation-label">Glory Verse Affirmation</span>
              <p class="zob-affirmation-copy" id="zurielOpenBookAffirmation"></p>
            </div>
          </div>
          <p class="zob-footer">✦ Zuriel Living Word Bible ✦</p>
        </div>
        <div class="zob-faith-actions">
          <button type="button" class="home-button" id="zurielOpenBookRead">📖 Read This Passage</button>
          <button type="button" class="home-button home-secondary" id="zurielOpenBookNext">✦ Another Word for Today</button>
        </div>
        <details>
          <summary>🙏 Prayer</summary>
          <p id="zurielOpenBookPrayer"></p>
        </details>
        <details>
          <summary>🕊️ Faith Confession</summary>
          <p id="zurielOpenBookConfession"></p>
        </details>
        <details>
          <summary>🌿 Inspiration</summary>
          <p id="zurielOpenBookInspiration"></p>
        </details>
        <details>
          <summary>🕯️ Light</summary>
          <p id="zurielOpenBookLight">Thy word is a lamp unto my feet, and a light unto my path. — Psalm 119:105</p>
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
    main.prepend(topBar);

    if (window.ZurielKingdomLife && typeof window.ZurielKingdomLife.mount === "function") {
      window.ZurielKingdomLife.mount(main);
    }
    if (window.ZurielPersonalSpace && typeof window.ZurielPersonalSpace.mount === "function") {
      window.ZurielPersonalSpace.mount(main);
    }

    /* HIDE OLD DUPLICATE HOME CONTENT */

    Array.from(main.children).forEach(function (section) {
      if (
        section !== topBar &&
        section !== dashboard &&
        section !== reader &&
        section.id !== "zurielLibrary" &&
        section.id !== "zurielStudyPanel"
      ) {
        section.hidden = true;
        section.setAttribute("data-zuriel-hidden", "true");
      }
    });

    /* SECTION VISIBILITY */

    function showSections(names) {
      Array.from(main.children).forEach(function (section) {
        if (section === topBar) {
          section.hidden = false;
          return;
        }

        section.hidden = !names.includes(section.id);
      });

      const footer = document.querySelector("footer");

      if (footer) {
        footer.hidden = !names.includes("zurielHomeDashboard");
      }
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
      ["devotional", "🕊️", "Devotional"],
      ["library", "📚", "Library"],
      ["kingdom", "🌱", "Grow"],
      ["personal", "📝", "My Space"]
    ];

    navItems.forEach(function (item) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.section = item[0];
      button.innerHTML = "<span>" + item[1] + "</span>" + item[2];

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

    function updateTopBar(section) {
      const label = document.getElementById("zurielTopSection");

      if (label) {
        label.textContent = sectionNames[section] || "Zuriel Bible";
      }
    }

    /* DISPLAY A SECTION */

    function displaySection(section) {
      if (section === "home") {
        if (typeof updateHomeReadingPosition === "function") {
          updateHomeReadingPosition();
        }
        showSections(["zurielHomeDashboard"]);
        setActiveNavigation("home");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      if (section === "read") {
        showSections(["bibleReader"]);
        setActiveNavigation("read");
        reader.scrollIntoView({ behavior: "smooth", block: "start" });
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
      }

      if (section === "kingdom") {
        showSections(["zurielKingdomLife"]);
        setActiveNavigation("kingdom");
        if (window.ZurielKingdomLife) window.ZurielKingdomLife.open();
        const kingdom = document.getElementById("zurielKingdomLife");
        if (kingdom) kingdom.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (section === "personal") {
        showSections(["zurielPersonalSpace"]);
        setActiveNavigation("personal");
        if (window.ZurielPersonalSpace) window.ZurielPersonalSpace.open();
        const personal = document.getElementById("zurielPersonalSpace");
        if (personal) personal.scrollIntoView({ behavior: "smooth", block: "start" });
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
      }

      if (section === "devotional") {
        showSections(["zurielLibrary"]);
        setActiveNavigation("devotional");

        if (window.ZurielLibrary) {
          window.ZurielLibrary.open("devotional");
        }

        const library = document.getElementById("zurielLibrary");
        if (library) {
          library.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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

      /* Keep the home screen uncluttered: its hero already carries the
         app identity, so hide the older site header there. Restore it
         inside reading and study sections for clear orientation. */
      const siteHeader = document.querySelector("body > header");
      if (siteHeader) siteHeader.hidden = section === "home";

      currentSection = section;
      updateTopBar(section);
    }

    /* NAVIGATION WITH HISTORY */

    function navigate(section) {
      if (!sectionNames[section]) return;

      if (section !== currentSection) {
        sectionHistory.push(currentSection);
      }

      displaySection(section);
    }

    window.ZurielHomeNavigate = navigate;

    /* TOP BACK BUTTON */

    document.getElementById("zurielTopBack")
      .addEventListener("click", function () {
        const previous = sectionHistory.pop() || "home";
        displaySection(previous);
      });

    /* HOME BUTTON CONNECTIONS */

    document.getElementById("zurielHomeOpenBible")
      .addEventListener("click", function () {
        navigate("read");
      });

    function getHomeReadingPosition() {
      try {
        const saved = JSON.parse(localStorage.getItem("zurielLastReadingPosition"));
        if (!saved || typeof saved.book !== "string" ||
            !Number.isInteger(saved.chapter) || saved.chapter < 1) return null;
        return saved;
      } catch (error) {
        return null;
      }
    }

    function updateHomeReadingPosition() {
      const saved = getHomeReadingPosition();
      const label = document.getElementById("zurielHomeReadingPosition");
      const button = document.getElementById("zurielHomeContinueReading");
      if (saved) {
        const reference = saved.book + " " + saved.chapter +
          (Number.isInteger(saved.verse) ? ":" + saved.verse : "");
        label.textContent = "Last studied: " + reference + ".";
        button.textContent = "Continue — " + reference;
      } else {
        label.textContent = "Your reading journey starts here. Choose any book and chapter.";
        button.textContent = "Choose a Bible Book";
      }
    }

    document.getElementById("zurielHomeContinueReading")
      .addEventListener("click", async function () {
        const saved = getHomeReadingPosition();
        navigate("read");
        if (saved && typeof window.openChapter === "function") {
          await window.openChapter(saved.book, saved.chapter);
          if (Number.isInteger(saved.verse) && saved.verse > 0) {
            const verses = document.querySelectorAll("#message .verse");
            const target = Array.from(verses).find(function (item) {
              const number = item.querySelector("strong");
              return number && number.textContent.trim().replace(".", "") === String(saved.verse);
            });
            if (target) {
              target.classList.add("zuriel-selected-verse");
              target.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
        }
      });

    updateHomeReadingPosition();

    document.getElementById("zurielHomeOpenStudy")
      .addEventListener("click", function () {
        navigate("library");
      });

    dashboard.querySelectorAll("[data-section]")
      .forEach(function (button) {
        button.addEventListener("click", function () {
          navigate(button.dataset.section);
        });
      });

    /* HOME PAGE BOOK • CHAPTER • VERSE SELECTOR */
    (function setupHomePassageSelector() {
      const bookSelect = document.getElementById("zurielHomeBook");
      const chapterSelect = document.getElementById("zurielHomeChapter");
      const verseSelect = document.getElementById("zurielHomeVerseSelect");
      const openButton = document.getElementById("zurielHomeOpenPassage");
      const passageStatus = document.getElementById("zurielHomePassageStatus");
      const books = typeof bibleBooks !== "undefined" ? bibleBooks : window.bibleBooks;

      if (!bookSelect || !chapterSelect || !verseSelect || !openButton ||
          !passageStatus || !Array.isArray(books)) {
        if (passageStatus) passageStatus.textContent = "The Scripture selector is preparing. Please refresh shortly.";
        return;
      }

      books.forEach(function (book) {
        const option = document.createElement("option");
        option.value = book.name;
        option.textContent = book.name;
        bookSelect.appendChild(option);
      });

      function resetSelect(select, placeholder) {
        select.replaceChildren();
        const option = document.createElement("option");
        option.value = "";
        option.textContent = placeholder;
        select.appendChild(option);
      }

      async function fillVerses(book, chapter) {
        resetSelect(verseSelect, "Entire chapter");
        verseSelect.disabled = true;
        passageStatus.textContent = "Loading verse choices for " + book + " " + chapter + "…";
        try {
          if (typeof window.getChapterVerseCount !== "function") {
            throw new Error("Verse count service is not ready.");
          }
          const count = await window.getChapterVerseCount(book, chapter);
          if (!count) throw new Error("No verses were found for this chapter.");
          for (let n = 1; n <= count; n++) {
            const option = document.createElement("option");
            option.value = String(n);
            option.textContent = "Verse " + n;
            verseSelect.appendChild(option);
          }
          verseSelect.disabled = false;
          passageStatus.textContent = book + " " + chapter + " is ready. You can choose a verse or open the whole chapter.";
        } catch (error) {
          passageStatus.textContent = "Verse choices could not load. You can still open the chapter.";
          console.error("Zuriel Home verse choices:", error);
        }
      }

      bookSelect.addEventListener("change", function () {
        resetSelect(chapterSelect, "Choose chapter");
        resetSelect(verseSelect, "Entire chapter");
        verseSelect.disabled = true;
        const book = books.find(function (item) { return item.name === bookSelect.value; });
        if (!book) {
          chapterSelect.disabled = true;
          openButton.disabled = true;
          passageStatus.textContent = "Choose a Bible book to begin.";
          return;
        }
        for (let n = 1; n <= book.chapters; n++) {
          const option = document.createElement("option");
          option.value = String(n);
          option.textContent = "Chapter " + n;
          chapterSelect.appendChild(option);
        }
        chapterSelect.disabled = false;
        openButton.disabled = true;
        passageStatus.textContent = book.name + " selected. Now choose a chapter.";
      });

      chapterSelect.addEventListener("change", async function () {
        const book = bookSelect.value;
        const chapter = Number(chapterSelect.value);
        resetSelect(verseSelect, "Entire chapter");
        verseSelect.disabled = true;
        openButton.disabled = !book || !chapter;
        if (!book || !chapter) {
          passageStatus.textContent = "Choose a chapter to see its verses.";
          return;
        }
        await fillVerses(book, chapter);
      });

      openButton.addEventListener("click", async function () {
        const book = bookSelect.value;
        const chapter = Number(chapterSelect.value);
        const verseNumber = Number(verseSelect.value) || 0;
        if (!book || !chapter || typeof window.openChapter !== "function") {
          passageStatus.textContent = "Please choose a Bible book and chapter.";
          return;
        }
        openButton.disabled = true;
        openButton.textContent = "Opening Scripture…";
        passageStatus.textContent = "Opening " + book + " " + chapter + (verseNumber ? ":" + verseNumber : "") + "…";
        navigate("read");
        try {
          await window.openChapter(book, chapter);
          if (verseNumber) {
            const target = reader.querySelectorAll("#message .verse")[verseNumber - 1];
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "center" });
              target.classList.add("zuriel-nav-highlight");
              passageStatus.textContent = "Opened " + book + " " + chapter + ":" + verseNumber + ".";
            } else {
              passageStatus.textContent = "Chapter opened, but the selected verse was not found.";
            }
          } else {
            passageStatus.textContent = "Opened " + book + " " + chapter + ".";
          }
          if (typeof updateHomeReadingPosition === "function") updateHomeReadingPosition();
        } catch (error) {
          passageStatus.textContent = "Could not open this passage. Please try again.";
          console.error("Zuriel Home passage selector:", error);
        } finally {
          openButton.disabled = false;
          openButton.textContent = "Open Selected Passage";
        }
      });
    })();

    /* CHANGING HOME SCRIPTURE */

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

    /* OPEN HOME VERSE IN THE READER */

    document.getElementById("zurielSaveVerse")
      .addEventListener("click", function () {
        const reference = verses[verseIndex].reference;
        const match = reference.match(/^(.+)\s+(\d+):(\d+)$/);

        if (!match || typeof window.openChapter !== "function") return;

        navigate("read");

        const bookSelector = document.getElementById("book");

        if (bookSelector) {
          bookSelector.value = match[1];
        }

        window.openChapter(match[1], Number(match[2]))
          .then(function () {
            const verseElements =
              document.querySelectorAll("#message .verse");

            const target = verseElements[Number(match[3]) - 1];

            if (target) {
              target.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });

              target.click();
            }
          });
      });

    /* DAILY SCRIPTURE + MANUAL DISCOVERY
       The selected daily verse is stable for the local calendar day.
       Readers can still choose another verse at any time. */

    function getDailyVerseIndex() {
      const now = new Date();
      const dayNumber = Math.floor(Date.UTC(
        now.getFullYear(), now.getMonth(), now.getDate()
      ) / 86400000);
      return dayNumber % verses.length;
    }

    displayVerse(getDailyVerseIndex());
    verseText.setAttribute("aria-live", "polite");
    verseReference.setAttribute("aria-live", "polite");

    /* SCRIPTURE-LINKED OPEN BOOK: use the curated faith response for the
       exact reference. Never manufacture a prayer or declaration when no
       matching entry exists. */
    const faithCardRefs = verses.filter(function (item) {
      return window.ZurielFaithContent &&
        typeof window.ZurielFaithContent.find === "function" &&
        window.ZurielFaithContent.find(item.reference);
    });
    let faithCardIndex = faithCardRefs.length
      ? getDailyVerseIndex() % faithCardRefs.length : 0;

    function renderOpenBookFaithCard() {
      const verse = faithCardRefs[faithCardIndex];
      if (!verse) return;
      const response = window.ZurielFaithContent.find(verse.reference);
      if (!response) return;
      const setText = function (id, value) {
        const node = document.getElementById(id);
        if (node) node.textContent = value || "This reflection is not supplied yet.";
      };
      setText("zurielOpenBookReference", verse.reference.toUpperCase());
      setText("zurielOpenBookScripture", verse.text);
      setText("zurielOpenBookDeclaration", response.declaration);
      setText("zurielOpenBookAffirmation", response.affirmation);
      setText("zurielOpenBookPrayer", response.prayer);
      setText("zurielOpenBookConfession", response.confession);
      setText("zurielOpenBookInspiration", response.inspiration);
    }

    renderOpenBookFaithCard();

    const nextFaithWord = document.getElementById("zurielOpenBookNext");
    if (nextFaithWord) nextFaithWord.addEventListener("click", function () {
      if (!faithCardRefs.length) return;
      faithCardIndex = (faithCardIndex + 1) % faithCardRefs.length;
      renderOpenBookFaithCard();
    });

    const readFaithWord = document.getElementById("zurielOpenBookRead");
    if (readFaithWord) readFaithWord.addEventListener("click", async function () {
      const verse = faithCardRefs[faithCardIndex];
      const match = verse && verse.reference.match(/^(.+)\s+(\d+):(\d+)$/);
      if (!match || typeof window.openChapter !== "function") return;
      navigate("read");
      const selector = document.getElementById("book");
      if (selector) selector.value = match[1];
      await window.openChapter(match[1], Number(match[2]));
      const target = document.querySelectorAll("#message .verse")[Number(match[3]) - 1];
      if (target) {
        target.scrollIntoView({behavior:"smooth",block:"center"});
        target.click();
      }
    });

    /* START ON HOME */

    displaySection("home");

    console.log("Zuriel Home Dashboard and top navigation loaded.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildZurielHome);
  } else {
    buildZurielHome();
  }

})();

