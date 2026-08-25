/**
 * @file The shared page container.
 *
 * Gives every route the same measure and padding, so no page invents its own
 * margins. See ../styles/README.md for the tokens it uses.
 *
 * Exports: {@link Page} (default).
 */

import styles from "./Page.module.css";

/**
 * The shared page container: maximum width, horizontal padding, vertical rhythm.
 *
 * Every routed page sits in one of these rather than each inventing its own
 * `margin: 0 100px`. The exception is the landing page, whose hero runs edge to
 * edge.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children Page content.
 * @param {string} [props.className=""] Extra class, appended to the base one.
 * @returns {JSX.Element}
 */
const Page = ({ children, className = "" }) => (
  <div className={`${styles.page} ${className}`}>{children}</div>
);

export default Page;
