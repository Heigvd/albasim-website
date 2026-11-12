// Helpers for links in HTML rendered from Markdown.

/**
 * Opens the links to other sites in a new tab, and tells screen reader users so with `label`,
 * e.g. "(new tab)". Markdown has no syntax for it.
 */
export function openExternalLinksInNewTab(html: string, label: string) {
  return html.replace(
    /<a href="(https?:\/\/[^"]*)">([\s\S]*?)<\/a>/g,
    `<a href="$1" target="_blank" rel="noopener">$2<span class="sr-only"> ${label}</span></a>`,
  )
}
