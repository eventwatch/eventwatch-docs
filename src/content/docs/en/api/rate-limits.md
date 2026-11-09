---
title: Rate limits and quotas
description: The EventWatch API's rate limits, and the limits on pagination, images, and drafts.
---

## Rate limits

| Applies to | Limit | When exceeded |
| --- | --- | --- |
| Writes (anything but `GET`) | 60 per minute per key | 429. `code` is `orgApiKeyRateLimitExceeded`, and `Retry-After` is the seconds until the next window |
| All requests | There is a per-IP limit | 429. Neither `code` nor `Retry-After` |

The write window is divided by the minute, and the count restarts when the window changes. See [Handle 503 and Retry-After](/en/api/retries) for what to do when you exceed it.

## Pagination

List operations accept `page` and `size`.

| Parameter | Content |
| --- | --- |
| `page` | Page number, starting from 0 |
| `size` | Number of items per page. The default is 20 and the maximum is 100. Over 100 returns 400 |

In [List importable posts](/en/api/operations/listlinkableevents/), linking a post removes it from the list and shifts positions. Read `page=0` again when importing several in a row.

## Identifiers

| Field | Format |
| --- | --- |
| `siteId` | Letters, digits, and hyphens, up to 64 characters |
| `postId` | Digits, up to 20 characters |

## Images

[Upload an image](/en/api/operations/uploadimage/) takes `multipart/form-data` with `file` and `purpose`.

| Item | Limit |
| --- | --- |
| Format | JPEG, PNG, WebP. Determined from the file content |
| Size | Up to 10 MiB for the entire request body. Over that returns 413. A file of exactly 10 MiB exceeds the limit because of the form boundary |
| `purpose` | `ownedEventImage` (featured image) or `ownedEventDescriptionImage` (image in the body) |
| Upload volume | 100 per organization per 24 hours. Over that returns 409 |

## Drafts

Each organization can have up to 50 unsubmitted drafts created by AI assistants. The 51st returns 409 (`code` is `aiDraftLimitExceeded`). Retrying a draft you already created succeeds even at the limit.
