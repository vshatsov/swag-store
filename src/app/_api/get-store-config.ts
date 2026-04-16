/** @format */
import "server-only";

import { storeApi } from "@/lib/api-client";
import type { GetStoreConfig200Response } from "@/lib/api-client/generated-api";
import { cacheLife, cacheTag } from "next/cache";

export async function getStoreConfig(): Promise<GetStoreConfig200Response> {
  "use cache";
  cacheLife("days");
  cacheTag("store-config");

  try {
    return await storeApi.getStoreConfig();
  } catch {
    return { success: false, data: undefined };
  }
}
