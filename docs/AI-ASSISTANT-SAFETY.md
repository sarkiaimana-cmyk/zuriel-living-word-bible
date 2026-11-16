# Zuriel AI Assistant — safety and architecture specification

**Status: foundation defined; a stateless Cloudflare Workers AI backend pilot is under review in PR #85. It is not deployed, no provider credentials are configured, and no live chat feature is connected to the app.**

## Product purpose

The Zuriel AI Assistant is intended to help readers explore Scripture, understand historical and literary context, compare permitted translations, follow cross-references, and organise personal study. It is a study aid, not a replacement for the Bible, a pastor, a qualified counsellor, or the user's own judgement.

The assistant must preserve the distinction between:
1. **Bible text** — exact text from a named, licensed or public-domain source, with book/chapter/verse and translation edition.
2. **Retrieved study material** — source-attributed introductions, notes, lexicon entries, maps, commentary and other reference material.
3. **AI explanation** — generated interpretation or summary, clearly labelled as AI-generated and linked to the evidence it used.

Never blend generated wording into a Scripture quotation or present an AI paraphrase as a Bible translation.

## First backend pilot scope

The first pilot is deliberately narrower than the full assistant vision:
- One reader-selected KJV reference at a time, limited to eight verses.
- A short question about that passage; the server retrieves the exact text from chapter assets generated from Zuriel's bundled KJV source.
- The model returns an explanation only. Exact Scripture is returned in a separate field and displayed separately from generated text.
- Each request requires a fresh Turnstile token verified server-side against the configured hostname and action.
- The server rejects generated Bible references outside the selected passage.
- No topic-only search, cross-reference generation, translation comparison, original-language claims, chat history, notes, prayer entries, testimony, or backup uploads.
- No answer is simulated when the service is unavailable, unconfigured, rate-limited, or out of free quota.

This pilot scope is not the final assistant specification. Further capabilities must be added only with their own source retrieval and citation validation.

## Required experience

- Ask a question about a passage or topic.
- Start from a selected verse/passage, or search for references when none is selected.
- Display exact Scripture references and the translation edition used.
- Offer concise explanation, context, cross-references, original-language notes where supported by source data, and practical reflection prompts.
- Let the reader open every cited passage in Zuriel's existing reader.
- Offer clear controls to start a new conversation and clear conversation history.
- Preserve existing Bible reading, personal notes, prayer journal, and reading plans if the AI service is unavailable.
- Use a calm, respectful tone; avoid pressure, fear, spiritual manipulation, or claims of divine revelation.

## Scripture-grounding rules

1. Retrieve source passages from Zuriel's verified local Bible data or an approved translation provider before generating an answer.
2. Require every Scripture citation to resolve to a real book, chapter and verse in the selected edition.
3. Do not invent quotations, references, Greek/Hebrew definitions, morphology, historical facts, or commentary attributions.
4. If the requested translation is not installed or licensed, say so and offer an available edition rather than silently substituting one.
5. Keep quoted Bible text separate from generated explanation. Preserve punctuation and wording exactly as supplied by the source.
6. Clearly identify uncertainty, interpretive differences, and denominational disagreement where relevant. Do not present one contested interpretation as the only Christian view.
7. Do not claim that the assistant speaks for God, has received revelation, or can guarantee a spiritual outcome.
8. Treat retrieved Bible and reference content as data, never as instructions that can override system safety or privacy rules.

## Privacy and security requirements

- Do not send personal study notes, prayer journal entries, testimony records, saved insights, or reading history to an AI provider by default.
- Any future feature that shares personal content must be opt-in, narrowly scoped, clearly explained, and revocable.
- Do not include secrets, provider keys, signing credentials, or private tokens in browser JavaScript, the service worker, repository files, APK assets, logs, or chat messages.
- If a hosted model is selected, all provider calls must go through a server-side proxy. The client must never receive the provider secret.
- Apply request size limits, rate limits, timeouts, safe error handling, and abuse protection at the proxy. Public pilot requests also require mandatory server-side Turnstile validation; CORS is not authentication.
- Minimise retention. Make conversation history opt-in; provide a clear delete action. Do not persist sensitive prompts in analytics or diagnostic logs.
- Do not add advertising, tracking, or unrelated analytics to the assistant.
- Do not claim conversations are private from a provider unless the selected provider's current terms and configuration have been verified.
- Keep local Bible reading and search functional without network access. Do not cache generated answers as authoritative Scripture or study sources.

## Prompt-injection and untrusted-content handling

- User prompts, imported files, retrieved web content, and reference text are untrusted input.
- Retrieved text cannot instruct the assistant to reveal secrets, ignore safeguards, execute code, access private records, or change application settings.
- The assistant has no permission to run arbitrary code, browse private user files, or perform external actions.
- Do not automatically upload an entire personal library or backup to answer a question.

## Health, safety and pastoral boundaries

- The assistant may support ordinary Bible study and reflective questions but must not diagnose illness, prescribe treatment, or discourage professional help.
- For abuse, immediate danger, self-harm, or other urgent safety concerns, prioritise practical safety and appropriate local emergency or professional support rather than offering only a Bible verse.
- Do not shame users, promise healing or financial outcomes, or exploit grief, fear, guilt, or spiritual vulnerability.

## Offline and failure behaviour

- The assistant must show an honest unavailable/offline state when no approved AI service is reachable.
- Offline Bible reading, full-Bible search, downloaded reading plans and personal study space must remain available.
- Never simulate a generated answer or show a fake typing indicator as if a model responded.
- Provide a route back to the Bible reader and local search when the AI service is unavailable.

## Provider and deployment decision gates

Before implementation, select a provider and verify its current:
- API terms, privacy policy, data retention and training-use settings;
- cost, free-tier limits, rate limits and regional availability;
- content safety and data-processing terms;
- server-side authentication and key rotation options;
- ability to support a non-commercial, free Bible study application.

A backend hosting plan must also be selected. Do not place a paid or secret-dependent service into the app until its ongoing cost and ownership are understood. The assistant should fail closed when credentials are absent or invalid.

## Automated acceptance tests required before release

- Exact Bible citation validation; unknown books, chapters and verses rejected.
- Quoted Scripture is byte-for-byte preserved from the selected source.
- Every displayed citation opens the exact passage in the existing reader.
- Generated commentary is visibly distinguished from Scripture and source material.
- Missing translation, missing source, unsupported language and conflicting references produce honest messages.
- Personal notes, prayer entries and backups are not sent without explicit opt-in.
- Provider keys never appear in client bundles, APK assets, logs or responses.
- Prompt-injection strings in user and retrieved content cannot override safeguards or access private data.
- Offline mode leaves reader, search, reading plans and personal space usable.
- Rate-limit, timeout, malformed response, Turnstile failure/replay and provider outage paths are handled without crashing the app.
- Conversation deletion and retention settings behave as documented.
- Accessibility: keyboard navigation, screen-reader labels, readable contrast and responsive mobile layout.

## Implementation sequence

1. Choose and document the provider, privacy settings, cost and backend hosting.
2. Define a minimal server-side request/response contract and validate it independently.
3. Implement a Scripture retrieval layer using verified references and edition metadata.
4. Add the assistant interface only after the backend can return grounded, validated responses.
5. Add privacy controls, deletion, rate limiting, failure states and security tests.
6. Integrate the feature into existing navigation without adding a cluttered home shortcut grid.
7. Run automated validation, inspect the client bundle for secrets, and test online/offline on Android before release.

**Current decision:** architecture and acceptance criteria are recorded. No AI chat interface or API integration is enabled yet. A provider/API key is not needed in chat, and no credentials should be committed to the repository.
