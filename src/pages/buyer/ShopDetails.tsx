import { useNavigate, useParams } from "react-router-dom";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

/**
 * TEMP MOCK SHOP DATA
 * ------------------
 * Will be replaced by backend API later
 */
const mockShop = {
  id: "1",
  name: "Sharma General Store",
  category: "Grocery",
  address: "Sector 15, Noida",
  distance: "1.2 km",
  isOpen: true,
  openTime: "9:00 AM",
  closeTime: "10:00 PM",
  phone: "+91 9876543210",
  products: [
    {
      id: "p1",
      name: "Amul Milk",
      price: 56,
      tag: "new",
    },
    {
      id: "p2",
      name: "Tata Salt",
      price: 28,
      tag: "top",
    },
    {
      id: "p3",
      name: "Fortune Oil",
      price: 165,
    },
  ],
};

const ShopDetails = () => {
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
            Shop Details
          </h1>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* SHOP INFO */}
        <section className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold">
                {mockShop.name}
              </h2>
              <p className="text-sm text-muted">
                {mockShop.category} • {mockShop.distance}
              </p>
              <p className="text-sm text-muted mt-1">
                {mockShop.address}
              </p>
            </div>

            <Badge variant={mockShop.isOpen ? "open" : "closed"}>
              {mockShop.isOpen ? "Open Now" : "Closed"}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <Badge>
              Timings: {mockShop.openTime} –{" "}
              {mockShop.closeTime}
            </Badge>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={() =>
                window.open(`tel:${mockShop.phone}`)
              }
            >
              Call Shop
            </Button>

            <Button variant="outline">
              Get Directions
            </Button>
          </div>
        </section>

        {/* PRODUCTS */}
        <section>
          <h3 className="text-lg font-semibold mb-4">
            Products Available
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mockShop.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-soft p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">
                    {product.name}
                  </h4>

                  {product.tag === "new" && (
                    <Badge variant="new">New</Badge>
                  )}
                  {product.tag === "top" && (
                    <Badge variant="top">Top</Badge>
                  )}
                </div>

                <p className="text-sm text-muted mb-4">
                  ₹{product.price}
                </p>

                <Button
                  size="sm"
                  fullWidth
                  variant="outline"
                  onClick={() =>
                    navigate(
                      `/buyer/product/${product.id}`
                    )
                  }
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShopDetails;
