import ApartmentCard from "./ApartmentCard";
import styles from "./ListingGrid.module.css";

// Section and Favorites were the same component twice: grid of cards, or a
// message when there's nothing to show. The only thing that differed was the
// message, so that's the prop.
const ListingGrid = ({ listings, isFavorite, toggleFavorite, emptyState }) => {
  if (listings.length === 0) {
    return <div className={styles.empty}>{emptyState}</div>;
  }

  return (
    <div className={styles.grid}>
      {listings.map((apartment) => (
        <ApartmentCard
          key={apartment.id}
          apartment={apartment}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default ListingGrid;
