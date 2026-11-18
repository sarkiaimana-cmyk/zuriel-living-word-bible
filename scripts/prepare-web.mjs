import { cp, mkdir, rm } from "node:fs/promises";
import { build } from "esbuild";

const files = [
  "index.html",
  "zuriel-reading-refinement.css",
  "bible-data.js",
  "zuriel-library.js",
  "zuriel-home.js",
  "zuriel-word-linking.js",
  "zuriel-study.js",
  "zuriel-geography-data.js",
  "zuriel-geography.js",
  "zuriel-navigation.js",
  "zuriel-introductions.js",
  "zuriel-grid-navigation.js",
  "zuriel-faith-content.js",
  "zuriel-topical-index.js",
  "zuriel-kingdom-life.js",
  "zuriel-growth-pathways.js",
  "zuriel-reading-plans.js",
  "zuriel-personal-space.js",
  "zuriel-backup.js",
  "zuriel-settings.js",
  "zuriel-updates.js",
  "zuriel-translations.js",
  "version.json",
  "sw.js",
  "kjv.72bec70fcd.json"
];

await rm("www", { recursive: true, force: true });
await mkdir("www", { recursive: true });

for (const file of files) {
  await cp(file, "www/" + file);
}

await cp("images", "www/images", { recursive: true });

await build({
  entryPoints: ["zuriel-audio.js"],
  bundle: true,
  platform: "browser",
  format: "iife",
  target: ["es2020"],
  outfile: "www/zuriel-audio.js",
  minify: true,
  sourcemap: false
});

console.log("Zuriel web app and offline Scripture audio controls prepared for Android packaging.");
