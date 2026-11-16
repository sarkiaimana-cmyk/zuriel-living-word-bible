import test from "node:test";
import assert from "node:assert/strict";
import { handleRequest } from "../src/index.js";

const origin = "https://localhost";
const index = [{ name: "John", code: "JOH", chapters: 21 }, { name: "Psalms", code: "PSA", chapters: 150 }];
const chapter = ["For God so loved the world.", "That whosoever believeth in him."];
function makeEnv(overrides = {}) {
  return {
    ALLOWED_ORIGINS: origin,
    ASSETS: {
      fetch: async request => {
        const url = new URL(request.url);
        if (url.pathname === "/scripture-index.json") return Response.json(index);
        if (url.pathname === "/scripture/JOH/3.json") return Response.json(chapter);
        if (url.pathname === "/scripture/PSA/23.json") return Response.json(["The LORD is my shepherd."]);
        return new Response("not found", { status: 404 });
      }
    },
    AI_RATE_LIMIT: { limit: async () => ({ success: true }) },
    AI: { run: async () => ({ response: "Main idea: This passage expresses God's love.\n\nContext and meaning: It describes the purpose of belief.\n\nReflection: Consider the meaning of this promise." }) },
    ...overrides
  };
}
function request(body, extraHeaders = {}) {
  return new Request("https://worker.example/api/assistant", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json", ...extraHeaders },
    body: JSON.stringify(body)
  });
}

test("returns exact KJV source separately from labelled AI explanation", async () => {
  const response = await handleRequest(request({ question: "What is the main idea?", reference: "John 3:16-17" }), makeEnv());
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.reference, "John 3:16-17");
  assert.equal(data.translation, "KJV");
  assert.deepEqual(data.verses, [
    { number: 16, text: "For God so loved the world." },
    { number: 17, text: "That whosoever believeth in him." }
  ]);
  assert.equal(data.explanationLabel, "AI-generated study explanation");
  assert.match(data.notice, /exact KJV text/);
  assert.equal(response.headers.get("cache-control"), "no-store, max-age=0");
});

test("normalizes Psalm alias and retrieves canonical Psalms text", async () => {
  const response = await handleRequest(request({ question: "Explain this verse.", reference: "Psalm 23:1" }), makeEnv());
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.reference, "Psalms 23:1");
  assert.equal(data.verses[0].text, "The LORD is my shepherd.");
});

test("rejects unsupported references before calling the model", async () => {
  let called = false;
  const env = makeEnv({ AI: { run: async () => { called = true; return { response: "No" }; } } });
  const response = await handleRequest(request({ question: "Explain this.", reference: "John 99:1" }), env);
  assert.equal(response.status, 400);
  assert.equal(called, false);
});

test("rejects verse ranges beyond the available chapter", async () => {
  const response = await handleRequest(request({ question: "Explain this.", reference: "John 3:1-3" }), makeEnv());
  assert.equal(response.status, 400);
});

test("rejects more than eight verses", async () => {
  const response = await handleRequest(request({ question: "Explain this.", reference: "John 3:1-10" }), makeEnv());
  assert.equal(response.status, 400);
});

test("rejects personal notes and unexpected request fields", async () => {
  const response = await handleRequest(request({ question: "Explain this.", reference: "John 3:16", notes: "private prayer journal" }), makeEnv());
  assert.equal(response.status, 400);
});

test("rate limits a connection before calling the model", async () => {
  let called = false;
  const env = makeEnv({
    AI_RATE_LIMIT: { limit: async ({ key }) => { assert.equal(key, "203.0.113.10"); return { success: false }; } },
    AI: { run: async () => { called = true; return { response: "No" }; } }
  });
  const response = await handleRequest(request({ question: "Explain this.", reference: "John 3:16" }, { "CF-Connecting-IP": "203.0.113.10" }), env);
  assert.equal(response.status, 429);
  assert.equal(called, false);
});

test("fails closed when rate limiting is unavailable", async () => {
  const env = makeEnv({ AI_RATE_LIMIT: { limit: async () => { throw new Error("unavailable"); } } });
  const response = await handleRequest(request({ question: "Explain this.", reference: "John 3:16" }), env);
  assert.equal(response.status, 503);
});

test("rejects an unapproved origin", async () => {
  const bad = new Request("https://worker.example/api/assistant", {
    method: "POST",
    headers: { Origin: "https://attacker.example", "Content-Type": "application/json" },
    body: JSON.stringify({ question: "Explain this.", reference: "John 3:16" })
  });
  const response = await handleRequest(bad, makeEnv());
  assert.equal(response.status, 403);
});

test("rejects oversized requests", async () => {
  const response = await handleRequest(request({ question: "x".repeat(2500), reference: "John 3:16" }), makeEnv());
  assert.equal(response.status, 413);
});

test("handles provider failure without exposing internal error details", async () => {
  const env = makeEnv({ AI: { run: async () => { throw new Error("private provider internals"); } } });
  const response = await handleRequest(request({ question: "Explain this.", reference: "John 3:16" }), env);
  assert.equal(response.status, 502);
  const data = await response.json();
  assert.doesNotMatch(JSON.stringify(data), /private provider internals/);
});

test("rejects missing provider configuration", async () => {
  const env = makeEnv({ AI: null });
  const response = await handleRequest(request({ question: "Explain this.", reference: "John 3:16" }), env);
  assert.equal(response.status, 503);
});

test("supports an approved preflight request", async () => {
  const preflight = new Request("https://worker.example/api/assistant", {
    method: "OPTIONS",
    headers: { Origin: origin }
  });
  const response = await handleRequest(preflight, makeEnv());
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("access-control-allow-origin"), origin);
});
