import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);

        setName(data.name || "");
        setPrice(data.price || "");
        setDescription(data.description || "");
        setImage(data.image || "");
        setCategory(data.category || "");
        setIsNew(data.isNew || false);
        setInStock(data.inStock ?? true);

      } catch (error) {
        console.error("Fetch product error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.put(`/products/${id}`, {
        name,
        price: Number(price),
        description,
        image,
        category,
        isNew,
        inStock,
      });

      navigate("/seller/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Update failed");
    }

    setLoading(false);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-slate-500">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-10">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-800">
            Edit Product
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Update product details and manage availability.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-8">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-medium mb-2">
                Product Name
              </label>
              <input
                className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Category
              </label>
              <select
                className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothes">Clothes</option>
                <option value="Food">Food</option>
              </select>
            </div>

            {/* New Badge */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-sm font-medium text-slate-700">
                Mark as New Product
              </span>
            </div>

            {/* Stock Toggle */}
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border">
              <span className="text-sm font-medium text-slate-700">
                Availability
              </span>

              <button
                type="button"
                onClick={() => setInStock(!inStock)}
                className={`relative w-14 h-7 rounded-full transition ${
                  inStock ? "bg-green-500" : "bg-red-400"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition ${
                    inStock ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                rows={6}
                className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Image URL
              </label>
              <input
                className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {/* Image Preview */}
            {image && (
              <div className="rounded-xl overflow-hidden border">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

          </div>

          {/* BUTTON FULL WIDTH */}
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg transition shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;
