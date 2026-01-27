import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// Enable draft mode to preview unpublished content
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug") || "/";

  // Validate the secret
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  // Validate slug is a relative path only (prevent open redirect attacks)
  if (!slug.startsWith("/") || slug.startsWith("//") || slug.includes("://")) {
    return new Response("Invalid redirect path", { status: 400 });
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the path
  redirect(slug);
}
