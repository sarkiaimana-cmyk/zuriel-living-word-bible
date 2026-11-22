#!/usr/bin/env bash
set -euo pipefail

APK="android/app/build/outputs/apk/release/Zuriel-Living-Word-Bible-release.apk"
BUILD_TOOLS="$ANDROID_HOME/build-tools/36.0.0"
PACKAGE="com.zuriel.livingwordbible.release"
VERSION="$(node -p "JSON.parse(require('fs').readFileSync('version.json','utf8')).version")"
export VERSION
EXPECTED_CERT_SHA256="$(tr -d '[:space:]:' < android-signing-fingerprint.txt | tr '[:upper:]' '[:lower:]')"
PREVIOUS_DIR="$RUNNER_TEMP/zuriel-previous-release"
mkdir -p "$PREVIOUS_DIR"
test -s "$APK"

# Select the newest published release older than this build, rather than
# assuming a fixed previous version number.
PREVIOUS_TAG="$(gh release list --limit 50 --json tagName,publishedAt | node -e '
let raw = "";
process.stdin.on("data", chunk => raw += chunk).on("end", () => {
  const current = "v" + process.env.VERSION;
  const releases = JSON.parse(raw).filter(item =>
    item && typeof item.tagName === "string" && item.tagName !== current &&
    typeof item.publishedAt === "string"
  ).sort((a, b) => Date.parse(a.publishedAt) - Date.parse(b.publishedAt));
  const previous = releases[releases.length - 1];
  if (!previous) process.exit(2);
  process.stdout.write(previous.tagName);
});')"

echo "Testing in-place upgrade from $PREVIOUS_TAG to v$VERSION."
gh release download "$PREVIOUS_TAG" \
  --pattern "Zuriel-Living-Word-Bible-release.apk" \
  --dir "$PREVIOUS_DIR"
OLD_APK="$PREVIOUS_DIR/Zuriel-Living-Word-Bible-release.apk"
test -s "$OLD_APK"

# Android emulators can briefly lose the package-manager Binder connection
# after a long cold boot. Recover ADB and retry transient install failures;
# never uninstall the old package or weaken the signing/version assertions.
adb_recover() {
  adb kill-server >/dev/null 2>&1 || true
  adb start-server
  adb wait-for-device
  for attempt in 1 2 3 4 5 6; do
    if adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r' | grep -qx '1'; then
      return 0
    fi
    sleep 5
  done
  echo "Android emulator did not finish booting after ADB recovery."
  return 1
}
adb_install_retry() {
  local apk="$1"
  local flags="$2"
  for attempt in 1 2 3; do
    if [[ "$flags" == "replace" ]]; then
      adb install -r "$apk" && return 0
    else
      adb install "$apk" && return 0
    fi
    echo "Transient ADB/package-manager install failure (attempt $attempt/3); recovering."
    adb_recover
    sleep 3
  done
  echo "APK installation failed after ADB recovery attempts."
  return 1
}

OLD_BADGING="$("$BUILD_TOOLS/aapt" dump badging "$OLD_APK")"
printf '%s\n' "$OLD_BADGING" | grep -F "package: name='$PACKAGE'"
OLD_VERSION="$(printf '%s\n' "$OLD_BADGING" | sed -n "s/.*versionName='\\([^']*\\)'.*/\\1/p" | head -n 1)"
if [[ -z "$OLD_VERSION" || "$OLD_VERSION" == "$VERSION" || "$(printf '%s\n' "$OLD_VERSION" "$VERSION" | sort -V | tail -n 1)" != "$VERSION" ]]; then
  echo "Previous release package/version metadata is missing or not older than this build."
  exit 1
fi

OLD_CERT_SHA256="$("$BUILD_TOOLS/apksigner" verify --print-certs "$OLD_APK" | awk -F': ' '/Signer #1 certificate SHA-256 digest/ {print tolower($2)}')"
if [[ "$OLD_CERT_SHA256" != "$EXPECTED_CERT_SHA256" ]]; then
  echo "The previous release certificate does not match the established signing identity."
  exit 1
fi

# Install and launch the previously published signed app first.
adb_install_retry "$OLD_APK" "fresh"
adb shell pm path "$PACKAGE"
adb shell monkey -p "$PACKAGE" -c android.intent.category.LAUNCHER 1
sleep 5
adb shell dumpsys activity activities | grep -F "$PACKAGE"

# Install the new APK over the old package. Do not uninstall: success proves
# Android accepted the package/signature update path.
adb_install_retry "$APK" "replace"
INSTALLED_PACKAGE="$(adb shell dumpsys package "$PACKAGE" | tr -d '\r')"
printf '%s\n' "$INSTALLED_PACKAGE" | grep -F "versionName=$VERSION"
adb shell pm path "$PACKAGE"
adb shell monkey -p "$PACKAGE" -c android.intent.category.LAUNCHER 1
sleep 10
adb shell dumpsys activity activities | grep -F "$PACKAGE"

echo "Signed APK in-place upgrade smoke test passed: $PREVIOUS_TAG -> v$VERSION."
