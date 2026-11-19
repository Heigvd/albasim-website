// Helpers shared by the news page and the news cards of the home page.
import type { CollectionEntry } from 'astro:content'

/** Id of a news item in the page, used as its anchor: its file name, without the language. */
export function newsAnchor(entry: CollectionEntry<'news'>) {
  return entry.id.split('/').pop() ?? entry.id
}

/** News items, newest first; within a month, in alphabetical order. */
export function sortNews(entries: CollectionEntry<'news'>[]) {
  return [...entries].sort(
    (a, b) =>
      b.data.date.getTime() - a.data.date.getTime() || a.data.title.localeCompare(b.data.title),
  )
}
