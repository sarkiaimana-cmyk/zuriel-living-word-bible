/* =========================================================
   ZURIEL LIVING WORD BIBLE
   SMART BOOK • CHAPTER • VERSE NAVIGATOR
   Fast native selectors, searchable books, direct verse jump
   ========================================================= */
(function () {
  "use strict";

  const root = document.getElementById("bibleReader");
  const message = document.getElementById("message");
  const books = typeof bibleBooks !== "undefined" ? bibleBooks : window.bibleBooks;

  if (!root || !message || !Array.isArray(books)) {
    console.error("Zuriel Navigator: reader or Bible book list unavailable.");
    return;
  }
  if (document.getElementById("zurielNavigation")) return;

  const style = document.createElement("style");
  style.textContent = `
    /* Use one clear navigation system; the legacy controls remain available to scripts. */
    #bibleReader > #book,
    #bibleReader > #openBible,
    #bibleReader > .study-hint { display:none !important; }

    #zurielNavigation {
      background:linear-gradient(145deg,#10213d,#203e68);
      color:#f8f4e9;
      border:1px solid #b99b58;
      border-radius:18px;
      padding:16px;
      margin:15px 0 18px;
      box-shadow:0 6px 20px #10213d20;
    }
    #zurielNavigation h3 {
      color:#f1d99e;
      font-size:19px;
      margin:0 0 5px;
    }
    #zurielNavigation .nav-description {
      color:#dce5f1;
      font-size:13px;
      line-height:1.5;
      margin:0 0 13px;
    }
    #zurielNavigation label {
      display:block;
      color:#f1d99e;
      font-weight:700;
      font-size:13px;
      margin:12px 0 6px;
    }
    #zurielNavigation input,
    #zurielNavigation select {
      display:block;
      width:100%;
      min-width:0;
      min-height:48px;
      box-sizing:border-box;
      border:1px solid #c7b477;
      border-radius:10px;
      background:#fff;
      color:#18304d;
      padding:11px 12px;
      margin:0;
      font:600 15px Arial,sans-serif;
      outline-offset:2px;
    }
    #zurielNavigation input { margin-bottom:8px; }
    #zurielNavigation .nav-artwork {
      display:none;
      overflow:hidden;
      border:1px solid #c7b477;
      border-radius:12px;
      margin:10px 0 5px;
      background:#0b1930;
    }
    #zurielNavigation .nav-artwork img {
      display:block;
      width:100%;
      aspect-ratio:16 / 9;
      object-fit:cover;
    }
    #zurielNavigation .nav-artwork-caption {
      padding:8px 10px;
      color:#f1d99e;
      font-size:12px;
      font-weight:700;
    }
    #zurielNavigation .nav-two {
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:10px;
    }
    #zurielNavigation .nav-current {
      background:#ffffff12;
      border:1px solid #ffffff2b;
      border-left:4px solid #e8cf91;
      border-radius:10px;
      padding:11px 12px;
      margin-top:13px;
      color:#fff8e7;
      font-weight:700;
      line-height:1.5;
      overflow-wrap:anywhere;
    }
    #zurielNavigation .nav-status {
      color:#e4eaf3;
      font-size:12px;
      line-height:1.5;
      margin:8px 1px 0;
      min-height:18px;
    }
    #zurielNavigation .nav-help {
      color:#dce5f1;
      font-size:12px;
      line-height:1.5;
      margin:6px 0 0;
    }
    #zurielNavigation .nav-jump {
      display:block;
      width:100%;
      min-height:45px;
      margin:10px 0 0;
      border:1px solid #e8cf91;
      border-radius:10px;
      background:#e8cf91;
      color:#10213d;
      font-weight:800;
      font-size:14px;
    }
    #zurielNavigation .nav-jump:disabled { opacity:.5; }
    #message .verse.zuriel-nav-highlight {
      background:#fff0c9 !important;
      border-left:5px solid #b99b58;
      border-radius:8px;
      padding-left:12px;
      scroll-margin-top:18px;
    }
    @media(max-width:390px) {
      #zurielNavigation { padding:13px; }
      #zurielNavigation .nav-two { grid-template-columns:1fr; gap:0; }
    }
  `;
  document.head.appendChild(style);

  const navigation = document.createElement("section");
  navigation.id = "zurielNavigation";
  navigation.innerHTML = `
    <h3>📖 Zuriel Bible Navigator</h3>
    <p class="nav-description">Find any book, chapter or verse quickly. Your Scripture opens below.</p>

    <label for="zurielNavSearch">Find a Bible book</label>
    <input id="zurielNavSearch" type="search" autocomplete="off"
      placeholder="Type a book name — e.g. John, Psalms..." aria-label="Search Bible books">

    <label for="zurielNavBook">1. Bible Book</label>
    <select id="zurielNavBook">
      <option value="">Choose a Bible book</option>
    </select>
    <div class="nav-artwork" id="zurielNavArtwork" aria-live="polite">
      <img id="zurielNavArtworkImage" alt="Illustration for the selected Bible book">
      <div class="nav-artwork-caption" id="zurielNavArtworkCaption"></div>
    </div>

    <div class="nav-two">
      <div>
        <label for="zurielNavChapter">2. Chapter</label>
        <select id="zurielNavChapter" disabled>
          <option value="">Choose chapter</option>
        </select>
      </div>
      <div>
        <label for="zurielNavVerse">3. Verse</label>
        <select id="zurielNavVerse" disabled>
          <option value="">Choose verse</option>
        </select>
      </div>
    </div>

    <button type="button" class="nav-jump" id="zurielNavOpen" disabled>Open Selected Chapter</button>
    <div class="nav-current" id="zurielNavCurrent" aria-live="polite">Ready to explore God's Word.</div>
    <p class="nav-status" id="zurielNavStatus">All 66 Bible books are ready.</p>
  `;
  root.insertBefore(navigation, message);

  const search = navigation.querySelector("#zurielNavSearch");
  const bookSelect = navigation.querySelector("#zurielNavBook");
  const artwork = navigation.querySelector("#zurielNavArtwork");
  const artworkImage = navigation.querySelector("#zurielNavArtworkImage");
  const artworkCaption = navigation.querySelector("#zurielNavArtworkCaption");
  const chapterSelect = navigation.querySelector("#zurielNavChapter");
  const verseSelect = navigation.querySelector("#zurielNavVerse");
  const openButton = navigation.querySelector("#zurielNavOpen");
  const currentLabel = navigation.querySelector("#zurielNavCurrent");
  const navStatus = navigation.querySelector("#zurielNavStatus");

  let selectedBook = "";
  let selectedChapter = 0;
  let observerTimer = null;

  const bookArtwork = {
    "Judges": { image: "./images/books/0fc10dde-c515-45e8-916b-5a27f61b0841.jpg", caption: "Judges — God's deliverance, faith and grace" },
    "Joshua": { image: "./images/books/738dfb2c-b2e8-49d6-bc1c-d6766be38adf.jpg", caption: "Joshua — God's promise and the crossing into the land" },
    "Deuteronomy": { image: "./images/books/d14a5cec-132e-4432-9604-9cb82cd8cf71.jpg", caption: "Deuteronomy — Moses' final instructions" },
    "Numbers": { image: "./images/books/d9f06adf-07c3-45b7-bb53-385c15032679.jpg", caption: "Numbers — Israel's wilderness journey" }
  };

  function updateBookArtwork(bookName) {
    const art = bookArtwork[bookName];
    if (!art) {
      artwork.style.display = "none";
      artworkImage.removeAttribute("src");
      artworkCaption.textContent = "";
      return;
    }
    artworkImage.src = art.image;
    artworkImage.alt = bookName + " Bible book illustration";
    artworkCaption.textContent = art.caption;
    artwork.style.display = "block";
  }

  function addOption(select, value, label) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  }

  function fillBooks(filter) {
    const query = String(filter || "").trim().toLowerCase();
    const previous = bookSelect.value;
    bookSelect.replaceChildren();
    addOption(bookSelect, "", "Choose a Bible book");

    const oldGroup = document.createElement("optgroup");
    oldGroup.label = "OLD TESTAMENT — 39 BOOKS";
    const newGroup = document.createElement("optgroup");
    newGroup.label = "NEW TESTAMENT — 27 BOOKS";

    books.forEach(function (book, index) {
      if (query && !book.name.toLowerCase().includes(query)) return;
      const option = document.createElement("option");
      option.value = book.name;
      option.textContent = book.name;
      (index < 39 ? oldGroup : newGroup).appendChild(option);
    });

    if (oldGroup.children.length) bookSelect.appendChild(oldGroup);
    if (newGroup.children.length) bookSelect.appendChild(newGroup);
    if (previous && Array.from(bookSelect.options).some(o => o.value === previous)) {
      bookSelect.value = previous;
    }
    if (query && !oldGroup.children.length && !newGroup.children.length) {
      navStatus.textContent = "No Bible book matches “" + filter + "”.";
    } else if (query) {
      navStatus.textContent = "Matching books shown. Select one to continue.";
    }
  }

  function resetSelect(select, placeholder) {
    select.replaceChildren();
    addOption(select, "", placeholder);
  }

  function resetChapterAndVerse() {
    resetSelect(chapterSelect, "Choose chapter");
    resetSelect(verseSelect, "Choose verse");
    chapterSelect.disabled = true;
    verseSelect.disabled = true;
    openButton.disabled = true;
  }

  function populateChapters(bookName, keepChapter) {
    const book = books.find(item => item.name === bookName);
    resetSelect(chapterSelect, "Choose chapter");
    resetSelect(verseSelect, "Choose verse");
    verseSelect.disabled = true;
    if (!book) {
      chapterSelect.disabled = true;
      openButton.disabled = true;
      return;
    }
    for (let n = 1; n <= book.chapters; n++) addOption(chapterSelect, String(n), "Chapter " + n);
    chapterSelect.disabled = false;
    if (keepChapter && keepChapter <= book.chapters) chapterSelect.value = String(keepChapter);
    openButton.disabled = !chapterSelect.value;
  }

  function populateVerses() {
    resetSelect(verseSelect, "Choose verse");
    const verses = message.querySelectorAll(".verse");
    if (!verses.length) {
      verseSelect.disabled = true;
      return;
    }
    verses.forEach(function (_, index) {
      addOption(verseSelect, String(index + 1), "Verse " + (index + 1));
    });
    verseSelect.disabled = false;
  }

  async function openSelectedChapter() {
    const book = bookSelect.value;
    const chapter = Number(chapterSelect.value);
    if (!book || !chapter || typeof window.openChapter !== "function") return;

    selectedBook = book;
    selectedChapter = chapter;
    openButton.disabled = true;
    openButton.textContent = "Opening Scripture…";
    navStatus.textContent = "Opening " + book + " " + chapter + "…";
    try {
      await window.openChapter(book, chapter);
      currentLabel.textContent = book + " " + chapter;
      navStatus.textContent = "Chapter ready. Choose a verse to jump directly to it.";
      populateVerses();
      verseSelect.value = "";
    } catch (error) {
      navStatus.textContent = "Unable to open this chapter. Please try again.";
      console.error("Zuriel Navigator:", error);
    } finally {
      openButton.disabled = !chapterSelect.value;
      openButton.textContent = "Open Selected Chapter";
    }
  }

  function jumpToVerse() {
    const number = Number(verseSelect.value);
    if (!number) return;
    const verses = message.querySelectorAll(".verse");
    const target = verses[number - 1];
    if (!target) return;

    message.querySelectorAll(".verse.zuriel-nav-highlight").forEach(function (item) {
      item.classList.remove("zuriel-nav-highlight");
    });
    target.classList.add("zuriel-nav-highlight");
    currentLabel.textContent = selectedBook + " " + selectedChapter + ":" + number;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function syncFromReader() {
    const verses = message.querySelectorAll(".verse");
    if (!verses.length) return;
    const heading = message.querySelector("h2");
    if (!heading) return;
    const match = heading.textContent.match(/^(.+?)\s+(\d+)\s+—/);
    if (!match) return;

    const book = match[1].trim();
    const chapter = Number(match[2]);
    selectedBook = book;
    selectedChapter = chapter;
    updateBookArtwork(book);

    if (bookSelect.value !== book) {
      search.value = "";
      fillBooks("");
      bookSelect.value = book;
    }
    if (chapterSelect.options.length !== (books.find(b => b.name === book)?.chapters || 0) + 1) {
      populateChapters(book, chapter);
    } else {
      chapterSelect.value = String(chapter);
    }
    populateVerses();
    currentLabel.textContent = book + " " + chapter;
    navStatus.textContent = verses.length + " verses ready. Choose a verse to jump to it.";
    openButton.disabled = !chapterSelect.value;
  }

  search.addEventListener("input", function () {
    fillBooks(search.value);
    if (!bookSelect.value) resetChapterAndVerse();
  });

  bookSelect.addEventListener("change", function () {
    selectedBook = bookSelect.value;
    selectedChapter = 0;
    updateBookArtwork(selectedBook);
    populateChapters(selectedBook);
    currentLabel.textContent = selectedBook
      ? selectedBook + " — choose a chapter"
      : "Ready to explore God's Word.";
    navStatus.textContent = selectedBook
      ? "Choose a chapter, then open it."
      : "Choose a Bible book to begin.";
  });

  chapterSelect.addEventListener("change", function () {
    openButton.disabled = !chapterSelect.value;
    resetSelect(verseSelect, "Choose verse");
    verseSelect.disabled = true;
    if (chapterSelect.value) openSelectedChapter();
  });

  openButton.addEventListener("click", openSelectedChapter);
  verseSelect.addEventListener("change", jumpToVerse);

  const observer = new MutationObserver(function () {
    if (observerTimer) window.clearTimeout(observerTimer);
    observerTimer = window.setTimeout(syncFromReader, 60);
  });
  observer.observe(message, { childList: true, subtree: true });

  fillBooks("");
  resetChapterAndVerse();
  navStatus.textContent = "39 Old Testament books and 27 New Testament books ready.";
  console.log("Zuriel Smart Bible Navigator loaded.");
})();
