import { readFile } from "node:fs/promises";
const [updates, workflow, backup, version] = await Promise.all([
  readFile(new URL("../zuriel-updates.js", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/android-apk.yml", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-backup.js", import.meta.url), "utf8"),
  readFile(new URL("../version.json", import.meta.url), "utf8")
]);
const info = JSON.parse(version);
const failures = [];
if (!updates.includes('const APP_VERSION = "' + info.version + '";')) failures.push("In-app updater version must match version.json.");
if (!updates.includes("releases/latest")) failures.push("Native app update checker must query the official latest GitHub release.");
if (!updates.includes("Download official Zuriel Android update")) failures.push("Native update centre must offer the official signed APK.");
if (!updates.includes("Do not uninstall it")) failures.push("Update centre must warn users not to uninstall before an in-place update.");
if (!updates.includes("If Android reports a signature or package conflict, cancel")) failures.push("Update centre must tell users to cancel on package/signature mismatch.");
if (!workflow.includes("contents: write")) failures.push("Android workflow cannot publish official signed update releases.");
if (!workflow.includes("steps.signing_check.outputs.available == 'true' && steps.signed_release.outcome == 'success'")) failures.push("Only a successfully signed release may be published as an update.");
if (!workflow.includes("com.zuriel.livingwordbible.release")) failures.push("The stable release package identity is not enforced.");
if (!workflow.includes("Verify signed APK package and version metadata")) failures.push("Signed APK identity/version verification is missing.");
for (const key of ["zuriel_personal_notes_v1","zuriel_prayer_journal_v1","zurielReadingHistory_v1","zurielLastReadingPosition","zuriel-verse-study-notes-v1","zuriel-word-highlights-v1","zuriel_personal_library_v1","zuriel_reading_plan_progress_v1"]) {
  if (!backup.includes(key)) failures.push("Encrypted backup does not include " + key + ".");
}
if (failures.length) {
  console.error("In-app update/data preservation checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("In-app update checks passed: official signed-release publishing, stable package identity, user approval, no-uninstall guidance, and encrypted personal-data backup coverage.");
}
