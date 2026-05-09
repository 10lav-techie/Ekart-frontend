import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import API from "../services/api";

import { AuthContext } from "./AuthContext";

// =====================================================
// TYPES
// =====================================================
interface CartItem {
  product: any;

  seller: any;

  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];

  cartCount: number;

  loading: boolean;

  fetchCart: () => Promise<void>;

  addToCart: (
    productId: string,
    quantity?: number
  ) => Promise<void>;

  removeFromCart: (
    productId: string
  ) => Promise<void>;

  updateQuantity: (
    productId: string,
    quantity: number
  ) => Promise<void>;

  clearCart: () => Promise<void>;
}

// =====================================================
// CONTEXT
// =====================================================
export const CartContext =
  createContext<CartContextType>(
    {
      cartItems: [],

      cartCount: 0,

      loading: false,

      fetchCart:
        async () => {},

      addToCart:
        async () => {},

      removeFromCart:
        async () => {},

      updateQuantity:
        async () => {},

      clearCart:
        async () => {},
    }
  );

// =====================================================
// PROVIDER
// =====================================================
export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } =
    useContext(AuthContext);

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  const [loading, setLoading] =
    useState(false);

  // =====================================================
  // FETCH CART
  // =====================================================
  const fetchCart =
    async () => {
      try {
        // ONLY BUYERS
        if (
          user?.role !==
          "buyer"
        ) {
          setCartItems([]);

          return;
        }

        setLoading(true);

        const { data } =
          await API.get(
            "/cart"
          );

        setCartItems(
          data.items || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  // =====================================================
  // AUTO FETCH
  // =====================================================
  useEffect(() => {
    fetchCart();
  }, [user]);

  // =====================================================
  // ADD TO CART
  // =====================================================
  const addToCart =
    async (
      productId: string,
      quantity = 1
    ) => {
      try {
        await API.post(
          "/cart/add",
          {
            productId,
            quantity,
          }
        );

        await fetchCart();
      } catch (error) {
        console.log(error);

        throw error;
      }
    };

  // =====================================================
  // REMOVE
  // =====================================================
  const removeFromCart =
    async (
      productId: string
    ) => {
      try {
        await API.delete(
          `/cart/remove/${productId}`
        );

        await fetchCart();
      } catch (error) {
        console.log(error);

        throw error;
      }
    };

  // =====================================================
  // UPDATE QUANTITY
  // =====================================================
  const updateQuantity =
    async (
      productId: string,
      quantity: number
    ) => {
      try {
        await API.put(
          "/cart/update",
          {
            productId,
            quantity,
          }
        );

        await fetchCart();
      } catch (error) {
        console.log(error);

        throw error;
      }
    };

  // =====================================================
  // CLEAR CART
  // =====================================================
  const clearCart =
    async () => {
      try {
        await API.delete(
          "/cart/clear"
        );

        setCartItems([]);
      } catch (error) {
        console.log(error);

        throw error;
      }
    };

  // =====================================================
  // CART COUNT
  // =====================================================
  const cartCount =
    cartItems.reduce(
      (acc, item) =>
        acc + item.quantity,

      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,

        cartCount,

        loading,

        fetchCart,

        addToCart,

        removeFromCart,

        updateQuantity,

        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};