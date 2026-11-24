
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
      { reference: "Isaiah 40:31", text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." },
      { reference: "Romans 8:28", text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
      { reference: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me." },
      { reference: "John 15:5", text: "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing." },
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
        display:flex;flex-wrap:nowrap;gap:8px;margin:12px -2px;padding:2px 2px 10px;
        overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;
        scrollbar-width:thin;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;
      }
      #zurielHomeDashboard .translation-shortcuts button {
        display:flex;flex:0 0 auto;align-items:center;justify-content:center;min-width:58px;min-height:42px;
        width:auto;padding:8px 13px;border:1px solid #c8ad70;border-radius:22px;scroll-snap-align:start;
        background:#f7f3e8; color:#19324f; font:700 12px Arial,sans-serif;
        cursor:pointer; touch-action:manipulation;
      }
      #zurielHomeDashboard .translation-shortcuts button:focus-visible {
        outline:3px solid #e7c77e; outline-offset:2px;
      }
      #zurielHomeDashboard .translation-shortcuts button:active {
        background:#e9dfc7; transform:translateY(1px);
      }
      #zurielHomeDashboard .translation-access-note {
        margin:8px 0 12px; color:#dce5f1; font:12px/1.55 Arial,sans-serif;
      }
      #zurielHomeTranslations #zurielTranslationCompare {
        margin:0; padding:12px; border-color:#c8ad70; background:#f7f3e8;
      }
      #zurielHomeTranslations #zurielTranslationCompare summary { color:#19324f; }
      #zurielHomeTranslations #zurielTranslationCompare .ztc-note { color:#526174; }
      #zurielHomeDashboard .home-greeting-card{margin:0 0 12px;padding:14px 16px;background:linear-gradient(135deg,#10213d,#25476d);border:1px solid #c8ad70;border-radius:15px}
      #zurielHomeDashboard .home-greeting-card h2{margin:0 0 5px;color:#f3d99e;font:700 20px/1.3 Georgia,serif}
      #zurielHomeDashboard .home-greeting-card p{margin:0;color:#e6edf5;font:13px/1.5 Arial,sans-serif}
      @media(max-width:360px) {
        #zurielHomeDashboard .translation-shortcuts button{min-width:55px;padding-left:11px;padding-right:11px}
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
      #zurielHomeDashboard #zurielOpenBookFaithCard {padding:10px;border:1px solid #c8ad70;border-radius:18px;background:linear-gradient(145deg,#203b5c,#102440);box-shadow:0 12px 28px #07172d30;}
      #zurielHomeDashboard .zob-landscape {
        overflow:hidden;position:relative;isolation:isolate;padding:18px 12px 13px;min-height:520px;border:2px solid #d8bd7c;
        border-radius:15px;background:
          linear-gradient(180deg,rgba(7,25,52,.04),rgba(7,25,52,.18)),
          url("https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&fm=jpg&q=88&w=1600") center 42%/cover no-repeat,
          url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20700%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22sky%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23168bd6%22%2F%3E%3Cstop%20offset%3D%22.55%22%20stop-color%3D%22%23b9e8ff%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23ffd99b%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22lake%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%2335b8d0%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23075b85%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22sun%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23fff9c6%22%20stop-opacity%3D%22.95%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23ffb24a%22%20stop-opacity%3D%220%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221200%22%20height%3D%22700%22%20fill%3D%22url(%23sky)%22%2F%3E%3Ccircle%20cx%3D%22930%22%20cy%3D%22185%22%20r%3D%22175%22%20fill%3D%22url(%23sun)%22%2F%3E%3Ccircle%20cx%3D%22930%22%20cy%3D%22185%22%20r%3D%2254%22%20fill%3D%22%23fff3b5%22%2F%3E%3Cpath%20d%3D%22M0%20365%20145%20210%20245%20300%20390%20115%20520%20285%20660%20165%20820%20330%20960%20195%201200%20350V700H0Z%22%20fill%3D%22%23527b91%22%2F%3E%3Cpath%20d%3D%22m180%20285%20210-170%20130%20170-88-43-48%2032-45-52-52%2046-45-14Z%22%20fill%3D%22%23e9f4f5%22%2F%3E%3Cpath%20d%3D%22m550%20290%20110-125%20160%20165-90-42-45%2034-60-46-34%2027Z%22%20fill%3D%22%23d9e9ed%22%2F%3E%3Cpath%20d%3D%22M0%20375Q180%20300%20360%20390T720%20375%201200%20350V700H0Z%22%20fill%3D%22%23245e50%22%2F%3E%3Cpath%20d%3D%22M0%20420Q180%20370%20370%20430T740%20415%201200%20390V700H0Z%22%20fill%3D%22url(%23lake)%22%2F%3E%3Cpath%20d%3D%22M0%20470Q200%20445%20410%20475T820%20465%201200%20450%22%20fill%3D%22none%22%20stroke%3D%22%23a4edf0%22%20stroke-width%3D%228%22%20opacity%3D%22.65%22%2F%3E%3Cpath%20d%3D%22M820%20300%20885%20420%20910%20540%20935%20420%20980%20300%22%20fill%3D%22%23e9f7fa%22%20opacity%3D%22.9%22%2F%3E%3Cpath%20d%3D%22M835%20325%20885%20455%20910%20555%20940%20455%20970%20325%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-width%3D%2215%22%20opacity%3D%22.8%22%2F%3E%3Cpath%20d%3D%22M0%20365Q110%20320%20230%20370L330%20700H0ZM1200%20350Q1080%20310%20990%20370L900%20700H1200Z%22%20fill%3D%22%23173f35%22%2F%3E%3Cg%20fill%3D%22%231c5a42%22%3E%3Cpath%20d%3D%22m40%20300%2045-120%2045%20120h-25l38%2065H27l38-65Z%22%2F%3E%3Cpath%20d%3D%22m140%20345%2038-105%2040%20105h-23l31%2050h-95l31-50Z%22%2F%3E%3Cpath%20d%3D%22m1080%20310%2046-125%2047%20125h-27l36%2063h-112l36-63Z%22%2F%3E%3Cpath%20d%3D%22m990%20365%2038-105%2040%20105h-23l31%2050h-95l31-50Z%22%2F%3E%3C%2Fg%3E%3Cg%20stroke%3D%22%23b8f2f4%22%20stroke-width%3D%225%22%20opacity%3D%22.65%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M440%20520q110-18%20220%200t220%200%22%2F%3E%3Cpath%20d%3D%22M520%20570q100-14%20200%200t200%200%22%2F%3E%3Cpath%20d%3D%22M370%20615q130-12%20260%200t260%200%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") center 43%/cover no-repeat;
        box-shadow:inset 0 0 0 2px #fff5d055,0 10px 24px #08172b55;
      }
      #zurielHomeDashboard .zob-brandline {
        position:relative;display:flex;flex-direction:column;align-items:center;gap:0;
        width:min(100%,480px);margin:0 auto 18px;padding:11px 9px 12px;text-align:center;
        border:2px solid #e2c56f;border-radius:13px;background:linear-gradient(115deg,#061638,#0b2e68 48%,#061638);
        color:#fff9ed;font:700 clamp(20px,5vw,30px)/1.08 Georgia,serif;
        text-shadow:0 2px 3px #0009;box-shadow:0 6px 15px #07172d66,inset 0 0 0 1px #fff2;
      }
      #zurielHomeDashboard .zob-brandline:after {content:"◆";display:block;margin:7px auto 0;padding:0 18px;color:#f5d36e;font:12px/1 Georgia,serif;border-bottom:1px solid #d7bd73;width:48%;}
      #zurielHomeDashboard .zob-brandline em {color:#ffda58;font-style:italic;font-size:1.08em;}
      #zurielHomeDashboard .zob-declaration-ribbon {background:#8c173e;color:#fff0d2;}
      #zurielHomeDashboard .zob-book {
        display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0;
        position:relative;overflow:hidden;min-height:300px;margin:0 auto;
        border:2px solid #9c6a25;border-radius:48% 48% 15px 15px / 8% 8% 15px 15px;
        background:linear-gradient(90deg,#9c6a25 0%,#e5c17c 2%,#fff7df 8%,#fffdf4 46%,#b58a48 49.5%,#fff9e9 51%,#fff7e6 92%,#d1a65e 98%,#80501e 100%);
        box-shadow:0 15px 22px #07172d88,inset 0 -10px 15px #98652d66;
        transform:perspective(700px) rotateX(1deg);
      }
      #zurielHomeDashboard .zob-book:before {content:"";position:absolute;left:0;right:0;bottom:0;height:14px;z-index:3;background:linear-gradient(180deg,#e2bd72,#9d682c 45%,#4c2b19);box-shadow:0 -2px 4px #7a4c2477;pointer-events:none;}
      #zurielHomeDashboard .zob-book:after {
        content:"";position:absolute;top:0;bottom:0;left:50%;width:6px;z-index:4;
        background:linear-gradient(90deg,#8e6b3b88,#fff9e6,#8e6b3b88);pointer-events:none;
        box-shadow:0 0 7px #6d471c55;
      }
      #zurielHomeDashboard .zob-scripture-page {border-radius:48% 0 0 8% / 8% 0 0 4%;}
      #zurielHomeDashboard .zob-response-page {border-radius:0 48% 8% 0 / 0 8% 4% 0;}
      #zurielHomeDashboard .zob-page {
        position:relative;z-index:1;min-width:0;min-height:300px;
        padding:23px 14px 28px;text-align:center;color:#142b52;
        background:
          radial-gradient(ellipse at 50% 8%,#ffffff 0%,transparent 65%),
          repeating-linear-gradient(0deg,rgba(119,91,45,.025) 0,rgba(119,91,45,.025) 1px,transparent 1px,transparent 5px),
          linear-gradient(180deg,#fffefa 0%,#fff9e9 100%);
        isolation:isolate;
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
        margin:0;color:#102b59;font:italic 700 clamp(17px,4.5vw,25px)/1.42 Georgia,serif;
        overflow-wrap:anywhere;
      }
      #zurielHomeDashboard .zob-declaration-copy {
        margin:0 0 15px;color:#17294a;font:700 clamp(14px,3.6vw,20px)/1.42 Georgia,serif;
        overflow-wrap:anywhere;
      }
      #zurielHomeDashboard .zob-affirmation-label {
        display:block;margin:13px auto 7px;padding:8px 5px;max-width:205px;
        border-radius:5px;background:#791d35;color:#ffe17c;
        font:italic 700 14px/1.2 Georgia,serif;
      }
      #zurielHomeDashboard .zob-affirmation-copy {
        margin:0;color:#17294a;font:italic 600 13px/1.45 Georgia,serif;overflow-wrap:anywhere;
      }
      #zurielHomeDashboard .zob-footer {
        display:flex;flex-direction:column;align-items:center;gap:4px;
        margin:14px auto 0;padding:10px 7px;max-width:420px;text-align:center;
        border:2px solid #d9b95f;border-radius:9px;background:#061a3d;color:#f5d77e;
        font:700 14px/1.3 Georgia,serif;letter-spacing:.25px;
        box-shadow:0 5px 13px #07172d55;
      }
      #zurielHomeDashboard .zob-footer-flame {font-size:25px;line-height:1;color:#ffcf43;}
      #zurielHomeDashboard .zob-footer strong {font-size:clamp(17px,4.4vw,24px);}
      #zurielHomeDashboard .zob-footer-tagline {font:700 10px/1.5 Arial,sans-serif;letter-spacing:2px;color:#f9e6a3;}
      #zurielHomeDashboard .zob-faith-actions {display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;}
      #zurielHomeDashboard .zob-faith-actions .home-button {font-size:12px;padding:10px 6px;}
      #zurielHomeDashboard .zob-book:after {background:linear-gradient(90deg,#8e6b3b99,#fff9e6,#8e6b3b99);pointer-events:none;box-shadow:0 0 8px #6d471c66;}
      #zurielHomeDashboard .zob-page {box-shadow:inset 0 0 18px #b38a4a18;}
      #zurielHomeDashboard .zob-ribbon {letter-spacing:.65px;box-shadow:0 2px 4px #07172d20;}
      #zurielHomeDashboard .zob-affirmation-label {box-shadow:0 3px 8px #54112730;}
      #zurielHomeDashboard .zob-footer {width:min(100%,460px);padding:11px 8px 10px;border-color:#e0c16a;border-radius:11px;background:linear-gradient(110deg,#061638,#0a2b61 52%,#061638);box-shadow:0 6px 15px #07172d66,inset 0 0 0 1px #fff2;}
      @media(max-width:420px){
        #zurielHomeDashboard #zurielOpenBookFaithCard{padding:8px;}
        #zurielHomeDashboard .zob-landscape{min-height:0;padding:13px 7px 10px;border-radius:12px;}
        #zurielHomeDashboard .zob-brandline{margin-bottom:13px;padding:8px 5px;font-size:clamp(18px,5.2vw,24px);}
        #zurielHomeDashboard .zob-book{min-height:320px;border-radius:43% 43% 12px 12px / 7% 7% 12px 12px;}
        #zurielHomeDashboard .zob-page{min-height:320px;padding:19px 8px 23px;}
        #zurielHomeDashboard .zob-ribbon{font-size:9px;letter-spacing:.2px;padding:5px 2px;margin-bottom:11px;}
        #zurielHomeDashboard .zob-scripture-copy{font-size:clamp(15px,4.3vw,18px);line-height:1.42;}
        #zurielHomeDashboard .zob-declaration-copy{font-size:clamp(13px,3.7vw,16px);line-height:1.4;margin-bottom:10px;}
        #zurielHomeDashboard .zob-affirmation-label{font-size:12px;padding:7px 3px;margin-top:10px;}
        #zurielHomeDashboard .zob-affirmation-copy{font-size:12px;line-height:1.4;}
        #zurielHomeDashboard .zob-footer{margin-top:11px;padding:9px 5px;}
        #zurielHomeDashboard .zob-footer-tagline{font-size:9px;letter-spacing:1.4px;}
      }
      @media(max-width:340px){
        #zurielHomeDashboard .zob-page{padding-left:6px;padding-right:6px;}
        #zurielHomeDashboard .zob-ribbon{font-size:8px;}
        #zurielHomeDashboard .zob-scripture-copy{font-size:14px;}
        #zurielHomeDashboard .zob-declaration-copy{font-size:12px;}
        #zurielHomeDashboard .zob-affirmation-copy{font-size:11px;}
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
      <section class="home-greeting-card" aria-label="Welcome">
        <h2 id="zurielTimeGreeting">Good day, Zuriel</h2>
        <p id="zurielTimeGreetingSub">Welcome to your time in the Word.</p>
      </section>
      <section class="home-card home-translations-card" id="zurielHomeTranslationsSection" aria-label="Bible translations">
        <h2>🌐 Bible Translations</h2>
        <p class="home-section-note">Choose a Bible version for reading, comparison and offline study.</p>
        <div class="translation-shortcuts" aria-label="Supported translation catalogue">
          <button type="button" data-zuriel-translation="KJV" aria-label="Open King James Version">KJV</button>
          <button type="button" data-zuriel-translation="GNT" aria-label="Select Good News Translation">GNT</button>
          <button type="button" data-zuriel-translation="AMP" aria-label="Select Amplified Bible">AMP</button>
          <button type="button" data-zuriel-translation="LB/LT" aria-label="Select Living Bible or Living Translation">LB/LT</button>
          <button type="button" data-zuriel-translation="TPT" aria-label="Select The Passion Translation">TPT</button>
          <button type="button" data-zuriel-translation="NLT" aria-label="Select New Living Translation">NLT</button>
          <button type="button" data-zuriel-translation="NET" aria-label="Select New English Translation">NET</button>
          <button type="button" data-zuriel-translation="NIV" aria-label="Select New International Version">NIV</button>
          <button type="button" data-zuriel-translation="ESV" aria-label="Select English Standard Version">ESV</button>
          <button type="button" data-zuriel-translation="NASB" aria-label="Select New American Standard Bible">NASB</button>
          <button type="button" data-zuriel-translation="CSB" aria-label="Select Christian Standard Bible">CSB</button>
          <button type="button" data-zuriel-translation="NKJV" aria-label="Select New King James Version">NKJV</button>
        </div>
        
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
          <p class="zob-brandline"><span>His Word...</span><em>My Life... My Victory!</em></p>
          <div class="zob-book">
            <div class="zob-page zob-scripture-page">
              <span class="zob-ribbon" id="zurielOpenBookReference">SCRIPTURE</span>
              <p class="zob-scripture-copy" id="zurielOpenBookScripture">Your Scripture for today.</p>
            </div>
            <div class="zob-page zob-response-page">
              <span class="zob-ribbon zob-declaration-ribbon">MY DECLARATION</span>
              <p class="zob-declaration-copy" id="zurielOpenBookDeclaration">Let God's Word shape your response.</p>
              <span class="zob-affirmation-label">Glory Verse Affirmation</span>
              <p class="zob-affirmation-copy" id="zurielOpenBookAffirmation"></p>
            </div>
          </div>
          <div class="zob-footer"><span class="zob-footer-flame" aria-hidden="true">🔥</span><strong>Zuriel Living Word Bible</strong><span class="zob-footer-tagline">THE WORD • THE TRUTH • THE LIFE</span></div>
        </div>
        <div class="zob-faith-actions">
          <button type="button" class="home-button" id="zurielOpenBookRead">📖 Read This Passage</button>
          <button type="button" class="home-button home-secondary" id="zurielOpenBookNext">✦ Another Word for Today</button>
          <button type="button" class="home-button" id="zurielOpenBookCreateCard">🖼️ Create & Share Card</button>
          <button type="button" class="home-button home-secondary" id="zurielOpenBookSaveCard">💾 Save to Phone Gallery</button>
          <button type="button" class="home-button home-secondary" id="zurielOpenBookDownloadCard">⬇️ Download Open Book Card</button>
          <button type="button" class="home-button home-secondary" id="zurielOpenBookSavedCards">📚 My Saved Cards</button>
        </div>
        <p id="zurielOpenBookCardStatus" class="home-subtitle" aria-live="polite"></p>
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

    function updateZurielTimeGreeting() {
      const greeting = document.getElementById("zurielTimeGreeting");
      const subline = document.getElementById("zurielTimeGreetingSub");
      if (!greeting) return;
      const hour = new Date().getHours();
      const period = hour >= 5 && hour < 12 ? "morning"
        : hour >= 12 && hour < 17 ? "afternoon"
        : hour >= 17 && hour < 21 ? "evening" : "night";
      greeting.textContent = "Good " + period + ", Zuriel";
      if (subline) subline.textContent = period === "night"
        ? "Rest in His peace and keep His Word close."
        : "Welcome to your time in the Word.";
    }
    updateZurielTimeGreeting();
    window.setInterval(updateZurielTimeGreeting, 60000);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) updateZurielTimeGreeting();
    });

    dashboard.querySelectorAll("[data-zuriel-translation]").forEach(function (button) {
      button.addEventListener("click", function () {
        const version = button.dataset.zurielTranslation;
        if (version === "KJV") {
          navigate("read");
          return;
        }
        if (window.ZurielTranslations &&
            typeof window.ZurielTranslations.selectVersion === "function") {
          window.ZurielTranslations.selectVersion(version);
        } else {
          const slot = document.getElementById("zurielHomeTranslations");
          if (slot) slot.textContent = "Translation controls are still loading. Please try again.";
        }
      });
    });

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
        showSections(["zurielStudyPanel"]);
        setActiveNavigation("study");

        const panel = document.getElementById("zurielStudyPanel");
        if (panel) {
          panel.hidden = false;
          panel.removeAttribute("data-zuriel-hidden");
          panel.style.display = "block";
          panel.dataset.mode = "verse";
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
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
        const exactText = String(passage && passage.text || "").replace(/^\d+\.\s*/, "").trim();
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
    // Rotate to the next curated identity automatically while preserving the
    // manual Next Revelation control for readers who prefer to choose.
    window.setInterval(function () {
      renderIdentityScripture(identityIndex + 1);
    }, 22000);
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

    // Scripture for Today and its open-book faith response advance together.
    // The reader can still move forward immediately with either Next button.
    window.setInterval(function () {
      displayVerse(verseIndex + 1);
      renderOpenBookFaithCard();
    }, 20000);

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
            .replace(/^\d+\.\s*/, "").trim();
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

    /* Save the Home open-book card as a PNG directly to the Android Gallery.
       The Studio is used only as the existing renderer; readers return to Home
       after the native Gallery operation completes. */
    const saveOpenBookCardButton = document.getElementById("zurielOpenBookSaveCard");
    if (saveOpenBookCardButton) {
      saveOpenBookCardButton.addEventListener("click", async function () {
        const status = document.getElementById("zurielOpenBookCardStatus");
        const verse = verses[verseIndex];
        if (!verse || typeof window.getBibleVerseText !== "function") {
          if (status) status.textContent = "The offline Scripture service is not ready. Please try again.";
          return;
        }
        saveOpenBookCardButton.disabled = true;
        if (status) status.textContent = "Preparing your open-book image for the phone Gallery…";
        let studioOpened = false;
        try {
          if (!window.ZurielMedia || typeof window.ZurielMedia.saveImage !== "function" ||
              typeof window.ZurielMedia.isAvailable !== "function" || !window.ZurielMedia.isAvailable()) {
            throw new Error("Gallery saving is available in the installed Android app. Please use Create & Share Card in a browser.");
          }
          const passage = await window.getBibleVerseText(verse.reference);
          const scriptureText = String(passage && passage.text || "").replace(/^\d+\.\s*/, "").trim();
          if (!scriptureText) throw new Error("The exact KJV verse text could not be loaded.");
          const faithResponse = window.ZurielFaithContent &&
            typeof window.ZurielFaithContent.find === "function"
            ? window.ZurielFaithContent.find(verse.reference) : null;
          if (!faithResponse || !faithResponse.declaration || !faithResponse.affirmation) {
            throw new Error("The Scripture-specific declaration and affirmation are not ready for this card yet.");
          }
          if (!window.ZurielLibrary ||
              typeof window.ZurielLibrary.openGloryVerse !== "function") {
            throw new Error("The Glory Verse Affirmation Studio is not available yet.");
          }
          navigate("library");
          const opened = window.ZurielLibrary.openGloryVerse(verse.reference, scriptureText, "KJV", faithResponse);
          if (!opened) throw new Error("The open-book image renderer could not be prepared.");
          studioOpened = true;
          const saveImageButton = document.querySelector("#zgsSaveImage");
          const studioStatus = document.querySelector("#zgsStatus");
          if (!saveImageButton || !studioStatus) throw new Error("The open-book image export is not available.");
          const previousStatus = studioStatus.textContent;
          saveImageButton.click();
          const resultMessage = await new Promise((resolve, reject) => {
            let settled = false;
            let timeout;
            const observer = new MutationObserver(() => {
              const message = String(studioStatus.textContent || "").trim();
              if (message && message !== previousStatus && !/wallpaper/i.test(message)) finish(resolve, message);
            });
            const finish = (callback, value) => {
              if (settled) return;
              settled = true;
              observer.disconnect();
              clearTimeout(timeout);
              callback(value);
            };
            observer.observe(studioStatus, { childList: true, subtree: true, characterData: true });
            timeout = setTimeout(() => finish(reject, new Error("Gallery saving took too long. Please try again.")), 30000);
            const immediateMessage = String(studioStatus.textContent || "").trim();
            if (immediateMessage && immediateMessage !== previousStatus) finish(resolve, immediateMessage);
          });
          if (!/^Saved to your phone's Gallery in the /.test(resultMessage)) {
            throw new Error(resultMessage || "Android did not confirm that the card was saved to your Gallery.");
          }
          if (status) status.textContent = "Your open-book card has been saved to the Zuriel Living Word Bible album in your phone Gallery.";
        } catch (error) {
          if (status) status.textContent = error.message || "The open-book card could not be saved to your Gallery.";
        } finally {
          if (studioOpened) navigate("home");
          saveOpenBookCardButton.disabled = false;
        }
      });
    }
    /* Direct PNG download for the Home open-book card. */
    const downloadOpenBookCardButton = document.getElementById("zurielOpenBookDownloadCard");
    if (downloadOpenBookCardButton) {
      downloadOpenBookCardButton.addEventListener("click", async function () {
        const status = document.getElementById("zurielOpenBookCardStatus");
        const verse = verses[verseIndex];
        if (!verse || typeof window.getBibleVerseText !== "function") {
          if (status) status.textContent = "The offline Scripture service is not ready. Please try again.";
          return;
        }
        downloadOpenBookCardButton.disabled = true;
        if (status) status.textContent = "Preparing your open-book PNG download…";
        try {
          const passage = await window.getBibleVerseText(verse.reference);
          const scriptureText = String(passage && passage.text || "").replace(/^\d+\.\s*/, "").trim();
          if (!scriptureText) throw new Error("The exact KJV verse text could not be loaded.");
          const faithResponse = window.ZurielFaithContent && typeof window.ZurielFaithContent.find === "function"
            ? window.ZurielFaithContent.find(verse.reference) : {};
          if (!window.ZurielLibrary || typeof window.ZurielLibrary.openGloryVerse !== "function") {
            throw new Error("The Glory Verse Affirmation Studio is not available yet.");
          }
          navigate("library");
          if (!window.ZurielLibrary.openGloryVerse(verse.reference, scriptureText, "KJV", faithResponse || {})) {
            throw new Error("The open-book image renderer could not be prepared.");
          }
          const downloadButton = document.querySelector("#zgsDownloadImage");
          const studioStatus = document.querySelector("#zgsStatus");
          if (!downloadButton || !studioStatus) throw new Error("The PNG download action is not available.");
          const previousStatus = studioStatus.textContent;
          const pending = new Promise((resolve, reject) => {
            let settled = false, timeout;
            const observer = new MutationObserver(() => {
              const message = String(studioStatus.textContent || "").trim();
              if (/saved to your Downloads folder/i.test(message)) finish(resolve, message);
            });
            const finish = (fn, value) => {
              if (settled) return;
              settled = true;
              observer.disconnect();
              clearTimeout(timeout);
              fn(value);
            };
            observer.observe(studioStatus, {childList:true,subtree:true,characterData:true});
            timeout = setTimeout(() => finish(reject,new Error("Download was not confirmed. Please use Download image in the Studio.")),30000);
          });
          downloadButton.click();
          const message = await pending;
          if (!/saved to your Downloads folder/i.test(message)) throw new Error(message);
          if (status) status.textContent = "Your open-book card PNG was sent to your device Downloads.";
        } catch (error) {
          if (status) status.textContent = error.message || "The open-book card could not be downloaded.";
        } finally {
          downloadOpenBookCardButton.disabled = false;
        }
      });
    }

    const openSavedOpenBookCardsButton = document.getElementById("zurielOpenBookSavedCards");
    if (openSavedOpenBookCardsButton) {
      openSavedOpenBookCardsButton.addEventListener("click", function () {
        if (!window.ZurielLibrary ||
            typeof window.ZurielLibrary.openSavedGloryVerseCards !== "function") return;
        navigate("library");
        window.ZurielLibrary.openSavedGloryVerseCards();
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

