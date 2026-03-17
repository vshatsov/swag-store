/** @format */

"use server";

import { cookies } from "next/headers";
import { cartApi } from "@/lib/api-client";
import { refresh } from "next/cache";

export async function addToCartAction(productId: string, quantity: number) {
  const cookieStore = await cookies();
  let token = cookieStore.get("x-cart-token")?.value;

  if (!token) {
    const { data: cartWithProducts } = await cartApi.createCart();
    if (!cartWithProducts?.token) {
      throw new Error("Failed to create cart");
    }
    cookieStore.set("x-cart-token", cartWithProducts?.token || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    token = cartWithProducts.token;
  }

  await cartApi.addItemToCart({
    xCartToken: token,
    addToCartRequest: {
      productId,
      quantity,
    },
  });

  refresh();
}
