import { getPrograms } from "@/sanity/lib/fetch";
import { SanityProgram } from "@/types/sanity";
import ProgramsContent from "./ProgramsContent";

export const metadata = {
  title: "Programs | Australian Islamic Centre",
  description: "Comprehensive Islamic education and community programs designed to nurture faith, knowledge, and personal development for all ages.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms() as SanityProgram[];

  return <ProgramsContent programs={programs} />;
}
