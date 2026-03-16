/** @format */

"use client";

import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const triggerSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete("search");
    } else {
      params.set("search", value);
    }
    if (value.length >= 3 || value.length === 0) {
      router.replace(`?${params.toString()}`);
    }
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return triggerSearch(e.target.value);
  };

  // should submit search on enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;
      triggerSearch(value || "");
    }
  };

  return (
    <Input
      className="flex-1"
      id="search-input"
      type="search"
      placeholder="Type your search query..."
      defaultValue={searchParams.get("search")?.toString()}
      onChange={handleSearchChange}
      onKeyDown={handleKeyDown}
    />
  );
}
