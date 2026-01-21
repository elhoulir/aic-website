"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  ArrowRight,
  Clock,
  Phone,
  Mail,
  Heart,
  BookOpen,
  Users,
  Sparkles,
  Award,
  HandHeart,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  schedule: string;
  contact: string;
  icon: string;
}

interface ServicesPageClientProps {
  services: Service[];
  phone: string;
}

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Heart,
  Users,
  HandHeart,
  Sparkles,
  Award,
};

const additionalServices = [
  {
    title: "Daily Prayers",
    description: "Join us for the five daily congregational prayers",
    icon: Sparkles,
    href: "/worshippers#prayers",
  },
  {
    title: "Friday Jumu'ah",
    description: "Arabic (1:00 PM) and English (2:15 PM) sessions",
    icon: BookOpen,
    href: "/worshippers#jumuah",
  },
  {
    title: "Library Services",
    description: "Access our collection of Islamic books and resources",
    icon: BookOpen,
    href: "/contact",
  },
  {
    title: "Facility Hire",
    description: "Hire our facilities for community events",
    icon: Award,
    href: "/contact",
  },
];

export default function ServicesPageClient({ services, phone }: ServicesPageClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/aic 10.webp"
            alt="Services at Australian Islamic Centre"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-800/70 to-neutral-900/90" />
        </motion.div>

        <div className="relative h-full flex flex-col">
          <div className="pt-24 px-6">
            <div className="max-w-7xl mx-auto">
              <Breadcrumb />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center text-center">
            <div className="max-w-4xl mx-auto px-6">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-lime-400 text-sm font-medium mb-6">
                  <Heart className="w-4 h-4" />
                  Our Services
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Serving Our Community with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400">
                    Dedication
                  </span>
                </h1>
                <p className="text-xl text-white/80 max-w-2xl mx-auto">
                  From spiritual guidance to practical support, we offer comprehensive services to meet the diverse needs
                  of our community.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-8 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile/Tablet: Compact Quick Links */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon] || BookOpen;
                return (
                  <a
                    key={service.id}
                    href={`#${service.id}`}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-teal-50 to-green-50 border border-teal-100 hover:border-teal-300 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 text-center leading-tight">
                      {service.title}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Desktop: Full Service Cards */}
          <StaggerContainer className="hidden lg:grid lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || BookOpen;
              return (
                <StaggerItem key={service.id}>
                  <ServiceCard
                    icon={<IconComponent className="w-6 h-6" />}
                    title={service.title}
                    description={service.subtitle}
                    features={service.features}
                    href={`#${service.id}`}
                  />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        const IconComponent = iconMap[service.icon] || BookOpen;

        return (
          <section key={service.id} id={service.id} className={`py-24 ${isEven ? "bg-white" : "bg-neutral-50"}`}>
            <div className="max-w-7xl mx-auto px-6">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                <FadeIn direction={isEven ? "left" : "right"}>
                  <div className={`${!isEven ? "lg:order-2" : ""}`}>
                    <div className="relative">
                      <Image src={service.image} alt={service.title} width={600} height={400} className="rounded-2xl shadow-2xl" />
                      <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Service</p>
                            <p className="font-semibold text-gray-900">{service.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn direction={isEven ? "right" : "left"}>
                  <div className={`${!isEven ? "lg:order-1" : ""}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium mb-4">
                      {service.subtitle}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{service.title}</h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">{service.description}</p>

                    {/* Features */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Schedule & Contact */}
                    <div className="space-y-3 mb-8">
                      {service.schedule && (
                        <div className="flex items-center gap-3 text-gray-600">
                          <Clock className="w-5 h-5 text-teal-600" />
                          <span>{service.schedule}</span>
                        </div>
                      )}
                      {service.contact && (
                        <div className="flex items-center gap-3 text-gray-600">
                          {service.contact.includes("@") ? (
                            <>
                              <Mail className="w-5 h-5 text-teal-600" />
                              <a
                                href={`mailto:${service.contact}?subject=${encodeURIComponent(`${service.title} Enquiry - Australian Islamic Centre`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-neutral-700"
                              >
                                {service.contact}
                              </a>
                            </>
                          ) : (
                            <>
                              <Phone className="w-5 h-5 text-teal-600" />
                              <a href={`tel:${service.contact}`} className="hover:text-neutral-700">
                                {service.contact}
                              </a>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Button href="/contact" variant="primary" icon={<ArrowRight className="w-5 h-5" />}>
                        Enquire Now
                      </Button>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        );
      })}

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">More Services</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Explore other services and facilities available at the Australian Islamic Centre.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service) => (
              <StaggerItem key={service.title}>
                <motion.a
                  href={service.href}
                  whileHover={{ y: -4 }}
                  className="block bg-neutral-50 rounded-xl p-6 border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-gradient-to-br from-neutral-800 via-neutral-700 to-sage-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need Assistance with Our Services?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our friendly staff are here to help you with any enquiries. Reach out to us and we&apos;ll be happy to assist.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="white" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Contact Us
              </Button>
              <Button
                href={`tel:${phone}`}
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
                icon={<Phone className="w-5 h-5" />}
              >
                Call Now
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
