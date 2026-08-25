import { useMemo, useState } from "react";
import { SearchIcon } from "../components/icons";
import useScrollToTop from "../hooks/useScrollToTop";
import heroWide from "../assets/images/hero-1536.jpg";
import heroNarrow from "../assets/images/hero-768.jpg";
import styles from "./HomePage.module.css";

function HomePage({ allApartments, onSearch }) {
  const [value, setValue] = useState("");
  useScrollToTop();

  // The three cities are the whole catalogue, so offering them directly is
  // faster than asking someone to guess what's in it.
  const cities = useMemo(() => {
    const counts = new Map();
    for (const listing of allApartments) {
      counts.set(listing.city, (counts.get(listing.city) ?? 0) + 1);
    }
    return [...counts]
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([city, count]) => ({ city, count }));
  }, [allApartments]);

  const submit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <section className={styles.hero}>
      {/* The largest paint on the landing page, so it is fetched eagerly at
          high priority and never lazily. */}
      <img
        className={styles.heroImage}
        src={heroWide}
        srcSet={`${heroNarrow} 768w, ${heroWide} 1536w`}
        sizes="100vw"
        alt=""
        width={1536}
        height={1024}
        fetchPriority="high"
        decoding="async"
      />
      <div className={styles.scrim} />

      <div className={styles.content}>
        <h1 className={styles.title}>Your home away from home</h1>
        <p className={styles.subtitle}>
          Flexible cancellation, online check-in, digital keys.
        </p>

        <form className={styles.search} onSubmit={submit} role="search">
          <SearchIcon className={styles.searchIcon} />
          <input
            className={styles.input}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Berlin, Paris or Madrid"
            aria-label="Search stays by city or country"
          />
          <button type="submit" className={styles.submit}>
            Search
          </button>
        </form>

        <ul className={styles.cities}>
          {cities.map(({ city, count }) => (
            <li key={city}>
              <button
                type="button"
                className={styles.city}
                onClick={() => onSearch(city)}
              >
                {city}
                <span className={styles.cityCount}>{count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default HomePage;
