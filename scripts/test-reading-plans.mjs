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
assert.equal(plans.length, 10, "Ten curated offline reading plans should be available.");
for (const plan of plans) {
  assert.equal(plan.passages.length, plan.duration);
  assert.ok(plan.title && plan.id);
}
const monthPlan = plans.find(plan => plan.id === "walk-with-jesus-30");
assert.ok(monthPlan, "The 30-day Walk with Jesus plan must be available.");
assert.equal(monthPlan.duration, 30);
assert.equal(monthPlan.passages.length, 30);

const meetJesusPlan = plans.find(plan => plan.id === "meet-jesus-7");
assert.ok(meetJesusPlan, "The seven-day Meet Jesus plan must be available.");
assert.equal(meetJesusPlan.days.length, 7);
for (const day of meetJesusPlan.days) {
  assert.ok(day.reference && day.focus, "Each Meet Jesus day must retain its passage and focus.");
  assert.ok(day.reflection.length >= 30, "Each Meet Jesus day must include a meaningful passage-specific reflection question.");
  assert.ok(day.prayer.length >= 40, "Each Meet Jesus day must include its own prayer.");
}

const hopePlan = plans.find(plan => plan.id === "hope-in-hard-seasons-7");
assert.ok(hopePlan, "The Hope in Difficult Seasons plan must be available.");
assert.equal(hopePlan.days.length, 7);
for (const day of hopePlan.days) {
  assert.ok(day.reference && day.focus, "Each hope-plan day must retain its passage and focus.");
  assert.ok(day.reflection.length >= 30, "Each hope-plan day must include a contextual reflection question.");
  assert.ok(day.prayer.length >= 40, "Each hope-plan day must include its own prayer.");
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
assert.equal(allReferences.length, 93);
assert.match(source, /zrp-reflection/);
assert.match(source, /zrp-prayer/);
assert.match(source, /if \(day\[2\]\).*Reflect:/);
assert.match(source, /if \(day\[3\]\).*Pray:/);
for (const reference of allReferences) assert.ok(api.parseReference(reference), "Every curated passage must parse: " + reference);
console.log("Reading plan runtime checks passed: ten plans including a 30-day Jesus journey, 93 passages, private progress persistence, duplicate-day cleanup, invalid-state rejection and Scripture-reference parsing.");
