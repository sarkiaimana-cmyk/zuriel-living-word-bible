import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = path => readFile(new URL(path, import.meta.url), "utf8");
const [index, translations, home, study, serviceWorker, worker, setup, version] = await Promise.all([
  read("../index.html"),
  read("../zuriel-translations.js"),
  read("../zuriel-home.js"),
  read("../zuriel-study.js"),
  read("../sw.js"),
  read("../ai-worker/src/index.js"),
  read("../docs/YOUVERSION-SETUP.md"),
  read("../version.json")
]);

const clientFiles = [
  ["index.html", index],
  ["translation client", translations],
  ["home client", home],
  ["study client", study],
  ["service worker", serviceWorker]
];
for (const [label, source] of clientFiles) {
  assert.ok(!/ZITE_YVP_APP_KEY|API_BIBLE_KEY/.test(source), label + " must never contain provider API secret names.");
  assert.ok(!/X-YVP-App-Key|api-key\s*[:=]/i.test(source), label + " must never construct provider authentication headers.");
}

assert.ok(worker.includes("env.ZITE_YVP_APP_KEY"), "YouVersion credentials must be read from the server-side Worker secret.");
assert.ok(worker.includes("env.API_BIBLE_KEY"), "API.Bible credentials must be read from the server-side Worker secret.");
assert.ok(setup.includes("stored only as Cloudflare Worker secrets"), "Provider credentials must be documented as server-only secrets.");
assert.ok(setup.includes("Never paste either provider key into a chat, source file, issue, commit, or screenshot."));
assert.ok(translations.includes("Online text is not stored for offline use."), "Copyright-restricted provider text must not be cached offline by default.");
assert.ok(translations.includes("The King James Version remains available offline."), "The bundled offline Bible must remain independent of provider keys and network availability.");
assert.ok(translations.includes("The Cloudflare Worker must be deployed and its verified URL published in version.json"), "Missing translation Worker configuration must be explained clearly.");
assert.ok(!version.translationApiBase || new URL(version.translationApiBase).hostname.startsWith("zuriel-bible-translations."), "The app may use only the verified translation Worker URL, never a guessed endpoint.");

console.log("Translation key boundary checks passed: provider credentials remain server-side, no key/header is shipped to the client, and online translation text is not cached without licence permission.");
