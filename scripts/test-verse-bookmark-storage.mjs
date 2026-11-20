import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const source = await readFile(new URL("../zuriel-study.js", import.meta.url), "utf8");
const start = source.indexOf("  function readPersonalLibraryBookmarks(raw) {");
const end = source.indexOf("  function readNotes() {", start);
assert.ok(start >= 0 && end > start, "Safe shared-library bookmark reader must exist.");
const helper = source.slice(start, source.indexOf("\n  }", start) + 4) +
  "\nwindow.__test = readPersonalLibraryBookmarks;";
const sandbox = { window: {}, JSON, Error, Array };
runInNewContext(helper, sandbox);
const read = sandbox.window.__test;

assert.deepEqual(JSON.parse(JSON.stringify(read(null))), { bookmarks: [] });
const original = { prayers: [{ text: "Keep this prayer" }], notes: [{ title: "Keep this note" }], bookmarks: [] };
assert.deepEqual(JSON.parse(JSON.stringify(read(JSON.stringify(original)))), original);
for (const raw of ["{broken", "[]", "null", JSON.stringify({ prayers: [], bookmarks: "invalid" })]) {
  assert.throws(() => read(raw), /saved library/i, "Invalid shared library data must be rejected.");
}
console.log("Verse-bookmark storage tests passed: new store, valid record preservation, corrupt JSON and malformed shapes fail closed.");
