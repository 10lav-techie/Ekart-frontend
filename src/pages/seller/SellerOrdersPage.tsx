import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

interface Buyer {
  name: string;
  email: string;
}

interface OrderItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;

  buyer: Buyer;

  items: OrderItem[];

  pickupDate: string;

  totalAmount: number;

  status: string;

  createdAt: string;

  note?: string;
}

const SellerOrdersPage = () => {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState("");

  // =====================================================
  // FETCH ORDERS
  // =====================================================
  const fetchOrders =
    async () => {
      try {
        const { data } =
          await API.get(
            "/orders/seller"
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
  // UPDATE STATUS
  // =====================================================
  const updateStatus =
    async (
      orderId: string,
      status: string
    ) => {
      try {
        setUpdatingId(
          orderId
        );

        await API.put(
          `/orders/status/${orderId}`,
          {
            status,
          }
        );

        fetchOrders();
      } catch (error) {
        console.log(error);
      } finally {
        setUpdatingId("");
      }
    };

  // =====================================================
  // STATUS STYLES
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
        <div className="max-w-7xl mx-auto px-5 py-5">
          <h1 className="text-2xl font-semibold">
            Incoming Orders
          </h1>

          <p className="text-sm text-[#717171] mt-1">
            Manage customer pickup orders
          </p>
        </div>
      </div>

      {/* ===================================================== */}
      {/* EMPTY */}
      {/* ===================================================== */}
      {orders.length === 0 ? (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-3">
              No incoming orders
            </h2>

            <p className="text-[#717171]">
              Customer orders will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-5 py-8">
          <div className="space-y-8">
            {orders.map(
              (order) => (
                <div
                  key={
                    order._id
                  }
                  className="bg-white border border-[#ebebeb] rounded-3xl overflow-hidden"
                >
                  {/* ===================================================== */}
                  {/* TOP */}
                  {/* ===================================================== */}
                  <div className="px-6 py-5 border-b border-[#ebebeb] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    {/* BUYER */}
                    <div>
                      <h2 className="text-lg font-semibold">
                        {
                          order
                            .buyer
                            .name
                        }
                      </h2>

                      <p className="text-sm text-[#717171] mt-1">
                        {
                          order
                            .buyer
                            .email
                        }
                      </p>

                      <p className="text-xs text-[#999999] mt-2">
                        Ordered on{" "}
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {/* STATUS */}
                    <div className="flex flex-col items-start lg:items-end gap-3">
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

                  {/* ===================================================== */}
                  {/* ITEMS */}
                  {/* ===================================================== */}
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

                  {/* ===================================================== */}
                  {/* NOTE */}
                  {/* ===================================================== */}
                  {order.note && (
                    <div className="px-6 py-5 border-t border-[#ebebeb] bg-[#fafafa]">
                      <p className="text-sm font-medium mb-2">
                        Customer Note
                      </p>

                      <p className="text-sm text-[#717171] leading-relaxed">
                        {
                          order.note
                        }
                      </p>
                    </div>
                  )}

                  {/* ===================================================== */}
                  {/* FOOTER */}
                  {/* ===================================================== */}
                  <div className="px-6 py-5 border-t border-[#ebebeb] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    {/* TOTAL */}
                    <div>
                      <p className="text-sm text-[#717171]">
                        Order Total
                      </p>

                      <p className="text-2xl font-semibold mt-1">
                        ₹
                        {
                          order.totalAmount
                        }
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-3">
                      {order.status ===
                        "pending" && (
                        <>
                          <button
                            disabled={
                              updatingId ===
                              order._id
                            }
                            onClick={() =>
                              updateStatus(
                                order._id,
                                "accepted"
                              )
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-medium transition"
                          >
                            Accept
                          </button>

                          <button
                            disabled={
                              updatingId ===
                              order._id
                            }
                            onClick={() =>
                              updateStatus(
                                order._id,
                                "cancelled"
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl text-sm font-medium transition"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {order.status ===
                        "accepted" && (
                        <button
                          disabled={
                            updatingId ===
                            order._id
                          }
                          onClick={() =>
                            updateStatus(
                              order._id,
                              "ready"
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl text-sm font-medium transition"
                        >
                          Mark Ready
                        </button>
                      )}

                      {order.status ===
                        "ready" && (
                        <button
                          disabled={
                            updatingId ===
                            order._id
                          }
                          onClick={() =>
                            updateStatus(
                              order._id,
                              "completed"
                            )
                          }
                          className="bg-black hover:bg-[#222222] text-white px-5 py-3 rounded-xl text-sm font-medium transition"
                        >
                          Complete
                        </button>
                      )}
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

export default SellerOrdersPage;