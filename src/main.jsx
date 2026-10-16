import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { preloadRoute } from "./routeChunks";
import "./index.css";
import "./styles/site.css";

const mount = () =>
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

// Load the page chunk first so replacing the prerendered HTML never flashes an empty page.
preloadRoute(window.location.pathname).then(mount, mount);
