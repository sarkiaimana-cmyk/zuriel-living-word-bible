import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1\.0, viewport-fit=cover">/,
  "The app must use the device viewport and account for display cutouts.");

const focus = html.match(/:where\(button, a, input, select, textarea, \[role="button"\], \[tabindex\]\):focus-visible\s*\{([^}]+)\}/);
assert.ok(focus, "All keyboard-operable controls must expose a visible focus indicator.");
assert.match(focus[1], /outline:\s*3px solid/);
assert.match(focus[1], /outline-offset:\s*3px/);

const coarse = html.match(/@media\s*\(pointer:\s*coarse\)\s*\{([\s\S]*?)\n\}/);
assert.ok(coarse, "Touch devices must receive a dedicated target-size rule.");
assert.match(coarse[1], /min-width:\s*44px/);
assert.match(coarse[1], /min-height:\s*44px/);
assert.match(coarse[1], /:where\(input, select, textarea\)[\s\S]*?min-height:\s*44px/);

const reduced = html.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}/);
assert.ok(reduced, "The interface must respect the operating-system reduced-motion preference.");
assert.match(reduced[1], /animation-duration:\s*0\.01ms\s*!important/);
assert.match(reduced[1], /transition-duration:\s*0\.01ms\s*!important/);
assert.match(reduced[1], /scroll-behavior:\s*auto\s*!important/);

console.log("Reader accessibility checks passed: viewport-fit, visible keyboard focus, 44px touch targets and reduced-motion support.");
