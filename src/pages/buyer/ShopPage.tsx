import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

interface Seller {
  shopName: string;
  city: string;
  area: string;
  address: string;
  phone?: string;
  bannerImage?: string;
  logoImage?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  inStock?: boolean;
  createdAt?: string;
  seller: Seller;
}

const ShopPage = () => {
  const { sellerId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchShop = async () => {
      const { data } = await API.get(
        `/products/shop/${sellerId}`
      );
      setProducts(data);
    };

    fetchShop();
  }, [sellerId]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (showAvailableOnly) {
      filtered = filtered.filter(
        (p) => p.inStock !== false
      );
    }

    if (sortOption === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime()
      );
    }

    return filtered;
  }, [products, showAvailableOnly, sortOption]);

  if (!products.length)
    return <p className="p-10">Loading...</p>;

  const shop = products[0].seller;

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= BANNER ================= */}
      <div className="relative h-64 bg-slate-200">
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

        {/* Logo Avatar */}
        <div className="absolute -bottom-12 left-12">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            {shop.logoImage ? (
              <img
                src={shop.logoImage}
                alt="Shop Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                Logo
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= SHOP INFO ================= */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">

        <h2 className="text-3xl font-bold text-slate-800">
          {shop.shopName}
        </h2>

        <p className="text-slate-500 mt-1">
          📍 {shop.city}, {shop.area}
        </p>

        <p className="text-sm text-slate-400">
          {shop.address}
        </p>

        {/* FILTER + SORT */}
        <div className="flex justify-between items-center flex-wrap gap-4 mt-8 mb-10">

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={() =>
                setShowAvailableOnly((prev) => !prev)
              }
            />
            Available Only
          </label>

          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value)
            }
            className="border px-4 py-2 rounded-lg text-sm"
          >
            <option value="newest">Newest</option>
            <option value="low-high">
              Price: Low → High
            </option>
            <option value="high-low">
              Price: High → Low
            </option>
          </select>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition border border-slate-100 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-44 bg-slate-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
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

              <div className="p-6">
                <h3 className="font-semibold text-lg text-slate-800 mb-2 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-xl font-bold text-blue-600 mb-3">
                  ₹{product.price}
                </p>

                {product.description && (
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <button className="mt-4 w-full border border-slate-300 hover:bg-slate-100 py-2 rounded-lg text-sm font-medium transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FLOATING CALL BUTTON ================= */}
      {shop.phone && (
        <button
          onClick={() =>
            window.open(`tel:${shop.phone}`)
          }
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition"
        >
          📞 Call Shop
        </button>
      )}
    </div>
  );
};

export default ShopPage;
