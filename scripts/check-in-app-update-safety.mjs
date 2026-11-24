import { readFile } from "node:fs/promises";
const [updates, workflow, backup, version, fingerprint, installer] = await Promise.all([
  readFile(new URL("../zuriel-updates.js", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/android-apk.yml", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-backup.js", import.meta.url), "utf8"),
  readFile(new URL("../version.json", import.meta.url), "utf8"),
  readFile(new URL("../android-signing-fingerprint.txt", import.meta.url), "utf8"),
  readFile(new URL("./prepare-android-updater.mjs", import.meta.url), "utf8")
]);
const info = JSON.parse(version);
const expectedFingerprint = "902bac9ce36d81a418c3a76e0f5295c891b9b504fb842a0c036e6844ade3a351";
const failures = [];
if (!updates.includes('const APP_VERSION = "' + info.version + '";')) failures.push("In-app updater version must match version.json.");
if (!updates.includes("nativeUpdater.installUpdate") || !updates.includes("sha256")) failures.push("Native app update must use the checksum-verifying Android installer.");
if (!installer.includes("Intent.ACTION_INSTALL_PACKAGE") || !installer.includes("Intent.EXTRA_RETURN_RESULT")) failures.push("Android update installer must request the package installation result.");
if (!installer.includes("startActivityForResult(call, install, \\"handleInstallResult\\")") || !installer.includes("Activity.RESULT_OK") || !installer.includes("call.resolve(new JSObject().put(\\"installed\\", true))")) failures.push("Android updater must report success only after Android confirms installation.");
if (!updates.includes("result.installed") || updates.includes("result.installerOpened")) failures.push("In-app updater must distinguish completed installation from merely opening the installer.");
if (!updates.includes("releases/latest")) failures.push("Native app update checker must query the official latest GitHub release.");
if (!updates.includes('release.tag_name !== "v" + info.version')) failures.push("Native app update must match the official release tag to version metadata.");
if (!updates.includes('Number(asset.size) > 0') || !updates.includes('asset.digest || ""')) failures.push("Native app update must require a non-empty APK asset and its published SHA-256 digest.");
if (!updates.includes('/Zuriel-Living-Word-Bible-release\\.apk$/i.test(asset.name)')) failures.push("Native app update must match the exact official APK filename with a literal dot.");
if (!updates.includes("Download & Install Zuriel Update")) failures.push("Native update centre must offer the official signed APK.");
if (!updates.includes("Do not uninstall it")) failures.push("Update centre must warn users not to uninstall before an in-place update.");
if (!updates.includes("If Android reports a signature or package conflict, cancel")) failures.push("Update centre must tell users to cancel on package/signature mismatch.");
if (!workflow.includes("scripts/prepare-android-updater.mjs")) failures.push("Android build must register the native update installer.");
if (!workflow.includes("contents: write")) failures.push("Android workflow cannot publish official signed update releases.");
if (!workflow.includes("steps.signing_check.outputs.available == 'true' && steps.signed_release.outcome == 'success'")) failures.push("Only a successfully signed release may be published as an update.");
if (!workflow.includes("com.zuriel.livingwordbible.release")) failures.push("The stable release package identity is not enforced.");
if (!workflow.includes("EXPECTED_CERT_SHA256") || !workflow.includes("ACTUAL_CERT_SHA256")) failures.push("Release build must verify the established signing certificate fingerprint.");
if (fingerprint.trim() !== expectedFingerprint) failures.push("Pinned signing certificate fingerprint does not match the established release identity.");
if (!workflow.includes("Verify signed APK package and version metadata")) failures.push("Signed APK identity/version verification is missing.");
for (const key of ["zuriel_personal_notes_v1","zuriel_prayer_journal_v1","zurielReadingHistory_v1","zurielLastReadingPosition","zuriel-verse-study-notes-v1","zuriel-word-highlights-v1","zuriel_personal_library_v1","zuriel_reading_plan_progress_v1","zuriel-saved-faith-cards-v1"]) {
  if (!backup.includes(key)) failures.push("Encrypted backup does not include " + key + ".");
if (!backup.includes("safeFaithCards") || !backup.includes("mergeFaithCards")) failures.push("Encrypted backup must validate and merge saved verse-specific faith cards.");
}
if (failures.length) {
  console.error("In-app update/data preservation checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("In-app update checks passed: official signed-release publishing, stable package identity, user approval, no-uninstall guidance, and encrypted personal-data backup coverage.");
}
