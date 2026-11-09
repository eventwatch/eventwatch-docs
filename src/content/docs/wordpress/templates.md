---
title: テンプレートを上書きする
description: EventWatch Events プラグインのカード・行・イベントのページの表示を、テーマから差し替える方法です。
---

テーマに `eventwatch` フォルダーを作り、同じ名前のファイルを置くと、プラグインのテンプレートの代わりに使われます。子テーマにも置けます。

| 差し替えるもの | テーマに置くファイル |
| --- | --- |
| 一覧のカード | `eventwatch/event-card.php` |
| 一覧の行（`layout` が `list`） | `eventwatch/event-row.php` |
| イベントのページ（クラシックテーマ） | `eventwatch/single-event.php`、または `single-eventwatch_event.php` |

検索の入力欄のテンプレートは差し替えられません。

## カードと行

`$args` にイベント 1 件の値が入っています。カードと行で同じ内容です。

| キー | 型 | 内容 |
| --- | --- | --- |
| `id` | 整数 | 投稿の ID |
| `title` | 文字列 | イベント名。実体参照を含むので `wp_kses_post` で出します |
| `url` | 文字列 | イベントのページの URL |
| `image` | 文字列 | アイキャッチ画像の HTML。無いときは空です |
| `date` | 文字列 | 表示用の日時 |
| `datetime` | 文字列 | `<time>` の `datetime` に入れる値 |
| `more` | 文字列 | ほかの開催日の数の文。無いときは空です |
| `venue` | 文字列 | 会場 |
| `category` | 文字列 | カテゴリ。無いときは空です |
| `ended` | 真偽 | 終わったイベントなら `true` |

ファイルの例です。

```php
<?php
/**
 * テーマの eventwatch/event-card.php
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

## イベントのページ

### クラシックテーマ

次の順に探します。

1. テーマの `single-eventwatch_event.php`
2. テーマの `eventwatch/single-event.php`
3. プラグインの `templates/single-event.php`

`eventwatch/single-event.php` を作るときは、プラグインの `templates/single-event.php` を写して直すのが簡単です。

### ブロックテーマ

サイトエディターで「イベントの詳細」のテンプレートを編集します。詳細の各部分は [イベントの詳細のブロック](/wordpress/block-attributes#イベントの詳細) で置けます。

テーマに `templates/single-eventwatch_event.html` を置くと、プラグインのテンプレートより優先されます。
