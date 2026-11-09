---
title: 変更履歴の見方
description: EventWatch の API と WordPress プラグインの変更を、どこで確かめるかをまとめます。
---

EventWatch の API と WordPress プラグインは、別々に版を持ちます。何を使っているかで、見る場所が変わります。

| 使っているもの | 版の場所 | 変更を見る場所 |
| --- | --- | --- |
| API を直接呼んでいる | URL の `/api/v1.0/`、[API の概要](/api/) の版 | [仕様のファイルの履歴](https://github.com/eventwatch/eventwatch-docs/commits/main/openapi/org-api.json) |
| WordPress プラグインを使っている | プラグインの一覧に出る版 | [プラグインの readme の Changelog](https://github.com/eventwatch/eventwatch-wordpress/blob/main/readme.txt) |

## API

API の版は、[破壊的変更](/api/compatibility) のときにだけ上がります。項目の追加など破壊的でない変更では版が変わらないので、変更を追うときは仕様のファイルの履歴を見ます。

破壊的変更の予告は、[互換性の約束](/api/compatibility) のとおりこのサイトに載せます。

## WordPress プラグイン

プラグインの版は、機能の追加や修正のたびに上がります。プラグインが呼ぶ API の版は、プラグインの更新の中で切り替わります。プラグインを使っているだけなら、API の版を気にする必要はありません。
