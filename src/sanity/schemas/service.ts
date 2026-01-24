import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
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
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Brief description for cards and previews",
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Lucide icon name (e.g., Moon, BookOpen, Heart)",
      options: {
        list: [
          { title: "Moon", value: "Moon" },
          { title: "Book Open", value: "BookOpen" },
          { title: "Heart", value: "Heart" },
          { title: "Users", value: "Users" },
          { title: "Calendar", value: "Calendar" },
          { title: "Star", value: "Star" },
          { title: "Home", value: "Home" },
          { title: "Hands Helping", value: "HandHeart" },
          { title: "Graduation Cap", value: "GraduationCap" },
          { title: "Church/Mosque", value: "Church" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bookingRequired",
      title: "Booking Required",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "email",
      hidden: ({ document }) => !document?.bookingRequired,
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      hidden: ({ document }) => !document?.bookingRequired,
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
      media: "image",
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
