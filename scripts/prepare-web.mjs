import { cp, mkdir, rm } from "node:fs/promises";
import { build } from "esbuild";

const files = [
  "index.html",
  "bible-data.js",
  "zuriel-library.js",
  "zuriel-media.js",
  "zuriel-home.js",
  "zuriel-navigation-recovery.js",
  "zuriel-minimal-home.js",
  "zuriel-history.js",
  "zuriel-word-linking.js",
  "zuriel-study.js",
  "zuriel-lexicon-index.js",
  "zuriel-study-library-data.js",
  "zuriel-geography-data.js",
  "zuriel-geography.js",
  "zuriel-navigation.js",
  "zuriel-reader-topbar.js",
  "zuriel-introductions.js",
  "zuriel-grid-navigation.js",
  "zuriel-faith-content.js",
  "zuriel-faith-cards.js",
  "zuriel-topical-index.js",
  "zuriel-kingdom-life.js",
  "zuriel-growth-pathways.js",
  "zuriel-reading-plans.js",
  "zuriel-personal-space.js",
  "zuriel-backup.js",
  "zuriel-settings.js",
  "zuriel-updates.js",
  "zuriel-notifications.js",
  "zuriel-translations.js",
  "zuriel-design-system.js",
  "zuriel-interface-corrections.js",
  "zuriel-acceptance-fixes.js",
  "version.json",
  "sw.js",
  "zuriel-screenshot-home.js",
  "kjv.72bec70fcd.json"
];

await rm("www", { recursive: true, force: true });
await mkdir("www", { recursive: true });

for (const file of files) {
  await cp(file, "www/" + file);
}

await cp("data", "www/data", { recursive: true });

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

console.log("Zuriel web app, offline Scripture, study-library loader, 13 study datasets and audio controls prepared for Android packaging.");
