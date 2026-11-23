import test from "node:test";
import assert from "node:assert/strict";
import { handleTranslationRequest } from "../src/translation-worker.js";

const origin = "https://localhost";
const apiKey = "server-only-api-bible-test-key";
const bibleId = "de4e12af7f28f599-01";

function env(overrides = {}) {
  return {
    ALLOWED_ORIGINS: origin,
    API_BIBLE_KEY: apiKey,
    TRANSLATION_RATE_LIMIT: { limit: async () => ({ success: true }) },
    ...overrides
  };
}

function request(path, options = {}) {
  return new Request("https://translations.example" + path, {
    method: options.method || "GET",
    headers: {
      Origin: options.origin || origin,
      "CF-Connecting-IP": "203.0.113.10",
      ...(options.headers || {})
    }
  });
}

test("lists only English Bibles returned for the configured API.Bible key", async () => {
  const response = await handleTranslationRequest(request("/api/api-bible/bibles"), env(), {
    fetch: async (url, options) => {
      const parsed = new URL(url);
      assert.equal(parsed.origin, "https://rest.api.bible");
      assert.equal(parsed.pathname, "/v1/bibles");
      assert.equal(parsed.searchParams.get("language"), "eng");
      assert.equal(parsed.searchParams.get("include-full-details"), "true");
      assert.equal(options.headers["api-key"], apiKey);
      return Response.json({ data: [
        { id: bibleId, name: "King James Version", abbreviation: "KJV", abbreviationLocal: "KJV",
          nameLocal: "King James Version", language: { id: "eng", name: "English" }, copyright: "Public domain" },
        { id: "a556c5305ee15c3f-01", name: "Christian Standard Bible", abbreviation: "CSB",
          language: { id: "eng", name: "English" }, copyright: "Publisher copyright" },
        { id: "de4e12af7f28f599-02", name: "Spanish Bible", abbreviation: "ESP",
          language: { id: "spa", name: "Spanish" } },
        { id: "invalid-id", name: "Broken record", abbreviation: "BAD",
          language: { id: "eng", name: "English" } }
      ] });
    }
  });
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.source, "API.Bible");
  assert.equal(data.data.length, 2);
  assert.equal(data.data[0].id, bibleId);
  assert.equal(data.data[0].abbreviation, "KJV");
  assert.equal(data.data[1].abbreviation, "CSB");
  assert.doesNotMatch(JSON.stringify(data), new RegExp(apiKey));
});

test("fetches a chapter with the API.Bible key kept server-side and publisher attribution retained", async () => {
  const response = await handleTranslationRequest(
    request("/api/api-bible/bibles/" + bibleId + "/chapters/JHN.3"),
    env(),
    {
      fetch: async (url, options) => {
        const parsed = new URL(url);
        assert.equal(parsed.origin, "https://rest.api.bible");
        assert.equal(parsed.pathname, "/v1/bibles/" + bibleId + "/chapters/JHN.3");
        assert.equal(parsed.searchParams.get("content-type"), "text");
        assert.equal(parsed.searchParams.get("include-verse-numbers"), "true");
        assert.equal(parsed.searchParams.get("fums-version"), "3");
        assert.equal(parsed.searchParams.get("include-notes"), "false");
        assert.equal(options.headers["api-key"], apiKey);
        return Response.json({ data: {
          id: "JHN.3", bibleId, reference: "John 3", content: "1 Now there was a man...",
          copyright: "Publisher copyright notice", verseCount: 36
        }, meta: { fumsToken: "fums-test-token" } });
      }
    }
  );
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.source, "API.Bible");
  assert.equal(data.version.id, bibleId);
  assert.equal(data.passage.reference, "John 3");
  assert.match(data.passage.content, /Now there was a man/);
  assert.equal(data.passage.copyright, "Publisher copyright notice");
  assert.equal(data.meta.fumsToken, "fums-test-token");
  assert.match(data.notice, /not stored for offline use/);
  assert.doesNotMatch(JSON.stringify(data), new RegExp(apiKey));
});

test("fails closed when API.Bible key is not configured", async () => {
  const response = await handleTranslationRequest(
    request("/api/api-bible/bibles"),
    env({ API_BIBLE_KEY: "" })
  );
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /API.Bible access is not configured/);
});

test("rejects malformed Bible and chapter identifiers before contacting API.Bible", async () => {
  let called = false;
  const fetch = async () => { called = true; return Response.json({ data: {} }); };
  const badBible = await handleTranslationRequest(
    request("/api/api-bible/bibles/not-a-bible-id/chapters/JHN.3"), env(), { fetch }
  );
  const badChapter = await handleTranslationRequest(
    request("/api/api-bible/bibles/" + bibleId + "/chapters/JHN.3.16"), env(), { fetch }
  );
  assert.equal(badBible.status, 404);
  assert.equal(badChapter.status, 404);
  assert.equal(called, false);
});

test("withholds chapter text when publisher attribution is absent", async () => {
  const response = await handleTranslationRequest(
    request("/api/api-bible/bibles/" + bibleId + "/chapters/JHN.3"),
    env(),
    { fetch: async () => Response.json({ data: { id: "JHN.3", content: "Chapter text" } }) }
  );
  assert.equal(response.status, 502);
  assert.match((await response.json()).error, /attribution was not supplied/);
});

test("enforces rate limits before calling API.Bible", async () => {
  let called = false;
  const response = await handleTranslationRequest(
    request("/api/api-bible/bibles"),
    env({ TRANSLATION_RATE_LIMIT: { limit: async () => ({ success: false }) } }),
    { fetch: async () => { called = true; return Response.json({ data: [] }); } }
  );
  assert.equal(response.status, 429);
  assert.equal(called, false);
});

test("rejects unapproved origins before calling API.Bible", async () => {
  let called = false;
  const response = await handleTranslationRequest(
    request("/api/api-bible/bibles", { origin: "https://unapproved.example" }),
    env(),
    { fetch: async () => { called = true; return Response.json({ data: [] }); } }
  );
  assert.equal(response.status, 403);
  assert.equal(called, false);
});

test("rejects arbitrary catalogue and chapter query parameters", async () => {
  let called = false;
  const fetch = async () => { called = true; return Response.json({ data: [] }); };
  const catalogue = await handleTranslationRequest(
    request("/api/api-bible/bibles?language=all"), env(), { fetch }
  );
  const chapter = await handleTranslationRequest(
    request("/api/api-bible/bibles/" + bibleId + "/chapters/JHN.3?include-notes=true"), env(), { fetch }
  );
  assert.equal(catalogue.status, 400);
  assert.equal(chapter.status, 400);
  assert.equal(called, false);
});

test("maps API.Bible publisher licence denial without leaking upstream details", async () => {
  const response = await handleTranslationRequest(
    request("/api/api-bible/bibles/" + bibleId + "/chapters/JHN.3"),
    env(),
    { fetch: async () => new Response("private API.Bible response", { status: 403 }) }
  );
  assert.equal(response.status, 403);
  const data = await response.json();
  assert.match(data.error, /has not licensed this Bible/);
  assert.doesNotMatch(JSON.stringify(data), /private API.Bible response/);
});

test("preserves API.Bible retry-after information on rate limiting", async () => {
  const response = await handleTranslationRequest(
    request("/api/api-bible/bibles"),
    env(),
    { fetch: async () => new Response("rate limited", { status: 429, headers: { "Retry-After": "45" } }) }
  );
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "45");
});
