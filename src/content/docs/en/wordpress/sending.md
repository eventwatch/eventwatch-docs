---
title: Send and withdraw events
description: How updating, withdrawing, and deleting events in the WordPress plugin carry over to EventWatch, and how to send published events in bulk.
---

On a site with an API key, publishing an event sends it to EventWatch automatically. Scheduled posts are sent at their publish time.

EventWatch's review affects only the listing on EventWatch. The event appears on your site as soon as it's published.

## What each action does

| Action on your site | Result on EventWatch |
| --- | --- |
| Publish | Sent. Listed after review |
| Update a published event | The update is sent. A listed event stays listed |
| Change to Draft, Pending Review, Private, or Password protected, or move to Trash | Withdrawn if it was sent |
| Restore from Trash | Not sent until you publish it again |
| Delete permanently | Also deleted on EventWatch if it was sent |
| Turn off **Send this post to EventWatch** | Kept on your site only. Withdrawn if it was sent |

Updates that don't change the content aren't sent. While the status is **Changes requested**, the event is sent again even if the content is the same. The plugin reads the event again when it sends, so only the latest version is sent.

## What is sent

- Title, body, date and time, notes on dates, category, prefecture, online setting, venue name and address, and official page URL
- One featured image

The body is sent as Markdown. Headings, paragraphs, lists, quotes, links, emphasis, strikethrough, code, and tables in the body are sent. Images and embeds in the body are not sent. For events imported from EventWatch, images in the body stay in the body on EventWatch.

The featured image is sent shortly after saving (usually about a minute), and only when the file has changed. Removing the featured image removes it on EventWatch too.

## Send published events in bulk

Events published before you set a key aren't sent automatically. They're sent the next time you update them, or you can send them all with the following steps.

1. Open **Settings › EventWatch**.
2. Under **Sending to EventWatch**, check the number shown for **Published but not sent yet**.
3. Select **Send all to EventWatch**.

Each event goes to review on EventWatch (**Under review**). Events are sent a few dozen at a time with WP-Cron, so this can take a while.

Events with **Send this post to EventWatch** turned off, past events, and events missing required fields aren't included.

EventWatch has a daily limit on image uploads. On sites with more than 100 events with images, content arrives first and some images arrive the next day or later.
