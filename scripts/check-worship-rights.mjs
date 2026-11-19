import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-library.js", import.meta.url), "utf8");
const start = source.indexOf("function canPlayWorshipAudio(song)");
const end = source.indexOf("const originalLibrary =", start);
assert.ok(start >= 0 && end > start, "The worship audio rights gate must exist.");
const helper = source.slice(start, end) + "\nwindow.__canPlayWorshipAudio = canPlayWorshipAudio;";
const sandbox = { window: {}, URL };
vm.runInNewContext(helper, sandbox, { timeout: 1000 });
const canPlay = sandbox.window.__canPlayWorshipAudio;

const approved = {
  rightsStatus: "verified",
  compositionRights: "cleared",
  recordingRights: "cleared",
  streamingAllowed: true,
  audioUrl: "https://media.example.org/authorised-track.mp3",
  rightsSource: "Rights-holder licence record"
};
assert.equal(canPlay(approved), true, "A fully verified HTTPS recording may be played.");
for (const [field, value] of [
  ["rightsStatus", "pending"],
  ["compositionRights", "unknown"],
  ["recordingRights", "pending"],
  ["streamingAllowed", false],
  ["rightsSource", ""],
  ["audioUrl", "http://media.example.org/track.mp3"],
  ["audioUrl", "javascript:alert(1)"],
  ["audioUrl", "not a URL"]
]) {
  assert.equal(canPlay({ ...approved, [field]: value }), false,
    "Playback must be denied when " + field + " is not verified.");
}
assert.equal(canPlay(null), false);
assert.ok(source.includes("Audio is not enabled for this song because verified recording and streaming permissions are not on file."),
  "Unverified songs must display a clear no-audio status instead of a misleading Play action.");
assert.ok(source.includes('Search songs, hymns, themes or Scriptures…'),
  "The worship library must provide an accessible search across songs, themes and Scripture references.");
assert.ok(source.includes('searchInput.setAttribute("aria-label", "Search worship songs and hymns")'),
  "The worship search must have an accessible label.");
assert.ok(source.includes('searchInput.addEventListener("input"'),
  "Typing in worship search must refresh results without losing the selected collection.");
assert.ok(source.includes('searchable.includes(query)'),
  "Worship search must match song title, collection, theme, Scripture reference and study notes.");
assert.ok(source.includes('player.preload = "none"'),
  "Authorised recordings must not preload large media files on mobile.");

const [pathwaysSource, bookDataSource, kjvSource] = await Promise.all([
  readFile(new URL("../data/zuriel-worship-study-pathways.json", import.meta.url), "utf8"),
  readFile(new URL("../bible-data.js", import.meta.url), "utf8"),
  readFile(new URL("../kjv.72bec70fcd.json", import.meta.url), "utf8")
]);
const pathwayLibrary = JSON.parse(pathwaysSource);
const bibleBooks = vm.runInNewContext(bookDataSource.replace(/if \(typeof module[\\s\\S]*$/, ""), {}, { timeout: 1000 });
const kjv = JSON.parse(kjvSource);
assert.equal(bibleBooks.length, 66, "Worship references must resolve against the full 66-book Bible.");
assert.equal(Object.keys(kjv).length, 66, "Worship reference verification requires all 66 KJV books.");
assert.ok(Array.isArray(pathwayLibrary.pathways) && pathwayLibrary.pathways.length >= 30,
  "The worship study library must retain at least 30 original pathways.");
assert.match(pathwayLibrary.description, /not song lyrics or audio recordings/i);
assert.match(pathwayLibrary.rightsPolicy, /composition and recording permissions/i);
const bookByName = new Map(bibleBooks.map(book => [book.name.toLowerCase(), book]));
const ids = new Set(), titles = new Set();
let verifiedReferences = 0;
for (const pathway of pathwayLibrary.pathways) {
  assert.ok(pathway.id && !ids.has(pathway.id), "Every worship pathway needs a unique ID.");
  ids.add(pathway.id);
  assert.ok(pathway.title && !titles.has(pathway.title.toLowerCase()), "Worship pathway titles must be unique.");
  titles.add(pathway.title.toLowerCase());
  for (const field of ["focus", "reflectionPrompt", "contextNote"]) {
    assert.ok(typeof pathway[field] === "string" && pathway[field].trim().length >= 35,
      pathway.title + " needs a substantive " + field + ".");
  }
  assert.ok(Array.isArray(pathway.references) && pathway.references.length >= 2,
    pathway.title + " needs multiple Scripture foundations.");
  for (const reference of pathway.references) {
    const match = String(reference).match(/^(.+?)\\s+(\\d+)(?::(\\d+)(?:-(\\d+))?)?$/);
    assert.ok(match, pathway.title + " has a malformed Scripture reference: " + reference);
    const bookName = match[1].toLowerCase() === "psalm" ? "psalms" : match[1].toLowerCase();
    const book = bookByName.get(bookName);
    assert.ok(book, pathway.title + " refers to an unknown Bible book: " + match[1]);
    const chapter = Number(match[2]);
    const firstVerse = match[3] ? Number(match[3]) : 1;
    const lastVerse = match[4] ? Number(match[4]) : firstVerse;
    assert.ok(chapter >= 1 && chapter <= book.chapters, pathway.title + " has an invalid chapter: " + reference);
    const chapters = kjv[book.name];
    assert.ok(Array.isArray(chapters) && Array.isArray(chapters[chapter - 1]),
      pathway.title + " has no offline KJV chapter for " + reference);
    const verses = chapters[chapter - 1];
    assert.ok(firstVerse >= 1 && lastVerse >= firstVerse && lastVerse <= verses.length,
      pathway.title + " has an invalid offline KJV verse range: " + reference);
    verifiedReferences++;
  }
}

console.log("Worship library checks passed: accessible search and filtering, separate composition and recording rights, streaming permission, HTTPS source, explicit unavailable state and no media preloading.");
