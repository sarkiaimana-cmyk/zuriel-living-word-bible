/* Zuriel Living Word Bible — verse-specific faith cards */
(function () {
  "use strict";
  const STORE_KEY = "zuriel-saved-faith-cards-v1";
  const TYPES = [
    ["Prayer", "🙏", "prayer"],
    ["Declaration", "✦", "declaration"],
    ["Affirmation", "🌿", "affirmation"],
    ["Faith Confession", "🔥", "confession"],
    ["Inspiration", "💡", "inspiration"],
    ["Personal Application", "🕯️", "application"]
  ];
  let active = null;

  function readSaved() {
    try {
      const value = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (_) { return []; }
  }
  function saveCard(card) {
    const saved = readSaved();
    const key = card.reference + "|" + card.type;
    const next = saved.filter(item => item.reference + "|" + item.type !== key);
    next.unshift(Object.assign({}, card, { savedAt: new Date().toISOString() }));
    localStorage.setItem(STORE_KEY, JSON.stringify(next.slice(0, 300)));
  }
  function makeDownload(card) {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, "#0b1830");
    gradient.addColorStop(0.58, "#173454");
    gradient.addColorStop(1, "#10213d");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1350);
    ctx.strokeStyle = "#c8ad70";
    ctx.lineWidth = 4;
    ctx.strokeRect(34, 34, 1012, 1282);
    ctx.strokeStyle = "rgba(200,173,112,.45)";
    ctx.lineWidth = 2;
    ctx.strokeRect(54, 54, 972, 1242);

    ctx.textAlign = "center";
    ctx.fillStyle = "#e8cf91";
    ctx.font = "bold 30px Georgia";
    ctx.fillText("ZURIEL LIVING WORD BIBLE", 540, 145);
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#f0d99f";
    ctx.fillText(card.type.toUpperCase(), 540, 250);

    const words = card.text.split(/\s+/);
    const lines = [];
    let line = "";
    ctx.font = "46px Georgia";
    const maxWidth = 820;
    words.forEach(word => {
      const test = line ? line + " " + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else line = test;
    });
    if (line) lines.push(line);
    const lineHeight = 68;
    const maxLines = 10;
    const visible = lines.slice(0, maxLines);
    const startY = Math.max(430, (1350 - visible.length * lineHeight) / 2);
    ctx.fillStyle = "#fff9e9";
    ctx.font = "46px Georgia";
    visible.forEach((item, index) => ctx.fillText(item, 540, startY + index * lineHeight, maxWidth));
    ctx.fillStyle = "#e8cf91";
    ctx.font = "bold 30px Arial";
    ctx.fillText(card.reference, 540, 1115);
    ctx.fillStyle = "#e7edf5";
    ctx.font = "24px Arial";
    ctx.fillText("His Words.. My life.. My Victory", 540, 1200);
    ctx.fillStyle = "#d7c18b";
    ctx.font = "20px Arial";
    ctx.fillText("A personal faith card • Zuriel", 540, 1250);

    const link = document.createElement("a");
    link.download = "Zuriel-" + card.type.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
      "-" + card.reference.replace(/[^a-z0-9]+/gi, "-") + ".png";
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  function buildCards(detail) {
    const source = window.ZurielFaithContent &&
      window.ZurielFaithContent.find(detail.reference);
    if (!source) {
      panel.innerHTML = '<p class="zfc-empty">Faith cards for this exact reference are being prepared. Please try a passage from the curated Scripture collection.</p>';
      return;
    }
    const application = "Today, I will let this passage guide one decision, one conversation and one practical action.";
    const items = TYPES.map(([type, icon, field]) => ({
      type, icon, reference: source.reference,
      text: field === "application" ? application : String(source[field] || "").trim()
    })).filter(item => item.text);
    panel.replaceChildren();
    const heading = document.createElement("div");
    heading.className = "zfc-heading";
    heading.innerHTML = '<strong>Faith words for this verse</strong><span>' +
      escapeHTML(source.reference) + '</span>';
    panel.appendChild(heading);
    items.forEach(card => {
      const article = document.createElement("article");
      article.className = "zfc-card";
      const title = document.createElement("h3");
      title.textContent = card.icon + " " + card.type;
      const body = document.createElement("p");
      body.textContent = card.text;
      const actions = document.createElement("div");
      actions.className = "zfc-actions";
      const save = document.createElement("button");
      save.type = "button";
      save.textContent = "♡ Save";
      save.addEventListener("click", function () {
        try {
          saveCard(card);
          save.textContent = "✓ Saved";
          save.setAttribute("aria-label", card.type + " saved");
        } catch (_) { save.textContent = "Save unavailable"; }
      });
      const download = document.createElement("button");
      download.type = "button";
      download.textContent = "↓ Download Card";
      download.addEventListener("click", function () {
        try { makeDownload(card); }
        catch (_) { download.textContent = "Download unavailable"; }
      });
      actions.append(save, download);
      article.append(title, body, actions);
      panel.appendChild(article);
    });
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
    })[char]);
  }

  const style = document.createElement("style");
  style.textContent = `
    #zurielFaithCards { display:none; margin-top:12px; }
    #zurielFaithCards.is-visible { display:block; }
    #zurielFaithCards .zfc-heading { display:flex; flex-wrap:wrap; justify-content:space-between; gap:6px; margin:0 0 10px; color:#f0d99f; font:700 14px Arial,sans-serif; }
    #zurielFaithCards .zfc-heading span { color:#e6edf5; font-weight:400; }
    #zurielFaithCards .zfc-card { margin:9px 0; padding:13px; border:1px solid #c8ad70; border-radius:13px; background:#f8f5ed; color:#19324f; }
    #zurielFaithCards .zfc-card h3 { margin:0 0 8px; color:#19324f; font:700 15px Arial,sans-serif; }
    #zurielFaithCards .zfc-card p { margin:0 0 12px; color:#24364b; font:16px/1.65 Georgia,serif; white-space:normal; overflow-wrap:anywhere; }
    #zurielFaithCards .zfc-actions { display:grid; grid-template-columns:1fr 1.35fr; gap:8px; }
    #zurielFaithCards .zfc-actions button { min-width:0; min-height:42px; margin:0; padding:8px; border:1px solid #b99b58; border-radius:9px; background:#19324f; color:#fff8e8; font:700 12px Arial,sans-serif; }
    #zurielFaithCards .zfc-empty { color:#fff8e8; font:14px/1.5 Arial,sans-serif; }
  `;
  document.head.appendChild(style);

  const panel = document.createElement("section");
  panel.id = "zurielFaithCards";
  panel.setAttribute("aria-live", "polite");

  function attach() {
    const overlay = document.getElementById("zurielVerseActions");
    if (!overlay || panel.isConnected) return;
    const hint = overlay.querySelector("p");
    if (hint && hint.nextSibling) overlay.insertBefore(panel, hint.nextSibling);
    else overlay.appendChild(panel);
  }
  document.addEventListener("zuriel:verse-selected", function (event) {
    const detail = event.detail || {};
    if (!detail.reference) return;
    active = detail;
    attach();
    buildCards(detail);
    panel.classList.add("is-visible");
  });
  document.addEventListener("zuriel:verse-actions-closed", function () {
    panel.classList.remove("is-visible");
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach, { once:true });
  } else attach();
  window.ZurielSavedFaithCards = { list: readSaved };
})();