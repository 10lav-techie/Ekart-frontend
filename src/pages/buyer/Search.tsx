import { useLocation, useNavigate } from "react-router-dom";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

/**
 * TEMP MOCK DATA
 * --------------
 * Later this will come from backend (API)
 */
const mockResults = [
  {
    shopId: "1",
    shopName: "Sharma General Store",
    distance: "1.2 km",
    isOpen: true,
    products: [
      {
        id: "p1",
        name: "Amul Milk",
        price: 56,
        tag: "new",
      },
      {
        id: "p2",
        name: "Mother Dairy Milk",
        price: 54,
        tag: "top",
      },
    ],
  },
  {
    shopId: "2",
    shopName: "Gupta Grocery",
    distance: "2.8 km",
    isOpen: false,
    products: [
      {
        id: "p3",
        name: "Tata Salt",
        price: 28,
      },
    ],
  },
];

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get("query") || params.get("category");

  return (
    <div className="min-h-screen bg-surface">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">
              Results for “{query}”
            </h1>
            <p className="text-sm text-muted">
              Shops near your location
            </p>
          </div>

          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </header>

      {/* RESULTS */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {mockResults.map((shop) => (
          <div
            key={shop.shopId}
            className="bg-white rounded-xl shadow-soft p-5"
          >
            {/* SHOP HEADER */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {shop.shopName}
                </h2>
                <p className="text-sm text-muted">
                  {shop.distance} away
                </p>
              </div>

              <Badge variant={shop.isOpen ? "open" : "closed"}>
                {shop.isOpen ? "Open Now" : "Closed"}
              </Badge>
            </div>

            {/* PRODUCTS */}
            <div className="space-y-3">
              {shop.products.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center border rounded-lg px-4 py-3 hover:bg-slate-50 transition"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted">
                      ₹{product.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {product.tag === "new" && (
                      <Badge variant="new">New</Badge>
                    )}
                    {product.tag === "top" && (
                      <Badge variant="top">Top</Badge>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(`/buyer/product/${product.id}`)
                      }
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* SHOP ACTION */}
            <div className="mt-4 text-right">
              <Button
                size="sm"
                onClick={() =>
                  navigate(`/buyer/shop/${shop.shopId}`)
                }
              >
                View Shop
              </Button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Search;
