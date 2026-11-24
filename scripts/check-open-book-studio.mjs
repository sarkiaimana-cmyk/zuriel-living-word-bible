import { readFile } from "node:fs/promises";

const [library, worker, packaging, index, home, prWorkflow, androidWorkflow, faithCards, readerToolbar] = await Promise.all([
  readFile(new URL("../zuriel-library.js", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("./prepare-web.mjs", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-home.js", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/validate-pr.yml", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/android-apk.yml", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-faith-cards.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-reader-topbar.js", import.meta.url), "utf8")
]);
const failures = [];
try {
  new Function(readerToolbar);
} catch (error) {
  failures.push("Reader toolbar JavaScript must parse successfully: " + error.message);
}
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
  ["explicit PNG download action", 'id="zgsDownloadImage">⬇ Download image</button>'],
  ["PNG download button wired to canvas export", 'studio.querySelectorAll("#zgsSaveImage,#zgsDownloadImage,#zgsShareImage")'],
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
  ["premium navy is the default open-book finish", 'studio.dataset.finish = "navy"'],
  ["single continuous open-book spread in the live preview", "background:linear-gradient(90deg,#e7ddc7 0%,#fffdf5 3%,#fffdf7 47%,#d6cbb5 49.5%"],
  ["left page has a defined inner gutter", "#zurielGloryPreview .zgs-left-page {\n              border-right:1px solid #d7ceb9"],
  ["right page has subtle inner gutter shading", "#zurielGloryPreview .zgs-right-page {\n              box-shadow:inset 13px 0 16px -17px #594d39"],
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
if (!faithCards.includes("canvas.height = Math.max(1350, contentTop + lines.length * lineHeight + footerSpace)")) failures.push("Faith-card PNG export must expand for long prayers and declarations rather than truncating them.");
if (!faithCards.includes("lines.forEach((item, index) => ctx.fillText(item, 540, startY + index * lineHeight, maxWidth))")) failures.push("Faith-card PNG export must draw every wrapped line.");
if (!faithCards.includes("const finalGradient = ctx.createLinearGradient(0, 0, 1080, canvas.height)")) failures.push("Faith-card PNG export must repaint its background after resizing the canvas.");
if (!faithCards.includes('ctx.fillText("Zuriel Living Word Bible", 540, canvas.height - 85)')) failures.push("Faith-card PNG export must retain the complete app footer.");
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
if (!/openGloryVerse: function[\s\S]*?ZurielHomeNavigate\("library"\)[\s\S]*?openPage\("affirmation"\)/.test(library)) failures.push("Reader-launched Glory Verse Studio must reveal the Library section before opening the studio.");
if (!prWorkflow.includes("node scripts/check-open-book-studio.mjs")) failures.push("PR validation does not run the studio checker.");
if (!androidWorkflow.includes("node scripts/check-open-book-studio.mjs")) failures.push("Android validation does not run the studio checker.");
// Home-card integration: WHO HE IS revelations must retain their identity
// title when opened in the shared card studio; daily cards remain present.
if (!home.includes('id="zurielIdentityShare"')) failures.push("WHO HE IS share action is missing.");
if (!home.includes('const revelationResponse = Object.assign({}, response || {});')) failures.push("WHO HE IS response is not safely copied before card preparation.");
if (!home.includes('"HE IS " + identityTitle.toUpperCase()')) failures.push("WHO HE IS title is not carried into the shareable declaration.");
if (!home.includes('window.ZurielLibrary.openGloryVerse(\n          item.reference, exactText, "KJV", revelationResponse')) failures.push("WHO HE IS card does not pass its exact KJV passage and title to the card studio.");
if (!home.includes('id="zurielOpenBookFaithCard"')) failures.push("The daily open-book faith card was removed.");
if (!home.includes('id="zurielOpenBookSaveCard"')) failures.push("Home open-book card has a direct save action.");
if (!home.includes('id="zurielOpenBookSavedCards"')) failures.push("Home open-book card has a direct saved-cards destination.");
if (!home.includes('id="zurielOpenBookDownloadCard"')) failures.push("The Home open-book card must expose a direct Download Open Book Card button.");
if (!home.includes('document.querySelector("#zgsDownloadImage")') || !home.includes("downloadButton.click();")) failures.push("The Home download action must trigger the actual PNG download control.");
if (!home.includes("Your open-book card PNG was sent to your device Downloads.")) failures.push("The Home download action must report its download result clearly.");
if (!home.includes('document.querySelector("#zgsSaveImage")')) failures.push("Home save action must invoke the PNG image export, not the My Library draft-save control.");
if (!home.includes("saveImageButton.click();")) failures.push("Home save action must trigger the actual image-to-Gallery export.");
if (!home.includes("window.ZurielMedia.isAvailable()") || !home.includes("window.ZurielMedia.saveImage")) failures.push("Home save action must require the native Android Gallery bridge.");
if (!home.includes("Saved to your phone's Gallery")) failures.push("Home must report success only after Android confirms Gallery saving.");
if (!home.includes("replace(/^\\d+\\.\\s*/")) failures.push("Home Gallery export must remove only the leading KJV verse number from the loaded passage.");
if (!home.includes("if (studioOpened) navigate(\"home\")")) failures.push("Home save flow must return the reader to Home after the Gallery export attempt.");
if (!library.includes("openSavedGloryVerseCards: function")) failures.push("Saved-card destination does not open the saved Glory Verse collection.");
if (!readerToolbar.includes("zurielReaderTopControls")) failures.push("Reader controls must be grouped into one top toolbar.");
if (!readerToolbar.includes("zurielReaderViewTabs")) failures.push("Reader must show Scripture, Meaning and Original Words tabs.");
if (!readerToolbar.includes("data-view=\"scripture\"") || !readerToolbar.includes("data-view=\"meaning\"") || !readerToolbar.includes("data-view=\"original\"")) failures.push("All three reader view tabs must be present.");
if (!readerToolbar.includes("zurielReaderTranslations")) failures.push("Translation shortcuts must remain directly below the top controls.");
if (!home.includes('<span>His Word...</span><em>My Life... My Victory!</em>')) failures.push("The open-book card must retain the approved two-line headline.");
if (!home.includes('class="zob-ribbon zob-declaration-ribbon">MY DECLARATION</span>')) failures.push("The right page must be labelled MY DECLARATION.");
if (!home.includes("THE WORD • THE TRUTH • THE LIFE")) failures.push("The approved three-part Zuriel footer tagline is missing.");
if (!home.includes('photo-1470770841072-f978cf4d019e')) failures.push("The open-book card must retain its scenic photographic landscape.");
if (!home.includes("data:image/svg+xml,") || !home.includes("linearGradient%20id%3D%22lake%22")) failures.push("The open-book card must include its own offline scenic landscape fallback.");
if (!home.includes("@media(max-width:420px)") || !home.includes("min-height:320px")) failures.push("The open-book card must keep both pages readable on narrow Android screens.");
if (!home.includes(".zob-scripture-page") || !home.includes(".zob-response-page")) failures.push("The two-page book must retain separate curved page treatments.");
if (!home.includes("min-height:300px") || !home.includes("min-height:300px;")) failures.push("The two-page book spread must preserve comfortable mobile reading space.");
if (!home.includes("🔥")) failures.push("The Zuriel footer flame mark is missing.");
for (const reference of ["Psalm 23:1", "Isaiah 41:10", "Philippians 4:13"]) {
  if (!home.includes('data-reference="' + reference + '"')) failures.push("The daily Scripture card for " + reference + " was removed.");
}
if (!readerToolbar.includes("min-height:35px")) failures.push("Reader controls must stay compact and narrow.");
if (!readerToolbar.includes("min-height:30px")) failures.push("Translation shortcuts must use compact pills.");
if (!readerToolbar.includes("min-height:34px")) failures.push("Reader view tabs must stay compact.");
if (!readerToolbar.includes("min-height:34px")) failures.push("Return bar must stay compact.");
if (!readerToolbar.includes("    `;")) failures.push("Reader toolbar style template must close correctly.");
if (!readerToolbar.includes("controls.append(launch, translationSelect, audioButton, settingsButton)")) failures.push("Passage, translation, audio and settings must share the compact top row.");
if (!readerToolbar.includes("zurielReaderViewTabs")) failures.push("Reader must include Scripture, Meaning and Original Words tabs.");
if (!worker.includes("./zuriel-reader-topbar.js")) failures.push("Reader toolbar must be included in the offline app cache.");
if (!home.includes("#zurielOpenBookFaithCard {padding:10px")) failures.push("Open-book card must retain its premium navy-and-gold outer frame.");
if (!home.includes(".zob-brandline:after")) failures.push("Open-book card must retain the decorative gold title divider.");
if (!home.includes(".zob-book:before")) failures.push("Open-book illustration must retain the dimensional gold page edge.");
if (!home.includes("width:min(100%,460px)")) failures.push("Open-book footer must remain responsive on narrow screens.");
if (!home.includes(".zob-page {box-shadow:inset 0 0 18px")) failures.push("Open-book pages must retain subtle paper depth.");
if (!home.includes("Glory Verse Affirmation")) failures.push("Open-book card must retain its Glory Verse Affirmation label.");
if (!home.includes("His Word...")) failures.push("Open-book card must retain the approved top-line wording.");
if (!home.includes("THE WORD • THE TRUTH • THE LIFE")) failures.push("Open-book card must retain the Zuriel footer tagline.");

if (!home.includes('id="zurielOpenBookSavedCards"')) failures.push("Home must expose the My Saved Cards shortcut.");
if (!library.includes('id="zgsSavedHeading"') || !library.includes('id="zgsSavedCards"')) failures.push("The Glory Verse Studio must render a visible saved-card destination.");
if (!library.includes('localStorage.getItem(savedCardsKey)') || !library.includes('localStorage.setItem(savedCardsKey')) failures.push("Saved Glory Verse cards must persist in on-device storage.");
if (!library.includes('openSavedGloryVerseCards: function') || !library.includes('openPage("affirmation")')) failures.push("My Saved Cards must return to the saved-card section of the Studio.");

if (failures.length) {
  console.error("Open Book Card Studio checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Open Book Card Studio checks passed: live preview, typography controls, adaptive long-content layout, PNG export, native share/download fallback, offline and Android validation.");
}

