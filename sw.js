
"use strict";

const CACHE_NAME = "zuriel-bible-offline-v6";

const CORE_FILES = [
  "./",
  "./index.html",
  "./bible-data.js",
  "./zuriel-library.js",
  "./zuriel-home.js",
  "./zuriel-study.js",
  "./zuriel-navigation.js",
  "./zuriel-introductions.js",
  "./kjv.72bec70fcd.json"
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

  if (url.origin !== self.location.origin) return;

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

