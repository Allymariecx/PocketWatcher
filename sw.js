const CACHE   = 'pocketwatcher-v2';
const BASE    = '/PocketWatcher/';
const ASSETS  = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'icon-192.png',
  BASE + 'icon-512.png',
  BASE + 'splash-logo.png'
];

// Install: pre-cache shell assets, activate the new worker immediately
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clear every cache that isn't the current version
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - HTML/navigation requests: NETWORK-FIRST. Always tries to get the latest
//   app code when online, so updates show up immediately on next launch.
//   Falls back to the cached copy only when offline.
// - Everything else (icons, manifest): CACHE-FIRST, since those rarely change
//   and cache-first keeps the app feeling instant.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  const isNavigation = e.request.mode === 'navigate' ||
    e.request.destination === 'document' ||
    url.pathname.endsWith('index.html') ||
    url.pathname === BASE;

  if (isNavigation) {
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return resp;
        })
        .catch(() => caches.match(e.request).then(c => c || caches.match(BASE + 'index.html')))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (e.request.method === 'GET' && resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      });
    })
  );
});
