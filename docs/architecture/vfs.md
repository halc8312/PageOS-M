# VFS Design

The VFS server abstracts IndexedDB-backed storage behind POSIX-inspired handles.

## Phase 0 scope

- shared file metadata types live in `pageos-fs`
- the VFS server crate exports a stable initialization entry point
- browser shell exposes an IndexedDB driver with directory-oriented helper methods
- no on-disk persistence schema migration is required yet

## Direction

Later phases will add namespaces, permissions, mount points, and journaling.
