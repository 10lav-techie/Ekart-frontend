import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
}

const SellerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products/my");
        setProducts(data);
      } catch (error) {
        alert("Failed to load products");
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      // Remove from UI instantly (Optimistic update)
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/seller/edit-profile"
          className="bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-300"
        >
          Edit Profile
        </Link>

        <h2 className="text-2xl font-bold">Your Products</h2>
        <Link
          to="/seller/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Product
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-slate-600">₹{product.price}</p>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/seller/edit-product/${product._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
