---
title: フィルター
description: EventWatch Events プラグインが公開しているフィルターの一覧と使い方です。
---

イベントのページの `<head>` に出す情報を、フィルターで変えられます。

| フィルター | 引数 | 既定 | 変えられるもの |
| --- | --- | --- | --- |
| `eventwatch_output_meta_tags` | `bool $output`、`WP_Post $post` | 対応する SEO プラグインが有効なら `false`、それ以外は `true` | description と Open Graph のタグを出すか |
| `eventwatch_output_json_ld` | `bool $output`、`WP_Post $post` | `true` | schema.org の `Event` のデータを出すか |

対応する SEO プラグインは、Yoast SEO・Rank Math・All in One SEO・SEOPress・The SEO Framework です。

パスワードで保護したイベントでは、パスワードを入れていない閲覧者にはどちらも出しません。

ここに載せていないフィルターと、プラグインの REST の口は、プラグインの内部で使うものです。予告なく変わります。

## 例

SEO プラグインも `Event` のデータを出すときは、片方を止めます。

```php
add_filter( 'eventwatch_output_json_ld', '__return_false' );
```

特定のイベントだけ止めることもできます。

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

テーマの `functions.php` か、小さなプラグインに書きます。
