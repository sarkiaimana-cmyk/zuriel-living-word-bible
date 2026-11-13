

"use strict";

const CACHE_NAME = "zuriel-bible-offline-v27";

const CORE_FILES = [
  "./",
  "./index.html",
  "./bible-data.js",
  "./zuriel-library.js",
  "./zuriel-home.js",
  "./zuriel-study.js",
  "./zuriel-navigation.js",
  "./zuriel-introductions.js",
  "./kjv.72bec70fcd.json",
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
