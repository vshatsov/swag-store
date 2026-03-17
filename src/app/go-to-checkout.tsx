/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "./cart-provider";

export function GoToCheckout() {
  const { pending } = useCart();
  return <Button disabled={pending}>{pending ? "Waiting cart to update..." : "Go to checkout"}</Button>;
}
