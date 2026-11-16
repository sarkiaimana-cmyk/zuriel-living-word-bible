/* Zuriel Personal Data Backup — local export and safe merge restore. No network access. */
(function () {
  "use strict";
  const KEYS = {
    notes: "zuriel_personal_notes_v1",
    prayers: "zuriel_prayer_journal_v1",
    history: "zurielReadingHistory_v1",
    position: "zurielLastReadingPosition",
    savedLessons: "zuriel_kingdom_life_saved_v1",
    completedLessons: "zuriel_kingdom_life_completed_v1",
    readingPlans: "zuriel_reading_plan_progress_v1",
    verseStudyNotes: "zuriel-verse-study-notes-v1",
    wordHighlights: "zuriel-word-highlights-v1",
    personalLibrary: "zuriel_personal_library_v1"
  };
  const MAX_FILE = 8 * 1024 * 1024;
  const READING_PLAN_DURATIONS = { "meet-jesus-7": 7, "growing-in-faith-7": 7, "prayer-and-trust-7": 7 };
  let root, selectedBackup = null;

  function node(tag, cls, text) {
    const item = document.createElement(tag);
    if (cls) item.className = cls;
    if (text !== undefined) item.textContent = text;
    return item;
  }
  function button(label, handler, cls) {
    const item = node("button", cls || "", label);
    item.type = "button";
    item.addEventListener("click", handler);
    return item;
  }
  function readArray(key) {
    const raw = localStorage.getItem(key);
    if (raw === null) return [];
    let value;
    try {
      value = JSON.parse(raw);
    } catch (error) {
      throw new Error("Zuriel could not read saved personal data (" + key + "). Backup or restore was stopped to protect your records.");
    }
    if (!Array.isArray(value)) {
      throw new Error("Zuriel found an unexpected saved-data format (" + key + "). Backup or restore was stopped to protect your records.");
    }
    return value;
  }
  function readObject(key, label) {
    const raw = localStorage.getItem(key);
    if (raw === null) return {};
    let value;
    try {
      value = JSON.parse(raw);
    } catch (error) {
      throw new Error("Zuriel could not read saved personal data (" + key + "). Backup or restore was stopped to protect your records.");
    }
    if (!value || typeof value !== "object" || Array.isArray(value) ||
        Object.keys(value).length > 5000 || JSON.stringify(value).length > 2 * 1024 * 1024) {
      throw new Error("Zuriel found an unexpected saved-data format (" + key + "). Backup or restore was stopped to protect your records.");
    }
    return value;
  }
  function readPosition() {
    const raw = localStorage.getItem(KEYS.position);
    if (raw === null) return null;
    let value;
    try {
      value = JSON.parse(raw);
    } catch (error) {
      throw new Error("Zuriel could not read your saved reading position. Backup or restore was stopped to protect your records.");
    }
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("Zuriel found an unexpected saved reading-position format. Backup or restore was stopped to protect your records.");
    }
    return value;
  }
  function readReadingPlans() {
    const raw = localStorage.getItem(KEYS.readingPlans);
    if (raw === null) return { schemaVersion: 1, activePlanId: null, plans: {} };
    let value;
    try {
      value = JSON.parse(raw);
    } catch (error) {
      throw new Error("Zuriel could not read your saved reading-plan progress. Backup or restore was stopped to protect your records.");
    }
    return safeReadingPlanProgress(value);
  }
  function collect() {
    return {
      notes: readArray(KEYS.notes),
      prayers: readArray(KEYS.prayers),
      readingHistory: readArray(KEYS.history),
      lastReadingPosition: readPosition(),
      savedLessons: readArray(KEYS.savedLessons),
      completedLessons: readArray(KEYS.completedLessons),
      readingPlanProgress: readReadingPlans(),
      verseStudyNotes: readObject(KEYS.verseStudyNotes, "Verse study notes"),
      wordHighlights: readObject(KEYS.wordHighlights, "Word highlights"),
      personalLibrary: readObject(KEYS.personalLibrary, "My Saved Library")
    };
  }
  const KDF_ITERATIONS = 250000;
  function toBase64(bytes) {
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 32768) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 32768));
    }
    return btoa(binary);
  }
  function fromBase64(value) {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }
  async function deriveKey(password, salt) {
    if (!window.crypto || !crypto.subtle) throw new Error("Secure backup encryption is unavailable in this browser. Please use the secure Zuriel website or a supported app build.");
    const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: salt, iterations: KDF_ITERATIONS, hash: "SHA-256" },
      material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
    );
  }
  async function encryptBackup(payload, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);
    const plain = new TextEncoder().encode(JSON.stringify(payload));
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, plain);
    return {
      format: "zuriel-encrypted-backup",
      schemaVersion: 1,
      cipher: "AES-256-GCM",
      kdf: "PBKDF2-SHA-256",
      iterations: KDF_ITERATIONS,
      salt: toBase64(salt),
      iv: toBase64(iv),
      ciphertext: toBase64(new Uint8Array(encrypted))
    };
  }
  async function decryptBackup(envelope, password) {
    if (!envelope || envelope.format !== "zuriel-encrypted-backup" ||
        envelope.schemaVersion !== 1 || envelope.cipher !== "AES-256-GCM" ||
        envelope.kdf !== "PBKDF2-SHA-256" || envelope.iterations !== KDF_ITERATIONS ||
        typeof envelope.salt !== "string" || typeof envelope.iv !== "string" ||
        typeof envelope.ciphertext !== "string" || envelope.ciphertext.length > MAX_FILE * 2) {
      throw new Error("This is not a supported encrypted Zuriel backup file.");
    }
    try {
      const salt = fromBase64(envelope.salt), iv = fromBase64(envelope.iv);
      if (salt.length !== 16 || iv.length !== 12) throw new Error("Invalid encryption metadata.");
      const key = await deriveKey(password, salt);
      const plain = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv }, key, fromBase64(envelope.ciphertext)
      );
      return JSON.parse(new TextDecoder().decode(plain));
    } catch (error) {
      if (error && error.message && error.message.includes("Secure backup encryption")) throw error;
      throw new Error("The backup could not be unlocked. Check your password and try again.");
    }
  }
  function setStatus(message) {
    const target = root && root.querySelector("#zbackupStatus");
    if (target) target.textContent = message;
  }
  function safeRecords(value, label, maxText) {
    if (!Array.isArray(value) || value.length > 5000) throw new Error(label + " must be a valid list (maximum 5,000 records).");
    value.forEach((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error(label + " contains an invalid record at item " + (index + 1) + ".");
      if (typeof item.id !== "string" || !item.id || item.id.length > 160) throw new Error(label + " contains a record without a valid ID.");
      if (typeof item.title !== "string" || item.title.length > 100) throw new Error(label + " contains an invalid title.");
      if (typeof item.text !== "string" || !item.text.trim() || item.text.length > maxText) throw new Error(label + " contains invalid or oversized text.");
      if (item.reference !== undefined && (typeof item.reference !== "string" || item.reference.length > 100)) throw new Error(label + " contains an invalid Scripture reference.");
      if (item.createdAt !== undefined && (typeof item.createdAt !== "string" || item.createdAt.length > 50)) throw new Error(label + " contains an invalid date.");
    });
    return value;
  }
  function safeReadingPlanProgress(value) {
    if (value === undefined || value === null) return { schemaVersion: 1, activePlanId: null, plans: {} };
    if (!value || typeof value !== "object" || Array.isArray(value) || value.schemaVersion !== 1 ||
        !value.plans || typeof value.plans !== "object" || Array.isArray(value.plans) || Object.keys(value.plans).length > 50 ||
        (value.activePlanId !== null && value.activePlanId !== undefined && (typeof value.activePlanId !== "string" || value.activePlanId.length > 80))) {
      throw new Error("The backup contains invalid reading-plan progress.");
    }
    const plans = {};
    Object.keys(value.plans).forEach(id => {
      const item = value.plans[id];
      const duration = READING_PLAN_DURATIONS[id];
      if (!duration || !item || typeof item !== "object" || Array.isArray(item) ||
          (item.startedAt !== null && item.startedAt !== undefined && (typeof item.startedAt !== "string" || item.startedAt.length > 50)) ||
          !Array.isArray(item.completedDays) || item.completedDays.length > duration ||
          item.completedDays.some(day => !Number.isInteger(day) || day < 1 || day > duration)) {
        throw new Error("The backup contains invalid reading-plan progress.");
      }
      plans[id] = { startedAt: item.startedAt || null, completedDays: Array.from(new Set(item.completedDays)) };
    });
    const activePlanId = value.activePlanId || null;
    if (activePlanId && !Object.prototype.hasOwnProperty.call(READING_PLAN_DURATIONS, activePlanId)) throw new Error("The backup contains an invalid active reading plan.");
    return { schemaVersion: 1, activePlanId, plans };
  }
  function safeStudyNotes(value) {
    if (value === undefined || value === null) return {};
    if (!value || typeof value !== "object" || Array.isArray(value) ||
        Object.keys(value).length > 5000 || JSON.stringify(value).length > 2 * 1024 * 1024) {
      throw new Error("The backup contains invalid verse-study notes.");
    }
    const clean = {};
    Object.keys(value).forEach(key => {
      const item = value[key];
      if (!key || key.length > 140 || !item || typeof item !== "object" || Array.isArray(item) ||
          (item.title !== undefined && (typeof item.title !== "string" || item.title.length > 200)) ||
          (item.note !== undefined && (typeof item.note !== "string" || item.note.length > 12000)) ||
          (item.application !== undefined && (typeof item.application !== "string" || item.application.length > 12000)) ||
          (item.updated !== undefined && (typeof item.updated !== "string" || item.updated.length > 50))) {
        throw new Error("The backup contains an invalid verse-study note.");
      }
      clean[key] = { title: item.title || "", note: item.note || "", application: item.application || "", updated: item.updated || "" };
    });
    return clean;
  }
  function safeWordHighlights(value) {
    if (value === undefined || value === null) return {};
    if (!value || typeof value !== "object" || Array.isArray(value) ||
        Object.keys(value).length > 5000 || JSON.stringify(value).length > 2 * 1024 * 1024) {
      throw new Error("The backup contains invalid word highlights.");
    }
    const clean = {};
    const validColor = color => typeof color === "string" && /^#[0-9a-f]{3,8}$/i.test(color);
    Object.keys(value).forEach(key => {
      const item = value[key];
      if (!key || key.length > 140 || !item || typeof item !== "object" || Array.isArray(item) ||
          (item.verseColor && !validColor(item.verseColor)) ||
          (item.words !== undefined && (!item.words || typeof item.words !== "object" || Array.isArray(item.words) ||
            Object.keys(item.words).length > 200 ||
            Object.keys(item.words).some(word => !/^\\d{1,3}$/.test(word) || !validColor(item.words[word]))))) {
        throw new Error("The backup contains an invalid word-highlight record.");
      }
      clean[key] = { verseColor: item.verseColor || "", words: { ...(item.words || {}) } };
    });
    return clean;
  }
  function safePersonalLibrary(value) {
    if (value === undefined || value === null) return { prayers: [], notes: [], bookmarks: [] };
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("The backup contains an invalid My Saved Library record.");
    }
    const clean = {};
    ["prayers", "notes", "bookmarks"].forEach(name => {
      const list = value[name] === undefined ? [] : value[name];
      if (!Array.isArray(list) || list.length > 5000) throw new Error("The backup contains an invalid My Saved Library " + name + " list.");
      clean[name] = list.map(item => {
        if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error("The backup contains an invalid My Saved Library entry.");
        const copy = {};
        Object.keys(item).forEach(key => {
          const field = item[key];
          if (typeof field === "string" && field.length > 12000) throw new Error("The backup contains an oversized My Saved Library entry.");
          if (field === null || ["string", "number", "boolean"].includes(typeof field)) copy[key] = field;
          else throw new Error("The backup contains an unsupported My Saved Library field.");
        });
        return copy;
      });
    });
    return clean;
  }
  function validateBackup(data) {
    if (!data || typeof data !== "object" || Array.isArray(data) ||
        data.app !== "Zuriel Living Word Bible" || ![1, 2].includes(data.schemaVersion) ||
        !data.data || typeof data.data !== "object" || Array.isArray(data.data)) {
      throw new Error("This is not a recognised Zuriel backup file.");
    }
    const d = data.data;
    const clean = {
      notes: safeRecords(d.notes, "Saved insights and notes", 5000),
      prayers: safeRecords(d.prayers, "Prayer journal", 6000),
      readingHistory: Array.isArray(d.readingHistory) && d.readingHistory.length <= 5000 ? d.readingHistory : null,
      lastReadingPosition: d.lastReadingPosition === null ? null : d.lastReadingPosition,
      savedLessons: Array.isArray(d.savedLessons) && d.savedLessons.length <= 5000 ? d.savedLessons : null,
      completedLessons: Array.isArray(d.completedLessons) && d.completedLessons.length <= 5000 ? d.completedLessons : null,
      readingPlanProgress: safeReadingPlanProgress(d.readingPlanProgress),
      verseStudyNotes: safeStudyNotes(d.verseStudyNotes),
      wordHighlights: safeWordHighlights(d.wordHighlights),
      personalLibrary: safePersonalLibrary(d.personalLibrary)
    };
    if (!clean.readingHistory || !clean.savedLessons || !clean.completedLessons) throw new Error("The backup contains an invalid progress list.");
    clean.readingHistory.forEach(item => {
      if (!item || typeof item.book !== "string" || item.book.length > 80 ||
          !Number.isInteger(item.chapter) || item.chapter < 1 || item.chapter > 200) {
        throw new Error("The backup contains an invalid reading-history entry.");
      }
    });
    [clean.savedLessons, clean.completedLessons].forEach(list => {
      if (list.some(item => typeof item !== "string" || item.length > 160)) throw new Error("The backup contains an invalid lesson record.");
    });
    if (clean.lastReadingPosition !== null) {
      const p = clean.lastReadingPosition;
      if (!p || typeof p.book !== "string" || !Number.isInteger(p.chapter) || p.chapter < 1 ||
          (p.verse !== undefined && (!Number.isInteger(p.verse) || p.verse < 1))) {
        throw new Error("The backup contains an invalid last-reading position.");
      }
    }
    return clean;
  }
  function mergeRecords(current, incoming, keyFn) {
    const map = new Map();
    current.concat(incoming).forEach(item => {
      const key = keyFn(item);
      if (!map.has(key)) map.set(key, item);
    });
    return Array.from(map.values()).sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  }
  function mergeStrings(current, incoming) {
    return Array.from(new Set(current.concat(incoming)));
  }
  function mergeKeyedObjects(current, incoming, dateKey) {
    const merged = { ...(incoming || {}) };
    Object.keys(current || {}).forEach(key => {
      const a = current[key], b = merged[key];
      if (!b) { merged[key] = a; return; }
      const aDate = Date.parse(a && a[dateKey] || "");
      const bDate = Date.parse(b && b[dateKey] || "");
      if (!Number.isFinite(bDate) || (Number.isFinite(aDate) && aDate >= bDate)) merged[key] = a;
    });
    return merged;
  }
  function mergeHighlights(current, incoming) {
    const merged = { ...(incoming || {}) };
    Object.keys(current || {}).forEach(key => {
      const a = current[key] || {}, b = merged[key] || {};
      merged[key] = {
        verseColor: a.verseColor || b.verseColor || "",
        words: { ...(b.words || {}), ...(a.words || {}) }
      };
    });
    return merged;
  }
  function mergePersonalLibrary(current, incoming) {
    const merged = {};
    ["prayers", "notes", "bookmarks"].forEach(name => {
      const map = new Map();
      (current && current[name] || []).concat(incoming && incoming[name] || []).forEach(item => {
        const key = item.reference || item.id || [item.title || "", item.text || "", item.date || item.savedAt || ""].join("|");
        if (!map.has(key)) map.set(key, item);
      });
      merged[name] = Array.from(map.values()).slice(-5000);
    });
    return merged;
  }
  function mergeReadingPlans(current, incoming) {
    const plans = {};
    const ids = new Set(Object.keys(current.plans || {}).concat(Object.keys(incoming.plans || {})));
    ids.forEach(id => {
      const a = current.plans[id] || { startedAt: null, completedDays: [] };
      const b = incoming.plans[id] || { startedAt: null, completedDays: [] };
      plans[id] = { startedAt: a.startedAt || b.startedAt || null, completedDays: Array.from(new Set((a.completedDays || []).concat(b.completedDays || []))).sort((x,y)=>x-y) };
    });
    return { schemaVersion: 1, activePlanId: current.activePlanId || incoming.activePlanId || null, plans };
  }
  function countText(data) {
    return data.notes.length + " insights/notes • " + data.prayers.length + " prayer entries • " +
      data.readingHistory.length + " reading records • " +
      (data.savedLessons.length + data.completedLessons.length) + " lesson-progress records • " +
      Object.keys(data.readingPlanProgress.plans).length + " reading plans • " +
      Object.keys(data.verseStudyNotes).length + " verse studies • " +
      Object.keys(data.wordHighlights).length + " highlighted passages • " +
      data.personalLibrary.bookmarks.length + " bookmarks";
  }
  async function exportBackup() {
    root.querySelector("#zbackupConfirm").hidden = false;
    root.querySelector("#zbackupPassword").placeholder = "Create a backup password (at least 8 characters)";
    const password = root.querySelector("#zbackupPassword").value;
    const confirmation = root.querySelector("#zbackupConfirm").value;
    if (password.length < 8) { setStatus("Choose a backup password with at least 8 characters."); return; }
    if (password !== confirmation) { setStatus("The two backup passwords do not match."); return; }
    try {
      setStatus("Encrypting your private backup on this device…");
      const payload = {
        app: "Zuriel Living Word Bible",
        schemaVersion: 2,
        exportedAt: new Date().toISOString(),
        data: collect()
      };
      const envelope = await encryptBackup(payload, password);
      const blob = new Blob([JSON.stringify(envelope, null, 2)], { type: "application/json" });
      if (blob.size > MAX_FILE) throw new Error("This backup is larger than the 8 MB restore limit. Reduce stored records before exporting.");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Zuriel-Encrypted-Study-Space-Backup-" + new Date().toISOString().slice(0, 10) + ".json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      root.querySelector("#zbackupPassword").value = "";
      root.querySelector("#zbackupConfirm").value = "";
      setStatus("Encrypted backup created. Keep the file and password safe; Zuriel cannot recover a forgotten password.");
    } catch (error) {
      setStatus("Backup could not be created: " + error.message);
    }
  }
  function applyRestore(incoming) {
    const current = collect();
    const next = {
      notes: mergeRecords(current.notes, incoming.notes, item => item.id),
      prayers: mergeRecords(current.prayers, incoming.prayers, item => item.id),
      readingHistory: mergeRecords(current.readingHistory, incoming.readingHistory, item => item.book + "|" + item.chapter),
      lastReadingPosition: current.lastReadingPosition || incoming.lastReadingPosition,
      savedLessons: mergeStrings(current.savedLessons, incoming.savedLessons),
      completedLessons: mergeStrings(current.completedLessons, incoming.completedLessons),
      readingPlanProgress: mergeReadingPlans(current.readingPlanProgress, incoming.readingPlanProgress),
      verseStudyNotes: mergeKeyedObjects(current.verseStudyNotes, incoming.verseStudyNotes, "updated"),
      wordHighlights: mergeHighlights(current.wordHighlights, incoming.wordHighlights),
      personalLibrary: mergePersonalLibrary(current.personalLibrary, incoming.personalLibrary)
    };
    const values = {
      [KEYS.notes]: next.notes.slice(0, 5000),
      [KEYS.prayers]: next.prayers.slice(0, 5000),
      [KEYS.history]: next.readingHistory.slice(0, 200),
      [KEYS.position]: next.lastReadingPosition,
      [KEYS.savedLessons]: next.savedLessons.slice(0, 5000),
      [KEYS.completedLessons]: next.completedLessons.slice(0, 5000),
      [KEYS.verseStudyNotes]: next.verseStudyNotes,
      [KEYS.wordHighlights]: next.wordHighlights,
      [KEYS.personalLibrary]: next.personalLibrary,
      [KEYS.readingPlans]: next.readingPlanProgress
    };
    const previous = {};
    Object.keys(values).forEach(key => previous[key] = localStorage.getItem(key));
    try {
      Object.keys(values).forEach(key => localStorage.setItem(key, JSON.stringify(values[key])));
    } catch (error) {
      Object.keys(previous).forEach(key => {
        try {
          if (previous[key] === null) localStorage.removeItem(key);
          else localStorage.setItem(key, previous[key]);
        } catch (ignored) {}
      });
      throw new Error("Your device could not complete the restore. Zuriel attempted to return your existing records to their previous state. Please free device storage and try again.");
    }
    return next;
  }
  function chooseFile() {
    root.querySelector("#zbackupConfirm").hidden = true;
    root.querySelector("#zbackupPassword").placeholder = "Enter the password used for this backup";
    const input = root.querySelector("#zbackupFile");
    input.value = "";
    input.click();
  }
  function handleFile(file) {
    if (!file) return;
    if (file.size > MAX_FILE) { setStatus("This backup is larger than the 8 MB safety limit."); return; }
    const reader = new FileReader();
    reader.onerror = () => setStatus("Zuriel could not read that file. Please choose the backup again.");
    reader.onload = async () => {
      try {
        const envelope = JSON.parse(String(reader.result || ""));
        const password = root.querySelector("#zbackupPassword").value;
        if (!password) throw new Error("Enter the backup password before choosing the file.");
        setStatus("Unlocking and checking your encrypted backup…");
        const parsed = await decryptBackup(envelope, password);
        selectedBackup = validateBackup(parsed);
        const preview = root.querySelector("#zbackupPreview");
        preview.replaceChildren(
          node("strong", "", "Encrypted backup unlocked and checked"),
          node("p", "", countText(selectedBackup)),
          node("p", "", "Restore adds records that are not already on this device. Existing entries are kept; nothing is deleted.")
        );
        preview.hidden = false;
        root.querySelector("#zbackupRestore").hidden = false;
        setStatus("Backup is ready. Review the summary, then choose Restore and Merge.");
      } catch (error) {
        selectedBackup = null;
        root.querySelector("#zbackupPreview").hidden = true;
        root.querySelector("#zbackupRestore").hidden = true;
        setStatus(error.message || "This backup could not be validated.");
      }
    };
    reader.readAsText(file);
  }
  function mount(container) {
    if (!container || document.getElementById("zurielBackupTools")) return;
    root = container;
    const section = node("section", "zbackup");
    section.id = "zurielBackupTools";
    const style = node("style", "");
    style.textContent = "#zurielBackupTools{margin:14px 0;padding:15px;border:1px solid #d9d4c8;border-radius:15px;background:#f7f6f1;color:#24394c}#zurielBackupTools h2{font:700 19px Georgia,serif;color:#193c56;margin:0 0 7px}#zurielBackupTools p{font-size:13px;line-height:1.6;color:#586779}#zurielBackupTools .zbackup-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0}#zurielBackupTools button{min-height:43px;border:1px solid #183e5a;border-radius:9px;padding:9px;background:#183e5a;color:#fff;font-weight:700}#zurielBackupTools button.zbackup-light{background:#fff;color:#183e5a}#zurielBackupTools #zbackupPreview{padding:11px;margin:10px 0;background:#fff;border:1px solid #d9dfe1;border-radius:10px}#zurielBackupTools #zbackupRestore{width:100%;background:#315b48;border-color:#315b48}#zurielBackupTools #zbackupStatus{min-height:20px;margin:8px 0 0;color:#315b48;font-weight:700}#zurielBackupTools input[type=file]{display:none}#zurielBackupTools input[type=password]{display:block;width:100%;min-height:44px;margin:8px 0;padding:11px;border:1px solid #cfd4d7;border-radius:9px;background:#fff;color:#24394c}@media(max-width:420px){#zurielBackupTools .zbackup-actions{grid-template-columns:1fr}}";
    const heading = node("h2", "", "Protect your personal records");
    const intro = node("p", "", "Create an encrypted backup of your saved insights, study notes, prayer journal, reading history and reading-plan progress. Restore it when you change phones or browsers.");
    const password = node("input", ""); password.type = "password"; password.id = "zbackupPassword"; password.autocomplete = "new-password"; password.placeholder = "Backup password (at least 8 characters)"; password.setAttribute("aria-label", "Backup password");
    const confirmation = node("input", ""); confirmation.type = "password"; confirmation.id = "zbackupConfirm"; confirmation.autocomplete = "new-password"; confirmation.placeholder = "Confirm password for export"; confirmation.setAttribute("aria-label", "Confirm backup password");
    const actions = node("div", "zbackup-actions");
    actions.append(
      button("⬇ Export My Backup", exportBackup),
      button("⬆ Choose Backup File", chooseFile, "zbackup-light")
    );
    const file = node("input", "");
    file.type = "file"; file.accept = "application/json,.json"; file.id = "zbackupFile";
    file.addEventListener("change", () => handleFile(file.files && file.files[0]));
    const preview = node("div", "");
    preview.id = "zbackupPreview"; preview.hidden = true;
    const restore = button("Restore & Merge Records", () => {
      if (!selectedBackup) return;
      if (!window.confirm("Restore these records into this device? Existing records will be kept, and matching IDs will not be duplicated. No existing records will be deleted.")) return;
      try {
        const result = applyRestore(selectedBackup);
        selectedBackup = null; preview.hidden = true; restore.hidden = true;
        root.querySelector("#zbackupPassword").value = "";
        setStatus("Restore complete. Your records have been merged with the records already on this device.");
        const fileInput = root.querySelector("#zbackupFile"); if (fileInput) fileInput.value = "";
        if (window.ZurielPersonalSpace && typeof window.ZurielPersonalSpace.open === "function") window.ZurielPersonalSpace.open();
      } catch (error) { setStatus(error.message); }
    });
    restore.id = "zbackupRestore"; restore.hidden = true;
    const privacy = node("p", "", "Privacy: backups are created on this device and are never uploaded by this feature. Backup files are encrypted, but keep the file and password private. Restoring merges records; it does not erase your current notes or journal.");
    const status = node("p", ""); status.id = "zbackupStatus"; status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
    const passwordHint = node("p", "", "Use the same password when restoring. Backups are encrypted on this device with AES-256-GCM. Choose a password you can safely remember: forgotten passwords cannot be recovered.");
    confirmation.hidden = true;
    section.append(heading, intro, password, confirmation, passwordHint, actions, file, preview, restore, privacy, status);
    const tabs = container.querySelector(".zps-tabs");
    if (tabs && tabs.parentNode) tabs.parentNode.insertBefore(section, tabs.nextSibling);
    else container.appendChild(section);
  }
  window.ZurielBackup = { mount: mount };
})();
