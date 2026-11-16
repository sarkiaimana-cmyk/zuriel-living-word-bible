import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const source = await readFile(new URL("../zuriel-reading-plans.js", import.meta.url), "utf8");
const store = new Map();
const localStorage = {
  getItem: key => store.has(key) ? store.get(key) : null,
  setItem: (key, value) => store.set(key, String(value))
};
const sandbox = { window: {}, localStorage, Set, Map, Array, Object, JSON, String, Number, Math };
runInNewContext(source, sandbox);
const api = sandbox.window.ZurielReadingPlans;

assert.ok(api, "Reading plan module must expose its public API.");
const plans = api.list();
assert.equal(plans.length, 3, "Three curated starter plans should be available.");
for (const plan of plans) {
  assert.equal(plan.duration, 7);
  assert.equal(plan.passages.length, 7);
  assert.ok(plan.title && plan.id);
}
assert.deepEqual(JSON.parse(JSON.stringify(api.readState())), {
  schemaVersion: 1, activePlanId: null, plans: {}
});

store.set("zuriel_reading_plan_progress_v1", "{broken-json");
assert.throws(() => api.readState(), /unreadable/);
assert.equal(api.writeState({ schemaVersion: 1, activePlanId: null, plans: {} }), false, "A new plan must not overwrite unreadable saved progress.");
assert.equal(store.get("zuriel_reading_plan_progress_v1"), "{broken-json", "Unreadable saved progress must remain untouched.");
store.set("zuriel_reading_plan_progress_v1", JSON.stringify({ schemaVersion: 99, activePlanId: null, plans: {} }));
assert.throws(() => api.readState(), /unsupported or invalid structure/);
assert.equal(api.writeState({ schemaVersion: 1, activePlanId: null, plans: {} }), false, "A new plan must not overwrite a future or invalid schema.");
assert.equal(JSON.parse(store.get("zuriel_reading_plan_progress_v1")).schemaVersion, 99);
store.delete("zuriel_reading_plan_progress_v1");

const progress = {
  schemaVersion: 1,
  activePlanId: "meet-jesus-7",
  plans: {
    "meet-jesus-7": { startedAt: "2026-11-15T00:00:00.000Z", completedDays: [1, 2, 2, 7] }
  }
};
assert.equal(api.validateProgress(progress), true);
assert.equal(api.writeState(progress), true);
assert.deepEqual(JSON.parse(JSON.stringify(api.readState().plans["meet-jesus-7"].completedDays)), [1, 2, 7]);
assert.equal(api.validateProgress({ ...progress, activePlanId: "unknown-plan" }), false);
assert.equal(api.validateProgress({
  schemaVersion: 1, activePlanId: "meet-jesus-7",
  plans: { "meet-jesus-7": { completedDays: [8] } }
}), false);

assert.deepEqual(JSON.parse(JSON.stringify(api.parseReference("John 3:16-17"))), {
  book: "John", chapter: 3, verse: 16, endVerse: 17, wholeChapter: false
});
assert.deepEqual(JSON.parse(JSON.stringify(api.parseReference("Psalm 23"))), {
  book: "Psalms", chapter: 23, verse: 1, endVerse: 1, wholeChapter: true
});
assert.equal(api.parseReference("John 3:18-16"), null, "A reversed verse range must be rejected.");
assert.equal(api.parseReference("John 3:0"), null, "Verse zero must be rejected.");
assert.equal(api.parseReference("John 0"), null, "Chapter zero must be rejected.");
assert.equal(api.parseReference("not a Scripture reference"), null);

const allReferences = plans.flatMap(plan => plan.passages);
assert.equal(allReferences.length, 21);
for (const reference of allReferences) assert.ok(api.parseReference(reference), "Every curated passage must parse: " + reference);
console.log("Reading plan runtime checks passed: three seven-day plans, 21 passages, private progress persistence, duplicate-day cleanup, invalid-state rejection and Scripture-reference parsing.");
