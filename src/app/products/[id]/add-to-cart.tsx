/** @format */

import { stockApi } from "@/lib/api-client";
import { AddToCartClient } from "./add-to-cart-client";
import { cacheLife, cacheTag } from "next/cache";

export async function getLiveStock(productId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`stock-${productId}`);
  
  const stockResponse = await stockApi.getProductStock({ id: productId });
  return stockResponse;
}

export async function AddToCart({ productId }: { productId: string }) {
  const stockResponse = await getLiveStock(productId);
  if (!stockResponse.data) {
    return null;
  }
  return <AddToCartClient stock={stockResponse?.data} />;
}

export function AddToCartSkeleton() {
  return (
    <AddToCartClient
      stock={{
        productId: undefined,
        stock: 0,
        inStock: false,
        lowStock: false,
      }}
      disablePolling
    ></AddToCartClient>
  );
}
