// Types and helpers for the pages of the research projects.
import type { CollectionEntry } from 'astro:content'
import { gamePath, type Lang } from '../i18n/ui'

/** The `page` part of a project, which its page is made of. */
export type ProjectPage = NonNullable<CollectionEntry<'projects'>['data']['page']>

/** A link of a project page: to a game of the site, or to another site. */
export type ProjectLink = { label: string } & ({ game: string } | { url: string })

/** Where a project link leads, and whether it opens another site. */
export function projectLinkTarget(link: ProjectLink, lang: Lang) {
  return 'game' in link
    ? { href: gamePath(link.game, lang), external: false }
    : { href: link.url, external: true }
}
