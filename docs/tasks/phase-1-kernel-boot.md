# Phase 1 Kernel Boot

## 概要
Service Worker 内での本格的なブートストラップ、モジュールロード、診断チャンネルを強化する。

## マイルストーン
### M-1.1 ブートプロトコル
- [ ] ブートメッセージの schema version を固定する（参照: `docs/architecture/overview.md`）
- [ ] kernel init / tick / shutdown のライフサイクルを統一する
- [ ] ブート失敗時の復旧 UI を用意する

### M-1.2 診断
- [ ] ログレベルとログリングバッファを実装する
- [ ] ブート計測値を shell へ公開する
- [ ] 開発用 diagnostics panel を追加する

## 完了条件
- 起動失敗を UI から再試行できる
- ブート状態がシリアライズ可能になる

## テスト要求
- ブートライフサイクルの単体テスト
- エラー系 E2E テスト
