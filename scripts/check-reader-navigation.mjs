import fs from "node:fs";

const reader = fs.readFileSync("index.html", "utf8");
const navigator = fs.readFileSync("zuriel-grid-navigation.js", "utf8");
const home = fs.readFileSync("zuriel-home.js", "utf8");
const geography = fs.readFileSync("zuriel-geography.js", "utf8");
const study = fs.readFileSync("zuriel-study.js", "utf8");
const kingdom = fs.readFileSync("zuriel-kingdom-life.js", "utf8");
const library = fs.readFileSync("zuriel-library.js", "utf8");
const navigation = fs.readFileSync("zuriel-navigation.js", "utf8");

function requireMatch(source, pattern, message) {
  if (!pattern.test(source)) throw new Error(message);
}

requireMatch(
  reader,
  /main\s*\{[\s\S]*?width:\s*100%[\s\S]*?max-width:\s*1120px[\s\S]*?min-width:\s*0/,
  "The app main content must use the available screen width without exceeding the desktop reading limit."
);
requireMatch(
  reader,
  /#message\s*\{[\s\S]*?width:\s*100%[\s\S]*?max-width:\s*none[\s\S]*?text-align:\s*left[\s\S]*?overflow-wrap:\s*anywhere/,
  "The Scripture body must fill the reader width, stay left-aligned and wrap safely."
);
requireMatch(
  reader,
  /#message \.verse\s*\{[\s\S]*?width:\s*100%[\s\S]*?min-width:\s*0[\s\S]*?text-align:\s*left/,
  "Each verse must use the full available reading width without horizontal overflow."
);
requireMatch(
  reader,
  /@media\s*\(max-width:\s*480px\)[\s\S]*?\.card\s*\{[\s\S]*?padding:\s*14px/,
  "Reader and card padding must adapt to narrow phone screens."
);
requireMatch(
  reader,
  /window\.openChapter\s*=\s*function\s*\(book,\s*chapter\)[\s\S]*?\.catch\s*\(\s*function\s*\(error\)[\s\S]*?throw\s+error\s+instanceof\s+Error\s*\?/,
  "Reader navigation must rethrow chapter-loading errors so callers cannot report false success."
);
requireMatch(
  navigator,
  /await\s+window\.openChapter\(selectedBook,\s*selectedChapter\)[\s\S]*?expectedHeading[\s\S]*?if\s*\(selectedVerse\)[\s\S]*?data-verse-number/,
  "The full-screen passage navigator must verify the requested chapter and exact selected verse before closing."
);
requireMatch(
  reader,
  /window\.selectBibleVerse\s*=\s*function\s*\(verseNumber\)[\s\S]*?target\.click\(\)/,
  "The shared verse-selection action must activate the real reader verse handler."
);
requireMatch(
  reader,
  /paragraph\.addEventListener\("click"[\s\S]*?selectVerseForGloryCard\(index\s*\+\s*1,\s*displayVerseText\)/,
  "The real reader verse handler must prepare exact verse actions."
);
requireMatch(
  navigator,
  /window\.selectBibleVerse\(selectedVerse\)/,
  "The full-screen navigator must use the shared verse-selection action."
);
requireMatch(
  reader,
  /window\.selectBibleVerse\(item\.verse\)/,
  "Scripture search results must use the shared verse-selection action."
);
requireMatch(
  home,
  /window\.selectBibleVerse\(saved\.verse\)/,
  "Home Continue Reading must restore and activate the saved verse."
);
requireMatch(geography, /window\.selectBibleVerse\(reference\.verse\)/,
  "Bible Geography references must use the shared verse activation action.");
requireMatch(study, /window\.selectBibleVerse\(item\.verse\)/,
  "Advanced Study topical and word-occurrence links must use shared verse activation.");
requireMatch(study, /window\.selectBibleVerse\(verseNumber\)/,
  "Advanced Study connected Scripture links must use shared verse activation.");
requireMatch(kingdom, /window\.selectBibleVerse\(verse\)/,
  "Kingdom Life references must use shared verse activation.");
requireMatch(library, /window\.selectBibleVerse\(verseNumber\)/,
  "Words of Jesus references must use shared verse activation.");
requireMatch(library, /window\.selectBibleVerse\(Number\(match\[3\]\)\)/,
  "Saved-library bookmarks must use shared verse activation.");
requireMatch(home, /window\.selectBibleVerse\(Number\(match\[3\]\)\)/,
  "Home Scripture cards must use shared verse activation.");
requireMatch(navigation, /window\.selectBibleVerse\(number\)/,
  "The chapter-and-verse navigation panel must use shared verse activation.");
if (home.includes("setupHomePassageSelector") || home.includes("zurielHomePassageCard")) {
  throw new Error("The retired duplicate home passage selector must not return.");
}

requireMatch(navigator, /id="zgnDisplayVerse"[^>]*>DISPLAY VERSE/, "The passage selector must present an explicit DISPLAY VERSE action.");
requireMatch(navigator, /displayVerseButton\.addEventListener\("click", openPassage\)/, "The DISPLAY VERSE action must open the selected passage.");
requireMatch(navigator, /selectedVerse = n;[\s\S]*?displayVerseButton\.disabled = false;[\s\S]*?Tap DISPLAY VERSE to open the passage\./, "Selecting a verse must prepare the confirmation action without opening the passage automatically.");
if (/selectedVerse = n;[\s\S]*?openPassage\(\);/.test(navigator)) {
  throw new Error("Selecting a verse must not bypass the explicit DISPLAY VERSE confirmation.");
}
requireMatch(navigator, /button\.disabled = !ready[\s\S]*?secure translation service is not configured/, "Non-KJV shortcuts must not pretend to work before the secure translation service is configured.");
requireMatch(reader, /#message\s*\{[\s\S]*?border-bottom:\s*1px dashed #c9b77e/, "The reading page must use the requested dashed horizontal separator.");
console.log("Reader navigation checks passed: errors propagate, responsive reading width is enforced, explicit DISPLAY VERSE confirmation is required, translation availability is honest, and all verse links use shared activation.");
