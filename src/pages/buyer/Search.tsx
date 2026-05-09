
import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import API from "../../services/api";

import Badge from "../../components/common/Badge";

import Button from "../../components/common/Button";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

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

/* ===================================================== */
/* COMPONENT */
/* ===================================================== */

const Search = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  // =====================================================
  // QUERY PARAM
  // =====================================================
  const params =
    new URLSearchParams(
      location.search
    );

  const query =
    params.get("query") ||
    "";

  // =====================================================
  // STATES
  // =====================================================
  const [loading, setLoading] =
    useState(true);

  const [shops, setShops] =
    useState<ShopGroup[]>(
      []
    );

  const [
    locationEnabled,
    setLocationEnabled,
  ] = useState(false);

  // =====================================================
  // FETCH RESULTS
  // =====================================================
  useEffect(() => {
    const fetchResults =
      async (
        lat?: number,
        lng?: number
      ) => {
        try {
          setLoading(true);

          // =====================================================
          // URL
          // =====================================================
          let url =
            `/products/public?search=${query}`;

          // =====================================================
          // LOCATION FILTER
          // =====================================================
          if (
            lat &&
            lng
          ) {
            url +=
              `&lat=${lat}&lng=${lng}&radius=30000`;

            setLocationEnabled(
              true
            );
          }

          // =====================================================
          // API REQUEST
          // =====================================================
          const { data } =
            await API.get(
              url
            );

          // =====================================================
          // GROUP PRODUCTS BY SHOP
          // =====================================================
          const grouped: {
            [key: string]:
              ShopGroup;
          } = {};

          data.forEach(
            (
              product: Product
            ) => {
              const sellerId =
                product
                  .seller
                  ._id;

              if (
                !grouped[
                  sellerId
                ]
              ) {
                grouped[
                  sellerId
                ] = {
                  sellerId,

                  shopName:
                    product
                      .seller
                      .shopName,

                  city:
                    product
                      .seller
                      .city,

                  area:
                    product
                      .seller
                      .area,

                  products:
                    [],
                };
              }

              grouped[
                sellerId
              ].products.push(
                product
              );
            }
          );

          setShops(
            Object.values(
              grouped
            )
          );
        } catch (error) {
          console.error(
            "Search error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    // =====================================================
    // GET USER LOCATION
    // =====================================================
    navigator.geolocation.getCurrentPosition(
      (
        position
      ) => {
        fetchResults(
          position.coords
            .latitude,

          position.coords
            .longitude
        );
      },

      () => {
        // fallback search
        fetchResults();
      }
    );
  }, [query]);

  // =====================================================
  // UI
  // =====================================================
  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <header className="bg-white shadow-sm border-b border-[#ebebeb]">

        <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-2xl font-semibold text-[#222222]">
              Results for “
              {query}
              ”
            </h1>

            <p className="text-sm text-[#717171] mt-1">

              {locationEnabled
                ? "Showing nearby shops within 30km"
                : "Showing all available shops"}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              navigate(-1)
            }
          >
            Back
          </Button>
        </div>
      </header>

      {/* ===================================================== */}
      {/* RESULTS */}
      {/* ===================================================== */}

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-20">

            <p className="text-[#717171] text-lg">
              Loading nearby shops...
            </p>
          </div>
        ) : shops.length ===
          0 ? (

          /* EMPTY */
          <div className="bg-white rounded-3xl border border-[#ebebeb] p-16 text-center">

            <h2 className="text-2xl font-semibold mb-3">
              No shops found
            </h2>

            <p className="text-[#717171]">
              Try another search term.
            </p>
          </div>
        ) : (

          /* SHOPS */
          shops.map(
            (shop) => (
              <div
                key={
                  shop.sellerId
                }
                className="bg-white rounded-3xl border border-[#ebebeb] p-6 shadow-sm"
              >

                {/* SHOP HEADER */}
                <div className="flex justify-between items-start mb-5">

                  <div>

                    <h2 className="text-2xl font-semibold text-[#222222]">
                      {
                        shop.shopName
                      }
                    </h2>

                    <p className="text-sm text-[#717171] mt-1">
                      📍{" "}
                      {
                        shop.area
                      }
                      ,{" "}
                      {
                        shop.city
                      }
                    </p>
                  </div>

                  <Badge variant="open">
                    Open
                  </Badge>
                </div>

                {/* PRODUCTS */}
                <div className="space-y-3">

                  {shop.products.map(
                    (
                      product
                    ) => (
                      <div
                        key={
                          product._id
                        }
                        className="flex justify-between items-center border border-[#ebebeb] rounded-2xl px-5 py-4 hover:bg-[#fafafa] transition"
                      >

                        <div>

                          <p className="font-medium text-[#222222]">
                            {
                              product.name
                            }
                          </p>

                          <p className="text-sm text-[#717171] mt-1">
                            ₹
                            {
                              product.price
                            }
                          </p>
                        </div>

                        <div className="flex items-center gap-3">

                          {product.isNew && (
                            <Badge variant="new">
                              New
                            </Badge>
                          )}

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              navigate(
                                `/product/${product._id}`
                              )
                            }
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* SHOP BUTTON */}
                <div className="mt-6 text-right">

                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(
                        `/shop/${shop.sellerId}`
                      )
                    }
                  >
                    View Shop
                  </Button>
                </div>
              </div>
            )
          )
        )}
      </main>
    </div>
  );
};

export default Search;