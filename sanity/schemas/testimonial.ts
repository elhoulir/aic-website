import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role/Title",
      type: "string",
      description: "e.g., 'Community Member', 'Parent', 'Student'",
    }),
    defineField({
      name: "image",
      title: "Author Photo",
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
          { title: "General", value: "general" },
          { title: "Programs", value: "programs" },
          { title: "Services", value: "services" },
          { title: "Education", value: "education" },
          { title: "Youth", value: "youth" },
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show on homepage",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      author: "author",
      quote: "quote",
      media: "image",
    },
    prepare({ author, quote, media }) {
      return {
        title: author,
        subtitle: quote?.substring(0, 50) + "...",
        media,
      };
    },
  },
});
