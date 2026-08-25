/**
 * @file The "nothing here" panel, used wherever a surface can come up empty.
 *
 * Exports: {@link EmptyState} (default).
 */

import styles from "./EmptyState.module.css";

/**
 * A centred "nothing here" panel: heading, explanation and a way forward.
 *
 * An empty screen is an invitation to act, so every one of these takes an action
 * rather than just reporting that there is nothing here.
 *
 * @param {object} props
 * @param {string} props.title What is absent, stated plainly.
 * @param {string} [props.description] Why, and what the reader can do about it.
 * @param {JSX.Element} [props.action] A button or link. Supply one wherever
 *   there is a sensible next step — see the file comment.
 * @returns {JSX.Element}
 */
const EmptyState = ({ title, description, action }) => (
  <div className={styles.empty}>
    <h2 className={styles.title}>{title}</h2>
    {description && <p className={styles.description}>{description}</p>}
    {action && <div className={styles.action}>{action}</div>}
  </div>
);

export default EmptyState;
