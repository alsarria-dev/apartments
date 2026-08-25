/**
 * @file Vite configuration — dev server, production build and the test runner.
 *
 * Vitest reads its configuration from this same file, which is why the `test`
 * key lives here rather than in a `vitest.config.js`; it means tests resolve
 * imports exactly the way the app does.
 *
 * CSS Modules need no configuration: Vite treats any `*.module.css` import as
 * one out of the box.
 */

/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom, not node: the suite renders components and touches localStorage.
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    include: ["src/**/*.test.{js,jsx}"],
  },
});
