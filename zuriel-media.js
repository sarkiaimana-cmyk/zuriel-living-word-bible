(function () {
  "use strict";

  const capacitor = window.Capacitor || null;
  let mediaPlugin = null;
  let sharePlugin = null;
  let filesystemPlugin = null;

  // Capacitor exposes the registered native plugin bridge at runtime.
  // Keep this file framework-free so the same app continues to work on GitHub Pages.
  if (capacitor && typeof capacitor.registerPlugin === "function") {
    mediaPlugin = capacitor.registerPlugin("Media");
    sharePlugin = capacitor.registerPlugin("Share");
    filesystemPlugin = capacitor.registerPlugin("Filesystem");
  }

  function isAvailable() {
    return !!(
      capacitor &&
      typeof capacitor.isNativePlatform === "function" &&
      capacitor.isNativePlatform() &&
      typeof capacitor.isPluginAvailable === "function" &&
      capacitor.isPluginAvailable("Media") &&
      mediaPlugin
    );
  }

  async function getOrCreateAlbum(name) {
    let response = await mediaPlugin.getAlbums();
    let albums = response && Array.isArray(response.albums) ? response.albums : [];
    let album = albums.find(item => item && item.name === name);

    if (!album) {
      await mediaPlugin.createAlbum({ name: name });
      response = await mediaPlugin.getAlbums();
      albums = response && Array.isArray(response.albums) ? response.albums : [];
      album = albums.find(item => item && item.name === name);
    }

    if (!album || !album.identifier) {
      throw new Error("Zuriel could not create or locate its Gallery album. Please check the app's photo access and try again.");
    }

    return album.identifier;
  }


  function canShareImage() {
    return !!(
      capacitor &&
      typeof capacitor.isNativePlatform === "function" &&
      capacitor.isNativePlatform() &&
      typeof capacitor.isPluginAvailable === "function" &&
      capacitor.isPluginAvailable("Share") &&
      capacitor.isPluginAvailable("Filesystem") &&
      sharePlugin &&
      filesystemPlugin
    );
  }

  async function shareImage(options) {
    if (!canShareImage()) {
      throw new Error("Direct image sharing is available in the installed Android app. Use the browser's sharing or download option.");
    }

    const dataUrl = String(options && options.dataUrl || "");
    const fileName = String(options && options.fileName || "Zuriel-Glory-Verse.png");
    const prefix = "data:image/png;base64,";
    if (!dataUrl.startsWith(prefix) || !/^[A-Za-z0-9+/=]+$/.test(dataUrl.slice(prefix.length))) {
      throw new Error("The open-book image was not a valid PNG. Please create it again.");
    }

    const extension = fileName.lastIndexOf(".");
    const baseName = extension > 0 ? fileName.slice(0, extension) : fileName;
    const safeName = baseName
      .replace(/[^a-z0-9_-]+/gi, "-")
      .replace(/^-+|-+$/g, "") || "Zuriel-Glory-Verse";
    const saved = await filesystemPlugin.writeFile({
      path: "zuriel-share/" + safeName + ".png",
      data: dataUrl.slice(prefix.length),
      directory: "CACHE",
      recursive: true
    });
    if (!saved || !saved.uri) {
      throw new Error("The temporary card image could not be prepared for sharing.");
    }

    await sharePlugin.share({
      title: "Glory Verse Affirmation",
      text: "His Words.. My life.. My Victory",
      files: [saved.uri],
      dialogTitle: "Share your Zuriel Scripture card"
    });
    return { shared: true };
  }

  async function saveImage(options) {
    if (!isAvailable()) {
      throw new Error("Direct Gallery saving is available in the installed Android app. Use Download PNG in your browser.");
    }

    const dataUrl = String(options && options.dataUrl || "");
    const fileName = String(options && options.fileName || "Zuriel-Glory-Verse.png");
    if (!/^data:image\/png;base64,/i.test(dataUrl)) {
      throw new Error("The open-book image was not a valid PNG. Please create it again.");
    }

    const safeName = fileName
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9_-]+/gi, "-")
      .replace(/^-+|-+$/g, "") || "Zuriel-Glory-Verse";
    const albumName = "Zuriel Living Word Bible";
    const albumIdentifier = await getOrCreateAlbum(albumName);
    const result = await mediaPlugin.savePhoto({
      path: dataUrl,
      albumIdentifier: albumIdentifier,
      fileName: safeName
    });

    if (!result || !result.filePath) {
      throw new Error("Android did not confirm that the image was saved to the Gallery.");
    }

    return { filePath: result.filePath, albumName: albumName, fileName: safeName + ".png" };
  }

  window.ZurielMedia = {
    isAvailable: isAvailable,
    canShareImage: canShareImage,
    shareImage: shareImage,
    saveImage: saveImage
  };
})();
