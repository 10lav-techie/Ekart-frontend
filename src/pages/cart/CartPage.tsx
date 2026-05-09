import {
  useMemo,
  useState,
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../../services/api";

import {
  CartContext,
} from "../../context/CartContext";

interface CartItem {
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };

  seller: {
    _id: string;
    shopName: string;
    city: string;
    area: string;
  };

  quantity: number;
}

const CartPage = () => {
  const navigate =
    useNavigate();

  const {
    cartItems: cart,
    loading,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useContext(
    CartContext
  );

  const [
    pickupDate,
    setPickupDate,
  ] = useState("");

  const [
    placingOrder,
    setPlacingOrder,
  ] = useState(false);

  // =====================================================
  // GROUP BY SELLER
  // =====================================================
  const groupedCart =
    useMemo(() => {
      const grouped: any =
        {};

      cart.forEach((item) => {
        const sellerId =
          item.seller._id;

        if (
          !grouped[sellerId]
        ) {
          grouped[sellerId] = {
            seller:
              item.seller,

            items: [],
          };
        }

        grouped[
          sellerId
        ].items.push(item);
      });

      return grouped;
    }, [cart]);

  // =====================================================
  // TOTAL
  // =====================================================
  const total =
    useMemo(() => {
      return cart.reduce(
        (acc, item) =>
          acc +
          item.product.price *
            item.quantity,

        0
      );
    }, [cart]);

  // =====================================================
  // PLACE ORDER
  // =====================================================
  const placeOrder =
    async () => {
      if (!pickupDate) {
        return alert(
          "Please select pickup date"
        );
      }

      try {
        setPlacingOrder(
          true
        );

        await API.post(
          "/orders/place",
          {
            pickupDate,
          }
        );

        alert(
          "Order placed successfully"
        );

        // CLEAR GLOBAL CART
        await clearCart();

        navigate(
          "/buyer/dashboard"
        );
      } catch (error: any) {
        alert(
          error.response?.data
            ?.message ||
            "Order failed"
        );
      } finally {
        setPlacingOrder(
          false
        );
      }
    };

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        Loading cart...
      </div>
    );
  }

  // =====================================================
  // EMPTY CART
  // =====================================================
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-semibold mb-3">
          Your cart is empty
        </h1>

        <p className="text-[#717171] mb-6 text-center">
          Add products from
          nearby shops to place
          orders.
        </p>

        <button
          onClick={() =>
            navigate("/")
          }
          className="bg-[#FF385C] hover:bg-[#e03150] text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Explore Shops
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}
      <div className="border-b border-[#ebebeb] sticky top-0 bg-white z-30">

        <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-semibold">
              Your Cart
            </h1>

            <p className="text-sm text-[#717171] mt-1">
              Review products
              before placing order
            </p>
          </div>

          <button
            onClick={() =>
              navigate(-1)
            }
            className="border border-[#dddddd] hover:border-[#222222] px-5 py-2 rounded-full text-sm font-medium transition"
          >
            Back
          </button>
        </div>
      </div>

      {/* ===================================================== */}
      {/* CONTENT */}
      {/* ===================================================== */}
      <div className="max-w-7xl mx-auto px-5 py-8 grid lg:grid-cols-[1fr_360px] gap-10">

        {/* ===================================================== */}
        {/* LEFT */}
        {/* ===================================================== */}
        <div className="space-y-8">

          {Object.values(
            groupedCart
          ).map(
            (
              group: any,
              index
            ) => (
              <div
                key={index}
                className="bg-white border border-[#ebebeb] rounded-3xl overflow-hidden"
              >

                {/* ===================================================== */}
                {/* SHOP HEADER */}
                {/* ===================================================== */}
                <div className="px-6 py-5 border-b border-[#ebebeb] bg-[#fafafa]">

                  <h2 className="text-lg font-semibold">
                    {
                      group.seller
                        .shopName
                    }
                  </h2>

                  <p className="text-sm text-[#717171] mt-1">
                    {
                      group.seller
                        .city
                    }
                    ,{" "}
                    {
                      group.seller
                        .area
                    }
                  </p>
                </div>

                {/* ===================================================== */}
                {/* ITEMS */}
                {/* ===================================================== */}
                <div className="divide-y divide-[#ebebeb]">

                  {group.items.map(
                    (
                      item: CartItem
                    ) => (
                      <div
                        key={
                          item
                            .product
                            ._id
                        }
                        className="p-5 flex gap-5"
                      >

                        {/* IMAGE */}
                        <img
                          src={
                            item
                              .product
                              .image
                          }
                          alt={
                            item
                              .product
                              .name
                          }
                          className="w-28 h-28 rounded-2xl object-cover bg-[#f7f7f7]"
                        />

                        {/* ===================================================== */}
                        {/* INFO */}
                        {/* ===================================================== */}
                        <div className="flex-1 flex flex-col justify-between">

                          <div>
                            <h3 className="font-medium text-lg">
                              {
                                item
                                  .product
                                  .name
                              }
                            </h3>

                            <p className="text-[#717171] mt-1">
                              ₹
                              {
                                item
                                  .product
                                  .price
                              }
                            </p>
                          </div>

                          {/* ACTIONS */}
                          <div className="flex items-center justify-between mt-4">

                            {/* QUANTITY */}
                            <div className="flex items-center border border-[#dddddd] rounded-full overflow-hidden">

                              {/* MINUS */}
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item
                                      .product
                                      ._id,

                                    Math.max(
                                      1,
                                      item.quantity -
                                        1
                                    )
                                  )
                                }
                                className="w-10 h-10 hover:bg-[#f7f7f7] transition"
                              >
                                −
                              </button>

                              {/* COUNT */}
                              <span className="w-10 text-center text-sm font-medium">
                                {
                                  item.quantity
                                }
                              </span>

                              {/* PLUS */}
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item
                                      .product
                                      ._id,

                                    item.quantity +
                                      1
                                  )
                                }
                                className="w-10 h-10 hover:bg-[#f7f7f7] transition"
                              >
                                +
                              </button>
                            </div>

                            {/* REMOVE */}
                            <button
                              onClick={() =>
                                removeFromCart(
                                  item
                                    .product
                                    ._id
                                )
                              }
                              className="text-sm text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* ===================================================== */}
                        {/* TOTAL */}
                        {/* ===================================================== */}
                        <div className="font-semibold text-lg">
                          ₹
                          {item.product.price *
                            item.quantity}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* ===================================================== */}
        {/* RIGHT SIDEBAR */}
        {/* ===================================================== */}
        <div className="h-fit sticky top-28">

          <div className="bg-white border border-[#ebebeb] rounded-3xl p-6">

            <h2 className="text-xl font-semibold mb-6">
              Order Summary
            </h2>

            {/* ===================================================== */}
            {/* PICKUP DATE */}
            {/* ===================================================== */}
            <div className="mb-6">

              <label className="block text-sm font-medium mb-2">
                Pickup Date
              </label>

              <input
                type="datetime-local"
                value={
                  pickupDate
                }
                onChange={(e) =>
                  setPickupDate(
                    e.target.value
                  )
                }
                className="w-full border border-[#dddddd] rounded-xl px-4 py-3 outline-none focus:border-[#222222]"
              />
            </div>

            {/* ===================================================== */}
            {/* TOTAL */}
            {/* ===================================================== */}
            <div className="flex items-center justify-between text-lg font-semibold mb-6">

              <span>Total</span>

              <span>
                ₹{total}
              </span>
            </div>

            {/* ===================================================== */}
            {/* BUTTON */}
            {/* ===================================================== */}
            <button
              onClick={
                placeOrder
              }
              disabled={
                placingOrder
              }
              className="w-full bg-[#FF385C] hover:bg-[#e03150] disabled:opacity-60 text-white py-4 rounded-2xl font-medium transition"
            >
              {placingOrder
                ? "Placing Order..."
                : "Place Order"}
            </button>

            {/* NOTE */}
            <p className="text-xs text-[#717171] mt-4 text-center leading-relaxed">
              Separate orders will
              be created for
              different shops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;