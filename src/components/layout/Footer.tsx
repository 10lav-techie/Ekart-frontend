
import {
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">

        {/* ===================================================== */}
        {/* BRAND */}
        {/* ===================================================== */}
        <div>

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-[#FF385C] flex items-center justify-center text-xl font-bold">
              L
            </div>

            <div>
              <h2 className="text-2xl font-semibold">
                LocalKart
              </h2>

              <p className="text-sm text-gray-400">
                Local Shopping Marketplace
              </p>
            </div>
          </div>

          {/* ABOUT */}
          <p className="text-gray-400 text-sm leading-relaxed mt-5 max-w-sm">
            LocalKart helps users discover nearby shops,
            explore local products, and support local
            businesses with a modern marketplace
            experience.
          </p>
        </div>

        {/* ===================================================== */}
        {/* QUICK LINKS */}
        {/* ===================================================== */}
        <div>

          <h3 className="text-lg font-semibold mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm text-gray-400">

            <a
              href="/"
              className="hover:text-white transition"
            >
              Home
            </a>

            <a
              href="/search"
              className="hover:text-white transition"
            >
              Search Shops
            </a>

            <a
              href="/cart"
              className="hover:text-white transition"
            >
              Cart
            </a>

            <a
              href="/login"
              className="hover:text-white transition"
            >
              Login
            </a>
          </div>
        </div>

        {/* ===================================================== */}
        {/* SOCIALS */}
        {/* ===================================================== */}
        <div>

          <h3 className="text-lg font-semibold mb-5">
            Connect With Me
          </h3>

          <p className="text-gray-400 text-sm mb-5">
            Built by Lav Kumar 🚀
          </p>

          <div className="flex items-center gap-5 text-2xl">

            {/* LINKEDIN */}
            <a
              href="https://www.linkedin.com/in/lav-kumar-0a0682285/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#0A66C2] transition"
            >
              <FaLinkedin />
            </a>

            {/* GITHUB */}
            <a
              href="https://github.com/10lav-techie"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 transition"
            >
              <FaGithub />
            </a>

            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/10_lav/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* BOTTOM */}
      {/* ===================================================== */}
      <div className="border-t border-[#222222]">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">

          <p>
            © 2026 LocalKart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
