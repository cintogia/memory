/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "pokemon.html",
    "revision": "1a2e7152c0626a2bda8ef6ae62b3ba8a"
  },
  {
    "url": "img/001.svg",
    "revision": "35bb7028d7a39ef0ed09e9256311b44e"
  },
  {
    "url": "img/002.svg",
    "revision": "974cfa75dea3c52c02120c3a61053591"
  },
  {
    "url": "img/003.svg",
    "revision": "1f5d193ee3f488cc23a0d71762731f15"
  },
  {
    "url": "img/004.svg",
    "revision": "31a3d074da90e6fe1d3a3ab3a62192a2"
  },
  {
    "url": "img/005.svg",
    "revision": "9820a5c2523ea7392060ce728d153c0f"
  },
  {
    "url": "img/006.svg",
    "revision": "4fb5e23cf48bd093236f053e52c7c035"
  },
  {
    "url": "img/007.svg",
    "revision": "73809e46e0a2cabd2391f0d2d2c1e4bc"
  },
  {
    "url": "img/008.svg",
    "revision": "4d77d91c907f82f1a3182376e12abfd7"
  },
  {
    "url": "img/geometry2.png",
    "revision": "8b9eb18dd056013d16b945613a1ca86f"
  },
  {
    "url": "img/pokeball.svg",
    "revision": "2c38b8399e64e9b72e530cb5c7fa0c4b"
  },
  {
    "url": "js/app_fa.js",
    "revision": "6c7d77d870d01293a52a79b6c7fbb027"
  },
  {
    "url": "js/app.js",
    "revision": "6035557c8bd550da9f3a8e1b8ebc953a"
  },
  {
    "url": "css/app_fa.css",
    "revision": "ae270c104876e6cf3a3bf2b8057ad474"
  },
  {
    "url": "css/app.css",
    "revision": "72303ab4d52cfdd1f9a1d3c6d2856cb5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^https:\/\/maxcdn\.bootstrapcdn\.com\/font-awesome\/4\.6\.1\/css\/font-awesome\.min\.css/, new workbox.strategies.CacheFirst({ "cacheName":"fa-icons", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/maxcdn\.bootstrapcdn\.com\/font-awesome\/4\.6\.1\/fonts\/fontawesome-webfont\.woff2\?v\=4\.6\.1/, new workbox.strategies.CacheFirst({ "cacheName":"fa-fonts", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts\.googleapis\.com\/css\?family\=Coda/, new workbox.strategies.CacheFirst({ "cacheName":"google-font", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts\.gstatic\.com\/s\/coda\/v15\/SLXHc1jY5nQ8FUsGa6aN\.woff2/, new workbox.strategies.CacheFirst({ "cacheName":"google-font", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts\.gstatic\.com\/s\/coda\/v15\/SLXHc1jY5nQ8FUUGaw\.woff2/, new workbox.strategies.CacheFirst({ "cacheName":"google-font", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
