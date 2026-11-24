import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
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
assert.match(source, /replace\(\/\^¶\\s\*\/,/);
assert.match(source, /queueStrategy:\s*0/);
assert.match(source, /TextToSpeech\.stop/);
assert.match(source, /async function pausePlayback\(\)/, "Read-aloud must support pausing.");
assert.match(source, /makeButton\("Pause", pausePlayback\)/, "A visible Pause control must be available.");
assert.match(source, /Continue from verse/, "Paused read-aloud must resume from the interrupted verse.");
assert.match(source, /pauseButton\.disabled = !playing/, "Pause control state must follow playback state.");
assert.match(source, /No locally installed English voice/);
assert.match(source, /TextToSpeech\\.openInstall/, "Android must provide a direct offline voice installation handoff.");
assert.match(source, /Set up device voice/, "The reader must expose a visible voice setup action.");
assert.match(source, /Online-only voices are not used by this offline player/, "The offline reader must clearly exclude cloud-only voices.");
assert.match(source, /Playback works without internet/, "The reader must identify when local playback is available offline.");

assert.match(serviceWorker, /zuriel-bible-offline-v\d+/);
assert.match(serviceWorker, /\.\/zuriel-audio\.js/);

// Exercise the reader's real position-saving function: reopening the same
// chapter must preserve the selected verse; a new chapter starts at verse 1.
const positionStart = index.indexOf("function saveReadingPosition(book, chapter, verse) {");
const positionEnd = index.indexOf("/* LOAD ALL 66 BOOKS */", positionStart);
assert.ok(positionStart >= 0 && positionEnd > positionStart, "Reader position function must remain available for runtime checks.");
const positionFunction = index.slice(positionStart, positionEnd);
const storage = new Map([["zurielLastReadingPosition", JSON.stringify({ book: "John", chapter: 3, verse: 16 })]]);
const events = [];
const sandbox = {
  STORAGE_KEY: "zurielLastReadingPosition",
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value))
  },
  window: { dispatchEvent: event => events.push(event) },
  CustomEvent: function (type, options) { this.type = type; this.detail = options.detail; },
  status: { textContent: "" },
  updateContinueReadingCard: () => {},
  Date, JSON, Number, Array
};
runInNewContext(positionFunction + "\nwindow.saveReadingPosition = saveReadingPosition;", sandbox);
sandbox.window.saveReadingPosition("John", 3);
assert.deepEqual(JSON.parse(storage.get("zurielLastReadingPosition")), { book: "John", chapter: 3, verse: 16 });
assert.equal(events.at(-1).detail.verse, 16, "Reopening the same chapter must keep audio aligned to the saved verse.");
sandbox.window.saveReadingPosition("John", 4);
assert.deepEqual(JSON.parse(storage.get("zurielLastReadingPosition")), { book: "John", chapter: 4, verse: 1 });
assert.equal(events.at(-1).detail.verse, 1, "A newly opened chapter must begin at verse 1.");
sandbox.window.saveReadingPosition("John", 4, 8);
sandbox.window.saveReadingPosition("John", 4);
assert.deepEqual(JSON.parse(storage.get("zurielLastReadingPosition")), { book: "John", chapter: 4, verse: 8 });
assert.equal(events.at(-1).detail.verse, 8, "Reopening after selecting a verse must preserve that verse.");
storage.set("zurielLastReadingPosition", "{broken");
sandbox.window.saveReadingPosition("John", 5);
assert.deepEqual(JSON.parse(storage.get("zurielLastReadingPosition")), { book: "John", chapter: 5, verse: 1 });

console.log("Offline Scripture read-aloud integration checks passed.");
