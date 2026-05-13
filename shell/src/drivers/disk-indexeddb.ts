export interface DiskCapability {
  available: boolean;
  backend: 'indexeddb' | 'memory';
}

export async function initializeDiskDriver(): Promise<DiskCapability> {
  if (!('indexedDB' in window)) {
    return { available: false, backend: 'memory' };
  }

  await new Promise<void>((resolve) => {
    const request = window.indexedDB.open('pageos-phase0', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('boot', { keyPath: 'id' });
    };
    request.onsuccess = () => {
      request.result.close();
      resolve();
    };
    request.onerror = () => resolve();
  });

  return { available: true, backend: 'indexeddb' };
}
