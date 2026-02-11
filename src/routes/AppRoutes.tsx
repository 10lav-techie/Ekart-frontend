import { Routes, Route, Navigate } from "react-router-dom";
import EditProduct from "../pages/seller/EditProduct";
import ShopPage from "../pages/buyer/ShopPage";
import EditProfile from "../pages/seller/EditProfile";

// Public pages
import BuyerHome from "../pages/buyer/Home";
import Search from "../pages/buyer/Search";
import ProductDetails from "../pages/buyer/ProductDetails";
import ShopDetails from "../pages/buyer/ShopDetails";

// Seller pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import SellerDashboard from "../pages/seller/Dashboard";
import AddProduct from "../pages/seller/AddProduct";
import MyProducts from "../pages/seller/MyProducts";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ---------------- PUBLIC ROUTES ---------------- */}
      <Route path="/shop/:sellerId" element={<ShopPage />} />
      <Route path="/seller/edit-profile" element={<EditProfile />} />

      <Route path="/" element={<BuyerHome />} />
      <Route path="/search" element={<Search />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/shop/:id" element={<ShopDetails />} />

      {/* ---------------- SELLER AUTH ---------------- */}
      <Route path="/seller/login" element={<Login />} />
      <Route path="/seller/signup" element={<Signup />} />

      {/* ---------------- SELLER DASHBOARD ---------------- */}
      <Route path="/seller/dashboard" element={<SellerDashboard />} />
      <Route path="/seller/add-product" element={<AddProduct />} />
      <Route path="/seller/products" element={<MyProducts />} />
      <Route path="/seller/edit-product/:id" element={<EditProduct />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
