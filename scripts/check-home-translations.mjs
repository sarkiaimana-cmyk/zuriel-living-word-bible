import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [home, translations, index] = await Promise.all([
  readFile("zuriel-home.js", "utf8"),
  readFile("zuriel-translations.js", "utf8"),
  readFile("index.html", "utf8")
]);

const dashboardStart = home.indexOf('dashboard.innerHTML = `');
assert.notEqual(dashboardStart, -1, "home dashboard template must exist");
const dashboardEnd = home.indexOf("`;", dashboardStart);
assert.notEqual(dashboardEnd, -1, "home dashboard template must close");
const dashboard = home.slice(dashboardStart, dashboardEnd);

const translationsPosition = dashboard.indexOf('id="zurielHomeTranslationsSection"');
const identityPosition = dashboard.indexOf('id="zurielIdentityHero"');
assert.ok(translationsPosition >= 0, "Bible translations section must be in the home dashboard");
assert.ok(identityPosition > translationsPosition, "Bible translations must appear before the former top identity hero");

const expected = ["KJV", "GNT", "AMP", "LB/LT", "TPT", "NLT", "NET", "NIV", "ESV", "NASB", "CSB", "NKJV"];
for (const abbreviation of expected) {
  assert.ok(
    dashboard.includes('data-zuriel-translation="' + abbreviation + '"'),
    "top translation shortcut must exist and be interactive: " + abbreviation
  );
}
assert.equal(
  (dashboard.match(/data-zuriel-translation=/g) || []).length,
  expected.length,
  "the top section must contain exactly the twelve requested translation shortcuts"
);
assert.ok(home.includes('dashboard.querySelectorAll("[data-zuriel-translation]")'), "top translation shortcuts must receive click handlers");
assert.ok(home.includes('window.ZurielTranslations.selectVersion(version)'), "non-KJV shortcuts must request their selected version");
assert.ok(home.includes('if (version === "KJV")'), "KJV shortcut must open the bundled offline Bible reader");
assert.ok(
  home.includes('navigate("read");\n        if (window.ZurielTranslations'),
  "non-KJV Home shortcuts must reveal the Reader before opening its translation panel"
);
assert.ok(
  home.includes('const status = document.getElementById("readerStatus");'),
  "translation-loading feedback must be shown in the visible Reader, not the hidden Home dashboard"
);

assert.ok(translations.includes('panel.id = "zurielTranslationCompare"'), "translation comparison and download panel must exist");
assert.ok(!dashboard.includes('id="zurielHomeTranslations"'), "expanded translation management must not clutter the home shortcuts");
assert.ok(translations.includes('reader.appendChild(panel)'), "translation management panel must mount in the reader");
assert.ok(!dashboard.includes('translation-access-note'), "home must not display provider explanation text");
assert.ok(translations.includes('selectVersion: async function (abbreviation)'), "translation shortcuts must resolve against the authorised live catalogue");

const homeScript = index.indexOf('src="zuriel-home.js"');
const translationsScript = index.indexOf('src="zuriel-translations.js"');
assert.ok(homeScript >= 0 && translationsScript > homeScript, "home dashboard and translation scripts must load in the expected order");

console.log("Top Bible translations checks passed: first home section, all 12 tappable shortcuts, KJV offline route and provider controls mounted in the top section.");
