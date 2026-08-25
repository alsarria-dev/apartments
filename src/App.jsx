// Importing Modules
import { useCallback, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

// Importing Pages
import ApartmentListing from "./pages/ApartmentListing";
import ApartmentDetails from "./pages/ApartmentDetails";
import ApartmentFavorites from "./pages/ApartmentFavorites";
import AddApartmentPage from "./pages/AddApartmentPage";
import About from "./pages/About";

// Importing Components for main page
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Importing Hooks and Helpers
import useDebouncedValue from "./hooks/useDebouncedValue";
import useFavorites from "./hooks/useFavorites";
import useLocalStorage from "./hooks/useLocalStorage";
import { filterListings } from "./lib/listings";

// Importing Styles
import "./App.css";

// Importing Data
import apartment_data from "./data/project_data.json";

// Main App function
function App() {
  // Only host-created listings are persisted. The bundled catalogue already
  // ships with the app, so storing a second copy of it would just burn quota.
  const [hostListings, setHostListings] = useLocalStorage(
    "homebrew:host-listings",
    [],
  );
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const allApartments = useMemo(
    () => [...hostListings, ...apartment_data.results],
    [hostListings],
  );

  // Search results are derived from the query rather than held in their own
  // piece of state. Two copies meant the input and the grid could drift apart —
  // results only ever updated on Enter, never as you typed.
  const debouncedQuery = useDebouncedValue(query, 250);
  const results = useMemo(
    () => filterListings(allApartments, debouncedQuery),
    [allApartments, debouncedQuery],
  );

  const { favorites, isFavorite, toggleFavorite } = useFavorites(allApartments);

  const addListing = useCallback(
    (listing) => setHostListings((current) => [listing, ...current]),
    [setHostListings],
  );

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
      navigate("/properties");
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage handleSubmit={handleSubmit} />} />
        <Route
          path="/properties"
          element={
            <ApartmentListing
              dataArray={results}
              query={query}
              setQuery={setQuery}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          }
        ></Route>
        <Route
          path="/favorites"
          element={
            <ApartmentFavorites
              favorites={favorites}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          }
        ></Route>
        <Route
          path="/details/:apartmentId"
          element={<ApartmentDetails allApartments={allApartments} />}
        ></Route>
        <Route
          path="/add_apartment"
          element={<AddApartmentPage addListing={addListing} />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
