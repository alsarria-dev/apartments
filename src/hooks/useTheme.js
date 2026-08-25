import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const STORAGE_KEY = "homebrew:theme";

const systemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Three states, not two: "system" leaves the root element unstamped so
// prefers-color-scheme decides, while an explicit choice stamps data-theme and
// wins in both directions.
const useTheme = () => {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEY, "system");
  const [systemPreference, setSystemPreference] = useState(systemTheme);

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

  const toggleTheme = useCallback(
    () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    [resolvedTheme, setTheme],
  );

  return { resolvedTheme, toggleTheme };
};

export default useTheme;
