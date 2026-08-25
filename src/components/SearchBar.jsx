/**
 * @file The search field on the listings page.
 *
 * Exports: {@link SearchBar} (default).
 */

import { CloseIcon, SearchIcon } from "./icons";
import styles from "./SearchBar.module.css";

// Purely controlled: the query lives in App, which derives the results from it.
// Filtering used to be triggered only by Enter and by a mount effect, so what
// you typed and what you saw could disagree.
//
// The field is also permanently visible now. It used to be a 50px circle that
// expanded to 500px on focus, which hid the page's primary control until you
// found it.
/**
 * The search field on the listings page. Fully controlled — it holds no state.
 *
 * Bound to the raw query, not the debounced one, so typing feels instant; the
 * debounce happens between the query and the filtering, in `App.jsx`.
 *
 * @param {object} props
 * @param {string} props.query Current search text.
 * @param {(value: string) => void} props.setQuery Updates the search text.
 * @returns {JSX.Element}
 */
const SearchBar = ({ query, setQuery }) => (
  <div className={styles.field}>
    <SearchIcon className={styles.icon} />
    <input
      id="listing-search"
      type="text"
      className={styles.input}
      placeholder="Search by city or country"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      aria-label="Search listings by city or country"
      autoComplete="off"
    />
    {query && (
      <button
        type="button"
        className={styles.clear}
        onClick={() => setQuery("")}
        aria-label="Clear search"
      >
        <CloseIcon size={14} />
      </button>
    )}
  </div>
);

export default SearchBar;
