#!/usr/bin/env bash
set -euo pipefail

pnpm build
cargo test --workspace
cargo build --workspace --target wasm32-unknown-unknown
