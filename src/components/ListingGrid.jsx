/**
 * @file The listing grid, and the two states that stand in for it.
 *
 * Renders exactly one of: skeleton placeholders, an empty state, or the cards.
 * Shared by the browsing page and the saved page — they differ only in the
 * listings they pass and the empty state they supply.
 *
 * Exports: {@link ListingGrid} (default).
 */

import ApartmentCard from "./ApartmentCard";
import styles from "./ListingGrid.module.css";

/** Placeholder cards while loading. Roughly one viewport's worth. */
const SKELETON_COUNT = 8;

// Section and Favorites were the same component twice: grid of cards, or a
// message when there's nothing to show. The only thing that differed was the
// message, so that's the prop.
/**
 * A responsive grid of listing cards, with loading and empty states.
 *
 * The empty state is a prop rather than built in, because "no search results"
 * and "nothing saved yet" need different wording and different actions. That is
 * the only thing that differs between the two pages using this component.
 *
 * @param {object} props
 * @param {object[]} props.listings The listings to render.
 * @param {(id: string) => boolean} props.isFavorite Saved-state lookup, called
 *   once per card to produce each card's `favorited` boolean.
 * @param {(id: string) => void} props.toggleFavorite Passed to every card. Must
 *   be referentially stable or the cards' `memo` is wasted.
 * @param {JSX.Element} props.emptyState Rendered when `listings` is empty.
 * @param {boolean} [props.loading=false] Show skeletons instead of content.
 * @returns {JSX.Element}
 */
const ListingGrid = ({
  listings,
  isFavorite,
  toggleFavorite,
  emptyState,
  loading = false,
}) => {
  // The catalogue arrives in its own chunk, so this stands in for real work
  // rather than performing a wait that isn't happening.
  if (loading) {
    return (
      <div className={styles.grid} aria-busy="true" aria-label="Loading stays">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <div key={index} className={styles.skeleton}>
            <div className={styles.skeletonMedia} />
            <div className={styles.skeletonLine} />
            <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
          </div>
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return <div className={styles.empty}>{emptyState}</div>;
  }

  return (
    <div className={styles.grid}>
      {listings.map((apartment) => (
        <ApartmentCard
          key={apartment.id}
          apartment={apartment}
          favorited={isFavorite(apartment.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default ListingGrid;
