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
| 3 | Complete Bible Reading | Substantial implementation | Verify all 66 books, chapter/verse integrity, reading position, full verse rendering, translation provenance/licensing, and offline chapter reading on device. |
| 4 | Advanced Bible Study | Partial; source-accurate word linking and topical reference navigation strengthened | PRs #6, #9, #10, #15, #16 and #46 are merged. Includes source-attributed original-language data, KJV word linking by Strong's number, contextual occurrence cards, 104 curated topical studies and 519 Scripture references. PR #46 normalizes Psalm/Psalms aliases and adds automated checks for topic fields, book names, verse ranges, reflection questions and search. Still required: broader verified morphology/lexicon coverage, cross-chapter word study, richer contextual commentary and scholarly review. |
| 5 | Devotional and Daily Growth | Substantial implementation | Verify devotional depth, daily content, Glory Verse Affirmation, monthly Light Glory devotional, prayers, declarations, affirmations, and non-repetitive content. |
| 6 | Worship and Music | Partial | Review SS&S library, lawful content sources, worship/praise navigation, and offline behaviour. Do not bundle copyrighted lyrics without permission. |
| 7 | Words of Jesus | Dedicated experience and exact verse navigation implemented; expansion remains | PR #11 adds 24 searchable/filterable Gospel teaching themes, verse links, contextual study navigation and saving to My Library. PR #47 corrects exact verse selection by visible verse label rather than array position. Continue expanding the teaching index and validating coverage across all four Gospels. |
| 8 | Christian Topics | Substantial implementation | Audit all topic guides and Scripture links, accuracy, coverage, search, and links into the reader and study tools. |
| 9 | Open Book Card Studio | Substantial implementation; device verification outstanding | PRs #12, #24 and #48 provide separate Scripture/faith typography, adaptive preview and PNG export, native sharing/download fallback, and the approved branded layout. PR #48 makes long-content PNG exports stack vertically while short cards retain the two-column spread. PR #50 also loads the home Open Book card from verified bundled offline KJV text. Automated checks pass; real Android rendering, gallery/download, long-content and share-cancellation checks remain outstanding. |
| 10 | Personal Spiritual Library | Substantial implementation; encrypted backup/restore safeguards strengthened | Notes, insights, prayer journal, reading history/progress and password-encrypted backup/restore are integrated. PR #44 protects backups from malformed local records; PR #45 prevents Personal Study Space saves/deletes from silently overwriting unreadable records. Still verify browser download/import and Android file save/restore on real devices. |
| 11 | Audio and Reading Plans | Reading plans implemented and protected; Audio Bible gated by licensing | PR #25 provides three offline seven-day plans, sequential progress, passage navigation and encrypted backup compatibility. PR #49 makes progress reads/writes fail closed when local records are corrupt or use an unsupported schema. Audio playback, background play, downloads and offline storage remain blocked until provider entitlement and the specific audio IP Holder licence are confirmed. |
| 12 | Smart Search | Substantial implementation | Validate search accuracy, verse-result opening, highlighting, filters, and performance across the full Bible corpus. |
| 13 | Offline-First Architecture | Substantial implementation | Test cold-start offline, cache updates, missing-resource recovery, storage limits, and consistency across web and Android. |
| 14 | AI Assistant | Safety foundation and provider review documented; implementation gated | `docs/AI-ASSISTANT-SAFETY.md` defines Scripture-grounding, citation validation, privacy, prompt-injection, offline/failure, pastoral-safety and release-test requirements. `docs/AI-ASSISTANT-PROVIDER-READINESS.md` records current provider/hosting findings; no provider, API key, backend or live chat is connected. Select only after age suitability, privacy, cost, Nigeria access and hosting are verified. |
| 15 | Design and User Experience | Ongoing | Maintain premium navy visual direction, uncluttered home, readable typography, accessibility, responsive layouts, and consistent navigation. |
| 16 | Technical Architecture | Substantial implementation | Keep web modules, offline cache, data contracts, and Capacitor Android packaging aligned; verify each release build. |
| 17 | Quality Assurance and Testing | Partial / ongoing | Automated checks now cover original-language linking, topical-study integrity, exact Words of Jesus navigation, backup/restore runtime and corrupt-record safeguards, reading-plan progress, adaptive Studio export, home KJV retrieval, 66 book introductions and Geography. Continue regression, security/privacy, offline, accessibility and real-device testing. |
| 18 | Development Priorities | Active process | Work in dependency order, maintain this scorecard, and record blockers and acceptance evidence for each change. |
| 19 | Successful Release | Version 1.4.19 merged; latest Android build in progress; device verification outstanding | `version.json` now identifies app version **1.4.19** and offline cache **v111**. The latest merged application has passed the full PR validation workflow; its Android APK build and Pages deployment are tracked separately. Earlier Android CI builds produced debug/signed APK artifacts and verified package/version metadata. Do not treat CI success as a real-device install/upgrade test. Verify package ID, version code/name, signing continuity, artifact integrity, install/upgrade, offline cold start and Studio save/share on the phone before recommending installation. |
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
- **PR #11** merged the first dedicated Words of Jesus study centre: 24 curated themes, search, theme filters, Gospel reference navigation, contextual study links, and saving to My Library. The teaching index still needs a broader reference audit and expansion.
- **PR #15** merged contextual Strong's-index occurrence cards with KJV verse excerpts and an explicit caution that one index does not guarantee identical nuance in every context.
- **PR #16** merged source-accurate KJV word selection: KJV word annotations are aligned by token offsets and joined to BSB interlinear records by Strong's number. It no longer guesses from BSB English glosses; mismatched source records are reported without inventing a link. Six focused automated tests pass. Berean interlinear attribution and STEPBible/Tyndale House CC BY 4.0 lexicon attribution are displayed.
- **PR #18** merged Android version metadata derived from version.json and a pre-upload signed APK package/version verification step. The first build on this updated workflow must pass before device installation is considered.
- **PR #12** merged the Open Book Card Studio improvements: separate Scripture/faith text sizes, typeface control, adaptive stacked layout for long content, PNG export, native file sharing where supported, and a download fallback. Its automated checks passed; real Android gallery/download and visual rendering tests remain outstanding.
- PR #24 merged the approved Open Book Card layout correction: Scripture on the left, Glory Verse Affirmation/declaration on the right, the exact approved headline and full app footer. Automated Studio validation passed; scenic styling and real Android rendering remain outstanding.
- PR #25 merged three offline-first seven-day reading plans, exact passage navigation, private sequential progress, and encrypted backup/restore compatibility. Audio is intentionally not represented by placeholder controls; a licensed audio source must be verified before playback/download implementation.
- The Book Introduction Centre now contains **all 66 Bible books**. PRs #40, #41 and #42 completed the remaining New Testament introductions through Revelation and were merged to `main` on 2026-11-15. This completes the 66-book introduction subfeature; it does **not** certify the full Bible text, verse integrity, translation licensing, or on-device reading experience as complete. The latest merged release metadata is app version **1.4.19** and offline cache **v111**. PR #32 added the first offline Galilee Geography Centre, and PR #36 added the second offline regional locator for Jerusalem and Judea. The merged Geography Centre contains two regions, 12 source-attributed place records and three Scripture-linked reading sequences, with confidence and precision notes retained. PR #36 passed its full validation workflow (including dedicated Geography checks) and merged to `main` on 2026-11-15.
- The app's release/install status must be tracked separately from successful CI. A passing workflow does not prove an APK installs or upgrades correctly on the user's phone.


- **PR #44** and **PR #45** strengthened Personal Study Space backup and local-record safety. Malformed backup data is rejected rather than silently treated as empty; unreadable personal records are preserved when save/delete operations fail closed.
- **PR #46** normalized Psalm/Psalms topical-reference lookup and added a topical index integrity suite covering 104 studies and 519 Scripture links.
- **PR #47** corrected Words of Jesus navigation to locate the exact requested verse by its visible label.
- **PR #48** made Open Book Card PNG export adaptive: long passages and faith text use a full-width stacked layout, while shorter cards retain the open-book spread.
- **PR #49** made Reading Plans preserve unreadable or unsupported saved progress and added corruption regression tests.
- **PR #50** connected the home Open Book Scripture panel to exact bundled offline KJV retrieval, corrected Psalm/Psalms passage lookup and protected against stale asynchronous card loads. It also updated app version metadata to **1.4.19** and offline cache **v111**.
- **PR #51** recorded AI provider/hosting readiness findings. Gemini's reviewed terms and free-tier data practices do not fit the general-public family-accessible app; Groq remains only a possible limited pilot, Cloudflare Workers only a possible proxy host, and no provider or key has been selected.

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
