import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);

  useEffect(() => {
    const seller = localStorage.getItem("seller");
    if (seller) {
      setIsSellerLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("seller");
    setIsSellerLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          Local<span className="text-blue-600">Kart</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <Link
            to="/"
            className="text-slate-600 hover:text-blue-600 transition duration-200"
          >
            Home
          </Link>

          {!isSellerLoggedIn && (
            <Link
              to="/seller/login"
              className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200 shadow-md"
            >
              Seller Login
            </Link>
          )}

          {isSellerLoggedIn && (
            <>
              <Link
                to="/seller/dashboard"
                className="text-slate-600 hover:text-blue-600 transition duration-200"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition duration-200 shadow-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
