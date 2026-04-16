/** @format */

import "server-only";

import { ListProductsCategoryEnum, productsApi } from "@/lib/api-client";
import { cacheLife, cacheTag } from "next/cache";

async function getProductsAll() {
  "use cache";
  cacheTag(`products`);
  cacheLife("hours");
  cacheTag(`products-all`);

  try {
    return await productsApi.listProducts({
      limit: 5,
    });
  } catch {
    return { success: false, data: [] };
  }
}

export async function getProducts(
  search: string,
  categorySlug?: ListProductsCategoryEnum,
) {
  if (search === "" && !categorySlug) {
    return await getProductsAll();
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
