import "./Section.css";
import ApartmentCard from "./ApartmentCard";

const Section = ({ dataArray, isFavorite, toggleFavorite }) => {
  if (dataArray.length === 0) {
    return (
      <div className="major-container11">
        <div className="nofavorites">No properties found</div>
      </div>
    );
  }

  return (
    <div className="major-container11">
      {dataArray.map((apartment) => (
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

export default Section;
