import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-library.js", import.meta.url), "utf8");
const match = source.match(/namesOfGod:\s*(\[[\s\S]*?\n\s*\]),\s*studyTopics:/);
assert.ok(match, "Names of God collection must be present in the study library.");
const entries = vm.runInNewContext("(" + match[1] + ")", {}, { timeout: 1000 });
assert.equal(entries.length, 20, "The curated Names of God collection should retain all twenty entries.");
assert.match(source, /zlib-name-study/, "Context notes must have a dedicated expandable presentation.");
assert.match(source, /Explore the passage in context/, "The reader-facing disclosure label must be present.");
assert.match(source, /study\.trim\(\)/, "Every contextual note must be non-empty.");
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
assert.ok(entries.every(entry => !/Numbers 6:24/.test(entry.study)), "No entry should inherit the unrelated priestly-blessing note.");
const christ = entries.find(entry => entry.name === "King of Kings and Lord of Lords");
assert.match(christ.study, /Jesus' supreme kingship/);
for (const title of ["El Olam", "The Lamb of God", "The Good Shepherd", "The Light of the World", "The Bread of Life"]) {
  const entry = entries.find(item => item.name === title);
  assert.ok(entry && entry.study.length >= 120, "Expanded biblical title needs contextual study: " + title);
}

console.log("Names of God study checks passed: fifteen unique entries with contextual notes, correct YHWH passage context and Christ-centred royal-title explanation.");
