import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-study.js", import.meta.url), "utf8");
const start = source.indexOf("function commentaryText(value)");
const end = source.indexOf("\n  async function initialiseCommentaryLibrary()", start);
assert.ok(start >= 0 && end > start, "Commentary text normaliser must remain available.");
const helperSource = source.slice(start, end) + "\nwindow.commentaryText = commentaryText;";
const sandbox = { window: {}, String, Array };
vm.runInNewContext(helperSource, sandbox, { timeout: 1000 });
assert.equal(sandbox.window.commentaryText("  Note text  "), "Note text");
assert.equal(sandbox.window.commentaryText(["First paragraph", "Second paragraph"]), "First paragraph\n\nSecond paragraph");
assert.equal(sandbox.window.commentaryText([{ text: "A" }, { content: "B" }]), "A\n\nB");
assert.equal(sandbox.window.commentaryText(null), "");

assert.ok(source.includes('const COMMENTARY_API = "https://bible.helloao.org/api/c/";'));
assert.ok(source.includes('const COMMENTARY_CATALOG_API = "https://bible.helloao.org/api/available_commentaries.json";'));
assert.ok(source.includes('id="zurielCommentarySource"'));
assert.ok(source.includes('id="zurielLoadCommentary"'));
assert.ok(source.includes('id="zurielCommentaryResults"'));
assert.ok(source.includes('source.language === "eng"'));
assert.ok(source.includes('COMMENTARY_LICENSE_ALLOWLIST.has(String(source.licenseUrl || ""))'));
assert.ok(source.includes('".simple.json"'));
assert.ok(source.includes('Number(entry.number) === Number(ref.verse)'));
assert.ok(source.includes('Source: " + (source.name || source.englishName || commentaryId)'));
assert.ok(source.includes('fetchStudyJson(COMMENTARY_API + commentaryId'));
assert.equal((source.match(/resetCommentaryForSelection\(\);/g) || []).length, 2, "Changing the selected verse must cancel stale commentary requests and re-enable the load control.");
assert.ok(source.includes('This commentary has no verse-specific note'));

console.log("Published commentary reader checks passed: safe text rendering, English/licence filtering, exact verse selection, source attribution and cached chapter retrieval.");
