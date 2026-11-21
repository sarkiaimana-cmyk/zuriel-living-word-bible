import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../zuriel-library.js", import.meta.url), "utf8");
const notesStart = source.indexOf('if (page === "notes")');
const savedStart = source.indexOf('if (page === "saved")');
assert.ok(notesStart >= 0 && savedStart > notesStart, "Personal notes and Saved Library pages must exist.");
const notesPage = source.slice(notesStart, savedStart);
for (const text of [
  "Scripture reference (optional",
  "reference: reference.value.trim()",
  "function openNoteReference(referenceText, action)",
  "Open Scripture",
  "renderPersonalNotes()",
  "saved.notes = Array.isArray(saved.notes) ? saved.notes : []"
]) assert.ok(notesPage.includes(text), "Personal notes must include: " + text);

assert.ok(notesPage.includes("let editingNote = null"), "Notes must support an explicit edit state.");
assert.ok(notesPage.includes('button("Edit Note"'), "Each saved personal note must offer an edit action.");
assert.ok(notesPage.includes("Object.assign(editingNote, updated)"), "Editing must update the existing note instead of duplicating it.");
assert.ok(notesPage.includes('saveNoteButton.textContent = "Update Study Note"'), "The save action must clearly indicate update mode.");
assert.ok(notesPage.includes('button("Cancel Editing"'), "Readers must be able to cancel an edit without changing the saved note.");
assert.ok(notesPage.includes('button("Delete Note"'), "Saved study notes must offer a delete action.");
assert.match(notesPage, /window\.confirm\("Delete this saved study note\?/);
assert.match(notesPage, /entries\.splice\(index, 1\)/);

const savedPage = source.slice(savedStart, source.indexOf('content.scrollIntoView', savedStart));
assert.match(savedPage, /const personalNotes = Array\.isArray\(saved\.notes\)/);
assert.match(savedPage, /Personal Bible Study Notes/);
assert.match(savedPage, /personalNotes\.slice\(\)\.reverse\(\)/);
assert.match(savedPage, /openReference\(item\.reference\)/);
assert.match(savedPage, /personalNotes\.length \+ " personal notes"/);
assert.match(savedPage, /function openReference\(reference\)/);
assert.match(savedPage, /\(\?::\(\\d\+\)\)\?/);
assert.match(source, /saved\.notes\.push\(/, "Saved study notes must continue using the shared local record store.");
console.log("Personal notes checks passed: optional Scripture references, local persistence, direct passage links and Saved Library integration.");
