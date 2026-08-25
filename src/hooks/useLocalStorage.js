import { useEffect, useState } from "react";

// Reads once on mount and mirrors every later write back to storage. If storage
// is unavailable — private mode, quota, a browser set to block site data — the
// value simply stays in memory for the session instead of taking the page down.
const read = (key, fallback) => {
  try {
    const stored = window.localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch {
    return fallback;
  }
};

const useLocalStorage = (key, fallback) => {
  const [value, setValue] = useState(() => read(key, fallback));

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
