import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { webcrypto } from "node:crypto";

const source = await readFile(new URL("../zuriel-backup.js", import.meta.url), "utf8");
const marker = "window.ZurielBackup = { mount: mount };";
assert.ok(source.includes(marker), "Backup module test seam has changed; review before updating this test.");
const instrumented = source.replace(marker,
  "window.__test = { encryptBackup, decryptBackup, validateBackup, applyRestore };");
const store = new Map();
const localStorage = {
  getItem: key => store.has(key) ? store.get(key) : null,
  setItem: (key, value) => store.set(key, String(value)),
  removeItem: key => store.delete(key)
};
const sandbox = {
  window: { crypto: webcrypto },
  crypto: webcrypto,
  localStorage,
  TextEncoder,
  TextDecoder,
  Uint8Array,
  Map,
  Set,
  Array,
  Object,
  JSON,
  Error,
  btoa: value => Buffer.from(value, "binary").toString("base64"),
  atob: value => Buffer.from(value, "base64").toString("binary")
};
runInNewContext(instrumented, sandbox);
const api = sandbox.window.__test;

const sample = {
  app: "Zuriel Living Word Bible",
  schemaVersion: 1,
  exportedAt: "2026-11-15T00:00:00.000Z",
  data: {
    notes: [{ id: "note-1", title: "Grace", text: "Saved insight", createdAt: "2026-11-14" }],
    prayers: [{ id: "prayer-1", title: "Family", text: "Prayer entry", createdAt: "2026-11-14" }],
    readingHistory: [{ book: "John", chapter: 3 }],
    lastReadingPosition: { book: "John", chapter: 3, verse: 16 },
    savedLessons: ["lesson-a"],
    completedLessons: ["lesson-b"]
  }
};

const encrypted = await api.encryptBackup(sample, "correct horse battery");
assert.equal(encrypted.format, "zuriel-encrypted-backup");
assert.equal(encrypted.cipher, "AES-256-GCM");
assert.deepEqual(JSON.parse(JSON.stringify(await api.decryptBackup(encrypted, "correct horse battery"))), sample);
await assert.rejects(() => api.decryptBackup(encrypted, "wrong password"), /could not be unlocked/);

const damaged = { ...encrypted, ciphertext: encrypted.ciphertext.slice(0, -4) + "AAAA" };
await assert.rejects(() => api.decryptBackup(damaged, "correct horse battery"), /could not be unlocked/);
await assert.rejects(() => api.decryptBackup({ ...encrypted, schemaVersion: 99 }, "correct horse battery"), /not a supported/);

const incoming = api.validateBackup(sample);
assert.equal(incoming.notes.length, 1);
assert.throws(() => api.validateBackup({ ...sample, data: { ...sample.data, notes: [{ id: "", title: "Bad", text: "Invalid" }] } }), /valid ID/);
assert.throws(() => api.validateBackup({ ...sample, app: "Other app" }), /recognised Zuriel/);

store.set("zuriel_personal_notes_v1", JSON.stringify([
  { id: "note-1", title: "Existing version", text: "Keep this", createdAt: "2026-11-13" },
  { id: "note-2", title: "Keep", text: "Existing note", createdAt: "2026-11-12" }
]));
store.set("zuriel_prayer_journal_v1", "[]");
store.set("zurielReadingHistory_v1", "[]");
store.set("zurielLastReadingPosition", JSON.stringify({ book: "Psalms", chapter: 23 }));
store.set("zuriel_kingdom_life_saved_v1", JSON.stringify(["lesson-a"]));
store.set("zuriel_kingdom_life_completed_v1", "[]");
const merged = api.applyRestore(incoming);
const notes = JSON.parse(store.get("zuriel_personal_notes_v1"));
assert.equal(notes.length, 2, "Duplicate note IDs must not be added.");
assert.equal(notes.find(item => item.id === "note-1").text, "Keep this", "Existing matching records must be preserved.");
assert.ok(notes.some(item => item.id === "note-2"), "Unmatched existing notes must remain.");
assert.deepEqual(JSON.parse(store.get("zuriel_kingdom_life_saved_v1)), ["lesson-a"]);
assert.deepEqual(JSON.parse(store.get("zuriel_kingdom_life_completed_v1")), ["lesson-b"]);
assert.deepEqual(JSON.parse(store.get("zurielLastReadingPosition")), { book: "Psalms", chapter: 23 });
assert.equal(merged.readingHistory.length, 1);

// Exercise the rollback path: fail one write after earlier stores have changed,
// then confirm every original value is restored once storage becomes writable.
const beforeFailure = new Map(store);
const originalSetItem = localStorage.setItem;
let failOnce = true;
localStorage.setItem = (key, value) => {
  if (key === "zurielReadingHistory_v1" && failOnce) {
    failOnce = false;
    throw new Error("Simulated storage quota failure");
  }
  originalSetItem(key, value);
};
assert.throws(
  () => api.applyRestore(incoming),
  /attempted to return your existing records/
);
assert.deepEqual([...store.entries()], [...beforeFailure.entries()], "Rollback must restore every original local record.");
localStorage.setItem = originalSetItem;

console.log("Personal backup runtime tests passed: AES-GCM round-trip, wrong password, tampered ciphertext, unsupported schema, record validation, safe merge, duplicate handling, existing-data preservation and rollback after a simulated storage failure.");
