import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const source = await readFile(new URL("../zuriel-library.js", import.meta.url), "utf8");
const start = source.indexOf("  function emptySavedLibrary() {");
const end = source.indexOf("  function element(tag, text, className) {", start);
assert.ok(start >= 0 && end > start, "Personal library storage block has changed; review this test before updating it.");
const block = source.slice(start, end) + "\nwindow.__test = { loadSaved, refreshSaved, persist, getSaved: () => saved, hasError: () => !!savedLoadError };";
const store = new Map();
let writes = 0;
const localStorage = {
  getItem: key => store.has(key) ? store.get(key) : null,
  setItem: (key, value) => { writes++; store.set(key, String(value)); }
};
const alerts = [];
const sandbox = { localStorage, window: {}, alert: message => alerts.push(message), JSON, Array, Object, Error, String };
runInNewContext(block, sandbox);
const api = sandbox.window.__test;
const key = "zuriel_personal_library_v1";

assert.deepEqual(JSON.parse(JSON.stringify(api.getSaved())), { prayers: [], notes: [], bookmarks: [] },
  "A genuinely new library should start empty.");

const valid = { prayers: [{ text: "Prayer", date: "today" }], notes: [{ title: "Note", text: "Keep" }], bookmarks: [{ title: "Bookmark" }] };
store.set(key, JSON.stringify(valid));
assert.equal(api.refreshSaved(), true);
assert.deepEqual(JSON.parse(JSON.stringify(api.getSaved())), valid);

store.set(key, "{broken JSON");
const beforeCorruptWrite = writes;
assert.equal(api.refreshSaved(), false, "Corrupt JSON must fail closed.");
assert.equal(api.hasError(), true);
assert.deepEqual(JSON.parse(JSON.stringify(api.getSaved())), { prayers: [], notes: [], bookmarks: [] });
assert.equal(api.persist(), false, "A corrupt store must never be overwritten with empty defaults.");
assert.equal(writes, beforeCorruptWrite, "No storage write is allowed after a corrupt read.");
assert.equal(store.get(key), "{broken JSON", "The original damaged bytes must remain untouched.");
assert.ok(alerts.some(message => /existing records have not been changed/i.test(message)));

for (const malformed of [
  JSON.stringify({ prayers: [], notes: [] }),
  JSON.stringify({ prayers: {}, notes: [], bookmarks: [] }),
  JSON.stringify([])
]) {
  store.set(key, malformed);
  assert.equal(api.refreshSaved(), false, "Malformed schema must fail closed.");
  assert.equal(api.persist(), false, "Malformed schema must not be replaced.");
}
store.set(key, JSON.stringify(valid));
assert.equal(api.refreshSaved(), true, "A repaired valid store should be usable again.");
assert.equal(api.persist(), true, "A valid store can be saved normally.");
assert.equal(writes, beforeCorruptWrite + 1);
console.log("Personal library storage runtime tests passed: new-store defaults, valid load, corrupt JSON rejection, malformed schema rejection, no destructive overwrite, visible warning and recovery after valid data is restored.");
