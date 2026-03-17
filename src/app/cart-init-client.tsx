/** @format */

"use client";

import { CartWithProducts } from "@/lib/api-client";
import { useEffect } from "react";
import { useCart } from "./cart-provider";

interface CartInitClientProps {
  cartData: CartWithProducts;
}

export function CartInitClient({ cartData }: CartInitClientProps) {
  const { updateCartData } = useCart();
  useEffect(() => {
    console.log("cartData.items", cartData.items);
    updateCartData(cartData);
  }, []);

  return null;
}
