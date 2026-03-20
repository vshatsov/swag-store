/** @format */

"use server";

import { cookies } from "next/headers";

export async function renewCartToken(
  token: string,
  cookieStore?: Awaited<ReturnType<typeof cookies>>,
) {
  cookieStore = cookieStore ?? (await cookies());

  cookieStore.set("x-cart-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}
