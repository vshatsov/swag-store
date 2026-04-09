/** @format */

"use server";

import { cartApi } from "@/lib/api-client";
import { refresh } from "next/cache";
import { createOrGetCartToken } from "../_api/createOrGetCartToken";
import { renewCartToken } from "../_api/renewCartToken";

export async function updateCartItem(productId: string, quantity: number) {
  const result = await createOrGetCartToken();

  if (!result.success) {
    throw new Error("Failed to create or retrieve cart");
  }

  try {
    await cartApi.updateCartItem({
      xCartToken: result.token,
      itemId: productId,
      updateCartItemRequest: {
        quantity,
      },
    });

    await renewCartToken(result.token, result.cookieStore);
  } catch {
    throw new Error("Failed to update cart item");
  } finally {
    refresh();
  }
}
