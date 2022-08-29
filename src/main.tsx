import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import Router from "./Router";
import "./assets/tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Router />
    </HashRouter>
  </React.StrictMode>
);
