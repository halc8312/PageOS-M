# Phase 3 Process & Scheduler

## 概要
PCB を拡張し、worker-backed user process と cooperative/preemptive 併用スケジューラへ進化させる。

## マイルストーン
### M-3.1 PCB 拡張
- [ ] プロセス親子関係と capability を保持する
- [ ] 起動引数と環境ブロックを追加する
- [ ] プロセス状態遷移の監査ログを追加する

### M-3.2 スケジューラ改善
- [ ] timeslice accounting を導入する（参照: `docs/architecture/scheduler.md`）
- [ ] 優先度クラスを追加する
- [ ] sysmon でスケジューリング情報を表示する

## 完了条件
- user worker の起動/停止/監視が可能になる
- CPU 使用率表示がシステムモニタで見える

## テスト要求
- 状態遷移テスト
- 複数 worker 起動の E2E テスト
