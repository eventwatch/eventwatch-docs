---
title: Listing status
description: The listing statuses shown in the WordPress plugin. What Under review (pending review), Changes requested (rejected or returned), and the other statuses mean, and what to do next.
---

Statuses appear in the **EventWatch** panel on the edit screen and in the **EventWatch** column of the event list. The column appears only while an API key is set.

| Status | Meaning | What to do next |
| --- | --- | --- |
| **Not sent** | Not sent to EventWatch yet | Publish the post. If it's already published, it's sent at the next update |
| **Waiting to send** | About to be sent. This usually finishes in a few minutes | Wait |
| **Under review** | EventWatch is checking the content (pending review) | Wait |
| **Listed** | Listed on EventWatch | Updates are also reflected on EventWatch |
| **Changes requested** | EventWatch has asked for changes (the post was rejected or returned). The reason appears in the panel | Fix the post and update it. It's sent again |
| **Listing paused** | EventWatch has stopped the listing. The event stays published on your site | Contact EventWatch using **Contact EventWatch** in the panel |
| **Withdrawn from EventWatch** | The event isn't published on your site, so it isn't published on EventWatch either | Publishing it lists it again |
| **Couldn’t send** | The event couldn't be sent to EventWatch | Check the reason in the panel ([When events can't be sent](/en/wordpress/troubleshooting)) |
| **Not sending to EventWatch** | **Send this post to EventWatch** is off | To send it, turn the option on and update the post |

## Differences from the website

On **Your events** on EventWatch, the same statuses appear under the following names.

| Plugin | EventWatch website |
| --- | --- |
| **Under review** | **Under review** |
| **Listed** | **Published** |
| **Changes requested** | **Changes requested** |
| **Listing paused** | **Suspended by us** |

## Status updates

The plugin reads the status from EventWatch when you open the edit screen, and for up to 30 events about once an hour. On sites with many events, it takes time to go through all of them. To see the latest status, open the edit screen. The same event is read at most once a minute, so if you just opened it, wait about a minute and open it again.

We don't give an estimate of how long review takes. Review isn't automatic, so it can take time before an event is published.

## Other items in the panel

| Item | Content |
| --- | --- |
| **Reason** | Why the event couldn't be sent |
| **Reason from EventWatch** | The reason changes were requested |
| **Next retry** | When the event is scheduled to be sent again automatically |
| **Last sent** | When the event was last sent |
| **View on EventWatch** | Opens the listed page |
