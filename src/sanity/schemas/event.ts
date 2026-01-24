import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
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
      name: "recurring",
      title: "Is Recurring Event?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "date",
      title: "Event Date",
      type: "date",
      hidden: ({ document }) => document?.recurring === true,
    }),
    defineField({
      name: "recurringDay",
      title: "Recurring Day",
      type: "string",
      options: {
        list: [
          { title: "Every Monday", value: "Mondays" },
          { title: "Every Tuesday", value: "Tuesdays" },
          { title: "Every Wednesday", value: "Wednesdays" },
          { title: "Every Thursday", value: "Thursdays" },
          { title: "Every Friday", value: "Fridays" },
          { title: "Every Saturday", value: "Saturdays" },
          { title: "Every Sunday", value: "Sundays" },
          { title: "Weekends", value: "Weekends" },
          { title: "Weekdays", value: "Weekdays" },
        ],
      },
      hidden: ({ document }) => document?.recurring !== true,
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: "e.g., 7:00 PM or 10:00 AM - 1:00 PM",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g., Main Hall, Courtyard, etc.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Community", value: "community" },
          { title: "Religious", value: "religious" },
          { title: "Education", value: "education" },
          { title: "Youth", value: "youth" },
          { title: "Sports", value: "sports" },
          { title: "Women", value: "women" },
          { title: "Charity", value: "charity" },
        ],
      },
      validation: (Rule) => Rule.required(),
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      recurringDay: "recurringDay",
      recurring: "recurring",
      media: "image",
    },
    prepare({ title, date, recurringDay, recurring, media }) {
      const subtitle = recurring ? recurringDay : date;
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
