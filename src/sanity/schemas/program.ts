import { defineField, defineType } from "sanity";

export default defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "schedule",
      title: "Schedule",
      type: "string",
      description: "e.g., Saturdays 10am-1pm",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Education", value: "education" },
          { title: "Youth", value: "youth" },
          { title: "Sports", value: "sports" },
          { title: "Women", value: "women" },
          { title: "Community", value: "community" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description: "Key features or highlights (bullet points)",
    }),
    defineField({
      name: "ageGroup",
      title: "Age Group",
      type: "string",
      description: "e.g., Ages 5-15, All ages",
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      description: "Link to external website if applicable",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Show this program on the website",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      active: "active",
      media: "image",
    },
    prepare({ title, category, active, media }) {
      return {
        title: `${title}${active === false ? " (Inactive)" : ""}`,
        subtitle: category,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
