/** @format */

import "server-only";

import { ListProductsCategoryEnum, productsApi } from "@/lib/api-client";
import { cacheLife, cacheTag } from "next/cache";

export async function getProducts(
  search: string,
  categorySlug?: ListProductsCategoryEnum,
) {
  "use cache";
  if (search === "" && !categorySlug) {
    cacheLife("hours");
    cacheTag(`products-all`);
  }
  return productsApi.listProducts({
    search: search ? search : undefined,
    category: categorySlug,
    limit: 5,
  });
}
