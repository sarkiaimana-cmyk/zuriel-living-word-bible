

/* =====================================================
   ZURIEL LIVING WORD BIBLE
   EXPANDED SCRIPTURE STUDY CENTRE
   ===================================================== */

(function () {
  "use strict";

  function createZurielStudy() {
    if (document.getElementById("zurielStudyPanel")) return;

    const style = document.createElement("style");

    style.textContent = `
      #zurielStudyPanel {
        background: #10213d;
        color: #f8f4e9;
        border: 1px solid #b99b58;
        border-radius: 18px;
        padding: 18px;
        margin: 22px 0;
        font-family: inherit;
      }

      #zurielStudyPanel h2 {
        color: #e8cf91;
        margin-top: 0;
        font-size: 23px;
      }

      #zurielStudyPanel h3 {
        color: #e8cf91;
      }

      #zurielStudyPanel .study-subtitle {
        color: #d9e3ef;
        line-height: 1.7;
      }

      #zurielStudyPanel .study-current {
        background: #1c3657;
        border: 1px solid #b99b58;
        padding: 14px;
        border-radius: 12px;
        margin: 16px 0;
      }

      #zurielStudyPanel .study-reference {
        color: #e8cf91;
        font-weight: bold;
      }

      #zurielStudyPanel details {
        background: #fff;
        color: #18304d;
        border-radius: 12px;
        margin: 12px 0;
        overflow: hidden;
      }

      #zurielStudyPanel summary {
        cursor: pointer;
        font-weight: bold;
        font-size: 16px;
        padding: 17px 14px;
        line-height: 1.5;
      }

      #zurielStudyPanel details .study-content {
        padding: 0 15px 16px;
        line-height: 1.7;
      }

      #zurielStudyPanel .study-label {
        display: block;
        font-weight: bold;
        margin: 12px 0 6px;
      }

      #zurielStudyPanel textarea,
      #zurielStudyPanel input {
        width: 100%;
        box-sizing: border-box;
        padding: 12px;
        border: 1px solid #b99b58;
        border-radius: 9px;
        font: inherit;
        background: #fff;
        color: #18304d;
      }

      #zurielStudyPanel textarea {
        min-height: 105px;
        resize: vertical;
      }

      #zurielStudyPanel button {
        min-height: 46px;
        padding: 11px 16px;
        border-radius: 9px;
        border: 1px solid #b99b58;
        background: #e8cf91;
        color: #10213d;
        font-weight: bold;
        font-size: 15px;
        cursor: pointer;
      }

      #zurielStudyPanel .study-muted {
        color: #52647a;
        font-size: 14px;
      }

      #zurielStudyPanel .study-footer {
        color: #d9e3ef;
        font-size: 13px;
        line-height: 1.6;
        margin-top: 18px;
      }
    `;

    document.head.appendChild(style);

    const panel = document.createElement("section");
    panel.id = "zurielStudyPanel";

    panel.innerHTML = `
      <h2>📖 Zuriel Scripture Study Centre</h2>

      <p class="study-subtitle">
        Go deeper into God's Word. Explore the Scripture,
        understand its context, discover its connections
        and record your personal reflections.
      </p>

      <div class="study-current">
        <div class="study-reference" id="zurielStudyReference">
          No verse selected yet
        </div>
        <p id="zurielStudyVerseText">
          Open a Bible passage and select a verse when
          verse selection is connected.
        </p>
      </div>

      <details open>
        <summary>📜 1. Scripture and Context</summary>
        <div class="study-content">
          <p><strong>Passage overview</strong></p>
          <p id="zurielStudyOverview">
            Verified passage background will appear here.
          </p>

          <p><strong>Historical and cultural setting</strong></p>
          <p id="zurielStudyHistory">
            Historical information will be added from
            reliable Bible reference sources.
          </p>

          <p><strong>Surrounding passage</strong></p>
          <p id="zurielStudySurroundings">
            The verses before and after the selected
            passage will be presented here.
          </p>
        </div>
      </details>

      <details>
        <summary>💡 2. Meaning and Exposition</summary>
        <div class="study-content">
          <p><strong>What does the passage say?</strong></p>
          <p id="zurielStudyObservation">
            Scripture observations will appear here.
          </p>

          <p><strong>What does it mean?</strong></p>
          <p id="zurielStudyInterpretation">
            A carefully sourced explanation will appear here.
          </p>

          <p><strong>Practical application</strong></p>
          <p id="zurielStudyApplication">
            Biblical lessons and practical applications
            will be presented here.
          </p>
        </div>
      </details>

      <details>
        <summary>🔤 3. Hebrew and Greek Word Study</summary>
        <div class="study-content">
          <p>
            Explore the original biblical languages
            with verified lexical information.
          </p>

          <p><strong>Hebrew — Old Testament</strong></p>
          <p id="zurielHebrewWords">
            Hebrew words, transliteration, pronunciation,
            morphology and definitions will appear here
            when verified data is available.
          </p>

          <p><strong>Greek — New Testament</strong></p>
          <p id="zurielGreekWords">
            Greek words, transliteration, pronunciation,
            morphology and definitions will appear here
            when verified data is available.
          </p>
        </div>
      </details>

      <details>
        <summary>🔗 4. Connected Scriptures and Cross-References</summary>
        <div class="study-content">
          <p id="zurielStudyCrossReferences">
            Verified related passages will appear here,
            with their Bible references and Scripture text.
          </p>
        </div>
      </details>

      <details>
        <summary>📚 5. Commentary and Deeper Study</summary>
        <div class="study-content">
          <p><strong>Study commentary</strong></p>
          <p id="zurielStudyCommentary">
            Commentary from approved and properly attributed
            sources will appear here when available.
          </p>

          <p><strong>Important themes</strong></p>
          <p id="zurielStudyThemes">
            Biblical themes connected to the passage
            will appear here.
          </p>

          <p><strong>Questions for reflection</strong></p>
          <p id="zurielStudyQuestions">
            Reflection questions will help readers
            examine the passage more deeply.
          </p>
        </div>
      </details>

      <details>
        <summary>📝 6. My Personal Study Notes</summary>
        <div class="study-content">
          <label class="study-label" for="zurielStudyNoteTitle">
            Note title
          </label>

          <input
            id="zurielStudyNoteTitle"
            type="text"
            placeholder="Give your study note a title"
          >

          <label class="study-label" for="zurielPersonalStudyNote">
            Your personal reflection
          </label>

          <textarea
            id="zurielPersonalStudyNote"
            placeholder="Write what you have learned, questions, discoveries and personal reflections..."
          ></textarea>

          <button id="zurielSaveStudyNote">
            Save My Study Note
          </button>

          <p id="zurielStudySaveMessage"></p>
        </div>
      </details>

      <details>
        <summary>🙏 7. Prayer and Declaration</summary>
        <div class="study-content">
          <p><strong>Prayer from the passage</strong></p>
          <p id="zurielStudyPrayer">
            A Scripture-based prayer will be provided
            when verified passage content is available.
          </p>

          <p><strong>Faith declaration</strong></p>
          <p id="zurielStudyDeclaration">
            A declaration grounded in the selected
            Scripture will appear here.
          </p>
        </div>
      </details>

      <p class="study-footer">
        Zuriel Living Word Bible — His Words... My Life...
        My Victory. Scripture remains distinct from study
        explanations and personal reflections.
      </p>
    `;

    const main = document.querySelector("main");

    if (main) {
      main.appendChild(panel);
    } else {
      document.body.appendChild(panel);
    }

    let currentReference = "general";

    const reference = document.getElementById(
      "zurielStudyReference"
    );

    const verseText = document.getElementById(
      "zurielStudyVerseText"
    );

    const noteTitle = document.getElementById(
      "zurielStudyNoteTitle"
    );

    const note = document.getElementById(
      "zurielPersonalStudyNote"
    );

    const message = document.getElementById(
      "zurielStudySaveMessage"
    );

    function getStorageKey() {
      return "zuriel-study-note-" + currentReference;
    }

    function open(referenceText, selectedVerse) {
      currentReference = referenceText || "general";

      reference.textContent = currentReference;
      verseText.textContent = selectedVerse ||
        "No verse text supplied.";

      try {
        const saved = JSON.parse(
          localStorage.getItem(getStorageKey()) || "{}"
        );

        noteTitle.value = saved.title || "";
        note.value = saved.note || "";
      } catch (error) {
        noteTitle.value = "";
        note.value = "";
      }

      message.textContent = "";

      panel.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    document
      .getElementById("zurielSaveStudyNote")
      .addEventListener("click", function () {
        try {
          const savedNote = {
            title: noteTitle.value,
            note: note.value,
            reference: currentReference,
            updatedAt: new Date().toISOString()
          };

          localStorage.setItem(
            getStorageKey(),
            JSON.stringify(savedNote)
          );

          message.textContent =
            "Your study note has been saved on this device.";
        } catch (error) {
          message.textContent =
            "The note could not be saved in this browser.";
        }
      });

    window.ZurielStudy = {
      open: open,
      close: function () {
        panel.style.display = "none";
      },
      show: function () {
        panel.style.display = "block";
      }
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      createZurielStudy
    );
  } else {
    createZurielStudy();
  }
})();
