import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
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
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Service Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name (e.g., 'BookOpen', 'Heart', 'Users')",
    }),
    defineField({
      name: "features",
      title: "Features/Inclusions",
      type: "array",
      of: [{ type: "string" }],
      description: "List of what this service includes",
    }),
    defineField({
      name: "schedule",
      title: "Availability/Schedule",
      type: "string",
      description: "e.g., 'By appointment', '24/7 Emergency service'",
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
      name: "ctaText",
      title: "Call to Action Text",
      type: "string",
      initialValue: "Enquire Now",
    }),
    defineField({
      name: "ctaLink",
      title: "Call to Action Link",
      type: "string",
      initialValue: "/contact",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
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
      subtitle: "subtitle",
      media: "image",
    },
  },
});
