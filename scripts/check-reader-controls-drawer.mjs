import fs from "node:fs";
const reader = fs.readFileSync("index.html", "utf8");
const audio = fs.readFileSync("zuriel-audio.js", "utf8");
const checks = [
  ["reader controls drawer exists", reader.includes('id = "zurielReaderControlDrawer"') || reader.includes('id="zurielReaderControlDrawer"')],
  ["drawer summary is clear", reader.includes("Reading comfort & audio")],
  ["font controls are inside drawer content", reader.includes("readerControlContent.appendChild(readingTools)")],
  ["drawer is mounted before chapter verse list", reader.includes("message.appendChild(readerControlDrawer)")],
  ["audio is mounted in drawer when available", audio.includes('querySelector("#zurielReaderControlDrawer .zuriel-reader-control-content")') && audio.includes("drawerContent.appendChild(panel)")],
  ["drawer fallback retains audio placement", audio.includes('readingTools.insertAdjacentElement("afterend", panel)')]
];
let failed = false;
for (const [name, ok] of checks) { console.log((ok ? "PASS " : "FAIL ") + name); if (!ok) failed = true; }
if (failed) process.exit(1);
