import { defineType, defineField } from "sanity";

export const contactInfo = defineType({
  name: "contactInfo",
  title: "Contact Information",
  type: "document",
  fields: [
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "address",
      title: "Street Address",
      type: "string",
    }),
    defineField({
      name: "suburb",
      title: "Suburb",
      type: "string",
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
    }),
    defineField({
      name: "postcode",
      title: "Postcode",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
    }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "days",
              title: "Days",
              type: "string",
              description: "e.g., Monday - Friday",
            }),
            defineField({
              name: "hours",
              title: "Hours",
              type: "string",
              description: "e.g., 9:00 AM - 5:00 PM",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Information",
      };
    },
  },
});
