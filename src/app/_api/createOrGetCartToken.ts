/** @format */

import "server-only";

import { cartApi } from "@/lib/api-client";
import type { CartWithProducts } from "@/lib/api-client/generated-api";
import { cookies } from "next/headers";

type CreateOrGetCartResult =
  | {
      success: true;
      token: string;
      createdCart: CartWithProducts | undefined;
      cookieStore: Awaited<ReturnType<typeof cookies>>;
    }
  | { success: false };

export async function createOrGetCartToken(): Promise<CreateOrGetCartResult> {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("x-cart-token")?.value;
    let createdCart: CartWithProducts | undefined = undefined;

    if (!token) {
      const { data: cartWithProducts } = await cartApi.createCart();
      if (!cartWithProducts?.token) {
        return { success: false };
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

    return { success: true, token, createdCart, cookieStore };
  } catch {
    return { success: false };
  }
}
