// Content collections: one per type of content (e.g. news, projects, people).
// The Markdown files live in the top-level `content/` folder, not in `src/content/`.
// See https://docs.astro.build/en/guides/content-collections/

import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// The footer, one file per language (`fr.md`, `en.md`). The body is the presentation paragraph.
const footer = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/footer' }),
  schema: z.object({
    address: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), url: z.url() })),
    note: z.string(),
    copyright: z.string(),
  }),
})

export const collections = { footer }
