/** @format */

"use server";

import { cartApi } from "@/lib/api-client";
import { refresh } from "next/cache";
import { createOrGetCartToken } from "../_api/createOrGetCartToken";
import { renewCartToken } from "../_api/renewCartToken";

export async function addToCartAction(productId: string, quantity: number) {
  const { token, cookieStore } = await createOrGetCartToken();

  if (token) {
    await cartApi.addItemToCart({
      xCartToken: token,
      addToCartRequest: {
        productId,
        quantity,
      },
    });

    await renewCartToken(token, cookieStore);
  }

  refresh();
}
