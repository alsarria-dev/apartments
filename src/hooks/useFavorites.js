import { useCallback, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

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
const useFavorites = (allApartments) => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage(STORAGE_KEY, []);

  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  // Kept in the order they were saved, and silently drops ids whose listing is
  // no longer in the catalogue.
  const favorites = useMemo(() => {
    const byId = new Map(allApartments.map((listing) => [listing.id, listing]));
    return favoriteIds.map((id) => byId.get(id)).filter(Boolean);
  }, [allApartments, favoriteIds]);

  const isFavorite = useCallback((id) => favoriteIdSet.has(id), [favoriteIdSet]);

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
