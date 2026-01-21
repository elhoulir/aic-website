import { HeroSection } from "@/components/sections/HeroSection";
import { QuickAccessSection } from "@/components/sections/QuickAccessSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SocialMediaSection } from "@/components/sections/SocialMediaSection";
import { DonationCTASection } from "@/components/sections/DonationCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickAccessSection />
      <AboutPreviewSection />
      <ServicesSection />
      <EventsSection />
      <ProgramsSection />
      <TestimonialsSection />
      <SocialMediaSection />
      <DonationCTASection />
    </>
  );
}
