---
title: MCP tools
description: Inputs, limits, and return values of the eight tools on the EventWatch MCP server, plus their shared constraints and errors.
---

The EventWatch MCP server has the following eight tools. Connection and authentication are in [MCP connection and authentication](/en/mcp/authentication).

| Tool | Kind | What it does |
| --- | --- | --- |
| `get_organization` | Read | ID and name of the connected organizer |
| `list_event_options` | Read | Category and prefecture IDs |
| `search_tags` | Read | Tag candidates |
| `list_event_drafts` | Read | List of drafts that AI assistants made |
| `get_event_draft` | Read | One draft that AI assistants made, with the reason if it was sent back |
| `create_event_draft` | Write | Create a draft |
| `update_event_draft` | Write | Edit a draft |
| `attach_event_image` | Write | Attach an image from the conversation to a draft |

## Shared constraints

- **There are no tools to send for review, publish, unpublish, or delete.** Organizers send drafts for review on the EventWatch website
- Tools can access only drafts that AI assistants made and that are unsubmitted (`draft`) or sent back (`rejected`). Drafts people made on the web, other organizers' drafts, and drafts that don't exist are reported as not found
- Drafts that have been sent for review, are published, or are private can't be changed. Drafts connected to a WordPress site are edited on that site
- Each organizer can have up to 50 unsubmitted drafts created by AI assistants
- Writes are limited to 60 per minute per permission ([Rate limits and quotas](/en/api/rate-limits))
- Date-times use the `YYYY-MM-DD HH:mm` format and are read in `zoneId` (default `Asia/Tokyo`)

## Return values

Tools that return a draft add `editUrl` (the organizer's edit page) to the draft's fields. The create, update, and image tools also list notes for the organizer in `notes`:

- that it is an unpublished draft, and that the organizer should check it at `editUrl` and send it for review
- when there's no image, that one can be added on the edit page

After creating a draft, give the `editUrl` to the organizer.

## Tools

### `get_organization`

No input. Returns the connected organizer's `id` and `displayName`.

### `list_event_options`

No input. Returns `id`, `nameJa`, and `nameEn` for categories and prefectures (1–47). Use these IDs for a draft's `category` and `prefectureCode`.

### `search_tags`

| Input | Type | Meaning |
| --- | --- | --- |
| `query` | string (required) | Prefix of the tag name. 1–100 characters after trimming whitespace |

Tags can be set only by ID. New tags can't be created.

### `list_event_drafts`

| Input | Type | Meaning |
| --- | --- | --- |
| `page` | integer | Page number from 0. Default 0 |
| `size` | integer | Items per page. 1–100, default 20 |

Returns `total` and `list`, newest first. Check here that the same draft doesn't already exist before creating one.

### `get_event_draft`

| Input | Type | Meaning |
| --- | --- | --- |
| `id` | UUID (required) | Draft ID |

If the draft was sent back, the reason is included.

### `create_event_draft`

Only `title` is required.

| Input | Type | Meaning |
| --- | --- | --- |
| `title` | string (required) | 1–256 characters |
| `startAt` | date-time | Start. Required unless `occurrenceRanges` is sent |
| `closeAt` | date-time | End. Defaults to the start |
| `occurrenceRanges` | array | For multiple dates. 1–100 pairs of `startAt` and `closeAt`. Pairs must not overlap or touch. Don't send together with `startAt`/`closeAt` |
| `holdingPeriodNote` | string | Note about the schedule (for example, every Saturday 10:00–12:00). Up to 200 characters |
| `zoneId` | string | Time zone ID. Up to 64 characters. Default `Asia/Tokyo` |
| `description` | string | Body in Markdown. Up to 10,000 characters. Image syntax is rejected |
| `category` | integer | Category ID |
| `prefectureCode` | integer | Prefecture ID (0–47). Required unless the event is online |
| `online` | boolean | Whether the event is held online |
| `venueName`, `venueAddress` | string | Venue name (up to 256 characters) and address (up to 512 characters). Send them together |
| `venueId` | string | Venue ID. Up to 36 characters |
| `placeId`, `latitude`, `longitude` | string, number | Google Place ID (up to 256 characters; letters, digits, `_`, and `-`) and coordinates. Send them together |
| `tagIds` | array of strings | Tag IDs from `search_tags`. Up to 10 |
| `publisherEventPageUrl` | string | URL of the organizer's own page for the event (http or https). Up to 1,024 characters. Rejected if it duplicates another event of the organizer |

**Sending the same values again within 72 hours returns the draft created earlier instead of creating a new one.** It is returned even if the draft has since been sent for review, so check `status`.

### `update_event_draft`

`id` (UUID) is required. The other inputs are the same as `create_event_draft`, plus `imageUploadId` (send `""` to remove the image).

- **Only the fields you send change.** `null` and omitted fields keep their current values
- Clear a text field with `""`. `tagIds` replaces all tags when sent; send `[]` to clear them. `title` can't be cleared
- To move the date of an event whose start and end differ, send both `startAt` and `closeAt`
- Sending `startAt`/`closeAt` for a draft with two or more schedule pairs is rejected. Send `occurrenceRanges` to replace them all
- Editing a sent-back draft keeps it sent back with its reason. Both clear when the organizer sends it for review

### `attach_event_image`

| Input | Type | Meaning |
| --- | --- | --- |
| `id` | UUID (required) | Draft ID |
| `file.download_url` | string (required) | Temporary URL of the file attached to the conversation. Up to 4,096 characters |
| `file.file_id` | string (required) | File ID. Up to 512 characters |
| `file.mime_type` | string | MIME type |
| `file.file_name` | string | File name |

- Only temporary URLs of files attached to the AI assistant's conversation are accepted, and currently only ChatGPT's attachments. Arbitrary image URLs from the web and base64 are not accepted
- JPEG, PNG, or WebP, up to 10 MiB. Redirects are not followed
- When the image can't be accepted, the tool returns an error result that tells the organizer to add the image on the edit page

Image upload quotas are in [Rate limits and quotas](/en/api/rate-limits).

## Errors

Errors inside tools are returned as tool results with `isError: true`, as English text the AI assistant can relay to the organizer.

| Situation | What the result says |
| --- | --- |
| A value breaks a rule | The rejected values and why. Fix them and retry |
| The draft is not found | Only drafts made by an AI assistant can be accessed |
| Sent for review or published | It can't be changed from here |
| Connected to a WordPress site | Edit it on that site |
| 50 drafts reached | Send some for review or delete them on EventWatch |
| A conflict, such as a duplicate page URL | That there was a conflict |
| Too many requests | Wait a minute and try again |
| The permission no longer works | Ask the organizer to reconnect |
| The organizer is suspended | Contact EventWatch |
| Anything else | It's temporarily unavailable |
