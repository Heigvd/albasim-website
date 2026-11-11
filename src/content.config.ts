// Content collections: one per type of content (e.g. news, projects, people).
// The Markdown files live in the top-level `content/` folder, not in `src/content/`.
// See https://docs.astro.build/en/guides/content-collections/

import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { routes, type RouteKey } from './i18n/ui'

const routeKeys = Object.keys(routes) as [RouteKey, ...RouteKey[]]

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

// The home page, one file per language (`fr.md`, `en.md`). The body is the introduction under
// the main title; **bold** words are highlighted.
const home = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/home' }),
  schema: ({ image }) =>
    z.object({
      /** Title of the browser tab and of search results. */
      title: z.string(),
      /** Text shown by search engines under the page title. */
      description: z.string(),
      /** Main title, one item per line. */
      heading: z.array(z.string()),
      /** Language of the main title, when it differs from the page's. */
      headingLang: z.enum(['fr', 'en']).optional(),
      /** The two large cards under the introduction. */
      missions: z.array(
        z.object({
          audience: z.string(),
          title: z.string(),
          text: z.string(),
          action: z.string(),
          /** Page the card leads to (see `routes` in src/i18n/ui.ts). */
          page: z.enum(routeKeys),
          image: image(),
          imageAlt: z.string(),
        }),
      ),
      news: z.object({ heading: z.string() }),
      /** Ids of the projects to feature: their file names in `content/projects/<lang>/`. */
      projects: z.object({ heading: z.string(), featured: z.array(z.string()) }),
      figures: z.array(
        z.object({
          value: z.number(),
          /** Small text after the number, e.g. "years". */
          unit: z.string().optional(),
          /** Sign glued to the number, e.g. "+". */
          suffix: z.string().optional(),
          label: z.string(),
        }),
      ),
      wegas: z.object({
        eyebrow: z.string(),
        title: z.string(),
        text: z.string(),
        columns: z.array(z.object({ title: z.string(), items: z.array(z.string()) })),
        /** The three modules drawn in the illustration, with who uses each one. */
        modules: z.array(z.object({ name: z.string(), users: z.array(z.string()) })).length(3),
        link: z.string(),
      }),
      /** Ids of the publications to feature: their file names in `content/publications/`. */
      publications: z.object({ heading: z.string(), featured: z.array(z.string()) }),
      collaborate: z.object({ title: z.string(), text: z.string(), button: z.string() }),
    }),
})

/** Icons a content file can pick (see src/components/Icon.astro). */
export const contentIcons = ['cross', 'lines', 'code', 'sprout', 'magnifier', 'bolt'] as const

// The research page, one file per language (`fr.md`, `en.md`). The body is the introduction
// under the main title.
const research = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/research' }),
  schema: ({ image }) =>
    z.object({
      /** Title of the browser tab and of search results. */
      title: z.string(),
      /** Text shown by search engines under the page title. */
      description: z.string(),
      heading: z.string(),
      /** Description of the illustration next to the title, for screen readers. */
      illustrationAlt: z.string(),
      /** The three numbered questions. */
      questions: z.object({
        heading: z.string(),
        items: z.array(z.object({ label: z.string(), text: z.string() })),
      }),
      domains: z.object({
        eyebrow: z.string(),
        title: z.string(),
        text: z.string(),
        items: z.array(z.object({ title: z.string(), icon: z.enum(contentIcons) })),
      }),
      /** Ids of the projects to show, in order: their file names in `content/projects/<lang>/`. */
      projects: z.object({ heading: z.string(), list: z.array(z.string()) }),
      approach: z.object({
        eyebrow: z.string(),
        title: z.string(),
        image: image(),
        imageAlt: z.string(),
        items: z.array(z.object({ title: z.string(), text: z.string() })),
        /** Label of the link to the publications page. */
        link: z.string(),
        process: z.object({
          heading: z.string(),
          steps: z.array(z.object({ title: z.string(), text: z.string() })),
        }),
      }),
      wegas: z.object({
        eyebrow: z.string(),
        title: z.string(),
        text: z.string(),
        highlights: z.array(z.string()),
        /** Label of the button to the source code on GitHub. */
        button: z.string(),
        image: image(),
        imageAlt: z.string(),
        /** The three steps drawn under the image. */
        steps: z.array(z.string()).length(3),
      }),
      funders: z.object({
        heading: z.string(),
        items: z.array(
          z.object({
            /** Full name, read by screen readers instead of the logo. */
            name: z.string(),
            url: z.url(),
            logo: image(),
            /** Height of the logo in pixels, to balance logos of different shapes. */
            logoHeight: z.number(),
          }),
        ),
      }),
      collaborate: z.object({ title: z.string(), text: z.string(), button: z.string() }),
    }),
})

// News items, one folder per language: `content/news/en/<id>.md`, `content/news/fr/<id>.md`.
// The body is the full text of the item.
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      image: image(),
      /** Leave empty when the image is only decorative. */
      imageAlt: z.string().default(''),
    }),
})

// Research projects, one folder per language: `content/projects/en/<id>.md`, `.../fr/<id>.md`.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Funders and main partners, e.g. "HUG · Innosuisse". */
      funders: z.string(),
      summary: z.string(),
      image: image(),
      imageAlt: z.string(),
    }),
})

export const publicationTypes = [
  'journal-article',
  'conference-paper',
  'book-chapter',
  'other',
] as const

/** Precise kind of a publication of type `other`, shown on its card. */
export const publicationKinds = ['talk', 'workshop', 'interview', 'poster', 'article'] as const

// Publications, one file each, shared by both languages: `content/publications/<id>.md`.
const publications = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/publications' }),
  schema: z.object({
    title: z.string(),
    year: z.number().int(),
    /** Journal, book or conference. */
    venue: z.string(),
    /** In citation style: "Jaccard, D., & Riboni, S." */
    authors: z.string(),
    type: z.enum(publicationTypes),
    /** For the type `other` only: talk, workshop, interview, poster or article. */
    kind: z.enum(publicationKinds).optional(),
    /** Language of the title and venue, so that screen readers pronounce them correctly. */
    lang: z.enum(['en', 'fr']).default('en'),
    /** When the title is a translation: the language the publication is written in. */
    translatedFrom: z.enum(['no']).optional(),
    /** Link to the publication. Leave it out when there is none. */
    url: z.url().optional(),
  }),
})

// The publications page, one file per language (`fr.md`, `en.md`). The body is the introduction
// under the main title. The list itself comes from the `publications` collection.
const publicationsPage = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/publications-page' }),
  schema: z.object({
    /** Title of the browser tab and of search results. */
    title: z.string(),
    /** Text shown by search engines under the page title. */
    description: z.string(),
    heading: z.string(),
    /** Description of the illustration next to the title, for screen readers. */
    illustrationAlt: z.string(),
    collaborate: z.object({ title: z.string(), text: z.string(), button: z.string() }),
  }),
})

export const collections = {
  footer,
  home,
  research,
  news,
  projects,
  publications,
  publicationsPage,
}
