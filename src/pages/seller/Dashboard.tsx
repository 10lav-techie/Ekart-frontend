import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface SellerProfile {
  shopName: string;
  monthlyVisits: number;
}

const SellerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, profileRes] = await Promise.all([
          API.get("/products/my"),
          API.get("/seller/profile"),
        ]);

        setProducts(productsRes.data);
        setProfile(profileRes.data);
      } catch (error) {
        alert("Failed to load dashboard data");
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      // Remove instantly from UI
      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ================= TOP SECTION ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-10">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* LEFT */}
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {profile?.shopName || "Your Shop"}
              </h1>

              <p className="text-slate-500 mt-2">
                Manage your products and monitor shop performance.
              </p>
            </div>

            {/* VISITOR CARD */}
            <div className="bg-blue-50 px-8 py-6 rounded-2xl text-center shadow-sm">
              <p className="text-sm text-slate-600 mb-1">
                Monthly Visitors
              </p>
              <h2 className="text-3xl font-bold text-blue-600">
                {profile?.monthlyVisits || 0}
              </h2>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/seller/edit-profile"
              className="bg-slate-200 hover:bg-slate-300 px-6 py-3 rounded-xl font-medium transition"
            >
              Edit Profile
            </Link>

            <Link
              to="/seller/add-product"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md"
            >
              Add Product
            </Link>
          </div>
        </div>

        {/* ================= PRODUCTS SECTION ================= */}

        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          Your Products
        </h2>

        {loading ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center">
            Loading...
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center">
            <p className="text-slate-500">
              No products added yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-slate-800">
                  {product.name}
                </h3>

                <p className="text-blue-600 font-bold mt-2">
                  ₹{product.price}
                </p>

                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/seller/edit-product/${product._id}`}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-center transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SellerDashboard;
