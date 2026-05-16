import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const defaultPaths = [
  "/",
  "/about",
  "/services",
  "/case-studies",
  "/blog",
  "/contact",
  "/book-consultation",
];

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const body = (await request.json().catch(() => null)) as
    | { secret?: string; paths?: string[] }
    | null;

  if (secret && body?.secret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const paths = body?.paths?.length ? body.paths : defaultPaths;
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths });
}
