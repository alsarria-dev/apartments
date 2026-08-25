/**
 * @file Loads the listing catalogue as a separate JavaScript chunk.
 *
 * This is the app's only asynchronous data source. Called once, from `App.jsx`;
 * its `loading` flag is threaded down to every page that renders listings.
 *
 * Exports: {@link useCatalogue} (default).
 */

import { useEffect, useState } from "react";

// The catalogue is imported dynamically so its ~117 kB stays out of the
// initial chunk — nothing on the landing page needs it. It also means the
// listing pages have a genuine loading state to show rather than a decorative
// one.

/**
 * Fetches the listing catalogue.
 *
 * Loads `src/data/listings.json` through a dynamic `import()`, which makes the
 * bundler emit it as its own chunk requested after first paint instead of
 * inlining it into the main bundle.
 *
 * Consumers must distinguish `loading` from "found nothing". Before the chunk
 * resolves the catalogue is an empty array, so a listing lookup returns
 * `undefined` for a perfectly valid id — `ApartmentDetails` would flash "that
 * stay isn't available" on a direct link if it treated the two as the same.
 *
 * On failure the hook reports `error` and an empty catalogue rather than
 * rejecting, leaving the caller to render a retry affordance.
 *
 * @returns {{ listings: object[], loading: boolean, error: boolean }}
 *   Exactly one of `loading` / `error` is meaningful at a time; when both are
 *   false, `listings` is populated.
 *
 * @sideeffect Triggers a network request for the catalogue chunk on mount.
 */
const useCatalogue = () => {
  const [state, setState] = useState({ listings: [], loading: true, error: false });

  useEffect(() => {
    // Guards against setting state after unmount if the chunk resolves late.
    let cancelled = false;

    import("../data/listings.json")
      .then((module) => {
        if (!cancelled) {
          setState({ listings: module.default, loading: false, error: false });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ listings: [], loading: false, error: true });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};

export default useCatalogue;
