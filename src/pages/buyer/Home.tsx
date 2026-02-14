import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  category: string;
  isNew?: boolean;
  inStock :boolean;
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

  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [locations, setLocations] = useState<Locations>({});
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [shops, setShops] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<
  "categories" | "shops" | "products" | "nearby"
>("categories");


  // Fetch locations once
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLat(position.coords.latitude);
        setUserLng(position.coords.longitude);
      },
      (_error) => {
        console.log("Location denied");
      }
    );
  }, []);
  useEffect(() => {
    const fetchNearby = async () => {
      if (!userLat || !userLng) return;

      const { data } = await API.get(
        `/products/nearby-shops?lat=${userLat}&lng=${userLng}&city=${city}&district=${district}`
      );

      setShops(data);
      setViewMode("shops");
    };

    fetchNearby();
  }, [userLat, userLng, city, district]);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await API.get("/locations");
      setLocations(data);
    };

    fetchLocations();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await API.get(
        `/products/public?city=${city}&district=${district}`
      );
      setProducts(data);
    };

    fetchProducts();
  }, [city, district]);

  const handleSearch = async () => {
    if (!city || !district) {
      alert("Please select state and district");
      return;
    }

    // 🔥 CASE 1: No search text → show shops
    if (!search.trim()) {
      setSelectedCategory("");
      setViewMode("shops");

      const { data } = await API.get(
        `/products/shops-by-category?city=${city}&district=${district}`
      );

      setShops(data);
      return;
    }

    // 🔥 CASE 2: Search text exists → show products
    const { data } = await API.get(
      `/products/public?search=${search}&city=${city}&district=${district}`
    );

    setProducts(data);
    setViewMode("products");
  };




  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);
    setViewMode("shops");

    const { data } = await API.get(
      `/products/shops-by-category?category=${category}&city=${city}&district=${district}`
    );

    setShops(data);
  };



  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict(""); // Reset district when city changes
  };
  const categories = [
    {
      name: "Grocery",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e"
    },
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
      name: "Food",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
    },
    {
      name: "Clothes",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Others",
      image: "https://th.bing.com/th/id/OIP.TTk94VnNp9YY3w2BroSZ3AHaGb?w=222&h=192&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    }
  ];

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
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section
        className="relative text-white py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://t3.ftcdn.net/jpg/01/17/33/22/360_F_117332203_ekwDZkViF6M3itApEFRIH4844XjJ7zEb.jpg')",
        }}
      >

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Find Products From
            <span className="text-yellow-300"> Local Shops</span>
          </h1>

          <p className="opacity-90 mb-10 text-lg">
            Search items available near you and discover trusted vendors.
          </p>

          {/* Search Bar */}
          <div className="bg-white shadow-2xl rounded-2xl p-4 flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">

            <select
              className="p-4 rounded-xl border text-slate-700 w-full md:w-1/4"
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

            <select
              className="p-4 rounded-xl border text-slate-700 w-full md:w-1/4"
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

            <input
              className="p-4 rounded-xl border w-full md:w-1/2 text-slate-700"
              placeholder="Search milk, rice, charger..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-semibold transition"
            >
              Search
            </button>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleNearbyShops}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition cursor-pointer hover:-translate-y-1"
            >
                Explore Shops Near Me
            </button>
          </div>


        </div>
      </section>


      {/* ================= CONTENT ================= */}
      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        {/* ===== CATEGORY VIEW ===== */}
        {viewMode === "categories" && (
          <>
            <h2 className="text-3xl font-bold mb-10">
              Browse Categories
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition group overflow-hidden"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-40 w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="p-5 text-center">
                    <h3 className="font-semibold text-lg text-slate-700">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== SHOPS VIEW ===== */}
        {viewMode === "shops" && (
          <>
            <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                {selectedCategory === "Nearby"
                  ? "Shops Near You (Within 30km)"
                  : `${selectedCategory} Shops`}
              </h2>


              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode("categories")}
                  className="text-sm bg-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200 transition"
                >
                  ← Categories
                </button>

                <button
                  onClick={handleNearbyShops}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  📍 Near Me (30km)
                </button>
              </div>
            </div>


            {shops.length === 0 ? (
              <div className="bg-white p-10 rounded-xl text-center shadow-sm">
                <p className="text-slate-500">
                  No shops found in this category.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {shops.map((shop) => (
                  <div
                    key={shop._id}
                    onClick={() => navigate(`/shop/${shop._id}`)}
                    className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-1"
                  >

                    {/* Banner */}
                    <div className="h-28 bg-slate-100 relative">
                      {shop.bannerImage ? (
                        <img
                          src={shop.bannerImage}
                          alt={shop.shopName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                      )}

                      {/* Logo */}
                      <div className="absolute -bottom-8 left-4">
                        <div className="w-16 h-16 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                          {shop.logoImage ? (
                            <img
                              src={shop.logoImage}
                              alt="logo"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg font-bold text-blue-600 bg-blue-50">
                              {shop.shopName?.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-10 p-4">
                      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition">
                        {shop.shopName}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        📍 {shop.area}, {shop.city}
                      </p>

                      <button className="mt-4 w-full bg-slate-50 hover:bg-blue-50 text-blue-600 font-medium py-2 rounded-lg transition">
                        View Shop →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            )}
          </>
        )}


        {/* ===== PRODUCTS VIEW ===== */}
        {viewMode === "products" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                Search Results
              </h2>

              <button
                onClick={() => setViewMode("categories")}
                className="text-sm bg-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200 transition"
              >
                ← Back to Categories
              </button>
            </div>

            {products.length === 0 ? (
              <div className="bg-white p-10 rounded-xl text-center shadow-sm">
                <p className="text-slate-500">
                  No products found.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-10">
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition border border-slate-100 overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-52 w-full object-cover"
                    />

                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-slate-800">
                        {product.name}
                      </h3>

                      <p className="text-xl font-bold text-blue-600 mb-2">
                        ₹{product.price}
                      </p>

                      <p className="text-sm text-slate-500 mb-3">
                        {product.seller.shopName}
                      </p>

                      <button
                        onClick={() =>
                          navigate(`/shop/${product.seller._id}`)
                        }
                        className="w-full border border-slate-300 hover:bg-slate-100 py-2 rounded-lg text-sm font-medium transition"
                      >
                        View Shop
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

      </section>

    </div>
  );

};

export default BuyerHome;
