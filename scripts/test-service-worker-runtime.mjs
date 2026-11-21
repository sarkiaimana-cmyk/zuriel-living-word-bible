import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../sw.js", import.meta.url), "utf8");

function makeResponse(label, ok = true) {
  return {
    label,
    ok,
    type: "basic",
    clone() { return makeResponse(label, ok); }
  };
}

function createHarness(options = {}) {
  const records = new Map();
  const calls = { opened: [], matched: [], put: [], deleted: [], fetched: [], addAll: [], skipped: 0, claimed: 0 };
  const cache = {
    async addAll(paths) {
      calls.addAll.push([...paths]);
      if (options.precacheFails) throw new Error("Precache asset unavailable");
      for (const path of paths) records.set(path, makeResponse("precache:" + path));
    },
    async match(key) {
      const normalized = typeof key === "string" ? key : key.url;
      calls.matched.push(normalized);
      return records.get(normalized) || null;
    },
    async put(key, value) {
      const normalized = typeof key === "string" ? key : key.url;
      calls.put.push(normalized);
      records.set(normalized, value);
    }
  };
  const caches = {
    async open(name) { calls.opened.push(name); return cache; },
    async match(key) {
      const normalized = typeof key === "string" ? key : key.url;
      calls.matched.push(normalized);
      return records.get(normalized) || null;
    },
    async keys() { return options.cacheNames || ["zuriel-bible-offline-v1", "other-cache"]; },
    async delete(name) { calls.deleted.push(name); return true; }
  };
  const self = {
    location: { origin: "https://zuriel.example" },
    clients: { async claim() { calls.claimed++; } },
    async skipWaiting() { calls.skipped++; },
    addEventListener(name, handler) { handlers[name] = handler; }
  };
  const handlers = {};
  const fetch = async request => {
    calls.fetched.push(typeof request === "string" ? request : request.url);
    if (options.fetchFails) throw new Error("Network unavailable");
    return makeResponse("network:" + (typeof request === "string" ? request : request.url));
  };
  const sandbox = { self, caches, fetch, URL, Promise, Error };
  vm.runInNewContext(source, sandbox, { timeout: 1000 });
  return { handlers, records, calls, cache, caches, self };
}

async function dispatch(handler, values = {}) {
  let pending;
  let response;
  const event = {
    request: values.request,
    waitUntil(promise) { pending = promise; },
    respondWith(promise) { response = promise; }
  };
  handler(event);
  if (pending) await pending;
  return response ? await response : undefined;
}

const install = createHarness();
await dispatch(install.handlers.install);
assert.equal(install.calls.addAll.length, 1, "Install must precache the declared core assets.");
assert.ok(install.records.has("./index.html"), "The reader shell must be precached.");
assert.equal(install.calls.skipped, 1, "A successful install should activate the updated worker.");

const failedInstall = createHarness({ precacheFails: true });
await assert.rejects(() => dispatch(failedInstall.handlers.install), /Precache asset unavailable/,
  "A failed core precache must fail installation instead of claiming offline readiness.");

const activate = createHarness({ cacheNames: ["zuriel-bible-offline-v1", "zuriel-bible-offline-v2", "unrelated-cache"] });
await dispatch(activate.handlers.activate);
assert.deepEqual(activate.calls.deleted, ["zuriel-bible-offline-v1"],
  "Activation must remove only older Zuriel offline caches.");
assert.equal(activate.calls.claimed, 1);

const navigation = createHarness({ fetchFails: true });
navigation.records.set("./index.html", makeResponse("saved-reader"));
const navigationResponse = await dispatch(navigation.handlers.fetch, {
  request: { method: "GET", mode: "navigate", url: "https://zuriel.example/reader" }
});
assert.equal(navigationResponse.label, "saved-reader",
  "Offline navigation must return the cached reader shell.");

const cachedAsset = createHarness({ fetchFails: true });
cachedAsset.records.set("https://zuriel.example/zuriel-study.js", makeResponse("saved-study-module"));
const cachedAssetResponse = await dispatch(cachedAsset.handlers.fetch, {
  request: { method: "GET", mode: "cors", url: "https://zuriel.example/zuriel-study.js" }
});
assert.equal(cachedAssetResponse.label, "saved-study-module",
  "A cached same-origin application module must load without network access.");
assert.equal(cachedAsset.calls.fetched.length, 0);

const onlineAsset = createHarness();
const onlineAssetResponse = await dispatch(onlineAsset.handlers.fetch, {
  request: { method: "GET", mode: "cors", url: "https://zuriel.example/new-module.js" }
});
assert.match(onlineAssetResponse.label, /^network:/);
assert.ok(onlineAsset.records.has("https://zuriel.example/new-module.js"),
  "A successful same-origin asset fetch should be cached for later offline use.");

const offlineStudy = createHarness({ fetchFails: true });
const studyUrl = "https://bible.helloao.org/api/d/bsb-interlinear/JHN/3.json";
offlineStudy.records.set(studyUrl, makeResponse("saved-interlinear"));
const studyResponse = await dispatch(offlineStudy.handlers.fetch, {
  request: { method: "GET", mode: "cors", url: studyUrl }
});
assert.equal(studyResponse.label, "saved-interlinear",
  "Previously cached original-language study data must remain available offline.");

const cachedImage = createHarness({ fetchFails: true });
const imageUrl = "https://images.unsplash.com/photo/example";
cachedImage.records.set(imageUrl, makeResponse("saved-image"));
const imageResponse = await dispatch(cachedImage.handlers.fetch, {
  request: { method: "GET", mode: "cors", url: imageUrl }
});
assert.equal(imageResponse.label, "saved-image",
  "A previously cached Open Book image should not require a network connection.");

const post = createHarness();
const postResponse = await dispatch(post.handlers.fetch, {
  request: { method: "POST", mode: "cors", url: "https://zuriel.example/private" }
});
assert.equal(postResponse, undefined, "Non-GET requests must be left untouched by the service worker.");
assert.equal(post.calls.fetched.length, 0);

console.log("Offline service-worker runtime checks passed: core precache, failed-install safety, old-cache cleanup, offline reader navigation, cached application modules, cache fill, cached study resources, cached imagery and non-GET isolation.");
