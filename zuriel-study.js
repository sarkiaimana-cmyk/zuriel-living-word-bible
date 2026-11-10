
/* =====================================================
   ZURIEL LIVING WORD BIBLE
   GENESIS 1:1 — EXPANDED STUDY
   ===================================================== */

(function () {
  "use strict";

  const references = [
    ["Genesis", 1, 2, "Creation account"],
    ["Psalm", 33, 6, "Creation through God's Word"],
    ["Psalm", 90, 2, "God before creation"],
    ["Isaiah", 45, 18, "God the Creator"],
    ["John", 1, 1, "The Word in the beginning"],
    ["Acts", 17, 24, "God made the world"],
    ["Colossians", 1, 16, "All things created through Christ"],
    ["Hebrews", 11, 3, "Creation by God's Word"],
    ["Revelation", 4, 11, "The Creator is worthy"]
  ];

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
      }
      #zurielStudyPanel h2,
      #zurielStudyPanel h3 {
        color:#e8cf91;
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
      #zurielStudyPanel .study-verse {
        background:#1c3657;
        border:1px solid #b99b58;
        border-radius:12px;
        padding:16px;
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
      #zurielStudyPanel textarea {
        width:100%;
        box-sizing:border-box;
        min-height:120px;
        padding:12px;
        border-radius:9px;
        font:inherit;
      }
      #zurielStudyPanel input {
        width:100%;
        box-sizing:border-box;
        padding:12px;
        border-radius:9px;
        font:inherit;
      }
      #zurielStudyPanel .study-action {
        background:#e8cf91;
        color:#10213d;
        border:1px solid #b99b58;
        padding:12px 16px;
        min-height:46px;
        border-radius:9px;
        font-weight:bold;
      }
      #zurielStudyPanel .study-small {
        color:#d9e3ef;
        font-size:13px;
      }
    `;

    document.head.appendChild(style);

    const panel = document.createElement("section");
    panel.id = "zurielStudyPanel";

    panel.innerHTML = `
      <h2>📖 Zuriel Scripture Study Centre</h2>
      <p>Explore God's Word deeply, carefully and prayerfully.</p>

      <div class="study-verse">
        <h3>Genesis 1:1 — KJV</h3>
        <p>
          In the beginning God created the heaven
          and the earth.
        </p>
        <p class="study-small">
          Demonstration study passage. Scripture text is
          separated from explanations and personal reflections.
        </p>
      </div>

      <details open>
        <summary>📜 1. Scripture and Historical Context</summary>
        <div class="study-body">
          <h3>Book introduction</h3>
          <p>
            Genesis is the opening book of the Bible and the
            first book of the Pentateuch. Its name means
            beginning or origin. It introduces creation,
            humanity, sin, God's promises and the beginnings
            of the people of Israel.
          </p>

          <h3>Authorship and composition</h3>
          <p>
            Jewish and Christian tradition associates Genesis
            with Moses. The book belongs to the Pentateuch.
            Its composition and literary history have also
            been examined by modern biblical scholarship.
          </p>

          <h3>Historical setting</h3>
          <p>
            Genesis 1 presents God as the Creator of everything.
            It begins before the history of Israel and establishes
            the biblical foundation for understanding the world
            as God's creation.
          </p>

          <h3>Literary structure</h3>
          <p>
            Genesis 1:1 introduces the whole creation account.
            Genesis 1:2 describes the earth's initial condition.
            The following verses describe God's creative commands
            and the ordering of creation.
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
        <summary>💡 2. Meaning and Exposition</summary>
        <div class="study-body">
          <h3>In the beginning</h3>
          <p>
            The opening words establish the beginning of
            creation. They direct attention to the origin
            of the created order rather than presenting
            God as part of that order.
          </p>

          <h3>God</h3>
          <p>
            God is the central subject of the sentence.
            The verse begins with His action, not human
            achievement or natural power.
          </p>

          <h3>Created</h3>
          <p>
            The Hebrew verb describes God's creative action.
            The verse presents creation as dependent on
            God's initiative and authority.
          </p>

          <h3>The heaven and the earth</h3>
          <p>
            This expression presents the totality of the
            created realm: the heavens and the earth.
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
        <summary>🔤 3. Hebrew Word Study</summary>
        <div class="study-body">
          <p>
            Genesis 1:1 was written in Hebrew. These are
            important words from its original text.
          </p>

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
            <p><b>Function:</b> Subject of the sentence. It takes
            a singular verb in this verse.</p>
          </div>

          <div class="study-word">
            <h3>הַשָּׁמַיִם — Hashamayim</h3>
            <p><b>Meaning:</b> The heavens.</p>
            <p><b>Function:</b> Part of the expression describing
            the created realm.</p>
          </div>

          <div class="study-word">
            <h3>הָאָרֶץ — Ha'aretz</h3>
            <p><b>Meaning:</b> The earth or land.</p>
            <p><b>Function:</b> Completes the expression
            "the heavens and the earth."</p>
          </div>

          <p>
            Further study can include Strong's numbers,
            grammatical parsing, pronunciation and lexical
            definitions from verified Hebrew resources.
          </p>
        </div>
      </details>

      <details>
        <summary>🔗 4. Connected Scriptures</summary>
        <div class="study-body">
          <p>
            Select a reference to open its Bible chapter.
            The exact verse can then be selected in the reader.
          </p>
          <div id="zurielCrossReferenceList"></div>
        </div>
      </details>

      <details>
        <summary>📚 5. Theology and Deeper Study</summary>
        <div class="study-body">
          <h3>God as Creator</h3>
          <p>
            The verse establishes God's relationship to
            everything that exists. Creation is dependent
            upon Him.
          </p>

          <h3>Creation and Christ</h3>
          <p>
            John 1:1–3 and Colossians 1:16–17 connect the
            biblical teaching about creation with the Word
            and the person of Jesus Christ.
          </p>

          <h3>Creation and faith</h3>
          <p>
            Hebrews 11:3 connects creation with faith and
            the understanding that the visible world did
            not originate from visible things.
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

      <details>
        <summary>📝 6. Personal Study Journal</summary>
        <div class="study-body">
          <label for="zurielStudyTitle">Study title</label>
          <input id="zurielStudyTitle"
            placeholder="My Genesis 1:1 discovery">

          <p><b>What have I learned?</b></p>
          <textarea id="zurielStudyNote"
            placeholder="Write your observations and discoveries..."></textarea>

          <p><b>How will I apply this Word?</b></p>
          <textarea id="zurielStudyApplication"
            placeholder="Write your personal application..."></textarea>

          <button class="study-action" id="zurielSaveGenesisNote">
            Save My Study
          </button>
          <p id="zurielGenesisSaveMessage"></p>
        </div>
      </details>

      <details>
        <summary>🙏 7. Prayer and Declaration</summary>
        <div class="study-body">
          <h3>Prayer</h3>
          <p>
            Heavenly Father, thank You for being the Creator
            of heaven and earth. Help me to recognise Your
            greatness, honour Your wisdom and live with
            gratitude for the life You have given me.
            In Jesus' name, Amen.
          </p>

          <h3>Declaration</h3>
          <p>
            God is my Creator. My life belongs to Him.
            I honour His wisdom, trust His Word and
            acknowledge His authority over all creation.
          </p>

          <h3>Reflection</h3>
          <p>
            How can I honour God as Creator in my choices,
            relationships and daily responsibilities?
          </p>
        </div>
      </details>

      <p class="study-small">
        Zuriel Living Word Bible — His Words... My Life...
        My Victory.
      </p>
    `;

    const main = document.querySelector("main");
    if (main) main.appendChild(panel);
    else document.body.appendChild(panel);

    const list = document.getElementById(
      "zurielCrossReferenceList"
    );

    references.forEach(function (item) {
      const button = document.createElement("button");
      button.className = "study-link";
      button.textContent =
        item[0] + " " + item[1] + ":" + item[2] +
        " — " + item[3];

      button.addEventListener("click", function () {
        const bookSelect = document.getElementById("book");

        if (typeof window.openChapter === "function") {
          window.openChapter(item[0], item[1]);
          return;
        }

        if (bookSelect) {
          const option = Array.from(bookSelect.options).find(
            function (entry) {
              return entry.text.trim().toLowerCase() ===
                item[0].toLowerCase();
            }
          );

          if (option) {
            bookSelect.value = option.value;
            bookSelect.dispatchEvent(
              new Event("change", { bubbles: true })
            );

            alert(
              "The book has been selected. Please choose chapter " +
              item[1] + " and verse " + item[2] +
              " in the Bible reader."
            );
            return;
          }
        }

        alert(
          "Please open " + item[0] + " chapter " +
          item[1] + ", verse " + item[2] +
          " using the Bible reader."
        );
      });

      list.appendChild(button);
    });

    document.getElementById("zurielSaveGenesisNote")
      .addEventListener("click", function () {
        try {
          const record = {
            title: document.getElementById("zurielStudyTitle").value,
            note: document.getElementById("zurielStudyNote").value,
            application: document.getElementById(
              "zurielStudyApplication"
            ).value,
            reference: "Genesis 1:1",
            savedAt: new Date().toISOString()
          };

          localStorage.setItem(
            "zuriel-genesis-1-1-study",
            JSON.stringify(record)
          );

          document.getElementById(
            "zurielGenesisSaveMessage"
          ).textContent = "Your Genesis 1:1 study has been saved.";
        } catch (error) {
          document.getElementById(
            "zurielGenesisSaveMessage"
          ).textContent = "Unable to save in this browser.";
        }
      });

    
    window.ZurielStudy = {
      open: function () {
        panel.style.display = "";
        panel.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      },

      close: function () {
        panel.style.display = "none";
      },

      openForReference: function (book, chapter, verse, verseText) {
        const referenceBox = panel.querySelector(".study-verse");

        if (!referenceBox) return;

        referenceBox.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent =
          book + " " + chapter + ":" + verse + " — KJV";

        const passage = document.createElement("p");
        passage.textContent = verseText ||
          "Scripture text is not available.";

        const notice = document.createElement("p");
        notice.className = "study-small";
        notice.textContent =
          "Selected Scripture. Detailed historical context, " +
          "meaning and original-language study for this passage " +
          "will be developed separately.";

        referenceBox.appendChild(heading);
        referenceBox.appendChild(passage);
        referenceBox.appendChild(notice);

        panel.querySelectorAll("details").forEach(function (section) {
          section.style.display = "none";
        });

        panel.style.display = "";

        panel.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    };

     
      
     

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createStudy);
  } else {
    createStudy();
  }
})();


