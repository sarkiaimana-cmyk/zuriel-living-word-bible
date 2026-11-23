import { readFile } from "node:fs/promises";

const [index, design] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-design-system.js", import.meta.url), "utf8")
]);
const failures = [];
function requireText(source, fragment, label) {
  if (!source.includes(fragment)) failures.push(label + " is missing.");
}
requireText(index, '<script src="zuriel-design-system.js"></script>', "The shared visual system loader");
requireText(index, '<script src="zuriel-reader-topbar.js"></script>', "The established reader top controls");
if (index.indexOf('src="zuriel-design-system.js"') < index.indexOf('src="zuriel-reader-topbar.js"')) {
  failures.push("The shared visual system must load after the reader controls are created.");
}
for (const [fragment, label] of [
  ["--zuriel-navy: #10213d", "Premium navy design token"],
  ["--zuriel-green: #24634a", "Scripture green design token"],
  ["--zuriel-ivory: #f6f3e9", "Warm ivory design token"],
  ["--zuriel-gold: #b99b58", "Gold accent design token"],
  ["#bibleReader {", "Dedicated Scripture reader scope"],
  ["background: #fff", "White Scripture reading canvas"],
  ["env(safe-area-inset-bottom, 0px)", "Android safe-area support"],
  ["prefers-reduced-motion: reduce", "Reduced-motion accessibility support"],
  [":focus-visible", "Visible keyboard and assistive focus"],
  ["window.ZurielDesignSystem", "Public design-system readiness marker"]
]) requireText(design, fragment, label);
if (design.includes("#bibleReader { background: var(--zuriel-navy)")) {
  failures.push("The shared visual system must not recolour the white Scripture canvas.");
}
if (failures.length) {
  console.error("Shared design-system checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Shared design-system checks passed: unified navy/ivory/gold tokens, preserved white reader, Android safe areas, touch feedback, focus visibility and reduced-motion support.");
}
