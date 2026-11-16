import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [index, source, serviceWorker, packageText, prepare] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("zuriel-audio.js", "utf8"),
  readFile("sw.js", "utf8"),
  readFile("package.json", "utf8"),
  readFile("scripts/prepare-web.mjs", "utf8")
]);
const pkg = JSON.parse(packageText);

assert.match(pkg.dependencies["@capacitor-community/text-to-speech"], /^8\./,
  "Android text-to-speech plugin must match Capacitor 8");
assert.ok(pkg.devDependencies.esbuild, "The native plugin must be bundled for the offline web shell");
assert.match(prepare, /entryPoints:\s*\["zuriel-audio\.js"\]/,
  "Web preparation must bundle the audio entry point");
assert.match(index, /zuriel:chapter-opened/,
  "The Bible reader must publish the exact opened chapter to the audio player");
assert.match(index, /zuriel:chapter-closed/,
  "Leaving the chapter must stop read-aloud");
assert.match(index, /src="zuriel-audio\.js"/,
  "The bundled audio player must load in the app");
assert.match(source, /TextToSpeech\.speak/,
  "Read-aloud must use the native speech plugin");
assert.match(source, /localService === true/,
  "Only locally installed voices may be offered for offline playback");
assert.ok(source.includes('String(chapter.verses[index] || "").replace(/^¶\\s*/, "").trim()'),
  "Offline read-aloud must omit editorial paragraph markers from spoken verse text.");
assert.match(source, /queueStrategy:\s*0/,
  "Each verse must replace any stale speech request");
assert.match(source, /TextToSpeech\.stop/,
  "The player must provide a real stop action");
assert.match(source, /No locally installed English voice/,
  "Missing offline voices must be explained instead of pretending audio is ready");
assert.match(serviceWorker, /zuriel-bible-offline-v[0-9]+/,
  "The offline cache must be versioned for the new player");
assert.match(serviceWorker, /\.\/zuriel-audio\.js/,
  "The bundled audio player must be cached for offline use");

console.log("Offline Scripture read-aloud integration checks passed.");
