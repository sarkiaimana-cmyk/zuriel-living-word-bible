/* =========================================================
   ZURIEL LIVING WORD BIBLE — READER & DISPLAY SETTINGS
   Lightweight, local-first preferences; no external libraries.
   ========================================================= */
(function () {
  "use strict";

  if (window.ZurielSettings) return;

  const STORAGE_KEY = "zurielDisplaySettings";
  const COLORS = [
    { id: "amber", label: "Amber", color: "#f2c14e", ink: "#332400" },
    { id: "emerald", label: "Emerald", color: "#43b581", ink: "#082d1d" },
    { id: "sapphire", label: "Sapphire", color: "#69aef5", ink: "#092343" },
    { id: "violet", label: "Violet", color: "#b49af7", ink: "#29164c" },
    { id: "rose", label: "Rose", color: "#f19ab5", ink: "#4a1528" },
    { id: "tangerine", label: "Tangerine", color: "#f5a45d", ink: "#492006" }
  ];
  const DEFAULTS = {
    theme: "navy",
    paper: "ivory",
    fontSize: 18,
    highlight: "amber",
    cardFinish: "ivory",
    reducedMotion: false
  };

  let settings = loadSettings();
  let settingsOpen = false;
  let previousSection = "home";

  function loadSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return Object.assign({}, DEFAULTS, saved);
    } catch (error) {
      return Object.assign({}, DEFAULTS);
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      // Keep the current session usable if storage is unavailable.
    }
    applySettings();
  }

  function colorFor(id) {
    return COLORS.find(item => item.id === id) || COLORS[0];
  }

  function applySettings() {
    const main = document.querySelector("main");
    const message = document.getElementById("message");
    const root = document.documentElement;
    const highlight = colorFor(settings.highlight);

    root.dataset.zurielTheme = settings.theme;
    root.dataset.zurielPaper = settings.paper;
    root.style.setProperty("--zuriel-highlight", highlight.color);
    root.style.setProperty("--zuriel-highlight-ink", highlight.ink);
    root.style.setProperty("--zuriel-reader-font-size", settings.fontSize + "px");
    root.style.setProperty("--zuriel-card-finish", settings.cardFinish);

    if (message) {
      message.style.setProperty("--zuriel-reading-font-size", settings.fontSize + "px");
      message.dataset.zurielPaper = settings.paper;
    }
    if (main) main.dataset.zurielTheme = settings.theme;

    document.body.classList.toggle("zuriel-reduced-motion", !!settings.reducedMotion);
  }

  function addStyles() {
    if (document.getElementById("zurielSettingsStyles")) return;
    const style = document.createElement("style");
    style.id = "zurielSettingsStyles";
    style.textContent = `
      :root {
        --zuriel-highlight: #f2c14e;
        --zuriel-highlight-ink: #332400;
      }
      html[data-zuriel-theme="forest"] #zurielTopReturnBar,
      html[data-zuriel-theme="forest"] #zurielBottomNavigation { background:#123c32; }
      html[data-zuriel-theme="warm"] #zurielTopReturnBar,
      html[data-zuriel-theme="warm"] #zurielBottomNavigation { background:#6d5634; }
      html[data-zuriel-theme="night"] #zurielTopReturnBar,
      html[data-zuriel-theme="night"] #zurielBottomNavigation { background:#080f1b; }
      html[data-zuriel-theme="forest"] #zurielSettingsPanel { background:linear-gradient(155deg,#16483b,#0d2c27); }
      html[data-zuriel-theme="warm"] #zurielSettingsPanel { background:linear-gradient(155deg,#6d5634,#3e3325); }
      html[data-zuriel-theme="night"] #zurielSettingsPanel { background:linear-gradient(155deg,#111d31,#080f1b); }
      #message[data-zuriel-paper="ivory"] {
        background: #fbf8ef;
        color: #24334a;
        border-radius: 14px;
        padding: 12px;
      }
      #message[data-zuriel-paper="parchment"] {
        background-color: #f3e8cf;
        background-image: repeating-linear-gradient(0deg,#8b6d4210 0,#8b6d4210 1px,transparent 1px,transparent 5px);
        color: #3d2e1d;
        border: 1px solid #d6c39d;
        border-radius: 14px;
        padding: 12px;
      }
      #message[data-zuriel-paper="linen"] {
        background-color: #f4f0e7;
        background-image: repeating-linear-gradient(90deg,#64748b08 0,#64748b08 1px,transparent 1px,transparent 4px),repeating-linear-gradient(0deg,#64748b08 0,#64748b08 1px,transparent 1px,transparent 4px);
        color: #28364b;
        border: 1px solid #d7d1c4;
        border-radius: 14px;
        padding: 12px;
      }
      #message[data-zuriel-paper="night"] {
        background: #111d31;
        color: #f6f1e5;
        border: 1px solid #354a68;
        border-radius: 14px;
        padding: 12px;
      }
      #message[data-zuriel-paper="night"] .verse { border-bottom-color:#34445b; }
      #message .verse.zuriel-nav-highlight,
      #message .verse.zuriel-selected-verse,
      #message .verse.zuriel-search-highlight {
        background: color-mix(in srgb,var(--zuriel-highlight) 28%,transparent) !important;
        border-left: 4px solid var(--zuriel-highlight) !important;
        color: inherit;
      }
      #zurielSettingsPanel {
        margin: 0 0 22px;
        padding: 18px;
        border: 1px solid #c8b477;
        border-radius: 18px;
        background: linear-gradient(155deg,#142744,#0d1b31);
        color: #f7f3e9;
        box-shadow: 0 8px 24px #08132625;
      }
      #zurielSettingsPanel h2 { margin:0 0 7px;color:#f0d99f;font-size:21px; }
      #zurielSettingsPanel .settings-intro { color:#dce5f1;font-size:13px;line-height:1.6;margin:0 0 16px; }
      #zurielSettingsPanel .settings-group {
        margin-top:13px;padding:14px;border:1px solid #ffffff20;
        border-radius:13px;background:#ffffff08;
      }
      #zurielSettingsPanel h3 { margin:0 0 10px;color:#f0d99f;font-size:15px; }
      #zurielSettingsPanel p { line-height:1.55; }
      #zurielSettingsPanel .settings-options {
        display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;
      }
      #zurielSettingsPanel button,
      #zurielSettingsPanel select {
        min-width:0;min-height:44px;margin:0;padding:10px;
        border:1px solid #d8c99f;border-radius:10px;
        background:#f8f4e9;color:#18304d;font:700 13px Arial,sans-serif;
      }
      #zurielSettingsPanel button[aria-pressed="true"] {
        background:#e8cf91;border:2px solid #fff1c6;
        box-shadow:0 0 0 2px #e8cf9140;
      }
      #zurielSettingsPanel .color-options {
        display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;
      }
      #zurielSettingsPanel .color-choice {
        display:flex;align-items:center;gap:8px;justify-content:flex-start;
      }
      #zurielSettingsPanel .color-dot {
        width:18px;height:18px;flex:0 0 18px;border-radius:50%;
        border:1px solid #ffffff99;background:var(--swatch);
      }
      #zurielSettingsPanel label {
        display:block;margin:9px 0 6px;color:#e6eaf1;font-size:13px;font-weight:700;
      }
      #zurielSettingsPanel input[type="range"] { width:100%;accent-color:#e8cf91; }
      #zurielSettingsPanel .settings-value { color:#f0d99f;font-weight:700;font-size:13px; }
      #zurielSettingsPanel .settings-footnote { color:#cbd5e1;font-size:12px;margin:9px 0 0; }
      #zurielSettingsPanel .settings-reset {
        width:100%;margin-top:14px;background:transparent;color:#f0d99f;
      }
      body.zuriel-reduced-motion *,
      body.zuriel-reduced-motion *::before,
      body.zuriel-reduced-motion *::after {
        scroll-behavior:auto !important;animation-duration:.01ms !important;
        animation-iteration-count:1 !important;transition-duration:.01ms !important;
      }
      @media(max-width:380px) {
        #zurielSettingsPanel { padding:13px; }
        #zurielSettingsPanel .color-options { grid-template-columns:repeat(2,minmax(0,1fr)); }
      }
    `;
    document.head.appendChild(style);
  }

  function createPanel(main) {
    const panel = document.createElement("section");
    panel.id = "zurielSettingsPanel";
    panel.hidden = true;
    panel.setAttribute("aria-labelledby", "zurielSettingsTitle");
    panel.innerHTML = `
      <h2 id="zurielSettingsTitle">⚙️ Zuriel Settings</h2>
      <p class="settings-intro">Make your Scripture reading comfortable. Your choices are saved on this device and work without an internet connection.</p>

      <div class="settings-group">
        <h3>Display atmosphere</h3>
        <div class="settings-options" id="zurielThemeOptions">
          <button type="button" data-theme="navy">Kingdom Navy</button>
          <button type="button" data-theme="forest">Living Forest</button>
          <button type="button" data-theme="warm">Warm Ivory</button>
          <button type="button" data-theme="night">Quiet Night</button>
        </div>
        <label for="zurielPaperChoice">Reading page / paper texture</label>
        <select id="zurielPaperChoice">
          <option value="ivory">Classic ivory paper</option>
          <option value="parchment">Soft parchment</option>
          <option value="linen">Linen paper</option>
          <option value="night">Night reading</option>
        </select>
      </div>

      <div class="settings-group">
        <h3>Scripture typography</h3>
        <label for="zurielFontRange">Reading text size <span class="settings-value" id="zurielFontValue"></span></label>
        <input id="zurielFontRange" type="range" min="16" max="28" step="1">
        <p class="settings-footnote">Adjusts the Bible text without reducing the size of navigation controls.</p>
      </div>

      <div class="settings-group">
        <h3>Kingdom highlight colours</h3>
        <div class="color-options" id="zurielHighlightOptions"></div>
        <p class="settings-footnote">Choose the default accent for selected and highlighted Scripture.</p>
      </div>

      <div class="settings-group">
        <h3>Glory Verse Affirmation cards</h3>
        <label for="zurielCardFinish">Preferred open-book card finish</label>
        <select id="zurielCardFinish">
          <option value="ivory">Warm ivory pages</option>
          <option value="navy">Kingdom navy</option>
          <option value="forest">Living forest</option>
          <option value="parchment">Classic parchment</option>
        </select>
        <p class="settings-footnote">This preference is saved for the card studio design system.</p>
      </div>

      <div class="settings-group">
        <h3>Motion and comfort</h3>
        <label><input id="zurielReduceMotion" type="checkbox"> Reduce movement and transitions</label>
      </div>
      <button type="button" class="settings-reset" id="zurielResetSettings">Restore recommended settings</button>
    `;
    main.appendChild(panel);
    return panel;
  }

  function syncControls(panel) {
    panel.querySelectorAll("[data-theme]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.theme === settings.theme));
    });
    panel.querySelector("#zurielPaperChoice").value = settings.paper;
    panel.querySelector("#zurielFontRange").value = String(settings.fontSize);
    panel.querySelector("#zurielFontValue").textContent = settings.fontSize + " px";
    panel.querySelector("#zurielCardFinish").value = settings.cardFinish;
    panel.querySelector("#zurielReduceMotion").checked = !!settings.reducedMotion;
    panel.querySelectorAll("[data-highlight]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.highlight === settings.highlight));
    });
  }

  function setActiveNav(nav, section) {
    nav.querySelectorAll("button").forEach(button => {
      button.classList.toggle("active", button.dataset.section === section);
    });
  }

  function openSettings(main, panel, nav) {
    const active = nav.querySelector("button.active");
    previousSection = active && active.dataset.section !== "settings"
      ? active.dataset.section
      : previousSection;
    settingsOpen = true;
    Array.from(main.children).forEach(section => {
      if (section.id === "zurielTopReturnBar" || section === panel) {
        section.hidden = false;
      } else {
        section.hidden = true;
      }
    });
    const footer = document.querySelector("footer");
    if (footer) footer.hidden = true;
    panel.hidden = false;
    setActiveNav(nav, "settings");
    const label = document.getElementById("zurielTopSection");
    if (label) label.textContent = "Settings";
    panel.scrollIntoView({ behavior: settings.reducedMotion ? "auto" : "smooth", block: "start" });
  }

  function closeSettings(nav, main, panel) {
    settingsOpen = false;
    panel.hidden = true;
    const previous = nav.querySelector('[data-section="' + previousSection + '"]');
    if (previous) previous.click();
    else nav.querySelector('[data-section="home"]')?.click();
  }

  function init() {
    const main = document.querySelector("main");
    const nav = document.getElementById("zurielBottomNavigation");
    if (!main || !nav) return false;

    addStyles();
    const panel = createPanel(main);
    const settingsButton = document.createElement("button");
    settingsButton.type = "button";
    settingsButton.dataset.section = "settings";
    settingsButton.innerHTML = "<span>⚙️</span>Settings";
    settingsButton.setAttribute("aria-label", "Open app settings");
    settingsButton.addEventListener("click", function () {
      openSettings(main, panel, nav);
    });
    nav.appendChild(settingsButton);
    nav.style.gridTemplateColumns = "repeat(7,minmax(0,1fr))";
    nav.querySelectorAll("button").forEach(button => {
      button.style.fontSize = "9px";
    });

    panel.querySelectorAll("[data-theme]").forEach(button => {
      button.addEventListener("click", function () {
        settings.theme = button.dataset.theme;
        saveSettings();
        syncControls(panel);
      });
    });

    const paper = panel.querySelector("#zurielPaperChoice");
    paper.addEventListener("change", function () {
      settings.paper = paper.value;
      saveSettings();
    });

    const font = panel.querySelector("#zurielFontRange");
    font.addEventListener("input", function () {
      settings.fontSize = Number(font.value);
      panel.querySelector("#zurielFontValue").textContent = settings.fontSize + " px";
      saveSettings();
    });

    const colors = panel.querySelector("#zurielHighlightOptions");
    COLORS.forEach(item => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "color-choice";
      button.dataset.highlight = item.id;
      button.innerHTML = '<span class="color-dot" style="--swatch:' + item.color + '"></span>' + item.label;
      button.addEventListener("click", function () {
        settings.highlight = item.id;
        saveSettings();
        syncControls(panel);
      });
      colors.appendChild(button);
    });

    const finish = panel.querySelector("#zurielCardFinish");
    finish.addEventListener("change", function () {
      settings.cardFinish = finish.value;
      saveSettings();
    });

    panel.querySelector("#zurielReduceMotion").addEventListener("change", function (event) {
      settings.reducedMotion = event.target.checked;
      saveSettings();
    });

    panel.querySelector("#zurielResetSettings").addEventListener("click", function () {
      settings = Object.assign({}, DEFAULTS);
      saveSettings();
      syncControls(panel);
    });

    const back = document.getElementById("zurielTopBack");
    if (back) {
      back.addEventListener("click", function (event) {
        if (!settingsOpen) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        closeSettings(nav, main, panel);
      }, true);
    }

    syncControls(panel);
    applySettings();
    return true;
  }

  window.ZurielSettings = {
    get: function () { return Object.assign({}, settings); },
    apply: applySettings,
    open: function () {
      const main = document.querySelector("main");
      const panel = document.getElementById("zurielSettingsPanel");
      const nav = document.getElementById("zurielBottomNavigation");
      if (main && panel && nav) openSettings(main, panel, nav);
    }
  };

  if (!init()) {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  }
})();