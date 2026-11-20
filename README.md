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
| [`src/assets/`](src/assets/)                     | Images optimized by Astro at build time                              |
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

Every pull request into `dev` or `main` runs the [CI](.github/workflows/ci.yml): format check, type check and build. The branch rules require this check (`Verify`): a pull request can only be merged once the CI passes.

[Dependabot](.github/dependabot.yml) opens a pull request into `dev` every month when dependencies have updates.

## Deployment

The site is hosted by Infomaniak. Every push to `dev` or `main` runs the [deploy workflow](.github/workflows/deploy.yml): it builds the site and uploads `dist/` over FTPS to the matching site.

| Branch | Site                               | FTP variable    | FTP secret          |
| ------ | ---------------------------------- | --------------- | ------------------- |
| `dev`  | dev.albasim.ch, password-protected | `FTP_DEV_USER`  | `FTP_DEV_PASSWORD`  |
| `main` | albasim.ch                         | `FTP_PROD_USER` | `FTP_PROD_PASSWORD` |

Both use the repository variable `FTP_HOST`. Each FTP account can only access the folder of its own site.

The `.htaccess`, `.htdigest` and `.user.ini` files on the server are managed in the Infomaniak Manager (password protection, compression, PHP settings). The deploy never uploads or deletes them, so don't add them to `public/`.

## Contact form

The [contact form](src/components/contact/ContactForm.astro) posts to [`public/contact.php`](public/contact.php), which emails the message with PHP's `mail()`. A hidden field (a honeypot) catches spam bots. With JavaScript, the result shows under the button; without it, `contact.php` redirects to `/contact/thanks/` or `/contact/error/`.

`npm run dev` doesn't run PHP: locally, sending always ends with the error message. The real test happens on dev.albasim.ch. The CI checks the PHP syntax.

The email addresses are not in the repository. On each site, `contact.php` reads them from a config file outside the site folder, named after it. To set up a site, once, in the Infomaniak Manager:

1. In the site's advanced settings (**Paramètres avancés**), on the **PHP | Apache** tab, enable the **mail** function, which is off by default. In the **Sender Email** field (**E-mail de l'expéditeur**) that appears below it, enter the existing mailbox that sends the messages, `noreply@albasim.ch` ([Infomaniak FAQ 2150](https://www.infomaniak.com/en/support/faq/2150/unauthenticated-mail-via-php-mail)).
2. In the file manager, copy [`server/contact-config.example.php`](server/contact-config.example.php) to `/sites/contact-config-dev.albasim.ch.php` (`/sites/contact-config-albasim.ch.php` for production), next to the site folder, not inside it.
3. Replace the two addresses in it. The sender must be the same address as the **Sender Email** of step 1. On dev, send to a test address.
4. Add these lines to the site's `.htaccess`, outside the sections generated by Infomaniak, so that no other PHP file can run:

   ```apache
   # Only contact.php may run as PHP.
   <FilesMatch "^(?!contact\.php$).*\.(php|phtml|phar)$">
       Require all denied
   </FilesMatch>
   ```

If the config file is missing or invalid, `contact.php` sends nothing, answers with an error and logs it in the PHP error log.

## Copyright

© AlbaSim. All rights reserved.
