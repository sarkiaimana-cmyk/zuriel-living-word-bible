# Zuriel AI Assistant — provider readiness review

**Review date:** 2026-11-16  
**Decision:** Cloudflare Workers + Workers AI is the preferred candidate for a tightly capped, no-cost pilot. It is not yet deployed, connected to Zuriel, or approved for public production use.

## Requirements that must not be traded away

Zuriel is intended to remain free, non-commercial, family-accessible, privacy-conscious and useful offline. The AI Assistant must:
- use a server-side proxy; never place provider keys or account tokens in browser code, service-worker assets, repository files or APK assets;
- retrieve verified Bible passages and validate every citation before displaying it;
- label generated explanations separately from Scripture and source material;
- send only the selected passage and the user's explicit question by default;
- never upload prayer journals, testimony, reading history, notes, saved insights or backups unless a separate, explicit opt-in is later designed and approved;
- remain honestly unavailable offline while the Bible reader, local search, reading plans and Personal Study Space continue to work;
- have request limits, rate limits, abuse controls, timeouts, usage caps and a clear provider-failure path;
- never silently switch to a paid plan or paid model.

## Provider and hosting findings

### Google Gemini Developer API — not suitable for the general-public Zuriel app under the reviewed terms

Google's Gemini API Additional Terms state that the services may not be used as part of an API client directed to, or likely to be accessed by, individuals under 18. Zuriel is intended as a general-public Bible app and may be used by younger readers. The free API tier also states that submitted content may be used to improve Google's products. These terms and data practices make this a poor fit unless Google provides written terms that expressly resolve both concerns.

Official references:
- https://ai.google.dev/gemini-api/terms
- https://ai.google.dev/gemini-api/docs/pricing

### GroqCloud — possible alternative, not selected for the first pilot

Groq's data documentation describes default non-retention for inference inputs and outputs with limited operational exceptions; eligible customers may enable Zero Data Retention. Its free tier is rate-limited and quotas/model availability can change. Current terms, model licences, age suitability, regional access and public-production reliability would need a separate review before use.

Official references:
- https://console.groq.com/docs/your-data
- https://console.groq.com/docs/rate-limits
- https://console.groq.com/docs/billing-faqs
- https://console.groq.com/docs/legal/services-agreement

### Cloudflare Workers + Workers AI — preferred candidate for a bounded pilot

Cloudflare Workers can host the server-side proxy. The current Workers Free plan documents 100,000 requests per day and 10 ms CPU time per invocation. The Workers Paid plan has a $5 USD monthly minimum, so the Zuriel pilot must remain on the Free plan and must not be upgraded without a separate, explicit budget decision.

Workers AI is included in the Workers Free plan with a daily allowance of **10,000 Neurons at no charge**. The allowance resets at 00:00 UTC; when the Free allowance is exhausted, further inference operations fail. The project must not enable the Paid plan to bypass this limit. Current model pricing lists `@cf/google/gemma-4-26b-a4b-it` at 9,091 Neurons per million input tokens and 27,273 Neurons per million output tokens. Actual usage must be measured in a small pilot; do not promise a fixed number of user questions per day.

Cloudflare's model page identifies Gemma 4 26B A4B as hosted by Cloudflare and marks it as supporting zero data retention. Google's Gemma 4 model is published under Apache License 2.0; distribution and attribution notices must be handled correctly if model materials are ever redistributed. The selected model is not a Bible source and must never be treated as one.

Cloudflare's Workers AI data-usage policy says standard, non-stateful inference inputs and outputs are processed only as needed to deliver the response and are not retained afterwards, subject to limited legal/operational exceptions. Cloudflare says it does not use Workers AI customer content to train AI models. This protection does not apply to content the application deliberately writes to storage, logs, or caches. The proxy must therefore avoid request/response body logging, storage, caching, conversation persistence and analytics containing prompts.

Cloudflare's Rate Limiting API can apply approximate per-key limits in 10- or 60-second windows, separately within each Cloudflare location. The pilot should rate-limit by the connecting client IP and apply strict request-size and output-token limits. Because those counters are approximate and regional, they are an abuse-control layer, not a hard global spend cap. The Workers AI daily Free allocation is the separate inference ceiling.

Secrets must be configured using Cloudflare Worker Secrets, not plaintext Wrangler variables or source code. The browser and APK must never receive Cloudflare account credentials.

**Pilot decision:** proceed with a server-side prototype and test harness only after the Cloudflare account owner has confirmed that the account remains on the Free plan and the exact model is available under the Free allocation. Do not add the assistant screen to the Android app or expose a public endpoint until the backend has passed its security, grounding, quota and outage tests. No personal study records may be sent by default.

Official references (reviewed 2026-11-16):
- Workers Free limits: https://developers.cloudflare.com/workers/platform/limits/
- Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Workers AI pricing and daily Free allocation: https://developers.cloudflare.com/workers-ai/platform/pricing/
- Workers AI data usage and retention: https://developers.cloudflare.com/workers-ai/platform/data-usage/
- Gemma 4 model details and model-specific zero-retention label: https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/
- Gemma 4 Apache 2.0 licence: https://ai.google.dev/gemma/apache_2
- Workers Rate Limiting API: https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
- Workers Secrets: https://developers.cloudflare.com/workers/configuration/secrets/

### Cloudflare Turnstile — free bot-abuse protection for the pilot

Cloudflare Turnstile has a Free plan with unlimited challenges and verification requests, up to 20 widgets per account and 10 hostnames per widget. It can be used independently of other Cloudflare services. The pilot requires a Managed widget and mandatory server-side Siteverify validation; client-side widget success alone is not sufficient. Tokens are single-use and expire after five minutes.

Turnstile supports Android WebViews, provided JavaScript and DOM storage are enabled and the WebView can access `challenges.cloudflare.com`, required frames, cookies and local storage. This must be verified on the actual Android device before the AI feature is enabled.

The sitekey is public and may be stored in app configuration. The secret must remain a Cloudflare Worker Secret and must never enter the repository or APK. Siteverify must check both the configured hostname and the fixed action `zuriel_ai_question`.

Official references:
- Turnstile Free plan: https://developers.cloudflare.com/turnstile/plans/
- Get started and mandatory server validation: https://developers.cloudflare.com/turnstile/get-started/
- Siteverify token validation: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- Android WebView requirements: https://developers.cloudflare.com/turnstile/get-started/mobile-implementation/

### OpenAI API — technically possible, but usage is metered

OpenAI publishes per-model token pricing. This is a pay-for-usage service, not a dependable no-cost inference allowance for Zuriel. It should not be selected unless a sustainable budget and spending cap are separately approved.

Official reference:
- https://developers.openai.com/api/docs/pricing

## Current engineering decision

1. Keep Cloudflare Workers + Workers AI as the preferred **pilot candidate**, not a production commitment.
2. Do not add any provider key, Cloudflare account token or secret to the app, repository or chat.
3. Do not connect a browser-direct API call.
4. Do not select Gemini for a public family-accessible app under the reviewed terms.
5. Do not send personal study records or private notes to any model by default.
6. Keep AI unavailable rather than simulate answers when the backend is missing, offline, rate-limited or out of quota.
7. Do not enable paid billing or upgrade to Workers Paid without a separately approved budget.

## Evidence required before the assistant can be connected to the app

- Cloudflare account confirmed on the Free plan; exact Gemma model available under the daily Free allocation.
- Server-side Worker deployed with secrets configured outside the repository.
- Rate limiting, request-size limits, output limits, timeouts, no-body-logging and server-verified Turnstile protection verified.
- Verified Scripture retrieval and citation validation tested against Zuriel's exact local KJV dataset; no model-generated Bible quotations accepted as source text.
- Prompt-injection, privacy, timeout, malformed-response, quota-exhaustion and offline tests passed.
- User-facing provider/data disclosure and explicit consent before any personal content could ever be shared.
- Android online/offline integration tests passed; the reader and all personal study features remain functional if AI is unavailable.

**Conclusion:** The AI Assistant is progressing from provider research toward a bounded backend pilot. It is not abandoned, but no live chat feature or API integration is enabled yet. The app remains free-first, offline-capable and independent of the AI service.