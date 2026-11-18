import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [index, styles, serviceWorker, packaging] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("zuriel-reading-refinement.css", "utf8"),
  readFile("sw.js", "utf8"),
  readFile("scripts/prepare-web.mjs", "utf8")
]);

assert.ok(index.includes('<link rel="stylesheet" href="zuriel-reading-refinement.css">'),
  "The reader must load its dedicated refinement stylesheet.");
assert.ok(styles.includes("#message .verse {") && styles.includes("display:block"),
  "Every verse must remain a full-width, readable block.");
assert.ok(styles.includes("#zurielVerseActions[hidden]") && styles.includes("display:none !important"),
  "The verse action menu must stay hidden until a verse is selected.");
assert.ok(styles.includes("position:fixed") && styles.includes("overflow-y:auto"),
  "The selected-verse study surface must overlay the reader and scroll independently.");
assert.ok(styles.includes("env(safe-area-inset-top)"),
  "The floating reader panel must respect the mobile safe area.");
assert.ok(styles.includes("@media(max-width:380px)") && styles.includes("grid-template-columns:1fr"),
  "The contextual menu must collapse to one column on narrow phones.");
assert.ok(styles.includes("prefers-reduced-motion:reduce"),
  "Reader transitions must respect reduced-motion preferences.");
assert.ok(packaging.includes('"zuriel-reading-refinement.css"'),
  "The Capacitor web build must package the reader stylesheet.");
assert.ok(serviceWorker.includes('"./zuriel-reading-refinement.css"'),
  "The offline app shell must precache the reader stylesheet.");
assert.match(serviceWorker, /const CACHE_NAME = "zuriel-bible-offline-v\d+";/,
  "The offline cache must be versioned.");
console.log("Reading refinement checks passed: verse-first layout, hidden contextual actions, independently scrolling study overlay, mobile safe-area handling, narrow-screen layout, reduced motion, Capacitor packaging and offline precache.");
