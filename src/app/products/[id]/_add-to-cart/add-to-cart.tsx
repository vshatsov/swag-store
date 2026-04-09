/** @format */

import { Product, stockApi } from "@/lib/api-client";
import { StockProvider } from "../stock-provider";
import QuantitySelector from "./quantity-selector";
import { Stock } from "./stock";

export async function getLiveStock(productId: string) {
  try {
    return await stockApi.getProductStock({ id: productId });
  } catch {
    return { success: false, data: undefined };
  }
}

export async function AddToCart({
  productId,
  product,
}: {
  productId: string;
  product: Product;
}) {
  const stockResponse = await getLiveStock(productId);
  if (!stockResponse.success || !stockResponse.data) {
    return <AddToCartSkeleton />;
  }
  return (
    <StockProvider initialStock={stockResponse.data}>
      <div className="flex flex-col gap-4 h-28">
        <QuantitySelector product={product} />
        <Stock />
      </div>
    </StockProvider>
  );
}

export function AddToCartSkeleton() {
  return <div className="flex flex-col gap-4 h-28"></div>;
}
