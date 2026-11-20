/* Zuriel in-app update centre — safe web refresh checks and transparent Android status. */
(function () {
  "use strict";
  const APP_VERSION = "1.4.113";
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
      '<p class="settings-footnote">Website updates are refreshed through the app cache. Android APK replacement requires a matching, securely managed signing key and Android installation approval. Zuriel will never silently replace your app.</p>';
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
          status.textContent = "A newer Zuriel version is available: " + info.version + ".";
          notes.textContent = info.releaseNotes || "Open the latest published version when ready.";
        } else {
          status.textContent = "You are using the latest listed Zuriel version (" + APP_VERSION + ").";
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
            const apk = Array.isArray(release.assets)
              ? release.assets.find(asset => /Zuriel-Living-Word-Bible-release\\.apk$/i.test(asset.name))
              : null;
            if (apk && apk.browser_download_url) {
              status.textContent = "Official signed Android update " + info.version + " is available. Your current app and saved records are unchanged.";
              const install = document.createElement("a");
              install.href = apk.browser_download_url;
              install.textContent = "Download official Zuriel Android update";
              install.target = "_blank";
              install.rel = "noopener noreferrer";
              install.style.display = "block";
              install.style.textAlign = "center";
              install.style.padding = "13px";
              install.style.marginTop = "10px";
              install.style.borderRadius = "9px";
              install.style.background = "#19324f";
              install.style.color = "#fff";
              install.style.fontWeight = "700";
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