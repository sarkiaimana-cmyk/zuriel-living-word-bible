import test from "node:test";
import assert from "node:assert/strict";
import { handleTranslationRequest } from "../src/translation-worker.js";

const origin = "https://localhost";
const appKey = "translation-worker-test-secret";

function env(overrides = {}) {
  return {
    ALLOWED_ORIGINS: origin,
    ZITE_YVP_APP_KEY: appKey,
    TRANSLATION_RATE_LIMIT: { limit: async () => ({ success: true }) },
    ...overrides
  };
}

function request(path, requestOrigin = origin) {
  return new Request("https://translations.example" + path, {
    method: "GET",
    headers: {
      Origin: requestOrigin,
      "CF-Connecting-IP": "203.0.113.10"
    }
  });
}

test("translation-only Worker rejects AI and unrelated routes", async () => {
  let upstreamCalled = false;
  const fetchImpl = async () => {
    upstreamCalled = true;
    return Response.json({ data: [] });
  };
  const ai = await handleTranslationRequest(request("/api/assistant"), env(), { fetch: fetchImpl });
  const unrelated = await handleTranslationRequest(request("/"), env(), { fetch: fetchImpl });
  assert.equal(ai.status, 404);
  assert.equal(unrelated.status, 404);
  assert.equal(upstreamCalled, false);
});

test("translation-only Worker delegates allowed routes to the shared protected proxy", async () => {
  const response = await handleTranslationRequest(
    request("/api/youversion/bibles"),
    env({ ZITE_YVP_APP_KEY: "" })
  );
  assert.equal(response.status, 503);
  const payload = await response.json();
  assert.match(payload.error, /YouVersion access is not configured/);
  assert.equal(response.headers.get("cache-control"), "no-store, max-age=0");
});

test("translation-only Worker rejects unapproved origins before contacting YouVersion", async () => {
  let upstreamCalled = false;
  const response = await handleTranslationRequest(
    request("/api/youversion/bibles", "https://unapproved.example"),
    env(),
    async () => {
      upstreamCalled = true;
      return Response.json({ data: [] });
    }
  );
  assert.equal(response.status, 403);
  assert.equal(upstreamCalled, false);
});

test("translation-only Worker fails closed when app key or rate limiter is missing", async () => {
  const missingKey = await handleTranslationRequest(
    request("/api/youversion/bibles"),
    env({ ZITE_YVP_APP_KEY: "" })
  );
  const missingLimiter = await handleTranslationRequest(
    request("/api/youversion/bibles"),
    env({ TRANSLATION_RATE_LIMIT: null })
  );
  assert.equal(missingKey.status, 503);
  assert.equal(missingLimiter.status, 503);
});

test("translation-only Worker rate limits before contacting YouVersion", async () => {
  let upstreamCalled = false;
  const response = await handleTranslationRequest(
    request("/api/youversion/bibles"),
    env({ TRANSLATION_RATE_LIMIT: { limit: async () => ({ success: false }) } }),
    async () => {
      upstreamCalled = true;
      return Response.json({ data: [] });
    }
  );
  assert.equal(response.status, 429);
  assert.equal(upstreamCalled, false);
});
