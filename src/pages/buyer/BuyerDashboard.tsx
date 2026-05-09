import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../../services/api";

interface OrderItem {
  product: string;

  name: string;

  image: string;

  price: number;

  quantity: number;
}

interface Order {
  _id: string;

  seller: {
    shopName: string;
    city: string;
    area: string;
  };

  items: OrderItem[];

  totalAmount: number;

  pickupDate: string;

  status: string;

  createdAt: string;
}

const BuyerDashboard = () => {
  const navigate =
    useNavigate();

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // FETCH ORDERS
  // =====================================================
  const fetchOrders =
    async () => {
      try {
        const { data } =
          await API.get(
            "/orders/buyer"
          );

        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =====================================================
  // STATUS COLOR
  // =====================================================
  const getStatusStyle =
    (
      status: string
    ) => {
      switch (status) {
        case "pending":
          return "bg-yellow-100 text-yellow-700";

        case "accepted":
          return "bg-blue-100 text-blue-700";

        case "ready":
          return "bg-green-100 text-green-700";

        case "completed":
          return "bg-gray-200 text-gray-700";

        case "cancelled":
          return "bg-red-100 text-red-700";

        default:
          return "bg-gray-100 text-gray-700";
      }
    };

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}
      <div className="bg-white border-b border-[#ebebeb] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              My Orders
            </h1>

            <p className="text-sm text-[#717171] mt-1">
              Track your orders
              and pickup status
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/")
            }
            className="border border-[#dddddd] hover:border-[#222222] px-5 py-2 rounded-full text-sm font-medium transition"
          >
            Explore Shops
          </button>
        </div>
      </div>

      {/* ===================================================== */}
      {/* EMPTY STATE */}
      {/* ===================================================== */}
      {orders.length === 0 ? (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
          <h2 className="text-3xl font-semibold mb-3">
            No orders yet
          </h2>

          <p className="text-[#717171] text-center mb-6">
            Start exploring
            nearby shops and
            place your first
            order.
          </p>

          <button
            onClick={() =>
              navigate("/")
            }
            className="bg-[#FF385C] hover:bg-[#e03150] text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Browse Shops
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-5 py-8">
          {/* ===================================================== */}
          {/* ORDERS */}
          {/* ===================================================== */}
          <div className="space-y-8">
            {orders.map(
              (order) => (
                <div
                  key={
                    order._id
                  }
                  className="bg-white border border-[#ebebeb] rounded-3xl overflow-hidden"
                >
                  {/* HEADER */}
                  <div className="px-6 py-5 border-b border-[#ebebeb] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* LEFT */}
                    <div>
                      <h2 className="text-lg font-semibold">
                        {
                          order
                            .seller
                            .shopName
                        }
                      </h2>

                      <p className="text-sm text-[#717171] mt-1">
                        {
                          order
                            .seller
                            .city
                        }
                        ,{" "}
                        {
                          order
                            .seller
                            .area
                        }
                      </p>

                      <p className="text-xs text-[#999999] mt-2">
                        Ordered on{" "}
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col items-start md:items-end gap-3">
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {
                          order.status
                        }
                      </div>

                      <p className="text-sm text-[#717171]">
                        Pickup:{" "}
                        {new Date(
                          order.pickupDate
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="divide-y divide-[#ebebeb]">
                    {order.items.map(
                      (
                        item,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="p-5 flex gap-5"
                        >
                          {/* IMAGE */}
                          <img
                            src={
                              item.image
                            }
                            alt={
                              item.name
                            }
                            className="w-24 h-24 rounded-2xl object-cover bg-[#f7f7f7]"
                          />

                          {/* INFO */}
                          <div className="flex-1">
                            <h3 className="font-medium text-lg">
                              {
                                item.name
                              }
                            </h3>

                            <p className="text-[#717171] mt-1">
                              ₹
                              {
                                item.price
                              }{" "}
                              ×{" "}
                              {
                                item.quantity
                              }
                            </p>
                          </div>

                          {/* TOTAL */}
                          <div className="font-semibold text-lg">
                            ₹
                            {item.price *
                              item.quantity}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* FOOTER */}
                  <div className="px-6 py-5 border-t border-[#ebebeb] flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#717171]">
                        Order ID
                      </p>

                      <p className="text-xs text-[#999999] mt-1">
                        {
                          order._id
                        }
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-[#717171]">
                        Total
                      </p>

                      <p className="text-2xl font-semibold mt-1">
                        ₹
                        {
                          order.totalAmount
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;