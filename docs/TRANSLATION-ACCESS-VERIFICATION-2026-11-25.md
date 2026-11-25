# Translation access verification — 25 November 2026

This report records the live translation Worker deployment check from GitHub Actions run 45621680213 on main commit 7b46c950db2f0d1183294082136efa75bcd68106.

## Provider credential checks

- YouVersion Platform app key: accepted by the direct provider check (HTTP 200); the English catalogue returned 20 entries.
- API.Bible key: accepted by the direct provider check (HTTP 200); the English catalogue returned 40 entries.
- Provider secret values were not read back or printed.
- The translation Worker deployed successfully at the configured workers.dev endpoint. The endpoint is public configuration; provider keys remain server-side.

## Passage-level verification

The smoke test required real Scripture text, a passage reference, and publisher attribution (plus API.Bible FUMS v3 where applicable).

| Version | Provider | Result |
|---|---|---|
| AMP | YouVersion | Verified — John 3:16 |
| TPT | YouVersion | Verified — John 3:16 |
| NLT | API.Bible | Verified — John 3 |
| NET | Bible.org | Verified — John 3 and Psalm 23 |
| NIV | YouVersion | Verified — John 3:16 |
| NASB | YouVersion | Verified — John 3:16 |
| NKJV | API.Bible | Verified — John 3 |

## Requested versions not verified

| Version | Catalogue / access finding | Correct app behaviour |
|---|---|---|
| GNT | Not present in either returned English catalogue | Do not list as available; retain unavailable status |
| Living Bible (LB/LT) | Not present in either returned English catalogue | Do not list as available; do not confuse it with NLT |
| CSB | Not present in either returned English catalogue | Do not list as available |
| ESV | Crossway catalogue returned no entries because ESV_API_KEY is not configured | Keep ESV unavailable until a valid Crossway key and passage access are verified |

The live smoke test searched the complete returned YouVersion catalogue pages and the 40-entry API.Bible catalogue, then attempted real passage retrieval for matching requested versions. A catalogue entry alone is not treated as proof that passage text is accessible.

## Safety and limitations

- KJV remains the separately verified offline 66-book corpus.
- Online translations must remain subject to publisher attribution and the provider's licence.
- Do not expose a requested version as available based only on a hard-coded label or an unverified catalogue match.
- ESV requires its own Crossway credential; neither YouVersion nor API.Bible keys substitute for it.
- This is a dated snapshot. Re-run the live catalogue and passage smoke test after provider permissions or credentials change.
- A successful automated test does not establish permission to download or store a translation offline; offline caching remains provider-specific and fail-closed.

## Evidence

GitHub Actions run: https://github.com/sarkiaimana-cmyk/zuriel-living-word-bible/actions/runs/45621680213

The run completed successfully. The provider-specific test suite and live passage smoke test passed for the verified set above.
