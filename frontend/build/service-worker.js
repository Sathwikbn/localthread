// Service worker disabled — was causing infinite fetch error loops.
// It returned 503 plain-text for failed bundle.js requests, which the
// browser tried to parse as JavaScript, triggering more fetch errors.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Clear all caches and immediately claim clients so the new SW takes effect
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// Do NOT intercept any fetch requests — let the browser handle everything directly.
