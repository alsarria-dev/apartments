import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const classesFor = (variant, className) =>
  [styles.button, styles[variant], className].filter(Boolean).join(" ");

export const Button = ({
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}) => <button type={type} className={classesFor(variant, className)} {...rest} />;

export const ButtonLink = ({ variant = "primary", className = "", ...rest }) => (
  <Link className={classesFor(variant, className)} {...rest} />
);
