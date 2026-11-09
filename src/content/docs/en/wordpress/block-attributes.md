---
title: Block and shortcode attributes
description: The attributes of the EventWatch Events plugin's blocks and shortcodes.
---

For how to place them on screen, see [Display events with blocks](/en/wordpress/blocks). This page lists the attributes to use from templates and code.

## Event List

The block is `eventwatch/event-list` and the shortcode is `[eventwatch_events]`.

| Block attribute | Shortcode attribute | Type | Default | Values |
| --- | --- | --- | --- | --- |
| `layout` | `layout` | String | `cards` | `cards`, `list` |
| `perPage` | `per_page` | Integer | `6` | 1–24 |
| `order` | `order` | String | `asc` | `asc`, `desc` |
| `categoryId` | `category` | Integer for the block, slug for the shortcode | None | An event category on your site |
| `tagId` | `tag` | Integer for the block, slug for the shortcode | None | An event tag on your site |
| `prefecture` | `prefecture` | Integer | `0` | 1–47 (JIS order). `0` means no filter |
| `dateFrom` | `from` | String | None | In the form `2026-12-01` |
| `dateTo` | `to` | String | None | In the form `2026-12-31` |
| `emptyText` | `empty_text` | String | None | Text shown when there are no events |
| `period` | `period` | String | None | `thisMonth`, `next30Days` |

`period` is calculated from today's date at each display, and takes precedence over `from` and `to`.

If you pass a slug that doesn't exist to the shortcode's `category` or `tag`, no events appear.

```text
[eventwatch_events layout="list" per_page="6" prefecture="13" period="next30Days"]
```

The block has the following variations.

| Name | Attributes |
| --- | --- |
| `this-month` | `period` is `thisMonth` |
| `coming-soon` | `period` is `next30Days`, `perPage` is `3` |

## Past Events

The block is `eventwatch/past-events` and the shortcode is `[eventwatch_past_events]`.

| Block attribute | Shortcode attribute | Type | Default | Values |
| --- | --- | --- | --- | --- |
| `layout` | `layout` | String | `list` | `cards`, `list` |
| `perPage` | `per_page` | Integer | `6` | 1–24 |
| `monthsBack` | `months` | Integer | `12` | `3`, `6`, `12`, `24`, `0` (all) |
| `emptyText` | `empty_text` | String | None | Text shown when there are no events |

## Event Search

The block is `eventwatch/event-search` and the shortcode is `[eventwatch_search]`. Only one of these blocks can be placed on a page.

| Block attribute | Shortcode attribute | Type | Default | Values |
| --- | --- | --- | --- | --- |
| `layout` | `layout` | String | `cards` | `cards`, `list` |
| `perPage` | `per_page` | Integer | `6` | 1–24 |

## Event details

These blocks are for building event pages with block themes. They have no shortcodes.

`eventwatch/event-field` chooses what to show with the `field` attribute. The default is `dates`.

| `field` | What it shows |
| --- | --- |
| `back` | Link back to the event list |
| `category` | Category |
| `dates` | Date and time |
| `venue` | Venue |
| `organizer` | Organizer |
| `map` | Map |
| `calendar` | Add to calendar |
| `interested` | Save |
| `share` | Share |
| `official` | Link to the official page |

`eventwatch/event-actions` is a container for `eventwatch/event-field` and has no attributes.
