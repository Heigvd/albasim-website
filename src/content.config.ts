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
export const contentIcons = [
  'cross',
  'lines',
  'code',
  'sprout',
  'magnifier',
  'bolt',
  'monitor',
  'heart-pulse',
  'messages',
  'book-open',
  'users',
  'graduation-cap',
  'globe',
  'chart',
  'search',
  'layers',
  'lightbulb',
  'heart-handshake',
  'landmark',
  'bus',
  'flame',
  'tag',
] as const

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
      /** Only the month and year are shown. */
      date: z.coerce.date(),
      image: image(),
      /** Leave empty when the image is only decorative. */
      imageAlt: z.string().default(''),
      /** `contain` shows the whole image, e.g. a logo, instead of filling the frame. */
      imageFit: z.enum(['cover', 'contain']).default('cover'),
      /** Color or gradient behind an image shown whole, e.g. "#F2F2F2". */
      imageBackground: z.string().optional(),
      /** Part of the image kept in the frame, e.g. "center top" or "center 30%". */
      imagePosition: z.string().optional(),
      /** Space around an image shown whole, in pixels. */
      imagePadding: z.number().optional(),
      /** Links under the text, e.g. to the article or a video. */
      links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    }),
})

// Research projects, one folder per language: `content/projects/en/<id>.md`, `.../fr/<id>.md`.
// A link either to the page of a ready-to-use game (its file name in `content/games/<lang>/`) or
// to another site.
const gameLink = z.object({ label: z.string(), game: z.string() })
const projectLink = z.union([gameLink, z.object({ label: z.string(), url: z.url() })])

// Diagrams of the "Overview" section. SVG text does not wrap by itself, so the longer texts are
// given as lists of lines.
const overviewDiagram = z.discriminatedUnion('type', [
  /** Two current methods with their limits, both leading to the project and its innovations. */
  z.object({
    type: z.literal('methods'),
    alt: z.string(),
    methodsLabel: z.string(),
    limitsLabel: z.string(),
    methods: z.array(z.object({ title: z.string(), limits: z.array(z.array(z.string())) })),
    projectLabel: z.string(),
    projectTitle: z.string(),
    innovations: z.array(z.string()),
  }),
  /** The current situation and its limits, then the project in three steps, then its goal. */
  z.object({
    type: z.literal('path'),
    alt: z.string(),
    currentLabel: z.string(),
    current: z.string(),
    limitsLabel: z.string(),
    limits: z.array(z.string()),
    projectLabel: z.string(),
    projectTitle: z.string(),
    steps: z.array(z.string()),
    goalLabel: z.string(),
    goal: z.string(),
  }),
  /** Three communities and their needs, all leading to the project and its two parts. */
  z.object({
    type: z.literal('communities'),
    alt: z.string(),
    communities: z.array(z.object({ name: z.array(z.string()), need: z.array(z.string()) })),
    projectTitle: z.string(),
    parts: z.array(z.array(z.string())),
  }),
])

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
      /**
       * The project's own page, at /projects/<id>. Projects without it have no page yet. The
       * Markdown body is the text of its "Overview" section. Sections marked optional below only
       * show when they are given.
       */
      page: z
        .object({
          heading: z.string(),
          /** First sentence of the introduction, slightly larger. */
          lead: z.string(),
          intro: z.array(z.string()),
          /** Button under the introduction, to the game born from the project. */
          button: gameLink.optional(),
          /** Description of the illustration and the words written in it. */
          illustration: z.object({
            alt: z.string(),
            labels: z.record(z.string(), z.string()).default({}),
          }),
          glance: z.object({
            eyebrow: z.string(),
            heading: z.string(),
            focus: z.object({ label: z.string(), items: z.array(z.string()) }),
            period: z.object({ label: z.string(), value: z.string() }),
            /** `detail`: a smaller line under the funder, e.g. the research programme. */
            funding: z.object({
              label: z.string(),
              value: z.string(),
              detail: z.string().optional(),
            }),
            /** Last card: one or more groups of people or organizations, each with its label. */
            people: z.array(
              z.object({
                label: z.string(),
                people: z.array(z.object({ name: z.string(), affiliation: z.string().optional() })),
              }),
            ),
          }),
          overview: z.object({
            eyebrow: z.string(),
            heading: z.string(),
            /** Next to the text: a diagram, or else a photo. */
            diagram: overviewDiagram.optional(),
            image: image().optional(),
            imageAlt: z.string().optional(),
          }),
          outcomes: z.object({
            eyebrow: z.string(),
            heading: z.string(),
            cards: z.array(
              z.object({
                icon: z.enum(contentIcons),
                title: z.string(),
                text: z.string(),
                links: z.array(projectLink).default([]),
              }),
            ),
          }),
          /** Research approach (optional): text next to a diagram of the research cycle. */
          approach: z
            .object({
              eyebrow: z.string(),
              heading: z.string(),
              paragraphs: z.array(z.string()),
              /** Two boxes above the cycle and two below, each with a label and a text. */
              inputs: z.array(z.object({ label: z.string(), text: z.string() })),
              cycle: z.object({
                alt: z.string(),
                steps: z.array(z.string()),
                center: z.array(z.string()),
                label: z.string(),
                text: z.string(),
              }),
              outputs: z.array(z.object({ label: z.string(), text: z.string() })),
            })
            .optional(),
          /** From research to practice (optional). Without a photo, the text sits on the right. */
          practice: z
            .object({
              eyebrow: z.string(),
              heading: z.string(),
              paragraphs: z.array(z.string()),
              links: z.array(projectLink).default([]),
              image: image().optional(),
              imageAlt: z.string().optional(),
              /** CSS `object-position` of the photo, to choose what stays visible. */
              imagePosition: z.string().optional(),
            })
            .optional(),
          findings: z.object({
            eyebrow: z.string(),
            heading: z.string(),
            items: z.array(
              z.object({
                text: z.string(),
                /** Study and reference; *asterisks* put the journal name in italics. */
                source: z.string(),
                url: z.url().optional(),
              }),
            ),
          }),
          partners: z.object({
            eyebrow: z.string(),
            heading: z.string(),
            /** [Label](https://…) makes a link to another site. */
            paragraphs: z.array(z.string()),
            logos: z.array(z.object({ name: z.string(), logo: image(), height: z.number() })),
            acknowledgements: z.object({
              heading: z.string(),
              text: z.string(),
              funders: z.array(
                z.object({ name: z.string(), url: z.url(), logo: image(), height: z.number() }),
              ),
            }),
            /** Call for participants (optional), on a pink block under the partners. */
            getInvolved: z
              .object({ heading: z.string(), text: z.string(), button: z.string() })
              .optional(),
          }),
          resources: z.object({
            eyebrow: z.string(),
            heading: z.string(),
            /** Links to other sites (optional), above the publications. */
            links: z
              .object({
                heading: z.string(),
                items: z.array(z.object({ label: z.string(), url: z.url() })),
              })
              .optional(),
            /** Ids of the publications: their file names in `content/publications/`. */
            publications: z.array(z.string()),
            /** Small text under the publications (optional). */
            note: z.string().optional(),
          }),
          collaborate: z.object({ title: z.string(), text: z.string(), button: z.string() }),
        })
        .optional(),
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
    /** In citation style: "Jaccard, D., & Riboni, S." Leave it out when unknown. */
    authors: z.string().optional(),
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

// The members of the team, one folder per language (`en/`, `fr/`), one file per person. The body
// is the presentation; **bold** words open a paragraph, e.g. "**Research activities.**".
const people = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/people' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      /** Position in the team, e.g. "Research project manager". */
      role: z.string(),
      /** Degree or title shown under the name, e.g. "MSc in Computer Science (EPFL)". */
      degree: z.string(),
      /** Not shown by default: add it only for people who want their address on the site. */
      email: z.email().optional(),
      phone: z.string().optional(),
      /** Profiles on other sites, e.g. ORCID or Google Scholar. */
      links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      portrait: image(),
      portraitAlt: z.string(),
      /** Position in the list: the smallest number comes first. */
      order: z.number(),
      /** The head of the team, shown first and larger. */
      lead: z.boolean().default(false),
    }),
})

// The team page, one file per language (`fr.md`, `en.md`). The body is the introduction under
// the title. The current members come from the `people` collection.
const teamPage = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/team-page' }),
  schema: z.object({
    /** Title of the browser tab and of search results. */
    title: z.string(),
    /** Text shown by search engines under the page title. */
    description: z.string(),
    heading: z.string(),
    /** Link under the introduction. */
    link: z.object({ label: z.string(), url: z.url() }),
    /** Description of the illustration next to the title, for screen readers. */
    illustrationAlt: z.string(),
    /** Heading of the list of members. */
    members: z.string(),
    former: z.object({
      heading: z.string(),
      list: z.array(z.object({ name: z.string(), role: z.string() })),
    }),
    collaborate: z.object({ title: z.string(), text: z.string(), button: z.string() }),
  }),
})

// The news page, one file per language (`fr.md`, `en.md`). The body is the introduction under
// the title. The news come from the `news` collection.
const newsPage = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/news-page' }),
  schema: z.object({
    /** Title of the browser tab and of search results. */
    title: z.string(),
    /** Text shown by search engines under the page title. */
    description: z.string(),
    heading: z.string(),
    /** Description of the illustration next to the title, for screen readers. */
    illustrationAlt: z.string(),
  }),
})

// The contact page, one file per language (`fr.md`, `en.md`). The body is the introduction under
// the title. The address comes from the footer content.
const contact = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/contact' }),
  schema: z.object({
    /** Title of the browser tab and of search results. */
    title: z.string(),
    /** Text shown by search engines under the page title. */
    description: z.string(),
    heading: z.string(),
    /** Description of the illustration next to the title, for screen readers. */
    illustrationAlt: z.string(),
    /** Labels of the form fields and of its button. */
    form: z.object({
      name: z.string(),
      email: z.string(),
      subject: z.string(),
      message: z.string(),
      send: z.string(),
    }),
    location: z.object({
      heading: z.string(),
      /** Description of the map, for screen readers. */
      mapAlt: z.string(),
      mapLink: z.string(),
      mapUrl: z.url(),
    }),
  }),
})

// The ready-to-use serious games, one folder per language (`en/`, `fr/`), one file per game.
// The file name is the address of the game's page, e.g. `/serious-games/pm-game`.
const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/games' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      /** Field of the game, e.g. "Project management". */
      domain: z.string(),
      /** Languages the game is available in. */
      languages: z.array(z.enum(['en', 'fr'])),
      summary: z.string(),
      /** The two strong points shown on the card. */
      highlights: z.array(z.object({ title: z.string(), text: z.string() })),
      /** How to get the game, e.g. "Available under licence." */
      access: z.string(),
      image: image(),
      imageAlt: z.string(),
      /** Position in the list: the smallest number comes first. */
      order: z.number(),
      /**
       * The game's own page, at /serious-games/<id>. Games without it have no page yet. Sections
       * marked optional below only show when they are given.
       */
      page: z
        .object({
          /** Link to play the game online, in the hero and the call to action (optional). */
          play: z.object({ label: z.string(), url: z.url() }).optional(),
          /** Top of the page, on the photo of the game (`image`). */
          hero: z.object({
            lead: z.string(),
            /** Main button, to the contact page; an outline one when the game has `play`. */
            contactButton: z.string(),
            /** Button down to the trainer resources, when there are some. */
            resourcesButton: z.string().optional(),
            /** Button to the research project the game comes from (its id in `content/projects/`). */
            researchButton: z.object({ label: z.string(), project: z.string() }).optional(),
          }),
          intro: z.object({ heading: z.string(), paragraphs: z.array(z.string()) }),
          game: z.object({
            eyebrow: z.string(),
            heading: z.string(),
            paragraphs: z.array(z.string()),
            image: image(),
            imageAlt: z.string(),
            /** Steps of a game session, shown as a timeline (optional). */
            phases: z
              .object({ label: z.string(), phase: z.string(), items: z.array(z.string()) })
              .optional(),
          }),
          /** The skills, numbered: either one list (`items`) or one column per group (`groups`). */
          objectives: z
            .object({
              eyebrow: z.string(),
              heading: z.string(),
              items: z.array(z.string()).optional(),
              groups: z
                .array(z.object({ heading: z.string(), items: z.array(z.string()) }))
                .optional(),
            })
            .refine((value) => Boolean(value.items) !== Boolean(value.groups), {
              message: 'Give either `items` or `groups`',
            }),
          /** Teaching concept: text next to a diagram (optional). */
          concept: z
            .object({
              heading: z.string(),
              text: z.string(),
              diagram: z.discriminatedUnion('type', [
                /** The game in the center, linked to three parts around it. */
                z.object({
                  type: z.literal('hub'),
                  alt: z.string(),
                  /** Lines of the center label. */
                  center: z.array(z.string()),
                  /** Three parts, each as a list of lines. */
                  parts: z.array(z.array(z.string())),
                }),
                /** Three steps in a row, the middle one larger (e.g. briefing, simulation, debriefing). */
                z.object({
                  type: z.literal('sequence'),
                  alt: z.string(),
                  steps: z.array(z.string()),
                }),
              ]),
            })
            .optional(),
          /** Ready-to-use scenarios, then a card about creating one's own (optional). */
          scenarios: z
            .object({
              eyebrow: z.string(),
              heading: z.string(),
              cards: z.array(
                z.object({
                  icon: z.enum(contentIcons),
                  title: z.string(),
                  /** Languages the scenario exists in, shown as tags (optional). */
                  languages: z.array(z.enum(['en', 'fr'])).optional(),
                  text: z.string(),
                }),
              ),
              /** Last card, on a dark background: creating one's own scenarios (optional). */
              custom: z.object({ title: z.string(), text: z.string() }).optional(),
            })
            .optional(),
          /** Screenshots in a horizontal scroller (optional). */
          screenshots: z
            .object({
              eyebrow: z.string(),
              items: z.array(
                z.object({ image: image(), alt: z.string(), title: z.string(), text: z.string() }),
              ),
            })
            .optional(),
          /**
           * Text sections after the screenshots (optional), e.g. "For teachers": a heading on the
           * left, paragraphs and an optional link to a research project on the right.
           */
          sections: z
            .array(
              z.object({
                eyebrow: z.string(),
                heading: z.string(),
                paragraphs: z.array(z.string()),
                link: z.object({ label: z.string(), project: z.string() }).optional(),
              }),
            )
            .optional(),
          /** Documents for trainers, one tab per language (optional). */
          resources: z
            .object({
              eyebrow: z.string(),
              summary: z.string(),
              tabsLabel: z.string(),
              languages: z.array(
                z.object({
                  lang: z.enum(['en', 'fr']),
                  /** Name of the language, in that language: "English", "Français". */
                  label: z.string(),
                  groups: z.array(
                    z.object({
                      heading: z.string(),
                      documents: z.array(
                        z.object({ label: z.string(), url: z.url(), format: z.string() }),
                      ),
                    }),
                  ),
                }),
              ),
            })
            .optional(),
          /** Logos of the organizations using the game (optional). */
          users: z
            .object({
              heading: z.string(),
              list: z.array(z.object({ name: z.string(), logo: image(), height: z.number() })),
            })
            .optional(),
          callToAction: z.object({ title: z.string(), text: z.string(), button: z.string() }),
        })
        .optional(),
    }),
})

// The serious games page, one file per language (`fr.md`, `en.md`). The body is the
// introduction under the title. The games come from the `games` collection.
const gamesPage = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/games-page' }),
  schema: ({ image }) =>
    z.object({
      /** Title of the browser tab and of search results. */
      title: z.string(),
      /** Text shown by search engines under the page title. */
      description: z.string(),
      heading: z.string(),
      /** Illustration next to the title: its description and the words under it. */
      illustration: z.object({ alt: z.string(), research: z.string(), practice: z.string() }),
      gamesHeading: z.string(),
      /** Logos of the organizations using the games. */
      users: z.object({
        heading: z.string(),
        list: z.array(
          z.object({
            name: z.string(),
            logo: image(),
            /** Height of the logo on the page, in pixels. */
            height: z.number(),
          }),
        ),
      }),
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
  people,
  teamPage,
  newsPage,
  contact,
  games,
  gamesPage,
}
