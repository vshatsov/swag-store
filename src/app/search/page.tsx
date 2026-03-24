/** @format */

import type { Metadata } from "next";
import { ListProductsCategoryEnum } from "@/lib/api-client";
import { SearchFilter } from "./search-filter";
import { SearchInput } from "./search-input";
import { SearchContent, SearchContentSkeleton } from "./search-content";
import { Suspense } from "react";
import { getAvailableCategories } from "../_api/getAvailableCategories";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}): Promise<Metadata> {
  try {
    const { search, category } = await searchParams;

    const titleParts: string[] = ["Search Products"];
    const descriptionParts: string[] = [];

    if (search) {
      titleParts.push(`"${search}"`);
      descriptionParts.push(`Results for "${search}"`);
    }

    if (category) {
      titleParts.push(`in ${category}`);
      descriptionParts.push(`in the ${category} category`);
    }

    const title = titleParts.join(" ");
    const description =
      descriptionParts.length > 0
        ? `Browse and filter ${descriptionParts.join(" ")} at our exclusive swag store.`
        : "Search and discover premium branded merchandise at our exclusive swag store.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: `https://swag-store-gray.vercel.app/search${
          search || category
            ? `?${[
                search ? `search=${encodeURIComponent(search)}` : "",
                category ? `category=${encodeURIComponent(category)}` : "",
              ]
                .filter(Boolean)
                .join("&")}`
            : ""
        }`,
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  } catch (error) {
    console.error("Failed to generate search metadata:", error);
    return {
      title: "Search Products",
      description:
        "Search and discover premium branded merchandise at our exclusive swag store.",
    };
  }
}

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const [searchParamsResult, availableCategoriesResult] =
    await Promise.allSettled([searchParams, getAvailableCategories()]);
  const { search, category: categoryString } =
    searchParamsResult.status === "fulfilled"
      ? searchParamsResult.value
      : { search: undefined, category: undefined };
  const category = categoryString as ListProductsCategoryEnum | undefined;
  const categoriesResponse =
    availableCategoriesResult.status === "fulfilled"
      ? availableCategoriesResult.value
      : { data: undefined };
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Products</h1>
      </div>
      <div className="flex gap-4 mb-4">
        <SearchInput />
        <SearchFilter categories={categoriesResponse.data} />
      </div>
      <Suspense
        key={`${search}-${categoryString}}`}
        fallback={<SearchContentSkeleton />}
      >
        <SearchContent search={search || ""} category={category} />
      </Suspense>
    </div>
  );
}
