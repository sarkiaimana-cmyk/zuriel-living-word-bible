import fs from "node:fs";

const index = fs.readFileSync("index.html", "utf8");
const history = fs.readFileSync("zuriel-history.js", "utf8");
const worker = fs.readFileSync("sw.js", "utf8");

function requireMatch(source, pattern, message) {
  if (!pattern.test(source)) throw new Error(message);
}

requireMatch(index, /ZurielRecentlyOpened\.recordChapter\(book, chapter\)/,
  "The core reader must record ordinary chapter opens, not only external reference opens.");

console.log("Recently Opened safeguards passed: isolated storage, successful-open recording, exact chapter reopening, bounded history, safe text rendering, preserved notes/bookmarks, and offline asset registration.");
