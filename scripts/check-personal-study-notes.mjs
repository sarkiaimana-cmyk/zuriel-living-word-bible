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
