import searchBar from "../assets/images/search.png";
import "./SearchBar.css";

// Purely controlled: the query lives in App, which derives the results from it.
// Filtering used to be triggered only by Enter and by a mount effect, so what
// you typed and what you saw could disagree.
const SearchBar = ({ query, setQuery }) => (
  <div className="search-box">
    <button className="btn-search" type="button">
      <img className="search-image" src={searchBar} alt="" />
    </button>
    <input
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="input-search"
      placeholder="Type to Search..."
      value={query}
      aria-label="Search listings by city or country"
    />
  </div>
);

export default SearchBar;
