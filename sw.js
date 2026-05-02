// 餵奶日記 · Service Worker
const CACHE_NAME = 'nursing-diary-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 不快取的外部網域
const BYPASS_HOSTS = [
  'arcar.kftseng2oo1.workers.dev',
  'api.anthropic.com',
  'api.line.me',
  'api.resend.com',
  'script.google.com',
  'static.line-scdn.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // 外部 API / CDN 直接走網路，不快取
  if (BYPASS_HOSTS.some(h => url.hostname.includes(h))) {
    e.respondWith(fetch(e.request));
    return;
  }

  // 非 GET 請求直接走網路
  if (e.request.method !== 'GET') {
    e.respondWith(fetch(e.request));
    return;
  }

  // 本地資源：Cache First
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
