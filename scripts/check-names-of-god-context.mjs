import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-library.js", import.meta.url), "utf8");
const match = source.match(/namesOfGod:\s*(\[[\s\S]*?\n\s*\]),\s*studyTopics:/);
assert.ok(match, "Names of God collection must be present in the study library.");
const entries = vm.runInNewContext("(" + match[1] + ")", {}, { timeout: 1000 });
assert.equal(entries.length, 15, "The curated Names of God collection should retain all fifteen entries.");
const names = new Set();
for (const entry of entries) {
  assert.ok(entry.name && entry.meaning && entry.reference, "Every name needs a title, meaning and Scripture reference.");
  assert.ok(!names.has(entry.name), "Names must not be duplicated: " + entry.name);
  names.add(entry.name);
  assert.ok(typeof entry.study === "string" && entry.study.trim().length >= 120,
    "Every name needs a substantial contextual study note: " + entry.name);
}
const yhwh = entries.find(entry => entry.name === "YHWH — The LORD");
assert.match(yhwh.study, /Exodus 3:13–15/);
assert.match(yhwh.study, /Israel's suffering/);
assert.doesNotMatch(yhwh.study, /Numbers 6:24/);
const christ = entries.find(entry => entry.name === "King of Kings and Lord of Lords");
assert.match(christ.study, /Jesus' supreme kingship/);
console.log("Names of God study checks passed: fifteen unique entries with contextual notes, correct YHWH passage context and Christ-centred royal-title explanation.");
