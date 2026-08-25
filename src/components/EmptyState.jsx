import styles from "./EmptyState.module.css";

// An empty screen is an invitation to act, so every one of these takes an
// action rather than just reporting that there's nothing here.
const EmptyState = ({ title, description, action }) => (
  <div className={styles.empty}>
    <h2 className={styles.title}>{title}</h2>
    {description && <p className={styles.description}>{description}</p>}
    {action && <div className={styles.action}>{action}</div>}
  </div>
);

export default EmptyState;
