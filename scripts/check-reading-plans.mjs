import { readFile } from "node:fs/promises";

const [plans, personal, backup, index, worker, packaging, validation, android] = await Promise.all([
  readFile(new URL("../zuriel-reading-plans.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-personal-space.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-backup.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("./prepare-web.mjs", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/validate-pr.yml", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/android-apk.yml", import.meta.url), "utf8")
]);

const failures = [];
for (const fragment of [
  "zuriel_reading_plan_progress_v1",
  "Meet Jesus",
  "Growing in Faith",
  "Prayer & Trust",
  "duration: 7",
  "function readState()",
  "Saved reading-plan progress is unreadable. It has not been changed.",
  "Saved reading-plan progress has an unsupported or invalid structure. It has not been changed.",
  "function writeState(state)",
  "readState();",
  "function referenceParts(reference)",
  "Mark day complete",
  "Read this passage",
  "window.openChapter",
  "Your progress is saved privately on this device",
  "Reading plans are optional guides"
]) {
  if (!plans.includes(fragment)) failures.push("Reading plan feature is missing: " + fragment);
}
if (/fetch\s*\(|XMLHttpRequest|sendBeacon/.test(plans)) failures.push("Reading plans must work locally without remote requests.");
if (!personal.includes('["plans","🗓️ Reading Plans"]') ||
    !personal.includes('if(tab==="plans"&&window.ZurielReadingPlans)window.ZurielReadingPlans.render(panel,status);')) {
  failures.push("Reading Plans is not integrated into My Study Space.");
}
for (const [label, file, fragment] of [
  ["web entry point", index, 'src="zuriel-reading-plans.js"'],
  ["offline cache", worker, '"./zuriel-reading-plans.js"'],
  ["Android web package", packaging, '"zuriel-reading-plans.js"'],
  ["PR validation", validation, "node scripts/test-reading-plans.mjs"],
  ["Android validation", android, "node scripts/test-reading-plans.mjs"]
]) {
  if (!file.includes(fragment)) failures.push("Reading plans are missing from " + label + ".");
}
if (!backup.includes("zuriel_reading_plan_progress_v1") ||
    !backup.includes("safeReadingPlanProgress") ||
    !backup.includes("mergeReadingPlans")) {
  failures.push("Encrypted backup and restore do not safely include reading-plan progress.");
}
if (failures.length) {
  console.error("Reading plan integration checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Reading plan integration checks passed: three offline plans, private progress, Bible navigation, encrypted backup, web cache and Android packaging.");
}
