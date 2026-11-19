/* Zuriel Hebrew and Greek lexicon study index loader.
   This is a curated lookup index, not a verse-to-lemma concordance.
   Never infer a Strong's lemma from an English word alone. */
(function () {
  "use strict";
  const state = {
    status: "loading",
    entries: [],
    error: "",
    findById: function (id) {
      const key = String(id || "").trim().toUpperCase();
      return this.entries.find(function (entry) {
        return String(entry.id || "").toUpperCase() === key;
      }) || null;
    },
    search: function (query) {
      const term = String(query || "").trim().toLocaleLowerCase("en");
      if (!term) return [];
      return this.entries.filter(function (entry) {
        return [entry.id, entry.lemma, entry.transliteration, entry.studyLabel]
          .concat(entry.topicLinks || [])
          .some(function (value) {
            return String(value || "").toLocaleLowerCase("en").includes(term);
          });
      });
    }
  };
  window.ZurielLexiconStudyIndex = state;
  fetch("./data/zuriel-lexicon-study-index.json", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("Lexicon index unavailable (" + response.status + ").");
      return response.json();
    })
    .then(function (data) {
      if (!data || !Array.isArray(data.entries)) {
        throw new Error("Lexicon index has an invalid structure.");
      }
      const seen = new Set();
      data.entries.forEach(function (entry) {
        if (!entry || typeof entry.id !== "string" ||
            typeof entry.lemma !== "string" ||
            typeof entry.transliteration !== "string" ||
            typeof entry.studyLabel !== "string" ||
            !Array.isArray(entry.keyReferences)) {
          throw new Error("Lexicon index contains an incomplete entry.");
        }
        if (seen.has(entry.id)) throw new Error("Duplicate lexicon index ID: " + entry.id);
        seen.add(entry.id);
      });
      state.entries = data.entries.slice();
      state.title = data.title || "Zuriel Hebrew and Greek Lexicon Study Index";
      state.usageNote = data.usageNote || "";
      state.status = "ready";
      window.dispatchEvent(new CustomEvent("zuriel:lexicon-index-ready", {
        detail: { count: state.entries.length }
      }));
    })
    .catch(function (error) {
      state.status = "unavailable";
      state.error = error && error.message ? error.message : "Lexicon index could not be loaded.";
    });
})();
