# Zuriel Living Word Bible — Release 1.4.70 Readiness

**Reviewed:** 2026-11-18  
**Published app metadata:** 1.4.70  
**Website:** https://sarkiaimana-cmyk.github.io/zuriel-living-word-bible/  
**Repository:** https://github.com/sarkiaimana-cmyk/zuriel-living-word-bible

## Verified in repository and CI

- The main-branch GitHub Pages deployment for commit `d1b7107cd77c51a7b47d43d293784b0103431032` completed successfully.
- The validation workflow for that commit completed successfully.
- The Android workflow produced a signed APK for app version 1.4.70; build/signing verification is CI evidence, not proof of installation on a user's phone.
- The offline KJV corpus guard verifies 66 books, 1,189 chapters and 31,102 non-empty verse records.
- Offline translation caching, resumable download controls, persisted download records and offline translation selection after restart are implemented and covered by source-level automated checks.
- The reader, selected-verse menu, original-word linking, study references, Open Book Card Studio, Gallery bridge, backup/restore safeguards, reading plans and other modules have dedicated automated checks.

## Not yet certified complete

| Area | Current state | Evidence still required |
|---|---|---|
| Online YouVersion / API.Bible translations | Not live; translation Worker deployment is blocked by Cloudflare token permissions | Deploy the translation-only Worker with the correctly scoped Cloudflare token; pass live provider, CORS and publisher-authorised-version smoke tests; verify the saved endpoint in public release metadata. |
| Full offline translation downloads | Implemented; not device-certified | On Android, download a complete publisher-authorised version, pause/resume it, restart the app, enable airplane mode and read passages from several books including a previously downloaded chapter. Check storage and error recovery. |
| Core Bible reading and navigation | Automated corpus and reader checks pass | On-device cold-start offline test; open books at the beginning, middle and end of the canon; move between chapters; restore last position; verify back navigation and verse selection. |
| Word study and advanced resources | Substantial implementation; broader source coverage and scholarly review remain | Check Hebrew, Greek and Aramaic source labels, Strong's alignment, morphology attribution, lexicon fallbacks and cross-reference accuracy against their named sources. Never infer a missing source relationship. |
| Faith responses and devotional library | Curated library exists; it is not a unique response for every verse in the 31,102-verse corpus | Continue coverage expansion and audit repetition, verse accuracy and pastoral wording. Do not present partial coverage as complete-corpus coverage. |
| Open Book Card Studio | Automated layout/export checks pass; device rendering is unverified | On Android, inspect short and long verses, save to the Zuriel Gallery album, share, cancel sharing, and confirm text is not clipped. |
| Personal library and backup | Runtime safeguards are tested; device file workflows remain unverified | Test creating notes/prayers, encrypted export, restore, wrong password, tampered file and storage failure on Android. |
| Audio Bible | Deliberately gated | Only implement after the exact audio provider entitlement and IP-holder licence are verified. Do not ship placeholder playback. |
| AI Assistant | Deliberately gated; no live provider connected | Requires a separately approved provider, privacy/safety review, budget confirmation and deployment tests. Do not imply it is active. |
| Final Android release | Signed build exists; user-device installation and upgrade are not verified | Confirm package ID, version, signing-certificate continuity, upgrade behaviour, offline cold start, permissions and storage behaviour on the actual device. |

## Release acceptance rule

Zuriel is not declared fully complete merely because a version is published or CI is green. A release area is complete only when its implementation, automated checks, offline/Android packaging review and applicable real-device acceptance tests have passed. Features gated by licensing, provider access or budget remain explicitly gated rather than being represented as finished.

## Owner action needed for online translations

The Cloudflare API token saved as the GitHub Actions secret `CLOUDFLARE_API_TOKEN` must have the correct Workers permission on the same Cloudflare account as `CLOUDFLARE_ACCOUNT_ID`: Workers Editor scoped to the existing `zuriel-bible-translations` Worker, or Workers Admin at Workers product scope if the Worker must first be created. Update the existing GitHub secret; do not paste credentials into chat and do not replace the YouVersion or API.Bible keys for a permission error. Then manually run **Deploy Zuriel Bible translations proxy (manual)** from the `main` branch and confirm the deployment workflow's live smoke tests pass.

Until that workflow succeeds and the endpoint is verified, the app remains safely on its offline KJV path and online translations must be described as not yet live.
