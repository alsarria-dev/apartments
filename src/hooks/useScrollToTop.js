/**
 * @file Scrolls the window to the top when a page mounts.
 *
 * Called by every page component.
 *
 * Exports: {@link useScrollToTop} (default).
 */

import { useEffect } from "react";

// Every route used to carry its own copy of this effect.

/**
 * Jumps to the top of the page on mount.
 *
 * The browser preserves scroll position across a client-side route change, so
 * without this, following a link from halfway down the listing grid would drop
 * you halfway down the next page.
 *
 * `behavior: "instant"` rather than `"smooth"`: this is a page change, not a
 * movement within a page, and animating it would look like a glitch.
 *
 * @returns {void}
 * @sideeffect Scrolls the window on mount.
 */
const useScrollToTop = () => {
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "instant" });
  }, []);
};

export default useScrollToTop;
