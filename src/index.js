import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AdminApp from "./components/AdminApp";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/styles.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AdminApp />
  </BrowserRouter>
);
