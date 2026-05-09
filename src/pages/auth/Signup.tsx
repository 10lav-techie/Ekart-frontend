import {
  useState,
  useEffect,
  useContext,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

interface Locations {
  [state: string]: string[];
}

const Signup = () => {
  const navigate = useNavigate();

  const { setUser } =
    useContext(AuthContext);

  const [loading, setLoading] =
    useState(false);

  const [locations, setLocations] =
    useState<Locations>({});

  const [position, setPosition] =
    useState<[number, number] | null>(
      null
    );

  const [latitude, setLatitude] =
    useState<number | null>(null);

  const [longitude, setLongitude] =
    useState<number | null>(null);

  // ================= FORM STATES =================
  const [ownerName, setOwnerName] =
    useState("");

  const [shopName, setShopName] =
    useState("");

  const [city, setCity] =
    useState("");

  const [district, setDistrict] =
    useState("");

  const [area, setArea] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [bannerImage, setBannerImage] =
    useState("");

  const [logoImage, setLogoImage] =
    useState("");

  // ================= GEOLOCATION =================
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(
          position.coords.latitude
        );

        setLongitude(
          position.coords.longitude
        );
      }
    );
  }, []);

  // ================= FETCH LOCATIONS =================
  useEffect(() => {
    const fetchLocations =
      async () => {
        const { data } =
          await API.get("/locations");

        setLocations(data);
      };

    fetchLocations();
  }, []);

  // ================= CITY CHANGE =================
  const handleCityChange = (
    value: string
  ) => {
    setCity(value);
    setDistrict("");
  };

  // ================= MAP =================
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([
          e.latlng.lat,
          e.latlng.lng,
        ]);
      },
    });

    return position ? (
      <Marker position={position} />
    ) : null;
  };

  // ================= SIGNUP =================
  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } =
        await API.post(
          "/auth/register-seller",
          {
            ownerName,
            shopName,
            city,
            district,
            area,
            address,
            email,
            password,
            phone,
            bannerImage,
            logoImage,
            latitude,
            longitude,

            location: position
              ? {
                  type: "Point",
                  coordinates: [
                    position[1],
                    position[0],
                  ],
                }
              : undefined,
          }
        );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      localStorage.setItem(
        "token",
        data.token
      );

      setUser(data);

      navigate(
        "/seller/dashboard"
      );
    } catch (error: any) {
      console.log(error.response);

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
        className="w-full max-w-6xl bg-white border border-[#eeeeee] rounded-[36px] overflow-hidden shadow-sm"
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
                  Seller Signup
                </p>

                <h2 className="text-4xl font-semibold leading-tight">
                  Create Your
                  <br />
                  Shop Profile
                </h2>

                <p className="text-white/70 mt-6 leading-relaxed">
                  Reach nearby customers
                  and grow your local
                  business with LocalKart.
                </p>
              </div>
            </div>

            {/* LOGIN */}
            <div className="mt-10">
              <p className="text-white/50 text-sm mb-4">
                Already registered?
              </p>

              <Link
                to="/seller/login"
                className="inline-flex items-center justify-center border border-white/20 hover:border-white/40 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300"
              >
                Login Here
              </Link>
            </div>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="p-8 lg:p-10">
            {/* HEADER */}
            <div className="mb-8">
              <p className="uppercase tracking-[0.2em] text-xs text-[#717171] mb-3">
                Registration Form
              </p>

              <h1 className="text-4xl font-semibold tracking-tight text-[#222222]">
                Seller Account
              </h1>
            </div>

            {/* ================= FORM ================= */}
            <form
              onSubmit={handleSignup}
              className="space-y-8"
            >
              {/* BASIC INFO */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Owner Name
                  </label>

                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) =>
                      setOwnerName(
                        e.target.value
                      )
                    }
                    required
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Shop Name
                  </label>

                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) =>
                      setShopName(
                        e.target.value
                      )
                    }
                    required
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition"
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    State
                  </label>

                  <select
                    value={city}
                    onChange={(e) =>
                      handleCityChange(
                        e.target.value
                      )
                    }
                    required
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition bg-white"
                  >
                    <option value="">
                      Select State
                    </option>

                    {Object.keys(
                      locations
                    ).map((state) => (
                      <option
                        key={state}
                        value={state}
                      >
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    District
                  </label>

                  <select
                    value={district}
                    onChange={(e) =>
                      setDistrict(
                        e.target.value
                      )
                    }
                    disabled={!city}
                    required
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition bg-white"
                  >
                    <option value="">
                      Select District
                    </option>

                    {city &&
                      locations[
                        city
                      ]?.map((dist) => (
                        <option
                          key={dist}
                          value={dist}
                        >
                          {dist}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* AREA + PHONE */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Area / Locality
                  </label>

                  <input
                    type="text"
                    value={area}
                    onChange={(e) =>
                      setArea(
                        e.target.value
                      )
                    }
                    required
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition"
                  />
                </div>
              </div>

              {/* ADDRESS */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Address
                </label>

                <input
                  type="text"
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  required
                  className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition"
                />
              </div>

              {/* EMAIL + PASSWORD */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    required
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition"
                  />
                </div>
              </div>

              {/* IMAGE URLS */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Banner Image URL
                  </label>

                  <input
                    type="text"
                    value={bannerImage}
                    onChange={(e) =>
                      setBannerImage(
                        e.target.value
                      )
                    }
                    placeholder="Optional"
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Logo Image URL
                  </label>

                  <input
                    type="text"
                    value={logoImage}
                    onChange={(e) =>
                      setLogoImage(
                        e.target.value
                      )
                    }
                    placeholder="Optional"
                    className="w-full border border-[#dddddd] focus:border-[#222222] rounded-2xl px-5 py-4 outline-none transition"
                  />
                </div>
              </div>

              {/* MAP */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      Shop Location
                    </h3>

                    <p className="text-sm text-[#717171] mt-1">
                      Click on the map to
                      pin your exact shop
                      location.
                    </p>
                  </div>

                  {position && (
                    <div className="bg-[#f7f7f7] px-4 py-2 rounded-xl text-sm text-[#717171]">
                      Selected
                    </div>
                  )}
                </div>

                <div className="h-[300px] rounded-[28px] overflow-hidden border border-[#eeeeee]">
                  <MapContainer
                    center={[
                      20.5937,
                      78.9629,
                    ]}
                    zoom={5}
                    className="h-full w-full"
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <LocationMarker />
                  </MapContainer>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF385C] hover:bg-[#e03150] text-white py-5 rounded-2xl font-medium text-lg transition-all duration-300"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;