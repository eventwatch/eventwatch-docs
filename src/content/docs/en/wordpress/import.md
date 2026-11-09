---
title: Import EventWatch posts
description: How to import your organization's posts created on the EventWatch website as WordPress events.
---

You can turn your organization's posts created on the EventWatch website into WordPress events. The content and images are imported, and images are copied to the Media Library.

:::caution
Imported posts are edited on your site from then on. They can no longer be edited on EventWatch.
:::

## Steps

Only administrators of a site with an API key can use this.

1. Under **Events**, open **Import from EventWatch**.
2. Choose the posts to import. At one time, you can choose from the page currently displayed (20 posts).
3. Select **Import selected**.
4. Keep this page open until it finishes.

Posts are processed one at a time, and closing the page stops the process. Selecting **Try again** never creates the same post twice.

## Status after importing

| Status on EventWatch | Status on your site |
| --- | --- |
| Listed | Published |
| Anything else | Draft |

Importing doesn't send the event content back to EventWatch. Saving a draft doesn't take a post out of review.

Drafts and posts with changes requested go to review when you publish them on your site.

When the import finishes, check the content.

## When posts can't be imported

If you see "There are no posts to import.", the organization of that API key either has no posts created on EventWatch, or all of them have already been imported. You can check the key's organization with **Check connection** in **Settings › EventWatch**.

If you see "The site URL has changed.", first go through the confirmation in [When your site URL changes](/en/wordpress/site-url).
