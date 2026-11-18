import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "playwright";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const mime = {
  ".html":"text/html; charset=utf-8",
  ".js":"text/javascript; charset=utf-8",
  ".css":"text/css; charset=utf-8",
  ".json":"application/json; charset=utf-8",
  ".png":"image/png",
  ".jpg":"image/jpeg",
  ".jpeg":"image/jpeg",
  ".webp":"image/webp",
  ".svg":"image/svg+xml"
};
const server = createServer(async (request,response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url || "/", "http://127.0.0.1").pathname);
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const target = resolve(root, relative);
    if (target !== root && !target.startsWith(root + sep)) {
      response.writeHead(403); response.end("Forbidden"); return;
    }
    const body = await readFile(target);
    response.writeHead(200, {
      "Content-Type": mime[extname(target).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(body);
  } catch {
    response.writeHead(404); response.end("Not found");
  }
});
await new Promise((resolveListen,reject) => {
  server.once("error",reject);
  server.listen(4173,"127.0.0.1",resolveListen);
});

let browser;
const pageErrors = [];
try {
  browser = await chromium.launch({ headless:true });
  const context = await browser.newContext({
    ...devices["Pixel 7"],
    acceptDownloads:true,
    serviceWorkers:"allow"
  });
  const page = await context.newPage();
  page.on("pageerror", error => pageErrors.push(error.message));
  await page.goto("http://127.0.0.1:4173/", { waitUntil:"domcontentloaded" });
  await page.locator("#zurielBottomNavigation button[data-section="read"]").click();
  await page.locator("#zurielGridLaunch").waitFor({ state:"visible", timeout:20000 });
  assert.equal(await page.title(),"Zuriel Living Word Bible");

  // Mobile navigation and full KJV chapter rendering.
  await page.locator("#zurielGridLaunch").click();
  await page.locator("#zgnReferenceInput").fill("Genesis 1");
  await page.locator("#zgnGo").click();
  await page.locator("#message h2").waitFor({ state:"visible", timeout:20000 });
  assert.equal((await page.locator("#message h2").textContent()).trim(),
    "Genesis 1 — King James Version");
  assert.ok(await page.locator("#message .verse").count() >= 31,
    "Genesis 1 must render the complete chapter verse-by-verse.");

  // Verse actions remain contextual and the dictionary opens from the selected verse.
  const firstVerse = page.locator('#message .verse[data-verse-number="1"]');
  await firstVerse.click();
  const actions = page.locator("#zurielVerseActions");
  await page.waitForFunction(() => {
    const element = document.getElementById("zurielVerseActions");
    return element && !element.hidden;
  });
  assert.equal(await firstVerse.getAttribute("aria-expanded"),"true");
  const studyGroup = actions.locator(".zuriel-action-group").filter({hasText:"Study & Understanding"});
  await studyGroup.locator("summary").click();
  await actions.locator(".zuriel-verse-action").filter({hasText:"Dictionary"}).click();
  await page.locator("#zurielDictionarySearch").waitFor({state:"visible"});
  await page.locator("#zurielDictionarySearch").fill("faith");
  await page.waitForFunction(() =>
    (document.getElementById("zurielDictionaryResults")?.textContent || "").toLowerCase().includes("faith")
  );
  assert.ok(await page.locator("#zurielDictionaryResults").textContent());

  // Escape returns the study panel to its original reader location.
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => {
    const element = document.getElementById("zurielVerseActions");
    return element && element.hidden;
  });

  // Selected-verse commentary resolves the matching passage and its caution.
  await firstVerse.click();
  const studyGroupAgain = actions.locator(".zuriel-action-group").filter({hasText:"Study & Understanding"});
  await studyGroupAgain.locator("summary").click();
  await actions.locator(".zuriel-verse-action").filter({hasText:"Commentary & theology"}).click();
  await page.waitForFunction(() =>
    (document.getElementById("zurielPassageCommentaryResults")?.textContent || "").includes("Creation")
  , { timeout:20000 });
  assert.ok((await page.locator("#zurielPassageCommentaryResults").textContent()).includes("Interpretive caution"));
  await page.locator("#zurielCommentarySearch").fill("creation");
  await page.waitForFunction(() =>
    (document.getElementById("zurielPassageCommentaryResults")?.textContent || "").includes("Creation")
  );
  await page.keyboard.press("Escape");

  // The comparison panel fails safely until the licensed proxy is deployed.
  await firstVerse.click();
  const toolsGroup = actions.locator(".zuriel-action-group").filter({hasText:"Reading Tools"});
  await toolsGroup.locator("summary").click();
  await actions.locator(".zuriel-verse-action").filter({hasText:"Compare translations"}).click();
  await page.locator("#zurielTranslationCompare").waitFor({state:"visible"});
  const translationStatus = await page.locator("#zurielTranslationCompare .ztc-status").textContent();
  assert.match(translationStatus,/not connected yet|not been connected yet/i);
  await page.keyboard.press("Escape");

  // Confirm the offline shell has the Bible and commentary assets, then read them with network disabled.
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForFunction(() => Boolean(navigator.serviceWorker && navigator.serviceWorker.controller), { timeout:20000 });
  const cachedAssets = await page.evaluate(async () => {
    const names = await caches.keys();
    const name = names.find(item => item.startsWith("zuriel-bible-offline-"));
    if (!name) return {cache:false};
    const cache = await caches.open(name);
    return {
      cache:true,
      kjv:Boolean(await cache.match("./kjv.72bec70fcd.json")),
      commentary:Boolean(await cache.match("./zuriel-passage-commentary-expansion.json")),
      gallery:Boolean(await cache.match("./zuriel-gallery.js"))
    };
  });
  assert.deepEqual(cachedAssets,{cache:true,kjv:true,commentary:true,gallery:true});
  await context.setOffline(true);
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator("#zurielBottomNavigation button[data-section="read"]").click();
  await page.locator("#zurielGridLaunch").waitFor({state:"visible",timeout:20000});
  await page.locator("#zurielGridLaunch").click();
  await page.locator("#zgnReferenceInput").fill("Genesis 1");
  await page.locator("#zgnGo").click();
  await page.locator("#message .verse").first().waitFor({state:"visible",timeout:20000});
  assert.ok(await page.locator("#message .verse").count() >= 31,
    "The full KJV chapter must still open when offline.");

  await page.locator('#message .verse[data-verse-number="1"]').click();
  const offlineActions = page.locator("#zurielVerseActions");
  await offlineActions.locator(".zuriel-action-group").filter({hasText:"Study & Understanding"}).locator("summary").click();
  await offlineActions.locator(".zuriel-verse-action").filter({hasText:"Commentary & theology"}).click();
  await page.waitForFunction(() =>
    (document.getElementById("zurielPassageCommentaryResults")?.textContent || "").includes("Creation")
  , { timeout:20000 });
  assert.equal(pageErrors.length,0,"No uncaught JavaScript errors: " + pageErrors.join(" | "));
  await context.setOffline(false);
  await context.close();
  console.log("Mobile browser checks passed: Pixel 7 viewport, full KJV chapter, verse actions, dictionary search, passage commentary, translation-not-configured fallback, service-worker asset cache and offline KJV/commentary reading.");
} finally {
  if (browser) await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
