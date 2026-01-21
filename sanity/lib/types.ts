import type { Image, PortableTextBlock } from "sanity";

// Base types
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityImage extends Image {
  alt?: string;
}

export interface SanitySlug {
  current: string;
}

// Site Settings
export interface SiteSettings {
  siteName: string;
  tagline?: string;
  description?: string;
  logo?: SanityImage;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
}

// Contact Info
export interface ContactInfo {
  phone: string;
  email: string;
  address?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  country?: string;
  googleMapsUrl?: string;
  openingHours?: Array<{
    days: string;
    hours: string;
  }>;
}

// Donation Config
export interface DonationAmount {
  amount: number;
  label?: string;
  description?: string;
}

export interface DonationFrequency {
  id: string;
  label: string;
  stripePriceIdSuffix?: string;
  enabled: boolean;
}

export interface DonationCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  enabled: boolean;
}

export interface DonationConfig {
  title: string;
  subtitle?: string;
  description?: string;
  heroImage?: SanityImage;
  suggestedAmounts?: DonationAmount[];
  allowCustomAmount: boolean;
  minimumAmount: number;
  maximumAmount?: number;
  frequencies?: DonationFrequency[];
  donationCategories?: DonationCategory[];
  impactStats?: Array<{
    stat: string;
    label: string;
  }>;
  thankYouMessage?: string;
  bankDetails?: {
    enabled: boolean;
    bankName?: string;
    accountName?: string;
    bsb?: string;
    accountNumber?: string;
    reference?: string;
  };
}

// Event
export interface Event {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  content?: PortableTextBlock[];
  image?: SanityImage;
  startDate: string;
  endDate?: string;
  location?: string;
  category?: "religious" | "community" | "youth" | "education" | "fundraising" | "special";
  isRecurring?: boolean;
  recurrencePattern?: "daily" | "weekly" | "monthly";
  registrationRequired?: boolean;
  registrationUrl?: string;
  isFeatured?: boolean;
}

// Program
export interface ProgramSchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Program {
  _id: string;
  title: string;
  slug: SanitySlug;
  shortDescription?: string;
  fullDescription?: PortableTextBlock[];
  image?: SanityImage;
  category?: "youth" | "education" | "women" | "seniors" | "family" | "community" | "sports";
  ageGroup?: string;
  schedule?: ProgramSchedule[];
  location?: string;
  contactEmail?: string;
  contactPhone?: string;
  features?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
}

// Service
export interface Service {
  _id: string;
  title: string;
  slug: SanitySlug;
  subtitle?: string;
  description: string;
  image?: SanityImage;
  icon?: string;
  features?: string[];
  schedule?: string;
  contactEmail?: string;
  contactPhone?: string;
  ctaText?: string;
  ctaLink?: string;
}

// Prayer Times
export interface Prayer {
  name: "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";
  adhan?: string;
  iqamah?: string;
}

export interface JumuahTime {
  session: string;
  time: string;
}

export interface PrayerTimes {
  title: string;
  effectiveDate: string;
  prayers?: Prayer[];
  jumuahTimes?: JumuahTime[];
  notes?: string;
}

// Announcement
export interface Announcement {
  _id: string;
  title: string;
  message: string;
  type?: "info" | "warning" | "success" | "urgent";
  link?: string;
  linkText?: string;
  showOnHomepage?: boolean;
  showAsBanner?: boolean;
  dismissible?: boolean;
}

// Testimonial
export interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role?: string;
  image?: SanityImage;
  category?: "general" | "programs" | "services" | "education" | "youth";
}

// Team Member
export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image?: SanityImage;
  bio?: string;
  email?: string;
  phone?: string;
  category?: "leadership" | "religious" | "administration" | "education" | "youth" | "board";
}

// Podcast
export interface Podcast {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  speaker?: string;
  image?: SanityImage;
  audioFile?: {
    asset: {
      url: string;
    };
  };
  externalAudioUrl?: string;
  videoUrl?: string;
  duration?: string;
  publishedAt: string;
  category?: "khutbah" | "lecture" | "qa" | "special" | "ramadan";
  tags?: string[];
  isFeatured?: boolean;
}

// Gallery Image
export interface GalleryImage {
  _id: string;
  title: string;
  image: SanityImage;
  description?: string;
  category?: "architecture" | "events" | "community" | "programs" | "historical";
  dateTaken?: string;
  photographer?: string;
}

// Home Page
export interface HomePage {
  heroSection?: {
    headline?: string;
    subheadline?: string;
    backgroundImage?: SanityImage;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
  quickAccessSection?: {
    title?: string;
    subtitle?: string;
    cards?: Array<{
      title: string;
      description?: string;
      icon?: string;
      link?: string;
      linkText?: string;
      image?: SanityImage;
    }>;
  };
  aboutPreview?: {
    tagline?: string;
    title?: string;
    description?: string;
    image?: SanityImage;
    stats?: Array<{
      value: string;
      label: string;
    }>;
    buttonText?: string;
    buttonLink?: string;
  };
  donationCta?: {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage?: SanityImage;
  };
  sectionVisibility?: {
    showQuickAccess?: boolean;
    showAboutPreview?: boolean;
    showServices?: boolean;
    showEvents?: boolean;
    showPrograms?: boolean;
    showTestimonials?: boolean;
    showSocialMedia?: boolean;
    showDonationCta?: boolean;
  };
}

// About Page
export interface AboutPage {
  heroSection?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: SanityImage;
  };
  mission?: {
    title?: string;
    content?: PortableTextBlock[];
  };
  vision?: {
    title?: string;
    content?: PortableTextBlock[];
  };
  history?: {
    title?: string;
    content?: PortableTextBlock[];
    timeline?: Array<{
      year: string;
      title: string;
      description?: string;
      image?: SanityImage;
    }>;
  };
  values?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  architecture?: {
    title?: string;
    content?: PortableTextBlock[];
    images?: SanityImage[];
    architect?: string;
    completionYear?: string;
    awards?: string[];
  };
}
