/** @format */

import { env } from "@/lib/env";

export function getSiteUrl() {
  const url = env.NEXT_PUBLIC_SITE_URL;
  if (!url) return "http://localhost:3000";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
