import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

const base = String(process.env.WORKER_URL || "").replace(/\/+$/, "");
const origin = "https://sarkiaimana-cmyk.github.io";
const requested = {
  GNT: /\b(GNT|GNB|GOOD NEWS TRANSLATION|GOOD NEWS BIBLE)\b/i,
  AMP: /\b(AMP|AMPLIFIED BIBLE)\b/i,
  "LB/LT": /\b(LB|LT|TLB|LIVING BIBLE|LIVING TRANSLATION)\b/i,
  TPT: /\b(TPT|PASSION TRANSLATION)\b/i,
  NLT: /\b(NLT|NEW LIVING TRANSLATION)\b/i,
  NET: /\b(NET|NEW ENGLISH TRANSLATION)\b/i,
  NIV: /\b(NIV|NEW INTERNATIONAL VERSION)\b/i,
  ESV: /\b(ESV|ENGLISH STANDARD VERSION)\b/i,
  NASB: /\b(NASB|NEW AMERICAN STANDARD BIBLE)\b/i,
  CSB: /\b(CSB|CHRISTIAN STANDARD BIBLE|HCSB)\b/i,
  NKJV: /\b(NKJV|NEW KING JAMES VERSION)\b/i
};

assert.ok(/^https:\/\/zuriel-bible-translations\.[a-z0-9-]+\.workers\.dev$/i.test(base),
  "WORKER_URL must be the verified Zuriel translation Worker workers.dev endpoint.");

async function getJson(path) {
  let lastFailure = "no response";
  for (let attempt = 1; attempt <= 8; attempt++) {
    const result = spawnSync("curl", [
      "--silent", "--show-error", "--max-time", "20",
      "--user-agent", "ZurielLivingWordBible/2.10.3 (+https://sarkiaimana-cmyk.github.io/zuriel-living-word-bible)",
      "--output", "-",
      "--write-out", "\\n__HTTP_STATUS__%{http_code}",
      "--header", "Origin: " + origin,
      "--header", "Accept: application/json",
      base + path
    ], { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });

    if (result.error) {
      lastFailure = result.error.message;
    } else {
      const marker = result.stdout.lastIndexOf("\\n__HTTP_STATUS__");
      if (marker >= 0) {
        const status = Number(result.stdout.slice(marker + "\\n__HTTP_STATUS__".length).trim());
        const raw = result.stdout.slice(0, marker).trim();
        let payload;
        try { payload = JSON.parse(raw); }
        catch { throw new Error(path + " returned invalid JSON (HTTP " + status + ")."); }

        if (status === 200) return payload;
        const message = String(payload && payload.error || "provider request failed");
        if (![0, 404, 429, 500, 502, 503, 520, 521, 522, 523, 524, 525, 526].includes(status)) {
          throw new Error(path + " returned HTTP " + status + ": " + message);
        }
        lastFailure = "HTTP " + status + ": " + message;
      } else {
        lastFailure = String(result.stderr || "curl returned no HTTP response.");
      }
    }

    if (attempt < 8) await new Promise(resolve => setTimeout(resolve, 3000));
  }
  throw new Error(path + " could not be reached after eight readiness attempts: " + lastFailure);
}

async function loadYouVersionCatalogue() {
  const all = [];
  const seen = new Set();
  let token = "";
  for (let page = 0; page < 10; page++) {
    const path = "/api/youversion/bibles" +
      (token ? "?next_page_token=" + encodeURIComponent(token) : "");
    const payload = await getJson(path);
    assert.ok(Array.isArray(payload.data), "YouVersion must return its licensed English catalogue.");
    all.push(...payload.data);
    const next = typeof payload.next_page_token === "string" ? payload.next_page_token.trim() : "";
    if (!next) return all;
    assert.ok(!seen.has(next), "YouVersion must not repeat a catalogue page token.");
    seen.add(next);
    token = next;
  }
  throw new Error("YouVersion catalogue exceeded the app's ten-page safety limit.");
}

function findVersion(catalogue, abbreviation, pattern) {
  const exact = catalogue.find(item =>
    String(item.abbreviation || "").trim().toUpperCase() === abbreviation);
  if (exact) return exact;
  return catalogue.find(item => pattern.test(
    String(item.abbreviation || "") + " " + String(item.title || "")));
}

async function verifyPassage(provider, version) {
  const id = encodeURIComponent(String(version.id));
  const path = provider === "youversion"
    ? "/api/youversion/bibles/" + id + "/passages/JHN.3.16?format=text"
    : "/api/api-bible/bibles/" + id + "/chapters/JHN.3";
  const payload = await getJson(path);
  const passage = payload && payload.passage;
  assert.ok(passage && typeof passage.content === "string" && passage.content.trim(),
    provider + " must return actual Scripture text.");
  assert.ok(typeof passage.reference === "string" && passage.reference.trim(),
    provider + " must return the passage reference.");
  assert.ok(passage.copyright || passage.promotional_content,
    provider + " must return publisher attribution.");
  if (provider === "api-bible") {
    assert.ok(payload.meta && typeof payload.meta.fumsToken === "string" && payload.meta.fumsToken.trim(),
      "API.Bible must return the FUMS v3 token for every tested chapter.");
  }
  return passage.reference;
}

const [youVersion, apiBible] = await Promise.all([
  loadYouVersionCatalogue(),
  getJson("/api/api-bible/bibles")
]);
assert.ok(youVersion.length > 0, "YouVersion must return at least one licensed English Bible.");
assert.ok(Array.isArray(apiBible.data) && apiBible.data.length > 0,
  "API.Bible must return at least one licensed English Bible.");

const catalogues = [
  ["youversion", youVersion],
  ["api-bible", apiBible.data]
];
const missing = [];
for (const [abbreviation, pattern] of Object.entries(requested)) {
  let verified = false;
  const failures = [];
  for (const [provider, catalogue] of catalogues) {
    const version = findVersion(catalogue, abbreviation, pattern);
    if (!version) continue;
    try {
      const reference = await verifyPassage(provider, version);
      console.log("VERIFIED " + abbreviation + " via " +
        (provider === "youversion" ? "YouVersion" : "API.Bible") +
        " — " + reference + " (" + String(version.title || abbreviation) + ")");
      verified = true;
      break;
    } catch (error) {
      failures.push(provider + ": " + error.message);
    }
  }
  if (!verified) {
    missing.push(abbreviation + (failures.length ? " (" + failures.join(" | ") + ")" : ""));
  }
}

assert.deepEqual(missing, [],
  "Every requested non-KJV translation must be listed by at least one provider and return a real, attributed John 3 passage. Missing: " + missing.join(", "));
console.log("KJV remains covered by the separately verified offline 66-book corpus.");
console.log("All 11 requested translations passed live catalogue and passage checks.");
