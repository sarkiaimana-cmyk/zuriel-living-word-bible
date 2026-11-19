# Zuriel Living Word Bible — Parts 15–18: Established Specifications

**Status:** Specification established; implementation and acceptance evidence remain separately tracked.  
**Applies to:** The 20-part Zuriel product specification and all future changes.  
**Product principles:** Free for users, Scripture-centred, offline-first, trustworthy, accessible, privacy-preserving, lightweight, and maintainable.

This document formally establishes Parts 15, 16, 17 and 18. “Established” here means the requirements, design rules, engineering contracts, acceptance criteria, and release gates are explicit and testable. It does **not** falsely certify that every feature described has already been implemented, merged, or tested on a physical Android device.

---

## Part 15 — Design and User Experience

### 15.1 Experience objectives

1. Make Scripture reading the primary experience, not a dashboard crowded with controls.
2. Maintain a premium, calm navy-led visual identity, with warm, readable content surfaces and restrained accent colours.
3. Keep the Home dashboard tidy, scannable and consistent. Prefer a small number of clearly grouped destinations over repeated cards or oversized promotional panels.
4. Make the app usable on narrow Android screens, including devices with limited display area and touch precision.
5. Preserve the user's reading place and navigation context when opening study tools and returning.
6. Make essential reading and previously stored resources usable without a network connection.
7. Avoid visual motion, overlays, or automatic content changes that interrupt reading or obscure controls.

### 15.2 Navigation and layout rules

- Every primary destination must have a clear label, predictable destination, visible active state, and reliable return path.
- Back navigation must return to the exact prior context where possible, including book, chapter, selected verse, scroll position, and open study context. A new chapter opens at verse 1 unless an explicit deep link selects another verse.
- Navigation controls must respect Android status/navigation bars, display cut-outs, safe areas, and bottom content clearance.
- Touch targets must be comfortably operable; adjacent destructive and non-destructive actions must not be easy to confuse.
- No modal, bottom sheet, or contextual menu may permanently cover Scripture text or trap the reader. Dismissal must be discoverable and work through the visible close/back affordance and appropriate platform back behaviour.
- Long content must scroll within its own panel without making the underlying reader jump or become inaccessible.
- Layouts must adapt to portrait/landscape and narrow/wide screens without clipping, horizontal overflow, hidden primary actions, or unreadable text.

### 15.3 Reading-screen interaction contract

- Scripture remains full-width, left-aligned, legible, and verse-by-verse. Verse text is visible by default.
- Tapping a verse opens a compact contextual action menu; it must not automatically expand every study section.
- Only the chosen action opens its corresponding content: Prayer, Declaration, Affirmation, Faith Confession, Inspiration, Compare Translations, Cross-references, Notes, or other approved study actions.
- Tapping an English word opens a compact word-detail surface. Contextual English meaning is shown first. Original-language details are shown only where a source establishes the exact link; related word studies must be labelled as related resources, not as the verse's verified lemma.
- Full study details may expand on demand. The default view must not overwhelm the reading column.
- Scripture wording and original devotional commentary must be visually distinguished and attributed appropriately.

### 15.4 Visual system and accessibility

- Define reusable design tokens for colour, spacing, typography, elevation, border, corner radius, focus, and interactive states. Do not introduce one-off styling where a token exists.
- Maintain readable contrast in light and dark themes; never rely on colour alone to communicate state.
- Text resizing must not clip verses, buttons, menus, or exported cards. Long passages and long declarations must reflow or stack rather than shrink to illegibility.
- Controls must have meaningful accessible names, visible focus/pressed/disabled states, and semantic grouping.
- Avoid flashing, rapid automatic rotation, and unnecessary animation. Any rotating Home Scripture must pause when the app is backgrounded or another section is active and must provide manual controls.
- Loading, empty, unavailable, offline, and error states must explain what happened and what the user can do next. Never display a fake success state.

### 15.5 Acceptance criteria

Part 15 is accepted only when:
- Home, reader, study, library, settings, and update journeys are audited end-to-end.
- No primary action is clipped or unreachable at supported mobile widths.
- Reader back/restore, verse menu, word panel, panel dismissal, safe areas, and independent scrolling pass automated interaction checks.
- Accessibility checks cover contrast, text scaling, touch target usability, labels, and keyboard/platform navigation where applicable.
- Screenshots or physical-device evidence confirm the approved navy-led design and readable layouts on Android.
- No known high-severity navigation, clipping, or data-loss defect remains open.

**Regression rule:** A new feature must not make the Home dashboard busier, compress the Scripture column, duplicate an existing destination, or remove a reliable back path without an explicitly reviewed product decision.

---

## Part 16 — Technical Architecture

### 16.1 Architecture objectives

The architecture must keep the web/PWA experience, offline data layer, service worker, optional remote services, and Capacitor Android shell coherent. The app must remain useful when optional providers are unavailable. No remote service may become a hidden dependency for opening the bundled Bible or accessing already stored personal data.

### 16.2 Layer boundaries

1. **Presentation layer:** screens, navigation, accessible controls, reader interactions, and view state. It must not contain provider secrets or duplicate business rules.
2. **Domain/application layer:** book/chapter/verse navigation, study workflows, faith-response selection, reading-plan progress, and validation rules. Keep data contracts explicit and testable.
3. **Content/data layer:** bundled KJV corpus and curated offline resources, source metadata, translation catalogues, user-owned records, and imported/downloaded resources. Distinguish canonical Scripture text from commentary and user edits.
4. **Persistence layer:** versioned local records, offline caches, and encrypted backup/restore. Personal data must be preserved on malformed input or storage failure; do not silently replace unreadable data with empty defaults.
5. **Network/provider layer:** optional translation, commentary, and future AI/audio providers. Use explicit adapters, timeouts, response validation, attribution, rate limits, and clear unavailable states.
6. **Platform layer:** service worker/PWA lifecycle and Capacitor Android bridges for file sharing, Gallery export, and platform-specific capabilities. Provide browser fallbacks where appropriate.

### 16.3 Data integrity and contracts

- Use stable canonical identifiers for books, chapters, verses, resources, and user records. Normalize aliases (for example, Psalm/Psalms) at boundaries rather than scattering special cases.
- Validate all Scripture references against the canonical 66-book corpus before a curated resource is accepted.
- Do not infer a Hebrew, Aramaic, or Greek lemma, morphology, Strong's identifier, or verse alignment from an English gloss or topic label.
- Store source, licence/permission status, attribution text, retrieval date/version where relevant, and editorial review state with externally sourced content.
- Keep original Scripture text immutable in user-editing flows. User annotations, adapted prayers, and saved declarations must be separate records linked to the source passage.
- Version persistent schemas. Migrations must be deterministic, tested, and non-destructive; retain recoverability when a migration cannot safely proceed.
- Deduplicate resources using stable IDs/references and report coverage using unique references, not raw record counts.

### 16.4 Offline-first and update architecture

- Bundle the core KJV and the minimum application assets needed to open and navigate the Bible offline.
- Precache every required local script, style, font, icon, and core data file; automated checks must fail when a referenced precache asset is missing, duplicated, unsafe, or out of sync with release metadata.
- Treat optional online translations and provider content as optional. An unavailable endpoint must not block KJV reading, local notes, or cached resources.
- Cache only material whose rights permit storage. Publisher-restricted translation text must not be persisted unless the specific licence explicitly allows it.
- Update metadata and service-worker cache versions must be advanced together when shipped assets change. Updates must not destroy notes, bookmarks, highlights, reading progress, or other personal data.
- Provide recoverable handling for quota exhaustion, interrupted downloads, stale cache, network loss, and partial resource corruption.

### 16.5 Security and privacy

- Never put API keys, signing credentials, tokens, or privileged provider headers in browser code, public repository files, app bundles, logs, or user-visible diagnostics.
- Route privileged provider calls through a protected server-side boundary; validate origin, input, output, rate limits, and allowed catalogue/version IDs.
- Minimise collection and transmission of personal study data. Do not send notes, journal entries, reading history, or personal prayer content to an AI/provider unless a separately approved, clearly disclosed feature explicitly requires it.
- Treat imported content, provider responses, and retrieved documents as untrusted data, never as executable instructions.
- Encrypt user backup exports using an authenticated encryption scheme; reject wrong-password, tampered, malformed, unsupported-schema, and oversized payloads safely.
- Keep Android signing identity and release secrets outside source control. Verify package ID, version, signature, and artifact integrity before distribution.

### 16.6 Performance and maintainability

- Load large study datasets on demand where possible; avoid blocking initial Scripture display on optional resources.
- Keep core reading responsive on modest Android hardware and constrained networks.
- Avoid duplicate data sources and parallel implementations of the same navigation or storage behaviour.
- Use small, explicit modules and documented interfaces; preserve existing APIs unless a migration is planned and tested.
- Add bounded retries/timeouts and cancellation for asynchronous work. Prevent stale requests from overwriting newer reader selections.
- Log actionable technical failures without exposing personal content or secrets.

### 16.7 Acceptance criteria

Part 16 is accepted only when:
- A documented module/data-flow map identifies all core layers and provider boundaries.
- Schema, migration, alias, reference-validation, and failure-handling tests pass.
- Core Bible reading and saved personal data remain functional with network disabled.
- Offline asset/precache and release-metadata consistency checks pass.
- Security checks find no client-embedded secrets or unauthorised personal-data transmission.
- Android and web builds use the same approved content contracts and do not regress core functionality.
- Performance checks on a representative modest Android device show no blocking load of optional study/provider data.

---

## Part 17 — Quality Assurance and Testing

### 17.1 Quality principles

A passing build is not proof of a correct app. Content integrity, functional behaviour, offline behaviour, privacy, accessibility, packaging, and real-device acceptance are separate evidence categories. A feature may be called complete only when its applicable evidence is recorded.

### 17.2 Required test layers

**A. Static and structural checks**
- JavaScript/module syntax, JSON parsing, duplicate identifiers, missing assets, broken imports, unsafe paths, and stale metadata.
- No secrets, private keys, tokens, or privileged headers in client bundles or tracked files.
- Required screen destinations, navigation targets, and offline precache references exist.

**B. Content and Scripture integrity**
- Exactly 66 unique books, 1,189 chapters, and 31,102 non-empty KJV verse records.
- Every curated Scripture reference resolves to a real book/chapter/verse or explicitly valid verse range.
- Validate unique coverage separately from raw records; detect duplicate and near-duplicate devotional entries.
- Contextual review checks that prayers, declarations, affirmations, confessions, commentary, and theological comparisons do not contradict the cited passage or turn it into an unsupported guarantee.
- Original-language claims require source-backed lemma/alignment/morphology evidence. Missing evidence must produce an honest unavailable/related-resource state.

**C. Functional and interaction tests**
- Book/chapter/verse selection, exact verse navigation, reader-position restoration, back behaviour, word selection, verse action menu, contextual panels, notes, bookmarks, highlights, search, reading plans, and saved library records.
- Test empty, loading, offline, provider-error, malformed-data, and permission-denied states.
- Verify save/edit/delete operations do not overwrite unrelated records or silently discard unreadable data.

**D. Offline and persistence tests**
- First launch with network, subsequent cold start with network disabled, chapter navigation, cached resource access, interrupted download, cache refresh, quota/storage failure, and recovery.
- Backup/restore round trips; wrong password and tamper rejection; schema migration; duplicate handling; merge behaviour; preservation of existing records.
- Ensure service-worker refresh does not strand users on mixed application versions or erase personal data.

**E. Security, privacy and rights tests**
- Provider proxy authentication/allowlists, CORS, rate limiting, response validation, attribution, secret isolation, and failure handling.
- Confirm no unlicensed translation/audio/commentary is cached, distributed, or played.
- Test AI prompt-injection resistance, Scripture citation verification, privacy boundaries, and safe refusal/escalation behaviour before any AI pilot is enabled.

**F. Accessibility and visual regression**
- Small-screen and large-text layouts, contrast, touch targets, safe areas, screen-reader labels, focus order, modal dismissal, orientation, and long-content wrapping.
- Compare representative screenshots for Home, reader, word pop-up, verse actions, study panels, personal library, Open Book Studio, and update screen.

**G. Build and release tests**
- Web/PWA production build, offline asset audit, Android debug build, signed release build, package/version metadata, APK signature verification, and artifact availability.
- Confirm signing-certificate continuity for upgrades; do not install a package with an unverified identity.

**H. Physical-device acceptance**
- Install fresh and upgrade an existing installation on a real supported Android phone.
- Test offline cold start, full chapter reading, touch interaction, safe-area layout, text scaling, share sheet, Gallery save, backup export/import, and update flow.
- Record device model/Android version, app version, test date, result, and defects. Emulator or CI evidence must not be represented as physical-device evidence.

### 17.3 Defect severity and release blockers

- **P0 — Critical:** data loss, Scripture corruption, secret exposure, unsafe installation/signature mismatch, or app cannot launch/read core Bible. Blocks release immediately.
- **P1 — High:** core reading/navigation broken, offline core unavailable, personal records overwritten, major security/privacy/rights failure, or severe accessibility obstruction. Blocks release.
- **P2 — Medium:** important secondary feature malfunction, repeatable layout defect, or incorrect study result with a safe workaround. Must be fixed or explicitly accepted with a documented plan before release.
- **P3 — Low:** cosmetic or minor usability defect without data, Scripture, security, or core-flow impact. May be scheduled, but must be recorded.

### 17.4 Evidence and completion record

Each feature/change must record:
- specification part(s) and acceptance criteria;
- implementation branch/commit and changed files;
- tests executed and exact workflow/run result;
- content/reference counts and validation method, where relevant;
- offline/security/licensing impact;
- merge status and release version/cache version;
- physical-device checks required, completed, or blocked;
- known limitations and follow-up owner/action.

Use these separate status terms consistently:
- **Specified:** requirements are documented.
- **Implemented:** code/content exists.
- **Integrated:** connected to the actual application flow and persistence/cache where required.
- **Automated checks passed:** named CI/tests passed on a stated commit.
- **Merged:** changes are on the production branch.
- **Released:** shipped artifact/site contains the change.
- **Device verified:** tested on a physical device with evidence.
- **Complete:** all applicable gates above have passed and no release-blocking defect remains.

### 17.5 Acceptance criteria

Part 17 is accepted when the test matrix, severity rules, evidence record, and completion vocabulary are adopted across the project; required automated suites are wired into CI; and release decisions explicitly distinguish CI success from real-device acceptance.

---

## Part 18 — Development Priorities and Delivery Governance

### 18.1 Priority principles

1. Protect the working app and user data before adding new features.
2. Fix correctness and navigation before expanding surface area.
3. Prefer complete, coherent vertical slices over disconnected feature fragments.
4. Prioritise offline core reading and study continuity over optional online features.
5. Build content breadth only with context, source traceability, uniqueness, and honest coverage reporting.
6. Keep the app free; no paid plan or new recurring cost may be assumed without explicit user approval.
7. Preserve the existing Zite project independently while maintaining the GitHub implementation.
8. Do not repeatedly interrupt the user with micro-status reports. Report at meaningful milestones, blockers requiring user action, or when a coherent deliverable is ready.

### 18.2 Dependency-ordered workstreams

**P0 — Protect and stabilise the foundation**
- Preserve production branch and personal-data compatibility.
- Verify current main commit, current app metadata, workflows, open PR overlaps, and release signing continuity.
- Keep full offline KJV reading reliable and repair any regression before new content expansion.

**P1 — Complete the Scripture reading journey**
- Validate full-width verse display, exact navigation and restore, contextual verse menu, word pop-up, cross-references, compare panel, notes/bookmarks/highlights, and read-aloud behaviour.
- Ensure every interaction has loading, unavailable, offline, and error states.

**P2 — Deepen core study content**
- Expand verse-specific faith responses across all 66 books with context and non-repetition checks.
- Expand passage commentary, topical dictionary, verified Hebrew/Greek/Aramaic study, and cross-reference trails.
- Expand theological comparison with fair representation, shared convictions, historical context, disputed points, and interpretive cautions.
- Expand Words of Jesus and book-specific pathways with exact reference navigation.

**P3 — Personal growth and worship**
- Audit devotionals, monthly Light devotional, Glory Verse Affirmation, prayer journal, testimony, reading plans, and SS&S.
- Keep worship material original or appropriately licensed; do not include unauthorised lyrics or recordings.

**P4 — Platform completion**
- Verify offline cache/update lifecycle, Android share/Gallery, backup/restore, accessibility, modest-device performance, and fresh install/upgrade.
- Implement recorded audio only after source and usage rights are verified.
- Implement AI only after privacy/provider/budget review and its safety test suite passes.

**P5 — Release and maintenance**
- Merge only reviewed, non-duplicative changes with passing checks.
- Synchronise app version, service-worker cache, update metadata, and release notes.
- Verify signed artifact identity and package metadata.
- Complete physical-device acceptance before claiming device readiness.
- Maintain a small, prioritised backlog and re-audit the 20-part scorecard after each coherent milestone.

### 18.3 Work item definition of ready

A task is ready to start only when it has:
- named specification part(s) and user-visible outcome;
- a clear description of current behaviour and desired behaviour;
- inspected existing implementation and relevant open branches/PRs;
- identified data, API, storage, offline, licensing, security, and Android implications;
- acceptance tests and failure cases;
- a bounded scope that can be implemented and reviewed as one coherent change.

### 18.4 Work item definition of done

A task is done only when:
- implementation is integrated, not merely added as unused data;
- automated tests and relevant validation pass;
- content and references are checked where applicable;
- offline/cache and personal-data implications are addressed;
- security/privacy/licensing review is complete;
- code diff is reviewed for regressions and duplication;
- merge/release state is accurately recorded;
- device checks are completed or clearly marked as a remaining external acceptance dependency.

### 18.5 Change management and user communication

- Never overwrite or delete established functionality without explicit reason and regression coverage.
- Do not merge an old or overlapping PR solely because its title sounds relevant; compare its actual diff against main and newer work.
- Keep changes isolated on a feature/spec branch until review and checks are complete.
- Do not call a draft PR merged, a CI build device-tested, an API key a live integration, a catalogue a full text resource, or partial coverage complete.
- Avoid asking the user to repeat known project decisions. Ask only when an actual owner action, permission, licence confirmation, or product decision is indispensable.
- Provide one consolidated completion report per coherent work package. Include exactly what changed, evidence, limitations, and the next meaningful milestone. Do not send repeated micro-progress reports.

### 18.6 Acceptance criteria

Part 18 is accepted when the dependency order, ready/done gates, branch/PR review rules, release discipline, no-cost constraint, Zite preservation rule, and milestone-based communication policy are the default workflow for every subsequent Zuriel task.

---

## Cross-part governance: completion cannot be overstated

Parts 15–18 are now formally specified. This is a specification milestone, not a claim that all product work in those areas is complete.

The project scorecard must show two distinct columns or statements:
1. **Specification status** — whether the requirements are established.
2. **Delivery status** — whether the software/content is implemented, integrated, validated, merged, released, and device verified.

A part may therefore be “Specification established / Delivery ongoing.” This is the honest and useful status, and it prevents the same confusion from recurring.

## Approval baseline

Unless the user explicitly changes a requirement, all future Zuriel work must follow this document together with the existing 20-part SRS and the non-negotiable verse-by-verse experience requirements.
