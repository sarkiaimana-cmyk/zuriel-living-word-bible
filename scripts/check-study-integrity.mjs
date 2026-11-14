import { readFile } from "node:fs/promises";

const study = await readFile(new URL("../zuriel-study.js", import.meta.url), "utf8");

const checks = [["exact single-token gloss matching","tappedTokens.length === 1 && glossTokens.includes(tappedTokens[0])"],["no-guess mismatch explanation","will not guess which Hebrew or Greek word it represents"],["source parsing fallback","\"Source parsing tag: \" + word.parsing"],["Strong\\'s identifier normalization","padStart(4, \"0\")"],["lexicon sense validation","!entry || !Array.isArray(entry.senses)"],["lexicon retry action","Retry lexicon entry"],["offline-specific lexicon guidance","not saved on this device yet"]];
const failures = checks.filter(([label, fragment]) => !study.includes(fragment));
const requiredReaderPanels = ["zurielOriginalWordResults", "zurielLexiconDetails"];
for (const id of requiredReaderPanels) {
  if (!study.includes(`id="${id}"`)) failures.push([`reader panel: ${id}`, "missing from zuriel-study.js"]);
}
if (failures.length) {
  console.error("Original-language study integrity checks failed:");
  for (const [label] of failures) console.error(" - " + label);
  process.exitCode = 1;
} else {
  console.log(`Original-language study integrity checks passed (${checks.length + requiredReaderPanels.length} safeguards).`);
}
