---
title: API authentication
description: How to call the EventWatch API with an API key, plus key scopes, revocation, and the responses to failed authentication.
---

:::caution[Coming soon]
Organizer login and API key issuance on EventWatch are not open yet. The steps on this page will become available after launch.
:::

The organization API is called from your organization's site server. A key can read and write only the data of its own organization.

## Send the key

Put the key in the `X-EW-Api-Key` request header. The host is `https://api.eventwatch.app`.

```sh
curl https://api.eventwatch.app/api/v1.0/org-api/organization \
  -H "X-EW-Api-Key: $EVENTWATCH_API_KEY"
```

On success, the response contains the key's organization and scope. You can use this call to check the connection.

```json
{
  "id": "01a1c0a3-0000-7000-8000-000000000000",
  "displayName": "Sample Organization",
  "scope": "sync"
}
```

A key is `ewk_` followed by 43 alphanumeric characters. Don't put it in the `Authorization` header. Sending the key together with `Authorization: Bearer` returns 400.

The API is meant to be called from servers and can't be called from browsers. Don't put the key in a page's JavaScript.

## Issue and revoke keys

An organization admin issues keys in the organization settings on EventWatch. The key string is shown only once, when it is issued. The issuing screen is the same as in [Get started with the WordPress plugin](/en/wordpress/setup#2-issue-an-api-key).

A revoked key returns 401 from the next request on. A key is also revoked when the person who issued it stops being an admin of the organization or leaves it.

## Scopes and callable operations

| Scope | Held by | Callable operations |
| --- | --- | --- |
| `sync` | API keys issued in the organization settings | Post sync, import, images, organization check |
| `draft` | Permission an organizer granted to an AI assistant | Drafts, images, organization check |

Only `sync` keys can be issued in the organization settings. Calling a draft operation with an issued key returns 403. `draft` is the scope used by AI assistant connections; documentation for those connections is coming soon.

| Tag | Operations | `sync` | `draft` |
| --- | --- | --- | --- |
| Post sync | [Create or update](/en/api/operations/syncevent/), [get](/en/api/operations/getsyncedevent/), [unpublish](/en/api/operations/unpublishevent/), [delete](/en/api/operations/deleteevent/), [detach site](/en/api/operations/detachsite/) | Yes | No |
| Import | [List importable posts](/en/api/operations/listlinkableevents/), [link](/en/api/operations/linkevent/) | Yes | No |
| Images | [Upload an image](/en/api/operations/uploadimage/) | Yes | Yes |
| Organization | [Check the organization](/en/api/operations/getorganization/) | Yes | Yes |
| Drafts | [Create](/en/api/operations/createdraft/), [list](/en/api/operations/listdrafts/), [get](/en/api/operations/getdraft/), [update](/en/api/operations/updatedraft/) | No | Yes |

## When authentication fails

| Situation | Response |
| --- | --- |
| `X-EW-Api-Key` is missing | 401. No body |
| The key is malformed, unknown, or revoked | 401. Body in the [error format](/en/api/errors) |
| The key was sent together with `Authorization: Bearer` | 400 |
| The operation can't be called with this scope | 403. The body is `text/plain` `Access Denied` |
| The organization is suspended | 403. `code` is `organizationSuspended` |

## Read next

- [Error format and codes](/en/api/errors)
- [Rate limits and quotas](/en/api/rate-limits)
- [Compatibility promise](/en/api/compatibility)
