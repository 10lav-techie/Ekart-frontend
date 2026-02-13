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
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // NEW OPTIONAL FIELDS
  const [phone, setPhone] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [logoImage, setLogoImage] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await API.get("/locations");
      setLocations(data);
    };
    fetchLocations();
  }, []);

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict("");
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
        phone,
        bannerImage,
        logoImage,
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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Create Your Shop Account
        </h2>
        <p className="text-slate-500 mt-2 text-sm">
          Join the marketplace and start listing your products today.
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-5">

        <Input
          label="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />

        <Input
          label="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          required
        />

        {/* Location */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-sm font-medium mb-4">Shop Location</p>

          <select
            className="w-full mb-4 px-4 py-3 rounded-xl border"
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

          <select
            className="w-full px-4 py-3 rounded-xl border"
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
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />

        <Input
          label="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        {/* NEW OPTIONAL FIELDS */}

        <Input
          label="Phone Number (Optional)"
          placeholder="+91 9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          label="Shop Banner Image URL (Optional)"
          placeholder="Paste banner image link"
          value={bannerImage}
          onChange={(e) => setBannerImage(e.target.value)}
        />

        <Input
          label="Shop Logo Image URL (Optional)"
          placeholder="Paste logo image link"
          value={logoImage}
          onChange={(e) => setLogoImage(e.target.value)}
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
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

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Already registered?{" "}
          <Link
            to="/seller/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;
