# Zuriel Living Word Bible — 20-Part Specification Scorecard

**Product:** Zuriel Living Word Bible  
**Mission:** An independent, free, offline-first Bible reading and study app.  
**Guiding principle:** Build against the approved 20-part specification. Do not silently omit, duplicate, or downgrade requirements.

## How status is recorded

- **Established** — requirement and direction are documented; this is not a software feature.
- **Substantial implementation** — meaningful code exists, but the whole specification area is not yet certified complete.
- **Partial** — foundations or selected features exist; important requirements remain.
- **Outstanding** — implementation is still required.
- **Ongoing** — cross-cutting work that must be maintained throughout development.

A feature is not considered complete merely because code exists. Completion requires: implementation, integration with existing modules, automated validation, review of offline and Android packaging impact, and device testing where relevant.

## The 20 specification parts

| # | Specification area | Current assessment | Remaining focus / completion evidence |
|---:|---|---|---|
| 1 | Product Vision and Objectives | Established | Preserve the free, dependable, Scripture-centred mission and approved product requirements. |
| 2 | Main Application Structure | Substantial implementation | Audit every destination, navigation path, back behaviour, responsive layout, and module integration. |
| 3 | Complete Bible Reading | Substantial implementation; whole-corpus KJV integrity CI-verified; online translation comparison prepared | PR #115 verifies exactly 66 unique books, 1,189 chapters and 31,102 non-empty KJV verse records. Reader position restore and full-width verse rendering are integrated. PR #116 adds an optional online comparison panel and a separate translation-only Worker, but the service remains disabled until the owner configures secrets, deploys the Worker and verifies publisher licences. Still verify actual offline chapter reading and navigation on Android. |
| 4 | Advanced Bible Study | Partial; source-accurate word linking and topical reference navigation strengthened | PRs #6, #9, #10, #15, #16 and #46 are merged. Includes source-attributed original-language data, KJV word linking by Strong's number, contextual occurrence cards, 104 curated topical studies and 519 Scripture references. PR #46 normalizes Psalm/Psalms aliases and adds automated checks for topic fields, book names, verse ranges, reflection questions and search. Still required: broader verified morphology/lexicon coverage, cross-chapter word study, richer contextual commentary and scholarly review. |
| 5 | Devotional and Daily Growth | Substantial implementation | Verify devotional depth, daily content, Glory Verse Affirmation, monthly Light Glory devotional, prayers, declarations, affirmations, and non-repetitive content. |
| 6 | Worship and Music | Partial | Review SS&S library, lawful content sources, worship/praise navigation, and offline behaviour. Do not bundle copyrighted lyrics without permission. |
| 7 | Words of Jesus | Dedicated experience and exact verse navigation implemented; expansion remains | PR #11 adds 50 searchable/filterable Gospel teaching themes, verse links, contextual study navigation and saving to My Library. PR #47 corrects exact verse selection by visible verse label rather than array position. Continue expanding the teaching index and validating coverage across all four Gospels. |
| 8 | Christian Topics | Substantial implementation | Audit all topic guides and Scripture links, accuracy, coverage, search, and links into the reader and study tools. |
| 9 | Open Book Card Studio | Substantial implementation; device verification outstanding | PRs #12, #24 and #48 provide separate Scripture/faith typography, adaptive preview and PNG export, native sharing/download fallback, and the approved branded layout. PR #48 makes long-content PNG exports stack vertically while short cards retain the two-column spread. PR #50 also loads the home Open Book card from verified bundled offline KJV text. Automated checks pass; real Android rendering, gallery/download, long-content and share-cancellation checks remain outstanding. |
| 10 | Personal Spiritual Library | Substantial implementation; encrypted backup/restore safeguards strengthened | Notes, insights, prayer journal, reading history/progress and password-encrypted backup/restore are integrated. PR #44 protects backups from malformed local records; PR #45 prevents Personal Study Space saves/deletes from silently overwriting unreadable records. Still verify browser download/import and Android file save/restore on real devices. |
| 11 | Audio and Reading Plans | Reading plans implemented and protected; Audio Bible gated by licensing | PR #25 provides three offline seven-day plans, sequential progress, passage navigation and encrypted backup compatibility. PR #49 makes progress reads/writes fail closed when local records are corrupt or use an unsupported schema. Audio playback, background play, downloads and offline storage remain blocked until provider entitlement and the specific audio IP Holder licence are confirmed. |
| 12 | Smart Search | Substantial implementation | Validate search accuracy, verse-result opening, highlighting, filters, and performance across the full Bible corpus. |
| 13 | Offline-First Architecture | Substantial implementation | Test cold-start offline, cache updates, missing-resource recovery, storage limits, and consistency across web and Android. |
| 14 | AI Assistant | Safety foundation and provider review documented; implementation gated | `docs/AI-ASSISTANT-SAFETY.md` defines Scripture-grounding, citation validation, privacy, prompt-injection, offline/failure, pastoral-safety and release-test requirements. Provider readiness was refreshed on 2026-11-17 against current Cloudflare documentation: Workers AI Free includes 10,000 Neurons/day and Gemma 4 remains a candidate with a zero-data-retention label. No provider, API key, backend deployment or live chat is connected. Keep Free-plan hard stops; do not upgrade without a separately approved budget. |
| 15 | Design and User Experience | Ongoing | Maintain premium navy visual direction, uncluttered home, readable typography, accessibility, responsive layouts, and consistent navigation. |
| 16 | Technical Architecture | Substantial implementation | Keep web modules, offline cache, data contracts, and Capacitor Android packaging aligned; verify each release build. |
| 17 | Quality Assurance and Testing | Partial / ongoing | Automated checks now cover original-language linking, topical-study integrity, exact Words of Jesus navigation, backup/restore runtime and corrupt-record safeguards, reading-plan progress, adaptive Studio export, home KJV retrieval, 66 book introductions and Geography. Continue regression, security/privacy, offline, accessibility and real-device testing. |
| 18 | Development Priorities | Active process | Work in dependency order, maintain this scorecard, and record blockers and acceptance evidence for each change. |
| 19 | Successful Release | Version 1.4.27 CI build and signature checks passed; device verification outstanding | Android workflow run `44041785979` completed successfully on 2026-11-17 for the translation-reader PR. It produced debug and signed release APK artifacts, verified package ID `com.zuriel.livingwordbible.release`, versionName **1.4.27**, versionCode **1004027**, and v2/v3 APK signatures. The signing certificate SHA-256 is `902bac9ce36d81a418c3a76e0f5295c891b9b504fb842a0c036e6844ade3a351`, matching the preceding signed CI builds. This confirms CI-to-CI signing continuity, not continuity with the APK installed on the user's phone. The current app cache is **v122**. The GitHub Pages deployment for the prior merged app commit succeeded; the new merged commit's deployment is pending. This confirms CI artifact integrity, not installation or upgrade behaviour on the user's phone. This confirms CI artifact integrity and continuity between those two CI builds, not continuity with the APK installed on the user's phone. Still verify install/upgrade, installed-certificate continuity, offline cold start, backup file handling and Studio save/share on the phone before recommending installation. |
| 20 | Final Developer Instruction | Established | Follow the complete approved specification, preserve existing work, avoid unapproved scope changes, and verify before declaring completion. |

## Current known implementation evidence

- Kingdom Life Centre and guided growth pathways are present in the merged application work.
- The personal study space includes notes/insights, prayer journal, and progress foundations.
- Scripture topic resources and search foundations are present; their full acceptance criteria still require auditing.
- Offline caching and Android packaging are established foundations; each new module must be added to both where applicable.
- Personal backup/restore was merged through **PR #4** into `main` on 2026-11-15. The runtime suite passed AES-GCM round-trip, wrong-password and tamper rejection, schema/record validation, safe merge, duplicate handling, preservation of existing data, and a simulated storage-failure rollback. Browser download/import and Android file save/restore behaviour still require real-device verification.
- Advanced Bible Study language labelling was merged through **PR #6** on 2026-11-15. It labels Hebrew, Greek, or Aramaic only when the source record explicitly identifies the language; otherwise it displays a neutral unknown-language label. Broader morphology, lexical coverage and scholarly review remain outstanding.
- **PR #9** merged a consistency fix so normalized Hebrew/Aramaic metadata controls both the visible label and right-to-left script direction.
- **PR #10** merged safer lexicon rendering: unknown language metadata is not labelled Hebrew by default, empty lexicon senses are rejected, and morphology is attributed to the source only when supplied.
- **PR #11** merged the first dedicated Words of Jesus study centre: 50 curated themes, search, theme filters, Gospel reference navigation, contextual study links, and saving to My Library. The teaching index still needs a broader reference audit and expansion.
- **PR #15** merged contextual Strong's-index occurrence cards with KJV verse excerpts and an explicit caution that one index does not guarantee identical nuance in every context.
- **PR #16** merged source-accurate KJV word selection: KJV word annotations are aligned by token offsets and joined to BSB interlinear records by Strong's number. It no longer guesses from BSB English glosses; mismatched source records are reported without inventing a link. Six focused automated tests pass. Berean interlinear attribution and STEPBible/Tyndale House CC BY 4.0 lexicon attribution are displayed.
- **PR #18** merged Android version metadata derived from version.json and a pre-upload signed APK package/version verification step. The first build on this updated workflow must pass before device installation is considered.
- **PR #12** merged the Open Book Card Studio improvements: separate Scripture/faith text sizes, typeface control, adaptive stacked layout for long content, PNG export, native file sharing where supported, and a download fallback. Its automated checks passed; real Android gallery/download and visual rendering tests remain outstanding.
- PR #24 merged the approved Open Book Card layout correction: Scripture on the left, Glory Verse Affirmation/declaration on the right, the exact approved headline and full app footer. Automated Studio validation passed; scenic styling and real Android rendering remain outstanding.
- PR #25 merged three offline-first seven-day reading plans, exact passage navigation, private sequential progress, and encrypted backup/restore compatibility. Audio is intentionally not represented by placeholder controls; a licensed audio source must be verified before playback/download implementation.
- The Book Introduction Centre now contains **all 66 Bible books**. PRs #40, #41 and #42 completed the remaining New Testament introductions through Revelation and were merged to `main` on 2026-11-15. This completes the 66-book introduction subfeature; it does **not** certify the full Bible text, verse integrity, translation licensing, or on-device reading experience as complete. The current merged release metadata is app version **1.4.26** and offline cache **v121**. PR #32 added the first offline Galilee Geography Centre, and PR #36 added the second offline regional locator for Jerusalem and Judea. The merged Geography Centre contains two regions, 12 source-attributed place records and three Scripture-linked reading sequences, with confidence and precision notes retained. PR #36 passed its full validation workflow (including dedicated Geography checks) and merged to `main` on 2026-11-15.
- The app's release/install status must be tracked separately from successful CI. A passing workflow does not prove an APK installs or upgrades correctly on the user's phone.


- **PR #44** and **PR #45** strengthened Personal Study Space backup and local-record safety. Malformed backup data is rejected rather than silently treated as empty; unreadable personal records are preserved when save/delete operations fail closed.
- **PR #46** normalized Psalm/Psalms topical-reference lookup and added a topical index integrity suite covering 104 studies and 519 Scripture links.
- **PR #47** corrected Words of Jesus navigation to locate the exact requested verse by its visible label.
- **PR #48** made Open Book Card PNG export adaptive: long passages and faith text use a full-width stacked layout, while shorter cards retain the open-book spread.
- **PR #49** made Reading Plans preserve unreadable or unsupported saved progress and added corruption regression tests.
- **PR #50** connected the home Open Book Scripture panel to exact bundled offline KJV retrieval, corrected Psalm/Psalms passage lookup and protected against stale asynchronous card loads. Its release metadata was **1.4.19 / cache v111 at that historical point**; the current release metadata is **1.4.26 / cache v121**.
- **Historical Android workflow run `43722898019`** completed the version 1.4.19 build and verified its debug/signed APKs and signing continuity with 1.4.18. It is retained as historical evidence; the current release candidate is 1.4.26 (workflow run `44037695533`). Real-device install/upgrade and installed-app signer continuity remain separate checks.
- **PR #51 and PR #53** recorded AI provider/hosting readiness findings. Gemini's reviewed terms and free-tier data practices do not fit the general-public family-accessible app; Groq remains a possible limited-pilot candidate, and Cloudflare Workers plus the separate Workers AI inference product are documented as another no-cost pilot candidate. No provider has been approved or connected, and no API key has been added.

## Required workflow for every feature

1. Identify the relevant specification part(s) and acceptance criteria before coding.
2. Inspect existing modules and data contracts to avoid duplication or regressions.
3. Implement the complete coherent change, including navigation, offline cache, and Android packaging where applicable.
4. Add or update automated checks for the actual behaviour and important failure cases.
5. Run the relevant workflows and inspect their results.
6. Review the diff and security/privacy implications.
7. Merge only after checks and review are satisfactory.
8. Verify the merged application and device behaviour where the feature requires it.
9. Update this scorecard with evidence; distinguish implemented, validated, merged, and device-tested.

## Non-negotiable safeguards

- Never fabricate Scripture, references, translations, licences, or test results.
- Never label a translation as integrated until its actual text and rights/source are verified.
- Never expose private study data or signing credentials.
- Never recommend installing an APK until package ID, version code/name, signing continuity, artifact integrity, and relevant device checks have been verified.
- Preserve existing Zite work and the GitHub project independently.
- Keep the home experience tidy and the reading experience complete, readable, and reliable.

**Status note:** This is a working control document. Assessments are conservative and must be revised only when evidence supports a status change.


## Verified integration update — 2026-11-17

- **PR #109** merged: full-width, left-aligned Scripture reading, clean KJV paragraph display, and verse-aware offline read-aloud. The contextual study panel follows the Scripture rather than compressing the reading column.
- **PR #110** merged: searchable Dictionary & Commentary catalogue with six named reference resources and source/licensing notes. The catalogue is an index, not a claim that full copyrighted texts are bundled.
- **PR #111** merged: the 30-day Walk with Jesus plan. Its 30 passages are checked against the bundled KJV, and encrypted backup validation rejects progress outside the plan's 30 days.
- **PR #112** merged: AI pilot security boundary and runtime safeguards. This is not a live AI Assistant, has no connected provider/API key, and remains gated from deployment.
- **PR #113** merged: reopening the same chapter preserves the selected verse; opening another chapter starts at verse 1; malformed prior position data cannot block chapter opening. The read-aloud event follows the saved verse.
- **PR #114** merged: CI now checks that every offline core precache asset exists, all local application scripts are precached, paths are safe and unique, and the in-app update version matches the release metadata. Its validation and signed Android build both passed.
- **PR #115** merged: whole-corpus KJV validation now asserts exactly 66 unique books, 1,189 chapters and 31,102 non-empty verse records, verifies every reader mapping is unique, and checks every chapter against its expected book chapter count. Both validation and signed Android build passed.
- **PR #116** merged: adds a collapsed online translation comparison panel and a separate translation-only Cloudflare Worker entry point. It lists only English versions authorised for the YouVersion app key, loads text only on explicit request, requires publisher attribution, and does not persist licensed text. The Worker is not deployed and the app endpoint is intentionally blank; online translations remain disabled until Cloudflare credentials, the YouVersion key and publisher access are configured and verified. The AI pilot remains separate.
- **PR #118** merged: refreshed the AI provider readiness review against current official Cloudflare pricing and model availability. Gemma 4 remains a candidate under the Workers AI Free allocation; this is a documented candidate only, not approval to deploy or connect the AI Assistant.
- **Application integration commit for PRs #109–#113:** `c999f29707672bcbb5d343cbbaee8e5e0a102d60`. PR #114 adds a CI-only offline asset guardrail; the resulting current main commit is recorded in GitHub.
- **Current app metadata:** version **1.4.27**; Android versionCode **1004027**; service-worker cache **zuriel-bible-offline-v122**.
- **Current Home Scripture behaviour:** 54 curated identity Scripture entries; the hero rotation interval is exactly **15,000 ms** and uses offline KJV retrieval.
- **Words of Jesus:** the live catalogue currently contains **50 curated teaching themes**, not 24. The automated checker validates each reference against the bundled 66-book KJV.
- **Current main CI:** validation and Android build both passed for the merged commit. The Android run built and uploaded both debug and signed release APKs; the signed APK passed package/version checks and apksigner v2/v3 verification. The Pages build and deployment also succeeded.
- **PR #115 verification output:** `Complete offline KJV corpus verified: 66 books, 1,189 chapters, 31,102 non-empty verse records, and unique reader mappings.` The offline asset check also confirmed cache v121, 28 existing precache assets and all 20 local app scripts included for offline loading.
- **Open pull requests requiring careful disposition:** #96, #97, #99, #104, #105 and #108 have overlapping/superseded work represented by merged PRs #109–#112. Do not merge these older branches without a fresh diff review. PR #1 is an unrelated rename proposal and is not part of the release plan. No old PR has been closed or deleted as part of this audit.
- **Still device-dependent:** install/upgrade on the user's Android phone, cold-start offline launch, chapter/verse reading interaction, backup file export/import, Open Book PNG gallery save/share, and visual accessibility checks. Passing CI cannot substitute for these checks.
- **Still gated by external rights or decisions:** additional translation access, licensed recorded Audio Bible, and selection/deployment of a privacy-appropriate AI provider. Do not enable placeholders or imply these are already live.



## Non-negotiable verse-by-verse experience — confirmed 2026-11-17

The following user requirements are part of the product acceptance criteria, not optional future polish:

1. **Tap any English word in a displayed KJV verse:** open a compact, readable word-detail pop-up/sheet without losing the reader's place. Show the word's contextual English meaning first, then (when the exact source data supports it) the original Hebrew, Aramaic or Greek lemma, original script, transliteration, Strong's index, lexicon senses/definition, grammatical parsing and morphology. Include related occurrences and cross-references where available.
2. **Never guess an original-language link:** connect the selected KJV word to Hebrew/Greek only through exact, verse-level alignment/Strong's source records. If the source does not establish the relationship, explain that the link is unavailable rather than inventing a definition. Clearly label the source and distinguish a lexicon's range of senses from the meaning in this particular verse.
3. **Every verse should have its own faith response:** a passage/verse-specific prayer, declaration, affirmation, faith confession, inspiration and a short personalised Word/faith focus. The content must be relevant to that verse's actual meaning and context, not a generic repeated paragraph. It must remain separate from Scripture text and be clearly identified as original devotional material.
4. **Coverage and integrity:** aim for full 66-book, verse-level coverage. Where a reviewed, verse-specific entry is not yet available, show an honest "not yet curated" state or a clearly labelled contextual draft; do not silently reuse a neighbouring verse's content or claim full coverage. Every response must be checked against the passage context and avoid promises that the verse itself does not make.
5. **Personalisation:** allow the reader to save or adapt the prayer, declaration, affirmation, confession and faith focus for their own circumstances, while preserving the original source text and the user's edits separately.

### Current implementation versus target

- The study module already supports verse selection, KJV word selection/highlighting, source-linked KJV-to-Strong's matching, interlinear Hebrew/Greek/Aramaic records, STEPBible/Tyndale House lexicon lookups, source-supplied morphology, related word occurrences and cross-references. Resources downloaded once can be cached for later offline study. Some original-language data requires an initial network connection and is not guaranteed for every English KJV word.
- The faith-response library currently contains a limited curated set (55 entries in the current source file), and the renderer explicitly reports when a verse has no curated entry. This is **not yet full verse-by-verse coverage** and must not be described as complete.
- The tap-to-study experience and the faith-response coverage therefore remain priority integration/verification work. The target is a compact pop-up for a tapped word, with the full advanced study details available on expansion; the main Scripture column must remain full-width and readable.
