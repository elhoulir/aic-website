// Sanity document types

export interface SanityEvent {
  _id: string;
  title: string;
  slug: string;
  recurring: boolean;
  date?: string;
  recurringDay?: string;
  time: string;
  location: string;
  category: string;
  image?: SanityImage;
  description: string;
  featured?: boolean;
}

export interface SanityAnnouncement {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content?: string;
  category: string;
  featured?: boolean;
  expiresAt?: string;
}

export interface SanityProgram {
  _id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  schedule?: string;
  image?: SanityImage;
  category: string;
  features?: string[];
  ageGroup?: string;
  externalLink?: string;
}

export interface SanityService {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  icon: string;
  image?: SanityImage;
  bookingRequired?: boolean;
  contactEmail?: string;
  contactPhone?: string;
}

export interface SanityDonationCause {
  _id: string;
  title: string;
  description: string;
  icon: string;
  goal?: number;
  raised?: number;
}

export interface SanityGalleryImage {
  _id: string;
  image: SanityImage;
  alt: string;
  caption?: string;
  category?: string;
  featured?: boolean;
}

export interface SanityTestimonial {
  _id: string;
  quote: string;
  author: string;
  role?: string;
  image?: SanityImage;
}

export interface SanityFaq {
  _id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface SanityEtiquette {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SanityTourType {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image?: SanityImage;
  duration?: string;
  groupSize?: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}
