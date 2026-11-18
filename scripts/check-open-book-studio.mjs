import { readFile } from "node:fs/promises";

const [library, worker, packaging, index, home, prWorkflow, androidWorkflow] = await Promise.all([
  readFile(new URL("../zuriel-library.js", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("./prepare-web.mjs", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-home.js", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/validate-pr.yml", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/android-apk.yml", import.meta.url), "utf8")
]);
const failures = [];
const checks = [
  ["exact Scripture reference and text inputs", "zgsScripture"],
  ["separate faith response inputs", "zgsDeclaration"],
  ["live preview", "function updatePreview()"],
  ["Scripture typography control", "zgsScriptureSize"],
  ["faith response typography control", "zgsFaithSize"],
  ["typeface control", "zgsTypeface"],
  ["adaptive long-content layout", "studio.dataset.layout = stacked ? \"stacked\" : \"spread\""],
  ["adaptive PNG export threshold", "const stacked = scripture.length > 420 || faithText.length > 320;"],
  ["stacked PNG uses full content width", "const exportColumnWidth = stacked ? width - exportMargin * 2 : columnWidth;"],
  ["stacked PNG includes reference and section headings in canvas height", "referenceHeadingHeight + leftLines.length * lineHeight(scriptureSize)"],
  ["spread PNG includes reference and section headings in canvas height", "referenceHeadingHeight + Math.max("],
  ["stacked PNG draws separate full-width sections", "if (stacked) {\n              let y = top;"],
  ["spread PNG retains two-column layout", "const leftX = margin, rightX = margin + columnWidth + gap;"],
  ["adaptive PNG layout draws Glory Verse heading", 'drawSection("GLORY VERSE AFFIRMATION — " + leftTitle'],
  ["stacked long-content CSS", 'data-layout="stacked"'],
  ["image export action", "zgsSaveImage"],
  ["plain-language save action", 'id="zgsSaveImage">Save image</button>'],
  ["comfortable Android touch target", ".zgs-actions button {min-height:48px;"],
  ["honest share fallback when image sharing is unsupported", "Direct image sharing is not supported here, so the PNG was saved to your Downloads folder."],
  ["clear Save image action", 'id="zgsSaveImage">Save image</button>'],
  ["clear Share image action", 'id="zgsShareImage">Share image</button>'],
  ["clear Save to My Library action", 'id="zgsSave">Save to My Library</button>'],
  ["clear Share card text action", 'id="zgsShare">Share card text</button>'],
  ["large mobile touch targets for card actions", "min-height:48px;padding:10px 12px;font-size:13px;touch-action:manipulation;"],
  ["canvas PNG rendering", 'canvas.toBlob(value => value ? resolve(value)'],
  ["native file sharing where supported", "navigator.canShare({files:[file]})"],
  ["download fallback", "link.download = fileName"],
  ["saved card metadata", "zuriel_glory_verse_cards_v1"],
  ["visible saved-card library", 'id="zgsSavedCards"'],
  ["saved-card library heading", "MY SAVED GLORY VERSE CARDS"],
  ["saved cards can be reopened", 'load.textContent = "Open card"'],
  ["saved cards can be deleted", 'remove.textContent = "Delete"'],
  ["saved-card loading restores Scripture and faith content", 'studio.querySelector("#zgsScripture").value = current.scripture || ""'],
  ["saved-card list refreshes after saving", "renderSavedCards();"],
  ["the Light identity", "The Light 🕯️"],
  ["Studio passage-loading control", 'id="zgsLoadScripture"'],
  ["Studio passage retrieval integration", "window.getBibleVerseText(referenceField.value)"],
  ["left page Scripture panel", "zgs-left-page"],
  ["left page Scripture heading", '<div class="zgs-page-title">THE WORD</div>'],
  ["right page faith panel", "zgs-right-page"],
  ["faith tabs are labelled for the right page", 'aria-label="Choose the right-page faith content"'],
  ["right page Glory Verse heading", '<div class="zgs-page-title">GLORY VERSE AFFIRMATION</div>'],
  ["bold faith response", ".zgs-active-copy {min-height:105px;font-weight:700;}"],
  ["declaration is the default card response", 'let activeFaithView = "Declaration";'],
  ["declaration tab is visibly selected by default", 'data-zgs-view="Declaration" aria-pressed="true"'],
  ["exact approved card headline", "His Words.. My life.. My Victory"],
  ["complete app footer", "Zuriel Living Word Bible"],
  ["export calculates Scripture line height", "leftLines.length * lineHeight(scriptureSize)"],
  ["export calculates faith line height", "rightLines.length * lineHeight(faithSize)"],
  ["shared card includes complete app name", '"Zuriel Living Word Bible"' ],
  ["photographic wallpaper picker", 'id="zgsWallpapers"'],
  ["four curated realistic wallpaper choices", 'data-wallpaper="valley"'],
  ["wallpaper selection loads image", "function loadStudioWallpaper(key)"],
  ["wallpaper appears in live preview", "--zgs-wallpaper-image"],
  ["wallpaper is painted into PNG export", "ctx.drawImage(image"],
  ["separate image sharing action", 'id="zgsShareImage"'],
  ["download and share image actions are distinct", 'exportButton.id === "zgsShareImage"'],
  ["selected wallpaper is saved with card", "wallpaper:studio.dataset.wallpaper"],
];
for (const [label, fragment] of checks) {
  if (!library.includes(fragment)) failures.push(label + " is missing.");
}
if (!index.includes("window.getBibleVerseText = async function (reference)")) failures.push("Offline KJV passage retrieval is missing.");
if (!/const CACHE_NAME = "zuriel-bible-offline-v\d+";/.test(worker)) failures.push("Offline cache version is missing for the Studio/navigation integration.");
if (!worker.includes('url.origin === "https://images.unsplash.com"')) failures.push("Service worker does not cache selected Unsplash wallpapers.");
if (home.includes("Your Bible Journey")) failures.push("The duplicate home shortcut-button grid is still present.");
const navBlock = home.match(/const navItems = \[([\s\S]*?)\];/);
if (!navBlock || (navBlock[1].match(/\["(?:home|read|study|library|kingdom|personal)"/g) || []).length !== 6) {
  failures.push("The main bottom navigation should contain exactly six primary destinations.");
}
if (!home.includes('window.ZurielLibrary.open("saved")')) failures.push("The Library destination does not open the personal saved library.");
if (!worker.includes('"./zuriel-library.js"')) failures.push("Service worker does not precache the studio module.");
if (!packaging.includes('"zuriel-library.js"')) failures.push("Android web packaging omits the studio module.");
if (!index.includes("zuriel-library.js")) failures.push("App entry point does not load the studio module.");
if (!/openGloryVerse: function[\\s\\S]*?ZurielHomeNavigate\\("library"\\)[\\s\\S]*?openPage\\("affirmation"\\)/.test(library)) failures.push("Reader-launched Glory Verse Studio must reveal the Library section before opening the studio.");
if (!prWorkflow.includes("node scripts/check-open-book-studio.mjs")) failures.push("PR validation does not run the studio checker.");
if (!androidWorkflow.includes("node scripts/check-open-book-studio.mjs")) failures.push("Android validation does not run the studio checker.");
if (failures.length) {
  console.error("Open Book Card Studio checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Open Book Card Studio checks passed: live preview, typography controls, adaptive long-content layout, PNG export, native share/download fallback, offline and Android validation.");
}
