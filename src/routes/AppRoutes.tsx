
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =====================================================
// BUYER PAGES
// =====================================================
import BuyerHome from "../pages/buyer/Home";

import Search from "../pages/buyer/Search";

import ProductDetails from "../pages/buyer/ProductDetails";

import ShopPage from "../pages/buyer/ShopPage";

import BuyerDashboard from "../pages/buyer/BuyerDashboard";

// =====================================================
// CART
// =====================================================
import CartPage from "../pages/cart/CartPage";

// =====================================================
// AUTH PAGES
// =====================================================
import Login from "../pages/auth/Login";

import Signup from "../pages/auth/Signup";

import BuyerSignup from "../pages/auth/BuyerSignup";

// =====================================================
// SELLER PAGES
// =====================================================
import SellerDashboard from "../pages/seller/Dashboard";

import AddProduct from "../pages/seller/AddProduct";

import MyProducts from "../pages/seller/MyProducts";

import EditProduct from "../pages/seller/EditProduct";

import EditProfile from "../pages/seller/EditProfile";

import SellerOrdersPage from "../pages/seller/SellerOrdersPage";

// =====================================================
// PASSWORD
// =====================================================
import ForgotPassword from "../pages/seller/ForgotPassword";

import ResetPassword from "../pages/seller/ResetPassword";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ===================================================== */}
      {/* PUBLIC ROUTES */}
      {/* ===================================================== */}

      <Route
        path="/"
        element={<BuyerHome />}
      />

      <Route
        path="/search"
        element={<Search />}
      />

      <Route
        path="/product/:id"
        element={
          <ProductDetails />
        }
      />

      <Route
        path="/shop/:sellerId"
        element={<ShopPage />}
      />

      {/* ===================================================== */}
      {/* CART */}
      {/* ===================================================== */}

      <Route
        path="/cart"
        element={<CartPage />}
      />

      {/* ===================================================== */}
      {/* BUYER */}
      {/* ===================================================== */}

      <Route
        path="/buyer/dashboard"
        element={
          <BuyerDashboard />
        }
      />

      {/* ===================================================== */}
      {/* AUTH */}
      {/* ===================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/buyer/signup"
        element={
          <BuyerSignup />
        }
      />

      <Route
        path="/seller/login"
        element={<Login />}
      />

      <Route
        path="/seller/signup"
        element={<Signup />}
      />

      {/* ===================================================== */}
      {/* PASSWORD RESET */}
      {/* ===================================================== */}

      <Route
        path="/seller/forgot-password"
        element={
          <ForgotPassword />
        }
      />

      <Route
        path="/reset-password/:token"
        element={
          <ResetPassword />
        }
      />

      {/* ===================================================== */}
      {/* SELLER DASHBOARD */}
      {/* ===================================================== */}

      <Route
        path="/seller/dashboard"
        element={
          <SellerDashboard />
        }
      />

      <Route
        path="/seller/add-product"
        element={
          <AddProduct />
        }
      />

      <Route
        path="/seller/products"
        element={
          <MyProducts />
        }
      />

      <Route
        path="/seller/edit-product/:id"
        element={
          <EditProduct />
        }
      />

      <Route
        path="/seller/edit-profile"
        element={
          <EditProfile />
        }
      />

      <Route
        path="/seller/orders"
        element={
          <SellerOrdersPage />
        }
      />

      {/* ===================================================== */}
      {/* FALLBACK */}
      {/* ===================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
