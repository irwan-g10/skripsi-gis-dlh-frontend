import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import AdminApp from "./components/AdminApp";

import "./styles/styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AdminApp />
  </BrowserRouter>
);
