/**
 * @file Pure read helpers over a single listing record.
 *
 * Every surface that displays a listing — the grid card, the saved list, the
 * detail view — reads its fields through this module, so they cannot disagree
 * about how a field is presented. Nothing here imports React or touches the DOM,
 * which is what makes it the most heavily tested part of the codebase.
 *
 * A "listing" is one entry from `src/data/listings.json`. See the `KEEP` array in
 * `scripts/build-catalogue.mjs` for the exact set of fields available.
 *
 * Exports: {@link listingArea}, {@link listingRating}, {@link filterListings},
 * {@link checkInScore}, {@link imageSource}, {@link imageSrcSet}.
 */

/**
 * The place name shown on a card, e.g. the "Sol" in "Apartment in Sol".
 *
 * @param {object} listing
 * @returns {string} The neighbourhood, or the city when there isn't one.
 */
// 11 of the 100 listings have no neighbourhood. The fallback used to be the
// literal string "La Latina", which labelled three Paris apartments with a
// Madrid neighbourhood. The city is the honest answer.
export const listingArea = (listing) => listing.neighbourhood || listing.city;

/**
 * A listing's rating on the 0–10 scale the UI displays.
 *
 * @param {object} listing
 * @returns {number|null} The score out of 10, or `null` when the listing has no
 *   rating — callers are expected to omit the rating entirely rather than print
 *   a placeholder.
 */
// Scores are stored out of 100 and shown out of 10; 11 listings have none.
export const listingRating = (listing) =>
  listing.review_scores_rating ? listing.review_scores_rating / 10 : null;

/**
 * Narrows a list of listings to those whose city or country contains `query`.
 * Case-insensitive, and surrounding whitespace is ignored.
 *
 * IMPORTANT: for an empty or whitespace-only query this returns the **same array
 * reference** it was given, rather than a copy. `ApartmentCard` is memoized and a
 * fresh array on every render would defeat that. There is a test asserting the
 * identity; preserve it if you rewrite this.
 *
 * @param {object[]} listings The full set to search.
 * @param {string} query Raw text from the search input.
 * @returns {object[]} Matching listings, or `listings` itself when the query is
 *   empty. Never `null`.
 */
export const filterListings = (listings, query) => {
  const term = query.trim().toLowerCase();
  if (!term) return listings;

  // Optional chaining because host-created listings are user input and a field
  // can be missing; a throw here would blank the whole grid.
  return listings.filter(
    (listing) =>
      listing.city?.toLowerCase().includes(term) ||
      listing.country?.toLowerCase().includes(term),
  );
};

/**
 * Folds a string id into a non-negative integer.
 *
 * A standard multiply-by-31-and-add rolling hash. `| 0` coerces to a 32-bit int
 * each round, which keeps the running value from growing past what a JS number
 * represents exactly; `Math.abs` undoes the sign that coercion can introduce.
 *
 * Not cryptographic, and not intended to be — it only needs to be deterministic.
 *
 * @param {string} id
 * @returns {number} A non-negative integer, stable for a given id.
 */
const hashId = (id) => {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
};

/**
 * The "N% of recent guests rated check-in five stars" figure on the detail page.
 *
 * This number is illustrative — the dataset carries no check-in statistic. It is
 * derived from the listing id rather than randomised so that it is stable across
 * re-renders and across visits: it previously called `Math.random()` during
 * render and reshuffled every time the page re-rendered.
 *
 * @param {object} listing
 * @returns {number} An integer in the range 80–100 inclusive.
 */
export const checkInScore = (listing) => 80 + (hashId(listing.id) % 21);

/**
 * Rewrites a catalogue photo URL to request a specific pixel width.
 *
 * The catalogue's photos are hosted on **imgix**, an image CDN that reads sizing
 * parameters (`w`, `h`, `q`) from the query string and resizes on the fly. The
 * stored URLs already carry those parameters, so asking for a different size
 * costs nothing but a rewritten query string — no build step, no extra assets.
 *
 * Listings created through the host form point at arbitrary URLs, which no CDN
 * will resize, so anything not on an imgix host is returned untouched. A URL that
 * cannot be parsed is likewise returned as-is rather than throwing, because it
 * reaches this function from user input.
 *
 * @param {string} url The photo URL from `listing.picture_url.url`.
 * @param {number} width Desired width in pixels; height is set to match (the
 *   catalogue's images are square).
 * @returns {string} A rewritten imgix URL, or `url` unchanged.
 */
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

/**
 * Builds an `<img srcset>` value offering the same photo at several widths, so
 * the browser can pick one appropriate to the viewport and pixel density.
 *
 * Note that for a non-imgix URL every candidate resolves to the identical string
 * (see {@link imageSource}); that is harmless — the browser simply has one real
 * choice.
 *
 * @param {string} url The photo URL from `listing.picture_url.url`.
 * @param {number[]} widths Widths in pixels, e.g. `[280, 420, 560]`.
 * @returns {string} A comma-separated srcset, e.g. `"…w=280… 280w, …w=560… 560w"`.
 */
export const imageSrcSet = (url, widths) => {
  const sources = widths.map((width) => `${imageSource(url, width)} ${width}w`);
  return sources.join(", ");
};
