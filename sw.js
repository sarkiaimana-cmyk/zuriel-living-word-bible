

"use strict";

const CACHE_NAME = "zuriel-bible-offline-v236";

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
  "./data/zuriel-biblical-dictionary-expansion.json",
  "./data/zuriel-book-introductions-and-study-pathways.json",
  "./data/zuriel-chapter-introductions-genesis-01-10.json",
  "./data/zuriel-chapter-introductions-exodus-01-10.json",
  "./data/zuriel-chapter-introductions-exodus-11-20.json",
  "./data/zuriel-chapter-introductions-exodus-21-30.json",
  "./data/zuriel-chapter-introductions-exodus-31-40.json",
  "./data/zuriel-chapter-introductions-leviticus-01-10.json",
  "./data/zuriel-chapter-introductions-leviticus-11-27.json",
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
