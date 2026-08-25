/**
 * @file Route `/details/:apartmentId` — one listing in full.
 *
 * Resolves the URL parameter to a listing and renders one of three states:
 * loading, not-found, or the listing itself. Getting that three-way split right
 * matters more than it looks — see the comments in the body.
 *
 * Exports: {@link ApartmentDetails} (default).
 */

import { useParams } from "react-router-dom";
import Details from "../components/Details";
import EmptyState from "../components/EmptyState";
import Page from "../components/Page";
import { ButtonLink } from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import styles from "./ApartmentDetails.module.css";

/**
 * The listing detail page.
 *
 * Renders exactly one of three states, in this order:
 *  1. `loading` — the catalogue chunk has not arrived yet
 *  2. no match — the id is not in the catalogue
 *  3. the listing
 *
 * The order matters: see the comment on the `loading` branch.
 *
 * @param {object} props
 * @param {object[]} props.allApartments The **full** catalogue. Must not be the
 *   filtered search results — see the comment on the lookup below.
 * @param {(id: string) => boolean} props.isFavorite Saved-state lookup.
 * @param {(id: string) => void} props.toggleFavorite Saves or unsaves a listing.
 * @param {boolean} props.loading Catalogue still loading.
 * @returns {JSX.Element}
 */
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

  useDocumentTitle(apartmentDetail?.name ?? (loading ? "Loading" : "Not found"));

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
