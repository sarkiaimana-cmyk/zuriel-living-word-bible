import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const [source, pkg, release, index, worker, prepare, library, updates] = await Promise.all([
  readFile("zuriel-notifications.js", "utf8"),
  readFile("package.json", "utf8").then(JSON.parse),
  readFile("version.json", "utf8").then(JSON.parse),
  readFile("index.html", "utf8"),
  readFile("sw.js", "utf8"),
  readFile("scripts/prepare-web.mjs", "utf8"),
  readFile("zuriel-library.js", "utf8"),
  readFile("zuriel-updates.js", "utf8")
]);

assert.match(pkg.version, /^\d+\.\d+\.\d+$/, "package version must use semantic versioning");
assert.equal(release.version, pkg.version, "in-app release metadata must match package version");
assert.equal(pkg.dependencies["@capacitor/local-notifications"], "8.3.1", "Capacitor 8 local notifications plugin must be pinned");
assert.ok(index.includes('src="zuriel-notifications.js"'), "reminder manager must load in the app");
assert.ok(prepare.includes('"zuriel-notifications.js"'), "reminder manager must be copied into the Android web bundle");
assert.ok(worker.includes('zuriel-bible-offline-v213'), "offline cache must advance to v205");
assert.ok(worker.includes('"./zuriel-notifications.js"'), "reminder manager must be precached offline");
assert.ok(updates.includes('const APP_VERSION = "' + release.version + '"'), "update centre must report the published version");
assert.ok(library.includes('["plans", "🗓️ Bible Reading Plans"]'), "reading plans must have a library destination");
assert.ok(library.includes("window.ZurielReadingPlans.render"), "reading plan destination must render the offline plans");
assert.ok(source.includes('requestPermissions()'), "permission is requested only through an explicit schedule action");
assert.ok(source.includes('isExactNotification: false'), "reminders must not demand exact-alarm permission");
assert.ok(source.includes('localNotificationActionPerformed'), "notification taps must be handled");
assert.ok(!source.includes("cancelAll"), "reminder manager must never cancel unrelated app notifications");

const context = {
  window: {
    Capacitor: {
      isNativePlatform: () => false,
      isPluginAvailable: () => false,
      registerPlugin: () => { throw new Error("Browser mode must not register a native plugin"); }
    }
  },
  document: { readyState: "loading", addEventListener() {}, getElementById() { return null; } },
  localStorage: { getItem() { return null; }, setItem() {} },
  console,
  Promise
};
vm.runInNewContext(source, context, { timeout: 1000 });
const api = context.window.ZurielNotifications;
assert.equal(api.categories.length, 6, "six independently controllable reminder categories");
assert.equal(api.defaults().enabled, false, "reminders must be opt-in by default");
assert.equal(api.isQuiet("23:00", "22:00", "07:00"), true, "quiet hours cover late evening");
assert.equal(api.isQuiet("06:30", "22:00", "07:00"), true, "quiet hours cover early morning");
assert.equal(api.isQuiet("07:00", "22:00", "07:00"), false, "quiet end is inclusive for reminders");
assert.equal(api.isQuiet("12:00", "22:00", "07:00"), false, "midday is outside quiet hours");
assert.equal(api.isQuiet("12:00", "12:00", "12:00"), false, "equal quiet boundaries disable quiet hours");

const preferences = api.defaults();
preferences.enabled = true;
preferences.days = [1, 2, 3];
preferences.categories.scripture.enabled = true;
preferences.categories.scripture.time = "08:15";
preferences.categories.prayer.enabled = true;
preferences.categories.prayer.time = "23:00";
const built = api.buildNotifications(preferences);
assert.equal(built.notifications.length, 3, "one notification per selected day for each active non-quiet category");
assert.equal(built.skippedQuiet, 3, "quiet-hour occurrences are skipped");
assert.equal(new Set(Array.from(built.notifications, item => item.id)).size, 3, "notification IDs must be unique");
assert.equal(built.notifications[0].schedule.on.weekday, 1, "weekday recurrence uses Sunday=1");
assert.equal(built.notifications[0].schedule.on.hour, 8, "local reminder hour is preserved");
assert.equal(built.notifications[0].schedule.on.minute, 15, "local reminder minute is preserved");
assert.equal(built.notifications[0].isExactNotification, false, "no exact alarm permission is required");
assert.equal(built.notifications[0].extra.route, "scripture", "notification tap has a destination");

const calls = { cancelled: [], scheduled: [], permissionChecks: 0, permissionRequests: 0, channels: 0 };
const plugin = {
  async getPending() { return { notifications: [{ id: 51001 }, { id: 999 }] }; },
  async cancel(options) { calls.cancelled.push(...options.notifications.map(item => item.id)); },
  async checkPermissions() { calls.permissionChecks++; return { display: "prompt" }; },
  async requestPermissions() { calls.permissionRequests++; return { display: "granted" }; },
  async areEnabled() { return { value: true }; },
  async createChannel() { calls.channels++; },
  async schedule(options) { calls.scheduled.push(...options.notifications); return { notifications: options.notifications }; }
};
const result = await api.scheduleWithPlugin(preferences, plugin);
assert.equal(result.ok, true);
assert.equal(result.scheduledCount, 3);
assert.equal(result.skippedQuiet, 3);
assert.equal(calls.cancelled.length, 1);
assert.equal(calls.cancelled[0], 51001, "only Zuriel-managed reminder IDs may be cancelled");
assert.equal(calls.permissionChecks, 1);
assert.equal(calls.permissionRequests, 1);
assert.equal(calls.channels, 1);
assert.equal(calls.scheduled.length, 3);

const deniedCalls = { scheduled: 0 };
const denied = await api.scheduleWithPlugin(preferences, {
  async getPending() { return { notifications: [] }; },
  async checkPermissions() { return { display: "prompt" }; },
  async requestPermissions() { return { display: "denied" }; },
  async schedule() { deniedCalls.scheduled++; }
});
assert.equal(denied.ok, false);
assert.equal(denied.reason, "permission-denied");
assert.equal(deniedCalls.scheduled, 0, "denied permission must not schedule reminders");

const off = api.defaults();
const offCalls = { cancelled: 0, requested: 0, scheduled: 0 };
const offResult = await api.scheduleWithPlugin(off, {
  async getPending() { return { notifications: [{ id: 51002 }, { id: 80000 }] }; },
  async cancel(options) { offCalls.cancelled += options.notifications.length; },
  async checkPermissions() { offCalls.requested++; return { display: "granted" }; },
  async requestPermissions() { offCalls.requested++; return { display: "granted" }; },
  async schedule() { offCalls.scheduled++; }
});
assert.equal(offResult.ok, true);
assert.equal(offCalls.cancelled, 1);
assert.equal(offCalls.requested, 0, "turning reminders off must not request permission");
assert.equal(offCalls.scheduled, 0);

let openedPage = "";
context.window.ZurielLibrary = { open(page) { openedPage = page; } };
await api.openDestination({ route: "plans" });
assert.equal(openedPage, "plans", "reading-plan reminders open the reading plans destination");
await api.openDestination({ route: "prayer" });
assert.equal(openedPage, "prayer", "prayer reminders open the prayer journal");

console.log("Local reminder checks passed: opt-in defaults, six categories, local weekday schedules, quiet hours, selective cancellation, Android permission denial, offline cache, and accurate tap destinations.");
