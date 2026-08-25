import CityLedger from "../components/CityLedger";
import ListingGrid from "../components/ListingGrid";
import EmptyState from "../components/EmptyState";
import Page from "../components/Page";
import SearchBar from "../components/SearchBar";
import { Button } from "../components/Button";
import useScrollToTop from "../hooks/useScrollToTop";
import styles from "./ApartmentListing.module.css";

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
