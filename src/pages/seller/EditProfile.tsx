
import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../../services/api";

interface Locations {
  [state: string]: string[];
}

const EditProfile = () => {
  const navigate =
    useNavigate();

  // =====================================================
  // STATES
  // =====================================================
  const [loading, setLoading] =
    useState(false);

  const [locations, setLocations] =
    useState<Locations>(
      {}
    );

  // =====================================================
  // FORM STATES
  // =====================================================
  const [
    ownerName,
    setOwnerName,
  ] = useState("");

  const [
    shopName,
    setShopName,
  ] = useState("");

  const [city, setCity] =
    useState("");

  const [
    district,
    setDistrict,
  ] = useState("");

  const [area, setArea] =
    useState("");

  const [
    address,
    setAddress,
  ] = useState("");

  const [phone, setPhone] =
    useState("");

  const [
    bannerImage,
    setBannerImage,
  ] = useState("");

  const [
    logoImage,
    setLogoImage,
  ] = useState("");

  const [lat, setLat] =
    useState<
      number | null
    >(null);

  const [lng, setLng] =
    useState<
      number | null
    >(null);

  // =====================================================
  // FETCH PROFILE + LOCATIONS
  // =====================================================
  useEffect(() => {
    const fetchData =
      async () => {
        try {
          setLoading(true);

          // =====================================================
          // FETCH BOTH APIs
          // =====================================================
          const [
            profileRes,
            locationRes,
          ] =
            await Promise.all(
              [
                API.get(
                  "/auth/profile"
                ),

                API.get(
                  "/locations"
                ),
              ]
            );

          // =====================================================
          // PROFILE DATA
          // =====================================================
          const data =
            profileRes.data;

          setOwnerName(
            data.ownerName ||
              ""
          );

          setShopName(
            data.shopName ||
              ""
          );

          setCity(
            data.city ||
              ""
          );

          setDistrict(
            data.district ||
              ""
          );

          setArea(
            data.area ||
              ""
          );

          setAddress(
            data.address ||
              ""
          );

          setPhone(
            data.phone ||
              ""
          );

          setBannerImage(
            data.bannerImage ||
              ""
          );

          setLogoImage(
            data.logoImage ||
              ""
          );

          // =====================================================
          // COORDINATES
          // =====================================================
          if (
            data.location
              ?.coordinates
          ) {
            setLng(
              data.location
                .coordinates[0]
            );

            setLat(
              data.location
                .coordinates[1]
            );
          }

          // =====================================================
          // LOCATION DROPDOWNS
          // =====================================================
          setLocations(
            locationRes.data
          );

          console.log(
            "LOCATIONS:",
            locationRes.data
          );
        } catch (error) {
          console.log(
            "PROFILE ERROR:",
            error
          );

          alert(
            "Failed to load profile data"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchData();
  }, []);

  // =====================================================
  // CITY CHANGE
  // =====================================================
  const handleCityChange = (
    value: string
  ) => {
    setCity(value);

    setDistrict("");
  };

  // =====================================================
  // GET CURRENT LOCATION
  // =====================================================
  const handleGetLocation =
    () => {
      navigator.geolocation.getCurrentPosition(
        (
          position
        ) => {
          setLat(
            position.coords
              .latitude
          );

          setLng(
            position.coords
              .longitude
          );

          alert(
            "Location updated successfully"
          );
        },

        () => {
          alert(
            "Location permission denied"
          );
        }
      );
    };

  // =====================================================
  // UPDATE PROFILE
  // =====================================================
  const handleUpdate =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        await API.put(
          "/auth/profile",
          {
            ownerName,

            shopName,

            city,

            district,

            area,

            address,

            lat,

            lng,

            phone,

            bannerImage,

            logoImage,
          }
        );

        alert(
          "Profile updated successfully!"
        );

        navigate(
          "/seller/dashboard"
        );
      } catch (error: any) {
        console.log(error);

        alert(
          error.response
            ?.data
            ?.message ||
            "Update failed"
        );
      } finally {
        setLoading(false);
      }
    };

  // =====================================================
  // LOADING UI
  // =====================================================
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#f7f7f7]">
        <p className="text-[#717171] text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================
  return (
    <div className="min-h-screen bg-[#f7f7f7] py-12 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-sm border border-[#ebebeb] overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-8 border-b border-[#ebebeb]">

          <h1 className="text-3xl font-semibold text-[#222222]">
            Edit Shop Profile
          </h1>

          <p className="text-[#717171] mt-2">
            Manage your shop details and branding
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={
            handleUpdate
          }
          className="p-8 space-y-8"
        >

          {/* OWNER + SHOP */}
          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Owner Name"
              value={
                ownerName
              }
              onChange={(e) =>
                setOwnerName(
                  e.target
                    .value
                )
              }
              className="w-full border border-[#dddddd] rounded-2xl px-4 py-4"
            />

            <input
              type="text"
              placeholder="Shop Name"
              value={
                shopName
              }
              onChange={(e) =>
                setShopName(
                  e.target
                    .value
                )
              }
              className="w-full border border-[#dddddd] rounded-2xl px-4 py-4"
            />
          </div>

          {/* LOCATION */}
          <div className="space-y-6">

            <h2 className="text-xl font-semibold">
              Location
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* STATE */}
              <select
                value={city}
                onChange={(e) =>
                  handleCityChange(
                    e.target
                      .value
                  )
                }
                className="w-full border border-[#dddddd] rounded-2xl px-4 py-4 bg-white"
              >
                <option value="">
                  Select State
                </option>

                {Object.keys(
                  locations
                ).map(
                  (
                    state
                  ) => (
                    <option
                      key={
                        state
                      }
                      value={
                        state
                      }
                    >
                      {
                        state
                      }
                    </option>
                  )
                )}
              </select>

              {/* DISTRICT */}
              <select
                value={
                  district
                }
                onChange={(e) =>
                  setDistrict(
                    e.target
                      .value
                  )
                }
                disabled={!city}
                className="w-full border border-[#dddddd] rounded-2xl px-4 py-4 bg-white"
              >
                <option value="">
                  Select District
                </option>

                {city &&
                  locations[
                    city
                  ]?.map(
                    (
                      dist
                    ) => (
                      <option
                        key={
                          dist
                        }
                        value={
                          dist
                        }
                      >
                        {
                          dist
                        }
                      </option>
                    )
                  )}
              </select>
            </div>

            <input
              type="text"
              placeholder="Area / Locality"
              value={area}
              onChange={(e) =>
                setArea(
                  e.target
                    .value
                )
              }
              className="w-full border border-[#dddddd] rounded-2xl px-4 py-4"
            />

            <textarea
              rows={4}
              placeholder="Full Address"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target
                    .value
                )
              }
              className="w-full border border-[#dddddd] rounded-2xl px-4 py-4 resize-none"
            />
          </div>

          {/* COORDINATES */}
          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="number"
              placeholder="Latitude"
              value={
                lat ?? ""
              }
              onChange={(e) =>
                setLat(
                  Number(
                    e.target
                      .value
                  )
                )
              }
              className="w-full border border-[#dddddd] rounded-2xl px-4 py-4"
            />

            <input
              type="number"
              placeholder="Longitude"
              value={
                lng ?? ""
              }
              onChange={(e) =>
                setLng(
                  Number(
                    e.target
                      .value
                  )
                )
              }
              className="w-full border border-[#dddddd] rounded-2xl px-4 py-4"
            />
          </div>

          <button
            type="button"
            onClick={
              handleGetLocation
            }
            className="w-full border border-[#dddddd] py-4 rounded-2xl font-medium hover:border-black transition"
          >
            📍 Use Current Location
          </button>

          {/* BRANDING */}
          <div className="space-y-6">

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target
                    .value
                )
              }
              className="w-full border border-[#dddddd] rounded-2xl px-4 py-4"
            />

            <input
              type="text"
              placeholder="Banner Image URL"
              value={
                bannerImage
              }
              onChange={(e) =>
                setBannerImage(
                  e.target
                    .value
                )
              }
              className="w-full border border-[#dddddd] rounded-2xl px-4 py-4"
            />

            <input
              type="text"
              placeholder="Logo Image URL"
              value={
                logoImage
              }
              onChange={(e) =>
                setLogoImage(
                  e.target
                    .value
                )
              }
              className="w-full border border-[#dddddd] rounded-2xl px-4 py-4"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={
              loading
            }
            className="w-full bg-[#FF385C] hover:bg-[#e11d48] text-white py-4 rounded-2xl font-semibold text-lg transition"
          >
            {loading
              ? "Updating..."
              : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
