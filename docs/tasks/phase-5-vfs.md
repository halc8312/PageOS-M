# Phase 5 VFS

## 概要
IndexedDB を持続ストレージとして使う VFS サーバーを整備する。

## マイルストーン
### M-5.1 名前空間とメタデータ
- [ ] inode 相当メタデータを定義する（参照: `docs/architecture/vfs.md`）
- [ ] mount point と root namespace を導入する
- [ ] ファイル属性 API を追加する

### M-5.2 永続化
- [ ] IndexedDB スキーマとマイグレーションを実装する
- [ ] 読み書きキャッシュを追加する
- [ ] editor/filemgr から実際にファイルアクセスできるようにする

## 完了条件
- 再起動後もファイルが残る
- file manager から基本操作ができる

## テスト要求
- VFS ロジックのホスト単体テスト
- 永続化 E2E テスト
