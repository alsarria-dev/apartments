/**
 * @file The light/dark switch in the header.
 *
 * Exports: {@link ThemeToggle} (default).
 */

import sunIcon from "../assets/images/icons8-sol-50.png";
import moonIcon from "../assets/images/icons8-luna-creciente-50.png";
import useTheme from "../hooks/useTheme";
import styles from "./ThemeToggle.module.css";

// These two icons sat unreferenced in the repo — a dark mode was intended here
// and never wired up. The token layer made it cheap.
/**
 * The light/dark switch in the header. The only consumer of `useTheme`.
 *
 * Shows the theme you would switch *to*, not the one you are in — a moon while
 * light, a sun while dark — which is the convention users expect from a control
 * whose label reads "Switch to…".
 *
 * @returns {JSX.Element}
 */
const ThemeToggle = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const goingDark = resolvedTheme === "light";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={goingDark ? "Switch to dark theme" : "Switch to light theme"}
      title={goingDark ? "Switch to dark theme" : "Switch to light theme"}
    >
      <img
        className={styles.icon}
        src={goingDark ? moonIcon : sunIcon}
        alt=""
        width={18}
        height={18}
      />
    </button>
  );
};

export default ThemeToggle;
