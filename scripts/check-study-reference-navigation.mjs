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

const topicalBlockStart = study.indexOf("async function openReference(item, button)");
const topicalBlockEnd = study.indexOf("function topicCard(topic)", topicalBlockStart);
if (topicalBlockStart < 0 || topicalBlockEnd < 0) {
  failures.push("Topical Scripture links must use the guarded async reference-opening path.");
} else {
  const topicalBlock = study.slice(topicalBlockStart, topicalBlockEnd);
  if (!topicalBlock.includes(String.raw`replace(/^\s*\d+\.?\s*/`)) failures.push("Topical verse text extraction must strip the verse number using a valid whitespace regex.");
  if (!topicalBlock.includes("await window.openChapter(item.book, item.chapter)")) failures.push("Topical links must wait for the exact chapter to load.");
  if (!topicalBlock.includes("window.selectBibleVerse(item.verse)")) failures.push("Topical links must activate the exact requested verse.");
  if (!topicalBlock.includes("catch (error)")) failures.push("Topical link failures must be handled visibly.");
  if (!topicalBlock.includes("finally")) failures.push("Topical link buttons must be restored after success or failure.");
  if (!topicalBlock.includes("button.disabled = true") || !topicalBlock.includes("button.disabled = false")) failures.push("Topical link buttons must prevent repeat taps while opening.");
  if (!topicalBlock.includes('intro.textContent = "Opened " + item.label')) failures.push("Topical navigation must confirm the opened reference.");
}
if (!study.includes('button.addEventListener("click", function() { openReference(item, button); });')) failures.push("Topical reference buttons must pass their button state to the guarded navigation handler.");

if (failures.length) {
  console.error("Study reference navigation checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Study reference navigation checks passed: topical links, Strong's occurrences and cross-references activate the exact verse through the shared reader action.");
}
