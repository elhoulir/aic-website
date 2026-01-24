import { defineField, defineType } from "sanity";

export default defineType({
  name: "announcement",
  title: "Announcement",
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
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown in lists",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "content",
      title: "Full Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Prayer", value: "prayer" },
          { title: "Ramadan", value: "ramadan" },
          { title: "Eid", value: "eid" },
          { title: "Urgent", value: "urgent" },
          { title: "Community", value: "community" },
        ],
      },
      initialValue: "general",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show prominently on homepage",
      initialValue: false,
    }),
    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "date",
      description: "Optional - announcement will auto-hide after this date",
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      category: "category",
    },
    prepare({ title, date, category }) {
      return {
        title,
        subtitle: `${category?.toUpperCase() || "GENERAL"} - ${date}`,
      };
    },
  },
  orderings: [
    {
      title: "Date, New",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
