import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

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
assert.match(source, /queueStrategy:\s*0/,
  "Each verse must replace any stale speech request");
assert.match(source, /TextToSpeech\.stop/,
  "The player must provide a real stop action");
assert.match(source, /No locally installed English voice/,
  "Missing offline voices must be explained instead of pretending audio is ready");
assert.match(source, /function savedStartingVerse\(detail\)/,
  "The audio player must resume from the current saved Scripture verse.");
assert.match(source, /zuriel:reading-position-changed/,
  "The audio player must follow verse selection made after the chapter opens.");
assert.match(source, /Read from verse /,
  "The play control must show the selected starting verse.");
assert.match(index, /zuriel:reading-position-changed/,
  "The Bible reader must notify the audio player when a verse is selected.");
assert.match(index, /detail: \{ book: book, chapter: chapter, verse:/,
  "The selected reading position event must include the exact book, chapter and verse.");
assert.match(serviceWorker, /zuriel-bible-offline-v118/,
  "The offline cache must be versioned for the new player");
assert.match(serviceWorker, /\.\/zuriel-audio\.js/,
  "The bundled audio player must be cached for offline use");

// Exercise the selected-verse resume logic, not just its source-code presence.
const helperStart = source.indexOf("function savedStartingVerse(detail)");
const helperEnd = source.indexOf("function updateButtons()", helperStart);
assert.ok(helperStart >= 0 && helperEnd > helperStart, "Audio selected-verse helpers must remain testable.");
const helperSource = source.slice(helperStart, helperEnd);
const savedPosition = new Map([["zurielLastReadingPosition", JSON.stringify({
  book: "John", chapter: 3, verse: 16
})]]);
const sandbox = {
  window: {},
  localStorage: { getItem: key => savedPosition.has(key) ? savedPosition.get(key) : null },
  JSON, Number
};
const harness = `
  let chapter = { book: "John", chapter: 3, verses: Array(21).fill("verse") };
  let playing = false;
  let nextVerse = 0;
  let buttonUpdates = 0;
  let lastStatus = "";
  function updateButtons() { buttonUpdates++; }
  function setStatus(value) { lastStatus = value; }
  ${helperSource}
  window.__test = { savedStartingVerse, updateFromReadingPosition,
    get nextVerse() { return nextVerse; },
    setPlaying(value) { playing = value; },
    get buttonUpdates() { return buttonUpdates; },
    get lastStatus() { return lastStatus; } };
`;
vm.runInNewContext(harness, sandbox, { timeout: 1000 });
const api = sandbox.window.__test;
assert.equal(api.savedStartingVerse({ book: "John", chapter: 3, verses: Array(21).fill("verse") }), 15,
  "A saved John 3:16 position must start speech at verse 16.");
assert.equal(api.savedStartingVerse({ book: "John", chapter: 4, verses: Array(54).fill("verse") }), 0,
  "A saved position from another chapter must not leak into the newly opened chapter.");
assert.equal(api.savedStartingVerse({ book: "John", chapter: 3, verses: Array(10).fill("verse") }), 0,
  "A saved verse beyond the current chapter length must safely fall back to verse 1.");
savedPosition.set("zurielLastReadingPosition", "{broken");
assert.equal(api.savedStartingVerse({ book: "John", chapter: 3, verses: Array(21).fill("verse") }), 0,
  "Corrupt saved position data must safely fall back to verse 1.");
api.updateFromReadingPosition({ book: "John", chapter: 3, verse: 8 });
assert.equal(api.nextVerse, 7, "Selecting John 3:8 must set the next audio start point to verse 8.");
assert.match(api.lastStatus, /John 3:8/);
api.setPlaying(true);
api.updateFromReadingPosition({ book: "John", chapter: 3, verse: 9 });
assert.equal(api.nextVerse, 7, "A verse selection must not interrupt playback already in progress.");
api.setPlaying(false);
api.updateFromReadingPosition({ book: "John", chapter: 3, verse: 22 });
assert.equal(api.nextVerse, 7, "An out-of-range verse must not change the audio start point.");

console.log("Offline Scripture read-aloud integration checks passed.");
