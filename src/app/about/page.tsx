import { getAboutPage } from "@/lib/sanity";
import AboutPageClient from "./AboutPageClient";

export default async function AboutPage() {
  let aboutData;

  try {
    aboutData = await getAboutPage();
  } catch (error) {
    console.log("Using fallback about data:", error);
  }

  // Transform CMS data to match component format
  const timeline = aboutData?.history?.map((item: {
    year: string;
    title: string;
    description: string;
    image?: { asset?: { url?: string } };
    icon?: string;
  }) => ({
    year: item.year,
    title: item.title,
    description: item.description,
    image: item.image?.asset?.url || "/images/aic 1.jpg",
    icon: item.icon?.toLowerCase() || "users",
  }));

  const values = aboutData?.values?.map((item: {
    icon?: string;
    title: string;
    description: string;
  }) => ({
    icon: item.icon?.toLowerCase() || "heart",
    title: item.title,
    description: item.description,
  }));

  return (
    <AboutPageClient
      timeline={timeline}
      values={values}
      mission={aboutData?.mission}
      vision={aboutData?.vision}
      approach={aboutData?.approach}
    />
  );
}
