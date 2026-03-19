/** @format */

import { productsApi } from "@/lib/api-client";
import { cacheLife, cacheTag } from "next/cache";

export async function getFeaturedProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  cacheTag("featured-products");
  const productsResponse = await productsApi.listProducts({
    limit: 6,
    featured: "true",
  });
  return productsResponse;
}
