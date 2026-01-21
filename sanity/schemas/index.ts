// Site Settings
import { siteSettings } from "./siteSettings";
import { contactInfo } from "./contactInfo";

// Content Types
import { event } from "./event";
import { program } from "./program";
import { service } from "./service";
import { prayerTimes } from "./prayerTimes";
import { announcement } from "./announcement";
import { testimonial } from "./testimonial";
import { teamMember } from "./teamMember";
import { podcast } from "./podcast";
import { galleryImage } from "./galleryImage";

// Donation Configuration
import { donationConfig } from "./donationConfig";

// Page Content
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";

export const schemaTypes = [
  // Settings
  siteSettings,
  contactInfo,
  donationConfig,

  // Pages
  homePage,
  aboutPage,

  // Content
  event,
  program,
  service,
  prayerTimes,
  announcement,
  testimonial,
  teamMember,
  podcast,
  galleryImage,
];
