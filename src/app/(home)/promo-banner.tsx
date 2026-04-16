/** @format */

import { AnimateOnAppear } from "@/components/with-appear-animation";
import { fetchPromotionResponse } from "../_api/fetch-promotion-response";

export async function PromoBanner() {
  const promoResponse = await fetchPromotionResponse();
  if (!promoResponse.success || !promoResponse.data?.active) {
    return <PromoBannerSkeleton />;
  }
  const promo = promoResponse.data;
  const hasCode = Number(promo.discountPercent) > 0 && promo.code !== "AUTO";
  return (
    <AnimateOnAppear duration={500}>
      <div className="bg-primary text-primary-foreground py-4 px-2 flex justify-center items-center h-16">
        {promo.title} - {promo.description}{" "}
        {hasCode && (
          <span className="ml-2 px-2 py-1 bg-primary/80 rounded text-sm font-medium">
            Code: {promo.code}
          </span>
        )}
      </div>
    </AnimateOnAppear>
  );
}

export function PromoBannerSkeleton() {
  return <div className="py-4 h-16 bg-transparent"></div>;
}
