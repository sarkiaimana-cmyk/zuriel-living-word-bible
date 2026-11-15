# Zuriel AI Assistant — provider readiness review

**Review date:** 2026-11-15  
**Decision:** No provider selected; live AI integration remains gated.

## Requirements that must not be traded away

Zuriel is intended to remain free, non-commercial, family-accessible, privacy-conscious and useful offline. The AI Assistant must:
- use a server-side proxy; never place provider keys in browser code, service-worker assets, repository files or APK assets;
- retrieve verified Bible passages and validate every citation before displaying it;
- label generated explanations separately from Scripture and source material;
- send only the selected passage and the user's explicit question by default;
- never upload prayer journals, testimony, reading history, notes, saved insights or backups unless a separate, explicit opt-in is later designed and approved;
- remain honestly unavailable offline while the Bible reader, local search, reading plans and Personal Study Space continue to work;
- have request limits, rate limits, abuse controls, timeouts, spend controls and a clear provider-failure path.

## Provider and hosting findings

### Google Gemini Developer API — not suitable for the general-public Zuriel app under the reviewed terms

Google's current Gemini API Additional Terms state that the services may not be used as part of an API client directed to, or likely to be accessed by, individuals under 18. Zuriel is intended as a general-public Bible app and may be used by younger readers. The free API tier also states that submitted content may be used to improve Google's products. These terms and data practices make this a poor fit for the app's family-accessible and privacy requirements unless Google provides written terms that expressly resolve both concerns.

Official references:
- https://ai.google.dev/gemini-api/terms
- https://ai.google.dev/gemini-api/docs/pricing

### GroqCloud — possible limited pilot candidate, not yet approved for production

Groq's current data documentation says inference inputs and outputs are not retained by default, with limited exceptions for reliability and abuse monitoring; eligible customers may enable Zero Data Retention. Its free tier is rate-limited, and its paid Developer tier requires a payment method. Free-tier quotas, model availability, acceptable-use requirements, age suitability, production reliability and any applicable third-party model terms must be verified before a public launch.

Official references:
- https://console.groq.com/docs/your-data
- https://console.groq.com/docs/rate-limits
- https://console.groq.com/docs/billing-faqs
- https://console.groq.com/docs/legal/services-agreement

### Cloudflare Workers and Workers AI — separate hosting and inference products; possible no-cost pilot candidate

Cloudflare **Workers** can host the server-side proxy. Its current Free plan documents 100,000 requests per day and 10 ms CPU time per invocation. The Paid Workers plan has a stated $5 USD monthly minimum, so Zuriel must remain on the Free plan unless a budget is separately approved.

Cloudflare **Workers AI** is a separate inference product; it does provide hosted models. Its current free allocation is 10,000 Neurons per day, with usage above that allocation requiring the Paid Workers plan. The Free plan must be kept in place and limits must be tested; the application should fail closed when quota is exhausted rather than trigger a paid upgrade.

A promising model to evaluate is Google's `@cf/google/gemma-4-26b-a4b-it`. Cloudflare's model page lists zero data retention, a 256,000-token context window and unit pricing of $0.10 per million input tokens and $0.30 per million output tokens. Google's Gemma 4 model licence is Apache 2.0. The Workers AI data-usage policy says standard inference inputs and outputs are not retained after processing and are not used to train AI models. These statements do not cover content deliberately written to storage or logs, so the proxy must not log or persist prompts or responses.

This is a **candidate for a small, bounded pilot, not an approved production provider**. Before selecting it, verify that this exact model is available under the account's Workers AI Free allocation, test real quota consumption and response quality, review applicable Cloudflare terms, and deploy abuse/rate limits. The model and free allocation may change. No personal study records may be sent by default.

Official references:
- Workers Free limits: https://developers.cloudflare.com/workers/platform/limits/
- Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Workers AI pricing and free allocation: https://developers.cloudflare.com/workers-ai/platform/pricing/
- Workers AI data usage: https://developers.cloudflare.com/workers-ai/platform/data-usage/
- Gemma 4 model details: https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/
- Gemma 4 Apache 2.0 licence: https://ai.google.dev/gemma/apache_2

### OpenAI API — technically possible, but usage is metered

OpenAI publishes per-model token pricing. This is a pay-for-usage service, not a dependable no-cost inference allowance for Zuriel. It should not be selected unless a sustainable budget and spending cap are approved.

Official reference:
- https://developers.openai.com/api/docs/pricing

## Current engineering decision

1. Do not add a provider key to the app, repository or chat.
2. Do not connect a browser-direct API call.
3. Do not select Gemini for a public family-accessible app under the reviewed terms.
4. Keep Groq as a candidate for a small opt-in pilot only after the current terms, free-tier limits, model licence, age suitability and hosting are verified.
5. Keep Cloudflare Workers as a possible thin proxy host, subject to a real free-tier deployment test and spending controls.
6. Do not send personal study records or private notes to any model by default.
7. Do not show simulated answers, fake typing indicators or nonfunctional assistant controls.

## Evidence required before implementation

- Written provider and model selection, with applicable terms and model licence recorded.
- Confirmed access from Nigeria and for the app's intended age range.
- A tested server-side secret store and proxy deployment.
- A hard request/spend limit and rate-limit policy.
- Automated citation-validation, prompt-injection, privacy, timeout, offline and provider-failure tests.
- A user-facing disclosure of provider data handling and clear opt-in before any personal content could be shared.

**Conclusion:** The AI Assistant is not abandoned; it is deliberately held at the design and provider-readiness gate until a safe, affordable and sustainable path is confirmed. No paid service or API credential is required from the user at this stage.
