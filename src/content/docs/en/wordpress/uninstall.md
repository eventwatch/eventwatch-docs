---
title: Delete the plugin
description: What stays and what goes on your site and on EventWatch when you delete the EventWatch Events plugin.
---

Before you delete the plugin, check what stays and what goes.

## Your site

| Item | After deletion |
| --- | --- |
| Settings such as the API key and site ID | Removed |
| Send records for each event | Removed |
| Capabilities and scheduled tasks added by the plugin | Removed |
| Event posts | **Kept by default** |
| Each event's choice not to send | Kept |

To delete events as well, before deleting the plugin turn on **Delete all events when the plugin is deleted** in **Settings › EventWatch** and save your changes. If you delete the plugin with this on, this site's events are permanently deleted and can't be restored.

## EventWatch

When you delete the plugin, EventWatch is told that the site has been detached.

- Posts that were sent **stay listed**
- From then on, they can be edited from the EventWatch dashboard

The plugin deletion continues even if EventWatch can't be reached. In that case, revoke the API key under **Site connection** on EventWatch.

A copy of a site whose URL change hasn't been confirmed doesn't report the detachment.

## If you reinstall

When you reinstall the plugin, the site gets a new ID and EventWatch treats it as a different site. Publishing events that remained on the site can send them as separate posts.
