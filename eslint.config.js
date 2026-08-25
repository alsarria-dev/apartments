/**
 * @file ESLint flat configuration.
 *
 * "Flat config" is the format ESLint 9 defaults to and ESLint 10 requires — the
 * older `.eslintrc.*` format is no longer read at all.
 *
 * Two things here are easy to get wrong:
 *
 *  - `eslint-plugin-react` is deliberately absent. Its latest release caps its
 *    peer range at ESLint 9, so it cannot resolve against the ESLint 10 this
 *    project uses. `@eslint-react/eslint-plugin` is the maintained replacement
 *    if those rules are wanted back.
 *  - `reactHooks.configs.flat.recommended`, not `.configs.recommended`. In
 *    eslint-plugin-react-hooks v7 the latter is still the legacy eslintrc shape
 *    (it lists plugins as an array of strings), which flat config rejects.
 *
 * `npm run lint` runs with `--max-warnings 0`, so a warning fails the build.
 */

import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
]);
