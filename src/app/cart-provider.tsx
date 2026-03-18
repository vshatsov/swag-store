/** @format */

"use client";

import {
  CartWithProducts,
  CartItemWithProduct,
  Product,
} from "@/lib/api-client";
import {
  createContext,
  useContext,
  ReactNode,
  useTransition,
  useOptimistic,
  useState,
} from "react";
import { updateCartItem } from "./update-cart-action";
import { addToCartAction } from "./add-to-cart-action";
import { accumulateDebounce } from "@/lib/utils";

interface UpdateCartItemBody {
  productId: string;
  quantity: number;
}

interface CartContextType {
  cartData: CartWithProducts | null;
  optimisticCartData: CartWithProducts | null;
  pending: boolean;
  updateCartData: (newCart: CartWithProducts) => void;
  addToCart: (
    updateCartItemBody: UpdateCartItemBody,
    product: Product,
  ) => void;
  updateQuantity: (
    updateCartItemBody: UpdateCartItemBody,
  ) => void;
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
      cartItemWithProductList: CartItemWithProduct[],
    ) => {
      let newState = { ...state };
      for (const { productId, quantity, product } of cartItemWithProductList) {
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
      }
      return newState;
    },
  );

  const value: CartContextType = {
    cartData,
    optimisticCartData: optimisticCart,
    pending,
    updateCartData(newCartData) {
      setCartData(newCartData);
    },
    async addToCart(args: UpdateCartItemBody, product: Product) {
      return new Promise((resolve) => {
        startTransition(async () => {
          const existingAddedProduct = (cartData?.items || []).find(
            (it) => it.productId === args.productId,
          );
          let quantity = args.quantity;
          if (existingAddedProduct) {
            quantity = (existingAddedProduct.quantity || 0) + args.quantity;
          }
          optimisticChangeProductQuantity([{ ...args, quantity, product }]);
          await addToCartAction(args.productId, args.quantity);
          resolve();
        });
      });
    },
    async updateQuantity(args: UpdateCartItemBody) {
      return new Promise((resolve) => {
        startTransition(async () => {
          optimisticChangeProductQuantity([args]);
          await updateCartItem(args.productId, args.quantity);
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

// TODO what if we updated cart during optimistic update - handle that case
// TODO implement queue for actions triggered fast
