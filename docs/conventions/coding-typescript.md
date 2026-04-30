# TypeScript Conventions

- `strict` を前提に暗黙の `any` を禁止する
- UI 状態は不変データ + 明示的な reducer/renderer で扱う
- DOM 操作は narrow した要素型に対してのみ行う
- 브라우ザ互換性のため標準 API を優先する
