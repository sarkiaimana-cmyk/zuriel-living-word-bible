import { readFile } from "node:fs/promises";

const home = await readFile(new URL("../zuriel-home.js", import.meta.url), "utf8");
const failures = [];
function requireText(fragment, label) {
  if (!home.includes(fragment)) failures.push(label + " is missing.");
}

requireText('id="zurielIdentityHero"', "The dedicated top identity Scripture hero");
requireText('id="zurielIdentityTitle"', "The rotating identity title");
requireText('id="zurielIdentityVerse"', "The exact Scripture text region");
requireText('id="zurielIdentityReference"', "The Scripture reference");
requireText('id="zurielIdentityRead"', "The direct Scripture reader action");
requireText('id="zurielIdentityNext"', "The manual next-revelation action");
requireText('title: "My Healer", reference: "Psalm 103:3"', "The healer Scripture pairing");
requireText('title: "My Comforter", reference: "John 14:16"', "The Comforter Scripture pairing");
requireText('title: "My Provider", reference: "Genesis 22:14"', "The provider Scripture pairing");
requireText('title: "Everlasting Father", reference: "Isaiah 9:6"', "The everlasting Father Scripture pairing");
requireText('title: "The Glorious King", reference: "Psalm 24:10"', "The glorious King Scripture pairing");
requireText('window.getBibleVerseText(item.reference)', "Exact offline KJV text retrieval");
requireText('dashboard.style.setProperty("--zuriel-home-wallpaper"', "Synchronized verse and wallpaper changes");
requireText('homeWallpaperSet[item.wallpaper]', "A distinct wallpaper assignment for each identity");
requireText('}, 16000)', "Continuous timed identity rotation");
requireText('document.visibilityState === "hidden"', "Background rotation pause");
requireText('window.clearInterval(identityRotationTimer)', "Rotation timer cleanup");
requireText('@media(prefers-reduced-motion:reduce)', "Reduced-motion accessibility support");
requireText('identityNext.addEventListener("click"', "Manual rotation control");
requireText('identityRead.addEventListener("click"', "Direct passage navigation");

const titles = [...home.matchAll(/title: "([^"]+)", reference: "([^"]+)", wallpaper: (\d+)/g)];
if (titles.length !== 5) failures.push("The initial identity sequence must contain exactly five curated entries.");
if (new Set(titles.map(item => item[1])).size !== titles.length) failures.push("Identity titles must be unique.");
if (new Set(titles.map(item => item[2])).size !== titles.length) failures.push("Identity Scripture references must be unique.");
if (new Set(titles.map(item => item[3])).size !== titles.length) failures.push("Each identity must use its own wallpaper slot.");

if (failures.length) {
  console.error("Identity Scripture hero checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Identity Scripture hero checks passed: five unique identity/reference/wallpaper pairings, exact KJV retrieval, synchronized rotation, navigation, and accessibility safeguards.");
}
