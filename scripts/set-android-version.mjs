import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

export function deriveAndroidVersionCode(version) {
  const match = String(version || "").match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) throw new Error("version.json must contain a numeric MAJOR.MINOR.PATCH version.");
  const parts = match.slice(1).map(Number);
  if (parts.some(value => !Number.isSafeInteger(value) || value > 999)) {
    throw new Error("Each Android version component must be between 0 and 999.");
  }
  const code = parts[0] * 1000000 + parts[1] * 1000 + parts[2];
  if (!Number.isSafeInteger(code) || code < 1 || code > 2100000000) {
    throw new Error("The derived Android versionCode is outside the supported range.");
  }
  return code;
}

export function applyAndroidVersion(gradleText, version) {
  const versionCode = deriveAndroidVersionCode(version);
  const codeMatches = gradleText.match(/\bversionCode\s+\d+/g) || [];
  const nameMatches = gradleText.match(/\bversionName\s+["'][^"']+["']/g) || [];
  if (codeMatches.length !== 1 || nameMatches.length !== 1) {
    throw new Error("Expected exactly one versionCode and one versionName in android/app/build.gradle.");
  }
  return gradleText
    .replace(/\bversionCode\s+\d+/, "versionCode " + versionCode)
    .replace(/\bversionName\s+["'][^"']+["']/, 'versionName "' + version + '"');
}

const scriptPath = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === scriptPath) {
  const versionData = JSON.parse(await readFile(new URL("../version.json", import.meta.url), "utf8"));
  const gradlePath = new URL("../android/app/build.gradle", import.meta.url);
  const original = await readFile(gradlePath, "utf8");
  const updated = applyAndroidVersion(original, versionData.version);
  await writeFile(gradlePath, updated, "utf8");
  console.log("Android version set to " + versionData.version +
    " (versionCode " + deriveAndroidVersionCode(versionData.version) + ").");
}
