"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/Card";
import { stats } from "@/data/content";
import { ArrowRight, Users, GraduationCap, Heart, Calendar } from "lucide-react";
import Image from "next/image";

const statIcons = [Calendar, Users, GraduationCap, Heart];

export function AboutPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neutral-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <FadeIn direction="left">
            <div className="relative">
              {/* Main image */}
              <motion.div
                style={{ y: imageY }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/aic 9.jpeg"
                  alt="Australian Islamic Centre exterior"
                  width={600}
                  height={700}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-800/50 to-transparent" />
              </motion.div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 right-0 md:-bottom-8 md:-right-8 bg-white rounded-2xl p-4 md:p-6 shadow-2xl max-w-[200px] md:max-w-xs"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-neutral-700">40+</p>
                    <p className="text-gray-600 text-xs md:text-sm">Years of Service</p>
                  </div>
                </div>
                <p className="text-gray-600 text-xs md:text-sm hidden md:block">
                  Serving the Muslim community of Sydney since 1983.
                </p>
              </motion.div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-32 h-32 border-t-4 border-l-4 border-teal-500 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-4 border-r-4 border-teal-500 rounded-br-3xl" />
            </div>
          </FadeIn>

          {/* Content Side */}
          <FadeIn direction="right">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium mb-6">
                About Our Centre
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                A Beacon of Faith,{" "}
                <span className="text-gradient">Knowledge & Unity</span>
              </h2>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The Australian Islamic Centre stands as one of Sydney&apos;s most significant
                Islamic institutions. Our award-winning architecture houses a vibrant
                community dedicated to worship, education, and service.
              </p>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From daily prayers to comprehensive educational programs, from community
                events to social services, we serve as a complete Islamic centre for
                Muslims of all ages and backgrounds.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Award-winning Architecture",
                  "5 Daily Prayers",
                  "Educational Programs",
                  "Community Services",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                href="/about"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Learn More About Us
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* Stats Section */}
        <div className="mt-16 md:mt-24">
          <div className="bg-gradient-to-br from-neutral-800 via-neutral-700 to-sage-700 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-12 pattern-overlay">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {stats.map((stat, index) => {
                const Icon = statIcons[index];
                return (
                  <StatCard
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    icon={<Icon className="w-6 h-6 md:w-8 md:h-8" />}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
