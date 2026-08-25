/**
 * @file The sticky site header.
 *
 * Exports: {@link Navbar} (default).
 */

import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

/**
 * Nav destinations, in order.
 *
 * `end: true` on the root route stops it matching every path — React Router
 * treats "/" as a prefix of everything, so without it the Home link would be
 * highlighted on every page.
 *
 * @type {{to: string, label: string, end?: boolean}[]}
 */
const routes = [
  { to: "/", label: "Home", end: true },
  { to: "/properties", label: "Stay" },
  { to: "/favorites", label: "Saved" },
  { to: "/add_apartment", label: "Host" },
  { to: "/about", label: "About" },
];

/**
 * The sticky site header: wordmark, route links and the theme toggle.
 * Rendered once by `App.jsx`, outside the routes, so it persists across
 * navigation.
 *
 * @returns {JSX.Element}
 */
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
