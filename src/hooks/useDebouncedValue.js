/**
 * @file Delays a fast-changing value until it settles.
 *
 * Used for the search query in `App.jsx`, so that the input stays responsive
 * while the filtering behind it runs only once the typing pauses.
 *
 * Exports: {@link useDebouncedValue} (default).
 */

import { useEffect, useState } from "react";

// Trails `value` by `delay` ms, so filtering 100 listings runs once the typing
// pauses rather than on every keystroke.

/**
 * Returns `value` as it was `delay` milliseconds ago, once it stops changing.
 *
 * Each change restarts the timer, so a run of rapid updates produces exactly one
 * result at the end rather than one per update.
 *
 * The debounced copy deliberately lags the source. Bind the input to the raw
 * value so typing feels immediate, and drive the expensive work off this one —
 * binding the input to the debounced value would make the field feel broken.
 *
 * @template T
 * @param {T} value The value to trail.
 * @param {number} [delay=250] Quiet period in milliseconds.
 * @returns {T} The settled value; equals `value` on first render.
 *
 * @sideeffect Holds a `setTimeout`, cleared on change or unmount.
 */
const useDebouncedValue = (value, delay = 250) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

export default useDebouncedValue;
