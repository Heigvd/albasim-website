// robots.txt: lets search engines crawl the whole site and points them to the sitemap. Built from
// `site` in astro.config.ts, so the sitemap address always matches the site.
import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Set `site` in astro.config.ts to build robots.txt.')
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
