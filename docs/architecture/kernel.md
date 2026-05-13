# Kernel Design

The kernel is a `no_std` Rust crate compiled to `wasm32-unknown-unknown` and loaded inside the service worker. Phase 0 exports `kernel_init`, `kernel_tick`, and `syscall_dispatch`, plus read-only accessors for boot logs and a small process-table snapshot.

## Responsibilities

- initialize allocator and kernel state
- define immutable syscall numbers
- maintain a minimal process table with kernel/server/application entries
- expose scheduler state and diagnostics for the compositor
- serve as the authority for future IPC routing and capability checks

## Non-goals in Phase 0

- real preemption
- true virtual-memory isolation
- persistent process loading from storage
- capability-based security enforcement beyond type-safe placeholders
