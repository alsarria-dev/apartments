/**
 * @file Application entry point — the boundary between the HTML page and React.
 *
 * Mounts <App> into the `#root` div declared in `index.html`, wrapped in the
 * router so that every component can use routing hooks, and loads the two global
 * stylesheets.
 *
 * Nothing else in the app imports plain CSS; everything below this file uses CSS
 * Modules. Import order matters here: `tokens.css` defines the custom properties
 * that `base.css` consumes.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/tokens.css";
import "./styles/base.css";
import { BrowserRouter as Router } from "react-router-dom";

// StrictMode is development-only; it double-invokes render and effects to surface
// impure logic. Effects here are written to tolerate that — see the `cancelled`
// flag in useCatalogue.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
