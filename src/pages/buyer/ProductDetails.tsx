import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * TEMP MOCK PRODUCT
 * -----------------
 * Replace with API data later
 */
const mockProduct = {
  id: "p1",
  name: "Amul Milk (500ml)",
  price: 56,
  description:
    "Fresh Amul milk available daily. Best before 24 hours. Stored hygienically and delivered from trusted nearby stores.",
  tag: "new",
  image:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop",
  shop: {
    id: "1",
    name: "Sharma General Store",
    distance: "1.2 km",
    isOpen: true,
    address: "Sector 15, Noida",
    phone: "+91 9876543210",
  },
};

const ProductDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#222222]">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#eeeeee]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="border border-[#dddddd] hover:border-[#222222] px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
          >
            ← Back
          </button>

          <h1 className="text-sm tracking-[0.2em] uppercase text-[#717171]">
            Product Details
          </h1>

          <div className="w-[82px]" />
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ================= IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="overflow-hidden rounded-[32px] bg-[#f7f7f7]">
              <img
                src={mockProduct.image}
                alt={mockProduct.name}
                loading="lazy"
                className="w-full h-[520px] object-cover hover:scale-105 transition duration-700"
              />
            </div>

            {/* Small Preview Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl bg-[#f7f7f7]"
                >
                  <img
                    src={mockProduct.image}
                    alt="preview"
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= DETAILS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-28"
          >
            {/* CATEGORY */}
            <p className="text-sm uppercase tracking-[0.2em] text-[#717171] mb-4">
              Daily Essentials
            </p>

            {/* TITLE */}
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                {mockProduct.name}
              </h1>

              {mockProduct.tag === "new" && (
                <div className="bg-[#FF385C] text-white px-4 py-1 rounded-full text-sm font-medium">
                  New
                </div>
              )}

              {mockProduct.tag === "top" && (
                <div className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
                  Top
                </div>
              )}
            </div>

            {/* PRICE */}
            <div className="mt-8 flex items-end gap-2">
              <p className="text-4xl font-semibold">
                ₹{mockProduct.price}
              </p>

              <span className="text-[#717171] mb-1">
                per unit
              </span>
            </div>

            {/* STATUS */}
            <div className="flex items-center gap-3 mt-6">
              <div
                className={`w-3 h-3 rounded-full ${
                  mockProduct.shop.isOpen
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />

              <p className="text-sm text-[#717171]">
                {mockProduct.shop.isOpen
                  ? "Currently Open"
                  : "Currently Closed"}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-10 border-t border-[#eeeeee] pt-8">
              <h2 className="text-xl font-semibold mb-4">
                About this product
              </h2>

              <p className="text-[#717171] leading-relaxed text-[15px]">
                {mockProduct.description}
              </p>
            </div>

            {/* SHOP INFO */}
            <div className="mt-10 border-t border-[#eeeeee] pt-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[#717171] mb-2">
                    Available At
                  </p>

                  <h3 className="text-2xl font-semibold">
                    {mockProduct.shop.name}
                  </h3>

                  <p className="text-[#717171] mt-2 leading-relaxed">
                    {mockProduct.shop.address}
                  </p>

                  <p className="text-[#717171] mt-1">
                    {mockProduct.shop.distance} away
                  </p>
                </div>

                <div className="bg-[#f7f7f7] px-5 py-3 rounded-2xl text-sm font-medium">
                  Nearby
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                {/* CALL */}
                <button
                  onClick={() =>
                    window.open(
                      `tel:${mockProduct.shop.phone}`
                    )
                  }
                  className="bg-[#FF385C] hover:bg-[#e03150] text-white py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.01]"
                >
                  Call Shop
                </button>

                {/* DIRECTIONS */}
                <button
                  className="border border-[#dddddd] hover:border-[#222222] py-4 rounded-2xl font-medium transition-all duration-300"
                >
                  Get Directions
                </button>
              </div>

              {/* VISIT SHOP */}
              <button
                onClick={() =>
                  navigate(`/shop/${mockProduct.shop.id}`)
                }
                className="w-full mt-5 bg-[#f7f7f7] hover:bg-[#efefef] py-4 rounded-2xl font-medium transition-all duration-300"
              >
                Visit Shop
              </button>
            </div>

            {/* EXTRA DETAILS */}
            <div className="mt-10 border-t border-[#eeeeee] pt-8 space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-[#717171]">
                  Delivery Availability
                </span>

                <span className="font-medium">
                  Available Nearby
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#717171]">
                  Estimated Pickup Time
                </span>

                <span className="font-medium">
                  10-15 mins
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#717171]">
                  Product Quality
                </span>

                <span className="font-medium">
                  Fresh Stock
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;