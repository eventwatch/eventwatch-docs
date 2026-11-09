# eventwatch-docs

[EventWatch](https://eventwatch.app) の公開ドキュメント（ https://docs.eventwatch.app ）のソースです。[Astro Starlight](https://starlight.astro.build/) で組んでいます。

## 開発

```bash
npm ci
npm run dev
```

Node の版は `.nvmrc` にあります。PR の前に `npm test`・`npm run check`・`npm run build` を通してください。リンクが切れているとビルドが失敗します。

執筆の規則は [AGENTS.md](./AGENTS.md) にあります。

## ライセンス

- 文書（`src/content/` の下）: [CC BY 4.0](./LICENSE)
- コード（それ以外と、文書の中のサンプルコード）: [MIT](./LICENSE-CODE)

EventWatch の名前とロゴは、これらのライセンスの対象外です。
