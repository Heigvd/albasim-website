// The sitemap, at /sitemap.xml, read by search engines (robots.txt points to it). It lists every
// indexable page in both languages: the pages of the `routes` table in src/i18n/ui.ts, and the
// project and game pages built from content/. Each page names its version in the other language.
//
// A new fixed page shows up here once its address is in `routes`. Pages kept out of search
// engines (the error page, the contact form result pages) are left out.
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import {
  defaultLang,
  gamePath,
  languages,
  projectPath,
  routes,
  type Lang,
  type RouteKey,
} from '../i18n/ui'

const excluded: RouteKey[] = ['contactSent', 'contactError']

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Set `site` in astro.config.ts to build the sitemap.')
  const langs = Object.keys(languages) as Lang[]
  const absolute = (path: string) => new URL(path, site).href

  // Each page, as its URL in every language.
  const pages: Record<Lang, string>[] = (Object.keys(routes) as RouteKey[])
    .filter((key) => !excluded.includes(key))
    .map((key) => routes[key])

  const withPage = ({ id, data }: { id: string; data: { page?: unknown } }) =>
    id.startsWith(`${defaultLang}/`) && data.page !== undefined
  const slug = (id: string) => id.split('/').pop() ?? id

  for (const project of await getCollection('projects', withPage)) {
    const id = slug(project.id)
    pages.push({ en: projectPath(id, 'en'), fr: projectPath(id, 'fr') })
  }
  for (const game of await getCollection('games', withPage)) {
    const id = slug(game.id)
    pages.push({ en: gamePath(id, 'en'), fr: gamePath(id, 'fr') })
  }

  const alternates = (page: Record<Lang, string>) =>
    [...langs.map((code) => [code, page[code]]), ['x-default', page[defaultLang]]]
      .map(
        ([code, path]) =>
          `    <xhtml:link rel="alternate" hreflang="${code}" href="${absolute(path)}"/>`,
      )
      .join('\n')

  const urls = pages.flatMap((page) =>
    langs.map(
      (code) => `  <url>\n    <loc>${absolute(page[code])}</loc>\n${alternates(page)}\n  </url>`,
    ),
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
