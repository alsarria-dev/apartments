/**
 * @file Sets the browser tab title for a route.
 *
 * Called by every page component. In a single-page app the document title does
 * not change on its own, so without this every route would share one title.
 *
 * Exports: {@link useDocumentTitle} (default).
 */

import { useEffect } from "react";

/** Site name, appended to every page title. */
const BASE = "HomeBrew";

// Every route used to share one title, so a screen reader announced nothing on
// navigation and browser history entries were indistinguishable.

/**
 * Sets `document.title` to `"<title> · HomeBrew"` for as long as the calling
 * component is mounted.
 *
 * This is an accessibility fix as much as a cosmetic one: several screen readers
 * announce the document title on navigation, and it is what distinguishes entries
 * in the browser's history and tab list.
 *
 * @param {string} [title] Page name. Omit it on the landing page to get the bare
 *   site name with no separator.
 * @returns {void}
 *
 * @sideeffect Writes `document.title`. Note that it is not restored on unmount —
 *   the next route sets its own, and every route calls this hook.
 */
const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : BASE;
  }, [title]);
};

export default useDocumentTitle;
