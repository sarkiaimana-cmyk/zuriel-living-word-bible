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
      #bibleReader { padding:2px 0 0 !important; margin-top:0 !important; }
      #zurielTopReturnBar { position:sticky;top:0;z-index:10000;min-height:34px;padding:3px 7px;margin:0;background:#fff;border:1px solid #eee8e6;border-bottom:0;border-radius:11px 11px 0 0;box-shadow:0 1px 4px #24100d0c; }
      #zurielTopBack { min-height:29px;padding:4px 9px;border:0;border-radius:16px;background:#a30d48;color:#fff;font-size:11px;font-weight:700; }
      #zurielTopSection { color:#59494b;font-size:11px; }
      #zurielReaderTopControls { display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,.85fr) 34px 34px;gap:4px;align-items:center;margin:0 0 2px;padding:4px 5px;background:#fff;border:1px solid #eee8e6;border-top:0;border-radius:0 0 11px 11px;box-shadow:0 1px 4px #24100d0c; }
      #zurielReaderTopControls button,
      #zurielReaderTopControls select { box-sizing:border-box;min-width:0;width:100%;min-height:35px;margin:0;padding:5px 7px;border:1px solid #e5dedb;border-radius:10px;background:#fff;color:#40202b;font:600 12px Arial,sans-serif;box-shadow:none; }
      #zurielReaderTopControls #zurielGridLaunch { overflow:hidden;text-overflow:ellipsis;white-space:nowrap;background:#fff;color:#32131f;font-size:12px;text-align:left; }
      #zurielCurrentTranslation { color:#9c1247;font-size:12px; }
      #zurielReaderTopControls .zuriel-reader-icon { display:flex;align-items:center;justify-content:center;padding:0;font-size:17px;line-height:1; }
      #zurielReaderTranslations { display:flex;gap:5px;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;white-space:nowrap;-webkit-overflow-scrolling:touch;scrollbar-width:thin;margin:0 0 2px;padding:3px 2px 4px;border-bottom:1px solid #eee8e6; }
      #zurielReaderTranslations .zrt-tab { flex:0 0 auto;min-width:43px;min-height:30px;margin:0;padding:4px 9px;border:1px solid #e5dedb;border-radius:16px;background:#fff;color:#59494b;font:600 11px Arial,sans-serif; }
      #zurielReaderTranslations .zrt-tab.is-active { background:#a30d48;color:#fff;border-color:#a30d48;box-shadow:0 1px 3px #a30d481a; }
      #zurielReaderViewTabs { display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px;margin:0 -1px 5px;padding:0 0 4px;border-bottom:1px solid #eee8e6;background:#fff; }
      #zurielReaderViewTabs button { min-width:0;min-height:34px;padding:5px 3px;margin:0;border:1px solid #e5dedb;border-radius:17px;background:#fff;color:#59494b;font:600 11px Arial,sans-serif; }
      #zurielReaderViewTabs button[aria-pressed="true"] { background:#a30d48;border-color:#a30d48;color:#fff; }
      #bibleReader #readerStatus { margin:2px 0 5px !important; }
      @media(max-width:360px) {
        #zurielReaderTopControls { grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr) 32px 32px;gap:3px;padding:3px; }
        #zurielReaderTopControls button, #zurielReaderTopControls select { min-height:33px;padding:4px 5px;font-size:11px; }
        #zurielReaderTopControls .zuriel-reader-icon { font-size:16px; }
        #zurielReaderViewTabs button {font-size:10px;padding:4px 2px;min-height:32px;}
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
    const viewTabs = document.createElement("nav");
    viewTabs.id = "zurielReaderViewTabs";
    viewTabs.setAttribute("aria-label", "Scripture study views");
    viewTabs.innerHTML =
      '<button type="button" data-view="scripture" aria-pressed="true">Scripture</button>' +
      '<button type="button" data-view="meaning" aria-pressed="false">Meaning</button>' +
      '<button type="button" data-view="original" aria-pressed="false">Original Words</button>';
    translations.insertAdjacentElement("afterend", viewTabs);

    function setActiveView(view) {
      viewTabs.querySelectorAll("button").forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.view === view));
      });
    }
    viewTabs.addEventListener("click", function (event) {
      const button = event.target.closest("button[data-view]");
      if (!button) return;
      const view = button.dataset.view;
      setActiveView(view);
      const message = document.getElementById("message");
      const studyPanel = document.getElementById("zurielStudyPanel");
      const status = document.getElementById("readerStatus");
      if (view === "scripture") {
        if (message) message.scrollIntoView({ behavior:"smooth", block:"start" });
        return;
      }
      const selectedRef = document.getElementById("zurielSelectedReference");
      if (!studyPanel || studyPanel.style.display === "none" || !selectedRef ||
          /Your selected Scripture will appear here/.test(selectedRef.textContent)) {
        if (status) status.textContent = "Tap a verse first to open its verse-specific study and original-language tools.";
        setActiveView("scripture");
        if (message) message.scrollIntoView({ behavior:"smooth", block:"start" });
        return;
      }
      studyPanel.style.display = "block";
      if (view === "meaning") {
        const meaningSection = Array.from(studyPanel.querySelectorAll("h2,h3,h4,summary"))
          .find(function (node) { return /meaning|exposition|understanding/i.test(node.textContent); });
        (meaningSection || studyPanel).scrollIntoView({ behavior:"smooth", block:"start" });
      } else {
        const originalWords = document.getElementById("zurielOriginalWords");
        if (originalWords) {
          const details = originalWords.closest("details");
          if (details) details.open = true;
          originalWords.scrollIntoView({ behavior:"smooth", block:"start" });
        } else if (status) {
          status.textContent = "Original-word details are not available for this selected verse yet. Zuriel will not guess missing Hebrew or Greek data.";
        }
      }
    });

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