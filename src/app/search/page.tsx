/** @format */

import { categoriesApi, ListProductsCategoryEnum } from "@/lib/api-client";
import { cacheLife, cacheTag } from "next/cache";
import { SearchFilter } from "./search-filter";
import { SearchInput } from "./search-input";
import { SearchContent, SearchContentSkeleton } from "./search-content";
import { Suspense } from "react";

async function getAvailableCategories() {
  "use cache";
  cacheLife("max");
  cacheTag("categories");
  const categoriesResponse = await categoriesApi.listCategories();
  return categoriesResponse;
}

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const { search, category: categoryString } = await searchParams;
  const category = categoryString as ListProductsCategoryEnum;
  const categoriesResponse = await getAvailableCategories();
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Products</h1>
      </div>
      <div className="flex gap-4">
        <SearchInput />
        <SearchFilter categories={categoriesResponse.data || []} />
      </div>
      <Suspense key={`${search}-${categoryString}}`} fallback={<SearchContentSkeleton />}>
        <SearchContent search={search || ""} category={category} />
      </Suspense>
    </div>
  );
}
