import { Link } from "react-router-dom";
import starIcon from "../assets/images/star.png";
import heartFilledIcon from "../assets/images/filledheart_icon.png";
import heartIcon from "../assets/images/heart_icon.png";
import { listingArea, listingRating } from "../lib/listings";

const ApartmentCard = ({ apartment, isFavorite, toggleFavorite }) => {
  // Read straight from the shared favorites list. The card used to keep its own
  // boolean, which went stale whenever the list changed somewhere else.
  const favorited = isFavorite(apartment.id);
  const rating = listingRating(apartment);

  return (
    <div className="main-container">
      <img
        onClick={() => toggleFavorite(apartment.id)}
        className="fav-icon"
        src={favorited ? heartFilledIcon : heartIcon}
        alt={favorited ? "Remove from favorites" : "Save to favorites"}
      />{" "}
      <Link to={`/details/${apartment.id}`}>
        <img
          className="image-portfolio"
          src={apartment.picture_url.url}
          alt={apartment.name}
        />
        <div className="lower-container">
          <div className="lower2-container">
            <h5>{`${apartment.property_type} in ${listingArea(apartment)}`}</h5>
            <p className="card-info">{`${apartment.city}, ${apartment.country}`}</p>
            <p className="card-info">
              Max capacity: {apartment.accommodates} people
            </p>
            <p className="priceCard-info">
              <span className="bold">€{apartment.price}</span> night
            </p>
          </div>
          <div className="lower3-container">
            <img className="rate-icon" src={starIcon} alt="" />
            <p className="rating-info">{rating ?? "N/A"}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ApartmentCard;
