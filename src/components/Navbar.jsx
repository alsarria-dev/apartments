import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

const routes = [
  { to: "/", label: "Home", end: true },
  { to: "/properties", label: "Stay" },
  { to: "/favorites", label: "Saved" },
  { to: "/add_apartment", label: "Host" },
  { to: "/about", label: "About" },
];

const Navbar = () => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <Link to="/" className={styles.wordmark}>
        HomeBrew
      </Link>

      <nav aria-label="Main" className={styles.nav}>
        <ul className={styles.links}>
          {routes.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <ThemeToggle />
    </div>
  </header>
);

export default Navbar;
