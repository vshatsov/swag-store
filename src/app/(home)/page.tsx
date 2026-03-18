/** @format */

import type { Metadata } from "next";
import { HeroSection } from "./hero-section";
import { PromoBanner, PromoBannerSkeleton } from "./promo-banner";
import {
  FeaturedProducts,
  FeaturedProductsSkeleton,
} from "./featured-products";
import { Suspense } from "react";
import { storeApi } from "@/lib/api-client";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const storeConfig = await storeApi.getStoreConfig();
    const seoConfig = storeConfig.data?.seo;
    const storeName = storeConfig.data?.storeName || "Swag Store";

    return {
      title: seoConfig?.defaultTitle || storeName,
      description:
        seoConfig?.defaultDescription ||
        "Discover premium branded merchandise at our exclusive swag store.",
      openGraph: {
        title: seoConfig?.defaultTitle || storeName,
        description:
          seoConfig?.defaultDescription ||
          "Discover premium branded merchandise at our exclusive swag store.",
        url: "https://swag-store-gray.vercel.app",
        siteName: storeName,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seoConfig?.defaultTitle || storeName,
        description:
          seoConfig?.defaultDescription ||
          "Discover premium branded merchandise at our exclusive swag store.",
      },
    };
  } catch (error) {
    console.error("Failed to fetch store config for metadata:", error);
    return {
      title: "Swag Store",
      description:
        "Discover premium branded merchandise at our exclusive swag store.",
    };
  }
}

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
