/** @format */

"use server";

import { cartApi } from "@/lib/api-client";
import { refresh } from "next/cache";
import { createOrGetCartToken } from "../_api/createOrGetCartToken";
import { renewCartToken } from "../_api/renewCartToken";

export async function updateCartItem(productId: string, quantity: number) {
  const { token, cookieStore } = await createOrGetCartToken();

  if (token) {
    await cartApi.updateCartItem({
      xCartToken: token,
      itemId: productId,
      updateCartItemRequest: {
        quantity,
      },
    });

    await renewCartToken(token, cookieStore);
  }

  refresh();
}
