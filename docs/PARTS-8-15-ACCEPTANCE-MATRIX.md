# Zuriel Living Word Bible — Parts 8–15 Delivery and Acceptance Matrix

This matrix groups specification parts 8–15 into a single delivery target. Status is deliberately conservative: a repository check is not the same as usability on the user's physical Android device.

## Acceptance gates

Each part moves to **Established** only after its defined acceptance evidence is achieved. Code presence, documentation, or a passing text-pattern checker alone is insufficient for end-user verification. Automated CI, manual review, Android build, and physical-device evidence are recorded separately.

| Part | Area | Evidence presently available | Acceptance work still needed |
|---:|---|---|---|
| 8 | Christian Topics | Topical library checker validates 100+ topic records, required study fields, reflection prompts, unique titles, and reference labels/ranges against bundled KJV data; Psalm/Psalms alias and search tests exist. | Review topic theological/contextual accuracy, topic-to-reader navigation, usability and coverage; device testing. |
| 9 | Open Book Card Studio | Adaptive long-content export, PNG generation, native Gallery/share bridge and fallback paths are covered by automated checks. | Android gallery save, permissions, image clarity, long verse overflow, cancel/failure cases on device. |
| 10 | Personal Spiritual Library | Notes, highlights, prayer journal, history, plans, saved cards and encrypted backup/restore; runtime safeguards and corruption/rollback checks. | Device import/export, merge, file-picker, data persistence after upgrade and storage-failure tests. |
| 11 | Audio and Reading Plans | Offline reading plans, sequential progress, backup integration, local reminder opt-in and offline TTS checks. | Background/audio interruption and device TTS checks. Licensed recorded audio remains gated on rights and source availability. |
| 12 | Smart Search | Offline full-corpus search with word/phrase handling, result limits, total-match count and exact reference navigation safeguards. | Expand regression/runtime checks for result activation/highlighting, search responsiveness and phone usability. |
| 13 | Offline-first Architecture | Offline assets, service-worker precache, Android package preparation and KJV corpus integrity checks exist. | Cold-start airplane-mode tests, storage/cache recovery, package parity and physical-device validation. |
| 14 | AI Assistant | Safety specification and provider/privacy/security review documented; pilot Worker safeguards and route tests exist. | No public assistant is certified: provider selection, backend deployment, Scripture citation verification, prompt injection, privacy, pastoral-risk handling, offline/failure UX and budget limits require implementation and tests. |
| 15 | Design and User Experience | Responsive dashboard, safe-area layout, compact navigation, reader overlays and Study Centre drawer checks. | Touch accessibility on the phone, font scaling, screen-reader labels, visual overflow, back/navigation consistency and battery/performance. |

## Integrated cross-part regression gate

Before calling Parts 8–15 established, run the validation workflow and Android signed build against one integrated commit. Verify that:
- Offline KJV corpus and references are valid.
- Topic/search/library/reader links open the exact verse and recover to the previous context.
- Personal records are preserved across app update and backup/restore.
- Gallery and share exports do not silently fail.
- Reading-plan progress and offline assets survive restart.
- AI remains clearly gated until its deployment and safety acceptance criteria are met.
- No license-dependent translation or audio feature is represented as enabled without permission and configured service.
- CI results, emulator limitations, and physical-device verification are reported separately.

## Current release limitation

The signed Android APK build succeeds in CI, but the in-place upgrade test has been blocked by emulator software CPU configuration. PR #198 proposes the Android Emulator TCG opt-in; it must pass its own checks and rerun the upgrade test. This matrix does not claim a release or device upgrade is verified.
