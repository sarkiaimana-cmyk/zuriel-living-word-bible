import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [script, workflow] = await Promise.all([
  readFile("scripts/smoke-test-android-upgrade.sh", "utf8"),
  readFile(".github/workflows/android-apk.yml", "utf8")
]);

for (const [pattern, label] of [
  [/gh release list/, "Discover a published previous release"],
  [/gh release download/, "Download the previous official APK"],
  [/process\.env\.VERSION/, "Exclude the current version when selecting the baseline"],
  [/sort -V/, "Require the baseline version to be older"],
  [/com\.zuriel\.livingwordbible\.release/, "Enforce the stable Android package ID"],
  [/apksigner.*verify|verify --print-certs/, "Verify the previous APK signature"],
  [/EXPECTED_CERT_SHA256/, "Compare the previous APK with the pinned signing identity"],
  [/adb_install_retry "\$OLD_APK" "fresh"/, "Install the previous signed release through bounded ADB retry"],
  [/adb_install_retry "\$APK" "replace"/, "Install the new APK over the previous package through adb install -r retry"],
  [/versionName=\$VERSION/, "Verify the upgraded installed version"],
  [/dumpsys activity activities/, "Confirm the app launches after installation"],
  [/Signed APK in-place upgrade smoke test passed/, "Report successful in-place upgrade testing"]
]) assert.match(script, pattern, label + " is missing.");

assert.doesNotMatch(script, /adb uninstall|pm clear/, "The upgrade smoke test must never uninstall the app or clear its data.");
assert.match(script, /timeout 15s adb shell service check package/, "Package-manager probes must have a bounded timeout");
assert.match(script, /timeout 60s adb wait-for-device/, "ADB recovery must not wait forever for an emulator");
assert.match(script, /timeout 90s adb shell am start -W/, "Activity launch must have a bounded timeout");
assert.doesNotMatch(script, /^\s*adb shell\b/m, "No unbounded adb shell command may remain");
assert.match(workflow, /name: Install previous release and verify in-place Android upgrade/);
assert.match(workflow, /GH_TOKEN: \$\{\{ github\.token \}\}/, "The emulator step needs a scoped token to fetch the prior public release.");
assert.match(workflow, /disable-linux-hw-accel: true/, "The hosted emulator must explicitly use software acceleration.");
assert.match(workflow, /ANDROID_I_WANT_MY_TCG:\s*["']yes["']/, "Android Emulator 37 requires explicit opt-in to software CPU emulation when KVM is disabled.");
assert.match(workflow, /bash scripts\/smoke-test-android-upgrade\.sh/, "The emulator must execute the maintained upgrade test script.");

console.log("Android in-place upgrade safeguards passed: previous signed baseline, package and certificate continuity, install-over-existing behaviour, installed version verification, launch checks, and no uninstall/data-clear commands.");
