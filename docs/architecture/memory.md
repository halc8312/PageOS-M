# Memory Management

Phase 0 uses a single kernel heap backed by `linked_list_allocator` and a linear-memory bump region for static exports.

## Layout

- static data: boot log strings, syscall tables, process descriptors
- heap: `alloc` collections for runtime state
- exported memory: default Rust/WASM linear memory

## Decision log

Because browser WASM does not expose native page tables, PageOS models virtual-memory concepts in metadata first. Real enforcement will come from worker/process boundaries and copied message buffers.
