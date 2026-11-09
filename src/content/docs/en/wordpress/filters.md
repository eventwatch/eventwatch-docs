---
title: Filters
description: The filters the EventWatch Events plugin exposes and how to use them.
---

You can change the information output in the `<head>` of event pages with filters.

| Filter | Arguments | Default | What you can change |
| --- | --- | --- | --- |
| `eventwatch_output_meta_tags` | `bool $output`, `WP_Post $post` | `false` if a supported SEO plugin is active, otherwise `true` | Whether to output the description and Open Graph tags |
| `eventwatch_output_json_ld` | `bool $output`, `WP_Post $post` | `true` | Whether to output schema.org `Event` data |

The supported SEO plugins are Yoast SEO, Rank Math, All in One SEO, SEOPress, and The SEO Framework.

For password-protected events, neither is output to visitors who haven't entered the password.

Filters not listed here and the plugin's REST endpoints are for the plugin's internal use. They can change without notice.

## Examples

If your SEO plugin also outputs `Event` data, turn one of them off.

```php
add_filter( 'eventwatch_output_json_ld', '__return_false' );
```

You can also turn output off for specific events only.

```php
add_filter(
	'eventwatch_output_meta_tags',
	function ( $output, $post ) {
		return has_term( 'members-only', 'eventwatch_event_tag', $post ) ? false : $output;
	},
	10,
	2
);
```

Write this in your theme's `functions.php` or in a small plugin.
