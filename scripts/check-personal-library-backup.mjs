import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const source = await readFile(new URL("../zuriel-library.js", import.meta.url), "utf8");
const savedStart = source.indexOf('if (page === "saved")');
const savedEnd = source.indexOf('content.scrollIntoView', savedStart);
assert.ok(savedStart >= 0 && savedEnd > savedStart, "Saved Library page must exist.");
const page = source.slice(savedStart, savedEnd);
for (const text of [
  "Export My Zuriel Personal Library",
  "zuriel-personal-library-backup",
  "schemaVersion: 1",
  "personalLibrary: saved",
  "verseStudyNotes: verseNotes",
  "wordHighlights: verseHighlights",
  "zuriel-personal-library-backup.json",
  "URL.createObjectURL(blob)",
  "URL.revokeObjectURL(url)",
  "Your personal-library backup export was requested. Check your Downloads."
]) assert.ok(page.includes(text), "Backup export must include: " + text);
assert.ok(page.includes("Keep exported files private."), "Export must include a privacy reminder.");
console.log("Personal library backup checks passed: export includes saved records, verse studies and highlights in versioned JSON.");
