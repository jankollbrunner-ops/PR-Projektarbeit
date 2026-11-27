# Copilot instructions

## Project location and commands

The application is located directly in the repository root. Run all npm commands from the repository root.

```powershell
npm install
npm run dev
npm run build
npm run preview
```

Create or update `.env` in the repository root with `MONGODB_URI` and, when needed, `MONGODB_DB`; `MONGODB_DB` defaults to `tokrecipe`. Recipe deletion also requires `ADMIN_DELETE_PASSWORD`. Keep actual credentials in the ignored `.env`, never in tracked files. There is currently no tracked `.env.example`, so do not instruct contributors to copy one unless it is added.

`npm run build` is the available project check. There is currently no test runner, test script, lint script, or test-file convention in the project, so there is no single-test command.

`README.md` is the canonical project documentation and follows the project-documentation template. Keep `README.md` up to date; `VORLAGE_README.md` has been merged into it and no longer exists as a separate file.

## Architecture

- This is a SvelteKit app using file-based routes. `src/routes/**/+page.server.js` owns server-side `load` functions and named form actions; paired `+page.svelte` files render the returned data and submit native forms to those actions. The home route also owns login, registration, and logout actions, while recipe routes own create, update, rating, save, and delete actions.
- Shared server-only logic lives in `src/lib/server/`: `mongodb.js` provides the MongoDB connection and recipes collection; `auth.js` manages users, sessions, and saved-recipe collections; `recipe-form.js` parses and validates recipe submissions; `recipe-rating.js` handles rating summaries/updates; and `tiktok.js` parses or resolves TikTok video IDs.
- MongoDB stores recipes in `recipes`, user accounts in `users`, session records in `sessions`, and user-to-recipe saved/cooked state in `savedRecipes`. Recipe IDs are MongoDB `ObjectId`s; saved-recipe records keep the recipe ID as a string and the user ID as an `ObjectId`.
- `src/env.js` declares private environment variables consumed through `$app/env/private`. Keep database credentials and deletion credentials server-side.

## Repository conventions

- The Vite configuration forces Svelte 5 runes mode for project components. Follow the existing `$props`, `$state`, `$derived`, and `$effect` patterns rather than legacy component state syntax.
- Keep database access and other privileged work in `+page.server.js` files or `src/lib/server/`; Svelte components receive data through route props and submit standard `GET`/`POST` forms to named actions.
- Keep recipe parsing and validation in `readRecipeForm` rather than duplicating it in create/edit actions. It returns `{ data, values, errors }`; actions return validation failures with `fail(...)` so forms can preserve entered values and display field errors.
- Recipe category values and core field limits are validated centrally in `src/lib/server/recipe-form.js`. Keep form options and validation aligned; user-facing application text is German.
- Authentication is intentionally a prototype: users identify themselves by username without a password. Sessions use the `tokrecipe_session` HttpOnly cookie and server-side expiry records. Preserve the shared `getSessionUser` flow when checking signed-in state; do not treat this prototype as production-grade authentication.
- A TikTok URL can be a short link, so use `resolveTikTokVideoId` when a stored video ID is needed. It parses direct video IDs first, then uses TikTok oEmbed; successful resolutions are cached on the recipe document.
- Keep `README.md` up to date whenever project changes affect its content, including the deployment link, implementation details, evaluation results, screenshots, and KI declaration.
