/** @format */

import { Configuration, PromotionsApi, ProductsApi } from "./generated-api";

const bypass = process.env.X_VERCEL_PROTECTION_BYPASS;

const config = new Configuration({
  headers: {
    "x-vercel-protection-bypass": `${bypass}`,
  },
});

export const promoApi = new PromotionsApi(config);
export const productsApi = new ProductsApi(config);

export * from "./generated-api";
