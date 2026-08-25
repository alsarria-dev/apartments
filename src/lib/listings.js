// Shared reads over a listing record, so the card, the favorites list and the
// detail view can't disagree about how a field is displayed.

// 11 of the 100 listings have no neighbourhood. The fallback used to be the
// literal string "La Latina", which labelled three Paris apartments with a
// Madrid neighbourhood. The city is the honest answer.
export const listingArea = (listing) => listing.neighbourhood || listing.city;

// Scores are stored out of 100 and shown out of 10; 11 listings have none.
export const listingRating = (listing) =>
  listing.review_scores_rating ? listing.review_scores_rating / 10 : null;

export const filterListings = (listings, query) => {
  const term = query.trim().toLowerCase();
  if (!term) return listings;

  return listings.filter(
    (listing) =>
      listing.city?.toLowerCase().includes(term) ||
      listing.country?.toLowerCase().includes(term),
  );
};

// The check-in figure is illustrative, but it used to call Math.random() during
// render, so it reshuffled on every re-render of the page it was shown on.
// Deriving it from the id keeps it stable for a given listing across renders
// and across visits.
const hashId = (id) => {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
};

export const checkInScore = (listing) => 80 + (hashId(listing.id) % 21);

// The catalogue's photos are served by imgix and already carry sizing params
// (`w`, `h`, `q`), so asking for other widths costs nothing but a rewritten
// query string. Listings added by a host point at arbitrary URLs, so anything
// that isn't an imgix URL is left exactly as it is.
export const imageSource = (url, width) => {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith("imgix.net")) return url;
    parsed.searchParams.set("w", String(width));
    parsed.searchParams.set("h", String(width));
    return parsed.toString();
  } catch {
    return url;
  }
};

export const imageSrcSet = (url, widths) => {
  const sources = widths.map((width) => `${imageSource(url, width)} ${width}w`);
  return sources.join(", ");
};
