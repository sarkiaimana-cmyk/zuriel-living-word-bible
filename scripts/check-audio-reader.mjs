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
assert.match(pkg.dependencies["@capacitor-community/text-to-speech"], /^8\./);
assert.ok(pkg.devDependencies.esbuild);
assert.match(prepare, /entryPoints:\s*\["zuriel-audio\.js"\]/);
assert.match(index, /zuriel:chapter-opened/);
assert.match(index, /zuriel:chapter-closed/);
assert.match(index, /src="zuriel-audio\.js"/);
assert.match(source, /TextToSpeech\.speak/);
assert.match(source, /localService === true/);
assert.match(source, /function savedStartingVerse\(detail\)/);
assert.match(source, /zuriel:reading-position-changed/);
assert.match(index, /zuriel:reading-position-changed/);
assert.match(source, /min-height:48px/);
assert.match(source, /replace\(\^¶\\s\*/);
assert.match(source, /queueStrategy:\s*0/);
assert.match(source, /TextToSpeech\.stop/);
assert.match(source, /No locally installed English voice/);
assert.match(serviceWorker, /zuriel-bible-offline-v\d+/);
assert.match(serviceWorker, /\.\/zuriel-audio\.js/);
console.log("Offline Scripture read-aloud integration checks passed.");
