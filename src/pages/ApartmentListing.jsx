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
        emptyState={
          <EmptyState
            title={`Nothing in “${query.trim()}”`}
            description="Search matches on city and country. The ledger above shows what each city has right now."
            action={
              <Button onClick={() => setQuery("")}>Show all stays</Button>
            }
          />
        }
      />
    </Page>
  );
};

export default ApartmentListing;
