

"use strict";

const CACHE_NAME = "zuriel-bible-offline-v319";

const CORE_FILES = [
  "./",
  "./index.html",
  "./bible-data.js",
  "./zuriel-library.js",
  "./zuriel-study-library-data.js",
  "./zuriel-media.js",
  "./zuriel-home.js",
  "./zuriel-screenshot-home.js",
  "./zuriel-minimal-home.js",
  "./zuriel-history.js",
  "./zuriel-word-linking.js",
  "./zuriel-study.js",
  "./zuriel-lexicon-index.js",
  "./zuriel-geography-data.js",
  "./zuriel-geography.js",
  "./zuriel-navigation.js",
  "./zuriel-introductions.js",
  "./zuriel-settings.js",
  "./zuriel-grid-navigation.js",
  "./zuriel-reader-topbar.js",
  "./zuriel-design-system.js",
  "./zuriel-faith-content.js",
  "./zuriel-faith-cards.js",
  "./zuriel-topical-index.js",
  "./zuriel-kingdom-life.js",
  "./zuriel-growth-pathways.js",
  "./zuriel-reading-plans.js",
  "./zuriel-audio.js",
  "./zuriel-translations.js",
  "./zuriel-personal-space.js",
  "./zuriel-backup.js",
  "./zuriel-updates.js",
  "./zuriel-notifications.js",
  "./version.json",
  "./kjv.72bec70fcd.json",
  "./data/zuriel-bible-geography-atlas.json",
  "./data/zuriel-biblical-peoples-and-empires.json",
  "./data/zuriel-biblical-dictionary-expansion.json",
  "./data/zuriel-book-introductions-and-study-pathways.json",
  "./data/zuriel-chapter-introductions-genesis-01-10.json",
  "./data/zuriel-chapter-introductions-exodus-01-10.json",
  "./data/zuriel-chapter-introductions-exodus-11-20.json",
  "./data/zuriel-chapter-introductions-exodus-21-30.json",
  "./data/zuriel-chapter-introductions-exodus-31-40.json",
  "./data/zuriel-chapter-introductions-leviticus-01-10.json",
  "./data/zuriel-chapter-introductions-leviticus-11-27.json",
  "./data/zuriel-chapter-introductions-numbers-01-10.json",
  "./data/zuriel-chapter-introductions-numbers-11-18.json",
  "./data/zuriel-chapter-introductions-numbers-19-36.json",
  "./data/zuriel-chapter-introductions-deuteronomy-01-17.json",
  "./data/zuriel-chapter-introductions-deuteronomy-18-34.json",
  "./data/zuriel-chapter-introductions-joshua-01-12.json",
  "./data/zuriel-chapter-introductions-joshua-13-24.json",
  "./data/zuriel-chapter-introductions-judges-01-10.json",
  "./data/zuriel-chapter-introductions-judges-11-21.json",
  "./data/zuriel-chapter-introductions-ruth-01-04.json",
  "./data/zuriel-chapter-introductions-1-samuel-01-16.json",
  "./data/zuriel-chapter-introductions-1-samuel-17-31.json",
  "./data/zuriel-chapter-introductions-2-samuel-01-12.json",
  "./data/zuriel-chapter-introductions-2-samuel-13-24.json",
  "./data/zuriel-chapter-introductions-1-kings-01-11.json",
  "./data/zuriel-chapter-introductions-1-kings-12-22.json",
  "./data/zuriel-chapter-introductions-2-kings-01-13.json",
  "./data/zuriel-chapter-introductions-2-kings-14-25.json",
  "./data/zuriel-chapter-introductions-1-chronicles-01-15.json",
  "./data/zuriel-chapter-introductions-1-chronicles-16-29.json",
  "./data/zuriel-chapter-introductions-2-chronicles-01-18.json",
  "./data/zuriel-chapter-introductions-2-chronicles-19-36.json",
  "./data/zuriel-chapter-introductions-ezra-01-10.json",
  "./data/zuriel-chapter-introductions-nehemiah-01-13.json",
  "./data/zuriel-chapter-introductions-esther-01-10.json",
  "./data/zuriel-chapter-introductions-job-01-21.json",
  "./data/zuriel-chapter-introductions-job-22-42.json",
  "./data/zuriel-chapter-introductions-psalms-01-30.json",
  "./data/zuriel-chapter-introductions-psalms-31-60.json",
  "./data/zuriel-chapter-introductions-psalms-61-90.json",
  "./data/zuriel-chapter-introductions-psalms-91-120.json",
  "./data/zuriel-chapter-introductions-psalms-121-150.json",
  "./data/zuriel-chapter-introductions-proverbs-01-31.json",
  "./data/zuriel-chapter-introductions-ecclesiastes-01-12.json",
  "./data/zuriel-chapter-introductions-song-of-solomon-01-08.json",
  "./data/zuriel-chapter-introductions-isaiah-01-22.json",
  "./data/zuriel-chapter-introductions-isaiah-23-44.json",
  "./data/zuriel-chapter-introductions-isaiah-45-66.json",
  "./data/zuriel-chapter-introductions-jeremiah-01-26.json",
  "./data/zuriel-chapter-introductions-jeremiah-27-52.json",
  "./data/zuriel-chapter-introductions-lamentations-01-05.json",
  "./data/zuriel-chapter-introductions-ezekiel-01-24.json",
  "./data/zuriel-chapter-introductions-ezekiel-25-48.json",
  "./data/zuriel-chapter-introductions-daniel-01-12.json",
  "./data/zuriel-chapter-introductions-hosea-01-14.json",
  "./data/zuriel-chapter-introductions-joel-01-03.json",
  "./data/zuriel-chapter-introductions-amos-01-09.json",
  "./data/zuriel-chapter-introductions-obadiah-01.json",
  "./data/zuriel-chapter-introductions-jonah-01-04.json",
  "./data/zuriel-chapter-introductions-micah-01-07.json",
  "./data/zuriel-chapter-introductions-nahum-01-03.json",
  "./data/zuriel-chapter-introductions-habakkuk-01-03.json",
  "./data/zuriel-chapter-introductions-zephaniah-01-03.json",
  "./data/zuriel-chapter-introductions-haggai-01-02.json",
  "./data/zuriel-chapter-introductions-zechariah-01-14.json",
  "./data/zuriel-chapter-introductions-matthew-01-14.json",
  "./data/zuriel-chapter-introductions-matthew-15-28.json",
  "./data/zuriel-chapter-introductions-mark-01-08.json",
  "./data/zuriel-chapter-introductions-mark-09-16.json",
  "./data/zuriel-chapter-introductions-malachi-01-04.json",
  "./data/zuriel-chapter-introductions-john-01-10.json",
  "./data/zuriel-chapter-introductions-luke-01-12.json",
  "./data/zuriel-chapter-introductions-luke-13-24.json",
  "./data/zuriel-chapter-introductions-john-11-12.json",
  "./data/zuriel-chapter-introductions-john-13-21.json",
  "./data/zuriel-chapter-introductions-acts-01-14.json",
  "./data/zuriel-chapter-introductions-acts-15-28.json",
  "./data/zuriel-chapter-introductions-romans-01-08.json",
  "./data/zuriel-chapter-introductions-romans-09-16.json",
  "./data/zuriel-chapter-introductions-1-corinthians-01-16.json",
  "./data/zuriel-chapter-introductions-2-corinthians-01-13.json",
  "./data/zuriel-chapter-introductions-galatians-01-06.json",
  "./data/zuriel-chapter-introductions-ephesians-01-06.json",
  "./data/zuriel-chapter-introductions-philippians-01-04.json",
  "./data/zuriel-chapter-introductions-colossians-01-04.json",
  "./data/zuriel-chapter-introductions-1-thessalonians-01-05.json",
  "./data/zuriel-chapter-introductions-1-timothy-01-06.json",
  "./data/zuriel-chapter-introductions-2-timothy-01-04.json",
  "./data/zuriel-chapter-introductions-titus-01-03.json",
  "./data/zuriel-chapter-introductions-philemon-01.json",
  "./data/zuriel-chapter-introductions-hebrews-01-13.json",
  "./data/zuriel-chapter-introductions-james-01-05.json",
  "./data/zuriel-chapter-introductions-1-peter-01-05.json",
  "./data/zuriel-chapter-introductions-2-peter-01-03.json",
  "./data/zuriel-chapter-introductions-1-john-01-05.json",
  "./data/zuriel-chapter-introductions-2-john-01.json",
  "./data/zuriel-chapter-introductions-3-john-01.json",
  "./data/zuriel-chapter-introductions-jude-01.json",
  "./data/zuriel-chapter-introductions-revelation-01-22.json",
  "./data/zuriel-chapter-introductions-2-thessalonians-01-03.json",

  "./data/zuriel-connected-scripture-trails-batch-1.json",
  "./data/zuriel-connected-scripture-trails-batch-2.json",
  "./data/zuriel-deep-study-guides.json",
  "./data/zuriel-names-and-titles-of-god-library.json",
  "./data/zuriel-original-language-word-studies-batch-1.json",
  "./data/zuriel-original-language-word-studies-batch-2.json",
  "./data/zuriel-lexicon-study-index.json",
  "./data/zuriel-theological-comparisons.json",
  "./data/zuriel-passage-commentary-expansion.json",
  "./data/zuriel-topical-bible-study-library-batch-2.json",
  "./data/zuriel-topical-bible-study-library-batch-3.json",
  "./data/zuriel-worship-study-pathways.json",
  "./images/books/0fc10dde-c515-45e8-916b-5a27f61b0841.jpg",
  "./images/books/738dfb2c-b2e8-49d6-bc1c-d6766be38adf.jpg",
  "./images/books/d14a5cec-132e-4432-9604-9cb82cd8cf71.jpg",
  "./images/books/d9f06adf-07c3-45b7-bb53-385c15032679.jpg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(CORE_FILES);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (
              cacheName.startsWith("zuriel-bible-offline-") &&
              cacheName !== CACHE_NAME
            ) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    if (url.origin === "https://images.unsplash.com") {
      event.respondWith(
        caches.open(CACHE_NAME).then(async function (cache) {
          const cached = await cache.match(request);
          if (cached) return cached;
          const response = await fetch(request);
          if (response && response.ok && response.type !== "opaque") {
            await cache.put(request, response.clone());
          }
          return response;
        })
      );
      return;
    }
    if (
      url.origin === "https://bible.helloao.org" &&
      url.pathname.startsWith("/api/d/")
    ) {
      event.respondWith(
        caches.open(CACHE_NAME).then(async function (cache) {
          try {
            const response = await fetch(request);
            if (response && response.ok && response.type !== "opaque") {
              cache.put(request, response.clone());
            }
            return response;
          } catch (error) {
            const saved = await cache.match(request);
            if (saved) return saved;
            throw error;
          }
        })
      );
    }
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          if (response && response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME).then(function (cache) {
              cache.put("./index.html", copy);
            });
          }

          return response;
        })
        .catch(function () {
          return caches.match("./index.html");
        })
    );

    return;
  }

  event.respondWith(
    caches.match(request).then(function (cachedResponse) {
      if (cachedResponse) return cachedResponse;

      return fetch(request).then(function (response) {
        if (response && response.ok) {
          const copy = response.clone();

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }

        return response;
      });
    })
  );
});
