import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const [source,index,bookSource,kjvText] = await Promise.all([
  readFile("zuriel-library.js","utf8"),
  readFile("index.html","utf8"),
  readFile("bible-data.js","utf8"),
  readFile("kjv.72bec70fcd.json","utf8")
]);
const devotionalBlock = source.match(/devotionals:\s*\[([\s\S]*?)\n\s*\],\s*worshipSongs:/);
const worshipBlock = source.match(/worshipSongs:\s*\[([\s\S]*?)\n\s*\],\s*affirmations:/);
assert.ok(devotionalBlock, "The monthly devotional data is present.");
assert.ok(worshipBlock, "The worship and hymn collection data is present.");
const devotionals = vm.runInNewContext("([" + devotionalBlock[1] + "])");
const songs = vm.runInNewContext("([" + worshipBlock[1] + "])");
const mapping = index.match(/const bookCodes = (\{[\s\S]*?\n\};)/);
assert.ok(mapping, "The reader Bible book-code map exists.");
const bookCodes = JSON.parse(mapping[1].replace(/;\s*$/, ""));
const books = [...bookSource.matchAll(/\{\s*name:\s*"([^"]+)",\s*chapters:\s*(\d+)\s*\}/g)]
  .map(match => ({name:match[1],chapters:Number(match[2])}));
const kjv = JSON.parse(kjvText);
function validReference(reference) {
  const references = String(reference || "").split(/\\s*;\\s*/).filter(Boolean);
  return references.length > 0 && references.every(value => {
    const match = value.trim().match(/^(.+?)\\s+(\\d+):(\\d+)(?:[-–](\\d+))?$/);
    if (!match) return false;
    const name = match[1].toLowerCase() === "psalm" ? "Psalms" : match[1];
    const book = books.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (!book) return false;
    const chapter = Number(match[2]), first = Number(match[3]), last = Number(match[4] || match[3]);
    const verses = kjv[bookCodes[book.name]]?.[chapter-1];
    return Array.isArray(verses) && first >= 1 && last >= first && last <= verses.length;
  });
}
assert.equal(devotionals.length,30,"The monthly devotional collection contains 30 reflections.");
assert.equal(new Set(devotionals.map(item=>item.title)).size,devotionals.length,"Devotional titles are unique.");
assert.ok(devotionals.some(item=>item.title==="Hope in God"));
assert.ok(devotionals.some(item=>item.title==="Power of the Holy Spirit"));
for(const item of devotionals){
  // Short titles such as "Hope in God" are intentional; message and prayer carry the longer content.
  for(const field of ["title","verse","message","prayer"]) {
    const minimumLength = field === "title" ? 3 : field === "verse" ? 6 : 12;
    assert.ok(typeof item[field]==="string" && item[field].trim().length>=minimumLength,item.title+" has a complete "+field+".");
  }
  assert.ok(validReference(item.verse),item.title+" points to a valid bundled KJV passage: "+item.verse);
  assert.ok(!/^day\s+\d+/i.test(item.title),"Devotional titles do not show unwanted day numbers.");
}
assert.ok(source.includes("A monthly collection of 30 Scripture-led reflections"));
assert.ok(songs.length>=10,"The worship shelf contains a usable curated song and hymn collection.");
assert.equal(new Set(songs.map(item=>item.title)).size,songs.length,"Worship titles are unique.");
for(const song of songs){
  for(const field of ["title","collection","theme","reference","note"])
    assert.ok(typeof song[field]==="string" && song[field].trim().length>=5,
      song.title+" has a meaningful "+field+".");
  assert.ok(validReference(song.reference),song.title+" points to a valid bundled KJV reference.");
  assert.ok(!Object.prototype.hasOwnProperty.call(song,"lyrics"),
    "The worship catalogue must not bundle unlicensed lyrics.");
}
assert.ok(source.includes("Audio is not enabled for this song because verified recording and streaming permissions are not on file."));
assert.ok(source.includes("canPlayWorshipAudio(song)"));
console.log("Devotional and worship checks passed: 30 monthly reflections, unique titles, required prayer/message fields, valid KJV references, searchable worship records and no unlicensed lyric or recording playback.");
