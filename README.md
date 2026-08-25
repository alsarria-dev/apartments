# Homebrew Apartments 🏡

[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/alsarria-dev) [![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE) [![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev) [![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)

**Homebrew Apartments** is a single-page web app for browsing short-term apartment
listings across Madrid, Berlin and Paris. You can search by city or country, save
listings you like, open a listing to see its details and pricing, and publish a
listing of your own.

It is **entirely client-side**. There is no server, no database and no API: the
catalogue of 100 listings ships with the app as a JSON file, and anything you
create or save is stored in your browser's `localStorage`. That constraint shapes
most of the design, so it is worth knowing up front.

---

## ✨ Features

- Browse 100 apartment listings in a responsive grid
- Search by **city** or **country**, case-insensitive and debounced as you type
- A live **city ledger** above the grid showing how many results each city has
- Save listings to a **Saved** list that survives a page reload
- View a listing's photo, facts, price breakdown, description and host
- **Publish a listing** of your own; it appears in the grid and persists locally
- Light and dark themes, following your system preference until you choose one

---

## 🧩 Tech stack

- **React 19** — function components and hooks only, no class components
- **React Router 7** — client-side routing
- **Vite 8** — dev server and build
- **Vitest** + **Testing Library** + **jsdom** — tests
- **ESLint 9/10 flat config** + **Prettier** — linting and formatting
- **CSS Modules** + CSS custom properties — styling; no CSS framework

There is no TypeScript, no state-management library and no UI component library.
Application state lives in `src/App.jsx` and is passed down as props.

---

## 🚀 Getting started

### Prerequisites

- **Node.js 20.19+ or 22.12+** (required by Vite 8)
- **npm** (the repo has a `package-lock.json`; other package managers are untested)

### Install and run

```bash
git clone https://github.com/alsarria-dev/homebrew-apartments.git
cd homebrew-apartments
npm install
npm run dev
```

The dev server prints a local URL, by default <http://localhost:5173>.

### Verify your setup

```bash
npm run lint    # ESLint — fails on any warning
npm test        # Vitest, single run
npm run build   # production build into dist/
```

All three should pass on a clean checkout. If they do, your environment is good.

---

## 📋 Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Regenerate the catalogue (via `prebuild`), then build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check a production build |
| `npm run lint` | ESLint across the repo. `--max-warnings 0`, so a warning fails it |
| `npm run pretty` | Format all js/jsx/mjs/cjs/ts/tsx/json with Prettier |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run data:build` | Regenerate `src/data/listings.json` from the source dump |

### Running a single test

```bash
npx vitest run src/lib/listings.test.js              # one file
npx vitest run -t "never stores the same listing twice"  # one test by name
```

---

## 🗂️ Project structure

| Path | What lives here |
| --- | --- |
| `index.html` | HTML entry point. Also holds the inline no-flash theme script |
| `src/main.jsx` | React root; mounts `<App>` inside the router and loads global CSS |
| `src/App.jsx` | Routes, and **all** application state. Start reading here |
| `src/pages/` | One component per route, each wrapping its content in `<Page>` |
| `src/components/` | Reusable UI. See [`src/components/README.md`](./src/components/README.md) |
| `src/hooks/` | Custom hooks. See [`src/hooks/README.md`](./src/hooks/README.md) |
| `src/lib/` | Pure helpers for reading and formatting a listing record |
| `src/styles/` | The two global stylesheets. See [`src/styles/README.md`](./src/styles/README.md) |
| `src/data/` | The listing catalogue — two files, see below |
| `src/assets/` | Fonts and images imported by components |
| `src/test/` | Vitest setup file (jsdom shims, cleanup between tests) |
| `scripts/` | Build-time Node scripts. Currently just the catalogue generator |
| `dist/` | Build output. Generated, git-ignored |

### The two data files

This trips people up, so it is called out here as well as in `ARCHITECTURE.md`:

- **`src/data/project_data.json`** — the original 100-listing dump. It is the
  **source of record and is not imported by the application.**
- **`src/data/listings.json`** — **what the app actually loads.** Generated from
  the dump by `scripts/build-catalogue.mjs`, which drops the fields nothing
  renders (roughly 60% of the bytes). It is committed so a fresh clone runs
  immediately, and regenerated automatically before every build.

If a field is missing at runtime, check the `KEEP` list in
`scripts/build-catalogue.mjs`, then run `npm run data:build`.

---

## 🚢 Deployment

`vercel.json` contains a single rewrite that serves `/` for any path without a
file extension. That is the standard SPA fallback: it lets someone open
`/details/12345` directly instead of getting a 404, because routing is handled in
the browser.

> The rewrite rule implies a Vercel deployment, but no pipeline, project settings
> or environment variables are present in the repo, so the actual deploy process
> is not documented here.

---

## 📚 Where to go next

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — how the pieces fit together, the
  lifecycle of a search and of a save, key design decisions, and a
  "where do I look if I want to change X" table.
- **[CLAUDE.md](./CLAUDE.md)** — a condensed version of the same, aimed at AI
  coding agents.

---

## 🏷️ License

MIT. See [`LICENSE`](./LICENSE).

Copyright (c) 2026 Alvaro Sarria Rico

**Author:** Alvaro Sarria Rico ([alsarria-dev](https://github.com/alsarria-dev))
