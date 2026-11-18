# Zuriel update architecture

## Update layers

1. **Content and web assets:** published web assets are versioned through `version.json` and refreshed by the service worker. Content downloads must be integrity-checked before replacing a working offline copy. User-created notes, prayers, highlights, bookmarks, reading position and backups are user data and must never be placed in a disposable application cache.
2. **Android application:** native code and bundled assets require a newly built APK/AAB. Android must approve installation unless the app is distributed through a managed deployment channel. An APK downloaded by the app cannot silently replace itself.
3. **Release trust:** every installable update must use the same Android application ID and the same private signing key as the installed app. Never commit the keystore or passwords. Store them only in protected GitHub Actions secrets or another secure signing service.

## Current verified project state

- The repository contains a Capacitor configuration and an Android build script.
- The Android native project is not currently tracked in the repository; CI therefore generates it with `npx cap add android` before syncing.
- The current in-app update centre checks the published version and can refresh the web service worker. It does not yet install APK files.
- No signing keystore or protected signing secrets have been verified. A production APK updater must not be advertised or enabled until signing continuity, package identity, installer approval and rollback behavior have been tested on a real Android device.

## Release process to complete before production APK updates

1. Confirm the permanent Android application ID from the APK already installed on the owner's phone. Do not change it.
2. Confirm the original signing certificate fingerprint. If the existing APK was signed with a key that is unavailable, a replacement APK cannot update that installation; a migration/reinstall plan is required.
3. Securely configure the matching keystore and passwords as repository secrets. Never ask the owner to paste secrets into chat or commit them.
4. Build a signed APK and publish it as a GitHub Release. Publish a manifest containing version, versionCode, package ID, APK URL, SHA-256 digest, certificate fingerprint and release notes.
5. Add a native Android installer bridge that verifies package ID, version, SHA-256 and signing certificate, then launches Android's package installer. Android still displays the system approval prompt.
6. Test update-over-installation, cancellation, offline behavior, rollback protection and preservation of all local study data before enabling production update notifications.

## CI validation

The Android workflow builds a debug APK artifact from the current source so the generated Capacitor Android project is compile-tested. A debug APK is for QA only: it is not a production update and must not be offered to existing users as an upgrade.
