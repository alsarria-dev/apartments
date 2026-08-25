/**
 * @file Route `/favorites` — the listings the visitor has saved.
 *
 * Reuses the same `ListingGrid` as the browsing page, differing only in the
 * empty state it supplies.
 *
 * Exports: {@link ApartmentFavorites} (default).
 */

import EmptyState from "../components/EmptyState";
import ListingGrid from "../components/ListingGrid";
import Page from "../components/Page";
import { ButtonLink } from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import styles from "./ApartmentFavorites.module.css";

/**
 * The saved-listings page.
 *
 * Note the `!loading` guard on the count: saved listings are resolved from the
 * catalogue, so while it is still loading `favorites` is legitimately empty.
 * Showing "0 stays" then would be wrong rather than merely premature.
 *
 * @param {object} props
 * @param {object[]} props.favorites Saved listings, in the order they were saved.
 * @param {(id: string) => boolean} props.isFavorite Saved-state lookup.
 * @param {(id: string) => void} props.toggleFavorite Saves or unsaves a listing.
 * @param {boolean} props.loading Catalogue still loading.
 * @returns {JSX.Element}
 */
const ApartmentFavorites = ({
  favorites,
  isFavorite,
  toggleFavorite,
  loading,
}) => {
  useScrollToTop();
  useDocumentTitle("Saved");

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
