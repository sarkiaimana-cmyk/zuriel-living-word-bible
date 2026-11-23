import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [index, client, worker, config, deployment, aiDeployment, packaging, serviceWorker, version, updates] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("zuriel-translations.js", "utf8"),
  readFile("ai-worker/src/translation-worker.js", "utf8"),
  readFile("ai-worker/wrangler.translations.jsonc", "utf8"),
  readFile(".github/workflows/deploy-translations-worker.yml", "utf8"),
  readFile(".github/workflows/deploy-ai-worker.yml", "utf8"),
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
requireText(index, "window.ZurielVerseOverlay", "Selected-verse overlay host for external study panels");
requireText(index, 'window.ZURIEL_TRANSLATION_API_BASE = "";', "Explicit empty translation endpoint until the proxy is deployed");
requireText(client, 'id = "zurielTranslationCompare"', "Collapsible translation comparison panel");
requireText(client, "zuriel:chapter-opened", "Reader chapter event integration");
requireText(client, "window.ZurielVerseOverlay.openExternal(panel)", "YouVersion comparison opens in selected-verse overlay");
requireText(client, '"/api/youversion/bibles"', "Licensed English version list request");
requireText(client, '"/api/api-bible/bibles"', "API.Bible English version list request");
requireText(client, '["api-bible", "API.Bible"]', "API.Bible provider selection option");
requireText(client, "next_page_token", "YouVersion catalogue pagination");
requireText(client, "encodeURIComponent(nextPageToken)", "Safe pagination token encoding");
requireText(client, "pageCount < 10", "Bounded catalogue pagination");
requireText(client, "new Map()", "Deduplication of paginated Bible version results");
requireText(client, "seenTokens.has(token)", "Repeated pagination token protection");
requireText(client, "?format=text", "Plain-text passage request");
requireText(client, 'cache: "no-store"', "No-store request policy");
requireText(client, 'credentials: "omit"', "Credential isolation");
requireText(client, 'referrerPolicy: "no-referrer"', "Referrer privacy");
requireText(client, "item.copyright", "Publisher copyright handling");
requireText(client, "item.promotional_content", "Publisher promotional attribution handling");
requireText(client, "/chapters/", "API.Bible chapter retrieval path");
requireText(client, "loadedProvider === selectedProvider", "Provider-specific catalogue state");
requireText(client, "Publisher attribution was not supplied", "Fail-closed attribution requirement");
requireText(client, "API.Bible chapters may be saved on this device", "Accurate publisher-specific offline storage guidance");
requireText(client, "YouVersion passages are shown online only", "YouVersion online-only rights notice");
requireText(client, "function canStoreOffline(provider)", "Provider-specific offline permission gate");
requireText(client, 'return provider === "api-bible"', "Only the explicitly supported API.Bible offline cache is enabled");
requireText(client, "if (!canStoreOffline(provider)) return null", "Block unverified provider cache reads");
requireText(client, "if (!canStoreOffline(provider)) return false", "Block unverified provider cache writes");
requireText(client, "if (canStoreOffline(selectedProvider))", "Only permitted provider text is cached after online retrieval");
requireText(client, "downloadButton.hidden = !canStoreOffline(provider);\\n        downloadButton.disabled = !canStoreOffline(provider);", "Home translation shortcuts must keep YouVersion downloads hidden and disabled");
requireText(client, "This YouVersion passage is online-only", "Prevent bulk offline downloads of unverified YouVersion licences");
requireText(client, '"./version.json"', "Offline-capable local release metadata discovery");
requireText(client, "indexedDB.open(TRANSLATION_CACHE_DB, 2)", "IndexedDB translation cache");
requireText(client, "let translationDbPromise = null", "Shared IndexedDB connection promise");
requireText(client, "if (translationDb) return Promise.resolve(translationDb)", "Reuse one open offline database connection");
requireText(client, "db.onversionchange", "Close and reopen offline database safely during schema upgrades");
requireText(client, "API_BIBLE_CACHE_MAX_AGE = 29 * 24 * 60 * 60 * 1000", "API.Bible 29-day refresh limit");
requireText(client, "saveApiBibleChapter", "API.Bible chapter cache write");
requireText(client, "readCachedApiBibleChapter", "API.Bible offline chapter fallback");
requireText(client, "downloadSelectedTranslation", "Full translation offline download manager");
requireText(client, "hasFreshCachedChapter", "Resume by skipping chapters already saved");
requireText(client, "4000", "Rate-limited sequential chapter downloads");
requireText(client, "downloadProgress", "Visible offline download progress");
requireText(client, "Choose a translation saved on this device", "Offline selector for previously downloaded translations");
requireText(client, 'objectStore("downloads").put', "Persistent offline translation manifest");
requireText(client, 'objectStore("downloads").getAll', "Discovery of saved offline translations after app restart");
requireText(client, 'offlineSelect.addEventListener("change"', "Selection of an offline translation without network access");
requireText(client, "selectedVersionLabel", "Readable translation label restored from offline manifest");
requireText(client, "Internet translation access is unavailable. Choose a translation already saved on this device", "Offline translation guidance when service is unreachable");
requireText(client, "Paused:", "Pause and resume support");
requireText(client, "saveCachedChapter(selectedProvider", "Selected provider cache write is guarded by publisher storage permission");
requireText(client, '"api-bible"', "Provider-scoped offline cache");

requireText(client, "window.ZURIEL_TRANSLATION_API_BASE", "Explicit deployment endpoint configuration");
requireText(client, 'cache: "no-cache"', "Offline-capable version metadata fetch policy");
requireText(client, "metadata.translationApiBase", "Automatic YouVersion endpoint discovery");
requireText(client, "validWorkerEndpoint", "Trusted Cloudflare Worker endpoint validation");
requireText(client, "zuriel-bible-translations.", "Expected dedicated translation Worker hostname");
requireText(client, "window.ZurielTranslations", "Translation reader public readiness API");
requireText(client, 'const providers = ["youversion", "api-bible"]', "Home translation shortcuts search both authorised providers");
requireText(client, "providerFailures.join", "Clear provider-specific explanation when a requested version is unavailable");
requireText(client, "NEW LIVING TRANSLATION", "Requested-version catalogue aliases");
requireText(client, "CHRISTIAN STANDARD BIBLE", "CSB catalogue title matching");
requireText(client, '"GNT": /', "Good News Translation catalogue alias");
requireText(client, '"AMP": /', "Amplified Bible catalogue alias");
requireText(client, '"LB/LT": /', "Living Bible and Living Translation catalogue aliases");
requireText(client, '"TPT": /', "Passion Translation catalogue alias");
requireText(client, '"NLT": /', "New Living Translation catalogue alias");
requireText(client, '"NET": /', "New English Translation catalogue alias");
requireText(client, '"NIV": /', "New International Version catalogue alias");
requireText(client, '"ESV": /', "English Standard Version catalogue alias");
requireText(client, '"NASB": /', "New American Standard Bible catalogue alias");
requireText(client, '"CSB": /', "Christian Standard Bible catalogue alias");
requireText(client, '"NKJV": /', "New King James Version catalogue alias");

const aliasBlock = client.match(/const aliases = \{([\s\S]*?)\n      \};/);
assert.ok(aliasBlock, "Requested translation alias table must be present.");
const aliasSmokeCases = {
  "GNT": "Good News Translation",
  "AMP": "Amplified Bible",
  "LB/LT": "The Living Bible",
  "TPT": "The Passion Translation",
  "NLT": "New Living Translation",
  "NET": "New English Translation",
  "NIV": "New International Version",
  "ESV": "English Standard Version",
  "NASB": "New American Standard Bible",
  "CSB": "Christian Standard Bible",
  "NKJV": "New King James Version"
};
for (const [abbreviation, label] of Object.entries(aliasSmokeCases)) {
  const line = aliasBlock[1].split("\n").find(value => value.includes('"' + abbreviation + '":'));
  const pattern = line && line.match(/": \/(.*)\/,?$/);
  assert.ok(pattern, "Alias pattern must be readable for " + abbreviation + ".");
  assert.ok(new RegExp(pattern[1], "i").test(label),
    "Requested translation alias must match its catalogue title: " + abbreviation + ".");
}
const livingTranslationLine = aliasBlock[1].split("\n").find(value => value.includes('"LB/LT":'));
const livingTranslationPattern = livingTranslationLine && livingTranslationLine.match(/": \/(.*)\/,?$/);
assert.ok(livingTranslationPattern, "LB/LT alias pattern must be readable.");
assert.ok(new RegExp(livingTranslationPattern[1], "i").test("Living Translation"),
  "LB/LT must also match the Living Translation catalogue title, not only The Living Bible.");
if (client.includes("/\\\\b")) failures.push("Double-escaped translation alias boundaries must not be present.");


requireText(client, "activeController.abort()", "Cancellation of stale or closed-panel passage requests");
forbidText(client, /localStorage|sessionStorage|caches\./i, "Uncontrolled persistent storage of online Bible text");
forbidText(client, /saveYouVersionChapter|saveTranslationChapter/i, "Offline caching of YouVersion content without licence confirmation");
requireText(client, 'const valid = records.filter(record => record &&\n      record.provider === "api-bible" &&', "Only API.Bible manifests can be restored as offline translations");
forbidText(client, /innerHTML|outerHTML/i, "Unsafe HTML insertion for publisher passage text");
forbidText(client, /ZITE_YVP_APP_KEY|X-YVP-App-Key|API_BIBLE_KEY|api-key|api\.youversion\.com|rest\.api\.bible/i, "Provider credentials or direct upstream API access in client code");

requireText(worker, 'from "./index.js"', "Shared tested server-side YouVersion handler");
requireText(worker, "bibles(?:", "Translation-only route allowlist");
requireText(worker, "api-bible", "API.Bible route allowlist");
requireText(worker, "handleRequest(request, env, dependencies)", "Shared server-side origin, rate-limit and licence handling");
requireText(config, '"name": "zuriel-bible-translations"', "Separate translation Worker name");
requireText(config, '"TRANSLATION_RATE_LIMIT"', "Translation rate-limit binding");
requireText(config, '"ZITE_YVP_APP_KEY"', "Server-only YouVersion secret requirement");
forbidText(config, /"ai"\s*:|"TURNSTILE_SECRET"/, "AI binding or AI-only Turnstile requirement in the translation-only Worker");
requireText(deployment, "workflow_dispatch:", "Manual-only translation deployment");
requireText(deployment, "inputs.confirm_deployment == true", "Explicit deployment confirmation");
requireText(deployment, "secrets.ZITE_YVP_APP_KEY", "Server-side YouVersion secret injection");
requireText(deployment, "secrets.API_BIBLE_KEY", "Optional server-side API.Bible secret injection");
requireText(deployment, "secret put API_BIBLE_KEY", "Optional API.Bible Worker secret installation");
requireText(deployment, "wrangler deploy --config wrangler.translations.jsonc", "Dedicated translation Worker deployment");
forbidText(aiDeployment, /ZITE_YVP_APP_KEY/, "YouVersion app key in the AI-only deployment workflow");
requireText(packaging, '"zuriel-translations.js"', "Android web packaging entry");
requireText(serviceWorker, '"./zuriel-translations.js"', "Offline shell precache entry");

const translationConfig = JSON.parse(config);
assert.equal(translationConfig.name, "zuriel-bible-translations");
assert.equal(translationConfig.main, "src/translation-worker.js");
assert.ok(translationConfig.ratelimits.some(binding =>
  binding.name === "TRANSLATION_RATE_LIMIT" && binding.simple.limit === 20 && binding.simple.period === 60
));
assert.deepEqual(translationConfig.secrets.required, ["ZITE_YVP_APP_KEY"]);
assert.equal(translationConfig.vars.ALLOWED_ORIGINS, "https://sarkiaimana-cmyk.github.io,https://localhost");
assert.equal(Boolean(translationConfig.ai), false, "Translation-only Worker must not bind an AI provider.");
assert.equal(Boolean(translationConfig.vars.TURNSTILE_SITE_KEY), false, "Translation-only Worker must not depend on AI Turnstile.");

const release = JSON.parse(version);
const installed = updates.match(/const APP_VERSION = "([^"]+)";/);
assert.ok(installed, "In-app update centre must declare its installed version.");
assert.equal(installed[1], release.version, "In-app update version must match version.json.");
const releaseParts = release.version.split(".");
assert.equal(releaseParts.length, 3, "Release metadata must use MAJOR.MINOR.PATCH numbering.");
assert.ok(releaseParts.every(part => part.length > 0 && Number.isInteger(Number(part)) && String(Number(part)) === part),
  "Release version components must be non-negative integers without leading zeroes.");
assert.ok(serviceWorker.includes('const CACHE_NAME = "zuriel-bible-offline-v'),
  "The service worker must use an explicitly versioned offline cache.");

if (failures.length) {
  console.error("Online translation reader checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Online translation reader checks passed: YouVersion and API.Bible provider selection, separate translation-only Worker, server-only credentials, manual deployment, origin/rate-limit enforcement, 29-day API.Bible offline cache, publisher attribution, and Android/offline packaging.");
}
