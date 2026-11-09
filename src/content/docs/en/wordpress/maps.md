---
title: Display maps
description: Settings for showing venue map links or an embedded Google map on the WordPress plugin's event pages.
---

There are two ways to show a map on event pages.

| Setting | Display | Visitor connections |
| --- | --- | --- |
| Google Maps key empty (default) | Only the links **Open in Google Maps** and **Open in OpenStreetMap** | Opening the page makes no external connection |
| Google Maps key entered | An embedded map of the venue | The visitor's browser loads the map from Google |

## Embed a map

1. In Google Cloud, create an API key with the Maps Embed API enabled.
2. Restrict the key to your site's domain with an HTTP referrer restriction, because the key appears in the page HTML.
3. In WordPress, open **Settings › EventWatch**, enter the key in **Google Maps API key (optional)** under **Event pages**, and save.

This key is not sent to EventWatch. As the site owner, you are responsible for checking Google's terms of service and pricing.

If you see "The Google Maps API key can contain only letters, numbers, hyphens, and underscores.", check that you copied the entire key correctly.
