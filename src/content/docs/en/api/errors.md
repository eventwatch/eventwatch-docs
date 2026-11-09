---
title: Error format and codes
description: The body format of EventWatch API errors, the list of codes, and how to handle errors without a code.
---

Handle failures by HTTP status, and look at `code` when you need to tell reasons apart. `message` is for people to read and its wording can change. Don't compare it in code.

## Body format

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

| Field | Content |
| --- | --- |
| `timestamp` | When the error occurred (epoch seconds) |
| `path` | The request path |
| `status` | The HTTP status |
| `error` | The name of the status |
| `message` | A description |
| `code` | A value representing the reason. It may be absent or `null` |

409 bodies also include `details` and `dayKinds`, but this API leaves them empty.

If you receive a `code` you don't know, handle the error by its status.

## List of codes

| `code` | Status | Operations | Meaning | What to do |
| --- | --- | --- | --- | --- |
| `organizationSuspended` | 403 | All | The organization is suspended | Stop sending until the suspension is lifted |
| `siteBoundToAnotherKey` | 403 | Post create or update, unpublish, delete, site detach, link | Another key that sent this site has not been revoked | Revoke the old key, then send again |
| `orgApiKeyRateLimitExceeded` | 429 | All writes | The key's rate limit was exceeded | [Wait for the number of seconds in `Retry-After`](/en/api/retries) |
| `eventDeleted` | 409 | Post create or update | The post with this identifier was deleted | Don't send with the same identifier |
| `eventAlreadyLinked` | 409 | Link | The post is connected with another identifier | Choose another post |
| `externalIdentifierInUse` | 409 | Link | Another post has this identifier | Use another identifier |
| `draftNotEditable` | 409 | Draft get or update | The post was submitted and can't be edited | Check it on the EventWatch screens |
| `eventManagedExternally` | 409 | Draft get or update | The post is linked to a post on a site | Update it on the site |
| `aiDraftLimitExceeded` | 409 | Draft create | Unsubmitted drafts have reached the limit | Submit or delete drafts on the EventWatch screens, then create |
| `idempotencyKeyReused` | 422 | Draft create | The same `Idempotency-Key` was used with different content | [Send with another value](/en/api/idempotency) |

## Errors without a code

The following errors have no `code`. Handle them by status and the human-readable `message`.

| Status | When it occurs |
| --- | --- |
| 400 | Value validation failed, `size` is over the maximum, `siteId` or `postId` is malformed, or the image format can't be accepted. A body that can't be read as JSON has no `message` |
| 401 | `X-EW-Api-Key` is missing or invalid. When the header is missing, there is no body either |
| 403 | The operation can't be called with this scope (`text/plain`) |
| 404 | The post doesn't exist, belongs to another organization, or was deleted |
| 409 | A post with the same announcement page URL already exists, or the image upload limit was reached |
| 413 | The request body is too large. Not JSON |
| 424 | Image processing failed temporarily. Try again after a while |
| 429 | The per-IP rate limit was exceeded. Not JSON, and there is no `Retry-After` |

A 409 whose `code` is `null` is handled the same way.

502, 503, and 504 mean the API can't respond for the moment. The body format isn't defined. Even if it contains a `code`, don't use it. See [Handle 503 and Retry-After](/en/api/retries).

## 400 from value validation

`message` contains the field, the rule, and the reason. When several fields fail, they appear one after another.

```json
{
  "timestamp": 1794233317,
  "path": "/api/v1.0/org-api/sites/site-1/events/101",
  "status": 400,
  "error": "Bad Request",
  "message": "Field[title]:Error[NotBlank:must not be blank]"
}
```

## Language of message

The `message` of value validation errors and not-found errors depends on `Accept-Language`: English for `en`, Japanese when the header is absent. All other `message` values are in English. `code` values don't change with the language.
