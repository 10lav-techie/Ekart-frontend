import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import API from "../../services/api";

interface Locations {
  [state: string]: string[];
}

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Locations>({});

  const [ownerName, setOwnerName] = useState("");
  const [shopName, setShopName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  // Fetch locations once
  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await API.get("/locations");
      console.log("Locations from backend:", data);
      setLocations(data);
    };

    fetchLocations();
  }, []);

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict(""); // Reset district when state changes
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/seller/register", {
        ownerName,
        shopName,
        city,
        district,
        area,
        address,
        email,
        password,
      });

      localStorage.setItem("seller", JSON.stringify(data));
      navigate("/seller/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <h2 className="text-xl font-semibold mb-1">
        Register Your Shop
      </h2>

      <p className="text-sm text-slate-500 mb-6">
        Create a free account to list your products
      </p>

      <form onSubmit={handleSignup} className="space-y-4">

        <Input
          label="Owner Name"
          placeholder="Your name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />

        <Input
          label="Shop Name"
          placeholder="Sharma General Store"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          required
        />

        {/* State Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">
            State
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
            value={city}
            onChange={(e) => handleCityChange(e.target.value)}
            required
          >
            <option value="">Select State</option>
            {Object.keys(locations).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">
            District
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            disabled={!city}
            required
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

        <Input
          label="Area / Locality"
          placeholder="Karol Bagh"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
        <Input
          label="Full Address"
          placeholder="Shop No. 12, Main Market, Near Metro Station"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <Input
          label="Email address"
          type="email"
          placeholder="shop@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
        >
          Create Account
        </Button>
      </form>

      <p className="text-sm text-center mt-6">
        Already registered?{" "}
        <Link
          to="/seller/login"
          className="text-blue-600 font-medium hover:underline"
        >
          Login here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
