/* =========================================================
   ZURIEL — FULL-SCREEN BOOK / CHAPTER / VERSE NAVIGATOR
   Grid-based, touch-friendly navigation inspired by the
   supplied reference. Uses the existing Bible reader engine.
   ========================================================= */
(function () {
  "use strict";

  const root = document.getElementById("bibleReader");
  const books = typeof bibleBooks !== "undefined" ? bibleBooks : window.bibleBooks;
  if (!root || !Array.isArray(books) || !books.length) return;
  if (document.getElementById("zurielGridNavigator")) return;

  const style = document.createElement("style");
  style.id = "zurielGridNavigatorStyles";
  style.textContent = `
    #zurielGridLaunch {
      width:100%;min-height:48px;margin:12px 0 5px;padding:12px 14px;
      border:1px solid #cbb47b;border-radius:11px;
      background:linear-gradient(135deg,#10213d,#203e68);
      color:#f8f4e9;font:700 15px Arial,sans-serif;
      box-shadow:0 4px 14px #10213d20;
    }
    #zurielGridNavigator {
      position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;
      background:#090f12;color:#e8edf2;
      padding:calc(12px + env(safe-area-inset-top)) 16px calc(12px + env(safe-area-inset-bottom));
      font-family:Arial,sans-serif;
    }
    #zurielGridNavigator[hidden] { display:none !important; }
    #zurielGridNavigator * { box-sizing:border-box; }
    #zurielGridNavigator .zgn-header {
      display:grid;grid-template-columns:48px 1fr 48px;align-items:center;
      min-height:56px;gap:8px;margin-bottom:12px;
    }
    #zurielGridNavigator .zgn-title {
      margin:0;text-align:center;color:#e9edf3;font-size:clamp(19px,5vw,25px);
      font-weight:500;letter-spacing:.1px;
    }
    #zurielGridNavigator .zgn-icon {
      min-height:44px;width:44px;padding:0;margin:0;border:0;border-radius:10px;
      background:transparent;color:#e7edf3;font-size:27px;
    }
    #zurielGridNavigator .zgn-reference {
      display:flex;min-height:58px;overflow:hidden;border-radius:11px;
      background:#252b2f;border:1px solid #343b40;
    }
    #zurielGridNavigator .zgn-reference input {
      flex:1;min-width:0;width:0;padding:0 14px;border:0;outline:0;
      background:transparent;color:#f4f6f8;font-size:17px;
    }
    #zurielGridNavigator .zgn-reference input::placeholder { color:#aeb8c0; }
    #zurielGridNavigator .zgn-go {
      flex:0 0 88px;margin:0;border:0;border-radius:0;
      background:#00516a;color:#d9f2ff;font-size:16px;font-weight:700;
    }
    #zurielGridNavigator .zgn-tabs {
      display:grid;grid-template-columns:repeat(3,1fr);gap:6px;
      margin:18px 0 10px;border-bottom:1px solid #30383d;
    }
    #zurielGridNavigator .zgn-tab {
      min-height:48px;margin:0;padding:8px 2px 11px;border:0;border-radius:0;
      border-bottom:4px solid transparent;background:transparent;
      color:#d6dce2;font-size:14px;font-weight:700;
    }
    #zurielGridNavigator .zgn-tab[aria-selected="true"] {
      color:#f5f8fa;border-bottom-color:#82c9ed;
    }
    #zurielGridNavigator .zgn-current {
      min-height:28px;margin:8px 4px 10px;color:#d8e1e7;
      font-size:15px;font-weight:700;font-style:italic;
    }
    #zurielGridNavigator .zgn-search {
      width:100%;min-height:44px;margin:0 0 10px;padding:10px 12px;
      border:1px solid #3c474d;border-radius:10px;
      background:#171f23;color:#f4f6f8;font-size:15px;
    }
    #zurielGridNavigator .zgn-grid {
      display:grid;grid-template-columns:repeat(6,minmax(0,1fr));
      gap:10px 9px;align-content:start;overflow:auto;overscroll-behavior:contain;
      padding:2px 2px 22px;flex:1;min-height:0;
    }
    #zurielGridNavigator .zgn-choice {
      display:flex;align-items:center;justify-content:center;
      min-width:0;min-height:56px;margin:0;padding:5px 2px;
      border:1px solid transparent;border-radius:30px;
      background:#303234;color:#e8e9ec;font-size:clamp(15px,4.5vw,21px);
      font-weight:500;line-height:1.15;overflow-wrap:anywhere;
      -webkit-tap-highlight-color:transparent;
    }
    #zurielGridNavigator .zgn-choice[aria-pressed="true"] {
      background:#d6effb;color:#0b2a38;border:2px solid #8bcff0;font-weight:800;
    }
    #zurielGridNavigator .zgn-choice.zgn-book {
      min-height:62px;border-radius:13px;font-size:13px;padding:7px 4px;
    }
    #zurielGridNavigator .zgn-choice:disabled { opacity:.35; }
    #zurielGridNavigator .zgn-footer {
      padding:10px 2px 0;color:#aebbc3;font-size:12px;line-height:1.5;
      text-align:center;
    }
    #zurielGridNavigator .zgn-empty {
      grid-column:1/-1;padding:24px 10px;text-align:center;color:#cbd5dc;
    }
    @media(max-width:370px) {
      #zurielGridNavigator { padding-left:11px;padding-right:11px; }
      #zurielGridNavigator .zgn-grid { gap:8px 6px; }
      #zurielGridNavigator .zgn-choice { min-height:51px; }
      #zurielGridNavigator .zgn-choice.zgn-book { min-height:57px;font-size:12px; }
    }
    @media(min-width:700px) {
      #zurielGridNavigator { padding-left:max(24px,calc((100vw - 680px)/2));padding-right:max(24px,calc((100vw - 680px)/2)); }
      #zurielGridNavigator .zgn-grid { grid-template-columns:repeat(8,minmax(0,1fr)); }
    }
  `;
  document.head.appendChild(style);

  const launch = document.createElement("button");
  launch.type = "button";
  launch.id = "zurielGridLaunch";
  launch.textContent = "▦  Browse Books • Chapters • Verses";
  const existingNav = document.getElementById("zurielNavigation");
  if (existingNav) existingNav.insertBefore(launch, existingNav.firstChild);
  else root.insertBefore(launch, root.firstChild);

  const modal = document.createElement("section");
  modal.id = "zurielGridNavigator";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "zgnTitle");
  modal.innerHTML = `
    <div class="zgn-header">
      <button class="zgn-icon" id="zgnClose" type="button" aria-label="Close navigation">×</button>
      <h2 class="zgn-title" id="zgnTitle">Bible Navigation</h2>
      <span></span>
    </div>
    <div class="zgn-reference">
      <input id="zgnReferenceInput" type="text" value="John 1" aria-label="Enter a Bible reference" placeholder="e.g. John 3:16">
      <button class="zgn-go" id="zgnGo" type="button">GO</button>
    </div>
    <div class="zgn-tabs" role="tablist" aria-label="Choose book, chapter or verse">
      <button class="zgn-tab" type="button" role="tab" data-tab="book" aria-selected="true">BOOK</button>
      <button class="zgn-tab" type="button" role="tab" data-tab="chapter" aria-selected="false">CHAPTER</button>
      <button class="zgn-tab" type="button" role="tab" data-tab="verse" aria-selected="false">VERSE</button>
    </div>
    <div class="zgn-current" id="zgnCurrent">Choose a Bible book</div>
    <input class="zgn-search" id="zgnSearch" type="search" placeholder="Search all 66 Bible books…" aria-label="Search Bible books">
    <div class="zgn-grid" id="zgnGrid" role="group" aria-label="Bible selections"></div>
    <div class="zgn-footer" id="zgnStatus" aria-live="polite">66 books · 1,189 chapters · Scripture navigation</div>
  `;
  document.body.appendChild(modal);

  const grid = modal.querySelector("#zgnGrid");
  const current = modal.querySelector("#zgnCurrent");
  const status = modal.querySelector("#zgnStatus");
  const search = modal.querySelector("#zgnSearch");
  const referenceInput = modal.querySelector("#zgnReferenceInput");
  const tabs = Array.from(modal.querySelectorAll(".zgn-tab"));
  let selectedBook = "John";
  let selectedChapter = 1;
  let selectedVerse = 0;
  let activeTab = "book";
  let lastFocus = null;
  let verseCountToken = 0;

  function setTab(tab) {
    activeTab = tab;
    tabs.forEach(button => button.setAttribute("aria-selected", String(button.dataset.tab === tab)));
    search.hidden = tab !== "book";
    renderGrid();
  }

  function updateReference() {
    referenceInput.value = selectedBook
      ? selectedBook + (selectedChapter ? " " + selectedChapter : "") +
        (selectedVerse ? ":" + selectedVerse : "")
      : "";
  }

  function updateCurrent() {
    current.textContent = selectedBook
      ? selectedBook + (selectedChapter ? " " + selectedChapter : "") +
        (selectedVerse ? ":" + selectedVerse : "")
      : "Choose a Bible book";
  }

  function chooseBook(name) {
    selectedBook = name;
    selectedChapter = 0;
    selectedVerse = 0;
    updateCurrent();
    updateReference();
    status.textContent = name + " selected. Now choose a chapter.";
    setTab("chapter");
  }

  function chooseChapter(number) {
    selectedChapter = number;
    selectedVerse = 0;
    updateCurrent();
    updateReference();
    status.textContent = "Chapter " + number + " selected. You can open the chapter or choose a verse.";
    setTab("verse");
  }

  function buttonFor(label, value, selected, callback, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "zgn-choice" + (className ? " " + className : "");
    button.textContent = label;
    button.setAttribute("aria-pressed", String(selected));
    button.addEventListener("click", callback);
    return button;
  }

  function renderGrid() {
    grid.replaceChildren();
    if (activeTab === "book") {
      const q = search.value.trim().toLowerCase();
      const filtered = books.filter(book => !q || book.name.toLowerCase().includes(q));
      filtered.forEach((book, index) => {
        const originalIndex = books.findIndex(item => item.name === book.name);
        const groupLabel = originalIndex === 39 && !q ? "NEW TESTAMENT" : "";
        if (groupLabel) {
          const divider = document.createElement("div");
          divider.className = "zgn-empty";
          divider.textContent = "NEW TESTAMENT";
          grid.appendChild(divider);
        }
        grid.appendChild(buttonFor(book.name, book.name, selectedBook === book.name, () => chooseBook(book.name), "zgn-book"));
      });
      if (!filtered.length) {
        const empty = document.createElement("div");
        empty.className = "zgn-empty";
        empty.textContent = "No matching Bible books found.";
        grid.appendChild(empty);
      }
    } else if (activeTab === "chapter") {
      const book = books.find(item => item.name === selectedBook);
      if (!book) {
        const empty = document.createElement("div");
        empty.className = "zgn-empty";
        empty.textContent = "Choose a Bible book first.";
        grid.appendChild(empty);
        return;
      }
      for (let n = 1; n <= book.chapters; n++) {
        grid.appendChild(buttonFor(String(n), n, selectedChapter === n, () => chooseChapter(n)));
      }
    } else if (activeTab === "verse") {
      if (!selectedBook || !selectedChapter) {
        const empty = document.createElement("div");
        empty.className = "zgn-empty";
        empty.textContent = "Choose a book and chapter first.";
        grid.appendChild(empty);
        return;
      }
      const token = ++verseCountToken;
      const loading = document.createElement("div");
      loading.className = "zgn-empty";
      loading.textContent = "Loading verse numbers…";
      grid.appendChild(loading);
      Promise.resolve(
        typeof window.getChapterVerseCount === "function"
          ? window.getChapterVerseCount(selectedBook, selectedChapter)
          : 0
      ).then(count => {
        if (token !== verseCountToken || activeTab !== "verse") return;
        grid.replaceChildren();
        if (!count) {
          const empty = document.createElement("div");
          empty.className = "zgn-empty";
          empty.textContent = "Open the chapter to load its verse numbers.";
          grid.appendChild(empty);
          return;
        }
        for (let n = 1; n <= count; n++) {
          grid.appendChild(buttonFor(String(n), n, selectedVerse === n, () => {
            selectedVerse = n;
            updateCurrent();
            updateReference();
            openPassage();
          }));
        }
        status.textContent = count + " verses in " + selectedBook + " " + selectedChapter + ". Tap a verse to open it.";
      }).catch(() => {
        if (token !== verseCountToken) return;
        grid.replaceChildren();
        const empty = document.createElement("div");
        empty.className = "zgn-empty";
        empty.textContent = "Verse numbers could not load. Open the chapter instead.";
        grid.appendChild(empty);
      });
    }
  }

  async function openPassage() {
    if (!selectedBook || !selectedChapter || typeof window.openChapter !== "function") {
      status.textContent = "Choose a valid Bible book and chapter.";
      return;
    }
    const go = modal.querySelector("#zgnGo");
    go.disabled = true;
    go.textContent = "…";
    status.textContent = "Opening " + selectedBook + " " + selectedChapter + (selectedVerse ? ":" + selectedVerse : "") + "…";
    try {
      await window.openChapter(selectedBook, selectedChapter);
      if (selectedVerse) {
        const target = document.querySelectorAll("#message .verse")[selectedVerse - 1];
        if (target) {
          document.querySelectorAll("#message .verse.zuriel-nav-highlight").forEach(el => el.classList.remove("zuriel-nav-highlight"));
          target.classList.add("zuriel-nav-highlight");
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      closeModal();
      status.textContent = "Opened " + selectedBook + " " + selectedChapter + (selectedVerse ? ":" + selectedVerse : "") + ".";
    } catch (error) {
      status.textContent = "Unable to open this passage. Please try again.";
      console.error("Zuriel grid navigator:", error);
    } finally {
      go.disabled = false;
      go.textContent = "GO";
    }
  }

  function parseReference(raw) {
    const value = String(raw || "").trim();
    const match = value.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
    if (!match) {
      status.textContent = "Enter a reference such as John 3:16 or Psalm 23.";
      return;
    }
    const book = books.find(item => item.name.toLowerCase() === match[1].trim().toLowerCase());
    if (!book) {
      status.textContent = "Bible book not found. Check the book name.";
      return;
    }
    const chapter = Number(match[2]);
    const verse = Number(match[3] || 0);
    if (chapter < 1 || chapter > book.chapters || (match[3] && verse < 1)) {
      status.textContent = "That chapter or verse number is outside the selected book.";
      return;
    }
    selectedBook = book.name;
    selectedChapter = chapter;
    selectedVerse = verse;
    updateCurrent();
    if (verse) {
      setTab("verse");
      openPassage();
    } else {
      setTab("chapter");
      openPassage();
    }
  }

  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    search.value = "";
    selectedBook = selectedBook || "John";
    updateCurrent();
    updateReference();
    setTab("book");
    modal.querySelector("#zgnClose").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  launch.addEventListener("click", openModal);
  modal.querySelector("#zgnClose").addEventListener("click", closeModal);
  modal.querySelector("#zgnGo").addEventListener("click", () => parseReference(referenceInput.value));
  referenceInput.addEventListener("keydown", event => {
    if (event.key === "Enter") parseReference(referenceInput.value);
  });
  search.addEventListener("input", renderGrid);
  tabs.forEach(button => button.addEventListener("click", () => {
    if (button.dataset.tab !== "book" && !selectedBook) {
      status.textContent = "Choose a Bible book first.";
      return;
    }
    if (button.dataset.tab === "verse" && !selectedChapter) {
      status.textContent = "Choose a chapter first.";
      return;
    }
    setTab(button.dataset.tab);
  }));
  modal.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });

  // The initial selection mirrors the reference image.
  updateCurrent();
  updateReference();
  renderGrid();
  console.log("Zuriel full-screen Bible grid navigator loaded.");
})();