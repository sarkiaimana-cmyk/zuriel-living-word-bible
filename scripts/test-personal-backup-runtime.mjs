import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { webcrypto } from "node:crypto";

const source = await readFile(new URL("../zuriel-backup.js", import.meta.url), "utf8");
const marker = "window.ZurielBackup = { mount: mount };";
assert.ok(source.includes(marker), "Backup module test seam has changed; review before updating this test.");
const instrumented = source.replace(marker,
  "window.__test = { encryptBackup, decryptBackup, validateBackup, applyRestore, collect };");
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

// A damaged local store must stop backup/restore instead of being silently
// converted to an empty list and exported as if no records existed.
for (const key of [
  "zuriel_personal_notes_v1",
  "zuriel_prayer_journal_v1",
  "zurielReadingHistory_v1",
  "zuriel_kingdom_life_saved_v1",
  "zuriel_kingdom_life_completed_v1",
  "zuriel-verse-study-notes-v1",
  "zuriel-word-highlights-v1",
  "zuriel_personal_library_v1"
]) {
  store.set(key, "{not valid JSON");
  assert.throws(() => api.collect(), /could not read saved personal data/, key + " corruption must fail closed");
  store.delete(key);
}
store.set("zurielLastReadingPosition", "{not valid JSON");
assert.throws(() => api.collect(), /could not read your saved reading position/, "Corrupt reading position must fail closed");
store.delete("zurielLastReadingPosition");
store.set("zuriel_reading_plan_progress_v1", "{not valid JSON");
assert.throws(() => api.collect(), /could not read your saved reading-plan progress/, "Corrupt reading-plan data must fail closed");
store.delete("zuriel_reading_plan_progress_v1");
store.set("zuriel_personal_notes_v1", JSON.stringify({ unexpected: true }));
assert.throws(() => api.collect(), /unexpected saved-data format/, "Unexpected local store shapes must fail closed");
store.delete("zuriel_personal_notes_v1");

const sample = {
  app: "Zuriel Living Word Bible",
  schemaVersion: 2,
  exportedAt: "2026-11-15T00:00:00.000Z",
  data: {
    notes: [{ id: "note-1", title: "Grace", text: "Saved insight", createdAt: "2026-11-14" }],
    prayers: [{ id: "prayer-1", title: "Family", text: "Prayer entry", createdAt: "2026-11-14" }],
    readingHistory: [{ book: "John", chapter: 3 }],
    lastReadingPosition: { book: "John", chapter: 3, verse: 16 },
    savedLessons: ["lesson-a"],
    completedLessons: ["lesson-b"],
    readingPlanProgress: { schemaVersion: 1, activePlanId: "meet-jesus-7", plans: { "meet-jesus-7": { startedAt: "2026-11-15T00:00:00.000Z", completedDays: [1, 2] } } },
    verseStudyNotes: { "John|3|16": { title: "Grace", note: "God's love", application: "Trust in Christ", updated: "2026-11-15T00:00:00.000Z" } },
    wordHighlights: { "John|3|16": { verseColor: "#f5d76e", words: { "1": "#f5d76e" } } },
    personalLibrary: {
      prayers: [{ title: "Family", text: "Keep our family", date: "2026-11-15" }],
      notes: [{ title: "Study note", text: "Remember grace", date: "2026-11-15" }],
      bookmarks: [{ title: "John 3:16", reference: "John 3:16", text: "For God so loved the world", type: "scripture", savedAt: "2026-11-15T00:00:00.000Z" }]
    }
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
assert.throws(() => api.validateBackup({ ...sample, data: { ...sample.data, readingPlanProgress: { schemaVersion: 1, activePlanId: "meet-jesus-7", plans: { "meet-jesus-7": { completedDays: [0] } } } } }), /reading-plan progress/);
assert.throws(() => api.validateBackup({ ...sample, data: { ...sample.data, readingPlanProgress: { schemaVersion: 1, activePlanId: "unknown-plan", plans: { "unknown-plan": { completedDays: [1] } } } } }), /reading-plan progress/);
assert.throws(() => api.validateBackup({ ...sample, data: { ...sample.data, readingPlanProgress: { schemaVersion: 1, activePlanId: "meet-jesus-7", plans: { "meet-jesus-7": { completedDays: [8] } } } } }), /reading-plan progress/);
const olderBackup = JSON.parse(JSON.stringify(sample));
olderBackup.schemaVersion = 1;
delete olderBackup.data.readingPlanProgress;
delete olderBackup.data.verseStudyNotes;
delete olderBackup.data.wordHighlights;
delete olderBackup.data.personalLibrary;
const legacyData = api.validateBackup(olderBackup);
assert.deepEqual(JSON.parse(JSON.stringify(legacyData.readingPlanProgress)), { schemaVersion: 1, activePlanId: null, plans: {} }, "Older backups remain restorable without reading-plan data.");
assert.deepEqual(JSON.parse(JSON.stringify(legacyData.verseStudyNotes)), {}, "Older backups remain restorable without verse-study notes.");
assert.deepEqual(JSON.parse(JSON.stringify(legacyData.wordHighlights)), {}, "Older backups remain restorable without highlights.");
assert.deepEqual(JSON.parse(JSON.stringify(legacyData.personalLibrary)), { prayers: [], notes: [], bookmarks: [] }, "Older backups remain restorable without saved-library data.");

store.set("zuriel_personal_notes_v1", JSON.stringify([
  { id: "note-1", title: "Existing version", text: "Keep this", createdAt: "2026-11-13" },
  { id: "note-2", title: "Keep", text: "Existing note", createdAt: "2026-11-12" }
]));
store.set("zuriel_prayer_journal_v1", "[]");
store.set("zurielReadingHistory_v1", "[]");
store.set("zurielLastReadingPosition", JSON.stringify({ book: "Psalms", chapter: 23 }));
store.set("zuriel_kingdom_life_saved_v1", JSON.stringify(["lesson-a"]));
store.set("zuriel_kingdom_life_completed_v1", "[]");
store.set("zuriel_reading_plan_progress_v1", JSON.stringify({ schemaVersion: 1, activePlanId: "prayer-and-trust-7", plans: { "meet-jesus-7": { startedAt: "2026-11-14T00:00:00.000Z", completedDays: [1, 3] }, "prayer-and-trust-7": { startedAt: "2026-11-14T00:00:00.000Z", completedDays: [1] } } }));
store.set("zuriel-verse-study-notes-v1", JSON.stringify({ "John|3|16": { title: "Existing", note: "Keep existing note", application: "", updated: "2026-11-14T00:00:00.000Z" } }));
store.set("zuriel-word-highlights-v1", JSON.stringify({ "John|3|16": { verseColor: "#ff0", words: { "2": "#0f0" } } }));
store.set("zuriel_personal_library_v1", JSON.stringify({ prayers: [], notes: [], bookmarks: [{ title: "Existing bookmark", reference: "Psalm 23:1", text: "The LORD is my shepherd", type: "scripture" }] }));
const merged = api.applyRestore(incoming);
const notes = JSON.parse(store.get("zuriel_personal_notes_v1"));
assert.equal(notes.length, 2, "Duplicate note IDs must not be added.");
assert.equal(notes.find(item => item.id === "note-1").text, "Keep this", "Existing matching records must be preserved.");
assert.ok(notes.some(item => item.id === "note-2"), "Unmatched existing notes must remain.");
assert.deepEqual(JSON.parse(store.get("zuriel_kingdom_life_saved_v1")), ["lesson-a"]);
assert.deepEqual(JSON.parse(store.get("zuriel_kingdom_life_completed_v1")), ["lesson-b"]);
assert.deepEqual(JSON.parse(store.get("zurielLastReadingPosition")), { book: "Psalms", chapter: 23 });
assert.equal(merged.readingHistory.length, 1);
const mergedPlans = JSON.parse(store.get("zuriel_reading_plan_progress_v1"));
assert.equal(mergedPlans.activePlanId, "prayer-and-trust-7", "Existing active plan selection is preserved.");
assert.deepEqual(mergedPlans.plans["meet-jesus-7"].completedDays, [1, 2, 3], "Reading plan progress merges without losing completed days.");
assert.deepEqual(mergedPlans.plans["prayer-and-trust-7"].completedDays, [1]);
const restoredStudyNotes = JSON.parse(store.get("zuriel-verse-study-notes-v1"));
assert.equal(restoredStudyNotes["John|3|16"].note, "God's love", "The newer verse-study note should be restored.");
const restoredHighlights = JSON.parse(store.get("zuriel-word-highlights-v1"));
assert.equal(restoredHighlights["John|3|16"].verseColor, "#ff0", "Existing verse highlight colour is preserved.");
assert.deepEqual(restoredHighlights["John|3|16"].words, { "1": "#f5d76e", "2": "#0f0" }, "Word highlights merge without losing either device's saved words.");
const restoredLibrary = JSON.parse(store.get("zuriel_personal_library_v1"));
assert.equal(restoredLibrary.bookmarks.length, 2, "Existing and backed-up bookmarks are retained.");
assert.equal(restoredLibrary.prayers.length, 1, "Saved-library prayers are included.");
assert.equal(restoredLibrary.notes.length, 1, "Saved-library notes are included.");

// Exercise the rollback path: fail one write after earlier stores have changed,
// then confirm every original value is restored once storage becomes writable.
const beforeFailure = new Map(store);
const originalSetItem = localStorage.setItem;
let failOnce = true;
localStorage.setItem = (key, value) => {
  if (key === "zuriel_reading_plan_progress_v1" && failOnce) {
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

console.log("Personal backup runtime tests passed: AES-GCM round-trip, wrong password, tampered ciphertext, legacy and current schema compatibility, record, study-note, highlight and saved-library validation, safe merge, existing-data preservation and rollback after a simulated storage failure.");
