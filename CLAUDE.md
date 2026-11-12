# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

The website of AlbaSim, published at [albasim.ch](https://albasim.ch). It is a static site built with [Astro](https://docs.astro.build); its text content is written in Markdown.

Two people mostly work on it with Claude:

- the **head of the lab**, who mainly writes and updates content;
- the **designer**, who is comfortable with code and implements the design.

Neither is a Git specialist: handle the Git and GitHub steps for them (see [Git workflow](#git-workflow)) and explain briefly what you do.

Languages:

- **Talk to them in French**, the language they use with you.
- **Write the repository in English**: code, comments, documentation, commit messages and pull request descriptions. Use American spelling (`color`, `center`, `optimize`), as CSS and JavaScript do.
- **The site's content** is written in the language of the page it belongs to, not necessarily English.

## Commands

| Command                | Use                                                      |
| ---------------------- | -------------------------------------------------------- |
| `npm install`          | Install the dependencies (Node.js 26 or later)           |
| `npm run dev`          | Local dev server on <http://localhost:4321>              |
| `npm run build`        | Build the site into `dist/`                              |
| `npm run check`        | Type-check TypeScript and `.astro` files                 |
| `npm run format`       | Format every file with Prettier                          |
| `npm run format:check` | Check formatting without changing files (the CI runs it) |

Start the dev server in the background with `npx astro dev --background`, then manage it with `npx astro dev status`, `npx astro dev logs` and `npx astro dev stop`.

Before every commit, run `npm run format`, then `npm run check` and `npm run build`. Fix any error before committing.

## Where things go

| Path                    | Contents                                                                      |
| ----------------------- | ----------------------------------------------------------------------------- |
| `content/`              | All the Markdown content. One folder per content type (e.g. `content/news/`)  |
| `src/content.config.ts` | One content collection per type, with a schema for its frontmatter            |
| `src/pages/`            | One file per page or route. English at the root, French under `src/pages/fr/` |
| `src/i18n/ui.ts`        | Interface strings (navigation, labels) and the URL of each page per language  |
| `src/layouts/`          | Page templates; `BaseLayout.astro` holds the `<html>` skeleton                |
| `src/components/`       | Reusable components                                                           |
| `src/scripts/`          | Client-side scripts shared by several components                              |
| `src/utils/`            | TypeScript helpers shared by pages and components                             |
| `src/styles/tokens.css` | Design tokens: colors, fonts, spacing, as CSS custom properties               |
| `src/styles/global.css` | Global styles (reset, base typography)                                        |
| `src/assets/`           | Images used by pages and components, optimized by Astro                       |
| `public/`               | Files served unchanged at the site root (favicon, `robots.txt`)               |
| `design/`               | Design reference material. Never imported, built or published                 |
| `relecture/`            | Text review files of the `/relecture` skill. Ignored by Git, never committed  |

## Conventions

- **TypeScript** everywhere (`.ts` files and the frontmatter of `.astro` files). The `tsconfig.json` is strict: type props with an `interface Props`.
- **Formatting** is Prettier's job (single quotes, no semicolons, 100-character lines). Don't format by hand; run `npm run format`.
- **Content stays out of components.** Text the head of the lab may want to edit goes in Markdown under `content/`, not hard-coded in `.astro` files. When adding a new type of content, add its collection and schema in `src/content.config.ts`.
- **Styles:** use the tokens from `tokens.css` instead of hard-coded values, and the scoped `<style>` block of each component for component styles. The styling approach is not final: don't add Tailwind or another CSS framework without asking.
- **Dependencies:** don't add an npm package without asking first. Most needs are covered by Astro itself.
- **Images:** put them in `src/assets/` and render them with Astro's `<Image />` component, so they are resized and optimized.

### Accessibility

Every change must keep the site usable with a keyboard, a screen reader and at high zoom:

- Use semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>`, real `<button>` and `<a>` elements, one `<h1>` per page and no skipped heading levels.
- Give every meaningful image an `alt` text that says what it shows; decorative images get `alt=""`.
- Keep text contrast at WCAG AA level or above (4.5:1 for body text, 3:1 for large text).
- Keep a visible focus style on everything interactive; never remove `outline` without a replacement.
- Respect `prefers-reduced-motion` for animations.
- Set the right `lang` on the page.

## Implementing the designs

The designs were made with Claude as artifacts. They reach you pasted in the conversation or saved in `design/`.

- Treat them as a visual and structural reference, not as code to copy. Rebuild them as Astro layouts and components, with the repeated values (colors, fonts, spacing) moved to `tokens.css`.
- Move the text from the design into Markdown content when it is content, not interface.
- Check the result in the dev server, at desktop and mobile widths, and compare it with the design.
- When the design leaves a choice open (a missing state, a mobile layout), ask rather than invent.

## Git workflow

| Branch | Deployed to                              | Rules                                 |
| ------ | ---------------------------------------- | ------------------------------------- |
| `main` | [albasim.ch](https://albasim.ch)         | Production. Changes only through a PR |
| `dev`  | [dev.albasim.ch](https://dev.albasim.ch) | Preview. Changes only through a PR    |

For every change:

1. Start from an up-to-date `dev`: `git switch dev && git pull`, then create a branch with a short descriptive name (`git switch -c news-page`).
2. Commit in small steps, with a short imperative message in English (`Add the news page`).
3. When the work is ready, push the branch and open a pull request into `dev` with `gh pr create --base dev`. Describe what changed and how to check it.
4. **Stop there.** A human reviews and merges the pull request on GitHub. Once merged, the change is visible on dev.albasim.ch.

Publishing to production is a pull request from `dev` into `main`, opened and merged by a human.

Never:

- commit or push directly to `main` or `dev`;
- merge a pull request;
- force-push, rewrite published history, or delete remote branches;
- change the repository settings, rules or secrets.

## Documentation

Check the Astro docs before working on a related task:

- [Routing and pages](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)
- [Images](https://docs.astro.build/en/guides/images/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)
