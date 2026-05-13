# Scheduler Design

PageOS starts with a cooperative round-robin scheduler model to keep the ABI and process state simple while the runtime remains browser-hosted.

## Phase 0 guarantees

- deterministic tick order
- explicit process states: `Ready`, `Running`, `Blocked`, `Idle`
- kernel idle task always available as a fallback
- scheduler diagnostics exposed to the shell for system monitor windows

## Future phases

Worker-backed tasks, timeslice accounting, and priority classes extend the same PCB fields introduced in Phase 0.
