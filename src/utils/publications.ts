// Helpers for the publications collection, shared by the home and publications pages.
import type { CollectionEntry } from 'astro:content'

/** Props of a PublicationCard for a publication, without the page language. */
export function publicationCardProps({ data }: CollectionEntry<'publications'>) {
  return {
    href: data.url,
    title: data.title,
    year: data.year,
    venue: data.venue,
    type: data.type,
    kind: data.kind,
    titleLang: data.lang,
    translatedFrom: data.translatedFrom,
  }
}
