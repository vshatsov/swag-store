/** @format */
import "server-only";

import { cartApi } from "@/lib/api-client";
import { cookies } from "next/headers";

export async function getCart() {
  const cookieStore = await cookies();
  const token = cookieStore.get("x-cart-token")?.value;

  if (!token) {
    return { items: [], createdAt: new Date() };
  }
  const { data: cartData } = await cartApi.getCart({
    xCartToken: token,
  });

  return cartData || { items: [], createdAt: new Date() };
}
