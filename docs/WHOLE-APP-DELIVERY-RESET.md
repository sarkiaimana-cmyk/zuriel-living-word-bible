# Zuriel — Whole-App Delivery Reset

## Purpose
Move development from isolated content batches to complete, integrated, user-ready systems. A passing CI run or open draft PR is not a finished feature; it is evidence for a proposed change only.

## Delivery rules
1. Prioritize end-to-end user flows and release blockers over additional catalogue volume.
2. Bundle related changes into larger, coherent delivery batches. Avoid PRs whose only purpose is tiny wording or cosmetic changes.
3. Each batch must identify the user-visible outcome, files and systems affected, tests, known gaps, and a safe rollback path.
4. Do not label a feature complete until its interface, data, navigation, offline behavior, accessibility, and packaging are checked as applicable.
5. Preserve the current main branch and user data. Do not merge or publish without explicit approval.
6. Avoid paid services, credentials, Cloudflare dependencies, or paid-builder requirements. Use free/local/offline paths where feasible.
7. Do not claim background work. Work only during active sessions and report durable evidence.

## Integrated completion tracks

### A. Core Bible reader
- [ ] 66-book navigation and chapter/verse selection
- [ ] Reliable offline KJV, search and reading position
- [ ] Selected-verse contextual actions, word links and translation comparison
- [ ] Clear loading, empty, error and offline states

### B. Study experience
- [ ] Book introductions, outlines, commentary and topical studies discoverable together
- [ ] Word study and cross-reference actions open the relevant passage
- [ ] Scripture accuracy checks and cautious handling of original-language claims
- [ ] Study panels remain compact and responsive

### C. Personal library and continuity
- [ ] Notes, bookmarks, highlights, prayers and testimony records
- [ ] Edit, delete, backup export and restore paths
- [ ] Safe persistence and recovery messaging
- [ ] Navigation return to prior reading location

### D. Devotional and guided growth
- [ ] Daily Scripture, verse-specific prayer, declaration, affirmation and application
- [ ] Reading plans with reliable progress persistence
- [ ] Prayer journal and testimony flow
- [ ] Reminder controls and accessibility

### E. Media and sharing
- [ ] Audio controls and reading position
- [ ] Open Book Card Studio with long-content handling
- [ ] Save, share and library workflows with truthful fallback messaging
- [ ] Worship study content separated from unlicensed lyrics/audio

### F. Release and integration
- [ ] Translation integration documented honestly; licensed keys never committed
- [ ] Web and Android assets synchronized
- [ ] Offline cache and recovery behavior tested
- [ ] Build, signing, upgrade and backup safeguards
- [ ] Release notes and artifact availability verified

## Delivery standard
A delivery batch should address multiple related user-visible gaps and leave the repository in a reviewable state. Content count alone is not a progress metric. Tests must be reported as passed, failed, not run, or blocked—never inferred.

## Current known caveat
The standalone repository's multi-translation integration has not yet been independently verified end-to-end. The user's existing Zite runtime translations are reported as working; that is separate from this repository. Do not request secrets in chat or commit credentials.
