import { readFile } from "node:fs/promises";

const [pathways, topical, personal, home, index, serviceWorker, packaging] = await Promise.all([
  readFile(new URL("../zuriel-growth-pathways.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-topical-index.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-personal-space.js", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-home.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("./prepare-web.mjs", import.meta.url), "utf8")
]);
const titles = new Set([...topical.matchAll(/"title":\s*"([^"]+)"/g)].map(match => match[1]));
const pathTitles = [...pathways.matchAll(/lessons:\[([^\]]+)\]/g)].flatMap(match =>
  [...match[1].matchAll(/"([^"]+)"/g)].map(item => item[1])
);
const missing = pathTitles.filter(title => !titles.has(title));
const failures = [];
if (pathTitles.length < 20) failures.push("Expected at least 20 guided pathway lesson steps.");
if (missing.length) failures.push("Pathway lessons missing from topical index: " + missing.join(", "));
for (const key of ["zuriel_personal_notes_v1","zuriel_prayer_journal_v1","zurielReadingHistory_v1","zurielLastReadingPosition"]) {
  if (!personal.includes(key)) failures.push("Personal space is missing storage integration: " + key);
}
for (const fragment of ["saveInsight","renderInsights","renderPrayer","renderProgress"]) {
  if (!personal.includes(fragment)) failures.push("Personal space feature missing: " + fragment);
}
if (!home.includes('["personal", "📝", "My Space"]') || !home.includes('window.ZurielPersonalSpace.mount(main)')) {
  failures.push("My Study Space is not mounted and reachable from navigation.");
}
for (const file of [index, serviceWorker, packaging]) {
  if (!file.includes("zuriel-growth-pathways.js") || !file.includes("zuriel-personal-space.js")) {
    failures.push("A web, offline or Android package manifest is missing a new module.");
    break;
  }
}
if (!index.includes("zurielReadingHistory_v1")) failures.push("Reading history is not recorded by the Bible reader.");
if (failures.length) {
  console.error("Growth and personal-space checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Growth pathways and personal-space checks passed (" + pathTitles.length + " lesson steps across " + new Set([...pathways.matchAll(/id:"([^"]+)"/g)].map(x => x[1])).size + " pathways).");
}
