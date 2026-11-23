import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const loader = await readFile(new URL("../zuriel-study-library-data.js", import.meta.url), "utf8");
const descriptors = Array.from(loader.matchAll(/^\s*\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\],?$/gm),
  match => [match[1], match[2], match[3], match[4]]);
assert.ok(descriptors.length > 0, "Study loader must declare resource datasets");

const uniquePaths = [...new Set(descriptors.map(source => source[1]))];
const singleDatasetPath = uniquePaths.find(path => descriptors.filter(source => source[1] === path).length === 1);
assert.ok(singleDatasetPath, "Test fixture needs a path used by exactly one dataset");
const fields = [...new Set(descriptors.map(source => source[2]))];

function createRuntime(fetchImpl) {
  const window = {};
  const document = { readyState: "loading", addEventListener() {} };
  const sandbox = { window, document, fetch: fetchImpl, console, Promise, Map, Set, JSON, Array, String, Error };
  vm.runInNewContext(loader, sandbox, { filename: "zuriel-study-library-data.js" });
  return window.ZurielStudyLibrary;
}

function successfulResponse(url) {
  const data = { schemaVersion: 1 };
  fields.forEach(field => {
    data[field] = [{ title: "Zuriel resilience fixture " + url + " " + field, references: ["John 1:1"] }];
  });
  return { ok: true, status: 200, async json() { return data; } };
}

// A failed dataset must not hide successful datasets, and a later load must retry only the failure.
{
  let failPath = singleDatasetPath;
  const calls = new Map();
  const api = createRuntime(async url => {
    calls.set(url, (calls.get(url) || 0) + 1);
    if (url === failPath) return { ok: false, status: 503, async json() { return {}; } };
    return successfulResponse(url);
  });

  const partialItems = await api.load();
  const partial = api.getStatus();
  const failedCount = descriptors.filter(source => source[1] === failPath).length;
  assert.equal(partial.failedDatasets.length, failedCount, "Failed dataset should be reported explicitly");
  assert.equal(partial.loadedDatasets, descriptors.length - failedCount, "Successful datasets should remain loaded");
  assert.equal(partialItems.length, descriptors.length - failedCount, "Partial resources should remain available");
  assert.ok((await api.search("Zuriel resilience fixture")).length > 0, "Search should work with partial data");

  const callsBeforeRetry = calls.get(failPath);
  failPath = null;
  const completeItems = await api.load();
  const complete = api.getStatus();
  assert.equal(calls.get(singleDatasetPath), callsBeforeRetry + 1, "Retry should fetch only the failed dataset");
  assert.equal(complete.failedDatasets.length, 0, "Successful retry should clear failure state");
  assert.equal(complete.loadedDatasets, descriptors.length, "All datasets should be loaded after retry");
  assert.equal(completeItems.length, descriptors.length, "Retry must not duplicate previously loaded resources");
  const totalCalls = [...calls.values()].reduce((sum, value) => sum + value, 0);
  await api.load();
  assert.equal([...calls.values()].reduce((sum, value) => sum + value, 0), totalCalls,
    "A fully loaded library should not refetch resources unnecessarily");
}

// Total failure is recoverable; the loader must not retain a permanently rejected promise.
{
  let offline = true;
  const api = createRuntime(async () => offline
    ? { ok: false, status: 503, async json() { return {}; } }
    : successfulResponse("./recovered.json"));
  const empty = await api.load();
  assert.equal(empty.length, 0, "Total failure should return an empty partial result, not a rejected promise");
  assert.equal(api.getStatus().failedDatasets.length, descriptors.length, "Every unavailable dataset should be reported");
  offline = false;
  const recovered = await api.load();
  assert.equal(recovered.length, descriptors.length, "A later retry should recover from total failure");
  assert.equal(api.getStatus().ready, true, "Recovered library should report ready");
}

// Invalid schema in one dataset must be isolated from otherwise valid study resources.
{
  const api = createRuntime(async url => {
    if (url === singleDatasetPath) {
      return { ok: true, status: 200, async json() { return { schemaVersion: 99 }; } };
    }
    return successfulResponse(url);
  });
  const items = await api.load();
  assert.ok(items.length > 0, "Malformed dataset must not block valid resources");
  assert.equal(api.getStatus().failedDatasets.length, 1, "Malformed dataset should be reported for retry");
}

console.log("Study-library resilience passed: partial loading, searchable available data, failed-dataset retry, no duplicate reloads, total-outage recovery and malformed-schema isolation.");
