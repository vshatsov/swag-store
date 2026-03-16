/** @format */

import { NextRequest } from "next/server";
import { stockApi } from "@/lib/api-client";

export async function GET(_req: NextRequest, ctx: { params: unknown }) {
  const { id } = await (ctx.params as unknown as Promise<{ id: string }>);
  const stockResponse = await stockApi.getProductStock({ id });
  return Response.json(stockResponse);
}
