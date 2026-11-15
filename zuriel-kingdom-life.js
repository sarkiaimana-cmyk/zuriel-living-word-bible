/* Zuriel Kingdom Life Centre: study aids linked to the existing topical index. */
(function () {
  "use strict";
  const ROOT = "zurielKingdomLife";
  const SAVED = "zuriel_kingdom_life_saved_v1";
  const DONE = "zuriel_kingdom_life_completed_v1";
  let root, query = "", category = "all", showSaved = false;

  function read(key) {
    try { const value = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(value) ? value : []; }
    catch (error) { return []; }
  }
  function write(key, values) {
    try { localStorage.setItem(key, JSON.stringify(Array.from(new Set(values)))); return true; }
    catch (error) { return false; }
  }
  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function button(label, fn, cls) {
    const node = el("button", cls || "", label);
    node.type = "button"; node.addEventListener("click", fn); return node;
  }
  function topics() {
    return window.ZurielTopicalIndex && window.ZurielTopicalIndex.list ? window.ZurielTopicalIndex.list() : [];
  }
  function matchesCategory(topic) {
    if (category === "all") return true;
    const text = (topic.title + " " + topic.summary + " " + (topic.keywords || []).join(" ")).toLowerCase();
    const groups = {
      god: ["god","creator","character","jesus","christ","spirit","trinity","worship"],
      identity: ["new life","identity","salvation","grace","redemption","believer","holy spirit"],
      faith: ["faith","prayer","hope","trust","promise","perseverance"],
      wisdom: ["wisdom","character","love","forgiveness","peace","work","family","stewardship"],
      mission: ["mission","service","witness","discipleship","justice","community","gospel"]
    };
    return groups[category].some(word => text.includes(word));
  }
  function renderList() {
    if (!root) return;
    const saved = read(SAVED), done = read(DONE);
    const results = topics().filter(topic => {
      const haystack = (topic.title + " " + topic.summary + " " + (topic.keywords || []).join(" ")).toLowerCase();
      return (!showSaved || saved.includes(topic.title)) && matchesCategory(topic) && (!query || haystack.includes(query));
    });
    const count = root.querySelector("#zklCount");
    if (count) count.textContent = results.length + " lessons • " + saved.length + " saved • " + done.length + " completed";
    const list = root.querySelector("#zklLessons");
    if (!list) return;
    list.replaceChildren();
    if (!results.length) { list.appendChild(el("p","zkl-empty","No lessons match. Try another search or clear the saved filter.")); return; }
    results.forEach(topic => {
      const card = el("article","zkl-card");
      card.append(el("h3","",topic.title),el("p","zkl-summary",topic.summary || "Explore this Bible theme."));
      card.appendChild(el("p","zkl-meta",(topic.references || []).length + " Scripture links" + ((topic.languageWords || []).length ? " • Hebrew/Greek insights" : "")));
      const actions = el("div","zkl-actions");
      if (saved.includes(topic.title)) actions.appendChild(el("span","zkl-mark","★ Saved"));
      if (done.includes(topic.title)) actions.appendChild(el("span","zkl-mark","✓ Completed"));
      actions.appendChild(button("Open lesson →",() => openTopic(topic.title),"zkl-primary"));
      card.appendChild(actions); list.appendChild(card);
    });
  }
  function section(parent,title,body) {
    if (!body) return;
    const block = el("section","zkl-section");
    block.append(el("h3","",title),el("p","zkl-prose",body)); parent.appendChild(block);
  }
  function openReference(ref) {
    const match = String(ref.label || "").match(/^(.+?)\s+(\d+):(\d+)/);
    if (!match || typeof window.openChapter !== "function") return;
    const books = window.bibleBooks || (typeof bibleBooks !== "undefined" ? bibleBooks : []);
    const found = Array.isArray(books) && books.find(item =>
      String(item.name).toLowerCase() === match[1].toLowerCase() ||
      (match[1].toLowerCase() === "psalm" && String(item.name).toLowerCase() === "psalms"));
    const book = found ? found.name : match[1], chapter = Number(match[2]), verse = Number(match[3]);
    if (typeof window.ZurielHomeNavigate === "function") window.ZurielHomeNavigate("read");
    window.openChapter(book,chapter).then(() => {
      const target = Array.from(document.querySelectorAll("#message .verse")).find(node => {
        const number = node.querySelector("strong");
        return number && Number(number.textContent.replace(/[^\d]/g,"")) === verse;
      });
      if (target) { target.classList.add("zuriel-selected-verse"); target.scrollIntoView({behavior:"smooth",block:"center"}); }
    }).catch(error => {
      const status = root && root.querySelector("#zklStatus");
      if (status) status.textContent = "Could not open passage: " + error.message;
    });
  }
  function openTopic(title) {
    const topic = window.ZurielTopicalIndex && window.ZurielTopicalIndex.getTopic(title);
    if (!topic || !root) return;
    const detail = root.querySelector("#zklDetail"), browse = root.querySelector("#zklBrowse");
    detail.replaceChildren(); browse.hidden = true; detail.hidden = false;
    detail.appendChild(button("← All lessons",closeTopic,"zkl-secondary"));
    detail.append(el("p","zkl-kicker","KINGDOM LIFE • BIBLE STUDY GUIDE"),el("h2","zkl-title",topic.title),el("p","zkl-summary",topic.summary || ""));
    const saved = read(SAVED), done = read(DONE), tools = el("div","zkl-actions");
    tools.appendChild(button(saved.includes(title) ? "★ Saved — remove" : "☆ Save lesson",() => {
      const values = read(SAVED); write(SAVED,values.includes(title) ? values.filter(x => x !== title) : values.concat(title)); openTopic(title);
    },"zkl-secondary"));
    tools.appendChild(button(done.includes(title) ? "✓ Completed — undo" : "Mark lesson complete",() => {
      const values = read(DONE); write(DONE,values.includes(title) ? values.filter(x => x !== title) : values.concat(title)); openTopic(title);
    },"zkl-secondary"));
    detail.appendChild(tools);
    section(detail,"The central truth",topic.definition);
    section(detail,"The Old Testament witness",topic.oldTestament);
    section(detail,"The New Testament witness",topic.newTestament);
    section(detail,"Put the Word into practice",topic.application);
    if (topic.references && topic.references.length) {
      const block = el("section","zkl-section");
      block.append(el("h3","","Read the Scriptures"),el("p","zkl-muted","Open each passage in the Bible reader. Read the whole chapter and consider its context."));
      const refs = el("div","zkl-refs");
      topic.references.forEach(ref => refs.appendChild(button("📖 " + ref.label,() => openReference(ref),"zkl-ref")));
      block.appendChild(refs); detail.appendChild(block);
    }
    if (topic.languageWords && topic.languageWords.length) {
      const block = el("section","zkl-section"); block.append(el("h3","","Hebrew & Greek word insights"),el("p","zkl-muted","Study helps for further investigation, not a substitute for a full lexicon or grammatical analysis."));
      topic.languageWords.forEach(word => {
        const item = el("div","zkl-word");
        item.append(el("p","zkl-script",word.script || ""),el("p","zkl-wordname",(word.language || "") + " • " + (word.term || "")),el("p","zkl-prose",word.meaning || ""));
        if (word.note) item.appendChild(el("p","zkl-muted",word.note));
        block.appendChild(item);
      }); detail.appendChild(block);
    }
    if (topic.relatedExplanations && topic.relatedExplanations.length) {
      const block = el("section","zkl-section"); block.appendChild(el("h3","","Passage-by-passage insights"));
      topic.relatedExplanations.forEach(item => block.appendChild(el("p","zkl-prose",item)));
      detail.appendChild(block);
    }
    if (topic.questions && topic.questions.length) {
      const block = el("section","zkl-section"); block.appendChild(el("h3","","Reflect and respond"));
      topic.questions.forEach((item,index) => block.appendChild(el("p","zkl-question",(index+1)+". "+item)));
      detail.appendChild(block);
    }
    const response = el("section","zkl-response");
    response.append(el("h3","","A prayerful response"),
      el("p","zkl-prose","Father, thank You for revealing Your truth through Scripture. Help me understand "+topic.title.toLowerCase()+" in the light of Your whole counsel. Give me humility to receive Your Word, wisdom to apply it, and grace to live it with love. In Jesus' name, Amen."),
      el("h3","","My faith response"),
      el("p","zkl-prose","I will receive the teaching of Scripture with an open heart, examine my choices in its light, and take one faithful step in obedience today."));
    detail.appendChild(response);
    detail.appendChild(button("↑ Back to lessons",closeTopic,"zkl-secondary"));
    const status = root.querySelector("#zklStatus"); if (status) status.textContent = "Opened: " + topic.title;
    root.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function closeTopic() {
    if (!root) return;
    root.querySelector("#zklDetail").hidden = true; root.querySelector("#zklBrowse").hidden = false; renderList();
    root.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function mount(main) {
    if (!main || document.getElementById(ROOT)) return;
    root = el("section",""); root.id = ROOT; root.setAttribute("aria-label","Kingdom Life and spiritual growth centre");
    const style = el("style","");
    style.textContent =
      "#zurielKingdomLife{max-width:900px;margin:0 auto;padding:12px 0 28px;color:#18304a;font-family:Arial,sans-serif}"+
      "#zurielKingdomLife *{box-sizing:border-box}"+
      "#zurielKingdomLife .zkl-hero{padding:25px 20px;border-radius:20px;background:linear-gradient(140deg,#102b46,#1e4962 65%,#92764b);color:#fff;box-shadow:0 10px 28px #102b4626}"+
      "#zurielKingdomLife .zkl-kicker{font-size:11px;font-weight:800;letter-spacing:1.6px;color:#e7d5a4}"+
      "#zurielKingdomLife .zkl-hero h1{font:700 clamp(25px,6vw,36px)/1.15 Georgia,serif;margin:10px 0;color:#fff}"+
      "#zurielKingdomLife .zkl-hero p{line-height:1.65;color:#f4f0e7}"+
      "#zurielKingdomLife .zkl-stats,#zurielKingdomLife .zkl-actions,#zurielKingdomLife .zkl-refs{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}"+
      "#zurielKingdomLife .zkl-stat{padding:8px 11px;border:1px solid #ffffff55;border-radius:30px;font-size:12px;color:#fff}"+
      "#zurielKingdomLife button{font:600 14px Arial,sans-serif;min-height:43px;border-radius:10px;padding:10px 13px;cursor:pointer}"+
      "#zurielKingdomLife .zkl-chip,#zurielKingdomLife .zkl-secondary{background:#f1eee6;color:#18304a;border:1px solid #d8d1c2}"+
      "#zurielKingdomLife .zkl-chip[aria-pressed=true],#zurielKingdomLife .zkl-primary{background:#183c58;color:#fff;border:1px solid #183c58}"+
      "#zurielKingdomLife .zkl-search{width:100%;min-height:48px;border:1px solid #c9c6bd;border-radius:12px;padding:12px 14px;font-size:16px;background:#fff;color:#18304a}"+
      "#zurielKingdomLife .zkl-filters{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0}"+
      "#zurielKingdomLife .zkl-muted,#zurielKingdomLife .zkl-meta,#zurielKingdomLife .zkl-count{font-size:13px;line-height:1.55;color:#637184}"+
      "#zurielKingdomLife .zkl-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}"+
      "#zurielKingdomLife .zkl-card,#zurielKingdomLife .zkl-detail{background:#fff;border:1px solid #e3dfd5;border-radius:15px;padding:15px;box-shadow:0 3px 12px #102b460c;min-width:0}"+
      "#zurielKingdomLife .zkl-card h3{font:700 17px/1.3 Georgia,serif;color:#193c56;margin:0 0 8px}"+
      "#zurielKingdomLife .zkl-summary{font-size:14px;line-height:1.55;color:#46566a}"+
      "#zurielKingdomLife .zkl-meta{margin:0 0 10px}"+
      "#zurielKingdomLife .zkl-mark{font-size:11px;color:#35644b;font-weight:700}"+
      "#zurielKingdomLife .zkl-title{font:700 clamp(25px,6vw,34px)/1.2 Georgia,serif;color:#193c56;margin:12px 0}"+
      "#zurielKingdomLife .zkl-section{padding:15px 0;border-top:1px solid #ece8df}"+
      "#zurielKingdomLife .zkl-section h3,#zurielKingdomLife .zkl-response h3{font:700 19px/1.3 Georgia,serif;color:#244b60;margin:0 0 10px}"+
      "#zurielKingdomLife .zkl-prose{font-size:15px;line-height:1.8;text-align:justify;text-justify:inter-word;color:#29394b;margin:0 0 10px;overflow-wrap:anywhere}"+
      "#zurielKingdomLife .zkl-ref{background:#edf2f4;color:#173d55;border:1px solid #d0dfe5;text-align:left}"+
      "#zurielKingdomLife .zkl-word{padding:12px;margin:9px 0;border-radius:12px;background:#f6f4ee}"+
      "#zurielKingdomLife .zkl-script{font:24px/1.5 Georgia,serif;color:#183c58;margin:0}"+
      "#zurielKingdomLife .zkl-wordname{font-weight:700;color:#294b60}"+
      "#zurielKingdomLife .zkl-question{padding:11px 12px;border-left:3px solid #b49a61;background:#f8f6f0;border-radius:7px;font-size:14px;line-height:1.6;color:#34465a}"+
      "#zurielKingdomLife .zkl-response{padding:16px;border-radius:13px;background:#f1f4f1;border:1px solid #dce5dc;margin:15px 0}"+
      "#zurielKingdomLife .zkl-status{min-height:20px;font-size:12px;color:#637184}"+
      "@media(max-width:560px){#zurielKingdomLife .zkl-grid{grid-template-columns:1fr}#zurielKingdomLife .zkl-hero{padding:21px 16px}#zurielKingdomLife .zkl-prose{font-size:14px;line-height:1.75}}"+
      "@media(prefers-reduced-motion:reduce){#zurielKingdomLife *{scroll-behavior:auto!important;transition:none!important}}";
    root.appendChild(style);
    const hero = el("header","zkl-hero");
    hero.append(el("p","zkl-kicker","GROW IN THE WORD • LIVE THE KINGDOM"),
      el("h1","","Kingdom Life & Spiritual Growth"),
      el("p","","Explore Scripture deeply. Understand its message in context. Carry its truth into your choices, relationships, work, prayer and daily walk with Christ."));
    const stats = el("div","zkl-stats");
    stats.append(el("span","zkl-stat","66-book Bible connection"),el("span","zkl-stat","Hebrew & Greek insights"),el("span","zkl-stat","Practical life application"));
    hero.appendChild(stats); root.appendChild(hero);
    const browse = el("div","zkl-browse"); browse.id = "zklBrowse";
    const search = el("input","zkl-search"); search.type = "search"; search.placeholder = "Search a topic, question or keyword…"; search.setAttribute("aria-label","Search Kingdom Life lessons");
    search.addEventListener("input",() => {query=search.value.trim().toLowerCase();renderList();}); browse.appendChild(search);
    const filters = el("div","zkl-filters");
    [["all","All lessons"],["god","Knowing God"],["identity","Life in Christ"],["faith","Faith & Prayer"],["wisdom","Wisdom & Character"],["mission","Church & Mission"]].forEach(([key,label]) => {
      const chip = button(label,() => {category=key;filters.querySelectorAll("button").forEach(item=>item.setAttribute("aria-pressed",String(item.dataset.category===key)));renderList();},"zkl-chip");
      chip.dataset.category=key;chip.setAttribute("aria-pressed",String(key===category));filters.appendChild(chip);
    });
    browse.appendChild(filters);
    const savedToggle = button("☆ Show saved lessons",() => {showSaved=!showSaved;savedToggle.textContent=showSaved?"★ Showing saved lessons":"☆ Show saved lessons";savedToggle.setAttribute("aria-pressed",String(showSaved));renderList();},"zkl-secondary");
    browse.appendChild(savedToggle);
    const count = el("p","zkl-count","");count.id="zklCount";browse.appendChild(count);
    const list = el("div","zkl-grid");list.id="zklLessons";browse.appendChild(list);root.appendChild(browse);
    const detail = el("article","zkl-detail");detail.id="zklDetail";detail.hidden=true;root.appendChild(detail);
    const status = el("p","zkl-status","");status.id="zklStatus";status.setAttribute("role","status");status.setAttribute("aria-live","polite");root.appendChild(status);
    main.appendChild(root);renderList();
  }
  function open() { if (root) { root.hidden=false; closeTopic(); } }
  window.ZurielKingdomLife = {mount:mount,open:open};
})();