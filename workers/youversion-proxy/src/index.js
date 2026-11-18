const API_ROOT = "https://api.youversion.com/v1";
const DEFAULT_ORIGINS = [
  "https://sarkiaimana-cmyk.github.io",
  "https://localhost",
  "capacitor://localhost",
  "http://localhost"
];

function allowedOrigins(env) {
  const configured = String(env.ALLOWED_ORIGINS || "").split(",").map(value => value.trim()).filter(Boolean);
  return new Set(configured.length ? configured : DEFAULT_ORIGINS);
}

function jsonResponse(payload, status, origin, env) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Vary": "Origin"
  });
  const allowed = allowedOrigins(env);
  if (origin && allowed.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Accept, Content-Type");
    headers.set("Access-Control-Max-Age", "86400");
  } else if (!origin) {
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Accept, Content-Type");
  }
  return new Response(JSON.stringify(payload), { status, headers });
}

async function youVersionRequest(path, appKey) {
  const response = await fetch(API_ROOT + path, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-YVP-App-Key": appKey
    },
    redirect: "error"
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    throw new Error("YouVersion returned a response that was not valid JSON.");
  }
  if (!response.ok) {
    const message = payload && (payload.message || payload.error);
    const error = new Error(typeof message === "string" ? message : "YouVersion request failed.");
    error.status = response.status;
    throw error;
  }
  return payload;
}

async function listEnglishBibles(appKey) {
  const all = [];
  let pageToken = "";
  // The API permits up to 99 items per page. The guard prevents a bad
  // pagination response from creating an unbounded proxy request.
  for (let page = 0; page < 5; page += 1) {
    const params = new URLSearchParams();
    params.append("language_ranges[]", "en");
    params.set("page_size", "99");
    if (pageToken) params.set("page_token", pageToken);
    const payload = await youVersionRequest("/bibles?" + params.toString(), appKey);
    if (Array.isArray(payload.data)) all.push(...payload.data);
    pageToken = typeof payload.next_page_token === "string" ? payload.next_page_token : "";
    if (!pageToken) break;
  }
  return { data: all };
}

function validPassageId(value) {
  return /^[A-Z0-9]{3,8}\.[A-Z0-9]{1,8}(?:\.\d{1,3}(?:-\d{1,3})?)?$/.test(value);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const allowed = allowedOrigins(env);

    if (origin && !allowed.has(origin)) {
      return jsonResponse({ error: "This app origin is not allowed to use the translation service." }, 403, "", env);
    }
    if (request.method === "OPTIONS") {
      if (origin && !allowed.has(origin)) {
        return jsonResponse({ error: "Origin not allowed." }, 403, "", env);
      }
      return jsonResponse({}, 204, origin, env);
    }
    if (request.method !== "GET") {
      return jsonResponse({ error: "Only GET requests are supported." }, 405, origin, env);
    }

    if (url.pathname === "/health") {
      return jsonResponse({
        ok: true,
        service: "Zuriel YouVersion proxy",
        appKeyConfigured: Boolean(env.YVP_APP_KEY)
      }, 200, origin, env);
    }

    if (!env.YVP_APP_KEY) {
      return jsonResponse({ error: "The YouVersion App Key has not been configured on the secure service." }, 503, origin, env);
    }

    try {
      if (url.pathname === "/api/youversion/bibles") {
        const payload = await listEnglishBibles(env.YVP_APP_KEY);
        return jsonResponse(payload, 200, origin, env);
      }

      const match = url.pathname.match(/^\/api\/youversion\/bibles\/(\d+)\/passages\/([^/]+)$/);
      if (match) {
        const versionId = Number(match[1]);
        const passageId = decodeURIComponent(match[2]);
        if (!Number.isSafeInteger(versionId) || versionId < 1 || !validPassageId(passageId)) {
          return jsonResponse({ error: "The Bible version or passage reference is invalid." }, 400, origin, env);
        }
        const [passage, version] = await Promise.all([
          youVersionRequest("/bibles/" + versionId + "/passages/" + encodeURIComponent(passageId) + "?format=text", env.YVP_APP_KEY),
          youVersionRequest("/bibles/" + versionId, env.YVP_APP_KEY)
        ]);
        return jsonResponse({
          passage: {
            content: typeof passage.content === "string" ? passage.content : "",
            reference: typeof passage.reference === "string" ? passage.reference : passageId,
            copyright: typeof version.copyright === "string" ? version.copyright : "",
            promotional_content: typeof version.promotional_content === "string" ? version.promotional_content : ""
          },
          version: {
            id: version.id,
            abbreviation: version.abbreviation || version.localized_abbreviation || "",
            title: version.title || version.localized_title || ""
          }
        }, 200, origin, env);
      }

      return jsonResponse({ error: "Translation service route not found." }, 404, origin, env);
    } catch (error) {
      const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 600
        ? error.status : 502;
      return jsonResponse({
        error: error && error.message ? error.message : "The YouVersion service could not be reached."
      }, status, origin, env);
    }
  }
};
