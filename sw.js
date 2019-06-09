/*
 * PWA memoryApp v1.0
 */

// define cache
let cacheName = "memoryApp-v1.0";
let filesToCache = [
	"/",
	"/index.html",
	"/index_fa.html",
	"/css/app.css",
	"/css/app_fa.css",
	"/js/app.js",
	"/js/app_fa.js",
	"/img/008.svg",
	"/img/007.svg",
	"/img/006.svg",
	"/img/005.svg",
	"/img/004.svg",
	"/img/003.svg",
	"/img/002.svg",
	"/img/001.svg",
	"/img/pokeball.svg",
	"/img/geometry2.png"
];

// cache files on install
self.addEventListener("install", function(e) {
	console.log("[ServiceWorker] Install");
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(filesToCache);
		})
	);
});

// updating the app shell
self.addEventListener("activate", function(e) {
	console.log("[ServiceWorker] Activate");
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(
				keyList.map(function(key) {
					// check if cacheName is still up to date, if not delete it
					if (key !== cacheName) {
						console.log('[ServiceWorker] Removing old cache', key);
						return caches.delete(key);
					}
				})
			);
		})
	);
});

// get the app shell from the cache
self.addEventListener("fetch", function(e) {
	console.log("[ServiceWorker] Fetch", e.request.url);
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	);
});
