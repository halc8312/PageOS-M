# Phase 4 IPC & Syscalls

## 概要
IPC ポート、ブロッキング受信、syscall 返却規約を完成させる。

## マイルストーン
### M-4.1 IPC ポート
- [ ] ポート作成/破棄 API を実装する（参照: `docs/architecture/ipc.md`）
- [ ] 名前付きポートレジストリを導入する
- [ ] タイムアウト付き受信を追加する

### M-4.2 Syscall 面
- [ ] ABI のエラーコードを確定する（参照: `docs/architecture/syscalls.md`）
- [ ] window / fs / time / log 系 syscall を本実装に置き換える
- [ ] トレーシング機構を追加する

## 完了条件
- サーバーとアプリが syscall 経由で結合する
- デバッグ時に IPC フローが追跡できる

## テスト要求
- IPC 単体テスト
- syscall 互換性テスト
