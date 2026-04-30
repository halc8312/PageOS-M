/// <reference lib="webworker" />

export {};

declare const self: ServiceWorkerGlobalScope;

type BootResponse = {
  logs: string[];
  tickCount: number;
};

let kernelInstancePromise: Promise<WebAssembly.Instance> | null = null;

self.addEventListener('install', () => {
  void self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  const responsePort = event.ports[0];
  if (responsePort === undefined) {
    return;
  }

  const payload = event.data as { type?: string } | undefined;
  if (payload?.type === 'PAGEOS_BOOT') {
    void bootKernel()
      .then((response) => {
        responsePort.postMessage({ response });
      })
      .catch((error: unknown) => {
        responsePort.postMessage({ error: error instanceof Error ? error.message : 'Unknown kernel boot error.' });
      });
    return;
  }

  if (payload?.type === 'PAGEOS_TICK') {
    void tickKernel()
      .then((tick) => {
        responsePort.postMessage({ response: { tick } });
      })
      .catch((error: unknown) => {
        responsePort.postMessage({ error: error instanceof Error ? error.message : 'Unknown kernel tick error.' });
      });
  }
});

async function bootKernel(): Promise<BootResponse> {
  const instance = await loadKernel();
  const exports = instance.exports as KernelExports;
  exports.kernel_init();

  const memory = exports.memory;
  const logs = readBootLogs(exports, memory);
  const tickCount = exports.kernel_tick();

  return { logs, tickCount };
}

async function tickKernel(): Promise<number> {
  const instance = await loadKernel();
  const exports = instance.exports as KernelExports;
  return exports.kernel_tick();
}

async function loadKernel(): Promise<WebAssembly.Instance> {
  if (kernelInstancePromise === null) {
    const kernelUrl = new URL('wasm/kernel.wasm', self.registration.scope);
    kernelInstancePromise = fetch(kernelUrl)
      .then(async (response) => WebAssembly.instantiate(await response.arrayBuffer(), {}))
      .then((result) => result.instance);
  }

  return kernelInstancePromise;
}

function readBootLogs(exports: KernelExports, memory: WebAssembly.Memory): string[] {
  const decoder = new TextDecoder();
  const count = exports.boot_log_count();
  const bytes = new Uint8Array(memory.buffer);
  const logs: string[] = [];

  for (let index = 0; index < count; index += 1) {
    const pointer = exports.boot_log_ptr(index);
    const length = exports.boot_log_len(index);
    logs.push(decoder.decode(bytes.slice(pointer, pointer + length)));
  }

  return logs;
}

interface KernelExports extends WebAssembly.Exports {
  readonly memory: WebAssembly.Memory;
  kernel_init: () => number;
  kernel_tick: () => number;
  boot_log_count: () => number;
  boot_log_ptr: (index: number) => number;
  boot_log_len: (index: number) => number;
}
