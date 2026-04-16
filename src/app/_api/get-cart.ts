/** @format */
import "server-only";

import { cartApi } from "@/lib/api-client";
import type { CartWithProducts } from "@/lib/api-client/generated-api";
import { cookies } from "next/headers";

const EMPTY_CART: CartWithProducts = { items: [], createdAt: new Date() };

export async function getCart(): Promise<CartWithProducts> {
  const cookieStore = await cookies();
  const token = cookieStore.get("x-cart-token")?.value;

  if (!token) {
    return EMPTY_CART;
  }

  try {
    const { data: cartData } = await cartApi.getCart({
      xCartToken: token,
    });

    return cartData || EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}
