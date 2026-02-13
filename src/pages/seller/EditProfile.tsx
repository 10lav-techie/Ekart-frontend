import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

interface Locations {
  [state: string]: string[];
}

const EditProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Locations>({});

  const [ownerName, setOwnerName] = useState("");
  const [shopName, setShopName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [logoImage, setLogoImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [profileRes, locationRes] = await Promise.all([
        API.get("/seller/profile"),
        API.get("/locations"),
      ]);

      const data = profileRes.data;

      setOwnerName(data.ownerName);
      setShopName(data.shopName);
      setCity(data.city);
      setDistrict(data.district);
      setArea(data.area);
      setAddress(data.address);
      setPhone(data.phone || "");
      setBannerImage(data.bannerImage || "");
      setLogoImage(data.logoImage || "");

      setLocations(locationRes.data);
    };

    fetchData();
  }, []);

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict("");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.put("/seller/profile", {
        ownerName,
        shopName,
        city,
        district,
        area,
        address,
        phone,
        bannerImage,
        logoImage,
      });

      alert("Profile updated successfully!");
      navigate("/seller/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Update failed");
    }

    setLoading(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">

        <h2 className="text-3xl font-bold mb-8 text-slate-800">
          Edit Shop Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Shop Name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />

          {/* Location Section */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-sm font-medium mb-4">
              Shop Location
            </p>

            <select
              className="w-full mb-4 p-3 rounded-xl border"
              value={city}
              onChange={(e) =>
                handleCityChange(e.target.value)
              }
            >
              <option value="">Select State</option>
              {Object.keys(locations).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <select
              className="w-full p-3 rounded-xl border"
              value={district}
              onChange={(e) =>
                setDistrict(e.target.value)
              }
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
          </div>

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Area / Locality"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />

          <textarea
            className="w-full border p-3 rounded-xl"
            placeholder="Full Address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Optional Branding Fields */}
          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Phone Number (Optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Banner Image URL (Optional)"
            value={bannerImage}
            onChange={(e) =>
              setBannerImage(e.target.value)
            }
          />

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Logo Image URL (Optional)"
            value={logoImage}
            onChange={(e) =>
              setLogoImage(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
