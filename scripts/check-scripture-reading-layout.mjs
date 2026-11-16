import fs from "node:fs";
import assert from "node:assert/strict";

const source = fs.readFileSync("zuriel-study.js", "utf8");
assert.ok(!source.includes("grid-template-columns:minmax(0,1fr) minmax(280px,360px);"),
  "The Bible reader must not be squeezed beside a fixed-width study column.");
const start = source.indexOf("/* Scripture is the primary reading surface:");
const end = source.indexOf("`;", start);
assert.ok(start >= 0 && end > start, "The full-width reader CSS must be present.");
const css = source.slice(start, end);
assert.match(css, /grid-template-columns:\s*minmax\(0,1fr\)/);
assert.match(css, /#zurielReaderStudyLayout\s*>\s*#message[\s\S]*?width:\s*100%[\s\S]*?max-width:\s*100%[\s\S]*?text-align:\s*left/);
assert.match(css, /#zurielReaderStudyLayout\s*>\s*#message \.verse[\s\S]*?width:\s*100%[\s\S]*?white-space:\s*normal[\s\S]*?overflow-wrap:\s*anywhere[\s\S]*?text-align:\s*left/);
assert.match(css, /#zurielStudyPanel[\s\S]*?max-height:\s*none[\s\S]*?overflow:\s*visible/);
console.log("Full-width Scripture layout checks passed: one-column reading surface, left-aligned full-width verse text, natural wrapping, and no trapped study-panel scroll.");
