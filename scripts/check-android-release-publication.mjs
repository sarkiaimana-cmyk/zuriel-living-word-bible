import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [android, updates, versionText] = await Promise.all([
  readFile(new URL("../.github/workflows/android-apk.yml", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-updates.js", import.meta.url), "utf8"),
  readFile(new URL("../version.json", import.meta.url), "utf8")
]);

const releaseStart = android.indexOf("- name: Publish signed release for in-app Android updates");
const releaseEnd = android.indexOf("- name: Upload Zuriel debug APK", releaseStart);
assert.ok(releaseStart >= 0 && releaseEnd > releaseStart, "Android release publication step must exist.");
const releaseStep = android.slice(releaseStart, releaseEnd);

assert.match(releaseStep, /if: github\.event_name == 'workflow_dispatch' && github\.ref == 'refs\/heads\/main' && inputs\.confirm_release == true/,
  "Public Android releases must require a manually dispatched main-branch build and explicit confirmation.");
assert.match(android, /confirm_release:[\s\S]*?required: true[\s\S]*?type: boolean[\s\S]*?default: false/,
  "The manual release confirmation must default to false.");
assert.match(releaseStep, /git fetch --force origin "refs\/tags\/v\$VERSION:refs\/tags\/v\$VERSION"/,
  "Existing release tags must be fetched before an APK is uploaded.");
assert.match(releaseStep, /TAG_COMMIT="\$\(git rev-list -n 1 "v\$VERSION"\)"/,
  "The existing release tag must be resolved to its commit.");
assert.match(releaseStep, /TAG_COMMIT" != "\$GITHUB_SHA"/,
  "A release APK must never replace an asset attached to a tag for a different commit.");
assert.match(releaseStep, /gh release create "v\$VERSION" "\$APK" \\\s*--target "\$GITHUB_SHA"/,
  "New release tags must point to the exact tested main commit.");
assert.equal((android.match(/- "version\.json"/g) || []).length, 2,
  "Both Android PR and main-push path filters must rebuild when version metadata changes.");

const version = JSON.parse(versionText);
const appVersion = updates.match(/const APP_VERSION = "([^"]+)";/);
assert.ok(appVersion, "The in-app update centre must declare its installed version.");
assert.equal(appVersion[1], version.version,
  "The installed app version and release metadata must match.");

assert.match(updates, /function automaticUpdateCheck\(\)/,
  "The app must automatically check for updates after startup.");
assert.match(updates, /window\.setTimeout\(automaticUpdateCheck, 3500\)/,
  "Automatic update detection must run after the app has started.");
assert.match(updates, /window\.addEventListener\("online", automaticUpdateCheck\)/,
  "Update detection must retry when internet connectivity returns.");
assert.match(updates, /function readLastSuccessfulCheck\(\)/,
  "Update detection must tolerate unavailable local storage.");
assert.match(updates, /function saveLastSuccessfulCheck\(\)/,
  "Successful checks must record their timestamp without blocking update detection.");
assert.match(updates, /zuriel_update_last_successful_check_v1/,
  "Successful update checks must be throttled to avoid repeated network use.");
assert.ok(updates.indexOf("saveLastSuccessfulCheck();", updates.indexOf("const newer =")) > updates.indexOf("if (!isNativeApp()"),
  "A check must be recorded only after the native release or web service-worker check succeeds.");

console.log("Android release publication checks passed: PR isolation, exact-commit tag provenance, guarded asset replacement, version-triggered builds and in-app version alignment.");
