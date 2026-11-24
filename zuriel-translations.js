/* Secure, optional YouVersion translation comparison. KJV remains the offline source. */
(function () {
  "use strict";

  let API_BASE = String(window.ZURIEL_TRANSLATION_API_BASE || "").trim().replace(/\/+$/, "");
  let apiBasePromise = null;
  const reader = document.getElementById("bibleReader");

  function validWorkerEndpoint(value) {
    try {
      const parsed = new URL(String(value || "").trim());
      return parsed.protocol === "https:" &&
        parsed.hostname.startsWith("zuriel-bible-translations.") &&
        parsed.hostname.endsWith(".workers.dev") &&
        parsed.pathname === "/" &&
        !parsed.search && !parsed.hash;
    } catch (_) {
      return false;
    }
  }

  async function resolveApiBase() {
    if (validWorkerEndpoint(API_BASE)) return API_BASE;
    if (apiBasePromise) return apiBasePromise;
    apiBasePromise = (async function () {
      try {
        const response = await fetch(
          "./version.json",
          {
            method: "GET",
            cache: "no-cache",
            credentials: "omit",
            referrerPolicy: "no-referrer",
            headers: { "Accept": "application/json" }
          }
        );
        if (!response.ok) return "";
        const metadata = await response.json();
        const candidate = String(metadata && metadata.translationApiBase || "").trim().replace(/\/+$/, "");
        if (!validWorkerEndpoint(candidate)) return "";
        API_BASE = candidate;
        return API_BASE;
      } catch (_) {
        return "";
      }
    })();
    const resolved = await apiBasePromise;
    if (!resolved) apiBasePromise = null;
    return resolved;
  }
  if (!reader || document.getElementById("zurielTranslationCompare")) return;

  let currentChapter = null;
  let versionsLoaded = false;
  let loadedProvider = "";
  let versionsLoading = false;
  let catalogueSequence = 0;
  let selectedProvider = "youversion";
  let selectedVersionId = "";
  let requestSequence = 0;
  let activeController = null;

  function node(tag, className, value) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (value !== undefined) element.textContent = value;
    return element;
  }

  function status(message) {
    statusNode.textContent = message;
  }

  const style = node("style");
  style.textContent =
    "#zurielTranslationCompare{margin:16px 0;padding:13px;border:1px solid #cbd8d0;border-radius:13px;background:#f7faf7;color:#203a31}" +
    "#zurielTranslationCompare summary{cursor:pointer;min-height:44px;display:flex;align-items:center;font-weight:700;color:#193e32}" +
    "#zurielTranslationCompare .ztc-note{font:13px/1.55 Arial,sans-serif;color:#596b62;margin:8px 0}" +
    "#zurielTranslationCompare select,#zurielTranslationCompare button{width:100%;min-height:46px;margin:7px 0;padding:10px;border:1px solid #aabbb0;border-radius:9px;background:#fff;color:#193e32;font-size:15px}" +
    "#zurielTranslationCompare button{background:#193e32;color:#fff;font-weight:700}" +
    "#zurielTranslationCompare button:disabled{opacity:.5}" +
    "#zurielTranslationCompare .ztc-status{min-height:22px;font:600 13px/1.5 Arial,sans-serif;color:#315b48}" +
    "#zurielTranslationCompare .ztc-passage{white-space:pre-wrap;overflow-wrap:anywhere;padding:12px;margin:10px 0;background:#fff;border:1px solid #d9e1dc;border-radius:9px;font:16px/1.75 Georgia,serif;color:#203a31}" +
    "#zurielTranslationCompare .ztc-attribution{font:12px/1.55 Arial,sans-serif;color:#58675f;border-top:1px solid #d8e1da;padding-top:9px}";
  document.head.appendChild(style);

  const panel = node("details");
  panel.id = "zurielTranslationCompare";
  const summary = node("summary", "", "🌐 Compare another Bible translation (online)");
  const note = node("p", "ztc-note",
    "The King James Version remains available offline. Load authorised translations online when connected. API.Bible keeps only the most recently viewed chapter per translation for offline reading and refreshes it within 14 days. YouVersion passages are shown online only unless the publisher explicitly permits offline storage. NET Bible passages are online-only and are not stored offline.");
  const controls = node("div");
  const providerSelect = node("select");
  providerSelect.setAttribute("aria-label", "Choose online Bible translation provider");
  [
    ["youversion", "YouVersion Platform"],
    ["api-bible", "API.Bible"],
    ["net-bible", "NET Bible (Bible.org)"]
  ].forEach(([value, label]) => {
    const option = node("option", "", label);
    option.value = value;
    providerSelect.appendChild(option);
  });
  const statusNode = node("p", "ztc-status", "");
  statusNode.setAttribute("role", "status");
  statusNode.setAttribute("aria-live", "polite");
  const output = node("div");
  const select = node("select");
  select.setAttribute("aria-label", "Choose an authorised English Bible translation");
  const offlineSelect = node("select");
  offlineSelect.setAttribute("aria-label", "Choose a translation saved on this device");
  offlineSelect.hidden = true;
  const offlinePlaceholder = node("option", "", "Translations saved on this device");
  offlinePlaceholder.value = "";
  offlineSelect.appendChild(offlinePlaceholder);
  let selectedVersionLabel = "";
  const loadButton = node("button", "", "Load this chapter");
  loadButton.type = "button";
  loadButton.disabled = true;
  const downloadButton = node("button", "", "Save current chapter offline");
  downloadButton.type = "button";
  downloadButton.disabled = true;
  const downloadProgress = node("p", "ztc-status", "");
  downloadProgress.setAttribute("role", "status");
  downloadProgress.setAttribute("aria-live", "polite");
  const passageHeading = node("h3", "", "");
  const passage = node("pre", "ztc-passage", "");
  passage.hidden = true;
  const attribution = node("p", "ztc-attribution", "");
  attribution.hidden = true;

  controls.append(providerSelect, offlineSelect, select, loadButton, downloadButton, downloadProgress, statusNode);
  output.append(passageHeading, passage, attribution);
  panel.append(summary, note, controls, output);
  const homeTranslationSlot = document.getElementById("zurielHomeTranslations");
  if (homeTranslationSlot) {
    summary.textContent = "Choose a translation, compare versions or manage offline downloads";
    panel.open = true;
    homeTranslationSlot.appendChild(panel);
  } else {
    reader.appendChild(panel);
    /* The home dashboard is mounted on DOMContentLoaded by zuriel-home.js. */
    document.addEventListener("DOMContentLoaded", function () {
      const readyHomeSlot = document.getElementById("zurielHomeTranslations");
      if (readyHomeSlot && panel.parentNode !== readyHomeSlot) {
        summary.textContent = "Choose a translation, compare versions or manage offline downloads";
        panel.open = true;
        readyHomeSlot.appendChild(panel);
      }
    }, { once: true });
  }

  function apiUrl(path) {
    return API_BASE + path;
  }

  async function requestJson(path, controller) {
    const response = await fetch(apiUrl(path), {
      method: "GET",
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      headers: { "Accept": "application/json" },
      signal: controller ? controller.signal : undefined
    });
    let payload;
    try {
      payload = await response.json();
    } catch (error) {
      throw new Error("The translation service returned an unreadable response.");
    }
    if (!response.ok) {
      throw new Error(payload && typeof payload.error === "string"
        ? payload.error
        : "The selected translation is not available right now.");
    }
    return payload;
  }

  async function loadVersions() {
    if (versionsLoaded && loadedProvider === selectedProvider) return;
    if (versionsLoading) return;
    versionsLoading = true;
    const catalogueRequestId = ++catalogueSequence;
    const providerAtRequest = selectedProvider;
    if (!await resolveApiBase()) {
      if (catalogueRequestId === catalogueSequence) {
        const offline = await refreshOfflineDownloadOptions();
        select.hidden = true;
        downloadButton.hidden = true;
        loadButton.hidden = offline.length === 0;
        loadButton.disabled = !selectedVersionId || !currentChapter;
        status(offline.length
          ? "Internet translation access is unavailable. Choose a translation already saved on this device to read it offline."
          : "Secure online translation access has not been connected yet. Your offline KJV is unchanged.");
        versionsLoading = false;
      }
      return;
    }
    select.hidden = false;
    loadButton.hidden = false;
    downloadButton.hidden = !canStoreOffline(providerAtRequest);
    select.disabled = true;
    loadButton.disabled = true;
    status("Checking the English Bible versions authorised for " +
      (providerAtRequest === "youversion" ? "YouVersion" : providerAtRequest === "net-bible" ? "NET Bible" : "API.Bible") + "…");
    try {
      let available = [];
      let nextPageToken = "";
      if (providerAtRequest === "youversion") {
        const catalogue = [];
        const seenTokens = new Set();
        let pageCount = 0;
        do {
          const pagePath = "/api/youversion/bibles" +
            (nextPageToken ? "?next_page_token=" + encodeURIComponent(nextPageToken) : "");
          const payload = await requestJson(pagePath);
          if (!payload || !Array.isArray(payload.data)) {
            throw new Error("The YouVersion authorised Bible version list could not be verified.");
          }
          catalogue.push(...payload.data);
          const token = typeof payload.next_page_token === "string"
            ? payload.next_page_token.trim()
            : "";
          if (!token) {
            nextPageToken = "";
            break;
          }
          if (seenTokens.has(token)) {
            throw new Error("YouVersion repeated a catalogue page token. Please retry the version list.");
          }
          seenTokens.add(token);
          nextPageToken = token;
          pageCount++;
        } while (nextPageToken && pageCount < 10);

        const uniqueVersions = new Map();
        catalogue.forEach(item => {
          if (!item || !Number.isInteger(Number(item.id)) ||
              typeof item.title !== "string" ||
              typeof item.abbreviation !== "string" ||
              (item.language && item.language.iso_639_1 && item.language.iso_639_1 !== "en")) return;
          uniqueVersions.set(String(item.id), item);
        });
        available = Array.from(uniqueVersions.values());
      } else if (providerAtRequest === "api-bible") {
        const payload = await requestJson("/api/api-bible/bibles");
        if (!payload || !Array.isArray(payload.data)) {
          throw new Error("The API.Bible authorised Bible version list could not be verified.");
        }
        const uniqueVersions = new Map();
        payload.data.forEach(item => {
          if (!item || typeof item.id !== "string" ||
              !/^[a-f0-9]{16}-\d{2}$/i.test(item.id) ||
              typeof item.title !== "string" ||
              typeof item.abbreviation !== "string") return;
          uniqueVersions.set(item.id, item);
        });
        available = Array.from(uniqueVersions.values());
      } else {
        available = [{ id: "net", title: "New English Translation", abbreviation: "NET" }];
      }

      if (catalogueRequestId !== catalogueSequence) return;
      select.replaceChildren(node("option", "", "Choose an available translation"));
      available.forEach(item => {
        const option = node("option", "", item.abbreviation + " — " + item.title);
        option.value = String(item.id);
        select.appendChild(option);
      });
      selectedVersionId = "";
      selectedVersionLabel = "";
      versionsLoaded = true;
      loadedProvider = providerAtRequest;
      select.disabled = false;
      loadButton.disabled = true;
      const providerName = providerAtRequest === "youversion" ? "YouVersion" : providerAtRequest === "net-bible" ? "NET Bible" : "API.Bible";
      status(available.length
        ? available.length + " English version(s) are available from " + providerName + ". " +
          (nextPageToken ? "The catalogue is large; the first 990 results are shown. " : "") +
          "Choose one to compare."
        : "No English Bible versions are currently available from " + providerName + ". The offline KJV remains available.");
    } catch (error) {
      if (catalogueRequestId === catalogueSequence) {
        select.disabled = true;
        loadButton.disabled = true;
        const offline = await refreshOfflineDownloadOptions();
        if (offline.length) {
          select.hidden = true;
          loadButton.hidden = false;
          loadButton.disabled = !selectedVersionId || !currentChapter;
          downloadButton.hidden = true;
        }
        status(error.message || (offline.length
          ? "Online translation access is unavailable. You can still open a saved offline translation."
          : "Online translation access is temporarily unavailable."));
      }
    } finally {
      if (catalogueRequestId === catalogueSequence) versionsLoading = false;
    }
  }

  function updateChapter(detail) {
    if (!detail || typeof detail.book !== "string" ||
        !Number.isInteger(Number(detail.chapter)) || Number(detail.chapter) < 1) return;
    currentChapter = { book: detail.book, chapter: Number(detail.chapter) };
    requestSequence++;
    if (activeController) activeController.abort();
    passage.hidden = true;
    attribution.hidden = true;
    passage.textContent = "";
    passageHeading.textContent = "";
    if (panel.open) {
      loadButton.disabled = !selectedVersionId;
      status("Ready to compare " + currentChapter.book + " " + currentChapter.chapter +
        ". Select an authorised version and load it when you choose.");
    }
  }

  const TRANSLATION_CACHE_DB = "zuriel-translation-cache-v1";
  const API_BIBLE_CACHE_MAX_AGE = 14 * 24 * 60 * 60 * 1000;

  let translationDb = null;
  let translationDbPromise = null;

  function openTranslationCache() {
    if (translationDb) return Promise.resolve(translationDb);
    if (translationDbPromise) return translationDbPromise;
    const pending = new Promise(resolve => {
      if (!("indexedDB" in window)) { resolve(null); return; }
      let request;
      let settled = false;
      try { request = window.indexedDB.open(TRANSLATION_CACHE_DB, 2); }
      catch (_) { resolve(null); return; }
      request.onupgradeneeded = function () {
        const db = request.result;
        if (!db.objectStoreNames.contains("chapters")) {
          db.createObjectStore("chapters", { keyPath: "key" });
        }
        if (!db.objectStoreNames.contains("downloads")) {
          db.createObjectStore("downloads", { keyPath: "key" });
        }
      };
      request.onsuccess = function () {
        if (settled) { request.result.close(); return; }
        settled = true;
        resolve(request.result);
      };
      request.onerror = function () {
        if (settled) return;
        settled = true;
        resolve(null);
      };
      request.onblocked = function () {
        if (settled) return;
        settled = true;
        resolve(null);
      };
    });
    translationDbPromise = pending;
    pending.then(db => {
      translationDbPromise = null;
      if (db) {
        translationDb = db;
        db.onversionchange = function () {
          db.close();
          if (translationDb === db) translationDb = null;
        };
      }
    });
    return pending;
  }

  function canStoreOffline(provider) {
    // YouVersion publisher permissions are version-specific and are not
    // verified by this client. Keep its passages online-only by default.
    return provider === "api-bible";
  }

  function translationCacheKey(provider, versionId, reference) {
    return [provider, String(versionId), String(reference)].join("|");
  }

  async function saveDownloadRecord(provider, versionId, label, totalChapters, completedChapters) {
    const db = await openTranslationCache();
    if (!db) return false;
    return new Promise(resolve => {
      try {
        const tx = db.transaction("downloads", "readwrite");
        tx.objectStore("downloads").put({
          key: provider + "|" + String(versionId), provider, versionId: String(versionId),
          label: String(label || "Downloaded Bible translation"),
          totalChapters: Number(totalChapters) || 0,
          completedChapters: Number(completedChapters) || 0,
          updatedAt: Date.now()
        });
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function () { resolve(false); };
        tx.onabort = function () { resolve(false); };
      } catch (_) { resolve(false); }
    });
  }

  async function refreshOfflineDownloadOptions() {
    await pruneCachedTranslationChapters();
    const db = await openTranslationCache();
    if (!db) return [];
    const records = await new Promise(resolve => {
      try {
        const request = db.transaction("downloads", "readonly").objectStore("downloads").getAll();
        request.onsuccess = function () { resolve(Array.isArray(request.result) ? request.result : []); };
        request.onerror = function () { resolve([]); };
      } catch (_) { resolve([]); }
    });
    offlineSelect.replaceChildren();
    const placeholder = node("option", "", "Choose a translation saved on this device");
    placeholder.value = "";
    offlineSelect.appendChild(placeholder);
    const legacyYouVersionRecords = records.filter(record => record && record.provider === "youversion");
    if (legacyYouVersionRecords.length) {
      try {
        const tx = db.transaction("downloads", "readwrite");
        const store = tx.objectStore("downloads");
        legacyYouVersionRecords.forEach(record => store.delete(record.key || ("youversion|" + record.versionId)));
      } catch (_) { /* Legacy YouVersion manifests are ignored if cleanup is unavailable. */ }
    }
    const valid = records.filter(record => record &&
      record.provider === "api-bible" &&
      typeof record.versionId === "string" && record.versionId &&
      typeof record.label === "string" && record.label);
    valid.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    valid.forEach(record => {
      const providerName = record.provider === "youversion" ? "YouVersion" : "API.Bible";
      const option = node("option", "", record.label + " · " + providerName + " · last viewed chapter saved");
      option.value = record.key;
      option.dataset.provider = record.provider;
      option.dataset.versionId = record.versionId;
      option.dataset.label = record.label;
      offlineSelect.appendChild(option);
    });
    offlineSelect.hidden = valid.length === 0;
    return valid;
  }

  async function readCachedChapter(provider, versionId, reference) {
    if (!canStoreOffline(provider)) return null;
    const db = await openTranslationCache();
    if (!db) return null;
    return new Promise(resolve => {
      try {
        const request = db.transaction("chapters", "readonly").objectStore("chapters")
          .get(translationCacheKey(provider, versionId, reference));
        request.onsuccess = function () {
          const saved = request.result;
          const expired = provider === "api-bible" &&
            (!saved || !Number.isFinite(saved.savedAt) || Date.now() - saved.savedAt > API_BIBLE_CACHE_MAX_AGE);
          if (!saved || expired || !saved.payload || !saved.payload.passage ||
              typeof saved.payload.passage.content !== "string" || !saved.payload.passage.content.trim() ||
              ((typeof saved.payload.passage.copyright !== "string" || !saved.payload.passage.copyright.trim()) &&
               (typeof saved.payload.passage.promotional_content !== "string" || !saved.payload.passage.promotional_content.trim()))) {
            resolve(null); return;
          }
          resolve(saved.payload);
        };
        request.onerror = function () { resolve(null); };
      } catch (_) { resolve(null); }
    });
  }

  async function saveCachedChapter(provider, versionId, reference, payload) {
    if (!canStoreOffline(provider)) return false;
    if (!payload || !payload.passage || typeof payload.passage.content !== "string" ||
        !payload.passage.content.trim() || (typeof payload.passage.copyright !== "string" || !payload.passage.copyright.trim()) &&
        (typeof payload.passage.promotional_content !== "string" || !payload.passage.promotional_content.trim())) return false;
    const db = await openTranslationCache();
    if (!db) return false;
    return new Promise(resolve => {
      try {
        const tx = db.transaction("chapters", "readwrite");
        const store = tx.objectStore("chapters");
        const key = translationCacheKey(provider, versionId, reference);
        const prefix = provider + "|" + String(versionId) + "|";
        const keys = store.getAllKeys();
        keys.onsuccess = function () {
          // API.Bible asks apps to keep cached text below 500 consecutive
          // verses. Keep only the most recently viewed chapter per version.
          (Array.isArray(keys.result) ? keys.result : []).forEach(savedKey => {
            if (typeof savedKey === "string" && savedKey.startsWith(prefix) && savedKey !== key) {
              store.delete(savedKey);
            }
          });
          store.put({ key, savedAt: Date.now(), payload });
        };
        keys.onerror = function () { try { tx.abort(); } catch (_) {} };
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function () { resolve(false); };
        tx.onabort = function () { resolve(false); };
      } catch (_) { resolve(false); }
    });
  }

  async function pruneCachedTranslationChapters() {
    const db = await openTranslationCache();
    if (!db) return;
    const records = await new Promise(resolve => {
      try {
        const request = db.transaction("chapters", "readonly").objectStore("chapters").getAll();
        request.onsuccess = function () { resolve(Array.isArray(request.result) ? request.result : []); };
        request.onerror = function () { resolve([]); };
      } catch (_) { resolve([]); }
    });
    const newestByVersion = new Map();
    records.forEach(record => {
      if (!record || typeof record.key !== "string" || !record.key.startsWith("api-bible|") ||
          !Number.isFinite(record.savedAt) || Date.now() - record.savedAt > API_BIBLE_CACHE_MAX_AGE) return;
      const versionId = record.key.split("|")[1] || "";
      if (!versionId) return;
      const previous = newestByVersion.get(versionId);
      if (!previous || record.savedAt > previous.savedAt) newestByVersion.set(versionId, record);
    });
    await new Promise(resolve => {
      try {
        const tx = db.transaction("chapters", "readwrite");
        const store = tx.objectStore("chapters");
        records.forEach(record => {
          if (!record || typeof record.key !== "string") return;
          if (record.key.startsWith("youversion|")) {
            // Remove legacy YouVersion text cached before publisher permissions
            // were verified; the current reader never stores these passages.
            store.delete(record.key);
            return;
          }
          if (!record.key.startsWith("api-bible|")) return;
          const versionId = record.key.split("|")[1] || "";
          if (!versionId || newestByVersion.get(versionId) !== record) store.delete(record.key);
        });
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { resolve(); };
        tx.onabort = function () { resolve(); };
      } catch (_) { resolve(); }
    });
  }

  async function readCachedApiBibleChapter(versionId, reference) {
    return readCachedChapter("api-bible", versionId, reference);
  }

  async function saveApiBibleChapter(versionId, reference, payload) {
    return saveCachedChapter("api-bible", versionId, reference, payload);
  }

  async function hasFreshCachedChapter(provider, versionId, reference) {
    return Boolean(await readCachedChapter(provider, versionId, reference));
  }

  let downloadRunning = false;
  async function downloadSelectedTranslation() {
    if (!canStoreOffline(selectedProvider)) {
      downloadProgress.textContent = "This YouVersion passage is online-only unless its publisher explicitly permits offline storage. No local copy was created.";
      return;
    }
    if (downloadRunning) return;
    if (!selectedVersionId || !currentChapter || !await resolveApiBase()) {
      status("Connect to the secure translation service, open a chapter and select an authorised translation first.");
      return;
    }
    const bookCode = typeof window.ZurielBibleBookCode === "function"
      ? window.ZurielBibleBookCode(currentChapter.book) : null;
    if (!bookCode) {
      status("The selected Bible book could not be mapped to the API.Bible chapter index.");
      return;
    }
    const provider = selectedProvider;
    const versionId = selectedVersionId;
    const reference = bookCode + "." + currentChapter.chapter;
    const cached = await readCachedChapter(provider, versionId, reference);
    if (cached) {
      downloadProgress.textContent = "The current chapter is already saved for offline reading. To stay within API.Bible's cache guidance, Zuriel keeps only the most recently viewed chapter for this translation.";
      return;
    }
    downloadRunning = true;
    downloadButton.disabled = true;
    downloadButton.textContent = "Saving current chapter…";
    downloadProgress.textContent = "Saving " + currentChapter.book + " " + currentChapter.chapter + " for offline reading…";
    try {
      await loadPassage();
      const saved = await readCachedChapter(provider, versionId, reference);
      if (saved) {
        downloadProgress.textContent = "Saved " + currentChapter.book + " " + currentChapter.chapter +
          " for offline reading. Only this most recently viewed chapter is retained for this API.Bible translation.";
      } else {
        downloadProgress.textContent = "The current chapter could not be saved. Check the publisher attribution and connection, then try again.";
      }
    } finally {
      downloadRunning = false;
      downloadButton.disabled = !selectedVersionId || !currentChapter;
      downloadButton.textContent = "Save current chapter offline";
    }
  }

  function renderPassage(payload, offline) {
    const item = payload && payload.passage;
    if (!item || typeof item.content !== "string" || !item.content.trim()) {
      throw new Error("No passage text was returned for this chapter.");
    }
    const copyright = typeof item.copyright === "string" ? item.copyright.trim() : "";
    const promotional = typeof item.promotional_content === "string" ? item.promotional_content.trim() : "";
    if (!copyright && !promotional) {
      throw new Error("Publisher attribution was not supplied. Zuriel has withheld this passage until its attribution can be verified.");
    }
    if (selectedProvider === "api-bible" && !offline) {
      const fumsToken = payload && payload.meta && typeof payload.meta.fumsToken === "string"
        ? payload.meta.fumsToken.trim() : "";
      if (!fumsToken || typeof window.fums !== "function") {
        throw new Error("API.Bible Fair Use reporting is not ready. Zuriel has withheld this chapter until reporting can be completed.");
      }
      window.fums("trackView", fumsToken);
    }
    const providerName = selectedProvider === "youversion" ? "YouVersion" : selectedProvider === "net-bible" ? "NET Bible" : "API.Bible";
    const selectedLabel = select.options[select.selectedIndex]
      ? String(select.options[select.selectedIndex].textContent || "").split("—").slice(1).join("—").trim()
      : "";
    passageHeading.textContent = (item.reference || (currentChapter.book + " " + currentChapter.chapter)) +
      " — " + ((payload.version && (payload.version.abbreviation || payload.version.title)) || selectedVersionLabel || selectedLabel || "Selected translation") +
      " (" + providerName + ")";
    passage.textContent = selectedProvider === "net-bible" ? item.content + "\n\n(NET)" : item.content;
    passage.hidden = false;
    if (selectedProvider === "net-bible") {
      attribution.replaceChildren();
      attribution.appendChild(document.createTextNode(copyright + " "));
      const link = document.createElement("a");
      link.href = "https://netbible.org";
      link.textContent = "NET Bible";
      link.rel = "noopener noreferrer";
      attribution.appendChild(link);
      attribution.appendChild(document.createTextNode(". This passage is online-only and has not been saved for offline reading."));
    } else {
      attribution.textContent = [
        copyright,
        promotional,
        offline
          ? "Offline copy saved on this device. API.Bible content must be refreshed online within 14 days."
          : (selectedProvider === "api-bible"
            ? "This chapter is saved on this device for offline reading; it must be refreshed online within 14 days."
            : "YouVersion publisher text is displayed online only; no offline copy has been saved.")
      ].filter(Boolean).join(" ");
    }
    attribution.hidden = false;
    status(offline
      ? "Showing a saved " + providerName + " chapter offline."
      : (canStoreOffline(selectedProvider)
        ? "Online passage loaded successfully and saved under the API.Bible refresh limit."
        : selectedProvider === "net-bible"
          ? "NET passage loaded successfully. This provider is online-only; no offline copy has been stored."
          : "Online passage loaded successfully. YouVersion text has not been stored offline."));
  }

  async function loadPassage() {
    const apiReady = await resolveApiBase();
    if (!currentChapter) {
      status("Open a Bible chapter first, then choose an online translation.");
      return false;
    }
    const bookCode = typeof window.ZurielBibleBookCode === "function"
      ? window.ZurielBibleBookCode(currentChapter.book)
      : null;
    const validVersionId = selectedProvider === "youversion"
      ? /^\d+$/.test(selectedVersionId)
      : selectedProvider === "net-bible"
        ? selectedVersionId === "net"
        : /^[a-f0-9]{16}-\d{2}$/i.test(selectedVersionId);
    if (!bookCode || !validVersionId) {
      status("Choose a valid authorised translation.");
      return false;
    }

    const reference = bookCode + "." + currentChapter.chapter;
    if (!apiReady) {
      const saved = await readCachedChapter(selectedProvider, selectedVersionId, reference);
      if (saved) {
        try { renderPassage(saved, true); return true; }
        catch (_) {}
      }
      status("Secure online translation access is not connected. No permitted saved copy is available; your offline KJV remains unchanged.");
      return false;
    }

    const requestId = ++requestSequence;
    if (activeController) activeController.abort();
    activeController = new AbortController();
    loadButton.disabled = true;
    downloadButton.disabled = true;
    passage.hidden = true;
    attribution.hidden = true;
    status("Loading the selected online translation…");

    try {
      const path = selectedProvider === "youversion"
        ? "/api/youversion/bibles/" + encodeURIComponent(selectedVersionId) +
          "/passages/" + reference + "?format=text"
        : selectedProvider === "net-bible"
          ? "/api/net-bible/chapters/" + encodeURIComponent(currentChapter.book) + "/" + currentChapter.chapter
          : "/api/api-bible/bibles/" + encodeURIComponent(selectedVersionId) +
            "/chapters/" + encodeURIComponent(reference);
      const payload = await requestJson(path, activeController);
      if (requestId !== requestSequence) return false;
      renderPassage(payload, false);
      if (canStoreOffline(selectedProvider)) {
        const saved = await saveCachedChapter(selectedProvider, selectedVersionId, reference, payload);
        if (saved) {
          const versionLabel = select.options[select.selectedIndex]
            ? select.options[select.selectedIndex].textContent
            : (selectedVersionLabel || "API.Bible translation");
          await saveDownloadRecord(selectedProvider, selectedVersionId, versionLabel, 1, 1);
          await refreshOfflineDownloadOptions();
        }
      }
      return true;
    } catch (error) {
      if (error && error.name === "AbortError") return false;
      if (requestId === requestSequence) {
        const saved = await readCachedChapter(selectedProvider, selectedVersionId, reference);
        if (saved) {
          try { renderPassage(saved, true); return true; }
          catch (_) { status(error.message || "The online passage could not be loaded."); }
        } else {
          status(error.message || "The online passage could not be loaded. Your offline KJV is unchanged.");
        }
      }
      return false;
    } finally {
      if (requestId === requestSequence) {
        loadButton.disabled = !selectedVersionId || !currentChapter;
        downloadButton.hidden = !canStoreOffline(selectedProvider);
        downloadButton.disabled = !selectedVersionId || !canStoreOffline(selectedProvider);
        activeController = null;
      }
    }
  }

  providerSelect.addEventListener("change", function () {
    requestSequence++;
    if (activeController) activeController.abort();
    activeController = null;
    selectedProvider = providerSelect.value === "api-bible" ? "api-bible" : "youversion";
    catalogueSequence++;
    versionsLoading = false;
    versionsLoaded = false;
    loadedProvider = "";
    selectedVersionId = "";
    selectedVersionLabel = "";
    select.replaceChildren(node("option", "", "Choose an available translation"));
    select.disabled = true;
    loadButton.disabled = true;
    downloadButton.disabled = true;
    downloadButton.hidden = !canStoreOffline(selectedProvider);
    passage.hidden = true;
    attribution.hidden = true;
    passage.textContent = "";
    status("Checking " + (selectedProvider === "youversion" ? "YouVersion" : "API.Bible") +
      " when you open the comparison list. The offline KJV remains available.");
    if (panel.open) loadVersions();
  });

  select.addEventListener("change", function () {
    requestSequence++;
    if (activeController) activeController.abort();
    activeController = null;
    selectedVersionId = select.value;
    loadButton.disabled = !selectedVersionId || !currentChapter;
    downloadButton.hidden = !canStoreOffline(selectedProvider);
    downloadButton.disabled = !selectedVersionId || !API_BASE || !canStoreOffline(selectedProvider);
    passage.hidden = true;
    attribution.hidden = true;
    passage.textContent = "";
    status(selectedVersionId
      ? "Selected version. Choose Load this chapter when you are ready."
      : "Choose an authorised English Bible version.");
  });

  offlineSelect.addEventListener("change", function () {
    const option = offlineSelect.options[offlineSelect.selectedIndex];
    if (!option || !option.value) return;
    selectedProvider = option.dataset.provider === "api-bible" ? "api-bible" : "youversion";
    providerSelect.value = selectedProvider;
    selectedVersionId = option.dataset.versionId || "";
    selectedVersionLabel = option.dataset.label || option.textContent.split(" · ")[0];
    versionsLoaded = false;
    loadedProvider = "";
    select.hidden = true;
    loadButton.hidden = false;
    downloadButton.hidden = true;
    loadButton.disabled = !selectedVersionId || !currentChapter;
    passage.hidden = true;
    attribution.hidden = true;
    status("Offline translation selected. Open a chapter and tap Load this chapter to read the saved copy.");
  });

  loadButton.addEventListener("click", loadPassage);
  downloadButton.addEventListener("click", downloadSelectedTranslation);
  panel.addEventListener("toggle", function () {
    if (!panel.open && activeController) {
      requestSequence++;
      activeController.abort();
      activeController = null;
      return;
    }
    if (panel.open) {
      loadVersions();
      if (currentChapter && versionsLoaded && loadedProvider === selectedProvider) {
        loadButton.disabled = !selectedVersionId;
        downloadButton.hidden = !canStoreOffline(selectedProvider);
        downloadButton.disabled = !selectedVersionId || !canStoreOffline(selectedProvider);
        status("Ready to compare " + currentChapter.book + " " + currentChapter.chapter + ".");
      }
    }
  });

  window.addEventListener("zuriel:chapter-opened", function (event) {
    updateChapter(event.detail);
  });

  window.addEventListener("zuriel:compare-verse", function (event) {
    const detail = event && event.detail ? event.detail : {};
    if (!detail.reference) return;
    panel.open = true;
    const shownInVerseOverlay = window.ZurielVerseOverlay &&
      typeof window.ZurielVerseOverlay.openExternal === "function" &&
      window.ZurielVerseOverlay.openExternal(panel);
    if (!shownInVerseOverlay) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    status("Checking whether online translation comparison is connected. Your offline KJV remains available.");
    loadVersions().then(function () {
      if (versionsLoaded) {
        status("Choose an authorised translation below. The comparison panel is ready for " +
          detail.reference + ". Load the chapter to compare its wording.");
      }
    });
  });

  window.ZurielTranslations = {
    get configured() { return Boolean(API_BASE); },
    selectVersion: async function (abbreviation) {
      const requested = String(abbreviation || "").trim().toUpperCase();
      const aliases = {
        "GNT": /\b(GNT|GNB|GOOD NEWS TRANSLATION|GOOD NEWS BIBLE)\b/,
        "AMP": /\b(AMP|AMPLIFIED BIBLE)\b/,
        "LB/LT": /\b(LB|LT|TLB|LIVING BIBLE|LIVING TRANSLATION)\b/,
        "TPT": /\b(TPT|PASSION TRANSLATION)\b/,
        "NLT": /\b(NLT|NEW LIVING TRANSLATION)\b/,
        "NET": /\b(NET|NEW ENGLISH TRANSLATION)\b/,
        "NIV": /\b(NIV|NEW INTERNATIONAL VERSION)\b/,
        "ESV": /\b(ESV|ENGLISH STANDARD VERSION)\b/,
        "NASB": /\b(NASB|NEW AMERICAN STANDARD BIBLE)\b/,
        "CSB": /\b(CSB|CHRISTIAN STANDARD BIBLE|HCSB)\b/,
        "NKJV": /\b(NKJV|NEW KING JAMES VERSION)\b/
      };
      panel.hidden = false;
      panel.open = true;
      if (!await resolveApiBase()) {
        status(requested + " cannot load yet because the secure translation service is not connected. No Scripture text has been substituted; the offline KJV remains available.");
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        return false;
      }

      const providers = ["youversion", "api-bible", "net-bible"];
      const providerFailures = [];
      const passageFailures = [];
      for (const provider of providers) {
        selectedProvider = provider;
        providerSelect.value = provider;
        versionsLoaded = false;
        loadedProvider = "";
        selectedVersionId = "";
        selectedVersionLabel = "";
        select.hidden = false;
        loadButton.hidden = false;
        downloadButton.hidden = false;
        select.disabled = true;
        loadButton.disabled = true;
        downloadButton.disabled = true;

        await loadVersions();
        // The comparison panel's open event may already be loading the same
        // catalogue. Wait for that request instead of treating it as a miss.
        let waitCount = 0;
        while (versionsLoading && waitCount < 100) {
          await new Promise(resolve => setTimeout(resolve, 50));
          waitCount++;
        }
        if (!versionsLoaded || loadedProvider !== provider) {
          providerFailures.push(statusNode.textContent || (provider + " catalogue unavailable"));
          continue;
        }

        const options = Array.from(select.options).filter(option => option.value);
        const exact = options.find(option =>
          String(option.textContent || "").split("—")[0].trim().toUpperCase() === requested
        );
        const alias = aliases[requested];
        const match = exact || (alias
          ? options.find(option => alias.test(String(option.textContent || "").toUpperCase()))
          : null);
        if (!match) {
          providerFailures.push(provider === "youversion"
            ? "YouVersion did not return " + requested + "."
            : provider === "net-bible"
              ? "NET Bible did not return " + requested + "."
              : "API.Bible did not return " + requested + ".");
          continue;
        }

        selectedVersionId = match.value;
        selectedVersionLabel = match.textContent;
        select.value = match.value;
        loadButton.disabled = !currentChapter;
        // Keep publisher-restricted YouVersion passages online-only in every
        // selection path, including the home-screen translation shortcuts.
        downloadButton.hidden = !canStoreOffline(provider);
        downloadButton.disabled = !canStoreOffline(provider);
        status(requested + " is available through " +
          (provider === "youversion" ? "YouVersion" : provider === "net-bible" ? "NET Bible" : "API.Bible") +
          ". " + (currentChapter ? "Loading this chapter…" : "Open a Bible chapter to display it."));
        if (currentChapter && !await loadPassage()) {
          passageFailures.push(provider === "youversion"
            ? "YouVersion listed " + requested + " but could not return a usable passage."
            : provider === "net-bible"
              ? "NET Bible listed " + requested + " but could not return a usable attributed passage."
              : "API.Bible listed " + requested + " but could not return a usable passage with publisher attribution and FUMS.");
          continue;
        }
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        return true;
      }

      status(requested + " was not found in any connected provider's currently available English catalogue. " +
        providerFailures.join(" ") + " " + passageFailures.join(" ") + " The offline KJV remains available.");
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return false;
    },
    refreshVersions: function () { versionsLoaded = false; loadedProvider = ""; selectedVersionId = ""; apiBasePromise = null; return loadVersions(); }
  };

  if (!API_BASE) {
    select.hidden = true;
    loadButton.hidden = true;
    downloadButton.hidden = true;
    status("Secure online translation access has not been connected yet. Your offline KJV is unchanged.");
  }
  // Migrate older caches to the current publisher limit even before another chapter is opened.
  refreshOfflineDownloadOptions();
})();
