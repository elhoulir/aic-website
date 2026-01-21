import { defineType, defineField } from "sanity";

export const program = defineType({
  name: "program",
  title: "Programs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Program Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      description: "Brief description for cards and previews",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Program Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Youth", value: "youth" },
          { title: "Education", value: "education" },
          { title: "Women", value: "women" },
          { title: "Seniors", value: "seniors" },
          { title: "Family", value: "family" },
          { title: "Community", value: "community" },
          { title: "Sports", value: "sports" },
        ],
      },
    }),
    defineField({
      name: "ageGroup",
      title: "Age Group",
      type: "string",
      description: "e.g., 'All ages', '5-12 years', 'Adults'",
    }),
    defineField({
      name: "schedule",
      title: "Schedule",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "day",
              title: "Day",
              type: "string",
              options: {
                list: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
              },
            }),
            defineField({
              name: "startTime",
              title: "Start Time",
              type: "string",
              description: "e.g., 10:00 AM",
            }),
            defineField({
              name: "endTime",
              title: "End Time",
              type: "string",
              description: "e.g., 12:00 PM",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      description: "List of key features or benefits",
    }),
    defineField({
      name: "isActive",
      title: "Currently Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Program",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      description: "Optional link to external website (e.g., club website)",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "image",
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category || "No category",
        media,
      };
    },
  },
});
