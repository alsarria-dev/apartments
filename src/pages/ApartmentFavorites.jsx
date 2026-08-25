import EmptyState from "../components/EmptyState";
import ListingGrid from "../components/ListingGrid";
import Page from "../components/Page";
import { ButtonLink } from "../components/Button";
import useScrollToTop from "../hooks/useScrollToTop";
import styles from "./ApartmentFavorites.module.css";

const ApartmentFavorites = ({
  favorites,
  isFavorite,
  toggleFavorite,
  loading,
}) => {
  useScrollToTop();

  return (
    <Page>
      <header className={styles.header}>
        <h1 className={styles.title}>Saved</h1>
        {!loading && favorites.length > 0 && (
          <p className={styles.count}>
            <span className={styles.number}>{favorites.length}</span>{" "}
            {favorites.length === 1 ? "stay" : "stays"}
          </p>
        )}
      </header>

      <ListingGrid
        listings={favorites}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        loading={loading}
        emptyState={
          <EmptyState
            title="Nothing saved yet"
            description="Tap the heart on any stay to keep it here. Saved stays stay put between visits."
            action={<ButtonLink to="/properties">Browse stays</ButtonLink>}
          />
        }
      />
    </Page>
  );
};

export default ApartmentFavorites;
