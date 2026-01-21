"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Breadcrumb } from "./Breadcrumb";

interface PageHeroProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  badge?: string;
  image: string;
  imageAlt?: string;
  height?: "short" | "medium" | "tall";
  children?: React.ReactNode;
}

export function PageHero({
  title,
  highlight,
  subtitle,
  badge,
  image,
  imageAlt,
  height = "medium",
  children,
}: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heightClasses = {
    short: "h-[50vh] min-h-[400px]",
    medium: "h-[60vh] min-h-[450px]",
    tall: "h-[70vh] min-h-[500px]",
  };

  return (
    <section ref={heroRef} className={`relative ${heightClasses[height]} overflow-hidden`}>
      <motion.div style={{ y: heroY }} className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-800/70 to-neutral-900/90" />
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative h-full flex flex-col justify-center"
      >
        {/* Breadcrumb at top */}
        <div className="absolute top-24 left-0 right-0 px-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb />
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          {badge && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lime-400 text-lg mb-4"
            >
              {badge}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {title}{" "}
            {highlight && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400">
                {highlight}
              </span>
            )}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/80 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
