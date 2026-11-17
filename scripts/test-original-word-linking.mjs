import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-word-linking.js", import.meta.url), "utf8");
const window = {};
vm.runInNewContext(source, { window });
const linker = window.ZurielWordLinking;
const failures = [];

function check(label, condition) {
  if (!condition) failures.push(label);
}

const text = "In the beginning, God created the heaven and the earth.";
const start = text.indexOf("God");
const result = linker.matchSelectedKJVWord(
  text,
  text,
  [{ start, end: start + 3, strongs: ["H0430"] }],
  3
);
check("selected token resolves to its KJV Strong's annotation",
  result.ok && result.strongs.length === 1 && result.strongs[0] === "H0430");
check("selected token text is retained", result.token === "God");

const multiple = linker.matchSelectedKJVWord(
  "Jesus said, Come.",
  "Jesus said, Come.",
  [
    { start: 0, end: 5, strongs: ["G2424"] },
    { start: 0, end: 5, strongs: ["G3004"] }
  ],
  0
);
check("multiple source Strong's annotations are preserved",
  multiple.ok && multiple.strongs.length === 2);

const punctuation = linker.matchSelectedKJVWord(
  "Grace, be with you.",
  "Grace, be with you.",
  [{ start: 0, end: 5, strongs: ["G5485"] }],
  0
);
check("punctuation does not break exact token alignment",
  punctuation.ok && punctuation.strongs[0] === "G5485");

const mismatch = linker.matchSelectedKJVWord(
  "In the beginning God created.",
  "In the beginning was God created.",
  [{ start: 17, end: 20, strongs: ["H0430"] }],
  3
);
check("different source text is rejected rather than guessed", !mismatch.ok);

const invalidIndex = linker.matchSelectedKJVWord("God is good.", "God is good.", [], -1);
check("invalid word index is rejected", !invalidIndex.ok);

// Repeated words must resolve by the tapped occurrence, not by text alone.
const repeatedText = "The Word was with God, and the Word was God.";
const secondWordStart = repeatedText.indexOf("Word", repeatedText.indexOf("Word") + 1);
const repeated = linker.matchSelectedKJVWord(
  repeatedText,
  repeatedText,
  [{ start: secondWordStart, end: secondWordStart + 4, strongs: ["G3056"] }],
  7
);
check("repeated words use the selected occurrence offset",
  repeated.ok && repeated.token === "Word" &&
  repeated.strongs.length === 1 && repeated.strongs[0] === "G3056");

// A source range spanning two English words must not be attached to either.
const crossWordText = "God is good.";
const crossWord = linker.matchSelectedKJVWord(
  crossWordText,
  crossWordText,
  [{ start: 0, end: 6, strongs: ["H0430"] }],
  0
);
check("cross-word annotation ranges are rejected",
  crossWord.ok && crossWord.strongs.length === 0);

// Out-of-bounds offsets must never create an original-language association.
const outOfBounds = linker.matchSelectedKJVWord(
  "God is good.",
  "God is good.",
  [{ start: 40, end: 43, strongs: ["H0430"] }],
  0
);
check("out-of-bounds annotation offsets are rejected",
  outOfBounds.ok && outOfBounds.strongs.length === 0);

// Duplicate source IDs on the same selected word should be returned once.
const duplicateIds = linker.matchSelectedKJVWord(
  "God is good.",
  "God is good.",
  [
    { start: 0, end: 3, strongs: ["H0430"] },
    { start: 0, end: 3, strongs: ["H0430"] }
  ],
  0
);
check("duplicate Strong's IDs are deduplicated",
  duplicateIds.ok && duplicateIds.strongs.length === 1);

const outsideIndex = linker.matchSelectedKJVWord(
  "God is good.",
  "God is good.",
  [],
  9
);
check("word indexes beyond the verse are rejected", !outsideIndex.ok);

const untagged = linker.matchSelectedKJVWord(
  "Selah.",
  "Selah.",
  [{ start: 0, end: 5 }],
  0
);
check("annotations without Strong's IDs do not invent a link",
  untagged.ok && untagged.strongs.length === 0);

if (failures.length) {
  console.error("Original-language word-linking tests failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Original-language word-linking tests passed (12 checks).");
}
