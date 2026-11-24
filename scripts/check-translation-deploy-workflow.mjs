import assert from "node:assert/strict";
import fs from "node:fs";

const workflow = fs.readFileSync(".github/workflows/deploy-translations-worker.yml", "utf8");
const worker = fs.readFileSync("ai-worker/src/translation-worker.js", "utf8");
const config = JSON.parse(fs.readFileSync("ai-worker/wrangler.translations.jsonc", "utf8"));

assert.match(workflow, /workflow_dispatch:/, "translation deployment remains manual");
assert.match(workflow, /confirm_deployment == true/, "deployment requires explicit confirmation");
assert.match(workflow, /github\.ref != 'refs\/heads\/fix\/mobile-search-study-layout'/, "deployment is restricted to the reviewed integration branch");
assert.equal(workflow.split("\n").filter(line => /\\\\$/.test(line)).length, 0,
  "deployment shell commands must use single backslashes for line continuations");
assert.ok(workflow.indexOf("Require the reviewed integration branch before any Cloudflare changes") < workflow.indexOf("Bootstrap the fail-closed Worker"), "branch guard runs before Cloudflare changes");
assert.match(workflow, /actions: write/, "deployment can dispatch the follow-up validation workflow");
assert.match(workflow, /GH_TOKEN: \$\{\{ github\.token \}\}/, "GitHub CLI receives the scoped workflow token");
for (const secret of ["CLOUDFLARE_API_TOKEN", "CLOUDFLARE_ACCOUNT_ID", "ZITE_YVP_APP_KEY", "API_BIBLE_KEY"]) {
  assert.ok(workflow.includes("secrets." + secret), "deployment requires the " + secret + " repository secret");
}
assert.match(workflow, /wrangler secret list/, "deployment checks whether provider secrets already exist on the target Worker");
assert.match(workflow, /HAS_YVP_KEY/, "deployment can reuse an existing YouVersion Worker secret");
assert.match(workflow, /HAS_API_BIBLE_KEY/, "deployment can reuse an existing API.Bible Worker secret");
assert.match(workflow, /Add API_BIBLE_KEY as a GitHub Actions secret or install that exact secret/, "deployment gives a direct fallback when the API.Bible secret is absent");
for (const secret of ["ZITE_YVP_APP_KEY", "API_BIBLE_KEY"]) {
  assert.ok(config.secrets.required.includes(secret), "Wrangler marks " + secret + " as required");
  assert.match(workflow, new RegExp("secret put " + secret), "deployment installs " + secret + " only as a Worker secret");
}
assert.match(workflow, /test\/api-bible\.test\.mjs/, "deployment runs API.Bible provider security tests");
assert.match(workflow, /smoke-licensed-translations\.mjs/, "deployment live-tests every requested translation");
assert.match(workflow, /node --check scripts\/smoke-licensed-translations\.mjs/, "deployment syntax-checks the live translation smoke test");
assert.match(workflow, /workers\/subdomain/, "deployment discovers the account workers.dev subdomain");
assert.match(workflow, /workers\/scripts\/zuriel-bible-translations\/subdomain/, "deployment verifies the Worker route");
assert.ok(workflow.includes("--data '{\"enabled\":true}'"), "deployment enables the workers.dev route automatically when needed");
assert.match(workflow, /\/api\/youversion\/bibles/, "deployment smoke-tests the YouVersion version-list route");
assert.match(workflow, /\/api\/youversion\/bibles\/\$YVP_BIBLE_ID\/passages\/JHN\.3\.16\?format=text/, "deployment retrieves a real authorised YouVersion passage");
assert.match(workflow, /j\.passage\.content.*j\.passage\.reference.*j\.version\?\.id/, "deployment requires YouVersion passage text and metadata");
assert.match(workflow, /j\.passage\.copyright.*j\.passage\.promotional_content/, "deployment requires YouVersion publisher attribution");
assert.match(workflow, /\/api\/api-bible\/bibles/, "deployment smoke-tests API.Bible");
assert.ok(workflow.includes(String.raw`/^[a-f0-9]{16}-\d{2}$/i.test(id)`), "API.Bible smoke test recognises the documented Bible ID format");
assert.match(workflow, /\/chapters\/JHN\.3/, "deployment retrieves a real API.Bible chapter");
assert.match(workflow, /j\.passage\.copyright/, "deployment requires API.Bible publisher attribution");
assert.match(workflow, /j\.meta\?\.fumsToken/, "deployment requires API.Bible FUMS v3 reporting token");
assert.match(workflow, /catalogue worked, but live John/, "deployment distinguishes catalogue success from chapter retrieval failure");
assert.match(workflow, /access-control-allow-origin: https:\/\/sarkiaimana-cmyk\.github\.io/i, "deployment checks GitHub Pages CORS");
assert.match(workflow, /Worker URL: \$WORKER_URL/, "deployment reports the exact verified Worker URL");
assert.match(workflow, /contents: write/, "deployment can save the verified public endpoint");
assert.match(workflow, /translationApiBase=process\.env\.WORKER_URL/, "deployment writes the verified Worker URL into version.json");
assert.ok(workflow.includes('JSON.stringify(data,null,2)+"\\n"'), "deployment writes a valid JSON newline when saving version.json");
assert.match(workflow, /git push origin "HEAD:\$GITHUB_REF_NAME"/, "deployment commits the endpoint to the reviewed integration branch");
assert.match(workflow, /gh workflow run validate-pr\.yml --ref "\$GITHUB_REF_NAME"/, "deployment dispatches full validation after endpoint configuration");
assert.match(workflow, /raw\.githubusercontent\.com\/sarkiaimana-cmyk\/zuriel-living-word-bible\/\$GITHUB_REF_NAME\/version\.json/, "deployment verifies endpoint metadata on the same integration branch");
assert.match(workflow, /REMOTE_CONFIG/, "deployment verifies the public release metadata after saving");
assert.match(workflow, /Authorised Bible versions returned:/, "deployment reports the number of publisher-authorised versions");
assert.match(workflow, /VERSION_COUNT.*-lt 1/, "deployment refuses to activate without authorised English versions");
assert.match(workflow, /API_BIBLE_COUNT.*-lt 1/, "deployment refuses to activate without API.Bible English versions");
assert.ok(!/echo[^\n]*\$CLOUDFLARE_API_TOKEN/i.test(workflow), "workflow must never print the Cloudflare API token");
assert.ok(!/echo[^\n]*\$ZITE_YVP_APP_KEY/i.test(workflow), "workflow must never print the YouVersion app key");
assert.ok(!/echo[^\n]*\$API_BIBLE_KEY/i.test(workflow), "workflow must never print the API.Bible key");

assert.equal(config.name, "zuriel-bible-translations", "Worker name matches the discovered URL");
assert.ok(config.vars.ALLOWED_ORIGINS.includes("https://sarkiaimana-cmyk.github.io"), "GitHub Pages is an allowed CORS origin");
assert.ok(config.ratelimits.some(item => item.name === "TRANSLATION_RATE_LIMIT" && item.simple.limit === 40 && item.simple.period === 60), "Worker retains the complete-catalogue smoke-test rate limit");
assert.ok(worker.includes("(?:youversion|api-bible)"), "Worker allows only the YouVersion and API.Bible translation routes");

console.log("Translation deployment checks passed: manual confirmation, both provider secrets, live chapter and FUMS checks, protected-branch endpoint handoff, CORS and rate-limit safeguards.");
