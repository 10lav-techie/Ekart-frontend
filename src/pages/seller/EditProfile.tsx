import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const EditProfile = () => {
  const navigate = useNavigate();

  const [ownerName, setOwnerName] = useState("");
  const [shopName, setShopName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await API.get("/seller/profile");

      setOwnerName(data.ownerName);
      setShopName(data.shopName);
      setCity(data.city);
      setDistrict(data.district);
      setArea(data.area);
      setAddress(data.address);
    };

    fetchProfile();
  }, []);

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
      });

      navigate("/seller/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Update failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-5">

        <input
          className="w-full border p-3 rounded-xl"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded-xl"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded-xl"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded-xl"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded-xl"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded-xl"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
