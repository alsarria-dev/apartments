import { useEffect, useState } from "react";

// The catalogue is imported dynamically so its ~117 kB stays out of the
// initial chunk — nothing on the landing page needs it. It also means the
// listing pages have a genuine loading state to show rather than a decorative
// one.
const useCatalogue = () => {
  const [state, setState] = useState({ listings: [], loading: true, error: false });

  useEffect(() => {
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
