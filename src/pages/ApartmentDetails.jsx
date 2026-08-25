import { Link, useParams } from "react-router-dom";
import Details from "../components/Details";
import useScrollToTop from "../hooks/useScrollToTop";
import "./ApartmentListing.css";

const ApartmentDetails = ({ allApartments }) => {
  const { apartmentId } = useParams();
  useScrollToTop();

  // Look the listing up in the whole catalogue, not in the current search
  // results. Searching narrowed the array this page read from, so opening a
  // listing that the search excluded — a favorite in another city, a shared
  // link — found nothing and took the entire app down with it.
  const apartmentDetail = allApartments.find(
    (element) => element.id === apartmentId,
  );

  if (!apartmentDetail) {
    return (
      <div className="upper-container">
        <div className="nofavorites">
          That listing isn&apos;t available.{" "}
          <Link to="/properties">Browse all listings</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="upper-container">
      <Details apartmentDetail={apartmentDetail} />
    </div>
  );
};

export default ApartmentDetails;
