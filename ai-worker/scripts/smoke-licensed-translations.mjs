import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const base = String(process.env.WORKER_URL || "").replace(/\/+$/, "");
const origin = "https://sarkiaimana-cmyk.github.io";
const userAgent = "ZurielLivingWordBible/2.10.3 (+https://sarkiaimana-cmyk.github.io/zuriel-living-word-bible)";
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "zuriel-translation-smoke-"));
let requestNumber = 0;
process.on("exit", () => fs.rmSync(tempDir, { recursive: true, force: true }));

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

async function getJson(requestPath) {
  const bodyPath = path.join(tempDir, "response-" + requestNumber++ + ".json");
  let lastFailure = "no response";
  for (let attempt = 1; attempt <= 8; attempt++) {
    fs.writeFileSync(bodyPath, "");
    const result = spawnSync("curl", [
      "--silent", "--show-error", "--max-time", "20",
      "--user-agent", userAgent,
      "--output", bodyPath,
      "--write-out", "%{http_code}",
      "--header", "Origin: " + origin,
      "--header", "Accept: application/json",
      base + requestPath
    ], { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
    const status = Number(String(result.stdout || "").trim() || "0");
    const raw = fs.readFileSync(bodyPath, "utf8");
    let payload = null;
    if (raw.trim()) {
      try { payload = JSON.parse(raw); }
      catch { throw new Error(requestPath + " returned invalid JSON (HTTP " + status + ")."); }
    }
    if (result.status === 0 && status === 200 && payload) return payload;

    const message = String(payload && payload.error || result.stderr || "no HTTP response");
    if (status !== 0 && ![404, 429, 500, 502, 503, 520, 521, 522, 523, 524, 525, 526].includes(status)) {
      throw new Error(requestPath + " returned HTTP " + status + ": " + message);
    }
    lastFailure = "HTTP " + status + ": " + message;
    if (attempt < 8) await new Promise(resolve => setTimeout(resolve, 3000));
  }
  throw new Error(requestPath + " could not be reached after eight attempts: " + lastFailure);
}

async function loadYouVersionCatalogue() {
  const first = JSON.parse(fs.readFileSync(".translation-smoke.json", "utf8"));
  assert.ok(Array.isArray(first.data), "The verified YouVersion catalogue must contain a data array.");
  const all = [...first.data];
  const seen = new Set();
  let token = typeof first.next_page_token === "string" ? first.next_page_token.trim() : "";
  for (let page = 1; token && page < 10; page++) {
    assert.ok(!seen.has(token), "YouVersion must not repeat a catalogue page token.");
    seen.add(token);
    const payload = await getJson("/api/youversion/bibles?next_page_token=" + encodeURIComponent(token));
    assert.ok(Array.isArray(payload.data), "YouVersion must return a valid English catalogue page.");
    all.push(...payload.data);
    token = typeof payload.next_page_token === "string" ? payload.next_page_token.trim() : "";
  }
  return all;
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
  const requestPath = provider === "youversion"
    ? "/api/youversion/bibles/" + id + "/passages/JHN.3.16?format=text"
    : "/api/api-bible/bibles/" + id + "/chapters/JHN.3";
  const payload = await getJson(requestPath);
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

const youVersion = await loadYouVersionCatalogue();
const apiBible = JSON.parse(fs.readFileSync(".api-bible-smoke.json", "utf8"));
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
console.log("All requested translations passed live catalogue and passage checks.");
