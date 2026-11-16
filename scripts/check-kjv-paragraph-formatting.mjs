import fs from "node:fs";
import assert from "node:assert/strict";

const reader = fs.readFileSync("index.html", "utf8");
assert.ok(reader.includes('const paragraphStart = rawVerseText.startsWith("¶");'),
  "The reader must recognise source paragraph markers.");
assert.ok(reader.includes('const displayVerseText = rawVerseText.replace(/^¶\\s*/, "");'),
  "The reader must remove the non-Scripture paragraph marker from visible text.");
assert.ok(reader.includes('paragraph.className = paragraphStart ? "verse verse-paragraph-start" : "verse";'),
  "Paragraph starts must remain visually distinct after the marker is removed.");
assert.ok(reader.includes("const wordParts = displayVerseText.match(/\\S+|\\s+/g) || [];"),
  "Original-language word indexing must use the clean displayed verse text.");
assert.ok(reader.includes("selectVerseForGloryCard(index + 1, displayVerseText);"),
  "Saved verse cards must not contain the formatting marker.");
assert.ok(reader.includes("book, chapter, index + 1, displayVerseText, part, thisWordIndex"),
  "Word study must receive clean verse text and matching word indexes.");
assert.ok(reader.includes('String(verse).replace(/^¶\\s*/, "")'),
  "Safe verse retrieval must remove paragraph markers from cards and references.");
assert.ok(reader.includes("#message .verse.verse-paragraph-start") &&
          reader.includes("margin-top: 1.15em;"),
  "Paragraph starts must be represented by spacing, not a visible pilcrow.");
console.log("KJV paragraph formatting checks passed: source markers are retained in the data, removed from displayed verse text, and represented by readable paragraph spacing without breaking word-study indexing.");
