/** @format */

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { AnimateOnAppear } from "@/components/with-appear-animation";
import { getFeaturedProducts } from "../_api/get-featured-products";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();
  return (
    <AnimateOnAppear duration={500}>
      <div className="p-2 grid place-items-stretch h-[30rem]">
        <div className="flex justify-between">
          <h4 className="text-2xl font-bold mb-4">Featured Products</h4>
          <Link
            href="/search"
            className="text-primary hover:underline"
            prefetch
          >
            See all
          </Link>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="p-2">
            {products.data?.length != 0 &&
              products?.data?.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </AnimateOnAppear>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <div className="p-2 h-[30rem] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-6 w-24" />
      </div>

      <div className="grow grid gap-4 overflow-hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ProductCardSkeleton />
        <span className="hidden md:inline">
          <ProductCardSkeleton />
        </span>
        <span className="hidden lg:inline">
          <ProductCardSkeleton />
        </span>
      </div>
    </div>
  );
}
