// Content collections: one per type of content (e.g. news, projects, people).
// The Markdown files live in the top-level `content/` folder, not in `src/content/`.
// See https://docs.astro.build/en/guides/content-collections/
//
// Example, once the content types are known:
//
// import { defineCollection } from 'astro:content'
// import { glob } from 'astro/loaders'
// import { z } from 'astro/zod'
//
// const news = defineCollection({
//   loader: glob({ pattern: '**/*.md', base: './content/news' }),
//   schema: z.object({
//     title: z.string(),
//     date: z.coerce.date(),
//   }),
// })
//
// export const collections = { news }

export const collections = {}
