/** @format */

import { productsApi } from "@/lib/api-client";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AddToCart, AddToCartSkeleton } from "./add-to-cart";
import { Suspense } from "react";

async function getProductDetails(id: string) {
  "use cache";
  cacheLife("days");
  cacheTag("products");
  cacheTag(`product-details-${id}`);
  const productDetailsResponse = await productsApi.getProduct({ id });

  return productDetailsResponse;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productDetails = await getProductDetails(id);

  if (!productDetails.data) {
    return notFound();
  }

  const productDetailsData = productDetails.data;

  return (
    <div className="p-2 w-full grid md:grid-cols-[1fr_1fr]">
      <div className="h-full relative">
        <Image
          src={productDetailsData?.images?.[0] || ""}
          className="object-contain"
          alt={`Product Details: ${productDetailsData?.slug}`}
          fill
          preload
          placeholder="empty"
        />
      </div>
      <div>
        <div className="min-h-[50%] flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 mb-4">
              <h2 className="text-2xl font-bold mb-4">
                {productDetailsData?.name}
              </h2>
              <Badge variant="outline">{productDetailsData?.category}</Badge>
            </div>
            <p>{productDetailsData?.description}</p>
            <p className="text-secondary">
              ${productDetailsData?.price?.toFixed(2)}
            </p>
            <Suspense fallback={<AddToCartSkeleton />}>
              <AddToCart productId={id} />
            </Suspense>
          </div>
          <div>
            <div className="flex gap-2">
              {productDetailsData?.tags?.map((tag: string) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
