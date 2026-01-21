import { defineType, defineField } from "sanity";

export const donationConfig = defineType({
  name: "donationConfig",
  title: "Donation Configuration",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "suggestedAmounts",
      title: "Suggested Donation Amounts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "amount",
              title: "Amount ($)",
              type: "number",
              validation: (Rule) => Rule.required().positive(),
            }),
            defineField({
              name: "label",
              title: "Label (optional)",
              type: "string",
              description: "e.g., 'Most Popular', 'Zakat Minimum'",
            }),
            defineField({
              name: "description",
              title: "Description (optional)",
              type: "string",
              description: "What this amount could support",
            }),
          ],
          preview: {
            select: {
              amount: "amount",
              label: "label",
            },
            prepare({ amount, label }) {
              return {
                title: `$${amount}`,
                subtitle: label || "",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "allowCustomAmount",
      title: "Allow Custom Amount",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "minimumAmount",
      title: "Minimum Donation Amount ($)",
      type: "number",
      initialValue: 5,
    }),
    defineField({
      name: "maximumAmount",
      title: "Maximum Donation Amount ($)",
      type: "number",
      description: "Leave empty for no maximum",
    }),
    defineField({
      name: "frequencies",
      title: "Donation Frequencies",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "ID",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "e.g., 'one-time', 'monthly', 'weekly'",
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "e.g., 'One-time', 'Monthly', 'Weekly'",
            }),
            defineField({
              name: "stripePriceIdSuffix",
              title: "Stripe Interval",
              type: "string",
              description: "Leave empty for one-time, use 'month' or 'week' for recurring",
            }),
            defineField({
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              label: "label",
              enabled: "enabled",
            },
            prepare({ label, enabled }) {
              return {
                title: label,
                subtitle: enabled ? "Enabled" : "Disabled",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "donationCategories",
      title: "Donation Categories",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "ID",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "name",
              title: "Category Name",
              type: "string",
              validation: (Rule) => Rule.required(),
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
              description: "Lucide icon name (e.g., 'Heart', 'BookOpen', 'Home')",
            }),
            defineField({
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              name: "name",
              enabled: "enabled",
            },
            prepare({ name, enabled }) {
              return {
                title: name,
                subtitle: enabled ? "Enabled" : "Disabled",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "impactStats",
      title: "Impact Statistics",
      type: "array",
      description: "Show donors what their contributions achieve",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "stat",
              title: "Statistic",
              type: "string",
              description: "e.g., '1,000+'",
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g., 'Families Supported'",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "thankYouMessage",
      title: "Thank You Message",
      type: "text",
      description: "Message shown after successful donation",
    }),
    defineField({
      name: "bankDetails",
      title: "Bank Transfer Details",
      type: "object",
      description: "For donors who prefer bank transfer",
      fields: [
        defineField({
          name: "enabled",
          title: "Show Bank Details",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "bankName",
          title: "Bank Name",
          type: "string",
        }),
        defineField({
          name: "accountName",
          title: "Account Name",
          type: "string",
        }),
        defineField({
          name: "bsb",
          title: "BSB",
          type: "string",
        }),
        defineField({
          name: "accountNumber",
          title: "Account Number",
          type: "string",
        }),
        defineField({
          name: "reference",
          title: "Reference Instructions",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Donation Configuration",
      };
    },
  },
});
