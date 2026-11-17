import { handleRequest } from "./index.js";

// This deployment exposes only the licensed YouVersion translation proxy.
// The AI assistant route is intentionally unavailable on this Worker.
export async function handleTranslationRequest(request, env, dependencies = {}) {
  const url = new URL(request.url);
  if (!/^\/api\/youversion\/bibles(?:\/|$)/.test(url.pathname)) {
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
