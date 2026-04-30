# Rust Conventions

- `#![no_std]` を基本とし、必要な共有型のみ `alloc` を使う
- `clippy::pedantic` を有効にし、意図的な例外は局所的に明示する
- `Result` / `ErrorCode` で失敗を表現する
- ABI に関わる型は `repr(C)` を付ける
