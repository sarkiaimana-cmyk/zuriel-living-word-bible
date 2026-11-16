# Zuriel AI Assistant — backend pilot (not deployed)

This folder contains a server-side, stateless pilot endpoint. It is deliberately not connected to the Android app and is not deployed.

## What this pilot does

- Uses Cloudflare Workers AI with `@cf/google/gemma-4-26b-a4b-it`.
- Accepts only a question and a single KJV reference; it does not accept notes, journal entries, testimony, backups, or conversation history.
- Retrieves the exact selected verse text from chapter assets generated from Zuriel's bundled KJV JSON.
- Returns source Scripture separately from a clearly labelled AI-generated explanation.
- Limits a request to eight verses, a 1,200-character question and 600 model output tokens.
- Applies a five-request-per-minute approximate per-IP rate limit.
- Requires an exact allowlisted Origin and fails closed if the AI, asset or rate-limit bindings are missing.
- Does not store prompts, answers, notes, or chat history and sends no request/response bodies to logs.

The endpoint is an initial passage-explanation pilot. It does not yet support topical search, conversation history, translation comparison, external web retrieval, original-language research, or AI-generated cross-references.

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
node --test ai-worker/test/worker.test.mjs
```

## Deployment gate

Do not deploy or connect this endpoint until:
1. The account owner confirms Cloudflare Workers Free and the Workers AI daily Free allocation are active; do not upgrade to Workers Paid.
2. The exact Gemma model is available under the account's free allowance.
3. The real app origins are confirmed and entered in `ALLOWED_ORIGINS` (keep `https://localhost` for the Android WebView; add only verified production origins).
4. A deployment process using GitHub Actions secrets or Cloudflare's dashboard is configured. Never commit Cloudflare tokens or account secrets.
5. Security, citation, quota, abuse, provider outage and Android integration tests pass.

The configured Rate Limiting API counter is approximate and per Cloudflare location. It is an abuse-control layer, not a global spend guarantee. The Free AI daily allocation is the inference quota; do not enable paid billing to bypass it.

This pilot has not been independently penetration-tested. Keep it private/unlinked until account-level controls and deployment are verified.
