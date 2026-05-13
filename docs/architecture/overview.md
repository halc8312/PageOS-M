# PageOS Architecture Overview

PageOS is a browser-hosted teaching OS that preserves classic operating-system boundaries while adapting them to modern web primitives. Phase 0 establishes the end-to-end skeleton: bootloader, compositor, service-worker-hosted kernel runtime, shared ABI crates, system servers, and user-space applications.

## Layer model

1. **Bootloader (TypeScript, main thread)** initializes the shell, registers the service worker, prepares drivers, and orchestrates the visible boot sequence.
2. **Compositor (TypeScript, main thread)** owns the desktop/mobile UI tree, window composition, and interaction routing.
3. **Kernel + system servers (Rust → WASM, service worker)** provide process accounting, scheduling state, syscall dispatch, IPC mailboxes, and server entry points.
4. **User processes (Rust → WASM, Web Workers in later phases)** run atop `pageos-runtime` and communicate via ABI-defined message types.
5. **Browser-backed hardware** maps storage to IndexedDB, input to DOM events, display to DOM/canvas, sound to Web Audio, and networking to Fetch/WebSocket APIs.

## Phase 0 implementation decisions

- The kernel is compiled as a plain `wasm32-unknown-unknown` module without `wasm-bindgen`.
- The service worker loads the kernel WASM and returns boot-log frames to the shell over `postMessage`.
- Desktop/mobile mode is selected from a single responsive breakpoint (`768px`).
- The initial desktop session is data-driven: window definitions and launcher entries are derived from a single source of truth in the shell runtime.
- Shared Rust crates remain `no_std` + `alloc` compatible so later phases can reuse them in kernel, servers, and apps.

## Boot sequence

1. Splash screen fades in the PageOS wordmark on a black background.
2. Bootloader registers the cross-origin-isolated service worker and kernel service worker.
3. Drivers are initialized and capability summaries are collected.
4. Kernel service worker fetches and instantiates `kernel.wasm`.
5. The kernel exposes static boot log entries, process table metadata, and a first window manifest.
6. The compositor renders typed CRT logs, then transitions into desktop or mobile home mode.

## Runtime channels

- **Shell ↔ kernel SW:** `postMessage` request/response commands for boot, tick, diagnostics, and future syscalls.
- **Compositor ↔ window server:** JSON command stream represented in Phase 0 as structured messages.
- **Apps ↔ kernel:** ABI crates define syscall numbers, message headers, and file-system types.

## Build surfaces

- **Rust workspace:** kernel, servers, apps, and shared libraries.
- **pnpm workspace:** browser shell package orchestrated from the repository root.
- **Vite:** bundles the shell and emits static assets for GitHub Pages.
- **Playwright:** validates boot, responsive switching, and desktop launch basics.

## Deferred work

Phase 0 intentionally ships stubs for memory isolation, worker-backed user processes, and persistent VFS services. Their interfaces are frozen now so later phases can fill in implementations without reorganizing the repository.
