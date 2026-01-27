"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

// Base URL for the site (safe to expose)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://aic-website.vercel.app";

export default defineConfig({
  name: "australian-islamic-centre",
  title: "Australian Islamic Centre",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Add a "Preview" action to document types
    // Fetches preview URL from API to keep secret server-side
    productionUrl: async (prev, context) => {
      const { document } = context;
      const docType = document._type;
      const slug = (document.slug as { current?: string })?.current;

      try {
        const response = await fetch(`${baseUrl}/api/preview-url`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentType: docType, slug }),
        });

        if (!response.ok) return prev;

        const data = await response.json();
        return data.url || prev;
      } catch {
        return prev;
      }
    },
  },
});
