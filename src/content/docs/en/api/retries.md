---
title: Handle 503 and Retry-After
description: How to resend requests when the EventWatch API temporarily can't respond.
---

When it is busy, the API returns 503 or 429. The key rate limit's 429 and most 503 responses include `Retry-After`. The per-IP rate limit's 429 and some 503 responses don't.

## Wait time

- Wait for at least `Retry-After` (in seconds)
- Add upward jitter to the wait (for example, up to 20%) so that many servers don't return at the same moment
- The number of seconds changes with load. Don't treat it as a fixed value
- If there is no `Retry-After`, don't resend right away; wait for your next scheduled run

502 and 504 are temporary failures too. The body isn't always JSON, so handle them by status alone.

## Requests you can resend

| Request | Resending |
| --- | --- |
| Reads (`GET`) | Resend as they are |
| Post create or update (`PUT`) | Resend with the same `sourceUpdatedAt` |
| Draft create (`POST`) | Resend with the same `Idempotency-Key` and the same content |
| Post delete (`DELETE`) | Can be resent. Returns 204 even if already deleted |
| Link | Resending the same pair returns 200 |

See [Prevent duplicate creation](/en/api/idempotency) for details.

## Number of attempts

Don't keep resending one request over and over. If it still fails after one resend, stop and leave it to your next scheduled run or a user action.

## Example

This example resends once, and only when `Retry-After` is present.

```sh
url="https://api.eventwatch.app/api/v1.0/org-api/organization"
headers="$(mktemp)"
body="$(mktemp)"

request() {
  curl -s -o "$body" -D "$headers" -w '%{http_code}' \
    -H "X-EW-Api-Key: $EVENTWATCH_API_KEY" "$url"
}

status=$(request)

if [ "$status" = "503" ] || [ "$status" = "429" ]; then
  wait=$(tr -d '\r' < "$headers" | awk 'tolower($1) == "retry-after:" { print $2 }')
  if [ -n "$wait" ]; then
    sleep "$wait"
    status=$(request)
  fi
fi

echo "status: $status"
cat "$body"
rm -f "$headers" "$body"
```
