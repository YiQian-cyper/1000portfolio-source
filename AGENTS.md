# Project instructions

## Auto-commit (user request)

After finishing **any** change in this project, make a git commit before reporting
back to the user. Do not ask first.

- Repository: this directory (`outputs/portfolio-site`), branch `main`.
- Stage everything (`git add -A`) and create **one** commit with a short English
  message in the imperative mood that describes the user-visible change.
- Never create branches, never amend, never rewrite history, never push unless
  the user explicitly asks.
- `npm run build:single` writes two files in `dist-single/`:
  `Game-Design-Portfolio.html` (lean - clips live in `videos/`) and
  `Game-Design-Portfolio-standalone.html` (every clip inlined as a data URI, so
  the page opens with no sibling files).
- If the change also affects the published site, rebuild with
  `npm run build:single`, copy the **lean** `dist-single/Game-Design-Portfolio.html`
  to `outputs/deploy/index.html` and `outputs/deploy/404.html`, and commit
  `outputs/deploy` too. Never publish the standalone file, it is ~28 MB.
- Keep the loose deliverable at `outputs/Game-Design-Portfolio.html` in sync by
  copying `dist-single/Game-Design-Portfolio-standalone.html` over it.
- If nothing actually changed, skip the commit and say so.

## Publishing

The live site is served by GitHub Pages from the `1000portfolio` repository and
the files in `outputs/deploy/`. See `outputs/DEPLOY-1000portfolio.md`.
Note: plain `git push` cannot reach github.com from this environment; uploads go
through the GitHub REST API.