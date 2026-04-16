/** @format */

import { HeroSection } from "./hero-section";
import { PromoBanner, PromoBannerSkeleton } from "./promo-banner";
import {
  FeaturedProducts,
  FeaturedProductsSkeleton,
} from "./featured-products";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grow flex flex-col w-full">
      <Suspense fallback={<PromoBannerSkeleton />}>
        <PromoBanner />
      </Suspense>
      <div className="grow">
        <HeroSection />
      </div>
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
