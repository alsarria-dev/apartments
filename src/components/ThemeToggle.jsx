import sunIcon from "../assets/images/icons8-sol-50.png";
import moonIcon from "../assets/images/icons8-luna-creciente-50.png";
import useTheme from "../hooks/useTheme";
import styles from "./ThemeToggle.module.css";

// These two icons sat unreferenced in the repo — a dark mode was intended here
// and never wired up. The token layer made it cheap.
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
