# Task Tree Guide

Each phase file breaks the roadmap into milestone-sized slices that are small enough to complete in roughly one to three days. Tasks reference the architecture and convention documents by section title rather than duplicating design text.

## Format rules

- `M-N.X` identifies milestone `X` within phase `N`
- tasks must be testable and map to an explicit deliverable
- completion conditions define what “done” means for the milestone
- test requirements list the minimum automated or manual verification required

## Roadmap summary

- Phase 0: foundation and end-to-end boot skeleton
- Phase 1: kernel boot pipeline and runtime hosting
- Phase 2: memory model and capability groundwork
- Phase 3: process model and scheduler behavior
- Phase 4: IPC and syscall semantics
- Phase 5: VFS and persistence
- Phase 6: window system and compositor protocol
- Phase 7: userland applications
- Phase 8: polish, accessibility, and release hardening
