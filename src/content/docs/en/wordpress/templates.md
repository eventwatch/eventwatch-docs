---
title: Override templates
description: How to replace the display of the EventWatch Events plugin's cards, rows, and event pages from your theme.
---

Create an `eventwatch` folder in your theme and put a file with the same name there, and it's used instead of the plugin's template. You can also put it in a child theme.

| What to replace | File to put in your theme |
| --- | --- |
| List card | `eventwatch/event-card.php` |
| List row (`layout` is `list`) | `eventwatch/event-row.php` |
| Event page (classic themes) | `eventwatch/single-event.php` or `single-eventwatch_event.php` |

The template for the search fields can't be replaced.

## Cards and rows

`$args` contains the values for one event. Cards and rows receive the same content.

| Key | Type | Content |
| --- | --- | --- |
| `id` | Integer | Post ID |
| `title` | String | Event name. It contains entities, so output it with `wp_kses_post` |
| `url` | String | URL of the event page |
| `image` | String | HTML of the featured image. Empty when there is none |
| `date` | String | Date and time for display |
| `datetime` | String | Value for the `datetime` attribute of `<time>` |
| `more` | String | Text giving the number of other dates. Empty when there are none |
| `venue` | String | Venue |
| `category` | String | Category. Empty when there is none |
| `ended` | Boolean | `true` if the event has ended |

Here is an example file.

```php
<?php
/**
 * eventwatch/event-card.php in your theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<a class="my-event-card" href="<?php echo esc_url( $args['url'] ); ?>">
	<h3><?php echo wp_kses_post( $args['title'] ); ?></h3>
	<time datetime="<?php echo esc_attr( $args['datetime'] ); ?>"><?php echo esc_html( $args['date'] ); ?></time>
	<p><?php echo esc_html( $args['venue'] ); ?></p>
</a>
```

## Event pages

### Classic themes

Templates are searched for in the following order.

1. `single-eventwatch_event-{slug}.php` in your theme
2. `single-eventwatch_event.php` in your theme
3. `eventwatch/single-event.php` in your theme
4. `templates/single-event.php` in the plugin

When you create `eventwatch/single-event.php`, the easiest way is to copy the plugin's `templates/single-event.php` and edit it.

### Block themes

Edit the **Single Event** template in the Site Editor. Each part of the details can be placed with the [event details blocks](/en/wordpress/block-attributes#event-details).

If you put `templates/single-eventwatch_event.html` in your theme, it takes precedence over the plugin's template.
