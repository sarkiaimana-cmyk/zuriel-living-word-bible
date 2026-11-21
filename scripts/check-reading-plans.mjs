import { readFile } from "node:fs/promises";
import vm from "node:vm";

const [plans, personal, backup, index, worker, packaging, validation, android, bookDataSource, kjvSource] = await Promise.all([
  readFile(new URL("../zuriel-reading-plans.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-personal-space.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-backup.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("./prepare-web.mjs", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/validate-pr.yml", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/android-apk.yml", import.meta.url), "utf8"),
  readFile(new URL("../bible-data.js", import.meta.url), "utf8"),
  readFile(new URL("../kjv.72bec70fcd.json", import.meta.url), "utf8")
]);

const failures = [];
for (const fragment of [
  "zuriel_reading_plan_progress_v1",
  "Meet Jesus",
  "Growing in Faith",
  "Prayer & Trust",
  "Power of the Holy Spirit",
  "Walk with Jesus",
  "duration: 30",
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
  "window.selectBibleVerse(parts.verse)",
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
// Validate every guided reading passage against the actual bundled 66-book KJV.
// This catches misspelled books, missing chapters and verse ranges that run past a chapter.
try {
  const readerMapMatch = index.match(/const bookCodes = (\{[\s\S]*?\n\};)/);
  if (!readerMapMatch) throw new Error("Reader book-code map is missing.");
  const readerMap = JSON.parse(readerMapMatch[1].replace(/;\s*$/, ""));
  const bookEntries = [...bookDataSource.matchAll(/\{\s*name:\s*"([^"]+)",\s*chapters:\s*(\d+)\s*\}/g)]
    .map(match => ({ name: match[1], chapters: Number(match[2]) }));
  if (bookEntries.length !== 66) throw new Error("Offline Bible index must contain all 66 books.");
  const kjvData = JSON.parse(kjvSource);
  if (Object.keys(kjvData).length !== 66) throw new Error("Offline KJV source must contain all 66 books.");
  const bookLookup = new Map(bookEntries.map(book => [book.name.toLowerCase(), book]));
  const planMatch = plans.match(/const PLANS = (\[[\s\S]*?\n  \]);/);
  if (!planMatch) throw new Error("Curated reading-plan data could not be isolated.");
  const curatedPlans = vm.runInNewContext("(" + planMatch[1] + ")", {}, { timeout: 1000 });
  if (!Array.isArray(curatedPlans) || !curatedPlans.length) throw new Error("No curated reading plans were found.");
  let verifiedPassages = 0;
  for (const plan of curatedPlans) {
    if (!Array.isArray(plan.days) || plan.days.length !== plan.duration) {
      throw new Error(plan.title + " does not contain exactly " + plan.duration + " daily passages.");
    }
    for (const day of plan.days) {
      const reference = String(day[0] || "");
      const match = reference.match(/^(.+?)\s+(\d+)(?::(\d+))?(?:-(\d+))?$/);
      if (!match) throw new Error(plan.title + " has a malformed passage reference: " + reference);
      const bookName = match[1].toLowerCase().replace(/\s+/g, " ").trim();
      const book = bookLookup.get(bookName === "psalm" ? "psalms" : bookName);
      if (!book) throw new Error(plan.title + " refers to an unknown Bible book: " + match[1]);
      const chapterNumber = Number(match[2]);
      if (chapterNumber < 1 || chapterNumber > book.chapters) {
        throw new Error(plan.title + " refers to a missing chapter: " + reference);
      }
      const code = readerMap[book.name];
      const chapters = code && kjvData[code];
      const verses = Array.isArray(chapters) ? chapters[chapterNumber - 1] : null;
      if (!Array.isArray(verses) || !verses.length) {
        throw new Error(plan.title + " refers to a missing bundled KJV chapter: " + reference);
      }
      if (match[3]) {
        const startVerse = Number(match[3]);
        const endVerse = match[4] ? Number(match[4]) : startVerse;
        if (startVerse < 1 || endVerse < startVerse || endVerse > verses.length) {
          throw new Error(plan.title + " refers to a missing or reversed bundled KJV verse range: " + reference);
        }
      }
      verifiedPassages += 1;
    }
  }
  if (curatedPlans.length !== 11) throw new Error("Expected eleven curated offline reading plans.");
  if (verifiedPassages < 97) throw new Error("Expected at least 97 verified reading-plan passages, including the 30-day plan and Holy Spirit journey.");
} catch (error) {
  failures.push("Bundled KJV reading-plan reference verification failed: " + error.message);
}
if (failures.length) {
  console.error("Reading plan integration checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Reading plan integration checks passed: eleven offline plans (including a 30-day journey and a seven-day Power of the Holy Spirit journey), at least 97 exact bundled-KJV passage validations, private progress, Bible navigation, encrypted backup, web cache and Android packaging.");
}
