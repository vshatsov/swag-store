/** @format */

import { Product } from "@/lib/api-client/generated-api/models/Product";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { centsToDollarsString } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export async function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="" variant="ghost">
      <CardHeader>
        <Link href={`/products/${product.id}`}>
          <div className="w-full justify-center flex">
            <Image
              src={product?.images?.[0] || ""}
              alt={`${product?.name}`}
              className="object-contain"
              width={322}
              height={322}
              quality={80}
              placeholder="blur"
              // white base64 encoded 1x1 pixel image as blur placeholder
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSIvPjwvc3ZnPg=="
            />
          </div>
        </Link>
        <Button variant="link" className="inline p-0" asChild>
          <Link href={`/products/${product.id}`}>{product?.name}</Link>
        </Button>
      </CardHeader>
      <CardContent className="text-secondary">
        {centsToDollarsString(product.price || 0)}
      </CardContent>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-lg bg-background p-4">
      <Skeleton className="h-40 w-full rounded-lg" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="mt-auto">
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
}
