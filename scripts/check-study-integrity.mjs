import { readFile } from "node:fs/promises";

const [study, index] = await Promise.all([
  readFile(new URL("../zuriel-study.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8")
]);

const checks = [["exact single-token gloss matching","tappedTokens.length === 1 && glossTokens.includes(tappedTokens[0])"],["no-guess mismatch explanation","will not guess which Hebrew or Greek word it represents"],["source parsing fallback","\"Source parsing tag: \" + word.parsing"],["Strong\\'s identifier normalization","padStart(4, \"0\")"],["lexicon sense validation","!entry || !Array.isArray(entry.senses)"],["lexicon retry action","Retry lexicon entry"],["offline-specific lexicon guidance","not saved on this device yet"]];
const failures = checks.filter(([label, fragment]) => !study.includes(fragment));
const requiredReaderPanels = ["zurielOriginalWordResults", "zurielLexiconDetails"];
for (const id of requiredReaderPanels) {
  if (!index.includes(id)) failures.push([\x60reader panel: \x24{id}\x60, "missing from index.html"]);
}
if (failures.length) {
  console.error("Original-language study integrity checks failed:");
  for (const [label] of failures) console.error(" - " + label);
  process.exitCode = 1;
} else {
  console.log(\x60Original-language study integrity checks passed (\x24{checks.length + requiredReaderPanels.length} safeguards).\x60);
}
