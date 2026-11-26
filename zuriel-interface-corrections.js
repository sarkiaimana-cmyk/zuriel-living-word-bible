(function () {
  "use strict";
  if (window.ZurielInterfaceCorrections) return;

  const css = document.createElement("style");
  css.id = "zurielInterfaceCorrections";
  css.textContent = `
    /* Reading is a page, not a decorative dashboard. */
    #bibleReader {
      background:#fff !important; color:#172b43 !important;
      border:0 !important; border-radius:0 !important; box-shadow:none !important;
      padding:12px 14px !important; margin:0 auto !important;
    }
    #bibleReader h1,#bibleReader h2,#bibleReader h3,
    #bibleReader label,#bibleReader p,#bibleReader li,
    #bibleReader .study-hint { color:#172b43 !important; }
    #message { background:#fff !important; color:#172b43 !important; }
    #message .verse { color:#172b43 !important; background:#fff !important; }
    #message .verse strong { color:#172b43 !important; }
    #readerStatus { color:#34465a !important; }
    #zurielReadingProgress { background:#f1f3f5 !important; }
    #zurielReadingProgress p { color:#34465a !important; }

    /* Book introduction remains available but never occupies the reading page. */
    #zurielIntroduction {
      margin:8px 0 12px !important; padding:10px 12px !important;
      border:1px solid #d8dee7 !important; border-radius:9px !important;
      background:#f7f8fa !important; color:#172b43 !important;
      box-shadow:none !important; line-height:1.5 !important;
    }
    #zurielIntroduction h3,#zurielIntroduction h4,
    #zurielIntroduction p,#zurielIntroduction li,
    #zurielIntroduction summary { color:#172b43 !important; }
    #zurielIntroduction h3 { font-size:16px !important; margin:2px 0 5px !important; }
    #zurielIntroduction .intro-subtitle { display:none !important; }
    #zurielIntroduction > label { display:none !important; }
    #zurielIntroduction select {
      width:auto !important; max-width:100% !important; min-height:36px !important;
      margin:4px 8px 4px 0 !important; padding:6px 9px !important;
      font-size:14px !important;
    }
    #zurielIntroduction > p:not(.intro-subtitle) {
      display:inline-block !important; margin:4px 8px 4px 0 !important;
      font-size:13px !important; line-height:1.35 !important;
    }
    #zurielIntroduction .intro-button {
      display:inline-block !important; width:auto !important;
      min-height:36px !important; margin:4px 0 !important;
      padding:7px 10px !important; font-size:13px !important;
    }
    #zurielIntroduction .intro-subtitle { color:#526174 !important; }
    #zurielIntroduction .intro-button {
      width:auto !important; max-width:100% !important; min-height:40px !important;
      margin:6px 0 0 !important; padding:8px 12px !important;
      border:1px solid #c5ced8 !important; border-radius:8px !important;
      background:#fff !important; color:#172b43 !important;
    }
    #zurielIntroduction .intro-figure { display:none !important; }
    #zurielIntroduction details { border-color:#d8dee7 !important; }
    #zurielIntroduction summary { color:#172b43 !important; }

    /* Study is a focused study workspace; Library is a resource catalogue. */
    #zurielStudyPanel {
      /* A calm blue-ivory workspace keeps Study visibly distinct from the
         intentionally plain white Scripture-reading page. */
      background:#eef2f7 !important; color:#172b43 !important;
      border:1px solid #b99b58 !important; border-radius:16px !important;
      box-shadow:0 6px 20px rgba(16,33,61,.09) !important; padding:14px !important;
    }
    #zurielStudyPanel > h2 {
      margin:-14px -14px 12px !important;
      padding:15px 14px !important;
      background:#10213d !important;
      color:#f0d99f !important;
      border-bottom:3px solid #b99b58 !important;
      border-radius:14px 14px 0 0 !important;
    }
    #zurielStudyPanel > p:first-of-type {
      margin:0 0 14px !important;
      color:#526174 !important;
      font-weight:600;
    }
    #zurielStudyPanel h1,#zurielStudyPanel h2,#zurielStudyPanel h3,
    #zurielStudyPanel h4,#zurielStudyPanel p,#zurielStudyPanel li,
    #zurielStudyPanel label,#zurielStudyPanel summary,
    #zurielStudyPanel span { color:#172b43 !important; }
    #zurielStudyPanel .study-verse,
    #zurielStudyPanel .highlight-tools,
    #zurielStudyPanel #zurielStudySections > details,
    #zurielStudyPanel .study-body,
    #zurielStudyPanel #zurielGenesisStudy {
      background:#f7f8fa !important; color:#172b43 !important;
      border:1px solid #dce2e8 !important; box-shadow:none !important;
    }
    #zurielStudyPanel .study-verse h3,
    #zurielStudyPanel .study-verse p,
    #zurielStudyPanel .highlight-tools h3,
    #zurielStudyPanel .highlight-tools p,
    #zurielStudyPanel .study-body p,
    #zurielStudyPanel .study-body li,
    #zurielStudyPanel #zurielStudySections summary {
      color:#172b43 !important;
    }
    #zurielStudyPanel .study-small { color:#526174 !important; }
    #zurielStudyPanel #zurielStudyLibraryDrawer { background:#f7f8fa !important; border-color:#dce2e8 !important; box-shadow:none !important; }
    #zurielStudyPanel #zurielStudyLibraryDrawer > summary { color:#172b43 !important; }
    #zurielStudyPanel input,
    #zurielStudyPanel textarea,
    #zurielStudyPanel select {
      background:#fff !important; color:#172b43 !important;
      border:1px solid #cbd3dc !important;
    }
    #zurielStudyPanel details,#zurielStudyPanel article,
    #zurielStudyPanel .study-card,#zurielStudyPanel .study-section {
      background:#f7f8fa !important; color:#172b43 !important;
      border:1px solid #dce2e8 !important; box-shadow:none !important;
    }
    #zurielLibrary {
      background:#f7f8fa !important; color:#172b43 !important;
      border:1px solid #dce2e8 !important; border-radius:10px !important;
      box-shadow:none !important; padding:14px !important;
    }
    #zurielLibrary h1,#zurielLibrary h2,#zurielLibrary h3,
    #zurielLibrary h4,#zurielLibrary p,#zurielLibrary li,
    #zurielLibrary label,#zurielLibrary summary { color:#172b43 !important; }
    #zurielLibrary .zrl-intro {
      background:#fff !important; color:#172b43 !important;
      border:1px solid #dce2e8 !important;
    }
    #zurielLibrary .zrl-intro p { color:#34465a !important; }
    #zurielLibrary .library-entry,#zurielLibrary .zlib-study-topic {
      background:#fff !important; color:#172b43 !important;
      border:1px solid #dce2e8 !important; box-shadow:none !important;
    }
    #zurielLibrary .card,
    #zurielLibrary article,
    #zurielLibrary .library-card {
      background:#fff !important; color:#172b43 !important;
      border:1px solid #dce2e8 !important; border-radius:10px !important;
      box-shadow:none !important;
    }
    #zurielLibrary .card h2,#zurielLibrary .card h3,
    #zurielLibrary .card h4,#zurielLibrary .card p,
    #zurielLibrary article p,#zurielLibrary article li {
      color:#172b43 !important;
    }
    #zurielLibrary button {
      color:#172b43;
      border-color:#cbd3dc;
    }

    /* Simple, bright book → chapter → verse picker. */
    #zurielGridNavigator {
      background:#fff !important; color:#172b43 !important;
      padding:calc(8px + env(safe-area-inset-top)) 12px calc(10px + env(safe-area-inset-bottom)) !important;
    }
    #zurielGridNavigator .zgn-title,
    #zurielGridNavigator .zgn-current,
    #zurielGridNavigator .zgn-footer { color:#172b43 !important; }
    #zurielGridNavigator .zgn-header { border-bottom:1px solid #e1e5ea !important; }
    #zurielGridNavigator .zgn-icon {
      color:#172b43 !important; background:#f1f3f5 !important;
      border:1px solid #d8dee7 !important;
    }
    #zurielGridNavigator .zgn-reference {
      background:#fff !important; border:1px solid #cbd3dc !important;
    }
    #zurielGridNavigator .zgn-reference input { color:#172b43 !important; }
    #zurielGridNavigator .zgn-go {
      background:#19324f !important; color:#fff !important;
    }
    #zurielGridNavigator .zgn-tabs { border-color:#dce2e8 !important; }
    #zurielGridNavigator .zgn-tab { color:#526174 !important; }
    #zurielGridNavigator .zgn-tab[aria-selected="true"] {
      color:#172b43 !important; border-bottom-color:#19324f !important;
    }
    #zurielGridNavigator .zgn-search {
      background:#fff !important; color:#172b43 !important;
      border:1px solid #cbd3dc !important;
    }
    #zurielGridNavigator .zgn-grid {
      display:grid !important; grid-template-columns:repeat(5,minmax(0,1fr)) !important;
      gap:8px !important; align-content:start !important; overflow:auto !important;
    }
    #zurielGridNavigator .zgn-choice {
      min-width:0 !important; min-height:48px !important; margin:0 !important;
      padding:8px 4px !important; border:1px solid #d8dee7 !important;
      border-radius:8px !important; background:#f7f8fa !important;
      color:#172b43 !important; font:600 15px Arial,sans-serif !important;
      box-shadow:none !important;
    }
    #zurielGridNavigator .zgn-choice[aria-pressed="true"] {
      background:#e8eef5 !important; border:2px solid #19324f !important;
      color:#10213d !important;
    }
    #zurielGridNavigator .zgn-empty { color:#526174 !important; }
    #zurielGridNavigator .zgn-footer { border-top:1px solid #e1e5ea !important; }

    /* Translation compare and download controls belong in the Reader, visible. */
    #zurielTranslationCompare {
      margin:12px 0 !important; padding:12px !important;
      border:1px solid #d8dee7 !important; border-radius:9px !important;
      background:#f7f8fa !important; color:#172b43 !important;
    }
    #zurielTranslationCompare summary {
      color:#172b43 !important; font-weight:700 !important;
    }
    #zurielTranslationCompare .ztc-note,
    #zurielTranslationCompare .ztc-status,
    #zurielTranslationCompare .ztc-attribution { color:#34465a !important; }
    #zurielTranslationCompare select {
      background:#fff !important; color:#172b43 !important;
      border:1px solid #cbd3dc !important;
    }
    #zurielTranslationCompare button {
      background:#19324f !important; color:#fff !important;
    }
    @media(max-width:480px) {
      #bibleReader { padding:8px 10px !important; }
      #zurielStudyPanel,#zurielLibrary { padding:10px !important; }
      #zurielGridNavigator .zgn-grid { grid-template-columns:repeat(5,minmax(0,1fr)) !important; }
    }
  `;
  document.head.appendChild(css);

  function placeTranslationPanel() {
    const reader = document.getElementById("bibleReader");
    const panel = document.getElementById("zurielTranslationCompare");
    if (!reader || !panel) return;
    const launch = document.getElementById("zurielGridLaunch");
    if (launch && launch.parentNode === reader) {
      if (launch.nextElementSibling !== panel) launch.insertAdjacentElement("afterend", panel);
    } else if (panel.parentNode !== reader) {
      reader.insertBefore(panel, reader.firstChild);
    }
    if (!panel.dataset.zurielPanelInitialized) {
      panel.open = true;
      panel.dataset.zurielPanelInitialized = "1";
    }
    const summary = panel.querySelector("summary");
    if (summary) summary.textContent = "Bible translations • Compare • Offline downloads";
  }

  function compactIntroduction() {
    const panel = document.getElementById("zurielIntroduction");
    if (!panel) return;
    const content = panel.querySelector("div");
    if (!panel.dataset.zurielCompactApplied) {
      if (content) content.hidden = true;
      panel.dataset.zurielCompactApplied = "1";
    }
    const button = panel.querySelector("button.intro-button");
    if (button && !button.dataset.zurielCompactBound) {
      button.dataset.zurielCompactBound = "1";
      button.setAttribute("aria-expanded", "false");
      button.addEventListener("click", function () {
        const details = panel.querySelector("div");
        button.setAttribute("aria-expanded", String(Boolean(details && !details.hidden)));
      });
    }
  }

  function apply() {
    placeTranslationPanel();
    compactIntroduction();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once:true });
  } else apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.body, { childList:true, subtree:true });
  window.ZurielInterfaceCorrections = Object.freeze({ version:"1.0.0", apply:apply });
})();