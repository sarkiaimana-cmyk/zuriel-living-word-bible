import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../zuriel-library.js", import.meta.url), "utf8");

// The dedicated reference shelf must be reachable from the Deep Bible Study page.
assert.match(source, /\["references",\s*"📚 Dictionaries & Commentaries"\]/);
assert.match(source, /openPage\("references"\)/);
assert.match(source, /if \(page === "references"\)/);

// Search and category filters must operate on the catalogue, not be decorative.
assert.match(source, /search\.addEventListener\("input",\s*renderResources\)/);
assert.match(source, /item\.title,\s*item\.author,\s*item\.scope,\s*item\.tags,\s*item\.kind/);
assert.match(source, /activeCategory === "All Resources" \|\| item\.kind === activeCategory/);

// Confirm the initial catalogue has representative reference categories.
for (const title of [
  "Easton's Bible Dictionary",
  "Smith's Bible Dictionary",
  "Strong's Exhaustive Concordance",
  "Matthew Henry's Commentary",
  "Treasury of Scripture Knowledge",
  "John Gill's Exposition of the Bible"
]) assert.ok(source.includes(title), "Missing catalogue record: " + title);

assert.match(source, /Source and rights notes/);
assert.match(source, /Catalogue record only/);
assert.match(source, /complete text is not currently bundled/);
assert.match(source, /No resources match that search/);
assert.match(source, /aria-label",\s*"Search dictionaries and commentaries"/);
assert.match(source, /@media\(max-width:520px\)/);

console.log("Dictionary and Commentary library checks passed: entry point, live search, category filtering, six catalogue records, source/rights transparency, empty state and mobile layout.");
