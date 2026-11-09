
/* =========================================
   ZURIEL LIVING WORD BIBLE
   VERSE STUDY PANEL
   ========================================= */

(function () {
  "use strict";

  function createStudyPanel() {
    if (document.getElementById("zurielStudyPanel")) return;

    const style = document.createElement("style");

    style.textContent = `
      #zurielStudyPanel {
        display: none;
        background: #10213d;
        color: #f8f4e9;
        border: 1px solid #b99b58;
        border-radius: 16px;
        padding: 20px;
        margin: 20px 0;
        box-shadow: 0 5px 20px #10213d25;
      }

      #zurielStudyPanel h2 {
        color: #e8cf91;
        margin-top: 0;
      }

      #zurielStudyPanel h3 {
        color: #e8cf91;
      }

      #zurielStudyPanel details {
        background: #fff;
        color: #18304d;
        border-radius: 10px;
        margin: 12px 0;
        padding: 14px;
      }

      #zurielStudyPanel summary {
        font-weight: bold;
        cursor: pointer;
        padding: 5px;
      }

      #zurielStudyPanel textarea {
        width: 100%;
        min-height: 100px;
        box-sizing: border-box;
        padding: 12px;
        border: 1px solid #b99b58;
        border-radius: 8px;
        font: inherit;
      }

      #zurielStudyPanel button {
        min-height: 44px;
        padding: 10px 16px;
        border-radius: 8px;
        border: 1px solid #b99b58;
        background: #e8cf91;
        color: #10213d;
        font-weight: bold;
        margin-top: 10px;
      }

      #zurielStudyPanel .study-reference {
        color: #d9c48f;
        font-weight: bold;
      }
    `;

    document.head.appendChild(style);

    const panel = document.createElement("section");

    panel.id = "zurielStudyPanel";

    panel.innerHTML = `
      <h2>📖 Zuriel Verse Study</h2>

      <p class="study-reference" id="zurielStudyReference">
        Select a Bible verse to begin.
      </p>

      <details open>
        <summary>Meaning and Context</summary>
        <p id="zurielStudyMeaning">
          Explore the meaning of the selected Scripture
          in its biblical context.
        </p>
        <p>
          Study note: Explanations will be added from
          verified Bible study sources.
        </p>
      </details>

      <details>
        <summary>Hebrew and Greek Word Study</summary>
        <p>
          Original-language word information, transliteration,
          pronunciation and definitions will appear here
          when verified source data is available.
        </p>
      </details>

      <details>
        <summary>Cross-References</summary>
        <p>
          Related Bible passages will appear here
          when verified references are available.
        </p>
      </details>

      <details>
        <summary>Personal Study Notes</summary>
        <textarea
          id="zurielPersonalStudyNote"
          placeholder="Write your personal reflection here..."
        ></textarea>
        <button id="zurielSaveStudyNote">
          Save My Note
        </button>
        <p id="zurielStudySaveMessage"></p>
      </details>

      <button id="zurielCloseStudyPanel">
        Close Study Panel
      </button>
    `;

    const main = document.querySelector("main");

    if (main) {
      main.appendChild(panel);
    } else {
      document.body.appendChild(panel);
    }

    const reference = document.getElementById(
      "zurielStudyReference"
    );

    const note = document.getElementById(
      "zurielPersonalStudyNote"
    );

    const saveMessage = document.getElementById(
      "zurielStudySaveMessage"
    );

    const closeButton = document.getElementById(
      "zurielCloseStudyPanel"
    );

    const saveButton = document.getElementById(
      "zurielSaveStudyNote"
    );

    let currentReference = "general";

    function storageKey() {
      return "zuriel-study-note-" + currentReference;
    }

    function open(referenceText, verseText) {
      currentReference = referenceText || "general";

      reference.textContent = currentReference;

      document.getElementById(
        "zurielStudyMeaning"
      ).textContent = verseText
        ? "Selected Scripture: " + verseText
        : "Explore the selected Scripture in its biblical context.";

      try {
        note.value = localStorage.getItem(storageKey()) || "";
      } catch (error) {
        note.value = "";
      }

      saveMessage.textContent = "";
      panel.style.display = "block";

      panel.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    saveButton.addEventListener("click", function () {
      try {
        localStorage.setItem(storageKey(), note.value);
        saveMessage.textContent = "Your study note has been saved.";
      } catch (error) {
        saveMessage.textContent =
          "Saving is unavailable in this browser.";
      }
    });

    closeButton.addEventListener("click", function () {
      panel.style.display = "none";
    });

    window.ZurielStudy = {
      open: open,
      close: function () {
        panel.style.display = "none";
      }
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createStudyPanel);
  } else {
    createStudyPanel();
  }
})();
  
