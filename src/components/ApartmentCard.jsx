import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, StarIcon } from "./icons";
import { listingArea, listingRating } from "../lib/listings";
import styles from "./ApartmentCard.module.css";

const ApartmentCard = ({ apartment, isFavorite, toggleFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  // Read straight from the shared favorites list. The card used to keep its own
  // boolean, which went stale whenever the list changed somewhere else.
  const favorited = isFavorite(apartment.id);
  const rating = listingRating(apartment);

  return (
    <article className={styles.card}>
      <Link to={`/details/${apartment.id}`} className={styles.link}>
        <div className={styles.media}>
          <img
            className={`${styles.image} ${imageLoaded ? styles.imageReady : ""}`}
            src={apartment.picture_url.url}
            alt={apartment.name}
            width={280}
            height={280}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className={styles.body}>
          <div className={styles.heading}>
            <h3 className={styles.title}>
              {apartment.property_type} in {listingArea(apartment)}
            </h3>
            {rating !== null && (
              <p className={styles.rating}>
                <StarIcon />
                <span className={styles.ratingValue}>{rating}</span>
              </p>
            )}
          </div>

          <p className={styles.place}>
            {apartment.city}, {apartment.country}
          </p>
          <p className={styles.detail}>Sleeps {apartment.accommodates}</p>

          <p className={styles.price}>
            <span className={styles.priceValue}>€{apartment.price}</span>
            <span className={styles.priceUnit}>night</span>
          </p>
        </div>
      </Link>

      <button
        type="button"
        className={styles.favorite}
        onClick={() => toggleFavorite(apartment.id)}
        aria-pressed={favorited}
        aria-label={
          favorited
            ? `Remove ${apartment.name} from saved`
            : `Save ${apartment.name}`
        }
      >
        <HeartIcon filled={favorited} />
      </button>
    </article>
  );
};

export default ApartmentCard;
