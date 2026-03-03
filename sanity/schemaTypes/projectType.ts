import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Additional Images",
      description: "Add multiple project images for the gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Residential",
          "Commercial",
          "Healthcare",
          "Hospitality",
          "Institutional",
          "Interior",
          "Landscape",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Ongoing", value: "Ongoing" },
          { title: "Completed", value: "Completed" },
        ],
        layout: "radio",
      },
      initialValue: "Ongoing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "areaSqft",
      title: "Area (sqft)",
      type: "number",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      description: "Rich text content for the project detail page",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      subtitle: "category",
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: subtitle ?? "No category",
      };
    },
  },
});
