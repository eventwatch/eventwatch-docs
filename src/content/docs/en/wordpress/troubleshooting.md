---
title: When events can't be sent
description: How to fix required fields, image limits, WP-Cron delays, and API key problems when the WordPress plugin can't send events to EventWatch.
---

When an event can't be sent, the reason appears in the **EventWatch** panel on the edit screen. Publishing on your site isn't affected. If you can't see the panel, you can check the editor notices.

## Fields missing or too long

If the panel shows "Can’t send to EventWatch", fix the following and update the post.

| Field | Condition |
| --- | --- |
| Title | Required. Up to 256 characters |
| Dates | At least one required |
| **EventWatch category** | Required. Chosen separately from your site's categories |
| **Prefecture** | Required unless the event is online |
| Venue name and address | Enter both or leave both empty. Venue name up to 256 characters, address up to 512 characters |
| Notes on dates | Up to 200 characters |
| Official page URL | Up to 1024 characters |
| Body | Up to 10,000 characters after conversion to the format that is sent |

For all fields, each emoji counts as 2 characters.

## Images can't be sent

The one image sent is the featured image. JPEG, PNG, and WebP up to 10 MB are accepted. If the image is too large, a resized version created by WordPress is sent.

| Heading and message in the panel | What to do |
| --- | --- |
| The format isn't accepted | Choose a JPEG, PNG, or WebP image |
| "The image is over EventWatch’s limit of 10 MB" | Choose a smaller image |
| "The image file couldn’t be read on this site" | Choose the image again, or choose another one |
| "Couldn’t upload the image to EventWatch" | Retried automatically about once an hour |
| "Your organization has reached EventWatch’s limit of images for today" | Retried automatically about once an hour |
| "EventWatch didn’t accept the image" | Choose another image |

Even if the image can't be sent, the other content is. If EventWatch already has an image for this event, it stays. Files stored outside your site can't be sent.

## Sending is slow or stopped

When EventWatch can't be reached, sending is retried automatically. The intervals are 1 minute, 5 minutes, 30 minutes, and 2 hours, and then every 6 hours. Select **Retry now** to send without waiting.

Retries use WP-Cron. **WP-Cron runs only when someone visits your site**, so retries are delayed on low-traffic sites. To retry on time, [run WP-Cron from your server's cron](https://developer.wordpress.org/plugins/cron/hooking-wp-cron-into-the-system-task-scheduler/).

Under **Sending to EventWatch** in **Settings › EventWatch**, you can check **Last successful send** and the number of events **Waiting to send**. On sites that show "DISABLE_WP_CRON is on", retries don't happen unless your server's cron runs WP-Cron.

## API key problems

Under **EventWatch connection** in **Settings › EventWatch**, you see the following.

| Message | When it appears | What to do |
| --- | --- | --- |
| "Connected to EventWatch" | When you check the connection | Nothing is wrong |
| "That doesn’t look like an EventWatch API key" | When you save a key | Keys start with `ewk_` and have 47 characters. Copy the whole key again |
| "EventWatch rejected this API key" | When you check the connection, or when sending is refused | The key may have been revoked, or the person who issued it may have left the organization or stopped being an admin. Ask an organization admin to issue a new one under **Site connection** |
| "Your organization is suspended on EventWatch" | When you check the connection, or when sending is refused | This isn't a problem with the key. Contact EventWatch |
| "connected to EventWatch with another API key that hasn’t been revoked" | When sending is refused | Revoke the old key under **Site connection**, then select **Check connection** |
| "EventWatch doesn’t allow this API key to be used for this site" | When you check the connection, or when sending is refused | Contact EventWatch |
| "Couldn’t confirm the connection to EventWatch" | When you check the connection | Wait a moment, then try again |

Sending that stopped because the key was rejected or the organization was suspended resumes when you enter a new key, when **Check connection** succeeds, or when you update the event. It also resumes when the status can be read from EventWatch, so it recovers automatically once the suspension is lifted.

## Other reasons

| Message in the panel | What to do |
| --- | --- |
| "No EventWatch API key is set" | Enter a key in **Settings › EventWatch** |
| "This site’s URL has changed, so sending is stopped" | [Choose whether the site is a copy or has moved](/en/wordpress/site-url) |
| "EventWatch already has another listing with this official page" | If it's the same event, contact EventWatch. If it's a different event, enter another official page and update |
| "This event was deleted on EventWatch" | It can't be sent again. If you think this is a mistake, contact EventWatch |
| "EventWatch didn’t accept the details of this event" | Check the event details and update the post |

You can reach us through the [EventWatch contact page](https://eventwatch.app/en/contact).
