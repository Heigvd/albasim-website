// Types and helpers for the ready-to-use games and their pages.
import type { CollectionEntry } from 'astro:content'
import { useTranslations, type Lang } from '../i18n/ui'

/** The `page` part of a game, which its page is made of. */
export type GamePage = NonNullable<CollectionEntry<'games'>['data']['page']>

/** "Available in English and French", for screen readers next to the EN / FR tags. */
export function languagesLabel(languages: ('en' | 'fr')[], lang: Lang) {
  const t = useTranslations(lang)
  const names = languages.map((code) => t(`language.${code}`))
  return `${t('games.availableIn')} ${names.join(` ${t('games.and')} `)}`
}
