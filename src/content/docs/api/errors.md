---
title: エラーの形と code
description: EventWatch の API が返すエラーの本文の形と、code の一覧、code の無いエラーの扱いです。
---

失敗の扱いは HTTP のステータスで分け、理由を見分けたいときは `code` を見ます。`message` は人が読むためのもので、文面は変わることがあります。プログラムで比べないでください。

## 本文の形

```json
{
  "timestamp": 1794233317,
  "path": "/api/v1.0/org-api/sites/site-1/events/101",
  "status": 403,
  "error": "Forbidden",
  "message": "This site is connected with another API key.",
  "code": "siteBoundToAnotherKey"
}
```

| 項目 | 内容 |
| --- | --- |
| `timestamp` | 起きた時刻（エポック秒） |
| `path` | 要求のパス |
| `status` | HTTP のステータス |
| `error` | ステータスの名前 |
| `message` | 説明 |
| `code` | 理由を表す値。無いこと、`null` のことがあります |

409 の本文には `details` と `dayKinds` も付きますが、この API では中身が入りません。

知らない `code` を受け取ったら、ステータスで扱ってください。

## code の一覧

| `code` | ステータス | 起きる操作 | 意味 | すること |
| --- | --- | --- | --- | --- |
| `organizationSuspended` | 403 | すべて | 団体が停止されている | 解除まで送るのを止める |
| `siteBoundToAnotherKey` | 403 | 投稿の作成・更新、取り下げ、削除、サイトの切り離し、結び付け | そのサイトを送った別のキーが失効せずに残っている | 古いキーを失効させてから送り直す |
| `orgApiKeyRateLimitExceeded` | 429 | 書き込みすべて | キーの流量を超えた | [`Retry-After` の秒数を待つ](/api/retries) |
| `eventDeleted` | 409 | 投稿の作成・更新 | その識別子の投稿は削除された | 同じ識別子で送らない |
| `eventAlreadyLinked` | 409 | 結び付け | 投稿は別の識別子で接続されている | 別の投稿を選ぶ |
| `externalIdentifierInUse` | 409 | 結び付け | その識別子を別の投稿が持っている | 別の識別子を使う |
| `draftNotEditable` | 409 | 下書きの取得・更新 | 提出済みで編集できない | EventWatch の画面で確かめる |
| `eventManagedExternally` | 409 | 下書きの取得・更新 | サイトの投稿に結び付いている | サイトの側で更新する |
| `aiDraftLimitExceeded` | 409 | 下書きの作成 | 未提出の下書きが上限に達した | EventWatch の画面で下書きを提出するか削除してから作る |
| `idempotencyKeyReused` | 422 | 下書きの作成 | 同じ `Idempotency-Key` を違う内容で使った | [別の値で送る](/api/idempotency) |

## code の無いエラー

次のエラーには `code` がありません。ステータスと、人が読む `message` で扱います。

| ステータス | 起きるとき |
| --- | --- |
| 400 | 値の検証に失敗した、`size` が上限を超えた、`siteId`・`postId` の形が違う、画像の形式を受け付けられない。JSON として読めない本文では `message` が付きません |
| 401 | `X-EW-Api-Key` が無い・無効。ヘッダーが無いときは本文もありません |
| 403 | 範囲で呼べない操作を呼んだ（`text/plain`） |
| 404 | 投稿が無い、ほかの団体の投稿、削除済み |
| 409 | 同じ告知ページの URL の投稿がすでにある、画像の投入の上限に達した |
| 413 | 要求の本文が大きすぎる。JSON ではありません |
| 424 | 画像の処理が一時的に失敗した。時間を置いて送り直してください |
| 429 | IP ごとの流量を超えた。JSON ではなく、`Retry-After` もありません |

`code` が `null` の 409 も同じ扱いです。

502・503・504 は一時的に応じられないことを表します。本文の形は決まっていません。`code` が入っていても使わないでください。扱いは [送り直しの扱い](/api/retries) を見てください。

## 値の検証の 400

`message` に、項目と規則と理由が入ります。項目が複数あるときは続けて並びます。

```json
{
  "timestamp": 1794233317,
  "path": "/api/v1.0/org-api/sites/site-1/events/101",
  "status": 400,
  "error": "Bad Request",
  "message": "Field[title]:Error[NotBlank:must not be blank]"
}
```

## message の言語

値の検証と「見つからない」の `message` は、`Accept-Language` で変わります。`en` なら英語、ヘッダーが無ければ日本語です。そのほかの `message` は英語です。`code` の値は言語で変わりません。
