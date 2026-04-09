/** @format */

import * as React from "react";

import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  loading,
  ...props
}: React.ComponentProps<"input"> & { loading?: boolean }) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          loading && "pr-8",
          className,
        )}
        {...props}
      />
      {loading && (
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
          <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

export { Input };
