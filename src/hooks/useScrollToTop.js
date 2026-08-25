import { useEffect } from "react";

// Every route used to carry its own copy of this effect.
const useScrollToTop = () => {
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "instant" });
  }, []);
};

export default useScrollToTop;
