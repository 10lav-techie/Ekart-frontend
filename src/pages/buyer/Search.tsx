import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import API from "../../services/api";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

/* ---------- Types ---------- */
interface Product {
  _id: string;
  name: string;
  price: number;
  isNew?: boolean;
  seller: {
    _id: string;
    shopName: string;
    city: string;
    area: string;
  };
}

interface ShopGroup {
  sellerId: string;
  shopName: string;
  city: string;
  area: string;
  products: Product[];
}

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  const [loading, setLoading] = useState(true);
  const [shops, setShops] = useState<ShopGroup[]>([]);

  /* ---------- Fetch Search Results ---------- */
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await API.get(
          `/products/public?search=${query}`
        );

        // Group products by seller
        const grouped: { [key: string]: ShopGroup } = {};

        data.forEach((product: Product) => {
          const sellerId = product.seller._id;

          if (!grouped[sellerId]) {
            grouped[sellerId] = {
              sellerId,
              shopName: product.seller.shopName,
              city: product.seller.city,
              area: product.seller.area,
              products: [],
            };
          }

          grouped[sellerId].products.push(product);
        });

        setShops(Object.values(grouped));
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

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
        {loading ? (
          <p className="text-slate-500">Loading results...</p>
        ) : shops.length === 0 ? (
          <p className="text-slate-500">No results found.</p>
        ) : (
          shops.map((shop) => (
            <div
              key={shop.sellerId}
              className="bg-white rounded-xl shadow-soft p-5"
            >
              {/* SHOP HEADER */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    {shop.shopName}
                  </h2>
                  <p className="text-sm text-muted">
                    📍 {shop.area}, {shop.city}
                  </p>
                </div>

                <Badge variant="open">Open</Badge>
              </div>

              {/* PRODUCTS */}
              <div className="space-y-3">
                {shop.products.map((product) => (
                  <div
                    key={product._id}
                    className="flex justify-between items-center border rounded-lg px-4 py-3 hover:bg-slate-50 transition"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted">
                        ₹{product.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {product.isNew && (
                        <Badge variant="new">New</Badge>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(`/product/${product._id}`)
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
                    navigate(`/shop/${shop.sellerId}`)
                  }
                >
                  View Shop
                </Button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Search;
