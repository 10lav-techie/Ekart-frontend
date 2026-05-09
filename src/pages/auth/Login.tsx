import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { setUser } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= LOGIN =================
  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      // STORE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      localStorage.setItem(
        "token",
        data.token
      );

      // UPDATE CONTEXT
      setUser({
        ...data,
      });
      // REDIRECT
      if (
        data.role === "seller"
      ) {
        console.log(data);
        navigate(
          "/seller/dashboard"
        );
      } else {
        navigate("/");
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* ================= LEFT SIDE ================= */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop"
          alt="LocalKart"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/45" />

        {/* CONTENT */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-14 text-white">
          {/* LOGO */}
          <Link
            to="/"
            className="text-3xl font-semibold tracking-tight"
          >
            Local
            <span className="text-[#FF385C]">
              Kart
            </span>
          </Link>

          {/* HERO TEXT */}
          <div className="max-w-xl">
            <p className="uppercase tracking-[0.25em] text-sm text-white/70 mb-5">
              Hyperlocal Marketplace
            </p>

            <h1 className="text-6xl leading-tight font-semibold tracking-tight">
              Shop Nearby.
              <br />
              Support Local.
            </h1>

            <p className="text-white/80 mt-8 text-lg leading-relaxed">
              Discover trusted local stores,
              nearby products, and seamless
              shopping experiences around your
              city.
            </p>
          </div>

          {/* FOOTER TEXT */}
          <p className="text-white/60 text-sm">
            Trusted by local businesses and
            nearby communities.
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* MOBILE LOGO */}
          <Link
            to="/"
            className="lg:hidden text-3xl font-semibold tracking-tight text-[#222222] inline-block mb-10"
          >
            Local
            <span className="text-[#FF385C]">
              Kart
            </span>
          </Link>

          {/* TITLE */}
          <div className="mb-10">
            <p className="uppercase tracking-[0.2em] text-sm text-[#717171] mb-3">
              Welcome Back
            </p>

            <h2 className="text-5xl font-semibold tracking-tight text-[#222222]">
              Login
            </h2>

            <p className="text-[#717171] mt-4 leading-relaxed">
              Access your buyer or seller
              account and continue exploring
              nearby stores.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition-all duration-300 bg-white"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">
                  Password
                </label>

                <Link
                  to="/seller/forgot-password"
                  className="text-sm text-[#717171] hover:text-[#222222] transition"
                >
                  Forgot Password?
                </Link>
              </div>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition-all duration-300 bg-white"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF385C] hover:bg-[#e03150] text-white py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.01] disabled:opacity-70"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#eeeeee]" />

            <p className="text-sm text-[#717171]">
              OR
            </p>

            <div className="flex-1 h-px bg-[#eeeeee]" />
          </div>

          {/* SIGNUP LINKS */}
          <div className="space-y-4">
            {/* BUYER */}
            <Link
              to="/buyer/signup"
              className="w-full border border-[#dddddd] hover:border-[#222222] rounded-2xl px-5 py-4 flex items-center justify-between transition-all duration-300"
            >
              <div>
                <p className="font-medium">
                  Join as Buyer
                </p>

                <p className="text-sm text-[#717171] mt-1">
                  Discover nearby products
                </p>
              </div>

              <span className="text-xl">
                →
              </span>
            </Link>

            {/* SELLER */}
            <Link
              to="/seller/signup"
              className="w-full border border-[#dddddd] hover:border-[#222222] rounded-2xl px-5 py-4 flex items-center justify-between transition-all duration-300"
            >
              <div>
                <p className="font-medium">
                  Register Shop
                </p>

                <p className="text-sm text-[#717171] mt-1">
                  Start selling locally
                </p>
              </div>

              <span className="text-xl">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;