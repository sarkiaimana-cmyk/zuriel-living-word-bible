import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [index, loader, worker, html, pkg, release] = await Promise.all([
  readFile(new URL("../data/zuriel-lexicon-study-index.json", import.meta.url), "utf8").then(JSON.parse),
  readFile(new URL("../zuriel-lexicon-index.js", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../package.json", import.meta.url), "utf8").then(JSON.parse),
  readFile(new URL("../version.json", import.meta.url), "utf8").then(JSON.parse)
]);
assert.equal(index.entries.length, 32, "Expected the curated 32-entry Hebrew/Greek index.");
const ids = new Set();
for (const entry of index.entries) {
  assert.ok(entry.id && /^(H|G)\d+$/.test(entry.id), "Every index entry needs a Hebrew/Greek Strong's identifier.");
  assert.ok(!ids.has(entry.id), "Lexicon IDs must be unique: " + entry.id);
  assert.ok(entry.lemma && entry.transliteration && entry.studyLabel, "Lexicon entry needs lemma, transliteration and study label.");
  assert.ok(Array.isArray(entry.keyReferences) && entry.keyReferences.length, "Lexicon entry needs contextual references.");
  assert.ok(entry.contextPrompt, "Lexicon entry needs a contextual study prompt.");
  ids.add(entry.id);
}
assert.match(index.usageNote, /do not assign a lemma to an English word/i);
assert.ok(loader.includes("window.ZurielLexiconStudyIndex"));
assert.match(loader, /findById/);
assert.match(loader, /Duplicate lexicon index ID/);
assert.ok(html.includes("zuriel-lexicon-index.js"));
assert.match(worker, /zuriel-bible-offline-v214/);
assert.ok(worker.includes("zuriel-lexicon-index.js"));
assert.ok(worker.includes("data/zuriel-lexicon-study-index.json"));
assert.equal(pkg.version, release.version, "Package and app release versions must match.");
assert.equal(release.version, pkg.version);
console.log("Lexicon index checks passed: 32 unique Hebrew/Greek IDs, contextual safeguards, loader, offline precache and matching release metadata.");
