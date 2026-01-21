"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { Heart, ArrowRight, Sparkles, Check, Shield, Award, HandHeart } from "lucide-react";

const donationOptions = [
  { amount: 25, label: "Feed a Family", description: "Provide meals for a family in need" },
  { amount: 50, label: "Education Fund", description: "Support a student's learning journey" },
  { amount: 100, label: "Zakat", description: "Fulfill your zakat obligation" },
  { amount: 250, label: "Building Fund", description: "Contribute to centre maintenance" },
];

const impactStats = [
  { value: "5,000+", label: "Meals Served Annually" },
  { value: "200+", label: "Students Supported" },
  { value: "100%", label: "Goes to Charity" },
];

export function DonationCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-neutral-900 to-neutral-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: `${10 + i * 15}%`,
              y: "100%",
              opacity: 0.1 + (i * 0.05),
              scale: 0.5 + (i * 0.1),
            }}
            animate={{
              y: "-20%",
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              y: { duration: 15 + i * 3, repeat: Infinity, ease: "linear" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Heart className={`w-${8 + i * 2} h-${8 + i * 2} text-green-500/20`} />
          </motion.div>
        ))}

        {/* Gradient orbs */}
        <motion.div
          style={{ y }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]) }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 relative">
        {/* Main content card */}
        <motion.div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "linear-gradient(90deg, #00ad4c, #98c93c, #00ad4c)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: isHovering ? ["0% 0%", "100% 0%"] : "0% 0%",
            }}
            transition={{ duration: 2, repeat: isHovering ? Infinity : 0, ease: "linear" }}
          />

          {/* Inner content */}
          <div className="relative m-[2px] rounded-3xl bg-gradient-to-br from-neutral-800 via-neutral-850 to-neutral-900 overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="donation-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#donation-pattern)" />
              </svg>
            </div>

            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <FadeIn direction="left">
                  <div>
                    {/* Animated icon */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-lime-500 flex items-center justify-center mb-8 shadow-lg shadow-green-500/25"
                    >
                      <HandHeart className="w-10 h-10 text-white" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      Your Generosity{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400">
                        Transforms Lives
                      </span>
                    </h2>

                    <p className="text-lg text-white/70 mb-8 leading-relaxed">
                      Every contribution, no matter the size, helps us maintain our beautiful centre,
                      run life-changing educational programs, and support those in need within our community.
                    </p>

                    {/* Impact stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {impactStats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="text-center"
                        >
                          <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400">
                            {stat.value}
                          </div>
                          <div className="text-white/50 text-sm mt-1">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap gap-4">
                      {[
                        { icon: Shield, text: "Secure Payment" },
                        { icon: Award, text: "Tax Deductible" },
                        { icon: Check, text: "Registered Charity" },
                      ].map((badge, index) => (
                        <motion.div
                          key={badge.text}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
                        >
                          <badge.icon className="w-4 h-4 text-lime-400" />
                          <span className="text-white/70 text-sm">{badge.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                {/* Right side - Donation selector */}
                <FadeIn direction="right" delay={0.2}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-6">Choose Your Impact</h3>

                    {/* Amount buttons */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {donationOptions.map((option, index) => (
                        <motion.button
                          key={option.amount}
                          onClick={() => setSelectedAmount(option.amount)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          className={`relative p-4 rounded-xl text-left transition-all duration-300 overflow-hidden ${
                            selectedAmount === option.amount
                              ? "bg-gradient-to-br from-green-500 to-lime-500 text-white shadow-lg shadow-green-500/25"
                              : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 hover:border-white/20"
                          }`}
                        >
                          {selectedAmount === option.amount && (
                            <motion.div
                              layoutId="selectedDonation"
                              className="absolute inset-0 bg-gradient-to-br from-green-500 to-lime-500"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <div className="relative">
                            <div className="text-2xl font-bold mb-1">${option.amount}</div>
                            <div className={`text-sm ${selectedAmount === option.amount ? "text-white/90" : "text-white/60"}`}>
                              {option.label}
                            </div>
                          </div>
                          <AnimatePresence>
                            {selectedAmount === option.amount && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute top-2 right-2"
                              >
                                <Check className="w-5 h-5" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      ))}
                    </div>

                    {/* Selected option description */}
                    <AnimatePresence mode="wait">
                      {selectedAmount && (
                        <motion.div
                          key={selectedAmount}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10"
                        >
                          <p className="text-white/70 text-sm">
                            {donationOptions.find(o => o.amount === selectedAmount)?.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action buttons */}
                    <div className="space-y-3">
                      <Button
                        href={`/donate?amount=${selectedAmount || 100}`}
                        variant="gold"
                        size="lg"
                        className="w-full justify-center"
                        icon={<ArrowRight className="w-5 h-5" />}
                      >
                        Donate ${selectedAmount || 100} Now
                      </Button>
                      <Button
                        href="/donate#recurring"
                        variant="outline"
                        size="lg"
                        className="w-full justify-center border-white/20 text-white hover:bg-white/10"
                        icon={<Sparkles className="w-5 h-5" />}
                      >
                        Set Up Monthly Giving
                      </Button>
                    </div>

                    {/* Custom amount link */}
                    <p className="text-center mt-4 text-white/50 text-sm">
                      Want to give a different amount?{" "}
                      <a href="/donate" className="text-lime-400 hover:text-lime-300 underline underline-offset-2">
                        Enter custom amount
                      </a>
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
