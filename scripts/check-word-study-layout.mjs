import { readFile } from "node:fs/promises";

const study = await readFile(new URL("../zuriel-study.js", import.meta.url), "utf8");
const failures = [];
function check(label, condition) {
  if (!condition) failures.push(label);
}

check("reader and study panel share a responsive layout",
  study.includes('layout.id = "zurielReaderStudyLayout"') &&
  study.includes("grid-template-columns:minmax(0,1fr) minmax(280px,360px)"));
check("study panel is placed beside Scripture on wide screens",
  study.includes("position:sticky") && study.includes("max-width:760px"));
check("mobile layout stacks the reader and panel",
  study.includes("@media(max-width:760px)") &&
  study.includes("grid-template-columns:minmax(0,1fr)"));
check("word context is rendered inside the study panel",
  study.includes("panel.prepend(contextCard)") &&
  study.includes('contextCard.id = "zurielInlineWordStudy"'));
check("word context hides unrelated full-study sections",
  study.includes('#zurielStudyPanel[data-mode="word-context"] > :not(#zurielInlineWordStudy)'));
check("word tap does not insert a card between Bible verses",
  !study.includes("verseElement.parentNode.insertBefore(contextCard"));
check("word panel can open the full study centre on request",
  study.includes("window.ZurielStudy.openForReference("));
check("closing word panel leaves reading selection intact",
  study.includes('panel.dataset.mode = "verse"') &&
  study.includes('closeButton.textContent = "Close word panel"'));
check("mobile word study opens as a compact bottom sheet over the current reader view",
  study.includes('#zurielStudyPanel[data-mode="word-context"]') &&
  study.includes("position:fixed") &&
  study.includes("max-height:min(42vh,360px)") &&
  study.includes("bottom:calc(12px + env(safe-area-inset-bottom))"));

if (failures.length) {
  console.error("Contextual word-study layout checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Contextual word-study layout checks passed (8 safeguards).");
}
