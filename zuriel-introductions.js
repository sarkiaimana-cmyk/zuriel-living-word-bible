
/* =========================================================
   ZURIEL LIVING WORD BIBLE
   BOOK INTRODUCTION CENTRE
   First complete introduction: GENESIS
   ========================================================= */

(function () {
  "use strict";

  const introduction = {
    book: "Genesis",
    testament: "Old Testament",
    chapters: 50,
    author: {
      traditional: "Moses is traditionally recognised as the author of Genesis and the first five books of the Bible.",
      study: "Genesis does not name its human author. Its composition and sources are discussed by biblical scholars. The traditional Mosaic attribution and modern scholarly explanations should be studied fairly."
    },
    date: {
      traditional: "A traditional conservative chronology places Moses' life in the second millennium BC. Proposed dates for the writing of Genesis vary.",
      study: "There is no universally agreed date for the final composition of Genesis. Its traditions, literary formation and final form are subjects of scholarly discussion."
    },
    place: {
      traditional: "The traditional setting connects Moses with Israel's wilderness journey.",
      study: "The precise place where Genesis reached its final written form is not known."
    },
    audience: "The people of Israel, especially those seeking to understand their origins, identity, covenant relationship with God and place among the nations.",
    purpose: "To present the beginnings of creation, humanity, sin, nations and God's covenant dealings with the patriarchs; and to establish the foundations of the biblical story.",
    background: "Genesis belongs to the ancient Near Eastern world. Its opening chapters address creation, humanity, the fall, judgement and the nations. The later chapters follow the family histories of Abraham, Isaac, Jacob and Joseph, ending with Israel's family in Egypt.",
    themes: [
      "God as Creator and sovereign Lord",
      "Humanity made in God's image",
      "Sin, judgement, mercy and restoration",
      "Promise, covenant and faith",
      "God's calling and blessing of Abraham's family",
      "Providence, forgiveness and preservation",
      "God's purpose extending to the nations"
    ],
    keyVerses: [
      ["Genesis 1:1", "God is revealed as the Creator of heaven and earth."],
      ["Genesis 1:27", "Humanity is created in the image of God."],
      ["Genesis 12:2–3", "God promises to bless Abraham and extend blessing to the nations."],
      ["Genesis 15:6", "Abraham believes God, and his faith is counted as righteousness."],
      ["Genesis 50:20", "God's providence is seen even through human wrongdoing."]
    ],
    outline: [
      [1, "God creates the heavens and the earth."],
      [2, "The garden of Eden, humanity and marriage."],
      [3, "The serpent, human disobedience and the fall."],
      [4, "Cain, Abel and the spread of human violence."],
      [5, "The genealogy from Adam to Noah."],
      [6, "Human wickedness and God's instruction to Noah."],
      [7, "The flood begins and the earth is covered."],
      [8, "The waters recede and Noah leaves the ark."],
      [9, "God's covenant with Noah and the sign of the rainbow."],
      [10, "The families and nations descended from Noah."],
      [11, "The tower of Babel and the genealogy to Abram."],
      [12, "God calls Abram and promises blessing."],
      [13, "Abram and Lot separate; God confirms the land promise."],
      [14, "Abram rescues Lot and meets Melchizedek."],
      [15, "God establishes His covenant promise with Abram."],
      [16, "Hagar and the birth promise concerning Ishmael."],
      [17, "The covenant sign of circumcision and the promise of Isaac."],
      [18, "The visitors announce Isaac's birth; Abraham intercedes."],
      [19, "Sodom and Gomorrah are judged; Lot is rescued."],
      [20, "Abraham and Sarah in the land of Abimelech."],
      [21, "Isaac is born; Hagar and Ishmael depart."],
      [22, "Abraham's faith is tested concerning Isaac."],
      [23, "Sarah dies and Abraham secures a burial place."],
      [24, "A wife is found for Isaac; Rebekah comes to him."],
      [25, "Abraham's death, Esau and Jacob's birth, and the birthright."],
      [26, "Isaac in Gerar and the renewal of God's promise."],
      [27, "Jacob receives Isaac's blessing."],
      [28, "Jacob's dream at Bethel and God's promise."],
      [29, "Jacob meets Rachel and marries Leah and Rachel."],
      [30, "Jacob's family grows and his flocks increase."],
      [31, "Jacob leaves Laban and returns toward Canaan."],
      [32, "Jacob prepares to meet Esau and wrestles at Peniel."],
      [33, "Jacob and Esau are reconciled."],
      [34, "Dinah, Shechem and the actions of Simeon and Levi."],
      [35, "Jacob returns to Bethel; Rachel and Isaac die."],
      [36, "The descendants and chiefs of Esau."],
      [37, "Joseph's dreams, his brothers' jealousy and his sale."],
      [38, "Judah and Tamar."],
      [39, "Joseph serves in Egypt and is imprisoned."],
      [40, "Joseph interprets the dreams of Pharaoh's servants."],
      [41, "Joseph interprets Pharaoh's dreams and rises to authority."],
      [42, "Joseph's brothers come to Egypt for grain."],
      [43, "Benjamin travels to Egypt with his brothers."],
      [44, "Joseph tests his brothers; Judah pleads for Benjamin."],
      [45, "Joseph reveals his identity and forgives his brothers."],
      [46, "Jacob and his family travel to Egypt."],
      [47, "Israel settles in Goshen; Joseph administers during famine."],
      [48, "Jacob blesses Joseph's sons, Ephraim and Manasseh."],
      [49, "Jacob blesses his sons and speaks concerning their future."],
      [50, "Jacob is buried; Joseph reassures his brothers and dies."]
    ]
  };

  const reader = document.getElementById("bibleReader");
  const anchor =
    document.getElementById("zurielNavigation") ||
    document.getElementById("message");

  if (!reader || !anchor) {
    console.error("Zuriel Introductions: Bible reader not found.");
    return;
  }

  if (document.getElementById("zurielIntroduction")) return;

  const style = document.createElement("style");

  style.textContent = `
    #zurielIntroduction {
      background:linear-gradient(145deg,#10213d,#203e68);
      color:#f8f4e9;
      border:1px solid #b99b58;
      border-radius:18px;
      padding:17px;
      margin:18px 0;
      line-height:1.75;
    }

    #zurielIntroduction h3,
    #zurielIntroduction h4 {
      color:#f1d99e;
    }

    #zurielIntroduction h3 {
      font-size:20px;
      margin:5px 0;
    }

    #zurielIntroduction h4 {
      margin:18px 0 5px;
      font-size:16px;
    }

    #zurielIntroduction p,
    #zurielIntroduction li {
      color:#f1f3f7;
      overflow-wrap:anywhere;
    }

    #zurielIntroduction .intro-subtitle {
      color:#dce5f1;
      font-size:13px;
    }

    #zurielIntroduction .intro-button {
      width:100%;
      min-height:46px;
      background:#e8cf91;
      color:#10213d;
      font-weight:bold;
      border-radius:9px;
      margin:12px 0 3px;
    }

    #zurielIntroduction details {
      border-top:1px solid #ffffff35;
      padding:10px 0;
    }

    #zurielIntroduction summary {
      color:#f1d99e;
      font-weight:bold;
      cursor:pointer;
      padding:5px 0;
    }

    #zurielIntroduction .intro-note {
      background:#ffffff12;
      border-left:4px solid #e8cf91;
      padding:12px;
      border-radius:7px;
      margin:10px 0;
    }

    #zurielIntroduction .intro-outline {
      display:flex;
      gap:10px;
      padding:8px 0;
      border-bottom:1px solid #ffffff20;
    }

    #zurielIntroduction .intro-number {
      color:#f1d99e;
      font-weight:bold;
      min-width:27px;
    }

    #zurielIntroduction .intro-list {
      padding-left:21px;
    }
  `;

  document.head.appendChild(style);

  const panel = document.createElement("section");
  panel.id = "zurielIntroduction";

  const title = document.createElement("h3");
  title.textContent = "📜 Book Introduction — Genesis";
  panel.appendChild(title);

  const subtitle = document.createElement("p");
  subtitle.className = "intro-subtitle";
  subtitle.textContent =
    "Old Testament • 50 Chapters • The Book of Beginnings";
  panel.appendChild(subtitle);

  const description = document.createElement("p");
  description.textContent =
    "Discover the background, message, historical setting and structure of Genesis before beginning your reading.";
  panel.appendChild(description);

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "intro-button";
  toggle.textContent = "Explore Genesis Introduction";
  panel.appendChild(toggle);

  const content = document.createElement("div");
  content.hidden = true;
  panel.appendChild(content);

  function addSection(heading, body) {
    const section = document.createElement("section");
    const title = document.createElement("h4");
    title.textContent = heading;

    const paragraph = document.createElement("p");
    paragraph.textContent = body;

    section.appendChild(title);
    section.appendChild(paragraph);
    content.appendChild(section);
  }

  function addDetails(titleText, descriptionText) {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = titleText;

    const paragraph = document.createElement("p");
    paragraph.textContent = descriptionText;

    details.appendChild(summary);
    details.appendChild(paragraph);
    content.appendChild(details);
  }

  addDetails("Who wrote Genesis?", introduction.author.traditional);
  addDetails("Authorship — further study", introduction.author.study);

  addDetails("When was Genesis written?", introduction.date.traditional);
  addDetails("Date — further study", introduction.date.study);

  addDetails("Where was Genesis written?", introduction.place.traditional);
  addDetails("Place — further study", introduction.place.study);

  addSection("Original audience", introduction.audience);
  addSection("Purpose of the book", introduction.purpose);
  addSection("Historical and cultural background", introduction.background);

  const themes = document.createElement("section");
  const themesTitle = document.createElement("h4");
  themesTitle.textContent = "Major themes";
  themes.appendChild(themesTitle);

  const themeList = document.createElement("ul");
  themeList.className = "intro-list";

  introduction.themes.forEach(function (theme) {
    const item = document.createElement("li");
    item.textContent = theme;
    themeList.appendChild(item);
  });

  themes.appendChild(themeList);
  content.appendChild(themes);

  const verses = document.createElement("section");
  const versesTitle = document.createElement("h4");
  versesTitle.textContent = "Key verses";
  verses.appendChild(versesTitle);

  introduction.keyVerses.forEach(function (entry) {
    const note = document.createElement("div");
    note.className = "intro-note";

    const reference = document.createElement("strong");
    reference.textContent = entry[0];

    const meaning = document.createElement("p");
    meaning.textContent = entry[1];

    note.appendChild(reference);
    note.appendChild(meaning);
    verses.appendChild(note);
  });

  content.appendChild(verses);

  const outline = document.createElement("section");
  const outlineTitle = document.createElement("h4");
  outlineTitle.textContent = "Complete 50-chapter outline";
  outline.appendChild(outlineTitle);

  introduction.outline.forEach(function (entry) {
    const line = document.createElement("div");
    line.className = "intro-outline";

    const number = document.createElement("span");
    number.className = "intro-number";
    number.textContent = entry[0] + ".";

    const description = document.createElement("span");
    description.textContent = entry[1];

    line.appendChild(number);
    line.appendChild(description);
    outline.appendChild(line);
  });

  content.appendChild(outline);

  const closing = document.createElement("p");
  closing.className = "intro-note";
  closing.textContent =
    "Study reminder: Genesis lays the foundation for understanding creation, humanity, sin, covenant, promise and God's unfolding purpose.";
  content.appendChild(closing);

  toggle.addEventListener("click", function () {
    content.hidden = !content.hidden;

    toggle.textContent = content.hidden
      ? "Explore Genesis Introduction"
      : "Close Genesis Introduction";
  });

  reader.insertBefore(panel, anchor);

  console.log("Zuriel Genesis Introduction loaded successfully.");

})();
    
