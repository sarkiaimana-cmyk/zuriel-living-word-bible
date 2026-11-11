
/* =========================================================
   ZURIEL LIVING WORD BIBLE
   VERSE SELECTION & SCRIPTURE STUDY CENTRE
   Complete replacement — Version 2
   ========================================================= */

(function () {
  "use strict";

  const NOTES_KEY = "zuriel-verse-study-notes-v1";

  const crossReferences = [
    ["Genesis", 1, 2, "The creation account"],
    ["Psalms", 33, 6, "Creation through God's Word"],
    ["Psalms", 90, 2, "God before creation"],
    ["Isaiah", 45, 18, "God the Creator"],
    ["John", 1, 1, "The Word in the beginning"],
    ["Acts", 17, 24, "God made the world"],
    ["Colossians", 1, 16, "All things created through Christ"],
    ["Hebrews", 11, 3, "Creation by God's Word"],
    ["Revelation", 4, 11, "The Creator is worthy"]
  ];

  let selectedReference = null;

  function readNotes() {
    try {
      const saved = JSON.parse(localStorage.getItem(NOTES_KEY));
      return saved && typeof saved === "object" ? saved : {};
    } catch (error) {
      return {};
    }
  }

  function referenceKey(book, chapter, verse) {
    return book + "|" + chapter + "|" + verse;
  }

  function createStudy() {
    if (document.getElementById("zurielStudyPanel")) return;

    const style = document.createElement("style");

    style.textContent = `
      #zurielStudyPanel {
        background:#10213d;
        color:#f8f4e9;
        border:1px solid #b99b58;
        border-radius:18px;
        padding:18px;
        margin:22px 0;
        line-height:1.75;
        scroll-margin-top:18px;
      }

      #zurielStudyPanel h2,
      #zurielStudyPanel h3 {
        color:#e8cf91;
      }

      #zurielStudyPanel .study-verse {
        background:#1c3657;
        border:1px solid #b99b58;
        border-radius:12px;
        padding:16px;
        margin:15px 0;
      }

      #zurielStudyPanel .study-small {
        color:#d9e3ef;
        font-size:13px;
      }

      #zurielStudyPanel details {
        background:#fff;
        color:#18304d;
        border-radius:12px;
        margin:12px 0;
        overflow:hidden;
      }

      #zurielStudyPanel summary {
        padding:16px;
        cursor:pointer;
        font-weight:bold;
      }

      #zurielStudyPanel .study-body {
        padding:0 16px 17px;
      }

      #zurielStudyPanel .study-word {
        background:#f2eee4;
        border-left:4px solid #b99b58;
        color:#18304d;
        padding:12px;
        margin:10px 0;
        border-radius:7px;
      }

      #zurielStudyPanel .study-link {
        display:block;
        width:100%;
        text-align:left;
        background:#fff;
        color:#18304d;
        border:1px solid #d6c79e;
        border-radius:9px;
        padding:12px;
        margin:8px 0;
        min-height:46px;
        font-weight:bold;
      }

      #zurielStudyPanel textarea,
      #zurielStudyPanel input {
        width:100%;
        box-sizing:border-box;
        padding:12px;
        border:1px solid #c8c8c8;
        border-radius:9px;
        font:inherit;
        margin:6px 0 12px;
      }

      #zurielStudyPanel textarea {
        min-height:110px;
      }

      #zurielStudyPanel .study-action {
        background:#e8cf91;
        color:#10213d;
        border:1px solid #b99b58;
        padding:12px 16px;
        min-height:46px;
        border-radius:9px;
        font-weight:bold;
        margin:5px 4px 5px 0;
      }

      #zurielStudyPanel .study-secondary {
        background:#fff;
        color:#18304d;
        border:1px solid #d6c79e;
        padding:12px 16px;
        min-height:46px;
        border-radius:9px;
        font-weight:bold;
        margin:5px 4px 5px 0;
      }

      .verse.zuriel-selected-verse {
        background:#fff0c9 !important;
        border-left:5px solid #b99b58;
        border-radius:8px;
        padding-left:12px;
      }

      #zurielStudySaveStatus {
        color:#e8cf91;
        font-weight:bold;
      }
    `;

    document.head.appendChild(style);

    const panel = document.createElement("section");
    panel.id = "zurielStudyPanel";

    panel.innerHTML = `
      <h2>📖 Zuriel Scripture Study Centre</h2>

      <p>
        Explore God's Word deeply, carefully and prayerfully.
        Select a verse in the Bible reader to begin.
      </p>

      <div class="study-verse" id="zurielSelectedVerse">
        <h3 id="zurielSelectedReference">
          Your selected Scripture will appear here.
        </h3>

        <p id="zurielSelectedText">
          Open a Bible chapter and tap any verse.
        </p>

        <p class="study-small" id="zurielSelectionNotice">
          Scripture text is displayed separately from study
          explanations and personal reflections.
        </p>
      </div>

      <button class="study-action" id="zurielReturnToVerse">
        ← Return to Selected Verse
      </button>

      <button class="study-secondary" id="zurielCloseStudy">
        Close Study Panel
      </button>

      <div id="zurielStudySections">

        <details open>
          <summary>📜 1. Scripture and Historical Context</summary>
          <div class="study-body" id="zurielContext">
            <p>
              Select a Scripture passage to begin its study.
              Book introductions, historical background,
              literary structure and context will be connected
              to verified resources as they are developed.
            </p>
          </div>
        </details>

        <details>
          <summary>💡 2. Meaning and Exposition</summary>
          <div class="study-body" id="zurielMeaning">
            <p>
              Consider the words, sentences and surrounding
              passage. A verse should be understood within
              its chapter, book and wider biblical context.
            </p>
            <p>
              Detailed explanations will be added passage
              by passage using verified study material.
            </p>
          </div>
        </details>

        <details>
          <summary>🔤 3. Hebrew and Greek Word Study</summary>
          <div class="study-body" id="zurielOriginalWords">
            <p>
              Original-language study will include Hebrew
              for the Old Testament and Greek for the New
              Testament, with meanings, pronunciation,
              grammatical information and verified references.
            </p>
            <p>
              Original-language details will only be shown
              when they have been properly checked.
            </p>
          </div>
        </details>

        <details>
          <summary>🔗 4. Connected Scriptures</summary>
          <div class="study-body">
            <p>
              Related passages help us compare Scripture
              with Scripture. Select a reference below
              to open it in the Bible reader.
            </p>
            <div id="zurielCrossReferenceList"></div>
          </div>
        </details>

        <details>
          <summary>📚 5. Theology and Deeper Study</summary>
          <div class="study-body" id="zurielDeeperStudy">
            <p>
              Explore the biblical themes, teachings and
              connections of the selected passage.
              Interpretations should be examined in context
              and distinguished from the Scripture text itself.
            </p>
          </div>
        </details>

        <details>
          <summary>📝 6. My Personal Study Journal</summary>
          <div class="study-body">
            <p>
              Your notes are saved separately for each
              selected Bible verse on this device.
            </p>

            <label for="zurielStudyTitle">Study title</label>
            <input
              id="zurielStudyTitle"
              placeholder="Give this study a title">

            <label for="zurielStudyNote">
              What have I learned?
            </label>
            <textarea
              id="zurielStudyNote"
              placeholder="Write your observations and discoveries..."></textarea>

            <label for="zurielStudyApplication">
              How will I apply this Word?
            </label>
            <textarea
              id="zurielStudyApplication"
              placeholder="Write your personal application..."></textarea>

            <button class="study-action" id="zurielSaveStudyNote">
              Save My Study
            </button>

            <button class="study-secondary" id="zurielClearStudyNote">
              Clear Fields
            </button>

            <p id="zurielStudySaveStatus"></p>
          </div>
        </details>

        <details>
          <summary>🙏 7. Prayer and Declaration</summary>
          <div class="study-body" id="zurielPrayerDeclaration">
            <h3>Prayer</h3>
            <p>
              Heavenly Father, give me understanding as I
              study Your Word. Help me to recognise its truth,
              receive its instruction and walk in wisdom.
              In Jesus' name, Amen.
            </p>

            <h3>Declaration</h3>
            <p>
              I receive God's Word with faith. I grow in
              understanding, walk in His wisdom and live
              according to His truth.
            </p>

            <p class="study-small">
              Personal prayer and declaration for reflection.
            </p>
          </div>
        </details>

      </div>

      <div id="zurielGenesisStudy" style="display:none">

        <h2>🌍 Genesis 1:1 — Expanded Study</h2>

        <details>
          <summary>📜 Genesis 1:1 — Historical and Literary Context</summary>
          <div class="study-body">
            <h3>Book introduction</h3>
            <p>
              Genesis is the opening book of the Bible and
              the first book of the Pentateuch. Its name
              means beginning or origin. It introduces
              creation, humanity, sin, God's promises and
              the beginnings of the people of Israel.
            </p>

            <h3>Authorship and composition</h3>
            <p>
              Jewish and Christian tradition associates
              Genesis with Moses. The book belongs to the
              Pentateuch. Its composition and literary history
              have also been examined by modern scholarship.
            </p>

            <h3>Historical setting</h3>
            <p>
              Genesis 1 presents God as the Creator of
              everything. It begins before the history of
              Israel and establishes the biblical foundation
              for understanding the world as God's creation.
            </p>

            <h3>Literary structure</h3>
            <p>
              Genesis 1:1 introduces the creation account.
              Genesis 1:2 describes the earth's initial
              condition. The following verses describe
              God's creative commands and the ordering
              of creation.
            </p>

            <h3>Why this verse matters</h3>
            <p>
              Before the Bible introduces humanity, nations,
              covenants or kingdoms, it introduces God.
              Creation begins with Him.
            </p>
          </div>
        </details>

        <details>
          <summary>💡 Genesis 1:1 — Meaning and Exposition</summary>
          <div class="study-body">
            <h3>In the beginning</h3>
            <p>
              The opening words establish the beginning
              of creation. They direct attention to the
              origin of the created order rather than
              presenting God as part of that order.
            </p>

            <h3>God</h3>
            <p>
              God is the central subject of the sentence.
              The verse begins with His action, not human
              achievement or natural power.
            </p>

            <h3>Created</h3>
            <p>
              The Hebrew verb describes God's creative
              action. The verse presents creation as
              dependent on God's initiative and authority.
            </p>

            <h3>The heaven and the earth</h3>
            <p>
              This expression presents the totality of
              the created realm: the heavens and the earth.
            </p>

            <h3>Main biblical teaching</h3>
            <ul>
              <li>God is the Creator.</li>
              <li>The universe is not presented as self-created.</li>
              <li>Creation belongs to God.</li>
              <li>Human life has its origin within God's creation.</li>
            </ul>

            <h3>Practical application</h3>
            <p>
              Recognise God as the source of life. Approach
              creation with humility, gratitude, responsibility
              and worship.
            </p>
          </div>
        </details>

        <details>
          <summary>🔤 Genesis 1:1 — Hebrew Word Study</summary>
          <div class="study-body">
            <div class="study-word">
              <h3>בְּרֵאשִׁית — Bereshit</h3>
              <p><b>Meaning:</b> In the beginning.</p>
              <p><b>Function:</b> Opening expression of the verse.</p>
            </div>

            <div class="study-word">
              <h3>בָּרָא — Bara</h3>
              <p><b>Meaning:</b> Created.</p>
              <p><b>Function:</b> Verb describing the creative action.</p>
            </div>

            <div class="study-word">
              <h3>אֱלֹהִים — Elohim</h3>
              <p><b>Meaning:</b> God.</p>
              <p>
                <b>Function:</b> Subject of the sentence.
                It takes a singular verb in this verse.
              </p>
            </div>

            <div class="study-word">
              <h3>הַשָּׁמַיִם — Hashamayim</h3>
              <p><b>Meaning:</b> The heavens.</p>
            </div>

            <div class="study-word">
              <h3>הָאָרֶץ — Ha'aretz</h3>
              <p><b>Meaning:</b> The earth or land.</p>
            </div>

            <p>
              Further study can include Strong's numbers,
              grammatical parsing, pronunciation and
              lexical definitions from verified Hebrew resources.
            </p>
          </div>
        </details>

        <details>
          <summary>📚 Genesis 1:1 — Theology and Deeper Study</summary>
          <div class="study-body">
            <h3>God as Creator</h3>
            <p>
              The verse establishes God's relationship to
              everything that exists. Creation is dependent
              upon Him.
            </p>

            <h3>Creation and Christ</h3>
            <p>
              John 1:1–3 and Colossians 1:16–17 connect
              the biblical teaching about creation with
              the Word and the person of Jesus Christ.
            </p>

            <h3>Creation and faith</h3>
            <p>
              Hebrews 11:3 connects creation with faith
              and the understanding that the visible world
              did not originate from visible things.
            </p>

            <h3>Questions for deeper reflection</h3>
            <ol>
              <li>What does this verse reveal about God's identity?</li>
              <li>What does creation reveal about God's authority?</li>
              <li>How should belief in God as Creator shape our lives?</li>
              <li>How do John 1:1–3 and Genesis 1:1 connect?</li>
            </ol>

            <p>
              Different Christian traditions discuss the
              chronology and interpretation of creation
              passages. Those interpretations should be
              examined fairly and in their biblical context.
            </p>
          </div>
        </details>

      </div>

      <p class="study-small">
        Zuriel Living Word Bible — His Words... My Life...
        My Victory.
      </p>
    `;

    const main = document.querySelector("main");

    if (main) {
      main.appendChild(panel);
    } else {
      document.body.appendChild(panel);
    }

    function showSavedNote() {
      if (!selectedReference) return;

      const key = referenceKey(
        selectedReference.book,
        selectedReference.chapter,
        selectedReference.verse
      );

      const notes = readNotes();
      const record = notes[key];

      document.getElementById("zurielStudyTitle").value =
        record ? record.title || "" : "";

      document.getElementById("zurielStudyNote").value =
        record ? record.note || "" : "";

      document.getElementById("zurielStudyApplication").value =
        record ? record.application || "" : "";

      document.getElementById("zurielStudySaveStatus").textContent =
        record ? "Saved study loaded for this verse." : "";
    }

    function findVerseElement(number) {
      const verses = document.querySelectorAll("#message .verse");

      for (const item of verses) {
        const strong = item.querySelector("strong");

        if (strong && strong.textContent.replace(".", "") === String(number)) {
          return item;
        }
      }

      return null;
    }

    function highlightSelectedVerse(number) {
      document.querySelectorAll(".verse.zuriel-selected-verse")
        .forEach(function (item) {
          item.classList.remove("zuriel-selected-verse");
        });

      const verseElement = findVerseElement(number);

      if (verseElement) {
        verseElement.classList.add("zuriel-selected-verse");
      }
    }

    function returnToSelectedVerse() {
      if (!selectedReference) return;

      if (typeof window.openChapter !== "function") {
        document.getElementById("zurielStudySaveStatus").textContent =
          "The Bible reader is not available yet.";
        return;
      }

      Promise.resolve(
        window.openChapter(
          selectedReference.book,
          selectedReference.chapter
        )
      ).then(function () {
        setTimeout(function () {
          const verseElement = findVerseElement(
            selectedReference.verse
          );

          if (verseElement) {
            highlightSelectedVerse(selectedReference.verse);
            verseElement.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          }
        }, 150);
      }).catch(function () {
        document.getElementById("zurielStudySaveStatus").textContent =
          "Unable to return to the selected passage.";
      });
    }

    function openCrossReference(item) {
      if (typeof window.openChapter !== "function") return;

      Promise.resolve(
        window.openChapter(item[0], item[1])
      ).then(function () {
        selectedReference = {
          book: item[0],
          chapter: item[1],
          verse: item[2],
          text: ""
        };

        const bookSelect = document.getElementById("book");

        if (bookSelect) bookSelect.value = item[0];

        const referenceHeading =
          document.getElementById("zurielSelectedReference");

        referenceHeading.textContent =
          item[0] + " " + item[1] + ":" + item[2] + " — KJV";

        document.getElementById("zurielSelectedText").textContent =
          "Open the highlighted chapter and select verse " +
          item[2] + " to view its Scripture text.";

        panel.style.display = "";
        panel.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        setTimeout(function () {
          const target = findVerseElement(item[2]);

          if (target) {
            highlightSelectedVerse(item[2]);
            target.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          }
        }, 150);
      });
    }

    crossReferences.forEach(function (item) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "study-link";
      butt
