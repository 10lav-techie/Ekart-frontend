import {
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import {
  CartContext,
} from "../../context/CartContext";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

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
  const { sellerId } =
    useParams();

  const navigate =
    useNavigate();
  const {
    addToCart: addToCartContext,
  } = useContext(
    CartContext
  );
  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState<Product | null>(
    null
  );

  const [products, setProducts] =
    useState<Product[]>([]);

  const [
    showAvailableOnly,
    setShowAvailableOnly,
  ] = useState(false);

  const [sortOption, setSortOption] =
    useState("newest");

  const [addingId, setAddingId] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user") ||
      "null"
  );

  // =====================================================
  // FETCH SHOP
  // =====================================================
  useEffect(() => {
    const fetchShop =
      async () => {
        try {
          const { data } =
            await API.get(
              `/products/shop/${sellerId}`
            );

          setProducts(data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchShop();
  }, [sellerId]);

  // =====================================================
  // ADD TO CART
  // =====================================================
  const addToCart = async (
    productId: string
  ) => {
    // LOGIN CHECK
    if (!user) {
      alert(
        "Please login as buyer first"
      );

      return navigate("/login");
    }

    // BUYER CHECK
    if (user.role !== "buyer") {
      return alert(
        "Only buyers can add to cart"
      );
    }

    try {
      setAddingId(productId);

      // CONTEXT ADD
      await addToCartContext(
        productId,
        1
      );

      alert(
        "Added to cart"
      );
    } catch (error: any) {
      alert(
        error.response?.data
          ?.message ||
          "Failed to add to cart"
      );
    } finally {
      setAddingId("");
    }
  };

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================
  const filteredProducts =
    useMemo(() => {
      let filtered = [...products];

      if (showAvailableOnly) {
        filtered = filtered.filter(
          (p) =>
            p.inStock !== false
        );
      }

      if (
        sortOption ===
        "low-high"
      ) {
        filtered.sort(
          (a, b) =>
            a.price - b.price
        );
      } else if (
        sortOption ===
        "high-low"
      ) {
        filtered.sort(
          (a, b) =>
            b.price - a.price
        );
      } else if (
        sortOption ===
        "newest"
      ) {
        filtered.sort(
          (a, b) =>
            new Date(
              b.createdAt || ""
            ).getTime() -
            new Date(
              a.createdAt || ""
            ).getTime()
        );
      }

      return filtered;
    }, [
      products,
      showAvailableOnly,
      sortOption,
    ]);

  // =====================================================
  // LOADING
  // =====================================================
  if (!products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="animate-pulse text-[#717171]">
          Loading shop...
        </p>
      </div>
    );
  }

  const shop = products[0].seller;

  return (
    <div className="min-h-screen bg-white text-[#222222]">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}
      <section className="relative">

        {/* BANNER */}
        <div className="relative h-[240px] md:h-[320px] overflow-hidden">

          {shop.bannerImage ? (
            <img
              src={
                shop.bannerImage
              }
              alt="Shop Banner"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#f3f3f3]" />
          )}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* BACK BUTTON */}
          <div className="absolute top-5 left-5 z-20">

            <button
              onClick={() =>
                navigate(-1)
              }
              className="bg-white/90 backdrop-blur-xl hover:bg-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all duration-300"
            >
              ← Back
            </button>
          </div>

          {/* CONTENT */}
          <div className="absolute bottom-6 left-0 right-0">

            <div className="max-w-[1400px] mx-auto px-5">

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="flex items-end justify-between gap-6"
              >

                {/* LEFT */}
                <div className="flex items-end gap-4">

                  {/* LOGO */}
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white bg-white shadow-lg">

                    {shop.logoImage ? (
                      <img
                        src={
                          shop.logoImage
                        }
                        alt="Shop Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-[#FF385C]">
                        {shop.shopName?.charAt(
                          0
                        )}
                      </div>
                    )}
                  </div>

                  {/* TEXT */}
                  <div className="text-white">

                    <p className="uppercase tracking-[0.2em] text-xs text-white/70 mb-2">
                      Local Store
                    </p>

                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                      {shop.shopName}
                    </h1>

                    <p className="text-white/80 text-sm mt-2">
                      {shop.city},{" "}
                      {shop.area}
                    </p>

                    <p className="text-white/60 text-sm mt-1">
                      {shop.address}
                    </p>
                  </div>
                </div>

                {/* CALL BUTTON */}
                {shop.phone && (
                  <button
                    onClick={() =>
                      window.open(
                        `tel:${shop.phone}`
                      )
                    }
                    className="bg-white text-[#222222] hover:bg-[#f3f3f3] px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    Call Shop
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}
      <main className="max-w-[1400px] mx-auto px-5 py-10">

        {/* ===================================================== */}
        {/* FILTER BAR */}
        {/* ===================================================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">

          {/* LEFT */}
          <div>

            <h2 className="text-3xl font-semibold tracking-tight">
              Products
            </h2>

            <p className="text-[#717171] mt-1 text-sm">
              Browse products available
              in this local shop.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-3">

            {/* AVAILABLE */}
            <label className="flex items-center gap-3 border border-[#dddddd] px-4 py-3 rounded-full text-sm cursor-pointer hover:border-[#222222] transition">

              <input
                type="checkbox"
                checked={
                  showAvailableOnly
                }
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
                setSortOption(
                  e.target.value
                )
              }
              className="border border-[#dddddd] px-4 py-3 rounded-full text-sm outline-none hover:border-[#222222] transition bg-white"
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

        {/* ===================================================== */}
        {/* PRODUCTS */}
        {/* ===================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">

          {filteredProducts.map(
            (product) => (
              <motion.div
                whileHover={{
                  y: -4,
                }}
                key={product._id}
                className="group"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-2xl aspect-square bg-[#f7f7f7]">

                  {product.image ? (
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#999999] text-sm">
                      No Image
                    </div>
                  )}

                  {/* STOCK */}
                  <div className="absolute top-3 right-3">

                    {product.inStock !==
                    false ? (
                      <div className="bg-white/90 backdrop-blur-xl px-3 py-1 rounded-full text-[11px] font-medium">
                        Available
                      </div>
                    ) : (
                      <div className="bg-black/80 text-white px-3 py-1 rounded-full text-[11px] font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="pt-3">

                  <div className="flex items-start justify-between gap-2">

                    <div className="min-w-0">

                      <h3 className="font-medium text-sm line-clamp-1">
                        {
                          product.name
                        }
                      </h3>

                      {product.description && (
                        <p className="text-xs text-[#717171] line-clamp-1 mt-1">
                          {
                            product.description
                          }
                        </p>
                      )}
                    </div>

                    <p className="font-semibold text-sm whitespace-nowrap">
                      ₹
                      {product.price}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-3">

                    {/* VIEW */}
                    <button
                      onClick={() =>
                        setSelectedProduct(
                          product
                        )
                      }
                      className="flex-1 border border-[#dddddd] hover:border-[#222222] py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                    >
                      View
                    </button>

                    {/* ADD TO CART */}
                    {product.inStock !==
                      false && (
                      <button
                        onClick={() =>
                          addToCart(
                            product._id
                          )
                        }
                        disabled={
                          addingId ===
                          product._id
                        }
                        className="flex-1 bg-[#FF385C] hover:bg-[#e03150] disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                      >
                        {addingId ===
                        product._id
                          ? "Adding..."
                          : "Add"}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </main>

      {/* ===================================================== */}
      {/* MODAL */}
      {/* ===================================================== */}
      <AnimatePresence>

        {selectedProduct && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSelectedProduct(
                null
              )
            }
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center px-4"
          >

            {/* MODAL */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 20,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="bg-white w-full max-w-4xl rounded-[28px] overflow-hidden shadow-2xl"
            >

              <div className="grid md:grid-cols-2">

                {/* IMAGE */}
                <div className="bg-[#f7f7f7]">

                  <img
                    src={
                      selectedProduct.image
                    }
                    alt={
                      selectedProduct.name
                    }
                    className="w-full h-full object-cover md:h-[500px]"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-8 flex flex-col justify-between">

                  <div>

                    {/* CLOSE */}
                    <div className="flex justify-end">

                      <button
                        onClick={() =>
                          setSelectedProduct(
                            null
                          )
                        }
                        className="w-9 h-9 rounded-full border border-[#dddddd] hover:border-[#222222] transition"
                      >
                        ✕
                      </button>
                    </div>

                    {/* TITLE */}
                    <div className="mt-4">

                      <p className="uppercase tracking-[0.2em] text-xs text-[#717171] mb-3">
                        Product Details
                      </p>

                      <h2 className="text-3xl font-semibold tracking-tight">
                        {
                          selectedProduct.name
                        }
                      </h2>

                      <div className="flex items-center gap-3 mt-4">

                        <p className="text-2xl font-semibold">
                          ₹
                          {
                            selectedProduct.price
                          }
                        </p>

                        {selectedProduct.inStock !==
                        false ? (
                          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            In Stock
                          </div>
                        ) : (
                          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                            Out of Stock
                          </div>
                        )}
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-8 border-t border-[#eeeeee] pt-6">

                      <h3 className="font-semibold text-lg mb-3">
                        About Product
                      </h3>

                      <p className="text-[#717171] text-sm leading-relaxed">
                        {selectedProduct.description ||
                          "No description available for this product."}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="grid grid-cols-2 gap-4 mt-8">

                    {/* ADD TO CART */}
                    {selectedProduct.inStock !==
                    false ? (
                      <button
                        onClick={() =>
                          addToCart(
                            selectedProduct._id
                          )
                        }
                        disabled={
                          addingId ===
                          selectedProduct._id
                        }
                        className="bg-[#FF385C] hover:bg-[#e03150] disabled:opacity-60 text-white py-3 rounded-xl font-medium transition-all duration-300"
                      >
                        {addingId ===
                        selectedProduct._id
                          ? "Adding..."
                          : "Add To Cart"}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-[#dddddd] text-[#717171] py-3 rounded-xl font-medium cursor-not-allowed"
                      >
                        Out Of Stock
                      </button>
                    )}

                    {/* CLOSE */}
                    <button
                      onClick={() =>
                        setSelectedProduct(
                          null
                        )
                      }
                      className="border border-[#dddddd] hover:border-[#222222] py-3 rounded-xl font-medium transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;