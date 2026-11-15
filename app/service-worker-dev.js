const cacheName = `rachana-development-${encodeURIComponent(self.registration.scope)}-v1`;
const shellUrl = new URL("index.html", self.registration.scope).href;

self.addEventListener("message", (event) => {
  if (event.data?.type === "RACHANA_FORCE_UPDATE") event.waitUntil(self.skipWaiting());
});

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const response = await fetch(new URL("@rachana/offline-manifest.json", self.registration.scope), { cache: "no-store" });
    if (!response.ok) throw new Error("Could not read the development offline file list.");
    const files = await response.json();
    const cache = await caches.open(cacheName);
    // Keep requests bounded on slow local Wi-Fi.
    for (let idx = 0; idx < files.length; idx += 8) await cache.addAll(files.slice(idx, idx + 8).map(filename => new Request(new URL(filename, self.registration.scope), { cache: "reload" })));
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope) || url.pathname === "/@rachana/offline-manifest.json") return;
  const navigation = event.request.mode === "navigate" && (url.pathname === "/" || url.pathname === "/index.html");
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const key = navigation ? shellUrl : event.request;
    try {
      const response = await fetch(event.request);
      if (!response.ok) return response;
      try { await cache.put(key, response.clone()); }
      catch (error) { console.warn("Could not save the latest development file for offline use.", error); }
      return response;
    } catch (error) {
      if (event.request.cache === "reload") throw error;
      const cached = await cache.match(key);
      if (cached) return cached;
      throw error;
    }
  })());
});
