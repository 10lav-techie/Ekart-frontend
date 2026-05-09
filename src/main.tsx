
import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import App from "./App";

import "./styles/index.css";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  CartProvider,
} from "./context/CartContext";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";

import markerShadow from "leaflet/dist/images/marker-shadow.png";

// =====================================================
// FIX LEAFLET MARKERS
// =====================================================
delete (
  L.Icon.Default
    .prototype as any
)._getIconUrl;

L.Icon.Default.mergeOptions(
  {
    iconUrl:
      markerIcon,

    shadowUrl:
      markerShadow,
  }
);

// =====================================================
// RENDER
// =====================================================
ReactDOM.createRoot(
  document.getElementById(
    "root"
  ) as HTMLElement
).render(
  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <CartProvider>

          <App />

        </CartProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);
