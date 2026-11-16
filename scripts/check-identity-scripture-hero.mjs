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
requireText('}, 15000)', "Continuous timed identity rotation");
requireText('document.visibilityState === "hidden"', "Background rotation pause");
requireText('window.clearInterval(identityRotationTimer)', "Rotation timer cleanup");
requireText('@media(prefers-reduced-motion:reduce)', "Reduced-motion accessibility support");
requireText('identityNext.addEventListener("click"', "Manual rotation control");
requireText('identityRead.addEventListener("click"', "Direct passage navigation");

const titles = [...home.matchAll(/title: "([^"]+)", reference: "([^"]+)", wallpaper: (\d+) % homeWallpaperSet\.length/g)];
if (titles.length < 50) failures.push("The identity sequence must contain at least 50 curated entries.");
if (new Set(titles.map(item => item[1])).size !== titles.length) failures.push("Identity titles must be unique.");
if (titles.some(item => Number(item[3]) < 0 || Number(item[3]) >= titles.length)) failures.push("Each identity must use a valid rotating wallpaper index.");
if (!home.includes("% homeWallpaperSet.length")) failures.push("Wallpaper selection must wrap safely through the available image set.");
if (!home.includes('wallpaper: 53 % homeWallpaperSet.length')) failures.push("The expanded identity sequence must include its final curated entry.");

if (failures.length) {
  console.error("Identity Scripture hero checks failed:");
  failures.forEach(item => console.error(" - " + item));
  process.exitCode = 1;
} else {
  console.log("Identity Scripture hero checks passed: more than 50 curated identity/reference pairings, rotating wallpaper assignments, exact KJV retrieval, synchronized rotation, navigation, and accessibility safeguards.");
}
