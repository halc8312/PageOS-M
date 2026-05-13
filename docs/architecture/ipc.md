# IPC Design

PageOS IPC uses mailbox-style ports. Each message has a fixed header defined in `pageos-abi` and an optional payload represented as a byte slice or typed enum.

## Phase 0 model

- ports are identified by 32-bit integers
- messages carry `source`, `destination`, `kind`, and `length`
- service-worker transport serializes messages into structured-clone-friendly objects
- compositor commands are treated as a privileged message class from the window server

## Planned evolution

Future phases will add blocking receives, capability-guarded port creation, and shared-memory fast paths when cross-origin isolation is available.
