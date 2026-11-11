
/* =========================================================
   ZURIEL LIVING WORD BIBLE
   PREMIUM BIBLE NAVIGATION SYSTEM
   Books • Chapters • Verses • Visible Scripture
   ========================================================= */

(function () {
  "use strict";

  const START_BOOK_COUNT = 39;
  const root = document.getElementById("bibleReader");
  const message = document.getElementById("message");

  if (!root || !message) {
    console.error("Zuriel Navigation: Bible reader elements not found.");
    return;
  }

  if (!Array.isArray(window.bibleBooks) && typeof bibleBooks === "undefined") {
    console.error("Zuriel Navigation: Bible book list is unavailable.");
    return;
  }

  const books = typeof bibleBooks !== "undefined"
    ? bibleBooks
    : window.bibleBooks;

  let selectedBook = "";
  let selectedChapter = 0;
  let observer = null;

  /* ---------------------------------------------------------
     DESIGN
  --------------------------------------------------------- */

  const style = document.createElement("style");

  style.textContent = `
    #zurielNavigation {
      background:linear-gradient(145deg,#10213d,#203e68);
      color:#f8f4e9;
      border:1px solid #b99b58;
      border-radius:18px;
      padding:15px;
      margin:18px 0;
      box-shadow:0 5px 18px #10213d22;
    }

    #zurielNavigation h3 {
      color:#f1d99e;
      margin:5px 0 12px;
      font-size:19px;
    }

    #zurielNavigation .nav-description {
      color:#dce5f1;
      font-size:13px;
      line-height:1.6;
    }

    #zurielNavigation label {
      display:block;
      color:#f1d99e;
      font-weight:bold;
      margin:14px 0 6px;
    }

    #zurielNavigation select {
      width:100%;
      min-height:48px;
      padding:11px;
      border-radius:9px;
      border:1px solid #b99b58;
      background:#fff;
      color:#18304d;
      font-size:16px;
      margin:0;
    }

    #zurielNavigation .nav-scroll {
      display:flex;
      flex-wrap:wrap;
      gap:7px;
      max-height:180px;
      overflow-y:auto;
      padding:5px 2px 9px;
      -webkit-overflow-scrolling:touch;
    }

    #zurielNavigation .nav-number {
      min-width:43px;
      min-height:43px;
      padding:8px;
      margin:0;
      border-radius:9px;
      background:#f8f4e9;
      color:#18304d;
      border:1px solid #c8b77e;
      font-size:15px;
      font-weight:bold;
    }

    #zurielNavigation .nav-number.active {
      background:#e8cf91;
      color:#10213d;
      border:2px solid #fff0bd;
    }

    #zurielNavigation .nav-number:disabled {
      opacity:.4;
    }

    #zurielNavigation .nav-section {
      border-top:1px solid #ffffff35;
      margin-top:12px;
      padding-top:9px;
    }

    #zurielNavigation .nav-status {
      color:#f1d99e;
      font-size:13px;
      line-height:1.6;
      margin:10px 0 2px;
    }

    #zurielNavigation .nav-current {
      background:#ffffff12;
      border-left:4px solid #e8cf91;
      padding:10px;
      border-radius:7px;
      margin-top:12px;
      font-weight:bold;
      line-height:1.6;
    }

    #zurielNavigation .nav-help {
      color:#dce5f1;
      font-size:12px;
      margin:7px 0;
    }

    #message .verse.zuriel-nav-highlight {
      background:#fff0c9 !important;
      border-left:5px solid #b99b58;
      border-radius:8px;
      padding-left:12px;
      scroll-margin-top:15px;
    }

    @media (max-width:480px) {
      #zurielNavigation {
        padding:12px;
        border-radius:14px;
      }

      #zurielNavigation .nav-scroll {
        max-height:145px;
      }

      #zurielNavigation .nav-number {
        min-width:40px;
        min-height:42px;
      }
    }
  `;

  document.head.appendChild(style);

  /* ---------------------------------------------------------
     NAVIGATION INTERFACE
  --------------------------------------------------------- */

  const navigation = document.createElement("section");
  navigation.id = "zurielNavigation";

  navigation.innerHTML = `
    <h3>📖 Zuriel Bible Navigator</h3>

    <p class="nav-description">
      Select a Bible book, chapter and verse.
      Your Scripture remains visible below.
    </p>

    <label for="zurielNavBook">1. Choose a Bible Book</label>
    <select id="zurielNavBook">
      <option value="">Select a book</option>
    </select>

    <div class="nav-section">
      <label>2. Choose a Chapter</label>
      <div id="zurielNavChapters" class="nav-scroll">
        <p class="nav-help">Choose a book first.</p>
      </div>
    </div>

    <div class="nav-section">
      <label>3. Choose a Verse</label>
      <div id="zurielNavVerses" class="nav-scroll">
        <p class="nav-help">Choose a chapter first.</p>
      </div>
      <p class="nav-help">
        Selecting a verse takes you to its position in the visible Scripture.
        Tap the Scripture text itself to open its study.
      </p>
    </div>

    <div class="nav-current" id="zurielNavCurrent">
      Ready to explore God's Word.
    </div>

    <p class="nav-status" id="zurielNavStatus">
      All 66 Bible books are available.
    </p>
  `;

  root.insertBefore(navigation, message);

  const bookSelect = document.getElementById("zurielNavBook");
  const chapterBox = document.getElementById("zurielNavChapters");
  const verseBox = document.getElementById("zurielNavVerses");
  const currentLabel = document.getElementById("zurielNavCurrent");
  const navStatus = document.getElementById("zurielNavStatus");

  /* ---------------------------------------------------------
     BOOK LIST — OLD AND NEW TESTAMENT
  --------------------------------------------------------- */

  function fillBookList() {
    bookSelect.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Choose a Bible book";
    bookSelect.appendChild(placeholder);

    const oldTestament = document.createElement("optgroup");
    oldTestament.label = "OLD TESTAMENT — 39 BOOKS";

    const newTestament = document.createElement("optgroup");
    newTestament.label = "NEW TESTAMENT — 27 BOOKS";

    books.forEach(function (book, index) {
      const option = document.createElement("option");
      option.value = book.name;
      option.textContent = book.name;

      if (index < START_BOOK_COUNT) {
        oldTestament.appendChild(option);
      } else {
        newTestament.appendChild(option);
      }
    });

    bookSelect.appendChild(oldTestament);
    bookSelect.appendChild(newTestament);
  }

  /* ---------------------------------------------------------
     RESET CHAPTER AND VERSE SELECTORS
  --------------------------------------------------------- */

  function resetVerses() {
    verseBox.replaceChildren();

    const hint = document.createElement("p");
    hint.className = "nav-help";
    hint.textContent = "Choose a chapter first.";
    verseBox.appendChild(hint);
  }

  function showChapters(bookName) {
    const book = books.find(function (item) {
      return item.name === bookName;
    });

    chapterBox.replaceChildren();
    resetVerses();

    if (!book) return;

    selectedBook = bookName;
    selectedChapter = 0;

    for (let number = 1; number <= book.chapters; number++) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "nav-number";
      button.textContent = number;

      button.addEventListener("click", function () {
        openSelectedChapter(bookName, number);
      });

      chapterBox.appendChild(button);
    }

    currentLabel.textContent =
      bookName + " — " + book.chapters + " chapters";

    navStatus.textContent =
      "Choose any chapter of " + bookName + ".";
  }

  /* ---------------------------------------------------------
     OPEN CHAPTER USING EXISTING BIBLE READER
  --------------------------------------------------------- */

  async function openSelectedChapter(bookName, chapterNumber) {
    if (typeof window.openChapter !== "function") {
      navStatus.textContent =
        "Bible reader is not ready. Please reload the page.";
      return;
    }

    selectedBook = bookName;
    selectedChapter = chapterNumber;

    try {
      navStatus.textContent =
        "Opening " + bookName + " chapter " + chapterNumber + "...";

      await window.openChapter(bookName, chapterNumber);

      bookSelect.value = bookName;

      updateChapterHighlight();
      updateVerseSelector();

      currentLabel.textContent =
        bookName + " " + chapterNumber;

      navStatus.textContent =
        "Chapter opened. Choose a verse or read the passage below.";

    } catch (error) {
      navStatus.textContent =
        "Unable to open chapter. Please try again.";
      console.error("Zuriel navigation:", error);
    }
  }

  /* ---------------------------------------------------------
     HIGHLIGHT SELECTED CHAPTER
  --------------------------------------------------------- */

  function updateChapterHighlight() {
    const buttons = chapterBox.querySelectorAll("button");

    buttons.forEach(function (button) {
      const number = Number(button.textContent);

      button.classList.toggle(
        "active",
        number === selectedChapter
      );
    });
  }

  /* ---------------------------------------------------------
     BUILD VERSE SELECTOR FROM THE OPEN CHAPTER
  --------------------------------------------------------- */

  function updateVerseSelector() {
    const verses = message.querySelectorAll(".verse");

    verseBox.replaceChildren();

    if (!verses.length) {
      const hint = document.createElement("p");
      hint.className = "nav-help";
      hint.textContent = "Open a chapter to see its verses.";
      verseBox.appendChild(hint);
      return;
    }

    verses.forEach(function (verseElement, index) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "nav-number";
      button.textContent = index + 1;
      button.setAttribute("aria-label", "Go to verse " + (index + 1));

      button.addEventListener("click", function () {
        selectVerse(index + 1, verseElement);
      });

      verseBox.appendChild(button);
    });
  }

  /* ---------------------------------------------------------
     SELECT AND DISPLAY VERSE
  --------------------------------------------------------- */

  function selectVerse(number, element) {
    message.querySelectorAll(".verse.zuriel-nav-highlight")
      .forEach(function (item) {
        item.classList.remove("zuriel-nav-highlight");
      });

    verseBox.querySelectorAll("button").forEach(function (button) {
      button.classList.toggle(
        "active",
        Number(button.textContent) === number
      );
    });

    element.classList.add("zuriel-nav-highlight");

    currentLabel.textContent =
      selectedBook + " " + selectedChapter + ":" + number;

    element.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  /* ---------------------------------------------------------
     WATCH THE EXISTING READER
     This keeps verse navigation synchronised when chapters
     are opened through the reader or cross-references.
  --------------------------------------------------------- */

  function detectOpenedChapter() {
    const verses = message.querySelectorAll(".verse");

    if (!verses.length) {
      updateVerseSelector();
      return;
    }

    const heading = message.querySelector("h2");

    if (heading) {
      const title = heading.textContent;
      const match = title.match(/^(.+?)\s+(\d+)\s+—/);

      if (match) {
        selectedBook = match[1].trim();
        selectedChapter = Number(match[2]);
        bookSelect.value = selectedBook;

        const book = books.find(function (item) {
          return item.name === selectedBook;
        });

        if (book && chapterBox.children.length !== book.chapters) {
          showChapters(selectedBook);
          selectedChapter = Number(match[2]);
        }

        updateChapterHighlight();

        currentLabel.textContent =
          selectedBook + " " + selectedChapter;
      }
    }

    updateVerseSelector();

    navStatus.textContent =
      verses.length + " verses ready for navigation.";
  }

  observer = new MutationObserver(function () {
    detectOpenedChapter();
  });

  observer.observe(message, {
    childList: true,
    subtree: true
  });

  /* ---------------------------------------------------------
     BOOK SELECTION
  --------------------------------------------------------- */

  bookSelect.addEventListener("change", function () {
    const bookName = bookSelect.value;

    if (!bookName) {
      chapterBox.replaceChildren();
      resetVerses();

      currentLabel.textContent =
        "Ready to explore God's Word.";

      navStatus.textContent =
        "Choose a Bible book to begin.";

      return;
    }

    showChapters(bookName);

    navStatus.textContent =
      "Now choose a chapter of " + bookName + ".";
  });

  /* ---------------------------------------------------------
     INITIALISE
  --------------------------------------------------------- */

  fillBookList();

  navStatus.textContent =
    "39 Old Testament books and 27 New Testament books ready.";

  console.log("Zuriel Bible Navigation loaded successfully.");

})();
 
