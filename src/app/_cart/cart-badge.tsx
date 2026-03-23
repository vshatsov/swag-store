/** @format */

"use client";

import { Badge } from "@/components/ui/badge";
import { useCart } from "./cart-provider";

export function CartBadge() {
  const { optimisticCartData } = useCart();

  if (!optimisticCartData?.totalItems) {
    return null;
  }
  return (
    <Badge
      className="absolute -top-1 -right-1 h-4 w-4 rounded-full px-0 text-[10px] leading-none"
      variant="destructive"
    >
      {optimisticCartData.totalItems}
    </Badge>
  );
}
