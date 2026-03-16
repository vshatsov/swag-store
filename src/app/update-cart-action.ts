/** @format */

"use server";

import { cookies } from "next/headers";
import { cartApi } from "@/lib/api-client";
import { refresh } from "next/cache";

export async function updateCartItem(productId: string, quantity: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("x-cart-token")?.value;
  if (!token) {
    throw new Error("Token not found");
  }

  await cartApi.updateCartItem({
    xCartToken: token,
    itemId: productId,
    updateCartItemRequest: {
      quantity,
    },
  });

  refresh();
}
