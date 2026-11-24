import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [index, client, worker, workerCore, config, deployment, aiDeployment, packaging, serviceWorker, version, updates] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("zuriel-translations.js", "utf8"),
  readFile("ai-worker/src/translation-worker.js", "utf8"),
  readFile("ai-worker/src/index.js", "utf8"),
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
requireText(client, '"/api/net-bible/chapters/"', "NET Bible online chapter request");
requireText(client, 'lastVerse: Array.isArray(detail.verses) ? detail.verses.length : 0', "NET Bible requests use the complete verse count from the offline reader");
requireText(client, '"?lastVerse=" + currentChapter.lastVerse', "NET Bible requests a complete chapter verse range");
requireText(workerCore, "lastVerse > 176", "NET Bible proxy bounds the requested chapter range");
requireText(client, 'https://netbible.org', "Required NET Bible publisher link");
requireText(client, '["api-bible", "API.Bible"]', "API.Bible provider selection option");
requireText(client, '["net-bible", "NET Bible (Bible.org)"]', "NET Bible provider selection option");
requireText(client, '(?<!NEW )\\bLIVING TRANSLATION\\b', "Living Bible shortcut must not match New Living Translation");
requireText(client, "next_page_token", "YouVersion catalogue pagination");
requireText(workerCore, 'searchParams.set("page_token", token)', "Forward YouVersion continuation tokens using the documented page_token parameter");
requireText(client, "encodeURIComponent(nextPageToken)", "Safe pagination token encoding");
requireText(client, "pageCount < 10", "Bounded catalogue pagination");
requireText(workerCore, 'searchParams.set("page_size", "99")', "Respect YouVersion's documented 99-item catalogue page limit");
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
requireText(client, 'window.fums("trackView", fumsToken)', "Report API.Bible passage views through FUMS v3");
requireText(index, 'src="https://pkg.api.bible/fumsV3.min.js"', "Load the official API.Bible FUMS v3 tracker");
requireText(index, "window.fumsData = window.fumsData || [];", "Queue FUMS reports until the tracker is ready");
requireText(workerCore, 'searchParams.set("fums-version", "3")', "Request API.Bible FUMS v3 tokens with chapter text");
requireText(workerCore, 'const NET_BIBLE_BASE = "https://labs.bible.org/api/"', "Official NET Bible Web Service upstream");
requireText(workerCore, "NET_BIBLE_COPYRIGHT", "NET Bible publisher attribution");
requireText(workerCore, "handleNetBibleRequest", "NET Bible rate-limited server-side proxy");
requireText(workerCore, "meta: { fumsToken }", "Forward only the API.Bible FUMS token to the client");
requireText(workerCore, "required Fair Use Management reporting token", "Withhold API.Bible text when FUMS token is missing");
requireText(client, "API.Bible keeps only the most recently viewed chapter per translation", "Accurate publisher-specific offline storage guidance");
requireText(client, "YouVersion passages are shown online only", "YouVersion online-only rights notice");
requireText(client, "function canStoreOffline(provider)", "Provider-specific offline permission gate");
requireText(client, 'return provider === "api-bible"', "Only the explicitly supported API.Bible offline cache is enabled");
requireText(client, "if (!canStoreOffline(provider)) return null", "Block unverified provider cache reads");
requireText(client, "if (!canStoreOffline(provider)) return false", "Block unverified provider cache writes");
requireText(client, "if (canStoreOffline(selectedProvider))", "Only permitted provider text is cached after online retrieval");
requireText(client, "downloadButton.hidden = !canStoreOffline(provider);", "Home translation shortcuts must hide downloads when publisher rights do not permit offline storage");
requireText(client, "downloadButton.disabled = !canStoreOffline(provider);", "Home translation shortcuts must disable downloads when publisher rights do not permit offline storage");
requireText(client, "This YouVersion passage is online-only", "Prevent bulk offline downloads of unverified YouVersion licences");
requireText(client, '"./version.json"', "Offline-capable local release metadata discovery");
requireText(client, "indexedDB.open(TRANSLATION_CACHE_DB, 2)", "IndexedDB translation cache");
requireText(client, "let translationDbPromise = null", "Shared IndexedDB connection promise");
requireText(client, "if (translationDb) return Promise.resolve(translationDb)", "Reuse one open offline database connection");
requireText(client, "db.onversionchange", "Close and reopen offline database safely during schema upgrades");
requireText(client, "API_BIBLE_CACHE_MAX_AGE = 14 * 24 * 60 * 60 * 1000", "API.Bible 14-day recommended cache refresh limit");
requireText(client, "saveApiBibleChapter", "API.Bible chapter cache write");
requireText(client, "readCachedApiBibleChapter", "API.Bible offline chapter fallback");
requireText(client, "downloadSelectedTranslation", "Current-chapter offline save action");
requireText(client, "Keep only the most recently viewed chapter per version", "Keep API.Bible cached Scripture below its consecutive-verse recommendation");
requireText(client, "pruneCachedTranslationChapters", "Migrate legacy caches to the current publisher limit");
requireText(client, 'record.key.startsWith("youversion|")', "Remove legacy YouVersion offline text");
requireText(client, "last viewed chapter saved", "Clearly identify the current offline chapter");
const offlineSaveBlock = client.match(/async function downloadSelectedTranslation\(\) \{([\s\S]*?)\n  \}\n\n  function renderPassage/);
assert.ok(offlineSaveBlock, "The current-chapter offline save action must be present.");
assert.ok(offlineSaveBlock[1].includes("currentChapter.chapter"), "Offline save must target the currently open chapter.");
assert.ok(!offlineSaveBlock[1].includes("bibleBooks.forEach"), "Offline save must not bulk-download the full Bible.");
requireText(client, "downloadProgress", "Visible offline download progress");
requireText(client, "Choose a translation saved on this device", "Offline selector for previously downloaded translations");
requireText(client, 'objectStore("downloads").put', "Persistent offline translation manifest");
requireText(client, 'objectStore("downloads").getAll', "Discovery of saved offline translations after app restart");
requireText(client, 'offlineSelect.addEventListener("change"', "Selection of an offline translation without network access");
requireText(client, "selectedVersionLabel", "Readable translation label restored from offline manifest");
requireText(client, "Internet translation access is unavailable. Choose a translation already saved on this device", "Offline translation guidance when service is unreachable");
requireText(client, "saveCachedChapter(selectedProvider", "Selected provider cache write is guarded by publisher storage permission");
requireText(client, '"api-bible"', "Provider-scoped offline cache");

requireText(client, "window.ZURIEL_TRANSLATION_API_BASE", "Explicit deployment endpoint configuration");
requireText(client, 'cache: "no-cache"', "Offline-capable version metadata fetch policy");
requireText(client, "metadata.translationApiBase", "Automatic YouVersion endpoint discovery");
requireText(client, "validWorkerEndpoint", "Trusted Cloudflare Worker endpoint validation");
requireText(client, "zuriel-bible-translations.", "Expected dedicated translation Worker hostname");
requireText(client, "window.ZurielTranslations", "Translation reader public readiness API");
requireText(client, 'const providers = ["youversion", "api-bible", "net-bible"]', "Home translation shortcuts search all connected providers");
requireText(client, "providerFailures.join", "Clear provider-specific explanation when a requested version is unavailable");
requireText(client, "passageFailures.join", "Explain when a listed translation cannot return its passage");
requireText(client, "if (currentChapter && !await loadPassage())", "Try the second provider when the first provider lists but cannot load a requested translation");
requireText(client, "return true;", "Passage loading reports successful online or permitted cached retrieval");
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
requireText(worker, "net-bible", "NET Bible route allowlist");
requireText(worker, "handleRequest(request, env, dependencies)", "Shared server-side origin, rate-limit and licence handling");
requireText(workerCore, 'YVP_BASE + "/bibles/" + selectedVersionId', "Fetch YouVersion Bible metadata to obtain publisher attribution");
requireText(workerCore, "publisher attribution could not be verified", "Withhold YouVersion passage text if attribution metadata cannot be verified");
requireText(config, '"name": "zuriel-bible-translations"', "Separate translation Worker name");
requireText(config, '"TRANSLATION_RATE_LIMIT"', "Translation rate-limit binding");
requireText(config, '"ZITE_YVP_APP_KEY"', "Server-only YouVersion secret requirement");
requireText(config, '"API_BIBLE_KEY"', "Server-only API.Bible secret requirement");
forbidText(config, /"ai"\s*:|"TURNSTILE_SECRET"/, "AI binding or AI-only Turnstile requirement in the translation-only Worker");
requireText(deployment, "workflow_dispatch:", "Manual-only translation deployment");
requireText(deployment, "github.event_name == 'workflow_dispatch'", "Manual deployment confirmation is limited to manual runs");
requireText(deployment, "inputs.confirm_deployment != true", "Manual deployment runs require explicit confirmation");
requireText(deployment, "push:", "Reviewed integration branch automatically deploys translation code changes");
requireText(deployment, "secrets.ZITE_YVP_APP_KEY", "Server-side YouVersion secret injection");
requireText(deployment, "secrets.API_BIBLE_KEY", "Server-side API.Bible secret injection when supplied");
requireText(deployment, "secret put API_BIBLE_KEY", "API.Bible Worker secret installation when supplied");
requireText(deployment, "wrangler secret list", "Reuse of existing Cloudflare provider secrets without exposing their values");
requireText(deployment, "smoke-licensed-translations.mjs", "Live passage verification for every requested translation");
requireText(deployment, "test/net-bible.test.mjs", "NET Bible provider security tests in deployment workflow");
requireText(deployment, "wrangler deploy --config wrangler.translations.jsonc", "Dedicated translation Worker deployment");
forbidText(aiDeployment, /ZITE_YVP_APP_KEY/, "YouVersion app key in the AI-only deployment workflow");
requireText(packaging, '"zuriel-translations.js"', "Android web packaging entry");
requireText(serviceWorker, '"./zuriel-translations.js"', "Offline shell precache entry");

const translationConfig = JSON.parse(config);
assert.equal(translationConfig.name, "zuriel-bible-translations");
assert.equal(translationConfig.main, "src/translation-worker.js");
assert.ok(translationConfig.ratelimits.some(binding =>
  binding.name === "TRANSLATION_RATE_LIMIT" && binding.simple.limit === 40 && binding.simple.period === 60
));
assert.deepEqual(translationConfig.secrets.required, ["ZITE_YVP_APP_KEY", "API_BIBLE_KEY"]);
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
  console.log("Online translation reader checks passed: YouVersion, API.Bible and NET provider selection, live passage fallback, server-only credentials, FUMS v3, publisher attribution, rate limiting, offline cache limits, and Android/offline packaging.");
}
