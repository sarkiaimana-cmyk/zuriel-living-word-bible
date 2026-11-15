import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../zuriel-introductions.js", import.meta.url), "utf8");
const expected = {
  Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34,
  Joshua: 24, Judges: 21, Ruth: 4, "1 Samuel": 31, "2 Samuel": 24,
  "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36,
  Ezra: 10, Nehemiah: 13, Esther: 10, Job: 42, Psalms: 150, Proverbs: 31, Ecclesiastes: 12, "Song of Solomon": 8, Isaiah: 66, Jeremiah: 52, Lamentations: 5, Ezekiel: 48, Daniel: 12, Hosea: 14, Joel: 3, Amos: 9, Obadiah: 1, Jonah: 4, Micah: 7, Nahum: 3, Habakkuk: 3, Zephaniah: 3, Haggai: 2
};
const failures = [];
const entryPattern = /^    (?:"([^"]+)"|([A-Za-z][A-Za-z ]*)): \{$/gm;
const entries = new Map();
let match;
while ((match = entryPattern.exec(source)) !== null) {
  entries.set(match[1] || match[2], match.index);
}
for (const [book, chapters] of Object.entries(expected)) {
  const start = entries.get(book);
  if (start === undefined) {
    failures.push(book + ": missing introduction");
    continue;
  }
  const next = [...entries.values()].filter(position => position > start).sort((a, b) => a - b)[0] ?? source.indexOf("\n  };", start);
  const block = source.slice(start, next);
  if (!new RegExp("chapters: " + chapters + "\\b").test(block)) failures.push(book + ": incorrect or missing chapter count");
  for (const field of ["subtitle:", "author:", "authorStudy:", "date:", "dateStudy:", "place:", "placeStudy:", "audience:", "purpose:", "background:", "themes:", "keyVerses:", "outline:"]) {
    if (!block.includes(field)) failures.push(book + ": missing " + field);
  }
  if (!/outline:\s*\[\s*"/.test(block)) failures.push(book + ": outline is missing or empty");
}
if (!source.includes('"Book outline and chapter guide"')) failures.push("introduction renderer: clear outline heading missing");
if (!source.includes('title.textContent = titleText')) failures.push("bold section heading renderer missing");
if (failures.length) {
  console.error("Book introduction checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Book introduction checks passed for " + Object.keys(expected).length + " books, including metadata, study context, key verses and chapter guides.");
}
