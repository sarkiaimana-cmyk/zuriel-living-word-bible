import { cp, mkdir, rm } from "node:fs/promises";

const files = [
  "index.html",
  "bible-data.js",
  "zuriel-library.js",
  "zuriel-home.js",
  "zuriel-study.js",
  "zuriel-navigation.js",
  "zuriel-introductions.js",
  "sw.js",
  "kjv.72bec70fcd.json"
];

await rm("www", { recursive: true, force: true });
await mkdir("www", { recursive: true });

for (const file of files) {
  await cp(file, "www/" + file);
}

await cp("images", "www/images", { recursive: true });

console.log("Zuriel web app prepared for Android packaging.");
