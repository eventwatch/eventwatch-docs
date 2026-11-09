---
title: 二重の作成を防ぐ
description: 応答を受け取れなかった要求を送り直しても、投稿が二重にできないようにする方法です。
---

ネットワークの都合で応答を受け取れないと、要求が届いたかどうかが分かりません。送り直しても二重にならないよう、操作ごとに次の仕組みがあります。

## 投稿の同期

[投稿の作成・更新](/api/operations/syncevent/) は、サイトの ID（`siteId`）と投稿の ID（`postId`）の組で投稿を見分けます。同じ組で何度送っても、投稿は 1 つです。

```sh
curl -X PUT https://api.eventwatch.app/api/v1.0/org-api/sites/my-site-1/events/101 \
  -H "X-EW-Api-Key: $EVENTWATCH_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "親子で楽しむ工作教室",
    "description": "身近な材料で工作を楽しみます。",
    "category": 1,
    "prefectureCode": 13,
    "online": false,
    "venueName": "中央公民館",
    "venueAddress": "東京都千代田区千代田1-1",
    "zoneId": "Asia/Tokyo",
    "occurrenceRanges": [{ "startAt": "2027-03-20 10:00", "closeAt": "2027-03-20 12:00" }],
    "sourceUpdatedAt": "2026-11-09T10:00:00+09:00"
  }'
```

新しい投稿は 201、更新は 200 で、本文は `{ "applied": true, "event": { … } }` です。

`sourceUpdatedAt` には、サイトで投稿を更新した日時をオフセット付きで入れます。

| 保存済みの日時と比べて | 動き |
| --- | --- |
| 新しい | 反映します |
| 同じ | 内容だけ反映し、審査の状態は変えません |
| 古い | 反映しません。200 と `"applied": false` を返します |
| 未来へ 1 日を超えている | 400 になります |

応答を失った要求は、同じ `sourceUpdatedAt` で送り直してください。順番が入れ替わって届いても、古い内容で上書きされません。

## 下書きの作成

下書きの操作は `draft` の範囲だけが呼べます（[範囲と呼べる操作](/api/authentication#範囲と呼べる操作)）。団体の設定で発行した API キーでは呼べません。

[下書きの作成](/api/operations/createdraft/) は、ヘッダー `Idempotency-Key` が必須です。値は英数字とハイフン・アンダースコアで 128 字までです。

要求の内容ごとに値を決め、送り直すときは同じ値を使います。送り直すたびに値を作り直すと、二重にできます。

| 72 時間以内の同じ値 | 動き |
| --- | --- |
| 同じ内容 | 作らずに、すでにある下書きを 200 で返します。提出済みでも返します |
| 違う内容 | 422（`code` は `idempotencyKeyReused`）になります |

値は団体ごとに見ます。72 時間を過ぎたとき、または元の下書きを削除したときは、新しく作ります。

新しく作ったときは 201 です。
