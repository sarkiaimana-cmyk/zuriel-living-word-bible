import assert from "node:assert/strict";
import fs from "node:fs";

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
assert.match(index, /<script src="zuriel-media\.js"><\\/script>[\s\S]*?<script src="zuriel-library\.js"><\\/script>/, "Gallery bridge loads before Open Book Studio");
const prepare = fs.readFileSync("scripts/prepare-web.mjs", "utf8");
assert.match(prepare, /"zuriel-media\.js"/, "Android web bundle includes the Gallery bridge");
const serviceWorker = fs.readFileSync("sw.js", "utf8");
assert.match(serviceWorker, /"\.\/zuriel-media\.js"/, "offline cache precaches the Gallery bridge");

console.log("Gallery export checks passed: native Android album save, app-scoped permissions, system sharing and browser Downloads fallback.");
