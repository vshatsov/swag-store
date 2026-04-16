/** @format */

import "server-only";

import { categoriesApi } from "@/lib/api-client";
import { cacheLife, cacheTag } from "next/cache";

export async function getAvailableCategories() {
  "use cache";
  cacheLife("max");
  cacheTag("categories");
  try {
    const categoriesResponse = await categoriesApi.listCategories();
    return categoriesResponse;
  } catch {
    return { success: false, data: [] };
  }
}
