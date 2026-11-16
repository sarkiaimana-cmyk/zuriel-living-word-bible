import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const source = await readFile(new URL("../zuriel-personal-space.js", import.meta.url), "utf8");
const marker = "window.ZurielPersonalSpace={mount:mount,open:open,saveInsight:function(item){if(!item||!item.text)return false;const ok=addEntry(NOTES,{id:String(Date.now())+\"-\"+Math.random().toString(36).slice(2),title:item.title||\"Saved insight\",reference:item.reference||\"\",text:item.text,createdAt:new Date().toISOString()});if(ok)status(\"Insight saved from your study.\");return ok;}};";
assert.ok(source.includes(marker), "Personal Study Space test seam has changed; review before updating this test.");

const instrumented = source.replace(marker,
  "window.__test = { read, write, addEntry, mergeChapterHistory };");
const store = new Map();
let failWrites = false;
const localStorage = {
  getItem: key => store.has(key) ? store.get(key) : null,
  setItem: (key, value) => {
    if (failWrites) throw new Error("Simulated device storage failure");
    store.set(key, String(value));
  },
  removeItem: key => store.delete(key)
};
const windowObject = {
  ZurielRecentlyOpened: { list: () => [] }
};
runInNewContext(instrumented, {
  window: windowObject,
  localStorage,
  Date,
  Math,
  JSON,
  Error,
  Array,
  Number,
  String,
  Set,
  Object
});
const api = windowObject.__test;

// Empty stores are safe to read; malformed and unexpected stores must fail closed.
assert.deepEqual(Array.from(api.read("notes")), []);
store.set("notes", "{broken");
assert.throws(() => api.read("notes"), /could not read saved personal data/);
assert.equal(store.get("notes"), "{broken", "A failed read must not modify the damaged record.");
store.set("notes", JSON.stringify({ unexpected: true }));
assert.throws(() => api.read("notes"), /unexpected saved-data format/);
store.delete("notes");

// Saving an entry must preserve existing records and enforce the 300-entry bound.
const existing = Array.from({ length: 300 }, (_, index) => ({
  id: "old-" + index,
  title: "Existing " + index,
  text: "Existing note " + index
}));
store.set("notes", JSON.stringify(existing));
assert.equal(api.addEntry("notes", {
  id: "new-entry",
  title: "New insight",
  text: "A tested saved insight",
  createdAt: "2026-11-16T00:00:00.000Z"
}), true);
const saved = JSON.parse(store.get("notes"));
assert.equal(saved.length, 300, "The personal store must remain bounded to 300 entries.");
assert.equal(saved[0].id, "new-entry", "The new entry must be saved first.");
assert.ok(saved.some(item => item.id === "old-299"), "Existing records within the retention limit must remain.");

// A corrupt store must not be silently replaced when a user saves another entry.
store.set("notes", "{still broken");
assert.equal(api.addEntry("notes", {
  id: "must-not-overwrite",
  title: "Do not overwrite",
  text: "This must not replace unreadable records"
}), false);
assert.equal(store.get("notes"), "{still broken");

// Storage quota/device failures must report failure and leave the previous value untouched.
store.set("prayers", JSON.stringify([{ id: "existing-prayer", title: "Family", text: "Keep this" }]));
const beforeFailedWrite = store.get("prayers");
failWrites = true;
assert.equal(api.addEntry("prayers", {
  id: "new-prayer",
  title: "New prayer",
  text: "This write should fail"
}), false);
failWrites = false;
assert.equal(store.get("prayers"), beforeFailedWrite, "A failed write must preserve existing journal entries.");

// Shared and legacy chapter histories must merge, normalize and de-duplicate safely.
windowObject.ZurielRecentlyOpened = {
  list: () => [
    { book: "John", chapter: 3, openedAt: "newer" },
    { book: "  1   John ", chapter: 2, openedAt: "current" }
  ]
};
const merged = api.mergeChapterHistory([
  { book: "john", chapter: "3", openedAt: "older" },
  { book: "Genesis", chapter: 1, openedAt: "legacy" },
  { book: "  Genesis  ", chapter: 1, openedAt: "duplicate" },
  { book: "", chapter: 1 },
  { book: "Exodus", chapter: 0 }
]);
assert.equal(merged.length, 3);
assert.deepEqual(JSON.parse(JSON.stringify(merged)), [
  { book: "John", chapter: 3, openedAt: "newer" },
  { book: "1 John", chapter: 2, openedAt: "current" },
  { book: "Genesis", chapter: 1, openedAt: "legacy" }
], "Current history must take precedence and duplicate book/chapter pairs must be removed.");

const longHistory = Array.from({ length: 120 }, (_, index) => ({
  book: "Book " + index,
  chapter: 1,
  openedAt: ""
}));
windowObject.ZurielRecentlyOpened = { list: () => [] };
assert.equal(api.mergeChapterHistory(longHistory).length, 100, "Merged chapter history must remain bounded to 100 entries.");

console.log("Personal Study Space runtime tests passed: safe reads, corrupt-record preservation, bounded saves, failed-write preservation, shared/legacy history merge, duplicate removal and history limits.");
