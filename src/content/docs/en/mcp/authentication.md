---
title: MCP connection and authentication
description: The EventWatch MCP server's endpoint, OAuth method, scopes, token lifetimes, revocation, and responses when authentication fails.
---

The EventWatch MCP server lets organizers create drafts from their own AI assistant. It works with the permission an organizer gives to an AI assistant (the `draft` scope). The steps organizers follow to connect are in [Create drafts with an AI assistant](/en/ai-assistants/connect).

## Endpoint

| Item | Value |
| --- | --- |
| MCP URL | `https://eventwatch.app/api/mcp` |
| Transport | Streamable HTTP |
| Authentication | Send an OAuth 2.1 access token in `Authorization: Bearer` |

There is no language-prefixed path such as `/en/api/mcp`.

## Metadata

A call without a token returns 401, and `WWW-Authenticate` points to the protected resource metadata.

```sh
curl -i -X POST https://eventwatch.app/api/mcp \
  -H 'Content-Type: application/json' -d '{}'
```

```http
HTTP/2 401
www-authenticate: Bearer resource_metadata="https://eventwatch.app/.well-known/oauth-protected-resource/api/mcp"

{"error":"invalid_token"}
```

Protected resource metadata (RFC 9728):

```sh
curl https://eventwatch.app/.well-known/oauth-protected-resource/api/mcp
```

```json
{
  "resource": "https://eventwatch.app/api/mcp",
  "authorization_servers": ["https://eventwatch.app"],
  "scopes_supported": ["events:draft", "offline_access"],
  "bearer_methods_supported": ["header"]
}
```

Authorization server metadata (RFC 8414):

```sh
curl https://eventwatch.app/.well-known/oauth-authorization-server
```

```json
{
  "issuer": "https://eventwatch.app",
  "authorization_endpoint": "https://eventwatch.app/oauth/authorize",
  "token_endpoint": "https://api.eventwatch.app/api/v1.0/oauth/token",
  "response_types_supported": ["code"],
  "grant_types_supported": ["authorization_code", "refresh_token"],
  "code_challenge_methods_supported": ["S256"],
  "token_endpoint_auth_methods_supported": ["none"],
  "client_id_metadata_document_supported": true,
  "scopes_supported": ["events:draft", "offline_access"]
}
```

## Clients

- **`client_id` must be the URL of a Client ID Metadata Document (CIMD).** There is no Dynamic Client Registration (DCR) and no pre-registered client. AI assistants that support only DCR can't connect
- The `client_id` URL uses https on the default port (443) and has a path. URLs with an IP address, user info, or a fragment are rejected
- `redirect_uri` must exactly match a value in the document. Only `localhost` and `127.0.0.1` ignore the port
- Clients are public (no client secret). PKCE (`S256`) is required

## Scopes

| Scope | Meaning |
| --- | --- |
| `events:draft` | Create, update, and read drafts that AI assistants made, upload images to drafts, and read the organizer's name |
| `offline_access` | Request a refresh token. A refresh token is issued even without it |

Requests that include any other scope are rejected. Omitting the scope is treated as requesting `events:draft`.

One member of an organizer grants the permission for one organizer they belong to. The drafts the tools can access are scoped to the organizer, not to the permission. Even after switching to another AI assistant, you can keep editing the same organizer's AI drafts.

## Tokens

| Type | Lifetime |
| --- | --- |
| Authorization code | 5 minutes. Single use |
| Access token | 1 hour (`expires_in` is 3600) |
| Refresh token | 90 days. Replaced with a new one each time it is used |

**Sending a used authorization code or refresh token again returns `invalid_grant` and revokes every token issued from that permission.** The same happens when you resend a refresh token after losing the response, or when two requests refresh at the same time. The organizer then has to connect again. Refresh one request at a time, and store the new refresh token from the response before using it.

## Revocation

A permission is revoked in the following cases and stops working from the next request. Drafts the AI assistant made stay.

- It was revoked on **Organizer settings › AI assistants**. People can revoke their own permissions, and organizer admins can revoke all of them
- The person who granted it was removed from or left the organizer, or closed their account
- The organizer was dissolved

While EventWatch has suspended the organizer, permissions stay valid, but drafts can't be changed (see the table below).

## When authentication fails

| Situation | Response |
| --- | --- |
| No token, malformed token, expired or revoked token, or a scope other than `draft` | 401. `WWW-Authenticate` points to the protected resource metadata |
| The organizer is suspended | The connection succeeds. Tools return a message telling the organizer that drafts can't be changed and to contact EventWatch |
| EventWatch can't check the token temporarily | 503 (`Retry-After: 10`). Don't start reconnecting on this response |

Errors inside tools are returned as MCP tool results (`isError: true`). See [MCP tools](/en/mcp/tools).
