/**
 * @file Route `/properties` — the main browsing surface.
 *
 * Composes the search field, the city ledger and the listing grid. It owns no
 * state of its own: the query and the results both arrive from `App.jsx`, which
 * is what guarantees the ledger's counts and the grid can never disagree.
 *
 * Exports: {@link ApartmentListing} (default).
 */

import CityLedger from "../components/CityLedger";
import ListingGrid from "../components/ListingGrid";
import EmptyState from "../components/EmptyState";
import Page from "../components/Page";
import SearchBar from "../components/SearchBar";
import { Button } from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import styles from "./ApartmentListing.module.css";

/**
 * The listings page.
 *
 * @param {object} props
 * @param {object[]} props.allApartments Full catalogue — the ledger needs it to
 *   show every city, including ones the current search has narrowed to zero.
 * @param {object[]} props.results The filtered listings to display.
 * @param {string} props.query Current search text (raw, not debounced).
 * @param {(value: string) => void} props.setQuery Updates the search text.
 * @param {(id: string) => boolean} props.isFavorite Saved-state lookup.
 * @param {(id: string) => void} props.toggleFavorite Saves or unsaves a listing.
 * @param {boolean} props.loading Catalogue still loading; shows skeleton cards.
 * @param {boolean} props.error Catalogue failed to load; shows a retry state.
 * @returns {JSX.Element}
 */
const ApartmentListing = ({
  allApartments,
  results,
  query,
  setQuery,
  isFavorite,
  toggleFavorite,
  loading,
  error,
}) => {
  useScrollToTop();
  useDocumentTitle("Stays");

  return (
    <Page>
      <header className={styles.header}>
        <h1 className={styles.title}>Where to?</h1>
        <SearchBar query={query} setQuery={setQuery} />
      </header>

      <CityLedger
        allApartments={allApartments}
        results={results}
        query={query}
        setQuery={setQuery}
      />

      <ListingGrid
        listings={results}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        loading={loading}
        // Two different "nothing to show" cases: the catalogue failed to load,
        // or it loaded fine and the search matched nothing. They need different
        // wording and a different action, so they are distinguished here rather
        // than sharing one generic message.
        emptyState={
          error ? (
            <EmptyState
              title="Couldn't load the stays"
              description="Something went wrong fetching the catalogue. Reloading usually sorts it."
              action={
                <Button onClick={() => window.location.reload()}>
                  Reload
                </Button>
              }
            />
          ) : (
            <EmptyState
              title={`Nothing in “${query.trim()}”`}
              description="Search matches on city and country. The ledger above shows what each city has right now."
              action={
                <Button onClick={() => setQuery("")}>Show all stays</Button>
              }
            />
          )
        }
      />
    </Page>
  );
};

export default ApartmentListing;
