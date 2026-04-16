/** @format */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function HeroSection() {
  return (
    <div className="grid h-full min-h-[45rem] p-2 md:grid-cols-[3fr_4fr]">
      <div className="relative p-2 h-full">
        <Image
          src="/vercel-hero-landscape-transparent.png"
          className="object-contain"
          alt="Vercel Hero"
          sizes="(max-width: 768px) 100vw, 43vw"
          fill
          preload
        />
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-4 mt-8">
          Wear the framework you shape with!
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Premium swag for developers who build with Vercel. From tech gear,
          represent the tools you love!
        </p>
        <Button size="xxl" className="px-32 w-full md:w-fit" asChild>
          <Link href="/search">
            Browse All Products <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
