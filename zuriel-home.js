
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

    function canonicalBookName(value) {
      const name = String(value || "").trim().replace(/\s+/g, " ");
      return name.toLowerCase() === "psalm" ? "Psalms" : name;
    }

    function findHomeVerseElement(verseNumber) {
      const verses = document.querySelectorAll("#message .verse");
      for (const verse of verses) {
        const label = verse.querySelector("strong");
        if (label && label.textContent.trim().replace(/\.$/, "") === String(verseNumber)) {
          return verse;
        }
      }
      return null;
    }

    const sectionNames = {
      home: "Home",
      read: "Read Scripture",
      study: "Study Centre",
      declare: "Declarations of Faith",
      devotional: "The Light Glory Devotional",
      library: "My Saved Library",
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

      #zurielHomeDashboard .home-translations-card {
        position:relative; margin-top:0; margin-bottom:14px; padding:18px 15px;
        background:linear-gradient(145deg,#10213d,#1b385b);
        border:1px solid #c8ad70; box-shadow:0 8px 22px #10213d20;
      }
      #zurielHomeDashboard .home-translations-card h2 { margin-bottom:7px; }
      #zurielHomeDashboard .translation-shortcuts {
        display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:7px; margin:12px 0;
      }
      #zurielHomeDashboard .translation-shortcuts span {
        display:flex; align-items:center; justify-content:center; min-height:39px;
        border:1px solid #c8ad70; border-radius:9px; background:#f7f3e8;
        color:#19324f; font:700 12px Arial,sans-serif;
      }
      #zurielHomeDashboard .translation-access-note {
        margin:8px 0 12px; color:#dce5f1; font:12px/1.55 Arial,sans-serif;
      }
      #zurielHomeTranslations #zurielTranslationCompare {
        margin:0; padding:12px; border-color:#c8ad70; background:#f7f3e8;
      }
      #zurielHomeTranslations #zurielTranslationCompare summary { color:#19324f; }
      #zurielHomeTranslations #zurielTranslationCompare .ztc-note { color:#526174; }
      @media(max-width:360px) {
        #zurielHomeDashboard .translation-shortcuts { grid-template-columns:repeat(3,minmax(0,1fr)); }
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

      #zurielHomeDashboard .home-explore-grid {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 9px;
        margin-top: 12px;
      }
      #zurielHomeDashboard .home-explore-grid button {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 5px;
        min-width: 0;
        min-height: 108px;
        margin: 0;
        padding: 12px 10px;
        border: 1px solid #d8c99f;
        border-radius: 12px;
        background: #f7f3e8;
        color: #18304d;
        text-align: left;
      }
      #zurielHomeDashboard .home-explore-grid button span { font-size: 20px; }
      #zurielHomeDashboard .home-explore-grid button strong { font-size: 13px; line-height: 1.3; }
      #zurielHomeDashboard .home-explore-grid button small { color: #526174; font-size: 11px; line-height: 1.35; }
      @media(max-width:420px) {
        #zurielHomeDashboard .home-explore-grid { grid-template-columns: 1fr; }
        #zurielHomeDashboard .home-explore-grid button {
          min-height: 64px;
          display: grid;
          grid-template-columns: 28px 1fr;
          align-items: center;
          column-gap: 8px;
        }
        #zurielHomeDashboard .home-explore-grid button span { grid-row: 1 / span 2; }
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
      #zurielHomeDashboard .home-daily-scripture-list {
        display:grid;grid-template-columns:1fr;gap:10px;
      }
      #zurielHomeDashboard .home-daily-scripture {
        min-width:0;padding:13px;border:1px solid #d6e1e9;border-radius:13px;
        background:linear-gradient(145deg,#f8fbfd,#edf4f8);
      }
      #zurielHomeDashboard .home-daily-scripture-text {
        margin:0;color:#203b56;font:400 16px/1.65 Georgia,serif;
      }
      #zurielHomeDashboard .home-daily-scripture-reference {
        margin:8px 0 0;color:#174c78;font-size:12px;font-weight:700;
      }
      #zurielHomeDashboard .home-daily-scripture .home-button {
        width:auto;min-width:150px;min-height:44px;margin-top:9px;padding:9px 13px;
      }
      @media(min-width:620px) {
        #zurielHomeDashboard .home-daily-scripture-list {grid-template-columns:repeat(3,minmax(0,1fr));}
        #zurielHomeDashboard .home-daily-scripture {display:flex;flex-direction:column;align-items:flex-start;}
        #zurielHomeDashboard .home-daily-scripture .home-button {margin-top:auto;}
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
      #zurielHomeDashboard .zob-page {
        position:relative;z-index:1;min-width:0;min-height:150px;
        padding:15px 10px 18px;text-align:center;color:#142b52;
        background:#fffdf4;isolation:isolate;
      }
      #zurielHomeDashboard .zob-page p {
        position:relative;z-index:1;color:#142b52!important;
        opacity:1!important;visibility:visible!important;
        white-space:normal;overflow-wrap:anywhere;
      }
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
      
      /* VIBRANT, PHOTOGRAPHIC HOME DASHBOARD REFINEMENT */
      body {
        background: linear-gradient(180deg,#f5f2e9 0%,#edf3f8 48%,#e8eff7 100%);
        color: #17283e;
      }
      #zurielHomeDashboard {
        color: #17283e;
        max-width: 780px;
        padding: 8px 12px 18px;
      }
      #zurielHomeDashboard .home-hero {
        min-height: 228px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-image: linear-gradient(135deg,rgba(8,24,46,.82),rgba(12,48,70,.56)),var(--zuriel-home-wallpaper);
        background-size: cover;
        background-position: center;
        border: 1px solid #c6d8e8;
        box-shadow: 0 14px 32px rgba(18,44,70,.18);
        text-align: left;
      }
      #zurielHomeDashboard .home-eyebrow {
        align-self: flex-start;
        background: rgba(255,255,255,.15);
        border-color: rgba(255,255,255,.35);
      }
      #zurielHomeDashboard .home-tagline,
      #zurielHomeDashboard .home-brand,
      #zurielHomeDashboard .home-subtitle { margin-left: 0; margin-right: 0; text-align: left; }
      #zurielHomeDashboard .home-brand { max-width: 540px; text-shadow: 0 2px 12px rgba(0,0,0,.25); }
      #zurielHomeDashboard .home-card {
        color: #1a2b40;
        background: linear-gradient(145deg,#ffffff,#f4f7fa);
        border: 1px solid #d4e0e9;
        box-shadow: 0 8px 22px rgba(19,45,71,.08);
      }
      #zurielHomeDashboard .home-card h2 { color: #174c78; }
      #zurielHomeDashboard .home-continue-card {
        background: linear-gradient(120deg,#eaf4fb,#ffffff);
        border: 1px solid #bdd8ea;
      }
      #zurielHomeDashboard #zurielHomeReadingPosition { color: #354a60; }
      #zurielHomeDashboard .home-scripture-card {
        position: relative;
        overflow: hidden;
        background-image: linear-gradient(135deg,rgba(8,24,43,.78),rgba(8,38,48,.48)),url("https://images.unsplash.com/photo-1595132169434-097c5ae1a145?auto=format&fit=crop&fm=jpg&q=82&w=1800");
        background-size: cover;
        background-position: center;
        border-color: #bfd5e4;
      }
      #zurielHomeDashboard .home-scripture-card h2,
      #zurielHomeDashboard .home-scripture-card .home-reference,
      #zurielHomeDashboard .home-scripture-card .home-subtitle { color: #fff; }
      #zurielHomeDashboard .home-scripture-card .home-verse {
        border: 1px solid rgba(255,255,255,.35);
        border-left: 3px solid #f2d58d;
        background: rgba(6,19,34,.54);
        color: #fff;
        text-shadow: 0 1px 3px rgba(0,0,0,.25);
      }
      #zurielHomeDashboard .home-button {
        border: 1px solid #b6d2e6;
        background: linear-gradient(115deg,#dff1fc,#c5e3f6);
        color: #143c60;
        box-shadow: 0 4px 12px rgba(24,67,100,.10);
      }
      #zurielHomeDashboard .home-hero .home-button {
        background: linear-gradient(110deg,#f7df9f,#e8c66e);
        color: #142b46;
        border-color: #ffe7ad;
      }
      #zurielHomeDashboard .home-scripture-card .home-button {
        background: rgba(255,255,255,.93);
        color: #163c5d;
        border-color: #d9e7f0;
      }
      #zurielHomeDashboard .home-grid button,
      #zurielHomeDashboard .home-explore-grid button {
        background: linear-gradient(145deg,#ffffff,#edf5fb);
        border: 1px solid #c8dce9;
        color: #173c5c;
        box-shadow: 0 4px 12px rgba(23,60,92,.06);
      }
      #zurielHomeDashboard .home-explore-grid button small { color: #526a7f; }
      #zurielHomeDashboard details {
        background: #f8fbfd;
        border-color: #d6e4ee;
        border-left-color: #4a91c5;
      }
      #zurielHomeDashboard details summary { color: #174c78; }
      #zurielHomeDashboard details p { color: #344b60; }
      #zurielHomeDashboard .home-growth-highlight {
        background: linear-gradient(145deg,#ffffff,#f0f6fa);
        border-color: #c8dce9;
      }
      #zurielHomeDashboard .zob-landscape {
        background-image: linear-gradient(180deg,rgba(6,20,35,.20),rgba(6,20,35,.45)),url("https://images.unsplash.com/photo-1759182391264-73c1be282907?auto=format&fit=crop&fm=jpg&q=82&w=1800");
        background-size: cover;
        background-position: center;
        border-color: #d6c18a;
      }
      #zurielHomeDashboard .zob-brandline,
      #zurielHomeDashboard .zob-footer { box-shadow: 0 5px 14px rgba(0,0,0,.25); }
      #zurielBottomNavigation {
        grid-template-columns: repeat(6,minmax(0,1fr));
        background: linear-gradient(105deg,#102b4c,#244e83,#315c91);
        border-top: 1px solid #9fc6e2;
        box-shadow: 0 -5px 18px rgba(12,34,58,.18);
      }
      #zurielBottomNavigation button { color: #eef6fc; font-size: 10px; }
      #zurielBottomNavigation button.active {
        background: linear-gradient(135deg,#9bdcf5,#48c1e5);
        color: #102c49;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.55);
      }
      #zurielTopReturnBar {
        background: linear-gradient(105deg,#102b4c,#1d4771);
        border-bottom-color: #8fc8e6;
      }
      #zurielTopBack {
        background: rgba(255,255,255,.13);
        border-color: rgba(255,255,255,.4);
        color: #fff;
      }
      #zurielTopSection { color: #f4dfaa; }
      @media(max-width:420px) {
        #zurielHomeDashboard { padding-left: 9px; padding-right: 9px; }
        #zurielHomeDashboard .home-hero { min-height: 210px; }
        #zurielHomeDashboard .home-card { border-radius: 16px; }
      }
    `;

    const identityHeroStyle = document.createElement("style");
    identityHeroStyle.textContent = `
      #zurielHomeDashboard .home-identity-hero {
        position:relative; isolation:isolate; overflow:hidden; min-height:340px;
        display:flex; flex-direction:column; justify-content:center; align-items:flex-start;
        gap:8px; padding:clamp(25px,6vw,42px) clamp(18px,5vw,34px);
        border:1px solid #d9bd78; border-radius:24px;
        background-color:#10213d;
        background-image:linear-gradient(100deg,rgba(5,17,35,.88),rgba(8,29,49,.54) 68%,rgba(8,29,49,.28)),var(--zuriel-home-wallpaper);
        background-size:cover; background-position:center;
        box-shadow:0 16px 34px rgba(8,24,43,.24);
        transition:background-image .35s ease,opacity .35s ease;
      }
      #zurielHomeDashboard .home-identity-hero::after {
        content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
        background:linear-gradient(0deg,rgba(5,16,32,.30),transparent 58%);
      }
      #zurielHomeDashboard .home-identity-hero .home-eyebrow {
        margin:0 0 5px;color:#ffe8b0;border-color:rgba(255,232,176,.55);
        background:rgba(6,19,35,.36);letter-spacing:1.4px;
      }
      #zurielHomeDashboard .identity-kicker {
        margin:5px 0 0;color:#f5d88e;font:700 12px/1.3 Arial,sans-serif;letter-spacing:2.4px;
      }
      #zurielHomeDashboard .identity-title {
        margin:0;max-width:650px;color:#fff9eb;
        font:700 clamp(30px,7vw,48px)/1.12 Georgia,serif;letter-spacing:-.6px;
        text-shadow:0 3px 18px rgba(0,0,0,.35);
      }
      #zurielHomeDashboard .identity-verse {
        max-width:620px;min-height:64px;margin:8px 0 0;padding:13px 15px;
        border-left:3px solid #f0d38b;border-radius:0 12px 12px 0;
        background:rgba(5,17,32,.55);color:#fffdf7;
        font:400 clamp(17px,4.3vw,21px)/1.65 Georgia,serif;
        text-shadow:0 1px 4px rgba(0,0,0,.35);
        transition:opacity .28s ease;
      }
      #zurielHomeDashboard .identity-reference {
        margin:0;color:#ffe2a0;font:700 14px/1.4 Arial,sans-serif;letter-spacing:.35px;
      }
      #zurielHomeDashboard .identity-actions {
        display:flex;flex-wrap:wrap;gap:9px;width:100%;max-width:430px;margin-top:7px;
      }
      #zurielHomeDashboard .identity-actions .home-button {
        flex:1 1 155px;width:auto;min-height:46px;margin:0;padding:11px 12px;
      }
      #zurielHomeDashboard .identity-actions .identity-next {
        background:rgba(255,255,255,.94);color:#17314d;border-color:#f3e1b5;
      }
      #zurielHomeDashboard .home-identity-hero .home-tagline {
        margin:10px 0 0;color:#ffe5a6;font:700 12px/1.4 Arial,sans-serif;letter-spacing:.3px;
      }
      #zurielHomeDashboard .identity-progress {
        position:absolute;left:0;right:0;bottom:0;height:3px;
        background:linear-gradient(90deg,#f3d58c,#fff1c8);opacity:.9;
      }
      @media(max-width:420px) {
        #zurielHomeDashboard .home-identity-hero {min-height:330px;border-radius:19px;padding:24px 15px;}
        #zurielHomeDashboard .identity-title {font-size:clamp(29px,8vw,38px);}
        #zurielHomeDashboard .identity-verse {font-size:17px;min-height:72px;}
        #zurielHomeDashboard .identity-actions {display:grid;grid-template-columns:1fr 1fr;}
        #zurielHomeDashboard .identity-actions .home-button {font-size:12px;padding:10px 7px;}
      }
      @media(prefers-reduced-motion:reduce) {
        #zurielHomeDashboard .identity-verse,
        #zurielHomeDashboard .home-identity-hero {transition:none;}
      }
    `;
    document.head.appendChild(style);
    document.head.appendChild(identityHeroStyle);

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
      <section class="home-card home-translations-card" id="zurielHomeTranslationsSection" aria-label="Bible translations">
        <h2>🌐 Bible Translations</h2>
        <p class="home-section-note">Choose a Bible version for reading, comparison and offline study.</p>
        <div class="translation-shortcuts" aria-label="Supported translation catalogue">
          <span>KJV</span><span>GNT</span><span>AMP</span><span>LB/LT</span><span>TPT</span><span>NLT</span>
          <span>NET</span><span>NIV</span><span>ESV</span><span>NASB</span><span>CSB</span><span>NKJV</span>
        </div>
        <p class="translation-access-note">Select a translation below. Downloaded translations can be read offline; online access and downloads depend on each provider’s available catalogue and permissions.</p>
        <div id="zurielHomeTranslations"></div>
      </section>

      <section class="home-hero home-identity-hero" id="zurielIdentityHero" aria-label="Who God is — rotating Scripture">
        <p class="home-eyebrow">✦ WHO HE IS • THE LIVING WORD</p>
        <p class="identity-kicker">HE IS...</p>
        <h1 class="identity-title" id="zurielIdentityTitle">My Healer</h1>
        <p class="identity-verse" id="zurielIdentityVerse" aria-live="polite">Loading the exact King James Version Scripture…</p>
        <p class="identity-reference" id="zurielIdentityReference">Psalm 103:3</p>
        <div class="identity-actions">
          <button class="home-button" id="zurielIdentityRead" type="button">📖 Read This Scripture</button>
          <button class="home-button" id="zurielIdentityShare" type="button">🖼️ Create & Share This Revelation</button>
          <button class="home-button identity-next" id="zurielIdentityNext" type="button" aria-label="Show the next name and Scripture">Next Revelation →</button>
        </div>
        <p class="home-tagline">His Words.. My life.. My Victory</p>
        <p id="zurielIdentityShareStatus" class="home-subtitle" aria-live="polite"></p>
        <span class="identity-progress" id="zurielIdentityProgress" aria-hidden="true"></span>
      </section>

      <section class="home-card home-continue-card">
        <h2>↩️ Continue Reading</h2>
        <p id="zurielHomeReadingPosition">Your last Scripture will appear here.</p>
        <button class="home-button" id="zurielHomeContinueReading">
          Continue from Your Last Chapter
        </button>
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

      

      <section class="home-card home-growth-highlight" id="zurielOpenBookFaithCard">
        <div class="zob-landscape">
          <p class="zob-brandline">His Words.. My life.. My Victory</p>
          <div class="zob-book">
            <div class="zob-page zob-scripture-page">
              <span class="zob-ribbon" id="zurielOpenBookReference">SCRIPTURE</span>
              <p class="zob-scripture-copy" id="zurielOpenBookScripture">Your Scripture for today.</p>
            </div>
            <div class="zob-page zob-response-page">
              <span class="zob-ribbon">MY FAITH RESPONSE</span>
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
          <button type="button" class="home-button" id="zurielOpenBookCreateCard">🖼️ Create & Share Card</button>
        </div>
        <p id="zurielOpenBookCardStatus" class="home-subtitle" aria-live="polite"></p>
        <details open>
          <summary>🙏 Prayer</summary>
          <p id="zurielOpenBookPrayer"></p>
        </details>
        <details open>
          <summary>🕊️ Faith Confession</summary>
          <p id="zurielOpenBookConfession"></p>
        </details>
        <details open>
          <summary>🌿 Inspiration</summary>
          <p id="zurielOpenBookInspiration"></p>
        </details>
        <details open>
          <summary>🕯️ Light</summary>
          <p id="zurielOpenBookLight">Thy word is a lamp unto my feet, and a light unto my path. — Psalm 119:105</p>
        </details>
      </section>

      <section class="home-card home-daily-scriptures" id="zurielHomeVerseCollection" aria-labelledby="zurielHomeVerseCollectionTitle">
        <h2 id="zurielHomeVerseCollectionTitle">📖 Three Scriptures to Carry Today</h2>
        <p class="home-section-note">Three complete passages, loaded from the offline King James Version. Open any verse to read its chapter.</p>
        <div class="home-daily-scripture-list">
          <article class="home-daily-scripture" data-reference="Psalm 23:1">
            <p class="home-daily-scripture-text">Loading Psalm 23:1…</p>
            <p class="home-daily-scripture-reference">Psalm 23:1</p>
            <button class="home-button" type="button" data-home-read-reference="Psalm 23:1">Read in Bible</button>
          </article>
          <article class="home-daily-scripture" data-reference="Isaiah 41:10">
            <p class="home-daily-scripture-text">Loading Isaiah 41:10…</p>
            <p class="home-daily-scripture-reference">Isaiah 41:10</p>
            <button class="home-button" type="button" data-home-read-reference="Isaiah 41:10">Read in Bible</button>
          </article>
          <article class="home-daily-scripture" data-reference="Philippians 4:13">
            <p class="home-daily-scripture-text">Loading Philippians 4:13…</p>
            <p class="home-daily-scripture-reference">Philippians 4:13</p>
            <button class="home-button" type="button" data-home-read-reference="Philippians 4:13">Read in Bible</button>
          </article>
        </div>
      </section>

      <section class="home-card home-explore-card" aria-labelledby="zurielExploreTitle">
        <h2 id="zurielExploreTitle">Explore Zuriel</h2>
        <p class="home-section-note">Each space has its own purpose. Open the one you need.</p>
        <div class="home-explore-grid">
          <button type="button" data-section="declare">
            <span aria-hidden="true">🔥</span>
            <strong>Declarations</strong>
            <small>Speak Scripture-based faith</small>
          </button>
          <button type="button" data-section="devotional">
            <span aria-hidden="true">🕊️</span>
            <strong>Devotionals</strong>
            <small>Grow through daily reflection</small>
          </button>
        </div>
      </section>
    `;

    const homeWallpaperSet = [
      "https://images.unsplash.com/photo-1765758693002-120e6ab36b87?auto=format&fit=crop&fm=jpg&q=82&w=1800",
      "https://images.unsplash.com/photo-1768365423849-6f694d85cf33?auto=format&fit=crop&fm=jpg&q=82&w=1800",
      "https://images.unsplash.com/photo-1759182391264-73c1be282907?auto=format&fit=crop&fm=jpg&q=82&w=1800",
      "https://images.unsplash.com/photo-1595132169434-097c5ae1a145?auto=format&fit=crop&fm=jpg&q=82&w=1800"
    ];
    homeWallpaperSet.push("https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&fm=jpg&q=82&w=1800");
    const homeWallpaperIndex = Math.floor(Date.now() / 86400000) % homeWallpaperSet.length;
    dashboard.style.setProperty("--zuriel-home-wallpaper", 'url("' + homeWallpaperSet[homeWallpaperIndex] + '")');

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

    /* MOBILE NAVIGATION SAFEGUARDS
       Keep every destination visible above Android's system navigation area.
       The Settings module adds the seventh destination after this module loads. */
    if (!document.getElementById("zurielMobileNavigationSafeguards")) {
      const navigationSafetyStyle = document.createElement("style");
      navigationSafetyStyle.id = "zurielMobileNavigationSafeguards";
      navigationSafetyStyle.textContent = `
        :root { --zuriel-bottom-navigation-space: 96px; }
        body {
          padding-bottom: calc(var(--zuriel-bottom-navigation-space) + env(safe-area-inset-bottom, 0px)) !important;
        }
        main {
          padding-bottom: calc(18px + var(--zuriel-bottom-navigation-space) + env(safe-area-inset-bottom, 0px));
        }
        #zurielBottomNavigation {
          box-sizing: border-box;
          grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
          min-height: calc(70px + env(safe-area-inset-bottom, 0px));
          padding: 6px max(5px, env(safe-area-inset-left, 0px))
            calc(7px + env(safe-area-inset-bottom, 0px))
            max(5px, env(safe-area-inset-right, 0px));
        }
        #zurielBottomNavigation button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          min-height: 54px;
          padding: 5px 1px;
          font-size: clamp(8px, 2.35vw, 10px) !important;
          line-height: 1.12;
          white-space: normal;
          overflow-wrap: anywhere;
          text-align: center;
        }
        #zurielBottomNavigation button span {
          flex: 0 0 auto;
          margin: 0;
          line-height: 1;
          font-size: clamp(17px, 4.7vw, 20px);
        }
        #zurielTopReturnBar {
          top: env(safe-area-inset-top, 0px);
          scroll-margin-top: env(safe-area-inset-top, 0px);
        }
        #zurielHomeDashboard,
        #bibleReader,
        #zurielLibrary,
        #zurielStudyPanel,
        #zurielKingdomLife,
        #zurielPersonalSpace {
          scroll-margin-bottom: calc(var(--zuriel-bottom-navigation-space) + env(safe-area-inset-bottom, 0px));
        }
        @media (max-width: 360px) {
          #zurielBottomNavigation { gap: 0; }
          #zurielBottomNavigation button { font-size: 8px !important; padding-left: 0; padding-right: 0; }
          #zurielBottomNavigation button span { font-size: 16px; }
        }
      `;
      document.head.appendChild(navigationSafetyStyle);
    }

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
          window.ZurielLibrary.open("saved");
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

    // The former zurielHomeOpenBible control was retired from the dashboard.
    // Do not bind events to removed markup: one null listener previously
    // stopped every Home interaction and asynchronous Scripture panel below.
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
            if (typeof window.selectBibleVerse === "function") {
              window.selectBibleVerse(saved.verse);
            }
          }
        }
      });

    updateHomeReadingPosition();

    dashboard.querySelectorAll("[data-section]")
      .forEach(function (button) {
        button.addEventListener("click", function () {
          navigate(button.dataset.section);
        });
      });

    /* Passage selection is handled by the single full-screen reader navigator. */

    /* CONTINUOUS IDENTITY SCRIPTURE HERO.
       Each title, exact KJV verse and photographic background move as one unit. */
    const identityScriptures = [
      { title: "My Healer", reference: "Psalm 103:3", wallpaper: 0 % homeWallpaperSet.length },
      { title: "My Comforter", reference: "John 14:16", wallpaper: 1 % homeWallpaperSet.length },
      { title: "My Provider", reference: "Genesis 22:14", wallpaper: 2 % homeWallpaperSet.length },
      { title: "Everlasting Father", reference: "Isaiah 9:6", wallpaper: 3 % homeWallpaperSet.length },
      { title: "The Glorious King", reference: "Psalm 24:10", wallpaper: 4 % homeWallpaperSet.length },
      { title: "My Shepherd", reference: "Psalm 23:1", wallpaper: 5 % homeWallpaperSet.length },
      { title: "My Refuge", reference: "Psalm 46:1", wallpaper: 6 % homeWallpaperSet.length },
      { title: "My Strength", reference: "Isaiah 40:29", wallpaper: 7 % homeWallpaperSet.length },
      { title: "My Peace", reference: "John 14:27", wallpaper: 8 % homeWallpaperSet.length },
      { title: "My Light", reference: "Psalm 27:1", wallpaper: 9 % homeWallpaperSet.length },
      { title: "My Redeemer", reference: "Job 19:25", wallpaper: 10 % homeWallpaperSet.length },
      { title: "My Rock", reference: "Psalm 18:2", wallpaper: 11 % homeWallpaperSet.length },
      { title: "My Fortress", reference: "Psalm 91:2", wallpaper: 12 % homeWallpaperSet.length },
      { title: "My Shield", reference: "Genesis 15:1", wallpaper: 13 % homeWallpaperSet.length },
      { title: "My Hope", reference: "Romans 15:13", wallpaper: 14 % homeWallpaperSet.length },
      { title: "My Wisdom", reference: "James 1:5", wallpaper: 15 % homeWallpaperSet.length },
      { title: "My Salvation", reference: "Isaiah 12:2", wallpaper: 16 % homeWallpaperSet.length },
      { title: "My Deliverer", reference: "Psalm 34:17", wallpaper: 17 % homeWallpaperSet.length },
      { title: "My Sustainer", reference: "Hebrews 1:3", wallpaper: 18 % homeWallpaperSet.length },
      { title: "My Advocate", reference: "1 John 2:1", wallpaper: 19 % homeWallpaperSet.length },
      { title: "My Intercessor", reference: "Hebrews 7:25", wallpaper: 20 % homeWallpaperSet.length },
      { title: "My High Priest", reference: "Hebrews 4:14", wallpaper: 21 % homeWallpaperSet.length },
      { title: "My Friend", reference: "John 15:15", wallpaper: 22 % homeWallpaperSet.length },
      { title: "The Bread of Life", reference: "John 6:35", wallpaper: 23 % homeWallpaperSet.length },
      { title: "The Good Shepherd", reference: "John 10:11", wallpaper: 24 % homeWallpaperSet.length },
      { title: "The Resurrection and the Life", reference: "John 11:25", wallpaper: 25 % homeWallpaperSet.length },
      { title: "The Way, the Truth and the Life", reference: "John 14:6", wallpaper: 26 % homeWallpaperSet.length },
      { title: "The True Vine", reference: "John 15:1", wallpaper: 27 % homeWallpaperSet.length },
      { title: "The King of Kings", reference: "1 Timothy 6:15", wallpaper: 28 % homeWallpaperSet.length },
      { title: "The Lord of Lords", reference: "Deuteronomy 10:17", wallpaper: 29 % homeWallpaperSet.length },
      { title: "The Ancient of Days", reference: "Daniel 7:9", wallpaper: 30 % homeWallpaperSet.length },
      { title: "Faithful and True", reference: "Revelation 19:11", wallpaper: 31 % homeWallpaperSet.length },
      { title: "The Alpha and Omega", reference: "Revelation 22:13", wallpaper: 32 % homeWallpaperSet.length },
      { title: "Immanuel — God With Us", reference: "Matthew 1:23", wallpaper: 33 % homeWallpaperSet.length },
      { title: "Wonderful Counsellor", reference: "Isaiah 9:6", wallpaper: 34 % homeWallpaperSet.length },
      { title: "Mighty God", reference: "Isaiah 9:6", wallpaper: 35 % homeWallpaperSet.length },
      { title: "The Door", reference: "John 10:9", wallpaper: 36 % homeWallpaperSet.length },
      { title: "The Living Water", reference: "John 7:37", wallpaper: 37 % homeWallpaperSet.length },
      { title: "The Lamb of God", reference: "John 1:29", wallpaper: 38 % homeWallpaperSet.length },
      { title: "The Bright Morning Star", reference: "Revelation 22:16", wallpaper: 39 % homeWallpaperSet.length },
      { title: "The Author and Finisher of Faith", reference: "Hebrews 12:2", wallpaper: 40 % homeWallpaperSet.length },
      { title: "The Lord Who Sanctifies", reference: "Exodus 31:13", wallpaper: 41 % homeWallpaperSet.length },
      { title: "The God Who Sees Me", reference: "Genesis 16:13", wallpaper: 42 % homeWallpaperSet.length },
      { title: "The God of All Comfort", reference: "2 Corinthians 1:3", wallpaper: 43 % homeWallpaperSet.length },
      { title: "The Father of Mercies", reference: "2 Corinthians 1:3", wallpaper: 44 % homeWallpaperSet.length },
      { title: "The Everlasting God", reference: "Isaiah 40:28", wallpaper: 45 % homeWallpaperSet.length },
      { title: "The Holy One", reference: "Isaiah 43:15", wallpaper: 46 % homeWallpaperSet.length },
      { title: "The Righteous Judge", reference: "2 Timothy 4:8", wallpaper: 47 % homeWallpaperSet.length },
      { title: "The Giver of Every Good Gift", reference: "James 1:17", wallpaper: 48 % homeWallpaperSet.length },
      { title: "The Unchanging One", reference: "Malachi 3:6", wallpaper: 49 % homeWallpaperSet.length },
      { title: "The Lord Our Banner", reference: "Exodus 17:15", wallpaper: 50 % homeWallpaperSet.length },
      { title: "The Lord Who Gives Peace", reference: "Judges 6:24", wallpaper: 51 % homeWallpaperSet.length },
      { title: "The Lord Our Righteousness", reference: "Jeremiah 23:6", wallpaper: 52 % homeWallpaperSet.length },
      { title: "The Lord Who Is There", reference: "Ezekiel 48:35", wallpaper: 53 % homeWallpaperSet.length }
    ];
    const identityHero = document.getElementById("zurielIdentityHero");
    const identityTitle = document.getElementById("zurielIdentityTitle");
    const identityVerse = document.getElementById("zurielIdentityVerse");
    const identityReference = document.getElementById("zurielIdentityReference");
    const identityRead = document.getElementById("zurielIdentityRead");
    const identityNext = document.getElementById("zurielIdentityNext");
    const identityProgress = document.getElementById("zurielIdentityProgress");
    let identityIndex = Math.floor(Date.now() / 86400000) % identityScriptures.length;
    let identityRenderToken = 0;

    async function renderIdentityScripture(nextIndex) {
      identityIndex = (nextIndex + identityScriptures.length) % identityScriptures.length;
      const item = identityScriptures[identityIndex];
      const token = ++identityRenderToken;
      identityHero.style.opacity = "0.82";
      identityTitle.textContent = item.title;
      identityReference.textContent = item.reference;
      identityVerse.style.opacity = "0";
      identityProgress.style.width = ((identityIndex + 1) / identityScriptures.length * 100) + "%";
      dashboard.style.setProperty("--zuriel-home-wallpaper", 'url("' + homeWallpaperSet[item.wallpaper] + '")');
      const nextItem = identityScriptures[(identityIndex + 1) % identityScriptures.length];
      const preload = new Image();
      preload.decoding = "async";
      preload.src = homeWallpaperSet[nextItem.wallpaper];
      try {
        if (typeof window.getBibleVerseText !== "function") {
          throw new Error("The offline KJV Scripture service is not ready.");
        }
        const passage = await window.getBibleVerseText(item.reference);
        if (token !== identityRenderToken) return;
        const exactText = String(passage && passage.text || "").replace(/^\d+\.\s*/, "").trim();
        if (!exactText) throw new Error("The exact KJV verse was not returned.");
        identityVerse.textContent = "“" + exactText + "”";
      } catch (error) {
        if (token !== identityRenderToken) return;
        identityVerse.textContent = "Open this reference in Read Scripture to view the exact King James Version text.";
      }
      identityVerse.style.opacity = "1";
      identityHero.style.opacity = "1";
    }

    function openIdentityReference() {
      const item = identityScriptures[identityIndex];
      const match = item.reference.match(/^(.+)\s+(\d+):(\d+)$/);
      if (!match || typeof window.openChapter !== "function") return;
      const bookName = canonicalBookName(match[1]);
      navigate("read");
      const bookSelector = document.getElementById("book");
      if (bookSelector) bookSelector.value = bookName;
      window.openChapter(bookName, Number(match[2])).then(function () {
        if (typeof window.selectBibleVerse !== "function" ||
            !window.selectBibleVerse(Number(match[3]))) {
          throw new Error("The selected identity Scripture could not be opened.");
        }
      }).catch(function (error) {
        console.error("Zuriel identity Scripture:", error);
      });
    }

    identityRead.addEventListener("click", openIdentityReference);
    const identityShare = document.getElementById("zurielIdentityShare");
    if (identityShare) identityShare.addEventListener("click", async function () {
      const item = identityScriptures[identityIndex];
      const status = document.getElementById("zurielIdentityShareStatus");
      identityShare.disabled = true;
      try {
        if (typeof window.getBibleVerseText !== "function" || !window.ZurielLibrary ||
            typeof window.ZurielLibrary.openGloryVerse !== "function") {
          throw new Error("The Scripture share-card studio is not ready yet.");
        }
        const passage = await window.getBibleVerseText(item.reference);
        const exactText = String(passage && passage.text || "").replace(/^\\d+\\.\\s*/, "").trim();
        if (!exactText) throw new Error("The exact KJV Scripture could not be loaded.");
        const response = window.ZurielFaithContent &&
          typeof window.ZurielFaithContent.find === "function"
          ? window.ZurielFaithContent.find(item.reference) : {};
        // Carry the approved WHO HE IS revelation title into the shareable
        // declaration itself, so it remains visible in preview, PNG and saves.
        const revelationResponse = Object.assign({}, response || {});
        const identityTitle = String(item.title || "").trim();
        if (identityTitle) {
          revelationResponse.declaration =
            "HE IS " + identityTitle.toUpperCase() + ".\n\n" +
            String(revelationResponse.declaration || "").trim();
        }
        navigate("library");
        const opened = window.ZurielLibrary.openGloryVerse(
          item.reference, exactText, "KJV", revelationResponse
        );
        if (!opened) throw new Error("The share-card studio could not be opened.");
      } catch (error) {
        if (status) status.textContent = error.message || "Unable to prepare this revelation.";
      } finally {
        identityShare.disabled = false;
      }
    });
    identityNext.addEventListener("click", function () {
      renderIdentityScripture(identityIndex + 1);
    });
    renderIdentityScripture(identityIndex);
    // Revelation changes only when the reader taps "Next Revelation".
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
        renderOpenBookFaithCard();
      });

    /* OPEN HOME VERSE IN THE READER */

    document.getElementById("zurielSaveVerse")
      .addEventListener("click", function () {
        const reference = verses[verseIndex].reference;
        const match = reference.match(/^(.+)\s+(\d+):(\d+)$/);
        const bookName = match ? canonicalBookName(match[1]) : "";

        if (!match || typeof window.openChapter !== "function") return;

        navigate("read");

        const bookSelector = document.getElementById("book");

        if (bookSelector) {
          bookSelector.value = bookName;
        }

        window.openChapter(bookName, Number(match[2]))
          .then(function () {
            if (typeof window.selectBibleVerse !== "function" ||
                !window.selectBibleVerse(Number(match[3]))) {
              throw new Error("The home Scripture could not be activated in the Bible reader.");
            }
          }).catch(function (error) {
            console.error("Zuriel home Scripture:", error);
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

    // Scripture for Today remains stable until the reader chooses another verse.
    /* SCRIPTURE-LINKED OPEN BOOK: use the curated faith response for the
       exact reference. Never manufacture a prayer or declaration when no
       matching entry exists. */
    let faithCardRenderToken = 0;
    async function renderOpenBookFaithCard() {
      const renderToken = ++faithCardRenderToken;
      const verse = verses[verseIndex];
      const setText = function (id, value) {
        const node = document.getElementById(id);
        if (node) node.textContent = value || "This reflection is not supplied yet.";
      };
      if (!verse) {
        setText("zurielOpenBookScripture", "No Scripture passage is available for this card yet.");
        return;
      }
      function getFaithResponse(item) {
        return window.ZurielFaithContent &&
          typeof window.ZurielFaithContent.find === "function"
          ? window.ZurielFaithContent.find(item.reference)
          : null;
      }
      const response = getFaithResponse(verse);

      setText("zurielOpenBookReference", verse.reference.toUpperCase());
      if (!response) {
        setText("zurielOpenBookDeclaration", "A declaration is not yet supplied for this Scripture.");
        setText("zurielOpenBookAffirmation", "An affirmation is not yet supplied for this Scripture.");
        setText("zurielOpenBookPrayer", "A prayer is not yet supplied for this Scripture.");
        setText("zurielOpenBookConfession", "A confession is not yet supplied for this Scripture.");
        setText("zurielOpenBookInspiration", "An inspiration is not yet supplied for this Scripture.");
      }
      setText("zurielOpenBookScripture", "Loading the exact King James Version passage…");
      if (response) {
        setText("zurielOpenBookDeclaration", response.declaration);
        setText("zurielOpenBookAffirmation", response.affirmation);
        setText("zurielOpenBookPrayer", response.prayer);
        setText("zurielOpenBookConfession", response.confession);
        setText("zurielOpenBookInspiration", response.inspiration);
      }

      try {
        if (typeof window.getBibleVerseText !== "function") {
          throw new Error("The offline KJV passage service is not available.");
        }
        const passage = await window.getBibleVerseText(verse.reference);
        if (renderToken !== faithCardRenderToken) return;
        const exactText = String(passage && passage.text || "").replace(/^\d+\.\s*/, "").trim();
        if (!exactText) throw new Error("The KJV passage returned no verse text.");
        setText("zurielOpenBookReference", String(passage.reference || verse.reference).toUpperCase());
        setText("zurielOpenBookScripture", exactText);
      } catch (error) {
        if (renderToken !== faithCardRenderToken) return;
        setText("zurielOpenBookScripture", "The exact KJV passage could not be loaded. Please open this reference in Read Scripture and try again.");
      }
    }

    renderOpenBookFaithCard();

    const nextFaithWord = document.getElementById("zurielOpenBookNext");
    if (nextFaithWord) nextFaithWord.addEventListener("click", function () {
      displayVerse(verseIndex + 1);
      renderOpenBookFaithCard();
    });

    const readFaithWord = document.getElementById("zurielOpenBookRead");
    if (readFaithWord) readFaithWord.addEventListener("click", async function () {
      const verse = verses[verseIndex];
      const match = verse && verse.reference.match(/^(.+)\s+(\d+):(\d+)$/);
      if (!match || typeof window.openChapter !== "function") return;
      const bookName = canonicalBookName(match[1]);
      navigate("read");
      const selector = document.getElementById("book");
      if (selector) selector.value = bookName;
      await window.openChapter(bookName, Number(match[2]));
      if (typeof window.selectBibleVerse !== "function" ||
          !window.selectBibleVerse(Number(match[3]))) {
        throw new Error("The Open Book Scripture could not be activated in the Bible reader.");
      }
    });

    /* CONNECT THE HOME OPEN BOOK TO THE EXISTING SHARE-CARD STUDIO.
       Carry the exact selected KJV verse and only its matching curated response. */
    const createShareCardButton = document.getElementById("zurielOpenBookCreateCard");
    if (createShareCardButton) {
      createShareCardButton.addEventListener("click", async function () {
        const status = document.getElementById("zurielOpenBookCardStatus");
        const verse = verses[verseIndex];
        if (!verse || typeof window.getBibleVerseText !== "function") {
          if (status) status.textContent = "The offline Scripture service is not ready. Please try again.";
          return;
        }
        createShareCardButton.disabled = true;
        if (status) status.textContent = "Preparing your exact Scripture for the share-card studio…";
        try {
          const passage = await window.getBibleVerseText(verse.reference);
          const scriptureText = String(passage && passage.text || "")
            .replace(/^\\d+\\.\\s*/, "").trim();
          if (!scriptureText) throw new Error("The exact KJV verse text could not be loaded.");
          if (!window.ZurielLibrary ||
              typeof window.ZurielLibrary.openGloryVerse !== "function") {
            throw new Error("The Glory Verse Affirmation Studio is not available yet.");
          }
          const faithResponse = window.ZurielFaithContent &&
            typeof window.ZurielFaithContent.find === "function"
            ? window.ZurielFaithContent.find(verse.reference) : null;
          navigate("library");
          const opened = window.ZurielLibrary.openGloryVerse(
            verse.reference, scriptureText, "KJV", faithResponse || {}
          );
          if (!opened) throw new Error("The share-card studio could not be opened.");
          if (status) status.textContent = "Your Scripture is ready in Glory Verse Affirmation Studio. Use Download image or Share image there.";
        } catch (error) {
          if (status) status.textContent = error.message || "The share card could not be prepared.";
        } finally {
          createShareCardButton.disabled = false;
        }
      });
    }

    /* THREE SIMULTANEOUS HOME VERSES.
       Text always comes from the bundled offline KJV; never substitute a paraphrase. */
    const dailyVerseCards = dashboard.querySelectorAll("[data-home-read-reference]");
    dailyVerseCards.forEach(function (button) {
      button.addEventListener("click", async function () {
        const match = String(button.dataset.homeReadReference || "").match(/^(.+)\s+(\d+):(\d+)$/);
        if (!match || typeof window.openChapter !== "function") return;
        const bookName = canonicalBookName(match[1]);
        button.disabled = true;
        try {
          navigate("read");
          const selector = document.getElementById("book");
          if (selector) selector.value = bookName;
          await window.openChapter(bookName, Number(match[2]));
          if (typeof window.selectBibleVerse !== "function" ||
              !window.selectBibleVerse(Number(match[3]))) {
            throw new Error("The selected Home Scripture could not be opened.");
          }
        } catch (error) {
          console.error("Zuriel Home Scripture collection:", error);
        } finally {
          button.disabled = false;
        }
      });
    });
    dashboard.querySelectorAll(".home-daily-scripture").forEach(async function (card) {
      const reference = card.dataset.reference;
      const textNode = card.querySelector(".home-daily-scripture-text");
      try {
        if (typeof window.getBibleVerseText !== "function") {
          throw new Error("The offline Bible service is unavailable.");
        }
        const passage = await window.getBibleVerseText(reference);
        const exactText = String(passage && passage.text || "").replace(/^\d+\.\s*/, "").trim();
        if (!exactText) throw new Error("No exact KJV verse text was returned.");
        textNode.textContent = exactText;
      } catch (error) {
        textNode.textContent = "This offline Scripture could not be loaded. Open the Bible reader and try again.";
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

