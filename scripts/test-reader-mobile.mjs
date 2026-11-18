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
  const translationRequests = [];
  await page.addInitScript(() => {
    window.ZURIEL_TRANSLATION_API_BASE = "https://zuriel-test-worker.example";
  });
  await page.route("https://zuriel-test-worker.example/**", async route => {
    const url = new URL(route.request().url());
    translationRequests.push(url.pathname + url.search);
    const headers = {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
      "cache-control": "no-store"
    };
    if (url.pathname === "/api/youversion/bibles") {
      return route.fulfill({
        status: 200, headers,
        body: JSON.stringify({
          data: [{
            id: 3034,
            abbreviation: "BSB",
            title: "Berean Standard Bible",
            language: { iso_639_1: "en", name: "English" }
          }]
        })
      });
    }
    if (url.pathname === "/api/youversion/bibles/3034/passages/GEN.1.1") {
      return route.fulfill({
        status: 200, headers,
        body: JSON.stringify({
          source: "YouVersion Platform",
          version: {
            id: 3034,
            abbreviation: "BSB",
            title: "Berean Standard Bible",
            publisher_name: "Test Bible Publisher",
            publisher_url: "https://publisher.example"
          },
          passage: {
            id: "GEN.1.1",
            reference: "Genesis 1:1",
            content: "In the beginning God created the heavens and the earth.",
            copyright: "Test publisher copyright",
            promotional_content: "Test publisher attribution"
          },
          format: "text",
          notice: "Online text is not stored for offline use."
        })
      });
    }
    return route.fulfill({ status: 404, headers, body: JSON.stringify({ error: "Not found" }) });
  });
  await page.route("https://bible.helloao.org/api/available_commentaries.json", route =>
    route.fulfill({
      status: 200,
      headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
      body: JSON.stringify({
        commentaries: [{
          id: "john-gill",
          name: "John Gill",
          englishName: "John Gill",
          language: "eng",
          licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
          availableFormats: ["json"],
          totalNumberOfVerses: 29707,
          numberOfBooks: 66,
          website: "https://en.wikipedia.org/wiki/John_Gill_(theologian)"
        }]
      })
    })
  );
  await page.route("https://bible.helloao.org/api/c/john-gill/GEN/1.simple.json", route =>
    route.fulfill({
      status: 200,
      headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
      body: JSON.stringify({
        chapter: {
          content: [{
            type: "verse",
            number: 1,
            text: "Historical commentary test note for Genesis 1:1."
          }]
        }
      })
    })
  );
  page.on("pageerror", error => pageErrors.push(error.message));
  await page.goto("http://127.0.0.1:4173/", { waitUntil:"domcontentloaded" });
  await page.locator('#zurielBottomNavigation button[data-section="read"]').click();
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

  // Historical commentary is source-filtered, verse-specific and cached for later offline reading.
  const historicalSection = page.locator("#zurielHistoricalCommentarySection");
  await historicalSection.locator("summary").click();
  const historicalSelect = page.locator("#zurielHistoricalCommentarySource");
  await page.waitForFunction(() => {
    const select = document.getElementById("zurielHistoricalCommentarySource");
    return select && !select.disabled && Array.from(select.options).some(option => option.value === "john-gill");
  }, { timeout:20000 });
  await historicalSelect.selectOption("john-gill");
  await page.locator("#zurielLoadHistoricalCommentary").click();
  await page.waitForFunction(() =>
    (document.getElementById("zurielHistoricalCommentaryResults")?.textContent || "")
      .includes("Historical commentary test note for Genesis 1:1.")
  );
  const historicalCache = await page.evaluate(async () => {
    const cache = await caches.open("zuriel-study-resources-v1");
    return {
      catalogue: Boolean(await cache.match("https://bible.helloao.org/api/available_commentaries.json")),
      chapter: Boolean(await cache.match("https://bible.helloao.org/api/c/john-gill/GEN/1.simple.json"))
    };
  });
  assert.deepEqual(historicalCache,{catalogue:true,chapter:true});
  assert.ok((await page.locator("#zurielHistoricalCommentaryResults").textContent()).includes("Public Domain Mark 1.0"));
  await page.keyboard.press("Escape");

  // Concordance counts every occurrence and supports short whole words.
  await firstVerse.click();
  const concordanceTools = actions.locator(".zuriel-action-group").filter({hasText:"Reading Tools"});
  await concordanceTools.locator("summary").click();
  await actions.locator(".zuriel-verse-action").filter({hasText:"Full Study Centre"}).click();
  await page.locator("#zurielConcordanceQuery").waitFor({state:"visible"});
  await page.locator("#zurielConcordanceMode").selectOption("word");
  await page.locator("#zurielConcordanceQuery").fill("faith");
  await page.locator("#zurielConcordanceSearch").click();
  await page.waitForFunction(() =>
    /Found \d+ occurrences across \d+ matching KJV verses/.test(
      document.getElementById("zurielConcordanceResults")?.textContent || ""
    )
  );
  assert.match(await page.locator("#zurielConcordanceResults").textContent(),/occurrences across/);
  await page.locator("#zurielConcordanceQuery").fill("I");
  await page.locator("#zurielConcordanceSearch").click();
  await page.waitForFunction(() =>
    /Found \d+ occurrences across \d+ matching KJV verses/.test(
      document.getElementById("zurielConcordanceResults")?.textContent || ""
    )
  );
  await page.keyboard.press("Escape");

  // The secure YouVersion client compares the exact selected verse beside offline KJV.
  await firstVerse.click();
  const toolsGroup = actions.locator(".zuriel-action-group").filter({hasText:"Reading Tools"});
  await toolsGroup.locator("summary").click();
  await actions.locator(".zuriel-verse-action").filter({hasText:"Compare translations"}).click();
  const translationPanel = page.locator("#zurielTranslationCompare");
  await translationPanel.waitFor({state:"visible"});
  const translationSelect = translationPanel.locator("select");
  await page.waitForFunction(() =>
    Array.from(document.querySelector("#zurielTranslationCompare select")?.options || [])
      .some(option => option.value === "3034")
  , { timeout:20000 });
  await translationSelect.selectOption("3034");
  await translationPanel.locator("button").click();
  await page.waitForFunction(() =>
    (document.querySelector("#zurielTranslationCompare .ztc-column:nth-child(2) .ztc-passage")?.textContent || "")
      .includes("In the beginning God created the heavens and the earth.")
  );
  assert.ok((await translationPanel.locator(".ztc-column:first-child .ztc-passage").textContent()).includes("In the beginning"));
  assert.ok((await translationPanel.locator(".ztc-attribution").textContent()).includes("Test Bible Publisher"));
  assert.equal(await translationPanel.locator(".ztc-attribution a").getAttribute("href"),"https://publisher.example");
  assert.ok(translationRequests.some(path => path === "/api/youversion/bibles/3034/passages/GEN.1.1?format=text"),
    "A verse comparison must request GEN.1.1, not the whole GEN.1 chapter.");
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
      study:Boolean(await cache.match("./zuriel-study.js")),
      translations:Boolean(await cache.match("./zuriel-translations.js")),
      config:Boolean(await cache.match("./zuriel-config.js")),
      gallery:Boolean(await cache.match("./zuriel-gallery.js"))
    };
  });
  assert.deepEqual(cachedAssets,{cache:true,kjv:true,commentary:true,study:true,translations:true,config:true,gallery:true});
  await context.setOffline(true);
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator('#zurielBottomNavigation button[data-section="read"]').click();
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

  // The same historical commentary chapter must still load from the device cache while offline.
  const offlineHistoricalSection = page.locator("#zurielHistoricalCommentarySection");
  await offlineHistoricalSection.locator("summary").click();
  await page.waitForFunction(() => {
    const select = document.getElementById("zurielHistoricalCommentarySource");
    return select && !select.disabled && Array.from(select.options).some(option => option.value === "john-gill");
  }, { timeout:20000 });
  await page.locator("#zurielHistoricalCommentarySource").selectOption("john-gill");
  await page.locator("#zurielLoadHistoricalCommentary").click();
  await page.waitForFunction(() =>
    (document.getElementById("zurielHistoricalCommentaryResults")?.textContent || "")
      .includes("Historical commentary test note for Genesis 1:1.")
  , { timeout:20000 });
  assert.equal(pageErrors.length,0,"No uncaught JavaScript errors: " + pageErrors.join(" | "));
  await context.setOffline(false);
  await context.close();
  console.log("Mobile browser checks passed: Pixel 7 viewport, full KJV chapter, contextual verse actions, dictionary and occurrence-aware concordance, public-domain historical commentary, cached study resources, exact-verse YouVersion comparison beside offline KJV, and offline reading.");
} finally {
  if (browser) await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
