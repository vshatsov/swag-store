/** @format */

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-2 w-full grid gap-4 md:grid-cols-[1fr_1fr]">
      <Skeleton className="h-full" />
      <div className="h-full flex flex-col gap-4">
        <Skeleton className="flex-1" />
        <Skeleton className="flex-1" />
        <Skeleton className="flex-1" />
      </div>
    </div>
  );
}
