/** @format */
import "server-only";

import { productsApi } from "@/lib/api-client";
import type { ProductResponse } from "@/lib/api-client/generated-api";
import { cacheLife, cacheTag } from "next/cache";

export async function getProductDetails(id: string): Promise<ProductResponse> {
  "use cache";
  cacheLife("days");
  cacheTag("products");
  cacheTag(`product-details-${id}`);

  try {
    return await productsApi.getProduct({ id });
  } catch {
    return { success: false, data: undefined };
  }
}
