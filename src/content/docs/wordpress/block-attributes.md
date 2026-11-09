---
title: ブロックとショートコードの属性
description: EventWatch Events プラグインのブロックの属性と、ショートコードの属性の一覧です。
---

画面での置き方は [ブロックでイベントを表示する](/wordpress/blocks) を見てください。ここでは、テンプレートやコードから使うときの属性をまとめます。

## イベント一覧

ブロックは `eventwatch/event-list`、ショートコードは `[eventwatch_events]` です。

| ブロックの属性 | ショートコードの属性 | 型 | 既定 | 値 |
| --- | --- | --- | --- | --- |
| `layout` | `layout` | 文字列 | `cards` | `cards`・`list` |
| `perPage` | `per_page` | 整数 | `6` | 1〜24 |
| `order` | `order` | 文字列 | `asc` | `asc`・`desc` |
| `categoryId` | `category` | ブロックは整数、ショートコードはスラッグ | なし | サイトのイベントカテゴリー |
| `tagId` | `tag` | ブロックは整数、ショートコードはスラッグ | なし | サイトのイベントタグ |
| `prefecture` | `prefecture` | 整数 | `0` | 1〜47（JIS の順）。`0` は絞らない |
| `dateFrom` | `from` | 文字列 | なし | `2026-12-01` の形 |
| `dateTo` | `to` | 文字列 | なし | `2026-12-31` の形 |
| `emptyText` | `empty_text` | 文字列 | なし | イベントが無いときの文 |
| `period` | `period` | 文字列 | なし | `thisMonth`・`next30Days` |

`period` は表示のたびに今日の日付から計算し、`from` と `to` より優先します。

ショートコードの `category` と `tag` に存在しないスラッグを渡すと、イベントは 1 件も出ません。

```text
[eventwatch_events layout="list" per_page="6" prefecture="13" period="next30Days"]
```

ブロックには、次のバリエーションがあります。

| 名前 | 属性 |
| --- | --- |
| `this-month` | `period` が `thisMonth` |
| `coming-soon` | `period` が `next30Days`、`perPage` が `3` |

## 終了したイベント

ブロックは `eventwatch/past-events`、ショートコードは `[eventwatch_past_events]` です。

| ブロックの属性 | ショートコードの属性 | 型 | 既定 | 値 |
| --- | --- | --- | --- | --- |
| `layout` | `layout` | 文字列 | `list` | `cards`・`list` |
| `perPage` | `per_page` | 整数 | `6` | 1〜24 |
| `monthsBack` | `months` | 整数 | `12` | `3`・`6`・`12`・`24`・`0`（すべて） |
| `emptyText` | `empty_text` | 文字列 | なし | イベントが無いときの文 |

## イベントの検索

ブロックは `eventwatch/event-search`、ショートコードは `[eventwatch_search]` です。ブロックは 1 ページに 1 つだけ置けます。

| ブロックの属性 | ショートコードの属性 | 型 | 既定 | 値 |
| --- | --- | --- | --- | --- |
| `layout` | `layout` | 文字列 | `cards` | `cards`・`list` |
| `perPage` | `per_page` | 整数 | `6` | 1〜24 |

## イベントの詳細

イベントのページをブロックテーマで組むためのブロックです。ショートコードはありません。

`eventwatch/event-field` は、属性 `field` で出すものを選びます。既定は `dates` です。

| `field` | 出すもの |
| --- | --- |
| `back` | イベント一覧へ戻るリンク |
| `category` | カテゴリ |
| `dates` | 日時 |
| `venue` | 会場 |
| `organizer` | 主催 |
| `map` | 地図 |
| `calendar` | カレンダーに追加 |
| `interested` | 気になる |
| `share` | 共有 |
| `official` | 公式ページへのリンク |

`eventwatch/event-actions` は `eventwatch/event-field` を入れる枠で、属性はありません。
