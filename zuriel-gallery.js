/* Native file sharing and Android Pictures saving for Glory Verse Affirmation.
   The web app keeps a browser download/share fallback; no broad gallery permission is requested. */
(function () {
  "use strict";
  const ALBUM_PATH = "Zuriel Living Word Bible";
  function isNative() {
    return Boolean(window.Capacitor && typeof window.Capacitor.isNativePlatform === "function" &&
      window.Capacitor.isNativePlatform());
  }
  let nativePlugin = null;
  function getFileSharer() {
    if (!isNative()) return null;
    if (nativePlugin) return nativePlugin;
    const capacitor = window.Capacitor;
    nativePlugin = capacitor.Plugins && capacitor.Plugins.FileSharer
      ? capacitor.Plugins.FileSharer
      : (typeof capacitor.registerPlugin === "function" ? capacitor.registerPlugin("FileSharer") : null);
    if (!nativePlugin) throw new Error("The native sharing service is not installed in this Android build.");
    return nativePlugin;
  }
  function blobToDataUrl(blob) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () {
        if (typeof reader.result !== "string" || !reader.result.startsWith("data:image/")) {
          reject(new Error("The image could not be prepared for saving."));
          return;
        }
        resolve(reader.result);
      };
      reader.onerror = function () { reject(new Error("The image could not be read for export.")); };
      reader.readAsDataURL(blob);
    });
  }
  function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
  }
  async function saveImage(blob, fileName) {
    if (!(blob instanceof Blob) || !blob.size) throw new Error("There is no image to save.");
    if (!isNative()) {
      downloadBlob(blob, fileName);
      return { destination: "downloads" };
    }
    const plugin = getFileSharer();
    const result = await plugin.save({
      filename: fileName,
      contentType: "image/png",
      base64Data: await blobToDataUrl(blob),
      android: { saveDirectory: "pictures", relativePath: ALBUM_PATH }
    });
    return { destination: "gallery", uri: result && result.uri ? result.uri : "" };
  }
  async function shareImage(blob, fileName, title, text) {
    if (!(blob instanceof Blob) || !blob.size) throw new Error("There is no image to share.");
    if (!isNative()) {
      const file = new File([blob], fileName, { type: "image/png" });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: title || "Glory Verse Affirmation", text: text || "" });
          return { destination: "shared" };
        } catch (error) {
          if (error && error.name === "AbortError") return { cancelled: true };
          throw error;
        }
      }
      downloadBlob(blob, fileName);
      return { destination: "downloads" };
    }
    const plugin = getFileSharer();
    try {
      await plugin.share({
        filename: fileName,
        contentType: "image/png",
        base64Data: await blobToDataUrl(blob),
        title: title || "Glory Verse Affirmation",
        text: text || "His Words.. My life.. My Victory"
      });
      return { destination: "shared" };
    } catch (error) {
      const code = String(error && (error.code || error.message) || "");
      if (/USER_CANCELLED|cancelled|canceled/i.test(code)) return { cancelled: true };
      throw error;
    }
  }
  window.ZurielGallery = { isNative: isNative, saveImage: saveImage, shareImage: shareImage };
})();
