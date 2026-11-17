import assert from "node:assert/strict";
import vm from "node:vm";
import { build } from "esbuild";

const state = {
  native: true,
  platform: "android",
  albums: [],
  albumCreates: [],
  savedPhotos: [],
  shared: [],
  writes: [],
  saveResult: { filePath: "/gallery/Zuriel Living Word Bible/card.png" },
  shareError: null
};

const mocks = {
  "@capacitor/core": `
    export const Capacitor = {
      isNativePlatform: () => globalThis.__mockState.native,
      getPlatform: () => globalThis.__mockState.platform
    };
  `,
  "@capacitor/share": `
    export const Share = {
      share: async options => {
        globalThis.__mockState.shared.push(options);
        if (globalThis.__mockState.shareError) throw globalThis.__mockState.shareError;
        return { activityType: "test" };
      }
    };
  `,
  "@capacitor/filesystem": `
    export const Directory = { Cache: "CACHE" };
    export const Filesystem = {
      writeFile: async options => {
        globalThis.__mockState.writes.push(options);
        return { uri: "file:///cache/zuriel-share/card.png" };
      }
    };
  `,
  "@capacitor-community/media": `
    export const Media = {
      getAlbums: async () => ({ albums: globalThis.__mockState.albums }),
      createAlbum: async options => {
        globalThis.__mockState.albumCreates.push(options);
        globalThis.__mockState.albums.push({
          name: options.name,
          identifier: "zuriel-album-id"
        });
      },
      savePhoto: async options => {
        globalThis.__mockState.savedPhotos.push(options);
        return globalThis.__mockState.saveResult;
      }
    };
  `
};

const mockPlugin = {
  name: "mock-capacitor-native-plugins",
  setup(buildApi) {
    buildApi.onResolve({ filter: /^@capacitor(?:-community\/media|\/share|\/filesystem|\/core)$/ }, args => ({
      path: args.path,
      namespace: "zuriel-test-mock"
    }));
    buildApi.onLoad({ filter: /.*/, namespace: "zuriel-test-mock" }, args => ({
      contents: mocks[args.path],
      loader: "js"
    }));
  }
};

const built = await build({
  entryPoints: ["zuriel-native-media.js"],
  bundle: true,
  write: false,
  platform: "browser",
  format: "iife",
  target: ["es2020"],
  plugins: [mockPlugin]
});

const context = vm.createContext({
  window: {},
  __mockState: state,
  console
});
vm.runInContext(built.outputFiles[0].text, context);
const bridge = context.window.ZurielNativeMedia;
assert.ok(bridge, "native media bridge is registered");

const png = "data:image/png;base64,iVBORw0KGgo=";
const saved = await bridge.saveImageToGallery(png, "card.png");
assert.equal(saved.native, true);
assert.equal(saved.filePath, state.saveResult.filePath);
assert.deepEqual(state.albumCreates, [{ name: "Zuriel Living Word Bible" }]);
assert.equal(state.savedPhotos.length, 1);
assert.equal(state.savedPhotos[0].path, png);
assert.equal(state.savedPhotos[0].albumIdentifier, "zuriel-album-id");
assert.equal(state.savedPhotos[0].fileName, "card");

await bridge.shareImage(png, "card.png");
assert.equal(state.writes.length, 1);
assert.equal(state.writes[0].directory, "CACHE");
assert.equal(state.writes[0].recursive, true);
assert.equal(state.writes[0].data, "iVBORw0KGgo=");
assert.equal(state.shared.length, 1);
assert.deepEqual(state.shared[0].files, ["file:///cache/zuriel-share/card.png"]);

state.native = false;
const browserSave = await bridge.saveImageToGallery(png, "card.png");
const browserShare = await bridge.shareImage(png, "card.png");
assert.equal(browserSave.native, false);
assert.equal(browserShare.native, false);
assert.equal(state.savedPhotos.length, 1, "browser fallback does not call Android gallery APIs");
assert.equal(state.shared.length, 1, "browser fallback does not open Android share sheet");

state.native = true;
await assert.rejects(
  bridge.shareImage("data:image/jpeg;base64,AAAA", "bad.png"),
  /valid PNG/
);
state.saveResult = {};
await assert.rejects(
  bridge.saveImageToGallery(png, "missing-confirmation.png"),
  /did not confirm/
);
state.saveResult = { filePath: "/gallery/card.png" };
state.shareError = new Error("Android share failed");
await assert.rejects(bridge.shareImage(png, "card.png"), /Android share failed/);

console.log("Native media runtime tests passed: Android album creation, PNG gallery save confirmation, temporary share file, native share invocation, browser fallback, invalid PNG rejection and honest native failure propagation.");
