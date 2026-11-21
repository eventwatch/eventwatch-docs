---
title: MCP の接続と認証
description: EventWatch の MCP サーバーの接続先と、OAuth の方式・スコープ・トークンの期限・失効・認証に失敗したときの応答です。
---

EventWatch の MCP サーバーは、主催者が自分の AI アシスタントから下書きを作るための口です。主催者が AI アシスタントに与えた許可（範囲は `draft`）で動きます。主催者がつなぐ手順は [AI アシスタントで下書きを作る](/ai-assistants/connect) にあります。

## 接続先

| 項目 | 値 |
| --- | --- |
| MCP の URL | `https://eventwatch.app/api/mcp` |
| トランスポート | Streamable HTTP |
| 認証 | OAuth 2.1 のアクセストークンを `Authorization: Bearer` で送る |

`/en/api/mcp` のような言語つきのパスはありません。

## メタデータ

トークンを付けずに呼ぶと 401 になり、`WWW-Authenticate` が保護リソースのメタデータの場所を指します。

```sh
curl -i -X POST https://eventwatch.app/api/mcp \
  -H 'Content-Type: application/json' -d '{}'
```

```http
HTTP/2 401
www-authenticate: Bearer resource_metadata="https://eventwatch.app/.well-known/oauth-protected-resource/api/mcp"

{"error":"invalid_token"}
```

保護リソースのメタデータ（RFC 9728）:

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

認可サーバーのメタデータ（RFC 8414）:

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

## クライアント

- **`client_id` はクライアント ID メタデータ文書（CIMD）の URL だけを受けます。** 動的クライアント登録（DCR）と、事前に登録したクライアントはありません。DCR だけに対応した AI アシスタントはつなげません
- `client_id` の URL は https・既定のポート（443）で、パスを持つ形にします。IP アドレス・ユーザー情報・フラグメントを含む URL は受けません
- `redirect_uri` は文書に書いた値と完全に一致させます。ポートを問わないのは `localhost` と `127.0.0.1` だけです
- 公開クライアントです（クライアントの秘密は使いません）。PKCE（`S256`）が必須です

## スコープ

| スコープ | 内容 |
| --- | --- |
| `events:draft` | AI アシスタントが作った下書きの作成・更新・読み取り、下書きへの画像の投入、主催者の名前の読み取り |
| `offline_access` | リフレッシュトークンを求める。付けなくてもリフレッシュトークンを出します |

ほかのスコープを含む要求は断ります。スコープを省くと `events:draft` を求めたものとして扱います。

許可は主催者の 1 人が、所属する主催者の 1 つに対して出します。ツールが扱える下書きの範囲は主催者ごとで、許可ごとではありません。別の AI アシスタントに替えても、同じ主催者の AI の下書きの続きを直せます。

## トークン

| 種類 | 期限 |
| --- | --- |
| 認可コード | 5 分。1 回だけ使えます |
| アクセストークン | 1 時間（`expires_in` は 3600） |
| リフレッシュトークン | 90 日。使うたびに新しいものに入れ替わります |

**使用済みの認可コードやリフレッシュトークンをもう一度送ると `invalid_grant` になり、その許可から出た一連のトークンがすべて失効します。** 応答を受け取れずに同じリフレッシュトークンで送り直したときや、2 つの要求が同時に更新したときも同じです。この場合、主催者がつなぎ直す必要があります。リフレッシュは 1 つの要求ずつ行い、応答で受け取った新しいリフレッシュトークンを保存してから次に使ってください。

## 失効

次のとき、許可は失効し、次の要求から使えなくなります。AI アシスタントが作った下書きは残ります。

- 主催者の画面（「主催者の設定 › AI アシスタント」）で取り消した。本人は自分の許可を、主催者の管理者はすべての許可を取り消せます
- 許可を出した人が、主催者のメンバーから外された・抜けた・退会した
- 主催者がなくなった

主催者が EventWatch に停止されているあいだは、許可は失効しませんが、下書きを変えられません（下の表）。

## 認証に失敗したとき

| 状況 | 応答 |
| --- | --- |
| トークンが無い、形が違う、期限切れ・失効している、範囲が `draft` でない | 401。`WWW-Authenticate` で保護リソースのメタデータを指します |
| 主催者が停止されている | 接続は通ります。ツールは、下書きを変えられないことと、EventWatch に問い合わせるよう主催者へ伝える文を返します |
| EventWatch 側で一時的に確かめられない | 503（`Retry-After: 10`）。この応答でつなぎ直しを始めないでください |

ツールの中で起きたエラーは、MCP のツールの結果（`isError: true`）として返ります。内容は [MCP のツール](/mcp/tools) にあります。
