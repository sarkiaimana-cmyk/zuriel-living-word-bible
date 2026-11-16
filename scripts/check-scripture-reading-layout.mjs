import fs from "node:fs";
import assert from "node:assert/strict";

const source = fs.readFileSync("zuriel-study.js", "utf8");
assert.match(source, /#zurielReaderStudyLayout\\s*\\{[\\s\\S]*?grid-template-columns:\\s*minmax\\(0,1fr\\)\\s*;/,
  "The Scripture reader and study panel must use a single full-width column.");
assert.match(source, /#zurielReaderStudyLayout\\s*>\\s*#message\\s*\\{[\\s\\S]*?width:\\s*100%[\\s\\S]*?max-width:\\s*100%[\\s\\S]*?text-align:\\s*left/,
  "The main Bible text must occupy the full available width and align left.");
assert.match(source, /#zurielReaderStudyLayout\\s*>\\s*#message \\.verse\\s*\\{[\\s\\S]*?width:\\s*100%[\\s\\S]*?white-space:\\s*normal[\\s\\S]*?overflow-wrap:\\s*anywhere[\\s\\S]*?text-align:\\s*left/,
  "Every Scripture verse must wrap naturally inside the screen without horizontal overflow or centered narrow text.");
assert.match(source, /#zurielStudyPanel\\s*\\{[\\s\\S]*?max-height:\\s*none[\\s\\S]*?overflow:\\s*visible/,
  "The study panel must not trap the reader in a short internal scroll area.");
assert.doesNotMatch(source, /grid-template-columns:\\s*minmax\\(0,1fr\\)\\s+minmax\\(280px,360px\\)/,
  "The reader must not be squeezed into a narrow column beside the study panel.");
console.log("Full-width Scripture layout checks passed: one-column reading surface, left-aligned complete verse text, natural wrapping, no narrow side-by-side reader, and no trapped study-panel scroll.");
