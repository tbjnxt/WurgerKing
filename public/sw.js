const targetCache = "v3.6.1";
const allowedCaches = [targetCache, "static-v1"];

self.addEventListener('install', function (event) {
	self.skipWaiting();

	event.waitUntil(
		caches.open(targetCache).then(function (cache) {
			return cache.addAll([
				'/',
				'/bg_BG',
				'/cs_CZ',
				'/de_AT',
				'/de_CH',
				'/de_DE',
				'/fi_FI',
				'/fr_CH',
				'/it_CH',
				'/nl_NL',
				'/sv_SE',
				'/manifest.json',
				'/fonts/materialdesignicons-webfont.eot',
				'/fonts/materialdesignicons-webfont.svg',
				'/fonts/materialdesignicons-webfont.ttf',
				'/fonts/materialdesignicons-webfont.woff',
				'/fonts/materialdesignicons-webfont.woff2',
				'/css/flickity.min.css',
				'/css/materialdesignicons.min.css',
				'/css/slurger.css',
				'/img/icons/filter_filled.svg',
				'/img/icons/filter.svg',
				'/img/icons/heart_filled.svg',
				'/img/icons/heart.svg',
				'/img/icons/mybk_filled.svg',
				'/img/icons/mybk.svg',
				'/img/icons/search.svg',
				'/img/icons/share.svg',
				'/img/bk_logo.svg',
				'/img/bordermask-bottom.svg',
				'/img/bordermask.svg',
				'/img/flags.png',
				'/img/generic_maps.png',
				'/img/icons.svg',
				'/img/info.png',
				'/img/kingfinder.png',
				'/img/profile.png',
				'/img/subtitle_coupons_ch_de.png',
				'/img/subtitle_coupons_cz.png',
				'/img/subtitle_coupons_de.png',
				'/img/subtitle_coupons_fi.png',
				'/img/subtitle_coupons_fr.png',
				'/img/subtitle_coupons_it.png',
				'/img/subtitle_coupons_nl.png',
				'/img/subtitle_coupons_se.png',
				'/js/app.js',
				'/logo/bk192.png',
				'/logo/bk512.png',
			]);
		})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(keys => Promise.all(
			keys.map(key => {
				if (!allowedCaches.includes(key)) {
					return caches.delete(key);
				}
			})
		)).then(() => {
			console.log("Service worker installed and ready");
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (resp) {
			return resp || fetch(event.request).then(function (response) {
				if (!response || response.status !== 200) {
					return response;
				}

				if (event.request.url.startsWith("/cache")) {
					return caches.open("static-v1").then(function (cache) {
						cache.put(event.request, response.clone());
						return response;
					});
				} else {
					if (response.type !== "basic")
						return response;

					// TODO: API caching & emulation here for offline use
					return response;
				}
			});
		})
	);
});
