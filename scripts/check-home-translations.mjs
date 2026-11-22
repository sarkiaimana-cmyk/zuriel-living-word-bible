import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [home, settings, translations, index] = await Promise.all([
  readFile("zuriel-home.js", "utf8"),
  readFile("zuriel-settings.js", "utf8"),
  readFile("zuriel-translations.js", "utf8"),
  readFile("index.html", "utf8")
]);

const expected = ["KJV", "GNT", "AMP", "LB/LT", "TPT", "NLT", "NET", "NIV", "ESV", "NASB", "CSB", "NKJV"];
assert.ok(settings.includes('id="zurielSettingsTranslationChoices"'), "Bible translations must live in Settings");
assert.ok(settings.includes('id="zurielSettingsTranslations"'), "Provider and offline download controls must mount in Settings");
assert.ok(settings.includes('<h3>🌐 Bible Translations</h3>'), "Settings must clearly label the Bible Translations section");
for (const abbreviation of expected) {
  assert.ok(
    settings.includes('data-zuriel-translation="' + abbreviation + '"'),
    "Settings must show the requested translation shortcut: " + abbreviation
  );
}
assert.equal(
  (settings.match(/data-zuriel-translation=/g) || []).length,
  expected.length,
  "Settings must contain exactly the twelve requested translation shortcuts"
);
assert.ok(settings.includes('window.ZurielTranslations.selectVersion(version)'), "Non-KJV choices must use the authorised provider catalogue");
assert.ok(settings.includes('if (version === "KJV")'), "KJV choice must open the bundled offline Bible reader");
assert.ok(settings.includes('id="zurielSettingsAbout"'), "About Zuriel must be a dedicated Settings section");
assert.ok(settings.includes('translationCredits = document.getElementById("zurielBibleCopyrightCredits")'), "Existing translation copyright information must be moved into Settings");
assert.ok(settings.includes('aboutSlot.appendChild(translationCredits)'), "About and copyright credits must be mounted in Settings");

assert.ok(translations.includes('panel.id = "zurielTranslationCompare"'), "Translation comparison and download panel must exist");
assert.ok(translations.includes('settingsSlot.appendChild(panel)'), "Provider controls must mount inside Settings");
assert.ok(translations.includes('id="zurielSettingsTranslations"'), "Translation panel must target the Settings mount point");
assert.ok(translations.includes('selectVersion: async function (abbreviation)'), "Translation choices must resolve against the authorised live catalogue");

assert.ok(!home.includes('id="zurielHomeTranslationsSection"'), "The translation selector must not occupy the Home dashboard");
assert.ok(!home.includes('dashboard.querySelectorAll("[data-zuriel-translation]")'), "Home must not own duplicate translation click handlers");
assert.ok(!home.includes('id="zurielHomeTranslations"'), "The former Home translation mount point must be removed");
assert.ok(!index.includes('id="zurielReaderTranslations"'), "Reader must not show a duplicate translation shortcut strip");

console.log("Bible translation placement checks passed: all 12 requested versions, live provider/offline controls, About and copyright credits in Settings, no duplicate Home/Reader translation sections.");
