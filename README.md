# albasim-website

Source of the AlbaSim website, [albasim.ch](https://albasim.ch).

It is a static site built with [Astro](https://astro.build). The text content is written in Markdown.

## Prerequisites

- **Node.js 26** or later.
- **npm**, which comes with Node.js.

## Getting started

```bash
npm install
npm run dev
```

The site is served at <http://localhost:4321> and reloads on every change.

| Command                | What it does                                                   |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Starts the local development server                            |
| `npm run build`        | Builds the production site into `dist/`                        |
| `npm run preview`      | Serves the built `dist/` locally, to check it before deploying |
| `npm run check`        | Checks TypeScript types and Astro files for errors             |
| `npm run format`       | Formats all files with [Prettier](https://prettier.io)         |
| `npm run format:check` | Checks the formatting without changing files (run by the CI)   |

## Repository layout

| Path                                             | What it is                                                           |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| [`content/`](content/)                           | All the Markdown content of the site                                 |
| [`src/pages/`](src/pages/)                       | One file per page or route                                           |
| [`src/layouts/`](src/layouts/)                   | Page templates shared by several pages                               |
| [`src/components/`](src/components/)             | Reusable building blocks                                             |
| [`src/styles/`](src/styles/)                     | Global CSS and design tokens ([`tokens.css`](src/styles/tokens.css)) |
| [`src/assets/`](src/assets/)                     | Images optimised by Astro at build time                              |
| [`src/content.config.ts`](src/content.config.ts) | Content collections: the expected fields of each type of content     |
| [`public/`](public/)                             | Files served as-is (favicon, `robots.txt`)                           |
| [`design/`](design/)                             | Design reference material. Not built or published                    |

## Branches and environments

| Branch | Deployed to                              | Purpose                                     |
| ------ | ---------------------------------------- | ------------------------------------------- |
| `main` | [albasim.ch](https://albasim.ch)         | Production                                  |
| `dev`  | [dev.albasim.ch](https://dev.albasim.ch) | Preview, to check changes before production |

Work happens on a short-lived branch, merged by pull request:

1. Create a branch from `dev`, and make your changes.
2. Open a pull request into `dev`. Once merged, the changes are visible on dev.albasim.ch.
3. When dev.albasim.ch is ready to go live, open a pull request from `dev` into `main`.

Every pull request into `dev` or `main` runs the [CI](.github/workflows/ci.yml): format check, type check and build. A pull request can only be merged once the CI passes.

[Dependabot](.github/dependabot.yml) opens a pull request into `dev` every month when dependencies have updates.

## Copyright

© AlbaSim. All rights reserved.
