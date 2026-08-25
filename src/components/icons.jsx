// Icons that carry state or colour live here as inline SVG rather than as PNGs,
// so they can take their fill from the theme tokens and animate between states.
// Decorative by default: callers that need an accessible name pass one on the
// interactive element wrapping the icon.

const base = {
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
};

export const HeartIcon = ({ filled = false, size = 20, ...rest }) => (
  <svg
    {...base}
    width={size}
    height={size}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.8}
    strokeLinejoin="round"
    {...rest}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const StarIcon = ({ size = 14, ...rest }) => (
  <svg {...base} width={size} height={size} fill="currentColor" {...rest}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const SearchIcon = ({ size = 18, ...rest }) => (
  <svg
    {...base}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    {...rest}
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4.35-4.35" />
  </svg>
);

export const CloseIcon = ({ size = 16, ...rest }) => (
  <svg
    {...base}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    {...rest}
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
