// Small text helpers for content written in YAML, where Markdown is not rendered.

const escapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

const escape = (text: string) => text.replace(/[&<>"']/g, (char) => escapes[char])

/** Escapes the text for HTML, then turns `*words*` into italics, e.g. for a journal name. */
export function withItalics(text: string) {
  return escape(text).replace(/\*([^*]+)\*/g, '<i>$1</i>')
}

/**
 * Escapes the text for HTML, then turns `[label](https://…)` into a link to another site, opening
 * in a new tab. `newTab` is the screen reader mention of the new tab.
 */
export function withLinks(text: string, newTab: string) {
  return escape(text).replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    (_, label: string, url: string) =>
      `<a href="${url}" target="_blank" rel="noopener">${label}<span class="sr-only"> ${escape(newTab)}</span></a>`,
  )
}
