# Zuriel AI Assistant — backend pilot (not deployed)

This folder contains a server-side, stateless pilot endpoint. It is deliberately not connected to the Android app and is not deployed.

## What this pilot does

- Uses Cloudflare Workers AI with `@cf/google/gemma-4-26b-a4b-it`.
- Accepts only a question, a single KJV reference and a one-time Turnstile token; it does not accept notes, journal entries, testimony, backups, or conversation history.
- Retrieves the exact selected verse text from chapter assets generated from Zuriel's bundled KJV JSON.
- Returns source Scripture separately from a clearly labelled AI-generated explanation.
- Limits a request to eight verses, a 1,200-character question and 600 model output tokens.
- Applies a five-request-per-minute approximate per-IP rate limit.
- Requires an exact allowlisted Origin and a server-verified, single-use Cloudflare Turnstile token with the expected action and hostname.
- Fails closed if the AI, asset, rate-limit or Turnstile configuration is missing.
- Does not store prompts, answers, notes, or chat history and sends no request/response bodies to logs.

The endpoint is an initial passage-explanation pilot. It does not yet support topical search, conversation history, translation comparison, external web retrieval, original-language research, or AI-generated cross-references.

## Secure YouVersion Bible text proxy

The shared server-side handler includes a YouVersion Platform proxy for the future multi-translation reader. The production translation-only entry point is `src/translation-worker.js`, deployed separately with `wrangler.translations.jsonc`.

- `GET /api/youversion/bibles` lists English Bible versions returned to the registered app key. The proxy does not request `all_available=true`, so it does not deliberately expose versions outside the app's licensed list.
- `GET /api/youversion/bibles/{versionId}/passages/{USFM}` retrieves a single passage or chapter. The `format` query may be `html` or `text`.
- The app key is read only from the Worker secret `ZITE_YVP_APP_KEY`; it is never accepted from the client or returned in a response.
- Requests are origin-checked, rate-limited, time-bounded and returned with `no-store` headers.
- Publisher copyright and promotional attribution are returned with passage content. Do not save licensed passages for offline use unless the exact publisher licence expressly permits it.
- The dedicated translation Worker exposes no AI route and does not require the AI pilot's Turnstile configuration or AI binding.
- The client-side reader offers an explicit online comparison panel. It requests passage text only after the user chooses a version and presses Load; it does not persist online text. The bundled KJV remains available offline.

The translation-only Worker remains undeployed until the Cloudflare account owner has confirmed the Free plan, added the scoped Cloudflare credentials and YouVersion app key as GitHub Actions secrets, and confirmed the publisher rights and attribution for the returned versions. See `DEPLOYMENT.md` for the manual deployment steps.
## Scripture asset preparation

From the repository root:

```bash
node ai-worker/scripts/prepare-scripture-assets.mjs --check
node ai-worker/scripts/prepare-scripture-assets.mjs
```

The first command verifies all 66 books, 1,189 chapters and every verse without writing files. The second generates the static chapter assets in `ai-worker/public/`. These assets are derived from the exact KJV JSON already used by Zuriel; do not substitute another Bible dataset.

## Local tests

From the repository root:

```bash
cd ai-worker && npm test
```

This runs the AI boundary tests, the shared YouVersion proxy tests and the translation-only Worker isolation tests.

## Turnstile protection

The API does not accept a public request based on CORS alone. Before deployment, create a Turnstile widget in the Cloudflare dashboard:
- Use Managed mode initially.
- Add the Android WebView hostname `localhost` and only verified production web hostnames.
- Set the widget action to `zuriel_ai_question`.
- Put the public sitekey in `TURNSTILE_SITE_KEY` in `wrangler.jsonc` (it is not a secret).
- Store the private secret only as the Worker secret `TURNSTILE_SECRET`; never place it in this repository or the APK.
- Set `TURNSTILE_HOSTNAMES` to the exact hostname(s) returned by Siteverify.

Every question must present a fresh token. Tokens are single-use and expire after five minutes. The Worker verifies each token server-side and rejects a failed, expired, reused, wrong-action or wrong-hostname token. The Android WebView must allow JavaScript, DOM storage, cookies and network access to `challenges.cloudflare.com`; test this on the actual device before enabling the assistant.

## Deployment gate

Do not deploy or connect this endpoint until:
1. The account owner confirms Cloudflare Workers Free and the Workers AI daily Free allocation are active; do not upgrade to Workers Paid.
2. The exact Gemma model is available under the account's free allowance.
3. A Turnstile widget is created; its public sitekey and exact hostname list are configured, and its secret is stored as a Worker secret.
4. The real app origins are confirmed and entered in `ALLOWED_ORIGINS` (keep `https://localhost` for the Android WebView; add only verified production origins).
5. A deployment process using GitHub Actions secrets or Cloudflare's dashboard is configured. Never commit Cloudflare tokens or account secrets.
6. Security, citation, quota, abuse, provider outage and Android integration tests pass.

The configured Rate Limiting API counter is approximate and per Cloudflare location. It is an abuse-control layer, not a global spend guarantee. The Free AI daily allocation is the inference quota; do not enable paid billing to bypass it.

This pilot has not been independently penetration-tested. Keep it private/unlinked until account-level controls and deployment are verified.
