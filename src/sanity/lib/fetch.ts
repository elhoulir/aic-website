import "server-only";

import { client } from "./client";
import {
  eventsQuery,
  featuredEventsQuery,
  announcementsQuery,
  featuredAnnouncementsQuery,
  programsQuery,
  servicesQuery,
  donationCausesQuery,
  galleryQuery,
  featuredGalleryQuery,
  testimonialsQuery,
  faqsQuery,
  faqsByCategoryQuery,
  etiquetteQuery,
  tourTypesQuery,
} from "./queries";

// Revalidation time in seconds (5 minutes)
const REVALIDATE_TIME = 300;

// Generic fetch function with caching
async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: REVALIDATE_TIME,
      tags,
    },
  });
}

// Events
export async function getEvents() {
  return sanityFetch(eventsQuery, {}, ["events"]);
}

export async function getFeaturedEvents() {
  return sanityFetch(featuredEventsQuery, {}, ["events"]);
}

// Announcements
export async function getAnnouncements() {
  return sanityFetch(announcementsQuery, {}, ["announcements"]);
}

export async function getFeaturedAnnouncements() {
  return sanityFetch(featuredAnnouncementsQuery, {}, ["announcements"]);
}

// Programs
export async function getPrograms() {
  return sanityFetch(programsQuery, {}, ["programs"]);
}

// Services
export async function getServices() {
  return sanityFetch(servicesQuery, {}, ["services"]);
}

// Donation Causes
export async function getDonationCauses() {
  return sanityFetch(donationCausesQuery, {}, ["donationCauses"]);
}

// Gallery
export async function getGalleryImages() {
  return sanityFetch(galleryQuery, {}, ["gallery"]);
}

export async function getFeaturedGalleryImages() {
  return sanityFetch(featuredGalleryQuery, {}, ["gallery"]);
}

// Testimonials
export async function getTestimonials() {
  return sanityFetch(testimonialsQuery, {}, ["testimonials"]);
}

// FAQs
export async function getFaqs() {
  return sanityFetch(faqsQuery, {}, ["faqs"]);
}

export async function getFaqsByCategory(category: string) {
  return sanityFetch(faqsByCategoryQuery, { category }, ["faqs"]);
}

// Etiquette
export async function getEtiquette() {
  return sanityFetch(etiquetteQuery, {}, ["etiquette"]);
}

// Tour Types
export async function getTourTypes() {
  return sanityFetch(tourTypesQuery, {}, ["tourTypes"]);
}
