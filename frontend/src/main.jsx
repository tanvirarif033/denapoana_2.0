import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import {
  AuthProvider
} from "./context/AuthContext.jsx";

import {
  CartProvider
} from "./context/CartContext.jsx";

import {
  Toaster
} from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/global.css";



ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <AuthProvider>

      <CartProvider>

        <Toaster position="top-right" />

        <App />

      </CartProvider>

    </AuthProvider>

  </React.StrictMode>
);