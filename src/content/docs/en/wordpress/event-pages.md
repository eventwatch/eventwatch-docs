---
title: Rearrange event pages
description: The URLs of the event pages the WordPress plugin creates, and how to rearrange them in the Site Editor.
---

Each published event gets its own page. The URL is `/event/event-slug/`.

## Change the URL

You can change the `event` part with **URL prefix** under **Event pages** in **Settings › EventWatch**. Old URLs redirect to the new ones. While the WordPress permalink setting is **Plain**, URLs don't take this form and the prefix has no effect.

**Event list page** in the same section is where **Back to events** on event pages goes. The link doesn't appear until you choose a page.

## Default order

Pages are displayed in the following order.

1. Back to events link (when an **Event list page** is chosen)
2. Category
3. Title
4. Featured image
5. Body
6. Date and time
7. Venue
8. Organizer (your site name)
9. Map (when there is venue information)
10. Add to calendar, Save, and Share buttons (Save appears when the event is listed on EventWatch and has upcoming dates)
11. Link to the official page (when a **Separate official page** is entered)

Password-protected events show only the title and the password form until the visitor enters the password.

The page also outputs schema.org `Event` data, a description, and Open Graph tags. You can change how this works with an SEO plugin using [filters](/en/wordpress/filters).

## Rearrange in the Site Editor

With block themes, you can change the order in the Site Editor.

1. Open **Appearance › Editor**, then open the **Single Event** template.
2. Move, remove, or add the following blocks to change the order.
3. Save.

| Block | What it shows |
| --- | --- |
| **Event Detail** | One field of the event details, such as the date and time or the venue |
| **Event Actions** | A row of Add to calendar, Save, and Share buttons |

**Event Detail** appears in the block inserter under a name for each field.

| Name | What it shows |
| --- | --- |
| **Back to events** | Link back to the list |
| **Event category** | Category |
| **Event date & time** | Date and time |
| **Event venue** | Venue |
| **Event organizer** | Organizer |
| **Event map** | Map ([Display maps](/en/wordpress/maps)) |
| **Add to calendar** | Add to calendar button |
| **Save** | Save button |
| **Share** | Share button |
| **Visit official page** | Link to the official page |

If your theme has a template named `single-eventwatch_event.html`, that template takes precedence.

## With classic themes

Copy the plugin's `templates/single-event.php` into an `eventwatch` folder in your theme and edit it. You can also change the page by adding `single-eventwatch_event.php` to your theme.
