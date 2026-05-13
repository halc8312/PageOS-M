self.addEventListener('install', () => {
  void self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

let kernelInstancePromise = null;

self.addEventListener('message', (event) => {
  const responsePort = event.ports[0];
  if (responsePort === undefined) {
    return;
  }

  const payload = event.data;
  if (payload?.type === 'PAGEOS_BOOT') {
    void bootKernel()
      .then((response) => responsePort.postMessage({ response }))
      .catch((error) => responsePort.postMessage({ error: error instanceof Error ? error.message : 'Unknown kernel boot error.' }));
    return;
  }

  if (payload?.type === 'PAGEOS_TICK') {
    void tickKernel()
      .then((tick) => responsePort.postMessage({ response: { tick } }))
      .catch((error) => responsePort.postMessage({ error: error instanceof Error ? error.message : 'Unknown kernel tick error.' }));
  }
});

async function bootKernel() {
  const instance = await loadKernel();
  const exports = instance.exports;
  exports.kernel_init();
  return {
    logs: readBootLogs(exports, exports.memory),
    tickCount: exports.kernel_tick(),
  };
}

async function tickKernel() {
  const instance = await loadKernel();
  return instance.exports.kernel_tick();
}

async function loadKernel() {
  if (kernelInstancePromise === null) {
    const kernelUrl = new URL('wasm/kernel.wasm', self.registration.scope);
    kernelInstancePromise = fetch(kernelUrl)
      .then(async (response) => WebAssembly.instantiate(await response.arrayBuffer(), {}))
      .then((result) => result.instance);
  }

  return kernelInstancePromise;
}

function readBootLogs(exports, memory) {
  const decoder = new TextDecoder();
  const count = exports.boot_log_count();
  const bytes = new Uint8Array(memory.buffer);
  const logs = [];

  for (let index = 0; index < count; index += 1) {
    const pointer = exports.boot_log_ptr(index);
    const length = exports.boot_log_len(index);
    logs.push(decoder.decode(bytes.slice(pointer, pointer + length)));
  }

  return logs;
}
