import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const source = await readFile(new URL("../zuriel-library.js", import.meta.url), "utf8");
const start = source.indexOf('Restore Personal Library Backup');
const end = source.indexOf('function openReference', start);
assert.ok(start >= 0 && end > start, "Restore interface must be present.");
const section = source.slice(start, end);
for (const required of [
  'picker.accept = "application/json,.json"',
  'backup.format !== "zuriel-personal-library-backup"',
  'backup.schemaVersion !== 1',
  'Array.isArray(backup.personalLibrary.bookmarks)',
  'Array.isArray(backup.personalLibrary.notes)',
  'Array.isArray(backup.personalLibrary.prayers)',
  'backup.verseStudyNotes === null',
  'Array.isArray(backup.verseStudyNotes)',
  'backup.wordHighlights === null',
  'Array.isArray(backup.wordHighlights)',
  'window.confirm("Restore by adding the backup records',
  'mergeArray(existing.bookmarks, backup.personalLibrary.bookmarks)',
  'mergeArray(existing.notes, backup.personalLibrary.notes)',
  'mergeArray(existing.prayers, backup.personalLibrary.prayers)',
  'mergeObject(readLocalRecords("zuriel-verse-study-notes-v1"), backup.verseStudyNotes)',
  'mergeObject(readLocalRecords("zuriel-word-highlights-v1"), backup.wordHighlights)',
  'Restore failed. Your existing personal records were preserved.',
  'Restore write failed and storage rollback could not complete.'
]) assert.ok(section.includes(required), "Restore safeguard missing: "+required);
console.log("Personal-library restore validation passed: schema checks, confirmation, merge, safeguards and failure reporting.");
