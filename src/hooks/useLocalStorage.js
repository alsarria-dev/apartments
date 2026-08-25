/**
 * @file `useState` that mirrors its value into `localStorage`.
 *
 * The foundation for everything the app remembers between visits: saved listing
 * ids, host-created listings and the theme choice all sit on top of this hook.
 *
 * Exports: {@link useLocalStorage} (default).
 */

import { useEffect, useState } from "react";

/**
 * Reads and parses a stored value, falling back when it is absent or unreadable.
 *
 * The `try` covers more than malformed JSON. `localStorage` can throw on *access*
 * rather than on write: private-browsing modes and "block site data" settings
 * make the property getter itself raise a SecurityError. Treating that as "no
 * stored value" is what lets the app degrade instead of failing to render.
 *
 * @param {string} key
 * @param {*} fallback Returned when nothing is stored or storage is unreadable.
 * @returns {*} The parsed value, or `fallback`.
 */
const read = (key, fallback) => {
  try {
    const stored = window.localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch {
    return fallback;
  }
};

/**
 * State that survives a page reload.
 *
 * Behaves like `useState`: the setter accepts a value or an updater function.
 * The initial read happens once, lazily, on mount. Every subsequent value is
 * written back in an effect.
 *
 * If storage is unavailable the hook silently becomes plain in-memory state —
 * the feature degrades for that session rather than the page breaking. Both the
 * read and write failure paths are covered by tests.
 *
 * @template T
 * @param {string} key Storage key. Namespace it with `homebrew:` — see
 *   `src/hooks/README.md` for the keys currently in use.
 * @param {T} fallback Value to use when nothing is stored yet.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} A `useState` pair.
 *
 * @sideeffect Writes to `window.localStorage` whenever the value or key changes.
 */
const useLocalStorage = (key, fallback) => {
  const [value, setValue] = useState(() => read(key, fallback));

  // The write lives in an effect rather than inside the setter so that the
  // setter stays a pure state update — React may invoke an updater more than
  // once, and a side effect in there would run more than once too.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable — keep going with the in-memory value.
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
