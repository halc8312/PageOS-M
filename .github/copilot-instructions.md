# Copilot Instructions

- Respect the microkernel layering defined in `docs/architecture/overview.md`.
- Keep Rust crates `no_std` + `alloc` compatible unless a test-only dependency requires `std`.
- Prefer data-driven UI composition and strict TypeScript.
- When requirements are ambiguous, record the chosen interpretation in the nearest design or architecture document.
