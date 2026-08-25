import { useParams } from "react-router-dom";
import Details from "../components/Details";
import EmptyState from "../components/EmptyState";
import Page from "../components/Page";
import { ButtonLink } from "../components/Button";
import useScrollToTop from "../hooks/useScrollToTop";

const ApartmentDetails = ({ allApartments, isFavorite, toggleFavorite }) => {
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
      <Page>
        <EmptyState
          title="That stay isn't available"
          description="The link may be out of date, or the listing may have been removed."
          action={<ButtonLink to="/properties">Browse stays</ButtonLink>}
        />
      </Page>
    );
  }

  return (
    <Page>
      <Details
        apartmentDetail={apartmentDetail}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    </Page>
  );
};

export default ApartmentDetails;
