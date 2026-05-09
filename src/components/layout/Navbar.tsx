import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  CartContext,
} from "../../context/CartContext";

import {
  AuthContext,
} from "../../context/AuthContext";

const Navbar = () => {
  const {
    user,
    logout,
  } = useContext(
    AuthContext
  );

  const { cartCount } =
    useContext(
      CartContext
    );

  const navigate =
    useNavigate();

  const [scrolled, setScrolled] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  // =====================================================
  // SCROLL EFFECT
  // =====================================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================
  const handleLogout = () => {
    logout();

    navigate("/");
  };

  // =====================================================
  // SCROLL TO SHOPS
  // =====================================================
  const scrollToSection =
    () => {
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });

      setMobileMenu(false);
    };

  return (
    <>
      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border-b border-[#eeeeee] shadow-sm"
            : "bg-white/60 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="h-20 flex items-center justify-between">

            {/* ===================================================== */}
            {/* LOGO */}
            {/* ===================================================== */}
            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                className="text-2xl font-semibold tracking-tight text-[#222222]"
              >
                Local
                <span className="text-[#FF385C]">
                  Kart
                </span>
              </motion.div>
            </Link>

            {/* ===================================================== */}
            {/* DESKTOP NAV */}
            {/* ===================================================== */}
            <div className="hidden md:flex items-center gap-2 border border-[#eeeeee] rounded-full px-3 py-2 shadow-sm hover:shadow-md transition-all duration-300 bg-white">

              <Link
                to="/"
                className="px-4 py-2 rounded-full text-sm font-medium hover:bg-[#f7f7f7] transition"
              >
                Home
              </Link>

              <Link
                to="/"
                className="px-4 py-2 rounded-full text-sm font-medium hover:bg-[#f7f7f7] transition"
              >
                Explore
              </Link>

              <button
                onClick={
                  scrollToSection
                }
                className="px-4 py-2 rounded-full text-sm font-medium hover:bg-[#f7f7f7] transition"
              >
                Nearby Shops
              </button>
            </div>

            {/* ===================================================== */}
            {/* RIGHT SECTION */}
            {/* ===================================================== */}
            <div className="hidden md:flex items-center gap-4">

              {/* ===================================================== */}
              {/* NOT LOGGED IN */}
              {/* ===================================================== */}
              {(!user ||
                !user.role) && (
                <>
                  <Link
                    to="/seller/login"
                    className="text-sm font-medium text-[#222222] hover:text-[#FF385C] transition"
                  >
                    Become a Seller
                  </Link>

                  <Link
                    to="/buyer/signup"
                    className="border border-[#dddddd] hover:border-[#222222] px-5 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    Sign Up
                  </Link>

                  <Link
                    to="/login"
                    className="bg-[#FF385C] hover:bg-[#e03150] text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Login
                  </Link>
                </>
              )}

              {/* ===================================================== */}
              {/* BUYER */}
              {/* ===================================================== */}
              {user?.role ===
                "buyer" && (
                <>
                  <Link
                    to="/cart"
                    className="relative border border-[#dddddd] hover:border-[#222222] px-5 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    Cart

                    {cartCount >
                      0 && (
                      <span className="absolute -top-2 -right-2 bg-[#FF385C] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                        {
                          cartCount
                        }
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/buyer/dashboard"
                    className="border border-[#dddddd] hover:border-[#222222] px-5 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    My Orders
                  </Link>

                  {/* PROFILE */}
                  <div className="flex items-center gap-3 border border-[#eeeeee] rounded-full pl-2 pr-4 py-2 bg-white shadow-sm">

                    <div className="w-10 h-10 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-sm font-semibold">
                      {user?.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div className="hidden lg:block">

                      <p className="text-sm font-medium leading-none">
                        {
                          user?.name
                        }
                      </p>

                      <p className="text-xs text-[#717171] mt-1">
                        Buyer
                        Account
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="bg-black hover:bg-[#222222] text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* ===================================================== */}
              {/* SELLER */}
              {/* ===================================================== */}
              {user?.role ===
                "seller" && (
                <>
                  <Link
                    to="/seller/dashboard"
                    className="border border-[#dddddd] hover:border-[#222222] px-5 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/seller/orders"
                    className="border border-[#dddddd] hover:border-[#222222] px-5 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    Orders
                  </Link>

                  {/* PROFILE */}
                  <div className="flex items-center gap-3 border border-[#eeeeee] rounded-full pl-2 pr-4 py-2 bg-white shadow-sm">

                    <div className="w-10 h-10 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-sm font-semibold">
                      {user?.seller
                        ?.shopName
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "S"}
                    </div>

                    <div className="hidden lg:block">

                      <p className="text-sm font-medium leading-none">
                        {user
                          ?.seller
                          ?.shopName ||
                          "Seller"}
                      </p>

                      <p className="text-xs text-[#717171] mt-1">
                        Seller
                        Account
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="bg-black hover:bg-[#222222] text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* ===================================================== */}
            {/* MOBILE BUTTON */}
            {/* ===================================================== */}
            <button
              onClick={() =>
                setMobileMenu(
                  !mobileMenu
                )
              }
              className="md:hidden w-11 h-11 rounded-full border border-[#dddddd] flex items-center justify-center bg-white"
            >
              <div className="space-y-1">
                <div className="w-5 h-[2px] bg-black rounded-full" />
                <div className="w-5 h-[2px] bg-black rounded-full" />
                <div className="w-5 h-[2px] bg-black rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================== */}
      {/* MOBILE MENU */}
      {/* ===================================================== */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed top-20 left-4 right-4 z-50 md:hidden"
          >
            <div className="bg-white rounded-[32px] shadow-2xl border border-[#eeeeee] overflow-hidden">

              <div className="flex flex-col p-4">

                <Link
                  to="/"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                  className="px-5 py-4 rounded-2xl hover:bg-[#f7f7f7] text-sm font-medium transition"
                >
                  Home
                </Link>

                <Link
                  to="/"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                  className="px-5 py-4 rounded-2xl hover:bg-[#f7f7f7] text-sm font-medium transition"
                >
                  Explore
                </Link>

                <button
                  onClick={
                    scrollToSection
                  }
                  className="text-left px-5 py-4 rounded-2xl hover:bg-[#f7f7f7] text-sm font-medium transition"
                >
                  Nearby Shops
                </button>

                <div className="h-px bg-[#eeeeee] my-3" />

                {/* NOT LOGGED IN */}
                {(!user ||
                  !user.role) && (
                  <>
                    <Link
                      to="/seller/login"
                      onClick={() =>
                        setMobileMenu(
                          false
                        )
                      }
                      className="px-5 py-4 rounded-2xl hover:bg-[#f7f7f7] text-sm font-medium transition"
                    >
                      Become a Seller
                    </Link>

                    <Link
                      to="/buyer/signup"
                      onClick={() =>
                        setMobileMenu(
                          false
                        )
                      }
                      className="px-5 py-4 rounded-2xl hover:bg-[#f7f7f7] text-sm font-medium transition"
                    >
                      Sign Up
                    </Link>

                    <Link
                      to="/login"
                      onClick={() =>
                        setMobileMenu(
                          false
                        )
                      }
                      className="mt-3 bg-[#FF385C] hover:bg-[#e03150] text-white px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-300 text-center"
                    >
                      Login
                    </Link>
                  </>
                )}

                {/* BUYER */}
                {user?.role ===
                  "buyer" && (
                  <>
                    <Link
                      to="/cart"
                      onClick={() =>
                        setMobileMenu(
                          false
                        )
                      }
                      className="px-5 py-4 rounded-2xl hover:bg-[#f7f7f7] text-sm font-medium transition"
                    >
                      Cart (
                      {
                        cartCount
                      }
                      )
                    </Link>

                    <Link
                      to="/buyer/dashboard"
                      onClick={() =>
                        setMobileMenu(
                          false
                        )
                      }
                      className="px-5 py-4 rounded-2xl hover:bg-[#f7f7f7] text-sm font-medium transition"
                    >
                      My Orders
                    </Link>

                    <button
                      onClick={
                        handleLogout
                      }
                      className="mt-3 bg-black hover:bg-[#222222] text-white px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                )}

                {/* SELLER */}
                {user?.role ===
                  "seller" && (
                  <>
                    <Link
                      to="/seller/dashboard"
                      onClick={() =>
                        setMobileMenu(
                          false
                        )
                      }
                      className="px-5 py-4 rounded-2xl hover:bg-[#f7f7f7] text-sm font-medium transition"
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/seller/orders"
                      onClick={() =>
                        setMobileMenu(
                          false
                        )
                      }
                      className="px-5 py-4 rounded-2xl hover:bg-[#f7f7f7] text-sm font-medium transition"
                    >
                      Orders
                    </Link>

                    <button
                      onClick={
                        handleLogout
                      }
                      className="mt-3 bg-black hover:bg-[#222222] text-white px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;