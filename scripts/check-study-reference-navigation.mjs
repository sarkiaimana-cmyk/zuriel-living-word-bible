import { readFile } from "node:fs/promises";

const study = await readFile(new URL("../zuriel-study.js", import.meta.url), "utf8");
const failures = [];
const checks = [
  ["topical dictionary references activate the exact reader verse", /window\.selectBibleVerse\(item\.verse\)/],
  ["same-chapter Strong's occurrences activate the exact reader verse", /window\.selectBibleVerse\(item\.verse\)/],
  ["cross-references activate the exact reader verse", /window\.selectBibleVerse\(verseNumber\)/],
  ["topical connections use exact verse lookup", /const selected = findVerseElement\(item\.verse\);/],
  ["reader lookup matches the verse label, not array position", "label.textContent.trim().replace(\".\", \"\") === String(number)"]
];
for (const [label, check] of checks) if (!(typeof check === "string" ? study.includes(check) : check.test(study))) failures.push(label + " is missing.");
if (/querySelectorAll\("#message \.verse"\)\s*\[/.test(study)) failures.push("A study reference still selects a verse by array position.");
if (failures.length) {
  console.error("Study reference navigation checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Study reference navigation checks passed: topical links, Strong's occurrences and cross-references activate the exact verse through the shared reader action.");
}
