#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$ROOT_DIR/webassembly" "$ROOT_DIR/ecmascript" "$ROOT_DIR/web-apis" "$ROOT_DIR/posix"

cat > "$ROOT_DIR/webassembly/README.md" <<'DOC'
# WebAssembly References

- https://webassembly.github.io/spec/core/
- https://webassembly.github.io/spec/js-api/
DOC

cat > "$ROOT_DIR/ecmascript/README.md" <<'DOC'
# ECMAScript References

- https://tc39.es/ecma262/
DOC

cat > "$ROOT_DIR/web-apis/README.md" <<'DOC'
# Web API References

- Service Worker API: https://developer.mozilla.org/docs/Web/API/Service_Worker_API
- IndexedDB API: https://developer.mozilla.org/docs/Web/API/IndexedDB_API
- Web Workers API: https://developer.mozilla.org/docs/Web/API/Web_Workers_API
- Web Audio API: https://developer.mozilla.org/docs/Web/API/Web_Audio_API
DOC

cat > "$ROOT_DIR/posix/README.md" <<'DOC'
# POSIX References

- https://pubs.opengroup.org/onlinepubs/9699919799/
DOC
