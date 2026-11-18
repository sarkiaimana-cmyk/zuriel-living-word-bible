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
    "The King James Version remains available offline. API.Bible chapters you open are saved on this device for offline reading and refreshed online within 29 days. YouVersion chapters are cached only when their publisher licence permits it.");
  const controls = node("div");
  const providerSelect = node("select");
  providerSelect.setAttribute("aria-label", "Choose online Bible translation provider");
  [
    ["youversion", "YouVersion Platform"],
    ["api-bible", "API.Bible"]
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
  const loadButton = node("button", "", "Load this chapter");
  loadButton.type = "button";
  loadButton.disabled = true;
  const passageHeading = node("h3", "", "");
  const passage = node("pre", "ztc-passage", "");
  passage.hidden = true;
  const attribution = node("p", "ztc-attribution", "");
  attribution.hidden = true;

  controls.append(providerSelect, select, loadButton, statusNode);
  output.append(passageHeading, passage, attribution);
  panel.append(summary, note, controls, output);
  reader.appendChild(panel);

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
        status("Secure online translation access has not been connected yet. Your offline KJV is unchanged.");
        versionsLoading = false;
      }
      return;
    }
    select.hidden = false;
    loadButton.hidden = false;
    select.disabled = true;
    loadButton.disabled = true;
    status("Checking the English Bible versions authorised for " +
      (providerAtRequest === "youversion" ? "YouVersion" : "API.Bible") + "…");
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
      } else {
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
      }

      if (catalogueRequestId !== catalogueSequence) return;
      select.replaceChildren(node("option", "", "Choose an available translation"));
      available.forEach(item => {
        const option = node("option", "", item.abbreviation + " — " + item.title);
        option.value = String(item.id);
        select.appendChild(option);
      });
      selectedVersionId = "";
      versionsLoaded = true;
      loadedProvider = providerAtRequest;
      select.disabled = false;
      loadButton.disabled = true;
      const providerName = providerAtRequest === "youversion" ? "YouVersion" : "API.Bible";
      status(available.length
        ? available.length + " English version(s) are authorised for this " + providerName + " key. " +
          (nextPageToken ? "The catalogue is large; the first 1,000 results are shown. " : "") +
          "Choose one to compare."
        : "No English Bible versions are currently authorised for " + providerName + ". The offline KJV remains available.");
    } catch (error) {
      if (catalogueRequestId === catalogueSequence) {
        select.disabled = true;
        loadButton.disabled = true;
        status(error.message || "Online translation access is temporarily unavailable.");
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
      loadButton.disabled = !selectedVersionId || !API_BASE;
      status("Ready to compare " + currentChapter.book + " " + currentChapter.chapter +
        ". Select an authorised version and load it when you choose.");
    }
  }

  const TRANSLATION_CACHE_DB = "zuriel-translation-cache-v1";
  const API_BIBLE_CACHE_MAX_AGE = 29 * 24 * 60 * 60 * 1000;

  function openTranslationCache() {
    return new Promise(resolve => {
      if (!("indexedDB" in window)) { resolve(null); return; }
      let request;
      try { request = window.indexedDB.open(TRANSLATION_CACHE_DB, 1); }
      catch (_) { resolve(null); return; }
      request.onupgradeneeded = function () {
        const db = request.result;
        if (!db.objectStoreNames.contains("chapters")) {
          db.createObjectStore("chapters", { keyPath: "key" });
        }
      };
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { resolve(null); };
      request.onblocked = function () { resolve(null); };
    });
  }

  function translationCacheKey(provider, versionId, reference) {
    return [provider, String(versionId), String(reference)].join("|");
  }

  async function readCachedApiBibleChapter(versionId, reference) {
    const db = await openTranslationCache();
    if (!db) return null;
    return new Promise(resolve => {
      try {
        const transaction = db.transaction("chapters", "readonly");
        const request = transaction.objectStore("chapters").get(
          translationCacheKey("api-bible", versionId, reference)
        );
        request.onsuccess = function () {
          const saved = request.result;
          if (!saved || !Number.isFinite(saved.savedAt) ||
              Date.now() - saved.savedAt > API_BIBLE_CACHE_MAX_AGE ||
              !saved.payload || !saved.payload.passage ||
              typeof saved.payload.passage.content !== "string" ||
              !saved.payload.passage.content.trim() ||
              typeof saved.payload.passage.copyright !== "string" ||
              !saved.payload.passage.copyright.trim()) {
            resolve(null);
            return;
          }
          resolve(saved.payload);
        };
        request.onerror = function () { resolve(null); };
        transaction.onabort = function () { resolve(null); };
      } catch (_) { resolve(null); }
    });
  }

  async function saveApiBibleChapter(versionId, reference, payload) {
    if (selectedProvider !== "api-bible" || !payload || !payload.passage ||
        typeof payload.passage.content !== "string" ||
        !payload.passage.content.trim() ||
        typeof payload.passage.copyright !== "string" ||
        !payload.passage.copyright.trim()) return false;
    const db = await openTranslationCache();
    if (!db) return false;
    return new Promise(resolve => {
      try {
        const transaction = db.transaction("chapters", "readwrite");
        transaction.objectStore("chapters").put({
          key: translationCacheKey("api-bible", versionId, reference),
          savedAt: Date.now(),
          payload: payload
        });
        transaction.oncomplete = function () { resolve(true); };
        transaction.onerror = function () { resolve(false); };
        transaction.onabort = function () { resolve(false); };
      } catch (_) { resolve(false); }
    });
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
    const providerName = selectedProvider === "youversion" ? "YouVersion" : "API.Bible";
    const selectedLabel = select.options[select.selectedIndex]
      ? String(select.options[select.selectedIndex].textContent || "").split("—").slice(1).join("—").trim()
      : "";
    passageHeading.textContent = (item.reference || (currentChapter.book + " " + currentChapter.chapter)) +
      " — " + ((payload.version && (payload.version.abbreviation || payload.version.title)) || selectedLabel || "Selected translation") +
      " (" + providerName + ")";
    passage.textContent = item.content;
    passage.hidden = false;
    attribution.textContent = [
      copyright,
      promotional,
      offline
        ? "Offline copy saved on this device. API.Bible content is refreshed online within 29 days."
        : (selectedProvider === "api-bible"
          ? "This chapter is saved on this device for offline reading; it must be refreshed online within 29 days."
          : "Online text is not saved for offline use unless its publisher licence permits it.")
    ].filter(Boolean).join(" ");
    attribution.hidden = false;
    status(offline
      ? "Showing your saved API.Bible chapter offline. It remains available until its 29-day refresh window expires."
      : "Online passage loaded successfully." +
        (selectedProvider === "api-bible" ? " A compliant offline copy has been saved on this device." : ""));
  }

  async function loadPassage() {
    const apiReady = await resolveApiBase();
    if (!currentChapter) {
      status("Open a Bible chapter first, then choose an online translation.");
      return;
    }
    const bookCode = typeof window.ZurielBibleBookCode === "function"
      ? window.ZurielBibleBookCode(currentChapter.book)
      : null;
    const validVersionId = selectedProvider === "youversion"
      ? /^\d+$/.test(selectedVersionId)
      : /^[a-f0-9]{16}-\d{2}$/i.test(selectedVersionId);
    if (!bookCode || !validVersionId) {
      status("Choose a valid authorised translation.");
      return;
    }

    const reference = bookCode + "." + currentChapter.chapter;
    if (!apiReady) {
      if (selectedProvider === "api-bible") {
        const saved = await readCachedApiBibleChapter(selectedVersionId, reference);
        if (saved) {
          try { renderPassage(saved, true); return; }
          catch (_) {}
        }
      }
      status("Secure online translation access is not connected. No permitted saved copy is available; your offline KJV remains unchanged.");
      return;
    }

    const requestId = ++requestSequence;
    if (activeController) activeController.abort();
    activeController = new AbortController();
    loadButton.disabled = true;
    passage.hidden = true;
    attribution.hidden = true;
    status("Loading the selected online translation…");

    try {
      const path = selectedProvider === "youversion"
        ? "/api/youversion/bibles/" + encodeURIComponent(selectedVersionId) +
          "/passages/" + reference + "?format=text"
        : "/api/api-bible/bibles/" + encodeURIComponent(selectedVersionId) +
          "/chapters/" + encodeURIComponent(reference);
      const payload = await requestJson(path, activeController);
      if (requestId !== requestSequence) return;
      renderPassage(payload, false);
      if (selectedProvider === "api-bible") {
        await saveApiBibleChapter(selectedVersionId, reference, payload);
      }
    } catch (error) {
      if (error && error.name === "AbortError") return;
      if (requestId === requestSequence && selectedProvider === "api-bible") {
        const saved = await readCachedApiBibleChapter(selectedVersionId, reference);
        if (saved) {
          try { renderPassage(saved, true); }
          catch (_) { status(error.message || "The online passage could not be loaded."); }
        } else {
          status(error.message || "The online passage could not be loaded. Your offline KJV is unchanged.");
        }
      } else if (requestId === requestSequence) {
        status(error.message || "The online passage could not be loaded. Your offline KJV is unchanged.");
      }
    } finally {
      if (requestId === requestSequence) {
        loadButton.disabled = !selectedVersionId || !currentChapter;
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
    select.replaceChildren(node("option", "", "Choose an available translation"));
    select.disabled = true;
    loadButton.disabled = true;
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
    loadButton.disabled = !selectedVersionId || !currentChapter || !API_BASE;
    passage.hidden = true;
    attribution.hidden = true;
    passage.textContent = "";
    status(selectedVersionId
      ? "Selected version. Choose Load this chapter when you are ready."
      : "Choose an authorised English Bible version.");
  });

  loadButton.addEventListener("click", loadPassage);
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
      panel.hidden = false;
      if (!await resolveApiBase()) { panel.open = true; status("Secure online translation access has not been connected yet. Your offline KJV is unchanged."); return false; }
      if (selectedProvider !== "youversion") { selectedProvider = "youversion"; providerSelect.value = "youversion"; versionsLoaded = false; loadedProvider = ""; selectedVersionId = ""; }
      await loadVersions();
      if (!versionsLoaded || loadedProvider !== selectedProvider) return false;
      panel.open = true;
      const options = Array.from(select.options);
      const match = options.find(option => String(option.textContent || "").split("—")[0].trim().toUpperCase() === requested) || (requested === "LB/LT" ? options.find(option => /^(LB|LT|LIVING|LIFE)/i.test(String(option.textContent || "").trim())) : null);
      if (!match || !match.value) { status(requested + " is not currently listed among the English versions authorised by YouVersion. The offline KJV remains available."); panel.scrollIntoView({behavior:"smooth",block:"nearest"}); return false; }
      select.value = match.value; selectedVersionId = match.value; loadButton.disabled = !currentChapter;
      status(requested + " selected. " + (currentChapter ? "Loading this chapter…" : "Open a Bible chapter to display this translation."));
      if (currentChapter) await loadPassage();
      panel.scrollIntoView({behavior:"smooth",block:"nearest"}); return true;
    },
    refreshVersions: function () { versionsLoaded = false; loadedProvider = ""; selectedVersionId = ""; apiBasePromise = null; return loadVersions(); }
  };

  if (!API_BASE) {
    select.hidden = true;
    loadButton.hidden = true;
    status("Secure online translation access has not been connected yet. Your offline KJV is unchanged.");
  }
})();
