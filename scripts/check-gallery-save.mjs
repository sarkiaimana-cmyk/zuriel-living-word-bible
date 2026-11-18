import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const dependencies = packageJson.dependencies || {};
assert.equal(
  dependencies["@capacitor-community/media"],
  "9.1.0",
  "Capacitor 8 media plugin is pinned to the compatible 9.1.0 release"
);

const bridge = fs.readFileSync("zuriel-media.js", "utf8");
assert.match(bridge, /registerPlugin\("Media"\)/, "native Media plugin is registered through Capacitor");
assert.match(bridge, /isNativePlatform\(\)/, "direct Gallery writes are limited to native platforms");
assert.match(bridge, /isPluginAvailable\("Media"\)/, "Gallery save checks native plugin availability");
assert.match(bridge, /getAlbums\(\)/, "Gallery save locates the app album");
assert.match(bridge, /createAlbum\(\{\s*name:\s*name\s*\}\)/, "Gallery save creates the Zuriel album when needed");
assert.match(bridge, /savePhoto\(/, "Gallery save uses the native photo library API");
assert.match(bridge, /albumIdentifier/, "Android Gallery save targets a real album identifier");
assert.ok(bridge.includes("data:image") && bridge.includes("base64"), "native save accepts a base64 PNG data URL");

const library = fs.readFileSync("zuriel-library.js", "utf8");
assert.match(library, /exportButton\.id === "zgsSaveImage"[\s\S]*?ZurielMedia\.saveImage/, "Save PNG button calls the native Gallery bridge");
assert.match(library, /new FileReader\(\)[\s\S]*?readAsDataURL\(blob\)/, "canvas PNG blob is converted to a native-compatible data URL");
assert.match(library, /zgsShareImage[\s\S]*?navigator\.share/, "Share Image keeps the system share sheet");
assert.match(library, /saved to your Downloads folder/i, "browser/PWA keeps a Downloads fallback");

const index = fs.readFileSync("index.html", "utf8");
assert.ok(index.indexOf('<script src="zuriel-media.js"></script>') >= 0 && index.indexOf('<script src="zuriel-media.js"></script>') < index.indexOf('<script src="zuriel-library.js"></script>'), "Gallery bridge loads before Open Book Studio");
const prepare = fs.readFileSync("scripts/prepare-web.mjs", "utf8");
assert.match(prepare, /"zuriel-media\.js"/, "Android web bundle includes the Gallery bridge");
const serviceWorker = fs.readFileSync("sw.js", "utf8");
assert.match(serviceWorker, /"\.\/zuriel-media\.js"/, "offline cache precaches the Gallery bridge");


const calls = [];
let albums = [];
const nativePlugin = {
  async getAlbums() {
    calls.push("getAlbums");
    return { albums: albums.slice() };
  },
  async createAlbum(options) {
    calls.push({ method: "createAlbum", options: options });
    albums.push({ identifier: "zuriel-album-1", name: options.name });
  },
  async savePhoto(options) {
    calls.push({ method: "savePhoto", options: options });
    return { filePath: "content://media/external/images/media/1" };
  }
};
const nativeWindow = {
  Capacitor: {
    registerPlugin(name) { assert.equal(name, "Media"); return nativePlugin; },
    isNativePlatform() { return true; },
    isPluginAvailable(name) { return name === "Media"; }
  }
};
vm.runInNewContext(bridge, { window: nativeWindow });
assert.equal(nativeWindow.ZurielMedia.isAvailable(), true);
const saved = await nativeWindow.ZurielMedia.saveImage({
  dataUrl: "data:image/png;base64,AAAA",
  fileName: "My Card.png"
});
assert.equal(saved.albumName, "Zuriel Living Word Bible");
assert.ok(calls.some(call => call && call.method === "createAlbum"), "native save creates its app album once");
const saveCall = calls.find(call => call && call.method === "savePhoto");
assert.ok(saveCall, "native save calls Media.savePhoto");
assert.equal(saveCall.options.albumIdentifier, "zuriel-album-1");
assert.equal(saveCall.options.fileName, "My-Card");

const webWindow = {
  Capacitor: {
    registerPlugin() { return nativePlugin; },
    isNativePlatform() { return false; },
    isPluginAvailable() { return false; }
  }
};
vm.runInNewContext(bridge, { window: webWindow });
assert.equal(webWindow.ZurielMedia.isAvailable(), false);
await assert.rejects(
  webWindow.ZurielMedia.saveImage({ dataUrl: "data:image/png;base64,AAAA", fileName: "x.png" }),
  /installed Android app/
);

console.log("Gallery export checks passed: native Android album save, app-scoped permissions, system sharing and browser Downloads fallback.");
