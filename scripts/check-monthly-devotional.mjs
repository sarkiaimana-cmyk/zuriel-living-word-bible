import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-library.js", import.meta.url), "utf8");
const match = source.match(/devotionals:\s*(\[[\s\S]*?\n\s*\]),\s*worshipSongs:/);
assert.ok(match, "The monthly devotional collection must be present.");
const entries = vm.runInNewContext("(" + match[1] + ")", {}, { timeout: 1000 });
assert.equal(entries.length, 30, "The Light Glory Devotional must retain its 30-reflection monthly collection.");
const titles = new Set();
for (const item of entries) {
  assert.ok(item.title && item.verse && item.message && item.prayer,
    "Every devotional needs a title, Scripture reference, message and prayer.");
  assert.ok(!titles.has(item.title), "Devotional titles must be unique: " + item.title);
  titles.add(item.title);
  assert.match(item.verse, /\d+:\d+/, "Every devotional needs a chapter-and-verse reference: " + item.title);
  assert.ok(item.message.trim().length >= 35, "The reflection must contain a meaningful message: " + item.title);
  assert.ok(item.prayer.trim().length >= 25, "The reflection must include a usable prayer: " + item.title);
}
assert.match(source, /zuriel-devotional-entry/, "Devotionals must use their dedicated expandable entry presentation.");
assert.match(source, /Open devotional:/, "Expandable devotional entries need an accessible label.");
assert.match(source, /Open one at a time for a quieter reading experience/,
  "The devotional page should explain its compact expandable layout.");
console.log("Monthly devotional checks passed: 30 unique Scripture-led entries, each with a message and prayer, presented as accessible expandable reflections.");
