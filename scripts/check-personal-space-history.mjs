import fs from "node:fs";
import assert from "node:assert/strict";

const source = fs.readFileSync("zuriel-personal-space.js", "utf8");
assert.match(source, /window\.ZurielRecentlyOpened\s*&&\s*typeof window\.ZurielRecentlyOpened\.list\s*===\s*"function"/,
  "Personal Study Space must read the shared Recently Opened chapter history.");
assert.match(source, /mergeChapterHistory\(legacyHistory\)/,
  "Progress must combine current and legacy chapter history.");
assert.match(source, /const key=book\.toLowerCase\(\)\+"\\\|"\+chapter/,
  "Combined history must de-duplicate book/chapter pairs.");
assert.match(source, /merged\.slice\(0,100\)/,
  "Combined history must remain bounded.");
assert.match(source, /await window\.openChapter\(item\.book,item\.chapter\)/,
  "Progress history entries must reopen the exact chapter through the Bible reader.");
assert.match(source, /Could not reopen /,
  "A failed reopen must show a visible status message.");
assert.match(source, /const legacyHistory=read\(HISTORY\)/,
  "Existing Personal Study Space history must remain included.");
console.log("Personal Study Space history integration checks passed.");
