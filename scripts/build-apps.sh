#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_DIR="$REPO_ROOT/target/wasm32-unknown-unknown/debug"
OUTPUT_DIR="$REPO_ROOT/shell/public/wasm/apps"

cargo build --manifest-path "$REPO_ROOT/Cargo.toml" --target wasm32-unknown-unknown -p app-shell -p terminal -p editor -p filemgr -p sysmon -p settings -p calc
mkdir -p "$OUTPUT_DIR"
cp "$TARGET_DIR/app_shell.wasm" "$OUTPUT_DIR/shell.wasm"
cp "$TARGET_DIR/terminal.wasm" "$OUTPUT_DIR/terminal.wasm"
cp "$TARGET_DIR/editor.wasm" "$OUTPUT_DIR/editor.wasm"
cp "$TARGET_DIR/filemgr.wasm" "$OUTPUT_DIR/filemgr.wasm"
cp "$TARGET_DIR/sysmon.wasm" "$OUTPUT_DIR/sysmon.wasm"
cp "$TARGET_DIR/settings.wasm" "$OUTPUT_DIR/settings.wasm"
cp "$TARGET_DIR/calc.wasm" "$OUTPUT_DIR/calc.wasm"
