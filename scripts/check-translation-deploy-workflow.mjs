import assert from "node:assert/strict";
import fs from "node:fs";

const workflow = fs.readFileSync(".github/workflows/deploy-translations-worker.yml", "utf8");
const worker = fs.readFileSync("ai-worker/src/translation-worker.js", "utf8");
const config = JSON.parse(fs.readFileSync("ai-worker/wrangler.translations.jsonc", "utf8"));

assert.match(workflow, /workflow_dispatch:/, "translation deployment remains manual");
assert.match(workflow, /confirm_deployment == true/, "deployment requires explicit confirmation");
for (const secret of ["CLOUDFLARE_API_TOKEN", "CLOUDFLARE_ACCOUNT_ID", "ZITE_YVP_APP_KEY"]) {
  assert.ok(workflow.includes("secrets." + secret), "deployment requires the " + secret + " repository secret");
}
assert.match(workflow, /workers\/subdomain/, "deployment discovers the account workers.dev subdomain");
assert.match(workflow, /workers\/scripts\/zuriel-bible-translations\/subdomain/, "deployment verifies the Worker route is enabled");
assert.match(workflow, /\/api\/youversion\/bibles/, "deployment smoke-tests the same version-list route used by the app");
assert.match(workflow, /access-control-allow-origin: https:\/\/sarkiaimana-cmyk\.github\.io/i, "deployment checks GitHub Pages CORS");
assert.match(workflow, /Worker URL: \$WORKER_URL/, "deployment reports the exact URL to configure in the app");
assert.match(workflow, /Authorised Bible versions returned:/, "deployment reports the number of publisher-authorised versions");
assert.ok(!/echo[^\n]*\$CLOUDFLARE_API_TOKEN/i.test(workflow), "workflow must never print the Cloudflare API token");
assert.ok(!/echo[^\n]*\$ZITE_YVP_APP_KEY/i.test(workflow), "workflow must never print the YouVersion app key");

assert.equal(config.name, "zuriel-bible-translations", "Worker name matches the discovered URL");
assert.ok(config.vars.ALLOWED_ORIGINS.includes("https://sarkiaimana-cmyk.github.io"), "GitHub Pages is an allowed CORS origin");
assert.ok(config.ratelimits.some(item => item.name === "TRANSLATION_RATE_LIMIT"), "Worker retains its rate-limit binding");
assert.match(worker, /api\\\/youversion\\\/bibles/, "Worker exposes only the YouVersion translation route");

console.log("Translation deployment checks passed: manual confirmation, secret safety, workers.dev URL discovery, route/CORS smoke test and rate-limit configuration.");
