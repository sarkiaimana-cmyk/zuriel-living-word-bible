/* Zuriel Bible Geography Centre — offline regional locator and Scripture links. */
(function () {
  "use strict";
  const data = window.ZurielGeographyData;
  const panel = document.getElementById("zurielStudyPanel");
  if (!data || !panel || document.getElementById("zurielGeographyCentre")) return;

  const region = data.regions.find(item => item.id === "galilee");
  if (!region) return;
  const NS = "http://www.w3.org/2000/svg";
  const root = document.createElement("details");
  root.id = "zurielGeographyCentre";
  root.className = "zuriel-geography";
  const summary = document.createElement("summary");
  summary.textContent = "🗺️ Bible Geography Centre — " + region.name;
  root.appendChild(summary);

  const style = document.createElement("style");
  style.textContent = `
    #zurielGeographyCentre{margin:18px 0;border:1px solid #c9b77e;border-radius:14px;background:#f8f6ef;color:#20364b;overflow:hidden}
    #zurielGeographyCentre>summary{padding:14px 15px;color:#183653;font-weight:700;cursor:pointer;background:linear-gradient(135deg,#f5f0e2,#e9edf0)}
    #zurielGeographyCentre .zg-content{padding:14px}
    #zurielGeographyCentre .zg-title{font:700 20px/1.3 Georgia,serif;color:#193c56;margin:0 0 5px}
    #zurielGeographyCentre .zg-copy{font:14px/1.6 Arial,sans-serif;color:#566577}
    #zurielGeographyCentre .zg-map{display:block;width:100%;height:auto;border:1px solid #c8c2b3;border-radius:12px;background:#f4f0e5}
    #zurielGeographyCentre .zg-map-label{font:700 13px Arial,sans-serif;fill:#20364b;paint-order:stroke;stroke:#f4f0e5;stroke-width:4px;stroke-linejoin:round}
    #zurielGeographyCentre .zg-map-grid{stroke:#c9c4b8;stroke-width:1;stroke-dasharray:3 5}
    #zurielGeographyCentre .zg-places{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}
    #zurielGeographyCentre .zg-place-button,#zurielGeographyCentre .zg-reference,#zurielGeographyCentre .zg-stop{min-height:42px;padding:10px;border:1px solid #cbd3d5;border-radius:9px;background:#fff;color:#24445b;font:700 13px/1.4 Arial,sans-serif;text-align:left}
    #zurielGeographyCentre .zg-place-button[aria-pressed=true]{border-color:#b99b58;background:#fff4d8}
    #zurielGeographyCentre .zg-detail{padding:13px;border:1px solid #d8d4c9;border-radius:11px;background:#fff;margin:10px 0}
    #zurielGeographyCentre .zg-detail h4{font:700 17px Georgia,serif;color:#193c56;margin:0 0 6px}
    #zurielGeographyCentre .zg-score{font:700 12px Arial,sans-serif;color:#42634f}
    #zurielGeographyCentre .zg-refs{display:flex;flex-wrap:wrap;gap:7px;margin-top:9px}
    #zurielGeographyCentre .zg-reference{min-height:38px;text-align:center}
    #zurielGeographyCentre .zg-journey{margin-top:15px;padding:13px;border-radius:11px;background:#edf1f1;border:1px solid #d6dfdf}
    #zurielGeographyCentre .zg-journey h4{margin:0 0 7px;color:#193c56;font:700 16px Georgia,serif}
    #zurielGeographyCentre .zg-stop{display:block;width:100%;margin:7px 0}
    #zurielGeographyCentre .zg-status{min-height:22px;color:#355c45;font:13px/1.5 Arial,sans-serif}
    #zurielGeographyCentre .zg-attribution{font:11px/1.5 Arial,sans-serif;color:#697584;margin-top:12px}
    @media(max-width:420px){#zurielGeographyCentre .zg-places{grid-template-columns:1fr}#zurielGeographyCentre .zg-content{padding:11px}}
  `;
  root.appendChild(style);

  const content = document.createElement("div");
  content.className = "zg-content";
  content.appendChild(make("h3", "zg-title", region.name + " — Gospel places"));
  content.appendChild(make("p", "zg-copy", region.subtitle));

  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "zg-map");
  svg.setAttribute("viewBox", "0 0 600 420");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "North-up coordinate locator showing Nazareth, Cana, the Sea of Galilee and Capernaum.");
  svg.appendChild(svgNode("rect", { x: 0, y: 0, width: 600, height: 420, fill: "#f4f0e5" }));
  for (let i = 0; i <= 4; i++) {
    const x = 60 + i * 120;
    svg.appendChild(svgNode("line", { x1: x, y1: 48, x2: x, y2: 365, class: "zg-map-grid" }));
  }
  for (let i = 0; i <= 3; i++) {
    const y = 55 + i * 100;
    svg.appendChild(svgNode("line", { x1: 55, y1: y, x2: 555, y2: y, class: "zg-map-grid" }));
  }
  svg.appendChild(svgNode("text", { x: 24, y: 28, fill: "#20364b", "font-size": 14, "font-weight": 700 }, "N ↑"));
  svg.appendChild(svgNode("text", { x: 300, y: 400, fill: "#667383", "font-size": 11, "text-anchor": "middle" }, "Galilee locator • north is up • schematic coordinate plot"));
  const positions = {};
  region.places.forEach(place => {
    const x = 60 + ((place.longitude - region.bounds.west) / (region.bounds.east - region.bounds.west)) * 480;
    const y = 55 + ((region.bounds.north - place.latitude) / (region.bounds.north - region.bounds.south)) * 300;
    positions[place.id] = { x, y };
    const water = place.type === "body of water";
    svg.appendChild(svgNode("circle", { cx: x, cy: y, r: water ? 10 : 8, fill: water ? "#3d7894" : "#b28a3f", stroke: "#ffffff", "stroke-width": 3 }));
    svg.appendChild(svgNode("text", { x: x + place.labelOffset.x, y: y + place.labelOffset.y, class: "zg-map-label" }, place.name));
  });
  content.appendChild(svg);
  content.appendChild(make("p", "zg-copy", region.mapNotice));

  const placeButtons = document.createElement("div");
  placeButtons.className = "zg-places";
  const detail = document.createElement("section");
  detail.className = "zg-detail";
  detail.setAttribute("aria-live", "polite");
  const status = make("p", "zg-status", "");
  const attribution = make("p", "zg-attribution", data.metadata.attribution + " Source snapshot: " + data.metadata.sourceCommit + ". " + data.metadata.license + " Coordinates are source-backed candidates and should be read with the precision and confidence notes shown.");
  const selected = { id: "capernaum" };

  function renderPlace(place) {
    selected.id = place.id;
    placeButtons.querySelectorAll("button").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.placeId === place.id)));
    detail.replaceChildren();
    detail.appendChild(make("h4", "", place.name));
    detail.appendChild(make("p", "zg-copy", place.summary));
    detail.appendChild(make("p", "zg-score", "OpenBible resolution score: " + place.score + "/1000 — " + (place.score >= 500 ? "high confidence in the source's scoring system" : "lower-confidence identification") + "."));
    detail.appendChild(make("p", "zg-copy", "Mapped candidate: " + place.resolutionName + ". " + place.precision));
    if (place.alternatives) {
      place.alternatives.forEach(alternative => detail.appendChild(make("p", "zg-copy", "Alternative identification: " + alternative.name + " (source score " + alternative.score + "/1000). " + alternative.note)));
    }
    detail.appendChild(make("strong", "", "Related Scripture passages"));
    const refs = document.createElement("div");
    refs.className = "zg-refs";
    place.references.forEach(reference => refs.appendChild(referenceButton(reference)));
    detail.appendChild(refs);
  }

  region.places.forEach(place => {
    const button = make("button", "zg-place-button", place.name);
    button.type = "button";
    button.dataset.placeId = place.id;
    button.setAttribute("aria-pressed", String(place.id === selected.id));
    button.addEventListener("click", () => renderPlace(place));
    placeButtons.appendChild(button);
  });
  content.appendChild(make("h4", "", "Explore a place"));
  content.appendChild(placeButtons);
  content.appendChild(detail);
  const journeyBox = document.createElement("section");
  journeyBox.className = "zg-journey";
  const journey = region.journeys[0];
  journeyBox.appendChild(make("h4", "", journey.title));
  journeyBox.appendChild(make("p", "zg-copy", journey.description));
  journey.stops.forEach((stop, index) => {
    const place = region.places.find(item => item.id === stop.placeId);
    if (!place) return;
    const button = make("button", "zg-stop", (index + 1) + ". " + place.name + " — " + stop.reference.book + " " + stop.reference.chapter + ":" + stop.reference.verse + ". " + stop.caption);
    button.type = "button";
    button.addEventListener("click", () => openReference(stop.reference, status));
    journeyBox.appendChild(button);
  });
  content.appendChild(journeyBox);
  content.appendChild(attribution);
  content.appendChild(status);
  root.appendChild(content);
  const insertionPoint = document.getElementById("zurielStudySections");
  if (insertionPoint && insertionPoint.parentNode) insertionPoint.parentNode.insertBefore(root, insertionPoint.nextSibling);
  else panel.appendChild(root);
  const initial = region.places.find(place => place.id === selected.id) || region.places[0];
  renderPlace(initial);

  function make(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function svgNode(tag, attributes, text) {
    const element = document.createElementNS(NS, tag);
    Object.entries(attributes || {}).forEach(([key, value]) => element.setAttribute(key, String(value)));
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function referenceButton(reference) {
    const button = make("button", "zg-reference", "Open " + reference.book + " " + reference.chapter + ":" + reference.verse);
    button.type = "button";
    button.addEventListener("click", () => openReference(reference, status));
    return button;
  }
  async function openReference(reference, statusElement) {
    if (typeof window.openChapter !== "function") {
      statusElement.textContent = "The Bible reader is not ready. Please open the passage from the Read section.";
      return;
    }
    try {
      await window.openChapter(reference.book, reference.chapter);
      const verse = Array.from(document.querySelectorAll("#message .verse")).find(element => {
        const label = element.querySelector("strong");
        return label && Number(label.textContent.replace(/[^0-9]/g, "")) === reference.verse;
      });
      if (!verse) throw new Error("The requested verse is not visible in the reader.");
      verse.scrollIntoView({ behavior: "smooth", block: "center" });
      verse.classList.add("zuriel-selected-verse");
      const verseText = verse.textContent.replace(/^\s*\d+\.?\s*/, "").trim();
      if (window.ZurielStudy && typeof window.ZurielStudy.openForReference === "function") {
        window.ZurielStudy.openForReference(reference.book, reference.chapter, reference.verse, verseText, "", -1);
      }
      statusElement.textContent = "Opened " + reference.book + " " + reference.chapter + ":" + reference.verse + " in the Bible reader.";
    } catch (error) {
      statusElement.textContent = error.message || "That passage could not be opened. Please try again.";
    }
  }
  console.log("Zuriel Bible Geography Centre loaded: " + region.name + ".");
})();
