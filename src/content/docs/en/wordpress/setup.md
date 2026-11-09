---
title: Get started with the WordPress plugin
description: How to install the EventWatch Events plugin on WordPress, set your API key, and send your first event to EventWatch.
---

You can list the events you publish on your WordPress site on EventWatch as they are. This page walks you through installing the plugin and sending your first event.

:::caution[Coming soon]
The plugin is being prepared for release in the WordPress plugin directory. Organizer login and API key issuance on EventWatch are not open yet either. The steps on this page will become available after launch.
:::

Screen names on this page match the English display of plugin version 0.1.0.

## What you need

- A site running WordPress 6.7 or later and PHP 7.4 or later, and administrator access to it
- An EventWatch account (you log in with a Google account)
- An EventWatch organization. An organization is created when you list your first event. Until you have one, the **Site connection** link doesn't appear, so first list one event from **Post an event** on EventWatch

If you only want to manage events on your own site, you don't need an EventWatch account or an API key. While no key is set, events stay on your site and nothing is sent.

## 1. Install the plugin

1. In the WordPress admin, go to **Plugins** and add a new plugin.
2. Search for **EventWatch Events**, install it, and activate it.

**Events** appears in the admin menu.

## 2. Issue an API key

An API key is a string that connects your site to your EventWatch organization. Only organization admins can issue one. Issue one key per site.

1. Log in to EventWatch and open **Your events**.
2. Open the **Site connection** link next to the heading. The plugin's on-screen guidance calls this place **Organization settings › Site connection**.
3. Select **Issue a key**.
4. Enter a name that tells you which site uses the key, and select **Issue**.
5. **Copy** the key that appears.

:::caution
Once you close the screen, this key can never be displayed again. Paste it into WordPress in the next step before you close the screen. If you lose a key, revoke it and issue a new one.
:::

## 3. Add the key to WordPress

1. In the WordPress admin, open **Settings › EventWatch**.
2. Paste the key into **EventWatch API key** under **EventWatch connection**.
3. Save your changes.
4. Select **Check connection**.

When your organization's name appears after "Connected to EventWatch", you're ready. If the name is a different organization, you've mixed up keys. Saved keys are hidden and can't be read back on this screen.

By saving a key, you agree to the EventWatch [Terms of Service](https://eventwatch.app/en/terms) and Posting Guidelines.

A key saved here is included in database backups and site copies. If you can edit `wp-config.php`, we recommend setting it there as follows. That value takes precedence and can no longer be changed on the settings screen.

```php
define( 'EVENTWATCH_API_KEY', 'ewk_...' );
```

## 4. Publish an event and send it

1. Under **Events**, open **Add New Event**.
2. Enter a title, and enter the dates in **Event details** in the right sidebar. To send the event to EventWatch, also choose an **EventWatch category** and a **Prefecture** (online events don't need a prefecture).
3. In the **EventWatch** panel in the same sidebar, check that **Send this post to EventWatch** is on. It's on by default.
4. Publish the event.

There is no separate send button. Publishing sends the event automatically. The event appears on your site as soon as it's published.

## 5. Check the listing status

The status in the **EventWatch** panel changes from **Waiting to send** to **Under review**. EventWatch checks the content, and when the event is listed the status becomes **Listed**.

When something needs fixing, **Changes requested** appears with the reason. Fix the post and update it, and it's sent again. See [Listing status](/en/wordpress/listing-status) for what each status means.

If the event can't be sent, the reason appears in the panel. See [When events can't be sent](/en/wordpress/troubleshooting).

## What to do next

- [Add an event list with blocks](/en/wordpress/blocks)
- [Send published events in bulk](/en/wordpress/sending#send-published-events-in-bulk)
- [Import EventWatch posts](/en/wordpress/import)
