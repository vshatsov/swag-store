/** @format */

import { Skeleton } from "@/components/ui/skeleton";
import { SearchContentSkeleton } from "./search-content";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Products</h1>
      </div>
      <div className="flex gap-4 mb-4">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 flex-1" />
      </div>
      <SearchContentSkeleton />
    </div>
  );
}
