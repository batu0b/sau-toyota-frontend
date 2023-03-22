import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/tailwind.css";
import "./Lang/i18";
import { BrowserRouter as Router } from "react-router-dom";
import ImgProvider from "./context/ImgConext/ImgProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ImgProvider>
      <Router>
        <App />
      </Router>
    </ImgProvider>
  </React.StrictMode>
);
