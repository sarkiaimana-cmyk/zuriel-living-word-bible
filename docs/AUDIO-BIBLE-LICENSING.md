# Audio Bible licensing and integration readiness

**Status: research complete; provider entitlement and content licence not yet verified. No audio playback or download feature is authorised for implementation yet.**

This document records the safeguards and integration decisions for the Audio Bible milestone in Zuriel Living Word Bible. The goal is to provide a reliable, accessible experience without assuming that an existing Scripture-text API key also grants audio rights.

## Current provider findings

### API.Bible

- API.Bible's official Audio Bible guide says Audio Bible access requires **special licensing**. The `GET /v1/audio-bibles` endpoint lists only the audio Bibles available to the authenticated application.
- Audio is chapter-based: each chapter has one audio file, so the provider does not offer verse-level audio queries.
- A chapter response includes a presigned `resourceUrl` that expires. API.Bible recommends downloading the resource promptly and specifically advises against streaming directly from that temporary URL.
- The API.Bible terms require the app to follow the specific audio IP Holder licence as well as the platform terms. Text and audio are separate formats; copyrighted text must not be converted into audio, nor copyrighted audio into text, without permission.
- The current non-commercial agreement excludes advertising, in-app purchases, paid subscriptions, freemium access and revenue-generating use. Its limited donation exception is subject to the exact terms and may be revoked.

Official references:
- Audio Bibles guide: https://docs.api.bible/guides/audio-bibles/
- Terms and conditions: https://www.api.bible/terms-and-conditions
- Licensing overview: https://care.api.bible/article/369-understanding-api-bible-licensing

### YouVersion Platform

The current official quick reference documents Bible text/version, book, chapter, verse and passage endpoints. It does not document an Audio Bible endpoint in that reference. Therefore, Zuriel must not assume that the existing YouVersion app key includes audio access. Any audio capability must be confirmed directly from current provider documentation and the app's actual entitlement.

Official reference:
- https://developers.youversion.com/quick-reference

## Release gate: evidence required before audio coding

Do not implement a live audio player, download button, offline audio cache, or claim audio availability until all of the following are recorded:

1. **Provider entitlement:** written confirmation that the Zuriel application is authorised to access the selected audio Bible through the chosen provider.
2. **Specific content licence:** the audio edition, language, IP Holder, permitted countries, required attribution, and applicable agreement are identified.
3. **Playback rights:** online playback, buffering, background playback, speed controls, and any other intended player behaviour are permitted.
4. **Offline rights:** downloading, persistent device storage, backup/restore inclusion, number of devices, expiry, deletion and update requirements are expressly permitted. Do not infer offline rights from the existence of a temporary resource URL.
5. **Distribution restrictions:** confirm whether audio may be made available inside the app, and whether any redistribution, extraction, export, sharing or third-party hosting is prohibited.
6. **Non-commercial compatibility:** confirm that the selected plan and audio licence fit Zuriel's free, non-commercial model and its actual features.
7. **Security and privacy:** API credentials remain in secure server-side configuration; never place private keys in browser JavaScript, source control, APK assets, logs, or user-visible chat.

## Technical design requirements after approval

- Keep the audio catalogue separate from text Bible translation records.
- Use provider-issued IDs and metadata; do not guess edition IDs or construct resource URLs.
- Treat presigned audio URLs as short-lived secrets. Retrieve them only when needed and follow the provider's expiry guidance.
- Use an authorised download flow only if the specific licence permits it. Validate content type, response status, size limits, storage quota, cancellation, interrupted downloads, and cleanup.
- Store audio files only in app-private storage unless the licence explicitly permits another destination.
- Never include audio in encrypted personal backups unless the licence explicitly allows backup copies.
- Provide clear online/offline states, download progress, retry and cancellation, and an accessible player. Do not show controls that cannot work.
- If verse timecodes are supplied, validate them against the matching text edition before using them for verse highlighting. Audio chapters are not inherently verse-queryable.
- Keep audio cache and Bible text cache policies separate. Honour any provider update, expiry, refresh, deletion and attribution requirements.
- Add automated tests for entitlement gating, invalid IDs, expired resource links, network failure, storage quota, interrupted downloads, cleanup and offline behaviour before release.

## Safe alternatives while licensing is pending

- Keep the existing Reading Plans feature available offline.
- Do not generate speech from copyrighted translations without written permission. API.Bible terms allow only narrowly scoped ephemeral text-to-speech for qualifying public-domain or specifically permitted editions; that is not blanket permission for all translations.
- A future audio section may explain that audio editions are being evaluated, but it must not imply that playback or downloads are already available.

## Current decision

**Audio Bible implementation is blocked pending provider and IP Holder confirmation.** No API key is needed in chat. When an approved integration is ready, credentials should be added through the repository's secure Actions/Environment secrets mechanism, not committed to source code or shared in messages.
