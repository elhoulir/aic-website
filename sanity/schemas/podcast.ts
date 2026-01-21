import { defineType, defineField } from "sanity";

export const podcast = defineType({
  name: "podcast",
  title: "Podcasts & Sermons",
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
    }),
    defineField({
      name: "speaker",
      title: "Speaker",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "audioFile",
      title: "Audio File",
      type: "file",
      options: {
        accept: "audio/*",
      },
    }),
    defineField({
      name: "externalAudioUrl",
      title: "External Audio URL",
      type: "url",
      description: "If hosted externally (e.g., SoundCloud, Spotify)",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube or other video link",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g., '45:30'",
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Friday Khutbah", value: "khutbah" },
          { title: "Lecture", value: "lecture" },
          { title: "Q&A", value: "qa" },
          { title: "Special Event", value: "special" },
          { title: "Ramadan", value: "ramadan" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
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
      title: "Publish Date (Newest First)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      speaker: "speaker",
      date: "publishedAt",
      media: "image",
    },
    prepare({ title, speaker, date, media }) {
      return {
        title,
        subtitle: `${speaker || "Unknown"} - ${date ? new Date(date).toLocaleDateString() : "No date"}`,
        media,
      };
    },
  },
});
