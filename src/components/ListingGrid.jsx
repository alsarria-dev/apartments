import ApartmentCard from "./ApartmentCard";
import styles from "./ListingGrid.module.css";

const SKELETON_COUNT = 8;

// Section and Favorites were the same component twice: grid of cards, or a
// message when there's nothing to show. The only thing that differed was the
// message, so that's the prop.
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
