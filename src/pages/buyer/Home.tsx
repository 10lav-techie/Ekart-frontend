import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  seller: {
    _id: string;
    shopName: string;
    city: string;
    district: string;
    area: string;
  };
}

interface Locations {
  [state: string]: string[];
}

const BuyerHome = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [locations, setLocations] = useState<Locations>({});
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [shops, setShops] = useState<any[]>([]);

  const [viewMode, setViewMode] = useState<
    "categories" | "shops" | "products"
  >("categories");

  // ================= GEO LOCATION =================
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLat(position.coords.latitude);
        setUserLng(position.coords.longitude);
      },
      () => {
        console.log("Location denied");
      }
    );
  }, []);

  // ================= FETCH LOCATIONS =================
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await API.get("/locations");
        setLocations(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocations();
  }, []);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get(
          `/products/public?city=${city}&district=${district}`
        );

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [city, district]);

  // ================= SEARCH =================
  const handleSearch = async () => {
    if (!city || !district) {
      alert("Please select state and district");
      return;
    }

    try {
      // SHOW SHOPS
      if (!search.trim()) {
        setSelectedCategory("");
        setViewMode("shops");

        const { data } = await API.get(
          `/products/shops-by-category?city=${city}&district=${district}`
        );

        setShops(data);
        return;
      }

      // SHOW PRODUCTS
      const { data } = await API.get(
        `/products/public?search=${search}&city=${city}&district=${district}`
      );

      setProducts(data);
      setViewMode("products");
    } catch (error) {
      console.log(error);
    }
  };

  // ================= CATEGORY =================
  const handleCategoryClick = async (category: string) => {
    try {
      setSelectedCategory(category);
      setViewMode("shops");

      const { data } = await API.get(
        `/products/shops-by-category?category=${category}&city=${city}&district=${district}`
      );

      setShops(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= CITY =================
  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict("");
  };

  // ================= NEARBY SHOPS =================
  const handleNearbyShops = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const { data } = await API.get(
          `/products/nearby?lat=${lat}&lng=${lng}`
        );

        setShops(data);
        setSelectedCategory("Nearby");
        setViewMode("shops");
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ================= CATEGORIES =================
  const categories = [
    {
      name: "Grocery",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Food",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Clothes",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Others",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#222222]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-75"
          style={{
            backgroundImage:
              "url('https://blog.tripcorner.com/wp-content/uploads/2024/10/1039a94bthumbnail.jpeg')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />



        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-white/80 text-sm tracking-[0.3em] uppercase mb-5">
              Discover Local Shops
            </p>

            <h1 className="text-5xl md:text-7xl font-semibold text-white leading-tight">
              Everything Nearby,
              <br />
              Delivered Through Trust.
            </h1>

            <p className="text-white/80 text-lg mt-8 max-w-2xl mx-auto leading-relaxed">
              Explore trusted local stores, discover nearby products, and
              connect with businesses around your area effortlessly.
            </p>

            {/* ================= SEARCH BOX ================= */}
            <div className="mt-14 bg-white rounded-[32px] shadow-2xl border border-white/20 p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* State */}
                <div className="flex flex-col text-left px-4 py-2 rounded-2xl hover:bg-[#f7f7f7] transition">
                  <label className="text-xs font-semibold mb-1">
                    State
                  </label>

                  <select
                    className="bg-transparent outline-none text-sm text-[#717171]"
                    value={city}
                    onChange={(e) => handleCityChange(e.target.value)}
                  >
                    <option value="">Select State</option>

                    {Object.keys(locations).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div className="flex flex-col text-left px-4 py-2 rounded-2xl hover:bg-[#f7f7f7] transition">
                  <label className="text-xs font-semibold mb-1">
                    District
                  </label>

                  <select
                    className="bg-transparent outline-none text-sm text-[#717171]"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={!city}
                  >
                    <option value="">Select District</option>

                    {city &&
                      locations[city]?.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Search */}
                <div className="flex flex-col text-left px-4 py-2 rounded-2xl hover:bg-[#f7f7f7] transition md:col-span-2">
                  <label className="text-xs font-semibold mb-1">
                    Search
                  </label>

                  <input
                    type="text"
                    placeholder="Search milk, chargers, groceries..."
                    className="bg-transparent outline-none text-sm placeholder:text-[#9a9a9a]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-5">
                <button
                  onClick={handleSearch}
                  className="flex-1 bg-[#FF385C] hover:bg-[#e03150] text-white py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.01]"
                >
                  Search Nearby Shops
                </button>

                <button
                  onClick={handleNearbyShops}
                  className="flex-1 border border-[#dddddd] hover:border-[#222222] py-4 rounded-2xl font-medium transition-all duration-300"
                >
                  Explore Near Me
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-20">
        {/* ================= CATEGORIES ================= */}
        {viewMode === "categories" && (
          <div>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight">
                  Browse Categories
                </h2>

                <p className="text-[#717171] mt-2">
                  Explore products from local businesses around you.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {categories.map((category) => (
                <motion.div
                  whileHover={{ y: -8 }}
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-[30px] aspect-[4/5]">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-white text-2xl font-semibold">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SHOPS ================= */}
        {viewMode === "shops" && (
          <div>
            <div className="flex flex-wrap justify-between gap-4 items-center mb-10">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight">
                  {selectedCategory === "Nearby"
                    ? "Shops Near You"
                    : `${selectedCategory} Shops`}
                </h2>

                <p className="text-[#717171] mt-2">
                  Explore trusted local businesses around your location.
                </p>
              </div>

              <button
                onClick={() => setViewMode("categories")}
                className="border border-[#dddddd] px-6 py-3 rounded-full hover:shadow-md transition"
              >
                Back
              </button>
            </div>

            {shops.length === 0 ? (
              <div className="bg-[#f7f7f7] rounded-[28px] p-16 text-center">
                <p className="text-[#717171] text-lg">
                  No shops found.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {shops.map((shop) => (
                  <motion.div
                    whileHover={{ y: -8 }}
                    key={shop._id}
                    onClick={() => navigate(`/shop/${shop._id}`)}
                    className="cursor-pointer group"
                  >
                    {/* Banner */}
                    <div className="relative overflow-hidden rounded-[28px] aspect-[4/4.5]">
                      {shop.bannerImage ? (
                        <img
                          src={shop.bannerImage}
                          alt={shop.shopName}
                          loading="lazy"
                          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#f3f3f3]" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Logo */}
                      <div className="absolute top-5 left-5">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white bg-white shadow-md">
                          {shop.logoImage ? (
                            <img
                              src={shop.logoImage}
                              alt="logo"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-semibold text-[#FF385C]">
                              {shop.shopName?.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <h3 className="text-2xl font-semibold">
                          {shop.shopName}
                        </h3>

                        <p className="text-sm text-white/80 mt-1">
                          {shop.area}, {shop.city}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= PRODUCTS ================= */}
        {viewMode === "products" && (
          <div>
            <div className="flex flex-wrap justify-between gap-4 items-center mb-10">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight">
                  Search Results
                </h2>

                <p className="text-[#717171] mt-2">
                  Products available nearby.
                </p>
              </div>

              <button
                onClick={() => setViewMode("categories")}
                className="border border-[#dddddd] px-6 py-3 rounded-full hover:shadow-md transition"
              >
                Back
              </button>
            </div>

            {products.length === 0 ? (
              <div className="bg-[#f7f7f7] rounded-[28px] p-16 text-center">
                <p className="text-[#717171] text-lg">
                  No products found.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {products.map((product) => (
                  <motion.div
                    whileHover={{ y: -8 }}
                    key={product._id}
                    className="group cursor-pointer"
                  >
                    {/* Image */}
                    <div className="overflow-hidden rounded-[28px] aspect-[4/5]">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="pt-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {product.name}
                          </h3>

                          <p className="text-sm text-[#717171] mt-1">
                            {product.seller.shopName}
                          </p>
                        </div>

                        <p className="font-semibold text-lg">
                          ₹{product.price}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          navigate(`/shop/${product.seller._id}`)
                        }
                        className="mt-5 w-full border border-[#dddddd] hover:border-[#222222] py-3 rounded-2xl transition-all duration-300"
                      >
                        View Shop
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default BuyerHome;