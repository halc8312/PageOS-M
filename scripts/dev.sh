#!/usr/bin/env bash
set -euo pipefail

pnpm build:rust
pnpm dev --host 0.0.0.0 --port 5173
