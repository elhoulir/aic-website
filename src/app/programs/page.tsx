import { getActivePrograms } from "@/lib/sanity";
import { programs } from "@/data/content";
import ProgramsPageClient from "./ProgramsPageClient";

export default async function ProgramsPage() {
  let displayPrograms;

  try {
    const cmsPrograms = await getActivePrograms();
    if (cmsPrograms && cmsPrograms.length > 0) {
      displayPrograms = cmsPrograms.map((program: {
        _id: string;
        title: string;
        shortDescription?: string;
        image?: { asset?: { url?: string } };
        category?: string;
        schedule?: Array<{ day: string; startTime: string; endTime: string }>;
        features?: string[];
      }) => ({
        id: program._id,
        title: program.title,
        description: program.shortDescription || "",
        image: program.image?.asset?.url || "/images/aic 1.jpg",
        category: program.category || "Education",
        schedule: program.schedule
          ? `${program.schedule[0]?.day} ${program.schedule[0]?.startTime}`
          : "Contact for schedule",
        features: program.features || [],
      }));
    }
  } catch (error) {
    console.log("Using fallback programs data:", error);
  }

  const finalPrograms = displayPrograms && displayPrograms.length > 0 ? displayPrograms : programs;

  return <ProgramsPageClient programs={finalPrograms} />;
}
