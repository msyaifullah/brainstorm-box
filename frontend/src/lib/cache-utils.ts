// Cache management utilities for service worker

export const clearServiceWorkerCache = async (): Promise<boolean> => {
  try {
    if ('serviceWorker' in navigator && 'caches' in window) {
      // Try to use service worker message API first
      const controller = navigator.serviceWorker.controller!;
      if (controller.state === 'activated') {
        return new Promise((resolve) => {
          const messageChannel = new MessageChannel();
          
          messageChannel.port1.onmessage = (event) => {
            if (event.data.success) {
              console.log('Service worker cache cleared successfully');
              resolve(true);
            } else {
              console.error('Service worker failed to clear cache:', event.data.error);
              resolve(false);
            }
          };

          // Ensure controller is not null before posting message
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage(
              { type: 'CLEAR_CACHE' },
              [messageChannel.port2]
            );
          } else {
            // Controller is null, resolve as failure
            console.error('No active service worker controller to post CLEAR_CACHE message');
            resolve(false);
          }
          // Fallback timeout
          setTimeout(() => resolve(false), 5000);
        });
      }
      
      // Fallback: direct cache API
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      
      console.log('Service worker cache cleared successfully (fallback method)');
      return true;
    } else {
      console.warn('Service Worker or Cache API not supported');
      return false;
    }
  } catch (error) {
    console.error('Error clearing service worker cache:', error);
    return false;
  }
};

export const getCacheInfo = async (): Promise<{ cacheCount: number; cacheNames: string[] }> => {
  try {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      return {
        cacheCount: cacheNames.length,
        cacheNames
      };
    }
    return { cacheCount: 0, cacheNames: [] };
  } catch (error) {
    console.error('Error getting cache info:', error);
    return { cacheCount: 0, cacheNames: [] };
  }
}; 