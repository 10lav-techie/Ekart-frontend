import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

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
  const [showAvailableOnly, setShowAvailableOnly] =
    useState(false);

  const [sortOption, setSortOption] =
    useState("newest");

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopRes = await API.get(`/seller/${id}`);
        const productRes = await API.get(
          `/products/seller/${id}`
        );

        setShop(shopRes.data);
        setProducts(productRes.data);
      } catch (error) {
        console.error("Error loading shop:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  // ================= FILTER PRODUCTS =================
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

  // ================= LOADING =================
  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-[#717171]">
          Loading shop...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#222222]">
      {/* ================= STICKY NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#eeeeee]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="border border-[#dddddd] hover:border-[#222222] px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
          >
            ← Back
          </button>

          <p className="text-sm uppercase tracking-[0.2em] text-[#717171]">
            Local Shop
          </p>

          <button
            onClick={() =>
              shop.phone &&
              window.open(`tel:${shop.phone}`)
            }
            className="bg-[#FF385C] hover:bg-[#e03150] text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
          >
            Call Shop
          </button>
        </div>
      </header>

      {/* ================= HERO BANNER ================= */}
      <section className="relative">
        <div className="relative h-[420px] overflow-hidden">
          {shop.bannerImage ? (
            <img
              src={shop.bannerImage}
              alt="Shop Banner"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#f3f3f3]" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* SHOP INFO OVERLAY */}
          <div className="absolute bottom-10 left-0 right-0">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-8"
              >
                {/* LEFT */}
                <div className="flex items-end gap-6">
                  {/* LOGO */}
                  <div className="w-28 h-28 rounded-[28px] overflow-hidden border-4 border-white bg-white shadow-2xl">
                    {shop.logoImage ? (
                      <img
                        src={shop.logoImage}
                        alt="Shop Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-semibold text-[#FF385C]">
                        {shop.shopName?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* TEXT */}
                  <div className="text-white">
                    <p className="uppercase tracking-[0.2em] text-sm text-white/70 mb-2">
                      Trusted Local Store
                    </p>

                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                      {shop.shopName}
                    </h1>

                    <p className="text-white/80 mt-3 text-lg">
                      {shop.area}, {shop.district},{" "}
                      {shop.city}
                    </p>

                    {/* STATUS */}
                    <div className="flex items-center gap-3 mt-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          shop.isOpen
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                      />

                      <span className="text-sm text-white/90">
                        {shop.isOpen
                          ? "Open Now"
                          : "Currently Closed"}
                      </span>

                      {shop.openTime &&
                        shop.closeTime && (
                          <span className="text-sm text-white/70">
                            • {shop.openTime} -{" "}
                            {shop.closeTime}
                          </span>
                        )}
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] px-6 py-5 text-white min-w-[250px]">
                  <p className="text-white/70 text-sm mb-2">
                    Address
                  </p>

                  <p className="leading-relaxed">
                    {shop.address ||
                      `${shop.area}, ${shop.city}`}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* ================= FILTER BAR ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-14">
          {/* LEFT */}
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">
              Products
            </h2>

            <p className="text-[#717171] mt-2">
              Browse products available in this shop.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-4">
            {/* CHECKBOX */}
            <label className="flex items-center gap-3 border border-[#dddddd] px-5 py-3 rounded-full text-sm cursor-pointer hover:border-[#222222] transition">
              <input
                type="checkbox"
                checked={showAvailableOnly}
                onChange={() =>
                  setShowAvailableOnly(
                    (prev) => !prev
                  )
                }
                className="accent-[#FF385C]"
              />

              Available Only
            </label>

            {/* SORT */}
            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value)
              }
              className="border border-[#dddddd] px-5 py-3 rounded-full text-sm outline-none hover:border-[#222222] transition bg-white"
            >
              <option value="newest">
                Newest First
              </option>

              <option value="low-high">
                Price: Low → High
              </option>

              <option value="high-low">
                Price: High → Low
              </option>
            </select>
          </div>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#f7f7f7] rounded-[32px] p-16 text-center">
            <p className="text-[#717171] text-lg">
              No products available.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={product._id}
                className="group cursor-pointer"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-[30px] aspect-[4/5] bg-[#f7f7f7]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#999999]">
                      No Image
                    </div>
                  )}

                  {/* STOCK BADGE */}
                  <div className="absolute top-4 right-4">
                    {product.inStock !== false ? (
                      <div className="bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full text-xs font-medium">
                        Available
                      </div>
                    ) : (
                      <div className="bg-black/80 text-white px-4 py-2 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-sm text-[#717171] line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <p className="font-semibold text-lg whitespace-nowrap">
                      ₹{product.price}
                    </p>
                  </div>

                  {/* ACTION */}
                  <button
                    onClick={() =>
                      navigate(
                        `/buyer/product/${product._id}`
                      )
                    }
                    className="mt-5 w-full border border-[#dddddd] hover:border-[#222222] py-3 rounded-2xl font-medium transition-all duration-300"
                  >
                    View Product
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* ================= FLOATING CALL ================= */}
      {shop.phone && (
        <button
          onClick={() =>
            window.open(`tel:${shop.phone}`)
          }
          className="fixed bottom-6 right-6 bg-[#FF385C] hover:bg-[#e03150] text-white px-7 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 z-50"
        >
          Call Shop
        </button>
      )}
    </div>
  );
};

export default ShopDetails;