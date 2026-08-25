import styles from "./Page.module.css";

// The shared measure. Every routed page sits in one of these rather than each
// inventing its own `margin: 0 100px`.
const Page = ({ children, className = "" }) => (
  <div className={`${styles.page} ${className}`}>{children}</div>
);

export default Page;
