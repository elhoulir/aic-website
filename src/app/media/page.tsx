import { getFeaturedGallery, getAllPodcasts, getActiveAnnouncements } from "@/lib/sanity";
import MediaPageClient from "./MediaPageClient";

export default async function MediaPage() {
  let galleryImages, podcasts, announcements;

  try {
    [galleryImages, podcasts, announcements] = await Promise.all([
      getFeaturedGallery(),
      getAllPodcasts(),
      getActiveAnnouncements(),
    ]);
  } catch (error) {
    console.log("Using fallback media data:", error);
  }

  // Transform CMS gallery images
  const cmsGalleryImages = galleryImages?.map((img: {
    _id: string;
    title: string;
    image?: { asset?: { url?: string } };
    category?: string;
  }) => ({
    id: img._id,
    src: img.image?.asset?.url || "/images/aic 1.jpg",
    alt: img.title,
    category: img.category || "General",
  }));

  // Transform CMS podcasts
  const cmsPodcasts = podcasts?.map((p: {
    _id: string;
    title: string;
    description?: string;
    duration?: string;
    publishedAt?: string;
  }) => ({
    id: p._id,
    title: p.title,
    description: p.description || "",
    duration: p.duration || "N/A",
    date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-AU", { month: "short", year: "numeric" }) : "Recent",
  }));

  // Transform CMS announcements to news items
  const cmsNews = announcements?.map((a: {
    _id: string;
    title: string;
    message?: string;
    category?: string;
    startDate?: string;
    image?: { asset?: { url?: string } };
    priority?: string;
  }) => ({
    id: a._id,
    title: a.title,
    excerpt: a.message || "",
    date: a.startDate ? new Date(a.startDate).toLocaleDateString("en-AU", { day: "numeric", month: "short" }) : "Recent",
    category: a.category || "Announcement",
    image: a.image?.asset?.url || "/images/aic 1.jpg",
    featured: a.priority === "high" || a.priority === "urgent",
  }));

  return (
    <MediaPageClient
      galleryImages={cmsGalleryImages}
      podcasts={cmsPodcasts}
      news={cmsNews}
    />
  );
}
