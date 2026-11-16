import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-library.js", import.meta.url), "utf8");
const start = source.indexOf("function canPlayWorshipAudio(song)");
const end = source.indexOf("const originalLibrary =", start);
assert.ok(start >= 0 && end > start, "The worship audio rights gate must exist.");
const helper = source.slice(start, end) + "\nwindow.__canPlayWorshipAudio = canPlayWorshipAudio;";
const sandbox = { window: {}, URL };
vm.runInNewContext(helper, sandbox, { timeout: 1000 });
const canPlay = sandbox.window.__canPlayWorshipAudio;

const approved = {
  rightsStatus: "verified",
  compositionRights: "cleared",
  recordingRights: "cleared",
  streamingAllowed: true,
  audioUrl: "https://media.example.org/authorised-track.mp3",
  rightsSource: "Rights-holder licence record"
};
assert.equal(canPlay(approved), true, "A fully verified HTTPS recording may be played.");
for (const [field, value] of [
  ["rightsStatus", "pending"],
  ["compositionRights", "unknown"],
  ["recordingRights", "pending"],
  ["streamingAllowed", false],
  ["rightsSource", ""],
  ["audioUrl", "http://media.example.org/track.mp3"],
  ["audioUrl", "javascript:alert(1)"],
  ["audioUrl", "not a URL"]
]) {
  assert.equal(canPlay({ ...approved, [field]: value }), false,
    "Playback must be denied when " + field + " is not verified.");
}
assert.equal(canPlay(null), false);
assert.ok(source.includes("Audio is not enabled for this song because verified recording and streaming permissions are not on file."),
  "Unverified songs must display a clear no-audio status instead of a misleading Play action.");
assert.ok(source.includes('player.preload = "none"'),
  "Authorised recordings must not preload large media files on mobile.");
console.log("Worship rights safeguards passed: separate composition and recording rights, streaming permission, HTTPS source, explicit unavailable state and no media preloading.");
