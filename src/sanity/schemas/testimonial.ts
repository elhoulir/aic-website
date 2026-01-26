import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
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
      description: "e.g., Community Member, Local Resident, Tour Visitor",
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
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      quote: "quote",
      author: "author",
      media: "image",
    },
    prepare({ quote, author, media }) {
      return {
        title: `"${quote?.substring(0, 50)}..."`,
        subtitle: `— ${author}`,
        media,
      };
    },
  },
});
