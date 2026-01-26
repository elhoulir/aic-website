/**
 * Migration script to seed existing content into Sanity CMS
 *
 * Prerequisites:
 * 1. Create a Sanity project at https://sanity.io/manage
 * 2. Get your project ID and create a write token
 * 3. Add to .env.local:
 *    - NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
 *    - NEXT_PUBLIC_SANITY_DATASET=production
 *    - SANITY_API_WRITE_TOKEN=your_write_token
 *
 * Run with: npx tsx scripts/migrate-to-sanity.ts
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing required environment variables:");
  console.error("- NEXT_PUBLIC_SANITY_PROJECT_ID");
  console.error("- SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Helper to create slug
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// =============================================================================
// EXISTING CONTENT DATA (from src/data/content.ts)
// =============================================================================

const events = [
  {
    id: "eid-al-fitr-2025",
    title: "Eid Al-Fitr Prayer",
    date: "2025-03-30",
    time: "7:30 AM",
    location: "Main Prayer Hall & Courtyard",
    description: "Join us for the blessed Eid Al-Fitr prayers followed by community celebrations and festivities for all ages.",
    category: "religious",
    recurring: false,
    featured: true,
  },
  {
    id: "ramadan-iftar-2025",
    title: "Community Iftar",
    date: "2025-03-15",
    time: "6:30 PM",
    location: "Community Hall",
    description: "Break your fast with the community. Free iftar meal provided. All welcome.",
    category: "community",
    recurring: false,
    featured: true,
  },
  {
    id: "jumuah-arabic",
    title: "Jumu'ah Prayer - Arabic Khutbah",
    recurringDay: "Fridays",
    time: "1:00 PM",
    location: "Main Prayer Hall",
    description: "Weekly congregational Friday prayer with khutbah delivered in Arabic. All brothers and sisters welcome.",
    category: "religious",
    recurring: true,
    featured: false,
  },
  {
    id: "jumuah-english",
    title: "Jumu'ah Prayer - English Khutbah",
    recurringDay: "Fridays",
    time: "2:15 PM",
    location: "Main Prayer Hall",
    description: "Weekly congregational Friday prayer with khutbah delivered in English. All brothers and sisters welcome.",
    category: "religious",
    recurring: true,
    featured: false,
  },
  {
    id: "iqra-academy",
    title: "IQRA Academy",
    recurringDay: "Saturdays",
    time: "9:00 AM - 1:00 PM",
    location: "Education Centre",
    description: "Quran recitation, Islamic studies, and memorization classes for children aged 5-12.",
    category: "education",
    recurring: true,
    featured: false,
  },
  {
    id: "salam-arabic",
    title: "Salam Arabic School",
    recurringDay: "Weekends",
    time: "Various Sessions",
    location: "Education Centre",
    description: "Comprehensive Arabic language instruction for all levels.",
    category: "education",
    recurring: true,
    featured: false,
  },
  {
    id: "girls-jiujitsu",
    title: "Girls Jiu-Jitsu Classes",
    recurringDay: "Wednesdays",
    time: "5:00 PM",
    location: "Youth Centre",
    description: "Self-defense and fitness classes for girls through AIYC in a safe, supportive environment.",
    category: "youth",
    recurring: true,
    featured: false,
  },
  {
    id: "boys-wrestling",
    title: "Boys Wrestling Classes",
    recurringDay: "Thursdays",
    time: "5:00 PM",
    location: "Youth Centre",
    description: "Wrestling and fitness program for boys through AIYC. Building strength and discipline.",
    category: "youth",
    recurring: true,
    featured: false,
  },
];

const announcements = [
  {
    id: "1",
    title: "Ramadan 2024 Prayer Times",
    date: "2024-03-01",
    excerpt: "Special Taraweeh prayers and Iftar programs throughout the blessed month.",
    category: "ramadan",
    featured: true,
  },
  {
    id: "2",
    title: "IQRA Academy Enrolments Open",
    date: "2024-02-15",
    excerpt: "Enrolments now open for the new term. Limited spots available for Quran and Islamic studies classes.",
    category: "general",
    featured: true,
  },
  {
    id: "3",
    title: "Community Eid Celebration",
    date: "2024-04-10",
    excerpt: "Join us for Eid prayers followed by community breakfast and festivities for all ages.",
    category: "eid",
    featured: false,
  },
];

const programs = [
  {
    id: "iqra",
    title: "IQRA Academy",
    description: "Weekend school established in 2013 with 100+ students from kindergarten through Year 7. Focused on Quran recitation, Islamic studies, and memorization.",
    schedule: "Saturdays & Sundays, 9AM - 1PM",
    features: ["Iqra Program - Fluent Quranic Reading", "Islamic Studies Foundation", "Quranic Memorization", "Understanding & Tafsir"],
    category: "education",
    order: 1,
  },
  {
    id: "salam",
    title: "Salam Arabic School",
    description: "Comprehensive Arabic language instruction for students of all ages and levels.",
    schedule: "Weekends",
    features: ["Classical Arabic", "Modern Standard Arabic", "Conversational Skills", "Reading & Writing"],
    category: "education",
    order: 2,
  },
  {
    id: "alnoor",
    title: "Al-Noor Institute",
    description: "Advanced Islamic education programs for deeper understanding of Islamic sciences.",
    schedule: "Contact for details",
    features: ["Advanced Islamic Studies", "Fiqh & Aqeedah", "Seerah & History", "Contemporary Issues"],
    category: "education",
    order: 3,
  },
  {
    id: "newportstorm",
    title: "Newport Storm FC",
    description: "Community football club fostering teamwork, fitness, and Islamic values in youth.",
    schedule: "See club website for training times",
    features: ["Junior Teams", "Senior Teams", "Professional Coaching", "Community Spirit"],
    category: "sports",
    externalLink: "https://www.newportstormfc.com.au/",
    order: 4,
  },
  {
    id: "boysynights",
    title: "Boys Youth Nights",
    description: "Regular youth gatherings for boys featuring Islamic learning, sports, and brotherhood activities.",
    schedule: "Contact for schedule",
    features: ["Islamic Learning", "Sports Activities", "Brotherhood Building", "Leadership Development"],
    category: "youth",
    order: 5,
  },
  {
    id: "girlsjiujitsu",
    title: "Girls Jiu-Jitsu Classes",
    description: "Self-defense and fitness classes designed specifically for girls in a safe, supportive environment.",
    schedule: "Weekly sessions",
    features: ["Self-Defense Skills", "Physical Fitness", "Confidence Building", "Female Instructors"],
    category: "youth",
    order: 6,
  },
];

const services = [
  {
    id: "prayers",
    title: "Daily Prayers",
    shortDescription: "Join us for the five daily prayers in our beautiful main prayer hall.",
    icon: "Moon",
    order: 1,
  },
  {
    id: "jumuah",
    title: "Friday Jumu'ah",
    shortDescription: "Friday prayer service with khutbahs in Arabic (1:00 PM) and English (2:15 PM).",
    icon: "BookOpen",
    order: 2,
  },
  {
    id: "nikah",
    title: "Nikah Services",
    shortDescription: "Islamic marriage ceremonies with official certificates and documentation.",
    icon: "Heart",
    bookingRequired: true,
    order: 3,
  },
  {
    id: "funeral",
    title: "Funeral Services",
    shortDescription: "Compassionate funeral services including ghusl, janazah prayers, and burial.",
    icon: "HandHeart",
    bookingRequired: true,
    order: 4,
  },
  {
    id: "counselling",
    title: "Counselling & Support",
    shortDescription: "Confidential Islamic counselling services for individuals and families.",
    icon: "Users",
    bookingRequired: true,
    order: 5,
  },
  {
    id: "religious",
    title: "Religious Services",
    shortDescription: "Guidance for births, marriages, deaths, and Islamic practice.",
    icon: "Star",
    order: 6,
  },
];

const donationCauses = [
  { id: "general", title: "General Fund", description: "Support the daily operations and maintenance of the centre.", icon: "Building", order: 1 },
  { id: "education", title: "Education Programs", description: "Fund scholarships and educational materials for students.", icon: "BookOpen", order: 2 },
  { id: "zakat", title: "Zakat", description: "Fulfill your Zakat obligation through our verified distribution channels.", icon: "Heart", order: 3 },
  { id: "sadaqah", title: "Sadaqah", description: "Give voluntary charity to support those in need in our community.", icon: "Gift", order: 4 },
  { id: "youth", title: "Youth Programs", description: "Support AIYC programs including sports, youth nights, and development.", icon: "Users", order: 5 },
  { id: "maintenance", title: "Building Maintenance", description: "Help maintain our architectural landmark for future generations.", icon: "Home", order: 6 },
];

const testimonials = [
  {
    id: "1",
    quote: "The Australian Islamic Centre is not just a mosque - it's a global architectural icon that serves as a hub for our local community. The integration of Australian values with Islamic beauty is truly remarkable.",
    author: "Community Member",
    role: "Newport Local",
    order: 1,
  },
  {
    id: "2",
    quote: "IQRA Academy has transformed my children's understanding of Islam. The teachers are dedicated and the environment nurtures both Islamic knowledge and Australian identity.",
    author: "Parent",
    role: "IQRA Academy Parent",
    order: 2,
  },
  {
    id: "3",
    quote: "The visitor tour was an eye-opening experience. The architecture is stunning and the community was so welcoming. I learned so much about Islam and the Muslim community.",
    author: "Visitor",
    role: "Architecture Enthusiast",
    order: 3,
  },
];

const faqs = [
  { question: "Do I need to book a visit in advance?", answer: "While walk-ins are welcome for individual visits, we recommend booking group tours in advance to ensure a guide is available.", category: "visiting", order: 1 },
  { question: "What should I wear when visiting the mosque?", answer: "Modest dress is required. Shoulders and knees should be covered. Headscarves are provided for women if needed.", category: "visiting", order: 2 },
  { question: "Can non-Muslims visit the mosque?", answer: "Absolutely! We welcome visitors of all faiths and backgrounds. Our tours are designed to be educational and inclusive.", category: "visiting", order: 3 },
  { question: "Is photography allowed?", answer: "Photography is permitted in designated areas. Please ask your guide and be respectful during prayer times.", category: "visiting", order: 4 },
  { question: "Are there parking facilities?", answer: "Yes, free parking is available on-site for visitors.", category: "visiting", order: 5 },
  { question: "Is there a 360-degree virtual tour available?", answer: "Yes! We offer a virtual 360-degree tour for those who cannot visit in person. Contact us for access.", category: "visiting", order: 6 },
];

const etiquette = [
  { title: "Remove Shoes", description: "Please remove your shoes before entering the prayer areas. Shoe racks are provided.", icon: "Footprints", order: 1 },
  { title: "Dress Modestly", description: "Wear clothing that covers shoulders and knees. Headscarves available for women.", icon: "Shirt", order: 2 },
  { title: "Maintain Silence", description: "Keep voices low, especially during prayer times. Phones should be on silent.", icon: "VolumeX", order: 3 },
  { title: "Respect Prayer", description: "Do not walk in front of those praying. Wait until prayers conclude before moving.", icon: "Hand", order: 4 },
  { title: "Wudu Facilities", description: "Ablution (wudu) facilities are available for those wishing to pray.", icon: "Clock", order: 5 },
  { title: "Ask Questions", description: "Feel free to ask questions respectfully. Our community is happy to help.", icon: "Heart", order: 6 },
];

const tourTypes = [
  { id: "architectural", title: "Architectural Tours", description: "Explore our award-winning architectural design that has attracted visitors from around the world.", icon: "Building2", order: 1 },
  { id: "school", title: "School Tours", description: "Educational excursions for students to learn about Islam, Muslim culture, and interfaith understanding.", icon: "GraduationCap", order: 2 },
  { id: "masjid", title: "Masjid Tours", description: "Experience the spiritual heart of our centre with a guided tour of the prayer facilities.", icon: "Users", order: 3 },
  { id: "info", title: "Information Sessions", description: "Learn about Islam, ask questions, and engage in meaningful dialogue in a welcoming environment.", icon: "Info", order: 4 },
];

const galleryImages = [
  { alt: "Main prayer hall interior with colorful skylights", category: "Prayer Hall", featured: true, order: 1 },
  { alt: "Exterior front view with minaret", category: "Architecture", featured: true, order: 2 },
  { alt: "Aerial view of golden roof lanterns", category: "Architecture", featured: true, order: 3 },
  { alt: "Courtyard with community members", category: "Community", featured: false, order: 4 },
  { alt: "Interior ceiling with colorful lights", category: "Prayer Hall", featured: false, order: 5 },
  { alt: "Aerial drone shot with crescent moon", category: "Architecture", featured: true, order: 6 },
  { alt: "Prayer hall at night with calligraphy", category: "Prayer Hall", featured: false, order: 7 },
  { alt: "Night exterior with lights", category: "Events", featured: false, order: 8 },
  { alt: "Minaret close-up view", category: "Architecture", featured: false, order: 9 },
  { alt: "Aerial view of the centre", category: "Architecture", featured: false, order: 10 },
];

// =============================================================================
// MIGRATION FUNCTIONS
// =============================================================================

async function migrateEvents() {
  console.log("\n📅 Migrating Events...");
  for (const event of events) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: any = {
      _type: "event",
      _id: `event-${event.id}`,
      title: event.title,
      slug: { _type: "slug", current: createSlug(event.title) },
      recurring: event.recurring,
      time: event.time,
      location: event.location,
      category: event.category,
      description: event.description,
      featured: event.featured || false,
    };
    if (event.recurring) {
      doc.recurringDay = event.recurringDay;
    } else {
      doc.date = event.date;
    }
    await client.createOrReplace(doc);
    console.log(`  ✓ ${event.title}`);
  }
}

async function migrateAnnouncements() {
  console.log("\n📢 Migrating Announcements...");
  for (const item of announcements) {
    const doc = {
      _type: "announcement",
      _id: `announcement-${item.id}`,
      title: item.title,
      slug: { _type: "slug", current: createSlug(item.title) },
      date: item.date,
      excerpt: item.excerpt,
      category: item.category,
      featured: item.featured,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${item.title}`);
  }
}

async function migratePrograms() {
  console.log("\n📚 Migrating Programs...");
  for (const program of programs) {
    const doc = {
      _type: "program",
      _id: `program-${program.id}`,
      title: program.title,
      slug: { _type: "slug", current: createSlug(program.title) },
      description: program.description,
      schedule: program.schedule,
      category: program.category,
      features: program.features,
      externalLink: program.externalLink,
      active: true,
      order: program.order,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${program.title}`);
  }
}

async function migrateServices() {
  console.log("\n🕌 Migrating Services...");
  for (const service of services) {
    const doc = {
      _type: "service",
      _id: `service-${service.id}`,
      title: service.title,
      slug: { _type: "slug", current: createSlug(service.title) },
      shortDescription: service.shortDescription,
      icon: service.icon,
      bookingRequired: service.bookingRequired || false,
      order: service.order,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${service.title}`);
  }
}

async function migrateDonationCauses() {
  console.log("\n💝 Migrating Donation Causes...");
  for (const cause of donationCauses) {
    const doc = {
      _type: "donationCause",
      _id: `donation-${cause.id}`,
      title: cause.title,
      description: cause.description,
      icon: cause.icon,
      active: true,
      order: cause.order,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${cause.title}`);
  }
}

async function migrateTestimonials() {
  console.log("\n💬 Migrating Testimonials...");
  for (const testimonial of testimonials) {
    const doc = {
      _type: "testimonial",
      _id: `testimonial-${testimonial.id}`,
      quote: testimonial.quote,
      author: testimonial.author,
      role: testimonial.role,
      featured: true,
      order: testimonial.order,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${testimonial.author}`);
  }
}

async function migrateFaqs() {
  console.log("\n❓ Migrating FAQs...");
  for (const faq of faqs) {
    const doc = {
      _type: "faq",
      _id: `faq-${faq.order}`,
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${faq.question.substring(0, 40)}...`);
  }
}

async function migrateEtiquette() {
  console.log("\n🙏 Migrating Etiquette Guidelines...");
  for (const item of etiquette) {
    const doc = {
      _type: "etiquette",
      _id: `etiquette-${item.order}`,
      title: item.title,
      description: item.description,
      icon: item.icon,
      order: item.order,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${item.title}`);
  }
}

async function migrateTourTypes() {
  console.log("\n🏛️ Migrating Tour Types...");
  for (const tour of tourTypes) {
    const doc = {
      _type: "tourType",
      _id: `tour-${tour.id}`,
      title: tour.title,
      slug: { _type: "slug", current: createSlug(tour.title) },
      description: tour.description,
      icon: tour.icon,
      active: true,
      order: tour.order,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${tour.title}`);
  }
}

async function migrateGallery() {
  console.log("\n🖼️ Migrating Gallery (metadata only - images need manual upload)...");
  for (const image of galleryImages) {
    const doc = {
      _type: "galleryImage",
      _id: `gallery-${image.order}`,
      alt: image.alt,
      category: image.category,
      featured: image.featured,
      order: image.order,
      // Note: Images need to be uploaded manually through Sanity Studio
      // This migration only creates the metadata
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${image.alt.substring(0, 40)}...`);
  }
  console.log("\n  ⚠️  Note: Gallery images need to be uploaded manually in Sanity Studio");
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  console.log("🚀 Starting Sanity Migration");
  console.log(`   Project: ${projectId}`);
  console.log(`   Dataset: ${dataset}`);
  console.log("=".repeat(50));

  try {
    await migrateEvents();
    await migrateAnnouncements();
    await migratePrograms();
    await migrateServices();
    await migrateDonationCauses();
    await migrateTestimonials();
    await migrateFaqs();
    await migrateEtiquette();
    await migrateTourTypes();
    await migrateGallery();

    console.log("\n" + "=".repeat(50));
    console.log("✅ Migration completed successfully!");
    console.log("\nNext steps:");
    console.log("1. Open Sanity Studio at http://localhost:3000/studio");
    console.log("2. Upload images for gallery items and other content");
    console.log("3. Review and edit migrated content as needed");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

main();
