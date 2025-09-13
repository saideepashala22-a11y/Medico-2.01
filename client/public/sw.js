const CACHE_NAME = 'nakshatra-hms-v3';
const STATIC_CACHE = 'nakshatra-static-v3';
const DYNAMIC_CACHE = 'nakshatra-dynamic-v3';
const IMAGE_CACHE = 'nakshatra-images-v3';

const urlsToCache = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching App Shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force the new service worker to take control immediately
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches including DYNAMIC_CACHE for security
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Clear DYNAMIC_CACHE for security (no API response caching)
          if (cacheName !== STATIC_CACHE && 
              cacheName !== IMAGE_CACHE) {
            console.log('Service Worker: Deleting cache for security:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - advanced caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests with different strategies
  if (request.method === 'GET') {
    // Handle API requests - Network ONLY (no caching for PHI security)
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(networkOnlyStrategy(request));
    }
    // Handle images - Cache First for better performance
    else if (request.destination === 'image' || 
             url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
    }
    // Handle static assets (CSS, JS, fonts) - Cache First with network fallback
    else if (url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/i) || 
             url.origin === 'https://fonts.googleapis.com' ||
             url.origin === 'https://fonts.gstatic.com') {
      event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    }
    // Handle navigation requests - Network First with proper offline fallback
    else if (request.mode === 'navigate') {
      event.respondWith(navigationStrategy(request));
    }
    // Default strategy for other requests (no caching)
    else {
      event.respondWith(networkOnlyStrategy(request));
    }
  }
});

// Network Only Strategy - For API calls and sensitive data (PHI security)
async function networkOnlyStrategy(request) {
  try {
    return await fetch(request);
  } catch (error) {
    // Network failed - don't serve cached API data for security
    console.log('Network request failed:', request.url);
    throw error;
  }
}

// Navigation Strategy - Proper offline handling without auth issues
async function navigationStrategy(request) {
  try {
    // Try network first for navigation
    const response = await fetch(request);
    return response;
  } catch (error) {
    // Network failed, serve basic offline page instead of cached authenticated content
    console.log('Navigation request failed, serving offline page');
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Offline - Nakshatra HMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: system-ui; text-align: center; padding: 50px; background: #f5f5f5; }
          .offline { max-width: 400px; margin: 0 auto; }
          .icon { font-size: 64px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="offline">
          <div class="icon">📱</div>
          <h1>You're Offline</h1>
          <p>Please check your internet connection and try again.</p>
          <button onclick="location.reload()">Retry</button>
        </div>
      </body>
      </html>`,
      {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}

// Cache First Strategy - Good for static assets and images
async function cacheFirstStrategy(request, cacheName) {
  // Try cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Cache miss, try network
    const response = await fetch(request);
    
    // If successful, cache it
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Both cache and network failed
    throw error;
  }
}

// Background sync for offline actions (future enhancement)
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background Sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // This could handle offline form submissions when connection is restored
  console.log('Service Worker: Performing background sync');
}