/** @format */
import "server-only";

import { productsApi } from "@/lib/api-client";
import { cacheLife, cacheTag } from "next/cache";

export async function getProductDetails(id: string) {
  "use cache";
  cacheLife("days");
  cacheTag("products");
  cacheTag(`product-details-${id}`);
  const productDetailsResponse = await productsApi.getProduct({ id });

  return productDetailsResponse;
}
