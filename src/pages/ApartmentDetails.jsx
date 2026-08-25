import { useParams } from "react-router-dom";
import Details from "../components/Details";
import EmptyState from "../components/EmptyState";
import Page from "../components/Page";
import { ButtonLink } from "../components/Button";
import useScrollToTop from "../hooks/useScrollToTop";
import styles from "./ApartmentDetails.module.css";

const ApartmentDetails = ({
  allApartments,
  isFavorite,
  toggleFavorite,
  loading,
}) => {
  const { apartmentId } = useParams();
  useScrollToTop();

  // Look the listing up in the whole catalogue, not in the current search
  // results. Searching narrowed the array this page read from, so opening a
  // listing that the search excluded — a favorite in another city, a shared
  // link — found nothing and took the entire app down with it.
  const apartmentDetail = allApartments.find(
    (element) => element.id === apartmentId,
  );

  // "Not loaded yet" and "no such listing" look identical from here, so they
  // have to be told apart explicitly — otherwise opening a link directly
  // flashes "that stay isn't available" before the catalogue arrives.
  if (loading) {
    return (
      <Page>
        <p className={styles.loading} aria-busy="true">
          Loading stay…
        </p>
      </Page>
    );
  }

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
