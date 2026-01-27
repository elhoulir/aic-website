import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://aic-website.vercel.app";
const previewSecret = process.env.SANITY_PREVIEW_SECRET || "";

// Map document types to their preview URLs
const previewUrlMap: Record<string, (slug?: string) => string> = {
  event: (slug) => `/events${slug ? `/${slug}` : ""}`,
  service: () => "/services",
  announcement: () => "/announcements",
  donationCause: () => "/donate",
  galleryImage: () => "/media",
  testimonial: () => "/",
  faq: () => "/visit",
  etiquette: () => "/visit",
  tourType: () => "/visit",
  siteSettings: () => "/",
  prayerSettings: () => "/worshippers",
  teamMember: () => "/about",
  pageContent: () => "/",
  resource: () => "/resources",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentType, slug } = body;

    if (!documentType || typeof documentType !== "string") {
      return NextResponse.json({ error: "Missing documentType" }, { status: 400 });
    }

    const urlMapper = previewUrlMap[documentType];
    if (!urlMapper) {
      return NextResponse.json({ error: "Unknown document type" }, { status: 400 });
    }

    const path = urlMapper(slug);

    const previewUrl = new URL("/api/draft", baseUrl);
    previewUrl.searchParams.set("secret", previewSecret);
    previewUrl.searchParams.set("slug", path);

    return NextResponse.json({ url: previewUrl.toString() });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
