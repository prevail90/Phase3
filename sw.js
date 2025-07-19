const CACHE_NAME = 'da-form-grader-cache-v3'; // Bumped version to ensure new cache
const urlsToCache = [
  './',
  './index.html',
  // Note: Caching .tsx is for offline availability of the source,
  // but it requires the browser to be online for transpilation via Babel CDN.
  // This setup is a compromise for no-build-step environments.
  './index.tsx', 
  './manifest.json',
  './assets/icon-192x192.png',
  './assets/icon-512x512.png',
  './assets/DA-Form-7931.pdf',
  './assets/DA-Form-7932.pdf',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js',
  'https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force the waiting service worker to become the active service worker.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching assets');
        // Use addAll with a catch block to prevent a single failed asset from stopping the entire cache process.
        return cache.addAll(urlsToCache).catch(error => {
          console.error('Failed to cache one or more resources:', error);
        });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    // Always try the network first (Stale-While-Revalidate strategy)
    // This ensures users get the latest version if they are online.
    fetch(event.request).then(networkResponse => {
      // If the fetch is successful, cache the new response and return it.
      return caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      });
    }).catch(() => {
      // If the network request fails (e.g., offline), try to serve from the cache.
      return caches.match(event.request).then(cachedResponse => {
        return cachedResponse || Response.error();
      });
    })
  );
});


self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
