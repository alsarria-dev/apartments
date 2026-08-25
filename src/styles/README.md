# Styles

Two global stylesheets live here. Everything else in the app is a scoped
`*.module.css` file sitting next to the component it styles.

Both files are imported once, in `src/main.jsx`, in this order:

```js
import "./styles/tokens.css";  // must come first — defines the variables
import "./styles/base.css";    // consumes them
```

---

## `tokens.css` — the vocabulary

Every colour, size, space, radius, font and duration in the app is defined here as
a CSS custom property.

**The rule: no raw hex value or magic pixel number belongs anywhere else.** If you
find yourself typing `#2f6b4f` or `font-size: 13px` in a component, the value
either already exists as a token or should be added as one.

### Token groups

| Prefix | Purpose | Example |
| --- | --- | --- |
| `--paper*` | Page and surface backgrounds | `--paper`, `--paper-sunk`, `--paper-raised` |
| `--ink*` | Text | `--ink`, `--ink-soft` |
| `--accent*` | The single accent colour | `--accent`, `--accent-soft`, `--on-accent` |
| `--line` | Hairline borders | |
| `--saved` | The saved/favourited state only | |
| `--text-*` | Type scale, 1.25 ratio | `--text-xs` … `--text-3xl` |
| `--space-*` | Spacing scale, 4px base | `--space-1` … `--space-8` |
| `--radius-*` | Corner radii | `--radius-s`, `--radius-m`, `--radius-l`, `--radius-full` |
| `--font-display`, `--font-ui` | The two type roles | |
| `--ease`, `--duration` | Motion | |

### Theming

Three states, not two:

1. `:root` defines the **complete light palette**.
2. `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`
   handles a visitor who has expressed no preference.
3. `:root[data-theme="dark"]` handles an explicit choice, and wins in both directions.

`data-theme` is stamped on `<html>` by `useTheme`, and — critically — also by an
inline script in `index.html` that runs before React mounts, so a dark-mode
visitor never sees a flash of the light palette.

**When adding a colour token, define it in all three blocks.** A token defined only
under `:root` will be wrong in dark mode; one defined only in a dark block will be
undefined in light mode.

### Typography

`--font-display` (EB Garamond) is **not** a general headline serif. It carries:

- the `HomeBrew` wordmark
- **every number in the product** — prices, ratings, city counts, listing facts

`--font-ui` is the system font stack and carries everything else. New numeric
display should follow the same split.

---

## `base.css` — the only global element styles

This is **the only file in the repository permitted to style bare elements**
(`body`, `a`, `ul`, `h1`…). It holds the reset, the body background and text
colour, sensible defaults for form controls, the global `:focus-visible` ring, and
the `prefers-reduced-motion` opt-out.

Why the restriction: the app previously had two component stylesheets each setting
`body { background }` and one setting `* { font-family }`. Because plain CSS
imports are global, those applied on every page, and which one won depended on
import order.

---

## Component styles

Named `ComponentName.module.css`, next to `ComponentName.jsx`, imported as
`import styles from "./ComponentName.module.css"` and used as `styles.className`.

### The one trap

**Bare element selectors inside a CSS Module are *not* scoped.** The bundler only
rewrites class selectors. This leaks globally:

```css
/* ✗ applies to every <nav> in the app */
nav { overflow-x: auto; }
```

```css
/* ✓ scoped to this component */
.nav { overflow-x: auto; }
```

Give the element a class and reference it through `styles`.

### Conventions

- camelCase class names, so they read as `styles.cityActive` rather than
  `styles["city-active"]`.
- Media queries live at the bottom of the file they apply to, not in a central
  breakpoint file. Common widths: `640px` (phone), `900px` (tablet/small laptop).
- State is expressed with attribute selectors where the attribute already exists
  for accessibility reasons — e.g. `.favorite[aria-pressed="true"]` — rather than
  adding a parallel `.is-active` class.
