/* ZURIEL READER — COMPACT TOP CONTROLS
   Positions passage, translation, audio and settings controls directly
   beneath the sticky Return to Home bar. Keeps the existing reader engine. */
(function () {
  "use strict";

  function mount() {
    const reader = document.getElementById("bibleReader");
    const topBar = document.getElementById("zurielTopReturnBar");
    const back = document.getElementById("zurielTopBack");
    const label = document.getElementById("zurielTopSection");
    const launch = document.getElementById("zurielGridLaunch");
    const translations = document.getElementById("zurielReaderTranslations");
    if (!reader || !topBar || !launch || !translations ||
        document.getElementById("zurielReaderTopControls")) return false;

    const style = document.createElement("style");
    style.id = "zurielReaderTopControlsStyles";
    style.textContent = `
      #bibleReader > h2,
      #bibleReader > h2 + p { display:none !important; }
      #bibleReader { padding-top:8px !important; }
      #zurielTopReturnBar {
        position:sticky;top:0;z-index:10000;
        min-height:58px;padding:8px 12px;margin:0;
        background:#8b2d1d;color:#fff;border:0;
        box-shadow:0 2px 9px #00000018;
      }
      #zurielTopBack {
        min-height:43px;padding:9px 15px;border:0;border-radius:24px;
        background:#a30d48;color:#fff;font-size:14px;font-weight:700;
      }
      #zurielTopSection { color:#fff;font-size:14px; }
      #zurielReaderTopControls {
        display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr) 48px 48px;
        gap:8px;align-items:center;margin:0 0 8px;padding:4px 0 7px;
        background:#fff;
      }
      #zurielReaderTopControls button,
      #zurielReaderTopControls select {
        box-sizing:border-box;min-width:0;width:100%;min-height:48px;
        margin:0;padding:9px 10px;border:1px solid #ded9d7;border-radius:14px;
        background:#fff;color:#40202b;font:700 14px Arial,sans-serif;
        box-shadow:0 3px 9px #24100d18;
      }
      #zurielReaderTopControls #zurielGridLaunch {
        overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
        background:#fff;color:#32131f;font-size:15px;text-align:left;
      }
      #zurielCurrentTranslation { color:#9c1247;font-size:14px; }
      #zurielReaderTopControls .zuriel-reader-icon {
        display:flex;align-items:center;justify-content:center;
        padding:0;font-size:22px;line-height:1;
      }
      #zurielReaderTranslations {
        display:flex;gap:7px;overflow-x:auto;overflow-y:hidden;
        overscroll-behavior-x:contain;white-space:nowrap;
        -webkit-overflow-scrolling:touch;scrollbar-width:thin;
        margin:0 -2px 9px;padding:7px 2px 10px;
        border-bottom:1px solid #e8e3e1;
      }
      #zurielReaderTranslations .zrt-tab {
        flex:0 0 auto;min-width:58px;min-height:40px;margin:0;padding:7px 12px;
        border:1px solid #ddd6d4;border-radius:22px;
        background:#fff;color:#59494b;font:700 13px Arial,sans-serif;
      }
      #zurielReaderTranslations .zrt-tab.is-active {
        background:#a30d48;color:#fff;border-color:#a30d48;
        box-shadow:0 2px 7px #a30d4825;
      }
      @media(max-width:360px) {
        #zurielReaderTopControls {
          grid-template-columns:minmax(0,1.3fr) minmax(0,.9fr) 43px 43px;
          gap:5px;
        }
        #zurielReaderTopControls button,
        #zurielReaderTopControls select { min-height:45px;padding:7px 6px;font-size:12px; }
        #zurielReaderTopControls .zuriel-reader-icon { font-size:20px; }
      }
    `;
    document.head.appendChild(style);

    const controls = document.createElement("div");
    controls.id = "zurielReaderTopControls";
    controls.setAttribute("aria-label", "Reader controls");

    const translationSelect = document.createElement("select");
    translationSelect.id = "zurielCurrentTranslation";
    translationSelect.setAttribute("aria-label", "Choose current Bible translation");
    [
      ["KJV","KJV"],["GNT","GNT"],["AMP","AMP"],["LB/LT","LB/LT"],
      ["TPT","TPT"],["NLT","NLT"],["NET","NET"],["NIV","NIV"],
      ["ESV","ESV"],["NASB","NASB"],["CSB","CSB"],["NKJV","NKJV"]
    ].forEach(function (item) {
      const option = document.createElement("option");
      option.value = item[0];
      option.textContent = item[1];
      translationSelect.appendChild(option);
    });

    const audioButton = document.createElement("button");
    audioButton.type = "button";
    audioButton.className = "zuriel-reader-icon";
    audioButton.textContent = "🎧";
    audioButton.setAttribute("aria-label", "Open Scripture audio player");
    audioButton.title = "Listen to Scripture";

    const settingsButton = document.createElement("button");
    settingsButton.type = "button";
    settingsButton.className = "zuriel-reader-icon";
    settingsButton.textContent = "⚙";
    settingsButton.setAttribute("aria-label", "Open reader settings");
    settingsButton.title = "Reader settings";

    controls.append(launch, translationSelect, audioButton, settingsButton);
    translations.parentNode.insertBefore(controls, translations);
    controls.insertAdjacentElement("afterend", translations);

    function updatePassageLabel(detail) {
      const book = detail && detail.book;
      const chapter = detail && detail.chapter;
      if (book && chapter) {
        launch.textContent = book + " " + chapter + "  ▾";
        launch.setAttribute("aria-label", "Choose another Bible passage. Current passage: " + book + " chapter " + chapter);
      } else {
        launch.textContent = "Choose Passage  ▾";
      }
    }

    function setTranslation(version) {
      translationSelect.value = version;
    }
    translationSelect.addEventListener("change", function () {
      const tab = translations.querySelector('.zrt-tab[data-version="' + translationSelect.value + '"]');
      if (tab) tab.click();
    });
    translations.addEventListener("click", function (event) {
      const tab = event.target.closest(".zrt-tab");
      if (tab) setTranslation(tab.dataset.version);
    });

    audioButton.addEventListener("click", function () {
      const player = document.getElementById("zurielAudioPlayer");
      if (player) {
        player.scrollIntoView({ behavior:"smooth", block:"center" });
        player.setAttribute("tabindex","-1");
        player.focus({ preventScroll:true });
      } else {
        const status = document.getElementById("readerStatus");
        if (status) status.textContent = "Open a Bible chapter first. The audio player will appear with the chapter controls.";
        launch.scrollIntoView({ behavior:"smooth", block:"center" });
      }
    });

    settingsButton.addEventListener("click", function () {
      if (window.ZurielSettings && typeof window.ZurielSettings.open === "function") {
        window.ZurielSettings.open();
      } else {
        const status = document.getElementById("readerStatus");
        if (status) status.textContent = "Reader settings are still loading. Please try again.";
      }
    });

    if (back) {
      back.textContent = "↶  Return to Home";
      back.addEventListener("click", function (event) {
        if (!reader.hidden) {
          event.preventDefault();
          event.stopImmediatePropagation();
          if (typeof window.ZurielHomeNavigate === "function") {
            window.ZurielHomeNavigate("home");
          }
        }
      }, true);
    }
    if (label) label.textContent = "Read Scripture";

    window.addEventListener("zuriel:chapter-opened", function (event) {
      updatePassageLabel(event.detail || {});
    });
    window.addEventListener("zuriel:translation-changed", function (event) {
      if (event.detail && event.detail.version) setTranslation(event.detail.version);
    });

    const currentBook = window.currentBook;
    const currentChapter = window.currentChapter;
    if (currentBook && currentChapter) updatePassageLabel({ book:currentBook, chapter:currentChapter });
    else updatePassageLabel(null);
    return true;
  }

  if (!mount()) {
    document.addEventListener("DOMContentLoaded", mount, { once:true });
  }
})();