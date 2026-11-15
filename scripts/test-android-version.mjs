import { applyAndroidVersion, deriveAndroidVersionCode } from "./set-android-version.mjs";

const failures = [];
function check(label, condition) {
  if (!condition) failures.push(label);
}
const template = [
  "android {",
  "  defaultConfig {",
  "    versionCode 1",
  '    versionName "1.0"',
  "  }",
  "}"
].join("\n");
const updated = applyAndroidVersion(template, "1.4.0");
check("semantic version maps to a higher Android versionCode", deriveAndroidVersionCode("1.4.0") === 1004000);
check("generated Gradle versionCode is replaced", updated.includes("versionCode 1004000"));
check("generated Gradle versionName matches version.json", updated.includes('versionName "1.4.0"'));
let invalidRejected = false;
try { deriveAndroidVersionCode("1.4"); } catch { invalidRejected = true; }
check("invalid semantic version is rejected", invalidRejected);
let missingTemplateRejected = false;
try { applyAndroidVersion("android { }", "1.4.0"); } catch { missingTemplateRejected = true; }
check("unexpected Gradle template is rejected", missingTemplateRejected);

if (failures.length) {
  console.error("Android version tests failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Android version tests passed (5 cases).");
}
