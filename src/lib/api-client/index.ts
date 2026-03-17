/** @format */

import {
  Configuration,
  PromotionsApi,
  ProductsApi,
  StockApi,
  CartApi,
  CategoriesApi,
  StoreApi,
} from "./generated-api";

const bypass = process.env.X_VERCEL_PROTECTION_BYPASS;

const config = new Configuration({
  headers: {
    "x-vercel-protection-bypass": `${bypass}`,
  },
});

export const promoApi = new PromotionsApi(config);
export const productsApi = new ProductsApi(config);
export const stockApi = new StockApi(config);
export const cartApi = new CartApi(config);
export const categoriesApi = new CategoriesApi(config);
export const storeApi = new StoreApi(config);

export * from "./generated-api";
