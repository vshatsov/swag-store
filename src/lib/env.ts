/** @format */

import "server-only";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.url().optional(),
  API_BASE_URL: z.url().optional(),
  X_VERCEL_PROTECTION_BYPASS: z.string().min(1).optional(),
  REVALIDATE_SECRET: z.string().min(1).optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const messages = parsedEnv.error.issues.map(
    (issue) => `${issue.path.join(".")}: ${issue.message}`,
  );

  throw new Error(`Invalid environment variables:\n${messages.join("\n")}`);
}

export const env = parsedEnv.data;
