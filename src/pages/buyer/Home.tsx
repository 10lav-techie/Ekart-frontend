import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  
  const [products, setProducts] = useState<Product[]>([]);
  const [locations, setLocations] = useState<Locations>({});
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch locations once
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
    const { data } = await API.get(
      `/products/public?search=${search}&city=${city}&district=${district}&category=${selectedCategory}`
    );

    setProducts(data);
    setHasSearched(true);
  };
  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);
    setHasSearched(true);

    const { data } = await API.get(
      `/products/public?city=${city}&district=${district}&category=${category}`
    );

    setProducts(data);
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
    }
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white py-28 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Discover <span className="text-yellow-300">Local Shops</span> Near You
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Explore products from trusted neighborhood stores across your city.
          </p>

          {/* Glass Search Box */}
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row gap-4 justify-center max-w-5xl mx-auto">

            {/* City Dropdown */}
            <select
              className="p-4 rounded-xl text-black w-full md:w-1/4"
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

            {/* District Dropdown */}
            <select
              className="p-4 rounded-xl text-black w-full md:w-1/4"
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

            {/* Search Input */}
            <input
              className="p-4 rounded-xl text-black w-full md:w-1/2"
              placeholder="Search milk, rice, charger..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={handleSearch}
              className="bg-black text-white px-8 rounded-xl hover:bg-gray-900 transition font-semibold"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        {!hasSearched ? (
          <>
            <h2 className="text-3xl font-bold mb-10 text-center">
              Explore Categories
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className="cursor-pointer group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-60 w-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-8">
              Available Products
            </h2>

            {products.length === 0 ? (
              <p className="text-slate-500">No products found.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100"
                  >
                    {/* Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-48 w-full object-cover"
                    />

                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h3>

                      <p className="text-slate-500 text-sm mb-3">
                        {product.description}
                      </p>

                      <p className="text-xl font-bold text-blue-600 mb-3">
                        ₹{product.price}
                      </p>

                      <Link
                        to={`/shop/${product.seller._id}`}
                        className="text-sm text-slate-500 hover:text-blue-600"
                      >
                        {product.seller.shopName}
                      </Link>
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
