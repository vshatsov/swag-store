/** @format */

import { FeaturedProductsSkeleton } from "./featured-products";
import { HeroSection } from "./hero-section";
import { PromoBannerSkeleton } from "./promo-banner";

export default async function HomeLoading() {
  return (
    <div className="grow flex flex-col w-full">
      <PromoBannerSkeleton />
      <div className="grow">
        <HeroSection />
      </div>
      <FeaturedProductsSkeleton />
    </div>
  );
}
