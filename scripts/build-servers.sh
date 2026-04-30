#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_DIR="$REPO_ROOT/target/wasm32-unknown-unknown/debug"
OUTPUT_DIR="$REPO_ROOT/shell/public/wasm/servers"

cargo build --manifest-path "$REPO_ROOT/Cargo.toml" --target wasm32-unknown-unknown -p window -p vfs -p device -p network
mkdir -p "$OUTPUT_DIR"
cp "$TARGET_DIR/window.wasm" "$OUTPUT_DIR/window.wasm"
cp "$TARGET_DIR/vfs.wasm" "$OUTPUT_DIR/vfs.wasm"
cp "$TARGET_DIR/device.wasm" "$OUTPUT_DIR/device.wasm"
cp "$TARGET_DIR/network.wasm" "$OUTPUT_DIR/network.wasm"
