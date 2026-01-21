import { client } from "./client";
import * as queries from "./queries";

// Site Settings & Config
export async function getSiteSettings() {
  return client.fetch(queries.siteSettingsQuery);
}

export async function getContactInfo() {
  return client.fetch(queries.contactInfoQuery);
}

export async function getDonationConfig() {
  return client.fetch(queries.donationConfigQuery);
}

// Events
export async function getUpcomingEvents() {
  return client.fetch(queries.upcomingEventsQuery);
}

export async function getAllEvents() {
  return client.fetch(queries.allEventsQuery);
}

export async function getEventBySlug(slug: string) {
  return client.fetch(queries.eventBySlugQuery, { slug });
}

// Programs
export async function getActivePrograms() {
  return client.fetch(queries.activeProgramsQuery);
}

export async function getAllPrograms() {
  return client.fetch(queries.allProgramsQuery);
}

export async function getProgramBySlug(slug: string) {
  return client.fetch(queries.programBySlugQuery, { slug });
}

// Services
export async function getServices() {
  return client.fetch(queries.servicesQuery);
}

export async function getServiceBySlug(slug: string) {
  return client.fetch(queries.serviceBySlugQuery, { slug });
}

// Prayer Times
export async function getCurrentPrayerTimes() {
  return client.fetch(queries.currentPrayerTimesQuery);
}

// Announcements
export async function getActiveAnnouncements() {
  return client.fetch(queries.activeAnnouncementsQuery);
}

export async function getBannerAnnouncement() {
  return client.fetch(queries.bannerAnnouncementQuery);
}

// Testimonials
export async function getFeaturedTestimonials() {
  return client.fetch(queries.featuredTestimonialsQuery);
}

export async function getAllTestimonials() {
  return client.fetch(queries.allTestimonialsQuery);
}

// Team Members
export async function getTeamMembers() {
  return client.fetch(queries.teamMembersQuery);
}

export async function getTeamMembersByCategory(category: string) {
  return client.fetch(queries.teamMembersByCategoryQuery, { category });
}

// Podcasts
export async function getRecentPodcasts() {
  return client.fetch(queries.recentPodcastsQuery);
}

export async function getAllPodcasts() {
  return client.fetch(queries.allPodcastsQuery);
}

export async function getPodcastBySlug(slug: string) {
  return client.fetch(queries.podcastBySlugQuery, { slug });
}

// Gallery
export async function getFeaturedGallery() {
  return client.fetch(queries.featuredGalleryQuery);
}

export async function getGalleryByCategory(category: string) {
  return client.fetch(queries.galleryByCategoryQuery, { category });
}

// Pages
export async function getHomePage() {
  return client.fetch(queries.homePageQuery);
}

export async function getAboutPage() {
  return client.fetch(queries.aboutPageQuery);
}
