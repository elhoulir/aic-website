import { defineType, defineField } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcements",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Success", value: "success" },
          { title: "Urgent", value: "urgent" },
        ],
      },
      initialValue: "info",
    }),
    defineField({
      name: "link",
      title: "Link URL",
      type: "string",
      description: "Optional link for more information",
    }),
    defineField({
      name: "linkText",
      title: "Link Text",
      type: "string",
      description: "e.g., 'Learn More', 'Register Now'",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      description: "When to start showing this announcement",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      description: "When to stop showing this announcement",
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showAsBanner",
      title: "Show as Site Banner",
      type: "boolean",
      initialValue: false,
      description: "Display at the top of all pages",
    }),
    defineField({
      name: "dismissible",
      title: "Can be Dismissed",
      type: "boolean",
      initialValue: true,
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
      type: "type",
      startDate: "startDate",
    },
    prepare({ title, type, startDate }) {
      return {
        title,
        subtitle: `${type?.toUpperCase() || "INFO"} - ${startDate ? new Date(startDate).toLocaleDateString() : "No date"}`,
      };
    },
  },
});
