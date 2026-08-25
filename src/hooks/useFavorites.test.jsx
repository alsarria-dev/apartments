/**
 * @file Tests for saved-listing state.
 *
 * The duplicate-entry case is the important one: it is the regression test for
 * the bug that produced duplicate React keys on the saved page.
 */

import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useFavorites from "./useFavorites";

const catalogue = [
  { id: "a", name: "Madrid loft" },
  { id: "b", name: "Berlin flat" },
  { id: "c", name: "Paris studio" },
];

describe("useFavorites", () => {
  it("adds and removes by id", () => {
    const { result } = renderHook(() => useFavorites(catalogue));

    act(() => result.current.toggleFavorite("b"));
    expect(result.current.isFavorite("b")).toBe(true);
    expect(result.current.favorites.map((l) => l.id)).toEqual(["b"]);

    act(() => result.current.toggleFavorite("b"));
    expect(result.current.isFavorite("b")).toBe(false);
    expect(result.current.favorites).toEqual([]);
  });

  it("never stores the same listing twice", () => {
    // Regression: cards kept their own favourite flag, which reset whenever a
    // card remounted. Clicking the heart again then appended a second copy,
    // producing duplicate entries and duplicate React keys.
    const { result } = renderHook(() => useFavorites(catalogue));

    act(() => result.current.toggleFavorite("a"));
    act(() => result.current.toggleFavorite("a"));
    act(() => result.current.toggleFavorite("a"));

    expect(result.current.favorites.map((l) => l.id)).toEqual(["a"]);
  });

  it("survives a remount", () => {
    const first = renderHook(() => useFavorites(catalogue));
    act(() => first.result.current.toggleFavorite("c"));
    first.unmount();

    const second = renderHook(() => useFavorites(catalogue));
    expect(second.result.current.isFavorite("c")).toBe(true);
  });

  it("keeps the order things were saved in", () => {
    const { result } = renderHook(() => useFavorites(catalogue));
    act(() => result.current.toggleFavorite("c"));
    act(() => result.current.toggleFavorite("a"));
    expect(result.current.favorites.map((l) => l.id)).toEqual(["c", "a"]);
  });

  it("drops saved ids that are no longer in the catalogue", () => {
    window.localStorage.setItem(
      "homebrew:favorite-ids",
      JSON.stringify(["a", "deleted-listing"]),
    );
    const { result } = renderHook(() => useFavorites(catalogue));
    expect(result.current.favorites.map((l) => l.id)).toEqual(["a"]);
  });
});
