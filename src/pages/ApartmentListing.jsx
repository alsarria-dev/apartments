import Section from "../components/Section";
import SearchBar from "../components/SearchBar";
import useScrollToTop from "../hooks/useScrollToTop";
import "./ApartmentListing.css";

const ApartmentListing = ({
  dataArray,
  query,
  setQuery,
  isFavorite,
  toggleFavorite,
}) => {
  useScrollToTop();

  return (
    <div className="upper-container">
      <SearchBar query={query} setQuery={setQuery} />
      <Section
        dataArray={dataArray}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default ApartmentListing;
