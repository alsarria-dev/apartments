/**
 * @file Vitest setup, run once before every test file.
 *
 * Registers the jest-dom matchers, isolates tests from each other's stored
 * state, and shims the browser APIs jsdom does not implement.
 *
 * Referenced from `vite.config.js` as `test.setupFiles`.
 */

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

// jsdom has no layout, so it logs "Not implemented" for these. The pages call
// them on mount; nothing under test depends on what they do.
window.scroll = vi.fn();
window.matchMedia ??= vi.fn().mockReturnValue({
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
});

// Storage persists across tests in the same file, so a test that saves a
// listing would otherwise leak that state into the next one.
beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});
