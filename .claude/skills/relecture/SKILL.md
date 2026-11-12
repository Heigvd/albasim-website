---
name: relecture
description: Review and edit the text of one page or content type of the site in French and English, through a plain-text file the user edits outside the code. Use when the user asks to review, proofread or rewrite the texts of a page ("relecture de la page contact", "/relecture team"), or says a review file is ready.
argument-hint: <page or content type, e.g. home, research, team, games>
---

# Text review of a page (`/relecture`)

The head of the lab reviews the site's texts in a plain-text file, with French and English side by
side, instead of editing Markdown. This skill turns that into a repeatable cycle: one page, one
branch, one pull request. Talk to the user in French, as everywhere in this project.

The argument names what to review. Match it to a folder under `content/`, accepting French or
English names (`équipe` → `team-page` and `people`, `jeux` → `games-page` and `games`, `pied de
page` → `footer`). If it is missing or ambiguous, ask.

## Files

- Review files live in `relecture/` at the repository root. The folder is in `.gitignore`: never
  commit it.
- `relecture/<page>.txt`: the file the user edits.
- `relecture/.<page>.orig.txt`: an untouched copy of the file as you handed it over. It is how you
  find exactly what the user changed, even when they edit it several times.

## 1. Start

1. Check `relecture/` for an existing `<page>.txt`. If one exists, ask whether to resume it or
   start over: never silently overwrite the user's edits.
2. Follow the Git workflow in `CLAUDE.md`: switch to an up-to-date `dev`, then create the branch
   `texts-<page>` (for example `texts-research`). If a branch or an open pull request already exists
   for that page, say so and ask whether to continue on it.
3. Generate the review file from the **current** content (see the format below), copy it to
   `.<page>.orig.txt`, and check that every `FR :` and `EN :` text appears exactly in its source file.
4. Send the file to the user with SendUserFile, give its full path, and explain briefly how to edit
   it. Then stop and wait for "c'est prêt".

## 2. File format

```
TEXTES DE LA PAGE <NAME> — FRANÇAIS / ANGLAIS
==============================================

Mode d'emploi
- Modifie uniquement le texte après « FR : » et « EN : ».
- Garde les repères entre crochets [ ... ], ils me servent à remettre chaque texte à sa place.
- Les mots entre ** ** s'affichent en gras sur le site.
- Pour une remarque ou une question, ajoute une ligne qui commence par « NOTE : ».

------------------------------------------------
1. <SECTION OF THE PAGE, IN READING ORDER>
------------------------------------------------

[<short-key>] <What this text is, in French: title, button, image description…>
FR : <French text>
EN : <English text>
```

- Follow the order in which the texts appear on the page, grouped in numbered sections named in
  French after what the user sees.
- Include every human-readable text: frontmatter fields and the Markdown body. Each paragraph of
  the body gets its own entry.
- Leave out what is not text: slugs and ids (`page`, `featured`, `list`), image paths, icons,
  `order`, URLs. Keep numbers shown on the page (figures) as editable text.
- Describe `imageAlt`, `illustrationAlt` and similar fields as "Description de l'image (lue par les
  lecteurs d'écran)".
- Put the meta `title` and `description` in a last section, "Pour Google et les aperçus de lien
  (pas affiché sur la page)".
- For collections with one file per item (`games`, `projects`, `people`, `news`), make one section
  per item, titled with the item's name, and pair the French and English files by file name. Point
  out any item that exists in only one language.
- When a value is a list (`users: [Teachers, Researchers]`), write it on one line, comma-separated.

## 3. Review

When the user says the file is ready:

1. Compare `<page>.txt` with `.<page>.orig.txt` and list only what changed. Lines the user did not
   touch stay as they are on the site.
2. Review each change and come back with counter-proposals when needed, one numbered point per
   text, showing FR and EN:
   - spelling, grammar and anglicisms in French; natural English;
   - the two languages saying the same thing: when the user changes one language only, propose
     the matching change in the other;
   - consistency with the rest of the page (parallel titles, product names spelled the same way,
     such as "Wegas");
   - inclusive wording when a French text would otherwise need a gender agreement;
   - the meta description, when the change affects the page's main message.
3. Answer the user's `NOTE :` lines.
4. Wait for the user's decision on each point. Do not apply anything before.

## 4. Apply and check

1. Apply the approved texts to the Markdown files with exact replacements: each original text must
   be found exactly once, otherwise stop and look. Use typographic apostrophes (’) like the rest
   of the content.
2. Update `<page>.txt` and `.<page>.orig.txt` so they match the site again. If the user keeps
   editing, the next comparison then only shows new changes.
3. Run `npm run format`, `npm run check` and `npm run build`. Fix any error.
4. Start the dev server if it is not running (`npx astro dev --background`). Then open the page in
   both languages in the browser pane: routes are in `src/i18n/ui.ts`, and English has no prefix
   while French starts with `/fr/`. Check that the new texts are there.
5. Summarise what changed and ask whether to commit and open the pull request.

## 5. Commit and pull request

On the user's go-ahead, follow `CLAUDE.md`:

- commit only the content files, with a message such as
  `Revise the research page texts in French and English`;
- push the branch and open a pull request into `dev`, describing the changes section by section and
  how to check them (the routes in both languages);
- stop there: a human reviews and merges.

## 6. After the merge

The next time the user asks for a review, or when they say the pull request is merged, delete
`relecture/<page>.txt` and `relecture/.<page>.orig.txt` for the merged pages, after telling the
user. A new review always starts from the site as it is, never from an old file.

## Small edits

For a word or a sentence given directly in the conversation, skip the review file: make the change
(and propose the matching one in the other language) on a branch, then commit and open a pull
request as above.
