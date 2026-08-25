/**
 * @file The button styles, in both the forms they are needed in.
 *
 * `Button` renders a <button> for actions; `ButtonLink` renders a router <Link>
 * that looks identical, for actions that navigate. Sharing one stylesheet keeps
 * them from drifting apart.
 *
 * Exports: {@link Button}, {@link ButtonLink}. No default export.
 */

import { Link } from "react-router-dom";
import styles from "./Button.module.css";

/**
 * Joins the base button class with its variant and any caller-supplied class.
 * `filter(Boolean)` drops an unknown variant or an omitted className rather than
 * emitting `undefined` into the class attribute.
 *
 * @param {"primary"|"secondary"} variant
 * @param {string} className
 * @returns {string}
 */
const classesFor = (variant, className) =>
  [styles.button, styles[variant], className].filter(Boolean).join(" ");

/**
 * A styled `<button>`. Any extra props are forwarded to the element.
 *
 * Note `type` defaults to `"button"`, not the HTML default of `"submit"` — an
 * unmarked button inside a form submitting it is a common accidental bug. Pass
 * `type="submit"` deliberately.
 *
 * @param {object} props
 * @param {"primary"|"secondary"} [props.variant="primary"]
 * @param {string} [props.className=""]
 * @param {string} [props.type="button"]
 * @returns {JSX.Element}
 */
export const Button = ({
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}) => <button type={type} className={classesFor(variant, className)} {...rest} />;

/**
 * A React Router `<Link>` wearing the button styles, for actions that navigate.
 *
 * Use this rather than a `Button` with an `onClick` that navigates: a real link
 * can be opened in a new tab, copied, and is announced as a link.
 *
 * @param {object} props
 * @param {"primary"|"secondary"} [props.variant="primary"]
 * @param {string} [props.className=""]
 * @param {string} props.to Route path, forwarded to `<Link>`.
 * @returns {JSX.Element}
 */
export const ButtonLink = ({ variant = "primary", className = "", ...rest }) => (
  <Link className={classesFor(variant, className)} {...rest} />
);
