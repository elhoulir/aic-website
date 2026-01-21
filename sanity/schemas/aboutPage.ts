import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // Mission & Vision
    defineField({
      name: "mission",
      title: "Our Mission",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        }),
      ],
    }),

    defineField({
      name: "vision",
      title: "Our Vision",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        }),
      ],
    }),

    // History Section
    defineField({
      name: "history",
      title: "Our History",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        }),
        defineField({
          name: "timeline",
          title: "Timeline",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "year",
                  title: "Year",
                  type: "string",
                }),
                defineField({
                  name: "title",
                  title: "Event Title",
                  type: "string",
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Values
    defineField({
      name: "values",
      title: "Our Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Value Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Lucide icon name",
            }),
          ],
        },
      ],
    }),

    // Architecture Section
    defineField({
      name: "architecture",
      title: "Architecture Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        }),
        defineField({
          name: "images",
          title: "Architecture Images",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
            },
          ],
        }),
        defineField({
          name: "architect",
          title: "Architect Name",
          type: "string",
        }),
        defineField({
          name: "completionYear",
          title: "Completion Year",
          type: "string",
        }),
        defineField({
          name: "awards",
          title: "Awards",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page",
      };
    },
  },
});
