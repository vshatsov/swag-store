/** @format */

import "server-only";

import { promoApi } from "@/lib/api-client";
import type { PromotionResponse } from "@/lib/api-client/generated-api";

export async function fetchPromotionResponse(): Promise<PromotionResponse> {
  try {
    return await promoApi.getActivePromotion();
  } catch {
    return { success: false, data: undefined };
  }
}
