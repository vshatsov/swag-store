/** @format */
import "server-only";

import { productsApi } from "@/lib/api-client";
import type { ProductListResponse } from "@/lib/api-client/generated-api";
import { cacheLife, cacheTag } from "next/cache";

export async function getFeaturedProducts(): Promise<ProductListResponse> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  cacheTag("featured-products");

  try {
    return await productsApi.listProducts({
      limit: 6,
      featured: "true",
    });
  } catch {
    return { success: false, data: [] };
  }
}
