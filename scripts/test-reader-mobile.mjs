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
const baseUrl = "http://127.0.0.1:4173/";
try {
  browser = await chromium.launch({ headless:true });

  // Online UI tests use deterministic mock services with service workers disabled,
  // so the network fixtures cannot be hidden behind an already-installed worker.
  const onlineContext = await browser.newContext({
    ...devices["Pixel 7"], acceptDownloads:true, serviceWorkers:"block"
  });
  const page = await onlineContext.newPage();
  const translationRequests = [];
  async function ensureOpen(details) {
    if (!(await details.evaluate(element => element.open))) await details.locator("summary").click();
  }
  await page.route("**/zuriel-config.js", route => route.fulfill({
    status:200,
    contentType:"application/javascript",
    body:'window.ZURIEL_TRANSLATION_API_BASE = "https://zuriel-test-worker.example";'
  }));
  await page.route("https://zuriel-test-worker.example/**", async route => {
    const url = new URL(route.request().url());
    translationRequests.push(url.pathname + url.search);
    const headers = {
      "content-type":"application/json",
      "access-control-allow-origin":"*",
      "cache-control":"no-store"
    };
    if (url.pathname === "/api/youversion/bibles") {
      return route.fulfill({
        status:200, headers,
        body:JSON.stringify({
          data:[{
            id:3034,
            abbreviation:"BSB",
            title:"Berean Standard Bible",
            language:{iso_639_1:"en",name:"English"}
          }]
        })
      });
    }
    if (url.pathname === "/api/youversion/bibles/3034/passages/GEN.1.1") {
      return route.fulfill({
        status:200, headers,
        body:JSON.stringify({
          source:"YouVersion Platform",
          version:{
            id:3034,
            abbreviation:"BSB",
            title:"Berean Standard Bible",
            publisher_name:"Test Bible Publisher",
            publisher_url:"https://publisher.example"
          },
          passage:{
            id:"GEN.1.1",
            reference:"Genesis 1:1",
            content:"In the beginning God created the heavens and the earth.",
            copyright:"Test publisher copyright",
            promotional_content:"Test publisher attribution"
          },
          format:"text",
          notice:"Online text is not stored for offline use."
        })
      });
    }
    return route.fulfill({status:404,headers,body:JSON.stringify({error:"Not found"})});
  });
  await page.route("https://bible.helloao.org/api/available_commentaries.json", route =>
    route.fulfill({
      status:200,
      headers:{"content-type":"application/json","access-control-allow-origin":"*"},
      body:JSON.stringify({
        commentaries:[{
          id:"john-gill",
          name:"John Gill",
          englishName:"John Gill",
          language:"eng",
          licenseUrl:"https://creativecommons.org/publicdomain/mark/1.0/",
          availableFormats:["json"],
          totalNumberOfVerses:29707,
          numberOfBooks:66,
          website:"https://en.wikipedia.org/wiki/John_Gill_(theologian)"
        }]
      })
    })
  );
  await page.route("https://bible.helloao.org/api/c/john-gill/GEN/1.simple.json", route =>
    route.fulfill({
      status:200,
      headers:{"content-type":"application/json","access-control-allow-origin":"*"},
      body:JSON.stringify({
        chapter:{content:[{type:"verse",number:1,text:"Historical commentary test note for Genesis 1:1."}]}
      })
    })
  );
  page.on("pageerror", error => pageErrors.push("online: " + (error.stack || error.message)));
  await page.goto(baseUrl,{waitUntil:"domcontentloaded"});
  await page.locator('#zurielBottomNavigation button[data-section="read"]').click();
  const readNavigationState = await page.evaluate(() => {
    const reader = document.getElementById("bibleReader");
    const launch = document.getElementById("zurielGridLaunch");
    const chain = [];
    for (let node = launch; node && chain.length < 6; node = node.parentElement) {
      const style = getComputedStyle(node);
      chain.push({tag:node.tagName,id:node.id,hidden:node.hidden,display:style.display,visibility:style.visibility});
    }
    return {
      readerHidden:reader ? reader.hidden : null,
      readerDisplay:reader ? getComputedStyle(reader).display : null,
      launchExists:Boolean(launch),
      launchHidden:launch ? launch.hidden : null,
      chain,
      activeRead:Boolean(document.querySelector('#zurielBottomNavigation button[data-section="read"].active'))
    };
  });
  console.log("Mobile read navigation state:", JSON.stringify(readNavigationState), "page errors:", pageErrors);
  await page.locator("#zurielGridLaunch").waitFor({state:"visible",timeout:20000});
  assert.equal(await page.title(),"Zuriel Living Word Bible");

  // Mobile navigation and full KJV chapter rendering.
  await page.locator("#zurielGridLaunch").click();
  await page.locator("#zgnReferenceInput").fill("Genesis 1");
  await page.locator("#zgnGo").click();
  await page.locator("#message h2").waitFor({state:"visible",timeout:20000});
  assert.equal((await page.locator("#message h2").textContent()).trim(),"Genesis 1 — King James Version");
  assert.ok(await page.locator("#message .verse").count() >= 31,
    "Genesis 1 must render the complete chapter verse-by-verse.");

  // Contextual verse menu and offline Biblical Dictionary search.
  const firstVerse = page.locator('#message .verse[data-verse-number="1"]');
  const actions = page.locator("#zurielVerseActions");
  await firstVerse.click();
  await page.waitForFunction(() => {
    const element = document.getElementById("zurielVerseActions");
    return element && !element.hidden;
  });
  assert.equal(await firstVerse.getAttribute("aria-expanded"),"true");
  const studyGroup = actions.locator(".zuriel-action-group").filter({hasText:"Study & Understanding"});
  await ensureOpen(studyGroup);
  await actions.locator(".zuriel-verse-action").filter({hasText:"Dictionary"}).click();
  await page.locator("#zurielDictionarySearch").waitFor({state:"visible"});
  await page.locator("#zurielDictionarySearch").fill("faith");
  await page.waitForFunction(() =>
    (document.getElementById("zurielDictionaryResults")?.textContent || "").toLowerCase().includes("faith")
  );
  assert.ok(await page.locator("#zurielDictionaryResults").textContent());
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => {
    const element = document.getElementById("zurielVerseActions");
    return element && element.hidden;
  });

  // Selected-verse commentary and its interpretive caution.
  await firstVerse.click();
  await ensureOpen(actions.locator(".zuriel-action-group").filter({hasText:"Study & Understanding"}));
  await actions.locator(".zuriel-verse-action").filter({hasText:"Commentary & theology"}).click();
  await page.waitForFunction(() =>
    (document.getElementById("zurielPassageCommentaryResults")?.textContent || "").includes("Creation")
  ,null,{timeout:20000});
  assert.ok((await page.locator("#zurielPassageCommentaryResults").textContent()).includes("Interpretive caution"));
  await page.locator("#zurielCommentarySearch").fill("creation");
  await page.waitForFunction(() =>
    (document.getElementById("zurielPassageCommentaryResults")?.textContent || "").includes("Creation")
  );
  await page.keyboard.press("Escape");

  // Public-domain historical commentary: source, exact verse, attribution and cached response.
  await firstVerse.click();
  await ensureOpen(actions.locator(".zuriel-action-group").filter({hasText:"Reading Tools"}));
  await actions.locator(".zuriel-verse-action").filter({hasText:"Full Study Centre"}).click();
  const historicalSection = page.locator("#zurielHistoricalCommentarySection");
  await ensureOpen(historicalSection);
  const historicalSelect = page.locator("#zurielHistoricalCommentarySource");
  await page.waitForFunction(() => {
    const select = document.getElementById("zurielHistoricalCommentarySource");
    return select && !select.disabled && Array.from(select.options).some(option => option.value === "john-gill");
  },null,{timeout:20000});
  await historicalSelect.selectOption("john-gill");
  await page.locator("#zurielLoadHistoricalCommentary").click();
  await page.waitForFunction(() =>
    (document.getElementById("zurielHistoricalCommentaryResults")?.textContent || "")
      .includes("Historical commentary test note for Genesis 1:1.")
  );
  const historicalCache = await page.evaluate(async () => {
    const cache = await caches.open("zuriel-study-resources-v1");
    return {
      catalogue:Boolean(await cache.match("https://bible.helloao.org/api/available_commentaries.json")),
      chapter:Boolean(await cache.match("https://bible.helloao.org/api/c/john-gill/GEN/1.simple.json"))
    };
  });
  assert.deepEqual(historicalCache,{catalogue:true,chapter:true});
  assert.ok((await page.locator("#zurielHistoricalCommentaryResults").textContent()).includes("Public Domain Mark 1.0"));
  await page.keyboard.press("Escape");

  // Concordance whole-word search and exact occurrence counts.
  await firstVerse.click();
  const concordanceTools = actions.locator(".zuriel-action-group").filter({hasText:"Reading Tools"});
  await ensureOpen(concordanceTools);
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

  // Mocked online YouVersion comparison proves the exact selected verse and publisher attribution.
  await firstVerse.click();
  const toolsGroup = actions.locator(".zuriel-action-group").filter({hasText:"Reading Tools"});
  await ensureOpen(toolsGroup);
  await actions.locator(".zuriel-verse-action").filter({hasText:"Compare translations"}).click();
  const translationPanel = page.locator("#zurielTranslationCompare");
  await translationPanel.waitFor({state:"visible"});
  const translationSelect = translationPanel.locator("select");
  await page.waitForFunction(() =>
    Array.from(document.querySelector("#zurielTranslationCompare select")?.options || [])
      .some(option => option.value === "3034")
  ,null,{timeout:20000});
  await translationSelect.selectOption("3034");
  await translationPanel.locator("button").click();
  await page.waitForFunction(() =>
    (document.querySelector("#zurielTranslationCompare .ztc-column:nth-child(2) .ztc-passage")?.textContent || "")
      .includes("In the beginning God created the heavens and the earth.")
  );
  assert.ok((await translationPanel.locator(".ztc-column:first-child .ztc-passage").textContent()).includes("In the beginning"));
  assert.ok((await translationPanel.locator(".ztc-attribution").textContent()).includes("Test Bible Publisher"));
  assert.equal(await translationPanel.locator(".ztc-attribution a").getAttribute("href"),"https://publisher.example/");
  assert.ok(translationRequests.some(path => path === "/api/youversion/bibles/3034/passages/GEN.1.1?format=text"),
    "A verse comparison must request GEN.1.1, not the whole GEN.1 chapter.");
  await onlineContext.close();

  // A fresh context tests actual service-worker installation and offline KJV/commentary access.
  const offlineContext = await browser.newContext({
    ...devices["Pixel 7"], acceptDownloads:true, serviceWorkers:"allow"
  });
  const offlinePage = await offlineContext.newPage();
  offlinePage.on("pageerror", error => pageErrors.push("offline: " + error.message));
  await offlinePage.goto(baseUrl,{waitUntil:"domcontentloaded"});
  await offlinePage.locator('#zurielBottomNavigation button[data-section="read"]').click();
  await offlinePage.locator("#zurielGridLaunch").waitFor({state:"visible",timeout:20000});
  await offlinePage.evaluate(async () => { await navigator.serviceWorker.ready; });
  await offlinePage.reload({waitUntil:"domcontentloaded"});
  await offlinePage.waitForFunction(() =>
    Boolean(navigator.serviceWorker && navigator.serviceWorker.controller)
  ,null,{timeout:20000});
  const cachedAssets = await offlinePage.evaluate(async () => {
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
  await offlineContext.setOffline(true);
  await offlinePage.reload({waitUntil:"domcontentloaded"});
  await offlinePage.locator('#zurielBottomNavigation button[data-section="read"]').click();
  await offlinePage.locator("#zurielGridLaunch").waitFor({state:"visible",timeout:20000});
  await offlinePage.locator("#zurielGridLaunch").click();
  await offlinePage.locator("#zgnReferenceInput").fill("Genesis 1");
  await offlinePage.locator("#zgnGo").click();
  await offlinePage.locator("#message .verse").first().waitFor({state:"visible",timeout:20000});
  assert.ok(await offlinePage.locator("#message .verse").count() >= 31,
    "The full KJV chapter must still open when offline.");
  await offlinePage.locator('#message .verse[data-verse-number="1"]').click();
  const offlineActions = offlinePage.locator("#zurielVerseActions");
  await ensureOpen(offlineActions.locator(".zuriel-action-group").filter({hasText:"Study & Understanding"}));
  await offlineActions.locator(".zuriel-verse-action").filter({hasText:"Commentary & theology"}).click();
  await offlinePage.waitForFunction(() =>
    (document.getElementById("zurielPassageCommentaryResults")?.textContent || "").includes("Creation")
  ,null,{timeout:20000});
  assert.equal(pageErrors.length,0,"No uncaught JavaScript errors: " + pageErrors.join(" | "));
  await offlineContext.setOffline(false);
  await offlineContext.close();
  console.log("Mobile browser checks passed: Pixel 7 viewport, full KJV chapter, contextual verse actions, dictionary, concordance, source-attributed public-domain commentary, exact-verse YouVersion comparison, service-worker asset cache and offline KJV/commentary reading.");
} finally {
  if (browser) await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
