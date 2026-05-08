import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import {
  AuthProvider
} from "./context/AuthContext.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/global.css";

import {
  Toaster
} from "react-hot-toast";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <AuthProvider>

      <Toaster position="top-right" />

      <App />

    </AuthProvider>

  </React.StrictMode>
);