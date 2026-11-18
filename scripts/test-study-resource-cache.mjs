import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../zuriel-study.js", import.meta.url), "utf8");
const start = source.indexOf("async function fetchStudyJson(url)");
const end = source.indexOf("async function loadOriginalWords(ref)", start);
assert.ok(start >= 0 && end > start, "The study-resource cache function must remain available for testing.");
const functionSource = source.slice(start, end) + "\nwindow.__fetchStudyJson = fetchStudyJson;";

function response(value, invalidJson = false) {
  return {
    ok: true,
    clone() { return response(value, invalidJson); },
    async json() {
      if (invalidJson) throw new Error("Corrupt cached JSON");
      return JSON.parse(JSON.stringify(value));
    }
  };
}

function makeHarness(options = {}) {
  const records = new Map();
  const operations = { opens: [], matches: [], puts: [], deletes: [], fetches: [] };
  const cache = {
    async match(url) {
      operations.matches.push(url);
      return records.get(url) || null;
    },
    async put(url, item) {
      operations.puts.push(url);
      records.set(url, item);
    },
    async delete(url) {
      operations.deletes.push(url);
      records.delete(url);
      return true;
    }
  };
  const caches = {
    async open(name) {
      operations.opens.push(name);
      if (options.cacheOpenFails) throw new Error("Cache unavailable");
      return cache;
    }
  };
  const fetch = async url => {
    operations.fetches.push(url);
    if (options.fetchFails) throw new Error("Network unavailable");
    return response({ source: "network", url, verses: [1, 2, 3] });
  };
  const sandbox = { window: { caches }, caches, fetch, JSON, Error, Map };
  vm.runInNewContext(functionSource, sandbox, { timeout: 1000 });
  return { api: sandbox.window.__fetchStudyJson, records, operations, cache };
}

const url = "https://bible.helloao.org/api/d/bsb-interlinear/JHN/3.json";

// A first successful request must fetch and persist the source data.
const online = makeHarness();
const first = await online.api(url);
assert.equal(first.source, "network");
assert.deepEqual(online.operations.fetches, [url]);
assert.deepEqual(online.operations.puts, [url]);
assert.deepEqual(online.operations.opens, ["zuriel-study-resources-v1"]);

// A second request must be served from cache without touching the network.
const second = await online.api(url);
assert.equal(second.source, "network");
assert.equal(online.operations.fetches.length, 1, "A valid cached interlinear resource must avoid another network request.");
assert.equal(online.operations.matches.length, 2);

// A corrupt cached response must be deleted and refreshed from the network.
const corrupt = makeHarness();
corrupt.records.set(url, response(null, true));
const refreshed = await corrupt.api(url);
assert.equal(refreshed.source, "network");
assert.deepEqual(corrupt.operations.deletes, [url]);
assert.equal(corrupt.operations.fetches.length, 1);
assert.equal(corrupt.operations.puts.length, 1);

// If Cache Storage is unavailable, online study must still work.
const noCache = makeHarness({ cacheOpenFails: true });
assert.equal((await noCache.api(url)).source, "network");
assert.equal(noCache.operations.fetches.length, 1);
assert.equal(noCache.operations.puts.length, 0);

// Previously downloaded commentary chapter and source catalogue must also work offline.
for (const resourceUrl of [
  "https://bible.helloao.org/api/c/matthew-henry/JHN/3.simple.json",
  "https://bible.helloao.org/api/available_commentaries.json"
]) {
  const offlineWithSavedResource = makeHarness({ fetchFails: true });
  offlineWithSavedResource.records.set(resourceUrl, response({ source: "saved-commentary", url: resourceUrl }));
  const saved = await offlineWithSavedResource.api(resourceUrl);
  assert.equal(saved.source, "saved-commentary", "Previously downloaded commentary and catalogue data must be readable offline.");
  assert.equal(offlineWithSavedResource.operations.fetches.length, 0, "A cached commentary resource must not require an API request.");
}

// If neither a cached copy nor the network is available, fail clearly.
const offlineMiss = makeHarness({ fetchFails: true });
await assert.rejects(() => offlineMiss.api(url), /Network unavailable/);

console.log("Original-language resource cache runtime tests passed: cache-first reuse, network fill, corrupt-entry recovery, graceful Cache Storage fallback and honest offline-miss failure.");
