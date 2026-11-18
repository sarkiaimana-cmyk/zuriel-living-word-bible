/* Zuriel local reminders — opt-in, offline-first Android notifications. */
(function () {
  "use strict";

  const STORAGE_KEY = "zurielLocalReminderPreferencesV1";
  const BASE_ID = 51000;
  const CHANNEL_ID = "zuriel-reminders";
  const DAYS = [
    { value: 1, label: "Sun" }, { value: 2, label: "Mon" },
    { value: 3, label: "Tue" }, { value: 4, label: "Wed" },
    { value: 5, label: "Thu" }, { value: 6, label: "Fri" },
    { value: 7, label: "Sat" }
  ];
  const CATEGORIES = [
    { id: "scripture", title: "Daily Scripture", body: "Open Zuriel for today's Bible reading.", route: "scripture", reference: "Psalm 119:105", time: "08:00" },
    { id: "readingPlan", title: "Reading plan", body: "Your next guided Bible reading is ready.", route: "plans", time: "19:00" },
    { id: "prayer", title: "Prayer time", body: "Pause and bring your heart to God in prayer.", route: "prayer", time: "12:00" },
    { id: "devotional", title: "The Light Glory Devotional", body: "Your devotional reflection is ready.", route: "devotional", time: "07:00" },
    { id: "study", title: "Personal study", body: "Continue exploring God's Word in the Study Centre.", route: "study", time: "20:00" },
    { id: "updates", title: "Zuriel updates", body: "Check the latest improvements in Zuriel settings.", route: "updates", time: "10:00" }
  ];

  function defaults() {
    const categories = {};
    CATEGORIES.forEach(item => { categories[item.id] = { enabled: false, time: item.time }; });
    return { enabled: false, days: DAYS.map(day => day.value), quietStart: "22:00", quietEnd: "07:00", categories: categories };
  }

  function readPreferences() {
    const base = defaults();
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved || typeof saved !== "object") return base;
      base.enabled = saved.enabled === true;
      base.days = Array.isArray(saved.days) ? saved.days.map(Number).filter(day => DAYS.some(item => item.value === day)) : base.days;
      base.quietStart = validTime(saved.quietStart) ? saved.quietStart : base.quietStart;
      base.quietEnd = validTime(saved.quietEnd) ? saved.quietEnd : base.quietEnd;
      CATEGORIES.forEach(item => {
        const value = saved.categories && saved.categories[item.id];
        if (value && typeof value === "object") {
          base.categories[item.id] = {
            enabled: value.enabled === true,
            time: validTime(value.time) ? value.time : item.time
          };
        }
      });
    } catch (error) {
      // Keep defaults if the preference record is unavailable or damaged.
    }
    return base;
  }

  function validTime(value) {
    return typeof value === "string" && /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(value);
  }

  function minutes(value) {
    if (!validTime(value)) return null;
    const parts = value.split(":").map(Number);
    return parts[0] * 60 + parts[1];
  }

  function isQuiet(value, start, end) {
    const time = minutes(value), from = minutes(start), to = minutes(end);
    if (time === null || from === null || to === null || from === to) return false;
    return from < to ? time >= from && time < to : time >= from || time < to;
  }

  function managedId(categoryIndex, weekday) {
    return BASE_ID + categoryIndex * 10 + weekday;
  }

  function isManagedId(id) {
    return Number.isInteger(id) && id >= BASE_ID && id < BASE_ID + CATEGORIES.length * 10;
  }

  function buildNotifications(preferences) {
    const notifications = [];
    let skippedQuiet = 0;
    if (!preferences || preferences.enabled !== true) return { notifications, skippedQuiet };
    const days = Array.from(new Set((preferences.days || []).map(Number)))
      .filter(day => DAYS.some(item => item.value === day));
    CATEGORIES.forEach((category, index) => {
      const choice = preferences.categories && preferences.categories[category.id];
      if (!choice || choice.enabled !== true || !validTime(choice.time)) return;
      if (isQuiet(choice.time, preferences.quietStart, preferences.quietEnd)) {
        skippedQuiet += days.length;
        return;
      }
      const parts = choice.time.split(":").map(Number);
      days.forEach(weekday => {
        notifications.push({
          id: managedId(index, weekday),
          title: category.title,
          body: category.body,
          schedule: { on: { weekday: weekday, hour: parts[0], minute: parts[1] } },
          isExactNotification: false,
          channelId: CHANNEL_ID,
          extra: { route: category.route, reference: category.reference || null, category: category.id }
        });
      });
    });
    return { notifications, skippedQuiet };
  }

  async function scheduleWithPlugin(preferences, plugin) {
    if (!plugin) return { ok: false, reason: "unavailable", scheduledCount: 0, skippedQuiet: 0 };
    const pending = await plugin.getPending();
    const oldIds = (pending.notifications || []).filter(item => isManagedId(item.id)).map(item => ({ id: item.id }));
    if (oldIds.length) await plugin.cancel({ notifications: oldIds });

    const built = buildNotifications(preferences);
    if (!built.notifications.length) {
      return { ok: true, scheduledCount: 0, skippedQuiet: built.skippedQuiet, reason: "empty" };
    }

    let permission = await plugin.checkPermissions();
    if (!permission || permission.display !== "granted") permission = await plugin.requestPermissions();
    if (!permission || permission.display !== "granted") {
      return { ok: false, reason: "permission-denied", scheduledCount: 0, skippedQuiet: built.skippedQuiet };
    }
    if (typeof plugin.areEnabled === "function") {
      const enabled = await plugin.areEnabled();
      if (enabled && enabled.value === false) {
        return { ok: false, reason: "system-disabled", scheduledCount: 0, skippedQuiet: built.skippedQuiet };
      }
    }
    if (typeof plugin.createChannel === "function") {
      await plugin.createChannel({
        id: CHANNEL_ID,
        name: "Zuriel reminders",
        description: "Optional Scripture, prayer, devotional and study reminders",
        importance: 3,
        vibration: true
      });
    }
    const result = await plugin.schedule({ notifications: built.notifications });
    return {
      ok: true,
      scheduledCount: built.notifications.length,
      skippedQuiet: built.skippedQuiet,
      warning: result && result.warning ? result.warning.message : null
    };
  }

  function pluginAvailable() {
    const capacitor = window.Capacitor;
    return !!(capacitor &&
      typeof capacitor.isNativePlatform === "function" &&
      capacitor.isNativePlatform() &&
      typeof capacitor.isPluginAvailable === "function" &&
      capacitor.isPluginAvailable("LocalNotifications"));
  }

  function openDestination(extra) {
    const data = extra || {};
    const route = String(data.route || "");
    if (route === "scripture" && data.reference) {
      const match = String(data.reference).match(/^(.+?)\s+(\d+):(\d+)$/);
      if (match && typeof window.openChapter === "function") {
        return Promise.resolve(window.openChapter(match[1].trim(), Number(match[2]))).then(() => {
          if (typeof window.selectBibleVerse === "function") window.selectBibleVerse(Number(match[3]));
        });
      }
      if (typeof window.ZurielHomeNavigate === "function") window.ZurielHomeNavigate("read");
      return Promise.resolve();
    }
    if (route === "updates") {
      if (window.ZurielSettings && typeof window.ZurielSettings.open === "function") window.ZurielSettings.open();
      const button = document.getElementById("zurielCheckUpdates");
      if (button) button.click();
      return Promise.resolve();
    }
    if (["plans", "prayer", "devotional", "study"].includes(route)) {
      if (window.ZurielLibrary && typeof window.ZurielLibrary.open === "function") {
        window.ZurielLibrary.open(route);
        return Promise.resolve();
      }
    }
    if (typeof window.ZurielHomeNavigate === "function") window.ZurielHomeNavigate("read");
    return Promise.resolve();
  }

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function installStyles() {
    if (document.getElementById("zurielReminderStyles")) return;
    const style = make("style");
    style.id = "zurielReminderStyles";
    style.textContent = `
      #zurielLocalReminders .zrn-row{display:grid;grid-template-columns:minmax(0,1fr) 112px;align-items:center;gap:9px;padding:8px 0;border-bottom:1px solid #ffffff20}
      #zurielLocalReminders .zrn-row label{display:flex;align-items:center;gap:8px;color:#f6f1e5;font-size:13px}
      #zurielLocalReminders input[type="time"]{width:100%;min-height:40px;padding:6px;border:1px solid #d8c99f;border-radius:8px;background:#fff;color:#18304d}
      #zurielLocalReminders input[type="checkbox"]{width:18px;height:18px;accent-color:#d9b96e}
      #zurielLocalReminders .zrn-days{display:flex;flex-wrap:wrap;gap:7px;margin:8px 0}
      #zurielLocalReminders .zrn-day{display:flex;align-items:center;gap:4px;padding:6px 8px;border:1px solid #ffffff30;border-radius:8px;color:#f6f1e5;font-size:12px}
      #zurielLocalReminders .zrn-quiet{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      #zurielLocalReminders .zrn-quiet label{display:grid;gap:5px;color:#f6f1e5;font-size:12px}
      #zurielLocalReminders .zrn-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
      #zurielLocalReminders .zrn-status{min-height:24px;margin:10px 0 0;color:#f3d98b;font-size:12px;line-height:1.5}
      #zurielLocalReminders .zrn-foot{color:#dce5f1;font-size:12px;line-height:1.55}
      @media(max-width:390px){#zurielLocalReminders .zrn-row{grid-template-columns:minmax(0,1fr) 96px}}
    `;
    document.head.appendChild(style);
  }

  function mount() {
    const panel = document.getElementById("zurielSettingsPanel");
    if (!panel || document.getElementById("zurielLocalReminders")) return;
    installStyles();
    const root = make("section", "settings-group");
    root.id = "zurielLocalReminders";
    root.appendChild(make("h3", "", "🔔 Local reminders"));
    root.appendChild(make("p", "zrn-foot", "Optional reminders are scheduled on this device and work offline. Android will ask for permission only when you save an enabled schedule. If permission is denied, your Bible and all other features remain available."));

    const master = make("label", "", "");
    const masterInput = make("input");
    masterInput.type = "checkbox";
    masterInput.id = "zrnEnabled";
    master.append(masterInput, document.createTextNode(" Enable my Zuriel reminders"));
    root.appendChild(master);

    const categoryBox = make("div");
    categoryBox.className = "zrn-categories";
    CATEGORIES.forEach(category => {
      const row = make("div", "zrn-row");
      const label = make("label");
      const toggle = make("input");
      toggle.type = "checkbox";
      toggle.dataset.category = category.id;
      label.append(toggle, document.createTextNode(" " + category.title));
      const time = make("input");
      time.type = "time";
      time.value = category.time;
      time.dataset.time = category.id;
      row.append(label, time);
      categoryBox.appendChild(row);
    });
    root.appendChild(categoryBox);

    root.appendChild(make("p", "zrn-foot", "Choose the days that suit your routine."));
    const dayBox = make("div", "zrn-days");
    DAYS.forEach(day => {
      const label = make("label", "zrn-day");
      const toggle = make("input");
      toggle.type = "checkbox";
      toggle.value = String(day.value);
      toggle.dataset.day = String(day.value);
      label.append(toggle, document.createTextNode(day.label));
      dayBox.appendChild(label);
    });
    root.appendChild(dayBox);

    root.appendChild(make("p", "zrn-foot", "Quiet hours: reminders that fall inside this window will not be scheduled."));
    const quiet = make("div", "zrn-quiet");
    [["Quiet starts","quietStart","22:00"],["Quiet ends","quietEnd","07:00"]].forEach(([labelText,id,value]) => {
      const label = make("label", "", labelText);
      const input = make("input");
      input.type = "time";
      input.id = "zrn" + id[0].toUpperCase() + id.slice(1);
      input.value = value;
      label.appendChild(input);
      quiet.appendChild(label);
    });
    root.appendChild(quiet);

    const actions = make("div", "zrn-actions");
    const save = make("button", "", "Save reminder schedule");
    save.type = "button";
    save.id = "zrnSave";
    const disable = make("button", "", "Turn off reminders");
    disable.type = "button";
    disable.id = "zrnDisable";
    actions.append(save, disable);
    root.appendChild(actions);
    const status = make("p", "zrn-status", "Reminders are off until you choose and save a schedule.");
    status.id = "zrnStatus";
    status.setAttribute("role","status");
    status.setAttribute("aria-live","polite");
    root.appendChild(status);
    panel.appendChild(root);

    const saved = readPreferences();
    masterInput.checked = saved.enabled;
    root.querySelectorAll("[data-category]").forEach(input => {
      input.checked = !!saved.categories[input.dataset.category].enabled;
    });
    root.querySelectorAll("[data-time]").forEach(input => {
      input.value = saved.categories[input.dataset.time].time;
    });
    root.querySelectorAll("[data-day]").forEach(input => {
      input.checked = saved.days.includes(Number(input.dataset.day));
    });
    root.querySelector("#zrnQuietStart").value = saved.quietStart;
    root.querySelector("#zrnQuietEnd").value = saved.quietEnd;
    if (!pluginAvailable()) {
      status.textContent = "Saved preferences can be prepared here, but native local notifications require the installed Android app.";
    } else if (saved.enabled) {
      status.textContent = "Your reminder choices are saved. Press Save reminder schedule to refresh the device schedule.";
    }

    save.addEventListener("click", async () => {
      const preferences = collect();
      if (!preferences) {
        status.textContent = "Please choose valid times and at least one day.";
        return;
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      } catch (error) {
        status.textContent = "Device storage is unavailable. Your reminder schedule was not changed.";
        return;
      }
      if (!pluginAvailable()) {
        status.textContent = "Your choices are saved on this device. Native reminders will be scheduled when you use the installed Android app.";
        return;
      }
      save.disabled = true;
      try {
        const result = await scheduleWithPlugin(preferences, window.Capacitor.registerPlugin("LocalNotifications"));
        if (!result.ok && result.reason === "permission-denied") {
          status.textContent = "Android notification permission was not granted. Nothing is scheduled; your Bible remains fully usable.";
        } else if (!result.ok && result.reason === "system-disabled") {
          status.textContent = "Notifications are disabled in Android settings. Enable them there to receive Zuriel reminders.";
        } else if (result.scheduledCount === 0 && result.skippedQuiet > 0) {
          status.textContent = "No reminders were scheduled because the selected times fall inside quiet hours. Change a time or quiet-hours window.";
        } else {
          status.textContent = result.scheduledCount + " local reminder(s) scheduled. " +
            (result.skippedQuiet ? result.skippedQuiet + " occurrence(s) skipped during quiet hours. " : "") +
            "They run on this device without an internet connection.";
          if (result.warning) status.textContent += " " + result.warning;
        }
      } catch (error) {
        status.textContent = error.message || "Zuriel could not update the reminder schedule.";
      } finally {
        save.disabled = false;
      }
    });

    disable.addEventListener("click", async () => {
      masterInput.checked = false;
      root.querySelectorAll("[data-category]").forEach(input => { input.checked = false; });
      const preferences = collect();
      preferences.enabled = false;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)); } catch (error) {}
      if (!pluginAvailable()) {
        status.textContent = "Reminders are turned off in saved preferences.";
        return;
      }
      disable.disabled = true;
      try {
        const result = await scheduleWithPlugin(preferences, window.Capacitor.registerPlugin("LocalNotifications"));
        status.textContent = result.ok ? "All Zuriel reminders are turned off." : "Your reminder choices are off, but Android did not confirm schedule cancellation.";
      } catch (error) {
        status.textContent = "Your preferences are off. Android could not confirm cancellation of previously scheduled reminders.";
      } finally {
        disable.disabled = false;
      }
    });

    function collect() {
      const categories = {};
      CATEGORIES.forEach(category => {
        categories[category.id] = {
          enabled: !!root.querySelector('[data-category="' + category.id + '"]').checked,
          time: root.querySelector('[data-time="' + category.id + '"]').value
        };
      });
      const days = Array.from(root.querySelectorAll("[data-day]:checked")).map(input => Number(input.value));
      const quietStart = root.querySelector("#zrnQuietStart").value;
      const quietEnd = root.querySelector("#zrnQuietEnd").value;
      if (Object.values(categories).some(item => !validTime(item.time)) || !validTime(quietStart) || !validTime(quietEnd) || !days.length) return null;
      return { enabled: masterInput.checked, days: days, quietStart: quietStart, quietEnd: quietEnd, categories: categories };
    }
  }

  function attachActionListener() {
    if (!pluginAvailable() || window.__zurielNotificationListenerAdded) return;
    window.__zurielNotificationListenerAdded = true;
    const plugin = window.Capacitor.registerPlugin("LocalNotifications");
    plugin.addListener("localNotificationActionPerformed", action => {
      const notification = action && action.notification;
      const extra = notification && notification.extra;
      Promise.resolve(openDestination(extra)).catch(error => {
        console.error("Zuriel notification destination:", error);
      });
    });
  }

  window.ZurielNotifications = {
    categories: CATEGORIES.map(item => ({ id: item.id, title: item.title, route: item.route })),
    defaults: defaults,
    isQuiet: isQuiet,
    buildNotifications: buildNotifications,
    scheduleWithPlugin: scheduleWithPlugin,
    isManagedId: isManagedId,
    openDestination: openDestination
  };

  attachActionListener();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true });
  else mount();
})();
