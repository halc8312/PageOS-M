# Testing Conventions

- Rust のロジックは `cargo test --workspace` でホスト実行する
- ブラウザ統合は Playwright で検証する
- 重要な UI 状態はデスクトップ/モバイル両方を確認する
- ビルド失敗を防ぐため CI では Rust と pnpm を別ジョブで実行する
