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

test("translation-only Worker forwards only licensed version-list requests", async () => {
  const response = await handleTranslationRequest(
    request("/api/youversion/bibles"),
    env(),
    async (url, options) => {
      const parsed = new URL(url);
      assert.equal(parsed.origin, "https://api.youversion.com");
      assert.equal(parsed.pathname, "/v1/bibles");
      assert.equal(parsed.searchParams.get("language_ranges[]"), "en");
      assert.equal(parsed.searchParams.has("all_available"), false);
      assert.equal(options.headers["X-YVP-App-Key"], appKey);
      return Response.json({
        data: [{
          id: 3034,
          abbreviation: "BSB",
          title: "Berean Standard Bible",
          language: { iso_639_1: "en", name: "English" }
        }],
        next_page_token: null
      });
    }
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store, max-age=0");
  const payload = await response.json();
  assert.equal(payload.data[0].abbreviation, "BSB");
  assert.doesNotMatch(JSON.stringify(payload), new RegExp(appKey));
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
