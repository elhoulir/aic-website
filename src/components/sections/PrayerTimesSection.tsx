"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { prayerTimes, jumuahTimes } from "@/data/content";
import { Sunrise, Sun, Cloud, Sunset, Moon, Clock } from "lucide-react";

const prayers = [
  { name: "Fajr", adhan: prayerTimes.fajr.adhan, iqamah: prayerTimes.fajr.iqamah, icon: Moon, arabic: "الفجر", color: "from-indigo-500 to-purple-600" },
  { name: "Sunrise", adhan: prayerTimes.sunrise.adhan, iqamah: "-", icon: Sunrise, arabic: "الشروق", color: "from-orange-400 to-amber-500" },
  { name: "Dhuhr", adhan: prayerTimes.dhuhr.adhan, iqamah: prayerTimes.dhuhr.iqamah, icon: Sun, arabic: "الظهر", color: "from-yellow-400 to-orange-500" },
  { name: "Asr", adhan: prayerTimes.asr.adhan, iqamah: prayerTimes.asr.iqamah, icon: Cloud, arabic: "العصر", color: "from-blue-400 to-cyan-500" },
  { name: "Maghrib", adhan: prayerTimes.maghrib.adhan, iqamah: prayerTimes.maghrib.iqamah, icon: Sunset, arabic: "المغرب", color: "from-rose-400 to-red-500" },
  { name: "Isha", adhan: prayerTimes.isha.adhan, iqamah: prayerTimes.isha.iqamah, icon: Moon, arabic: "العشاء", color: "from-purple-500 to-indigo-600" },
];

export function PrayerTimesSection() {
  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section id="prayer-times" className="py-20 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 30L30 55L5 30z' fill='none' stroke='%2316a34a' stroke-opacity='0.1' stroke-width='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium mb-4">
              <Clock className="w-4 h-4" />
              Today&apos;s Prayer Times
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prayer Times for Newport, Melbourne
            </h2>
            <p className="text-gray-600 text-lg">{today}</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {prayers.map((prayer) => (
            <StaggerItem key={prayer.name}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10"
                  style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                />
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center">
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${prayer.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <prayer.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-gold-600 text-lg font-arabic mb-1">{prayer.arabic}</p>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">{prayer.name}</h3>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Adhan: <span className="font-medium text-gray-700">{prayer.adhan}</span></p>
                    {prayer.iqamah !== "-" && (
                      <p className="text-lg font-bold text-neutral-700">Iqamah: {prayer.iqamah}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Jumu'ah Times */}
        <FadeIn delay={0.3}>
          <div className="mt-12 bg-gradient-to-r from-neutral-600 to-sage-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Friday Jumu&apos;ah Prayer</h3>
              <p className="text-white/80">Join us every Friday for congregational prayer</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {jumuahTimes.map((session) => (
                <div key={session.session} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <p className="text-white/70 text-sm mb-1">{session.language} Khutbah</p>
                  <p className="text-xl font-bold mb-1">{session.session}</p>
                  <p className="text-3xl font-bold text-teal-300">{session.time}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Times are calculated for Newport, VIC. Please arrive early for congregational prayer.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
