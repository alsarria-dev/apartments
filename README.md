# Homebrew Apartments 🏡

[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/alsarria-dev) [![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE) [![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev) [![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)

**Homebrew Apartments** is a small React single-page application that lets users browse short-term apartment listings, search by city/country, mark favorites, view details, and add new listings locally. The app uses a static JSON dataset (`src/data/project_data.json`) and client-side routing for a smooth experience.

---

## ✨ Features

- Browse a list of apartments (data loaded from `src/data/project_data.json`)
- Search apartments by **city** or **country** (case-insensitive)
- Mark / unmark listings as **Favorites** (client-side bookmark state)
- View apartment details on a separate page (includes photos, rating, host, description)
- **Add new apartments** via a form (client-only: a random id is generated and state is updated)
- Simple client-side routing with React Router
- Basic responsive layout and visual components

---

## 🧩 Tech Stack

- Frontend: **React** (functional components + hooks) + **React Router**
- Build tool: **Vite**
- Formatting & linting: **Prettier**, **ESLint**

Key dependencies (see `package.json`):

- `react`, `react-dom`, `react-router-dom`
- `vite`, `@vitejs/plugin-react`
- `eslint`, `prettier`

---

## ⚙️ Project Structure (important files)

- `index.html` - App entry
- `src/main.jsx` - React root and Router
- `src/App.jsx` - Routes and top-level state (data, favorites, search input)
- `src/pages/*` - Page components: `HomePage`, `ApartmentListing`, `ApartmentDetails`, `ApartmentFavorites`, `AddApartmentPage`, `About`
- `src/components/*` - Reusable UI: `Navbar`, `Footer`, `SearchBar`, `Section`, `ApartmentCard`, `Details`, `Favorites`
- `src/data/project_data.json` - Local dataset used by the app
- `vite.config.js`, `.eslintrc` (if present) - tooling config

---

## 🛠️ Local Setup / Development

Prerequisites:

- Node.js (>= 16 recommended)
- npm or yarn

Steps:

1. Clone the repo

   ```bash
   git clone <repo-url>
   cd homebrew-apartments
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Run the dev server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Build / Preview

   ```bash
   npm run build
   npm run preview
   ```

---

## 📋 Scripts (from `package.json`)

- `npm run dev` — start development server
- `npm run build` — produce a production build
- `npm run preview` — preview the build locally
- `npm run lint` — run ESLint
- `npm run pretty` — run Prettier

---

## 🗄️ Data & Persistence Notes

- The app uses a static JSON file (`src/data/project_data.json`) as the source of truth.
- Adding apartments using the **Add Apartment** form updates the in-memory state and prepends a randomly generated id — the change is not persisted to disk or a remote database.
- If you want persistence, consider adding an API or integrating a service like Supabase or Firebase and update the create / update / delete flows accordingly.

---

## ♻️ Contributing

- Open an issue or pull request
- Keep changes small and focused
- Run linting and formatting before opening a PR (`npm run lint`, `npm run pretty`)

---

## 👤 Author

**Alvaro Sarria Rico (alsarria-dev)**

- GitHub: https://github.com/alsarria-dev

---

## 🏷️ License

This project is licensed under the **MIT License**. See the `LICENSE` file in the project root for full terms.

Copyright (c) 2026 Alvaro Sarria Rico

---

Happy hacking! ✨
