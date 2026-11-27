import fs from "node:fs";
import assert from "node:assert/strict";

const settings = fs.readFileSync("zuriel-settings.js", "utf8");
const corrections = fs.readFileSync("zuriel-interface-corrections.js", "utf8");
const navigation = fs.readFileSync("zuriel-navigation-recovery.js", "utf8");
const media = fs.readFileSync("zuriel-media.js", "utf8");
const home = fs.readFileSync("zuriel-home.js", "utf8");
const library = fs.readFileSync("zuriel-library.js", "utf8");
const serviceWorker = fs.readFileSync("sw.js", "utf8");
const index = fs.readFileSync("index.html", "utf8");

const palette = ["amber", "emerald", "sapphire", "violet", "rose", "tangerine"];
for (const colour of palette) {
  assert.ok(settings.includes('id: "' + colour + '"'), "Settings must retain the " + colour + " highlight choice");
}
assert.ok(settings.includes('root.style.setProperty("--zuriel-highlight", highlight.color)'), "Selected highlight must reach the shared CSS variable");
assert.ok(settings.includes('button.dataset.highlight === settings.highlight'), "Settings must show the persisted highlight selection");
assert.ok(corrections.includes("var(--zuriel-highlight,#f2c14e)"), "Reader correction must use the selected highlight, not a fixed green");
assert.ok(corrections.includes(".verse.zuriel-selected-verse"), "Selected Scripture must receive the chosen highlight");
assert.ok(corrections.includes(".verse.zuriel-search-highlight"), "Search result Scripture must receive the chosen highlight");

assert.ok((index.match(/id="zurielBottomNavigation"/g) || []).length === 1, "The app shell must own exactly one bottom navigation element");
assert.ok(navigation.includes("var byKey=new Map()"), "Navigation recovery must deduplicate destinations");
assert.ok(navigation.includes("button.remove()"), "Navigation recovery must remove repeated destination buttons");
assert.ok(navigation.includes("new MutationObserver(deduplicateDestinations)"), "Navigation recovery must keep removing late duplicate buttons added by other scripts");
assert.ok(home.includes('document.getElementById("zurielBottomNavigation") || document.createElement("nav")'), "Home navigation must reuse the app shell navigation instead of creating a second bar");
assert.ok(navigation.includes('window.ZurielSettings.open()'), "Recovered Settings destination must open the real Settings panel");
assert.ok(settings.includes('settingsButton.dataset.zurielSettingsBound !== "1"'), "Settings handler must be bound only once");
assert.ok(settings.includes("function openSettings(main, panel, nav)"), "Settings must use the real section-switching flow");

assert.ok(home.includes("var(--zuriel-home-wallpaper)"), "Home identity cards must use the rotating wallpaper");
assert.ok(corrections.includes(".zob-landscape"), "Open Book outer frame must retain its own design treatment");
assert.ok(corrections.includes("background-image:linear-gradient(145deg,rgba(7,22,39,.28),rgba(7,22,39,.12)),var(--zuriel-home-wallpaper)"), "Open Book landscape must retain rotating wallpaper");
assert.ok(corrections.includes(".zob-page:nth-child(2)"), "Open Book pages must retain differentiated page finishes");
assert.ok(library.includes('studio.dataset.finish = "navy"'), "Card studio must initialise a selectable open-book finish");
for (const finish of ["ivory", "navy", "forest", "parchment"]) {
  assert.ok(library.includes('data-finish="' + finish + '"'), "Open Book studio must expose the " + finish + " page finish");
}
for (const wallpaper of ["forest", "falls", "stream", "valley"]) {
  assert.ok(library.includes('data-wallpaper="' + wallpaper + '"'), "Open Book studio must expose the " + wallpaper + " wallpaper");
}
assert.ok(serviceWorker.includes('url.origin === "https://images.unsplash.com"'), "Selected photographic wallpapers must be cached by the offline service worker");
assert.ok(serviceWorker.includes("await cache.put(request, response.clone())"), "Successfully loaded photographic wallpapers must be persisted for offline use");
assert.ok(library.includes("finish:studio.dataset.finish"), "Saved card records must preserve the selected finish");
assert.ok(library.includes("current.finish"), "Card studio must restore a previously saved finish");
assert.ok(library.includes("wallpaper:studio.dataset.wallpaper"), "Saved card records must preserve the selected wallpaper");

assert.ok(index.includes("#bibleSearch .search-row > *") && index.includes("min-width:0"), "Reader search controls must be allowed to shrink inside the mobile viewport");
assert.ok(index.includes("@media(max-width:420px)") && index.includes("#bibleSearch .search-row { flex-direction:column; }"), "Reader search controls must stack on narrow phone screens");
assert.ok(index.includes("#bibleSearchResults .search-result") && index.includes("overflow-wrap:anywhere"), "Long search result text must wrap instead of widening the reader");

assert.ok(media.includes('registerPlugin("Media")') && media.includes("mediaPlugin.savePhoto"), "Native Gallery saving must register and call the Capacitor Media plugin");
assert.ok(media.includes('registerPlugin("Share")') && media.includes("sharePlugin.share"), "Native card sharing must register and call the Android share sheet");
assert.ok(media.includes("download"), "Web fallback must retain a download route");

console.log("Reader settings, six highlight choices, single Settings routing, rotating Open Book wallpapers, page finishes, and native/web export safeguards passed.");
