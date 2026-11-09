---
title: API の認証
description: EventWatch の API を API キーで呼ぶ方法と、キーの範囲・失効・認証に失敗したときの応答です。
---

:::caution[準備中です]
EventWatch の主催者のログインと API キーの発行は、まだ開いていません。このページの手順は、公開の後に使えるようになります。
:::

団体の API は、団体のサイトのサーバーから呼びます。キーで読み書きできるのは、そのキーの団体のデータだけです。

## キーを送る

要求のヘッダー `X-EW-Api-Key` にキーを入れます。接続先は `https://api.eventwatch.app` です。

```sh
curl https://api.eventwatch.app/api/v1.0/org-api/organization \
  -H "X-EW-Api-Key: $EVENTWATCH_API_KEY"
```

成功すると、キーの団体と範囲が返ります。接続の確認に使えます。

```json
{
  "id": "01a1c0a3-0000-7000-8000-000000000000",
  "displayName": "見本の団体",
  "scope": "sync"
}
```

キーは `ewk_` と 43 字の英数字です。`Authorization` ヘッダーには入れません。キーと `Authorization: Bearer` を同時に送ると 400 になります。

API はサーバーから呼ぶためのもので、ブラウザーからは呼べません。キーをページの JavaScript に書かないでください。

## キーの発行と失効

団体の管理者が、EventWatch の団体の設定で発行します。キーの文字列は発行のときに 1 度だけ表示されます。発行の画面の手順は [WordPress プラグインの導入](/wordpress/setup#2-api-キーを発行する) と同じです。

失効させたキーは、次の要求から 401 になります。発行した人が団体の管理者でなくなったときや、団体を抜けたときも失効します。

## 範囲と呼べる操作

| 範囲 | 持ち主 | 呼べる操作 |
| --- | --- | --- |
| `sync` | 団体の設定で発行した API キー | 投稿の同期・取り込み・画像・団体の確認 |
| `draft` | 主催者が AI アシスタントに与えた許可 | 下書き・画像・団体の確認 |

| タグ | 操作 | `sync` | `draft` |
| --- | --- | --- | --- |
| 投稿の同期 | [作成・更新](/api/operations/syncevent/)・[取得](/api/operations/getsyncedevent/)・[取り下げ](/api/operations/unpublishevent/)・[削除](/api/operations/deleteevent/)・[サイトの切り離し](/api/operations/detachsite/) | ○ | × |
| 取り込み | [取り込める投稿の一覧](/api/operations/listlinkableevents/)・[結び付け](/api/operations/linkevent/) | ○ | × |
| 画像 | [画像の投入](/api/operations/uploadimage/) | ○ | ○ |
| 団体 | [団体の確認](/api/operations/getorganization/) | ○ | ○ |
| 下書き | [作成](/api/operations/createdraft/)・[一覧](/api/operations/listdrafts/)・[取得](/api/operations/getdraft/)・[更新](/api/operations/updatedraft/) | × | ○ |

## 認証に失敗したとき

| 状況 | 応答 |
| --- | --- |
| `X-EW-Api-Key` が無い | 401。本文はありません |
| キーの形が違う・知られていない・失効している | 401。[エラーの形](/api/errors) の本文 |
| キーと `Authorization: Bearer` を同時に送った | 400 |
| 範囲で呼べない操作を呼んだ | 403。本文は `text/plain` の `Access Denied` です |
| 団体が停止されている | 403。`code` は `organizationSuspended` |

## 次に読む

- [エラーの形と code](/api/errors)
- [流量と上限](/api/rate-limits)
- [互換性の約束](/api/compatibility)
