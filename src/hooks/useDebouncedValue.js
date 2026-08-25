import { useEffect, useState } from "react";

// Trails `value` by `delay` ms, so filtering 100 listings runs once the typing
// pauses rather than on every keystroke.
const useDebouncedValue = (value, delay = 250) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

export default useDebouncedValue;
