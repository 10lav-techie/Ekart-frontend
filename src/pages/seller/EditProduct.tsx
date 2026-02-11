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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description || "");
      setImage(data.image || "");
      setCategory(data.category || "");
      setIsNew(data.isNew || false);
    };

    fetchProduct();
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
      });

      navigate("/seller/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Update failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleUpdate} className="space-y-5">

        <input
          className="w-full border border-slate-300 p-3 rounded-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="w-full border border-slate-300 p-3 rounded-xl"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          className="w-full border border-slate-300 p-3 rounded-xl"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <input
          className="w-full border border-slate-300 p-3 rounded-xl"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <select
          className="w-full border border-slate-300 p-3 rounded-xl"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Grocery">Grocery</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothes">Clothes</option>
          <option value="Food">Food</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
          />
          Mark as New Product
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
