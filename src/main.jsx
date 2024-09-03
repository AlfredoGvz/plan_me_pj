import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../stylesheets/cssReset.css";
import "../stylesheets/index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
