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
assert.ok(workflow.includes("secrets.API_BIBLE_KEY"), "deployment accepts the optional API.Bible repository secret");
assert.match(workflow, /secret put API_BIBLE_KEY/, "deployment installs the optional API.Bible key only as a Worker secret");
assert.match(workflow, /test\/api-bible\.test\.mjs/, "deployment runs API.Bible provider security tests");
assert.match(workflow, /workers\/subdomain/, "deployment discovers the account workers.dev subdomain");
assert.match(workflow, /workers\/scripts\/zuriel-bible-translations\/subdomain/, "deployment verifies the Worker route is enabled");
assert.match(workflow, /\/api\/youversion\/bibles/, "deployment smoke-tests the same version-list route used by the app");
assert.match(workflow, /access-control-allow-origin: https:\/\/sarkiaimana-cmyk\.github\.io/i, "deployment checks GitHub Pages CORS");
assert.match(workflow, /Worker URL: \$WORKER_URL/, "deployment reports the exact URL to configure in the app");
assert.match(workflow, /contents: write/, "deployment may save the verified public endpoint to release metadata");
assert.match(workflow, /translationApiBase=process\.env\.WORKER_URL/, "deployment writes the verified Worker URL into version.json");
assert.ok(workflow.includes('JSON.stringify(data,null,2)+"\\n"'), "deployment writes a valid JSON newline when saving version.json");
assert.match(workflow, /git push origin HEAD:main/, "deployment commits the endpoint configuration automatically");
assert.match(workflow, /REMOTE_CONFIG/, "deployment verifies the public release metadata after saving");
assert.match(workflow, /Authorised Bible versions returned:/, "deployment reports the number of publisher-authorised versions");
assert.match(workflow, /VERSION_COUNT.*-lt 1/, "deployment refuses to activate when no English versions are authorised");
assert.ok(!/echo[^\n]*\$CLOUDFLARE_API_TOKEN/i.test(workflow), "workflow must never print the Cloudflare API token");
assert.ok(!/echo[^\n]*\$ZITE_YVP_APP_KEY/i.test(workflow), "workflow must never print the YouVersion app key");
assert.ok(!/echo[^\n]*\$API_BIBLE_KEY/i.test(workflow), "workflow must never print the API.Bible key");

assert.equal(config.name, "zuriel-bible-translations", "Worker name matches the discovered URL");
assert.ok(config.vars.ALLOWED_ORIGINS.includes("https://sarkiaimana-cmyk.github.io"), "GitHub Pages is an allowed CORS origin");
assert.ok(config.ratelimits.some(item => item.name === "TRANSLATION_RATE_LIMIT"), "Worker retains its rate-limit binding");
assert.ok(worker.includes("(?:youversion|api-bible)"), "Worker allows only the YouVersion and API.Bible translation routes");

console.log("Translation deployment checks passed: manual confirmation, YouVersion and optional API.Bible secret safety, workers.dev URL discovery, route/CORS smoke test and rate-limit configuration.");
