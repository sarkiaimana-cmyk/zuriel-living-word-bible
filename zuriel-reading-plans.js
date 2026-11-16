/* Zuriel Reading Plans — curated, sequential and offline-first progress. */
(function () {
  "use strict";

  const STORAGE_KEY = "zuriel_reading_plan_progress_v1";
  const PLANS = [
    {
      id: "meet-jesus-7",
      title: "Meet Jesus",
      duration: 7,
      description: "Walk through key moments in the life, words and resurrection of Jesus.",
      days: [
        ["John 1:1-18", "See how John introduces Jesus as the living Word."],
        ["Mark 1:14-20", "Notice Jesus' call to follow Him."],
        ["Luke 5:1-11", "Reflect on trust and responding to Jesus."],
        ["John 3:1-17", "Consider the new birth and God's love."],
        ["John 4:1-26", "Listen to Jesus speak about living water."],
        ["Mark 4:35-41", "Reflect on Jesus' authority in the storm."],
        ["John 20:1-18", "Read the resurrection account and Mary's encounter."]
      ]
    },
    {
      id: "growing-in-faith-7",
      title: "Growing in Faith",
      duration: 7,
      description: "Build a steady foundation in faith, grace, wisdom and Christian living.",
      days: [
        ["Hebrews 11:1-6", "Explore the meaning and response of faith."],
        ["Romans 10:8-17", "Reflect on hearing and responding to God's Word."],
        ["Ephesians 2:1-10", "Remember salvation by grace through faith."],
        ["James 1:2-8", "Consider perseverance and asking God for wisdom."],
        ["2 Corinthians 5:14-21", "Reflect on new life and reconciliation in Christ."],
        ["Galatians 5:16-26", "Consider walking by the Spirit and His fruit."],
        ["Colossians 3:1-17", "Reflect on the character and conduct of the new life."]
      ]
    },
    {
      id: "prayer-and-trust-7",
      title: "Prayer & Trust",
      duration: 7,
      description: "Spend a week with passages about prayer, peace, guidance and confidence in God.",
      days: [
        ["Matthew 6:5-15", "Read Jesus' teaching on prayer."],
        ["Philippians 4:4-9", "Bring requests to God and consider His peace."],
        ["Psalm 23", "Reflect on the Lord as Shepherd."],
        ["Proverbs 3:1-12", "Consider trusting the Lord in every path."],
        ["Psalm 27:1-8", "Reflect on courage and seeking God's presence."],
        ["1 Thessalonians 5:12-24", "Notice the instructions about prayer and thanksgiving."],
        ["Jeremiah 29:11-14", "Read the promise in its chapter context and seek the Lord."]
      ]
    },
    {
      id: "walk-with-jesus-30",
      title: "Walk with Jesus",
      duration: 30,
      description: "A month-long journey through the birth, ministry, teachings, compassion, cross and resurrection of Jesus.",
      days: [
        ["Luke 1:26-38", "Receive the angel's announcement of Jesus' birth and consider Mary's response of faith."],
        ["Matthew 1:18-25", "Reflect on the name Jesus and the promise of Immanuel."],
        ["Luke 2:1-20", "Read the birth of Jesus and the good news announced to the shepherds."],
        ["Matthew 2:1-12", "Consider the wise men who came to worship the newborn King."],
        ["Luke 2:41-52", "See Jesus as a boy in the temple, devoted to His Father's purpose."],
        ["Matthew 3:13-17", "Witness Jesus' baptism and the Father's testimony."],
        ["Matthew 4:1-11", "Reflect on Jesus' faithfulness during temptation."],
        ["Mark 1:14-20", "Hear Jesus announce the Kingdom and call His first disciples."],
        ["John 1:35-51", "Follow the first disciples as they come to know Jesus."],
        ["John 2:1-11", "Read the sign at Cana and the first public manifestation of Jesus' glory."],
        ["John 3:1-17", "Consider Jesus' teaching about the new birth and God's love."],
        ["John 4:1-26", "Listen as Jesus offers living water and reveals true worship."],
        ["Luke 5:1-11", "Reflect on the miraculous catch and the call to follow Jesus."],
        ["Matthew 5:1-16", "Study the Beatitudes and Jesus' call to be salt and light."],
        ["Matthew 5:17-30", "Consider Jesus' teaching on the Law, reconciliation and the heart."],
        ["Matthew 6:5-15", "Learn the pattern of prayer Jesus gave His disciples."],
        ["Matthew 6:25-34", "Hear Jesus teach freedom from anxiety and trust in the Father's care."],
        ["Matthew 7:7-27", "Reflect on asking, seeking, the narrow way and putting Jesus' words into practice."],
        ["Mark 4:35-41", "See Jesus calm the storm and consider His authority."],
        ["Mark 5:21-43", "Read two accounts of healing and restoration through Jesus."],
        ["Luke 10:25-37", "Learn neighbour-love through the parable of the Good Samaritan."],
        ["Luke 15:11-32", "Reflect on the Father's mercy in the parable of the lost son."],
        ["John 6:1-14", "Witness Jesus feed the multitude and provide beyond what seemed possible."],
        ["John 10:1-18", "Hear Jesus describe Himself as the Good Shepherd."],
        ["John 11:17-27", "Consider Jesus' words: the resurrection and the life."],
        ["Luke 19:1-10", "See Jesus seek and save the lost in the encounter with Zacchaeus."],
        ["John 13:1-17", "Learn humility and servant-hearted love from Jesus washing His disciples' feet."],
        ["John 14:1-14", "Receive Jesus' comfort and His teaching about the way to the Father."],
        ["Luke 22:14-23", "Reflect on the Last Supper and Jesus' words about the new covenant."],
        ["John 20:1-18", "Read the resurrection account and Mary's encounter with the risen Jesus."]
      ]
    }
  ];

  function emptyState() {
    return { schemaVersion: 1, activePlanId: null, plans: {} };
  }

  function readState() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return emptyState();
    let value;
    try {
      value = JSON.parse(stored);
    } catch (error) {
      throw new Error("Saved reading-plan progress is unreadable. It has not been changed.");
    }
    if (!validateProgress(value)) {
      throw new Error("Saved reading-plan progress has an unsupported or invalid structure. It has not been changed.");
    }
    const clean = emptyState();
    clean.activePlanId = typeof value.activePlanId === "string" ? value.activePlanId : null;
    PLANS.forEach(plan => {
      const item = value.plans[plan.id];
      if (!item) return;
      clean.plans[plan.id] = {
        startedAt: typeof item.startedAt === "string" ? item.startedAt.slice(0, 50) : null,
        completedDays: [...new Set(item.completedDays)]
      };
    });
    return clean;
  }

  function writeState(state) {
    try {
      readState();
      if (!validateProgress(state)) return false;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      return false;
    }
  }

  function element(tag, className, text) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (text !== undefined) item.textContent = text;
    return item;
  }

  function button(label, handler, className) {
    const item = element("button", className || "", label);
    item.type = "button";
    item.addEventListener("click", handler);
    return item;
  }

  function referenceParts(reference) {
    const match = String(reference).match(/^(.+?)\s+(\d+)(?::(\d+))?(?:-(\d+))?$/);
    if (!match) return null;
    const book = match[1] === "Psalm" ? "Psalms" : match[1];
    const chapter = Number(match[2]);
    const verse = match[3] ? Number(match[3]) : 1;
    if (!Number.isInteger(chapter) || chapter < 1 || !Number.isInteger(verse) || verse < 1) return null;
    return { book: book, chapter: chapter, verse: verse };
  }

  async function openPassage(reference, onStatus) {
    const parts = referenceParts(reference);
    if (!parts || typeof window.openChapter !== "function") {
      onStatus("This passage could not be opened. Please use the Bible reader to find " + reference + ".");
      return;
    }
    if (window.ZurielHomeNavigate) window.ZurielHomeNavigate("read");
    try {
      await window.openChapter(parts.book, parts.chapter);
      const verses = document.querySelectorAll("#message .verse");
      const target = verses[parts.verse - 1];
      if (!target || typeof window.selectBibleVerse !== "function" ||
          !window.selectBibleVerse(parts.verse)) {
        throw new Error("The reading-plan verse could not be selected in the Bible reader.");
      }
      try {
        localStorage.setItem("zurielLastReadingPosition", JSON.stringify({
          book: parts.book, chapter: parts.chapter, verse: parts.verse
        }));
      } catch (storageError) {
        // The passage still opens when local progress storage is unavailable.
      }
      target.classList.add("zuriel-nav-highlight");
      window.setTimeout(() => target.classList.remove("zuriel-nav-highlight"), 2200);
      onStatus(reference + " opened in the Bible reader. Read the full passage in its chapter context.");
    } catch (error) {
      onStatus("Zuriel could not open " + reference + ". Please try again from the Bible reader.");
    }
  }

  function render(container, onStatus) {
    if (!container) return;
    const report = typeof onStatus === "function" ? onStatus : function () {};
    let state;
    try {
      state = readState();
    } catch (error) {
      container.appendChild(element("p", "zrp-intro", error.message || "Saved reading-plan progress could not be read. No progress has been changed."));
      report(error.message || "Saved reading-plan progress could not be read. No progress has been changed.");
      return;
    }
    const active = PLANS.find(plan => plan.id === state.activePlanId) || null;
    const activeProgress = active ? (state.plans[active.id] || { completedDays: [] }) : null;
    const completed = activeProgress ? activeProgress.completedDays : [];
    const nextIndex = active ? active.days.findIndex((day, index) => !completed.includes(index + 1)) : -1;

    const style = element("style", "");
    style.textContent = ".zrp-intro{font:14px/1.6 Arial,sans-serif;color:#596879}.zrp-card{padding:13px;margin:12px 0;border:1px solid #dce1e2;border-radius:12px;background:#fff}.zrp-card h3{margin:0 0 6px;color:#1c405b;font:700 17px Georgia,serif}.zrp-card p{margin:5px 0;color:#5d6976;font:13px/1.55 Arial,sans-serif}.zrp-meta{font-weight:700;color:#8a7140!important}.zrp-progress{height:7px;overflow:hidden;border-radius:10px;background:#e7e8e5;margin:9px 0}.zrp-progress span{display:block;height:100%;background:#315b48}.zrp-actions{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}.zrp-actions button{margin:0;flex:1 1 130px}.zrp-primary{background:#193e5a!important;color:#fff!important}.zrp-secondary{background:#f1f3f3!important;color:#24475e!important;border:1px solid #d5dfe3!important}.zrp-day{padding:10px 0;border-top:1px solid #edf0ed}.zrp-day strong{display:block;color:#27485e;font:700 14px Arial,sans-serif}.zrp-day p{margin:4px 0}.zrp-complete{color:#315b48!important;font-weight:700!important}.zrp-foot{font:12px/1.55 Arial,sans-serif;color:#687582;margin-top:14px}";

    const heading = element("h2", "zps-heading", "Bible Reading Plans");
    const intro = element("p", "zrp-intro", "Choose a guided journey and move through its passages at your own pace. Your progress is saved privately on this device and works offline.");
    container.append(style, heading, intro);

    if (active) {
      const card = element("section", "zrp-card");
      const doneCount = completed.length;
      const percent = Math.round(doneCount / active.duration * 100);
      card.append(
        element("p", "zrp-meta", "YOUR ACTIVE PLAN"),
        element("h3", "", active.title),
        element("p", "", doneCount + " of " + active.duration + " days completed · " + percent + "%")
      );
      const track = element("div", "zrp-progress");
      const fill = element("span", "");
      fill.style.width = percent + "%";
      track.appendChild(fill);
      card.appendChild(track);

      if (nextIndex < 0) {
        card.append(element("p", "zrp-complete", "You have completed this plan. You can revisit its passages or begin it again."));
        card.appendChild(button("Restart this plan", function () {
          if (!window.confirm("Restart this reading plan and clear its completed days on this device?")) return;
          state.plans[active.id] = { startedAt: new Date().toISOString(), completedDays: [] };
          if (!writeState(state)) { report("Device storage is unavailable. Your plan was not changed."); return; }
          render(container, report);
          report("Reading plan restarted.");
        }, "zrp-secondary"));
      } else {
        const day = active.days[nextIndex];
        card.append(
          element("p", "zrp-meta", "NEXT · DAY " + (nextIndex + 1) + " OF " + active.duration),
          element("h3", "", day[0]),
          element("p", "", day[1])
        );
        const actions = element("div", "zrp-actions");
        actions.append(
          button("Read this passage", () => openPassage(day[0], report), "zrp-primary"),
          button("Mark day complete", function () {
            const latest = readState();
            const record = latest.plans[active.id] || { startedAt: new Date().toISOString(), completedDays: [] };
            if (!record.completedDays.includes(nextIndex + 1)) record.completedDays.push(nextIndex + 1);
            latest.plans[active.id] = record;
            latest.activePlanId = active.id;
            if (!writeState(latest)) { report("Device storage is unavailable. Your progress was not saved."); return; }
            render(container, report);
            report("Day " + (nextIndex + 1) + " marked complete.");
          }, "zrp-secondary")
        );
        card.appendChild(actions);
      }
      const listTitle = element("h3", "zps-subheading", "Plan passages");
      card.appendChild(listTitle);
      active.days.forEach((day, index) => {
        const line = element("div", "zrp-day");
        const isDone = completed.includes(index + 1);
        line.append(
          element("strong", isDone ? "zrp-complete" : "", "Day " + (index + 1) + (isDone ? " · Completed" : "")),
          element("p", "", day[0] + " — " + day[1])
        );
        line.appendChild(button("Open passage", () => openPassage(day[0], report), "zrp-secondary"));
        card.appendChild(line);
      });
      container.appendChild(card);
    }

    const available = element("h3", "zps-subheading", active ? "Explore another plan" : "Choose your first plan");
    container.appendChild(available);
    PLANS.filter(plan => !active || plan.id !== active.id).forEach(plan => {
      const record = state.plans[plan.id];
      const done = record ? record.completedDays.length : 0;
      const card = element("article", "zrp-card");
      card.append(
        element("h3", "", plan.title),
        element("p", "zrp-meta", plan.duration + " days" + (done ? " · " + done + " completed" : "")),
        element("p", "", plan.description)
      );
      card.appendChild(button(record ? "Continue this plan" : "Start this plan", function () {
        const latest = readState();
        if (!latest.plans[plan.id]) latest.plans[plan.id] = { startedAt: new Date().toISOString(), completedDays: [] };
        latest.activePlanId = plan.id;
        if (!writeState(latest)) { report("Device storage is unavailable. Your plan was not saved."); return; }
        render(container, report);
        report(plan.title + " is now your active reading plan.");
      }, "zrp-primary"));
      container.appendChild(card);
    });
    container.appendChild(element("p", "zrp-foot", "Reading plans are optional guides, not a measure of spiritual worth. Mark a day complete only when you have read its passage. Zuriel opens the passage in the Bible reader; the full chapter remains available for context."));
  }

  function validateProgress(value) {
    if (!value || typeof value !== "object" || Array.isArray(value) || value.schemaVersion !== 1 ||
        !value.plans || typeof value.plans !== "object" || Array.isArray(value.plans) ||
        Object.keys(value.plans).length > 50) return false;
    if (value.activePlanId !== null && value.activePlanId !== undefined &&
        !PLANS.some(plan => plan.id === value.activePlanId)) return false;
    return Object.keys(value.plans).every(id => {
      const plan = PLANS.find(item => item.id === id);
      const record = value.plans[id];
      return !!plan && !!record && typeof record === "object" && !Array.isArray(record) &&
        (record.startedAt === null || record.startedAt === undefined || typeof record.startedAt === "string") &&
        Array.isArray(record.completedDays) && record.completedDays.length <= plan.duration &&
        record.completedDays.every(day => Number.isInteger(day) && day >= 1 && day <= plan.duration);
    });
  }

  window.ZurielReadingPlans = {
    render: render,
    list: function () { return PLANS.map(plan => ({ id: plan.id, title: plan.title, duration: plan.duration, passages: plan.days.map(day => day[0]) })); },
    validateProgress: validateProgress,
    readState: readState,
    writeState: writeState,
    parseReference: referenceParts
  };
})();