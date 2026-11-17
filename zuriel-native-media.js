import { Capacitor } from "@capacitor/core";
import { Share } from "@capacitor/share";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Media } from "@capacitor-community/media";

const ALBUM_NAME = "Zuriel Living Word Bible";

function isNativeAndroid() {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";
}

function dataUrlParts(dataUrl) {
  const match = /^data:image\/png;base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ""));
  if (!match) throw new Error("The generated card image is not a valid PNG.");
  return match[1];
}

async function ensureAlbum() {
  const current = await Media.getAlbums();
  let album = (current.albums || []).find(item => item.name === ALBUM_NAME);
  if (!album) {
    await Media.createAlbum({ name: ALBUM_NAME });
    const refreshed = await Media.getAlbums();
    album = (refreshed.albums || []).find(item => item.name === ALBUM_NAME);
  }
  if (!album || !album.identifier) {
    throw new Error("Zuriel could not access its photo album. Please check gallery access and try again.");
  }
  return album.identifier;
}

async function saveImageToGallery(dataUrl, fileName) {
  if (!isNativeAndroid()) return { native: false };
  const albumIdentifier = await ensureAlbum();
  const result = await Media.savePhoto({
    path: dataUrl,
    albumIdentifier,
    fileName: String(fileName || "Zuriel-Glory-Verse").replace(/\.png$/i, "")
  });
  if (!result || !result.filePath) {
    throw new Error("Android did not confirm that the card was saved to the gallery.");
  }
  return { native: true, filePath: result.filePath };
}

async function shareImage(dataUrl, fileName) {
  if (!isNativeAndroid()) return { native: false };
  const name = String(fileName || "Zuriel-Glory-Verse.png").replace(/[^a-z0-9._-]/gi, "-");
  const base64 = dataUrlParts(dataUrl);
  const saved = await Filesystem.writeFile({
    path: "zuriel-share/" + name,
    data: base64,
    directory: Directory.Cache,
    recursive: true
  });
  if (!saved || !saved.uri) {
    throw new Error("The temporary card image could not be prepared for sharing.");
  }
  await Share.share({
    title: "Glory Verse Affirmation",
    text: "His Words.. My life.. My Victory",
    files: [saved.uri],
    dialogTitle: "Share your Zuriel Scripture card"
  });
  return { native: true };
}

window.ZurielNativeMedia = Object.freeze({
  isNativeAndroid,
  saveImageToGallery,
  shareImage
});
