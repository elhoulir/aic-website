"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SearchDialog } from "@/components/ui/SearchDialog";
import { aicInfo } from "@/data/content";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Heart,
  Clock,
  MapPin,
  Phone,
  ExternalLink,
} from "lucide-react";

const navigation = [
  {
    name: "Home",
    href: "/",
    children: [
      { name: "Prayer Times", href: "/#prayer-times" },
      { name: "For Worshippers", href: "/worshippers" },
      { name: "For Visitors", href: "/visit" },
      { name: "AIC College", href: aicInfo.externalLinks.college, external: true },
      { name: "AIC Bookstore", href: aicInfo.externalLinks.bookstore, external: true },
      { name: "Newport Storm FC", href: aicInfo.externalLinks.newportStorm, external: true },
    ],
  },
  { name: "About", href: "/about" },
  {
    name: "Worshippers",
    href: "/worshippers",
    children: [
      { name: "Daily Prayers", href: "/worshippers#prayers" },
      { name: "Friday Sermons", href: "/worshippers#jumuah" },
      { name: "Mosque Etiquette", href: "/worshippers#etiquette" },
      { name: "Religious Programs", href: "/worshippers#programs" },
      { name: "Events", href: "/events" },
      { name: "Services", href: "/services" },
      { name: "Getting to AIC", href: "/visit#directions" },
    ],
  },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Religious Services", href: "/services#religious" },
      { name: "Funeral Services", href: "/services#funeral" },
      { name: "Nikah Services", href: "/services#nikah" },
      { name: "Counselling & Support", href: "/services#counselling" },
    ],
  },
  {
    name: "Visitors",
    href: "/visit",
    children: [
      { name: "Visiting Hours", href: "/visit#hours" },
      { name: "Book a Visit", href: "/visit#book" },
      { name: "Mosque Manners", href: "/visit#manners" },
      { name: "360° Tour", href: "/visit#virtual-tour" },
      { name: "Getting to AIC", href: "/visit#directions" },
      { name: "FAQs", href: "/visit#faq" },
    ],
  },
  {
    name: "Programs",
    href: "/programs",
    children: [
      { name: "Education Programs", href: "/programs#education" },
      { name: "AIC College", href: aicInfo.externalLinks.college, external: true },
      { name: "AIC Salam School", href: "/programs#salam" },
      { name: "IQRA Academy", href: "/programs#iqra" },
      { name: "Al-Noor Institute", href: "/programs#alnoor" },
      { name: "Sports & Youth", href: "/programs#youth" },
      { name: "Newport Storm FC", href: aicInfo.externalLinks.newportStorm, external: true },
      { name: "Boys Youth Nights", href: "/programs#boysynights" },
    ],
  },
  {
    name: "News & Media",
    href: "/media",
    children: [
      { name: "Latest Updates", href: "/media#updates" },
      { name: "Social Media", href: "/media#social" },
      { name: "Podcasts", href: "/media#podcasts" },
      { name: "Gallery", href: "/media#gallery" },
    ],
  },
  { name: "Architecture", href: "/architecture" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-neutral-900 text-white/90 py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-lime-400" />
              <span>Next Prayer: Dhuhr 1:30 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-lime-400" />
              <span>{aicInfo.address.full}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href={`tel:${aicInfo.phone}`} className="flex items-center gap-2 hover:text-lime-400 transition-colors">
              <Phone className="w-4 h-4" />
              <span>{aicInfo.phone}</span>
            </a>
            <Link href="/contact" className="hover:text-lime-400 transition-colors">
              Contact
            </Link>
            <Link href="/media#updates" className="hover:text-teal-400 transition-colors">
              Announcements
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-neutral-900/90 backdrop-blur-sm"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group relative h-12">
              {/* Logo for dark background (not scrolled) */}
              <Image
                src="/images/aic logo.png"
                alt="Australian Islamic Centre"
                width={120}
                height={48}
                className={cn(
                  "h-12 w-auto object-contain transition-opacity duration-300",
                  isScrolled ? "opacity-0" : "opacity-100"
                )}
              />
              {/* Logo for white background (scrolled) */}
              <Image
                src="/images/aic website logo.svg"
                alt="Australian Islamic Centre"
                width={120}
                height={48}
                className={cn(
                  "h-12 w-auto object-contain absolute left-0 top-0 transition-opacity duration-300",
                  isScrolled ? "opacity-100" : "opacity-0"
                )}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm",
                      isScrolled
                        ? "text-gray-700 hover:text-neutral-900 hover:bg-neutral-100"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        activeDropdown === item.name && "rotate-180"
                      )} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 py-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        {item.children.map((child) => (
                          child.external ? (
                            <a
                              key={child.name}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                            >
                              <span className="text-green-600 font-medium">{child.name}</span>
                              <ExternalLink className="w-3 h-3 text-green-500" />
                            </a>
                          ) : (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2.5 text-gray-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                            >
                              {child.name}
                            </Link>
                          )
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "p-2.5 rounded-lg transition-all duration-200",
                  isScrolled
                    ? "text-gray-600 hover:text-neutral-900 hover:bg-neutral-100"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Button
                href="/donate"
                variant={isScrolled ? "gold" : "gold"}
                size="sm"
                icon={<Heart className="w-4 h-4" />}
                className="hidden sm:inline-flex"
              >
                Donate
              </Button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className={cn(
                  "xl:hidden p-2.5 rounded-lg transition-all duration-200",
                  isScrolled
                    ? "text-gray-600 hover:text-neutral-900 hover:bg-neutral-100"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 xl:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 xl:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-neutral-900">Menu</h2>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg font-medium text-gray-900 hover:text-neutral-900 hover:bg-neutral-100"
                      >
                        {item.name}
                      </Link>
                      {item.children && (
                        <div className="ml-4 border-l-2 border-neutral-200 pl-4 space-y-1">
                          {item.children.map((child) => (
                            child.external ? (
                              <a
                                key={child.name}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:text-green-700"
                              >
                                {child.name}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-neutral-900"
                              >
                                {child.name}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <Button href="/donate" variant="gold" className="w-full" icon={<Heart className="w-4 h-4" />}>
                    Make a Donation
                  </Button>
                </div>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>{aicInfo.address.street}, {aicInfo.address.suburb}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span>{aicInfo.phone}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
