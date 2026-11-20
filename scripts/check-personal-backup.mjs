import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const [backup, personal, library, index, serviceWorker, packaging, version, updates] = await Promise.all([
  readFile(new URL("../zuriel-backup.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-personal-space.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-library.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("./prepare-web.mjs", import.meta.url), "utf8"),
  readFile(new URL("../version.json", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-updates.js", import.meta.url), "utf8")
]);
const failures = [];
if (!library.includes("function emptySavedLibrary()") ||
    !library.includes("function refreshSaved()") ||
    !library.includes("if (savedLoadError)") ||
    !library.includes("savedReadFailureMessage()") ||
    !library.includes("if (!refreshSaved())")) {
  failures.push("Personal library must fail closed when existing saved records cannot be read.");
}
if (!library.includes("Your existing records have not been changed.")) {
  failures.push("Personal library corruption warning must explicitly protect existing records.");
}
try {
  execFileSync(process.execPath, ["scripts/test-library-storage-integrity.mjs"], { stdio: "inherit" });
} catch (error) {
  failures.push("Personal library storage runtime regression tests failed.");
}
for (const key of [
  "zuriel_personal_notes_v1",
  "zuriel_prayer_journal_v1",
  "zurielReadingHistory_v1",
  "zurielRecentlyOpenedChapters-v1",
  "zurielLastReadingPosition",
  "zuriel_kingdom_life_saved_v1",
  "zuriel_kingdom_life_completed_v1",
  "zuriel_reading_plan_progress_v1",
  "zuriel-verse-study-notes-v1",
  "zuriel-word-highlights-v1",
  "zuriel_personal_library_v1",
  "zuriel_glory_verse_cards_v1",
  "zuriel-saved-faith-cards-v1"
]) if (!backup.includes(key)) failures.push("Backup is missing storage key: " + key);
for (const fragment of [
  "schemaVersion: 1",
  "schemaVersion: 2",
  "safeStudyNotes",
  "safeWordHighlights",
  "safePersonalLibrary",
  "safeGloryVerseCards",
  "safeFaithCards",
  "mergeFaithCards",
  "safeRecentChapters",
  "mergeRecentChapters",
  "slice(0, 500)",
  "mergeHighlights",
  "mergePersonalLibrary",
  "validateBackup",
  "safeRecords",
  "Restore & Merge Records",
  "Existing entries are kept",
  "localStorage.setItem",
  "localStorage.removeItem",
  "MAX_FILE = 8 * 1024 * 1024",
  "AES-256-GCM",
  "PBKDF2-SHA-256",
  "crypto.subtle.encrypt",
  "crypto.subtle.decrypt",
  "KDF_ITERATIONS = 250000",
  "zbackupPassword",
  "zbackupConfirm"
]) if (!backup.includes(fragment)) failures.push("Backup safeguard missing: " + fragment);
if (!backup.includes("createObjectURL") || !backup.includes("application/json")) failures.push("Encrypted JSON export download is missing.");
if (!backup.includes("FileReader") || !backup.includes("JSON.parse") || !backup.includes("decryptBackup")) failures.push("Encrypted local backup file import is missing.");
if (!backup.includes("map.has(key)") || !backup.includes("new Set(current.concat(incoming))")) failures.push("Restore merge/deduplication is missing.");
if (!backup.includes("previous[key]") || !backup.includes("attempted to return your existing records")) failures.push("Restore rollback protection is missing.");
if (/fetch\s*\(|XMLHttpRequest|sendBeacon/.test(backup)) failures.push("Backup module must not send personal records over a network.");
if (!backup.includes("safeReadingPlanProgress") || !backup.includes("mergeReadingPlans")) failures.push("Encrypted backup does not validate and merge reading-plan progress.");
if (!personal.includes('["plans","🗓️ Reading Plans"]') || !personal.includes("window.ZurielReadingPlans.render(panel,status)")) failures.push("My Study Space does not expose the reading plans section.");
if (!personal.includes("#message .verse[data-verse-number=\"'+position.verse+'\"]")) failures.push("Continue reading must restore the exact saved verse by its visible verse-number attribute, not array position.");
if (!index.includes('src="zuriel-reading-plans.js"')) failures.push("Web entry point does not load reading plans.");
if (!serviceWorker.includes('"./zuriel-reading-plans.js"')) failures.push("Offline cache does not include reading plans.");
if (!packaging.includes('"zuriel-reading-plans.js"')) failures.push("Android package preparation does not include reading plans.");
if (!personal.includes("Zuriel could not read saved personal data") || !personal.includes("Your records have not been changed.")) failures.push("Personal Study Space must stop safely when saved records cannot be read.");
if (!personal.includes("catch(error){status(error.message);return false;}")) failures.push("Saving a new personal entry must not overwrite unreadable existing records.");
if (!personal.includes("Your entry was not deleted.")) failures.push("Deleting a personal entry must report storage failures without claiming success.");
if (!personal.includes("window.ZurielBackup.mount(root)")) failures.push("My Study Space does not mount backup controls.");
if (!index.includes('src="zuriel-backup.js"')) failures.push("Web entry point does not load backup module.");
if (!serviceWorker.includes('"./zuriel-backup.js"')) failures.push("Offline cache does not include backup module.");
if (!packaging.includes('"zuriel-backup.js"')) failures.push("Android package preparation does not include backup module.");
if (!packaging.includes('"zuriel-faith-cards.js"')) failures.push("Android package preparation does not include saved faith cards.");
const info = JSON.parse(version);
const appVersionMatch = updates.match(/const APP_VERSION = "([^"]+)";/);
if (!info.version || !appVersionMatch || info.version !== appVersionMatch[1]) failures.push("App version metadata is inconsistent between version.json and the in-app update centre.");
if (failures.length) {
  console.error("Personal backup integrity checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Personal backup integrity checks passed: all local study records, bookmarks and progress stores, encrypted export/import, merge, validation, rollback, offline and Android inclusion.");
}
