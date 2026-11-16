/* =========================================================
   ZURIEL LIVING WORD BIBLE
   RECENTLY OPENED — LOCAL, OFFLINE READING HISTORY
   ========================================================= */
(function () {
  "use strict";

  const STORAGE_KEY = "zurielRecentlyOpenedChapters-v1";
  const MAX_ITEMS = 500;

  function readItems() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(value)) return [];
      return value.filter(function (item) {
        return item && typeof item.book === "string" &&
          item.book.trim() && Number.isInteger(item.chapter) && item.chapter > 0;
      }).slice(0, MAX_ITEMS);
    } catch (error) {
      return [];
    }
  }

  function saveItems(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
      return true;
    } catch (error) {
      return false;
    }
  }

  function clearHistory() {
    const keys = [STORAGE_KEY, "zurielReadingHistory_v1"];
    let previous;
    try {
      previous = keys.map(function (key) {
        return { key: key, value: localStorage.getItem(key) };
      });
      keys.forEach(function (key) { localStorage.removeItem(key); });
      return true;
    } catch (error) {
      if (previous) {
        previous.forEach(function (item) {
          try {
            if (item.value !== null) localStorage.setItem(item.key, item.value);
          } catch (rollbackError) {
            // Keep the failure visible; do not claim the history was cleared.
          }
        });
      }
      return false;
    }
  }

  function recordChapter(book, chapter) {
    const name = String(book || "").trim().replace(/\s+/g, " ");
    const number = Number(chapter);
    if (!name || !Number.isInteger(number) || number < 1) return;
    const now = new Date().toISOString();
    const items = readItems().filter(function (item) {
      return !(item.book.toLowerCase() === name.toLowerCase() &&
        item.chapter === number);
    });
    items.unshift({ book: name, chapter: number, openedAt: now });
    saveItems(items);
    render();
  }

  function render() {
    const list = document.getElementById("zurielRecentlyOpenedList");
    const status = document.getElementById("zurielRecentlyOpenedStatus");
    if (!list) return;
    list.replaceChildren();
    const items = readItems().slice(0, 5);
    if (!items.length) {
      const empty = document.createElement("p");
      empty.textContent = "Chapters you open will appear here for quick return.";
      list.appendChild(empty);
      if (status) status.textContent = "";
      return;
    }

    items.forEach(function (item) {
      const row = document.createElement("div");
      row.className = "zuriel-recent-item";
      const label = document.createElement("span");
      label.textContent = item.book + " " + item.chapter;
      const open = document.createElement("button");
      open.type = "button";
      open.textContent = "Reopen";
      open.addEventListener("click", async function () {
        if (typeof window.openChapter !== "function") {
          if (status) status.textContent = "The Bible reader is not ready yet.";
          return;
        }
        open.disabled = true;
        try {
          await window.openChapter(item.book, item.chapter);
          if (status) status.textContent = "Opened " + item.book + " " + item.chapter + ".";
          if (typeof window.ZurielHomeNavigate === "function") {
            window.ZurielHomeNavigate("read");
          }
        } catch (error) {
          if (status) status.textContent =
            "Could not reopen this chapter: " + (error.message || "Please try again.");
        } finally {
          open.disabled = false;
        }
      });
      row.appendChild(label);
      row.appendChild(open);
      list.appendChild(row);
    });
  }

  function mount() {
    const dashboard = document.getElementById("zurielHomeDashboard");
    if (!dashboard || document.getElementById("zurielRecentlyOpened")) return;
    const card = document.createElement("section");
    card.id = "zurielRecentlyOpened";
    card.className = "home-card";
    const heading = document.createElement("h2");
    heading.textContent = "🕘 Recently Opened";
    const description = document.createElement("p");
    description.textContent = "Return to your latest Bible chapters.";
    const viewAll = document.createElement("button");
    viewAll.type = "button";
    viewAll.className = "home-button home-secondary";
    viewAll.textContent = "View all history";
    viewAll.addEventListener("click", function () {
      if (typeof window.ZurielHomeNavigate === "function") window.ZurielHomeNavigate("personal");
      if (window.ZurielPersonalSpace && typeof window.ZurielPersonalSpace.openProgress === "function") {
        window.ZurielPersonalSpace.openProgress();
      } else if (status) {
        status.textContent = "Open My Study Space and choose Progress to view your full history.";
      }
    });
    const list = document.createElement("div");
    list.id = "zurielRecentlyOpenedList";
    const status = document.createElement("p");
    status.id = "zurielRecentlyOpenedStatus";
    status.setAttribute("role", "status");
    const clear = document.createElement("button");
    clear.type = "button";
    clear.className = "home-button home-secondary";
    clear.textContent = "Clear reading history";
    clear.addEventListener("click", function () {
      if (!clearHistory()) {
        status.textContent = "History could not be fully cleared because device storage is unavailable. Your other study records were not intentionally changed.";
        return;
      }
      status.textContent = "Recently opened history cleared. Your saved notes and bookmarks are unchanged.";
      render();
    });
    card.appendChild(heading);
    card.appendChild(description);
    card.appendChild(viewAll);
    card.appendChild(list);
    card.appendChild(status);
    card.appendChild(clear);
    const continueCard = dashboard.querySelector(".home-continue-card");
    if (continueCard && continueCard.parentNode === dashboard) {
      continueCard.insertAdjacentElement("afterend", card);
    } else {
      dashboard.appendChild(card);
    }
    render();
  }

  function connectReader() {
    const original = window.openChapter;
    if (typeof original !== "function" || original.__zurielHistoryWrapped) return;
    function trackedOpenChapter(book, chapter) {
      return Promise.resolve(original.apply(this, arguments)).then(function (result) {
        recordChapter(book, chapter);
        return result;
      });
    }
    trackedOpenChapter.__zurielHistoryWrapped = true;
    window.openChapter = trackedOpenChapter;
  }

  window.ZurielRecentlyOpened = {
    list: function () { return readItems().slice(); },
    recordChapter: recordChapter,
    clear: clearHistory,
    refresh: render
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      connectReader();
      mount();
    }, { once: true });
  } else {
    connectReader();
    mount();
  }
})();
