/* Secure, optional YouVersion translation comparison. KJV remains the offline source. */
(function () {
  "use strict";

  const API_BASE = String(window.ZURIEL_TRANSLATION_API_BASE || "").trim().replace(/\/+$/, "");
  const reader = document.getElementById("bibleReader");
  if (!reader || document.getElementById("zurielTranslationCompare")) return;

  let currentChapter = null;
  let selectedVerse = null;
  let versionsLoaded = false;
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
    "The King James Version remains available offline. Online translations are fetched only when you request them and are not saved for offline use.");
  const controls = node("div");
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

  controls.append(select, loadButton, statusNode);
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
    if (versionsLoaded) return;
    if (!API_BASE) {
      status("Secure online translation access has not been connected yet. Your offline KJV is unchanged.");
      return;
    }
    select.disabled = true;
    loadButton.disabled = true;
    status("Checking the English Bible versions authorised for Zuriel…");
    try {
      const payload = await requestJson("/api/youversion/bibles");
      if (!payload || !Array.isArray(payload.data)) {
        throw new Error("The authorised Bible version list could not be verified.");
      }
      const available = payload.data.filter(item =>
        item && Number.isInteger(Number(item.id)) &&
        typeof item.title === "string" &&
        typeof item.abbreviation === "string" &&
        (!item.language_tag || String(item.language_tag).toLowerCase().startsWith("en")) &&
        (!item.language || !item.language.iso_639_1 || item.language.iso_639_1 === "en")
      );
      select.replaceChildren(node("option", "", "Choose an available translation"));
      available.forEach(item => {
        const option = node("option", "", item.abbreviation + " — " + item.title);
        option.value = String(item.id);
        select.appendChild(option);
      });
      versionsLoaded = true;
      select.disabled = false;
      loadButton.disabled = true;
      status(available.length
        ? available.length + " English version(s) are authorised for this app key. Choose one to compare."
        : "No English Bible versions are currently authorised for Zuriel. The offline KJV remains available.");
    } catch (error) {
      select.disabled = true;
      loadButton.disabled = true;
      status(error.message || "Online translation access is temporarily unavailable.");
    }
  }

  function updateChapter(detail) {
    if (!detail || typeof detail.book !== "string" ||
        !Number.isInteger(Number(detail.chapter)) || Number(detail.chapter) < 1) return;
    currentChapter = { book: detail.book, chapter: Number(detail.chapter) };
    selectedVerse = null;
    loadButton.textContent = "Load this chapter";
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

  async function loadPassage() {
    if (!API_BASE) {
      status("Secure online translation access has not been connected yet. Your offline KJV is unchanged.");
      return;
    }
    if (!currentChapter) {
      status("Open a Bible chapter first, then choose an online translation.");
      return;
    }
    const bookCode = typeof window.ZurielBibleBookCode === "function"
      ? window.ZurielBibleBookCode(currentChapter.book)
      : null;
    const versionId = Number(selectedVersionId);
    if (!bookCode || !Number.isInteger(versionId) || versionId < 1) {
      status("Choose a valid authorised translation.");
      return;
    }

    const requestId = ++requestSequence;
    if (activeController) activeController.abort();
    activeController = new AbortController();
    loadButton.disabled = true;
    passage.hidden = true;
    attribution.hidden = true;
    const verseNumber = selectedVerse && selectedVerse.book === currentChapter.book &&
      Number(selectedVerse.chapter) === currentChapter.chapter
      ? Number(selectedVerse.verse) : null;
    status(verseNumber
      ? "Loading the selected verse in the online translation…"
      : "Loading the selected online chapter…");

    try {
      const reference = bookCode + "." + currentChapter.chapter +
        (Number.isInteger(verseNumber) && verseNumber > 0 ? "." + verseNumber : "");
      const payload = await requestJson(
        "/api/youversion/bibles/" + versionId + "/passages/" + reference + "?format=text",
        activeController
      );
      if (requestId !== requestSequence) return;
      const item = payload && payload.passage;
      if (!item || typeof item.content !== "string" || !item.content.trim()) {
        throw new Error("No passage text was returned for this chapter.");
      }
      const copyright = typeof item.copyright === "string" ? item.copyright.trim() : "";
      const promotional = typeof item.promotional_content === "string" ? item.promotional_content.trim() : "";
      if (!copyright && !promotional) {
        throw new Error("Publisher attribution was not supplied. Zuriel has withheld this passage until its attribution can be verified.");
      }
      passageHeading.textContent = (item.reference || (currentChapter.book + " " + currentChapter.chapter)) +
        " — " + ((payload.version && (payload.version.abbreviation || payload.version.title)) || "Selected translation");
      passage.textContent = item.content;
      passage.hidden = false;
      const publisherName = payload.version && typeof payload.version.publisher_name === "string"
        ? payload.version.publisher_name.trim() : "";
      attribution.textContent = [
        publisherName ? "Publisher: " + publisherName : "",
        copyright,
        promotional,
        "Online text is not stored for offline use."
      ].filter(Boolean).join(" ");
      const publisherUrlText = payload.version && typeof payload.version.publisher_url === "string"
        ? payload.version.publisher_url.trim() : "";
      if (publisherUrlText) {
        try {
          const publisherUrl = new URL(publisherUrlText);
          if (publisherUrl.protocol === "https:") {
            const separator = document.createTextNode(" ");
            const publisherLink = node("a", "", "Publisher website");
            publisherLink.href = publisherUrl.href;
            publisherLink.target = "_blank";
            publisherLink.rel = "noopener noreferrer";
            attribution.append(separator, publisherLink);
          }
        } catch (error) {
          // An invalid publisher URL is omitted; copyright text remains visible.
        }
      }
      attribution.hidden = false;
      status("Online passage loaded. The KJV remains your offline Bible text.");
    } catch (error) {
      if (error && error.name === "AbortError") return;
      if (requestId === requestSequence) {
        status(error.message || "The online passage could not be loaded. Your offline KJV is unchanged.");
      }
    } finally {
      if (requestId === requestSequence) {
        loadButton.disabled = !selectedVersionId;
        activeController = null;
      }
    }
  }

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
      if (!API_BASE) {
        status("Secure online translation access has not been connected yet. Your offline KJV is unchanged.");
      } else {
        loadVersions();
        if (currentChapter) {
          loadButton.disabled = !selectedVersionId;
          if (versionsLoaded) status("Ready to compare " + currentChapter.book + " " + currentChapter.chapter + ".");
        }
      }
    }
  });

  window.addEventListener("zuriel:chapter-opened", function (event) {
    updateChapter(event.detail);
  });

  window.addEventListener("zuriel:compare-verse", function (event) {
    const detail = event && event.detail ? event.detail : {};
    if (!detail.reference) return;
    const verseNumber = Number(detail.verse);
    const chapterNumber = Number(detail.chapter);
    if (typeof detail.book === "string" && Number.isInteger(chapterNumber) && chapterNumber > 0) {
      currentChapter = { book: detail.book, chapter: chapterNumber };
      selectedVerse = Number.isInteger(verseNumber) && verseNumber > 0
        ? { book: detail.book, chapter: chapterNumber, verse: verseNumber, reference: detail.reference }
        : null;
      loadButton.textContent = selectedVerse ? "Load selected verse" : "Load this chapter";
    }
    panel.open = true;
    const shownInVerseOverlay = window.ZurielVerseOverlay &&
      typeof window.ZurielVerseOverlay.openExternal === "function" &&
      window.ZurielVerseOverlay.openExternal(panel);
    if (!shownInVerseOverlay) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (!API_BASE) {
      status("Online translation comparison is not connected yet. Your selected verse and offline KJV remain available.");
      return;
    }
    status("Choose an authorised translation below. The comparison panel is ready for " +
      detail.reference + ". Load the chapter to compare its wording.");
    loadVersions();
  });

  window.ZurielTranslations = {
    configured: Boolean(API_BASE),
    refreshVersions: function () {
      versionsLoaded = false;
      return loadVersions();
    }
  };

  if (!API_BASE) {
    select.hidden = true;
    loadButton.hidden = true;
    status("Secure online translation access has not been connected yet. Your offline KJV is unchanged.");
  }
})();
