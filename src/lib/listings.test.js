import { describe, expect, it } from "vitest";
import {
  checkInScore,
  filterListings,
  imageSource,
  imageSrcSet,
  listingArea,
  listingRating,
} from "./listings";

const listing = (over = {}) => ({
  id: "1",
  city: "Madrid",
  country: "Spain",
  neighbourhood: "Sol",
  ...over,
});

describe("filterListings", () => {
  const catalogue = [
    listing({ id: "a", city: "Madrid", country: "Spain" }),
    listing({ id: "b", city: "Berlin", country: "Germany" }),
    listing({ id: "c", city: "Paris", country: "France" }),
  ];

  it("returns the same array reference for an empty query", () => {
    // Identity matters: the results feed a memoized grid, and a fresh array
    // every render would defeat it.
    expect(filterListings(catalogue, "")).toBe(catalogue);
    expect(filterListings(catalogue, "   ")).toBe(catalogue);
  });

  it("matches city case-insensitively", () => {
    expect(filterListings(catalogue, "berlin").map((l) => l.id)).toEqual(["b"]);
    expect(filterListings(catalogue, "BERLIN").map((l) => l.id)).toEqual(["b"]);
  });

  it("matches country as well as city", () => {
    expect(filterListings(catalogue, "germany").map((l) => l.id)).toEqual(["b"]);
  });

  it("ignores surrounding whitespace", () => {
    expect(filterListings(catalogue, "  paris ").map((l) => l.id)).toEqual(["c"]);
  });

  it("returns nothing when there is no match", () => {
    expect(filterListings(catalogue, "reykjavik")).toEqual([]);
  });

  it("survives listings with a missing city or country", () => {
    const partial = [listing({ id: "d", city: undefined, country: undefined })];
    expect(() => filterListings(partial, "madrid")).not.toThrow();
  });
});

describe("listingArea", () => {
  it("uses the neighbourhood when there is one", () => {
    expect(listingArea(listing({ neighbourhood: "Malasaña" }))).toBe("Malasaña");
  });

  it("falls back to the city, not a hardcoded neighbourhood", () => {
    // Regression: the fallback was the literal string "La Latina", which
    // labelled three Paris apartments with a Madrid neighbourhood.
    const paris = listing({ neighbourhood: null, city: "Paris" });
    expect(listingArea(paris)).toBe("Paris");
    expect(listingArea(paris)).not.toBe("La Latina");
  });
});

describe("listingRating", () => {
  it("converts a score out of 100 to one out of 10", () => {
    expect(listingRating(listing({ review_scores_rating: 84 }))).toBe(8.4);
  });

  it("returns null when a listing has no score", () => {
    expect(listingRating(listing({ review_scores_rating: null }))).toBeNull();
  });
});

describe("checkInScore", () => {
  it("is stable for a given listing", () => {
    // Regression: this was Math.random() called during render, so the figure
    // reshuffled on every re-render of the page showing it.
    const one = listing({ id: "6221624" });
    const scores = new Set(Array.from({ length: 20 }, () => checkInScore(one)));
    expect(scores.size).toBe(1);
  });

  it("stays inside the advertised range", () => {
    for (const id of ["a", "b", "zzz", "6221624", "1105892"]) {
      const score = checkInScore(listing({ id }));
      expect(score).toBeGreaterThanOrEqual(80);
      expect(score).toBeLessThanOrEqual(100);
    }
  });
});

describe("imageSource", () => {
  const imgix = "https://x.imgix.net/a.jpg?ixlib=react-9.8.1&q=35&h=280&w=280";

  it("rewrites the width and height imgix already carries", () => {
    const out = new URL(imageSource(imgix, 560));
    expect(out.searchParams.get("w")).toBe("560");
    expect(out.searchParams.get("h")).toBe("560");
    expect(out.searchParams.get("q")).toBe("35");
  });

  it("leaves non-imgix URLs alone", () => {
    // Host-created listings point at arbitrary URLs.
    const other = "https://example.com/photo.jpg";
    expect(imageSource(other, 560)).toBe(other);
  });

  it("returns unparseable URLs unchanged instead of throwing", () => {
    expect(imageSource("not a url", 560)).toBe("not a url");
  });

  it("builds a srcset with one candidate per width", () => {
    const set = imageSrcSet(imgix, [280, 560]);
    expect(set.split(",")).toHaveLength(2);
    expect(set).toContain("280w");
    expect(set).toContain("560w");
  });
});
