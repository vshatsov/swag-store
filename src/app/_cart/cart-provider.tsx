/** @format */

"use client";

import { CartItemWithProduct, CartWithProducts } from "@/lib/api-client";
import {
  createContext,
  useContext,
  ReactNode,
  useTransition,
  useOptimistic,
  useState,
  useMemo,
} from "react";
import { updateCartItem } from "./update-cart-action";
import { addToCartAction } from "./add-to-cart-action";
import { accumulateDebounce } from "@/lib/utils";

interface CartContextType {
  cartData: CartWithProducts | null;
  optimisticCartData: CartWithProducts | null;
  pending: boolean;
  updateCartData: (newCart: CartWithProducts) => void;
  addToCart: (updateCartItemBody: CartItemWithProduct) => void;
  updateQuantity: (updateCartItemBody: CartItemWithProduct) => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartData] = useState<CartWithProducts | null>(null);
  const [pending, startTransition] = useTransition();

  const [optimisticCart, optimisticChangeProductQuantity] = useOptimistic(
    cartData,
    (
      state: CartWithProducts | null,
      cartItemWithProduct: CartItemWithProduct,
    ) => {
      let newState = { ...state };
      const { productId, quantity, product } = cartItemWithProduct;
      const items = state?.items || [];
      const foundProduct = items.find((it) => it?.productId === productId);
      if (!foundProduct) {
        // temporary item
        items.push({
          productId,
          quantity: 0,
          product,
        });
      }
      const updatedItems = items
        .map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        )
        .filter((item) => (item.quantity || 0) > 0) as CartItemWithProduct[];

      newState = {
        ...newState,
        items: updatedItems,
        subtotal: updatedItems.reduce(
          (sum: number, item: CartItemWithProduct) =>
            sum + (item?.product?.price || 0) * (item.quantity || 0),
          0,
        ),
      };
      return newState;
    },
  );

  const accumulatedUpdateCartItem = useMemo(
    () =>
      accumulateDebounce(
        async (changes: { productId: string; quantity: number }[]) => {
          const mapped = new Map<string, CartItemWithProduct>();
          for (const change of changes) {
            mapped.set(change.productId || "", change);
          }
          return Promise.allSettled(
            mapped
              .values()
              .map((change) =>
                updateCartItem(change.productId || "", change.quantity || 0),
              ),
          );
        },
        1500,
        { leading: true },
      ),
    [],
  );

  const value: CartContextType = {
    cartData,
    optimisticCartData: optimisticCart,
    pending,
    updateCartData(newCartData) {
      setCartData(newCartData);
    },
    async addToCart(cartItem: CartItemWithProduct) {
      return new Promise((resolve) => {
        startTransition(async () => {
          const existingAddedProduct = (cartData?.items || []).find(
            (it) => it.productId === cartItem.productId,
          );
          let quantity = cartItem.quantity;
          if (existingAddedProduct) {
            quantity =
              (existingAddedProduct.quantity || 0) + (cartItem?.quantity || 0);
          }
          optimisticChangeProductQuantity({ ...cartItem, quantity });
          await addToCartAction(
            cartItem?.productId || "",
            cartItem.quantity || 0,
          );
          resolve();
        });
      });
    },
    async updateQuantity(cartItem: CartItemWithProduct) {
      return new Promise((resolve) => {
        startTransition(async () => {
          console.log("TESTTEST updateQuantity triggered", cartItem);
          optimisticChangeProductQuantity(cartItem);
          await accumulatedUpdateCartItem({
            productId: cartItem.productId || "",
            quantity: cartItem.quantity || 0,
          });
          resolve();
        });
      });
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
