
/* =========================================================
   ZURIEL LIVING WORD BIBLE
   SCRIPTURE STUDY CENTRE — COMPLETE WORKING VERSION
   ========================================================= */

(function () {
  "use strict";

  const NOTES_KEY = "zuriel-verse-study-notes-v1";
  let selectedReference = null;

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

  function readNotes() {
    try {
      return JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
    } catch (error) {
      return {};
    }
  }

  function noteKey(ref) {
    return ref.book + "|" + ref.chapter + "|" + ref.verse;
  }

  function createStudyPanel() {
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
      #zurielStudyPanel h3 { color:#e8cf91; }
      #zurielStudyPanel .study-verse {
        background:#1c3657;
        border:1px solid #b99b58;
        border-radius:12px;
        padding:15px;
        margin:15px 0;
        overflow-wrap:anywhere;
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
        padding:15px;
        cursor:pointer;
        font-weight:bold;
      }
      #zurielStudyPanel .study-body {
        padding:0 15px 16px;
      }
      #zurielStudyPanel .study-word {
        background:#f2eee4;
        border-left:4px solid #b99b58;
        color:#18304d;
        padding:12px;
        margin:10px 0;
        border-radius:7px;
      }
      #zurielStudyPanel button.study-link {
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
      #zurielStudyPanel textarea { min-height:100px; }
      #zurielStudyPanel .study-action {
        background:#e8cf91;
        color:#10213d;
        border:1px solid #b99b58;
        padding:12px 15px;
        min-height:46px;
        border-radius:9px;
        font-weight:bold;
        margin:5px 4px 5px 0;
      }
      #zurielStudyPanel .study-secondary {
        background:#fff;
        color:#18304d;
        border:1px solid #d6c79e;
        padding:12px 15px;
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
      <p>Explore God's Word deeply, carefully and prayerfully.</p>

      <div class="study-verse">
        <h3 id="zurielSelectedReference">
          Your selected Scripture will appear here.
        </h3>
        <p id="zurielSelectedText">
          Open a Bible chapter and tap any verse.
        </p>
        <p class="study-small" id="zurielSelectionNotice">
          Scripture text is kept separate from study explanations.
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
            <p>Select a passage to begin its study.</p>
            <p>Consider the author, original audience, historical setting,
            literary structure and surrounding chapter.</p>
          </div>
        </details>

        <details>
          <summary>💡 2. Meaning and Exposition</summary>
          <div class="study-body" id="zurielMeaning">
            <p>Understand each verse within its chapter, book and wider
            biblical context. Compare Scripture with Scripture.</p>
            <p>Detailed explanations will be developed passage by passage
            using checked study resources.</p>
          </div>
        </details>

        <details>
          <summary>🔤 3. Hebrew and Greek Word Study</summary>
          <div class="study-body" id="zurielOriginalWords">
            <p>Old Testament word studies use Hebrew; New Testament
            word studies use Greek. Verified entries will include meanings,
            pronunciation and grammatical information.</p>
          </div>
        </details>

        <details>
          <summary>🔗 4. Connected Scriptures</summary>
          <div class="study-body">
            <p>Explore related passages. Tap a reference to open its chapter.</p>
            <div id="zurielCrossReferenceList"></div>
          </div>
        </details>

        <details>
          <summary>📚 5. Theology and Deeper Study</summary>
          <div class="study-body" id="zurielDeeperStudy">
            <p>Explore biblical themes, teachings and connections.
            Distinguish the meaning of Scripture from personal interpretation.</p>
          </div>
        </details>

        <details>
          <summary>📝 6. My Personal Study Journal</summary>
          <div class="study-body">
            <p>Your notes are saved separately for each verse on this device.</p>

            <label for="zurielStudyTitle">Study title</label>
            <input id="zurielStudyTitle" placeholder="Give this study a title">

            <label for="zurielStudyNote">What have I learned?</label>
            <textarea id="zurielStudyNote"
              placeholder="Write your observations and discoveries..."></textarea>

            <label for="zurielStudyApplication">How will I apply this Word?</label>
            <textarea id="zurielStudyApplication"
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
            <p>Heavenly Father, give me understanding as I study Your Word.
            Help me receive its truth and walk in wisdom. In Jesus' name, Amen.</p>
            <h3>Declaration</h3>
            <p>I receive God's Word with faith. I grow in understanding,
            walk in His wisdom and live according to His truth.</p>
          </div>
        </details>
      </div>

      <div id="zurielGenesisStudy" style="display:none">
        <h2>🌍 Genesis 1:1 — Expanded Study</h2>

        <details>
          <summary>📜 Historical and Literary Context</summary>
          <div class="study-body">
            <h3>Book introduction</h3>
            <p>Genesis is the opening book of the Bible and the first
            book of the Pentateuch. It introduces creation, humanity,
            sin, God's promises and the beginnings of Israel.</p>
            <h3>Authorship and setting</h3>
            <p>Jewish and Christian tradition associates Genesis with Moses.
            Its literary history has also been examined by modern scholarship.</p>
            <h3>Literary structure</h3>
            <p>Genesis 1:1 introduces creation. Genesis 1:2 describes
            the earth's initial condition. The following verses describe
            God's creative commands and the ordering of creation.</p>
          </div>
        </details>

        <details>
          <summary>💡 Meaning and Exposition</summary>
          <div class="study-body">
            <h3>In the beginning</h3>
            <p>The opening words establish the beginning of the created order.</p>
            <h3>God</h3>
            <p>God is the central subject of the sentence. The verse
            presents Him as distinct from the created order.</p>
            <h3>Created</h3>
            <p>The Hebrew verb describes God's creative action and authority.</p>
            <h3>The heaven and the earth</h3>
            <p>This expression presents the totality of the created realm.</p>
            <h3>Main teachings</h3>
            <ul>
              <li>God is the Creator.</li>
              <li>Creation belongs to God.</li>
              <li>All created things depend upon Him.</li>
              <li>Creation calls for humility, gratitude and worship.</li>
            </ul>
          </div>
        </details>

        <details>
          <summary>🔤 Hebrew Word Study</summary>
          <div class="study-body">
            <div class="study-word">
              <h3>בְּרֵאשִׁית — Bereshit</h3>
              <p>Meaning: In the beginning.</p>
            </div>
            <div class="study-word">
              <h3>בָּרָא — Bara</h3>
              <p>Meaning: Created. A verb describing the creative action.</p>
            </div>
            <div class="study-word">
              <h3>אֱלֹהִים — Elohim</h3>
              <p>Meaning: God. The subject of the sentence.</p>
            </div>
            <div class="study-word">
              <h3>הַשָּׁמַיִם — Hashamayim</h3>
              <p>Meaning: The heavens.</p>
            </div>
            <div class="study-word">
              <h3>הָאָרֶץ — Ha'aretz</h3>
              <p>Meaning: The earth or land.</p>
            </div>
            <p>Further verified study can add Strong's numbers,
            pronunciation, grammatical parsing and lexical references.</p>
          </div>
        </details>

        <details>
          <summary>📚 Theology and Deeper Study</summary>
          <div class="study-body">
            <h3>God as Creator</h3>
            <p>Everything that exists is dependent upon God.</p>
            <h3>Creation and Christ</h3>
            <p>John 1:1–3 and Colossians 1:16–17 connect creation
            with the Word and the person of Jesus Christ.</p>
            <h3>Creation and faith</h3>
            <p>Hebrews 11:3 connects creation with faith.</p>
            <h3>Questions for reflection</h3>
            <ol>
              <li>What does this verse reveal about God's identity?</li>
              <li>What does creation reveal about God's authority?</li>
              <li>How should belief in God as Creator shape our lives?</li>
              <li>How do John 1:1–3 and Genesis 1:1 connect?</li>
            </ol>
          </div>
        </details>
      </div>

      <p class="study-small">
        Zuriel Living Word Bible — His Words.. My Life.. My Victory.
      </p>
    `;

    const main = document.querySelector("main");
    (main || document.body).appendChild(panel);

    function findVerseElement(number) {
      const verses = document.querySelectorAll("#message .verse");
      for (const item of verses) {
        const label = item.querySelector("strong");
        if (label && label.textContent.trim().replace(".", "") === String(number)) {
          return item;
        }
      }
      return null;
    }

    function highlightVerse(number) {
      document.querySelectorAll(".verse.zuriel-selected-verse")
        .forEach(item => item.classList.remove("zuriel-selected-verse"));

      const target = findVerseElement(number);
      if (target) target.classList.add("zuriel-selected-verse");
    }

    function loadSavedNote() {
      if (!selectedReference) return;
      const record = readNotes()[noteKey(selectedReference)];

      document.getElementById("zurielStudyTitle").value =
        record ? record.title || "" : "";
      document.getElementById("zurielStudyNote").value =
        record ? record.note || "" : "";
      document.getElementById("zurielStudyApplication").value =
        record ? record.application || "" : "";
      document.getElementById("zurielStudySaveStatus").textContent =
        record ? "Saved study loaded for this verse." : "";
    }

    function openCrossReference(item) {
      if (typeof window.openChapter !== "function") {
        document.getElementById("zurielStudySaveStatus").textContent =
          "The Bible reader is not available.";
        return;
      }

      window.openChapter(item[0], item[1]).then(function () {
        const bookSelect = document.getElementById("book");
        if (bookSelect) bookSelect.value = item[0];

        const target = findVerseElement(item[2]);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          highlightVerse(item[2]);
        }
      });
    }

    crossReferences.forEach(function (item) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "study-link";
      button.textContent = item[0] + " " + item[1] + ":" +
        item[2] + " — " + item[3];
      button.addEventListener("click", function () {
        openCrossReference(item);
      });
      document.getElementById("zurielCrossReferenceList").appendChild(button);
    });

    document.getElementById("zurielSaveStudyNote")
      .addEventListener("click", function () {
        if (!selectedReference) {
          document.getElementById("zurielStudySaveStatus").textContent =
            "Select a Bible verse before saving your study.";
          return;
        }

        try {
          const notes = readNotes();
          notes[noteKey(selectedReference)] = {
            title: document.getElementById("zurielStudyTitle").value,
            note: document.getElementById("zurielStudyNote").value,
            application: document.getElementById("zurielStudyApplication").value,
            updated: new Date().toISOString()
          };
          localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
          document.getElementById("zurielStudySaveStatus").textContent =
            "Your study has been saved on this device.";
        } catch (error) {
          document.getElementById("zurielStudySaveStatus").textContent =
            "Unable to save. Please check device storage.";
        }
      });

    document.getElementById("zurielClearStudyNote")
      .addEventListener("click", function () {
        document.getElementById("zurielStudyTitle").value = "";
        document.getElementById("zurielStudyNote").value = "";
        document.getElementById("zurielStudyApplication").value = "";
        document.getElementById("zurielStudySaveStatus").textContent =
          "Fields cleared. Previously saved notes remain saved.";
      });

    document.getElementById("zurielReturnToVerse")
      .addEventListener("click", function () {
        if (!selectedReference || typeof window.openChapter !== "function") return;

        window.openChapter(
          selectedReference.book,
          selectedReference.chapter
        ).then(function () {
          setTimeout(function () {
            const target = findVerseElement(selectedReference.verse);
            if (target) {
              highlightVerse(selectedReference.verse);
              target.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 150);
        });
      });

    document.getElementById("zurielCloseStudy")
      .addEventListener("click", function () {
        panel.style.display = "none";
      });

    window.ZurielStudy = {
      openForReference: function (book, chapter, verse, verseText) {
        selectedReference = {
          book: book,
          chapter: chapter,
          verse: verse,
          text: verseText
        };

        document.getElementById("zurielSelectedReference").textContent =
          book + " " + chapter + ":" + verse + " — KJV";

        document.getElementById("zurielSelectedText").textContent =
          verseText;

        document.getElementById("zurielSelectionNotice").textContent =
          "Selected verse. Study the passage in its biblical context.";

        document.getElementById("zurielGenesisStudy").style.display =
          book === "Genesis" && chapter === 1 && verse === 1
            ? "block" : "none";

        panel.style.display = "block";
        highlightVerse(verse);
        loadSavedNote();

        panel.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    };
  }

  createStudyPanel();

})();

