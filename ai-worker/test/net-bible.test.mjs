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
    headers: { Origin: requestOrigin, "CF-Connecting-IP": "203.0.113.10" }
  });
}

test("NET Bible catalogue exposes only its verified online provider entry", async () => {
  const response = await handleTranslationRequest(request("/api/net-bible/bibles"), env());
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.source, "Bible.org NET Bible Web Service");
  assert.equal(payload.data.length, 1);
  assert.equal(payload.data[0].id, "net");
  assert.equal(payload.data[0].abbreviation, "NET");
  assert.match(payload.data[0].copyright, /Biblical Studies Press/);
});

test("NET Bible chapter proxy returns verse text and required attribution", async () => {
  let requestedUrl = "";
  const fetchImpl = async url => {
    requestedUrl = String(url);
    return new Response(JSON.stringify([
      { bookname: "John", chapter: "3", verse: "1", text: "In the beginning was the Word." },
      { bookname: "John", chapter: "3", verse: "2", text: "The same was in the beginning with God." }
    ]), { status: 200, headers: { "content-type": "application/x-javascript" } });
  };
  const response = await handleTranslationRequest(
    request("/api/net-bible/chapters/John/3?lastVerse=2"),
    env(),
    { fetch: fetchImpl }
  );
  assert.equal(response.status, 200);
  const payload = await response.json();
  const upstream = new URL(requestedUrl);
  assert.equal(upstream.origin + upstream.pathname, "https://labs.bible.org/api/");
  assert.equal(upstream.searchParams.get("passage"), "John 3:1-2");
  assert.equal(upstream.searchParams.get("type"), "json");
  assert.equal(upstream.searchParams.get("formatting"), "plain");
  assert.equal(payload.version.abbreviation, "NET");
  assert.equal(payload.passage.reference, "John 3");
  assert.match(payload.passage.content, /1 In the beginning was the Word/);
  assert.match(payload.passage.content, /2 The same was in the beginning with God/);
  assert.match(payload.passage.copyright, /designated \(NET\)/);
  assert.match(payload.notice, /not saved for offline reading/);
  assert.equal(payload.meta, undefined, "NET does not use API.Bible FUMS tokens.");
});

test("NET Bible parser preserves brackets inside valid verse text", async () => {
  const response = await handleTranslationRequest(
    request("/api/net-bible/chapters/John/3?lastVerse=1"),
    env(),
    { fetch: async () => new Response("Notice [temporary upstream banner]. " + JSON.stringify([
      { bookname: "John", chapter: "3", verse: "1", text: "A verse with [bracketed wording] intact." }
    ]), { status: 200, headers: { "content-type": "text/plain" } }) }
  );
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.match(payload.passage.content, /\[bracketed wording\]/);
});

test("NET Bible route requires a valid complete-chapter verse range", async () => {
  let upstreamCalled = false;
  const fetchImpl = async () => {
    upstreamCalled = true;
    return Response.json([{ verse: 1, text: "A verse." }]);
  };
  const missingRange = await handleTranslationRequest(
    request("/api/net-bible/chapters/John/3"),
    env(),
    { fetch: fetchImpl }
  );
  const invalidRange = await handleTranslationRequest(
    request("/api/net-bible/chapters/John/3?lastVerse=999"),
    env(),
    { fetch: fetchImpl }
  );
  assert.equal(missingRange.status, 400);
  assert.equal(invalidRange.status, 400);
  assert.equal(upstreamCalled, false);
});

test("NET Bible route rejects invalid books and non-approved origins", async () => {
  let upstreamCalled = false;
  const fetchImpl = async () => {
    upstreamCalled = true;
    return Response.json([]);
  };
  const invalidBook = await handleTranslationRequest(
    request("/api/net-bible/chapters/NotABook/3"),
    env(),
    { fetch: fetchImpl }
  );
  const forbiddenOrigin = await handleTranslationRequest(
    request("/api/net-bible/chapters/John/3?lastVerse=2", "https://unapproved.example"),
    env(),
    { fetch: fetchImpl }
  );
  assert.equal(invalidBook.status, 400);
  assert.equal(forbiddenOrigin.status, 403);
  assert.equal(upstreamCalled, false);
});

test("NET Bible route fails closed when rate limiting is unavailable or exceeded", async () => {
  let upstreamCalled = false;
  const fetchImpl = async () => {
    upstreamCalled = true;
    return Response.json([]);
  };
  const exceeded = await handleTranslationRequest(
    request("/api/net-bible/chapters/John/3?lastVerse=2"),
    env({ TRANSLATION_RATE_LIMIT: { limit: async () => ({ success: false }) } }),
    { fetch: fetchImpl }
  );
  const missing = await handleTranslationRequest(
    request("/api/net-bible/chapters/John/3"),
    env({ TRANSLATION_RATE_LIMIT: null }),
    { fetch: fetchImpl }
  );
  assert.equal(exceeded.status, 429);
  assert.equal(missing.status, 503);
  assert.equal(upstreamCalled, false);
});

test("NET Bible route retries transient upstream gateway failures", async () => {
  let attempts = 0;
  const response = await handleTranslationRequest(
    request("/api/net-bible/chapters/John/3?lastVerse=1"),
    env(),
    { fetch: async () => {
      attempts++;
      if (attempts < 3) return new Response("upstream unavailable", { status: 502 });
      return Response.json([{ verse: 1, text: "In the beginning was the Word." }]);
    } }
  );
  assert.equal(response.status, 200);
  assert.equal(attempts, 3);
});

test("NET Bible route rejects gaps, duplicates and truncated chapter results", async () => {
  for (const rows of [
    [{ verse: 1, text: "Verse one." }],
    [{ verse: 1, text: "Verse one." }, { verse: 3, text: "Verse three." }],
    [{ verse: 1, text: "Verse one." }, { verse: 1, text: "Duplicate." }]
  ]) {
    const response = await handleTranslationRequest(
      request("/api/net-bible/chapters/John/3?lastVerse=2"),
      env(),
      { fetch: async () => Response.json(rows) }
    );
    assert.equal(response.status, 502);
  }
});

test("NET Bible route withholds incomplete upstream chapter responses", async () => {
  const response = await handleTranslationRequest(
    request("/api/net-bible/chapters/John/3?lastVerse=1"),
    env(),
    { fetch: async () => Response.json([{ verse: 1, text: "" }]) }
  );
  assert.equal(response.status, 502);
  const payload = await response.json();
  assert.match(payload.error, /complete, readable chapter/);
});
