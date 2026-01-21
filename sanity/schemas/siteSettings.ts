import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      description: "Used for SEO and meta descriptions",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media Links",
      type: "object",
      fields: [
        defineField({
          name: "facebook",
          title: "Facebook URL",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        }),
        defineField({
          name: "youtube",
          title: "YouTube URL",
          type: "url",
        }),
        defineField({
          name: "twitter",
          title: "Twitter/X URL",
          type: "url",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
