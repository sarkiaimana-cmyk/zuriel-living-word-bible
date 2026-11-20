import { readFile } from "node:fs/promises";
import vm from "node:vm";
import assert from "node:assert/strict";

const study = await readFile(new URL("../zuriel-study.js", import.meta.url), "utf8");
const start = study.indexOf("  function readStudyRecordMap(");
const end = study.indexOf("  function noteKey(", start);
assert.ok(start >= 0 && end > start, "Study storage readers must remain available for integrity testing.");

const sandbox = {
  localStorage: {
    values: new Map(),
    getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  }
};
vm.runInNewContext(
  study.slice(start, end) + "\nthis.studyStorage = { readStudyRecordMap, isPlainRecord, isHighlightColor };",
  sandbox
);
const read = sandbox.studyStorage.readStudyRecordMap;
const validNote = value => sandbox.studyStorage.isPlainRecord(value) &&
  ["title", "note", "application", "updated"].every(key =>
    value[key] === undefined || typeof value[key] === "string");
const validHighlight = value => {
  if (!sandbox.studyStorage.isPlainRecord(value)) return false;
  if (value.verseColor !== undefined && !sandbox.studyStorage.isHighlightColor(value.verseColor)) return false;
  if (value.words !== undefined && (!sandbox.studyStorage.isPlainRecord(value.words) ||
      !Object.keys(value.words).every(key => /^\d+$/.test(key) &&
        sandbox.studyStorage.isHighlightColor(value.words[key])))) return false;
  if (value.wordTokens !== undefined && (!sandbox.studyStorage.isPlainRecord(value.wordTokens) ||
      !Object.keys(value.wordTokens).every(key => /^\d+$/.test(key) &&
        typeof value.wordTokens[key] === "string"))) return false;
  return true;
};

assert.deepEqual(Object.keys(read("notes", "verse study notes", validNote)), [],
  "A genuinely new store should start empty.");
sandbox.localStorage.values.set("notes", JSON.stringify({
  "John|3|16": { title: "Grace", note: "Remember this", application: "Trust God" }
}));
assert.equal(read("notes", "verse study notes", validNote)["John|3|16"].title, "Grace",
  "Valid saved notes must remain readable.");

const corrupt = "{not valid json";
sandbox.localStorage.values.set("notes", corrupt);
assert.throws(() => read("notes", "verse study notes", validNote),
  /could not be read.*Existing records have not been changed/i);
assert.equal(sandbox.localStorage.getItem("notes"), corrupt,
  "A failed read must never alter the original stored bytes.");

sandbox.localStorage.values.set("notes", "[]");
assert.throws(() => read("notes", "verse study notes", validNote),
  /unsupported format/i);
sandbox.localStorage.values.set("notes", JSON.stringify({ "John|3|16": { note: 42 } }));
assert.throws(() => read("notes", "verse study notes", validNote),
  /record is invalid/i);

sandbox.localStorage.values.set("highlights", JSON.stringify({
  "John|3|16": { verseColor: "#f5d76e", words: { "2": "#a8ddb5" }, wordTokens: { "2": "loved" } }
}));
assert.equal(read("highlights", "Scripture highlights", validHighlight)["John|3|16"].words["2"], "#a8ddb5",
  "Valid word and verse highlights must remain readable.");

sandbox.localStorage.values.set("highlights", JSON.stringify({
  "John|3|16": { words: { "2": "javascript:alert(1)" } }
}));
assert.throws(() => read("highlights", "Scripture highlights", validHighlight),
  /record is invalid/i);
sandbox.localStorage.values.set("highlights", JSON.stringify({
  "John|3|16": { wordTokens: [] }
}));
assert.throws(() => read("highlights", "Scripture highlights", validHighlight),
  /record is invalid/i);

console.log("Study storage integrity tests passed: valid notes/highlights preserved; corrupt JSON, invalid schemas and unsafe highlight values fail closed without overwriting user data.");
