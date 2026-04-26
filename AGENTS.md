# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vite + React + TypeScript app with a small Express wrapper. Main application code lives in `src/`: `main.tsx` boots the app, `App.tsx` defines routes, `pages/` contains route-level screens, `components/` holds shared UI, `context/` stores app-wide state, and `data/` contains static content such as quiz data. Legacy static assets for the office workers experience live under `src/office-workers-static/` and are served at `/common/*` and `/office-workers/index.html` by the custom Vite plugin in `vite.config.ts`. Planning and design notes live in `docs/`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start the Vite dev server for local frontend work.
- `npm run build`: create a production build in `dist/`.
- `npm run preview`: preview the built app locally.
- `npm run lint`: run TypeScript type-checking with `tsc --noEmit`.
- `npm run start`: run `server.ts`, which serves the SPA and `/api/health`.

## Coding Style & Naming Conventions
Use TypeScript React function components and keep edits aligned with the style of the file you touch. Current code generally uses single quotes and semicolons. Name components and page files in PascalCase, for example `EmergencyKit.tsx`; keep helper/data modules in camelCase, for example `quizQuestions.ts`. Put shared UI in `src/components/`, route screens in `src/pages/`, and avoid mixing static content blobs into component files when they belong in `src/data/`.

## Testing Guidelines
There is no automated test suite yet. Before opening a PR, run `npm run lint` and `npm run build`, then manually smoke-test the main routes: `/`, `/simulation`, `/games`, `/encyclopedia`, `/kit`, and `/office-workers/index.html`. If you add tests later, place them near the feature as `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines
Git history is minimal, so use clear imperative commit subjects such as `Add emergency kit route copy` or `Fix office workers static asset path`. Keep commits focused on one concern. PRs should include a short summary, note any environment or route changes, link related issues when available, and attach screenshots or short recordings for visible UI updates. List the manual checks you ran.

## Security & Configuration Tips
Keep secrets in local env files only. Use `.env.example` as the template and set `GEMINI_API_KEY` in `.env.local`; do not commit real keys.
