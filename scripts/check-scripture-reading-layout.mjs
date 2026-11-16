import fs from "node:fs";
import assert from "node:assert/strict";

const source = fs.readFileSync("zuriel-study.js", "utf8");
assert.ok(!source.includes("grid-template-columns:minmax(0,1fr) minmax(280px,360px);"),
  "The Bible reader must not be squeezed beside a fixed-width study column.");
const start = source.indexOf("/* Scripture is the primary reading surface:");
const end = source.indexOf("`;", start);
assert.ok(start >= 0 && end > start, "The full-width reader CSS must be present.");
const css = source.slice(start, end);
assert.ok(css.includes("grid-template-columns:minmax(0,1fr);"));
const verseStart = css.indexOf("#zurielReaderStudyLayout > #message .verse {");
const verseEnd = css.indexOf("}", verseStart);
assert.ok(verseStart >= 0 && verseEnd > verseStart, "Full-width verse rule must exist.");
const verseRule = css.slice(verseStart, verseEnd);
for (const declaration of [
  "width:100%", "max-width:100%", "min-width:0",
  "text-align:left", "white-space:normal", "overflow-wrap:anywhere"
]) assert.ok(verseRule.includes(declaration), "Verse rule must include " + declaration);
const panelStart = css.indexOf("#zurielStudyPanel {");
const panelEnd = css.indexOf("}", panelStart);
assert.ok(panelStart >= 0 && panelEnd > panelStart, "Study panel full-width rule must exist.");
const panelRule = css.slice(panelStart, panelEnd);
assert.ok(panelRule.includes("max-height:none") && panelRule.includes("overflow:visible"),
  "The study panel must not trap the reader in a short internal scroll area.");
console.log("Full-width Scripture layout checks passed: one-column reading surface, left-aligned full-width verse text, natural wrapping, and no trapped study-panel scroll.");
