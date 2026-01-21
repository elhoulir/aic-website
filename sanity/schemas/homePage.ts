import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
        }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          type: "text",
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "primaryButtonText",
          title: "Primary Button Text",
          type: "string",
        }),
        defineField({
          name: "primaryButtonLink",
          title: "Primary Button Link",
          type: "string",
        }),
        defineField({
          name: "secondaryButtonText",
          title: "Secondary Button Text",
          type: "string",
        }),
        defineField({
          name: "secondaryButtonLink",
          title: "Secondary Button Link",
          type: "string",
        }),
      ],
    }),

    // Quick Access Section
    defineField({
      name: "quickAccessSection",
      title: "Quick Access Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
        }),
        defineField({
          name: "cards",
          title: "Quick Access Cards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Card Title",
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
                defineField({
                  name: "link",
                  title: "Link",
                  type: "string",
                }),
                defineField({
                  name: "linkText",
                  title: "Link Text",
                  type: "string",
                }),
                defineField({
                  name: "image",
                  title: "Background Image",
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // About Preview Section
    defineField({
      name: "aboutPreview",
      title: "About Preview Section",
      type: "object",
      fields: [
        defineField({
          name: "tagline",
          title: "Tagline",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Title",
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
        defineField({
          name: "stats",
          title: "Statistics",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                  description: "e.g., '40+', '10,000+'",
                }),
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string",
        }),
        defineField({
          name: "buttonLink",
          title: "Button Link",
          type: "string",
        }),
      ],
    }),

    // Donation CTA Section
    defineField({
      name: "donationCta",
      title: "Donation CTA Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string",
        }),
        defineField({
          name: "buttonLink",
          title: "Button Link",
          type: "string",
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // Section Visibility
    defineField({
      name: "sectionVisibility",
      title: "Section Visibility",
      type: "object",
      description: "Toggle which sections appear on the homepage",
      fields: [
        defineField({
          name: "showQuickAccess",
          title: "Show Quick Access Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "showAboutPreview",
          title: "Show About Preview",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "showServices",
          title: "Show Services Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "showEvents",
          title: "Show Events Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "showPrograms",
          title: "Show Programs Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "showTestimonials",
          title: "Show Testimonials",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "showSocialMedia",
          title: "Show Social Media Feed",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "showDonationCta",
          title: "Show Donation CTA",
          type: "boolean",
          initialValue: true,
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});
