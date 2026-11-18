import fs from "node:fs";
import assert from "node:assert/strict";
const source = fs.readFileSync("zuriel-study.js", "utf8");
assert.ok(!source.includes("grid-template-columns:minmax(0,1fr) minmax(280px,360px);"));
const start = source.indexOf("/* Scripture remains the primary full-width reading surface. */");
const end = source.indexOf("\`;", start);
assert.ok(start >= 0 && end > start);
const css = source.slice(start, end);
assert.ok(css.includes("grid-template-columns:minmax(0,1fr);"));
const verseStart = css.lastIndexOf("#zurielReaderStudyLayout > #message .verse {");
const verseEnd = css.indexOf("}", verseStart);
assert.ok(verseStart >= 0 && verseEnd > verseStart);
const verseRule = css.slice(verseStart, verseEnd);
const sharedWidthStart = css.indexOf("#zurielReaderStudyLayout > #message > *,");
const sharedWidthEnd = css.indexOf("}", sharedWidthStart);
assert.ok(sharedWidthStart >= 0 && sharedWidthEnd > sharedWidthStart);
const sharedWidthRule = css.slice(sharedWidthStart, sharedWidthEnd);
for (const declaration of ["width:100%", "max-width:100%", "min-width:0"])
  assert.ok(sharedWidthRule.includes(declaration), "Missing full-width container declaration: " + declaration);
for (const declaration of ["text-align:left", "white-space:normal", "overflow-wrap:anywhere"])
  assert.ok(verseRule.includes(declaration), "Missing full-width verse declaration: " + declaration);
const panelStart = css.indexOf("#zurielStudyPanel {");
const panelEnd = css.indexOf("}", panelStart);
assert.ok(panelStart >= 0 && panelEnd > panelStart);
const panelRule = css.slice(panelStart, panelEnd);
assert.ok(panelRule.includes("max-height:none") && panelRule.includes("overflow:visible"));
console.log("Full-width Scripture layout checks passed.");


const settings = fs.readFileSync("zuriel-settings.js", "utf8");
assert.ok(settings.includes('paper: "white"'), "White paper must be the default reader background.");
assert.ok(settings.includes('#message[data-zuriel-paper="white"]'), "A true white Scripture page must be available.");
assert.ok(settings.includes('id: "georgia"') && settings.includes('id: "times"') &&
  settings.includes('id: "arial"') && settings.includes('id: "verdana"') &&
  settings.includes('id: "trebuchet"') && settings.includes('id: "system"'),
  "The reader must offer multiple built-in, offline-safe font choices.");
assert.ok(settings.includes('id="zurielFontFamily"') &&
  settings.includes('message.style.fontFamily = readerFont.stack'),
  "The selected font must apply to the Scripture text.");
console.log("White reader page and multiple-font preferences passed.");
