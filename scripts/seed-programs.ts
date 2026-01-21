/**
 * Migration script to seed Sanity CMS with the original programs data
 *
 * Prerequisites:
 * 1. Add SANITY_API_WRITE_TOKEN to your .env.local file
 *    - Get this from: https://sanity.io/manage > Your Project > API > Tokens
 *    - Create a token with "Editor" or "Admin" permissions
 *
 * Run with:
 *   npx tsx scripts/seed-programs.ts
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

if (!token) {
  console.error("❌ Missing SANITY_API_WRITE_TOKEN in .env.local");
  console.error("   Get a write token from: https://sanity.io/manage > Your Project > API > Tokens");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// Program type for the seed data
interface ProgramData {
  _type: string;
  title: string;
  slug: { _type: string; current: string };
  shortDescription: string;
  category: string;
  features: string[];
  schedule?: { _key: string; day: string; startTime: string; endTime: string }[];
  externalLink?: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

// The original programs data to migrate
const programs: ProgramData[] = [
  {
    _type: "program",
    title: "IQRA Academy",
    slug: { _type: "slug", current: "iqra-academy" },
    shortDescription:
      "Weekend school established in 2013 with 100+ students from kindergarten through Year 7. Focused on Quran recitation, Islamic studies, and memorization.",
    category: "education",
    features: [
      "Iqra Program - Fluent Quranic Reading",
      "Islamic Studies Foundation",
      "Quranic Memorization",
      "Understanding & Tafsir",
    ],
    schedule: [
      { _key: "sat1", day: "Saturday", startTime: "9:00 AM", endTime: "1:00 PM" },
      { _key: "sun1", day: "Sunday", startTime: "9:00 AM", endTime: "1:00 PM" },
    ],
    isActive: true,
    isFeatured: true,
    order: 1,
  },
  {
    _type: "program",
    title: "Salam Arabic School",
    slug: { _type: "slug", current: "salam-arabic-school" },
    shortDescription:
      "Comprehensive Arabic language instruction for students of all ages and levels.",
    category: "education",
    features: [
      "Classical Arabic",
      "Modern Standard Arabic",
      "Conversational Skills",
      "Reading & Writing",
    ],
    schedule: [
      { _key: "sat2", day: "Saturday", startTime: "TBA", endTime: "TBA" },
      { _key: "sun2", day: "Sunday", startTime: "TBA", endTime: "TBA" },
    ],
    isActive: true,
    isFeatured: false,
    order: 2,
  },
  {
    _type: "program",
    title: "Al-Noor Institute",
    slug: { _type: "slug", current: "al-noor-institute" },
    shortDescription:
      "Advanced Islamic education programs for deeper understanding of Islamic sciences.",
    category: "education",
    features: [
      "Advanced Islamic Studies",
      "Fiqh & Aqeedah",
      "Seerah & History",
      "Contemporary Issues",
    ],
    isActive: true,
    isFeatured: false,
    order: 3,
  },
  {
    _type: "program",
    title: "Newport Storm FC",
    slug: { _type: "slug", current: "newport-storm-fc" },
    shortDescription:
      "Community football club fostering teamwork, fitness, and Islamic values in youth.",
    category: "sports",
    features: [
      "Junior Teams",
      "Senior Teams",
      "Professional Coaching",
      "Community Spirit",
    ],
    externalLink: "https://www.newportstormfc.com.au/",
    isActive: true,
    isFeatured: false,
    order: 4,
  },
  {
    _type: "program",
    title: "Boys Youth Nights",
    slug: { _type: "slug", current: "boys-youth-nights" },
    shortDescription:
      "Regular youth gatherings for boys featuring Islamic learning, sports, and brotherhood activities.",
    category: "youth",
    features: [
      "Islamic Learning",
      "Sports Activities",
      "Brotherhood Building",
      "Leadership Development",
    ],
    isActive: true,
    isFeatured: false,
    order: 5,
  },
  {
    _type: "program",
    title: "Girls Jiu-Jitsu Classes",
    slug: { _type: "slug", current: "girls-jiu-jitsu-classes" },
    shortDescription:
      "Self-defense and fitness classes designed specifically for girls in a safe, supportive environment.",
    category: "women",
    features: [
      "Self-Defense Skills",
      "Physical Fitness",
      "Confidence Building",
      "Female Instructors",
    ],
    isActive: true,
    isFeatured: false,
    order: 6,
  },
];

async function seedPrograms() {
  console.log("🚀 Starting program migration...\n");

  // First, check for existing programs and optionally delete them
  const existingPrograms = await client.fetch(`*[_type == "program"]{ _id, title }`);

  if (existingPrograms.length > 0) {
    console.log(`Found ${existingPrograms.length} existing program(s):`);
    existingPrograms.forEach((p: { title: string }) => console.log(`  - ${p.title}`));
    console.log("\nDeleting existing programs before seeding...\n");

    for (const program of existingPrograms) {
      await client.delete(program._id);
      console.log(`  ✓ Deleted: ${program.title}`);
    }
    console.log("");
  }

  // Create new programs
  console.log("Creating programs:\n");

  for (const program of programs) {
    try {
      const result = await client.create(program);
      console.log(`  ✓ Created: ${program.title} (${result._id})`);
    } catch (error) {
      console.error(`  ✗ Failed to create ${program.title}:`, error);
    }
  }

  console.log("\n✅ Migration complete!");
  console.log(`   ${programs.length} programs have been added to Sanity CMS.`);
  console.log("   Visit your Sanity Studio at /admin to view and manage them.");
}

seedPrograms().catch(console.error);
