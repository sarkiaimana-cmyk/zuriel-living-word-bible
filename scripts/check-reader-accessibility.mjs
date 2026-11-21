import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1\.0, viewport-fit=cover">/,
  "The app must use the device viewport and account for display cutouts.");

const focus = html.match(/:where\(button, a, input, select, textarea, \[role="button"\], \[tabindex\]\):focus-visible\s*\{([^}]+)\}/);
assert.ok(focus, "All keyboard-operable controls must expose a visible focus indicator.");
assert.match(focus[1], /outline:\s*3px solid/);
assert.match(focus[1], /outline-offset:\s*3px/);

const coarseStart = html.indexOf("@media (pointer: coarse)");
const reducedStart = html.indexOf("@media (prefers-reduced-motion: reduce)");
assert.ok(coarseStart >= 0 && reducedStart > coarseStart, "Touch and reduced-motion media queries must be present.");
const coarse = html.slice(coarseStart, reducedStart);
assert.match(coarse, /min-width:\s*44px/);
assert.match(coarse, /min-height:\s*44px/);
assert.match(coarse, /:where\(input, select, textarea\)[\s\S]*?min-height:\s*44px/);

const reduced = html.slice(reducedStart, html.indexOf("</style>", reducedStart));
assert.ok(reduced.length > 0, "The interface must respect the operating-system reduced-motion preference.");
assert.match(reduced, /animation-duration:\s*0\.01ms\s*!important/);
assert.match(reduced, /transition-duration:\s*0\.01ms\s*!important/);
assert.match(reduced, /scroll-behavior:\s*auto\s*!important/);

console.log("Reader accessibility checks passed: viewport-fit, visible keyboard focus, 44px touch targets and reduced-motion support.");
