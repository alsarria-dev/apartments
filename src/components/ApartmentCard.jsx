import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, StarIcon } from "./icons";
import {
  imageSource,
  imageSrcSet,
  listingArea,
  listingRating,
} from "../lib/listings";
import styles from "./ApartmentCard.module.css";

// Cards render 100 at a time and only change when their own listing or its
// saved state changes, so they're worth memoizing — which is only possible
// now that the whole results array isn't being handed to every one of them.
const CARD_WIDTHS = [280, 420, 560];

// `favorited` arrives as a boolean rather than as a predicate the card calls:
// the predicate changes identity on every toggle, which would re-render all
// 100 cards. A boolean changes for exactly the one card that was toggled.
const ApartmentCard = ({ apartment, favorited, onToggleFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const rating = listingRating(apartment);

  return (
    <article className={styles.card}>
      <Link to={`/details/${apartment.id}`} className={styles.link}>
        <div className={styles.media}>
          <img
            className={`${styles.image} ${imageLoaded ? styles.imageReady : ""}`}
            src={imageSource(apartment.picture_url.url, 280)}
            srcSet={imageSrcSet(apartment.picture_url.url, CARD_WIDTHS)}
            sizes="(max-width: 480px) 100vw, (max-width: 900px) 45vw, 280px"
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
            {/* h2, not h3: these sit directly under the page h1, and skipping
                a level breaks heading navigation. */}
            <h2 className={styles.title}>
              {apartment.property_type} in {listingArea(apartment)}
            </h2>
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
        onClick={() => onToggleFavorite(apartment.id)}
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

export default memo(ApartmentCard);
