import { useState, useContext } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { motion } from "framer-motion";

import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const BuyerSignup = () => {
  const navigate = useNavigate();

  const { setUser } =
    useContext(AuthContext);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= SIGNUP =================
  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } =
        await API.post(
          "/auth/register-buyer",
          {
            name,
            email,
            password,
          }
        );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      localStorage.setItem(
        "token",
        data.token
      );

      setUser(data);

      // REDIRECT
      navigate("/");
    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          error.message ||
          "Signup failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-10">
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
        className="w-full max-w-5xl bg-white border border-[#eeeeee] rounded-[36px] overflow-hidden shadow-sm"
      >
        <div className="grid lg:grid-cols-[320px_1fr]">
          {/* ================= LEFT PANEL ================= */}
          <div className="bg-[#111111] text-white p-10 flex flex-col justify-between">
            <div>
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

              {/* TEXT */}
              <div className="mt-16">
                <p className="uppercase tracking-[0.2em] text-xs text-white/50 mb-4">
                  Buyer Signup
                </p>

                <h2 className="text-4xl font-semibold leading-tight">
                  Discover
                  <br />
                  Nearby Shops
                </h2>

                <p className="text-white/70 mt-6 leading-relaxed">
                  Create your buyer account
                  and explore products from
                  trusted local stores around
                  you.
                </p>
              </div>
            </div>

            {/* LOGIN */}
            <div className="mt-10">
              <p className="text-white/50 text-sm mb-4">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="inline-flex items-center justify-center border border-white/20 hover:border-white/40 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300"
              >
                Login Here
              </Link>
            </div>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="p-8 lg:p-12 flex items-center">
            <div className="w-full">
              {/* HEADER */}
              <div className="mb-10">
                <p className="uppercase tracking-[0.2em] text-xs text-[#717171] mb-3">
                  Registration Form
                </p>

                <h1 className="text-4xl font-semibold tracking-tight text-[#222222]">
                  Create Buyer Account
                </h1>

                <p className="text-[#717171] mt-4 leading-relaxed">
                  Join LocalKart and start
                  exploring products nearby.
                </p>
              </div>

              {/* ================= FORM ================= */}
              <form
                onSubmit={handleSignup}
                className="space-y-6"
              >
                {/* NAME */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    required
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition-all duration-300"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    required
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition-all duration-300"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition-all duration-300"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FF385C] hover:bg-[#e03150] text-white py-4 rounded-2xl font-medium transition-all duration-300"
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}
                </button>
              </form>

              {/* LOGIN */}
              <div className="mt-8 text-center">
                <p className="text-[#717171]">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#222222] font-medium hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BuyerSignup;