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
import { Toaster } from "@/components/ui/sonner";
import { getSiteUrl } from "@/lib/site-url";
import { getStoreConfig } from "./_api/get-store-config";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const metadataBase = new URL(siteUrl);
  try {
    const storeConfig = await getStoreConfig();
    const seoConfig = storeConfig.data?.seo;
    const storeName = storeConfig.data?.storeName || "Swag Store";
    const description =
      seoConfig?.defaultDescription ||
      "Discover premium branded merchandise at our exclusive swag store.";
    const title = seoConfig?.defaultTitle || storeName;

    return {
      metadataBase,
      title: {
        template: seoConfig?.titleTemplate || "%s | Swag Store",
        default: seoConfig?.defaultTitle || storeName,
      },
      description,
      openGraph: {
        title,
        description,
        url: siteUrl,
        siteName: storeName,
        type: "website",
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
      icons: {
        icon: "/favicon.ico",
      },
    };
  } catch (error) {
    console.error("Failed to fetch store config for metadata:", error);
    return {
      metadataBase,
      title: {
        template: "%s | Swag Store",
        default: "Swag Store",
      },
      description:
        "Discover premium branded merchandise at our exclusive swag store.",
      openGraph: {
        title: "Swag Store",
        description:
          "Discover premium branded merchandise at our exclusive swag store.",
        url: siteUrl,
        siteName: "Swag Store",
        type: "website",
      },
      twitter: {
        card: "summary",
        title: "Swag Store",
        description:
          "Discover premium branded merchandise at our exclusive swag store.",
      },
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
                  <div className="relative h-5 w-5">
                    <Image
                      className="invert left-0"
                      src="/vercel.svg"
                      alt="Vercel Swag Store Logo"
                      fill
                      unoptimized
                    />
                  </div>
                  <h2 className="text-l font-semibold">Swag Store</h2>
                </Link>
                <LayoutNavigation />
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
          <Toaster />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
