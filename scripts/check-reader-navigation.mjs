import fs from "node:fs";

const reader = fs.readFileSync("index.html", "utf8");
const navigator = fs.readFileSync("zuriel-grid-navigation.js", "utf8");
const home = fs.readFileSync("zuriel-home.js", "utf8");

function requireMatch(source, pattern, message) {
  if (!pattern.test(source)) throw new Error(message);
}

requireMatch(
  reader,
  /window\.openChapter\s*=\s*function\s*\(book,\s*chapter\)[\s\S]*?\.catch\s*\(\s*function\s*\(error\)[\s\S]*?throw\s+error\s+instanceof\s+Error\s*\?/,
  "Reader navigation must rethrow chapter-loading errors so callers cannot report false success."
);
requireMatch(
  navigator,
  /await\s+window\.openChapter\(selectedBook,\s*selectedChapter\)[\s\S]*?expectedHeading[\s\S]*?if\s*\(selectedVerse\)[\s\S]*?data-verse-number/,
  "The passage navigator must verify the requested chapter and exact selected verse before closing."
);
requireMatch(
  home,
  /await\s+window\.openChapter\(book,\s*chapter\)[\s\S]*?if\s*\(verseNumber\)[\s\S]*?selected verse was not found/,
  "The home passage selector must check the selected verse after opening a chapter."
);

console.log("Reader navigation checks passed: errors propagate and selected passages are verified.");
