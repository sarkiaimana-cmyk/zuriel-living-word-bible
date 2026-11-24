/* Zuriel Bible Geography Centre — offline regional locators and Scripture links. */
(function () {
  "use strict";
  const data = window.ZurielGeographyData;
  const panel = document.getElementById("zurielStudyPanel");
  if (!data || !panel) return;

  const NS = "http://www.w3.org/2000/svg";
  const styleId = "zurielGeographyStyles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .zuriel-geography{margin:18px 0;border:1px solid #c9b77e;border-radius:14px;background:#f8f6ef;color:#20364b;overflow:hidden}
      .zuriel-geography>summary{padding:14px 15px;color:#183653;font-weight:700;cursor:pointer;background:linear-gradient(135deg,#f5f0e2,#e9edf0)}
      .zuriel-geography .zg-content{padding:14px}
      .zuriel-geography .zg-title{font:700 20px/1.3 Georgia,serif;color:#193c56;margin:0 0 5px}
      .zuriel-geography .zg-copy{font:14px/1.6 Arial,sans-serif;color:#566577}
      .zuriel-geography .zg-map{display:block;width:100%;height:auto;border:1px solid #c8c2b3;border-radius:12px;background:#f4f0e5}
      .zuriel-geography .zg-map-label{font:700 13px Arial,sans-serif;fill:#20364b;paint-order:stroke;stroke:#f4f0e5;stroke-width:4px;stroke-linejoin:round}
      .zuriel-geography .zg-map-grid{stroke:#c9c4b8;stroke-width:1;stroke-dasharray:3 5}
      .zuriel-geography .zg-places{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}
      .zuriel-geography .zg-place-button,.zuriel-geography .zg-reference,.zuriel-geography .zg-stop{min-height:42px;padding:10px;border:1px solid #cbd3d5;border-radius:9px;background:#fff;color:#24445b;font:700 13px/1.4 Arial,sans-serif;text-align:left}
      .zuriel-geography .zg-place-button[aria-pressed=true]{border-color:#b99b58;background:#fff4d8}
      .zuriel-geography .zg-detail{padding:13px;border:1px solid #d8d4c9;border-radius:11px;background:#fff;margin:10px 0}
      .zuriel-geography .zg-detail h4{font:700 17px Georgia,serif;color:#193c56;margin:0 0 6px}
      .zuriel-geography .zg-score{font:700 12px Arial,sans-serif;color:#42634f}
      .zuriel-geography .zg-refs{display:flex;flex-wrap:wrap;gap:7px;margin-top:9px}
      .zuriel-geography .zg-reference{min-height:38px;text-align:center}
      .zuriel-geography .zg-journey{margin-top:15px;padding:13px;border-radius:11px;background:#edf1f1;border:1px solid #d6dfdf}
      .zuriel-geography .zg-journey h4{margin:0 0 7px;color:#193c56;font:700 16px Georgia,serif}
      .zuriel-geography .zg-stop{display:block;width:100%;margin:7px 0}
      .zuriel-geography .zg-status{min-height:22px;color:#355c45;font:13px/1.5 Arial,sans-serif}
      .zuriel-geography .zg-attribution{font:11px/1.5 Arial,sans-serif;color:#697584;margin-top:12px}
      .zuriel-geography .zg-search{width:100%;min-height:44px;padding:10px;border:1px solid #cbd3d5;border-radius:9px;background:#fff;color:#20364b;font:14px Arial,sans-serif;margin:8px 0}
      .zuriel-geography .zg-atlas-result{display:block;width:100%;min-height:44px;margin:6px 0;padding:10px;border:1px solid #d4d0c5;border-radius:9px;background:#fff;color:#20364b;text-align:left;font:600 13px/1.5 Arial,sans-serif}
      .zuriel-geography .zg-atlas-result small{display:block;color:#66727d;font-weight:400}
      .zuriel-geography .zg-atlas-detail{margin:10px 0;padding:12px;border:1px solid #d8d4c9;border-radius:10px;background:#fff}
      .zuriel-geography .zg-atlas-detail p{font:13px/1.6 Arial,sans-serif;color:#566577}
      @media(max-width:420px){.zuriel-geography .zg-places{grid-template-columns:1fr}.zuriel-geography .zg-content{padding:11px}}
    `;
    document.head.appendChild(style);
  }

  let previous = document.getElementById("zurielStudySections") || panel;
  data.regions.forEach(function (region) {
    if (document.getElementById("zurielGeographyCentre-" + region.id)) return;
    const root = document.createElement("details");
    root.id = "zurielGeographyCentre-" + region.id;
    root.className = "zuriel-geography";
    const summary = make("summary", "", "🗺️ Bible Geography Centre — " + region.name);
    root.appendChild(summary);

    const content = make("div", "zg-content");
    content.appendChild(make("h3", "zg-title", region.name + " — regional places"));
    content.appendChild(make("p", "zg-copy", region.subtitle));

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "zg-map");
    svg.setAttribute("viewBox", "0 0 600 420");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "North-up coordinate locator for " + region.name + ": " + region.places.map(place => place.name).join(", ") + ".");
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
    svg.appendChild(svgNode("text", { x: 300, y: 400, fill: "#667383", "font-size": 11, "text-anchor": "middle" }, region.name + " locator • north is up • schematic coordinate plot"));
    region.places.forEach(function (place) {
      const x = 60 + ((place.longitude - region.bounds.west) / (region.bounds.east - region.bounds.west)) * 480;
      const y = 55 + ((region.bounds.north - place.latitude) / (region.bounds.north - region.bounds.south)) * 300;
      const water = place.type === "body of water";
      const markerFill = water ? "#3d7894" : place.type === "hill" ? "#6c8263" : "#b28a3f";
      svg.appendChild(svgNode("circle", { cx: x, cy: y, r: water ? 10 : 8, fill: markerFill, stroke: "#ffffff", "stroke-width": 3 }));
      svg.appendChild(svgNode("text", { x: x + place.labelOffset.x, y: y + place.labelOffset.y, class: "zg-map-label" }, place.name));
    });
    content.appendChild(svg);
    content.appendChild(make("p", "zg-copy", region.mapNotice));

    const placeButtons = make("div", "zg-places");
    const detail = make("section", "zg-detail");
    detail.setAttribute("aria-live", "polite");
    const status = make("p", "zg-status", "");
    const attribution = make("p", "zg-attribution", data.metadata.attribution + " Source snapshot: " + data.metadata.sourceCommit + ". " + data.metadata.license + " Coordinates are source-backed candidates and should be read with the precision and confidence notes shown.");
    const selected = { id: region.initialPlaceId || region.places[0].id };

    function renderPlace(place) {
      selected.id = place.id;
      placeButtons.querySelectorAll("button").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.placeId === place.id)));
      detail.replaceChildren();
      detail.appendChild(make("h4", "", place.name));
      detail.appendChild(make("p", "zg-copy", place.summary));
      detail.appendChild(make("p", "zg-score", "OpenBible resolution score: " + place.score + "/1000 — " + (place.score >= 500 ? "high confidence in the source's scoring system" : "lower-confidence identification") + "."));
      detail.appendChild(make("p", "zg-copy", "Mapped candidate: " + place.resolutionName + ". " + place.precision));
      if (place.alternatives) place.alternatives.forEach(alternative => detail.appendChild(make("p", "zg-copy", "Alternative identification: " + alternative.name + " (source score " + alternative.score + "/1000). " + alternative.note)));
      detail.appendChild(make("strong", "", "Related Scripture passages"));
      const refs = make("div", "zg-refs");
      place.references.forEach(reference => refs.appendChild(referenceButton(reference, status)));
      detail.appendChild(refs);
    }

    region.places.forEach(function (place) {
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

    (region.journeys || []).forEach(function (journey) {
      const journeyBox = make("section", "zg-journey");
      journeyBox.appendChild(make("h4", "", journey.title));
      journeyBox.appendChild(make("p", "zg-copy", journey.description));
      journey.stops.forEach(function (stop, index) {
        const place = region.places.find(item => item.id === stop.placeId);
        if (!place) return;
        const ref = stop.reference;
        const button = make("button", "zg-stop", (index + 1) + ". " + place.name + " — " + ref.book + " " + ref.chapter + ":" + ref.verse + ". " + stop.caption);
        button.type = "button";
        button.addEventListener("click", () => openReference(ref, status));
        journeyBox.appendChild(button);
      });
      content.appendChild(journeyBox);
    });
    content.appendChild(attribution);
    content.appendChild(status);
    root.appendChild(content);
    if (previous && previous.parentNode) previous.parentNode.insertBefore(root, previous.nextSibling);
    else panel.appendChild(root);
    previous = root;
    const initial = region.places.find(place => place.id === selected.id) || region.places[0];
    renderPlace(initial);
  });

  async function loadAtlasDirectory() {
    if (document.getElementById("zurielGeographyAtlasDirectory")) return;
    const root = make("details", "zuriel-geography");
    root.id = "zurielGeographyAtlasDirectory";
    root.appendChild(make("summary", "", "📚 Explore the wider Bible Atlas — places & journeys"));
    const content = make("div", "zg-content");
    content.appendChild(make("h3", "zg-title", "Biblical places and journeys"));
    content.appendChild(make("p", "zg-copy", "Explore the wider study atlas without implying that every ancient location or route has a securely known modern coordinate."));
    const search = make("input", "zg-search");
    search.type = "search";
    search.placeholder = "Search 25 places by name, region or significance…";
    search.setAttribute("aria-label", "Search biblical atlas places");
    const results = make("div", "zg-places");
    const detail = make("section", "zg-atlas-detail");
    detail.setAttribute("aria-live", "polite");
    const journeys = make("div", "zg-journey");
    const status = make("p", "zg-status", "Loading the offline Bible atlas…");
    const retry = make("button", "zg-reference", "Retry atlas loading");
    retry.type = "button";
    retry.hidden = true;
    content.append(search, results, detail, make("h4", "zg-title", "Scripture journeys"), journeys, status, retry);
    root.appendChild(content);
    if (previous && previous.parentNode) previous.parentNode.insertBefore(root, previous.nextSibling);
    else panel.appendChild(root);
    previous = root;

    let atlas = null;
    function renderPlaces() {
      const query = search.value.trim().toLocaleLowerCase();
      const matches = (atlas.places || []).filter(place =>
        [place.name, place.region, place.significance, ...(place.references || [])]
          .some(value => String(value || "").toLocaleLowerCase().includes(query)));
      results.replaceChildren();
      matches.forEach(place => {
        const button = make("button", "zg-atlas-result");
        button.type = "button";
        button.appendChild(make("strong", "", place.name));
        button.appendChild(make("small", "", place.region));
        button.addEventListener("click", () => renderAtlasPlace(place));
        results.appendChild(button);
      });
      status.textContent = matches.length + " of " + atlas.places.length + " atlas places shown.";
      if (!matches.length) results.appendChild(make("p", "zg-copy", "No matching place. Try another name or region."));
    }
    function renderAtlasPlace(place) {
      detail.replaceChildren();
      detail.appendChild(make("h4", "", place.name));
      detail.appendChild(make("p", "zg-copy", place.region + " • " + place.modernOrientation + " (present-day orientation only)"));
      detail.appendChild(make("p", "zg-copy", place.significance));
      detail.appendChild(make("p", "zg-copy", "Historical note: " + place.studyCaution));
      detail.appendChild(make("strong", "", "Read the related passages"));
      let inheritedBook = "";
      (place.references || []).forEach(reference => {
        const parsed = parseAtlasReference(reference, inheritedBook);
        if (parsed) inheritedBook = parsed.book;
        const button = make("button", "zg-reference", reference);
        button.type = "button";
        if (parsed) button.addEventListener("click", () => openReference(parsed, status));
        else button.disabled = true;
        detail.appendChild(button);
      });
    }
    function renderJourneys() {
      journeys.replaceChildren();
      (atlas.journeys || []).forEach(journey => {
        const section = make("section", "zg-atlas-detail");
        section.appendChild(make("h4", "", journey.name));
        section.appendChild(make("p", "zg-copy", journey.sequence));
        section.appendChild(make("strong", "", "Open the journey passages"));
        const referenceList = make("div", "zg-refs");
        let inheritedBook = "";
        (journey.references || []).forEach(reference => {
          const parsed = parseAtlasReference(reference, inheritedBook);
          if (parsed) inheritedBook = parsed.book;
          const button = make("button", "zg-reference", reference);
          button.type = "button";
          if (parsed) button.addEventListener("click", () => openReference(parsed, status));
          else button.disabled = true;
          referenceList.appendChild(button);
        });
        section.appendChild(referenceList);
        section.appendChild(make("p", "zg-copy", "Historical note: " + journey.studyCaution));
        journeys.appendChild(section);
      });
    }
    async function load() {
      retry.hidden = true;
      status.textContent = "Loading the offline Bible atlas…";
      try {
        const response = await fetch("./data/zuriel-bible-geography-atlas.json");
        if (!response.ok) throw new Error("Atlas data unavailable (HTTP " + response.status + ").");
        const payload = await response.json();
        if (!payload || !Array.isArray(payload.places) || !Array.isArray(payload.journeys)) {
          throw new Error("Atlas data has an unsupported structure.");
        }
        atlas = payload;
        renderPlaces();
        renderJourneys();
        if (atlas.places.length) renderAtlasPlace(atlas.places[0]);
        status.textContent = atlas.places.length + " places and " + atlas.journeys.length + " journeys loaded. Search or select a place to explore.";
      } catch (error) {
        status.textContent = "The wider atlas could not be loaded. The regional maps and offline Bible remain available.";
        retry.hidden = false;
      }
    }
    search.addEventListener("input", () => { if (atlas) renderPlaces(); });
    retry.addEventListener("click", load);
    await load();
  }

  function parseAtlasReference(reference, inheritedBook) {
    const value = String(reference || "").trim();
    const full = value.match(/^(.+?)\s+(\d+)(?::(\d+))?/);
    const short = value.match(/^(\d+)(?::(\d+))?/);
    const book = full ? full[1] : String(inheritedBook || "");
    const chapter = Number(full ? full[2] : short && short[1]);
    const verse = Number(full ? full[3] || 1 : short && short[2] || 1);
    if (!book || !chapter || !verse) return null;
    return { book, chapter, verse };
  }

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
  function referenceButton(reference, status) {
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
      if (typeof window.selectBibleVerse !== "function" ||
          !window.selectBibleVerse(reference.verse)) {
        throw new Error("The requested verse could not be activated in the Bible reader.");
      }
      statusElement.textContent = "Opened " + reference.book + " " + reference.chapter + ":" + reference.verse + " in the Bible reader.";
    } catch (error) {
      statusElement.textContent = error.message || "That passage could not be opened. Please try again.";
    }
  }
  loadAtlasDirectory();
  console.log("Zuriel Bible Geography Centre loaded: " + data.regions.length + " offline regions.");
})();
