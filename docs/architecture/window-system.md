# Window System

The window server owns window metadata, while the compositor owns actual DOM realization.

## Phase 0 behavior

- desktop mode renders floating windows with title bars and z-order
- mobile mode renders a launcher-centric home screen and promotes one app fullscreen at a time
- window manifests are declarative and serializable so they can cross the kernel boundary later

## Styling goals

- dark navy backdrop
- amber and phosphor-green accents
- monospaced default typography
- glassy panels with hard borders and CRT overlays
