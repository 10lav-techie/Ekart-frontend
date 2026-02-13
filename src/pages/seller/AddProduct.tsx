import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const AddProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [inStock, setInStock] = useState(true);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    setLoading(true);

    try {
      await API.post("/products", {
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
      alert(error.response?.data?.message || "Failed to add product");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Product Name */}
        <input
          className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Price */}
        <input
          type="number"
          className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {/* Description */}
        <textarea
          className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        {/* Image URL */}
        <input
          className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
          placeholder="Image URL (Paste product image link)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        {/* Category */}
        <select
          className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Grocery">Grocery</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothes">Clothes</option>
          <option value="Food">Food</option>
        </select>

        {/* New Tag */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
          />
          Mark as New Product
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          Available (Uncheck if out of stock)
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
