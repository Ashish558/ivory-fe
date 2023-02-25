//STORAGE OF BROWSER
const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

//installation
self.addEventListener("install", (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
         console.log("Opened cache");

         return cache.addAll(urlsToCache);
      })
   );
});

// listen for request
self.addEventListener("fetch", (event) => {
   event.respondWith(
      caches.match(event.request).then((res) => {
         return fetch(event.request).catch(() => caches.match("offline.html"));
      })
   );
});

// actitivate the service worker
self.addEventListener("activate", (event) => {
   const cacheWhitelist = [];
   cacheWhitelist.push(CACHE_NAME);
   event.waitUntil(
      caches.keys().then((cacheNames) => Promise.all(
         cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
               return caches.delete(cacheName);
            }
         })
      ))
   )
});


const func = async () => {

   const status = await navigator.permissions.query({
      name: 'periodic-background-sync',
   });
   if (status.state === 'granted') {
      // Periodic background sync can be used.
      console.log('GRANTED');
   } else {
      // Periodic background sync cannot be used.
      console.log('REJECTED');
   }
   const registration = await navigator.serviceWorker.ready;
   if ('periodicSync' in registration) {
      try {
         registration.periodicSync.register('content-sync', {
            // An interval of one day.
            minInterval: 24 * 60 * 60 * 1000,
         });
         const tags = registration.periodicSync.getTags();
         if (!tags.includes('content-sync')) {
            // updateContentOnPageLoad();
         }
      } catch (error) {
         // Periodic background sync cannot be used.
         // updateContentOnPageLoad();
      }
   }
}
func()
// if ('periodicSync' in registration) {
//   await registration.periodicSync.unregister('content-sync');
// }

self.addEventListener('periodicsync', (event) => {
   if (event.tag === 'content-sync') {
      // See the "Think before you sync" section for
      // checks you could perform before syncing.
      event.waitUntil(syncContent());
   }
   // Other logic for different tags as needed.
});

async function updateArticles() {
   const articlesCache = await caches.open('articles');
   await articlesCache.add('https://console.liveivory.com/api/story/story-groups/');
}

self.addEventListener('periodicsync', (event) => {
   if (event.tag === 'update-articles') {
      event.waitUntil(updateArticles());
   }
});