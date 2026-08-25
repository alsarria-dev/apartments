/**
 * @file The single source of truth for which listings are saved.
 *
 * Called once, from `App.jsx`. Its three return values are passed down to any
 * component that needs to show or change saved state. No component should track
 * "is this saved?" independently — see the warning below.
 *
 * Exports: {@link useFavorites} (default).
 */

import { useCallback, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

/** Storage key. Holds a JSON array of listing id strings. */
const STORAGE_KEY = "homebrew:favorite-ids";

// Favorites are stored as ids rather than as copies of the listing. The id is
// the only part that can't go stale, storing it keeps a duplicate of the
// catalogue out of localStorage, and membership becomes a Set lookup instead of
// a scan of the whole array once per card.
//
// This is also the single source of truth for "is this favorited?". Cards used
// to keep their own boolean, which drifted from the real list every time one
// remounted — that's what produced duplicate entries and hearts that showed the
// wrong state.

/**
 * Saved-listing state, persisted across visits.
 *
 * Storing ids rather than listing objects has three consequences worth knowing:
 * the saved copy can never go stale, `localStorage` does not end up holding a
 * second copy of the catalogue, and an id whose listing has disappeared is simply
 * skipped rather than rendering a broken card.
 *
 * @param {object[]} allApartments The full catalogue, used to resolve ids back
 *   into listing objects. While the catalogue is still loading this is empty, so
 *   `favorites` is empty too — callers on the saved page must account for that
 *   and show a loading state rather than "nothing saved".
 * @returns {{
 *   favorites: object[],
 *   isFavorite: (id: string) => boolean,
 *   toggleFavorite: (id: string) => void
 * }}
 *   `favorites` — saved listings, in the order they were saved.
 *   `isFavorite` — membership test.
 *   `toggleFavorite` — adds if absent, removes if present.
 *
 * @sideeffect Writes `homebrew:favorite-ids` to `localStorage` on every toggle.
 */
const useFavorites = (allApartments) => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage(STORAGE_KEY, []);

  // A Set so `isFavorite` is O(1). It is called once per card, and the grid
  // renders 100 of them.
  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  // Kept in the order they were saved, and silently drops ids whose listing is
  // no longer in the catalogue.
  //
  // Mapping over `favoriteIds` (not filtering `allApartments`) is what preserves
  // save order; the Map avoids a linear scan per id.
  const favorites = useMemo(() => {
    const byId = new Map(allApartments.map((listing) => [listing.id, listing]));
    return favoriteIds.map((id) => byId.get(id)).filter(Boolean);
  }, [allApartments, favoriteIds]);

  const isFavorite = useCallback((id) => favoriteIdSet.has(id), [favoriteIdSet]);

  // Toggling from the current stored list — rather than from a flag held
  // somewhere else — is what makes a duplicate entry impossible.
  const toggleFavorite = useCallback(
    (id) =>
      setFavoriteIds((current) =>
        current.includes(id)
          ? current.filter((favoriteId) => favoriteId !== id)
          : [...current, id],
      ),
    [setFavoriteIds],
  );

  return { favorites, isFavorite, toggleFavorite };
};

export default useFavorites;
