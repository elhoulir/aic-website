import { defineType, defineField } from "sanity";

export const prayerTimes = defineType({
  name: "prayerTimes",
  title: "Prayer Times",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Daily Prayer Times",
    }),
    defineField({
      name: "effectiveDate",
      title: "Effective From",
      type: "date",
      description: "When these prayer times become active",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prayers",
      title: "Prayer Times",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Prayer Name",
              type: "string",
              options: {
                list: [
                  { title: "Fajr", value: "fajr" },
                  { title: "Sunrise", value: "sunrise" },
                  { title: "Dhuhr", value: "dhuhr" },
                  { title: "Asr", value: "asr" },
                  { title: "Maghrib", value: "maghrib" },
                  { title: "Isha", value: "isha" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "adhan",
              title: "Adhan Time",
              type: "string",
              description: "e.g., 5:30 AM",
            }),
            defineField({
              name: "iqamah",
              title: "Iqamah Time",
              type: "string",
              description: "e.g., 5:45 AM",
            }),
          ],
          preview: {
            select: {
              name: "name",
              adhan: "adhan",
              iqamah: "iqamah",
            },
            prepare({ name, adhan, iqamah }) {
              return {
                title: name?.charAt(0).toUpperCase() + name?.slice(1),
                subtitle: `Adhan: ${adhan || "-"} | Iqamah: ${iqamah || "-"}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "jumuahTimes",
      title: "Jumu'ah (Friday) Prayer Times",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "session",
              title: "Session Name",
              type: "string",
              description: "e.g., 'First Session (Arabic)', 'Second Session (English)'",
            }),
            defineField({
              name: "time",
              title: "Time",
              type: "string",
              description: "e.g., 1:00 PM",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
      description: "Any additional information about prayer times",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Only one prayer time schedule should be active at a time",
    }),
  ],
  preview: {
    select: {
      date: "effectiveDate",
      isActive: "isActive",
    },
    prepare({ date, isActive }) {
      return {
        title: isActive ? "Current Prayer Times" : "Prayer Times",
        subtitle: date ? `Effective from: ${date}` : "No date set",
      };
    },
  },
});
