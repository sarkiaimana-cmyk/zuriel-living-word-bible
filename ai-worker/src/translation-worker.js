import { handleRequest } from "./index.js";

// This deployment exposes only the licensed YouVersion and optional API.Bible translation proxies.
// The AI assistant route is intentionally unavailable on this Worker.
export async function handleTranslationRequest(request, env, dependencies = {}) {
  const url = new URL(request.url);
  if (!/^\/api\/(?:youversion|api-bible)\/bibles(?:\/|$)/.test(url.pathname) &&
      !/^\/api\/net-bible\/(?:bibles|chapters\/)/.test(url.pathname) &&
      !/^\/api\/esv\/(?:bibles|chapters\/)/.test(url.pathname)) {
    return new Response(JSON.stringify({ error: "Not found." }), {
      status: 404,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store, max-age=0",
        "x-content-type-options": "nosniff"
      }
    });
  }
  return handleRequest(request, env, dependencies);
}

export default { fetch: handleTranslationRequest };
