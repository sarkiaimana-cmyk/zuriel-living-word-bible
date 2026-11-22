/* Zuriel in-app update centre — safe web refresh checks and transparent Android status. */
(function () {
  "use strict";
  const APP_VERSION = "2.10.0";
  const DISPLAY_VERSION = "2.10";
  const VERSION_URL = "https://raw.githubusercontent.com/sarkiaimana-cmyk/zuriel-living-word-bible/main/version.json";
  function mount() {
    const panel = document.getElementById("zurielSettingsPanel");
    if (!panel || document.getElementById("zurielAppUpdates")) return;
    const section = document.createElement("section");
    section.className = "settings-group";
    section.id = "zurielAppUpdates";
    section.innerHTML = '<h3>⬆️ App Updates</h3>' +
      '<p id="zurielUpdateCurrent" class="settings-footnote">Installed version: ' + APP_VERSION + '</p>' +
      '<p id="zurielUpdateStatus" role="status" aria-live="polite">Check for the latest Zuriel improvements.</p>' +
      '<button type="button" id="zurielCheckUpdates" style="width:100%">Check for Updates</button>' +
      '<div id="zurielUpdateNotes" class="settings-footnote"></div>' +
      '<p class="settings-footnote">Website updates are refreshed through the app cache. Important: install official Android updates over your existing Zuriel app. Do not uninstall it. When the app ID and signing certificate match, Android updates in place and keeps the app data. Export an encrypted backup before changing phones or removing the app.</p>';
    panel.appendChild(section);
    const status = section.querySelector("#zurielUpdateStatus");
    const notes = section.querySelector("#zurielUpdateNotes");
    const button = section.querySelector("#zurielCheckUpdates");
    button.addEventListener("click", async function () {
      button.disabled = true;
      status.textContent = "Checking the latest published version…";
      notes.textContent = "";
      try {
        const response = await fetch(VERSION_URL, { cache: "no-store" });
        if (!response.ok) throw new Error("Update information is not available right now.");
        const info = await response.json();
        if (!info || !info.version) throw new Error("The update information could not be verified.");
        const newer = compareVersions(info.version, APP_VERSION) > 0;
        if (newer) {
          status.textContent = "A newer Zuriel version is available: " + (info.displayVersion || info.version) + ".";
          notes.textContent = info.releaseNotes || "Open the latest published version when ready.";
        } else {
          status.textContent = "You are using the latest listed Zuriel version (" + DISPLAY_VERSION + ").";
          notes.textContent = info.releaseNotes || "No newer version is listed.";
        }
        if (!isNativeApp() && "serviceWorker" in navigator) {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            await registration.update();
            if (registration.waiting) {
              status.textContent += " A website update is ready. Reload Zuriel to apply it.";
              const apply = document.createElement("button");
              apply.type = "button";
              apply.textContent = "Reload to Apply Update";
              apply.style.width = "100%";
              apply.addEventListener("click", function () {
                registration.waiting.postMessage({ type: "SKIP_WAITING" });
                window.location.reload();
              });
              notes.appendChild(document.createElement("br"));
              notes.appendChild(apply);
            } else {
              status.textContent += " Website update check completed.";
            }
          } else {
            status.textContent += " Offline update service is not registered on this visit.";
          }
        } else if (isNativeApp()) {
          if (newer) {
            const releaseResponse = await fetch("https://api.github.com/repos/sarkiaimana-cmyk/zuriel-living-word-bible/releases/latest", {
              cache: "no-store",
              headers: { "Accept": "application/vnd.github+json" }
            });
            if (!releaseResponse.ok) throw new Error("The official Android release could not be checked right now.");
            const release = await releaseResponse.json();
            // Never pair version metadata with an unrelated "latest" APK.
            if (!release || release.tag_name !== "v" + info.version) {
              throw new Error("The official Android release tag does not match the advertised Zuriel version. No update was started.");
            }
            const apk = Array.isArray(release.assets)
              ? release.assets.find(asset =>
                  /Zuriel-Living-Word-Bible-release\.apk$/i.test(asset.name) &&
                  Number(asset.size) > 0 &&
                  /^[a-f0-9]{64}$/i.test(String(asset.digest || "").replace(/^sha256:/i, ""))
                )
              : null;
            if (apk && apk.browser_download_url) {
              status.textContent = "Official signed Android update " + info.version + " is available. Your current app and saved records are unchanged.";
              const install = document.createElement("button");
              install.type = "button";
              install.textContent = "Download & Install Zuriel Update";
              install.style.display = "block";
              install.style.width = "100%";
              install.style.marginTop = "10px";
              install.addEventListener("click", async function () {
                const nativeUpdater = window.Capacitor && typeof window.Capacitor.registerPlugin === "function" ? window.Capacitor.registerPlugin("ZurielUpdater") : null;
                const digest = String(apk.digest || "").replace(/^sha256:/i, "").toLowerCase();
                if (!nativeUpdater || typeof nativeUpdater.installUpdate !== "function") {
                  status.textContent = "The native update installer is not available in this installed build. Your current app and records are safe; use the official signed APK download only when you are ready.";
                  const fallback = document.createElement("a");
                  fallback.href = apk.browser_download_url;
                  fallback.textContent = "Open official APK download";
                  fallback.target = "_blank";
                  fallback.rel = "noopener noreferrer";
                  notes.appendChild(fallback);
                  return;
                }
                if (!/^[a-f0-9]{64}$/.test(digest)) {
                  status.textContent = "The official release did not provide a verifiable SHA-256 checksum. Zuriel has stopped the update to protect your installation.";
                  return;
                }
                install.disabled = true;
                status.textContent = "Downloading and verifying the official signed update…";
                try {
                  const result = await nativeUpdater.installUpdate({ url: apk.browser_download_url, sha256: digest });
                  if (result && result.needsPermission) {
                    status.textContent = "Android has opened the permission page. Allow Zuriel to install updates from this source, return here, and tap Download & Install Zuriel Update again.";
                  } else if (result && result.installerOpened) {
                    status.textContent = "The verified update is ready. In the Android installer, choose Update/Install. Do not uninstall Zuriel; Android should update the existing app and retain its saved studies.";
                  } else {
                    status.textContent = "Android did not confirm that the installer opened. Your existing app and saved data are unchanged.";
                  }
                } catch (error) {
                  status.textContent = error && error.message ? error.message : "The update could not be installed. Your existing app and saved data are unchanged.";
                } finally {
                  install.disabled = false;
                }
              });
              notes.appendChild(document.createElement("br"));
              notes.appendChild(install);
              const reminder = document.createElement("p");
              reminder.textContent = "Android will ask you to approve the installation. Choose Update/Install; do not uninstall Zuriel. If Android reports a signature or package conflict, cancel and keep the existing app.";
              notes.appendChild(reminder);
            } else {
              status.textContent = "A newer website version is listed, but no official signed Android APK has been published for it yet. Your current app and data are unchanged.";
            }
          } else {
            status.textContent += " Android release check completed. Your installed app and personal records are unchanged.";
          }
        }
      } catch (error) {
        status.textContent = error.message || "Could not check for updates. Please try again when connected.";
      } finally {
        button.disabled = false;
      }
    });
  }
  function isNativeApp() {
    return !!(window.Capacitor && typeof window.Capacitor.isNativePlatform === "function" && window.Capacitor.isNativePlatform());
  }
  function compareVersions(a, b) {
    const left = String(a).split(".").map(Number);
    const right = String(b).split(".").map(Number);
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      const difference = (left[i] || 0) - (right[i] || 0);
      if (difference) return difference;
    }
    return 0;
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true });
  else mount();
  window.ZurielAppUpdates = { version: APP_VERSION, open: function () {
    if (window.ZurielSettings) window.ZurielSettings.open();
    const target = document.getElementById("zurielAppUpdates");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }};
})();