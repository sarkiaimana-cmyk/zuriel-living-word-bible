/* Zuriel Living Word Bible — shared visual system.
   Unifies the independent app's navy/ivory/gold identity without changing
   Zite or replacing the established white Scripture-reading canvas. */
(function () {
  "use strict";

  if (document.getElementById("zurielDesignSystem")) return;

  const style = document.createElement("style");
  style.id = "zurielDesignSystem";
  style.textContent = `
    :root {
      --zuriel-navy: #10213d;
      --zuriel-navy-deep: #0d1c35;
      --zuriel-green: #24634a;
      --zuriel-ivory: #f6f3e9;
      --zuriel-paper: #fffdf8;
      --zuriel-gold: #b99b58;
      --zuriel-gold-soft: #e8cf91;
      --zuriel-ink: #18352b;
      --zuriel-muted: #667085;
      --zuriel-line: #e7e2d6;
      --zuriel-radius-card: 16px;
      --zuriel-radius-control: 11px;
      --zuriel-shadow-card: 0 5px 18px rgba(16,33,61,.08);
      --zuriel-safe-bottom: env(safe-area-inset-bottom, 0px);
      color-scheme: light;
      scroll-padding-top: 72px;
    }

    html { min-height: 100%; scroll-behavior: smooth; }
    body {
      min-height: 100%;
      -webkit-tap-highlight-color: rgba(185,155,88,.16);
      text-rendering: optimizeLegibility;
    }

    /* Shared card language: calm ivory surfaces, consistent edges and depth. */
    main > .card,
    #zurielHomeDashboard .home-card,
    #zurielHomeDashboard .home-section-card,
    #zurielHomeDashboard .home-scripture-card {
      border-radius: var(--zuriel-radius-card);
      box-shadow: var(--zuriel-shadow-card);
    }

    /* Preserve the premium navy identity across the app's major navigation. */
    #zurielTopReturnBar,
    #zurielHomeDashboard .home-hero {
      background-color: var(--zuriel-navy);
      border-color: var(--zuriel-gold);
    }

    #zurielTopReturnBar {
      padding-top: max(10px, env(safe-area-inset-top, 0px));
    }

    /* Touch-friendly controls, without recolouring specialised reader tabs. */
    button, select, input, textarea, summary, [role="button"] {
      -webkit-tap-highlight-color: rgba(185,155,88,.18);
    }
    button, select, input, textarea {
      max-width: 100%;
    }
    button:disabled, [aria-disabled="true"] {
      cursor: not-allowed;
      filter: saturate(.65);
    }
    button:focus-visible,
    select:focus-visible,
    input:focus-visible,
    textarea:focus-visible,
    summary:focus-visible,
    a:focus-visible,
    [role="button"]:focus-visible {
      outline: 3px solid var(--zuriel-gold);
      outline-offset: 3px;
    }

    /* Keep the Scripture canvas intentionally clean and white. */
    #bibleReader {
      background: #fff;
      color: #171717;
      scroll-margin-top: 12px;
    }
    #bibleReader .verse,
    #bibleReader #message .verse {
      scroll-margin-top: 84px;
      -webkit-tap-highlight-color: rgba(185,155,88,.12);
    }
    #bibleReader :is(input, select, textarea) {
      min-height: 44px;
      border-radius: var(--zuriel-radius-control);
    }

    /* Study overlays respect Android safe areas and remain independently scrollable. */
    #zurielVerseActions {
      padding-top: max(10px, env(safe-area-inset-top, 0px));
      padding-bottom: max(10px, env(safe-area-inset-bottom, 0px));
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
    }
    #zurielStudyPanel,
    #zurielTranslationCompare {
      overflow-wrap: anywhere;
      word-break: normal;
    }

    /* Avoid clipped content on narrow phones and landscape screens. */
    img, video, canvas, svg { max-width: 100%; }
    :is(.card, #zurielHomeDashboard, #bibleReader, #zurielStudyPanel) {
      min-width: 0;
      overflow-wrap: anywhere;
    }

    @media (max-width: 420px) {
      main { padding-left: 10px; padding-right: 10px; }
      #zurielHomeDashboard { padding-bottom: calc(12px + var(--zuriel-safe-bottom)); }
    }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      *, *::before, *::after {
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: .01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `;

  document.head.appendChild(style);
  document.documentElement.dataset.zurielDesignSystem = "1";
  window.ZurielDesignSystem = Object.freeze({
    version: "1.0.0",
    palette: Object.freeze({
      navy: "#10213d",
      green: "#24634a",
      ivory: "#f6f3e9",
      gold: "#b99b58"
    })
  });
})();
