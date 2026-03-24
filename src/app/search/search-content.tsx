/** @format */

import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { ListProductsCategoryEnum } from "@/lib/api-client";
import { getProducts } from "../_api/getProducts";

export async function SearchContent({
  search,
  category,
}: {
  search: string;
  category?: ListProductsCategoryEnum;
}) {
  const productsResponse = await getProducts(search, category);
  return (
    <div className="grid gap-4 grid-cols-[1fr] md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]">
      {productsResponse.data?.length ? (
        productsResponse.data.map((product) => (
          <div key={product.id} className="h-[30rem]">
            <ProductCard key={product.id} product={product} />
          </div>
        ))
      ) : (
        <div>No products found.</div>
      )}
    </div>
  );
}

export function SearchContentSkeleton() {
  const skeleton = [1, 2, 3, 4, 5, 6];
  return (
    <div className="grid gap-4 grid-cols-[1fr] md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]">
      {skeleton.map((v) => (
        <div key={v} className="h-[30rem]">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}
