import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: () => "⚙️",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      description: "Background photo shown in the homepage hero section. Leave empty to use the default image.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { media: "heroImage" },
    prepare({ media }) {
      return { title: "Site Settings", media };
    },
  },
});
