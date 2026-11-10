
/* ==================================================
   ZURIEL LIVING WORD BIBLE
   HOME DASHBOARD
   His Words... My Life... My Victory.
   ================================================== */

(function () {
  "use strict";

  function buildZurielHome() {
    const main = document.querySelector("main");

    if (!main || document.getElementById("zurielHomeDashboard")) {
      return;
    }

    const style = document.createElement("style");

    style.textContent = `
      #zurielHomeDashboard {
        margin: 20px 0;
        color: #f8f4e9;
      }

      #zurielHomeDashboard .zuriel-home-panel {
        background: linear-gradient(145deg, #10213d, #1d3658);
        border: 1px solid #b99b58;
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 17px;
        box-shadow: 0 5px 18px #10213d20;
      }

      #zurielHomeDashboard h2 {
        color: #e8cf91;
        margin-top: 0;
      }

      #zurielHomeDashboard p {
        line-height: 1.7;
      }

      #zurielHomeDashboard .zuriel-home-intro {
        text-align: center;
        padding: 27px 18px;
      }

      #zurielHomeDashboard .zuriel-home-tagline {
        color: #e8cf91;
        font-weight: bold;
      }

      #zurielHomeDashboard .zuriel-home-button {
        display: inline-block;
        width: 100%;
        min-height: 48px;
        margin: 7px 0;
        padding: 13px;
        border: 1px solid #d6bb78;
        border-radius: 10px;
        background: #e8cf91;
        color: #10213d;
        font-size: 15px;
        font-weight: bold;
      }

      #zurielHomeDashboard details {
        background: #ffffff;
        color: #18304d;
        border-radius: 12px;
        margin: 10px 0;
        padding: 15px;
        border-left: 4px solid #b99b58;
      }

      #zurielHomeDashboard summary {
        cursor: pointer;
        font-weight: bold;
        font-size: 16px;
        padding: 5px 0;
      }

      #zurielHomeDashboard details p {
        margin-bottom: 5px;
      }

      #zurielHomeDashboard .zuriel-home-note {
        color: #d9e3ef;
        font-size: 13px;
      }
    `;

    document.head.appendChild(style);

    const dashboard = document.createElement("section");
    dashboard.id = "zurielHomeDashboard";

    dashboard.innerHTML = `
      <section class="zuriel-home-panel zuriel-home-intro">
        <h2>Welcome to Zuriel</h2>
        <p class="zuriel-home-tagline">
          His Words... My Life... My Victory.
        </p>
        <p>
          A place to read God's Word, grow in understanding,
          strengthen your faith and keep your discoveries.
        </p>
        <button class="zuriel-home-button" id="zurielHomeOpenBible">
          📖 Open the Bible
        </button>
        <p class="zuriel-home-note">
          Your Scripture reading remains available in the Bible reader.
        </p>
      </section>

      <section class="zuriel-home-panel">
        <h2>🌿 Daily Growth</h2>
        <p>Open a section to reflect, pray and strengthen your faith.</p>

        <details>
          <summary>🙏 Prayer</summary>
          <p>
            Father, thank You for Your Word. Give me understanding,
            wisdom and strength to walk in Your truth today. Amen.
          </p>
        </details>

        <details>
          <summary>🔥 Declaration</summary>
          <p>
            I stand firm in Christ. I walk by faith, grow in grace
            and live according to the truth of God's Word.
          </p>
        </details>

        <details>
          <summary>✨ Glory Verse Affirmation</summary>
          <p>
            I am born of God. His Word lives in me.
            His wisdom guides me, and His grace strengthens me.
          </p>
        </details>

        <details>
          <summary>🕊️ Inspiration</summary>
          <p>
            Keep your heart established in God's faithfulness.
            Let His Word guide your thoughts and actions.
          </p>
        </details>

        <details>
          <summary>💛 Faith Words</summary>
          <p>
            I choose faith over fear. I trust God's wisdom
            and remain steadfast in His promises.
          </p>
        </details>

        <details>
          <summary>🕯️ Light</summary>
          <p>
            God's Word gives direction, understanding
            and light for the journey ahead.
          </p>
        </details>
      </section>

      <section class="zuriel-home-panel">
        <h2>📚 Explore Zuriel</h2>
        <p>Continue into the growing study and spiritual library.</p>
        <button class="zuriel-home-button" id="zurielHomeLibrary">
          Open Study Library
        </button>
      </section>

      <section class="zuriel-home-panel">
        <h2>📝 Personal Space</h2>
        <p>
          Your prayer journal, personal notes and saved discoveries
          belong in your private study space.
        </p>
        <button class="zuriel-home-button" id="zurielHomePersonal">
          Open Personal Library
        </button>
      </section>
    `;

    const firstSection = main.querySelector("section");

    if (firstSection) {
      firstSection.after(dashboard);
    } else {
      main.prepend(dashboard);
    }

    document
      .getElementById("zurielHomeOpenBible")
      .addEventListener("click", function () {
        const bookSelector = document.getElementById("book");

        if (bookSelector) {
          bookSelector.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          bookSelector.focus();
        }
      });

    function openLibrary() {
      const library = document.getElementById("zurielLibrary");

      if (library) {
        library.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }

    document
      .getElementById("zurielHomeLibrary")
      .addEventListener("click", openLibrary);

    document
      .getElementById("zurielHomePersonal")
      .addEventListener("click", function () {
        if (
          window.ZurielLibrary &&
          typeof window.ZurielLibrary.openPersonal === "function"
        ) {
          window.ZurielLibrary.openPersonal();
        } else {
          openLibrary();
        }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildZurielHome);
  } else {
    buildZurielHome();
  }
})();

