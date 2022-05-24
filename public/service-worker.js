var CACHE_NAME = 'solico-pwa-v1.0';

const UrlsToCache = [
    '/assets/icons/logo_16.png',
    '/assets/icons/logo_24.png',
    '/assets/icons/logo_32.png',
    '/assets/icons/logo_64.png',
    '/assets/icons/logo_192.png',
    '/assets/icons/logo_512.png',
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(UrlsToCache))
        .then(self.skipWaiting())
    );
});