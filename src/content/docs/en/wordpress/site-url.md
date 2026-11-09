---
title: When your site URL changes
description: How to confirm and resume sending to EventWatch when you copy or move a WordPress site and its URL changes.
---

When your site URL changes, the plugin stops sending to EventWatch. This keeps a copy of your site, such as a staging environment, from overwriting listed posts.

Differences between `http` and `https`, uppercase and lowercase, or a trailing `/` don't stop sending.

## Confirm the change

When an administrator opens **Settings › EventWatch**, the message "Sending to EventWatch is stopped because this site’s URL has changed." appears with the saved URL and the current URL. Nothing is sent until you choose.

| Button | Choose it when | Result |
| --- | --- | --- |
| **This is a copy** | The original site is still running elsewhere (such as staging) | Treated as a separate site. The saved API key and send records are cleared. Each event's choice not to send (**Send this post to EventWatch** turned off) is kept |
| **The site moved** | You moved the site to a new location | Sending resumes as the same site. Published events that were sent are sent again, and EventWatch is told the new URL |

To send events from a site where you chose **This is a copy**, enter an API key issued for that site.

## When the key is set in wp-config.php

A key in `wp-config.php` can't be removed from the screen. Even if you choose **This is a copy**, events keep being sent with that key.

If you don't want the copy to send, don't choose a button; remove the key from `wp-config.php` instead. While there is no key, nothing is sent and this confirmation doesn't appear. If you add a key to this copy later, the confirmation appears again.
