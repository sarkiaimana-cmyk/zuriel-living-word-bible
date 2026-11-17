import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [index, client, worker, config, deployment, packaging, serviceWorker, version, updates] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("zuriel-translations.js", "utf8"),
  readFile("ai-worker/src/translation-worker.js", "utf8"),
  readFile("ai-worker/wrangler.translations.jsonc", "utf8"),
  readFile(".github/workflows/deploy-translations-worker.yml", "utf8"),
  readFile("scripts/prepare-web.mjs", "utf8"),
  readFile("sw.js", "utf8"),
  readFile("version.json", "utf8"),
  readFile("zuriel-updates.js", "utf8")
]);

const failures = [];
function requireText(source, fragment, label) {
  if (!source.includes(fragment)) failures.push(label + " is missing.");
}
function forbidText(source, pattern, label) {
  if (pattern.test(source)) failures.push(label + " must not be present.");
}

requireText(index, 'src="zuriel-translations.js"', "Translation reader entry point");
requireText(index, "window.ZurielBibleBookCode = function", "Reader USFM book-code bridge");
requireText(index, 'window.ZURIEL_TRANSLATION_API_BASE = "";', "Explicit empty translation endpoint until the proxy is deployed");
requireText(client, 'id = "zurielTranslationCompare"', "Collapsible translation comparison panel");
requireText(client, "zuriel:chapter-opened", "Reader chapter event integration");
requireText(client, '"/api/youversion/bibles"', "Licensed English version list request");
requireText(client, "?format=text", "Plain-text passage request");
requireText(client, 'cache: "no-store"', "No-store request policy");
requireText(client, 'credentials: "omit"', "Credential isolation");
requireText(client, 'referrerPolicy: "no-referrer"', "Referrer privacy");
requireText(client, "item.copyright", "Publisher copyright handling");
requireText(client, "item.promotional_content", "Publisher promotional attribution handling");
requireText(client, "Publisher attribution was not supplied", "Fail-closed attribution requirement");
requireText(client, "Online text is not stored for offline use.", "No-offline-storage notice");
requireText(client, "window.ZURIEL_TRANSLATION_API_BASE", "Explicit deployment endpoint configuration");
requireText(client, "window.ZurielTranslations", "Translation reader public readiness API");
requireText(client, "activeController.abort()", "Cancellation of stale or closed-panel passage requests");
forbidText(client, /localStorage|sessionStorage|caches\.|indexedDB/i, "Persistent storage of licensed online Bible text");
forbidText(client, /innerHTML|outerHTML/i, "Unsafe HTML insertion for publisher passage text");
forbidText(client, /ZITE_YVP_APP_KEY|X-YVP-App-Key|api\.youversion\.com/i, "Provider credentials or direct upstream API access in client code");

requireText(worker, 'from "./index.js"', "Shared tested server-side YouVersion handler");
requireText(worker, "youversion/bibles(?:", "Translation-only route allowlist");
requireText(worker, "handleRequest(request, env, dependencies)", "Shared server-side origin, rate-limit and licence handling");
requireText(config, '"name": "zuriel-bible-translations"', "Separate translation Worker name");
requireText(config, '"TRANSLATION_RATE_LIMIT"', "Translation rate-limit binding");
requireText(config, '"ZITE_YVP_APP_KEY"', "Server-only YouVersion secret requirement");
forbidText(config, /"ai"\s*:|"TURNSTILE_SECRET"/, "AI binding or AI-only Turnstile requirement in the translation-only Worker");
requireText(deployment, "workflow_dispatch:", "Manual-only translation deployment");
requireText(deployment, "inputs.confirm_deployment == true", "Explicit deployment confirmation");
requireText(deployment, "secrets.ZITE_YVP_APP_KEY", "Server-side YouVersion secret injection");
requireText(deployment, "wrangler deploy --config wrangler.translations.jsonc", "Dedicated translation Worker deployment");
requireText(packaging, '"zuriel-translations.js"', "Android web packaging entry");
requireText(serviceWorker, '"./zuriel-translations.js"', "Offline shell precache entry");

const release = JSON.parse(version);
const installed = updates.match(/const APP_VERSION = "([^"]+)";/);
assert.ok(installed, "In-app update centre must declare its installed version.");
assert.equal(installed[1], release.version, "In-app update version must match version.json.");
assert.equal(release.version, "1.4.27", "Translation reader release metadata must be version 1.4.27.");
assert.match(serviceWorker, /zuriel-bible-offline-v122/);

if (failures.length) {
  console.error("YouVersion translation reader checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("YouVersion translation reader checks passed: separate translation-only Worker, server-only key, manual deployment, origin/rate-limit enforcement, no offline storage, publisher attribution, and Android/offline packaging.");
}
