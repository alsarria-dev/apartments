/**
 * @file Light / dark / system theme state.
 *
 * Called only by `ThemeToggle`. The palette itself lives in
 * `src/styles/tokens.css`; this hook decides which of its three blocks applies by
 * stamping (or removing) `data-theme` on `<html>`.
 *
 * Exports: {@link useTheme} (default).
 */

import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

/**
 * Storage key holding `"light"`, `"dark"` or `"system"`.
 *
 * NOTE: the inline script in `index.html` reads this same key directly, before
 * React exists, to stamp the theme ahead of first paint. Change one and you must
 * change the other.
 */
const STORAGE_KEY = "homebrew:theme";

/**
 * The operating system's current colour-scheme preference.
 *
 * Optional-chained because `matchMedia` is absent in some non-browser
 * environments (jsdom under test, for one).
 *
 * @returns {"dark"|"light"}
 */
const systemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Three states, not two: "system" leaves the root element unstamped so
// prefers-color-scheme decides, while an explicit choice stamps data-theme and
// wins in both directions.

/**
 * Resolves and controls the active theme.
 *
 * The stored preference has three values, but only two ever reach the UI.
 * `"system"` is stored as the *absence* of a choice: it leaves `<html>`
 * unstamped so the `prefers-color-scheme` block in `tokens.css` applies, and it
 * keeps following the OS if the user changes it while the page is open.
 *
 * @returns {{ resolvedTheme: "light"|"dark", toggleTheme: () => void }}
 *   `resolvedTheme` is what is actually on screen, with `"system"` already
 *   resolved — use it to decide which icon to show.
 *
 * @sideeffect Sets or removes `data-theme` on `<html>`; writes `homebrew:theme`
 *   to `localStorage`; subscribes to the `prefers-color-scheme` media query.
 */
const useTheme = () => {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEY, "system");
  const [systemPreference, setSystemPreference] = useState(systemTheme);

  // Tracked live so that a visitor on "system" sees the page follow the OS if it
  // switches (at sunset, say) without needing a reload.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) =>
      setSystemPreference(event.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme = theme === "system" ? systemPreference : theme;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggling from `resolvedTheme` rather than `theme` means the first click from
  // "system" flips away from what is currently on screen, which is what the user
  // expects. Toggling from `theme` would make that click a no-op half the time.
  const toggleTheme = useCallback(
    () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    [resolvedTheme, setTheme],
  );

  return { resolvedTheme, toggleTheme };
};

export default useTheme;
