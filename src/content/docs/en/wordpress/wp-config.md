---
title: Set the API key in wp-config.php
description: How to keep your EventWatch API key in wp-config.php instead of the database.
---

:::caution[Coming soon]
Organizer login and API key issuance on EventWatch are not open yet. The steps on this page will become available after launch.
:::

A key saved on the settings screen is included in database backups and site copies. Putting it in `wp-config.php` means the database doesn't have to hold the key.

## Steps

If you've already saved a key on the settings screen, first select **Remove key**. Adding the constant doesn't remove the saved key from the database. While the constant exists, the **Remove key** button doesn't appear.

Add the following above the line `require_once ABSPATH . 'wp-settings.php';` in `wp-config.php`.

```php
define( 'EVENTWATCH_API_KEY', 'ewk_...' );
```

In WordPress, open **Settings › EventWatch** and select **Check connection**.

## What happens when it's set

- The constant takes precedence over the saved key
- The field on the settings screen becomes read-only, and the buttons for changing and removing the key don't appear
- Changing the constant to another key requires checking the connection again
- If you remove the constant, the saved key still in the database is used again

## Replace the key

If this site has sent with the old key, first revoke the old key under **Site connection** on EventWatch, then change the constant to the new key. While the old key is valid, sending is refused even if **Check connection** succeeds.

## Multisite

The constant applies to all sites in the network. To use a different key for each site, don't use the constant; save a key on each site's settings screen.

## When you copy a site

A key in the constant can't be removed by the copy confirmation on the settings screen. To keep a copy from sending, remove the constant from the copy's `wp-config.php`. See also [When your site URL changes](/en/wordpress/site-url).
