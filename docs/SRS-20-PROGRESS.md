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
| 4 | Advanced Bible Study | Partial; source-accurate word linking strengthened | PRs #6, #9, #10, #15 and #16 are merged. Includes explicit Hebrew/Greek/Aramaic labels, normalized RTL direction, source-attributed morphology, KJV word-annotation matching to BSB interlinear records by Strong's number, and same-index occurrences with KJV verse context. Six focused word-linking tests pass. Still required: broader verified morphology coverage, wider lexicon coverage, cross-chapter word study, richer contextual cross-references/commentary, and scholarly review. |
| 5 | Devotional and Daily Growth | Substantial implementation | Verify devotional depth, daily content, Glory Verse Affirmation, monthly Light Glory devotional, prayers, declarations, affirmations, and non-repetitive content. |
| 6 | Worship and Music | Partial | Review SS&S library, lawful content sources, worship/praise navigation, and offline behaviour. Do not bundle copyrighted lyrics without permission. |
| 7 | Words of Jesus | Initial dedicated experience merged; expansion remains | PR #11 adds 24 searchable/filterable Gospel teaching themes, verse links into the Bible reader, contextual study navigation, and saving to My Library. Continue expanding the teaching index, validating every reference and improving coverage across the four Gospels. |
| 8 | Christian Topics | Substantial implementation | Audit all topic guides and Scripture links, accuracy, coverage, search, and links into the reader and study tools. |
| 9 | Open Book Card Studio | Substantial implementation; device verification outstanding | PR #12 and PR #24 are merged: Scripture/faith typography controls, adaptive stacked layout for long content, PNG export, native file sharing where supported, download fallback, and the approved left-Scripture/right-declaration page order with exact branding. Automated Studio checks pass in PR and Android workflows. Verify real Android PNG rendering, file save/download behaviour, long-content layout and share cancellation on the user device. |
| 10 | Personal Spiritual Library | Substantial implementation; encrypted backup/restore merged | Notes, insights, prayer journal, reading history/progress, and password-encrypted backup/restore are integrated. Still verify browser download/import and Android file save/restore on real devices. |
| 11 | Audio and Reading Plans | Partial; reading plans implemented; Audio Bible gated by licensing | PR #25 adds three curated seven-day plans, sequential progress, passage navigation, private local storage, encrypted backup/restore, and offline/Android integration checks. Audio Bible provider research is recorded in `docs/AUDIO-BIBLE-LICENSING.md`. Playback, background audio, downloads, offline storage and backup remain blocked until provider entitlement and the specific audio IP Holder licence are confirmed. |
| 12 | Smart Search | Substantial implementation | Validate search accuracy, verse-result opening, highlighting, filters, and performance across the full Bible corpus. |
| 13 | Offline-First Architecture | Substantial implementation | Test cold-start offline, cache updates, missing-resource recovery, storage limits, and consistency across web and Android. |
| 14 | AI Assistant | Outstanding | Define safe, transparent, Scripture-referenced assistance; do not let generated explanations replace or alter Bible text. |
| 15 | Design and User Experience | Ongoing | Maintain premium navy visual direction, uncluttered home, readable typography, accessibility, responsive layouts, and consistent navigation. |
| 16 | Technical Architecture | Substantial implementation | Keep web modules, offline cache, data contracts, and Capacitor Android packaging aligned; verify each release build. |
| 17 | Quality Assurance and Testing | Partial / ongoing | Automated checks now include six focused KJV-to-interlinear word-linking cases, original-language integrity, backup/restore runtime, Words of Jesus and Studio checks. Continue regression, security/privacy, offline, accessibility and real-device testing. |
| 18 | Development Priorities | Active process | Work in dependency order, maintain this scorecard, and record blockers and acceptance evidence for each change. |
| 19 | Successful Release | Partial; APK identity checks added | PR #18 derives Android versionCode/versionName from version.json and verifies the signed APK package ID and version before artifact upload. The current signed build and artifact checks must pass; real-device install/upgrade and Studio verification remain required before recommending installation. |
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
- The app's release/install status must be tracked separately from successful CI. A passing workflow does not prove an APK installs or upgrades correctly on the user's phone.

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
