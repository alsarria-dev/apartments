import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import useLocalStorage from "./useLocalStorage";

afterEach(() => vi.restoreAllMocks());

describe("useLocalStorage", () => {
  it("falls back when nothing is stored", () => {
    const { result } = renderHook(() => useLocalStorage("k", ["fallback"]));
    expect(result.current[0]).toEqual(["fallback"]);
  });

  it("reads a value written by a previous session", () => {
    window.localStorage.setItem("k", JSON.stringify([1, 2]));
    const { result } = renderHook(() => useLocalStorage("k", []));
    expect(result.current[0]).toEqual([1, 2]);
  });

  it("persists what it is given", () => {
    const { result } = renderHook(() => useLocalStorage("k", []));
    act(() => result.current[1]([3]));
    expect(JSON.parse(window.localStorage.getItem("k"))).toEqual([3]);
  });

  it("degrades to memory when storage cannot be read", () => {
    // Private mode, or a browser set to block site data: the accessor itself
    // throws, and that must not take the page down.
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    const { result } = renderHook(() => useLocalStorage("k", "safe"));
    expect(result.current[0]).toBe("safe");
  });

  it("degrades to memory when storage cannot be written", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    const { result } = renderHook(() => useLocalStorage("k", 0));
    expect(() => act(() => result.current[1](1))).not.toThrow();
    expect(result.current[0]).toBe(1);
  });
});
