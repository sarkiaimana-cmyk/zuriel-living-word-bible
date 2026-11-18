import test from "node:test";
import assert from "node:assert/strict";
import { handleRequest } from "../src/index.js";

const origin = "https://localhost";
const secret = "server-only-yvp-test-key";

function makeEnv(overrides = {}) {
  return {
    ALLOWED_ORIGINS: origin,
    ZITE_YVP_APP_KEY: secret,
    TRANSLATION_RATE_LIMIT: { limit: async () => ({ success: true }) },
    ...overrides
  };
}

function request(path, options = {}) {
  return new Request("https://worker.example" + path, {
    method: options.method || "GET",
    headers: {
      Origin: options.origin || origin,
      ...(options.headers || {})
    },
    body: options.body
  });
}

function send(req, env = makeEnv(), fetchImpl = async () => {
  throw new Error("Unexpected upstream request");
}) {
  return handleRequest(req, env, { fetch: fetchImpl });
}

test("lists only English Bible versions licensed to the registered YouVersion app key", async () => {
  const response = await send(
    request("/api/youversion/bibles", { headers: { "CF-Connecting-IP": "203.0.113.10", "X-YVP-App-Key": "attacker-controlled-key" } }),
    makeEnv(),
    async (url, options) => {
      const parsed = new URL(url);
      assert.equal(parsed.origin, "https://api.youversion.com");
      assert.equal(parsed.pathname, "/v1/bibles");
      assert.equal(parsed.searchParams.get("language_ranges[]"), "en");
      assert.equal(parsed.searchParams.get("page_size"), "100");
      assert.equal(parsed.searchParams.has("all_available"), false,
        "The proxy must never request unlicensed catalogue entries.");
      assert.equal(options.headers["X-YVP-App-Key"], secret);
      assert.equal(options.headers.Accept, "application/json");
      return Response.json({
        data: [
          {
            id: 3034,
            abbreviation: "BSB",
            title: "Berean Standard Bible",
            copyright: "Berean Standard Bible",
            language_tag: "en",
            youversion_deep_link: "https://www.bible.com/versions/3034"
          },
          {
            id: 3035,
            abbreviation: "KJV",
            title: "King James Version",
            language: { iso_639_1: "en", name: "English" }
          }
        ],
        next_page_token: "next-page"
      });
    }
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store, max-age=0");
  assert.equal(response.headers.get("access-control-allow-origin"), origin);
  const data = await response.json();
  assert.equal(data.source, "YouVersion Platform");
  assert.equal(data.data.length, 2);
  assert.equal(data.data[0].id, 3034);
  assert.equal(data.data[0].abbreviation, "BSB");
  assert.equal(data.next_page_token, "next-page");
  assert.doesNotMatch(JSON.stringify(data), new RegExp(secret));
});

test("passes a validated pagination token to the licensed English Bible list", async () => {
  const response = await send(request("/api/youversion/bibles?next_page_token=next%2Bpage%3D%3D"), makeEnv(),
    async url => {
      const parsed = new URL(url);
      assert.equal(parsed.searchParams.get("next_page_token"), "next+page==");
      return Response.json({ data: [], next_page_token: null });
    });
  assert.equal(response.status, 200);
});

test("rejects malformed pagination tokens before contacting YouVersion", async () => {
  let called = false;
  const response = await send(request("/api/youversion/bibles?next_page_token=%3Cscript%3E"),
    makeEnv(), async () => { called = true; return Response.json({ data: [] }); });
  assert.equal(response.status, 400);
  assert.equal(called, false);
});

test("fetches publisher attribution from Bible metadata for an authorised passage", async () => {
  const response = await send(
    request("/api/youversion/bibles/3034/passages/JHN.3.16-18?format=html", {
      headers: { "CF-Connecting-IP": "203.0.113.10" }
    }),
    makeEnv(),
    async (url, options) => {
      const parsed = new URL(url);
      assert.equal(parsed.origin, "https://api.youversion.com");
      assert.equal(options.headers["X-YVP-App-Key"], secret);
      if (parsed.pathname === "/v1/bibles/3034/passages/JHN.3.16-18") {
        assert.equal(parsed.searchParams.get("format"), "html");
        return Response.json({
          data: {
            id: "JHN.3.16-18",
            reference: "John 3:16-18",
            content: "<p><span class='v'>16</span> For God so loved the world.</p>"
          }
        });
      }
      if (parsed.pathname === "/v1/bibles/3034") {
        return Response.json({
          id: 3034,
          abbreviation: "BSB",
          title: "Berean Standard Bible",
          copyright: "Publisher copyright",
          promotional_content: "Publisher attribution"
        });
      }
      throw new Error("Unexpected YouVersion endpoint: " + parsed.pathname);
    }
  );
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.version.id, 3034);
  assert.equal(data.version.abbreviation, "BSB");
  assert.equal(data.version.title, "Berean Standard Bible");
  assert.equal(data.passage.reference, "John 3:16-18");
  assert.match(data.passage.content, /For God so loved the world/);
  assert.equal(data.passage.copyright, "Publisher copyright");
  assert.equal(data.passage.promotional_content, "Publisher attribution");
  assert.equal(data.format, "html");
  assert.match(data.notice, /not stored for offline use/);
  assert.doesNotMatch(JSON.stringify(data), new RegExp(secret));
});

test("supports plain-text passage responses with separately verified Bible attribution", async () => {
  const response = await send(request("/api/youversion/bibles/3034/passages/JHN.3?format=text"),
    makeEnv(), async url => {
      const parsed = new URL(url);
      if (parsed.pathname.endsWith("/passages/JHN.3")) {
        assert.equal(parsed.searchParams.get("format"), "text");
        return Response.json({ id: "JHN.3", reference: "John 3", content: "For God so loved the world." });
      }
      if (parsed.pathname === "/v1/bibles/3034") {
        return Response.json({ id: 3034, abbreviation: "BSB", title: "Berean Standard Bible", copyright: "Publisher copyright" });
      }
      throw new Error("Unexpected YouVersion endpoint: " + parsed.pathname);
    });
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.format, "text");
  assert.equal(data.passage.content, "For God so loved the world.");
  assert.equal(data.passage.copyright, "Publisher copyright");
  const bad = await send(request("/api/youversion/bibles/3034/passages/JHN.3?format=text&all_available=true"));
  assert.equal(bad.status, 400);
});

test("withholds passage text if publisher attribution cannot be verified", async () => {
  const response = await send(request("/api/youversion/bibles/3034/passages/JHN.3.16"),
    makeEnv(), async url => {
      const parsed = new URL(url);
      if (parsed.pathname.endsWith("/passages/JHN.3.16")) {
        return Response.json({ id: "JHN.3.16", reference: "John 3:16", content: "Passage text" });
      }
      if (parsed.pathname === "/v1/bibles/3034") {
        return Response.json({ id: 3034, abbreviation: "BSB", title: "Berean Standard Bible" });
      }
      throw new Error("Unexpected YouVersion endpoint: " + parsed.pathname);
    });
  assert.equal(response.status, 502);
  assert.match((await response.json()).error, /publisher attribution/);
});
test("rejects invalid passage identifiers before contacting YouVersion", async () => {
  let called = false;
  const response = await send(request("/api/youversion/bibles/3034/passages/JHN.3.16-EXO.1.1"),
    makeEnv(), async () => { called = true; return Response.json({ content: "no" }); });
  assert.equal(response.status, 404);
  assert.equal(called, false);
});

test("requires GET for translation resources", async () => {
  const response = await send(request("/api/youversion/bibles", { method: "POST" }));
  assert.equal(response.status, 405);
});

test("fails closed when the YouVersion app key is missing", async () => {
  const response = await send(request("/api/youversion/bibles"), makeEnv({ ZITE_YVP_APP_KEY: "" }));
  assert.equal(response.status, 503);
});

test("fails closed when the translation rate limiter is missing or unavailable", async () => {
  const missing = await send(request("/api/youversion/bibles"), makeEnv({ TRANSLATION_RATE_LIMIT: null }));
  assert.equal(missing.status, 503);
  const unavailable = await send(request("/api/youversion/bibles"),
    makeEnv({ TRANSLATION_RATE_LIMIT: { limit: async () => { throw new Error("private details"); } } }));
  assert.equal(unavailable.status, 503);
});

test("rate limits translation requests before contacting YouVersion", async () => {
  let called = false;
  const response = await send(
    request("/api/youversion/bibles", { headers: { "CF-Connecting-IP": "203.0.113.10" } }),
    makeEnv({ TRANSLATION_RATE_LIMIT: { limit: async () => ({ success: false }) } }),
    async () => { called = true; return Response.json({ data: [] }); }
  );
  assert.equal(response.status, 429);
  assert.equal(called, false);
});

test("maps publisher licence denial without leaking upstream response details", async () => {
  const response = await send(request("/api/youversion/bibles/9999/passages/JHN.3.16"),
    makeEnv(), async () => new Response("private provider response", { status: 403 }));
  assert.equal(response.status, 403);
  const data = await response.json();
  assert.match(data.error, /publisher licence/);
  assert.doesNotMatch(JSON.stringify(data), /private provider response/);
});

test("preserves YouVersion retry-after information on rate limiting", async () => {
  const response = await send(request("/api/youversion/bibles"),
    makeEnv(), async () => new Response("rate limited", { status: 429, headers: { "Retry-After": "30" } }));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "30");
});

test("rejects an unapproved app origin", async () => {
  let called = false;
  const response = await send(request("/api/youversion/bibles", { origin: "https://attacker.example" }),
    makeEnv(), async () => { called = true; return Response.json({ data: [] }); });
  assert.equal(response.status, 403);
  assert.equal(called, false);
});

test("handles an empty licensed Bible list", async () => {
  const response = await send(request("/api/youversion/bibles"), makeEnv(),
    async () => new Response(null, { status: 204 }));
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.deepEqual(data.data, []);
});
