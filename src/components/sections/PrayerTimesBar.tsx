"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { prayerTimes, jumuahTimes } from "@/data/content";

interface PrayerTime {
  name: string;
  time: string;
}

const prayers: PrayerTime[] = [
  { name: "Fajr", time: prayerTimes.fajr.iqamah },
  { name: "Dhuhr", time: prayerTimes.dhuhr.iqamah },
  { name: "Asr", time: prayerTimes.asr.iqamah },
  { name: "Maghrib", time: prayerTimes.maghrib.iqamah },
  { name: "Isha", time: prayerTimes.isha.iqamah },
];

// Daily prayers only (excluding Jumu'ah for next prayer calculation)
const dailyPrayers: PrayerTime[] = [
  { name: "Fajr", time: prayerTimes.fajr.iqamah },
  { name: "Dhuhr", time: prayerTimes.dhuhr.iqamah },
  { name: "Asr", time: prayerTimes.asr.iqamah },
  { name: "Maghrib", time: prayerTimes.maghrib.iqamah },
  { name: "Isha", time: prayerTimes.isha.iqamah },
];

function getNextPrayer(): { name: string; time: string } {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  // Parse prayer times to minutes
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

  const prayerMinutes = dailyPrayers.map(p => ({
    name: p.name,
    time: p.time,
    minutes: parseTime(p.time)
  }));

  // Find next prayer
  for (const prayer of prayerMinutes) {
    if (prayer.minutes > currentTime) {
      return { name: prayer.name, time: prayer.time };
    }
  }

  // If all prayers have passed, return Fajr (next day)
  return { name: "Fajr", time: dailyPrayers[0].time };
}

export function PrayerTimesBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [nextPrayer, setNextPrayer] = useState({ name: "Dhuhr", time: prayerTimes.dhuhr.iqamah });

  useEffect(() => {
    setNextPrayer(getNextPrayer());

    // Update every minute
    const interval = setInterval(() => {
      setNextPrayer(getNextPrayer());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-neutral-900 text-white">
      {/* Desktop View - Always visible full bar */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2">
          {/* First line: Prayer Times label, Next prayer, and daily prayers */}
          <div className="flex items-center whitespace-nowrap overflow-x-auto gap-4 lg:gap-6">
            {/* Prayer Times label and Next Prayer */}
            <div className="flex items-center gap-3 pr-4 border-r border-white/20 flex-shrink-0">
              <span className="text-white font-semibold text-sm">Prayer Times</span>
              <span className="text-white/40">|</span>
              <span className="text-white/60 text-sm">Next:</span>
              <span className="text-teal-400 font-bold">{nextPrayer.name} {nextPrayer.time}</span>
            </div>

            {/* All Daily Prayer Times in single line */}
            {prayers.map((prayer) => (
              <div
                key={prayer.name}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0 ${
                  nextPrayer.name === prayer.name
                    ? "bg-teal-500/20 border border-teal-500/30"
                    : "hover:bg-white/5"
                }`}
              >
                <span className={`text-sm font-medium ${
                  nextPrayer.name === prayer.name ? "text-teal-400" : "text-white/70"
                }`}>
                  {prayer.name}
                </span>
                <span className={`font-semibold text-sm ${
                  nextPrayer.name === prayer.name ? "text-teal-400" : "text-white"
                }`}>
                  {prayer.time}
                </span>
              </div>
            ))}
          </div>

          {/* Second line: Jumu'ah times */}
          <div className="flex items-center whitespace-nowrap gap-4 lg:gap-6 mt-2 pt-2 border-t border-white/10">
            <span className="text-white/70 text-sm font-semibold flex-shrink-0">Jumu&apos;ah (Friday)</span>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5">
                <span className="text-white/60 text-sm">Arabic</span>
                <span className="text-white font-semibold text-sm">{jumuahTimes[0].time}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5">
                <span className="text-white/60 text-sm">English</span>
                <span className="text-white font-semibold text-sm">{jumuahTimes[1].time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Collapsed with dropdown */}
      <div className="md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3"
        >
          <div className="flex items-center justify-between whitespace-nowrap">
            {/* Left: Prayer Times label and Next Prayer */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-white font-semibold text-sm">Prayer Times</span>
              <span className="text-white/40">|</span>
              <span className="text-white/60 text-xs">Next:</span>
              <span className="text-teal-400 font-bold text-sm">{nextPrayer.name} {nextPrayer.time}</span>
            </div>

            {/* Right: Expand button */}
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-white/60" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/60" />
              )}
            </div>
          </div>
        </button>

        {/* Expanded Prayer Times */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 space-y-2">
                {/* Daily prayers */}
                <div className="flex items-center whitespace-nowrap overflow-x-auto gap-2">
                  {prayers.map((prayer) => (
                    <div
                      key={prayer.name}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg flex-shrink-0 ${
                        nextPrayer.name === prayer.name
                          ? "bg-teal-500/20 border border-teal-500/30"
                          : "bg-white/5"
                      }`}
                    >
                      <span className={`text-xs font-medium ${
                        nextPrayer.name === prayer.name ? "text-teal-400" : "text-white/60"
                      }`}>
                        {prayer.name}
                      </span>
                      <span className={`font-semibold text-xs ${
                        nextPrayer.name === prayer.name ? "text-teal-400" : "text-white"
                      }`}>
                        {prayer.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Jumu'ah times */}
                <div className="flex items-center whitespace-nowrap gap-2 pt-2 border-t border-white/10">
                  <span className="text-white/70 text-xs font-semibold flex-shrink-0">Jumu&apos;ah</span>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/5 flex-shrink-0">
                    <span className="text-white/60 text-xs">Arabic</span>
                    <span className="text-white font-semibold text-xs">{jumuahTimes[0].time}</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/5 flex-shrink-0">
                    <span className="text-white/60 text-xs">English</span>
                    <span className="text-white font-semibold text-xs">{jumuahTimes[1].time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
