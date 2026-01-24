import { defineField, defineType } from "sanity";

export default defineType({
  name: "donationCause",
  title: "Donation Cause",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Heart", value: "Heart" },
          { title: "Book Open", value: "BookOpen" },
          { title: "Users", value: "Users" },
          { title: "Home", value: "Home" },
          { title: "Hands Helping", value: "HandHeart" },
          { title: "Star", value: "Star" },
          { title: "Gift", value: "Gift" },
          { title: "Building", value: "Building" },
        ],
      },
    }),
    defineField({
      name: "goal",
      title: "Fundraising Goal",
      type: "number",
      description: "Optional target amount in dollars",
    }),
    defineField({
      name: "raised",
      title: "Amount Raised",
      type: "number",
      description: "Current amount raised (update manually or via integration)",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Show this cause on the donation page",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title",
      active: "active",
      goal: "goal",
      raised: "raised",
    },
    prepare({ title, active, goal, raised }) {
      const progress = goal && raised ? `$${raised}/$${goal}` : "";
      return {
        title: `${title}${active === false ? " (Inactive)" : ""}`,
        subtitle: progress,
      };
    },
  },
});
