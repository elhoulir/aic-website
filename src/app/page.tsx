import { HeroSection } from "@/components/sections/HeroSection";
import { QuickAccessSection } from "@/components/sections/QuickAccessSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SocialMediaSection } from "@/components/sections/SocialMediaSection";
import { DonationCTASection } from "@/components/sections/DonationCTASection";
import {
  getUpcomingEvents,
  getFeaturedTestimonials,
  getServices,
  getActivePrograms,
  getCurrentPrayerTimes,
} from "@/lib/sanity";

export default async function HomePage() {
  // Fetch all data from Sanity CMS in parallel
  let events, testimonials, services, programs, prayerTimes;

  try {
    [events, testimonials, services, programs, prayerTimes] = await Promise.all([
      getUpcomingEvents(),
      getFeaturedTestimonials(),
      getServices(),
      getActivePrograms(),
      getCurrentPrayerTimes(),
    ]);
  } catch (error) {
    console.log("Using fallback data for home page:", error);
  }

  // Transform CMS events to match component format
  const cmsEvents = events?.map((e: {
    _id: string;
    title: string;
    description?: string;
    image?: { asset?: { url?: string } };
    startDate: string;
    location?: string;
    category?: string;
  }) => ({
    id: e._id,
    title: e.title,
    description: e.description || "",
    image: e.image?.asset?.url || "/images/aic 1.jpg",
    date: e.startDate,
    time: new Date(e.startDate).toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit", hour12: true }),
    location: e.location || "Australian Islamic Centre",
    category: e.category || "Event",
    recurring: false,
  }));

  // Transform CMS testimonials
  const cmsTestimonials = testimonials?.map((t: {
    _id: string;
    quote: string;
    author: string;
    role?: string;
    image?: { asset?: { url?: string } };
  }) => ({
    id: t._id,
    quote: t.quote,
    author: t.author,
    role: t.role || "",
    image: t.image?.asset?.url || "/images/placeholder.jpg",
  }));

  // Transform CMS services
  const cmsServices = services?.map((s: {
    _id: string;
    title: string;
    description?: string;
    icon?: string;
  }) => ({
    id: s._id,
    title: s.title,
    description: s.description || "",
    icon: s.icon?.toLowerCase() || "heart",
  }));

  // Transform CMS programs
  const cmsPrograms = programs?.map((p: {
    _id: string;
    title: string;
    shortDescription?: string;
    image?: { asset?: { url?: string } };
    category?: string;
    ageGroup?: string;
    schedule?: string;
  }) => ({
    id: p._id,
    title: p.title,
    description: p.shortDescription || "",
    image: p.image?.asset?.url || "/images/aic 1.jpg",
    category: p.category || "Program",
    ageGroup: p.ageGroup,
    schedule: p.schedule,
  }));

  // Transform CMS prayer times
  const cmsPrayerTimes = prayerTimes?.prayers ? {
    fajr: prayerTimes.prayers.find((p: { name: string }) => p.name.toLowerCase() === "fajr"),
    dhuhr: prayerTimes.prayers.find((p: { name: string }) => p.name.toLowerCase() === "dhuhr"),
    asr: prayerTimes.prayers.find((p: { name: string }) => p.name.toLowerCase() === "asr"),
    maghrib: prayerTimes.prayers.find((p: { name: string }) => p.name.toLowerCase() === "maghrib"),
    isha: prayerTimes.prayers.find((p: { name: string }) => p.name.toLowerCase() === "isha"),
  } : null;

  const cmsJumuahTimes = prayerTimes?.jumuahTimes || null;

  return (
    <>
      <HeroSection prayerTimes={cmsPrayerTimes} jumuahTimes={cmsJumuahTimes} />
      <QuickAccessSection />
      <AboutPreviewSection />
      <ServicesSection services={cmsServices} />
      <EventsSection events={cmsEvents} />
      <ProgramsSection programs={cmsPrograms} />
      <TestimonialsSection testimonials={cmsTestimonials} />
      <SocialMediaSection />
      <DonationCTASection />
    </>
  );
}
