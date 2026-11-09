// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightLinksValidator from 'starlight-links-validator';
import starlightLlmsTxt from 'starlight-llms-txt';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';

export default defineConfig({
  site: 'https://docs.eventwatch.app',
  integrations: [
    starlight({
      title: { ja: 'EventWatch ドキュメント', en: 'EventWatch Docs' },
      logo: { src: './src/assets/logo.png', alt: 'EventWatch' },
      favicon: '/favicon.png',
      defaultLocale: 'root',
      locales: {
        root: { label: '日本語', lang: 'ja' },
        en: { label: 'English', lang: 'en' },
      },
      social: [{ icon: 'external', label: 'EventWatch', href: 'https://eventwatch.app' }],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: '主催者向け',
          translations: { en: 'For organizers' },
          items: [
            { slug: 'organizers' },
            {
              label: 'チュートリアル',
              translations: { en: 'Tutorials' },
              items: [{ slug: 'wordpress/setup' }],
            },
            {
              label: 'ハウツー',
              translations: { en: 'How-to guides' },
              items: [
                { slug: 'wordpress/blocks' },
                { slug: 'wordpress/event-pages' },
                { slug: 'wordpress/maps' },
                { slug: 'wordpress/sending' },
                { slug: 'wordpress/import' },
                { slug: 'wordpress/site-url' },
                { slug: 'wordpress/uninstall' },
              ],
            },
            {
              label: 'リファレンス',
              translations: { en: 'Reference' },
              items: [{ slug: 'wordpress/listing-status' }, { slug: 'wordpress/troubleshooting' }],
            },
          ],
        },
        {
          label: '開発者向け',
          translations: { en: 'For developers' },
          items: [
            { slug: 'developers' },
            {
              label: 'ハウツー',
              translations: { en: 'How-to guides' },
              items: [
                { slug: 'api/retries' },
                { slug: 'api/idempotency' },
                { slug: 'wordpress/templates' },
                { slug: 'wordpress/wp-config' },
              ],
            },
            {
              label: 'リファレンス',
              translations: { en: 'Reference' },
              items: [
                { slug: 'api/authentication' },
                { slug: 'api/errors' },
                { slug: 'api/rate-limits' },
                ...openAPISidebarGroups,
                { slug: 'wordpress/block-attributes' },
                { slug: 'wordpress/filters' },
              ],
            },
            {
              label: '解説',
              translations: { en: 'Explanation' },
              items: [{ slug: 'api/compatibility' }, { slug: 'changelog' }],
            },
          ],
        },
      ],
      // ja を先に公開し en は後から足すので、未翻訳のページへのリンクはリンク切れにしない
      plugins: [
        starlightOpenAPI([
          {
            base: 'api',
            schema: './openapi/org-api.json',
            sidebar: { label: 'API の操作' },
            // 生成の例は仮の値で動かず、fetch はブラウザーから呼べない API に合わない。項目の表は残る
            snippets: { operation: false, requestBody: false, response: false },
          },
        ]),
        // 生成のページは動的なルートで、検査の対象のページの一覧に入らない
        starlightLinksValidator({
          errorOnFallbackPages: false,
          exclude: ['/api/', '/api/operations/*/'],
        }),
        starlightLlmsTxt(),
      ],
    }),
  ],
});
