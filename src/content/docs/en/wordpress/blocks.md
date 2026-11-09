---
title: Display events with blocks
description: How to add the event list, event search, and past events blocks and patterns to WordPress pages.
---

Add the plugin's blocks from the block inserter in the block editor. Colors and fonts follow your theme, and you can change them in the block settings.

## Blocks

| Block | What it shows |
| --- | --- |
| **Event List** | Your site's upcoming events |
| **Event Search** | Fields for finding upcoming events by keyword, period, category, and prefecture, and the results |
| **Past Events** | Your site's finished events, newest first |

### Event List

You can choose cards or a list, the number of events per page, and the order. You can filter by category, tag, prefecture, and period.

Only published events that haven't ended appear. Events without dates and password-protected events don't appear.

Events are ordered by the date shown on their card: the next date that hasn't ended or, when you filter by period, the first date within it. With a period filter, an event appears only if one of its dates falls within the period.

The following two are preconfigured versions of the Event List block, and they appear under their own names in the block inserter.

| Name | What it shows |
| --- | --- |
| **Events This Month** | This month's events that haven't ended |
| **Coming Soon** | Events within the next 30 days |

### Event Search

Keywords match event titles, body text, and venue names. Search conditions go into the page URL, so you can share the URL as is and use the browser's back button. Results replace the old ones without reloading the page. The search also works without JavaScript.

### Past Events

An event moves here the day after it ends. You can choose cards or a list, the number of events per page, and how far back to go. The default is 1 year.

## Patterns

From the **EventWatch** category under **Patterns** in the block inserter, you can add ready-made sections. Headings are editable.

| Pattern | Content |
| --- | --- |
| **Events This Month** | A list of this month's events |
| **Coming Soon** | 3 events within the next 30 days |
| **Past Events** | A list of past events |
| **Upcoming and Past Events** | A list of upcoming events and past events |

## With classic themes

With themes that can't use blocks, write shortcodes in the body.

```text
[eventwatch_events layout="list" per_page="6"]
[eventwatch_past_events layout="list" per_page="6" months="12"]
[eventwatch_search layout="list" per_page="6"]
```
