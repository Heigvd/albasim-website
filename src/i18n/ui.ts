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
    'news.readLess': 'Réduire',
    'games.availableIn': 'Disponible en',
    'breadcrumb.label': 'Fil d’Ariane',
    'project.allProjects': 'Projets de recherche',
    'project.readPaper': 'Lire l’article',
    'games.and': 'et',
    'language.en': 'anglais',
    'language.fr': 'français',
    'carousel.previous': 'Afficher les logos précédents',
    'carousel.next': 'Afficher plus de logos',
    'card.learnMore': 'En savoir plus',
    'card.access': 'Accès',
    'publication.journal-article': 'Article de revue',
    'publication.conference-paper': 'Article de conférence',
    'publication.book-chapter': 'Chapitre de livre',
    'publication.other': 'Autre',
    'publication.kind.talk': 'Présentation',
    'publication.kind.workshop': 'Atelier',
    'publication.kind.interview': 'Entretien',
    'publication.kind.poster': 'Poster',
    'publication.kind.article': 'Article',
    'publication.translatedFrom.no': '(en norvégien)',
    'publications.filterLabel': 'Filtrer par type',
    'publications.filter.all': 'Toutes',
    'publications.filter.journal-article': 'Articles de revue',
    'publications.filter.conference-paper': 'Articles de conférence',
    'publications.filter.book-chapter': 'Chapitres de livre',
    'publications.filter.other': 'Présentations, ateliers et autres',
    'publications.shown': '{count} publications affichées',
    'wegas.modules': 'Les trois modules de Wegas :',
    'wegas.researchSteps': 'La recherche avec Wegas :',
    'game.enlarge': 'Agrandir la capture d’écran : {title}',
    'game.close': 'Fermer',
    'game.previous': 'Capture précédente',
    'game.next': 'Capture suivante',
    'game.position': '{index} sur {count}',
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
    'news.readLess': 'Read less',
    'games.availableIn': 'Available in',
    'breadcrumb.label': 'Breadcrumb',
    'project.allProjects': 'Research projects',
    'project.readPaper': 'Read the paper',
    'games.and': 'and',
    'language.en': 'English',
    'language.fr': 'French',
    'carousel.previous': 'Show previous logos',
    'carousel.next': 'Show more logos',
    'card.learnMore': 'Learn more',
    'card.access': 'Access',
    'publication.journal-article': 'Journal article',
    'publication.conference-paper': 'Conference paper',
    'publication.book-chapter': 'Book chapter',
    'publication.other': 'Other',
    'publication.kind.talk': 'Talk',
    'publication.kind.workshop': 'Workshop',
    'publication.kind.interview': 'Interview',
    'publication.kind.poster': 'Poster',
    'publication.kind.article': 'Article',
    'publication.translatedFrom.no': '(in Norwegian)',
    'publications.filterLabel': 'Filter by type',
    'publications.filter.all': 'All',
    'publications.filter.journal-article': 'Journal articles',
    'publications.filter.conference-paper': 'Conference papers',
    'publications.filter.book-chapter': 'Book chapters',
    'publications.filter.other': 'Talks, workshops & other',
    'publications.shown': '{count} publications shown',
    'wegas.modules': 'The three Wegas modules:',
    'wegas.researchSteps': 'Research with Wegas:',
    'game.enlarge': 'Enlarge screenshot: {title}',
    'game.close': 'Close',
    'game.previous': 'Previous screenshot',
    'game.next': 'Next screenshot',
    'game.position': '{index} of {count}',
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

/** URL of a project page. Only the projects with a `page` in their content have one. */
export function projectPath(id: string, lang: Lang): string {
  return lang === 'fr' ? `/fr/projets/${id}` : `/projects/${id}`
}

/** URL of the page of a ready-to-use game, under the serious games page. */
export function gamePath(id: string, lang: Lang): string {
  return `${routes.games[lang]}/${id}`
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
