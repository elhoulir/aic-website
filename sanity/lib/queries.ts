import { groq } from "next-sanity";

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    "logo": logo { asset-> { url } },
    socialMedia
  }
`;

// Contact Info
export const contactInfoQuery = groq`
  *[_type == "contactInfo"][0] {
    phone,
    email,
    address,
    suburb,
    state,
    postcode,
    country,
    googleMapsUrl,
    openingHours
  }
`;

// Donation Config
export const donationConfigQuery = groq`
  *[_type == "donationConfig"][0] {
    title,
    subtitle,
    description,
    "heroImage": heroImage { asset-> { url } },
    suggestedAmounts,
    allowCustomAmount,
    minimumAmount,
    maximumAmount,
    frequencies,
    donationCategories,
    impactStats,
    thankYouMessage,
    bankDetails
  }
`;

// Events
export const upcomingEventsQuery = groq`
  *[_type == "event" && published == true && startDate >= now()] | order(startDate asc) [0...6] {
    _id,
    title,
    slug,
    description,
    "image": image { asset-> { url } },
    startDate,
    endDate,
    location,
    category,
    isFeatured,
    registrationRequired,
    registrationUrl
  }
`;

export const allEventsQuery = groq`
  *[_type == "event" && published == true] | order(startDate desc) {
    _id,
    title,
    slug,
    description,
    "image": image { asset-> { url } },
    startDate,
    endDate,
    location,
    category,
    isFeatured,
    registrationRequired,
    registrationUrl
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    "image": image { asset-> { url } },
    startDate,
    endDate,
    location,
    category,
    isRecurring,
    recurrencePattern,
    registrationRequired,
    registrationUrl
  }
`;

// Programs
export const activeProgramsQuery = groq`
  *[_type == "program" && isActive == true] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    "image": image { asset-> { url } },
    category,
    ageGroup,
    schedule,
    isFeatured,
    features
  }
`;

export const allProgramsQuery = groq`
  *[_type == "program"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    "image": image { asset-> { url } },
    category,
    ageGroup,
    schedule,
    location,
    contactEmail,
    contactPhone,
    features,
    isActive,
    isFeatured
  }
`;

export const programBySlugQuery = groq`
  *[_type == "program" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    "image": image { asset-> { url } },
    category,
    ageGroup,
    schedule,
    location,
    contactEmail,
    contactPhone,
    features,
    isActive
  }
`;

// Services
export const servicesQuery = groq`
  *[_type == "service" && published == true] | order(order asc) {
    _id,
    title,
    slug,
    subtitle,
    description,
    "image": image { asset-> { url } },
    icon,
    features,
    schedule,
    contactEmail,
    contactPhone,
    ctaText,
    ctaLink
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    subtitle,
    description,
    "image": image { asset-> { url } },
    icon,
    features,
    schedule,
    contactEmail,
    contactPhone,
    ctaText,
    ctaLink
  }
`;

// Prayer Times
export const currentPrayerTimesQuery = groq`
  *[_type == "prayerTimes" && isActive == true][0] {
    title,
    effectiveDate,
    prayers,
    jumuahTimes,
    notes
  }
`;

// Announcements
export const activeAnnouncementsQuery = groq`
  *[_type == "announcement" && published == true && startDate <= now() && (endDate >= now() || !defined(endDate))] | order(startDate desc) {
    _id,
    title,
    message,
    "image": image { asset-> { url } },
    category,
    startDate,
    priority,
    type,
    link,
    linkText,
    showOnHomepage,
    showAsBanner,
    dismissible
  }
`;

export const bannerAnnouncementQuery = groq`
  *[_type == "announcement" && published == true && showAsBanner == true && startDate <= now() && (endDate >= now() || !defined(endDate))][0] {
    _id,
    title,
    message,
    type,
    link,
    linkText,
    dismissible
  }
`;

// Testimonials
export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && published == true && isFeatured == true] | order(order asc) [0...6] {
    _id,
    quote,
    author,
    role,
    "image": image { asset-> { url } },
    category
  }
`;

export const allTestimonialsQuery = groq`
  *[_type == "testimonial" && published == true] | order(order asc) {
    _id,
    quote,
    author,
    role,
    "image": image { asset-> { url } },
    category
  }
`;

// Team Members
export const teamMembersQuery = groq`
  *[_type == "teamMember" && published == true] | order(order asc) {
    _id,
    name,
    role,
    "image": image { asset-> { url } },
    bio,
    email,
    phone,
    category
  }
`;

export const teamMembersByCategoryQuery = groq`
  *[_type == "teamMember" && published == true && category == $category] | order(order asc) {
    _id,
    name,
    role,
    "image": image { asset-> { url } },
    bio,
    email,
    phone
  }
`;

// Podcasts
export const recentPodcastsQuery = groq`
  *[_type == "podcast" && published == true] | order(publishedAt desc) [0...10] {
    _id,
    title,
    slug,
    description,
    speaker,
    "image": image { asset-> { url } },
    duration,
    publishedAt,
    category,
    videoUrl,
    externalAudioUrl
  }
`;

export const allPodcastsQuery = groq`
  *[_type == "podcast" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    speaker,
    "image": image { asset-> { url } },
    audioFile,
    externalAudioUrl,
    videoUrl,
    duration,
    publishedAt,
    category,
    tags,
    isFeatured
  }
`;

export const podcastBySlugQuery = groq`
  *[_type == "podcast" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    speaker,
    "image": image { asset-> { url } },
    audioFile,
    externalAudioUrl,
    videoUrl,
    duration,
    publishedAt,
    category,
    tags
  }
`;

// Gallery
export const featuredGalleryQuery = groq`
  *[_type == "galleryImage" && published == true && isFeatured == true] | order(order asc) [0...12] {
    _id,
    title,
    "image": image { asset-> { url } },
    description,
    category
  }
`;

export const galleryByCategoryQuery = groq`
  *[_type == "galleryImage" && published == true && category == $category] | order(order asc) {
    _id,
    title,
    "image": image { asset-> { url } },
    description,
    dateTaken,
    photographer
  }
`;

// Home Page
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroSection {
      ...,
      "backgroundImage": backgroundImage { asset-> { url } }
    },
    quickAccessSection,
    aboutPreview {
      ...,
      "image": image { asset-> { url } }
    },
    donationCta {
      ...,
      "backgroundImage": backgroundImage { asset-> { url } }
    },
    sectionVisibility
  }
`;

// About Page
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heroSection {
      ...,
      "backgroundImage": backgroundImage { asset-> { url } }
    },
    mission,
    vision,
    history {
      ...,
      "image": image { asset-> { url } }
    },
    values,
    architecture {
      ...,
      "images": images[] { asset-> { url } }
    }
  }
`;
