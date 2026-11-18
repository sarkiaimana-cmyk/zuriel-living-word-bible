import { readFile } from "node:fs/promises";
import { applyAndroidVersion, deriveAndroidVersionCode } from "./set-android-version.mjs";

const release = JSON.parse(await readFile(new URL("../version.json", import.meta.url), "utf8"));
const packageInfo = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

const failures = [];
check("npm package version matches published release metadata", packageInfo.version === release.version);
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
const updated = applyAndroidVersion(template, "1.4.1");
check("semantic version maps to a higher Android versionCode", deriveAndroidVersionCode("1.4.1") === 1004001);
check("generated Gradle versionCode is replaced", updated.includes("versionCode 1004001"));
check("generated Gradle versionName matches version.json", updated.includes('versionName "1.4.1"'));
let invalidRejected = false;
try { deriveAndroidVersionCode("1.4"); } catch { invalidRejected = true; }
check("invalid semantic version is rejected", invalidRejected);
let missingTemplateRejected = false;
try { applyAndroidVersion("android { }", "1.4.1"); } catch { missingTemplateRejected = true; }
check("unexpected Gradle template is rejected", missingTemplateRejected);

if (failures.length) {
  console.error("Android version tests failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Android version tests passed (6 cases).");
}
