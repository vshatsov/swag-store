/** @format */

import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import LayoutNavigation from "./layout-navigation";
import { Suspense } from "react";
import { Cart, CartSkeleton } from "./_cart/cart";
import { CartProvider } from "./_cart/cart-provider";
import { storeApi } from "@/lib/api-client";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const storeConfig = await storeApi.getStoreConfig();
    const seoConfig = storeConfig.data?.seo;
    const storeName = storeConfig.data?.storeName || "Swag Store";

    return {
      title: {
        template: seoConfig?.titleTemplate || "%s | Swag Store",
        default: seoConfig?.defaultTitle || storeName,
      },
      description:
        seoConfig?.defaultDescription ||
        "Discover premium branded merchandise at our exclusive swag store.",
      icons: {
        icon: "/favicon.ico",
      },
    };
  } catch (error) {
    console.error("Failed to fetch store config for metadata:", error);
    return {
      title: {
        template: "%s | Swag Store",
        default: "Swag Store",
      },
      description:
        "Discover premium branded merchandise at our exclusive swag store.",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistMono.className} ${GeistSans.className} antialiased min-h-screen flex flex-col h-full`}
      >
        <CartProvider>
          <div className="flex min-h-screen h-full flex-col">
            <header className="border-b bg-white h-16 w-full px-2 flex justify-between items-center">
              <div className="flex items-center gap-8">
                <Link href={"/"} className="flex gap-4 items-center">
                  <Image
                    className="invert"
                    src="vercel.svg"
                    alt="Vercel Swag Store Logo"
                    width={25}
                    height={25}
                    priority
                  />
                  <h2 className="text-l font-semibold">Swag Store</h2>
                </Link>
                <Suspense
                  fallback={<div className="h-8 w-24 bg-gray-200 rounded" />}
                >
                  <LayoutNavigation />
                </Suspense>
              </div>
              <Suspense fallback={<CartSkeleton />}>
                <Cart />
              </Suspense>
            </header>

            <main className="flex flex-1">{children}</main>

            <footer className="border-t bg-white mt-2">
              <div className="w-full max-w-7xl px-2 py-4 text-sm text-gray-500 h-16">
                © 2026 Vercel Swag Store by Vitali Shatsou
              </div>
            </footer>
          </div>
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
