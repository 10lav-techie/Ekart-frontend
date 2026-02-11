import { useNavigate, useParams } from "react-router-dom";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

/**
 * TEMP MOCK PRODUCT
 * -----------------
 * Will be replaced by API data later
 */
const mockProduct = {
  id: "p1",
  name: "Amul Milk (500ml)",
  price: 56,
  description:
    "Fresh Amul milk available daily. Best before 24 hours. Stored in hygienic conditions.",
  tag: "new",
  image:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  shop: {
    id: "1",
    name: "Sharma General Store",
    distance: "1.2 km",
    isOpen: true,
    address: "Sector 15, Noida",
    phone: "+91 9876543210",
  },
};

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-surface">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <h1 className="text-lg font-semibold">
            Product Details
          </h1>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div className="bg-white rounded-xl shadow-soft p-4">
          <img
            src={mockProduct.image}
            alt={mockProduct.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* DETAILS */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-semibold">
              {mockProduct.name}
            </h2>
            {mockProduct.tag === "new" && (
              <Badge variant="new">New</Badge>
            )}
            {mockProduct.tag === "top" && (
              <Badge variant="top">Top</Badge>
            )}
          </div>

          <p className="text-2xl font-bold mb-3">
            ₹{mockProduct.price}
          </p>

          <p className="text-sm text-muted mb-6">
            {mockProduct.description}
          </p>

          {/* SHOP INFO */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-2">
              Available at
            </h3>

            <p className="font-medium">
              {mockProduct.shop.name}
            </p>
            <p className="text-sm text-muted">
              {mockProduct.shop.address} •{" "}
              {mockProduct.shop.distance}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <Badge
                variant={
                  mockProduct.shop.isOpen ? "open" : "closed"
                }
              >
                {mockProduct.shop.isOpen
                  ? "Open Now"
                  : "Closed"}
              </Badge>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() =>
                  window.open(
                    `tel:${mockProduct.shop.phone}`
                  )
                }
              >
                Call Shop
              </Button>

              <Button variant="outline">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
