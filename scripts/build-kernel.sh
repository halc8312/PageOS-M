#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_DIR="$REPO_ROOT/target/wasm32-unknown-unknown/debug"
OUTPUT_DIR="$REPO_ROOT/shell/public/wasm"

cargo build --manifest-path "$REPO_ROOT/kernel/Cargo.toml" --target wasm32-unknown-unknown
mkdir -p "$OUTPUT_DIR"
cp "$TARGET_DIR/kernel.wasm" "$OUTPUT_DIR/kernel.wasm"
