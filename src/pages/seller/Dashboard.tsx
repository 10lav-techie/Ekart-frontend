import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

interface SellerProfile {
  shopName: string;
  monthlyVisits: number;
}

const SellerDashboard = () => {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [profile, setProfile] =
    useState<SellerProfile | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // FETCH DATA
  // =====================================================
  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const [
            productsRes,
            profileRes,
          ] =
            await Promise.all([
              API.get(
                "/products/my"
              ),

              API.get(
                "/auth/profile"
              ),
            ]);

          setProducts(
            productsRes.data
          );

          setProfile(
            profileRes.data
          );
        } catch (error) {
          alert(
            "Failed to load dashboard data"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchData();
  }, []);

  // =====================================================
  // DELETE PRODUCT
  // =====================================================
  const handleDelete =
    async (id: string) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this product?"
        );

      if (!confirmDelete)
        return;

      try {
        await API.delete(
          `/products/${id}`
        );

        // REMOVE FROM UI
        setProducts((prev) =>
          prev.filter(
            (product) =>
              product._id !== id
          )
        );
      } catch (error) {
        alert(
          "Delete failed"
        );
      }
    };

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen py-10 px-5">
      <div className="max-w-7xl mx-auto">

        {/* ===================================================== */}
        {/* HERO */}
        {/* ===================================================== */}
        <div className="bg-white border border-[#ebebeb] rounded-[32px] p-8 mb-10">

          {/* TOP */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* LEFT */}
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#717171] mb-3">
                Seller Dashboard
              </p>

              <h1 className="text-4xl font-semibold text-[#222222] leading-tight">
                {profile?.shopName ||
                  "Your Shop"}
              </h1>

              <p className="text-[#717171] mt-4 text-lg max-w-2xl leading-relaxed">
                Manage products,
                incoming orders,
                and grow your local
                business.
              </p>
            </div>

            {/* VISITS */}
            <div className="bg-[#fafafa] border border-[#ebebeb] rounded-3xl px-10 py-8 min-w-[240px]">
              <p className="text-sm text-[#717171] mb-2">
                Monthly Visitors
              </p>

              <h2 className="text-5xl font-semibold text-[#222222]">
                {profile?.monthlyVisits ||
                  0}
              </h2>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-10">

            {/* MANAGE ORDERS */}
            <Link
              to="/seller/orders"
              className="bg-[#FF385C] hover:bg-[#e03150] text-white px-6 py-3 rounded-2xl font-medium transition"
            >
              Manage Orders
            </Link>

            {/* ADD PRODUCT */}
            <Link
              to="/seller/add-product"
              className="bg-black hover:bg-[#222222] text-white px-6 py-3 rounded-2xl font-medium transition"
            >
              Add Product
            </Link>

            {/* EDIT PROFILE */}
            <Link
              to="/seller/edit-profile"
              className="border border-[#dddddd] hover:border-[#222222] px-6 py-3 rounded-2xl font-medium transition"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* ===================================================== */}
        {/* PRODUCTS HEADER */}
        {/* ===================================================== */}
        <div className="flex items-center justify-between mb-7">

          <div>
            <h2 className="text-3xl font-semibold text-[#222222]">
              Your Products
            </h2>

            <p className="text-[#717171] mt-1">
              Products currently
              visible to buyers
            </p>
          </div>

          <div className="text-sm text-[#717171]">
            {products.length}{" "}
            products
          </div>
        </div>

        {/* ===================================================== */}
        {/* EMPTY */}
        {/* ===================================================== */}
        {!loading &&
        products.length === 0 ? (
          <div className="bg-white border border-[#ebebeb] rounded-3xl p-16 text-center">
            <h3 className="text-2xl font-semibold text-[#222222] mb-3">
              No products yet
            </h3>

            <p className="text-[#717171] mb-6">
              Start adding products
              to grow your shop.
            </p>

            <Link
              to="/seller/add-product"
              className="inline-flex bg-black hover:bg-[#222222] text-white px-6 py-3 rounded-2xl font-medium transition"
            >
              Add First Product
            </Link>
          </div>
        ) : (
          /* ===================================================== */
          /* PRODUCTS GRID */
          /* ===================================================== */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

            {products.map(
              (product) => (
                <div
                  key={
                    product._id
                  }
                  className="bg-white border border-[#ebebeb] rounded-3xl overflow-hidden hover:shadow-xl transition duration-300"
                >
                  {/* IMAGE */}
                  <div className="aspect-[4/3] bg-[#f7f7f7] overflow-hidden">

                    <img
                      src={
                        product.image ||
                        "https://images.unsplash.com/photo-1542838132-92c53300491e"
                      }
                      alt={
                        product.name
                      }
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <h3 className="text-lg font-medium text-[#222222] line-clamp-1">
                      {
                        product.name
                      }
                    </h3>

                    <p className="text-[#717171] text-sm mt-2">
                      Product listed
                      in your local
                      shop
                    </p>

                    {/* PRICE */}
                    <div className="flex items-center justify-between mt-6">

                      <p className="text-2xl font-semibold text-[#222222]">
                        ₹
                        {
                          product.price
                        }
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 mt-6">

                      {/* EDIT */}
                      <Link
                        to={`/seller/edit-product/${product._id}`}
                        className="flex-1 border border-[#dddddd] hover:border-[#222222] py-3 rounded-xl text-center font-medium transition"
                      >
                        Edit
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(
                            product._id
                          )
                        }
                        className="flex-1 bg-[#222222] hover:bg-black text-white py-3 rounded-xl font-medium transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;