/** @format */

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LayoutNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2">
      <Button variant="link" asChild>
        <Link
          className={`${pathname === "/" ? "text-primary" : "text-secondary"}`}
          href="/"
        >
          Home
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link
          className={`${pathname === "/search" ? "text-primary" : "text-secondary"}`}
          href="/search"
        >
          Search
        </Link>
      </Button>
    </nav>
  );
}
