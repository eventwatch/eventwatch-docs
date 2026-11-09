import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';

import { OPENAPI_SIDEBAR_GROUPS } from './openapi-sidebar-groups.mjs';

type SidebarEntry = StarlightRouteData['sidebar'][number];

function withoutGroup(entries: SidebarEntry[], label: string): SidebarEntry[] {
  return entries
    .filter((entry) => !(entry.type === 'group' && entry.label === label))
    .map((entry) => (entry.type === 'group' ? { ...entry, entries: withoutGroup(entry.entries, label) } : entry));
}

// 生成のプラグインは前後のリンクをサイドバーから作るので、それより前にもう一方の言語のグループを外す
export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const other = route.locale === 'en' ? OPENAPI_SIDEBAR_GROUPS.ja : OPENAPI_SIDEBAR_GROUPS.en;
  route.sidebar = withoutGroup(route.sidebar, other);
});
