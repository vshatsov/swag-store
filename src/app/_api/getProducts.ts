/** @format */

import "server-only";

import { ListProductsCategoryEnum, productsApi } from "@/lib/api-client";
import { cacheLife, cacheTag } from "next/cache";

export async function getProducts(
  search: string,
  categorySlug?: ListProductsCategoryEnum,
) {
  "use cache";
  cacheTag(`products`);
  if (search === "" && !categorySlug) {
    cacheLife("hours");
    cacheTag(`products-all`);
  }

  try {
    return await productsApi.listProducts({
      search: search ? search : undefined,
      category: categorySlug,
      limit: 5,
    });
  } catch {
    return { success: false, data: [] };
  }
}
