import { TextToSpeech } from "@capacitor-community/text-to-speech";

(function () {
  "use strict";

  const STYLE_ID = "zurielAudioStyles";
  let panel = null;
  let chapter = null;
  let voices = [];
  let selectedVoiceIndex = -1;
  let nextVerse = 0;
  let generation = 0;
  let playing = false;
  let rate = 1;
  let statusNode = null;
  let playButton = null;
  let pauseButton = null;
  let stopButton = null;
  let voiceSelect = null;
  let rateSelect = null;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent =
      "#zurielAudioPlayer{margin:12px 0;padding:13px;border:1px solid #cbd7d1;border-radius:12px;background:#f4f7f4;color:#19324f}" +
      "#zurielAudioPlayer h3{margin:0 0 7px;font:700 15px Arial,sans-serif;color:#19324f}" +
      "#zurielAudioPlayer p{margin:7px 0;font:13px/1.5 Arial,sans-serif}" +
      "#zurielAudioPlayer .zra-controls{display:flex;flex-wrap:wrap;gap:7px;margin-top:9px}" +
      "#zurielAudioPlayer button,#zurielAudioPlayer select{min-height:48px;margin:0;padding:8px 11px;border:1px solid #c6d1cb;border-radius:8px;font:600 13px Arial,sans-serif}" +
      "#zurielAudioPlayer button{background:#193e5a;color:#fff}" +
      "#zurielAudioPlayer button:disabled{opacity:.5}" +
      "#zurielAudioPlayer select{flex:1 1 135px;min-width:0;background:#fff;color:#19324f}" +
      "#zurielAudioPlayer .zra-status{color:#405d4c}" +
      ".verse.zuriel-audio-current{background:#e8f1e9!important;border-left:4px solid #24634a;padding-left:13px}";
    document.head.appendChild(style);
  }

  function setStatus(message) {
    if (statusNode) statusNode.textContent = message;
  }

  function setCurrentVerse(index) {
    document.querySelectorAll("#message .verse.zuriel-audio-current")
      .forEach(function (item) { item.classList.remove("zuriel-audio-current"); });
    const target = document.querySelector(
      '#message .verse[data-verse-number="' + (index + 1) + '"]'
    );
    if (target) {
      target.classList.add("zuriel-audio-current");
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  async function stopSpeech() {
    try { await TextToSpeech.stop(); } catch (error) { /* Engine may already be idle. */ }
  }

  async function loadOfflineVoices() {
    const result = await TextToSpeech.getSupportedVoices();
    const allVoices = result && Array.isArray(result.voices) ? result.voices : [];
    voices = allVoices
      .map(function (voice, index) { return { voice: voice, index: index }; })
      .filter(function (item) {
        return item.voice && item.voice.localService === true &&
          typeof item.voice.lang === "string" &&
          item.voice.lang.toLowerCase().startsWith("en");
      });
    return voices;
  }

  function savedStartingVerse(detail) {
    try {
      const raw = localStorage.getItem("zurielLastReadingPosition");
      if (!raw) return 0;
      const saved = JSON.parse(raw);
      if (!saved || saved.book !== detail.book ||
          Number(saved.chapter) !== Number(detail.chapter) ||
          !Number.isInteger(saved.verse) || saved.verse < 1 ||
          saved.verse > detail.verses.length) return 0;
      return saved.verse - 1;
    } catch (error) {
      return 0;
    }
  }

  function updateFromReadingPosition(position) {
    if (!chapter || playing || !position ||
        position.book !== chapter.book ||
        Number(position.chapter) !== chapter.chapter ||
        !Number.isInteger(position.verse) ||
        position.verse < 1 || position.verse > chapter.verses.length) return;
    nextVerse = position.verse - 1;
    updateButtons();
    setStatus("Ready to read from " + chapter.book + " " + chapter.chapter + ":" +
      position.verse + ". Choose Read when you are ready.");
  }

  function updateButtons() {
    if (playButton) {
      playButton.textContent = playing ? "Playing…" :
        (nextVerse > 0 ? "▶ Continue from verse " + (nextVerse + 1) : "▶ Read chapter aloud");
      playButton.disabled = playing || !chapter || !voices.length || nextVerse >= chapter.verses.length;
    }
    if (pauseButton) pauseButton.disabled = !playing;
    if (stopButton) stopButton.disabled = !playing;
  }

  async function playFromCurrentVerse() {
    if (!chapter || playing) return;
    if (!voices.length) {
      setStatus("No offline English voice is available on this device. Install an English voice in Android Text-to-Speech settings, then reopen this chapter.");
      return;
    }
    if (nextVerse >= chapter.verses.length) nextVerse = 0;

    const token = ++generation;
    playing = true;
    updateButtons();
    setStatus("Preparing " + chapter.book + " " + chapter.chapter + " for read-aloud…");

    try {
      while (nextVerse < chapter.verses.length && token === generation) {
        const index = nextVerse;
        const text = String(chapter.verses[index] || "").replace(/^¶\s*/, "").trim();
        if (!text) {
          nextVerse++;
          continue;
        }
        setCurrentVerse(index);
        setStatus("Reading " + chapter.book + " " + chapter.chapter + ":" +
          (index + 1) + " of " + chapter.verses.length);
        const selected = voices.find(function (item) {
          return item.index === selectedVoiceIndex;
        }) || voices[0];
        await TextToSpeech.speak({
          text: text,
          lang: selected.voice.lang || "en-US",
          rate: rate,
          pitch: 1,
          volume: 1,
          voice: selected.index,
          queueStrategy: 0
        });
        if (token !== generation) return;
        nextVerse = index + 1;
      }
      if (token === generation && nextVerse >= chapter.verses.length) {
        playing = false;
        nextVerse = 0;
        setStatus("Finished reading " + chapter.book + " " + chapter.chapter + ". You can listen again whenever you are ready.");
      }
    } catch (error) {
      if (token === generation) {
        playing = false;
        setStatus("Read-aloud stopped because the device speech engine reported a problem. Check the installed voice and try again.");
      }
    } finally {
      if (token === generation) {
        playing = false;
        updateButtons();
      }
    }
  }

  async function pausePlayback() {
    if (!playing || !chapter) return;
    const pausedAt = nextVerse + 1;
    generation++;
    playing = false;
    await stopSpeech();
    updateButtons();
    setStatus("Paused at " + chapter.book + " " + chapter.chapter + ":" + pausedAt +
      ". Choose Continue to resume from this verse.");
  }

  async function stopPlayback() {
    generation++;
    playing = false;
    await stopSpeech();
    updateButtons();
    setStatus("Read-aloud stopped. You can continue from the current verse.");
  }

  function makeButton(label, handler, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    if (className) button.className = className;
    button.addEventListener("click", handler);
    return button;
  }

  async function mount(detail) {
    await stopPlayback();
    const setupToken = ++generation;
    chapter = {
      book: String(detail.book || ""),
      chapter: Number(detail.chapter),
      verses: Array.isArray(detail.verses) ? detail.verses.map(String) : []
    };
    nextVerse = savedStartingVerse({ book: chapter.book, chapter: chapter.chapter, verses: chapter.verses });
    voices = [];
    selectedVoiceIndex = -1;

    const message = document.getElementById("message");
    const readingTools = document.getElementById("zurielReadingTools");
    if (!message || !readingTools) return;

    addStyles();
    if (panel) panel.remove();
    panel = document.createElement("section");
    panel.id = "zurielAudioPlayer";
    panel.setAttribute("aria-label", "Offline Scripture read-aloud");
    const heading = document.createElement("h3");
    heading.textContent = "🔊 Listen to Scripture";
    const description = document.createElement("p");
    description.textContent = "Read this chapter aloud with an English voice installed on your device. A locally installed voice works without internet.";
    statusNode = document.createElement("p");
    statusNode.className = "zra-status";
    statusNode.setAttribute("role", "status");
    statusNode.setAttribute("aria-live", "polite");
    statusNode.textContent = "Checking for an installed offline English voice…";
    const controls = document.createElement("div");
    controls.className = "zra-controls";
    playButton = makeButton("▶ Read chapter aloud", playFromCurrentVerse);
    pauseButton = makeButton("Pause", pausePlayback);
    pauseButton.disabled = true;
    stopButton = makeButton("Stop", stopPlayback);
    stopButton.disabled = true;
    voiceSelect = document.createElement("select");
    voiceSelect.setAttribute("aria-label", "Offline English voice");
    voiceSelect.addEventListener("change", function () {
      selectedVoiceIndex = Number(voiceSelect.value);
    });
    rateSelect = document.createElement("select");
    rateSelect.setAttribute("aria-label", "Reading speed");
    [[0.8,"Slower"],[1,"Normal speed"],[1.2,"Faster"]].forEach(function (item) {
      const option = document.createElement("option");
      option.value = String(item[0]);
      option.textContent = item[1];
      rateSelect.appendChild(option);
    });
    rateSelect.value = "1";
    rateSelect.addEventListener("change", function () { rate = Number(rateSelect.value); });
    const setupButton = makeButton("Set up device voice", async function () {
      try {
        if (window.Capacitor && window.Capacitor.getPlatform &&
            window.Capacitor.getPlatform() === "android") {
          await TextToSpeech.openInstall();
          setStatus("Android voice setup opened. Install an English voice, return to Zuriel, and reopen the chapter.");
        } else {
          setStatus("Open your device's Text-to-Speech settings and install an offline English voice, then reopen this chapter.");
        }
      } catch (error) {
        setStatus("Device voice settings could not be opened. Install an offline English voice from Android Settings.");
      }
    });
    controls.append(playButton, pauseButton, stopButton, voiceSelect, rateSelect, setupButton);
    panel.append(heading, description, statusNode, controls);
    readingTools.insertAdjacentElement("afterend", panel);

    try {
      await loadOfflineVoices();
      if (setupToken !== generation || !chapter || !panel || !panel.isConnected) return;
      if (!voices.length) {
        setStatus("No locally installed English voice was found. Use “Set up device voice” to install one. Online-only voices are not used by this offline player.");
        playButton.disabled = true;
        return;
      }
      voices.forEach(function (item) {
        const option = document.createElement("option");
        option.value = String(item.index);
        option.textContent = item.voice.name + " (" + item.voice.lang + ")";
        voiceSelect.appendChild(option);
      });
      const preferred = voices.find(function (item) {
        return item.voice.default && item.voice.lang.toLowerCase() === "en-us";
      }) || voices.find(function (item) {
        return item.voice.default;
      }) || voices[0];
      selectedVoiceIndex = preferred.index;
      voiceSelect.value = String(selectedVoiceIndex);
      setStatus(voices.length + " offline English voice" + (voices.length === 1 ? "" : "s") +
        " ready. " + (nextVerse > 0 ? "Ready from verse " + (nextVerse + 1) + "." : "The chapter is ready to read.") +
        " Playback works without internet.");
      updateButtons();
    } catch (error) {
      setStatus("The device speech engine could not be reached. Check Android Text-to-Speech settings and try again.");
      playButton.disabled = true;
    }
  }

  window.addEventListener("zuriel:chapter-opened", function (event) {
    const detail = event.detail || {};
    mount(detail);
  });

  window.addEventListener("zuriel:reading-position-changed", function (event) {
    updateFromReadingPosition(event.detail || {});
  });

  window.addEventListener("zuriel:chapter-closed", function () {
    stopPlayback();
    if (panel) panel.remove();
    panel = null;
    chapter = null;
    voices = [];
    nextVerse = 0;
  });

  window.ZurielAudio = {
    stop: stopPlayback,
    getStatus: function () {
      return { ready: voices.length > 0, playing: playing, nextVerse: nextVerse };
    }
  };
})();
