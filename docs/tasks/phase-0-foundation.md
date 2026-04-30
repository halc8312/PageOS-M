# Phase 0 Foundation

## 概要
Phase 0 builds the repository, toolchains, boot experience, minimal kernel/server/app crates, and the first responsive shell.

## 参照
- `docs/architecture/overview.md`
- `docs/architecture/kernel.md`
- `docs/architecture/window-system.md`
- `docs/design/responsive.md`
- `docs/conventions/testing.md`

## マイルストーン
### M-0.1 基盤構成
- [ ] ルートの pnpm/Cargo/Vite/Playwright 構成を作成する（参照: Overview / Build surfaces）
- [ ] Rust workspace に kernel・servers・apps・lib を登録する
- [ ] GitHub Actions と GitHub Pages デプロイの雛形を作成する

### M-0.2 ドキュメントと規約
- [ ] アーキテクチャ文書と UI 設計文書を完成させる（参照: docs/architecture/*, docs/design/*）
- [ ] phase-0 〜 phase-8 のタスクツリーを整備する
- [ ] README に開発手順・構成・制約・検証結果を記載する

### M-0.3 Rust ランタイム雛形
- [ ] 最小カーネルの初期化・ログ・プロセス表・スケジューラ雛形を実装する（参照: kernel.md, scheduler.md）
- [ ] 共通 ABI / runtime / FS 型クレートを定義する
- [ ] system server / app クレートの no_std 雛形を追加する

### M-0.4 Shell と UI 雛形
- [ ] 起動スプラッシュと CRT ログ演出を実装する
- [ ] デスクトップモードのウィンドウ UI を表示する
- [ ] モバイルホーム画面と 768px ブレークポイント切替を実装する

### M-0.5 統合と検証
- [ ] Service Worker から kernel WASM をロードしてログを取得する
- [ ] Playwright E2E とホスト向け Rust テストを通す
- [ ] `pnpm build` と `cargo build --workspace --target wasm32-unknown-unknown` を成功させる

## 完了条件
- Phase 0 完了条件 1〜8 をリポジトリ上で実証できる
- ブラウザでデスクトップ/モバイル両モードの初期画面が表示される
- CI で build/e2e/deploy の基礎が動作する

## テスト要求
- `cargo test --workspace`
- `cargo build --workspace --target wasm32-unknown-unknown`
- `pnpm install`
- `pnpm build`
- `pnpm test:e2e`
