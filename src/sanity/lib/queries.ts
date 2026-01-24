import { groq } from "next-sanity";

// Events
export const eventsQuery = groq`
  *[_type == "event"] | order(date desc, order asc) {
    _id,
    title,
    "slug": slug.current,
    recurring,
    date,
    recurringDay,
    time,
    location,
    category,
    image,
    description,
    featured
  }
`;

export const featuredEventsQuery = groq`
  *[_type == "event" && featured == true] | order(date desc) [0...4] {
    _id,
    title,
    "slug": slug.current,
    recurring,
    date,
    recurringDay,
    time,
    location,
    category,
    image,
    description
  }
`;

// Announcements
export const announcementsQuery = groq`
  *[_type == "announcement" && (expiresAt == null || expiresAt > now())] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    excerpt,
    content,
    category,
    featured,
    expiresAt
  }
`;

export const featuredAnnouncementsQuery = groq`
  *[_type == "announcement" && featured == true && (expiresAt == null || expiresAt > now())] | order(date desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    date,
    excerpt,
    category
  }
`;

// Programs
export const programsQuery = groq`
  *[_type == "program" && active == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    fullDescription,
    schedule,
    image,
    category,
    features,
    ageGroup,
    externalLink
  }
`;

// Services
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    icon,
    image,
    bookingRequired,
    contactEmail,
    contactPhone
  }
`;

// Donation Causes
export const donationCausesQuery = groq`
  *[_type == "donationCause" && active == true] | order(order asc) {
    _id,
    title,
    description,
    icon,
    goal,
    raised
  }
`;

// Gallery
export const galleryQuery = groq`
  *[_type == "galleryImage"] | order(order asc) {
    _id,
    image,
    alt,
    caption,
    category,
    featured
  }
`;

export const featuredGalleryQuery = groq`
  *[_type == "galleryImage" && featured == true] | order(order asc) {
    _id,
    image,
    alt,
    caption,
    category
  }
`;

// Testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    quote,
    author,
    role,
    image
  }
`;

// FAQs
export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const faqsByCategoryQuery = groq`
  *[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    answer
  }
`;

// Etiquette
export const etiquetteQuery = groq`
  *[_type == "etiquette"] | order(order asc) {
    _id,
    title,
    description,
    icon
  }
`;

// Tour Types
export const tourTypesQuery = groq`
  *[_type == "tourType" && active == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    image,
    duration,
    groupSize
  }
`;

// Tour Requests (for admin)
export const tourRequestsQuery = groq`
  *[_type == "tourRequest"] | order(submittedAt desc) {
    _id,
    name,
    email,
    phone,
    tourType->{title},
    preferredDate,
    preferredTime,
    groupSize,
    organization,
    message,
    status,
    submittedAt,
    notes
  }
`;
