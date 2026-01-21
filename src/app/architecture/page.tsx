"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  ArrowRight,
  Award,
  Sparkles,
  Eye,
  Building,
  Sun,
  Wind,
  Droplet,
  Compass,
} from "lucide-react";

const features = [
  {
    icon: Building,
    title: "99 Names of Allah",
    description: "The 99 beautiful names of Allah are intricately carved into the façade, creating a stunning visual testament to Islamic faith.",
  },
  {
    icon: Sun,
    title: "Natural Light Design",
    description: "Strategic skylight placement floods the prayer hall with natural light, creating an atmosphere of spiritual tranquility.",
  },
  {
    icon: Compass,
    title: "Qibla Orientation",
    description: "The entire building is precisely aligned towards the Kaaba in Mecca, ensuring accurate prayer direction.",
  },
  {
    icon: Wind,
    title: "Sustainable Design",
    description: "Natural ventilation systems and energy-efficient features minimize environmental impact.",
  },
  {
    icon: Droplet,
    title: "Water Features",
    description: "Reflective pools and fountains create a sense of peace and echo traditional Islamic garden design.",
  },
  {
    icon: Sparkles,
    title: "Contemporary Geometry",
    description: "Modern interpretation of traditional Islamic geometric patterns throughout the structure.",
  },
];

const gallery = [
  {
    id: "1",
    src: "/images/aic start.jpg",
    alt: "Main prayer hall interior",
    caption: "The expansive prayer hall with its stunning ceiling design",
  },
  {
    id: "2",
    src: "/images/aic 2.jpg",
    alt: "Exterior architecture",
    caption: "The contemporary façade featuring the 99 names",
  },
  {
    id: "3",
    src: "/images/aic 10.webp",
    alt: "Dome interior",
    caption: "Intricate dome design with natural light",
  },
  {
    id: "4",
    src: "/images/aic 1.jpg",
    alt: "Courtyard",
    caption: "The serene courtyard with water features",
  },
];

const awards = [
  {
    year: "2017",
    title: "Australian Institute of Architects Award",
    category: "Public Architecture",
  },
  {
    year: "2017",
    title: "World Architecture Festival Award",
    category: "Religious Building of the Year",
  },
  {
    year: "2018",
    title: "Aga Khan Award for Architecture",
    category: "Shortlisted",
  },
];

export default function ArchitecturePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <>
      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image
            src="/images/aic end.jpg"
            alt="Australian Islamic Centre Architecture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </motion.div>

        <div className="relative h-full flex flex-col">
          {/* Breadcrumb at top */}
          <div className="pt-24 px-6">
            <div className="max-w-7xl mx-auto">
              <Breadcrumb />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center text-center">
            <div className="max-w-4xl mx-auto px-6">
              <FadeIn>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-lime-400 text-sm font-medium mb-6"
                >
                  <Award className="w-4 h-4" />
                  Award-Winning Architecture
                </motion.div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Where Faith Meets{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400">Modern Design</span>
                </h1>

              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
                A groundbreaking architectural achievement that harmoniously blends
                traditional Islamic principles with contemporary Australian design.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  href="#explore"
                  variant="white"
                  size="lg"
                  icon={<Eye className="w-5 h-5" />}
                >
                  Explore the Design
                </Button>
                <Button
                  href="/visit"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Plan Your Visit
                </Button>
              </div>
            </FadeIn>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-white/60"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section id="explore" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium mb-6">
                  Design Philosophy
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  A Dialogue Between{" "}
                  <span className="text-gradient">Tradition & Innovation</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Designed by the renowned Glenn Murcutt in collaboration with
                  Hakan Elevli, the Australian Islamic Centre represents a
                  masterful synthesis of Islamic architectural traditions and
                  contemporary Australian design sensibilities.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  The building challenges conventional mosque architecture by
                  reimagining sacred space through the lens of Australian light,
                  landscape, and climate. Every element serves both functional
                  and spiritual purposes.
                </p>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-4xl font-bold text-neutral-700">2016</p>
                    <p className="text-gray-500">Completed</p>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div>
                    <p className="text-4xl font-bold text-neutral-700">5,000m²</p>
                    <p className="text-gray-500">Total Area</p>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div>
                    <p className="text-4xl font-bold text-neutral-700">3</p>
                    <p className="text-gray-500">International Awards</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="rounded-2xl overflow-hidden shadow-xl"
                  >
                    <Image
                      src="/images/aic 6.webp"
                      alt="Architecture detail 1"
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="rounded-2xl overflow-hidden shadow-xl mt-8"
                  >
                    <Image
                      src="/images/aic 7.webp"
                      alt="Architecture detail 2"
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                </div>
                {/* Floating award badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Award Winner</p>
                    <p className="text-sm text-gray-500">World Architecture Festival</p>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Design Features */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Architectural Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every element of the design serves both aesthetic and functional purposes,
                creating a space that inspires worship and community gathering.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Gallery Section with Parallax */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Gallery
              </h2>
              <p className="text-lg text-gray-600">
                Experience the beauty of our architectural masterpiece.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {gallery.map((image, index) => (
              <FadeIn key={image.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative rounded-2xl overflow-hidden shadow-xl"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-lg font-medium">{image.caption}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-sage-800">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-teal-400 text-sm font-medium mb-4">
                <Award className="w-4 h-4" />
                Recognition
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Awards & Accolades
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Our architecture has received international recognition for its
                innovative design and cultural significance.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {awards.map((award) => (
              <StaggerItem key={award.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-teal-500/20 flex items-center justify-center mb-6">
                    <Award className="w-8 h-8 text-teal-400" />
                  </div>
                  <p className="text-teal-400 font-bold text-lg mb-2">{award.year}</p>
                  <h3 className="text-white font-bold text-xl mb-2">{award.title}</h3>
                  <p className="text-white/60">{award.category}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Architect Quote */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="relative">
              <div className="text-8xl text-neutral-100 font-serif absolute -top-10 left-0">&ldquo;</div>
              <blockquote className="text-2xl md:text-3xl text-gray-700 italic leading-relaxed relative z-10">
                The challenge was to create a building that speaks to both Islamic
                tradition and Australian identity - a place where faith, light,
                and landscape converge.
              </blockquote>
              <div className="mt-8">
                <p className="font-bold text-gray-900 text-lg">Glenn Murcutt AO</p>
                <p className="text-gray-500">Pritzker Prize Laureate, Lead Architect</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Experience It In Person
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Photos can only capture so much. Visit the Australian Islamic Centre
              to truly experience this architectural masterpiece.
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
              <Button
                href="/media"
                variant="outline"
                size="lg"
              >
                View More Photos
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
