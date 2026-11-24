import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const [worker, index, updates] = await Promise.all([
  readFile("sw.js", "utf8"),
  readFile("index.html", "utf8"),
  readFile("zuriel-updates.js", "utf8")
]);

const cacheMatch = worker.match(/const CACHE_NAME = "zuriel-bible-offline-v(\d+)";/);
assert.ok(cacheMatch, "The service worker must use an explicitly versioned offline cache.");

const coreMatch = worker.match(/const CORE_FILES = \[([\s\S]*?)\];/);
assert.ok(coreMatch, "The service worker core asset list must be present.");
const coreFiles = [...coreMatch[1].matchAll(/["']([^"']+)["']/g)]
  .map(match => match[1])
  .filter(path => path !== "./")
  .map(path => path.replace(/^\.\//, ""));

assert.ok(coreFiles.length > 0, "The offline core asset list must not be empty.");
assert.equal(new Set(coreFiles).size, coreFiles.length, "The offline core asset list must not contain duplicates.");

for (const path of coreFiles) {
  assert.ok(!path.startsWith("/") && !path.includes(".."), "Unsafe offline core path: " + path);
  await access(path);
}

const localScripts = [...index.matchAll(/<script[^>]+src=["']([^"']+)["']/g)]
  .map(match => match[1])
  .filter(path => !/^(?:https?:|data:|capacitor:)/i.test(path))
  .map(path => path.split(/[?#]/, 1)[0].replace(/^\.\//, ""));

assert.ok(localScripts.length > 0, "The app entry point must load its local application modules.");
for (const path of localScripts) {
  assert.ok(coreFiles.includes(path), "Local application script is not precached for offline use: " + path);
  await access(path);
}

const prepareWeb = await readFile("scripts/prepare-web.mjs", "utf8");
const packagedFilesMatch = prepareWeb.match(/const files = \[([\s\S]*?)\];/);
assert.ok(packagedFilesMatch, "The Android web preparation script must declare its copied files.");
const packagedFiles = new Set(
  [...packagedFilesMatch[1].matchAll(/["']([^"']+)["']/g)].map(match => match[1])
);
const bundledAudio = /entryPoints:\s*\[["']zuriel-audio\.js["']\][\s\S]*?outfile:\s*["']www\/zuriel-audio\.js["']/.test(prepareWeb);
for (const path of localScripts) {
  assert.ok(packagedFiles.has(path) || (path === "zuriel-audio.js" && bundledAudio),
    "Android package omits a locally loaded application script: " + path);
}
for (const path of coreFiles.filter(path => !path.includes("/"))) {
  assert.ok(packagedFiles.has(path) || (path === "zuriel-audio.js" && bundledAudio),
    "Android package omits an offline core asset: " + path);
}

const version = JSON.parse(await readFile("version.json", "utf8"));
assert.match(version.version, /^\d+\.\d+\.\d+$/, "App version must use numeric MAJOR.MINOR.PATCH format.");
assert.ok(version.releaseNotes && version.releaseNotes.trim(), "Each app release must explain its changes.");
const updateVersion = updates.match(/const APP_VERSION = "([^"]+)";/);
assert.ok(updateVersion, "The in-app update centre must declare its installed version.");
assert.equal(updateVersion[1], version.version, "The in-app update centre version must match version.json.");

console.log("Offline core asset checks passed: cache v" + cacheMatch[1] +
  ", " + coreFiles.length + " existing precache assets, and " +
  localScripts.length + " local scripts verified for offline loading.");
