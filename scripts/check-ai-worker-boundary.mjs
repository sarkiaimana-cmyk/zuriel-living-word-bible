import { readFile } from "node:fs/promises";

const [index, home, worker, serviceWorker, deploy, safety, readiness] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../zuriel-home.js", import.meta.url), "utf8"),
  readFile(new URL("../ai-worker/src/index.js", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/deploy-ai-worker.yml", import.meta.url), "utf8"),
  readFile(new URL("../docs/AI-ASSISTANT-SAFETY.md", import.meta.url), "utf8"),
  readFile(new URL("../docs/AI-ASSISTANT-PROVIDER-READINESS.md", import.meta.url), "utf8")
]);

const failures = [];
for (const [label, source] of [
  ["index.html", index],
  ["Home client module", home],
  ["service worker", serviceWorker]
]) {
  if (/TURNSTILE_SECRET|CLOUDFLARE_API_TOKEN|CLOUDFLARE_ACCOUNT_ID|OPENAI_API_KEY|GEMINI_API_KEY/.test(source)) {
    failures.push(label + " must never contain a provider or deployment secret.");
  }
}
if (/\/api\/assistant/.test(index) || /\/api\/assistant/.test(home) || /\/api\/assistant/.test(serviceWorker)) {
  failures.push("The un-deployed AI pilot must not be connected to the app client or service worker.");
}
for (const fragment of [
  "verifyTurnstile(",
  "env.TURNSTILE_SECRET",
  "TURNSTILE_ACTION",
  "corsFor(request, env)",
  "MAX_BODY_BYTES",
  "MAX_QUESTION_CHARS",
  "MAX_VERSES",
  "MAX_OUTPUT_CHARS",
  "AI_RATE_LIMIT.limit",
  "The Scripture text and question as untrusted quoted data",
  "Do not request or infer the reader's private notes",
  "no-store, max-age=0"
]) {
  if (!worker.includes(fragment)) failures.push("AI worker security safeguard is missing: " + fragment);
}
if (/localStorage|sessionStorage|console\.(log|error)|KV_NAMESPACE|D1_DATABASE/.test(worker)) {
  failures.push("The stateless AI pilot must not persist or log prompt/response content.");
}
if (!worker.includes('input.question, input.reference') && !worker.includes('["question", "reference", "turnstileToken"]')) {
  failures.push("The worker must strictly allowlist the question, reference and Turnstile token fields.");
}
if (!deploy.includes("workflow_dispatch:") ||
    !deploy.includes("confirm_deployment") ||
    !deploy.includes("inputs.confirm_deployment == true")) {
  failures.push("AI deployment must remain manual and require an explicit confirmation input.");
}
if (!deploy.includes("npm test") || !deploy.includes("npm run check:scripture")) {
  failures.push("AI deployment must run backend and full-KJV validation before deployment.");
}
if (!safety.includes("It is not deployed") || !safety.includes("no live chat feature is connected to the app")) {
  failures.push("AI safety documentation must accurately disclose that the pilot is not live or connected.");
}
if (!readiness.includes("Workers Free") || !readiness.includes("Do not enable paid billing")) {
  failures.push("AI provider readiness must preserve the no-paid-plan decision gate.");
}
if (failures.length) {
  console.error("AI client/backend boundary checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("AI client/backend boundary checks passed: no client secrets or live endpoint, stateless server, mandatory Turnstile, rate/size/output limits, private-data exclusion and manual deployment gate.");
}
