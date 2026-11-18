import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.mjs";

const ORIGIN = "https://sarkiaimana-cmyk.github.io";
const env = { YVP_APP_KEY: "test-secret", ALLOWED_ORIGINS: ORIGIN };

async function withFetch(mock, callback) {
  const original = globalThis.fetch;
  globalThis.fetch = mock;
  try {
    return await callback();
  } finally {
    globalThis.fetch = original;
  }
}

test("health reports configuration without exposing the App Key", async () => {
  const response = await worker.fetch(new Request("https://worker.example/health", {
    headers: { Origin: ORIGIN }
  }), env);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.appKeyConfigured, true);
  assert.equal(JSON.stringify(body).includes("test-secret"), false);
});

test("English Bible catalog is requested with server-side App Key and pagination", async () => {
  await withFetch(async (input, init) => {
    const url = new URL(input);
    assert.equal(url.origin, "https://api.youversion.com");
    assert.equal(url.pathname, "/v1/bibles");
    assert.equal(url.searchParams.get("language_ranges[]"), "en");
    assert.equal(url.searchParams.get("page_size"), "99");
    assert.equal(init.headers["X-YVP-App-Key"], "test-secret");
    return new Response(JSON.stringify({
      data: [{ id: 3034, abbreviation: "BSB", title: "Berean Standard Bible", language_tag: "en" }]
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  }, async () => {
    const response = await worker.fetch(new Request("https://worker.example/api/youversion/bibles", {
      headers: { Origin: ORIGIN }
    }), env);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.data[0].abbreviation, "BSB");
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  });
});

test("passage response includes Bible-level copyright attribution", async () => {
  await withFetch(async (input, init) => {
    const url = new URL(input);
    assert.equal(init.headers["X-YVP-App-Key"], "test-secret");
    if (url.pathname.endsWith("/passages/JHN.3.16")) {
      return new Response(JSON.stringify({
        id: "JHN.3.16",
        reference: "John 3:16",
        content: "For God so loved the world."
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.pathname === "/v1/bibles/3034") {
      return new Response(JSON.stringify({
        id: 3034,
        abbreviation: "BSB",
        title: "Berean Standard Bible",
        copyright: "Publisher copyright statement",
        promotional_content: "Publisher URL"
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    throw new Error("Unexpected upstream route: " + url.pathname);
  }, async () => {
    const response = await worker.fetch(new Request(
      "https://worker.example/api/youversion/bibles/3034/passages/JHN.3.16?format=text",
      { headers: { Origin: ORIGIN } }
    ), env);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.passage.reference, "John 3:16");
    assert.equal(body.passage.content, "For God so loved the world.");
    assert.equal(body.passage.copyright, "Publisher copyright statement");
    assert.equal(body.version.abbreviation, "BSB");
  });
});

test("malformed version and passage references are rejected before upstream calls", async () => {
  await withFetch(async () => {
    throw new Error("Invalid route must not call YouVersion.");
  }, async () => {
    const response = await worker.fetch(new Request(
      "https://worker.example/api/youversion/bibles/0/passages/not-a-reference",
      { headers: { Origin: ORIGIN } }
    ), env);
    assert.equal(response.status, 400);
  });
});

test("missing secret fails closed", async () => {
  const response = await worker.fetch(new Request(
    "https://worker.example/api/youversion/bibles",
    { headers: { Origin: ORIGIN } }
  ), { ALLOWED_ORIGINS: ORIGIN });
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /App Key/);
});

test("unapproved browser origins are rejected", async () => {
  const response = await worker.fetch(new Request(
    "https://worker.example/api/youversion/bibles",
    { headers: { Origin: "https://untrusted.example" } }
  ), env);
  assert.equal(response.status, 403);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), null);
});

test("CORS preflight returns an empty 204 response", async () => {
  const response = await worker.fetch(new Request("https://worker.example/api/youversion/bibles", {
    method: "OPTIONS",
    headers: { Origin: ORIGIN }
  }), env);
  assert.equal(response.status, 204);
  assert.equal(await response.text(), "");
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), ORIGIN);
});
