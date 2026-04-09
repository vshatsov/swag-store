/** @format */

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

type RevalidateBody =
  | { tag: string; tags?: undefined }
  | { tags: string[]; tag?: undefined };

export async function POST(req: NextRequest) {
  const secretFromRequest =
    req.headers.get("x-revalidate-secret") ||
    req.nextUrl.searchParams.get("secret");

  if (!REVALIDATE_SECRET || secretFromRequest !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: RevalidateBody;

  try {
    body = (await req.json()) as RevalidateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const tags: string[] = (
    Array.isArray((body as unknown as RevalidateBody).tags)
      ? (body as unknown as RevalidateBody).tags
      : (body as unknown as RevalidateBody).tag
        ? [(body as unknown as RevalidateBody).tag]
        : []
  ) as string[];

  if (tags.length === 0) {
    return NextResponse.json(
      { error: "Missing tag(s). Pass 'tag' or 'tags' in the body." },
      { status: 400 },
    );
  }

  const revalidate = revalidateTag as (tag: string) => void;

  for (const tag of tags) {
    revalidate(tag);
  }

  return NextResponse.json({ revalidated: tags }, { status: 200 });
}
