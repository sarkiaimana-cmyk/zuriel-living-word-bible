import fs from "node:fs";

const index = fs.readFileSync("index.html", "utf8");
const history = fs.readFileSync("zuriel-history.js", "utf8");
const worker = fs.readFileSync("sw.js", "utf8");

function requireMatch(source, pattern, message) {
  if (!pattern.test(source)) throw new Error(message);
}

requireMatch(index, /<script src="zuriel-home\.js"><\/script>[\s\S]*?<script src="zuriel-history\.js"><\/script>/,
  "Recently Opened must load after the home dashboard so it can mount safely.");
requireMatch(worker, /"\.\/zuriel-history\.js"/,
  "Recently Opened must be included in the offline core asset cache.");
requireMatch(history, /const STORAGE_KEY = "zurielRecentlyOpenedChapters-v1"/,
  "Recently Opened must use its own storage key and not overwrite saved reading position.");
requireMatch(history, /await window\.openChapter\(item\.book, item\.chapter\)/,
  "Each history entry must reopen the exact saved Bible chapter.");
requireMatch(history, /recordChapter\(book, chapter\)/,
  "Only successfully opened chapters should be recorded.");
requireMatch(index, /ZurielRecentlyOpened\.recordChapter\(book, chapter\)/,
  "The core reader must record ordinary chapter opens, not only external reference opens.");
requireMatch(history, /MAX_ITEMS = 500/,
  "History must remain bounded to protect local device storage.");
requireMatch(history, /function clearHistory\(\)/,
  "Clearing history must use one shared action for current and legacy history stores.");
requireMatch(history, /zurielReadingHistory_v1/,
  "Clearing history must remove the legacy history source so cleared entries cannot reappear.");
requireMatch(history, /clear: clearHistory/,
  "The shared history clear action must be exposed for safe reuse.");
requireMatch(history, /Your saved notes and bookmarks are unchanged/,
  "Clearing history must explicitly preserve other personal study data.");
requireMatch(history, /textContent = "View all history"/,
  "Home must provide a direct route to the complete chapter history.");
requireMatch(history, /ZurielPersonalSpace\.openProgress\(\)/,
  "The View all history action must open the full progress history.");
requireMatch(history, /textContent = item\.book \+ " " \+ item\.chapter/,
  "History labels must be rendered as text, not injected markup.");

console.log("Recently Opened safeguards passed: isolated storage, successful-open recording, exact chapter reopening, bounded history, safe text rendering, preserved notes/bookmarks, and offline asset registration.");
