/** @format */

"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Category } from "@/lib/api-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function SearchFilter({
  categories,
}: {
  categories: Category[] | undefined;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSelectedFilter = (categories || []).find(
    (cat) => cat.slug === searchParams.get("category"),
  )?.slug;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialSelectedFilter || null,
  );
  useEffect(() => {
    if (!categories) {
      toast.error("Failed to load categories!");
    }
  }, []);

  return (
    <Combobox
      items={[{ slug: "all", name: "All Categories" }, ...(categories || [])]}
      defaultValue={initialSelectedFilter}
      value={selectedCategory}
      onValueChange={(value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (!value || value === "all") {
          params.delete("category");
        } else {
          params.set("category", value);
        }
        setSelectedCategory(value);
        router.replace(`?${params.toString()}`);
      }}
    >
      <ComboboxInput placeholder="Category..." />
      <ComboboxContent>
        <ComboboxEmpty>No categories found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.slug} value={item.slug}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
