import test from "node:test";
import assert from "node:assert/strict";
import { handleTranslationRequest } from "../src/translation-worker.js";

const origin = "https://localhost";
function env(overrides = {}) {
  return {
    ALLOWED_ORIGINS: origin,
    TRANSLATION_RATE_LIMIT: { limit: async () => ({ success: true }) },
    ...overrides
  };
}
function request(path, requestOrigin = origin) {
  return new Request("https://translations.example" + path, {
    method: "GET",
    headers: { Origin: requestOrigin, "CF-Connecting-IP": "203.0.113.11" }
  });
}

test("ESV catalogue remains safely empty until a Crossway key is configured", async () => {
  const response = await handleTranslationRequest(request("/api/esv/bibles"), env());
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.deepEqual(payload.data, []);
  assert.match(payload.notice, /Crossway ESV API key/);
});

test("ESV catalogue exposes the licensed version only when a key exists", async () => {
  const response = await handleTranslationRequest(
    request("/api/esv/bibles"),
    env({ ESV_API_KEY: "test-secret" })
  );
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.data.length, 1);
  assert.equal(payload.data[0].id, "esv");
  assert.equal(payload.data[0].abbreviation, "ESV");
});

test("ESV chapter proxy keeps the key server-side and returns attributed online text", async () => {
  let requestedUrl = "";
  let authorization = "";
  const fetchImpl = async (url, options) => {
    requestedUrl = String(url);
    authorization = options.headers.Authorization;
    return Response.json({
      canonical: "John 3:1-2",
      passages: ["1 Now there was a man of the Pharisees named Nicodemus. (ESV)"]
    });
  };
  const response = await handleTranslationRequest(
    request("/api/esv/chapters/John/3?lastVerse=2"),
    env({ ESV_API_KEY: "test-secret" }),
    { fetch: fetchImpl }
  );
  assert.equal(response.status, 200);
  const payload = await response.json();
  const upstream = new URL(requestedUrl);
  assert.equal(upstream.origin + upstream.pathname, "https://api.esv.org/v3/passage/text/");
  assert.equal(upstream.searchParams.get("q"), "John 3:1-2");
  assert.equal(upstream.searchParams.get("include-short-copyright"), "true");
  assert.equal(authorization, "Token test-secret");
  assert.equal(payload.version.abbreviation, "ESV");
  assert.equal(payload.passage.reference, "John 3:1-2");
  assert.match(payload.passage.content, /\(ESV\)$/);
  assert.match(payload.passage.copyright, /Crossway/);
  assert.match(payload.notice, /online-only/);
  assert.equal(payload.meta, undefined, "ESV does not use API.Bible FUMS tokens.");
});

test("ESV chapter proxy rejects requests without a key or valid verse range", async () => {
  let upstreamCalled = false;
  const fetchImpl = async () => {
    upstreamCalled = true;
    return Response.json({ passages: ["text (ESV)"] });
  };
  const missingKey = await handleTranslationRequest(
    request("/api/esv/chapters/John/3?lastVerse=2"),
    env(),
    { fetch: fetchImpl }
  );
  const missingRange = await handleTranslationRequest(
    request("/api/esv/chapters/John/3"),
    env({ ESV_API_KEY: "test-secret" }),
    { fetch: fetchImpl }
  );
  const invalidRange = await handleTranslationRequest(
    request("/api/esv/chapters/John/3?lastVerse=999"),
    env({ ESV_API_KEY: "test-secret" }),
    { fetch: fetchImpl }
  );
  assert.equal(missingKey.status, 503);
  assert.equal(missingRange.status, 400);
  assert.equal(invalidRange.status, 400);
  assert.equal(upstreamCalled, false);
});

test("ESV chapter proxy enforces origin and rate limits", async () => {
  let upstreamCalled = false;
  const fetchImpl = async () => {
    upstreamCalled = true;
    return Response.json({ passages: ["text (ESV)"] });
  };
  const forbidden = await handleTranslationRequest(
    request("/api/esv/chapters/John/3?lastVerse=2", "https://unapproved.example"),
    env({ ESV_API_KEY: "test-secret" }),
    { fetch: fetchImpl }
  );
  const limited = await handleTranslationRequest(
    request("/api/esv/chapters/John/3?lastVerse=2"),
    env({ ESV_API_KEY: "test-secret", TRANSLATION_RATE_LIMIT: { limit: async () => ({ success: false }) } }),
    { fetch: fetchImpl }
  );
  assert.equal(forbidden.status, 403);
  assert.equal(limited.status, 429);
  assert.equal(upstreamCalled, false);
});
