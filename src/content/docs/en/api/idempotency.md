---
title: Prevent duplicate creation
description: How to resend a request whose response you didn't receive without creating a duplicate post.
---

When a network problem keeps you from receiving a response, you can't tell whether the request arrived. Each operation has the following mechanism so that resending doesn't create duplicates.

## Post sync

[Create or update a post](/en/api/operations/syncevent/) identifies a post by the pair of site ID (`siteId`) and post ID (`postId`). However many times you send the same pair, there is one post.

```sh
curl -X PUT https://api.eventwatch.app/api/v1.0/org-api/sites/my-site-1/events/101 \
  -H "X-EW-Api-Key: $EVENTWATCH_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Family Craft Workshop",
    "description": "Enjoy making crafts from everyday materials.",
    "category": 1,
    "prefectureCode": 13,
    "online": false,
    "venueName": "Central Community Center",
    "venueAddress": "1-1 Chiyoda, Chiyoda-ku, Tokyo",
    "zoneId": "Asia/Tokyo",
    "occurrenceRanges": [{ "startAt": "2027-03-20 10:00", "closeAt": "2027-03-20 12:00" }],
    "sourceUpdatedAt": "2026-11-09T10:00:00+09:00"
  }'
```

A new post returns 201 and an update returns 200. The body is `{ "applied": true, "event": { … } }`.

Set `sourceUpdatedAt` to the date and time the post was updated on the site, with an offset.

| Compared with the stored date and time | Behavior |
| --- | --- |
| Newer | Applied |
| Same | Only the content is applied; the review status doesn't change |
| Older | Not applied. Returns 200 and `"applied": false` |
| More than one day in the future | Returns 400 |

Resend a request whose response was lost with the same `sourceUpdatedAt`. Even if requests arrive out of order, old content doesn't overwrite new content.

## Draft creation

Draft operations can be called only with the `draft` scope ([Scopes and callable operations](/en/api/authentication#scopes-and-callable-operations)). They can't be called with API keys issued in the organization settings.

[Create a draft](/en/api/operations/createdraft/) requires the `Idempotency-Key` header. The value can contain letters, digits, hyphens, and underscores, up to 128 characters.

Choose a value for each piece of request content, and use the same value when resending. If you generate a new value for each resend, you can create duplicates.

| Same value within 72 hours | Behavior |
| --- | --- |
| Same content | Doesn't create a draft; returns the existing draft with 200, even if it was submitted |
| Different content | Returns 422 (`code` is `idempotencyKeyReused`) |

Values are checked per organization. After 72 hours, or after the original draft is deleted, a new draft is created.

A newly created draft returns 201.
