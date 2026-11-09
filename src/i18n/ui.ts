// Interface strings and routes for each language.
// Page content lives in Markdown under `content/`; this file only holds the site's chrome
// (navigation labels, accessibility labels) and the URL of each page in each language.

export const languages = {
  en: 'English',
  fr: 'Français',
} as const

export type Lang = keyof typeof languages

export const defaultLang: Lang = 'en'

/** URL of each page in each language. English is served at the root, French under /fr/. */
export const routes = {
  home: { en: '/', fr: '/fr/' },
  research: { en: '/research', fr: '/fr/recherche' },
  publications: { en: '/publications', fr: '/fr/publications' },
  team: { en: '/team', fr: '/fr/equipe' },
  news: { en: '/news', fr: '/fr/actualites' },
  contact: { en: '/contact', fr: '/fr/contact' },
  games: { en: '/serious-games', fr: '/fr/serious-games' },
} satisfies Record<string, Record<Lang, string>>

export type RouteKey = keyof typeof routes

export const ui = {
  fr: {
    'nav.label': 'Navigation principale',
    'nav.research': 'Recherche',
    'nav.publications': 'Publications',
    'nav.team': 'Équipe',
    'nav.news': 'Actualités',
    'nav.contact': 'Contact',
    'nav.games': 'Serious games',
    'nav.more': 'Plus',
    'nav.openMenu': 'Ouvrir le menu',
    'nav.closeMenu': 'Fermer le menu',
    'header.home': 'Accueil AlbaSim',
    'header.wegasLogin': 'Connexion Wegas',
    'lang.label': 'Langue',
    'footer.label': 'Pied de page',
    'footer.explore': 'Explorer',
    'footer.contact': 'Contact',
    'footer.links': 'Liens',
    'heig.website': 'Site de la HEIG-VD',
    'link.newTab': '(nouvel onglet)',
    'home.allNews': 'Toutes les actualités',
    'home.allProjects': 'Tous les projets',
    'home.allPublications': 'Toutes les publications',
    'card.readMore': 'Lire la suite',
    'card.learnMore': 'En savoir plus',
    'card.access': 'Accès',
    'publication.journal-article': 'Article de revue',
    'publication.conference-paper': 'Article de conférence',
    'publication.book-chapter': 'Chapitre de livre',
    'publication.other': 'Autre',
    'wegas.modules': 'Les trois modules de Wegas :',
  },
  en: {
    'nav.label': 'Main navigation',
    'nav.research': 'Research',
    'nav.publications': 'Publications',
    'nav.team': 'Team',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.games': 'Serious games',
    'nav.more': 'More',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'header.home': 'AlbaSim home',
    'header.wegasLogin': 'Wegas login',
    'lang.label': 'Language',
    'footer.label': 'Footer',
    'footer.explore': 'Explore',
    'footer.contact': 'Contact',
    'footer.links': 'Links',
    'heig.website': 'HEIG-VD website',
    'link.newTab': '(opens in a new tab)',
    'home.allNews': 'All news',
    'home.allProjects': 'All projects',
    'home.allPublications': 'All publications',
    'card.readMore': 'Read more',
    'card.learnMore': 'Learn more',
    'card.access': 'Access',
    'publication.journal-article': 'Journal article',
    'publication.conference-paper': 'Conference paper',
    'publication.book-chapter': 'Book chapter',
    'publication.other': 'Other',
    'wegas.modules': 'The three Wegas modules:',
  },
} as const satisfies Record<Lang, Record<string, string>>

export type UiKey = keyof (typeof ui)[typeof defaultLang]

export function isLang(value: string | undefined): value is Lang {
  return value !== undefined && value in languages
}

/** Returns a translator for the given language. */
export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key]
}

/** Returns the URL of a page in the given language. */
export function localizedPath(key: RouteKey, lang: Lang): string {
  return routes[key][lang]
}

/** URL of a project page. The project pages themselves are not built yet. */
export function projectPath(id: string, lang: Lang): string {
  return lang === 'fr' ? `/fr/projets/${id}` : `/projects/${id}`
}

function normalize(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

/** Finds which page a URL path belongs to, if it is one of the fixed routes. */
export function routeKeyFromPath(path: string): RouteKey | undefined {
  const target = normalize(path)
  return (Object.keys(routes) as RouteKey[]).find((key) =>
    Object.values(routes[key]).some((p) => normalize(p) === target),
  )
}

/**
 * The URL of the current page in every language. Pages with dynamic routes (a project, a news
 * item) pass their own alternates to the layout; other pages fall back to the home page.
 */
export function alternatesFor(path: string): Record<Lang, string> {
  const key = routeKeyFromPath(path) ?? 'home'
  return routes[key]
}
