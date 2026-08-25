import Favorites from "../components/Favorites";
import useScrollToTop from "../hooks/useScrollToTop";

const ApartmentFavorites = ({ favorites, isFavorite, toggleFavorite }) => {
  useScrollToTop();

  return (
    <div className="upper-container">
      <Favorites
        favorites={favorites}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default ApartmentFavorites;
