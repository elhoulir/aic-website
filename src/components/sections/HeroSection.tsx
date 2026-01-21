"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { aicImages, prayerTimes as fallbackPrayerTimes, jumuahTimes as fallbackJumuahTimes } from "@/data/content";

// Hero slides with different images and content
const heroSlides = [
  {
    id: 1,
    image: aicImages.interior.prayerHallBright,
    title: "Welcome to the",
    highlight: "Australian Islamic Centre",
    subtitle: "A place of worship, learning, and community",
  },
  {
    id: 2,
    image: aicImages.exterior.front,
    title: "Award-Winning",
    highlight: "Architecture",
    subtitle: "Experience our globally recognized Islamic architecture",
  },
  {
    id: 3,
    image: aicImages.architecture.roofGolden,
    title: "Serving Our",
    highlight: "Community",
    subtitle: "Education, worship, and support for all",
  },
  {
    id: 4,
    image: aicImages.interior.prayerHallNight,
    title: "Join Us in",
    highlight: "Prayer",
    subtitle: "Five daily prayers in our beautiful prayer hall",
  },
  {
    id: 5,
    image: aicImages.exterior.aerialDrone,
    title: "A Beacon of",
    highlight: "Faith & Unity",
    subtitle: "Integrating Australian values with Islamic beauty",
  },
];

interface PrayerTimeData {
  name: string;
  time?: string;
  iqamah?: string;
}

interface JumuahTimeData {
  name?: string;
  time: string;
}

interface HeroSectionProps {
  prayerTimes?: {
    fajr?: PrayerTimeData;
    dhuhr?: PrayerTimeData;
    asr?: PrayerTimeData;
    maghrib?: PrayerTimeData;
    isha?: PrayerTimeData;
  } | null;
  jumuahTimes?: JumuahTimeData[] | null;
}

interface PrayerTime {
  name: string;
  time: string;
}

export function HeroSection({ prayerTimes: cmsPrayerTimes, jumuahTimes: cmsJumuahTimes }: HeroSectionProps) {
  // Build prayers array from CMS or fallback
  const prayers: PrayerTime[] = useMemo(() => {
    if (cmsPrayerTimes) {
      return [
        { name: "Fajr", time: cmsPrayerTimes.fajr?.iqamah || cmsPrayerTimes.fajr?.time || fallbackPrayerTimes.fajr.iqamah },
        { name: "Dhuhr", time: cmsPrayerTimes.dhuhr?.iqamah || cmsPrayerTimes.dhuhr?.time || fallbackPrayerTimes.dhuhr.iqamah },
        { name: "Asr", time: cmsPrayerTimes.asr?.iqamah || cmsPrayerTimes.asr?.time || fallbackPrayerTimes.asr.iqamah },
        { name: "Maghrib", time: cmsPrayerTimes.maghrib?.iqamah || cmsPrayerTimes.maghrib?.time || fallbackPrayerTimes.maghrib.iqamah },
        { name: "Isha", time: cmsPrayerTimes.isha?.iqamah || cmsPrayerTimes.isha?.time || fallbackPrayerTimes.isha.iqamah },
      ];
    }
    return [
      { name: "Fajr", time: fallbackPrayerTimes.fajr.iqamah },
      { name: "Dhuhr", time: fallbackPrayerTimes.dhuhr.iqamah },
      { name: "Asr", time: fallbackPrayerTimes.asr.iqamah },
      { name: "Maghrib", time: fallbackPrayerTimes.maghrib.iqamah },
      { name: "Isha", time: fallbackPrayerTimes.isha.iqamah },
    ];
  }, [cmsPrayerTimes]);

  const jumuahTimes = useMemo(() => {
    if (cmsJumuahTimes?.length) {
      return cmsJumuahTimes;
    }
    return fallbackJumuahTimes;
  }, [cmsJumuahTimes]);

  const getNextPrayer = useCallback((): { name: string; time: string } => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const parseTime = (timeStr: string): number => {
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (!match) return 0;
      let hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const period = match[3]?.toUpperCase();

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      return hours * 60 + minutes;
    };

    const prayerMinutes = prayers.map(p => ({
      name: p.name,
      time: p.time,
      minutes: parseTime(p.time)
    }));

    for (const prayer of prayerMinutes) {
      if (prayer.minutes > currentTime) {
        return { name: prayer.name, time: prayer.time };
      }
    }

    return { name: "Fajr", time: prayers[0].time };
  }, [prayers]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(heroSlides.length).fill(false));
  const [nextPrayer, setNextPrayer] = useState(() => getNextPrayer());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      mouseX.set(x * 15);
      mouseY.set(y * 15);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextPrayer(getNextPrayer());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const getSlideVariant = (type: "enter" | "exit", dir: number) => ({
    x: type === "enter"
      ? (dir > 0 ? "100%" : "-100%")
      : (dir > 0 ? "-100%" : "100%"),
    opacity: 0,
    scale: type === "enter" ? 1.1 : 0.95,
  });

  const centerVariant = {
    x: 0,
    opacity: 1,
    scale: 1,
  };

  const currentSlideData = heroSlides[currentSlide];
  const firstImageLoaded = imagesLoaded[0];

  return (
    <section ref={containerRef} className="relative h-screen min-h-[750px] overflow-hidden bg-black">
      {/* Background Images with Carousel */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-[-20px]"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={getSlideVariant("enter", direction)}
            animate={centerVariant}
            exit={getSlideVariant("exit", direction)}
            transition={{
              x: { type: "spring", stiffness: 50, damping: 20 },
              opacity: { duration: 0.8 },
              scale: { duration: 1.2 },
            }}
            className="absolute inset-0"
            style={{
              x: smoothMouseX,
            }}
          >
            <Image
              src={currentSlideData.image}
              alt={currentSlideData.highlight}
              fill
              priority={currentSlide === 0}
              className="object-cover"
              onLoad={() => handleImageLoad(currentSlide)}
            />

            {/* Ken Burns effect overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.08],
              }}
              transition={{
                duration: 6,
                ease: "linear",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 z-10" />

        {/* Vignette effect */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.5) 100%)"
          }}
        />
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-lime-400/40 rounded-full"
            style={{
              left: `${10 + (i * 6)}%`,
              top: `${20 + (i * 5) % 60}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Animated light sweep */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          animate={{
            x: ["-100%", "400%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 6,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Cursor glow effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none hidden lg:block z-20"
        style={{
          background: "radial-gradient(circle, rgba(152,201,60,0.08) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          opacity: firstImageLoaded ? 1 : 0,
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative h-full flex items-center z-30"
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            {/* Decorative line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-lime-400 via-green-400 to-transparent mb-8 rounded-full"
            />

            {/* Animated text content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  <span className="block">{currentSlideData.title}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-green-400 to-lime-400">
                    {currentSlideData.highlight}
                  </span>
                </motion.h1>

                <motion.p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-2xl">
                  {currentSlideData.subtitle}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  href="/about"
                  variant="white"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore Our Centre
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  href="/visit"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-lime-400/50"
                  icon={<Play className="w-5 h-5" />}
                >
                  Book a Visit
                </Button>
              </motion.div>
            </motion.div>

            {/* Slide indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-3"
            >
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === currentSlide
                        ? "w-12 bg-gradient-to-r from-lime-400 to-green-400"
                        : "w-6 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                  {index === currentSlide && isAutoPlaying && (
                    <motion.div
                      className="absolute inset-0 h-1.5 rounded-full bg-white/30 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                      key={`progress-${currentSlide}`}
                    />
                  )}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-40">
          <motion.button
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>

      {/* Prayer Times Bar - Fixed at bottom, always in view */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-40"
      >
        <div className="backdrop-blur-xl bg-black/50 border-t border-white/10">
          {/* Desktop: Two-line layout */}
          <div className="hidden md:block">
            <div className="max-w-7xl mx-auto px-6 py-3">
              {/* Line 1: Daily Prayer Times */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-sm font-medium">Prayer Times</span>
                  <div className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-sm">Next:</span>
                    <div className="px-3 py-1 rounded-lg bg-green-500/20 border border-green-500/30">
                      <span className="text-green-400 font-bold">{nextPrayer.name}</span>
                      <span className="text-white font-semibold ml-2">{nextPrayer.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {prayers.map((prayer) => (
                    <div
                      key={prayer.name}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                        nextPrayer.name === prayer.name
                          ? "bg-green-500/20 border border-green-500/30"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <span className={`text-sm font-medium ${
                        nextPrayer.name === prayer.name ? "text-green-400" : "text-white/60"
                      }`}>
                        {prayer.name}
                      </span>
                      <span className={`font-semibold text-sm ${
                        nextPrayer.name === prayer.name ? "text-white" : "text-white/80"
                      }`}>
                        {prayer.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Line 2: Jumu'ah Times */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-sm font-medium">Jumu&apos;ah (Friday)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5">
                    <span className="text-white/50 text-sm">Arabic Khutbah</span>
                    <span className="text-lime-400 font-semibold">{jumuahTimes[0].time}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5">
                    <span className="text-white/50 text-sm">English Khutbah</span>
                    <span className="text-lime-400 font-semibold">{jumuahTimes[1].time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Compact two-line layout */}
          <div className="md:hidden">
            <div className="px-4 py-3">
              {/* Line 1: Next prayer + all times scrollable */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-white/60 text-xs">Next:</span>
                  <div className="px-2 py-1 rounded-lg bg-green-500/20 border border-green-500/30">
                    <span className="text-green-400 font-bold text-sm">{nextPrayer.name}</span>
                    <span className="text-white font-semibold text-sm ml-1">{nextPrayer.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {prayers.map((prayer) => (
                    <div
                      key={prayer.name}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg flex-shrink-0 ${
                        nextPrayer.name === prayer.name
                          ? "bg-green-500/20 border border-green-500/30"
                          : "bg-white/5"
                      }`}
                    >
                      <span className={`text-xs font-medium ${
                        nextPrayer.name === prayer.name ? "text-green-400" : "text-white/50"
                      }`}>
                        {prayer.name}
                      </span>
                      <span className={`font-semibold text-xs ${
                        nextPrayer.name === prayer.name ? "text-white" : "text-white/70"
                      }`}>
                        {prayer.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Line 2: Jumu'ah times */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <span className="text-white/50 text-xs flex-shrink-0">Jumu&apos;ah</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5">
                    <span className="text-white/40 text-xs">Ar</span>
                    <span className="text-lime-400 font-semibold text-xs">{jumuahTimes[0].time}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5">
                    <span className="text-white/40 text-xs">En</span>
                    <span className="text-lime-400 font-semibold text-xs">{jumuahTimes[1].time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative corner elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute top-24 right-8 w-32 h-32 hidden lg:block z-20"
      >
        <motion.div
          animate={{ rotate: [0, 90] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-2 border-r-2 border-lime-400/20 rounded-tr-3xl"
        />
        <div className="absolute top-0 right-0 w-2 h-2 bg-lime-400/50 rounded-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-36 left-8 w-32 h-32 hidden lg:block z-20"
      >
        <motion.div
          animate={{ rotate: [0, -90] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-b-2 border-l-2 border-lime-400/20 rounded-bl-3xl"
        />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-lime-400/50 rounded-full" />
      </motion.div>

      {/* Side accent line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 120 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-8 top-1/3 w-px bg-gradient-to-b from-transparent via-lime-400/30 to-transparent hidden xl:block z-20"
      />
    </section>
  );
}
