/** @format */

import "server-only";

import { cartApi } from "@/lib/api-client";
import { cookies } from "next/headers";

export async function createOrGetCartToken() {
  const cookieStore = await cookies();
  let token = cookieStore.get("x-cart-token")?.value;
  let createdCart = undefined;

  if (!token) {
    const { data: cartWithProducts } = await cartApi.createCart();
    if (!cartWithProducts?.token) {
      throw new Error("Failed to create cart");
    }
    token = cartWithProducts.token;
    createdCart = cartWithProducts;
  }

  cookieStore.set("x-cart-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { token, createdCart, cookieStore };
}
