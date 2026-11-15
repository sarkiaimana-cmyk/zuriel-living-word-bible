import { readFile } from "node:fs/promises";

const [backup, personal, index, serviceWorker, packaging, version, updates] = await Promise.all([
  readFile(new URL("../zuriel-backup.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-personal-space.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("./prepare-web.mjs", import.meta.url), "utf8"),
  readFile(new URL("../version.json", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-updates.js", import.meta.url), "utf8")
]);
const failures = [];
for (const key of [
  "zuriel_personal_notes_v1",
  "zuriel_prayer_journal_v1",
  "zurielReadingHistory_v1",
  "zurielLastReadingPosition",
  "zuriel_kingdom_life_saved_v1",
  "zuriel_kingdom_life_completed_v1",
  "zuriel_reading_plan_progress_v1"
]) if (!backup.includes(key)) failures.push("Backup is missing storage key: " + key);
for (const fragment of [
  "schemaVersion: 1",
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
if (!index.includes('src="zuriel-reading-plans.js"')) failures.push("Web entry point does not load reading plans.");
if (!serviceWorker.includes('"./zuriel-reading-plans.js"')) failures.push("Offline cache does not include reading plans.");
if (!packaging.includes('"zuriel-reading-plans.js"')) failures.push("Android package preparation does not include reading plans.");
if (!personal.includes("window.ZurielBackup.mount(root)")) failures.push("My Study Space does not mount backup controls.");
if (!index.includes('src="zuriel-backup.js"')) failures.push("Web entry point does not load backup module.");
if (!serviceWorker.includes('"./zuriel-backup.js"')) failures.push("Offline cache does not include backup module.");
if (!packaging.includes('"zuriel-backup.js"')) failures.push("Android package preparation does not include backup module.");
const info = JSON.parse(version);
if (info.version !== "1.4.11" || !updates.includes('const APP_VERSION = "1.4.11";')) failures.push("App version metadata is inconsistent.");
if (failures.length) {
  console.error("Personal backup integrity checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Personal backup integrity checks passed: seven local data stores, JSON export/import, merge, validation, rollback, offline and Android inclusion.");
}
