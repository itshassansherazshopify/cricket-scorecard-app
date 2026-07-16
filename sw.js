const CACHE_NAME = "club-cricket-scorecard-v6";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(
        APP_ASSETS.map((asset) => cache.add(asset).catch(() => null))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isAppShellRequest = event.request.mode === "navigate"
    || requestUrl.pathname.endsWith(".html")
    || requestUrl.pathname.endsWith(".css")
    || requestUrl.pathname.endsWith(".js")
    || requestUrl.pathname.endsWith(".webmanifest");

  if (!isSameOrigin || !isAppShellRequest) {
    return;
  }

  event.respondWith(fetchFirst(event.request));
});

function fetchFirst(request) {
  return fetch(request, { cache: "no-store" })
    .then((response) => {
      if (!response || response.status !== 200) {
        return response;
      }

      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      return response;
    })
    .catch(() => caches.match(request).then((cached) => cached || caches.match("./index.html")));
}
