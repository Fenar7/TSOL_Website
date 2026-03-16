import { defineField, defineType } from "sanity";

export const approachItemType = defineType({
  name: "approachItem",
  title: "Our Approach Card",
  type: "document",
  icon: () => "🏛️",
  fields: [
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "1 = first card, 2 = second card, 3 = third card.",
      initialValue: 1,
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: "highlightWord",
      title: "Highlight Word",
      type: "string",
      description: 'The large bold word shown at the start of the card text (e.g. "Space", "Soul", "Timeless").',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "text",
      description: "The rest of the descriptive text that follows the highlight word.",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "image",
      title: "Card Image",
      type: "image",
      description: "Photo shown in the card.",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      description: "Short description of the image for accessibility.",
    }),
  ],
  preview: {
    select: {
      title: "highlightWord",
      subtitle: "order",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `${subtitle ? `${subtitle}. ` : ""}${title ?? "Approach Card"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
