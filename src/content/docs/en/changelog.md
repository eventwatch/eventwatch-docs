---
title: How to read the changelog
description: Where to check changes to the EventWatch API and WordPress plugin.
---

The EventWatch API and the WordPress plugin are versioned separately. Where to look depends on what you use.

| What you use | Where the version is | Where to see changes |
| --- | --- | --- |
| You call the API directly | `/api/v1.0/` in the URL, and the version in the [API overview](/en/api/) | [History of the specification file](https://github.com/eventwatch/eventwatch-docs/commits/main/openapi/org-api.json) |
| You use the WordPress plugin | The version shown in the plugin list | [Changelog in the plugin's readme](https://github.com/eventwatch/eventwatch-wordpress/blob/main/readme.txt) |

## API

The API version goes up only for [breaking changes](/en/api/compatibility). Non-breaking changes, such as added fields, don't change the version, so follow the history of the specification file to track changes.

Advance notice of breaking changes is posted on this site, as described in the [compatibility promise](/en/api/compatibility).

## WordPress plugin

The plugin version goes up with each feature or fix. The API version the plugin calls is switched as part of a plugin update. If you only use the plugin, you don't need to think about the API version.
