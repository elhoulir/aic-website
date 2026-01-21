"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { stats as fallbackStats, aicInfo, partners as fallbackPartners } from "@/data/content";
import {
  ArrowRight,
  Heart,
  Users,
  BookOpen,
  Award,
  Target,
  Eye,
  Lightbulb,
  Calendar,
  Building,
  Globe,
  Handshake,
  LucideIcon,
} from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface Partner {
  name: string;
  category: string;
}

interface Stat {
  value: string;
  label: string;
}

interface AboutPageClientProps {
  timeline?: TimelineItem[];
  values?: ValueItem[];
  partners?: Partner[];
  stats?: Stat[];
  mission?: string;
  vision?: string;
  approach?: string;
}

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  heart: Heart,
  lightbulb: Lightbulb,
  bookopen: BookOpen,
  book: BookOpen,
  building: Building,
  globe: Globe,
  award: Award,
  target: Target,
  eye: Eye,
};

const fallbackTimeline: TimelineItem[] = [
  {
    year: "1970s",
    title: "Newport Islamic Society Founded",
    description: "The Newport Islamic Society (NIS) was established to serve the local Muslim community in Newport, Melbourne.",
    image: "/images/aic 8.jpg",
    icon: "users",
  },
  {
    year: "2000s",
    title: "Community Growth",
    description: "As the community grew, plans began for a purpose-built Islamic centre that would serve future generations.",
    image: "/images/aic 1.jpg",
    icon: "heart",
  },
  {
    year: "2010",
    title: "Vision Takes Shape",
    description: "Renowned architect Glenn Murcutt was commissioned to design a unique Islamic centre blending Australian and Islamic aesthetics.",
    image: "/images/aic 3.jpeg",
    icon: "lightbulb",
  },
  {
    year: "2013",
    title: "IQRA Academy Established",
    description: "IQRA Academy weekend school was established to provide Quranic education to local children.",
    image: "/images/aic start.jpg",
    icon: "book",
  },
  {
    year: "2016",
    title: "Centre Completion",
    description: "The Australian Islamic Centre opened its doors, quickly becoming a global architectural landmark.",
    image: "/images/aic 9.jpeg",
    icon: "building",
  },
  {
    year: "Present",
    title: "Serving the Community",
    description: "Today, AIC serves 1000+ weekly worshippers with comprehensive religious, educational, and community services.",
    image: "/images/aic 5.jpg",
    icon: "globe",
  },
];

const fallbackValues: ValueItem[] = [
  {
    icon: "heart",
    title: "Compassion",
    description: "We serve with love and mercy, following the example of Prophet Muhammad (PBUH).",
  },
  {
    icon: "book",
    title: "Knowledge",
    description: "We believe in the transformative power of Islamic education for all ages.",
  },
  {
    icon: "users",
    title: "Community",
    description: "We integrate Australian values with the beauty of Islam, building bridges of understanding.",
  },
  {
    icon: "award",
    title: "Excellence",
    description: "We strive for the highest standards in everything we do.",
  },
];

export default function AboutPageClient({
  timeline: cmsTimeline,
  values: cmsValues,
  partners: cmsPartners,
  stats: cmsStats,
  mission,
  vision,
  approach,
}: AboutPageClientProps) {
  const timeline = cmsTimeline?.length ? cmsTimeline : fallbackTimeline;
  const values = cmsValues?.length ? cmsValues : fallbackValues;
  const partners = cmsPartners?.length ? cmsPartners : fallbackPartners;
  const stats = cmsStats?.length ? cmsStats : fallbackStats;

  return (
    <>
      <PageHero
        badge="About Us"
        title="A Unique Islamic Environment"
        highlight="in Melbourne"
        subtitle="From a local community centre to a global architectural icon, the Australian Islamic Centre continues to serve while integrating Australian values with the beauty of Islam."
        image="/images/aic start.jpg"
        height="tall"
      />

      {/* Mission Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-100 rounded-full blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <Image
                  src="/images/aic 5.jpg"
                  alt="Community gathering at AIC"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                  <p className="text-3xl font-bold text-neutral-700 mb-1">40+</p>
                  <p className="text-gray-600">Years Serving Community</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium mb-6">
                  <Target className="w-4 h-4" />
                  Our Mission
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {mission || aicInfo.tagline}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  The Australian Islamic Centre, operated by the Newport Islamic Society, serves as a
                  beacon of Islamic faith and practice in Melbourne. What started as a local community
                  centre serving the Newport Muslim community has transformed into a global architectural
                  icon that attracts visitors from around the world.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Despite our growth, we maintain our core identity as a local community hub, providing
                  comprehensive religious services, education, and programs that serve Muslims and the
                  broader public alike.
                </p>
                <Button
                  href="/visit"
                  variant="primary"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Visit Our Centre
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn>
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  {vision || "To be a leading Islamic centre that serves as a bridge between Australian and Islamic values. We envision a thriving Muslim community that is deeply rooted in Islamic teachings while actively contributing to the broader Australian society through education, community service, and interfaith dialogue."}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h3>
                <p className="text-gray-600 leading-relaxed">
                  {approach || "We embrace a holistic approach to community service, combining traditional Islamic scholarship with contemporary understanding. Our award-winning architecture itself reflects this philosophy - a modern Australian design that incorporates traditional Islamic elements, creating something truly unique."}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do at the Australian Islamic Centre.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = iconMap[value.icon.toLowerCase()] || Heart;
              return (
                <StaggerItem key={value.title}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="text-center p-8 rounded-2xl bg-gradient-to-b from-white to-neutral-50 border border-gray-100 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-neutral-950 relative overflow-hidden">
        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.5) 40px,
                rgba(255,255,255,0.5) 41px
              )`,
            }}
          />
        </div>

        {/* Horizontal accent lines */}
        <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
        <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

        {/* Accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <FadeIn>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/50 text-teal-400 text-xs font-medium tracking-wide uppercase mb-6">
                <Calendar className="w-3.5 h-3.5" />
                Our Journey
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                A Legacy of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-300">
                  Service
                </span>
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto text-lg">
                From humble beginnings to an architectural landmark
              </p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Timeline track - background (centered on mobile, left-center on desktop) */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-1 bg-neutral-800 rounded-full" />

            {/* Timeline track - animated fill */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 top-0 w-1 bg-gradient-to-b from-teal-400 via-teal-500 to-teal-600 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            <div className="space-y-8 lg:space-y-24">
              {timeline.map((item, index) => {
                const IconComponent = iconMap[item.icon.toLowerCase()] || Users;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex flex-col lg:flex-row items-center gap-6 lg:gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline node with year - centered on both mobile and desktop */}
                    <div className="relative z-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
                        className="relative flex flex-col items-center"
                      >
                        {/* Year label - visible on desktop above the node */}
                        <div className="hidden lg:block mb-2">
                          <span className="px-4 py-2 bg-teal-500 text-white text-base font-bold rounded-lg shadow-lg shadow-teal-500/30">
                            {item.year}
                          </span>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 w-8 h-8 lg:w-4 lg:h-4 bg-teal-500 rounded-full blur-md opacity-60 lg:top-auto lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2" />
                        {/* Node with year on mobile, small dot on desktop */}
                        <div className="relative w-14 h-14 lg:w-4 lg:h-4 rounded-full bg-teal-500 border-4 lg:border-2 border-neutral-950 flex items-center justify-center">
                          <span className="text-xs font-bold text-white lg:hidden">{item.year.replace("s", "")}</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content card */}
                    <div className={`flex-1 w-full lg:w-auto ${index % 2 === 0 ? "lg:pr-20" : "lg:pl-20"}`}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl overflow-hidden group hover:border-neutral-700 transition-colors"
                      >
                        {/* Image */}
                        <div className="relative h-40 sm:h-48 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
                        </div>

                        {/* Text content */}
                        <div className="p-5 sm:p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-teal-500/20 flex items-center justify-center shrink-0">
                              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
                          </div>
                          <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">{item.description}</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 hidden lg:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium mb-4">
                <Handshake className="w-4 h-4" />
                Community Partners
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Working Together</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We are proud to partner with various government and community organizations
                to promote education, health, environment, and community cohesion.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.map((partner) => (
              <StaggerItem key={partner.name}>
                <div className="bg-neutral-50 rounded-xl p-6 text-center border border-gray-100 hover:border-teal-200 transition-colors">
                  <Building className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                  <p className="font-medium text-gray-900 text-sm">{partner.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{partner.category}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Architecture Highlight */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium mb-6">
                  <Globe className="w-4 h-4" />
                  Architectural Icon
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Award-Winning Design
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Designed by Pritzker Prize-winning architect Glenn Murcutt in collaboration with
                  Hakan Elevli, the Australian Islamic Centre is a masterpiece of contemporary
                  Islamic architecture that has attracted visitors from around the world.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  The design features 96 lanterns that allow natural light to filter through,
                  creating a spiritual atmosphere inspired by traditional Islamic geometric patterns
                  while being distinctly Australian in character.
                </p>
                <Button
                  href="/architecture"
                  variant="primary"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore Our Architecture
                </Button>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative">
                <Image
                  src="/images/aic 9.jpeg"
                  alt="AIC Architecture"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-800 via-neutral-700 to-sage-700">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
              <p className="text-white/70">Numbers that reflect our commitment to the community.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Experience the Australian Islamic Centre
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re joining us for prayer, exploring our architecture, or learning about Islam,
              you&apos;re always welcome at the AIC.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                href="/visit"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Plan Your Visit
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
