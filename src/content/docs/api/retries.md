---
title: 503 と Retry-After を受ける
description: EventWatch の API が一時的に応じられないときに、要求を送り直す方法です。
---

混み合っているとき、API は 503 と `Retry-After` を返します。429 にも `Retry-After` が付きます。

## 待ち時間

- `Retry-After`（秒）を下回らずに待ちます
- たくさんのサーバーが同じ瞬間に戻らないよう、待ち時間に上向きのばらつきを足します（たとえば 20% まで）
- 秒数は混み具合で変わります。固定の値として読まないでください
- `Retry-After` が無いときは、すぐに送り直さず、次の定期の処理まで待ちます

502 と 504 も一時的な失敗です。本文は JSON とは限らないので、ステータスだけで扱ってください。

## 送り直してよい要求

| 要求 | 送り直し |
| --- | --- |
| 読み取り（`GET`） | そのまま送り直せます |
| 投稿の作成・更新（`PUT`） | 同じ `sourceUpdatedAt` で送り直せます |
| 下書きの作成（`POST`） | 同じ `Idempotency-Key` と同じ内容で送り直せます |
| 投稿の削除（`DELETE`） | 送り直せます。削除済みでも 204 です |
| 結び付け | 同じ組の再送は 200 です |

詳しくは [二重の作成を防ぐ](/api/idempotency) を見てください。

## 回数

1 つの要求を何度も続けて送り直さないでください。1 度送り直しても失敗したら、処理を止めて、次の定期の処理か利用者の操作に回します。

## 例

`Retry-After` を読んで 1 度だけ送り直す例です。

```sh
url="https://api.eventwatch.app/api/v1.0/org-api/organization"
headers="$(mktemp)"

status=$(curl -s -o /dev/null -D "$headers" -w '%{http_code}' \
  -H "X-EW-Api-Key: $EVENTWATCH_API_KEY" "$url")

if [ "$status" = "503" ] || [ "$status" = "429" ]; then
  wait=$(tr -d '\r' < "$headers" | awk 'tolower($1) == "retry-after:" { print $2 }')
  if [ -n "$wait" ]; then
    sleep "$wait"
    curl -s -H "X-EW-Api-Key: $EVENTWATCH_API_KEY" "$url"
  fi
fi

rm -f "$headers"
```
