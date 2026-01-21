import { defineType, defineField } from "sanity";

export const event = defineType({
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
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
    }),
    defineField({
      name: "content",
      title: "Full Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Event Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "startDate",
      title: "Start Date & Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Religious", value: "religious" },
          { title: "Community", value: "community" },
          { title: "Youth", value: "youth" },
          { title: "Education", value: "education" },
          { title: "Fundraising", value: "fundraising" },
          { title: "Special", value: "special" },
        ],
      },
    }),
    defineField({
      name: "isRecurring",
      title: "Recurring Event",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "recurrencePattern",
      title: "Recurrence Pattern",
      type: "string",
      hidden: ({ parent }) => !parent?.isRecurring,
      options: {
        list: [
          { title: "Daily", value: "daily" },
          { title: "Weekly", value: "weekly" },
          { title: "Monthly", value: "monthly" },
        ],
      },
    }),
    defineField({
      name: "registrationRequired",
      title: "Registration Required",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
      hidden: ({ parent }) => !parent?.registrationRequired,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Event",
      type: "boolean",
      initialValue: false,
      description: "Show this event prominently on the homepage",
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
      title: "Event Date (Upcoming First)",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "startDate",
      media: "image",
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date set",
        media,
      };
    },
  },
});
