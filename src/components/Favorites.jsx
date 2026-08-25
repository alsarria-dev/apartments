import ApartmentCard from "./ApartmentCard";
import "./Favorites.css";

const Favorites = ({ favorites, isFavorite, toggleFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="major-container2">
        <div className="nofavorites">No Favorites Selected</div>
      </div>
    );
  }

  return (
    <div className="major-container22">
      {favorites.map((apartment) => (
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

export default Favorites;
