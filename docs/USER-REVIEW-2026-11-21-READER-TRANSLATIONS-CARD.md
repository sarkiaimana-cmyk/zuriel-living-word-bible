# User review — reader clarity, translation reliability and Open Book Card

Review date: 2026-11-21  
Baseline: User reports that version 1.4.115 is opening and that many parts are working, but are not yet complete.

These are implementation acceptance requirements, not claims that the features already work.

## 1. Reader controls must be compact
- Move chapter reading controls, comfort controls (font size/reset), audio controls, voice selection, playback progress, and setup instructions into a compact collapsible drawer/accordion.
- Keep the Scripture itself prominent, full-width and readable. Controls must not cover verses or occupy the main reading area while collapsed.
- Drawer must be keyboard/touch accessible, state clear, and controls must remain usable at 44px touch targets.

## 2. Reader and Study Library must not duplicate the study experience
- Keep the reader focused on the selected passage.
- Tap a verse to open the contextual verse-action menu.
- Tap a word to open a compact lexical pop-up (when reliable word mapping exists).
- Do not place the full Study Library's topic cards, commentary, dictionaries, and study sections permanently in the reading page.
- Study content should be opened only after the reader selects the appropriate action and should be dismissible without losing passage location.

## 3. Original-language word-study acceptance
- Word study should provide the actual source-language form and trusted lexicon data, where available: Hebrew/Aramaic for Old Testament and Greek for New Testament.
- Include lemma, transliteration, pronunciation/part of speech and morphology only when data is validated; meanings, lexicon entry and relevant verse references.
- Clearly mark unavailable data. Never fabricate Greek/Hebrew entries or claim an English word has a unique original-language equivalent when mapping is uncertain.
- Related references should be visible as selectable passage links and should not silently alter the reader's location.

## 4. Simpler, cleaner section layout
- Each home/study section should use a small number of clear, consistent expandable panels, avoid repeated headings/cards and excessive vertical clutter.
- Fill phone viewport efficiently without horizontal overflow, overlapping controls, or text truncation.
- Verify phone width, zoom/text scaling, keyboard navigation, reduced motion and screen-reader labels through automated checks; physical Android testing remains required.

## 5. Translation availability is a release-critical issue
- The user reports GNT cannot load because the secure translation service is not connected and requests that all desired versions work.
- Investigate the licensed translation provider/API connection, authorization, app key handling, version availability, rate limits, failures and cache/offline policies.
- Do not substitute another translation when a selected version fails; present a truthful, actionable status and keep KJV available.
- Validate each configured translation with representative passages, chapter navigation, parallel reading, network failure and cache/offline behaviour.
- Copyright/permissions must be respected. Do not promise all translations or offline access until provider access and licences permit it.

## 6. Open Book Card Studio — supplied image is the visual acceptance target
- The user's supplied open-Bible card image is the target visual: realistic open Bible, premium navy/gold header/footer, radiant natural background, legible verse and title, restrained ornaments.
- The studio must use the chosen verse/title and preserve all text on long declarations/prayers without clipping.
- Save to Gallery and Share must both work on Android; support a fallback download/share route if native Gallery integration is unavailable.
- Validate exported PNG dimensions, readability, long-text handling, and both save/share actions in automated and physical-device testing.

## Priority sequence
1. Preserve a stable offline reader/KJV and verify service-worker recovery.
2. Remove reader/study duplication and compact the reader controls.
3. Make original-language word study data-driven and accurate.
4. Fix licensed translation service integration; this is release-critical and must not be falsely marked complete.
5. Repair Open Book Card export/save/share, matching the reference design.
6. Run automated checks and then physical Android testing.

## Evidence/status rules
- Automated tests are not physical device testing.
- A provider's unavailable translation is not considered implemented merely because a selector exists.
- Save/share is not certified until the image is produced and the relevant Android flow is tested.
- Do not mark any item complete without evidence.
