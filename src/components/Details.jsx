import { useState } from "react";
import { HeartIcon, StarIcon } from "./icons";
import { Button } from "./Button";
import { checkInScore, listingRating } from "../lib/listings";
import styles from "./Details.module.css";

const DESCRIPTION_LIMIT = 320;

function Details({ apartmentDetail, isFavorite, toggleFavorite }) {
  const [expanded, setExpanded] = useState(false);

  const rating = listingRating(apartmentDetail);
  const favorited = isFavorite(apartmentDetail.id);
  const description = apartmentDetail.space || apartmentDetail.description || "";
  const isLong = description.length > DESCRIPTION_LIMIT;

  const facts = [
    { label: "Guests", value: apartmentDetail.accommodates },
    { label: "Bedrooms", value: apartmentDetail.bedrooms },
    { label: "Beds", value: apartmentDetail.beds },
    { label: "Baths", value: apartmentDetail.bathrooms },
  ].filter((fact) => fact.value !== undefined && fact.value !== null);

  return (
    <article className={styles.detail}>
      <header className={styles.header}>
        <h1 className={styles.title}>{apartmentDetail.name}</h1>
        <p className={styles.location}>
          {apartmentDetail.property_type} in {apartmentDetail.city},{" "}
          {apartmentDetail.country}
          {rating !== null && (
            <span className={styles.rating}>
              <StarIcon />
              <span className={styles.ratingValue}>{rating}</span>
            </span>
          )}
        </p>
      </header>

      <div className={styles.layout}>
        <div className={styles.main}>
          <img
            className={styles.photo}
            src={apartmentDetail.picture_url.url}
            alt={apartmentDetail.name}
            width={720}
            height={540}
            decoding="async"
          />

          <dl className={styles.facts}>
            {facts.map(({ label, value }) => (
              <div key={label} className={styles.fact}>
                <dt className={styles.factLabel}>{label}</dt>
                <dd className={styles.factValue}>{value}</dd>
              </div>
            ))}
          </dl>

          {description && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About this place</h2>
              <p className={styles.description}>
                {isLong && !expanded
                  ? `${description.slice(0, DESCRIPTION_LIMIT).trimEnd()}…`
                  : description}
              </p>
              {isLong && (
                <button
                  type="button"
                  className={styles.more}
                  onClick={() => setExpanded((open) => !open)}
                  aria-expanded={expanded}
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              )}
            </section>
          )}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your host</h2>
            <p className={styles.host}>{apartmentDetail.host_name}</p>
            <p className={styles.hostMeta}>
              {apartmentDetail.host_since &&
                `Hosting since ${apartmentDetail.host_since.slice(0, 4)}`}
              {apartmentDetail.host_response_time &&
                ` · Usually replies ${apartmentDetail.host_response_time}`}
            </p>
            <p className={styles.hostMeta}>
              {checkInScore(apartmentDetail)}% of recent guests rated check-in
              five stars.
            </p>
          </section>
        </div>

        {/* Follows you down the page, the way a booking panel would. */}
        <aside className={styles.aside}>
          <div className={styles.card}>
            <p className={styles.price}>
              <span className={styles.priceValue}>
                €{apartmentDetail.price}
              </span>
              <span className={styles.priceUnit}>night</span>
            </p>

            <dl className={styles.breakdown}>
              <div className={styles.breakdownRow}>
                <dt>Per night</dt>
                <dd className={styles.amount}>€{apartmentDetail.price}</dd>
              </div>
              {apartmentDetail.cleaning_fee > 0 && (
                <div className={styles.breakdownRow}>
                  <dt>Cleaning fee</dt>
                  <dd className={styles.amount}>
                    €{apartmentDetail.cleaning_fee}
                  </dd>
                </div>
              )}
              {apartmentDetail.cancellation_policy && (
                <div className={styles.breakdownRow}>
                  <dt>Cancellation</dt>
                  <dd className={styles.policy}>
                    {apartmentDetail.cancellation_policy}
                  </dd>
                </div>
              )}
            </dl>

            <Button
              variant={favorited ? "secondary" : "primary"}
              className={styles.save}
              onClick={() => toggleFavorite(apartmentDetail.id)}
              aria-pressed={favorited}
            >
              <HeartIcon filled={favorited} size={16} />
              {favorited ? "Saved" : "Save"}
            </Button>
          </div>
        </aside>
      </div>
    </article>
  );
}

export default Details;
