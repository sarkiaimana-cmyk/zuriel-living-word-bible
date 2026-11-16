import fs from "node:fs";
import assert from "node:assert/strict";
import vm from "node:vm";

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

// Exercise clear-history success and rollback against both history stores.
const historyStart = history.indexOf("function clearHistory()");
const historyEnd = history.indexOf("function recordChapter(book, chapter)", historyStart);
assert.ok(historyStart >= 0 && historyEnd > historyStart, "Shared history clear function must be available.");
const clearFunction = history.slice(historyStart, historyEnd);
function clearHarness(failOnLegacy = false) {
  const store = new Map([
    ["zurielRecentlyOpenedChapters-v1", '[{"book":"John","chapter":3}]'],
    ["zurielReadingHistory_v1", '[{"book":"Genesis","chapter":1}]'],
    ["zuriel_personal_notes_v1", '[{"text":"keep"}]']
  ]);
  const localStorage = {
    getItem: key => store.has(key) ? store.get(key) : null,
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: key => {
      if (failOnLegacy && key === "zurielReadingHistory_v1") throw new Error("storage write blocked");
      store.delete(key);
    }
  };
  const sandbox = { window: {}, localStorage };
  vm.runInNewContext('const STORAGE_KEY = "zurielRecentlyOpenedChapters-v1";\\n' +
    clearFunction + '\\nwindow.__clearHistory = clearHistory;', sandbox, { timeout: 1000 });
  return { clear: sandbox.window.__clearHistory, store };
}
const clearSuccess = clearHarness();
assert.equal(clearSuccess.clear(), true);
assert.equal(clearSuccess.store.has("zurielRecentlyOpenedChapters-v1"), false);
assert.equal(clearSuccess.store.has("zurielReadingHistory_v1"), false);
assert.equal(clearSuccess.store.has("zuriel_personal_notes_v1"), true,
  "Clearing reading history must not remove personal study notes.");
const clearRollback = clearHarness(true);
assert.equal(clearRollback.clear(), false);
assert.equal(clearRollback.store.has("zurielRecentlyOpenedChapters-v1"), true,
  "A partial clear must restore the current history if the legacy store cannot be cleared.");
assert.equal(clearRollback.store.has("zurielReadingHistory_v1"), true,
  "A partial clear must preserve the legacy history.");
assert.equal(clearRollback.store.has("zuriel_personal_notes_v1"), true);

console.log("Recently Opened safeguards passed: isolated storage, successful-open recording, exact chapter reopening, bounded history, safe text rendering, preserved notes/bookmarks, and offline asset registration.");
