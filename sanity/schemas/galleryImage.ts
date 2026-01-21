import { defineType, defineField } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Images",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Architecture", value: "architecture" },
          { title: "Events", value: "events" },
          { title: "Community", value: "community" },
          { title: "Programs", value: "programs" },
          { title: "Historical", value: "historical" },
        ],
      },
    }),
    defineField({
      name: "dateTaken",
      title: "Date Taken",
      type: "date",
    }),
    defineField({
      name: "photographer",
      title: "Photographer Credit",
      type: "string",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
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
      title: "title",
      category: "category",
      media: "image",
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category || "Uncategorized",
        media,
      };
    },
  },
});
