import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

interface Seller {
  _id: string;
  shopName: string;
  category?: string;
  address?: string;
  area?: string;
  district?: string;
  city?: string;
  phone?: string;
  bannerImage?: string;
  logoImage?: string;
  isOpen?: boolean;
  openTime?: string;
  closeTime?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  isNew?: boolean;
  inStock?: boolean;
  createdAt?: string;
}

const ShopDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [shop, setShop] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopRes = await API.get(`/seller/${id}`);
        const productRes = await API.get(`/products/seller/${id}`);

        setShop(shopRes.data);
        setProducts(productRes.data);
      } catch (error) {
        console.error("Error loading shop:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (showAvailableOnly) {
      filtered = filtered.filter(p => p.inStock !== false);
    }

    if (sortOption === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) =>
        new Date(b.createdAt || "").getTime() -
        new Date(a.createdAt || "").getTime()
      );
    }

    return filtered;
  }, [products, showAvailableOnly, sortOption]);

  if (!shop) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= BANNER ================= */}
      <div className="relative h-56 md:h-72 bg-slate-200">
        {shop.bannerImage ? (
          <img
            src={shop.bannerImage}
            alt="Shop Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            No Banner Image
          </div>
        )}

        {/* Logo */}
        <div className="absolute -bottom-10 left-10">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            {shop.logoImage ? (
              <img
                src={shop.logoImage}
                alt="Shop Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                Logo
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-16 pb-12">

        {/* ================= SHOP INFO ================= */}
        <div className="flex justify-between items-start flex-wrap gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {shop.shopName}
            </h1>

            <p className="text-slate-500 mt-1">
              {shop.address}
            </p>

            <p className="text-sm text-slate-400">
              {shop.area}, {shop.district}, {shop.city}
            </p>

            {shop.openTime && shop.closeTime && (
              <p className="text-sm text-slate-500 mt-3">
                🕒 {shop.openTime} – {shop.closeTime}
              </p>
            )}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-lg hover:bg-slate-100 transition text-sm"
          >
            ← Back
          </button>
        </div>

        {/* ================= FILTERS ================= */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showAvailableOnly}
                onChange={() =>
                  setShowAvailableOnly(prev => !prev)
                }
              />
              Available Only
            </label>
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-4 py-2 rounded-lg text-sm"
          >
            <option value="newest">Newest</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition border border-slate-100 overflow-hidden"
            >
              <div className="relative h-40">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    No Image
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  {product.inStock !== false ? (
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-slate-800 line-clamp-1">
                  {product.name}
                </h4>

                <p className="text-sm text-slate-500 line-clamp-2 mt-1">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold text-blue-600">
                    ₹{product.price}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/buyer/product/${product._id}`)
                    }
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= FLOATING CALL BUTTON ================= */}
      {shop.phone && (
        <button
          onClick={() => window.open(`tel:${shop.phone}`)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition"
        >
          📞 Call Shop
        </button>
      )}
    </div>
  );
};

export default ShopDetails;
