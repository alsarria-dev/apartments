/**
 * @file The root component, and the home of **all** shared application state.
 *
 * This is the file to read first. There is no Context, no Redux and no store:
 * every piece of state the app shares is declared here and passed down as props,
 * at most two levels deep. If you want to know what the application knows, it is
 * all on this page.
 *
 * Responsibilities:
 *  - own the catalogue, the search query, saved listings and host-created listings
 *  - declare the routes and hand each page the slice of state it needs
 *  - render the persistent chrome (skip link, navbar, footer)
 *
 * See ARCHITECTURE.md §3 for a diagram of how these values derive from each other.
 *
 * Exports: {@link App} (default).
 */

// Importing Modules
import { useCallback, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

// Importing Pages
import ApartmentListing from "./pages/ApartmentListing";
import ApartmentDetails from "./pages/ApartmentDetails";
import ApartmentFavorites from "./pages/ApartmentFavorites";
import AddApartmentPage from "./pages/AddApartmentPage";
import About from "./pages/About";

// Importing Components for main page
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Importing Hooks and Helpers
import useCatalogue from "./hooks/useCatalogue";
import useDebouncedValue from "./hooks/useDebouncedValue";
import useFavorites from "./hooks/useFavorites";
import useLocalStorage from "./hooks/useLocalStorage";
import { filterListings } from "./lib/listings";

// Importing Styles
import styles from "./App.module.css";

/**
 * Root component: application state, routing and page chrome.
 *
 * @returns {JSX.Element}
 */
// Main App function
function App() {
  // The catalogue arrives in its own chunk, after first paint.
  const { listings, loading, error } = useCatalogue();

  // Only host-created listings are persisted. The bundled catalogue already
  // ships with the app, so storing a second copy of it would just burn quota.
  const [hostListings, setHostListings] = useLocalStorage(
    "homebrew:host-listings",
    [],
  );
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Host listings come first so a newly published place appears at the top of
  // the grid, where its author expects to find it.
  const allApartments = useMemo(
    () => [...hostListings, ...listings],
    [hostListings, listings],
  );

  // Search results are derived from the query rather than held in their own
  // piece of state. Two copies meant the input and the grid could drift apart —
  // results only ever updated on Enter, never as you typed.
  //
  // `query` drives the input so typing stays instant; `debouncedQuery` drives
  // the filtering so it runs once the typing settles.
  const debouncedQuery = useDebouncedValue(query, 250);
  const results = useMemo(
    () => filterListings(allApartments, debouncedQuery),
    [allApartments, debouncedQuery],
  );

  const { favorites, isFavorite, toggleFavorite } = useFavorites(allApartments);

  /**
   * Publishes a host-created listing, which persists to `localStorage`.
   * @param {object} listing A complete listing record; the caller mints the id.
   */
  const addListing = useCallback(
    (listing) => setHostListings((current) => [listing, ...current]),
    [setHostListings],
  );

  /**
   * Runs a search from outside the listings page — the landing-page hero — by
   * setting the query and navigating to the grid that displays it.
   * @param {string} value The search term.
   */
  const startSearch = useCallback(
    (value) => {
      setQuery(value);
      navigate("/properties");
    },
    [navigate],
  );

  return (
    <div className={styles.shell}>
      {/* Five nav links and a theme toggle precede the content on every page. */}
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <Navbar />
      <main id="main" className={styles.main}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                allApartments={allApartments}
                onSearch={startSearch}
              />
            }
          />
          {/*
            Note which pages receive `allApartments` and which receive `results`.
            `results` is the filtered view and is only ever for display; anything
            that looks a listing UP by id must use `allApartments`, or a listing
            excluded by the current search will resolve to undefined.
          */}
          <Route
            path="/properties"
            element={
              <ApartmentListing
                allApartments={allApartments}
                results={results}
                query={query}
                setQuery={setQuery}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                loading={loading}
                error={error}
              />
            }
          ></Route>
          <Route
            path="/favorites"
            element={
              <ApartmentFavorites
                favorites={favorites}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                loading={loading}
              />
            }
          ></Route>
          <Route
            path="/details/:apartmentId"
            element={
              <ApartmentDetails
                allApartments={allApartments}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                loading={loading}
              />
            }
          ></Route>
          <Route
            path="/add_apartment"
            element={<AddApartmentPage addListing={addListing} />}
          ></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
