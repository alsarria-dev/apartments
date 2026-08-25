/**
 * @file Tests for the detail page's three states: loading, not-found, found.
 *
 * Guards the crash that blanked the whole app when a listing was looked up in
 * the filtered results instead of the catalogue.
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ApartmentDetails from "./ApartmentDetails";

const listing = {
  id: "6221624",
  name: "Marzo Best Offer Madrid PUERTA DEL SOL LM7",
  city: "Madrid",
  country: "Spain",
  property_type: "Apartment",
  accommodates: 6,
  bedrooms: 2,
  beds: 3,
  bathrooms: 1,
  price: 84,
  cleaning_fee: 50,
  cancellation_policy: "strict",
  review_scores_rating: 84,
  host_name: "Leticia&Fer",
  host_since: "2015-02-10",
  space: "A flat by Puerta del Sol.",
  picture_url: { url: "https://x.imgix.net/a.jpg?w=280&h=280" },
};

const renderAt = (id, props = {}) =>
  render(
    <MemoryRouter initialEntries={[`/details/${id}`]}>
      <Routes>
        <Route
          path="/details/:apartmentId"
          element={
            <ApartmentDetails
              allApartments={[listing]}
              isFavorite={() => false}
              toggleFavorite={vi.fn()}
              loading={false}
              {...props}
            />
          }
        />
      </Routes>
    </MemoryRouter>,
  );

describe("ApartmentDetails", () => {
  it("renders a listing that exists", () => {
    renderAt("6221624");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "PUERTA DEL SOL",
    );
    // The nightly rate appears twice by design: once as the headline figure
    // and once as a line in the breakdown beneath it.
    expect(screen.getAllByText("€84")).toHaveLength(2);
    expect(screen.getByText("€50")).toBeInTheDocument();
    expect(screen.getByText(/cleaning fee/i)).toBeInTheDocument();
  });

  it("shows a recoverable message for an unknown id instead of crashing", () => {
    // Regression: the lookup ran against the filtered search results rather
    // than the catalogue, so a listing the search excluded resolved to
    // undefined and threw in Details, blanking the whole app.
    expect(() => renderAt("does-not-exist")).not.toThrow();
    expect(screen.getByText(/isn't available/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse stays/i })).toBeInTheDocument();
  });

  it("distinguishes a catalogue that is still loading from a missing listing", () => {
    // The catalogue is imported dynamically, so before it resolves every id
    // looks unknown. Saying "isn't available" then would be wrong.
    renderAt("6221624", { allApartments: [], loading: true });
    expect(screen.getByText(/loading stay/i)).toBeInTheDocument();
    expect(screen.queryByText(/isn't available/i)).not.toBeInTheDocument();
  });

  it("does not crash on a listing with no rating or description", () => {
    const sparse = { ...listing, review_scores_rating: null, space: "" };
    render(
      <MemoryRouter initialEntries={["/details/6221624"]}>
        <Routes>
          <Route
            path="/details/:apartmentId"
            element={
              <ApartmentDetails
                allApartments={[sparse]}
                isFavorite={() => false}
                toggleFavorite={vi.fn()}
                loading={false}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
