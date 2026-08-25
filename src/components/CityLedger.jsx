import { useMemo } from "react";
import { CloseIcon } from "./icons";
import styles from "./CityLedger.module.css";

// Every listing belongs to exactly one city, and search matches on city and
// country — so a live count per city isn't decoration, it's the search state
// made readable. It does the job of the filter chips, the active-filter
// summary and the reset control at once.
const MAX_CITIES = 6;

const CityLedger = ({ allApartments, results, query, setQuery }) => {
  const cities = useMemo(() => {
    const counts = new Map();
    for (const listing of allApartments) counts.set(listing.city, 0);
    for (const listing of results) {
      counts.set(listing.city, counts.get(listing.city) + 1);
    }
    return [...counts].sort(
      ([cityA, countA], [cityB, countB]) =>
        countB - countA || cityA.localeCompare(cityB),
    );
  }, [allApartments, results]);

  const trimmed = query.trim();
  const isCityActive = (city) =>
    city.toLowerCase() === trimmed.toLowerCase();

  return (
    <section className={styles.ledger} aria-label="Results by city">
      <p className={styles.summary}>
        {trimmed ? (
          <>
            <span className={styles.number}>{results.length}</span> of{" "}
            <span className={styles.number}>{allApartments.length}</span> stays
            match <span className={styles.term}>{trimmed}</span>
          </>
        ) : (
          <>
            <span className={styles.number}>{allApartments.length}</span> stays
            across <span className={styles.number}>{cities.length}</span> cities
          </>
        )}
      </p>

      <ul className={styles.cities}>
        <li>
          <button
            type="button"
            className={`${styles.city} ${trimmed ? "" : styles.cityActive}`}
            onClick={() => setQuery("")}
            aria-pressed={!trimmed}
          >
            All
            <span className={styles.count}>{allApartments.length}</span>
          </button>
        </li>

        {cities.slice(0, MAX_CITIES).map(([city, count]) => (
          <li key={city}>
            <button
              type="button"
              className={[
                styles.city,
                isCityActive(city) ? styles.cityActive : "",
                count === 0 ? styles.cityEmpty : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setQuery(isCityActive(city) ? "" : city)}
              aria-pressed={isCityActive(city)}
            >
              {city}
              <span className={styles.count}>{count}</span>
            </button>
          </li>
        ))}

        {trimmed && (
          <li>
            <button
              type="button"
              className={styles.clear}
              onClick={() => setQuery("")}
            >
              <CloseIcon size={13} />
              Clear
            </button>
          </li>
        )}
      </ul>
    </section>
  );
};

export default CityLedger;
